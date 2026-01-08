import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useProfile } from '../../context/ProfileContext';
import { TechItem } from '../../types/profile';

interface TechSliderProps {
  className?: string;
  technologies?: TechItem[];
}


const Tooltip = styled.div<{ $isVisible: boolean; $isDarkMode: boolean }>`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: ${({ $isVisible }) =>
    $isVisible
      ? 'translateX(-50%) translateY(0) scale(1)'
      : 'translateX(-50%) translateY(-4px) scale(0.95)'};
  padding: 8px 12px;
  border-radius: 100px;
  font-size: 12px;
  white-space: nowrap;
  background: ${({ $isDarkMode }) =>
    $isDarkMode ? 'rgba(20, 20, 25, 0.95)' : 'rgba(240, 240, 245, 0.95)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, ${({ $isDarkMode }) => ($isDarkMode ? '0.4' : '0.15')});
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${({ $isVisible }) => ($isVisible ? '300ms' : '0ms')};
  pointer-events: none;
  z-index: 10000;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#000000')};
  border: 1px solid
    ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')};
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: visible; // Changed from visible to hidden
  padding: 8px 0;
  margin: 6px 0 0;
  position: relative;
  background: ${({ theme }) =>
    theme.isDark ? 'rgba(29, 31, 35, 0.7)' : 'rgba(246, 246, 246, 0.7)'};
  border-top: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  border-bottom: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) =>
    theme.isDark ? '0 6px 20px rgba(0,0,0,0.18)' : '0 6px 18px rgba(0,0,0,0.06)'};
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    border-radius: 0;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
`;

const SliderInner = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: flex-start;
`;

const SliderTrack = styled.div<{ $animate: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    ${({ $animate }) =>
      $animate &&
      css`
        display: flex;
        justify-content: flex-start;
        min-width: 200%;
        animation: ${slideAnimation} 20s linear infinite;
      `}
  }
`;

const SliderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 15px;
  position: relative;
  flex: 1 1 0;

  @media (max-width: 768px) {
    flex: 0 0 auto;
  }
`;

const TechIcon = styled.img<{ $isDarkMode: boolean }>`
  height: 35px;
  max-height: 35px;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  opacity: 1;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
  filter: ${({ $isDarkMode }) => ($isDarkMode ? 'brightness(0) invert(1)' : 'none')};

  &:hover {
    transform: translateY(-5px);
  }
`;

const TechSlider: React.FC<TechSliderProps> = ({ className, technologies: propTechnologies }) => {
  const { themeMode } = useTheme();
  const { profile } = useProfile();
  const isDarkMode = themeMode === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Use technologies from props if provided, otherwise use profile technologies
  const technologies = propTechnologies || profile.technologies;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

  
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    setActiveTooltip(name);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <SliderContainer className={className}>
      <SliderInner>
        <SliderTrack $animate={isMobile}>
          {technologies.map((tech, index) => (
            <SliderItem
              key={`tech-${index}`}
              onMouseEnter={() => handleMouseEnter(tech.name)}
              onMouseLeave={handleMouseLeave}
            >
              <TechIcon src={tech.src} alt={tech.name} $isDarkMode={isDarkMode} />
              <Tooltip $isVisible={activeTooltip === tech.name} $isDarkMode={isDarkMode}>
                {tech.name}
              </Tooltip>
            </SliderItem>
          ))}

          {/* Duplicamos los iconos para crear un efecto infinito en mobile */}
          {isMobile &&
            technologies.map((tech, index) => (
              <SliderItem
                key={`tech-dup-${index}`}
                onMouseEnter={() => handleMouseEnter(`dup-${tech.name}`)}
                onMouseLeave={handleMouseLeave}
              >
                <TechIcon src={tech.src} alt={tech.name} $isDarkMode={isDarkMode} />
                <Tooltip $isVisible={activeTooltip === `dup-${tech.name}`} $isDarkMode={isDarkMode}>
                  {tech.name}
                </Tooltip>
              </SliderItem>
            ))}
        </SliderTrack>
      </SliderInner>
    </SliderContainer>
  );
};

export default TechSlider;
