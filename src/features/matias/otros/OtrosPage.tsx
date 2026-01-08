import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme, ThemeMode } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/PageTransition/PageTransition';

// Import projects data
import { projectsData, Project } from './data/projectsData';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const Header = styled.div<{ $isDark: boolean }>`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1<{ $isDark: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p<{ $isDark: boolean }>`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ $isDark }) => ($isDark ? '#BBBBBB' : '#555555')};
  max-width: 700px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const glassEffect = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  will-change: backdrop-filter;
`;

const ProjectCard = styled.div<{ $isDark: boolean }>`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
  background: ${({ $isDark }) => ($isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(255, 255, 255, 0.9)')};
  ${glassEffect}
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ $isDark }) => ($isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)')};
  }
`;

const ProjectImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const StatusBadge = styled.span<{ $status: string; $isDark: boolean }>`
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
`;

const TechTag = styled.span<{ $isDark: boolean }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')};
  color: ${({ $isDark }) => ($isDark ? '#DDDDDD' : '#444444')};
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')};
`;

const Summary = styled.div<{ $themeMode: ThemeMode }>`
  margin: 3rem auto 2rem;
  max-width: 100%;
`;

const glassEffectForDescriptionBox = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  will-change: backdrop-filter;
`;

const SectionTitleInsideBox = styled.h3<{ $isDark: boolean }>`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
`;

const DividerLine = styled.hr<{ $isDark?: boolean }>`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
`;

const DescriptionBox = styled.div<{ $isDark: boolean }>`
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 1rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  background: ${({ $isDark }) => ($isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(245, 245, 250, 0.75)')};
  ${glassEffectForDescriptionBox}

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`;

const SummaryText = styled.p<{ $isDark: boolean }>`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 0;
  color: ${({ $isDark }) => ($isDark ? '#DDDDDD' : '#444444')};
  white-space: pre-line;
`;

const statusLabels = {
  active: { es: 'Activo', en: 'Active' },
  development: { es: 'En desarrollo', en: 'In Development' },
  archived: { es: 'Archivado', en: 'Archived' },
};

const OtrosPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith('en') ? 'en' : 'es';
  const isDark = themeMode === 'dark';

  const pageTexts = {
    title: {
      es: 'Proyectos Personales',
      en: 'Personal Projects',
    },
    description: {
      es: 'Una selección de proyectos personales y side-projects en los que he trabajado, explorando nuevas tecnologías y resolviendo problemas que me interesan.',
      en: 'A selection of personal projects and side-projects I have worked on, exploring new technologies and solving problems that interest me.',
    },
  };

  const summaryTexts = {
    title: {
      es: 'Sobre estos proyectos',
      en: 'About these projects',
    },
    description: {
      es: `Estos proyectos representan mi trabajo fuera del ámbito corporativo, donde tengo libertad para experimentar con nuevas tecnologías y enfoques.

Cada proyecto nace de una necesidad real o curiosidad personal, y me permite mantenerme actualizado con las últimas tendencias mientras construyo productos que aportan valor a comunidades específicas.

Todos estos proyectos están desarrollados con un enfoque en la experiencia de usuario, rendimiento y escalabilidad.`,
      en: `These projects represent my work outside the corporate environment, where I have the freedom to experiment with new technologies and approaches.

Each project stems from a real need or personal curiosity, and allows me to stay up-to-date with the latest trends while building products that add value to specific communities.

All these projects are developed with a focus on user experience, performance, and scalability.`,
    },
  };

  return (
    <PageTransition>
      <PageContainer>
        <Header $isDark={isDark}>
          <PageTitle $isDark={isDark}>{pageTexts.title[language]}</PageTitle>
          <PageDescription $isDark={isDark}>{pageTexts.description[language]}</PageDescription>
        </Header>

        <ProjectsGrid>
          {projectsData.map((project: Project) => (
            <ProjectCard key={project.id} $isDark={isDark}>
              <ProjectImage $image={project.image}>
                <StatusBadge $status={project.status} $isDark={isDark}>
                  {statusLabels[project.status][language]}
                </StatusBadge>
              </ProjectImage>
              <ProjectContent>
                <ProjectName $isDark={isDark}>{project.name}</ProjectName>
                <ProjectDescription $isDark={isDark}>
                  {project.description[language]}
                </ProjectDescription>
                <TechStack>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index} $isDark={isDark}>
                      {tech}
                    </TechTag>
                  ))}
                </TechStack>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <Summary $themeMode={themeMode}>
          <DescriptionBox $isDark={isDark}>
            <SectionTitleInsideBox $isDark={isDark}>
              {summaryTexts.title[language]}
            </SectionTitleInsideBox>
            <DividerLine $isDark={isDark} />
            <SummaryText $isDark={isDark}>{summaryTexts.description[language]}</SummaryText>
          </DescriptionBox>
        </Summary>
      </PageContainer>
    </PageTransition>
  );
};

export default OtrosPage;
