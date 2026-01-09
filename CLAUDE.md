# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (opens browser at localhost:5173)
npm run build        # TypeScript check + production build
npm run lint         # ESLint check
npm test             # Jest + React Testing Library
npm run format       # Prettier formatting
```

## Validation (Required Before Task Completion)

All must pass before marking any task as complete:
```bash
tsc --noEmit         # No TypeScript errors
npm run build        # Build completes without errors
npm test             # Tests pass
```

## Path Aliases

```
@/*           → src/*
@components/* → src/components/*
@styles/*     → src/styles/*
@utils/*      → src/utils/*
@hooks/*      → src/hooks/*
@store/*      → src/store/*
@types/*      → src/types/*
@services/*   → src/services/*
```

## Architecture

**Stack:** React 18 + TypeScript (strict) + Vite + styled-components + Redux Toolkit

**Feature-based organization:**
- `src/features/` - Organized by company/project (bandit, xcons, fusionads, matias)
- `src/components/` - Reusable components, each in folder with `index.ts`
- `src/pages/` - Page-level components
- `src/context/` - ThemeContext, ProfileContext
- `src/hooks/` - Custom hooks
- `src/services/` - External integrations (OpenAI, n8n)

**Styling:** styled-components for component styles + Tailwind utilities (tailwind-merge). Do NOT rewrite existing styled-components.

**Animation:** Framer Motion, GSAP, React Spring. Use `transform/opacity` for performance; clean up listeners.

## i18n

Bilingual (Spanish/English) with i18next:
- Translations in `public/locales/es/` and `public/locales/en/`
- No hardcoded strings in JSX - use translation keys
- New UI text must include both ES and EN translations

## Code Rules

- TypeScript strict mode - explicit typing on props, hooks, utilities
- Functional components + hooks only (composition over inheritance)
- Component folders with `index.ts` for clean imports
- Conventional Commits for commit messages
- Respect ESLint/Prettier config - do not modify

## Do Not Modify

`.husky/`, `.github/`, `node_modules/`, `dist/`

## Environment Variables

```
VITE_APP_VERSION         # Git hash for cache busting
VITE_OPENAI_API_KEY      # OpenAI API (chatbot)
VITE_CLARITY_PROJECT_ID  # Microsoft Clarity analytics
```

## Deployment

Deployed to Vercel with PWA support. Service worker auto-updates via vite-plugin-pwa.
