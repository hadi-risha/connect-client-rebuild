// supports: text, radio, file/image
import { useState } from "react";

type ValidatorFn = (value: string, values: Record<string, string>) => string | null;

interface FieldConfig {
  value: string;
  validators?: ValidatorFn[];
}

type FormConfig<T> = {
  [K in keyof T]: FieldConfig;
};

export const useForm = <T extends Record<string, string>>(initial: FormConfig<T>) => {
  const [values, setValues] = useState(
    Object.fromEntries(
      Object.entries(initial).map(([key, field]) => [key, field.value])
    ) as Record<keyof T, string>
  );

  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.fromEntries(
      Object.entries(initial).map(([key]) => [key, null])
    ) as Record<keyof T, string | null>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate immediately
    const fieldValidators = initial[name as keyof T].validators || [];
    for (const validator of fieldValidators) {
      const err = validator(value, { ...values, [name]: value });
      if (err) {
        setErrors((prev) => ({ ...prev, [name]: err }));
        return;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = (): boolean => {
  let isValid = true;

  const newErrors = {} as Record<keyof T, string | null>;

  (Object.keys(initial) as Array<keyof T>).forEach((key) => {
    const value = values[key];
    const validators = initial[key].validators ?? [];

    let fieldError: string | null = null;

    for (const validator of validators) {
      const err = validator(value, values);
      if (err) {
        fieldError = err;
        isValid = false;
        break;
      }
    }

    newErrors[key] = fieldError;
  });

  setErrors(newErrors);
  return isValid;
};

  const resetForm = () => {
    setValues(
      Object.fromEntries(
        Object.entries(initial).map(([key, field]) => [key, field.value])
      ) as Record<keyof T, string>
    );
    setErrors(
      Object.fromEntries(
        Object.entries(initial).map(([key]) => [key, null])
      ) as Record<keyof T, string | null>
    );
  };

  return { values, errors, handleChange, validateForm, resetForm, setValues, setErrors };
};

