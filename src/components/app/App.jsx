import './App.css';

import React, { useEffect, useState, useCallback, useReducer } from 'react';
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
    case 'PRICE_INC': {
      return {
        price: state.price + action.payload
      }
    }
    case 'PRICE_DEC': {
      return {
        price: state.price - action.payload
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function App() {
  const [ingredients, setIngredients] = useState([])
  const [detailIngredient, setDetailIngredient] = useState({})
  const [order, setOrder] = useState({ bun: null, ingredients: [] })

  const [isModalIngredientVisible, setIsModalIngredientVisible] = useState(false);
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);

  const [orderPrice, dispatch] = useReducer(reducer, { price: 0 });
  const getData = new ingredientsService();

  const handleIngredient = useCallback(
    (elem) => {
      setDetailIngredient(elem)
    }, [])

  const addIngredient = useCallback((elem) => {
    if (elem.type === 'bun') {
      setOrder({ ...order, bun: elem })
    } else {
      setOrder({ ...order, ingredients: [...order.ingredients, elem] })
    }

    dispatch({ type: 'PRICE_INC', payload: elem.price })
  }, [order])

  const removeIngredient = (elem, i) => {
    const filteredIngredients = order.ingredients.filter((elem, index) => index !== i);
    setOrder({ ...order, ingredients: filteredIngredients })
    dispatch({ type: 'PRICE_DEC', payload: elem.price })
  }

  useEffect(() => {
    getData.getIngredients()
      .then(res => {
        if (!res) {
          throw new Error('Error!')
        }

        setIngredients(res);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <BurgerOrderContext.Provider value={order}>
      <Header />
      <main>
        <div className="container">
          <h1 className='text text_type_main-default text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
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
              orderPrice={orderPrice}
            />
          </div>
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
            {<OrderDetails />}
          </Modal>
          : null}
      </main>
    </BurgerOrderContext.Provider>
  );
}

export default App;
