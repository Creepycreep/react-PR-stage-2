import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='center-page'>
      <p className="text text_type_digits-large">404</p>
      <h1 className="text text_type_main-large">Упс, такой страницы не существует</h1>
      <Link to="/" className="link text text_type_main-default">На главную</Link>
    </div>
  )
}

export default ErrorPage