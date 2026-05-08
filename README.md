# Board Marketing

A full-stack Kanban board application for marketing content management.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js 20 + Express + TypeScript
- **Database**: PostgreSQL 15
- **File Storage**: AWS S3
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites

- Docker 24.x+
- Docker Compose 1.29.x+

### Running the Application

1. Clone the repository
2. Run the startup script:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```

The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:4000

### Default Credentials

- **Email**: admin@apiux.com
- **Password**: strongpassword

## Project Structure

```
.
├── backend/           # Express API server
│   ├── src/
│   │   ├── routes/    # API route handlers
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/    # TypeORM entities
│   │   ├── middlewares/
│   │   └── utils/
│   └── Dockerfile
├── frontend/          # React SPA
│   ├── src/
│   │   ├── api/       # API clients
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── state/     # Zustand stores
│   │   └── styles/
│   ├── Dockerfile
│   └── nginx.conf
├── shared/            # Shared types and utilities
├── docker-compose.yml
├── run.sh
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users (Admin only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Boards
- `GET /api/boards` - List boards
- `POST /api/boards` - Create board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Columns
- `GET /api/boards/:boardId/columns` - List columns
- `POST /api/boards/:boardId/columns` - Create column
- `PUT /api/columns/:id` - Update column
- `DELETE /api/columns/:id` - Delete column

### Cards
- `GET /api/boards/:boardId/cards` - List cards
- `POST /api/boards/:boardId/cards` - Create card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

### Tags
- `GET /api/tags` - List tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags/:id` - Delete tag

### Notifications
- `GET /api/notifications` - List notifications
- `POST /api/notifications/mark-read` - Mark as read

## Environment Variables

See `.env.example` in the backend directory for required environment variables.