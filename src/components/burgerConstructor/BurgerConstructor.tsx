import { Ingredient } from '../../types/Types';

import { useDrop } from 'react-dnd'
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { BurgerContext } from '../../context/BurgerContext'
import styles from './BurgerConstructor.module.css'

type BurgerConstructorType = {
  makeOrder: () => Promise<void>,
  removeIngredient: (elem: Ingredient, i: number) => void,
  isOrderLoading: boolean
}

const BurgerConstructor = ({ makeOrder, removeIngredient, isOrderLoading }: BurgerConstructorType) => {
  const order = useContext(BurgerContext)
  const navigate = useNavigate()

  const onClick = () => {
    if (order && !order.user) {
      navigate('/login')
      return
    }

    makeOrder()
  }

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: 'box',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div className={'col custom-scroll flex flex-col'}>
      <section ref={drop} className={`${canDrop ? styles['can-drop'] : ''} ${styles.col} gap-5 flex flex-col`}>
        {order?.bun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${order.bun.name} (верх)`}
            price={order.bun.price}
            thumbnail={order.bun.image}
          />}

        {order?.ingredients.length &&
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
          </ul>}

        {order?.bun && <ConstructorElement
          type="bottom"
          extraClass={'bottom-bun'}
          isLocked={true}
          text={`${order.bun.name} (низ)`}
          price={order.bun.price}
          thumbnail={order.bun.image}
        />}
      </section>


      <div className={styles.total + ' flex flex-align-center pt-5 gap-10'}>
        <p className="text text_type_digits-medium">
          <span className='mr-2'>
            {order?.price}
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          disabled={!(order?.bun && order?.ingredients.length) || isOrderLoading}
          htmlType="button"
          type="primary"
          size="large"
          onClick={onClick}>
          {isOrderLoading ? 'Ожидайте' : 'Оформить заказ'}
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor
