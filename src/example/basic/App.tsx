import { useForm } from '../../useForm'

type FormInputs = {
  name: string
  password: string
}

export default function App() {
  const { inputs, handleSubmit, errors, handleChange } = useForm({
    defaultValues: { name: '', password: '' },
    validation: {
      password: {
        hasMoreThan6Chars: (val) => val.length >= 6 || 'Please enter 6 or more characters',
        hasCapsChars: (val) => /[A-Z]/.test(val) || 'Please enter at least one capital letter',
        hasLowercaseChars: (val) => /[a-z]/.test(val) || 'Please enter at least one lowercase letter',
        hasNumChars: (val) => /[0-9]/.test(val) || 'Please enter at least one number',
        hasSpecialChars: (val) =>
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val) || 'Please enter at least one special character',
      },
    },
  })
  const onSubmit = (data: FormInputs) => console.log(data)

  console.log(inputs.name) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input value={inputs.name} name='name' onChange={handleChange} />

      {/* include validation with required or other standard HTML validation rules */}
      <input value={inputs.password} name='password' onChange={handleChange} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>{errors.password}</span>}

      <input type='submit' />
    </form>
  )
}
