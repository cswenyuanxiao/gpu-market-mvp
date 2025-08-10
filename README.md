<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPU Market — MVP</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e9ecef;
        }
        .language-toggle {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .lang-btn {
            padding: 8px 16px;
            border: 2px solid #007bff;
            background: white;
            color: #007bff;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 500;
        }
        .lang-btn.active {
            background: #007bff;
            color: white;
        }
        .lang-btn:hover {
            background: #0056b3;
            color: white;
            border-color: #0056b3;
        }
        .content {
            display: none;
        }
        .content.active {
            display: block;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ecf0f1;
        }
        h3 {
            color: #7f8c8d;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
            color: #e74c3c;
        }
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 15px 0;
        }
        pre code {
            background: none;
            color: inherit;
            padding: 0;
        }
        .highlight {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #007bff;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            background: #28a745;
            color: white;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            border-left: 3px solid #007bff;
        }
        .method {
            font-weight: bold;
            color: #007bff;
        }
        .url {
            font-family: monospace;
            color: #495057;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>GPU Market — MVP</h1>
            <div class="language-toggle">
                <button class="lang-btn active" onclick="switchLanguage('en')">English</button>
                <button class="lang-btn" onclick="switchLanguage('zh')">中文</button>
            </div>
        </div>

        <!-- English Content -->
        <div id="en" class="content active">
            <p>A minimal GPU buy/sell marketplace inspired by <code>gpused.co.uk</code>.</p>
            
            <div class="grid">
                <div class="card">
                    <h3>Backend</h3>
                    <p>Node.js + Express + SQLite (file uploads with multer)</p>
                </div>
                <div class="card">
                    <h3>Frontend</h3>
                    <p>React + Vite + TypeScript (Ant Design, React Router, React Query, Zustand)</p>
                </div>
                <div class="card">
                    <h3>Authentication</h3>
                    <p>JWT + bcrypt</p>
                </div>
            </div>

            <div class="highlight">
                <strong>Language Policy:</strong> This project uses English for all code, comments, identifiers, UI copy, and documentation. Future localizations will be added via separate resource files without mixing languages in source code.
            </div>

            <h2>🚀 Quick Start (Docker / Compose)</h2>
            <pre><code>docker compose up --build</code></pre>
            
            <div class="info">
                <strong>Access URLs:</strong><br>
                • Backend API: <code>http://localhost:3000</code><br>
                • Frontend UI: <code>http://localhost:3000</code> (served statically by backend)<br>
                • Health Check: <code>http://localhost:3000/health</code><br>
                • Swagger Docs: <code>http://localhost:3000/docs</code><br>
                • Metrics: <code>http://localhost:3000/metrics</code>
            </div>

            <p><strong>Stop stack:</strong></p>
            <pre><code>docker compose down</code></pre>

            <div class="warning">
                <strong>Note:</strong> If Docker is not installed, either install Docker Desktop for macOS, or use the Local Quick Start below.
            </div>

            <h2>⚡ One-Click Scripts</h2>
            <p><strong>Start (auto-build SPA and launch Compose):</strong></p>
            <pre><code>bash scripts/dev-up.sh</code></pre>
            
            <p><strong>Stop:</strong></p>
            <pre><code>bash scripts/dev-down.sh</code></pre>

            <h2>🔧 Quick Start (Local Development)</h2>
            
            <h3>Backend:</h3>
            <pre><code>cd backend
npm install
npm run seed
npm start</code></pre>

            <h3>Frontend:</h3>
            <p>Open <code>frontend/index.html</code> or serve the folder (e.g. <code>npx serve frontend</code>)</p>

            <div class="info">
                <strong>Local dev notes:</strong><br>
                • Use Node 20 LTS (recommended): <code>nvm install 20 && nvm use 20</code><br>
                • Avoid spaces in the project path when building native modules (e.g., <code>~/gpu-market</code> instead of <code>~/untitled folder</code>)
            </div>

            <h2>📡 API Overview</h2>
            
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/register</span> — create user
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/login</span> — get JWT
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/search</span> — listings with pagination/filters
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/gpus/:id</span> — listing details
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/gpus</span> — create listing (JWT; multipart form with image)
            </div>
            <div class="endpoint">
                <span class="method">PUT</span> <span class="url">/api/gpus/:id</span> — update listing (owner-only)
            </div>
            <div class="endpoint">
                <span class="method">DELETE</span> <span class="url">/api/gpus/:id</span> — delete listing (owner-only)
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/users/:id</span> — user profile
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/users/me/avatar</span> — upload avatar (JWT; multipart)
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/quotes</span> — submit "Sell to us" quote (multipart; field `images` for photos)
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/contact</span> — send a contact message (JSON)
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/health</span> — health check
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/robots.txt</span> — SEO robots file
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/sitemap.xml</span> — dynamic sitemap including recent listings
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/users/me</span> — get current user (JWT)
            </div>
            <div class="endpoint">
                <span class="method">PATCH</span> <span class="url">/api/users/me</span> — update display name (JWT; JSON)
            </div>

            <h2>📚 API Documentation</h2>
            <p><strong>Swagger UI:</strong> visit <code>/docs</code> on your deployed service (e.g., <code>https://gpu-market.onrender.com/docs</code>).</p>

            <h3>Example: Update display name</h3>
            <p>Requires Authorization header: <code>Authorization: Bearer &lt;token&gt;</code></p>

            <p><strong>Request:</strong></p>
            <pre><code>PATCH /api/users/me HTTP/1.1
Content-Type: application/json
Authorization: Bearer &lt;token&gt;

{ "display_name": "Alice" }</code></pre>

            <p><strong>Response (200):</strong></p>
            <pre><code>{
  "user": {
    "id": 1,
    "username": "alice",
    "display_name": "Alice",
    "avatar_path": "/uploads/abc.webp"
  },
  "token": "&lt;new_jwt_token&gt;"
}</code></pre>

            <h3>curl quickstart</h3>
            <pre><code># 1) Login to get JWT
curl -sS -X POST http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"demo"}' | jq -r .token > token.txt

# 2) Use token to get current user
curl -sS http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $(cat token.txt)" | jq

# 3) Update display name
curl -sS -X PATCH http://localhost:3000/api/users/me \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $(cat token.txt)" \
  -d '{"display_name":"Alice"}' | jq

# 4) Create a listing (multipart, example without image)
curl -sS -X POST http://localhost:3000/api/gpus \
  -H "Authorization: Bearer $(cat token.txt)" \
  -F title='RTX 3080' -F price='2999' -F condition='Used' -F brand='NVIDIA' -F vram_gb='10' | jq</code></pre>

            <h2>🔐 Authentication (Bearer token)</h2>
            <ul>
                <li><strong>Obtain token:</strong> <code>POST /api/login</code> returns <code>{ token }</code>.</li>
                <li><strong>Use token:</strong> attach header <code>Authorization: Bearer &lt;token&gt;</code> to protected endpoints (e.g., <code>POST /api/gpus</code>, <code>GET /api/my/gpus</code>, <code>PATCH /api/users/me</code>).</li>
                <li><strong>Refresh token:</strong> <code>PATCH /api/users/me</code> returns a refreshed token containing updated <code>display_name</code>. Frontend会用新 token 覆盖旧 token 以便导航栏等位置即时更新。</li>
            </ul>

            <h2>🌐 Front-end Environment Variables</h2>
            <p>Create <code>frontend-spa/.env</code> (Vite) to configure contact info:</p>
            <pre><code>VITE_CONTACT_WHATSAPP=447747310027
VITE_CONTACT_EMAIL=x1657217402@gmail.com</code></pre>

            <div class="info">
                <strong>Notes:</strong><br>
                • Dev server needs a restart after changing <code>.env</code>: <code>cd frontend-spa && npm run dev</code>.<br>
                • Production/Docker requires a rebuild to bake env into the bundle.
            </div>

            <h2>🚀 Free Deployment (Render or Railway)</h2>
            
            <h3>Option A: Render (Free Web Service)</h3>
            <ol>
                <li>Create a new Web Service from your GitHub repo.</li>
                <li>Root directory: <code>/</code> (monorepo).</li>
                <li>Build Command: <code>cd backend && npm run render-build</code></li>
                <li>Start Command: <code>cd backend && npm run render-start</code></li>
                <li>Runtime: Node 20 (set Render env <code>NODE_VERSION=20</code>).</li>
                <li>Environment variables:
                    <ul>
                        <li><code>JWT_SECRET</code> (set a strong random value)</li>
                        <li><code>CORS_ORIGIN</code> (e.g. your frontend URL or <code>*</code> for quick demo)</li>
                        <li><code>MAX_UPLOAD_MB</code> (optional, default 5)</li>
                        <li><code>MAX_IMAGE_PIXELS</code> (optional)</li>
                        <li><code>IMAGE_MAX_WIDTH</code>, <code>THUMB_WIDTH</code> (optional)</li>
                    </ul>
                </li>
            </ol>

            <div class="highlight">
                <strong>One-click with Blueprint:</strong> This repo includes <code>render.yaml</code>. On Render, click "New +" → "Blueprint" → connect this repo. It will provision a free Node Web Service using the blueprint with healthcheck <code>/health</code>, Node 18, and sane defaults.
            </div>

            <h3>Option B: Railway (Free Tier)</h3>
            <ol>
                <li>Create a new project → Service → Deploy from GitHub.</li>
                <li>Variables same as above.</li>
                <li>Start command: <code>cd backend && node index.js</code></li>
            </ol>

            <h2>📊 Observability (Prometheus)</h2>
            <p><strong>Metrics endpoint:</strong> <code>GET /metrics</code> (Prometheus text format)</p>
            
            <p><strong>Built-in metrics:</strong></p>
            <ul>
                <li><strong>HTTP:</strong> <code>http_request_duration_seconds</code>, <code>http_requests_total</code>, <code>http_responses_total</code>, <code>http_responses_4xx_total</code>, <code>http_responses_5xx_total</code></li>
                <li><strong>Upload guard:</strong> <code>upload_failures_total</code></li>
                <li><strong>Business:</strong>
                    <ul>
                        <li>Quotes: <code>quotes_created_total</code>, <code>quotes_failed_total{reason="invalid_image|server"}</code></li>
                        <li>Contact: <code>contact_messages_created_total</code>, <code>contact_messages_failed_total{reason="server"}</code></li>
                    </ul>
                </li>
            </ul>

            <h2>🔧 Development</h2>
            <ul>
                <li><strong>Tests:</strong> <code>cd backend && npm test</code></li>
                <li><strong>CI:</strong> GitHub Actions runs on push/PR</li>
            </ul>

            <h3>Frontend (React + Vite + TS)</h3>
            <ul>
                <li><strong>Dev:</strong> <code>cd frontend-spa && npm install && npm run dev</code> (proxy 到 <code>http://localhost:3000</code>)</li>
                <li><strong>Build:</strong> <code>npm run build</code>（产出到 <code>frontend/dist/</code>，由后端静态托管）</li>
            </ul>

            <h2>📋 Requirements</h2>
            <p>For the up-to-date, consolidated delivery requirements covering scope, status (what's done vs remaining), acceptance for delivery-first, and M1 hardening plan, see <code>docs/requirements.md</code>.</p>

            <h2>🔍 SEO & Performance</h2>
            <ul>
                <li>Meta tags and Open Graph added to <code>frontend/index.html</code> with dynamic canonical URL. Added <code>keywords</code> and <code>theme-color</code>.</li>
                <li>Backend serves <code>robots.txt</code> and <code>sitemap.xml</code> (includes homepage and up to 50 latest listings).</li>
                <li>Static assets served with cache headers from Express (immutable year-long for non-HTML, no-cache for HTML). Consider a CDN for production.</li>
            </ul>

            <h2>📝 License</h2>
            <p>MIT</p>
        </div>

        <!-- Chinese Content -->
        <div id="zh" class="content">
            <p>一个受 <code>gpused.co.uk</code> 启发的极简GPU买卖市场。</p>
            
            <div class="grid">
                <div class="card">
                    <h3>后端</h3>
                    <p>Node.js + Express + SQLite (使用multer进行文件上传)</p>
                </div>
                <div class="card">
                    <h3>前端</h3>
                    <p>React + Vite + TypeScript (Ant Design, React Router, React Query, Zustand)</p>
                </div>
                <div class="card">
                    <h3>认证</h3>
                    <p>JWT + bcrypt</p>
                </div>
            </div>

            <div class="highlight">
                <strong>语言政策：</strong> 本项目在所有代码、注释、标识符、UI文案和文档中使用英文。未来的本地化将通过单独的资源文件添加，不会在源代码中混合语言。
            </div>

            <h2>🚀 快速开始 (Docker / Compose)</h2>
            <pre><code>docker compose up --build</code></pre>
            
            <div class="info">
                <strong>访问地址：</strong><br>
                • 后端API: <code>http://localhost:3000</code><br>
                • 前端UI: <code>http://localhost:3000</code> (由后端静态托管)<br>
                • 健康检查: <code>http://localhost:3000/health</code><br>
                • Swagger文档: <code>http://localhost:3000/docs</code><br>
                • 指标监控: <code>http://localhost:3000/metrics</code>
            </div>

            <p><strong>停止服务：</strong></p>
            <pre><code>docker compose down</code></pre>

            <div class="warning">
                <strong>注意：</strong> 如果未安装Docker，请安装Docker Desktop for macOS，或使用下面的本地快速开始方式。
            </div>

            <h2>⚡ 一键脚本</h2>
            <p><strong>启动（自动构建SPA并启动Compose）：</strong></p>
            <pre><code>bash scripts/dev-up.sh</code></pre>
            
            <p><strong>停止：</strong></p>
            <pre><code>bash scripts/dev-down.sh</code></pre>

            <h2>🔧 快速开始 (本地开发)</h2>
            
            <h3>后端：</h3>
            <pre><code>cd backend
npm install
npm run seed
npm start</code></pre>

            <h3>前端：</h3>
            <p>打开 <code>frontend/index.html</code> 或服务文件夹 (例如 <code>npx serve frontend</code>)</p>

            <div class="info">
                <strong>本地开发说明：</strong><br>
                • 使用Node 20 LTS（推荐）：<code>nvm install 20 && nvm use 20</code><br>
                • 构建原生模块时避免项目路径中的空格 (例如，使用 <code>~/gpu-market</code> 而不是 <code>~/untitled folder</code>)
            </div>

            <h2>📡 API概览</h2>
            
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/register</span> — 创建用户
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/login</span> — 获取JWT
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/search</span> — 带分页/过滤的商品列表
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/gpus/:id</span> — 商品详情
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/gpus</span> — 创建商品（JWT；带图片的多部分表单）
            </div>
            <div class="endpoint">
                <span class="method">PUT</span> <span class="url">/api/gpus/:id</span> — 更新商品（仅所有者）
            </div>
            <div class="endpoint">
                <span class="method">DELETE</span> <span class="url">/api/gpus/:id</span> — 删除商品（仅所有者）
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/users/:id</span> — 用户资料
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/users/me/avatar</span> — 上传头像（JWT；多部分）
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/quotes</span> — 提交"卖给我们"报价（多部分；images字段用于照片）
            </div>
            <div class="endpoint">
                <span class="method">POST</span> <span class="url">/api/contact</span> — 发送联系消息（JSON）
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/health</span> — 健康检查
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/robots.txt</span> — SEO机器人文件
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/sitemap.xml</span> — 动态站点地图（包含最新商品）
            </div>
            <div class="endpoint">
                <span class="method">GET</span> <span class="url">/api/users/me</span> — 获取当前用户（JWT）
            </div>
            <div class="endpoint">
                <span class="method">PATCH</span> <span class="url">/api/users/me</span> — 更新显示名称（JWT；JSON）
            </div>

            <h2>📚 API文档</h2>
            <p><strong>Swagger UI：</strong> 访问部署服务上的 <code>/docs</code> (例如，<code>https://gpu-market.onrender.com/docs</code>)。</p>

            <h3>示例：更新显示名称</h3>
            <p>需要Authorization头：<code>Authorization: Bearer &lt;token&gt;</code></p>

            <p><strong>请求：</strong></p>
            <pre><code>PATCH /api/users/me HTTP/1.1
Content-Type: application/json
Authorization: Bearer &lt;token&gt;

{ "display_name": "Alice" }</code></pre>

            <p><strong>响应 (200)：</strong></p>
            <pre><code>{
  "user": {
    "id": 1,
    "username": "alice",
    "display_name": "Alice",
    "avatar_path": "/uploads/abc.webp"
  },
  "token": "&lt;new_jwt_token&gt;"
}</code></pre>

            <h3>curl快速开始</h3>
            <pre><code># 1) 登录获取JWT
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
  -F title='RTX 3080' -F price='2999' -F condition='Used' -F brand='NVIDIA' -F vram_gb='10' | jq</code></pre>

            <h2>🔐 认证 (Bearer token)</h2>
            <ul>
                <li><strong>获取token：</strong> <code>POST /api/login</code> 返回 <code>{ token }</code>。</li>
                <li><strong>使用token：</strong> 在受保护的端点附加头 <code>Authorization: Bearer &lt;token&gt;</code> (例如，<code>POST /api/gpus</code>，<code>GET /api/my/gpus</code>，<code>PATCH /api/users/me</code>)。</li>
                <li><strong>刷新token：</strong> <code>PATCH /api/users/me</code> 返回包含更新 <code>display_name</code> 的刷新token。前端会用新token覆盖旧token以便导航栏等位置即时更新。</li>
            </ul>

            <h2>🌐 前端环境变量</h2>
            <p>创建 <code>frontend-spa/.env</code> (Vite) 来配置联系信息：</p>
            <pre><code>VITE_CONTACT_WHATSAPP=447747310027
VITE_CONTACT_EMAIL=x1657217402@gmail.com</code></pre>

            <div class="info">
                <strong>说明：</strong><br>
                • 更改 <code>.env</code> 后开发服务器需要重启：<code>cd frontend-spa && npm run dev</code>。<br>
                • 生产/Docker需要重新构建以将环境变量打包到bundle中。
            </div>

            <h2>🚀 免费部署 (Render或Railway)</h2>
            
            <h3>选项A：Render (免费Web服务)</h3>
            <ol>
                <li>从GitHub仓库创建新的Web服务。</li>
                <li>根目录：<code>/</code> (单体仓库)。</li>
                <li>构建命令：<code>cd backend && npm run render-build</code></li>
                <li>启动命令：<code>cd backend && npm run render-start</code></li>
                <li>运行时：Node 20 (设置Render环境变量 <code>NODE_VERSION=20</code>)。</li>
                <li>环境变量：
                    <ul>
                        <li><code>JWT_SECRET</code> (设置强随机值)</li>
                        <li><code>CORS_ORIGIN</code> (例如你的前端URL或 <code>*</code> 用于快速演示)</li>
                        <li><code>MAX_UPLOAD_MB</code> (可选，默认5)</li>
                        <li><code>MAX_IMAGE_PIXELS</code> (可选)</li>
                        <li><code>IMAGE_MAX_WIDTH</code>，<code>THUMB_WIDTH</code> (可选)</li>
                    </ul>
                </li>
            </ol>

            <div class="highlight">
                <strong>一键蓝图：</strong> 此仓库包含 <code>render.yaml</code>。在Render上，点击"New +" → "Blueprint" → 连接此仓库。它将使用蓝图配置免费的Node Web服务，包含健康检查 <code>/health</code>、Node 18和合理的默认值。
            </div>

            <h3>选项B：Railway (免费层)</h3>
            <ol>
                <li>创建新项目 → 服务 → 从GitHub部署。</li>
                <li>变量同上。</li>
                <li>启动命令：<code>cd backend && node index.js</code></li>
            </ol>

            <h2>📊 可观测性 (Prometheus)</h2>
            <p><strong>指标端点：</strong> <code>GET /metrics</code> (Prometheus文本格式)</p>
            
            <p><strong>内置指标：</strong></p>
            <ul>
                <li><strong>HTTP：</strong> <code>http_request_duration_seconds</code>，<code>http_requests_total</code>，<code>http_responses_total</code>，<code>http_responses_4xx_total</code>，<code>http_responses_5xx_total</code></li>
                <li><strong>上传保护：</strong> <code>upload_failures_total</code></li>
                <li><strong>业务：</strong>
                    <ul>
                        <li>报价：<code>quotes_created_total</code>，<code>quotes_failed_total{reason="invalid_image|server"}</code></li>
                        <li>联系：<code>contact_messages_created_total</code>，<code>contact_messages_failed_total{reason="server"}</code></li>
                    </ul>
                </li>
            </ul>

            <h2>🔧 开发</h2>
            <ul>
                <li><strong>测试：</strong> <code>cd backend && npm test</code></li>
                <li><strong>CI：</strong> GitHub Actions在push/PR时运行</li>
            </ul>

            <h3>前端 (React + Vite + TS)</h3>
            <ul>
                <li><strong>开发：</strong> <code>cd frontend-spa && npm install && npm run dev</code> (代理到 <code>http://localhost:3000</code>)</li>
                <li><strong>构建：</strong> <code>npm run build</code> (输出到 <code>frontend/dist/</code>，由后端静态托管)</li>
            </ul>

            <h2>📋 需求</h2>
            <p>有关范围、状态（已完成vs剩余）、交付优先的验收标准和M1强化计划的最新综合交付需求，请参阅 <code>docs/requirements.md</code>。</p>

            <h2>🔍 SEO和性能</h2>
            <ul>
                <li>在 <code>frontend/index.html</code> 中添加了元标签和Open Graph，带有动态规范URL。添加了 <code>keywords</code> 和 <code>theme-color</code>。</li>
                <li>后端提供 <code>robots.txt</code> 和 <code>sitemap.xml</code> (包含主页和最多50个最新商品)。</li>
                <li>Express提供带缓存头的静态资源（非HTML文件一年不可变，HTML文件无缓存）。生产环境考虑使用CDN。</li>
            </ul>

            <h2>📝 许可证</h2>
            <p>MIT</p>
        </div>
    </div>

    <script>
        function switchLanguage(lang) {
            // Hide all content
            document.querySelectorAll('.content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected language content
            document.getElementById(lang).classList.add('active');
            
            // Update button states
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Activate clicked button
            event.target.classList.add('active');
            
            // Update document language
            document.documentElement.lang = lang;
        }
    </script>
</body>
</html>
