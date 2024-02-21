import { ingredient } from '../types/Types';
import { API } from '../utils/apiConsts';
class ingredientsService {

  postOrder = async (ingredient: Array<string>) => {
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

  getIngredients = async () => {
    const result = await fetch(API._ingredients).then(res => {
      if (!res || !res.ok) {
        throw new Error('Error!')
      }
      return res.json()
    }).catch(console.error);

    return this.transformIngredients(result.data)
  }

  transformIngredients = (data: Array<ingredient>) => {
    const categories = Array.from(new Set(data.map(item => item.type)))
    const russianCategory: { [index: string]: string; } = {
      bun: 'Булки',
      sauce: 'Соусы',
      main: 'Начинки'
    }

    const filteredData = categories.map(element => {
      const items: Array<ingredient> = []
      data.forEach(item => {
        if (item.type === element) {
          items.push(item)
        }
      })

      return { category: element, russianCategory: russianCategory[element], items: items }
    })

    return filteredData
  }
}

export default ingredientsService