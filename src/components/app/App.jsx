import React, { useEffect, useState } from 'react';
import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import Header from '../header/Header';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';

import { data } from '../../utils/data'

function App() {
  const [ingredients, setIngredients] = useState(data)
  const [categories, setCategories] = useState(data)

  useEffect(() => {
    setCategories(state => {
      const categoriesSet = new Set(categories.map(item => {
        return item.type
      }))
      return Array.from(categoriesSet)
    })

  }, [])

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h1 className='text text_type_main-default text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
          <div className='flex gap-20'>
            <BurgerIngredients ingredients={ingredients} />

          </div>
        </div>
      </main>
    </>
  );
}

export default App;
