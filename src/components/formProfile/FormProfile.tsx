import styles from './FormProfile.module.css'

import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useContext } from 'react'
import { BurgerContext } from '../../context/BurgerContext'
import { useForm } from '../../hooks/useForm'

const FormProfile = () => {
  const context = useContext(BurgerContext)
  const { value, onChange } = useForm({ email: '', password: '' })

  return (
    <form className={`${styles.form} flex flex-col gap-6 mb-10`
    }>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={context?.user?.name || ''}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        disabled
        onChange={onChange}
      />

      <EmailInput
        value={context?.user?.email || ''}
        name={'email'}
        placeholder="Логин"
        readOnly
        disabled
        onChange={onChange}
      />
    </form>
  )
}

export default FormProfile