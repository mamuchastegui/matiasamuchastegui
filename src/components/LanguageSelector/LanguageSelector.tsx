import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes, css } from 'styled-components';

const LANGUAGE_CHANGE_COOLDOWN = 3000;

interface LanguageSelectorProps {
  className?: string;
  isCollapsed?: boolean;
}

const loadingAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const LanguageSelectorContainer = styled.div`
  display: flex; 
  align-items: center;
`;

const LanguageButton = styled.button<{ $active?: boolean; $changing: boolean; $isCollapsed?: boolean }>`
  display: flex; 
  align-items: center; 
  justify-content: center;
  height: ${({ $isCollapsed }) => $isCollapsed ? '36px' : '36px'};
  min-width: ${({ $isCollapsed }) => $isCollapsed ? '36px' : '36px'};
  padding: ${({ $isCollapsed }) => $isCollapsed ? '0' : '0 10px'};
  background: transparent;
  color: ${({ theme, $changing }) => ($changing ? 'rgba(255, 255, 255, 0.5)' : theme.colors.text)};
  border: 1px solid transparent;
  border-radius: ${({ $isCollapsed }) => $isCollapsed ? '8px' : '8px'};
  cursor: ${props => (props.$changing ? 'not-allowed' : 'pointer')};
  font-size: ${({ $isCollapsed }) => $isCollapsed ? '0.8rem' : '0.9rem'};
  font-weight: 600;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: none;
  position: relative;
  overflow: hidden;
  width: ${({ $isCollapsed }) => $isCollapsed ? '36px' : 'auto'};

  &:hover {
    background: ${({ theme, $changing }) =>
      $changing 
      ? 'rgba(150, 150, 150, 0.2)' 
      : theme.isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.05)'};
    border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    box-shadow: 0 2px 8px ${({ theme }) => theme.isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  /* Indicador de carga */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #646cff, #82e9de);
    opacity: ${props => (props.$changing ? 1 : 0)};
    ${props => props.$changing && css`
      animation: ${loadingAnimation} 3s linear;
      animation-fill-mode: forwards;
    `}
  }
`;



const LanguageText = styled.span<{ $isCollapsed?: boolean }>`
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  font-weight: ${({ $isCollapsed }) => $isCollapsed ? '700' : '600'};
  font-size: ${({ $isCollapsed }) => $isCollapsed ? '0.8rem' : '0.9rem'};
`;

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  isCollapsed = false
}) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language?.startsWith('es') ? 'es' : 'en');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
    if (currentLang !== lang) {
      setCurrentLang(lang);
    }
    
    localStorage.setItem('i18nextLng', i18n.language);
  }, [i18n.language, currentLang]);

  const toggleLanguage = () => {
    if (isDisabled) {
      return;
    }

    setIsDisabled(true);
    
    const newLang = currentLang === 'es' ? 'en' : 'es';
    
    i18n.changeLanguage(newLang)
      .then(() => {
        setCurrentLang(newLang);
      })
      .catch(error => {
        console.error('Error al cambiar el idioma:', error);
      });
    
    setTimeout(() => {
      setIsDisabled(false);
    }, LANGUAGE_CHANGE_COOLDOWN);
  };

  return (
    <LanguageSelectorContainer className={className}>
      <LanguageButton 
        onClick={toggleLanguage} 
        $changing={isDisabled}
        $isCollapsed={isCollapsed}
      >
        <LanguageText $isCollapsed={isCollapsed}>
          {currentLang === 'es' ? 'ES' : 'EN'}
        </LanguageText>
      </LanguageButton>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
