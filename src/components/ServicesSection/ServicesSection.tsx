import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, FileCode2, PenTool, Workflow, Brain } from 'lucide-react';

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
            icon: <Code2 aria-hidden={true} />,      titleKey: 'services.frontend.title',
      descriptionKey: 'services.frontend.description',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'wordpress-development',
      icon: <FileCode2 aria-hidden={true} />,      titleKey: 'services.wordpress.title',
      descriptionKey: 'services.wordpress.description',
      skills: ['WordPress', 'PHP', 'Custom Themes', 'WooCommerce'],
      gradient: 'linear-gradient(135deg, #21759b 0%, #0073aa 100%)'
    },
    {
      id: 'ux-ui-design',
      icon: <PenTool aria-hidden={true} />,      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description',
      skills: ['Figma', 'Adobe Suite', 'Prototyping', 'User Research'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'automation',
      icon: <Workflow aria-hidden={true} />,      titleKey: 'services.automation.title',
      descriptionKey: 'services.automation.description',
      skills: ['n8n', 'Airtable', 'API Integration', 'Web Scraping'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'ai-integration',
      icon: <Brain aria-hidden={true} />,      titleKey: 'services.ai.title',
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
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 4rem;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
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
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  border-radius: 24px;
  padding: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
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
    border-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
                0 0 0 1px ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
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
