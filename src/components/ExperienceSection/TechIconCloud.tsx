import React from 'react';
import styled from 'styled-components';
import type { IconType } from 'react-icons';
import {
  SiAmazondynamodb,
  SiAngular,
  SiDocker,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTypescript,
  SiWordpress,
  SiDotnet,
  SiGrafana,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbDatabase, TbHexagon, TbLambda, TbMapPin, TbNetwork, TbScale, TbTimelineEvent } from 'react-icons/tb';
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
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: rotate(${({ $rotate }) => $rotate}deg) scale(${({ $scale }) => $scale});
  transition: all 0.3s ease;
  opacity: 0.5;
  color: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.55)')};

  &:hover {
    opacity: 1;
    transform: rotate(${({ $rotate }) => $rotate}deg) scale(${({ $scale }) => $scale * 1.1});
  }
`;

const iconMap: Record<string, IconType> = {
  'Node.js': SiNodedotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  Go: SiGo,
  'AWS Lambda': TbLambda,
  DynamoDB: SiAmazondynamodb,
  GCP: SiGooglecloud,
  Kubernetes: SiKubernetes,
  Java: FaJava,
  'C# .NET': SiDotnet,
  Angular: SiAngular,
  PHP: SiPhp,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  'SQL Server': TbDatabase,
  WordPress: SiWordpress,
  JavaScript: SiJavascript,
  'AI/LLMs': SiOpenai,
  Grafana: SiGrafana,
  'Event Sourcing': TbTimelineEvent,
  DDD: TbHexagon,
  Microservices: TbNetwork,
  'High-scale': TbScale,
  LATAM: TbMapPin,
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
        const Icon = iconMap[tech];

        if (!pos || !Icon) return null;

        return (
          <IconWrapper
            key={tech}
            $top={pos.top}
            $left={pos.left}
            $rotate={pos.rotate}
            $scale={pos.scale}
            $isDark={isDark}
            title={tech}
          >
            <Icon size={40} aria-hidden="true" focusable={false} />
          </IconWrapper>
        );
      })}
    </CloudContainer>
  );
};

export default TechIconCloud;
