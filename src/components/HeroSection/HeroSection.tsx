import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 ${({ theme }) => theme.space.xl};
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  height: 80vh;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
    max-width: 100%;
  }
`;

const LeftContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
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
    padding: 2rem 1.5rem;
    height: auto;
    min-height: 300px;
  }
`;

const RightContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
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
    padding: 1.5rem;
    height: 300px;
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
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    object-fit: contain;
  }
`;

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
          <Description>
            Impulso a emprendedores, agencias y startups ideando soluciones innovadoras 
            y llevándolas a la realidad con diseño UX/UI 
            de alto nivel, desarrollo en código y 
            herramientas de IA que optimizan procesos 
            y maximizan resultados
          </Description>
        </LeftContainer>
        
        <RightContainer style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s'
        }}>
          <HeroImage 
            src="/assets/newAssets/hero-alexis.webp" 
            alt="Alexis Vedia"
          />
        </RightContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;