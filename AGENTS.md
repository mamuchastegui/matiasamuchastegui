cat > ./AGENTS.md <<'MD'

\# AGENTS.md — Reglas del repo (Codex CLI)



\## Setup

\- \*\*Node\*\*: LTS (definir versión exacta).

\- \*\*Package manager\*\*: \*\*npm\*\*

\- \*\*Instalar\*\*: `npm install`



\## Run \& Test

\- \*\*No levantar dev salvo pedido explícito.\*\*

\- \*\*Lint\*\*: `npm run lint`

\- \*\*Tests (Jest + RTL)\*\*: `npm test`

\- \*\*Build\*\*: `npm run build`

\- \*\*Preview (opcional, no arrancar sin permiso)\*\*: `npm run preview`



\## Estructura

\- \*\*Root\*\*: `public/`, `src/`, `dist/`, `temp/`

\- \*\*src/\*\*: `assets/`, `bandit/`, `components/`, `context/`, `data/`, `docs/`, `fusionads/`, `hooks/`, `layouts/`, `newlook/`, `pages/`, `services/`, `store/`, `styles/`, `types/`, `utils/`, `xcons/`

\- \*\*Monorepo\*\*: no (sin `apps/\*` ni `packages/\*`)



\## Path Aliases (tsconfig)

\- `@/\* → src/\*`

\- `@components/\* → src/components/\*`

\- `@styles/\* → src/styles/\*`

\- `@utils/\* → src/utils/\*`

\- `@hooks/\* → src/hooks/\*`

\- `@store/\* → src/store/\*`

\- `@types/\* → src/types/\*`

\- `@services/\* → src/services/\*`



\## Stack

\- \*\*Framework\*\*: React 18 + TypeScript

\- \*\*Bundler\*\*: Vite

\- \*\*Router\*\*: React Router

\- \*\*Estado\*\*: Redux Toolkit

\- \*\*Styling\*\*: styled-components + utilidades Tailwind (no reescribir estilos existentes)

\- \*\*Animación\*\*: Framer Motion, GSAP, React Spring (usar transform/opacity; limpiar listeners)

\- \*\*i18n\*\*: i18next / react-i18next — `public/locales/`

\- \*\*Tests\*\*: Jest + @testing-library/react

\- \*\*Calidad\*\*: ESLint, Prettier, Husky, lint-staged



\## Reglas de Código

\- TS estricto; tipado explícito en props, hooks y utils.

\- Componentes funcionales + hooks; composición > herencia.

\- Carpeta por componente con `index.ts` para imports limpios.

\- Respetar ESLint/Prettier \*\*sin\*\* cambiar configs.

\- Commits: Conventional Commits.



\## UI/UX

\- Mantener tema existente (styled-components / `@styles/theme` si aplica).

\- \*\*Accesibilidad mínima\*\*: roles/ARIA, foco manejado, contraste adecuado.

\- Si agregás texto UI: \*\*ES y EN\*\* (para i18n).



\## i18n

\- Claves descriptivas; locales en `public/locales/<lang>/`.

\- Evitar strings hardcodeadas en JSX.



\## Seguridad

\- No exponer secrets; usar `.env`.

\- No enviar PII a terceros.

\- Menor privilegio en claves/alcances.



\## Carpetas \*\*NO tocar\*\* (salvo pedido)

\- `.taskmaster`, `.trae`, `.husky`, `.github`, `node\_modules`, `dist`



\## Checklist PR (automático por Codex)

1\. Lint/Typecheck OK (sin warnings).

2\. Tests pasan; si se tocan componentes, agregar tests mínimos.

3\. A11y básico OK (labels/foco).

4\. Build OK (sin romper scripts).

5\. Diffs mínimos y acotados al objetivo.



\## Guardrails para Codex (bash)

\- \*\*Shell\*\*: bash. No usar `cmd`/`powershell`.

\- Evitar `findstr/more`; usar `grep/rg`, `sed`, `awk`, `jq` si están.

\- Cambios como \*\*diff\*\* en una sola pasada cuando sea posible.

\- No escribir fuera del repo; sandbox lógico = workspace.

\- No arrancar `npm run dev` ni `vite preview` salvo permiso explícito.

MD



