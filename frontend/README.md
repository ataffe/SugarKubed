# SugarKubed frontend

React + Tailwind CSS (v4) app built with Vite. Search for a food and see how much sugar it contains.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static files in dist/
```

## Mock data vs. the real backend

`.env.development` sets `VITE_USE_MOCK=true`, so `npm run dev` serves canned apple results from
`src/mockFoods.js` (try searching "apple"). Once the Go backend is running, set it to `false`
(or delete the line) and the app will call the backend instead.

In dev, Vite proxies `/api/*` to `http://localhost:8080`. To point it elsewhere:

```bash
BACKEND_URL=http://localhost:9000 npm run dev
```

In production the built files call `/api/...` on their own origin, so whatever serves them
(nginx, a Kubernetes Ingress) needs to route `/api` to the backend.

## API contract the frontend expects

`GET /api/foods/search?query=apple`

```json
{
  "foods": [
    {
      "fdcId": 454004,
      "description": "APPLE",
      "brandOwner": "Some Brand",
      "dataType": "Branded",
      "sugarPer100g": 10.4,
      "servingSize": 154,
      "servingSizeUnit": "g"
    }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `fdcId` | number | Used as the React key |
| `description` | string | Food name |
| `brandOwner` | string, optional | Only on Branded foods |
| `dataType` | string | `Branded`, `Foundation`, `SR Legacy`, ... |
| `sugarPer100g` | number or `null` | `null` when FDC has no sugar value for the food |
| `servingSize`, `servingSizeUnit` | number, string; optional | Used to show sugar per serving when the unit is `g` or `ml` |

Return an empty `foods` array (not an error) when nothing matches. Any non-2xx status shows an
error message in the UI.

In FDC the sugar nutrient is number `269`; some foods report it under more than one nutrient id,
so match on the number.

## Layout

```
src/
  main.jsx             entry point
  App.jsx              page layout, search state, loading/error/empty states
  api.js               searchFoods(): mock or fetch to /api/foods/search
  mockFoods.js         canned data for development
  components/
    SearchBar.jsx
    FoodCard.jsx       one result: sugar per 100 g, teaspoons, bar, per-serving
```
