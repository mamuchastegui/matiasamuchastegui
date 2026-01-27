import React from 'react';
import styled, { css } from 'styled-components';
import type { IconType } from 'react-icons';
import {
  SiAmazondynamodb,
  SiAmazonsqs,
  SiApachegroovy,
  SiApachekafka,
  SiAmazonwebservices,
  SiDatadog,
  SiDocker,
  SiFacebook,
  SiGit,
  SiGithubactions,
  SiGo,
  SiGoogledrive,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNewrelic,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
  SiVite,
  SiZod,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi, TbLambda } from 'react-icons/tb';
import Tooltip from '@components/Tooltip';


export interface FrontendExperienceCardData {
  cardTitle: string;
  subtitle: string;
  period: string;
  tasksTitle: string;
  tasks: string[];
  toolsTitle: string;
  tools: string[];
  resultsTitle: string;
  results: string[];
}

interface FrontendDevelopmentExperienceProps {
  title: React.ReactNode;
  experience: FrontendExperienceCardData;
  isDark: boolean;
}

const glassEffect = css`
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  will-change: backdrop-filter;
`;

const SectionContainer = styled.div<{ $isDark: boolean }>`
  margin: 2rem 0;
  border-radius: 12px;
  padding: 2.5rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')};
  background: ${({ $isDark }) => ($isDark ? 'rgba(40, 40, 45, 0.7)' : 'rgba(245, 245, 250, 0.75)')};
  ${glassEffect}
  color: ${({ theme }) => theme.colors.text};

  & > *:first-child {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 767px) {
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    margin: 1rem 0;
  }
`;

const DividerLine = styled.hr<{ $isDark?: boolean }>`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ $isDark, theme }) =>
    $isDark ? theme.colors.border + '55' : theme.colors.border + '88'};
  margin-top: 0.25rem;
  margin-bottom: 1rem;
`;

const ExperienceContentWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ExperienceRoleTitle = styled.h3<{ $isDark?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ExperienceRoleSubtitle = styled.h4<{ $isDark?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ExperiencePeriod = styled.p<{ $isDark?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
`;

const ExperienceListTitle = styled.h5<{ $isDark?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ExperienceList = styled.ul`
  font-family: ${({ theme }) => theme.fonts.body};
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  list-style: disc;
`;

const ExperienceListItem = styled.li<{ $isDark: boolean }>`
  margin-bottom: 0.5rem;
  color: ${props => (props.$isDark ? '#FFFFFF' : '#1D1F23')};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const ToolText = styled.span<{ $isDark?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
`;

const ToolIconWrapper = styled.span<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)')};
  border: 1px solid ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)')};
`;

const ToolIcon = styled.span<{ $isDark: boolean }>`
  display: inline-flex;
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#1D1F23')};
  line-height: 0;
`;

type ToolIconConfig = {
  icon: IconType;
};

const toolIconMap: Record<string, ToolIconConfig> = {
  Go: { icon: SiGo },
  'AWS Lambda': { icon: TbLambda },
  'AWS SQS': { icon: SiAmazonsqs },
  DynamoDB: { icon: SiAmazondynamodb },
  PostgreSQL: { icon: SiPostgresql },
  Docker: { icon: SiDocker },
  Kubernetes: { icon: SiKubernetes },
  Datadog: { icon: SiDatadog },
  'GitHub Actions': { icon: SiGithubactions },
  Terraform: { icon: SiTerraform },
  Java: { icon: FaJava },
  Groovy: { icon: SiApachegroovy },
  'Spring Boot': { icon: SiSpringboot },
  MySQL: { icon: SiMysql },
  Redis: { icon: SiRedis },
  Kafka: { icon: SiApachekafka },
  NewRelic: { icon: SiNewrelic },
  Git: { icon: SiGit },
  Jenkins: { icon: SiJenkins },
  React: { icon: SiReact },
  TypeScript: { icon: SiTypescript },
  'Node.js': { icon: SiNodedotjs },
  'AWS (Lambda, SQS, S3)': { icon: SiAmazonwebservices },
  'OpenAI API': { icon: SiOpenai },
  Zod: { icon: SiZod },
  'Context API': { icon: SiReact },
  'APIs RESTful': { icon: TbApi },
  'RESTful APIs': { icon: TbApi },
  'React Router': { icon: SiReactrouter },
  Vite: { icon: SiVite },
  'Google Drive API': { icon: SiGoogledrive },
  'Facebook API': { icon: SiFacebook },
  Postman: { icon: SiPostman },
  MongoDB: { icon: SiMongodb },
};

const FrontendDevelopmentExperienceFc: React.FC<FrontendDevelopmentExperienceProps> = ({ title, experience, isDark }) => {
  if (!experience) return null;

  return (
    <SectionContainer $isDark={isDark}>
      {title}
      <DividerLine $isDark={isDark} />
      <ExperienceContentWrapper>
        <ExperienceRoleTitle $isDark={isDark}>{experience.cardTitle}</ExperienceRoleTitle>
        <ExperiencePeriod $isDark={isDark}>{experience.period}</ExperiencePeriod>
        <ExperienceRoleSubtitle $isDark={isDark}>{experience.subtitle}</ExperienceRoleSubtitle>

        {experience.tasks && experience.tasks.length > 0 && (
          <>
            <ExperienceListTitle $isDark={isDark}>{experience.tasksTitle}</ExperienceListTitle>
            <DividerLine $isDark={isDark} />
            <ExperienceList>
              {experience.tasks.map((task, index) => (
                <ExperienceListItem key={`task-${index}`} $isDark={isDark}>{task}</ExperienceListItem>
              ))}
            </ExperienceList>
          </>
        )}

        {experience.tools && experience.tools.length > 0 && (
          <>
            <ExperienceListTitle $isDark={isDark}>{experience.toolsTitle}</ExperienceListTitle>
            <DividerLine $isDark={isDark} />
            <ToolsContainer>
              {experience.tools.map((tool, index) => {
                const toolConfig = toolIconMap[tool];

                if (toolConfig) {
                  const Icon = toolConfig.icon;

                  return (
                    <Tooltip key={`tool-${index}`} content={tool}>
                      <ToolIconWrapper $isDark={isDark} role="img" aria-label={tool}>
                        <ToolIcon $isDark={isDark}>
                          <Icon size={20} aria-hidden={true} focusable={false} />
                        </ToolIcon>
                      </ToolIconWrapper>
                    </Tooltip>
                  );
                }

                return (
                  <ToolText key={`tool-${index}`} $isDark={isDark}>
                    {tool}
                  </ToolText>
                );
              })}
            </ToolsContainer>
          </>
        )}

        {experience.results && experience.results.length > 0 && (
          <>
            <ExperienceListTitle $isDark={isDark}>{experience.resultsTitle}</ExperienceListTitle>
            <DividerLine $isDark={isDark} />
            <ExperienceList>
              {experience.results.map((result, index) => (
                <ExperienceListItem key={`result-${index}`} $isDark={isDark}>{result}</ExperienceListItem>
              ))}
            </ExperienceList>
          </>
        )}
      </ExperienceContentWrapper>
    </SectionContainer>
  );
};

export { FrontendDevelopmentExperienceFc as FrontendDevelopmentExperience };
