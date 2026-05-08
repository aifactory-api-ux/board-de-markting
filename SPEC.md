# SPEC.md

## 1. TECHNOLOGY STACK

- **Frontend**
  - React 18.2.0
  - Vite 4.4.9
  - TypeScript 5.2.x
  - React Router DOM 6.14.x
  - Zustand 4.4.x (state management)
  - React Query 4.36.x (server state)
  - Axios 1.6.x (HTTP client)
  - react-hook-form 7.45.x (forms)
  - @headlessui/react 1.7.x (UI primitives)
  - @radix-ui/react-tooltip 1.0.x (tooltips)
  - @radix-ui/react-toast 1.0.x (toasts)
  - react-beautiful-dnd 13.1.x (drag-and-drop)
  - clsx 2.1.x (conditional classnames)
  - Prettier 3.x, ESLint 8.x, Stylelint 15.x

- **Backend**
  - Node.js 20.x
  - Express 4.18.x
  - TypeScript 5.2.x
  - TypeORM 0.3.x
  - PostgreSQL 15.x
  - jsonwebtoken 9.x
  - bcryptjs 2.4.x
  - multer 1.4.x (file uploads)
  - aws-sdk 2.1480.x (S3 integration)
  - dotenv 16.x
  - cors 2.8.x
  - express-validator 7.0.x

- **Infrastructure**
  - Docker 24.x
  - docker-compose 1.29.x
  - AWS S3 (for file storage)
  - Nginx 1.25.x (reverse proxy, static assets)
  - Node-based backend Dockerfile
  - Vite-based frontend Dockerfile

## 2. DATA CONTRACTS

### TypeScript Interfaces (frontend & backend)

