import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

import { useCallback, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BurgerContext } from '../../context/BurgerContext'
import Header from '../header/Header';

import MainPage from '../../pages/Main';
import ErrorPage from '../../pages/404';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register';
import Login from '../../pages/Login';

import ingredientsService from '../../service/ingredientsService';

function reducer(state, action) {
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
      throw Error('Unknown action: ' + action.type);
  }
}

function App() {
  const getData = new ingredientsService();

  const [order, dispatch] = useReducer(reducer, { user: null, bun: null, ingredients: [], price: 0 });

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
    getData.postOrder(data).then(res => {
      dispatch({ type: 'MAKE_ORDER', payload: res.order.number })
    }).catch(console.error);
  }

  const setUser = (user) => {
    dispatch({ type: 'USER', payload: user })
  }

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

              <Route path='/profile' element={<Profile />} />
              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />

              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
      </BurgerContext.Provider >
    </Router>
  );
}

export default App;
