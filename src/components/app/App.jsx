import React, { useEffect, useState } from 'react';
import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import { BurgerOrderContext } from '../../context/BurgerOrderContext'

import Header from '../header/Header';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
// import { data } from '../../utils/data'
import ingredientsService from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([])
  const [detailIngredient, setDetailIngredient] = useState({})
  const [order, setOrder] = useState({ bun: null, ingredients: [] })

  const getData = new ingredientsService();

  const handleIngredient = (elem) => {
    setDetailIngredient(elem)
  }

  const addIngredient = (elem) => {
    if (elem.type === 'bun') {
      setOrder({ ...order, bun: elem })
    } else {
      setOrder({ ...order, ingredients: [...order.ingredients, elem] })
    }
  }

  useEffect(() => {
    getData.fetchIngredients()
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
              detailIngredient={detailIngredient}
              handleIngredient={handleIngredient}
              onChoose={addIngredient}
            />

            <BurgerConstructor />
          </div>
        </div>
      </main>
    </BurgerOrderContext.Provider>
  );
}

export default App;
