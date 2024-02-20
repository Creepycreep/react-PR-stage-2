import { Link } from 'react-router-dom';
import FormLogin from '../components/formLogin/FormLogin'

const Login = () => {
  return (
    <div className="center-page">
      <h1 className="text text_type_main-medium">Вход</h1>
      <FormLogin />
      <div className="row flex">
        <p className='text text_type_main-default text_color_inactive mr-2'>Вы — новый пользователь? </p>
        <Link to='/react-PR-stage-2/register' className='link text text_type_main-default'>Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Login