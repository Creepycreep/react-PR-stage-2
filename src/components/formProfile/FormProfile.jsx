import styles from './FormProfile.module.css'

import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useContext } from 'react'
import { BurgerContext } from '../../context/BurgerContext'

const FormProfile = () => {
  const context = useContext(BurgerContext)

  return (
    <form className={`${styles.form} flex flex-col gap-6 mb-10`
    }>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value={context.user?.name || ''}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        disabled
        readOnly
      />

      <EmailInput
        value={context.user?.email || ''}
        name={'email'}
        placeholder="Логин"
        readOnly
        disabled
      />
    </form>
  )
}

export default FormProfile