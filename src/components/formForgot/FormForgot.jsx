import styles from './FormForgot.module.css'

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react'

const FormForgot = () => {
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
      <Button htmlType="button" >Войти</Button>
    </form>
  )
}

export default FormForgot