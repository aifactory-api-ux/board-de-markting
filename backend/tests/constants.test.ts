import {
  API_VERSION,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  TOKEN_EXPIRY,
  UPLOAD_MAX_SIZE,
  ALLOWED_MIME_TYPES,
  ROLES,
  CARD_STATUSES,
  NOTIFICATION_TYPES,
} from '../src/shared/constants';

describe('constants', () => {
  describe('API_VERSION', () => {
    it('should be a string', () => {
      expect(typeof API_VERSION).toBe('string');
      expect(API_VERSION).toBe('1.0.0');
    });
  });

  describe('pagination constants', () => {
    it('should have valid DEFAULT_PAGE_SIZE', () => {
      expect(DEFAULT_PAGE_SIZE).toBe(10);
      expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
    });

    it('should have valid MAX_PAGE_SIZE', () => {
      expect(MAX_PAGE_SIZE).toBe(100);
      expect(MAX_PAGE_SIZE).toBeGreaterThan(DEFAULT_PAGE_SIZE);
    });
  });

  describe('TOKEN_EXPIRY', () => {
    it('should be a string', () => {
      expect(typeof TOKEN_EXPIRY).toBe('string');
      expect(TOKEN_EXPIRY).toBe('7d');
    });
  });

  describe('UPLOAD_MAX_SIZE', () => {
    it('should be 10MB in bytes', () => {
      expect(UPLOAD_MAX_SIZE).toBe(10 * 1024 * 1024);
    });
  });

  describe('ALLOWED_MIME_TYPES', () => {
    it('should contain expected mime types', () => {
      expect(ALLOWED_MIME_TYPES).toContain('image/jpeg');
      expect(ALLOWED_MIME_TYPES).toContain('image/png');
      expect(ALLOWED_MIME_TYPES).toContain('image/gif');
      expect(ALLOWED_MIME_TYPES).toContain('application/pdf');
    });
  });

  describe('ROLES', () => {
    it('should have admin, editor, viewer', () => {
      expect(ROLES.ADMIN).toBe('admin');
      expect(ROLES.EDITOR).toBe('editor');
      expect(ROLES.VIEWER).toBe('viewer');
    });
  });

  describe('CARD_STATUSES', () => {
    it('should have all card statuses', () => {
      expect(CARD_STATUSES.IDEA).toBe('idea');
      expect(CARD_STATUSES.EN_REDACCION).toBe('en_redaccion');
      expect(CARD_STATUSES.EN_REVISION).toBe('en_revision');
      expect(CARD_STATUSES.APROBADO).toBe('aprobado');
      expect(CARD_STATUSES.PUBLICADO).toBe('publicado');
      expect(CARD_STATUSES.BLOQUEADO).toBe('bloqueado');
    });
  });

  describe('NOTIFICATION_TYPES', () => {
    it('should have info, success, warning, danger', () => {
      expect(NOTIFICATION_TYPES.INFO).toBe('info');
      expect(NOTIFICATION_TYPES.SUCCESS).toBe('success');
      expect(NOTIFICATION_TYPES.WARNING).toBe('warning');
      expect(NOTIFICATION_TYPES.DANGER).toBe('danger');
    });
  });
});