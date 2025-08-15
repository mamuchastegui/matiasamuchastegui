import React from 'react';
import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import banditLogo from '../assets/Proyectos Bandit/Logo Bandit Oscuro.png';
import banditFondo from '../assets/Proyectos Bandit/fondo-bandit.svg';
import banditApp from '../assets/Proyectos Bandit/Bandit-app.png';
import PageTransition from '@components/PageTransition/PageTransition';
import StandardSectionTitle from '@components/shared/StandardSectionTitle';
import Masonry from '../xcons/components/Masonry';
import { UXUIDesignExperience } from './components/Experiences';
import { uxUIExperiences } from './data/experiencesData';
import { createMasonryData } from './data/masonryData';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const BanditBanner = styled.div`
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
  background-image: url(${banditFondo});
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
    text-align: center;
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

  a {
    color: #F70F43;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`;

const LocationText = styled.span`
  color: #888888;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const StyledSiteButton = styled.a`
  display: inline-block;
  background-color: #F70F43;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #D90D3A;
    text-decoration: none;
  }
`;

const RightContent = styled.div`
  max-width: 35%;

  @media (max-width: 992px) {
    max-width: 80%;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  background-color: ${({ $isDark }) =>
    $isDark
      ? 'rgba(255,255,255,0.2)'
      : 'rgba(0,0,0,0.15)'};
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
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 3rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 767px) {
    gap: 1.5rem;
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
  }
`;





const MasonryWrapper = styled.div<{ $isDark?: boolean }>`
  margin-top: 4rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  padding: 2.5rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  background: ${({ $isDark }) => ($isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(245, 245, 250, 0.75)')};
  ${glassEffectForDescriptionBox}
  color: ${({ theme }) => theme.colors.text};

  & > *:first-child {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 767px) {
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    margin-top: 2rem;
  }
`;



const BanditPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const language = i18n.language.startsWith('en') ? 'en' : 'es';
  const isDark = themeMode === 'dark';
  
  const initialProject = searchParams.get('project');

  const masonryData = createMasonryData(language);

  const translations = {
    mainTitle: { es: 'Un Vistazo a Bandit', en: 'A Glimpse into Bandit' },
    designTitle: { es: 'Diseño UX/UI', en: 'UX/UI Design' },
    projectsTitle: { es: 'Proyectos Destacados', en: 'Featured Projects' },
    roleSummaryTitle: { es: 'Resumen de Rol', en: 'Role Summary' },
    visitSiteButton: { es: 'Visitar sitio', en: 'Visit site' },
    summary: {
      es: 'Como diseñador UX/UI, trabajé junto a Kodi (CEO de Bandit) para potenciar su plataforma, mejorando su estética y experiencia de usuario. Utilicé Clarity para ver sesiones de usuarios reales, hice pruebas y test para cada propuesta. Discutimos cuál era el mejor camino para cada nueva función, o cómo mejorar aquellas existentes, siempre basándome en los principios del UX. Añadimos tooltips, movimos botones, simplificamos acciones, homogeneizamos modales y secciones, siempre teniendo en cuenta que eran componentes reutilizables a lo largo de toda la plataforma. Mi experiencia como desarrollador me permitió entender mejor los requisitos y desarrollar propuestas más realistas y acordes a las implementaciones finales. La sección más difícil fue sin duda el calendario, que presentaba información y funcionalidades nunca antes vistas en aplicaciones de su tipo. Revisando las sesiones de Clarity pudimos notar qué secciones necesitaban mejoras críticas y cuáles utilizaban más los usuarios.',
      en: 'As a UX/UI designer, I worked alongside Kodi (CEO of Bandit) to enhance their platform, improving its aesthetics and user experience. I used Clarity to view real user sessions, conducted tests for each proposal. We discussed the best approach for each new feature, or how to improve existing ones, always based on UX principles. We added tooltips, moved buttons, simplified actions, and homogenized modals and sections, always considering they were reusable components throughout the platform. My experience as a developer allowed me to better understand requirements and develop more realistic proposals aligned with final implementations. The most challenging section was undoubtedly the calendar, which presented information and functionalities never before seen in applications of its kind. By reviewing Clarity sessions, we could identify which sections needed critical improvements and which ones users utilized most.',
    },
    bannerDescription: {
      es: 'Bandit es una plataforma enfocada en la gestión de giras y conciertos en vivo, diseñada para simplificar la logística tanto para artistas como para managers y agencias.',
      en: 'Bandit is a platform focused on tour and live concert management, designed to simplify logistics for artists, managers, and agencies.',
    },
    location: {
      es: 'España',
      en: 'Spain',
    },
  };



  return (
    <PageTransition>
      <PageContainer>
        <StandardSectionTitle
          as="h1"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            border: 0,
          }}
        >
          {translations.mainTitle[language]}
        </StandardSectionTitle>

        <BanditBanner>
          <BannerBackground />
          <BannerContent>
            <LeftContent>
              <LogoImage src={banditLogo} alt="Bandit Logo" />
              <BannerText>
                {translations.bannerDescription[language]}
              </BannerText>
              <LocationText>{translations.location[language]}</LocationText>
              <StyledSiteButton
                href="https://app.bandit.show/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.visitSiteButton[language]}
              </StyledSiteButton>
            </LeftContent>
            <RightContent>
              <img src={banditApp} alt="Bandit App Screenshot" />
            </RightContent>
          </BannerContent>
        </BanditBanner>

        <Summary $themeMode={themeMode}>
          <DescriptionBox $isDark={isDark}>
            <SectionTitleInsideBox $isDark={isDark}>
              {translations.roleSummaryTitle[language]}
            </SectionTitleInsideBox>
            <DividerLine $isDark={isDark} />
            <SummaryText $isDark={isDark}>{translations.summary[language]}</SummaryText>
          </DescriptionBox>
        </Summary>

        <ExperienceContainer>
          <UXUIDesignExperience
            title={
              <StandardSectionTitle>{translations.designTitle[language]}</StandardSectionTitle>
            }
            experiences={uxUIExperiences[language]}
            language={language}
            isDark={isDark}
          />
        </ExperienceContainer>

        <MasonryWrapper $isDark={isDark}>
          <StandardSectionTitle style={{ textAlign: 'left' }}>
            {translations.projectsTitle[language]}
          </StandardSectionTitle>
          <DividerLine $isDark={isDark} />
          <Masonry 
            data={masonryData} 
            themeMode={themeMode} 
            initialSelectedProject={initialProject}
            onModalStateChange={(isOpen, projectId) => {
              if (isOpen && projectId) {
                setSearchParams({ project: projectId });
              } else {
                setSearchParams({});
              }
            }}
          />
        </MasonryWrapper>
      </PageContainer>
    </PageTransition>
  );
};

export default BanditPage;