import { transformIngredients } from './transform'

test('transforming data', () => {
  const mockData = [
    {
      "_id": 'someId',
      "name": 'yummyBun',
      "type": 'bun',
      "proteins": 12,
      "fat": 11,
      "carbohydrates": 23,
      "calories": 32,
      "price": 232,
      "image": 'noImg',
      "image_mobile": 'noImg',
      "image_large": 'noImg',
      "__v": 0
    },
    {
      "_id": 'someId1',
      "name": 'yummyMain',
      "type": 'main',
      "proteins": 12,
      "fat": 11,
      "carbohydrates": 23,
      "calories": 32,
      "price": 232,
      "image": 'noImg',
      "image_mobile": 'noImg',
      "image_large": 'noImg',
      "__v": 0
    },
    {
      "_id": 'someId2',
      "name": 'yummySauce',
      "type": 'sauce',
      "proteins": 12,
      "fat": 11,
      "carbohydrates": 23,
      "calories": 32,
      "price": 232,
      "image": 'noImg',
      "image_mobile": 'noImg',
      "image_large": 'noImg',
      "__v": 0
    }
  ]

  const transformedData = [
    {
      category: 'bun',
      russianCategory: 'Булки',
      items: [{
        "_id": 'someId',
        "name": 'yummyBun',
        "type": 'bun',
        "proteins": 12,
        "fat": 11,
        "carbohydrates": 23,
        "calories": 32,
        "price": 232,
        "image": 'noImg',
        "image_mobile": 'noImg',
        "image_large": 'noImg',
        "__v": 0
      }]
    },
    {
      category: 'main',
      russianCategory: 'Начинки',
      items: [{
        "_id": 'someId1',
        "name": 'yummyMain',
        "type": 'main',
        "proteins": 12,
        "fat": 11,
        "carbohydrates": 23,
        "calories": 32,
        "price": 232,
        "image": 'noImg',
        "image_mobile": 'noImg',
        "image_large": 'noImg',
        "__v": 0
      }]
    },
    {
      category: 'sauce',
      russianCategory: 'Соусы',
      items: [{
        "_id": 'someId2',
        "name": 'yummySauce',
        "type": 'sauce',
        "proteins": 12,
        "fat": 11,
        "carbohydrates": 23,
        "calories": 32,
        "price": 232,
        "image": 'noImg',
        "image_mobile": 'noImg',
        "image_large": 'noImg',
        "__v": 0
      }]
    }
  ]
  expect(transformIngredients(mockData)).toStrictEqual(transformedData);
});