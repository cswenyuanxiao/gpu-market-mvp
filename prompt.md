下面这套流程，能让你**用 Cursor 从 0 到 1** 做出一个“规范、可维护、可交付”的项目；同时给了**可直接粘贴**到 Cursor 的专业提示词（prompts）。你可以按模块复制使用。

---

# 一、从 0 到 1 的规范项目流程（与语言无关）

1. **确定范围与非功能要求**

   * 目标、用户故事、验收标准（AC）、性能/SLO、安全、合规、可观测性。
   * 产出：`/docs/requirements.md`

2. **选型与高层架构**

   * 语言/框架、数据库、消息队列、部署目标（容器/Serverless）、CI/CD。
   * 产出：`/docs/adr/0001-tech-stack.md`（使用 ADR 记录决策）

3. **仓库初始化**

   * `git init`、`README.md`、`LICENSE`、`CODE_OF_CONDUCT.md`、`CONTRIBUTING.md`、`SECURITY.md`
   * `.editorconfig`、`.gitignore`、`docs/`、`src/`、`tests/`

4. **统一编码与风格**

   * JS/TS：ESLint + Prettier + commitlint + lint-staged
   * Python：ruff + black + mypy（或 pyright）
   * 产出：对应配置文件与 `pre-commit` 钩子

5. **依赖与脚手架**

   * 包管理（npm/pnpm/yarn | poetry/pip-tools/uv）、基础目录结构、环境变量方案（`.env` + 示例）。
   * 产出：`/src` 基础骨架、`/scripts` 常用脚本、`Makefile` 或 `Taskfile.yml`

6. **可运行的最小端到端**（Vertical Slice）

   * 一条从入口 → 业务层 → 数据层 → 测试 → 构建 → 运行的完整链路。
   * 产出：最小服务、健康检查、一个集成测试

7. **测试体系**

   * 单测（80%+关键路径）、集成测试、端到端（可选）。
   * 产出：测试目录与覆盖率门槛（CI fail < 阀值）

8. **容器化与本地运行**

   * `Dockerfile`、`docker-compose.yml`（含 DB/依赖服务）、健康检查、最小镜像。
   * 产出：一条命令本地起全栈

9. **CI/CD**

   * 触发：PR → Lint → Test → Build → 安全扫描 → 产物 → 部署（或发布）。
   * 产出：`.github/workflows/*.yml` 或其他 CI 配置

10. **可观测性**

* 结构化日志、基础指标（RPS、p95 延迟、错误率）、重要 trace。
* 产出：`/internal/observability/*` 或中间件

11. **安全与合规**

* 依赖审计、SAST/secret 扫描、权限最小化、输入校验、速率限制。
* 产出：`/docs/threat-model.md`、CI 安全步骤

12. **文档与发布**

* 运行/调试/故障自救文档、版本语义化、变更日志。
* 产出：`CHANGELOG.md`、`docs/runbook.md`

---

# 二、在 Cursor 里的专业工作流（如何“指导”它）

**核心原则：先让 Cursor 产出计划，再让它按文件逐步实现，最后让它自审与你审。**

* **固定节奏**：规划 → 生成文件树 → 骨架 → 单元测试 → 业务实现 → 容器化 → CI/CD → 自检 → 你复核。
* **固定格式**：每次让它**先输出“计划/清单”**，你确认后再动代码；动代码时**只允许修改列出的文件**，并**给出 diff**。
* **文件粒度**：**一文件一请求**或“一小功能一请求”，避免“大而全一次生成”。
* **质量闸口**：强制通过 lint/测试/类型检查；不允许“占位实现/伪逻辑”。
* **不可泄漏**：禁止输出真实密钥；使用 `.env.example`。
* **可复现**：任何操作必须能被 `Makefile/Taskfile`、`docker-compose` 复现。

---

# 三、可直接粘贴的提示词（按阶段）

把下面这些模板复制到 Cursor 对话中，用 `{}` 补全即可。

## 1) 项目 Kickoff（让 Cursor 先做计划）

```
角色：你是我项目的 Tech Lead。请严格按“先计划、后执行”的流程。

项目背景：
- 目标：{一句话目标}
- 关键用户故事：{列出 3~5 条}
- 非功能要求：{性能/安全/可观测性/SLO 等}
- 约束：{语言/框架/数据库/部署目标 等}

请先只输出：
1) 高层架构草图（文字描述即可）
2) 文件/目录规划（树形）
3) 交付清单（最小可运行链路：从入口到测试与容器）
4) 质量闸口（lint/类型/测试覆盖率阈值/安全扫描）
5) 风险与权衡（各 3 条）

等待我确认后再动代码。
```

## 2) 初始化仓库与规范

