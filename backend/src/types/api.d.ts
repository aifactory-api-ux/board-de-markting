export interface AuthLoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthLoginResponse {
  token: string;
  user: any;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  password: string;
  avatarUrl?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string | null;
  isActive?: boolean;
}

export interface CreateBoardRequest {
  name: string;
  description: string;
}

export interface UpdateBoardRequest {
  name?: string;
  description?: string;
}

export interface CreateColumnRequest {
  name: string;
  order: number;
}

export interface UpdateColumnRequest {
  name?: string;
  order?: number;
}

export interface CreateCardRequest {
  title: string;
  description: string;
  columnId: string;
  assigneeId?: string | null;
  dueDate?: string | null;
  tags?: string[];
}

export interface UpdateCardRequest {
  title?: string;
  description?: string;
  columnId?: string;
  assigneeId?: string | null;
  dueDate?: string | null;
  tags?: string[];
  status?: 'idea' | 'en_redaccion' | 'en_revision' | 'aprobado' | 'publicado' | 'bloqueado';
}

export interface CreateTagRequest {
  name: string;
  color: string;
}

export interface MarkReadRequest {
  ids: string[];
}