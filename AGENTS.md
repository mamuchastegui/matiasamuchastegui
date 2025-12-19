# AGENTS.md

> Guía mínima y específica para que **cualquier agente** (Codex CLI, etc.) trabaje seguro en **este repo**.

## Setup

- **Node:** LTS _(definir versión exacta en `.nvmrc` o `engines`)_
- **Package manager:** `npm`
- **Instalar:** `npm install`
- **Monorepo:** **no** (sin `apps/*` ni `packages/*`)

## Run & Test

> **No levantar dev** salvo pedido explícito.

- **Lint:** `npm run lint`
- **Tests (Jest + RTL):** `npm test`
- **Build:** `npm run build`
- **Preview (opcional, no arrancar sin permiso):** `npm run preview`

## Validation (required = true)

Debés poder responder **sí** a todo antes de marcar una tarea como terminada:

- Ejecutar: `tsc --noEmit` → sin errores de TypeScript.
- Ejecutar: `npm run build` → build completa sin errores.
- Ejecutar: `npm test` → tests **relevantes** pasan.
- **No** marcar como “terminada” si algo falla.

## Repository Structure

- **Root:** `public/`, `src/`, `dist/`, `temp/`
- **src/:** `assets/`, `components/`, `context/`, `docs/`, `features/` (bandit, fusionads, xcons), `hooks/`, `layouts/`, `pages/`, `services/`, `store/`, `styles/`, `types/`, `utils/`

## Path Aliases

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@styles/*` → `src/styles/*`
- `@utils/*` → `src/utils/*`
- `@hooks/*` → `src/hooks/*`
- `@store/*` → `src/store/*`
- `@types/*` → `src/types/*`
- `@services/*` → `src/services/*`

## Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Router:** React Router
- **Estado:** Redux Toolkit
- **Styling:** styled-components + utilidades Tailwind (**no** reescribir estilos existentes)
- **Animación:** Framer Motion, GSAP, React Spring (usar `transform/opacity`; limpiar listeners)
- **i18n:** i18next / react-i18next — `public/locales/`
- **Tests:** Jest + `@testing-library/react`
- **Calidad:** ESLint, Prettier, Husky, lint-staged

## Code Rules

- TypeScript **estricto**; tipado explícito en props, hooks y utils.
- Componentes funcionales + hooks; **composición > herencia**.
- Carpeta por componente con `index.ts` para imports limpios.
- Respetar ESLint/Prettier **sin cambiar configuraciones**.
- Commits: **Conventional Commits**.

## UI / UX

- Mantener **tema existente** (styled-components / `@styles/theme` si aplica).
- Accesibilidad mínima: roles/ARIA, foco manejado, contraste adecuado.
- Si se agrega texto UI: **ES y EN** (apto para i18n).

## i18n Rules

- Claves **descriptivas**.
- Locales en `public/locales/<lang>/`
- Evitar strings **hardcodeadas** en JSX.

## Security

- No exponer **secrets**; usar `.env`.
- No enviar **PII** a terceros.
- **Menor privilegio** en claves/alcances.

## No Touch

- `.taskmaster`, `.trae`, `.husky`, `.github`, `node_modules`, `dist`

## PR Checklist (auto = codex)

1. Lint / Typecheck **OK** (sin warnings).
2. Tests **pasan**; si se tocan componentes, **agregar tests mínimos**.
3. **A11y básico OK** (labels/foco).
4. **Build OK** (scripts no rotos).
5. **Diffs mínimos** y acotados al objetivo.

## Guardrails

**Shell**

- Usar **bash**. **No** usar cmd/powershell.

**CLI tools**

- Evitar `findstr/more`; preferir `grep/rg`, `sed`, `awk`, `jq` si están disponibles.

**Changes**

- Hacer cambios en una **sola pasada** y mostrar **diff** claro.

**FS**

- No escribir fuera del repo; sandbox lógico = **workspace**.

**Services**

- No arrancar `npm run dev` ni `vite preview` salvo permiso explícito.

## Reasoning Effort

- `default`: **medium**
- `high`: solo para algoritmos complejos o cambios arquitectónicos.
- `low`: tareas simples (p. ej., ajustar props/estilos).

## Persistence

- No pedir confirmación en **cada** paso.
- Si hay ambigüedad, **asumir lo más razonable** y documentarlo **al final** del archivo editado.

## Self‑Reflection

- Antes de cambios grandes, validar **modularidad, claridad y escalabilidad**.
- Si no cumple el estándar, **replantear** la solución antes de abrir PR.

---

# Always Works — Implementation Standard

**description:** Ensure what you implement Always Works" with comprehensive testing

## How to ensure Always Works" implementation

Please ensure your implementation Always Works" for: **\$ARGUMENTS**.

Follow this systematic approach:

### Core Philosophy

- "Should work" \* "does work" - Pattern matching isn't enough
- I'm not paid to write code, I'm paid to solve problems
- Untested code is just a guess, not a solution

### The 30-Second Reality Check - Must answer YES to ALL:

- Did I run/build the code?
  Did I trigger the exact feature I changed?
- Did I see the expected result with my own observation (including GUI)?
  Did I check for error messages?
  Would I bet \$100 this works?

### Phrases to Avoid:

"This should work now"
"I've fixed the issue" (especially 2nd+ time)
"Try it now" (without trying it myself)
"The logic is correct so ...

### Specific Test Requirements:

- **UI Changes:** Actually click the button/link/form
- **API Changes:** Make the actual API call
- **Data Changes:** Query the database
- **Logic Changes:** Run the specific scenario
- **Config Changes:** Restart and verify it loads

### The Embarrassment Test:

"If the user records trying this and it fails, will I feel embarrassed to see his face?"

### Time Reality:

- Time saved skipping tests: **30 seconds**
- Time wasted when it doesn't work: **30 minutes**
- User trust lost: **Immeasurable**

A user describing a bug for the third time isn't thinking "this AI is trying hard" - they're
thinking "why am I wasting time with this incompetent tool?"
