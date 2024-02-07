import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className="container _header flex flex-align-center">
        <a className='flex flex-align-center p-5 mr-2'>
          <BurgerIcon type="primary" />
          <span className='text pl-2 text_type_main-default'>Конструктор</span>
        </a>

        <a className='flex flex-align-center mr-a p-5'>
          <ListIcon type="secondary" />
          <span className='text pl-2 text_type_main-default text_color_inactive'>Лента заказов</span>
        </a>

        <a className='flex flex-align-center ml-a p-5'>
          <ProfileIcon type="secondary" />
          <span className='pl-2 text text_type_main-default text_color_inactive'>Личный кабинет</span>
        </a>

        <div className={styles.logo}>
          <Logo />
        </div>
      </nav>
    </header>
  )
}

export default Header