import { useState, useEffect } from 'react'

export const useForm = (initial) => {
  const [value, setValue] = useState(initial)
  const [isFilled, setIsFilled] = useState(false)

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let check = false
    for (let key in value) {
      if (key) check = value[key].length
    }
    setIsFilled(check)

  }, [value])

  return [value, onChange, isFilled]
}