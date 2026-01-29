import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import mercadolibreLogo from '@/assets/images/companies/mercadolibre_logo.jpeg';
import pomeloLogo from '@/assets/images/companies/pomelo_logo.jpeg';
import fusionLogo from '@/assets/images/companies/fusion_logo.jpeg';

const Section = styled.section`
  margin: 2.5rem auto 1.5rem;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.p<{ $isDark: boolean }>`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.55)')};
  margin: 0;
`;

const LogosRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const LogoCard = styled.a<{ $isDark: boolean }>`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $isDark }) =>
      $isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)'};
    border-color: ${({ $isDark }) =>
      $isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.16)'};
  }
`;

const LogoImage = styled.img`
  height: 28px;
  width: auto;
  max-width: 140px;
  object-fit: contain;
  filter: grayscale(0.05);

  @media (max-width: 768px) {
    height: 24px;
  }
`;

const TrustedBySection: React.FC = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <Section aria-label={t('trustedBy')}>
      <Label $isDark={isDark}>{t('trustedBy')}</Label>
      <LogosRow>
        <LogoCard $isDark={isDark} href="/mercadolibre" aria-label="MercadoLibre experience">
          <LogoImage src={mercadolibreLogo} alt="MercadoLibre" />
        </LogoCard>
        <LogoCard $isDark={isDark} href="/pomelo" aria-label="Pomelo experience">
          <LogoImage src={pomeloLogo} alt="Pomelo" />
        </LogoCard>
        <LogoCard $isDark={isDark} href="/fusionads" aria-label="FusionAds experience">
          <LogoImage src={fusionLogo} alt="FusionAds" />
        </LogoCard>
      </LogosRow>
    </Section>
  );
};

export default TrustedBySection;
