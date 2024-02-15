import { ingredient } from './../components/types/Types';

class ingredientsService {
  _apiBase = 'https://norma.nomoreparties.space/api/ingredients';
  _apiPost = 'https://norma.nomoreparties.space/api/orders';

  fetchData = async (url: string, options: any = {}) => {
    const data = await fetch(url, options)
      .then(res => {
        if (!res) {
          throw new Error('Error!')
        }

        return res.json()
      })

    return await data.data
  }


  postOrder = async (ingredient: string) => {
    const result = await this.fetchData(this._apiPost, {
      method: 'POST', body: ingredient
    })
    return await this.transformIngredients(result)
  }

  getIngredients = async () => {
    const result = await this.fetchData(this._apiBase)
    return await this.transformIngredients(result)
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