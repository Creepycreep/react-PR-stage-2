import React, { useCallback, useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BurgerContext } from '../../context/BurgerContext'
import Header from '../header/Header';

import MainPage from '../../pages/Main';
import ErrorPage from '../../pages/404';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import { Context, Ingredient, User } from '../../types/Types';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';

import IngredientsService from '../../service/ingredientsService';
import { userService } from '../../service/userService'

import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

enum ActionTypeEnum {
  user = 'USER',
  addIngredient = 'ADD',
  remove = 'REMOVE',
  bunChange = 'BUN_CHANGE',
  makeOrder = 'MAKE_ORDER',
  refreshOrder = 'REFRESH_ORDER',
}

interface ActionData<Type = ActionType, Payload = {}> {
  type: Type;
  payload: Payload;
}

type ActionType =
  ActionData<ActionTypeEnum.user, { user: User | null }>
  |
  ActionData<ActionTypeEnum.addIngredient, { ingredient: Ingredient }>
  |
  ActionData<ActionTypeEnum.bunChange, {
    ingredient: Ingredient;
  }>
  |
  ActionData<ActionTypeEnum.remove, {
    ingredients: Array<Ingredient>;
    removedIng: Ingredient;
  }>
  |
  ActionData<ActionTypeEnum.makeOrder, number>
  |
  ActionData<ActionTypeEnum.refreshOrder, {}>
  ;

function reducer(state: Context, action: ActionType): Context {
  switch (action.type) {
    case ActionTypeEnum.user: {
      return {
        ...state,
        user: action.payload.user
      }
    }
    case ActionTypeEnum.addIngredient: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient],
        price: state.price + action.payload.ingredient.price,
      }
    }
    case ActionTypeEnum.bunChange: {
      const prevBunPrice = state.bun ? state.bun.price : 0
      return {
        ...state,
        bun: action.payload.ingredient,
        price: state.price - prevBunPrice + action.payload.ingredient.price,
      }
    }
    case ActionTypeEnum.remove: {
      return {
        ...state,
        ingredients: action.payload.ingredients,
        price: state.price - action.payload.removedIng.price
      }
    }

    case ActionTypeEnum.makeOrder: {
      return {
        ...state,
        orderNum: action.payload
      }
    }
    case ActionTypeEnum.refreshOrder: {
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
    dispatch({ type: ActionTypeEnum.user, payload: { user: user } })
  }

  const addIngredient = useCallback((ingredient: Ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({ type: ActionTypeEnum.bunChange, payload: { ingredient: ingredient } })
    } else {
      dispatch({ type: ActionTypeEnum.addIngredient, payload: { ingredient: ingredient } })
    }
  }, [order])

  const removeIngredient = (elem: Ingredient, i: number) => {
    const filteredIngredients = order.ingredients.filter((elem: Ingredient, index: number) => index !== i);
    dispatch({
      type: ActionTypeEnum.remove,
      payload: { removedIng: elem, ingredients: filteredIngredients }
    })
  }

  const makeOrder = async () => {
    const data = order.bun ? [...order.ingredients.map((elem: Ingredient) => elem._id), order.bun._id] : [...order.ingredients.map((elem: Ingredient) => elem._id)]
    setisOrderLoading(true)

    IngredientsService.postOrder(data).then(res => {
      dispatch({ type: ActionTypeEnum.makeOrder, payload: res.order.number })
      setisOrderLoading(false)
    }).then(res => {
      dispatch({ type: ActionTypeEnum.refreshOrder, payload: {} })
    }).catch(console.error);
  }

  useEffect(() => {
    // @TODO двойной вызов
    user.checkUserAuth(setUser, setIsChecked);
  }, [])

  return (
    <Router basename="/react-PR-stage-2">
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
