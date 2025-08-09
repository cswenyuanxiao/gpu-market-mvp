# Database Setup Guide

## 问题说明

在 Render 等容器化平台上，SQLite 文件数据库会在每次部署时被重置，导致用户数据丢失。这是因为：

1. **容器文件系统是临时的**：每次部署创建新容器实例
2. **SQLite 存储在容器内**：数据随容器销毁而丢失
3. **免费计划无持久化磁盘**：Render 的持久化磁盘需要付费计划

## 解决方案：PostgreSQL 数据库

我们已经实现了数据库适配器，支持：

- **开发环境**：SQLite（本地文件）
- **生产环境**：PostgreSQL（Render 托管数据库）

## 设置步骤

### 1. 在 Render 上创建 PostgreSQL 数据库

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 "New +" → "PostgreSQL"
3. 配置数据库：
   - **Name**: `gpu-market-db`
   - **Database**: `gpu_market`
   - **User**: `gpu_market_user`
   - **Region**: 选择与 Web Service 相同的区域
   - **Plan**: Free（足够开发使用）

4. 创建后，复制 **External Database URL**

### 2. 更新 Render Web Service 配置

1. 进入你的 Web Service 设置
2. 在 "Environment Variables" 中添加：
   ```
   DATABASE_URL = [粘贴上面复制的数据库 URL]
   NODE_ENV = production
   ```

### 3. 重新部署

推送代码到 GitHub，Render 会自动：

1. 安装 `pg` 依赖包
2. 检测到 `DATABASE_URL` 环境变量
3. 使用 PostgreSQL 而非 SQLite
4. 自动创建所需的表结构

## 验证部署

部署完成后，检查日志应该看到：

```
🐘 Using PostgreSQL database
✅ Database initialized
```

## 本地开发

本地开发时，无需 PostgreSQL：

```bash
cd backend
npm install
npm run seed  # 使用 SQLite
npm start
```

## 数据迁移

如果需要从现有 SQLite 迁移数据：

1. **导出现有数据**（本地）：

```bash
cd backend
node -e "
const Database = require('better-sqlite3');
const db = new Database('data.db');
console.log('Users:', db.prepare('SELECT * FROM users').all());
console.log('GPUs:', db.prepare('SELECT * FROM gpus').all());
"
```

2. **手动在生产环境重新创建**：
   - 重新注册用户账户
   - 重新添加商品

## 优势

✅ **数据持久化**：部署后数据不再丢失  
✅ **免费方案**：Render PostgreSQL 有免费额度  
✅ **自动备份**：Render 提供数据库备份  
✅ **可扩展性**：支持更多并发用户  
✅ **兼容性**：本地开发仍使用 SQLite

## 故障排除

### 连接失败

- 检查 `DATABASE_URL` 环境变量是否正确设置
- 确保数据库和 Web Service 在同一区域

### 表不存在

- 检查部署日志中的 "Database initialized" 消息
- 数据库适配器会自动创建所有必需的表

### 性能问题

- Render 免费 PostgreSQL 有连接数限制
- 考虑升级到付费计划以获得更好性能

## 技术细节

数据库适配器 (`backend/database.js`) 提供：

- 统一的 API（`query`, `get`, `run`）
- 自动 SQL 方言转换（SQLite ↔ PostgreSQL）
- 连接池管理
- 错误处理和重试逻辑
