import { ingredient } from "../components/types/Types"

class ingredientsService {
  _apiBase = 'https://norma.nomoreparties.space/api/ingredients';

  fetchIngredients = async () => {
    const data = await fetch(this._apiBase)
      .then(res => {
        if (!res) {
          throw new Error('Error!')
        }
        return res.json()
      })
      .catch(err => console.log(err))

    return await this.transformIngredients(data.data)
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