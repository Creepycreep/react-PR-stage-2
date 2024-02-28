import styles from './FormRegister.module.css'
import { User } from '../../types/Types';

import { useNavigate } from "react-router-dom";

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { userService } from '../../service/userService'
import { useForm } from '../../hooks/useForm'

const FormRegister = ({ setUser }: { setUser: (user: User | null) => void }) => {
  const { value, onChange, isFilled } = useForm({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const registration = new userService()

  const onSubmit = async (e: { preventDefault: () => void; }) => {
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
        onChange={onChange}
        value={value.name}
        name={'name'}
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
        disabled={!isFilled}
        htmlType="submit"
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}

export default FormRegister