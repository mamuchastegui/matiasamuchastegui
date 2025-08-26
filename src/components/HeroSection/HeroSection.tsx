import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0; // antes: 0 ${({ theme }) => theme.space.xl}
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.isDark ? 'transparent' : theme.colors.background};
  
  @media (max-width: 768px) {
    padding: 4rem 0 0; // Added padding-top
    flex-direction: column;
    gap: 0; // antes: 1rem
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  gap: 2rem; // restaurar separación entre columnas
  width: 100%;
  max-width: 1400px;
  height: 80vh;
  margin: 0 auto; // restaurar margen horizontal

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem; // separación en mobile
    max-width: 100%;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  background: rgba(0, 0, 0, 0);
`;

const LeftContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem; // antes: 3rem 2rem
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(600px 300px at 50% 0%, rgba(56, 189, 248, 0.1), transparent);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem; // antes: 2rem 1.5rem
    height: auto;
    min-height: 300px;
  }
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 2;
  overflow: hidden;
  .line { display: block; overflow: hidden; }
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 1rem;
    text-align: left;
  }
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(29, 31, 35, 0.8)'};
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 2;
  overflow: hidden;
  .line { display: block; overflow: hidden; }
  .line-inner { display: inline-block; }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(29, 31, 35, 0.9)'};
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  letter-spacing: 0.2px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  .line { display: block; overflow: hidden; }
  .line-inner { display: inline-block; }

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const RightContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 0; // antes: 2rem
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(800px 400px at 80% 10%, rgba(168, 85, 247, 0.1), transparent);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 0; // antes: 1.5rem
    height: 300px;
  }
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 100%;
  display: block; // evita espacio por inline-video
  object-fit: cover;
  border-radius: 0; // se recorta por el border-radius del contenedor
  position: relative;
  z-index: 2;
  will-change: transform;
  
  @media (max-width: 768px) {
    object-fit: cover;
  }
`;

// no overlay in two-column layout

interface HeroSectionProps {
  onAnimationComplete?: () => void;
  fontsLoaded?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Efecto de entrada del video: zoom-out + parallax vertical sutil para dar profundidad
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 640) return;
    if (!heroVideoRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroVideoRef.current!,
        { scale: 1.1, y: 24 },
        {
          scale: 1.0,
          y: 0,
          ease: 'power3.out',
          duration: 1.6,
        }
      );
    }, heroVideoRef);
    return () => ctx.revert();
  }, []);

  // Parallax suave del video al scrollear (similar /newlook)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroVideoRef.current || !rightRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 640px)": function () {
          gsap.fromTo(
            heroVideoRef.current!,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: rightRef.current!,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.3,
              },
            }
          );
        },
      });
    }, rightRef);
    return () => ctx.revert();
  }, []);

  // Desvanecer progresivamente el contenido al scrollear (sin overlay de color)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroSectionRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 640px)": function () {
          gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current!,
              start: 'bottom bottom',
              end: 'bottom top-=50%',
              scrub: 0.5,
              anticipatePin: 1,
            }
          })
          .to(contentRef.current!, { opacity: 0, y: '10vh' }, 0);
        },
      });
    }, heroSectionRef);
    return () => ctx.revert();
  }, [themeMode]);

  // Replicate NewLook line-reveal effect on left text rows at init
  useLayoutEffect(() => {
    if (!leftRef.current) return;
    const ctx = gsap.context(() => {
      // Name via SplitType per line (subtitle usa words con layout para reflow suave)
      if (nameRef.current) {
        const splitName = new SplitType(nameRef.current, { types: 'lines' });
        gsap.from(splitName.lines, {
          y: '100%',
          ease: 'power3.out',
          duration: 0.9,
          stagger: 0.06,
          delay: 0.45,
        });
      }

      // Description: manual lines with .line-inner (mask like /newlook)
      if (descriptionRef.current) {
        const lineInners = descriptionRef.current.querySelectorAll('.line-inner');
        gsap.from(lineInners, {
          y: '100%',
          ease: 'power3.out',
          duration: 1.0,
          stagger: 0.08,
          delay: 0.65,
        });
      }

      // Subtitle: two rows with mask — animate each row
      if (subtitleRef.current) {
        const subLines = subtitleRef.current.querySelectorAll('.line-inner');
        gsap.from(subLines, {
          y: '100%',
          ease: 'power3.out',
          duration: 0.9,
          stagger: 0.06,
          delay: 0.55,
        });
      }
    }, leftRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroContainer ref={heroSectionRef}>
      <ContentWrapper ref={contentRef}>
        <LeftContainer
          ref={leftRef}
          style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}>
          <Name ref={nameRef}>Alexis Vedia</Name>
          <Subtitle ref={subtitleRef}>
            <span className="line"><span className="line-inner">{t('heroSubtitle1')}</span></span>
            <span className="line"><span className="line-inner">{t('heroSubtitle2')}</span></span>
          </Subtitle>
          <Description ref={descriptionRef}>
            <span className="line"><span className="line-inner">{t('heroDescription1')}</span></span>
            <span className="line"><span className="line-inner">{t('heroDescription2')}</span></span>
            <span className="line"><span className="line-inner">{t('heroDescription3')}</span></span>
            <span className="line"><span className="line-inner">{t('heroDescription4')}</span></span>
            <span className="line"><span className="line-inner">{t('heroDescription5')}</span></span>
          </Description>
        </LeftContainer>
        
        <RightContainer ref={rightRef} style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}>
          <HeroVideo 
            ref={heroVideoRef}
            src="/assets/newAssets/Alexis4.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </RightContainer>
      </ContentWrapper>
      <HeroOverlay ref={overlayRef} />
    </HeroContainer>
  );
};

export default HeroSection;
