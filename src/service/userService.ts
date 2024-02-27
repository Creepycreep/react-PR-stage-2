import { API } from '../utils/apiConsts';
import { User } from '../types/Types';

export class userService {

  userRegister = async (data: { name: string, email: string, password: string }) => {
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
    return result
  }

  userLogin = (data: { email: string, password: string }, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
    return fetch(API._login, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(data)
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Произошла ошибка авторизации API');
      }
      return res.json()
    }).then(res => {
      setError(false)
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('accessToken', res.accessToken);

      return res
    }).catch((err) => {
      console.error(err);
    });
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
  }

  getUser = async () => {
    try {
      const result = await fetch(API._user, {
        method: 'GET', headers: {
          "authorization": `${localStorage.getItem('accessToken')}`
        }
      })

      if (!result || !result.ok) {
        throw new Error('Error!')
      }
      return result.json()
    } catch {
      const access = await this.refreshToken()

      const result = await fetch(API._user, {
        method: 'GET', headers: {
          "authorization": access
        }
      })

      if (!result || !result.ok) {
        throw new Error('Error!')
      }
      return result.json()
    }
  }

  refreshToken = async () => {
    const result = await fetch(API._refresh, {
      method: 'POST', headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(error => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    })
      .then(res => {
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.accessToken);

        return res.accessToken
      })

    return result
  }

  checkUserAuth = (setUser: (user: User | null) => void, setIsChecked: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (localStorage.getItem("accessToken") && localStorage.getItem('accessToken')) {
      this.getUser().then(res => {
        setUser(res.user)
        setIsChecked(true)
      })
    } else {
      setUser(null)
      setIsChecked(true)
    }
  };

}
