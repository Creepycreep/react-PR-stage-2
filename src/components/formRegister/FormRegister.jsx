import styles from './FormRegister.module.css'
import { API } from '../../utils/apiConsts'

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'

const FormRegister = () => {
  const [value, setValue] = useState({ email: '', password: '', name: '' })
  const [isFullfilled, setisFullfilled] = useState(false)

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault();
    const result = await fetch(API._register, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(value)
    })

    console.log(value);
  }

  useEffect(() => {
    let check = false
    for (let key in value) {
      check = value[key].length
    }
    setisFullfilled(check)

  }, [value])

  return (
    <form onSubmit={onSubmit} className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={value.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />

      <EmailInput
        onChange={onChange}
        value={value.email}
        name={'email'}
        placeholder="E-mail"
      />

      <PasswordInput
        onChange={onChange}
        value={value.password}
        name={'password'}
      />

      <Button
        disabled={!isFullfilled}
        htmlType="submit"
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}

export default FormRegister