<agent_config>

  <setup>
    - Node: LTS (definir versión exacta).
    - Package manager: npm
    - Instalar: npm install
    - Monorepo: no (sin apps/* ni packages/*)
  </setup>

  <run_and_test>
    - No levantar dev salvo pedido explícito.
    - Lint: npm run lint
    - Tests (Jest + RTL): npm test
    - Build: npm run build
    - Preview (opcional, no arrancar sin permiso): npm run preview
  </run_and_test>

  <validation required="true">
    - Ejecutar: tsc --noEmit  → sin errores de TypeScript.
    - Ejecutar: npm run build → build completa sin errores.
    - Ejecutar: npm test      → tests relevantes pasan.
    - No marcar una tarea como “terminada” si algo falla.
  </validation>

  <structure>
    - Root: public/, src/, dist/, temp/
    - src/: assets/, bandit/, components/, context/, data/, docs/, fusionads/, hooks/, layouts/, newlook/, pages/, services/, store/, styles/, types/, utils/, xcons/
  </structure>

  <path_aliases>
    - @/* → src/*
    - @components/* → src/components/*
    - @styles/* → src/styles/*
    - @utils/* → src/utils/*
    - @hooks/* → src/hooks/*
    - @store/* → src/store/*
    - @types/* → src/types/*
    - @services/* → src/services/*
  </path_aliases>

  <stack>
    - Framework: React 18 + TypeScript
    - Bundler: Vite
    - Router: React Router
    - Estado: Redux Toolkit
    - Styling: styled-components + utilidades Tailwind (no reescribir estilos existentes)
    - Animación: Framer Motion, GSAP, React Spring (usar transform/opacity; limpiar listeners)
    - i18n: i18next / react-i18next — public/locales/
    - Tests: Jest + @testing-library/react
    - Calidad: ESLint, Prettier, Husky, lint-staged
  </stack>

  <code_rules>
    - TypeScript estricto; tipado explícito en props, hooks y utils.
    - Componentes funcionales + hooks; composición > herencia.
    - Carpeta por componente con index.ts para imports limpios.
    - Respetar ESLint/Prettier sin cambiar configuraciones.
    - Commits: Conventional Commits.
  </code_rules>

  <ui_ux>
    - Mantener tema existente (styled-components / @styles/theme si aplica).
    - Accesibilidad mínima: roles/ARIA, foco manejado, contraste adecuado.
    - Si se agrega texto UI: ES y EN (apto para i18n).
  </ui_ux>

  <i18n_rules>
    - Claves descriptivas.
    - Locales en public/locales/&lt;lang&gt;/
    - Evitar strings hardcodeadas en JSX.
  </i18n_rules>

  <security>
    - No exponer secrets; usar .env
    - No enviar PII a terceros
    - Menor privilegio en claves/alcances
  </security>

  <no_touch>
    - .taskmaster, .trae, .husky, .github, node_modules, dist
  </no_touch>

  <pr_checklist auto="codex">
    1. Lint / Typecheck OK (sin warnings).
    2. Tests pasan; si se tocan componentes, agregar tests mínimos.
    3. A11y básico OK (labels/foco).
    4. Build OK (scripts no rotos).
    5. Diffs mínimos y acotados al objetivo.
  </pr_checklist>

  <guardrails>
    <shell>
      - Usar bash. No usar cmd/powershell.
    </shell>
    <cli_tools>
      - Evitar findstr/more; preferir grep/rg, sed, awk, jq si están disponibles.
    </cli_tools>
    <changes>
      - Hacer cambios en una sola pasada y mostrar diff claro.
    </changes>
    <fs>
      - No escribir fuera del repo; sandbox lógico = workspace.
    </fs>
    <services>
      - No arrancar npm run dev ni vite preview salvo permiso explícito.
    </services>
  </guardrails>

  <reasoning_effort>
    - default: medium
    - high: solo para algoritmos complejos o cambios arquitectónicos.
    - low: tareas simples (p. ej., ajustar props/estilos).
  </reasoning_effort>

  <persistence>
    - No pedir confirmación en cada paso.
    - Si hay ambigüedad, asumir lo más razonable y documentarlo al final del archivo editado.
  </persistence>

  <self_reflection>
    - Antes de cambios grandes, validar alineación con modularidad, claridad y escalabilidad.
    - Si no cumple el estándar, replantear la solución antes de abrir PR.
  </self_reflection>

</agent_config>
