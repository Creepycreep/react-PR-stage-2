import styles from './OrderDetails.module.css'
import done from '../../images/done.png'

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const OrderDetails = () => {
  return (
    <div className={styles.card + ' mt-15 mb-15'}>
      <h3 className="text text_type_digits-large mb-8">034536</h3>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={styles.icon + ' mt-15 mb-15'}>
        <img src={done} alt="" />
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails