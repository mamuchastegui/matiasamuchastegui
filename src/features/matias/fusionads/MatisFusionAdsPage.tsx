import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme, ThemeMode } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';

// Reuse existing FusionAds assets
import fusionAdsFondo from '../../../assets/Proyectos Fusion/Fusion-fondo.png';
import fusionAdsLogo from '../../../assets/Proyectos Fusion/Logo-color-fusion.png';
import fusionAdsAppImage from '../../../assets/Proyectos Fusion/fusion-app.png';

// Import shared components
import { FrontendDevelopmentExperience } from '../../fusionads/components/FrontendDevelopmentExperience';
import type { FrontendExperienceCardData } from '../../fusionads/components/FrontendDevelopmentExperience';
import StandardSectionTitle from '../../../components/shared/StandardSectionTitle';

// Import Matias-specific experience data
import { backendDevelopmentExperienceData } from './data/experiencesData';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const FusionAdsBanner = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 3rem;
  overflow: hidden;
  min-height: 180px;
`;

const BannerBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  background-image: url(${fusionAdsFondo});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 600px auto;
  opacity: 0.5;
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
  max-width: 60%;

  @media (max-width: 992px) {
    max-width: 100%;
    align-items: center;
  }
`;

const LogoImage = styled.img`
  max-width: 230px;
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
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StyledSiteButton = styled.a`
  display: inline-block;
  background-color: #f7480b;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d9400a;
    text-decoration: none;
  }
`;

const RightContent = styled.div`
  max-width: 35%;

  @media (max-width: 992px) {
    max-width: 70%;
    margin-top: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: block;
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

const MatisFusionAdsPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('en') ? 'en' : 'es';
  const isDark = themeMode === 'dark';

  const bannerUrl = 'https://backoffice.fusionos.ai';

  const bannerSectionTexts = {
    description: {
      es: 'FusionAds convierte un brief de marketing en 50+ versiones de anuncios (Facebook, Google, Instagram) en minutos. Lo que antes le tomaba a un equipo 2 días.',
      en: 'FusionAds turns a marketing brief into 50+ ad versions (Facebook, Google, Instagram) in minutes. What used to take a team 2 days.',
    },
    location: {
      es: 'Estados Unidos',
      en: 'United States',
    },
    visitSiteButton: {
      es: 'Visitar sitio',
      en: 'Visit site',
    },
  };

  const roleSummaryTexts = {
    title: {
      es: 'El Problema',
      en: 'The Problem',
    },
    description: {
      es: `FusionAds tenía un problema: generar miles de anuncios personalizados sin morir en el intento. Cada campaña necesita múltiples versiones (Facebook, Google, Instagram), con textos generados por IA, imágenes adaptadas, y todo publicado en canales diferentes.

Construí el motor que orquesta todo eso. Desde coordinar las llamadas a OpenAI, manejar las colas de procesamiento, hasta asegurar que nada explote cuando el tráfico se multiplica por 10. Circuit breakers para cuando la IA decide tomarse un descanso, fallbacks para que las campañas sigan corriendo, y observabilidad completa para saber exactamente qué pasa cuando algo se rompe.

También mentoré un equipo de 4 developers distribuidos, estableciendo las bases de cómo trabajamos: code reviews que mejoran (no solo critican), documentación que la gente realmente usa, y procesos que escalan con el equipo.`,
      en: `FusionAds had a problem: generate thousands of personalized ads without dying in the process. Each campaign needs multiple versions (Facebook, Google, Instagram), with AI-generated texts, adapted images, and everything published across different channels.

I built the engine that orchestrates all of that. From coordinating OpenAI calls, handling processing queues, to ensuring nothing explodes when traffic multiplies by 10. Circuit breakers for when the AI decides to take a break, fallbacks to keep campaigns running, and complete observability to know exactly what's happening when something breaks.

I also mentored a team of 4 distributed developers, establishing the foundations of how we work: code reviews that improve (not just criticize), documentation that people actually use, and processes that scale with the team.`,
    },
  };

  const currentExperienceData = backendDevelopmentExperienceData[
    language
  ] as FrontendExperienceCardData;
  const experienceSectionTitleText = backendDevelopmentExperienceData[language].sectionTitle;

  return (
    <PageTransition>
      <PageContainer>
        <FusionAdsBanner>
          <BannerBackground />
          <BannerContent>
            <LeftContent>
              <LogoImage src={fusionAdsLogo} alt="FusionAds.ai Logo" />
              <BannerText>{bannerSectionTexts.description[language]}</BannerText>
              <LocationText>{bannerSectionTexts.location[language]}</LocationText>
              <StyledSiteButton href={bannerUrl} target="_blank" rel="noopener noreferrer">
                {bannerSectionTexts.visitSiteButton[language]}
              </StyledSiteButton>
            </LeftContent>
            <RightContent>
              <img src={fusionAdsAppImage} alt="FusionAds Application Screenshot" />
            </RightContent>
          </BannerContent>
        </FusionAdsBanner>

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

export default MatisFusionAdsPage;
