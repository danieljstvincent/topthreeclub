import { describe, it, expect, beforeEach } from 'vitest';

describe('Utility Functions', () => {
  describe('Date formatting', () => {
    it('should format date correctly', () => {
      // Use UTC to avoid timezone issues
      const date = new Date('2024-01-15T12:00:00Z');
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      
      expect(formatted).toBe('2024-01-15');
    });

    it('should handle single digit months and days', () => {
      // Use UTC to avoid timezone issues
      const date = new Date('2024-01-05T12:00:00Z');
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      
      expect(formatted).toBe('2024-01-05');
    });
  });

  describe('LocalStorage operations', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should store and retrieve data from localStorage', () => {
      const testData = { key: 'value', number: 123 };
      localStorage.setItem('test', JSON.stringify(testData));
      const retrieved = JSON.parse(localStorage.getItem('test') || '{}');
      
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent keys', () => {
      const result = localStorage.getItem('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('Array operations', () => {
    it('should filter completed quests correctly', () => {
      const completed = [true, false, true];
      const completedCount = completed.filter(c => c).length;
      
      expect(completedCount).toBe(2);
    });

    it('should handle empty arrays', () => {
      const completed: boolean[] = [];
      const completedCount = completed.filter(c => c).length;
      
      expect(completedCount).toBe(0);
    });
  });
});