```typescript
// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// Auth
export interface AuthLoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface AuthLoginResponse {
  token: string;
  user: User;
}
export interface AuthMeResponse {
  user: User;
}

// Board
export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// KanbanColumn
export interface KanbanColumn {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

// ContentCard
export interface ContentCard {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  status: 'idea' | 'en_redaccion' | 'en_revision' | 'aprobado' | 'publicado' | 'bloqueado';
  assigneeId: string | null;
  dueDate: string | null; // ISO8601
  tags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

// Attachment
export interface Attachment {
  id: string;
  cardId: string;
  filename: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string; // userId
}

// Tag
export interface Tag {
  id: string;
  name: string;
  color: string; // hex
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  message: string;
  read: boolean;
  createdAt: string;
}

// Board Metrics
export interface BoardMetrics {
  aTiempo: number;
  enRiesgo: number;
  bloqueadas: number;
}

// Pagination
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Express Validator Schemas (backend, for reference)

- All fields must match the above TypeScript interfaces exactly in naming and type.

## 3. API ENDPOINTS

### Auth

- **POST /api/auth/login**
  - Request: `AuthLoginRequest`
  - Response: `AuthLoginResponse`
- **GET /api/auth/me**
  - Auth: Bearer token
  - Response: `AuthMeResponse`
- **POST /api/auth/logout**
  - Auth: Bearer token
  - Response: `{ success: boolean }`

### Users

- **GET /api/users**
  - Auth: admin only
  - Query: `?page=number&pageSize=number`
  - Response: `Paginated<User>`
- **GET /api/users/:id**
  - Auth: admin or self
  - Response: `User`
- **POST /api/users**
  - Auth: admin only
  - Body: `Pick<User, 'name' | 'email' | 'role' | 'avatarUrl'> & { password: string }`
  - Response: `User`
- **PUT /api/users/:id**
  - Auth: admin or self
  - Body: `Partial<Pick<User, 'name' | 'email' | 'role' | 'avatarUrl' | 'isActive'>>`
  - Response: `User`
- **DELETE /api/users/:id**
  - Auth: admin only
  - Response: `{ success: boolean }`

### Boards

- **GET /api/boards**
  - Auth: any
  - Response: `Board[]`
- **GET /api/boards/:id**
  - Auth: any
  - Response: `Board`
- **POST /api/boards**
  - Auth: admin or editor
  - Body: `Pick<Board, 'name' | 'description'>`
  - Response: `Board`
- **PUT /api/boards/:id**
  - Auth: admin or editor
  - Body: `Partial<Pick<Board, 'name' | 'description'>>`
  - Response: `Board`
- **DELETE /api/boards/:id**
  - Auth: admin
  - Response: `{ success: boolean }`

### Kanban Columns

- **GET /api/boards/:boardId/columns**
  - Auth: any
  - Response: `KanbanColumn[]`
- **POST /api/boards/:boardId/columns**
  - Auth: admin or editor
  - Body: `Pick<KanbanColumn, 'name' | 'order'>`
  - Response: `KanbanColumn`
- **PUT /api/columns/:id**
  - Auth: admin or editor
  - Body: `Partial<Pick<KanbanColumn, 'name' | 'order'>>`
  - Response: `KanbanColumn`
- **DELETE /api/columns/:id**
  - Auth: admin or editor
  - Response: `{ success: boolean }`

### Content Cards

- **GET /api/boards/:boardId/cards**
  - Auth: any
  - Query: `?columnId=string&page=number&pageSize=number`
  - Response: `Paginated<ContentCard>`
- **GET /api/cards/:id**
  - Auth: any
  - Response: `ContentCard`
- **POST /api/boards/:boardId/cards**
  - Auth: editor or admin
  - Body: `Pick<ContentCard, 'title' | 'description' | 'columnId' | 'assigneeId' | 'dueDate' | 'tags'>`
  - Response: `ContentCard`
- **PUT /api/cards/:id**
  - Auth: editor or admin
  - Body: `Partial<Pick<ContentCard, 'title' | 'description' | 'columnId' | 'assigneeId' | 'dueDate' | 'tags' | 'status'>>`
  - Response: `ContentCard`
- **DELETE /api/cards/:id**
  - Auth: editor or admin
  - Response: `{ success: boolean }`

### Attachments

- **POST /api/cards/:cardId/attachments**
  - Auth: editor or admin
  - Multipart form: `file`
  - Response: `Attachment`
- **DELETE /api/attachments/:id**
  - Auth: editor or admin
  - Response: `{ success: boolean }`

### Tags

- **GET /api/tags**
  - Auth: any
  - Response: `Tag[]`
- **POST /api/tags**
  - Auth: admin or editor
  - Body: `Pick<Tag, 'name' | 'color'>`
  - Response: `Tag`
- **DELETE /api/tags/:id**
  - Auth: admin or editor
  - Response: `{ success: boolean }`

### Notifications

- **GET /api/notifications**
  - Auth: any
  - Response: `Notification[]`
- **POST /api/notifications/mark-read**
  - Auth: any
  - Body: `{ ids: string[] }`
  - Response: `{ success: boolean }`

### Board Metrics

- **GET /api/boards/:boardId/metrics**
  - Auth: any
  - Response: `BoardMetrics`

## 4. FILE STRUCTURE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root-level startup script
├── backend/
│   ├── Dockerfile                   # Backend Docker build
│   ├── src/
│   │   ├── index.ts                 # Express app entrypoint
│   │   ├── app.ts                   # Express app setup
│   │   ├── routes/
│   │   │   ├── auth.ts              # Auth endpoints
│   │   │   ├── users.ts             # User endpoints
│   │   │   ├── boards.ts            # Board endpoints
│   │   │   ├── columns.ts           # Kanban columns endpoints
│   │   │   ├── cards.ts             # Content cards endpoints
│   │   │   ├── attachments.ts       # File upload endpoints
│   │   │   ├── tags.ts              # Tag endpoints
│   │   │   └── notifications.ts     # Notification endpoints
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── userController.ts
│   │   │   ├── boardController.ts
│   │   │   ├── columnController.ts
│   │   │   ├── cardController.ts
│   │   │   ├── attachmentController.ts
│   │   │   ├── tagController.ts
│   │   │   └── notificationController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Board.ts
│   │   │   ├── KanbanColumn.ts
│   │   │   ├── ContentCard.ts
│   │   │   ├── Attachment.ts
│   │   │   ├── Tag.ts
│   │   │   └── Notification.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── userService.ts
│   │   │   ├── boardService.ts
│   │   │   ├── columnService.ts
│   │   │   ├── cardService.ts
│   │   │   ├── attachmentService.ts
│   │   │   ├── tagService.ts
│   │   │   └── notificationService.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── s3.ts
│   │   │   └── password.ts
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── s3.ts
│   │   └── types/
│   │       ├── index.d.ts
│   │       └── api.d.ts
│   └── shared/
│       ├── constants.ts
│       ├── types.ts
│       └── utils.ts
├── frontend/
│   ├── Dockerfile                   # Frontend Docker build
│   ├── vite.config.ts               # Vite config
│   ├── tsconfig.json                # TypeScript config
│   ├── public/
│   │   ├── index.html               # HTML entrypoint
│   │   └── favicon.svg
│   └── src/
│       ├── main.tsx                 # React entrypoint
│       ├── App.tsx                  # App root
│       ├── routes.tsx               # Route definitions
│       ├── api/                     # API clients
│       │   ├── auth.ts
│       │   ├── users.ts
│       │   ├── boards.ts
│       │   ├── columns.ts
│       │   ├── cards.ts
│       │   ├── attachments.ts
│       │   ├── tags.ts
│       │   └── notifications.ts
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useBoard.ts
│       │   ├── useKanban.ts
│       │   ├── useCards.ts
│       │   ├── useUsers.ts
│       │   ├── useNotifications.ts
│       │   └── useTags.ts
│       ├── state/
│       │   ├── authStore.ts
│       │   ├── boardStore.ts
│       │   ├── kanbanStore.ts
│       │   ├── cardStore.ts
│       │   ├── userStore.ts
│       │   ├── notificationStore.ts
│       │   └── tagStore.ts
│       ├── components/
│       │   ├── ui/
│       │   │   ├── Button.tsx
│       │   │   ├── TextField.tsx
│       │   │   ├── TextArea.tsx
│       │   │   ├── Select.tsx
│       │   │   ├── ContentCard.tsx
│       │   │   ├── KanbanColumn.tsx
│       │   │   ├── Modal.tsx
│       │   │   ├── TopNavBar.tsx
│       │   │   ├── DropdownMenu.tsx
│       │   │   ├── Badge.tsx
│       │   │   ├── Avatar.tsx
│       │   │   ├── Checkbox.tsx
│       │   │   ├── RadioButton.tsx
│       │   │   ├── Tooltip.tsx
│       │   │   ├── Toast.tsx
│       │   │   ├── Pagination.tsx
│       │   │   └── DragDropWrapper.tsx
│       │   └── shared/
│       │       ├── Loader.tsx
│       │       └── ErrorBoundary.tsx
│       ├── pages/
│       │   ├── Login.tsx
│       │   ├── BoardPrincipal.tsx
│       │   ├── DetalleTarjeta.tsx
│       │   ├── AdminUsuarios.tsx
│       │   └── Configuracion.tsx
│       ├── styles/
│       │   ├── tokens.ts
│       │   └── globals.css
│       └── utils/
│           ├── formatDate.ts
│           ├── classNames.ts
│           └── apiTypes.ts
```

