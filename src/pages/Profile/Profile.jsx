import styles from './Profile.module.css'

import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import FormProfile from '../../components/formProfile/FormProfile';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <Link className='text text_type_main-medium'>Профиль</Link>
          <Link className='text text_type_main-medium text_color_inactive'>История заказов</Link>
          <button className='text text_type_main-medium text_color_inactive'>Выход</button>
        </nav>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>

      <FormProfile />

    </div>
  )
}

export default Profile