import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageMorphingTitle from '@components/LanguageMorphingTitle';
import PageTransition from '@components/PageTransition/PageTransition';
import ScrollReveal from '@components/ScrollReveal';
import profileImage from '../assets/profile-image.webp';

const StyledMorphingTitle = styled(LanguageMorphingTitle)`
  font-size: clamp(2.5rem, 5vw, 7rem);
  font-weight: 900;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: clamp(3.5rem, 8vw, 10rem);
    margin-bottom: 2rem;
  }
`;

const SectionContent = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.xl};
  padding-top: 5rem;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <PageTransition>
      <Content>
        <StyledMorphingTitle translationKey="navbar.about" morphTime={0.8} cooldownTime={0.2} />
        <SectionContent>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                height: '300px',
                width: '300px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                margin: '0 auto',
                order: 1,
              }}
            >
              <img
                src={profileImage}
                alt={t('navbar.about')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            <div style={{ order: 2 }}>
              {/* Intro */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={10}
                blurStrength={15}
              >
                {i18n.language === 'es'
                  ? 'Impulso a emprendedores, agencias y startups ideando soluciones innovadoras y llevándolas a la realidad con diseño UX/UI de alto nivel, desarrollo en código y herramientas de IA que optimizan procesos y maximizan resultados.'
                  : 'I empower entrepreneurs, agencies, and startups by ideating innovative solutions and bringing them to life with high‑level UX/UI design, production‑ready code, and AI tools that streamline processes and maximize results.'}
              </ScrollReveal>

              {/* Block 1: De principio a fin */}
              <div style={{ marginTop: '1rem' }}>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={10}
                  blurStrength={15}
                >
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    {i18n.language === 'es' ? 'De principio a fin' : 'End‑to‑End'}
                  </strong>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {i18n.language === 'es'
                      ? 'Desde investigación UX y prototipos de alta fidelidad en Figma, hasta una impecable implementación completa. ¿No es suficiente? Elevo el nivel de tu producto con AI: búsquedas vectoriales semánticas, diseño de agentes autónomos, flujos en n8n, RAG, etc. Pruebo nuevas herramientas a diario y comparto mis hallazgos en redes. Tu proyecto siempre se beneficia de lo más avanzado.'
                      : 'From UX research and high‑fidelity Figma prototypes to a polished end‑to‑end implementation. Need more? I supercharge your product with AI: semantic vector search, autonomous agent design, n8n workflows, RAG, and more. I test new tools daily and share findings — your project always benefits from the cutting edge.'}
                  </span>
                </ScrollReveal>
              </div>

              {/* Block 2: Solo o en equipo */}
              <div style={{ marginTop: '1rem' }}>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={10}
                  blurStrength={15}
                >
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    {i18n.language === 'es' ? 'Solo o en equipo' : 'Solo or Team Player'}
                  </strong>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {i18n.language === 'es'
                      ? 'Trabajo de forma autónoma o integrado a tu equipo, adaptándome a las necesidades del proyecto para entregar resultados sobresalientes, ya sea como fuerza individual o en colaboración multidisciplinaria.'
                      : 'I work autonomously or embedded in your team, adapting to project needs to deliver outstanding outcomes — either as an individual contributor or within a multidisciplinary collaboration.'}
                  </span>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </SectionContent>

        <SectionContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
              containerClassName="section-title"
            >
              {t('about.professionalExperience')}
            </ScrollReveal>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
            >
              {t('about.jobs.fullStackEngineer')}
            </ScrollReveal>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '0.5rem',
              }}
            >
              {t('about.jobs.fusionOS')}
            </p>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
              {(t('about.jobDescriptions.fusionOS', { returnObjects: true }) as string[]).map(
                (description: string, index: number) => (
                  <li key={index}>{description}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={8}
              blurStrength={15}
            >
              {t('about.jobs.uiUxDesigner')}
            </ScrollReveal>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '0.5rem',
              }}
            >
              {t('about.jobs.xcons')}
            </p>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
              {(t('about.jobDescriptions.xcons', { returnObjects: true }) as string[]).map(
                (description: string, index: number) => (
                  <li key={index}>{description}</li>
                )
              )}
            </ul>
          </div>
        </SectionContent>

        <SectionContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={10}
              blurStrength={20}
              containerClassName="section-title"
            >
              {t('about.featuredProjects')}
            </ScrollReveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            <div
              style={{
                background: 'rgba(60, 60, 80, 0.3)',
                borderRadius: '0.8rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
              >
                {t('about.projects.personalPortfolio')}
              </ScrollReveal>
              <p>{t('about.projects.personalPortfolioDesc')}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  React
                </span>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  TypeScript
                </span>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  Styled Components
                </span>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(60, 60, 80, 0.3)',
                borderRadius: '0.8rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
              >
                {t('about.projects.ecommerceApp')}
              </ScrollReveal>
              <p>{t('about.projects.ecommerceAppDesc')}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  React
                </span>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  Redux
                </span>
                <span
                  style={{
                    background: 'rgba(100, 108, 255, 0.3)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  Node.js
                </span>
              </div>
            </div>
          </div>
        </SectionContent>

        <SectionContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={10}
              blurStrength={20}
              containerClassName="section-title"
            >
              {t('about.skills')}
            </ScrollReveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
              >
                {t('about.skillCategories.fullStack')}
              </ScrollReveal>
              <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
                <li>React / React Native</li>
                <li>TypeScript / JavaScript</li>
                <li>HTML5 / CSS3</li>
                <li>Styled Components</li>
                <li>Redux / Context API</li>
                <li>Python (Django, Flask, FastAPI)</li>
              </ul>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
              >
                {t('about.skillCategories.backend')}
              </ScrollReveal>
              <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Firebase</li>
                <li>RESTful APIs</li>
              </ul>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
              >
                {t('about.skillCategories.tools')}
              </ScrollReveal>
              <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
                <li>Git / GitHub / Bitbucket / Jira / Trello</li>
                <li>WordPress (nivel avanzado) / Elementor</li>
                <li>Webpack / Vite</li>
                <li>Figma / Adobe Suite (Photoshop, Illustrator)</li>
                <li>Postman / Jest / Testing Library</li>
                <li>n8n (Automatizaciones)</li>
              </ul>
            </div>
          </div>
        </SectionContent>
      </Content>
    </PageTransition>
  );
};

export default About;
