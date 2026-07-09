<div align="center">

# Book Store

A small, hand-picked online bookshop for browsing and searching a curated shelf of titles.

Rewritten in **TypeScript** with an **object-oriented** domain/service layer (`Book`, `BookCatalog`) and **React class components**, built with **Vite**, and deployed to **GitHub Pages** via **GitHub Actions**.

[![CI](https://github.com/hassanireza/bookStore/actions/workflows/ci.yml/badge.svg)](https://github.com/hassanireza/bookStore/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/hassanireza/bookStore/actions/workflows/deploy.yml/badge.svg)](https://github.com/hassanireza/bookStore/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-a7e1f8?labelColor=000)](LICENSE)

[Live demo](https://OWNER.github.io/bookStore) · [Report a bug](../../issues) · [Request a feature](../../issues)

</div>

> Replace `OWNER` above with your GitHub username/org once the repo is pushed.

---

## Overview

Book Store is a single-page React + TypeScript app for browsing a small catalog of books. Type in the search bar to filter by title or author, tap a cover to open its details in a side panel — everything renders from a static JSON file, so there's no backend to run.

## Architecture

The app is organized around two OOP layers plus a thin React view layer:

- **`src/models/Book.ts`** — the `Book` domain class. Wraps a raw JSON record and owns its own behaviour: `matches(term)` for search, plus `byline`/`coverAlt` display helpers.
- **`src/services/BookCatalog.ts`** — the `BookCatalog` service class. Owns fetching `bookshop.json`, caching the resulting `Book[]`, and searching them. Throws a typed `BookCatalogError` on failed fetches.
- **`src/components/**`** — React **class components** (`App`, `Header`, `Search`, `BooksContainer`, `Book`, `DetailPanel`), each with a typed `Props`/`State` interface. `App` owns a `BookCatalog` instance and all top-level state (search results, selected book, loading/error state); everything else is a typed, mostly-presentational child.
- **`src/styles.ts`** and each component's **`styles.ts`** hold `styled-components` styles, typed against the transient props they receive (e.g. `$isLarge`, `$isPanelOpen`).

## Getting started

```bash
npm install
npm run dev
```

The app expects `public/bookshop.json` (a static array of book records) and cover images under `public/covers/`.

## Available scripts

- `npm run dev` — start the Vite dev server.
- `npm run build` — typecheck (`tsc -b`) then produce a production build in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run test` / `npm run test:watch` — run the Vitest suite (models, services, and component tests).
- `npm run lint` — run ESLint over `.ts`/`.tsx` files.
- `npm run typecheck` — run the TypeScript compiler with no output.

## Project structure

```
public/
  bookshop.json        # static catalog data
  covers/               # book cover images
src/
  models/
    Book.ts             # Book domain class
    Book.test.ts
  services/
    BookCatalog.ts       # BookCatalog service class
    BookCatalog.test.ts
  components/
    Header/
    Search/
    BooksContainer/
    Book/
    DetailPanel/
  App.tsx                # root class component
  App.test.tsx
  main.tsx                # ReactDOM entry point
  styles.ts               # global + shared styled-components
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, typechecks, tests, runs `npm run build`, and publishes the `dist/` folder to GitHub Pages via `actions/deploy-pages`.

`vite.config.ts` sets the Vite `base` path to `/bookStore/` (matching this repo's name) so built asset URLs resolve correctly on a GitHub Pages **project** site (`https://<owner>.github.io/bookStore/`). If you rename the repo or deploy to a custom domain / user site, update `REPO_NAME` in `vite.config.ts` (or set the `VITE_BASE_PATH` env var, e.g. `VITE_BASE_PATH=/ npm run build` for a user/org site or custom domain).

Pull requests and pushes to any non-`main` branch instead run `.github/workflows/ci.yml`, which typechecks, lints, tests, and builds without deploying.

> **Note on `package-lock.json`:** this repo doesn't ship one, so both workflows use `npm install` (not `npm ci`) and skip `actions/setup-node`'s built-in npm cache (which requires a lockfile to key off). Run `npm install` locally once and commit the generated `package-lock.json` for reproducible installs and faster, cached CI — then switch both workflows back to `npm ci` and re-add `cache: "npm"` to the `setup-node` step.

## Design system

- Palette: `#a7e1f8` (blue), `#ffbccc` (pink), `#ffe581` (yellow), black borders throughout.
- Fonts: **Work Sans** (UI) paired with **Libre Baskerville** italic (book titles/bylines, descriptions).

## Testing

Tests use **Vitest** + **React Testing Library**:

- `Book.test.ts` — domain logic (`matches`, `byline`, `coverAlt`).
- `BookCatalog.test.ts` — fetch success/failure, search behaviour.
- `App.test.tsx` — loading/error/all-books states, search filtering, and opening/closing the detail panel.

## License

MIT — see [LICENSE](LICENSE).
