import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useEffect } from "react"

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
  }, [])

  return (
    <div className="flex">
      {ingredients.map(item => {
        return (
          <Tab key={item.category} value={item.category} active={current === 0} onClick={setCurrent}>
            {item.russianCategory}
          </Tab>
        )
      })}
    </div>
  )
}

export default BurgerIngredients