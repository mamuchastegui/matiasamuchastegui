import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PageTransition from '@components/PageTransition/PageTransition';
import HeroSection from '@components/HeroSection/HeroSection';
import TrustedBySection from '@components/TrustedBySection';
import BioSection from '@components/BioSection';
import ExperienceSection from '@components/ExperienceSection';
import ServicesSection from '@components/ServicesSection';
import FeaturedProjectsSection from '@components/FeaturedProjectsSection';
import BeyondCodeSection from '@components/BeyondCodeSection';
import ContactSection from '@components/ContactSection/ContactSection';
import SEOContent from '@components/SEOContent';

const HomeContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

interface HomeProps {
  onAnimationComplete?: () => void;
  fontsLoaded: boolean;
  onContactSectionViewChange: (isInView: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onAnimationComplete, fontsLoaded, onContactSectionViewChange }) => {
  const contactSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onContactSectionViewChange(entry.isIntersecting);
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    const currentRef = contactSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onContactSectionViewChange]);

  return (
    <PageTransition>
      <HomeContainer id="home">
        <SEOContent />
        {/* Removed abstract 3D background experiment */}
        <ContentWrapper>
          <HeroSection onAnimationComplete={onAnimationComplete} fontsLoaded={fontsLoaded} />
          <TrustedBySection />
          <BioSection />
        </ContentWrapper>
        <ContentWrapper id="experience">
          <ExperienceSection />
        </ContentWrapper>
        <ContentWrapper id="services">
          <ServicesSection />
        </ContentWrapper>
        <ContentWrapper id="projects">
          <FeaturedProjectsSection />
        </ContentWrapper>
        <ContentWrapper>
          <BeyondCodeSection />
        </ContentWrapper>
        <ContentWrapper>
          <ContactSection ref={contactSectionRef} id="contact" />
        </ContentWrapper>
      </HomeContainer>
    </PageTransition>
  );
};

export default Home;
