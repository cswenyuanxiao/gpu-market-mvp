### 停止与再次运行（Docker Compose 推荐）

- 前台运行中停止
  - 在运行窗口按 Ctrl+C
  - 或在新终端执行：
    ```bash
    docker compose stop
    ```

- 下次再次运行（前台/后台二选一）
  - 前台：
    ```bash
    cd "/Users/wenyuan/Desktop/untitled folder"
    docker compose up --build
    ```
  - 后台（推荐）：
    ```bash
    docker compose up -d --build
    docker compose logs -f backend
    ```

- 完整停止并清理容器（下次会重新初始化数据库并执行种子数据）
  ```bash
  docker compose down
  ```

- 仅重启容器（保留容器内数据）
  ```bash
  docker compose restart
  ```

- 代码变更后（后端）重建并热更新
  ```bash
  docker compose build backend
  docker compose up -d backend
  ```
  前端 `./frontend` 以只读挂载到 Nginx，改完文件刷新页面即可，无需重建。

- 是否保留数据的差异
  - 保留数据：用 `docker compose stop/start/restart`（容器未删除，容器内 `data.db` 仍在）
  - 重置数据：用 `docker compose down`（容器被删除，下一次 up 会重新创建并运行 `seed.js`）

### 本地原生运行（如暂不使用 Docker）
- 停止：运行窗口 Ctrl+C
- 再次运行：
  ```bash
  cd "/Users/wenyuan/Desktop/untitled folder/backend"
  npm run seed
  npm start
  ```
- 重置数据库（清空数据后再种子）：
  ```bash
  rm "/Users/wenyuan/Desktop/untitled folder/backend/data.db"
  npm run seed
  npm start
  ```
- 建议使用 Node 18 LTS，并尽量避免项目路径包含空格（native 模块编译更稳）。

- 端口占用排查（如 3000/8080 撞端口）：
  ```bash
  lsof -i :3000
  lsof -i :8080
  ```

- 环境变量变更后（Docker）：一般执行
  ```bash
  docker compose down
  docker compose up -d --build
  ```

- Compose 警告 version 字段已过时：不影响运行。如果你需要，我可以删除 `docker-compose.yml` 顶部的 `version:` 行来消除提示。

- 访问地址
  - 前端: http://localhost:8080
  - 后端: http://localhost:3000
  - 健康: http://localhost:3000/health
  - 指标: http://localhost:3000/metrics

- 日志查看
  ```bash
  docker compose logs -f backend
  docker compose logs -f frontend
  ```

- Notes 我会在后续有改动时继续更新，无需你提醒。

- 重点
  - 保留数据用 stop/start，重置数据用 down
  - 代码频繁变更时，用 up -d --build 或针对性 build backend 再 up backend

-