import { LocalStorageKeys } from "@/enums/local-storage-keys";
import { saveLocalStorage } from "@/lib/local-storage";
import { useCallback, useState } from "react";
import { z } from "zod";

type FieldErrors<T> = {
  [K in keyof T]? : string[]
}

export const useValuesValidation = <TValues>(
  initialState: TValues,
  validationSchema: z.Schema<TValues>,
  localStorageKey?: LocalStorageKeys
) => {
  // get values from localstorage if exists
  const savedValues = localStorageKey ? localStorage.getItem(localStorageKey) : null;
  const [values, setValues] = useState<TValues>(savedValues ? JSON.parse(savedValues) : initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TValues> | undefined>(undefined);
  const validate = useCallback(() => {
    const validationResult = validationSchema.safeParse(values);
    if (!validationResult.success) {
      setFieldErrors(validationResult.error.flatten().fieldErrors as FieldErrors<TValues>);
      return false;
    }

    setFieldErrors(undefined);
    return true;
  }, [validationSchema, values]);

  const handleChange = useCallback((key: keyof TValues, value: any) => {
    // save new value and save it on locastorage
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    if (localStorageKey) saveLocalStorage(localStorageKey, newValues);
  }, [values, localStorageKey])

  const resetValues = useCallback(() => {
    setValues(initialState);
    setFieldErrors(undefined);
    if (localStorageKey) localStorage.removeItem(localStorageKey);
  }, [initialState, localStorageKey]);

  return {
    values,
    fieldErrors,
    handleChange,
    validate,
    resetValues,
  }
}