#!/bin/bash

# MSC Center Website Deployment Script
# This script handles deployment to various environments

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="msc-center-website"
DOCKER_IMAGE="msc-center"
DOCKER_REGISTRY="your-registry.com"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [ENVIRONMENT] [OPTIONS]"
    echo ""
    echo "Environments:"
    echo "  development  - Deploy to development environment"
    echo "  staging      - Deploy to staging environment"
    echo "  production   - Deploy to production environment"
    echo "  docker       - Build and run with Docker"
    echo "  vercel       - Deploy to Vercel"
    echo ""
    echo "Options:"
    echo "  --build-only    - Only build, don't deploy"
    echo "  --skip-tests    - Skip running tests"
    echo "  --force         - Force deployment without confirmation"
    echo "  --help          - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 development"
    echo "  $0 production --force"
    echo "  $0 docker --build-only"
}

# Function to run tests
run_tests() {
    if [ "$SKIP_TESTS" != "true" ]; then
        print_status "Running tests..."
        
        # Type checking
        npm run type-check
        
        # Linting
        npm run lint
        
        # Unit tests
        npm run test
        
        # E2E tests (only for staging/production)
        if [ "$ENVIRONMENT" = "staging" ] || [ "$ENVIRONMENT" = "production" ]; then
            npm run test:e2e
        fi
        
        print_success "All tests passed"
    else
        print_warning "Skipping tests as requested"
    fi
}

# Function to build application
build_application() {
    print_status "Building application..."
    
    # Install dependencies
    npm ci
    
    # Build Next.js application
    npm run build
    
    print_success "Application built successfully"
}

# Function to deploy to development
deploy_development() {
    print_status "Deploying to development environment..."
    
    # Start development server
    npm run dev &
    DEV_PID=$!
    
    print_success "Development server started (PID: $DEV_PID)"
    print_status "Application available at http://localhost:3000"
    
    # Wait for user input to stop
    read -p "Press Enter to stop the development server..."
    kill $DEV_PID
}

# Function to deploy to staging
deploy_staging() {
    print_status "Deploying to staging environment..."
    
    # Build application
    build_application
    
    # Deploy to staging server (customize based on your setup)
    if command_exists rsync; then
        rsync -avz --delete .next/ staging-server:/var/www/msc-center/
        rsync -avz --delete public/ staging-server:/var/www/msc-center/public/
        
        # Restart staging server
        ssh staging-server "pm2 restart msc-center"
        
        print_success "Deployed to staging environment"
        print_status "Staging URL:  "
    else
        print_error "rsync not found. Please install rsync or use alternative deployment method."
        exit 1
    fi
}

# Function to deploy to production
deploy_production() {
    print_status "Deploying to production environment..."
    
    # Confirmation for production deployment
    if [ "$FORCE_DEPLOY" != "true" ]; then
        echo -e "${YELLOW}⚠️  You are about to deploy to PRODUCTION!${NC}"
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Deployment cancelled"
            exit 0
        fi
    fi
    
    # Build application
    build_application
    
    # Create backup of current production
    print_status "Creating backup of current production..."
    ssh production-server "tar -czf /backups/msc-center-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/msc-center/"
    
    # Deploy to production server
    if command_exists rsync; then
        rsync -avz --delete .next/ production-server:/var/www/msc-center/
        rsync -avz --delete public/ production-server:/var/www/msc-center/public/
        
        # Restart production server
        ssh production-server "pm2 restart msc-center"
        
        # Run health check
        sleep 10
        if curl -f https://msc.edu.vn/api/health > /dev/null 2>&1; then
            print_success "Deployed to production environment successfully"
            print_status "Production URL: https://msc.edu.vn"
        else
            print_error "Health check failed. Rolling back..."
            # Rollback logic here
            exit 1
        fi
    else
        print_error "rsync not found. Please install rsync or use alternative deployment method."
        exit 1
    fi
}

