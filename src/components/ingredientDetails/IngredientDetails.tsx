import { Ingredient } from '../../types/Types'

import styles from './IngredientDetails.module.css'

const IngredientDetails = ({ ingredient }: { ingredient: Ingredient | null }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={ingredient?.image_large} alt={ingredient?.name} />
      </div>

      <h3 className="mt-4 text text_type_main-medium">
        {ingredient?.name}
      </h3>
      <div className=" mt-8 flex gap-5">
        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
        </div>

        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
        </div>

        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
        </div>

        <div className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
        </div>
      </div>
    </div >
  )
}

export default IngredientDetails