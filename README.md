
# 🚀 MSC Full-Stack Educational Platform  

<div align="center">
![alt text](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

![alt text](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go)

![alt text](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)

![alt text](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

![alt text](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github)
Một nền tảng giáo dục thế hệ mới, được xây dựng từ gốc với kiến trúc full-stack hiện đại, hiệu năng cao và khả năng mở rộng.
✨ Tính năng • 🏗️ Kiến trúc • 🚀 Khởi động nhanh • 🛠️ Phát triển • 🚢 Triển khai
</div>
🌟 Tầm nhìn dự án
MSC Platform không chỉ là một trang web học tập, mà là một hệ sinh thái giáo dục hoàn chỉnh. Dự án này kết hợp một Frontend Next.js mượt mà, giàu tương tác với một Backend Go mạnh mẽ, an toàn và hiệu suất cao, nhằm mang lại trải nghiệm học tập tốt nhất cho cả học viên và người hướng dẫn.
✨ Tính năng nổi bật
🎓 Quản lý khóa học tương tác: Giao diện kéo-thả để tạo và quản lý khóa học.
🤖 Công cụ AI thông minh: Chatbot hỗ trợ 24/7, gợi ý lộ trình học tập cá nhân hóa.
🎥 Lớp học ảo & Livestream: Tích hợp video call HD, bảng trắng cộng tác và chat thời gian thực.
📊 Theo dõi tiến độ & Gamification: Hệ thống điểm, cấp độ, huy hiệu và bảng xếp hạng.
🎨 CMS Trực quan cho Editor: Giao diện quản trị nội dung mạnh mẽ, dễ sử dụng.
🔐 Bảo mật toàn diện: Xác thực JWT, phân quyền theo vai trò (RBAC), bảo vệ API.
📱 Hỗ trợ Progressive Web App (PWA): Trải nghiệm như ứng dụng native, hoạt động offline.
🏗️ Kiến trúc tổng thể
Hệ thống được thiết kế theo kiến trúc tách biệt (decoupled), giúp dễ dàng phát triển, bảo trì và mở rộng độc lập giữa Frontend và Backend.
Tech Stack
Phần	Công nghệ
🖥️ Frontend	Next.js 14+, React 18, TypeScript, Tailwind CSS, Framer Motion
⚙️ Backend	Go 1.22+, Gin Gonic, GORM, PostgreSQL, Gorilla WebSocket
🐳 DevOps	Docker, Docker Compose, GitHub Actions
💾 Database	PostgreSQL, Redis (Caching)
☁️ Services	Cloudflare R2 (Storage), Agora (Video), OpenAI/Gemini (AI)
🚀 Khởi động nhanh (với Docker)
Cách đơn giản và nhanh nhất để chạy toàn bộ hệ thống trên máy của bạn.
Yêu cầu
Git
Docker & Docker Compose
Các bước thực hiện
Clone repository:
code
Bash
git clone https://github.com/StephenSouth13/MSC_FULLSTACK.git
cd MSC_FULLSTACK

# Tạo file env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Chạy toàn hệ thống
docker-compose up --build
```

✅ Sau khi chạy:  
- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:8080](http://localhost:8080)  

---

## 📁 Cấu trúc dự án  

```bash
MSC_FULLSTACK/
├── backend/             # Go Backend Service
│   ├── cmd/
│   ├── internal/
│   ├── db/
│   ├── Dockerfile
│   └── go.mod
│
├── frontend/            # Next.js Frontend
│   ├── src/
│   ├── public/
│   ├── next.config.js
│   └── package.json
│
├── docker-compose.yml   # Điều phối toàn hệ thống
└── README.md
```

---

## 🛠️ Phát triển (Không dùng Docker)  

### 1. Backend (Go)  

```bash
cd backend
go mod tidy

# (Tùy chọn) chạy migrations
# migrate -path db/migrations -database $DATABASE_URL up

# Chạy server
go run ./cmd/server/main.go
# hoặc dùng Air để hot-reload
```

➡️ Backend chạy tại: **http://localhost:8080**  

### 2. Frontend (Next.js)  

```bash
cd frontend
npm install
npm run dev
🎨 Frontend sẽ chạy tại http://localhost:3000.
🚢 Triển khai (Deployment)
Đây là chiến lược triển khai được đề xuất cho môi trường production.
Backend (Go Service):
Build Docker Image: Tạo một Docker image tối ưu cho production.
Deploy: Triển khai image này lên một máy chủ ảo (VPS) như DigitalOcean, Hetzner, Vultr hoặc các nền tảng container như AWS ECS, Google Cloud Run.
Database: Sử dụng một dịch vụ managed database (ví dụ: Neon, Supabase DB, AWS RDS) để đảm bảo tính ổn định và khả năng backup.
Frontend (Next.js):
Nền tảng: Sử dụng Vercel (bởi những người tạo ra Next.js) hoặc Netlify.
Quy trình: Kết nối repository GitHub của bạn với Vercel/Netlify. Quá trình build và deploy sẽ được tự động hóa mỗi khi bạn push code lên branch main.
🤝 Đóng góp
Chúng tôi luôn chào đón các đóng góp để làm cho MSC Platform tốt hơn! Vui lòng tuân theo quy trình sau:
Fork repository này.
Tạo một branch mới (git checkout -b feature/ten-tinh-nang).
Thực hiện thay đổi và commit (git commit -m 'feat: Them tinh nang XYZ').
Push lên branch của bạn (git push origin feature/ten-tinh-nang).
Tạo một Pull Request.