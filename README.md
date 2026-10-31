# Hệ thống quản lý thiết bị phòng học

Sinh viên: Nguyễn Hoàng Phát - MSSV 235869

## Mô tả đề tài

Ứng dụng web quản lý thiết bị phòng học trên nền tảng đám mây: thêm, xem, tìm kiếm, cập nhật tình trạng và xóa thiết bị.

## Công nghệ sử dụng

React (Vite), Node.js, Express, MongoDB Atlas, Git/GitHub, Docker, Docker Hub, Render.

## Cấu trúc dự án

```
235869_NguyenHoangPhat/
├── backend/    # API Node.js + Express + Mongoose
├── frontend/   # Giao diện React
└── README.md
```

## Hướng dẫn cài đặt và chạy

### Backend

Tạo file `backend/.env` (mẫu ở `backend/.env.example`):

```
MONGODB_URI=<chuỗi kết nối MongoDB Atlas>
PORT=5000
CORS_ORIGIN=*
```

```bash
cd backend
npm install
npm start
```

Kiểm tra: http://localhost:5000/health

### Frontend

Tạo file `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

```bash
cd frontend
npm install
npm run dev
```

Truy cập: http://localhost:5173

## Chạy backend bằng Docker

Image: https://hub.docker.com/r/hoangphat111/backend

```bash
docker pull hoangphat111/backend:latest
docker run -d -p 5000:5000 \
  -e MONGODB_URI="<chuỗi kết nối MongoDB Atlas>" \
  -e PORT=5000 \
  -e CORS_ORIGIN="*" \
  hoangphat111/backend:latest
```

Build từ mã nguồn:

```bash
cd backend
docker build -t hoangphat111/backend:latest .
```

## Chạy frontend bằng Docker

Image: https://hub.docker.com/r/hoangphat111/frontend

Địa chỉ backend được cấu hình lúc build bằng `VITE_API_URL`:

```bash
cd frontend
docker build -t hoangphat111/frontend:latest --build-arg VITE_API_URL=http://localhost:5000 .
docker run -d -p 8080:80 hoangphat111/frontend:latest
```

Hoặc dùng image có sẵn (trỏ tới backend đã triển khai):

```bash
docker pull hoangphat111/frontend:latest
docker run -d -p 8080:80 hoangphat111/frontend:latest
```

Truy cập: http://localhost:8080

## Triển khai

- Frontend (Render): https://web-235869.onrender.com
- Backend API (Render): https://api-235869.onrender.com
- Kiểm tra backend: https://api-235869.onrender.com/health

## Thông tin nộp bài

| Trường | Nội dung |
|---|---|
| Link_GitHub | https://github.com/KatsuraDesu/235869_NguyenHoangPhat |
| Link_Docker_Backend | https://hub.docker.com/r/hoangphat111/backend |
| Link_Docker_Frontend | https://hub.docker.com/r/hoangphat111/frontend |
| Link_Render_App | https://web-235869.onrender.com |
| Link_Render_API | https://api-235869.onrender.com |
| Link_Data_MongoDB | Database 235869_NguyenHoangPhat, collection devices (MongoDB Atlas) |