### PORT TABLE

| Service   | Listening Port | Path                |
|-----------|---------------|---------------------|
| backend   | 4000          | backend/            |

### SHARED MODULES

| Shared path        | Imported by services |
|--------------------|---------------------|
| backend/shared/    | backend             |

## 5. ENVIRONMENT VARIABLES

| Name                  | Type     | Description                                      | Example Value                |
|-----------------------|----------|--------------------------------------------------|------------------------------|
| NODE_ENV              | string   | Node environment                                 | production                   |
| PORT                  | number   | Backend listening port                           | 4000                         |
| DATABASE_URL          | string   | PostgreSQL connection string                     | postgres://user:pass@db:5432/board |
| JWT_SECRET            | string   | JWT signing secret                               | supersecretjwtkey            |
| JWT_EXPIRES_IN        | string   | JWT expiration (e.g., '7d')                      | 7d                           |
| S3_BUCKET             | string   | AWS S3 bucket name                               | apiux-marketing-board        |
| S3_REGION             | string   | AWS S3 region                                    | us-east-1                    |
| S3_ACCESS_KEY_ID      | string   | AWS S3 access key                                | AKIA...                      |
| S3_SECRET_ACCESS_KEY  | string   | AWS S3 secret key                                | ...                          |
| FRONTEND_URL          | string   | Public frontend URL                              | http://localhost:5173        |
| CORS_ORIGIN           | string   | Allowed CORS origin(s)                           | http://localhost:5173        |
| ADMIN_EMAIL           | string   | Initial admin user email                         | admin@apiux.com              |
| ADMIN_PASSWORD        | string   | Initial admin user password                      | strongpassword               |

## 6. IMPORT CONTRACTS

### Backend

- `from models.User import User`
- `from models.Board import Board`
- `from models.KanbanColumn import KanbanColumn`
- `from models.ContentCard import ContentCard`
- `from models.Attachment import Attachment`
- `from models.Tag import Tag`
- `from models.Notification import Notification`
- `from services.authService import login, verifyToken, logout`
- `from services.userService import getUsers, getUserById, createUser, updateUser, deleteUser`
- `from services.boardService import getBoards, getBoardById, createBoard, updateBoard, deleteBoard`
- `from services.columnService import getColumns, createColumn, updateColumn, deleteColumn`
- `from services.cardService import getCards, getCardById, createCard, updateCard, deleteCard`
- `from services.attachmentService import uploadAttachment, deleteAttachment`
- `from services.tagService import getTags, createTag, deleteTag`
- `from services.notificationService import getNotifications, markRead`
- `from utils.jwt import signToken, verifyToken`
- `from utils.s3 import uploadFile, deleteFile`
- `from utils.password import hashPassword, comparePassword`

### Frontend

