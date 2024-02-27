import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";
import { User } from '../../types/Types';

import { Link } from 'react-router-dom';
import FormProfile from '../../components/formProfile/FormProfile';

import { userService } from '../../service/userService'
const Profile = ({ setUser }: { setUser: (user: User | null) => void }) => {
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
          <Link to='/profile' className='text text_type_main-medium'>Профиль</Link>
          <button onClick={onClick} className='text text_type_main-medium text_color_inactive'>Выход</button>
        </nav>
      </aside>

      <FormProfile />

    </div>
  )
}

export default Profile