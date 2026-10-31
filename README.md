# Hệ thống quản lý thiết bị phòng học

Sinh viên: Nguyễn Hoàng Phát - MSSV 235869

## Mô tả đề tài
Ứng dụng web quản lý thiết bị phòng học trên nền tảng đám mây: thêm, xem, tìm kiếm, cập nhật tình trạng và xóa thiết bị.

## Công nghệ sử dụng
React, Node.js, Express, MongoDB Atlas, Git/GitHub, Docker, Docker Hub, Render.

## Cấu trúc dự án
```
235869_NguyenHoangPhat/
├── backend/    # API Node.js + Express
├── frontend/   # Giao diện React
└── README.md
```

## Hướng dẫn cài đặt và chạy

### Backend
```
cd backend
npm install
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
```

(Sẽ bổ sung chi tiết ở các câu sau.)
## Chạy frontend bằng Docker

Image: https://hub.docker.com/r/hoangphat111/frontend

Địa chỉ backend được cấu hình lúc build bằng `VITE_API_URL`:

```bash
cd frontend
docker build -t hoangphat111/frontend:latest --build-arg VITE_API_URL=http://localhost:5000 .
docker run -d -p 8080:80 hoangphat111/frontend:latest
```

Hoặc dùng image có sẵn (trỏ tới backend tại http://localhost:5000):

```bash
docker pull hoangphat111/frontend:latest
docker run -d -p 8080:80 hoangphat111/frontend:latest
```

Truy cập: http://localhost:8080
cd C:\Users\PHAT\Desktop\235869_NguyenHoangPhat
git status
git add .
git commit -m "Câu 8. Triển khai backend API trên Render"
git push
## Triển khai

- Frontend (Render): https://web-235869.onrender.com
- Backend API (Render): https://api-235869.onrender.com
- Kiểm tra backend: https://api-235869.onrender.com/health
## Triển khai

- Backend API (Render): https://api-235869.onrender.com
- Kiểm tra backend: https://api-235869.onrender.com/health