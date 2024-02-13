import styles from './BurgerIngredients.module.css'

import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useContext } from "react"
import { BurgerIngredientsContext } from '../../context/BurgerIngredientsContext'

import Modal from '../modal/Modal'
import IngredientDetails from '../ingredientDetails/IngredientDetails'

const BurgerIngredients = ({ detailIngredient, handleIngredient }) => {
  const [current, setCurrent] = useState(0)
  const [modalVisibility, setModalVisibility] = useState(false);

  const ingredients = useContext(BurgerIngredientsContext)

  const onIngredientClick = (elem, i) => {
    handleIngredient(elem, i)
    setModalVisibility(true)
  }

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
          {ingredients.map((item, i) => {
            return (
              <section key={item.category}>
                <h2 className="text text_type_main-medium mb-6">
                  {item.russianCategory}
                </h2>

                <ul className={`${styles.grid} pl-4 pr-4`}>
                  {item.items.map(elem => {
                    return (
                      <li key={elem._id}>
                        <div
                          className={`${styles.card} p-4`}
                          onClick={() => onIngredientClick(elem._id, i)}
                        >
                          <Counter count={1} size="default" extraClass="m-1" />
                          <img src={elem.image} alt={elem.name} />
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

      {modalVisibility ?
        <Modal title='Детали ингредиента'
          setVisibility={setModalVisibility}
        >
          <IngredientDetails ingredient={detailIngredient} />
        </Modal>
        : null}
    </>
  )
}

export default BurgerIngredients