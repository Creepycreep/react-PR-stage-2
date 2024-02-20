const _API_BASE = 'https://norma.nomoreparties.space/api'

export const API = {
  _ingredients: _API_BASE + '/ingredients',
  _orders: _API_BASE + '/orders',
  _register: _API_BASE + '/auth/register',
  _login: _API_BASE + '/auth/login',
  _logout: _API_BASE + '/auth/logout',
  _refresh: _API_BASE + '/auth/token',
}