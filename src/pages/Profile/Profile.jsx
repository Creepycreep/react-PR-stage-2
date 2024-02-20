import styles from './Profile.module.css'

import { Link } from 'react-router-dom';
import FormProfile from '../../components/formProfile/FormProfile';

import { userService } from '../../service/userService'
const Profile = ({ setUser }) => {
  const logout = new userService()

  const onClick = async () => {
    const log = await logout.userLogout()
    setUser(null)
  }

  return (
    <div className={styles.profile}>
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <Link className='text text_type_main-medium'>Профиль</Link>
          <Link className='text text_type_main-medium text_color_inactive'>История заказов</Link>
          <button onClick={onClick} className='text text_type_main-medium text_color_inactive'>Выход</button>
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