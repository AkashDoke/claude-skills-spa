# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server at localhost:5173
npm run build      # Production build to /dist
npm run preview    # Preview production build locally
npm run lint       # Run ESLint checks
```

There is no test suite configured for this project.

## Architecture

This is a **React 19 + Vite** single-page application — a presentation/demo SPA for an enterprise AI platform showcase. The app uses a **full-viewport scroll-snap layout** where each section occupies 100vh and the user navigates between them via scroll, keyboard (Arrow keys, Page Up/Down), or side-nav dots.

### Navigation & State

`src/App.jsx` is the shell: it renders 6 `<section>` elements with `scroll-snap-align: start`, wires an `IntersectionObserver` to track the active section, and handles keyboard navigation. Global state lives in `src/context/AppContext.jsx` and exposes `currentSection`, `isDark`, `isLoading`, and `activeSkill`.

### Data

All content (skill cards, use-case industries, dashboard metrics) is static data defined in `src/data/index.js`. No API calls or external data sources.

### Sections (in order)

| Index | Component | Purpose |
|-------|-----------|---------|
| 0 | `HeroSection` | Animated landing with typing effect |
| 1 | `WhatAreSkillsSection` | Concept explanation |
| 2 | `ShowcaseSection` | 6 interactive skill cards with expandable modals |
| 3 | `WorkflowSection` | Step-by-step animated process |
| 4 | `UseCasesSection` | Industry tabs with use cases |
| 5 | `DashboardSection` | Animated metrics, mini-charts, activity feed |

### Styling

Tailwind CSS with a custom dark-first design system defined in `tailwind.config.js`:
- **Obsidian** palette for dark backgrounds (950/900/800/700/600)
- **Electric cyan** (`#00f5ff`), **Aurora purple**, **Ember orange**, **Jade green** as accents
- **Fonts:** Syne (headings), DM Sans (body), JetBrains Mono (code) — loaded via Google Fonts in `src/index.css`
- Glassmorphism utilities (`.glass`, `.glass-strong`), glow effects (`.glow-electric`, etc.), gradient text helpers, and mesh background classes are defined as custom CSS in `src/index.css`
- Dark mode is class-based; `<html>` carries `class="dark"` by default

### Animations

Framer Motion handles enter/exit animations on components. Tailwind keyframes (`pulse-slow`, `float`, `glow`, `counter`) handle ambient effects. Custom hooks in `src/hooks/index.js` provide `useInView` (IntersectionObserver), `useCounter` (animated number counting), and `useKeyboardNav`.
