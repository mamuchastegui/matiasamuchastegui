import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

interface SplineBackgroundProps {
  className?: string;
  isSidebarPresent?: boolean;
  isSidebarCollapsed?: boolean;
}

const SplineBackground: React.FC<SplineBackgroundProps> = ({ className, isSidebarPresent = false, isSidebarCollapsed = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    console.warn('Spline background failed to load');
  };

  return (
    <>
      <FullScreenBackground $isDark={isDark} />
      <BackgroundContainer className={className} $isDark={isDark} $isSidebarPresent={isSidebarPresent} $isSidebarCollapsed={isSidebarCollapsed}>
        {isDark && (
          <>
            <SplineIframe
              src="https://my.spline.design/3dglassherobg-xhxFCKvVSQv5b7qPD9xIZ5yC"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Spline 3D Background"
              onLoad={handleLoad}
              onError={handleError}
              loading="eager"
              allow="autoplay; encrypted-media"
            />
            <GradientOverlay $isLoaded={isLoaded} />
            <RadialGradient $isLoaded={isLoaded} />
            {hasError && <FallbackBackground />}
          </>
        )}
      </BackgroundContainer>
    </>
  );
};

const BackgroundContainer = styled.div<{ $isDark: boolean; $isSidebarPresent: boolean; $isSidebarCollapsed: boolean }>`
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

const SplineIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
`;

const GradientOverlay = styled.div<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.02) 0%,
    rgba(0, 0, 0, 0.01) 50%,
    rgba(0, 0, 0, 0.02) 100%
  );
  opacity: ${props => props.$isLoaded ? 1 : 0.5};
  transition: opacity 0.5s ease;
  pointer-events: none;
`;

const RadialGradient = styled.div<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.005) 0%,
    rgba(0, 0, 0, 0.02) 70%
  );
  opacity: ${props => props.$isLoaded ? 1 : 0.3};
  transition: opacity 0.5s ease;
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

const FallbackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #1a1a1a 0%,
    #2d2d2d 25%,
    #1a1a1a 50%,
    #2d2d2d 75%,
    #1a1a1a 100%
  );
  pointer-events: none;
`;

export default SplineBackground;