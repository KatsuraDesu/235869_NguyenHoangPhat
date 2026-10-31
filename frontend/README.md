# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
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

Build image từ mã nguồn:

```bash
cd backend
docker build -t hoangphat111/backend:latest .
```

Kiểm tra: http://localhost:5000/health