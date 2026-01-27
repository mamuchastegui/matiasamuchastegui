import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme, ThemeMode } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';

// Import company logo
import pomeloLogo from '../../../assets/images/companies/pomelo_logo.jpg';

// Import shared components
import { FrontendDevelopmentExperience } from '../../fusionads/components/FrontendDevelopmentExperience';
import type { FrontendExperienceCardData } from '../../fusionads/components/FrontendDevelopmentExperience';
import StandardSectionTitle from '../../../components/shared/StandardSectionTitle';

// Import experience data
import { backendDevelopmentExperienceData } from './data/experiencesData';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  background: #181818;
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 3rem;
  overflow: hidden;
  min-height: 180px;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 10px 30px;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 70%;

  @media (max-width: 992px) {
    max-width: 100%;
    align-items: center;
  }
`;

const LogoImage = styled.img`
  max-width: 180px;
  margin-bottom: 15px;
`;

const BannerText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const LocationText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StyledSiteButton = styled.a`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 8px;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
  }
`;

const Summary = styled.div<{ $themeMode: ThemeMode }>`
  margin: 3rem auto;
  max-width: 100%;
`;

const glassEffectForDescriptionBox = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  will-change: backdrop-filter;
`;

const SectionTitleInsideBox = styled.h3<{ $isDark: boolean }>`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
`;

const DividerLine = styled.hr<{ $isDark?: boolean }>`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
`;

const DescriptionBox = styled.div<{ $isDark: boolean }>`
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  background: ${({ $isDark }) => ($isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(245, 245, 250, 0.75)')};
  ${glassEffectForDescriptionBox}

  @media (max-width: 767px) {
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    margin-top: 0.5rem;
  }
`;

const SummaryText = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 0;
  color: ${({ $isDark }) => ($isDark ? '#DDDDDD' : '#444444')};
  white-space: pre-line;
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 3rem;
`;

const PomeloPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('en') ? 'en' : 'es';
  const isDark = themeMode === 'dark';

  const bannerUrl = 'https://pomelo.la';

  const bannerSectionTexts = {
    description: {
      es: 'Pomelo es una fintech que provee infraestructura de pagos y emisión de tarjetas para empresas en Latinoamérica, permitiendo lanzar productos financieros de forma rápida y escalable.',
      en: 'Pomelo is a fintech that provides payment infrastructure and card issuing for companies in Latin America, enabling fast and scalable financial product launches.',
    },
    location: {
      es: 'Argentina (Remoto)',
      en: 'Argentina (Remote)',
    },
    visitSiteButton: {
      es: 'Visitar sitio',
      en: 'Visit site',
    },
  };

  const roleSummaryTexts = {
    title: {
      es: 'Resumen de Rol',
      en: 'Role Summary',
    },
    description: {
      es: `Como Backend Developer en Pomelo, fui responsable del desarrollo y mantenimiento de sistemas críticos de procesamiento de pagos y clearing de transacciones.

Trabajé principalmente en Go, diseñando e implementando microservicios con arquitectura hexagonal y patrones DDD. Implementé soluciones de Event Sourcing para garantizar la trazabilidad completa de transacciones financieras.

Mi trabajo incluyó la integración con múltiples servicios de AWS, procesamiento de millones de eventos diarios, y participación activa en rotaciones de on-call para garantizar la disponibilidad del sistema 24/7.`,
      en: `As a Backend Developer at Pomelo, I was responsible for developing and maintaining critical payment processing and transaction clearing systems.

I worked primarily in Go, designing and implementing microservices with hexagonal architecture and DDD patterns. I implemented Event Sourcing solutions to ensure complete traceability of financial transactions.

My work included integration with multiple AWS services, processing millions of daily events, and active participation in on-call rotations to ensure 24/7 system availability.`,
    },
  };

  const currentExperienceData = backendDevelopmentExperienceData[
    language
  ] as FrontendExperienceCardData;
  const experienceSectionTitleText = backendDevelopmentExperienceData[language].sectionTitle;

  return (
    <PageTransition>
      <PageContainer>
        <Banner>
          <BannerContent>
            <LeftContent>
              <LogoImage src={pomeloLogo} alt="Pomelo Logo" />
              <BannerText>{bannerSectionTexts.description[language]}</BannerText>
              <LocationText>{bannerSectionTexts.location[language]}</LocationText>
              <StyledSiteButton href={bannerUrl} target="_blank" rel="noopener noreferrer">
                {bannerSectionTexts.visitSiteButton[language]}
              </StyledSiteButton>
            </LeftContent>
          </BannerContent>
        </Banner>

        <Summary $themeMode={themeMode}>
          <DescriptionBox $isDark={isDark}>
            <SectionTitleInsideBox $isDark={isDark}>
              {roleSummaryTexts.title[language]}
            </SectionTitleInsideBox>
            <DividerLine $isDark={isDark} />
            <SummaryText $isDark={isDark}>{roleSummaryTexts.description[language]}</SummaryText>
          </DescriptionBox>
        </Summary>

        <ExperienceContainer>
          <FrontendDevelopmentExperience
            title={<StandardSectionTitle>{experienceSectionTitleText}</StandardSectionTitle>}
            experience={currentExperienceData}
            isDark={isDark}
          />
        </ExperienceContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default PomeloPage;
