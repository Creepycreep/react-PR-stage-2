import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState, useCallback, useContext, useEffect } from 'react';

import BurgerIngredients from '../components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/BurgerConstructor';

import IngredientDetails from '../components/ingredientDetails/IngredientDetails'
import OrderDetails from '../components/orderDetails/OrderDetails';

import Modal from '../components/modal/Modal'

import { BurgerOrderContext } from '../context/BurgerOrderContext'

const MainPage = ({ ingredients, addIngredient, removeIngredient, makeOrder }) => {
  const order = useContext(BurgerOrderContext)

  const [detailIngredient, setDetailIngredient] = useState({})

  const handleIngredient = useCallback(
    (elem) => {
      setDetailIngredient(elem)
    }, [])

  const [isModalIngredientVisible, setIsModalIngredientVisible] = useState(false);
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);

  useEffect(() => {
    if (order.orderNum) {
      setIsModalOrderVisible(true)
    }
  }, [order.orderNum])

  return (
    <>
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
            orderPrice={order}
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
          {<OrderDetails num={order.orderNum} />}
        </Modal>
        : null}
    </>
  )
}

export default MainPage