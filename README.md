# AI Visibility Dashboard

A dashboard concept for tracking brand visibility, sentiment, and citations
across AI models (ChatGPT, Gemini, Claude, Perplexity) — with separate
agency-facing and client-facing views for campaign planning and reporting.

This is a design-led concept project, not a production system: there's no
backend or live data source. All content is mocked, and the UI is built to
demonstrate the product idea and interaction flows end to end.

Designed in Figma and built solo, front-to-back.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- react-router
- recharts (for charts/visualizations)

State is handled with plain React component state and `localStorage` for
persistence between sessions — there's no Redux, Zustand, or TanStack Query
in here.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
