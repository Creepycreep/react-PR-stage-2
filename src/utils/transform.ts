import { Ingredient } from '../types/Types';

export function transformIngredients(data: Array<Ingredient>) {
  const categories = Array.from(new Set(data.map(item => item.type)))
  const russianCategory: { [index: string]: string; } = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
  }

  const filteredData = categories.map(element => {
    const items: Array<Ingredient> = []
    data.forEach(item => {
      if (item.type === element) {
        items.push(item)
      }
    })

    return { category: element, russianCategory: russianCategory[element], items: items }
  })

  return filteredData
}