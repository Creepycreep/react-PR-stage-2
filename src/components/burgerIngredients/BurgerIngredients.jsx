import styles from './BurgerIngredients.module.css'

import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useEffect } from "react"

import Modal from '../modal/Modal'

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
  }, [])

  return (
    <>
      <div className="col flex flex-col gap-10">
        <ul className="flex">
          {ingredients.map(item => {
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
          {ingredients.map(item => {
            return (
              <section key={item.category}>
                <h2 className="text text_type_main-medium mb-6">
                  {item.russianCategory}
                </h2>

                <ul className={`${styles.grid} pl-4 pr-4`}>
                  {item.items.map(elem => {
                    return (
                      <li key={elem._id}>
                        <div className={`${styles.card} p-4`}>
                          <Counter count={1} size="default" extraClass="m-1" />
                          <img src={elem.image} alt="" />
                          <p className="text text_type_digits-default mt-1 mb-1 flex flex-align-center gap-2">
                            <span>{elem.price}</span>
                            <CurrencyIcon type="primary" />
                          </p>
                          <div className="text text_type_main-small">{elem.name}</div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </div>

      <Modal />
    </>

  )
}

export default BurgerIngredients