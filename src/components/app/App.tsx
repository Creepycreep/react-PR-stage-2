import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import { useCallback, useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BurgerContext } from '../../context/BurgerContext'
import Header from '../header/Header';

import MainPage from '../../pages/Main';
import ErrorPage from '../../pages/404';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register';
import Login from '../../pages/Login';

import { context, ingredient, user } from '../../types/Types';

import ProtectedRoute from '../protectedRoute/ProtectedRoute';

import ingredientsService from '../../service/ingredientsService';
import { userService } from '../../service/userService'

function reducer(state: context, action: any) {
  switch (action.type) {
    case 'USER': {
      return {
        ...state,
        user: action.payload
      }
    }
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
    case 'MAKE_ORDER': {
      return {
        ...state,
        orderNum: action.payload
      }
    }
    default: {
      throw new Error('Unknown action');
    }
  }
}

function App() {
  const getData = new ingredientsService();
  const user = new userService()

  const [isLoading, setIsLoading] = useState(true)
  const [order, dispatch] = useReducer<React.Reducer<context, any>>(reducer, { user: null, bun: null, ingredients: [], price: 0, orderNum: null });

  const addIngredient = useCallback((elem: ingredient) => {
    if (elem.type === 'bun') {
      dispatch({ type: 'BUN_CHANGE', payload: elem })
    } else {
      dispatch({ type: 'ADD', payload: elem })
    }

  }, [order])

  const removeIngredient = (elem: ingredient, i: number) => {
    const filteredIngredients = order.ingredients.filter((elem: ingredient, index: number) => index !== i);
    dispatch({ type: 'REMOVE', removedIng: elem, ingredients: filteredIngredients })
  }

  const makeOrder = async () => {
    const data = order.bun ? [...order.ingredients.map((elem: ingredient) => elem._id), order.bun._id] : [...order.ingredients.map((elem: ingredient) => elem._id)]
    getData.postOrder(data).then(res => {
      dispatch({ type: 'MAKE_ORDER', payload: res.order.number })
    }).catch(console.error);
  }

  const setUser = (user: user | null) => {
    dispatch({ type: 'USER', payload: user })
  }

  useEffect(() => {
    user.checkUserAuth(setUser, setIsLoading)
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
                  />
                } />

              <Route path='/profile' element={
                !isLoading ?
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
