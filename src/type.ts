export type ValueOf<T> = T[keyof T]

export type ValidationSchemaObject<Type> = Record<string, boolean | ((value: any, inputs?: Type) => string | boolean)>

export type ValidationSchema<Type> = Partial<Record<keyof Type, ValidationSchemaObject<Type>>>

export type UseFormTypes<Type> = {
  defaultValues: Type
  validation?: ValidationSchema<Type>
}
