const GRAMS_PER_TEASPOON = 4

function formatGrams(grams) {
  return grams.toFixed(1).replace(/\.0$/, '')
}

export default function FoodCard({ food }) {
  const { description, brandOwner, dataType, sugarPer100g, servingSize, servingSizeUnit } = food
  const hasSugar = typeof sugarPer100g === 'number'

  // Only scale to a serving when the serving is measured in g/ml, since sugarPer100g is per 100 g.
  const unit = servingSizeUnit?.toLowerCase()
  const perServing =
    hasSugar && servingSize && (unit === 'g' || unit === 'ml')
      ? (sugarPer100g * servingSize) / 100
      : null

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-slate-900 first-letter:uppercase">
            {description.toLowerCase()}
          </h2>
          {brandOwner && <p className="truncate text-sm text-slate-500">{brandOwner}</p>}
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {dataType}
        </span>
      </div>

      {hasSugar ? (
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-600">{formatGrams(sugarPer100g)} g</span>
            <span className="text-sm text-slate-500">sugar per 100 g</span>
            <span className="ml-auto text-sm text-slate-500">
              ≈ {(sugarPer100g / GRAMS_PER_TEASPOON).toFixed(1)} tsp
            </span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
            role="img"
            aria-label={`${formatGrams(sugarPer100g)}% sugar by weight`}
          >
            <div
              className="h-full rounded-full bg-rose-500"
              style={{ width: `${Math.min(sugarPer100g, 100)}%` }}
            />
          </div>
          {perServing !== null && (
            <p className="mt-2 text-sm text-slate-600">
              {formatGrams(perServing)} g per serving ({servingSize} {servingSizeUnit})
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No sugar data available for this food.</p>
      )}
    </li>
  )
}
