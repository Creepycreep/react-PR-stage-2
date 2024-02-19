import { Link } from 'react-router-dom';
import FormForgot from '../components/formForgot/FormForgot'

const ForgotPassword = () => {
  return (
    <div className="center-page">
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <FormForgot />
      <div className="row flex">
        <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
        <Link to='/react-PR-stage-2/login' className=' link text text_type_main-default'>Войти</Link>
      </div>
    </div>
  )
}

export default ForgotPassword