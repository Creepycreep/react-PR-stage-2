import styles from './BurgerIngredients.module.css'

import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useEffect } from "react"


const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
  }, [])

  return (
    <div className="col flex flex-col gap-10">
      <div className="flex">
        {ingredients.map(item => {
          return (
            <Tab key={item.category} value={item.category} active={current === item.category} onClick={setCurrent}>
              {item.russianCategory}
            </Tab>
          )
        })}
      </div>

      <div className={`${styles.scrollbar} custom-scroll  flex flex-col gap-10`}>
        {ingredients.map(item => {
          return (
            <section key={item.category}>
              <h2 key={item.category} className="text text_type_main-medium mb-6">
                {item.russianCategory}
              </h2>

              <div className={`${styles.grid} pl-4 pr-4`}>
                {item.items.map(elem => {
                  return (
                    <div key={elem.name} className={`${styles.card} p-4`}>
                      <Counter count={1} size="default" extraClass="m-1" />
                      <img src={elem.image} alt="" />
                      <p className="text text_type_digits-default mt-1 mb-1 flex flex-align-center gap-2">
                        <span>{elem.price}</span>
                        <CurrencyIcon type="primary" />
                      </p>
                      <div className="text text_type_main-small">{elem.name}</div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default BurgerIngredients