import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState, useCallback, useContext, useEffect } from 'react';

import { Ingredient, Category } from '../types/Types';

import BurgerIngredients from '../components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/BurgerConstructor';

import IngredientDetails from '../components/ingredientDetails/IngredientDetails'
import OrderDetails from '../components/orderDetails/OrderDetails';

import Modal from '../components/modal/Modal'

import { BurgerContext } from '../context/BurgerContext'
import IngredientsService from "../service/ingredientsService";

type Props = {
  addIngredient: (elem: Ingredient) => void
  makeOrder: () => Promise<void>,
  removeIngredient: (elem: Ingredient, i: number) => void,
  isOrderLoading: boolean
}
const MainPage = ({ isOrderLoading, addIngredient, removeIngredient, makeOrder }: Props) => {
  const order = useContext(BurgerContext)

  const [detailIngredient, setDetailIngredient] = useState<Ingredient | null>(null)
  const [ingredients, setIngredients] = useState<Array<Category>>([])

  const handleIngredient = useCallback(
    (elem: Ingredient) => {
      setDetailIngredient(elem)
    }, [])

  // const handleIngredient = (elem: Ingredient) => {
  //   setDetailIngredient(elem)
  // }

  const [isModalIngredientVisible, setIsModalIngredientVisible] = useState(false);
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);

  useEffect(() => {
    // @TODO двойной вызов
    const fetchData = async () => {
      const data = await IngredientsService.getIngredients();
      setIngredients(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (order?.orderNum) {
      setIsModalOrderVisible(true)
    }
  }, [order?.orderNum])

  return (
    <>
      <h1 className='text text_type_main-default text_type_main-large pt-10 pb-5'>Соберите бургер</h1>

      <DndProvider backend={HTML5Backend}>
        <div className='flex gap-5 flex-justify-between'>
          <BurgerIngredients
            ingredients={ingredients}
            handleIngredient={handleIngredient}
            setModalVisibility={setIsModalIngredientVisible}
            onChoose={addIngredient}
          />

          <BurgerConstructor
            isOrderLoading={isOrderLoading}
            removeIngredient={removeIngredient}
            makeOrder={makeOrder}
          />
        </div>
      </DndProvider>

      {isModalIngredientVisible &&
        <Modal title='Детали ингредиента'
          setVisibility={setIsModalIngredientVisible}
        >
          <IngredientDetails ingredient={detailIngredient} />
        </Modal>}

      {isModalOrderVisible &&
        <Modal setVisibility={setIsModalOrderVisible}
        >
          {<OrderDetails num={order ? order.orderNum : 0} />}
        </Modal>}
    </>
  )
}

export default MainPage
