import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

interface DotBackgroundProps {
  className?: string;
  isSidebarPresent?: boolean;
  isSidebarCollapsed?: boolean;
}

const DotBackground: React.FC<DotBackgroundProps> = ({ 
  className, 
  isSidebarPresent = false, 
  isSidebarCollapsed = false 
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <>
      <FullScreenBackground $isDark={isDark} />
      <BackgroundContainer 
        className={className} 
        $isDark={isDark} 
        $isSidebarPresent={isSidebarPresent} 
        $isSidebarCollapsed={isSidebarCollapsed}
      >
        <DotPattern $isDark={isDark} />
        <SparkleLayer $isDark={isDark} />
        <GradientOverlay $isDark={isDark} />
        <RadialGradient $isDark={isDark} />
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div<{ 
  $isDark: boolean; 
  $isSidebarPresent: boolean; 
  $isSidebarCollapsed: boolean 
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  background: ${({ $isDark }) => $isDark ? '#000000' : '#FFFFFF'};
  
  /* Ajustar para centrar con la sidebar */
  transform: translateX(${({ $isSidebarPresent, $isSidebarCollapsed }) => {
    if (!$isSidebarPresent) return '0';
    return $isSidebarCollapsed ? '40px' : '140px';
  }});
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    transform: translateX(0);
  }
`;

const DotPattern = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  
  /* Múltiples capas de puntos para crear profundidad */
  background-image: ${({ $isDark }) => $isDark 
    ? `
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.04) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 2px, transparent 0)
    `
    : `
      radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.06) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.03) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.015) 2px, transparent 0)
    `
  };
  
  background-size: 24px 24px, 48px 48px, 96px 96px;
  background-position: 0 0, 12px 12px, 24px 24px;
  animation: dotFloat 30s ease-in-out infinite;
  
  @keyframes dotFloat {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(1px, -1px);
    }
    50% {
      transform: translate(-0.5px, 0.5px);
    }
    75% {
      transform: translate(0.5px, -0.5px);
    }
  }
`;

const SparkleLayer = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isDark }) => $isDark ? 0.6 : 0.4};
  
  /* Partículas brillantes ocasionales */
  background-image: ${({ $isDark }) => $isDark 
    ? `
      radial-gradient(circle at 15% 25%, rgba(120, 200, 255, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 85% 15%, rgba(255, 150, 200, 0.08) 1.5px, transparent 1.5px),
      radial-gradient(circle at 45% 75%, rgba(150, 255, 180, 0.06) 1px, transparent 1px),
      radial-gradient(circle at 75% 85%, rgba(255, 200, 120, 0.05) 2px, transparent 2px),
      radial-gradient(circle at 25% 65%, rgba(200, 150, 255, 0.04) 1px, transparent 1px)
    `
    : `
      radial-gradient(circle at 15% 25%, rgba(70, 130, 180, 0.08) 2px, transparent 2px),
      radial-gradient(circle at 85% 15%, rgba(180, 100, 140, 0.06) 1.5px, transparent 1.5px),
      radial-gradient(circle at 45% 75%, rgba(100, 180, 120, 0.05) 1px, transparent 1px),
      radial-gradient(circle at 75% 85%, rgba(180, 140, 80, 0.04) 2px, transparent 2px),
      radial-gradient(circle at 25% 65%, rgba(140, 100, 180, 0.03) 1px, transparent 1px)
    `
  };
  
  background-size: 400px 400px, 600px 600px, 300px 300px, 500px 500px, 350px 350px;
  background-position: 0% 0%, 100% 0%, 50% 100%, 0% 100%, 100% 50%;
  animation: sparkleFloat 45s ease-in-out infinite;
  
  @keyframes sparkleFloat {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: ${({ $isDark }) => $isDark ? 0.6 : 0.4};
    }
    25% {
      transform: translate(10px, -5px) rotate(90deg);
      opacity: ${({ $isDark }) => $isDark ? 0.8 : 0.6};
    }
    50% {
      transform: translate(-5px, 10px) rotate(180deg);
      opacity: ${({ $isDark }) => $isDark ? 0.4 : 0.2};
    }
    75% {
      transform: translate(5px, -10px) rotate(270deg);
      opacity: ${({ $isDark }) => $isDark ? 0.7 : 0.5};
    }
  }
`;

const GradientOverlay = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ $isDark }) => $isDark 
    ? `linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.02) 0%,
        rgba(0, 0, 0, 0.01) 50%,
        rgba(0, 0, 0, 0.02) 100%
      )`
    : `linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.02) 0%,
        rgba(255, 255, 255, 0.01) 50%,
        rgba(255, 255, 255, 0.02) 100%
      )`
  };
  pointer-events: none;
`;

const RadialGradient = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ $isDark }) => $isDark 
    ? `radial-gradient(
        circle at 50% 50%,
        rgba(255, 255, 255, 0.005) 0%,
        rgba(0, 0, 0, 0.02) 70%
      )`
    : `radial-gradient(
        circle at 50% 50%,
        rgba(0, 0, 0, 0.005) 0%,
        rgba(255, 255, 255, 0.02) 70%
      )`
  };
  pointer-events: none;
`;

const FullScreenBackground = styled.div<{ $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ $isDark }) => $isDark ? '#000000' : '#FFFFFF'};
  z-index: -20;
`;

export default DotBackground;