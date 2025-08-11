import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  skills: string[];
  gradient: string;
}

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      id: 'frontend-development',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleKey: 'services.frontend.title',
      descriptionKey: 'services.frontend.description',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'wordpress-development',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 17.87c-.53-.12-1.04-.3-1.51-.54l1.56-4.54 1.47 4.02c-.49.36-1.01.67-1.52.93v.13zm-2.19-1.18C7.47 17.77 6.44 16.13 6.44 14.25c0-1.06.19-2.07.54-3.01L9.77 18.69zm2.19-8.69c.6-.03 1.14-.09 1.14-.09.54-.06.48-.85-.06-.82 0 0-1.61.13-2.65.13-.98 0-2.59-.13-2.59-.13-.54-.03-.6.82-.06.82 0 0 .51.06 1.05.09l1.56 4.28-2.19 6.57-3.64-10.85c.6-.03 1.14-.09 1.14-.09.54-.06.48-.85-.06-.82 0 0-1.61.13-2.65.13-.19 0-.42-.01-.66-.01C4.9 5.57 8.18 3.5 12 3.5c2.85 0 5.44 1.12 7.36 2.95-.05 0-.09-.01-.14-.01-.98 0-1.67.85-1.67 1.76 0 .82.47 1.51.98 2.33.38.66.82 1.51.82 2.74 0 .85-.33 1.84-.76 3.21l-.99 3.31-3.59-10.69z" fill="currentColor"/>
        </svg>
      ),
      titleKey: 'services.wordpress.title',
      descriptionKey: 'services.wordpress.description',
      skills: ['WordPress', 'PHP', 'Custom Themes', 'WooCommerce'],
      gradient: 'linear-gradient(135deg, #21759b 0%, #0073aa 100%)'
    },
    {
      id: 'ux-ui-design',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description',
      skills: ['Figma', 'Adobe Suite', 'Prototyping', 'User Research'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'automation',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleKey: 'services.automation.title',
      descriptionKey: 'services.automation.description',
      skills: ['n8n', 'Airtable', 'API Integration', 'Web Scraping'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'ai-integration',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 22L8.5 20.5L10 20L8.5 19.5L8 18L7.5 19.5L6 20L7.5 20.5L8 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 6L18.5 4.5L20 4L18.5 3.5L18 2L17.5 3.5L16 4L17.5 4.5L18 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleKey: 'services.ai.title',
      descriptionKey: 'services.ai.description',
      skills: ['LLMs', 'Prompt Engineering', 'LangChain', 'AI Workflows'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {t('services.title')}
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {t('services.subtitle')}
      </SectionSubtitle>
      
      <ServicesGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            variants={itemVariants}
            whileHover={{ 
              y: -12,
              scale: 1.02,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            gradient={service.gradient}
          >
            <ServiceIconContainer>
              <ServiceIcon>{service.icon}</ServiceIcon>
            </ServiceIconContainer>
            <ServiceContent>
              <ServiceTitle>{t(service.titleKey)}</ServiceTitle>
              <ServiceDescription>{t(service.descriptionKey)}</ServiceDescription>
              <SkillsList>
                {service.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </SkillsList>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  padding: 8rem 0;
  background: transparent;
  position: relative;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const ServiceCard = styled(motion.div)<{ gradient: string }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ gradient }) => gradient};
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  &:hover::before {
    opacity: 0.1;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

const ServiceIconContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border-radius: 24px 24px 0 0;
  padding: 3rem 2rem 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 1.5rem;
    border-radius: 20px 20px 0 0;
  }
`;

const ServiceIcon = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  svg {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const ServiceContent = styled.div`
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.75;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: auto;
`;

const SkillTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

export default ServicesSection;