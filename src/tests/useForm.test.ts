import { renderHook } from '@testing-library/react'
import { useForm } from '../index'

describe('Test use form hook', () => {
  it('sample test', () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          name: '',
        },
      }),
    )

    expect(result.current.hasError).toBeFalsy()
  })
})
