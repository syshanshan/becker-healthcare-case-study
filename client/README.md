# Frontend (client)

React + Vite app for the content asset portal. The Express API in the repo root is unchanged.

## Phase E — homepage (current)

- Hero with wordmark, value proposition, CTAs to `/assets`
- `GET /api/assets` → 3 most recently updated featured teasers
- Each teaser links to `/assets/:id/signup`

## Phase D — sign-up page

- `GET /api/assets/:id` asset summary (navy panel)
- Form validation + `POST /api/assets/:id/signup`
- Inline confirmation with `signupDate` or API error banner
- Back link preserves listing filters via router `state.from`

## Phase B — routing + listing

- `react-router-dom` routes: `/`, `/assets`, `/assets/:id/signup`
- Shared layout: header + footer (`AppShell`)
- Asset listing: search, type filters, loading/empty states, cards → sign-up route
- Filter/search state in URL: `?q=` and `?type=`

## Phase A — scaffold

- Design system CSS imported from `../design_system/`
- API base: `/api` (proxied to `http://localhost:3000` in dev)
- Shared types and `getJson` / `postJson` in `src/api/client.ts`

## Run locally

**Terminal 1 — API**

```bash
# from repo root
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. The placeholder page should report how many assets the API returned.

## Override API URL

Create `client/.env`:

```
VITE_API_URL=http://localhost:3000
```

Use the full origin (no `/api` prefix when overriding).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 5173 |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve production build |
