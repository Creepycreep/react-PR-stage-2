import './App.css';

import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import { BurgerOrderContext } from '../../context/BurgerOrderContext'

import Modal from '../modal/Modal'
import Header from '../header/Header';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import IngredientDetails from '../ingredientDetails/IngredientDetails'
import OrderDetails from '../orderDetails/OrderDetails';

// import { data } from '../../utils/data'
import ingredientsService from '../../utils/api';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        price: state.price + action.payload.price
      }
    }
    case 'REMOVE': {
      return {
        ...state,
        ingredients: action.ingredients,
        price: state.price - action.removedIng.price
      }
    }
    case 'BUN_CHANGE': {
      const prevBunPrice = state.bun ? state.bun.price : 0
      return {
        ...state,
        bun: action.payload,
        price: state.price - prevBunPrice + action.payload.price
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function App() {
  const [ingredients, setIngredients] = useState([])
  const [detailIngredient, setDetailIngredient] = useState({})
  const [order, dispatch] = useReducer(reducer, { bun: null, ingredients: [], price: 0 });

  const [isModalIngredientVisible, setIsModalIngredientVisible] = useState(false);
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);
  const [orderNum, setOrderNum] = useState(null);

  const getData = new ingredientsService();

  const handleIngredient = useCallback(
    (elem) => {
      setDetailIngredient(elem)
    }, [])

  const addIngredient = useCallback((elem) => {
    if (elem.type === 'bun') {
      dispatch({ type: 'BUN_CHANGE', payload: elem })
    } else {
      dispatch({ type: 'ADD', payload: elem })
    }

  }, [order])

  const removeIngredient = (elem, i) => {
    const filteredIngredients = order.ingredients.filter((elem, index) => index !== i);
    dispatch({ type: 'REMOVE', removedIng: elem, ingredients: filteredIngredients })
  }

  const makeOrder = async () => {
    const data = [...order.ingredients.map(elem => elem._id), order.bun._id]
    console.log(data);
    getData.postOrder(order.ingredients).then(res => {
      setOrderNum(res.order.number)
    }).catch(console.error);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData.getIngredients();
      setIngredients(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (orderNum) {
      setIsModalOrderVisible(true)
    }
  }, [orderNum])

  return (
    <BurgerOrderContext.Provider value={order}>
      <Header />
      <main>
        <div className="container">
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
                setModalVisibility={setIsModalOrderVisible}
                removeIngredient={removeIngredient}
                orderPrice={order}
                makeOrder={makeOrder}
              />
            </div>
          </DndProvider>
        </div>

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
            {<OrderDetails num={orderNum} />}
          </Modal>
          : null}
      </main>
    </BurgerOrderContext.Provider >
  );
}

export default App;
