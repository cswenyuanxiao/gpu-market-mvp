# GPU Market — MVP

一个受 `gpused.co.uk` 启发的极简GPU买卖市场。

- **后端**: Node.js + Express + SQLite (使用multer进行文件上传)
- **前端**: React + Vite + TypeScript (Ant Design, React Router, React Query, Zustand)
- **认证**: JWT + bcrypt

## 语言政策

本项目在所有代码、注释、标识符、UI文案和文档中使用英文。未来的本地化将通过单独的资源文件添加，不会在源代码中混合语言。

## 快速开始 (Docker / Compose)

```bash
docker compose up --build
```

**访问地址:**
- 后端API: `http://localhost:3000`
- 前端UI: `http://localhost:3000` (由后端静态托管)
- 健康检查: `http://localhost:3000/health`
- Swagger文档: `http://localhost:3000/docs`
- 指标监控: `http://localhost:3000/metrics`

**停止服务:**
```bash
docker compose down
```

> **注意:** 如果未安装Docker，请安装Docker Desktop for macOS，或使用下面的本地快速开始方式。

## 一键脚本

**启动（自动构建SPA并启动Compose）:**
```bash
bash scripts/dev-up.sh
```

**停止:**
```bash
bash scripts/dev-down.sh
```

## 快速开始 (本地开发)

### 后端:
```bash
cd backend
npm install
npm run seed
npm start
```

### 前端:
打开 `frontend/index.html` 或服务文件夹 (例如 `npx serve frontend`)

> **本地开发说明:**
> - 使用Node 20 LTS（推荐）: `nvm install 20 && nvm use 20`
> - 构建原生模块时避免项目路径中的空格 (例如，使用 `~/gpu-market` 而不是 `~/untitled folder`)

## API概览

| 方法 | 端点 | 描述 |
|------|------|------|
| `POST` | `/api/register` | 创建用户 |
| `POST` | `/api/login` | 获取JWT |
| `GET` | `/api/search` | 带分页/过滤的商品列表 |
| `GET` | `/api/gpus/:id` | 商品详情 |
| `POST` | `/api/gpus` | 创建商品（JWT；带图片的多部分表单） |
| `PUT` | `/api/gpus/:id` | 更新商品（仅所有者） |
| `DELETE` | `/api/gpus/:id` | 删除商品（仅所有者） |
| `GET` | `/api/users/:id` | 用户资料 |
| `POST` | `/api/users/me/avatar` | 上传头像（JWT；多部分） |
| `POST` | `/api/quotes` | 提交"卖给我们"报价（多部分；images字段用于照片） |
| `POST` | `/api/contact` | 发送联系消息（JSON） |
| `GET` | `/health` | 健康检查 |
| `GET` | `/robots.txt` | SEO机器人文件 |
| `GET` | `/sitemap.xml` | 动态站点地图（包含最新商品） |
| `GET` | `/api/users/me` | 获取当前用户（JWT） |
| `PATCH` | `/api/users/me` | 更新显示名称（JWT；JSON） |

## API文档

**Swagger UI:** 访问部署服务上的 `/docs` (例如，`https://gpu-market.onrender.com/docs`)。

### 示例：更新显示名称

需要Authorization头：`Authorization: Bearer <token>`

**请求:**
```http
PATCH /api/users/me HTTP/1.1
Content-Type: application/json
Authorization: Bearer <token>

{ "display_name": "Alice" }
```

**响应 (200):**
```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "display_name": "Alice",
    "avatar_path": "/uploads/abc.webp"
  },
  "token": "<new_jwt_token>"
}
```

### curl快速开始

```bash
# 1) 登录获取JWT
curl -sS -X POST http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"demo"}' | jq -r .token > token.txt

# 2) 使用token获取当前用户
curl -sS http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $(cat token.txt)" | jq

# 3) 更新显示名称
curl -sS -X PATCH http://localhost:3000/api/users/me \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $(cat token.txt)" \
  -d '{"display_name":"Alice"}' | jq

# 4) 创建商品（多部分，无图片示例）
curl -sS -X POST http://localhost:3000/api/gpus \
  -H "Authorization: Bearer $(cat token.txt)" \
  -F title='RTX 3080' -F price='2999' -F condition='Used' -F brand='NVIDIA' -F vram_gb='10' | jq
```

