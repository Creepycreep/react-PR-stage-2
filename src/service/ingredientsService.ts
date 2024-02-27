import { API } from '../utils/apiConsts';
import { transformIngredients } from '../utils/transform';

class IngredientsService {
  static postOrder = async (ingredient: Array<string>) => {
    const result = await fetch(API._orders, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem("accessToken") || ''}`
      }, body: JSON.stringify({ ingredients: ingredient })
    }).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error);

    return result
  }

  static getIngredients = async () => {
    const result = await fetch(API._ingredients).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error);

    return transformIngredients(result.data)
  }
}

export default IngredientsService;
