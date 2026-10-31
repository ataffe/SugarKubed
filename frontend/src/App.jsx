import { useRef, useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodCard from './components/FoodCard'
import { searchFoods, USE_MOCK } from './api'

export default function App() {
  const [foods, setFoods] = useState(null) // null until the first search completes
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const latestSearch = useRef(null)

  async function handleSearch(query) {
    // Abort the previous request so a slow, stale response can't overwrite a newer one.
    latestSearch.current?.abort()
    const controller = new AbortController()
    latestSearch.current = controller

    setLoading(true)
    setError('')
    try {
      const results = await searchFoods(query, { signal: controller.signal })
      if (controller.signal.aborted) return
      setFoods(results)
    } catch (err) {
      if (controller.signal.aborted) return
      setError(err.message)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-rose-50/60">
      <header className="border-b border-rose-100 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <span className="text-xl font-bold tracking-tight text-rose-600">SugarKubed</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          How much sugar is in your food?
        </h1>
        <p className="mt-2 text-slate-600">
          Search the USDA FoodData Central database and see the sugar per 100 g.
        </p>

        {USE_MOCK && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Using mock data, so only a few apple results exist. Try searching “apple”.
          </p>
        )}

        <div className="mt-6">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <section className="mt-8" aria-live="polite">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              Something went wrong: {error}
            </p>
          )}

          {!error && foods?.length === 0 && (
            <p className="text-center text-slate-500">No foods found. Try a different search.</p>
          )}

          {!error && foods?.length > 0 && (
            <ul className="space-y-4">
              {foods.map((food) => (
                <FoodCard key={food.fdcId} food={food} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
