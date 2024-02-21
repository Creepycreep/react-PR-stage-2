export interface context {
  user: user | null,
  bun: ingredient | null,
  ingredients: Array<ingredient>,
  price: number,
  orderNum: number | null
}
export interface ingredient {
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

export interface category {
  category: string,
  russianCategory: string,
  items: Array<ingredient>
}

export interface ingredientList {
  category: string,
  russianCategory: string,
  items: Array<ingredient>
}

export interface user {
  name: 'string',
  email: 'string'
}
