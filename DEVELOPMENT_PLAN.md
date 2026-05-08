# DEVELOPMENT PLAN: board de markting

## 1. ARCHITECTURE OVERVIEW

**System Components:**
- **Frontend SPA:** React 18 + TypeScript, Vite, Zustand, React Query, Axios. Implements Kanban board UI, user management, content cards, file uploads, notifications, and board metrics. Strictly follows the provided UI/UX contract.
- **Backend Monolith:** Node.js 20 + Express 4, TypeScript, TypeORM, PostgreSQL 15. Modular structure with routes/controllers/services for users, boards, columns, cards, attachments, tags, notifications, and metrics. JWT authentication, RBAC, file upload to AWS S3.
- **Database:** PostgreSQL 15, schema defined via TypeORM entities and migration SQL.
- **Object Storage:** AWS S3 for file attachments.
- **Infrastructure:** Docker Compose for local orchestration, multi-stage Dockerfiles for frontend/backend, healthchecks, .env management, run.sh for zero-manual setup.

**Folder Structure:**
```
project-root/
├── frontend/
│   ├── src/
│   └── Dockerfile
├── backend/
│   ├── Dockerfile
│   └── src/
├── shared/
│   ├── types.ts
│   ├── config.ts
│   └── utils.ts
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── run.sh
├── README.md
└── docs/
    └── architecture.md
```

**Key Models & APIs:**  
- **User, Board, KanbanColumn, ContentCard, Attachment, Tag, Notification, BoardMetrics** (see SPEC.md §2)
- **API Endpoints:** As per SPEC.md §3 (auth, users, boards, columns, cards, attachments, tags, notifications, metrics)
- **Frontend State:** Zustand stores per SPEC.md §7

**Quality Standards:**  
- Healthcheck endpoints, structured logging, strict env validation, error handling, RBAC, input validation, Docker best practices, zero manual steps.

---

## 2. ACCEPTANCE CRITERIA

1. The system provides a Kanban board for marketing content, allowing users to create, update, move, and view content cards, with all state changes persisted and reflected in real time.
2. User authentication and RBAC are enforced: only authorized users can access/modify resources according to their role (admin, editor, viewer).
3. File attachments are uploaded to and served from AWS S3, with secure access and metadata tracked per card.
4. The system is fully containerized; running `./run.sh` brings up all services, with healthchecks passing and the frontend accessible at the documented URL.
5. All endpoints and UI strictly match the data contracts, API endpoints, and file structure defined in SPEC.md, with no deviations or extra features.

---

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
Every executable item MUST include exactly one line at the end of the item block (after Validation):
**Role:** <role_id> (<category>)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, DB schemas, config

**Goal:**  
Create all shared code and contracts required by both backend and frontend. This includes TypeScript interfaces, shared config, utility functions, and the initial PostgreSQL schema (SQL). All other items will import from these files.

**Files to create:**
- shared/types.ts (create) — All TypeScript interfaces, enums, and shared types as per SPEC.md §2 (User, Board, KanbanColumn, ContentCard, Attachment, Tag, Notification, BoardMetrics, Paginated, etc.)
- shared/config.ts (create) — Shared constants, environment variable validation logic (for both frontend and backend), e.g., API URLs, S3 config, JWT secrets, etc.
- shared/utils.ts (create) — Shared utility functions (date formatting, error helpers, etc.) used across frontend and backend.
- backend/src/db/schema.sql (create) — Complete PostgreSQL schema: tables for users, boards, columns, cards, attachments, tags, notifications, with indexes and foreign keys as per SPEC.md §2.

**Dependencies:** None

**Validation:**  
- `shared/types.ts` exports all interfaces exactly as in SPEC.md §2.
- `shared/config.ts` throws on missing required env vars.
- `backend/src/db/schema.sql` can be applied to a fresh PostgreSQL 15 instance and creates all required tables and indexes.

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — API: Auth, Users, Boards, Columns, Cards, Attachments, Tags, Notifications, Metrics

**Goal:**  
Implement the entire backend API as a modular Node.js 20 + Express 4 app in TypeScript, following the monolith modular pattern. Includes all endpoints from SPEC.md §3, JWT authentication, RBAC, file upload to S3, and structured logging. Uses TypeORM for DB access, express-validator for input validation, and dotenv for env management.

