import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';
import './toggle-styles.css';

interface ThemeToggleProps {
  className?: string;
  $hideOnScroll?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  $hideOnScroll = false
}) => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === 'dark';

  // View-transitions powered theme animation anchored to the toggle
  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    duration: 800,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    blurAmount: 2.8,
    isDarkMode: isDark,
    onDarkModeChange: (nextIsDark: boolean) => {
      // Sync library’s new mode with our ThemeContext
      if (nextIsDark !== isDark) {
        toggleTheme();
      }
    },
    // Keep default globalClassName 'dark' (harmless with styled-components theme)
  });
  

  // Fallback inline styles to ensure correct layout/animation even if CSS fails to load in prod
  const toggleStyle: React.CSSProperties = {
    color: isDark ? '#fff' : '#1D1F2C',
    position: 'relative', // anchor absolute icons
    display: 'grid',
    placeItems: 'center',
    // Ensure it always fits its wrapper even if CSS is missing
    width: '100%',
    height: '100%',
    lineHeight: 1,
    boxSizing: 'border-box',
    borderRadius: 8,
  };

  const baseIconStyle: React.CSSProperties = {
    position: 'absolute', // overlay both icons
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'grid',
    placeItems: 'center',
    transition: 'transform 500ms',
    transformOrigin: '50% 50%',
    willChange: 'transform',
    lineHeight: 0.1,
  };
  
  return (
    <div className={`toggle-container ${className || ''}`}
      style={{
        transform: $hideOnScroll ? 'translateY(-100px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        // Make the container fill the wrapper to avoid overflow/layout jumps in prod
        width: '100%',
        height: '100%'
      }}
    >
      <button
        ref={ref}
        type="button"
        className="toggle"
        style={toggleStyle}
        onClick={() => {
          // Delegate to the animation hook (includes reduced-motion handling)
          void toggleSwitchTheme();
        }}
        aria-pressed={isDark}
        aria-label={t('tooltip.toggleTheme', 'Cambiar tema / Toggle theme')}
      >
        <div
          className="icon icon--moon"
          aria-hidden={isDark}
          style={{ 
            ...baseIconStyle,
            transform: isDark ? 'rotate(360deg) scale(0)' : 'scale(1)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
    
        <div
          className="icon icon--sun"
          aria-hidden={!isDark}
          style={{ 
            ...baseIconStyle,
            transform: isDark ? 'scale(1) rotate(360deg)' : 'scale(0)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
