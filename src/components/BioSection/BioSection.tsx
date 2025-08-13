import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@components/ScrollReveal';
import TechSlider from '@components/TechSlider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* Tailwind: px-6 pb-20 */
  padding: 0 1.5rem 5rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 5rem 0;
  
  @media (max-width: 768px) {
    /* Tailwind md<: px-4 approx, keep pb */
    padding: 0 1rem 5rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

// New outer glass container similar to example.html hero card
const GlassCard = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  /* Tailwind: p-8 md:p-16 lg:p-20 */
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    padding: 4rem;
  }
  @media (min-width: 1024px) {
    padding: 5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const TextContainer = styled.div`
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
    background: radial-gradient(800px 400px at 80% 10%, rgba(168, 85, 247, 0.1), transparent);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    height: auto;
    min-height: 300px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 6vw, 2rem);
    margin-bottom: 1rem;
    text-align: center;
  }
`;



const StyledScrollReveal = styled(ScrollReveal)`
  margin-bottom: 0;
  line-height: normal;
`;

const BioTextContainer = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;
  white-space: pre-line;
  position: relative;
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: rgba(255, 255, 255, 0.7);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TechSliderContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
`;

const BioSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const bioPart1 = t('about.bio.part1');
  const bioPart2 = t('about.bio.part2');
  
  useEffect(() => {
    const titleElement = titleRef.current;
    const sliderElement = sliderRef.current;
    
    if (!titleElement || !sectionRef.current || !sliderElement) return;

    gsap.set(titleElement, { 
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(10px)'
    });

    gsap.set(sliderElement, {
      opacity: 0,
      y: 20
    });

    gsap.to(titleElement, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: true,
      }
    });
    

    gsap.to(sliderElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sliderElement,
        start: 'top 80%',
        end: 'center 75%',
        scrub: true,
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <SectionContainer ref={sectionRef} id="about">
      <GlassCard>
        <ContentWrapper>
          <SectionTitle ref={titleRef}>{i18n.language === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}</SectionTitle>
          
          <TextContainer>
            <BioTextContainer>
              <StyledScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
                textClassName="bio-text"
              >
                {bioPart1}
              </StyledScrollReveal>
            </BioTextContainer>
            
            <BioTextContainer>
              <StyledScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={8}
                blurStrength={15}
                textClassName="bio-text"
              >
                {bioPart2}
              </StyledScrollReveal>
            </BioTextContainer>
          </TextContainer>
          
          <TechSliderContainer ref={sliderRef}>
            <TechSlider />
          </TechSliderContainer>
        </ContentWrapper>
      </GlassCard>
    </SectionContainer>
  );
};

export default BioSection;