import styles from './FormLogin.module.css'

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { userService } from '../../service/userService'
import { useForm } from '../../hooks/useForm'

const FormLogin = ({ setUser }) => {
  const [value, setValue, isFilled] = useForm({ email: '', password: '' })
  const login = new userService()

  const onSubmit = async e => {
    e.preventDefault();
    const user = await login.userLogin(value)
    setUser(user.user)
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
      <Button htmlType="submit" disabled={!isFilled}>Войти</Button>
    </form>
  )
}

export default FormLogin