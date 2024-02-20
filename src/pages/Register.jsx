import { Link } from 'react-router-dom';

import FormRegister from '../components/formRegister/FormRegister'

const Register = ({ setUser }) => {
  return (
    <div className="center-page">
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <FormRegister setUser={setUser} />
      <div className="row flex">
        <p className='text text_type_main-default text_color_inactive mr-2'>Уже зарегистрированы?</p>
        <Link to='/login' className=' link text text_type_main-default'>Войти</Link>
      </div>
    </div>
  )
}

export default Register