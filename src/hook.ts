import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";
import { UseFormTypes, ValueOf } from "./type";

export function useForm<Type>({
  defaultValues,
  validation,
}: UseFormTypes<Type>) {
  const [inputs, setInputs] = useState<Type>(defaultValues);
  const errorDefaultValues: any = {};
  const defaultTouchedFields: any = {};
  Object.keys(defaultValues as object).forEach((item: string) => {
    errorDefaultValues[item] = "";
    defaultTouchedFields[item] = false;
  });
  const [errors, setErrors] =
    useState<{ [x in keyof Type]: string }>(errorDefaultValues);
  const [touchedFields, setTouchedFields] =
    useState<{ [x in keyof Type]: boolean }>(defaultTouchedFields);
  const [hasError, setHasError] = useState<boolean>(false);

  const isEmptyObject = (obj: object) => {
    return !Object.keys(obj).length;
  };

  const dirtyFields = useMemo(() => {
    return Object.keys(inputs as object).reduce((init: any, value: string) => {
      if (
        (defaultValues as any)[value] === undefined ||
        (defaultValues as any)[value] !== (inputs as any)[value]
      ) {
        init[value] = (inputs as any)[value];
      }

      return init;
    }, {});
  }, [inputs, defaultValues]);

  const isDirty = useMemo(() => {
    return !isEmptyObject(dirtyFields);
  }, [dirtyFields]);

  const onChange = (name: string, value: any) => {
    setErrors({
      ...errors,
      [name]: "",
    });

    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name, value },
    } = e;

    onChange(name, value);
  };

  const setFieldValue = (name: string, value: ValueOf<Type>) => {
    onChange(name, value);
  };

  const customErrorValidation = () => {
    const err: any = {};
    Object.keys(inputs as object).forEach((item: string) => {
      if (validation) {
        Object.values((validation as any)[item] || {}).every((func) => {
          const errValue = (func as (value: any) => string | boolean)(
            (inputs as any)[item]
          );
          if (typeof errValue === "string") {
            err[item] = errValue;
            return false;
          }

          return true;
        });
      }
    });

    return err;
  };

  const handleSubmit = (
    onSubmit: (data: Type) => void
  ): FormEventHandler<HTMLFormElement> => {
    const err = customErrorValidation();
    if (!isEmptyObject(err))
      return (e) => {
        e.preventDefault();
        setHasError(true);
        setErrors({
          ...errors,
          ...err,
        });
      };

    return (e) => {
      e.preventDefault();
      setHasError(false);
      onSubmit(inputs);
    };
  };

  const reset = () => setInputs(defaultValues);

  return {
    inputs,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    setInputs,
    reset,
    hasError,
    defaultValues,
    isDirty,
    dirtyFields,
    touchedFields,
  };
}
