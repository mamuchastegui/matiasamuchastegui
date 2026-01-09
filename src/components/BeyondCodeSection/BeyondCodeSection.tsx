import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Section = styled.section<{ $isDark: boolean }>`
  padding: 6rem 0;
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(30, 30, 35, 0.5)' : 'rgba(250, 250, 250, 0.5)'};
  border-radius: 24px;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    border-radius: 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p<{ $isDark: boolean }>`
  font-size: 1.1rem;
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#666666')};
  line-height: 1.6;
`;

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const glassEffect = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const HobbyCard = styled(motion.div)<{ $isDark: boolean }>`
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
  ${glassEffect}
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ $isDark }) =>
      $isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
    border-color: rgba(79, 209, 197, 0.3);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconBox = styled.div`
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(79, 209, 197, 0.1);
  color: #4FD1C5;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const HobbyTitle = styled.h3<{ $isDark: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 0.5rem;
`;

const HobbyDescription = styled.p<{ $isDark: boolean }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#555555')};
  margin-bottom: 1rem;
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HobbyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4FD1C5;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BeyondCodeSection: React.FC = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const isDark = themeMode === 'dark';

  return (
    <Section $isDark={isDark}>
      <Container>
        <SectionHeader>
          <SectionTitle $isDark={isDark}>{t('beyondCode.title')}</SectionTitle>
          <SectionSubtitle $isDark={isDark}>{t('beyondCode.subtitle')}</SectionSubtitle>
        </SectionHeader>

        <HobbiesGrid>
          {/* Freeskate */}
          <HobbyCard
            $isDark={isDark}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <IconBox>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </IconBox>
              <TextContent>
                <HobbyTitle $isDark={isDark}>{t('beyondCode.skating')}</HobbyTitle>
                <HobbyDescription $isDark={isDark}>
                  {t('beyondCode.skating.description')}
                </HobbyDescription>
                <LinksRow>
                  <HobbyLink
                    href="https://instagram.com/mati.amuchastegui_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </HobbyLink>
                  <HobbyLink
                    href="https://cordobarollea.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Córdoba Rollea
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </HobbyLink>
                </LinksRow>
              </TextContent>
            </CardContent>
          </HobbyCard>

          {/* Electronic Music */}
          <HobbyCard
            $isDark={isDark}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <IconBox>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </IconBox>
              <TextContent>
                <HobbyTitle $isDark={isDark}>{t('beyondCode.music')}</HobbyTitle>
                <HobbyDescription $isDark={isDark}>
                  {t('beyondCode.music.description')}
                </HobbyDescription>
                <HobbyLink
                  href="https://soundcloud.com/matias-amuchastegui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SoundCloud
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </HobbyLink>
              </TextContent>
            </CardContent>
          </HobbyCard>
        </HobbiesGrid>
      </Container>
    </Section>
  );
};

export default BeyondCodeSection;
