import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import FormProfile from '../../components/formProfile/FormProfile';

import { userService } from '../../service/userService'
const Profile = ({ setUser }) => {
  const logout = new userService()
  const navigate = useNavigate()

  const onClick = async () => {
    const log = await logout.userLogout()
    setUser(null)
    navigate('/login')
  }

  return (
    <div className={styles.profile}>
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <Link className='text text_type_main-medium'>Профиль</Link>
          <Link className='text text_type_main-medium text_color_inactive'>История заказов</Link>
          <button onClick={onClick} className='text text_type_main-medium text_color_inactive'>Выход</button>
        </nav>
      </aside>

      <FormProfile />

    </div>
  )
}

export default Profile