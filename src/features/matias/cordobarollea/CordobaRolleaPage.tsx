import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';
import { useTheme } from '@/context/ThemeContext';

import coverImage from '@/assets/images/projects-matias/cordobarollea/cordobarollea.png';
import logoImage from '@/assets/images/projects-matias/cordobarollea/cordobarollea_logo.png';
import adminImage from '@/assets/images/projects-matias/cordobarollea/admin.png';
import detalleSalida1Image from '@/assets/images/projects-matias/cordobarollea/detalle_salida_1.png';
import detalleSalida2Image from '@/assets/images/projects-matias/cordobarollea/detalle_salida_2.png';
import donacionesImage from '@/assets/images/projects-matias/cordobarollea/donaciones.png';
import guiasImage from '@/assets/images/projects-matias/cordobarollea/guias.png';
import nivelesImage from '@/assets/images/projects-matias/cordobarollea/niveles.png';
import recorridosImage from '@/assets/images/projects-matias/cordobarollea/recorridos.png';
import salidasImage from '@/assets/images/projects-matias/cordobarollea/salidas.png';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderContent = styled.div`
  grid-column: span 6;

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

const Title = styled.h1<{ $isDark: boolean }>`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 1rem;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const LogoImage = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 12px;
`;

const Subtitle = styled.p<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ $isDark }) => ($isDark ? '#C8C8C8' : '#4A4A4A')};
  margin-bottom: 1.5rem;
`;

const Intro = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ $isDark }) => ($isDark ? '#B8B8B8' : '#5A5A5A')};
  margin-bottom: 2rem;
`;

const HeaderImage = styled.div<{ $image: string }>`
  grid-column: span 6;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.2);

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

const Section = styled.section`
  margin-bottom: 3.5rem;
`;

const SectionTitle = styled.h2<{ $isDark: boolean }>`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
`;

