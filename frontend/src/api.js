export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Returns an array of foods: { fdcId, description, brandOwner?, dataType,
// sugarPer100g (number | null), servingSize?, servingSizeUnit? }
export async function searchFoods(query, { signal } = {}) {
  if (USE_MOCK) {
    const { mockSearchFoods } = await import('./mockFoods.js')
    return mockSearchFoods(query)
  }

  const res = await fetch(`/api/foods/search?query=${encodeURIComponent(query)}`, { signal })
  if (!res.ok) {
    throw new Error(`The backend returned ${res.status}`)
  }
  const data = await res.json()
  return data.foods ?? []
}
