import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { UseFormTypes, ValueOf } from "./type";

export function useForm<Type>({
  defaultValues,
  validation,
}: UseFormTypes<Type>) {
  const [inputs, setInputs] = useState<Type>(defaultValues);
  const errorDefaultValues: any = {};
  Object.keys(defaultValues as object).forEach((item: string) => {
    errorDefaultValues[item] = "";
  });
  const [errors, setErrors] =
    useState<{ [x in keyof Type]: boolean }>(errorDefaultValues);
  const [hasError, setHasError] = useState<boolean>(false);

  const onChange = (name: string, value: any) => {
    setErrors({
      ...errors,
      [name]: "",
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
    if (Object.keys(err).length)
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
  };
}