const HighlightsGrid = styled.ul<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${({ $isDark }) => ($isDark ? '#C8C8C8' : '#4A4A4A')};
`;

const HighlightItem = styled.li<{ $isDark: boolean }>`
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(255, 255, 255, 0.85)'};
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TechTag = styled.span<{ $isDark: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#DADADA' : '#404040')};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(79, 209, 197, 0.18)' : 'rgba(79, 209, 197, 0.15)'};
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(79, 209, 197, 0.35)' : 'rgba(79, 209, 197, 0.3)'};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const GalleryCard = styled.figure<{ $isDark: boolean }>`
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(35, 35, 40, 0.75)' : 'rgba(255, 255, 255, 0.9)'};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.16);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 220px;
  display: block;
  object-fit: cover;
`;

const GalleryCaption = styled.figcaption<{ $isDark: boolean }>`
  padding: 0.9rem 1rem 1.1rem;
  font-size: 0.9rem;
  color: ${({ $isDark }) => ($isDark ? '#C8C8C8' : '#5A5A5A')};
`;

const CaptionTitle = styled.div<{ $isDark: boolean }>`
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 0.25rem;
`;

const CaptionDescription = styled.div`
  line-height: 1.5;
`;

const LightboxOverlay = styled.div<{ $isDark: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(12, 12, 14, 0.85)' : 'rgba(8, 8, 8, 0.75)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const LightboxImage = styled.img`
  max-width: min(1200px, 90vw);
  max-height: 80vh;
  border-radius: 18px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
`;

const LightboxCaption = styled.div<{ $isDark: boolean }>`
  margin-top: 1rem;
  text-align: center;
  color: ${({ $isDark }) => ($isDark ? '#E0E0E0' : '#F4F4F4')};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ExternalLink = styled.a<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ $isDark }) => ($isDark ? '#4FD1C5' : '#0F766E')};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.85;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LinksRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CordobaRolleaPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const isDark = themeMode === 'dark';

  const highlights = t('cordobarolleaPage.highlights', { returnObjects: true }) as string[];
  const galleryText = t('cordobarolleaPage.gallery', {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  const galleryItems = useMemo(
    () => [
      { id: 'salidas', image: salidasImage },
      { id: 'detalleSalida1', image: detalleSalida1Image },
      { id: 'detalleSalida2', image: detalleSalida2Image },
      { id: 'recorridos', image: recorridosImage },
      { id: 'niveles', image: nivelesImage },
      { id: 'guias', image: guiasImage },
      { id: 'donaciones', image: donacionesImage },
      { id: 'admin', image: adminImage },
    ],
    []
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const techStack = [
    'Astro',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Content Collections',
    'Vercel Postgres',
  ];

  return (
    <PageTransition>
      <PageContainer>
        <Header>
          <HeaderContent>
            <LogoRow>
              <LogoImage src={logoImage} alt={t('cordobarolleaPage.logoAlt')} />
            </LogoRow>
            <Title $isDark={isDark}>{t('cordobarolleaPage.title')}</Title>
            <Subtitle $isDark={isDark}>{t('cordobarolleaPage.subtitle')}</Subtitle>
            <Intro $isDark={isDark}>{t('cordobarolleaPage.intro')}</Intro>
            <LinksRow>
              <ExternalLink
                $isDark={isDark}
                href="https://cordobarollea.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('cordobarolleaPage.ctaAria')}
              >
                {t('cordobarolleaPage.cta')}
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </ExternalLink>
              <ExternalLink
                $isDark={isDark}
                href="https://www.instagram.com/cordoba_rollea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('cordobarolleaPage.igCtaAria')}
              >
                {t('cordobarolleaPage.igCta')}
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </ExternalLink>
            </LinksRow>
          </HeaderContent>
          <HeaderImage $image={coverImage} />
        </Header>

        <Section>
          <SectionTitle $isDark={isDark}>{t('cordobarolleaPage.highlightsTitle')}</SectionTitle>
          <HighlightsGrid $isDark={isDark}>
            {highlights.map((item) => (
              <HighlightItem key={item} $isDark={isDark}>
                {item}
              </HighlightItem>
            ))}
          </HighlightsGrid>
        </Section>

        <Section>
          <SectionTitle $isDark={isDark}>{t('cordobarolleaPage.stackTitle')}</SectionTitle>
          <TechStack>
            {techStack.map((tech) => (
              <TechTag key={tech} $isDark={isDark}>
                {tech}
              </TechTag>
            ))}
          </TechStack>
        </Section>

        <Section>
          <SectionTitle $isDark={isDark}>{t('cordobarolleaPage.galleryTitle')}</SectionTitle>
          <GalleryGrid>
            {galleryItems.map((item, index) => {
              const copy = galleryText[item.id];
              return (
                <GalleryCard
                  key={item.id}
                  $isDark={isDark}
                  onClick={() => setLightboxIndex(index)}
                >
                  <GalleryImage src={item.image} alt={copy?.title ?? 'Screenshot'} />
                  <GalleryCaption $isDark={isDark}>
                    <CaptionTitle $isDark={isDark}>{copy?.title}</CaptionTitle>
                    <CaptionDescription>{copy?.description}</CaptionDescription>
                  </GalleryCaption>
                </GalleryCard>
              );
            })}
          </GalleryGrid>
        </Section>
      </PageContainer>
      {lightboxIndex !== null && (
        <LightboxOverlay $isDark={isDark} onClick={() => setLightboxIndex(null)}>
          <div onClick={(event) => event.stopPropagation()}>
            <LightboxImage src={galleryItems[lightboxIndex].image} alt="Screenshot" />
            <LightboxCaption $isDark={isDark}>
              <strong>{galleryText[galleryItems[lightboxIndex].id]?.title}</strong>
              <div>{galleryText[galleryItems[lightboxIndex].id]?.description}</div>
            </LightboxCaption>
          </div>
        </LightboxOverlay>
      )}
    </PageTransition>
  );
};

export default CordobaRolleaPage;
