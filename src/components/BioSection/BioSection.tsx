import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TechSlider from '@components/TechSlider';

const SectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4.5rem 1.5rem 3.5rem;
  position: relative;
  overflow: visible;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 4rem 1.25rem 3rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 1rem 2.5rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const GlassCard = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  border-radius: 24px;
  overflow: visible;
  padding: 2rem 2.25rem 1.5rem;
  box-shadow: ${({ theme }) => theme.isDark
    ? '0 10px 40px rgba(0,0,0,0.35)'
    : '0 10px 30px rgba(0,0,0,0.12)'};

  @media (min-width: 768px) {
    padding: 2.75rem 3rem 2rem;
  }
  @media (min-width: 1024px) {
    padding: 3.25rem 4rem 2.25rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
`;

// Title removed per request



// Plain text blocks (no animations)

const BioText = styled.p`
  margin: 0 0 0.5rem 0;
  line-height: 1.75;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.3vw, 1.0625rem);
  color: ${({ theme }) => (theme.isDark ? 'rgba(255,255,255,0.75)' : 'rgba(29,31,35,0.8)')};
  max-width: 75ch;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
`;

// Intro text with higher prominence for marketing hierarchy
const IntroText = styled(BioText)`
  font-size: clamp(1.125rem, 1.8vw, 1.35rem);
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: -0.005em;
`;

const BlockCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    border-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
                0 0 0 1px ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  }

  &:hover::before { opacity: 0.1; }
  &:hover::after { opacity: 1; }

  @media (min-width: 768px) {
    padding: 1.5rem 1.75rem;
  }

  @media (min-width: 1024px) {
    padding: 1.75rem 2rem;
  }
`;

const BlockTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.2px;
`;

const TechSliderContainer = styled.div`
  width: 100%;
  margin-top: 0;
  position: relative;
  /* keep plain (no entrance animations) */
`;
const BioSection: React.FC = () => {
  const { i18n } = useTranslation();

  const intro = i18n.language === 'es'
    ? 'Impulso a emprendedores, agencias y startups ideando soluciones innovadoras y llevándolas a la realidad con diseño UX/UI de alto nivel, desarrollo en código y herramientas de IA que optimizan procesos y maximizan resultados.'
    : 'I empower entrepreneurs, agencies, and startups by ideating innovative solutions and bringing them to life with high‑level UX/UI design, production‑ready code, and AI tools that streamline processes and maximize results.';

  const block1Title = i18n.language === 'es' ? 'De principio a fin' : 'End‑to‑End';
  const block1Text = i18n.language === 'es'
    ? 'Desde investigación UX y prototipos de alta fidelidad en Figma, hasta una impecable implementación completa. ¿No es suficiente? Elevo el nivel de tu producto con AI: búsquedas vectoriales semánticas, diseño de agentes autónomos, flujos en n8n, RAG, etc. Pruebo nuevas herramientas a diario y comparto mis hallazgos en redes. Tu proyecto siempre se beneficia de lo más avanzado.'
    : 'From UX research and high‑fidelity Figma prototypes to a polished end‑to‑end implementation. Need more? I supercharge your product with AI: semantic vector search, autonomous agent design, n8n workflows, RAG, and more. I test new tools daily and share findings — your project always benefits from the cutting edge.';

  const block2Title = i18n.language === 'es' ? 'Solo o en equipo' : 'Solo or Team Player';
  const block2Text = i18n.language === 'es'
    ? 'Trabajo de forma autónoma o integrado a tu equipo, adaptándome a las necesidades del proyecto para entregar resultados sobresalientes, ya sea como fuerza individual o en colaboración multidisciplinaria.'
    : 'I work autonomously or embedded in your team, adapting to project needs to deliver outstanding outcomes — either as an individual contributor or within a multidisciplinary collaboration.';

  return (
    <SectionContainer id="about">
      <GlassCard>
        <ContentWrapper>

          <IntroText>{intro}</IntroText>

          <TextContainer>
            <BlockCard>
              <BlockTitle>{block1Title}</BlockTitle>
              <BioText>{block1Text}</BioText>
            </BlockCard>
            <BlockCard>
              <BlockTitle>{block2Title}</BlockTitle>
              <BioText>{block2Text}</BioText>
            </BlockCard>
          </TextContainer>

          <TechSliderContainer>
            <TechSlider />
          </TechSliderContainer>
        </ContentWrapper>
      </GlassCard>
    </SectionContainer>
  );
};

export default BioSection;
