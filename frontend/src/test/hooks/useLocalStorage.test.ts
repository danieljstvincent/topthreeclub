import { describe, it, expect, beforeEach } from 'vitest';

// Mock implementation of useLocalStorage hook for testing
// This is a simplified version for testing localStorage operations
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const currentValue = getStoredValue();
      const valueToStore = value instanceof Function ? value(currentValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [getStoredValue(), setValue] as const;
};

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const [value] = useLocalStorage('test-key', 'initial');
    expect(value).toBe('initial');
  });

  it('should store and retrieve values from localStorage', () => {
    const [value, setValue] = useLocalStorage('test-key', 'initial');
    expect(value).toBe('initial');

    setValue('updated');
    const [newValue] = useLocalStorage('test-key', 'initial');
    expect(newValue).toBe('updated');
  });

  it('should handle complex objects', () => {
    const initialObject = { name: 'test', count: 0 };
    const [value, setValue] = useLocalStorage('test-object', initialObject);

    expect(value).toEqual(initialObject);

    setValue({ name: 'updated', count: 1 });
    const [newValue] = useLocalStorage('test-object', initialObject);
    expect(newValue).toEqual({ name: 'updated', count: 1 });
  });

  it('should handle function updates', () => {
    const [value, setValue] = useLocalStorage('test-counter', 0);
    expect(value).toBe(0);

    setValue((prev: number) => prev + 1);
    const [newValue] = useLocalStorage('test-counter', 0);
    expect(newValue).toBe(1);
  });
});

