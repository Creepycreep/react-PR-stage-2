import styles from './BurgerConstructor.module.css'

import { useDrop } from 'react-dnd'
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useContext } from 'react';

import { BurgerOrderContext } from '../../context/BurgerOrderContext'

const BurgerConstructor = ({ makeOrder, removeIngredient, orderPrice }) => {
  const order = useContext(BurgerOrderContext)

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: 'box',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div className={'col custom-scroll flex flex-col'}>
      <section ref={drop} className={`${canDrop ? styles['can-drop'] : ''} ${styles.col} gap-5 flex flex-col`}>
        {order.bun ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${order.bun.name} (верх)`}
            price={order.bun.price}
            thumbnail={order.bun.image}
          />
          : null}

        {order.ingredients.length ?
          <ul className={styles.list + ' custom-scroll col gap-5 flex flex-col'}>
            {order.ingredients.map((element, i) => {
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

        {order.bun ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${order.bun.name} (низ)`}
            price={order.bun.price}
            thumbnail={order.bun.image}
          />
          : null}
      </section>


      <div className={styles.total + ' flex flex-align-center pt-5 gap-10'}>
        <p className="text text_type_digits-medium">
          <span className='mr-2'>
            {orderPrice.price}
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          disabled={!(order.bun && order.ingredients.length)}
          htmlType="button"
          type="primary"
          size="large"
          onClick={makeOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor