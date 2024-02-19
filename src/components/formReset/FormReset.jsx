import styles from './FormReset.module.css'

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react'

const FormReset = () => {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }

  return (
    <form className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        placeholder='Введите новый пароль'
      />

      <Input
        type={'text'}
        onChange={e => setValue(e.target.value)}
        value={value}
        name={'Код'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        placeholder={'Введите код из письма'}
      />
      <Button htmlType="button" >Сохранить</Button>
    </form>
  )
}

export default FormReset