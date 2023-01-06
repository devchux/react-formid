# React Formid

A minimalistic hook for flexible form validations almost like the [React Hook Form](https://github.com/bluebill1049/react-hook-form).

## Installation

**with NPM**

```bash
    npm install react-formid --save
```

**with YARN**

```bash
    yarn add react-formid
```

## Features

1. Tiny size
1. Built with performance
1. Fully Typescript supported

## Quickstart

```jsx
import { useForm } from "react-formid";

type FormInputs = {
  name: string,
  password: string,
};

export default function App() {
  const { inputs, handleSubmit, errors, handleChange } = useForm({
    defaultValues: { name: "", password: "" },
    validation: {
      name: {
        required: true,
      },
      password: {
        hasMoreThan6Chars: (val) =>
          val.length >= 6 || "Please enter 6 or more characters",
        hasCapsChars: (val) =>
          /[A-Z]/.test(val) || "Please enter at least one capital letter",
        hasLowercaseChars: (val) =>
          /[a-z]/.test(val) || "Please enter at least one lowercase letter",
        hasNumChars: (val) =>
          /[0-9]/.test(val) || "Please enter at least one number",
        hasSpecialChars: (val) =>
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val) ||
          "Please enter at least one special character",
      },
    },
  });
  const onSubmit = (data: FormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue="test"
        value={inputs.name}
        name="name"
        onChange={handleChange}
      />
      <input value={inputs.password} name="password" onChange={handleChange} />
      {errors.password && <span>{errors.password}</span>}

      <input type="submit" />
    </form>
  );
}
```
