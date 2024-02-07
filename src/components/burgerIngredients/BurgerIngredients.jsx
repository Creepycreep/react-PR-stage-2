import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState('one')

  return (
    <div className="flex">
      <Tab value="Булки" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
    </div>
  )
}

export default BurgerIngredients