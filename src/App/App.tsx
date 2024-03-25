import React, { useCallback, useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BurgerContext } from '../context/BurgerContext'
import Header from '../components/header/Header';

import MainPage from '../pages/Main';
import ErrorPage from '../pages/404';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { Context, Ingredient, User } from '../types/Types';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

import IngredientsService from '../service/ingredientsService';
import { userService } from '../service/userService'

import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'


const actionType = {
  user: 'USER',
  addIngredient: 'ADD',
  remove: 'REMOVE',
  bunChange: 'BUN_CHANGE',
  makeOrder: 'MAKE_ORDER',
  refreshOrder: 'REFRESH_ORDER',
} as const;



interface ActionData<Type = ActionType, Payload = {}> {
  type: Type;
  payload: Payload;
}

type ActionType =
  ActionData<typeof actionType.user, { user: User | null }>
  |
  ActionData<typeof actionType.addIngredient, { ingredient: Ingredient }>
  |
  ActionData<typeof actionType.bunChange, {
    ingredient: Ingredient;
  }>
  |
  ActionData<typeof actionType.remove, {
    ingredients: Array<Ingredient>;
    removedIng: Ingredient;
  }>
  |
  ActionData<typeof actionType.makeOrder, number>
  |
  ActionData<typeof actionType.refreshOrder, {}>
  ;

function reducer(state: Context, action: ActionType): Context {
  switch (action.type) {
    case actionType.user: {
      return {
        ...state,
        user: action.payload.user
      }
    }
    case actionType.addIngredient: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient],
        price: state.price + action.payload.ingredient.price,
      }
    }
    case actionType.bunChange: {
      const prevBunPrice = state.bun ? state.bun.price : 0
      return {
        ...state,
        bun: action.payload.ingredient,
        price: state.price - prevBunPrice + action.payload.ingredient.price,
      }
    }
    case actionType.remove: {
      return {
        ...state,
        ingredients: action.payload.ingredients,
        price: state.price - action.payload.removedIng.price
      }
    }

    case actionType.makeOrder: {
      return {
        ...state,
        orderNum: action.payload
      }
    }
    case actionType.refreshOrder: {
      return {
        ...state,
        bun: null,
        ingredients: [],
        price: 0
      }
    }
    default: {
      throw new Error('Unknown action');
    }
  }
}

function App() {
  const user = new userService()

  const [isChecked, setIsChecked] = useState(false)
  const [isOrderLoading, setisOrderLoading] = useState(false)

  const [order, dispatch] = useReducer<React.Reducer<Context, ActionType>>(reducer, { user: null, bun: null, ingredients: [], price: 0, orderNum: null });

  const setUser = (user: User | null) => {
    dispatch({ type: actionType.user, payload: { user: user } })
  }

  const addIngredient = useCallback((ingredient: Ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({ type: actionType.bunChange, payload: { ingredient: ingredient } })
    } else {
      dispatch({ type: actionType.addIngredient, payload: { ingredient: ingredient } })
    }
  }, [order])

  const removeIngredient = (elem: Ingredient, i: number) => {
    const filteredIngredients = order.ingredients.filter((elem: Ingredient, index: number) => index !== i);
    dispatch({
      type: actionType.remove,
      payload: { removedIng: elem, ingredients: filteredIngredients }
    })
  }

  const makeOrder = async () => {
    const data = order.bun ? [...order.ingredients.map((elem: Ingredient) => elem._id), order.bun._id] : [...order.ingredients.map((elem: Ingredient) => elem._id)]
    setisOrderLoading(true)

    IngredientsService.postOrder(data).then(res => {
      dispatch({ type: actionType.makeOrder, payload: res.order.number })
      setisOrderLoading(false)
    }).then(res => {
      dispatch({ type: actionType.refreshOrder, payload: {} })
    }).catch(console.error);
  }

  useEffect(() => {
    // @TODO двойной вызов
    user.checkUserAuth(setUser, setIsChecked);
  }, [])

  return (
    <Router>
      <BurgerContext.Provider value={order}>
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route path="/"
                element={
                  <MainPage
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                    makeOrder={makeOrder}
                    isOrderLoading={isOrderLoading}
                  />
                } />

              <Route path='/profile' element={
                isChecked ?
                  <ProtectedRoute user={order.user}>
                    <Profile setUser={setUser} />
                  </ProtectedRoute>
                  : null
              } />

              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />

              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
      </BurgerContext.Provider >
    </Router >
  );
}

export default App;
