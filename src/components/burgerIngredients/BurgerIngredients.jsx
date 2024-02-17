import styles from './BurgerIngredients.module.css'
import { useState, memo, useEffect } from "react"

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import Ingredient from '../inrgredient/Ingredient'

const BurgerIngredients = memo(function BurgerIngredients({ ingredients, setModalVisibility, handleIngredient, onChoose }) {
  const [current, setCurrent] = useState('bun');

  const onIngredientClick = (elem) => {
    handleIngredient(elem)
    setModalVisibility(true)
  }

  return (
    <>
      <div className="col flex flex-col gap-10">
        <ul className="flex">
          {ingredients.map((item) => {
            return (
              <li key={item.russianCategory}>
                <Tab value={item.category} active={current === item.category} onClick={setCurrent}>
                  {item.russianCategory}
                </Tab>
              </li>
            )
          })}
        </ul>

        <div className={`${styles.scrollbar} custom-scroll  flex flex-col gap-10`}>
          {ingredients.map((item, i) => {
            return (
              <section key={item.category} >
                <h2 className="text text_type_main-medium mb-6">
                  {item.russianCategory}
                </h2>

                <ul className={`${styles.grid} pl-4 pr-4`}>
                  {item.items.map(elem => {
                    return (
                      <li key={elem._id}>
                        <Ingredient
                          elem={elem}
                          onIngredientClick={onIngredientClick}
                          onChoose={onChoose}
                        />
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
})

export default BurgerIngredients