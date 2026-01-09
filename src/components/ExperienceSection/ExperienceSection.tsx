import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { experiences, Experience } from './experienceData';
import TechIconCloud from './TechIconCloud';

const Section = styled.section`
  padding: 6rem 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TimelineContainer = styled.div`
  position: relative;
`;

const TimelineLine = styled.div<{ $isDark: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const TimelineItem = styled(motion.div)<{ $isEven: boolean }>`
  display: flex;
  flex-direction: ${({ $isEven }) => ($isEven ? 'row-reverse' : 'row')};
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TimelineDot = styled.div<{ $isDark: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 1.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4FD1C5;
  border: 4px solid ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#fafafa')};
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardContainer = styled.div<{ $isEven: boolean }>`
  flex: 1;
  padding-left: ${({ $isEven }) => ($isEven ? '2rem' : '0')};
  padding-right: ${({ $isEven }) => ($isEven ? '0' : '2rem')};

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const glassEffect = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const ExperienceCard = styled.article<{ $isDark: boolean; $highlight?: boolean; $hasLink: boolean }>`
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ $isDark, $highlight }) =>
    $highlight
      ? 'rgba(79, 209, 197, 0.3)'
      : $isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
  ${glassEffect}
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: ${({ $hasLink }) => ($hasLink ? 'pointer' : 'default')};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ $isDark }) =>
      $isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
    border-color: ${({ $hasLink }) => ($hasLink ? 'rgba(79, 209, 197, 0.5)' : 'inherit')};
  }
`;

const CardHeader = styled.div<{ $isEven: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  @media (min-width: 769px) {
    flex-direction: ${({ $isEven }) => ($isEven ? 'row-reverse' : 'row')};
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const CompanyLogo = styled.div<{ $isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ $isDark }) => ($isDark ? '#1a1a1a' : '#ffffff')};
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CompanyDetails = styled.div``;

const CompanyName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4FD1C5;
  margin: 0;
`;

const Role = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin: 0;
`;

const MetaInfo = styled.div<{ $isEven: boolean; $isDark: boolean }>`
  text-align: left;
  font-size: 0.875rem;
  color: ${({ $isDark }) => ($isDark ? '#888888' : '#666666')};

  @media (min-width: 769px) {
    text-align: ${({ $isEven }) => ($isEven ? 'left' : 'right')};
  }
`;

const Period = styled.p`
  font-family: 'JetBrains Mono', monospace;
  margin: 0;
`;

const Location = styled.p`
  margin: 0;
`;

const Description = styled.p<{ $isDark: boolean; $isEven: boolean }>`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#555555')};
  margin-bottom: 1rem;

  @media (min-width: 769px) {
    text-align: ${({ $isEven }) => ($isEven ? 'right' : 'left')};
  }
`;

const ProjectsRow = styled.div<{ $isEven: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 769px) {
    justify-content: ${({ $isEven }) => ($isEven ? 'flex-end' : 'flex-start')};
  }
`;

const ProjectsLabel = styled.span<{ $isDark: boolean }>`
  font-size: 0.875rem;
  color: ${({ $isDark }) => ($isDark ? '#888888' : '#666666')};
`;

const ProjectLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4FD1C5;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ProjectSeparator = styled.span<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? '#888888' : '#666666')};
`;

const TechStack = styled.div<{ $isEven: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 769px) {
    justify-content: ${({ $isEven }) => ($isEven ? 'flex-end' : 'flex-start')};
  }
`;

const TechBadge = styled.span<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#666666')};
`;

const TechIconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ExperienceSection: React.FC = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDark = themeMode === 'dark';

  const handleCardClick = (exp: Experience) => {
    if (exp.link) {
      navigate(exp.link);
    }
  };

  return (
    <Section id="experience">
      <SectionHeader>
        <SectionTitle $isDark={isDark}>{t('experience.title')}</SectionTitle>
        <SectionSubtitle $isDark={isDark}>{t('experience.subtitle')}</SectionSubtitle>
      </SectionHeader>

      <TimelineContainer>
        <TimelineLine $isDark={isDark} />
        <TimelineItems>
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem
                key={exp.id}
                $isEven={isEven}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TimelineDot $isDark={isDark} />
                <CardContainer $isEven={isEven}>
                  <ExperienceCard
                    $isDark={isDark}
                    $highlight={exp.highlight}
                    $hasLink={!!exp.link}
                    onClick={() => handleCardClick(exp)}
                  >
                    <CardHeader $isEven={isEven}>
                      <CompanyInfo>
                        <CompanyLogo $isDark={isDark}>
                          <img src={exp.logo} alt={`${t(exp.companyKey)} logo`} />
                        </CompanyLogo>
                        <CompanyDetails>
                          <CompanyName>{t(exp.companyKey)}</CompanyName>
                          <Role $isDark={isDark}>{t(exp.roleKey)}</Role>
                        </CompanyDetails>
                      </CompanyInfo>
                      <MetaInfo $isEven={isEven} $isDark={isDark}>
                        <Period>{t(exp.periodKey)}</Period>
                        <Location>{t(exp.locationKey)}</Location>
                      </MetaInfo>
                    </CardHeader>

                    <Description $isDark={isDark} $isEven={isEven}>
                      {t(exp.descriptionKey)}
                    </Description>

                    {exp.projects && (
                      <ProjectsRow $isEven={isEven}>
                        <ProjectsLabel $isDark={isDark}>{t('experience.projects')}</ProjectsLabel>
                        {exp.projects.map((project, i) => (
                          <React.Fragment key={project.name}>
                            <ProjectLink
                              href={project.href}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.name}
                            </ProjectLink>
                            {i < exp.projects!.length - 1 && (
                              <ProjectSeparator $isDark={isDark}>·</ProjectSeparator>
                            )}
                          </React.Fragment>
                        ))}
                      </ProjectsRow>
                    )}

                    <TechStack $isEven={isEven}>
                      {exp.tech.map((tech) => (
                        <TechBadge key={tech} $isDark={isDark}>
                          {tech}
                        </TechBadge>
                      ))}
                    </TechStack>
                  </ExperienceCard>
                </CardContainer>
                <TechIconContainer>
                  <TechIconCloud
                    technologies={exp.tech}
                    side={isEven ? 'left' : 'right'}
                  />
                </TechIconContainer>
              </TimelineItem>
            );
          })}
        </TimelineItems>
      </TimelineContainer>
    </Section>
  );
};

export default ExperienceSection;