```
根据已确认的规划，生成以下文件的完整内容（严格遵守，仅修改列出的文件）：
- README.md（包含：运行步骤、架构简图、目录说明）
- LICENSE（使用 {MIT/Apache-2.0/...}）
- CODE_OF_CONDUCT.md / CONTRIBUTING.md / SECURITY.md
- .editorconfig / .gitignore
- docs/requirements.md
- docs/adr/0001-tech-stack.md（按 ADR 模板）
输出统一 diff（统一补丁格式），不得出现占位符或伪代码。
```

## 3) 语言/框架脚手架（示例：Node/TS）

```
为 Node.js + TypeScript 项目搭建脚手架：
- 包管理：{npm/pnpm}
- 构建/运行：{tsup/tsx/nodemon 等}
- 质量：ESLint（含 import/order）、Prettier、commitlint、lint-staged、pre-commit
- 测试：{Vitest/Jest} + 覆盖率阈值 80%
- 目录：src/、tests/、scripts/
- 环境：.env.example + config 加载与校验（使用 zod 或同类）
- NPM scripts：dev、build、test、lint、format、coverage、prepare
请以文件 diff 形式输出所有新增与修改。
```

（Python 示例换成：`poetry` 或 `uv` + `ruff` + `black` + `pytest` + `mypy/pyright`，同样按 diff 输出。）

## 4) 最小纵切功能与测试

```
实现“健康检查 + 一个最小业务用例”的端到端：
- 路由/入口、服务层、数据层（可用内存或 SQLite 先打通）
- 单元测试 + 一个集成测试
- 更新 README 运行说明
以 diff 输出；所有测试需在本地可通过。
```

## 5) 容器化与本地编排

```
请编写 Dockerfile（最小镜像、非 root 运行、健康检查）与 docker-compose.yml（包含 {DB/缓存}），
并在 README 增加“一条命令本地起全栈”的说明。给出镜像体积与启动时间的优化点。输出 diff。
```

## 6) CI/CD（以 GitHub Actions 为例）

```
创建 .github/workflows/ci.yml：
- 触发：PR 与 main push
- 步骤：checkout → setup → 缓存依赖 → lint → type-check → test（含覆盖率阈值）→ 构建 → 安全/secret/依赖审计
同时创建 release 流水线（语义化版本 + 变更日志），输出 diff，并解释各 Job 的失败门槛。
```

## 7) 可观测性与运行手册

```
加入可观测性基线：
- 结构化日志（请求 id、耗时、错误）
- 关键指标（RPS、p95 延迟、错误率），提供暴露端点或 SDK 接入点
- trace 接入点（预留）
新增 docs/runbook.md（排障、常见告警、应急操作），输出 diff。
```

## 8) 安全自检

```
对项目进行一次安全自检：输入校验、权限、速率限制、CORS、依赖审计、secret 管理、容器镜像减攻面。
列出问题清单与修复 diff；不允许“以后再做”的条目。
```

## 9) 代码审查/重构提示词

```
以“高级代码审查”的角度审阅 PR：
- 指出：设计味道/循环依赖/未测试路径/错误处理/并发隐患/边界条件
- 给出具体重构建议与示例 diff
- 列出必须改动与可选改动两类
```

---

# 四、基线文件模板（可直接让 Cursor 生成）

**ADR 模板**：`docs/adr/000X-something.md`

```md
# {标题}
Date: {YYYY-MM-DD}
Status: {Proposed | Accepted | Superseded}
Context: {背景与约束}
Decision: {做法与理由}
Consequences: {好处/代价/后续动作}
```

**.editorconfig**

```
root = true
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
```

**Makefile（示例）**

```
.PHONY: setup dev lint test build docker-up docker-down
setup: ## 安装依赖/准备环境
dev:   ## 本地开发（热重载）
lint:  ## 代码质量
test:  ## 运行测试（含覆盖率）
build: ## 构建产物
docker-up:
docker-down:
```

**.env.example**

```
APP_ENV=local
PORT=3000
DB_URL=postgres://user:pass@localhost:5432/app
```

---

# 五、常见坑位（让 Cursor 帮你避开）

* **一次生成太多文件** → 强制“先计划/后 diff/再实现”，分批提交。
* **占位/伪实现** → 明确“无可交付就不提交”，测试必须跑通。
* **忘记安全与可观测性** → 把它们写进验收标准与 CI 里。
* **环境不可复现** → 所有步骤落到 Makefile/compose，并写进 README。
* **把密钥写进仓库** → 始终用 `.env.example` + secret 扫描。

---

# 六、如果你指定技术栈，我可以给到**一键可粘贴**的全套 prompts + 文件清单

比如：**Node/TS + Fastify + Prisma + Postgres**，或 **Python + FastAPI + SQLModel + Postgres**，或者 **Next.js 全栈**、**Monorepo（pnpm + Turbo）** 等。


