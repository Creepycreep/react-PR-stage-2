import styles from './OrderDetails.module.css'
import done from '../../images/done.png'

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const OrderDetails = ({ num }: { num: number | null }) => {
  return (
    <div className={styles.card}>
      <h3 className="text text_type_digits-large mb-8">{num}</h3>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={styles.icon + ' mt-10 mb-10'}>
        <img src={done} alt="" />
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails