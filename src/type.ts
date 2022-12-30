export type UseFormTypes<Type> = {
  defaultValues: Type;
  validation?: Partial<
    Record<keyof Type, Record<string, (value: any) => string | boolean>>
  >;
};
