import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

interface TechIconCloudProps {
  technologies: string[];
  side: 'left' | 'right';
}

const CloudContainer = styled.div<{ $side: 'left' | 'right' }>`
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 280px;
  padding-right: ${({ $side }) => ($side === 'left' ? '3rem' : '0')};
  padding-left: ${({ $side }) => ($side === 'right' ? '3rem' : '0')};
`;

const IconWrapper = styled.div<{
  $top: string;
  $left: string;
  $rotate: number;
  $scale: number;
  $isDark: boolean;
  $useColor: boolean;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: rotate(${({ $rotate }) => $rotate}deg) scale(${({ $scale }) => $scale});
  transition: all 0.3s ease;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transform: rotate(${({ $rotate }) => $rotate}deg) scale(${({ $scale }) => $scale * 1.1});
  }

  i {
    font-size: 2.5rem;
    /* In dark mode: use muted white color; In light mode with colored: let devicon handle colors */
    color: ${({ $isDark, $useColor }) =>
      $isDark
        ? 'rgba(255, 255, 255, 0.6)'
        : $useColor
          ? 'inherit'
          : 'rgba(0, 0, 0, 0.5)'
    };
  }
`;

// Mapping of tech names to Devicon classes
const iconMap: Record<string, { icon: string; colored?: boolean }> = {
  'Node.js': { icon: 'devicon-nodejs-original', colored: true },
  'React': { icon: 'devicon-react-original', colored: true },
  'TypeScript': { icon: 'devicon-typescript-plain', colored: true },
  'Go': { icon: 'devicon-go-original-wordmark', colored: true },
  'AWS Lambda': { icon: 'devicon-amazonwebservices-plain-wordmark', colored: true },
  'DynamoDB': { icon: 'devicon-dynamodb-plain', colored: true },
  'GCP': { icon: 'devicon-googlecloud-plain', colored: true },
  'Kubernetes': { icon: 'devicon-kubernetes-original', colored: true },
  'Java': { icon: 'devicon-java-original', colored: true },
  'C# .NET': { icon: 'devicon-csharp-plain', colored: true },
  'Angular': { icon: 'devicon-angularjs-plain', colored: true },
  'PHP': { icon: 'devicon-php-plain', colored: true },
  'Docker': { icon: 'devicon-docker-plain', colored: true },
  'PostgreSQL': { icon: 'devicon-postgresql-original', colored: true },
  'MongoDB': { icon: 'devicon-mongodb-plain', colored: true },
  'Redis': { icon: 'devicon-redis-plain', colored: true },
  'GraphQL': { icon: 'devicon-graphql-plain', colored: true },
  'SQL Server': { icon: 'devicon-microsoftsqlserver-plain', colored: true },
  'WordPress': { icon: 'devicon-wordpress-plain', colored: true },
  'JavaScript': { icon: 'devicon-javascript-plain', colored: true },
  // Custom mappings for techs without direct devicon match
  'AI/LLMs': { icon: 'devicon-openai-plain', colored: true },
  'Grafana': { icon: 'devicon-grafana-plain', colored: true },
  'Event Sourcing': { icon: 'devicon-apachekafka-original', colored: true },
  'DDD': { icon: 'devicon-confluence-plain', colored: true },
  'Microservices': { icon: 'devicon-docker-plain', colored: true },
  'High-scale': { icon: 'devicon-kubernetes-original', colored: true },
  'LATAM': { icon: 'devicon-linux-plain' },
};

// Predefined scatter positions for organic layout
const scatterPositions = [
  { top: '8%', left: '15%', rotate: -8, scale: 1.15 },
  { top: '20%', left: '55%', rotate: 12, scale: 0.95 },
  { top: '40%', left: '25%', rotate: -5, scale: 1.1 },
  { top: '50%', left: '65%', rotate: 8, scale: 1.0 },
  { top: '70%', left: '20%', rotate: -12, scale: 0.9 },
  { top: '75%', left: '60%', rotate: 6, scale: 1.05 },
];

const TechIconCloud: React.FC<TechIconCloudProps> = ({ technologies, side }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // Filter to only technologies we have icons for
  const techsWithIcons = technologies.filter((tech) => iconMap[tech]);

  return (
    <CloudContainer $side={side}>
      {techsWithIcons.slice(0, 6).map((tech, index) => {
        const pos = scatterPositions[index];
        const iconData = iconMap[tech];

        if (!pos || !iconData) return null;

        const useColor = !isDark && !!iconData.colored;

        return (
          <IconWrapper
            key={tech}
            $top={pos.top}
            $left={pos.left}
            $rotate={pos.rotate}
            $scale={pos.scale}
            $isDark={isDark}
            $useColor={useColor}
            title={tech}
          >
            <i
              className={`${iconData.icon}${useColor ? ' colored' : ''}`}
              aria-hidden="true"
            />
          </IconWrapper>
        );
      })}
    </CloudContainer>
  );
};

export default TechIconCloud;
