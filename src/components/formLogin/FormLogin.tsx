import styles from './FormLogin.module.css'
import { user } from '../../types/Types';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { userService } from '../../service/userService'
import { useForm } from '../../hooks/useForm'

const FormLogin = ({ setUser }: { setUser: (user: user | null) => void }) => {
  const [value, setValue, isFilled] = useForm({ email: '', password: '' })
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const login = new userService()

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login.userLogin(value, setError).then(res => {
      if (!res) {
        throw new Error('Error!')
      }
      setUser(res.user)
      navigate('/')
    })
  }

  return (
    <form onSubmit={onSubmit} className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <EmailInput
        onChange={setValue}
        value={value.email}
        name={'email'}
        placeholder="E-mail"
      />

      <PasswordInput
        onChange={setValue}
        value={value.password}
        name={'password'}
      />
      {error ? <p className={`${styles.error} text text_type_main-default text_color_inactive`}>Неверный логин или пароль</p> : null}

      <Button htmlType="submit" disabled={!isFilled}>Войти</Button>
    </form>
  )
}

export default FormLogin