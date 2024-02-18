import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <p className="text text_type_digits-large">404</p>
      <h1 className="text text_type_main-large">Упс, такой страницы не существует</h1>
      <Button htmlType="button" type="primary" size="large">На главную</Button>
    </div>
  )
}

export default ErrorPage