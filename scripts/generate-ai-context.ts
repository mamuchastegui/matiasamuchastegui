#!/usr/bin/env tsx

/**
 * Generate AI Assistant Context
 *
 * This script automatically generates the matias-context.ts file
 * based on the actual data from the portfolio.
 *
 * Usage: npm run generate-ai-context
 */

import fs from 'fs';
import path from 'path';

// Read and parse the translations from i18n.ts
function getTranslations() {
  const i18nPath = path.join(process.cwd(), 'src/utils/i18n.ts');
  const i18nContent = fs.readFileSync(i18nPath, 'utf-8');

  const extractExperienceTranslations = (lang: 'es' | 'en') => {
    const experiences: Record<string, any> = {};

    // Find the start of matias.experience for the specified language
    const langStart = i18nContent.indexOf(`${lang}:`);
    if (langStart === -1) return {};

    const langSection = i18nContent.substring(langStart);
    const matiasExpStart = langSection.indexOf('matias:');
    if (matiasExpStart === -1) return {};

    const matiasSection = langSection.substring(matiasExpStart);
    const experienceStart = matiasSection.indexOf('experience:');
    if (experienceStart === -1) return {};

    // Extract the experience block (from "experience:" to "projects:")
    const afterExperience = matiasSection.substring(experienceStart);
    const projectsIndex = afterExperience.indexOf('projects:');
    const experienceBlock = projectsIndex > 0
      ? afterExperience.substring(0, projectsIndex)
      : afterExperience.substring(0, 5000); // Fallback

    const experienceIds = ['fusionads', 'pomelo', 'mercadolibre', 'ayi', 'darwoft', 'brandigital'];

    experienceIds.forEach(id => {
      const idStart = experienceBlock.indexOf(`${id}:`);
      if (idStart === -1) return;

      // Find the end of this experience object (next experience id or closing brace)
      const afterId = experienceBlock.substring(idStart);
      let endPos = afterId.length;

      // Find the next experience ID
      for (const otherId of experienceIds) {
        if (otherId !== id) {
          const otherIdPos = afterId.indexOf(`${otherId}:`);
          if (otherIdPos > 0 && otherIdPos < endPos) {
            endPos = otherIdPos;
          }
        }
      }

      const expContent = afterId.substring(0, endPos);

      // Extract fields
      const companyMatch = expContent.match(/company:\s*['"]([^'"]+)['"]/);
      const roleMatch = expContent.match(/role:\s*['"]([^'"]+)['"]/);
      const periodMatch = expContent.match(/period:\s*['"]([^'"]+)['"]/);
      const descMatch = expContent.match(/description:\s*['"]([^'"]+)['"]/);

      experiences[id] = {
        company: companyMatch ? companyMatch[1] : '',
        role: roleMatch ? roleMatch[1] : '',
        period: periodMatch ? periodMatch[1] : '',
        description: descMatch ? descMatch[1] : '',
      };
    });

    return experiences;
  };

  return {
    es: extractExperienceTranslations('es'),
    en: extractExperienceTranslations('en'),
  };
}

