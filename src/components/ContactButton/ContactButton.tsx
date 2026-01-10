import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  initialDelay?: number;
  $hideOnScroll?: boolean;
}

const StyledButton = styled.button<{ $isDark: boolean }>`
  position: relative;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  background: ${({ $isDark }) => $isDark ? '#ffffff' : '#000000'};
  color: ${({ $isDark }) => $isDark ? '#000000' : '#ffffff'};
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: slideInFade 0.8s ease-out 0.5s forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      ${({ $isDark }) => $isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: ${({ $isDark }) => $isDark ? '#f8f8f8' : '#333333'};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(0) scale(1.02);
    transition: all 0.1s ease;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ $isDark }) => $isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
`;

// Keyframe animation for smooth entrance
const slideInFadeKeyframes = `
  @keyframes slideInFade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject keyframes into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = slideInFadeKeyframes;
  document.head.appendChild(style);
}

const ContactButton: React.FC<ContactButtonProps> = ({ 
  onClick, 
  className 
}) => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();
  const isDark = themeMode === 'dark';
  const isEn = (i18n?.language || 'es').toLowerCase().startsWith('en');
  const labelText = isEn ? "Let's talk about your project" : 'Hablemos de tu proyecto';
  const ariaText = isEn ? "Let's talk about your project" : 'Hablemos de tu proyecto';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Scroll to contact section
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <StyledButton
      $isDark={isDark}
      onClick={handleClick}
      className={className}
      type="button"
      aria-label={ariaText}
    >
      <ButtonText>{labelText}</ButtonText>
    </StyledButton>
  );
};

export default ContactButton;
