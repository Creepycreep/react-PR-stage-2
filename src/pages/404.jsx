import { Button } from "@ya.praktikum/react-developer-burger-ui-components"

const ErrorPage = () => {
  return (
    <div>
      <p className="text text_type_digits-medium">404</p>
      <h1>Упс, такой страницы не существует</h1>
      <Button>На главную</Button>
    </div>
  )
}

export default ErrorPage