# Scripts

## generate-ai-context.ts

Genera automáticamente el archivo `src/data/profiles/matias-context.ts` que alimenta al asistente de IA del portfolio.

### ¿Por qué?

Antes, el contexto del asistente estaba hardcodeado y se desincronizaba con los datos reales del portfolio. Ahora se genera automáticamente desde:

- **Experiencias**: `src/components/ExperienceSection/experienceData.ts` + traducciones en `src/utils/i18n.ts`
- **Proyectos**: `src/features/matias/otros/data/projectsData.ts`
- **Stack tecnológico**: Agregado manualmente en el script

### Uso

```bash
npm run generate-ai-context
```

### ¿Cuándo ejecutarlo?

Ejecutá este script cada vez que:
- Agregues o modifiques proyectos en `projectsData.ts`
- Cambies descripciones de experiencias en `i18n.ts`
- Actualices tecnologías en `experienceData.ts`

### Resultado

Genera `src/data/profiles/matias-context.ts` con:
- ✅ Información actualizada automáticamente
- ✅ Traducciones en ES y EN
- ✅ Advertencia de no editar manualmente

### Una única fuente de verdad

Ahora solo necesitás actualizar:
1. `projectsData.ts` para nuevos proyectos
2. `experienceData.ts` para experiencias
3. `i18n.ts` para traducciones

Y el asistente se actualiza automáticamente.
