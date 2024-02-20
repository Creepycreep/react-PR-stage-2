import styles from './FormLogin.module.css'

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { useContext, useState } from 'react'

const FormLogin = () => {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }

  return (
    <form className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="E-mail"
      />

      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
      />
      <Button htmlType="button" >Войти</Button>
    </form>
  )
}

export default FormLogin