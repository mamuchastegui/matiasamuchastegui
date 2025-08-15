import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  
  @media (max-width: 768px) {
    padding: 0; // antes: 0 1rem
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
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 1rem;
    text-align: center;
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
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
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

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroContainer>
      <ContentWrapper>
        <LeftContainer style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}>
          <Name>Alexis Vedia</Name>
          <Subtitle>UX/UI Developer & AI Integration Specialist</Subtitle>
          <Description>
            Acompaño a agencias, emprendedores y startups en el diseño de soluciones innovadoras,
            materializarlas en productos reales e impulsarlas con Inteligencia Artficial
          </Description>
        </LeftContainer>
        
        <RightContainer style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s'
        }}>
          <HeroVideo 
            src="/assets/newAssets/Alexis2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </RightContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
