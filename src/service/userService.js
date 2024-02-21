import { useNavigate } from "react-router-dom";
import { API } from '../utils/apiConsts';

export class userService {
  navigate = useNavigate()

  userRegister = async (data) => {
    const result = await fetch(API._register, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(data)
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error)

    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('accessToken', result.accessToken);
    this.navigate('/profile')
    return result
  }

  userLogin = async (data, setError) => {
    const result = await fetch(API._login, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(data)
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).then(res => {
      setError(false)
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('accessToken', res.accessToken);
      this.navigate('/')

      return res
    }).catch(console.error)
    return result
  }

  userLogout = async () => {
    const result = await fetch(API._logout, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error)

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.navigate('/')
  }

  checkUserAuth = () => {
    if (localStorage.getItem("accessToken") && localStorage.getItem('refreshToken')) {
    }
  };
}