- `import { useAuth } from '../hooks/useAuth'`
- `import { useBoard } from '../hooks/useBoard'`
- `import { useKanban } from '../hooks/useKanban'`
- `import { useCards } from '../hooks/useCards'`
- `import { useUsers } from '../hooks/useUsers'`
- `import { useNotifications } from '../hooks/useNotifications'`
- `import { useTags } from '../hooks/useTags'`
- `import { tokens } from '../styles/tokens'`
- `import { Button } from '../components/ui/Button'`
- `import { TextField } from '../components/ui/TextField'`
- `import { TextArea } from '../components/ui/TextArea'`
- `import { Select } from '../components/ui/Select'`
- `import { ContentCard } from '../components/ui/ContentCard'`
- `import { KanbanColumn } from '../components/ui/KanbanColumn'`
- `import { Modal } from '../components/ui/Modal'`
- `import { TopNavBar } from '../components/ui/TopNavBar'`
- `import { DropdownMenu } from '../components/ui/DropdownMenu'`
- `import { Badge } from '../components/ui/Badge'`
- `import { Avatar } from '../components/ui/Avatar'`
- `import { Checkbox } from '../components/ui/Checkbox'`
- `import { RadioButton } from '../components/ui/RadioButton'`
- `import { Tooltip } from '../components/ui/Tooltip'`
- `import { Toast } from '../components/ui/Toast'`
- `import { Pagination } from '../components/ui/Pagination'`
- `import { DragDropWrapper } from '../components/ui/DragDropWrapper'`

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

- `useAuth() → { user, token, loading, error, login, logout, checkAuth }`
- `useBoard() → { boards, currentBoard, loading, error, selectBoard, createBoard, updateBoard, deleteBoard }`
- `useKanban(boardId) → { columns, loading, error, addColumn, updateColumn, deleteColumn, reorderColumns }`
- `useCards(boardId) → { cards, loading, error, createCard, updateCard, deleteCard, moveCard, uploadAttachment, deleteAttachment }`
- `useUsers() → { users, loading, error, createUser, updateUser, deleteUser }`
- `useNotifications() → { notifications, loading, error, markRead }`
- `useTags() → { tags, loading, error, createTag, deleteTag }`

### Component Props Interfaces

```typescript
// Button
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

// TextField
export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  disabled?: boolean;
}

// TextArea
export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
}

// Select
export interface SelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

// ContentCard
export interface ContentCardProps {
  card: ContentCard;
  onClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  dragging?: boolean;
}

// KanbanColumn
export interface KanbanColumnProps {
  column: KanbanColumn;
  cards: ContentCard[];
  onCardDrop: (cardId: string, toColumnId: string, toIndex: number) => void;
  onAddCard: () => void;
  onEditColumn?: () => void;
  onDeleteColumn?: () => void;
}

// Modal
export interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}

// TopNavBar
export interface TopNavBarProps {
  user: User;
  onLogout: () => void;
  onSearch: (query: string) => void;
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

// DropdownMenu
export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: { label: string; onClick: () => void }[];
}

// Badge
export interface BadgeProps {
  label: string;
  color: string;
}

// Avatar
export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
}

// Checkbox
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

// RadioButton
export interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name: string;
  value: string;
  disabled?: boolean;
}

// Tooltip
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

// Toast
export interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  open: boolean;
  onClose: () => void;
}

// Pagination
export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

// DragDropWrapper
export interface DragDropWrapperProps {
  children: React.ReactNode;
  onDragEnd: (result: any) => void;
}
```

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout (frontend and backend).
- Entry point: `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`).

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: "#0052CC",
    primary_hover: "#0047B3",
    secondary: "#172B4D",
    background: "#F4F5F7",
    surface: "#FFFFFF",
    text_primary: "#172B4D",
    text_secondary: "#5E6C84",
    border: "#DFE1E6",
    success: "#36B37E",
    warning: "#FFAB00",
    danger: "#FF5630",
    info: "#00B8D9"
  },
  typography: {
    font_family: "Inter, sans-serif",
    headings: {
      h1: { size: 24, weight: 600, line_height: 1.3 },
      h2: { size: 20, weight: 600, line_height: 1.3 },
      h3: { size: 16, weight: 600, line_height: 1.4 }
    },
    body: { size: 14, weight: 400, line_height: 1.5 },
    small: { size: 12, weight: 400, line_height: 1.4 },
    caption: { size: 11, weight: 400, line_height: 1.3 }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999
  },
  shadows: {
    card: "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.08)",
    modal: "0px 4px 12px rgba(0,0,0,0.15)"
  },
  icon_style: "Outline icons, 20x20px, stroke width 1.5, rounded caps",
  image_style: "Placeholder images with soft corners (radius 4px), aspect ratio 16:9 for content previews",
  motion: "Subtle transitions (0.2s ease) for hover states, drag-and-drop with smooth animation (0.3s ease)"
};
```