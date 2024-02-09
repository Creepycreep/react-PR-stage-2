import styles from './BurgerConstructor.module.css'
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const BurgerConstructor = () => {
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

        <div className={styles.list + ' custom-scroll col gap-5 flex flex-col'}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />

          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
          // thumbnail={img}
          />
        </div>

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
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    </div>
  )
}

export default BurgerConstructor