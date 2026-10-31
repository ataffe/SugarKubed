// Real values taken from FoodData Central (query "apple"), reshaped into the
// response the frontend expects from the Go backend.
const FOODS = [
  { fdcId: 1750340, description: 'Apples, fuji, with skin, raw', dataType: 'Foundation', sugarPer100g: 13.3 },
  { fdcId: 454004, description: 'APPLE', dataType: 'Branded', sugarPer100g: 10.4, servingSize: 154, servingSizeUnit: 'g' },
  { fdcId: 2117388, description: 'APPLE', dataType: 'Branded', sugarPer100g: 11.7, servingSize: 240, servingSizeUnit: 'ml' },
  { fdcId: 2124902, description: 'APPLE', dataType: 'Branded', sugarPer100g: 10.3, servingSize: 242, servingSizeUnit: 'g' },
  { fdcId: 168171, description: 'Rose-apples, raw', dataType: 'SR Legacy', sugarPer100g: null },
]

export async function mockSearchFoods(query) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const q = query.toLowerCase()
  return FOODS.filter((food) => food.description.toLowerCase().includes(q))
}