## 认证 (Bearer token)

- **获取token:** `POST /api/login` 返回 `{ token }`。
- **使用token:** 在受保护的端点附加头 `Authorization: Bearer <token>` (例如，`POST /api/gpus`，`GET /api/my/gpus`，`PATCH /api/users/me`)。
- **刷新token:** `PATCH /api/users/me` 返回包含更新 `display_name` 的刷新token。前端会用新token覆盖旧token以便导航栏等位置即时更新。

## 前端环境变量

创建 `frontend-spa/.env` (Vite) 来配置联系信息：

```env
VITE_CONTACT_WHATSAPP=447747310027
VITE_CONTACT_EMAIL=x1657217402@gmail.com
```

> **说明:**
> - 更改 `.env` 后开发服务器需要重启：`cd frontend-spa && npm run dev`。
> - 生产/Docker需要重新构建以将环境变量打包到bundle中。

## 免费部署 (Render或Railway)

### 选项A：Render (免费Web服务)

1. 从GitHub仓库创建新的Web服务。
2. 根目录：`/` (单体仓库)。
3. 构建命令：`cd backend && npm run render-build`
4. 启动命令：`cd backend && npm run render-start`
5. 运行时：Node 20 (设置Render环境变量 `NODE_VERSION=20`)。
6. 环境变量：
   - `JWT_SECRET` (设置强随机值)
   - `CORS_ORIGIN` (例如你的前端URL或 `*` 用于快速演示)
   - `MAX_UPLOAD_MB` (可选，默认5)
   - `MAX_IMAGE_PIXELS` (可选)
   - `IMAGE_MAX_WIDTH`，`THUMB_WIDTH` (可选)

> **一键蓝图:** 此仓库包含 `render.yaml`。在Render上，点击"New +" → "Blueprint" → 连接此仓库。它将使用蓝图配置免费的Node Web服务，包含健康检查 `/health`、Node 18和合理的默认值。

### 选项B：Railway (免费层)

1. 创建新项目 → 服务 → 从GitHub部署。
2. 变量同上。
3. 启动命令：`cd backend && node index.js`

## 可观测性 (Prometheus)

**指标端点:** `GET /metrics` (Prometheus文本格式)

**内置指标:**
- **HTTP:** `http_request_duration_seconds`，`http_requests_total`，`http_responses_total`，`http_responses_4xx_total`，`http_responses_5xx_total`
- **上传保护:** `upload_failures_total`
- **业务:**
  - 报价：`quotes_created_total`，`quotes_failed_total{reason="invalid_image|server"}`
  - 联系：`contact_messages_created_total`，`contact_messages_failed_total{reason="server"}`

## 开发

- **测试:** `cd backend && npm test`
- **CI:** GitHub Actions在push/PR时运行

### 前端 (React + Vite + TS)

- **开发:** `cd frontend-spa && npm install && npm run dev` (代理到 `http://localhost:3000`)
- **构建:** `npm run build` (输出到 `frontend/dist/`，由后端静态托管)

## 需求

有关范围、状态（已完成vs剩余）、交付优先的验收标准和M1强化计划的最新综合交付需求，请参阅 `docs/requirements.md`。

## SEO和性能

- 在 `frontend/index.html` 中添加了元标签和Open Graph，带有动态规范URL。添加了 `keywords` 和 `theme-color`。
- 后端提供 `robots.txt` 和 `sitemap.xml` (包含主页和最多50个最新商品)。
- Express提供带缓存头的静态资源（非HTML文件一年不可变，HTML文件无缓存）。生产环境考虑使用CDN。

## 许可证

MIT

---

<div align="center">
  <a href="README.md">📖 View English README</a>
</div>
