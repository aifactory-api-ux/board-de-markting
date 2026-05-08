import { describe, it, expect } from 'vitest';
import { classNames } from '../src/utils/classNames';

describe('classNames', () => {
  it('should join multiple class names', () => {
    const result = classNames('foo', 'bar', 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('should filter out undefined values', () => {
    const result = classNames('foo', undefined, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should filter out null values', () => {
    const result = classNames('foo', null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should filter out false values', () => {
    const result = classNames('foo', false, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle empty input', () => {
    const result = classNames();
    expect(result).toBe('');
  });

  it('should handle all falsy values', () => {
    const result = classNames(undefined, null, false);
    expect(result).toBe('');
  });
});