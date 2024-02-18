import styles from './FormRegister.module.css'

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react'

const FormRegister = () => {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }

  return (
    <form className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setValue(e.target.value)}
        value={value}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />

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
      <Button htmlType="button" >Зарегистрироваться</Button>

    </form>
  )
}

export default FormRegister