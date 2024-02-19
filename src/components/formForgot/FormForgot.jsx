import styles from './FormForgot.module.css'

import { API } from '../../utils/apiConsts'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react'

const FormForgot = () => {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(API._passwordForgot, {
      method: 'POST',
      body: JSON.stringify({ email: value })
    });

    let result = await response.json();
    console.log(result);
  }

  return (
    <form onSubmit={onSubmit} className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="E-mail"
      />
      <Button htmlType="submit" >Войти</Button>
    </form>
  )
}

export default FormForgot