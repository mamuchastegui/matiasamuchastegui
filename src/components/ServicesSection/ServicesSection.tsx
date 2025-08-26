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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.333 16.2c-.23.32-.59.54-.94.62-.3.07-.6.09-.9.09-.46 0-.9-.1-1.3-.3l-1.43-1.4-2.1-4.2-.6 1.8c.2.1.3.2.5.4.4.2.8.5 1.1.8.2.2.4.5.4.8 0 .3-.1.6-.4.8-.3.2-.6.3-.9.3-.4 0-.8-.1-1.1-.3-.3-.2-.5-.5-.5-.8 0-.3.1-.6.4-.8.2-.2.5-.4.9-.6l3.9-3.9c.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.3.3.4.7.4 1.1 0 .4-.1.8-.4 1.1l-2.2 2.2.9 2.8c.2-.1.3-.2.5-.3.4-.2.8-.5 1.1-.8.2-.2.4-.5.4-.8 0-.3-.1-.6-.4-.8-.3-.2-.6-.3-.9-.3-.4 0-.8-.1-1.1-.3-.3-.2-.5-.5-.5-.8 0-.3.1-.6.4-.8.2-.2.5-.4.9-.6l3.9-3.9c.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.3.3.4.7.4 1.1 0 .4-.1.8-.4 1.1l-2.2 2.2.9 2.8c.1.4.2.8.2 1.2 0 .3 0 .7-.1 1zm-8.43-3.3c-.2.1-.5.2-.8.2-.3 0-.6-.1-.8-.2-.2-.1-.4-.3-.5-.5-.1-.2-.2-.5-.2-.7 0-.3.1-.5.2-.7.1-.2.3-.4.5-.5.2-.1.5-.2.8-.2.3 0 .6.1.8.2.2.1.4.3.5.5.1.2.2.5.2.7 0-.1 0-.3-.2-.4z"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118 2.25 2.25 0 01-2.47-2.118c0-.62.26-1.22.7-1.684l5.78-5.78a3 3 0 00-1.128-5.78 2.25 2.25 0 01-2.118-2.47 2.25 2.25 0 012.118-2.47c.62 0 1.22.26 1.684.7l5.78 5.78a3 3 0 005.78-1.128 2.25 2.25 0 012.47-2.118 2.25 2.25 0 012.47 2.118c0 .62-.26 1.22-.7 1.684l-5.78 5.78a3 3 0 001.128 5.78 2.25 2.25 0 012.118 2.47 2.25 2.25 0 01-2.118 2.47c-.62 0-1.22-.26-1.684-.7l-5.78-5.78z" />
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.894.15c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.384-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.447.27.96-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0 .55.398 1.02.94-1.11l.894-.149c.424-.07.764-.384.93-.78.164-.398.142-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.806.272 1.204.108.397-.165.71-.505.78-.93l.15-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a2.25 2.25 0 01-1.423-1.423L12 18.75l1.938-.648a2.25 2.25 0 011.423-1.423L17.75 15l.648 1.938a2.25 2.25 0 011.423 1.423L21.75 19.5l-1.938.648a2.25 2.25 0 01-1.423 1.423z" />
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