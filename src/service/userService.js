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
    }).catch(console.error);

    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('accessToken', result.accessToken);
    this.navigate('/profile')
    return result
  }

  userLogin = async (data) => {
    const result = await fetch(API._login, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(data)
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error);

    localStorage.setItem('refreshToken', result.refreshToken);
    localStorage.setItem('accessToken', result.accessToken);
    this.navigate('/')
    return result
  }


  checkUserAuth = () => {
    if (localStorage.getItem("accessToken") && localStorage.getItem('refreshToken')) {
    }
  };
}