export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

export interface ContentCard {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  status: 'idea' | 'en_redaccion' | 'en_revision' | 'aprobado' | 'publicado' | 'bloqueado';
  assigneeId: string | null;
  dueDate: string | null;
  tags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  cardId: string;
  filename: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface BoardMetrics {
  aTiempo: number;
  enRiesgo: number;
  bloqueadas: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}