**Files to create:**
- backend/Dockerfile (create) — Multi-stage build, non-root user, exposes port 4000, runs `node dist/index.js`
- backend/src/index.ts (create) — Process bootstrap, loads env, starts Express server, connects to DB, sets up healthcheck
- backend/src/app.ts (create) — Express app setup, registers all routers, error handler, logging middleware
- backend/src/routes/auth.ts (create) — Auth endpoints: POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
- backend/src/routes/users.ts (create) — User management endpoints
- backend/src/routes/boards.ts (create) — Board CRUD endpoints
- backend/src/routes/columns.ts (create) — Kanban columns endpoints
- backend/src/routes/cards.ts (create) — Content cards endpoints
- backend/src/routes/attachments.ts (create) — File upload endpoints (S3 integration)
- backend/src/routes/tags.ts (create) — Tag endpoints
- backend/src/routes/notifications.ts (create) — Notification endpoints
- backend/src/controllers/ (create) — One controller per route file (authController.ts, userController.ts, etc.)
- backend/src/services/ (create) — One service per domain (authService.ts, userService.ts, etc.)
- backend/src/models/ (create) — TypeORM entities for all models (User.ts, Board.ts, etc.)
- backend/src/middlewares/ (create) — auth.ts (JWT/RBAC), errorHandler.ts, validate.ts
- backend/src/utils/ (create) — jwt.ts (JWT helpers), s3.ts (S3 upload/download), password.ts (bcrypt helpers)
- backend/src/config/ (create) — db.ts (TypeORM config), s3.ts (S3 config)
- backend/src/types/ (create) — index.d.ts, api.d.ts (for Express/TypeScript types)
- backend/shared/ (create) — constants.ts, types.ts, utils.ts (symlink or copy from shared/)
- backend/package.json (create) — All dependencies, scripts (build, start, dev, lint)
- backend/tsconfig.json (create) — TypeScript config (strict mode, paths)
- backend/.env.example (create) — Backend-specific env vars (DB, S3, JWT, etc.)

**Dependencies:** Item 1

**Validation:**  
- `docker build -t board-backend ./backend` succeeds
- `docker run -e ... board-backend` starts, connects to DB, healthcheck at `/health` returns 200
- All endpoints respond as per SPEC.md §3, with correct RBAC and input validation

**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — SPA: Kanban Board, Auth, Users, Cards, Attachments, Notifications, Metrics

**Goal:**  
Implement the frontend SPA using React 18 + TypeScript + Vite, strictly following the UI/UX contract. Implements all user flows: login, Kanban board (drag & drop), card CRUD, file upload, notifications, user management, and board metrics. Uses Zustand for state, React Query for server state, Axios for HTTP, react-beautiful-dnd for drag-and-drop, and all UI primitives as per SPEC.md.

**Files to create:**
- frontend/Dockerfile (create) — Multi-stage build (Vite → Nginx), exposes port 80, serves built SPA
- frontend/vite.config.ts (create) — Vite config, env vars for API URL
- frontend/tsconfig.json (create) — TypeScript config (strict mode)
- frontend/public/index.html (create) — HTML entrypoint
- frontend/public/favicon.svg (create) — Favicon
- frontend/src/main.tsx (create) — React entrypoint, mounts App
- frontend/src/App.tsx (create) — App root, layout, routing
- frontend/src/routes.tsx (create) — Route definitions (login, board, admin, etc.)
- frontend/src/api/ (create) — API clients for all backend endpoints (auth.ts, users.ts, boards.ts, etc.)
- frontend/src/hooks/ (create) — Custom hooks for auth, board, kanban, cards, users, notifications, tags
- frontend/src/state/ (create) — Zustand stores for auth, board, kanban, cards, users, notifications, tags
- frontend/src/components/ (create) — UI components (Button.tsx, TextField.tsx, KanbanBoard.tsx, CardDetail.tsx, etc.)
- frontend/package.json (create) — All dependencies, scripts (dev, build, preview, lint)
- frontend/.env.example (create) — Frontend-specific env vars (VITE_API_URL, etc.)

**Dependencies:** Item 1

**Validation:**  
- `docker build -t board-frontend ./frontend` succeeds
- `docker run -e ... board-frontend` serves SPA at http://localhost:80
- All UI flows work: login, Kanban board, card CRUD, file upload, notifications, user management, metrics
- UI matches the approved contract 1:1

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment

**Goal:**  
Provide complete Docker orchestration and documentation for zero-manual local setup. Includes docker-compose.yml (with healthchecks, depends_on, env vars), .env.example, .gitignore, .dockerignore, run.sh (waits for healthy, prints URL), README.md (setup, usage, endpoints), and docs/architecture.md (system diagram and component descriptions).

**Files to create:**
- docker-compose.yml (create) — Services: postgres, backend, frontend; healthchecks on all; depends_on with condition: service_healthy; correct build contexts; env vars from .env
- .env.example (create) — All required env vars for backend, frontend, DB, S3, JWT, etc., with descriptions and example values
- .gitignore (create) — Exclude node_modules, dist, .env, __pycache__, *.pyc, build artifacts
- .dockerignore (create) — Exclude node_modules, .git, *.log, dist, build artifacts
- run.sh (create) — Bash script: checks Docker, builds images, starts containers, waits for all healthchecks, prints access URL
- README.md (create) — Prerequisites, clone, run instructions, endpoints, troubleshooting
- docs/architecture.md (create) — System diagram, component descriptions, deployment flow

**Dependencies:** Items 1, 2, 3

**Validation:**  
- `./run.sh` completes without errors
- All containers healthy (`docker ps` shows healthy status)
- Frontend accessible at http://localhost (or documented port)
- Backend API responds at /health and all endpoints
- README instructions match actual setup

**Role:** role-devops (devops_support)

---