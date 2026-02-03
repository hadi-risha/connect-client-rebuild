// reusing validators
export const required = (fieldName: string) => (value: string) =>
  value.trim() ? null : `${fieldName} is required`;

export const minLength = (fieldName: string, length: number) => (value: string) =>
  value.trim().length >= length ? null : `${fieldName} must be at least ${length} characters`;

export const onlyLetters = (fieldName: string) => (value: string) =>
  /^[A-Za-z\s]+$/.test(value.trim()) ? null : `${fieldName} must contain letters only`;

export const matchField =
  <T, K extends keyof T>(fieldName: string, matchWith: K) =>
  (value: T[K], values: T): string | null => {
    return value === values[matchWith]
      ? null
      : `${fieldName} must match ${String(matchWith)}`;
  };

export const validEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : `Invalid email`;

export const minValue = (fieldName: string, min: number) => (value: string) =>
  Number(value) > min ? null : `${fieldName} must be greater than ${min}`;
