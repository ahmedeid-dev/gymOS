# GymPro ERP

A production-ready Vite + React + TypeScript foundation for gym operations, memberships, POS and reporting.

## Stack

- Vite, React 19 and strict TypeScript
- MUI with Emotion and responsive layout primitives
- Redux Toolkit for auth and domain state
- i18next/react-i18next for English and Arabic (RTL-ready)
- react-hot-toast for user feedback
- Oxlint for fast static analysis

## Run

```bash
npm install
npm run dev
npm run build
npm run lint
```

Demo authentication accepts any valid-looking email and a password of at least four characters. The session is persisted locally for the prototype.

## Structure

`src/main.tsx` bootstraps providers. `src/store.ts` owns application state, `src/i18n.ts` owns translations, and `src/theme.ts` owns the design system. `App.tsx` contains the composed shell and feature views; domain data and API adapters can be moved into `src/features` as the backend is connected.
