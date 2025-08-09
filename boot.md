在本机用 Docker 一键跑起最新前后端（后端内内置静态前端），执行：
停旧容器并清理卷（可选）
docker compose down -v
重新构建并启动（前端会在镜像内自动 build，并被后端静态托管）
docker compose build --no-cache backend && docker compose up -d --remove-orphans
查看后端日志确认监听 3000
docker logs -f gpu-market-backend
访问
后端与前端同一入口：http://localhost:3000
健康检查：http://localhost:3000/health
指标：http://localhost:3000/metrics
文档：http://localhost:3000/docs
若想本地开发前端（Vite）热更新（后端走代理）：
在一个终端
cd backend && npm install && npm start
另一个终端
cd frontend-spa && npm install && npm run dev
访问：http://localhost:5173（已代理 /api、/uploads、/health、/metrics、/docs 到 3000）