// Read and parse projects data
function getProjectsData() {
  const projectsPath = path.join(process.cwd(), 'src/features/matias/otros/data/projectsData.ts');
  const projectsContent = fs.readFileSync(projectsPath, 'utf-8');

  const projects: any[] = [];
  const projectBlocks = projectsContent.match(/{[\s\S]*?id:\s*['"](\w+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?description:\s*{[\s\S]*?es:\s*['"`]([^'"`]*?)['"`],[\s\S]*?en:\s*['"`]([^'"`]*?)['"`][\s\S]*?technologies:\s*\[([^\]]+)\][\s\S]*?status:\s*['"](\w+)['"][\s\S]*?}/gs);

  if (projectBlocks) {
    projectBlocks.forEach(block => {
      const id = block.match(/id:\s*['"](\w+)['"]/)?.[1];
      const name = block.match(/name:\s*['"]([^'"]+)['"]/)?.[1];
      const descEs = block.match(/es:\s*['"`]([^'"`]*?)['"`],/s)?.[1];
      const descEn = block.match(/en:\s*['"`]([^'"`]*?)['"`]/s)?.[1];
      const tech = block.match(/technologies:\s*\[([^\]]+)\]/)?.[1]
        .split(',')
        .map((t: string) => t.trim().replace(/['"]/g, ''));
      const status = block.match(/status:\s*['"](\w+)['"]/)?.[1];

      if (id && name && descEs && descEn && tech && status) {
        projects.push({
          id,
          name,
          description: { es: descEs, en: descEn },
          technologies: tech,
          status,
        });
      }
    });
  }

  return projects;
}

// Read experience data for tech stack
function getExperienceData() {
  const expPath = path.join(process.cwd(), 'src/components/ExperienceSection/experienceData.ts');
  const expContent = fs.readFileSync(expPath, 'utf-8');

  const experiences: any[] = [];
  const expBlocks = expContent.match(/{[\s\S]*?id:\s*['"](\w+)['"][\s\S]*?tech:\s*\[([^\]]+)\][\s\S]*?}/gs);

  if (expBlocks) {
    expBlocks.forEach(block => {
      const id = block.match(/id:\s*['"](\w+)['"]/)?.[1];
      const tech = block.match(/tech:\s*\[([^\]]+)\]/)?.[1]
        .split(',')
        .map((t: string) => t.trim().replace(/['"]/g, ''));

      if (id && tech) {
        experiences.push({ id, tech });
      }
    });
  }

  return experiences;
}

function generateExperienceSection(lang: 'es' | 'en', translations: any, experienceData: any[]) {
  const title = lang === 'es' ? '## Experiencia Profesional' : '## Professional Experience';

  const experienceIds = ['fusionads', 'pomelo', 'mercadolibre', 'ayi', 'darwoft', 'brandigital'];

  const experienceTexts = experienceIds
    .map(id => {
      const trans = translations[lang][id];
      const exp = experienceData.find(e => e.id === id);

      if (!trans || !exp) return null;

      const techStack = exp.tech.join(', ');

      return `### ${trans.company} (${trans.period}) - ${trans.role}
${trans.description}
- **Stack principal:** ${techStack}`;
    })
    .filter(Boolean);

  return `${title}\n\n${experienceTexts.join('\n\n')}`;
}

function generateProjectsSection(lang: 'es' | 'en', projects: any[]) {
  const title = lang === 'es' ? '## Proyectos Personales' : '## Personal Projects';
  const activeLabel = lang === 'es' ? 'Activo' : 'Active';
  const devLabel = lang === 'es' ? 'En desarrollo' : 'In Development';

  const projectTexts = projects.map(project => {
    const statusLabel = project.status === 'active' ? activeLabel : devLabel;
    const description = project.description[lang];
    const techStack = project.technologies.join(', ');

    return `### ${project.name} (${statusLabel})
${description}
**Stack:** ${techStack}`;
  });

  return `${title}\n\n${projectTexts.join('\n\n')}`;
}

function generateContext(lang: 'es' | 'en', translations: any, projects: any[], experienceData: any[]): string {
  const isSpanish = lang === 'es';

  const intro = isSpanish
    ? `Sos el asistente virtual de Matias Amuchástegui. Tu propósito es responder preguntas sobre Matias, su experiencia profesional, proyectos, habilidades técnicas, y también ayudar a potenciales clientes que quieran contratar sus servicios.

## REGLAS

1. **Respondés preguntas relacionadas con Matias Amuchástegui y sus servicios**
2. **SÍ podés responder sobre:**
   - Experiencia, proyectos, stack tecnológico
   - Disponibilidad para proyectos freelance o consultoría
   - Tipos de proyectos que puede desarrollar
   - Cómo contactarlo para cotizaciones
   - Modalidad de trabajo (remoto, por proyecto, etc.)
3. **NO respondés sobre temas no relacionados** (recetas, chistes, información general). En ese caso decí: "Solo puedo ayudarte con información sobre Matias y sus servicios de desarrollo. ¿Te interesa saber qué tipo de proyectos puede desarrollar?"
4. NO inventes información específica como precios o tiempos. Para cotizaciones, sugerí contactar directamente a matias@condamind.com
5. Sé conciso pero completo. Mostrá entusiasmo por conectar al cliente con Matias.

## Servicios Freelance/Consultoría

Matias está disponible para:
- **Desarrollo Backend:** APIs, microservicios, integraciones
- **Arquitectura de Software:** Diseño de sistemas distribuidos, consultoría técnica
- **Integraciones con IA:** OpenAI, LangChain, automatizaciones inteligentes
- **Consultoría Técnica:** Code reviews, mentorías, mejora de arquitectura existente

**Modalidad:** Trabajo remoto, proyectos por hora o precio fijo según complejidad.
**Contacto para cotizaciones:** matias@condamind.com

## Sobre Matias

**Rol actual:** Freelance / Consultoría (2026-presente)
**Ubicación:** Córdoba, Argentina
**Email:** matias@condamind.com
**Especialización:** Desarrollo backend, sistemas distribuidos, arquitectura de software`
    : `You are the virtual assistant for Matias Amuchástegui. Your purpose is to answer questions about Matias, his professional experience, projects, technical skills, and also help potential clients who want to hire his services.

## RULES

1. **Answer questions related to Matias Amuchástegui and his services**
2. **YES, you can answer about:**
   - Experience, projects, tech stack
   - Availability for freelance projects or consulting
   - Types of projects he can develop
   - How to contact him for quotes
   - Work modality (remote, per project, etc.)
3. **DO NOT answer unrelated topics** (recipes, jokes, general info). In that case say: "I can only help you with information about Matias and his development services. Would you like to know what types of projects he can develop?"
4. DO NOT make up specific information like prices or timelines. For quotes, suggest contacting matias@condamind.com directly.
5. Be concise but thorough. Show enthusiasm for connecting the client with Matias.

## Freelance/Consulting Services

Matias is available for:
- **Backend Development:** APIs, microservices, integrations
- **Software Architecture:** Distributed systems design, technical consulting
- **AI Integrations:** OpenAI, LangChain, intelligent automations
- **Technical Consulting:** Code reviews, mentoring, existing architecture improvements

**Modality:** Remote work, hourly or fixed-price projects depending on complexity.
**Contact for quotes:** matias@condamind.com

## About Matias

**Current Role:** Freelance / Consulting (2026-present)
**Location:** Córdoba, Argentina
**Email:** matias@condamind.com
**Specialization:** Backend development, distributed systems, software architecture`;

  const techStack = isSpanish
    ? `## Stack Tecnológico Detallado

### Lenguajes (por nivel de experiencia)
- **TypeScript/JavaScript:** +6 años, uso diario, nivel experto
- **Go:** +4 años, microservicios de alto rendimiento, nivel avanzado
- **Python:** +3 años, scripting, automatización, integraciones IA
- **Java:** +3 años, experiencia en MercadoLibre a escala

### Backend & APIs
- Node.js (Express, Fastify, NestJS)
- gRPC, REST APIs, GraphQL
- Message queues: Kafka, RabbitMQ, AWS SQS

### Bases de Datos
- **SQL:** PostgreSQL (experto), MySQL
- **NoSQL:** Redis, DynamoDB, MongoDB
- **Patterns:** Event Sourcing, CQRS

### Cloud & DevOps
- **AWS:** Lambda, ECS, SQS, S3, DynamoDB, RDS (nivel avanzado)
- **GCP:** Cloud Functions, Cloud Run
- **Containers:** Docker, Kubernetes
- **IaC:** Terraform, CloudFormation

### Observabilidad
- Prometheus, Grafana, Alertmanager
- New Relic, DataDog
- Distributed tracing (Jaeger, OpenTelemetry)

### Arquitectura
- Microservicios, Event-Driven Architecture
- Domain-Driven Design (DDD)
- Hexagonal Architecture
- CQRS, Event Sourcing`
    : `## Detailed Tech Stack

### Languages (by experience level)
- **TypeScript/JavaScript:** 6+ years, daily use, expert level
- **Go:** 4+ years, high-performance microservices, advanced level
- **Python:** 3+ years, scripting, automation, AI integrations
- **Java:** 3+ years, experience at MercadoLibre scale

### Backend & APIs
- Node.js (Express, Fastify, NestJS)
- gRPC, REST APIs, GraphQL
- Message queues: Kafka, RabbitMQ, AWS SQS

### Databases
- **SQL:** PostgreSQL (expert), MySQL
- **NoSQL:** Redis, DynamoDB, MongoDB
- **Patterns:** Event Sourcing, CQRS

### Cloud & DevOps
- **AWS:** Lambda, ECS, SQS, S3, DynamoDB, RDS (advanced level)
- **GCP:** Cloud Functions, Cloud Run
- **Containers:** Docker, Kubernetes
- **IaC:** Terraform, CloudFormation

### Observability
- Prometheus, Grafana, Alertmanager
- New Relic, DataDog
- Distributed tracing (Jaeger, OpenTelemetry)

### Architecture
- Microservices, Event-Driven Architecture
- Domain-Driven Design (DDD)
- Hexagonal Architecture
- CQRS, Event Sourcing`;

  const experienceSection = generateExperienceSection(lang, translations, experienceData);
  const projectsSection = generateProjectsSection(lang, projects);

  return `${intro}\n\n${experienceSection}\n\n${projectsSection}\n\n${techStack}`;
}

function generateFile() {
  console.log('📖 Reading portfolio data...');

  const translations = getTranslations();
  const projects = getProjectsData();
  const experienceData = getExperienceData();

  console.log(`✅ Found ${projects.length} projects`);
  console.log(`✅ Found ${experienceData.length} experiences`);

  console.log('\n🔨 Generating AI context...');

  const esContext = generateContext('es', translations, projects, experienceData);
  const enContext = generateContext('en', translations, projects, experienceData);

  const fileContent = `// Context information for Matias's AI assistant
// This gets sent as system prompt to OpenAI
//
// ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Generated by scripts/generate-ai-context.ts
// Run: npm run generate-ai-context

export const matiasContext = {
  es: \`${esContext}\`,

  en: \`${enContext}\`
};
`;

  const outputPath = path.join(process.cwd(), 'src/data/profiles/matias-context.ts');
  fs.writeFileSync(outputPath, fileContent, 'utf-8');

  console.log('\n✅ Generated matias-context.ts successfully!');
  console.log(`📄 File: ${outputPath}`);
  console.log('\n💡 The AI assistant will now use up-to-date information from your portfolio!');
}

// Run the generator
try {
  generateFile();
} catch (error) {
  console.error('❌ Error generating AI context:', error);
  process.exit(1);
}
