import styles from './BurgerConstructor.module.css'

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useContext } from 'react';

import { BurgerOrderContext } from '../../context/BurgerOrderContext'

const BurgerConstructor = ({ setModalVisibility, removeIngredient, orderPrice }) => {
  const ingredients = useContext(BurgerOrderContext)

  return (
    <div className=' col custom-scroll flex flex-col'>
      <section className={styles.col + ' gap-5 flex flex-col'}>
        {ingredients.bun ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ingredients.bun.name} (верх)`}
            price={ingredients.bun.price}
            thumbnail={ingredients.bun.image}
          />
          : null}

        {ingredients.ingredients.length ?
          <ul className={styles.list + ' custom-scroll col gap-5 flex flex-col'}>
            {ingredients.ingredients.map((element, i) => {
              return (
                <li key={element._id + i}>
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                    handleClose={() => removeIngredient(element, i)}
                  />
                </li>
              )
            })}
          </ul>
          : null}

        {ingredients.bun ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredients.bun.name} (низ)`}
            price={ingredients.bun.price}
            thumbnail={ingredients.bun.image}
          />
          : null}

        {ingredients.bun ?
          <div className={styles.total + ' flex flex-align-center pt-5 gap-10'}>
            <p className="text text_type_digits-medium">
              <span className='mr-2'>
                {orderPrice.price}
              </span>
              <CurrencyIcon type="primary" />
            </p>
            <Button htmlType="button" type="primary" size="large" onClick={() => { setModalVisibility(true) }}>
              Оформить заказ
            </Button>
          </div>
          : null}
      </section>
    </div>
  )
}

export default BurgerConstructor