import styles from './Ingredient.module.css'
import { ingredient } from '../../types/Types'

import { useDrag } from 'react-dnd'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Ingredient = ({ onIngredientClick, elem, onChoose }: {
  onIngredientClick: (elem: ingredient) => void, elem: ingredient, onChoose: (elem: ingredient) => void
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { elem },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onChoose(elem)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1

  return (
    <div
      ref={drag}
      style={{ opacity }}
      className={`${styles.card} p-4`}
      onClick={() => onIngredientClick(elem)}
    >
      <img src={elem.image} alt={elem.name} />
      <p className="text text_type_digits-default mt-1 mb-1 flex flex-align-center gap-2">
        <span>{elem.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <div className="text text_type_main-small">{elem.name}</div>
    </div>
  )
}


export default Ingredient