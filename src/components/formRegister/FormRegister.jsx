import styles from './FormRegister.module.css'

import { useNavigate } from "react-router-dom";

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { userService } from '../../service/userService'
import { useForm } from '../../hooks/useForm'

const FormRegister = ({ setUser }) => {
  const [value, setValue, isFilled] = useForm({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const registration = new userService()

  const onSubmit = async e => {
    e.preventDefault();
    const user = await registration.userRegister(value)

    setUser(user.user)
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit} className={`${styles.form} flex flex-col gap-6 mb-10`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={setValue}
        value={value.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />

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
        errorText={'Должно быть минимум 8 знаков'}
      />

      <Button
        disabled={!isFilled}
        htmlType="submit"
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}

export default FormRegister