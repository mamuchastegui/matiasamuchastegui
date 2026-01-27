import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme, ThemeMode } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';

// Import company logo
import mercadolibreLogo from '../../../assets/images/companies/meli_logo.png';

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
  background: #ffd100;
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
  max-width: 200px;
  margin-bottom: 15px;
`;

const BannerText = styled.p`
  font-size: 1rem;
  color: #333;
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const LocationText = styled.span`
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StyledSiteButton = styled.a`
  display: inline-block;
  background-color: #2D3277;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1a1f4e;
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

const MercadoLibrePage: React.FC = () => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('en') ? 'en' : 'es';
  const isDark = themeMode === 'dark';

  const bannerUrl = 'https://mercadolibre.com';

  const bannerSectionTexts = {
    description: {
      es: 'MercadoLibre es el ecosistema de comercio electrónico y fintech más grande de Latinoamérica, con presencia en 18 países y más de 100 millones de usuarios activos.',
      en: 'MercadoLibre is the largest e-commerce and fintech ecosystem in Latin America, with presence in 18 countries and over 100 million active users.',
    },
    location: {
      es: 'Córdoba, Argentina',
      en: 'Córdoba, Argentina',
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
      es: `Como Backend Developer en MercadoLibre, trabajé en el equipo de Post-Compra, desarrollando features que impactan directamente a más de 100 millones de usuarios en toda Latinoamérica.

Mi trabajo se centró en el desarrollo de microservicios de alta disponibilidad y baja latencia, integrando sistemas de pagos, envíos y atención al cliente. Mantuve endpoints críticos con latencia P95 menor a 150ms.

Colaboré de forma cross-funcional con equipos de producto, ingeniería y UX para definir y priorizar features, implementando A/B tests y rollouts graduales para minimizar riesgos.`,
      en: `As a Backend Developer at MercadoLibre, I worked on the Post-Purchase team, developing features that directly impact over 100 million users across Latin America.

My work focused on developing high-availability, low-latency microservices, integrating payment, shipping, and customer service systems. I maintained critical endpoints with P95 latency under 150ms.

I collaborated cross-functionally with product, UX, and data teams to define and prioritize features, implementing A/B tests and gradual rollouts to minimize risks.`,
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
              <LogoImage src={mercadolibreLogo} alt="MercadoLibre Logo" />
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

export default MercadoLibrePage;
