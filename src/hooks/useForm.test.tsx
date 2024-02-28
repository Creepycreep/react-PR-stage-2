import { renderHook, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from './useForm'

describe("name test", () => {

  it('form test', async () => {
    const { result } = renderHook(() => useForm({ email: '' }))
    expect(result.current.isFilled).toBe(false)
    expect(result.current.value).toStrictEqual({ email: '' })


    render(<input name="email" data-testid="test-input-userName" onChange={result.current.onChange} />)


    await userEvent.type(screen.getByTestId("test-input-userName"), "liza@mail.ru")

    expect(result.current.isFilled).toBe(true)
    expect(result.current.value).toStrictEqual({ email: 'liza@mail.ru' })
  })
})

