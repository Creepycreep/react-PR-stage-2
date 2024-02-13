import React, { useEffect, useState } from 'react';
import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import { BurgerIngredientsContext } from '../../context/BurgerIngredientsContext'

import Header from '../header/Header';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
// import { data } from '../../utils/data'
import ingredientsService from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([])
  const [detailIngredient, setDetailIngredient] = useState({})

  const getData = new ingredientsService();

  const handleIngredient = (id, i) => {
    const ingredient = ingredients[i].items.filter(elem => elem._id === id)[0]
    setDetailIngredient(ingredient)
  }

  useEffect(() => {
    getData.fetchIngredients()
      .then(res => {
        if (!res) {
          throw new Error('Error!')
        }

        setIngredients(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <BurgerIngredientsContext.Provider value={ingredients}>
      <Header />
      <main>
        <div className="container">
          <h1 className='text text_type_main-default text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
          <div className='flex gap-5 flex-justify-between'>
            <BurgerIngredients
              detailIngredient={detailIngredient}
              handleIngredient={handleIngredient}
            />

            <BurgerConstructor />
          </div>
        </div>
      </main>
    </BurgerIngredientsContext.Provider>
  );
}

export default App;