# Function to deploy with Docker
deploy_docker() {
    print_status "Building and deploying with Docker..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Build Docker image
    print_status "Building Docker image..."
    docker build -t $DOCKER_IMAGE:latest .
    
    if [ "$BUILD_ONLY" = "true" ]; then
        print_success "Docker image built successfully"
        return
    fi
    
    # Stop existing container if running
    if docker ps -q -f name=$PROJECT_NAME > /dev/null; then
        print_status "Stopping existing container..."
        docker stop $PROJECT_NAME
        docker rm $PROJECT_NAME
    fi
    
    # Run new container
    print_status "Starting new container..."
    docker run -d \
        --name $PROJECT_NAME \
        -p 3000:3000 \
        --env-file .env.local \
        $DOCKER_IMAGE:latest
    
    # Wait for container to be ready
    sleep 10
    
    # Health check
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Docker deployment successful"
        print_status "Application available at http://localhost:3000"
    else
        print_error "Docker deployment failed"
        docker logs $PROJECT_NAME
        exit 1
    fi
}

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_error "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    # Login to Vercel (if not already logged in)
    if ! vercel whoami > /dev/null 2>&1; then
        print_status "Please login to Vercel..."
        vercel login
    fi
    
    # Deploy to Vercel
    if [ "$ENVIRONMENT" = "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    print_success "Deployed to Vercel successfully"
}

# Function to deploy with Docker Compose
deploy_docker_compose() {
    print_status "Deploying with Docker Compose..."
    
    if ! command_exists docker-compose; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Build and start services
    docker-compose down
    docker-compose build
    docker-compose up -d
    
    # Wait for services to be ready
    sleep 30
    
    # Health check
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Docker Compose deployment successful"
        print_status "Application available at http://localhost:3000"
        print_status "Services status:"
        docker-compose ps
    else
        print_error "Docker Compose deployment failed"
        docker-compose logs
        exit 1
    fi
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up..."
    
    # Remove build artifacts
    rm -rf .next
    rm -rf out
    rm -rf dist
    
    # Remove node_modules (optional)
    if [ "$CLEAN_MODULES" = "true" ]; then
        rm -rf node_modules
    fi
    
    print_success "Cleanup completed"
}

# Main deployment function
main() {
    # Parse arguments
    ENVIRONMENT=""
    BUILD_ONLY="false"
    SKIP_TESTS="false"
    FORCE_DEPLOY="false"
    CLEAN_MODULES="false"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            development|staging|production|docker|vercel|docker-compose)
                ENVIRONMENT="$1"
                shift
                ;;
            --build-only)
                BUILD_ONLY="true"
                shift
                ;;
            --skip-tests)
                SKIP_TESTS="true"
                shift
                ;;
            --force)
                FORCE_DEPLOY="true"
                shift
                ;;
            --clean)
                CLEAN_MODULES="true"
                shift
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Check if environment is specified
    if [ -z "$ENVIRONMENT" ]; then
        print_error "Environment not specified"
        show_usage
        exit 1
    fi
    
    # Display deployment info
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    MSC Center Website                        ║"
    echo "║                   Deployment Script v1.0                    ║"
    echo "║                                                              ║"
    echo "║  Environment: $(printf "%-43s" "$ENVIRONMENT")║"
    echo "║  Build Only:  $(printf "%-43s" "$BUILD_ONLY")║"
    echo "║  Skip Tests:  $(printf "%-43s" "$SKIP_TESTS")║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    # Run tests (unless skipped or build-only)
    if [ "$BUILD_ONLY" != "true" ]; then
        run_tests
    fi
    
    # Deploy based on environment
    case $ENVIRONMENT in
        development)
            deploy_development
            ;;
        staging)
            deploy_staging
            ;;
        production)
            deploy_production
            ;;
        docker)
            deploy_docker
            ;;
        vercel)
            deploy_vercel
            ;;
        docker-compose)
            deploy_docker_compose
            ;;
        *)
            print_error "Unknown environment: $ENVIRONMENT"
            exit 1
            ;;
    esac
    
    # Cleanup if requested
    if [ "$CLEAN_MODULES" = "true" ]; then
        cleanup
    fi
    
    print_success "Deployment completed successfully! 🚀"
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"
