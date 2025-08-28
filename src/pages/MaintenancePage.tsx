import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';
import { useTheme } from '../context/ThemeContext';
import maintenanceImage from '@/assets/images/matenimiento.png';
import { FaGithub } from 'react-icons/fa';

const MaintenanceContainer = styled.div< { $isDark: boolean } >`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  text-align: center;
  /* Fondo transparente para integrarse con el background global */
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledImage = styled.img< { $isDark?: boolean } >`
  width: 150px;
  height: auto;
  margin-bottom: 2rem;
  ${({ $isDark }) => !$isDark && `filter: invert(1);`}
`;

const Title = styled.h1< { $isDark: boolean } >`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ $isDark }) => $isDark ? '#FFFFFF' : '#1D1F23'};
`;

const Message = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  
`;

const GithubButton = styled.a<{ $isDark: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 1.25rem;
  padding: 12px 20px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  color: ${({ $isDark }) => ($isDark ? '#000000' : '#ffffff')};
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, ${({ $isDark }) => ($isDark ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)')});
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }
  &:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    background: ${({ $isDark }) => ($isDark ? '#f8f8f8' : '#333')};
    text-decoration: none;
  }
  &:hover::before { left: 100%; }
  &:hover::after { width: 280px; height: 280px; }
  &:focus-visible {
    outline: 2px solid ${({ $isDark }) => ($isDark ? '#000' : '#fff')};
    outline-offset: 2px;
    text-decoration: none;
  }
  &:active { text-decoration: none; }
  &:visited { text-decoration: none; }
`;

const MaintenancePage: React.FC = () => {
  const { i18n } = useTranslation();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const translations = {
    title: {
      es: 'Página en Construcción',
      en: 'Page Under Construction',
    },
    message: {
      es: 'Actualmente estoy trabajando para mejorar esta sección. Por favor, vuelve más tarde.',
      en: 'I am currently working on improving this section. Please check back later.',
    },
  };

  const currentLanguage = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <PageTransition>
      <MaintenanceContainer $isDark={isDark}>
        <StyledImage src={maintenanceImage} alt="En mantenimiento" $isDark={isDark} />
        <Title $isDark={isDark}>{translations.title[currentLanguage]}</Title>
        <Message>{translations.message[currentLanguage]}</Message>
        <GithubButton
          $isDark={isDark}
          href="https://github.com/AlexisVedia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={currentLanguage === 'es' ? 'Visitar GitHub de Alexis' : 'Visit Alexis’s GitHub'}
        >
          <FaGithub />
          {currentLanguage === 'es' ? 'Visitar GitHub' : 'Visit GitHub'}
        </GithubButton>
      </MaintenanceContainer>
    </PageTransition>
  );
};

export default MaintenancePage;
