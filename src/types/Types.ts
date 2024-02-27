export interface Context {
  user: User | null,
  bun: Ingredient | null,
  ingredients: Array<Ingredient>,
  price: number,
  orderNum: number | null
}
export interface Ingredient {
  "_id": string,
  "name": string,
  "type": string,
  "proteins": number,
  "fat": number,
  "carbohydrates": number,
  "calories": number,
  "price": number,
  "image": string,
  "image_mobile": string,
  "image_large": string,
  "__v": number
}

export interface Category {
  category: string,
  russianCategory: string,
  items: Array<Ingredient>
}

export interface IngredientList {
  category: string,
  russianCategory: string,
  items: Array<Ingredient>
}

export interface User {
  name: string,
  email: string
}
