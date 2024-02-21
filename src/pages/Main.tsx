import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState, useCallback, useContext, useEffect } from 'react';

import { ingredient, category } from '../types/Types';

import BurgerIngredients from '../components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/BurgerConstructor';

import IngredientDetails from '../components/ingredientDetails/IngredientDetails'
import OrderDetails from '../components/orderDetails/OrderDetails';

import Modal from '../components/modal/Modal'

import { BurgerContext } from '../context/BurgerContext'
import ingredientsService from '../service/ingredientsService';

type Props = {
  addIngredient: (elem: ingredient) => void
  makeOrder: () => Promise<void>,
  removeIngredient: (elem: ingredient, i: number) => void
}
const MainPage = ({ addIngredient, removeIngredient, makeOrder }: Props) => {
  const order = useContext(BurgerContext)
  const getData = new ingredientsService();

  const [detailIngredient, setDetailIngredient] = useState<ingredient | null>(null)
  const [ingredients, setIngredients] = useState<Array<category>>([])

  const handleIngredient = useCallback(
    (elem: ingredient) => {
      setDetailIngredient(elem)
    }, [])

  const [isModalIngredientVisible, setIsModalIngredientVisible] = useState(false);
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData.getIngredients();
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
            removeIngredient={removeIngredient}
            makeOrder={makeOrder}
          />
        </div>
      </DndProvider>

      {isModalIngredientVisible ?
        <Modal title='Детали ингредиента'
          setVisibility={setIsModalIngredientVisible}
        >
          <IngredientDetails ingredient={detailIngredient} />
        </Modal>
        : null}

      {isModalOrderVisible ?
        <Modal setVisibility={setIsModalOrderVisible}
        >
          {<OrderDetails num={order ? order.orderNum : 0} />}
        </Modal>
        : null}
    </>
  )
}

export default MainPage