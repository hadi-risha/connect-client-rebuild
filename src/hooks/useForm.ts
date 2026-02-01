import { useState } from "react";

// Validator function receives the specific field value and the full form values
type ValidatorFn<T, K extends keyof T> = (value: T[K], values: T) => string | null;

interface FieldConfig<T, K extends keyof T> {
  value: T[K];
  validators?: ValidatorFn<T, K>[];
}

type FormConfig<T> = {
  [K in keyof T]: FieldConfig<T, K>;
};

export const useForm = <T extends object>(initial: FormConfig<T>) => {
  const [values, setValues] = useState<T>(
    Object.fromEntries(
      (Object.entries(initial) as [keyof T, FieldConfig<T, keyof T>][]).map(
        ([key, field]) => [key, field.value]
      )
    ) as T
  );

  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.fromEntries(Object.keys(initial).map((key) => [key, null])) as Record<
      keyof T,
      string | null
    >
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: T[keyof T];

    if (type === "checkbox" && "checked" in e.target) {
      // Only HTMLInputElement has checked
      newValue = e.target.checked as T[keyof T];
    // } else if (type === "number") {
    //   newValue = (Number(value) as unknown) as T[keyof T];
    } else {
      newValue = value as T[keyof T]; // string for text inputs, textarea, select
    }

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Run validators immediately
    const key = name as keyof T;
    const fieldValidators = initial[key].validators ?? [];
    for (const validator of fieldValidators) {
      const err = validator(newValue, { ...values, [key]: newValue } as T);
      if (err) {
        setErrors((prev) => ({ ...prev, [key]: err }));
        return;
      }
    }

    setErrors((prev) => ({ ...prev, [key]: null }));
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
        (Object.entries(initial) as [keyof T, FieldConfig<T, keyof T>][]).map(
          ([key, field]) => [key, field.value]
        )
      ) as T
    );

    setErrors(
      Object.fromEntries(Object.keys(initial).map((key) => [key, null])) as Record<
        keyof T,
        string | null
      >
    );
  };

  return { values, errors, handleChange, validateForm, resetForm, setValues, setErrors };
};
