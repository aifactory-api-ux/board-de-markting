export const API_VERSION = '1.0.0';
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
export const TOKEN_EXPIRY = '7d';
export const UPLOAD_MAX_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;
export const CARD_STATUSES = {
  IDEA: 'idea',
  EN_REDACCION: 'en_redaccion',
  EN_REVISION: 'en_revision',
  APROBADO: 'aprobado',
  PUBLICADO: 'publicado',
  BLOQUEADO: 'bloqueado',
} as const;
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;