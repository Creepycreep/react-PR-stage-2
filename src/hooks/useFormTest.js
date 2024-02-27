import { renderHook } from '@testing-library/react'
import { useForm } from './useForm'

test('returns logged in user', () => {
  const { result } = renderHook(() => useForm({ email: 'liza@mail.ru', password: '12345678' }))
  expect(result.current).toEqual([{ email: 'liza@mail.ru', password: '12345678' }, true])
})