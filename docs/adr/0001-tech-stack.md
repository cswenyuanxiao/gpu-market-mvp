# 0001 — 技术栈与高层架构决策（ADR）

Date: 2025-08-08
Status: Accepted

## Context
- 目标：交付一个显卡二手买卖网站的 MVP，支持注册/登录、发布/编辑/删除 Listing（带图片）、搜索/筛选/分页、用户资料与头像上传。
- 约束：快速迭代、可一键本地运行（Docker Compose）、具备基本安全与可观测性基线、CI 具备最小化质量闸口。
- 现状：偏向前后端简洁实现与易部署、易测试。

## Decision
- 前端：静态页面（`frontend/`）+ Bootstrap 5 + 原生 JS，通过 `fetch` 调用 REST API，JWT 保存在 `localStorage`。
- 后端：Node.js 18 + Express，持久化选用 SQLite（`better-sqlite3`）用于 MVP；文件上传使用 `multer` 持久到本地 `uploads/`；认证采用 JWT；密码哈希使用 `bcryptjs`。
- 安全：通过 `.env` 注入 `JWT_SECRET` 与 `PORT` 等配置；开启 CORS（开发允许 localhost）、上传大小与类型限制、基本输入校验；后续引入 `helmet`、`express-rate-limit`、`zod`。
- 可观测性：结构化日志（后续 `pino-http`），基础指标与 `/metrics` 暴露（后续 `prom-client`），健康检查 `/health`。
- 测试：使用 Jest + Supertest 做单元/集成测试；为测试导出 `app` 实例。
- CI：GitHub Actions 草案流程：checkout → setup-node → cache → backend install → seed → test（覆盖率门槛可后续开启）→ 构建占位（后续补全）→ 审计（后续）。
- 容器：提供 `Dockerfile` 和 `docker-compose.yml` 以一键本地运行。

## Consequences
- 好处：
  - 技术栈轻量、学习成本低、起步与演示快；SQLite 简化依赖。
  - 清晰的 API 与前端职责分离，便于未来替换前端或服务升级。
  - 有测试/CI 基线，便于持续演进。
- 代价：
  - SQLite 与本地文件存储不适合生产高并发与大规模；需迁移到 Postgres 与对象存储。
  - 原生 JS 在前端复杂度升高时会变得难以维护；后续可能迁移到框架（如 Next.js）。
- 后续动作：
  - 引入 `helmet`、`express-rate-limit`、`zod`、`pino-http`、`prom-client`；实现 `/health` 与 `/metrics`。
  - 设计存储抽象与 S3 迁移路径；DB 迁移到 Postgres 的计划。
  - 完善 CI（覆盖率门槛 ≥ 80%，依赖与安全扫描、secret 扫描）。
