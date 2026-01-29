import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { projectsData } from '@/features/matias/otros/data/projectsData';

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
  margin-bottom: 3rem;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const glassEffect = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const ProjectCard = styled(motion.article)<{ $isDark: boolean }>`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
  ${glassEffect}
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ $isDark }) =>
      $isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
    border-color: rgba(79, 209, 197, 0.3);
  }
`;

const ProjectImage = styled.div<{ $image: string; $isDark: boolean }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  border-bottom: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const StatusBadge = styled.span<{ $status: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  ${({ $status }) => {
    switch ($status) {
      case 'active':
        return css`
          background: rgba(34, 197, 94, 0.9);
          color: white;
        `;
      case 'development':
        return css`
          background: rgba(234, 179, 8, 0.9);
          color: #1a1a1a;
        `;
      case 'archived':
        return css`
          background: rgba(107, 114, 128, 0.9);
          color: white;
        `;
      default:
        return css`
          background: rgba(107, 114, 128, 0.9);
          color: white;
        `;
    }
  }}
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectName = styled.h3<{ $isDark: boolean }>`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 0.75rem;
  transition: color 0.2s;

  ${ProjectCard}:hover & {
    color: #4FD1C5;
  }
`;

const ProjectDescription = styled.p<{ $isDark: boolean }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#555555')};
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span<{ $isDark: boolean }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${({ $isDark }) => ($isDark ? '#DDDDDD' : '#444444')};
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const LinksRow = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4FD1C5;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const statusLabels = {
  active: { es: 'Activo', en: 'Active' },
  development: { es: 'En desarrollo', en: 'In Development' },
  archived: { es: 'Archivado', en: 'Archived' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedProjectsSection: React.FC = () => {
  const { themeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isDark = themeMode === 'dark';
  const language = i18n.language.startsWith('en') ? 'en' : 'es';

  return (
    <Section id="projects">
      <SectionHeader>
        <SectionTitle $isDark={isDark}>{t('projects.title')}</SectionTitle>
        <SectionSubtitle $isDark={isDark}>{t('projects.subtitle')}</SectionSubtitle>
      </SectionHeader>

      <ProjectsGrid>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            $isDark={isDark}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectImage $image={project.image} $isDark={isDark}>
              {project.status !== 'active' && (
                <StatusBadge $status={project.status}>
                  {statusLabels[project.status][language]}
                </StatusBadge>
              )}
            </ProjectImage>
            <ProjectContent>
              <ProjectName $isDark={isDark}>{project.name}</ProjectName>
              <ProjectDescription $isDark={isDark}>
                {project.description[language]}
              </ProjectDescription>
              <TechStack>
                {project.technologies.map((tech) => (
                  <TechTag key={tech} $isDark={isDark}>
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              {project.url && (
                <LinksRow $isDark={isDark}>
                  <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                    {t('projects.view')}
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </ProjectLink>
                </LinksRow>
              )}
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </Section>
  );
};

export default FeaturedProjectsSection;
