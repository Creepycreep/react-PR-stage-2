import styles from './BurgerConstructor.module.css'

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from 'react';

import Modal from '../modal/Modal'
import OrderDetails from '../orderDetails/OrderDetails';

const BurgerConstructor = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <div className=' col custom-scroll flex flex-col'>
      <section className={styles.col + ' gap-5 flex flex-col'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
        // thumbnail={img}
        />

        <ul className={styles.list + ' custom-scroll col gap-5 flex flex-col'}>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
          <li>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
            // thumbnail={img}
            />
          </li>
        </ul>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
        // thumbnail={img}
        />

        <div className={styles.total + ' flex flex-align-center pt-5 gap-10'}>
          <p className="text text_type_digits-medium">
            <span className='mr-2'>1230</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={() => { setModalVisibility(true) }}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {modalVisibility ?
        <Modal setVisibility={setModalVisibility}
        >
          {<OrderDetails />}
        </Modal>
        : null}
    </div>
  )
}

export default BurgerConstructor