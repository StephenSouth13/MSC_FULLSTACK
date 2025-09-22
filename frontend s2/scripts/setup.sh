#!/bin/bash

# MSC Center Website Setup Script
# This script sets up the development environment for the MSC Center website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node -v | cut -d'v' -f2)
        REQUIRED_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_success "Node.js version $NODE_VERSION is compatible"
        else
            print_error "Node.js version $NODE_VERSION is not compatible. Required: >= $REQUIRED_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js >= 18.0.0"
        exit 1
    fi
}

# Function to check PostgreSQL
check_postgresql() {
    if command_exists psql; then
        print_success "PostgreSQL is installed"
    else
        print_warning "PostgreSQL is not installed. Installing..."
        
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo apt update
            sudo apt install -y postgresql postgresql-contrib
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            if command_exists brew; then
                brew install postgresql
                brew services start postgresql
            else
                print_error "Homebrew is not installed. Please install PostgreSQL manually."
                exit 1
            fi
        else
            print_error "Unsupported OS. Please install PostgreSQL manually."
            exit 1
        fi
    fi
}

# Function to check Redis
check_redis() {
    if command_exists redis-server; then
        print_success "Redis is installed"
    else
        print_warning "Redis is not installed. Installing..."
        
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo apt update
            sudo apt install -y redis-server
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            if command_exists brew; then
                brew install redis
                brew services start redis
            else
                print_error "Homebrew is not installed. Please install Redis manually."
                exit 1
            fi
        else
            print_error "Unsupported OS. Please install Redis manually."
            exit 1
        fi
    fi
}

# Function to setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        if [ -f .env.example ]; then
            cp .env.example .env.local
            print_success "Created .env.local from .env.example"
            print_warning "Please update .env.local with your actual configuration values"
        else
            print_error ".env.example file not found"
            exit 1
        fi
    else
        print_warning ".env.local already exists. Skipping..."
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing Node.js dependencies..."
    
    if [ -f yarn.lock ]; then
        if command_exists yarn; then
            yarn install
        else
            print_error "yarn.lock found but yarn is not installed. Please install yarn or remove yarn.lock"
            exit 1
        fi
    elif [ -f pnpm-lock.yaml ]; then
        if command_exists pnpm; then
            pnpm install
        else
            print_error "pnpm-lock.yaml found but pnpm is not installed. Please install pnpm or remove pnpm-lock.yaml"
            exit 1
        fi
    else
        npm install
    fi
    
    print_success "Dependencies installed successfully"
}

# Function to setup database
setup_database() {
    print_status "Setting up database..."
    
    # Check if database exists
    DB_NAME="msc_center"
    if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
        print_warning "Database $DB_NAME already exists. Skipping creation..."
    else
        print_status "Creating database $DB_NAME..."
        createdb $DB_NAME
        print_success "Database $DB_NAME created successfully"
    fi
    
    # Run migrations
    if [ -f "scripts/migrate.sh" ]; then
        print_status "Running database migrations..."
        chmod +x scripts/migrate.sh
        ./scripts/migrate.sh
        print_success "Database migrations completed"
    else
        print_warning "Migration script not found. Skipping migrations..."
    fi
}

# Function to setup Golang backend
setup_golang_backend() {
    if [ -d "backend-go" ]; then
        print_status "Setting up Golang backend..."
        cd backend-go
        
        if command_exists go; then
            go mod download
            go mod tidy
            print_success "Golang dependencies installed"
        else
            print_warning "Go is not installed. Skipping Golang backend setup..."
        fi
        
        cd ..
    else
        print_warning "backend-go directory not found. Skipping Golang setup..."
    fi
}

# Function to setup Rust backend
setup_rust_backend() {
    if [ -d "backend-rust" ]; then
        print_status "Setting up Rust backend..."
        cd backend-rust
        
        if command_exists cargo; then
            cargo build
            print_success "Rust dependencies installed"
        else
            print_warning "Rust/Cargo is not installed. Skipping Rust backend setup..."
        fi
        
        cd ..
    else
        print_warning "backend-rust directory not found. Skipping Rust setup..."
    fi
}

# Function to setup Git hooks
setup_git_hooks() {
    if [ -d ".git" ]; then
        print_status "Setting up Git hooks..."
        
        if command_exists npx; then
            npx husky install
            print_success "Git hooks installed"
        else
            print_warning "npx not found. Skipping Git hooks setup..."
        fi
    else
        print_warning "Not a Git repository. Skipping Git hooks setup..."
    fi
}

# Function to verify setup
verify_setup() {
    print_status "Verifying setup..."
    
    # Check if all required files exist
    REQUIRED_FILES=(".env.local" "package.json" "next.config.mjs" "tailwind.config.ts")
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "✓ $file exists"
        else
            print_error "✗ $file is missing"
        fi
    done
    
    # Check if services are running
    print_status "Checking services..."
    
    if pgrep -x "postgres" > /dev/null; then
        print_success "✓ PostgreSQL is running"
    else
        print_warning "✗ PostgreSQL is not running"
    fi
    
    if pgrep -x "redis-server" > /dev/null; then
        print_success "✓ Redis is running"
    else
        print_warning "✗ Redis is not running"
    fi
}

# Function to display next steps
show_next_steps() {
    print_success "Setup completed successfully! 🎉"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Update .env.local with your actual configuration values"
    echo "2. Start the development server: npm run dev"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo -e "${BLUE}Available commands:${NC}"
    echo "  npm run dev          - Start development server"
    echo "  npm run build        - Build for production"
    echo "  npm run test         - Run tests"
    echo "  npm run lint         - Run linter"
    echo "  npm run db:migrate   - Run database migrations"
    echo "  npm run db:seed      - Seed database with sample data"
    echo ""
    echo -e "${BLUE}Documentation:${NC}"
    echo "  README.md            - Project documentation"
    echo "  docs/                - Additional documentation"
    echo ""
    echo -e "${GREEN}Happy coding! 🚀${NC}"
}

# Main setup function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    MSC Center Website                        ║"
    echo "║                    Setup Script v1.0                        ║"
    echo "║                                                              ║"
    echo "║  This script will set up your development environment       ║"
    echo "║  for the MSC Center website project.                        ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    print_status "Starting setup process..."
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_node_version
    check_postgresql
    check_redis
    
    # Setup project
    setup_env
    install_dependencies
    setup_database
    setup_golang_backend
    setup_rust_backend
    setup_git_hooks
    
    # Verify and show next steps
    verify_setup
    show_next_steps
}

# Run main function
main "$@"
