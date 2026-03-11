# React Dashboard (Vite)

This is a small dashboard project built with **React + Vite** to demonstrate a real‑world frontend experience using:

- **React Router** (layouts + nested routes)
- **Redux Toolkit** (global state & async thunks)
- **Recharts** (charts + visuals)
- **Tailwind CSS** (clean UI styling)
- **Axios** + fake API (https://dummyjson.com)

---

## ✅ What this project demonstrates

### 🧩 Core features
- Dashboard layout with sidebar + topbar
- Users, Orders, Analytics pages
- Table filtering / sorting / search / pagination
- Chart visualization (revenue trends + order status)
- Loading skeleton + error handling for async data

### 🔁 Real-feel API integration
- Data is fetched from **dummyjson.com** using `axios` + `createAsyncThunk`
- Loaders in UI show while fetching
- Errors are shown instead of breaking the UI

---

## ▶️ Run it locally

```bash
npm install
npm run dev
```

Then open: http://localhost:5173

---

## 🗂 Project structure (important parts)

- `src/pages/` — page routes (Dashboard, Users, Orders, Analytics)
- `src/components/` — reusable UI components (tables, filters, charts, layout)
- `src/features/` — Redux slices + selectors
- `src/hooks/` — shared hooks like filter/sort/search logic
- `src/services/` — (placeholder, currently unused)

---

## 🧠 Notes (how it works)

### Data & state
- Users + orders are stored in Redux slices and loaded from a fake API.
- The charts and dashboard rely on selectors (`createSelector`) to derive data.

### Filtering + sorting
- `useFilterSortSearch` is a reusable hook that provides:
  - client-side filter
  - sort
  - search
  - pagination

---

## ✅ Why this is a good portfolio project

- Shows understanding of **React + Redux** and **modern patterns** (toolkit/thunks)
- Demonstrates **UI interactivity** (filters, pagination, charts)
- Uses **API fetching + loading/error states** (not just static mocks)
- Easy to extend (add real backend, auth, CRUD, tests)

---

## 📌 Next improvements (optional)
- Add “Create / Update / Delete” flows (CRUD) and persist to a real backend
- Add unit tests (Jest/RTL) for key components/coupled logic
- Add authentication and protected routes

---

*Made as a clean dashboard UI demo using React + Redux Toolkit.*