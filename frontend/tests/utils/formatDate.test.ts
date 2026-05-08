import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime, timeAgo } from '../src/utils/formatDate';

describe('formatDate', () => {
  it('should format a date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
  });

  it('should format a Date object', () => {
    const date = new Date(2024, 0, 15);
    const result = formatDate(date);
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
  });
});

describe('formatDateTime', () => {
  it('should format a datetime string', () => {
    const result = formatDateTime('2024-01-15T14:30:00');
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
    expect(result).toContain('02');
    expect(result).toContain('30');
  });

  it('should format a Date object', () => {
    const date = new Date(2024, 0, 15, 14, 30, 0);
    const result = formatDateTime(date);
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
  });
});

describe('timeAgo', () => {
  it('should return "Just now" for recent dates', () => {
    const now = new Date();
    const result = timeAgo(now);
    expect(result).toBe('Just now');
  });

  it('should return minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    const result = timeAgo(date);
    expect(result).toBe('5m ago');
  });

  it('should return hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const result = timeAgo(date);
    expect(result).toBe('3h ago');
  });

  it('should return days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const result = timeAgo(date);
    expect(result).toBe('2d ago');
  });

  it('should handle string dates', () => {
    const date = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();
    const result = timeAgo(date);
    expect(result).toBe('1h ago');
  });
});