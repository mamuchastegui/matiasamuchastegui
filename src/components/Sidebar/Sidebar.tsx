import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import {
  Menu,
  Home as HomeIcon,
  User as AboutIcon,
  Settings as ServicesIcon,
  Briefcase as ExperienceIcon,
  Mail as ContactIcon,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import PortfolioLogo from '../../assets/images/projects/Logo AV.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface NavLinkItem {
  href: string;
  labelKey: string;
  defaultLabel: string;
  IconComponent: React.ElementType;
  subLinks?: NavLinkItem[];
}



interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}



const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
  z-index: 999;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean; $isMobile: boolean; $isFirstRender: boolean; $isCollapsed?: boolean }>`
  /* Aplicando color tenue similar al hover de las cards de servicios */
  background: linear-gradient(to bottom, rgba(147, 159, 167, 0.15), rgba(134, 156, 216, 0.1));
  backdrop-filter: blur(24px);
  border: ${({ theme }) => theme.isDark ? 
    '1px solid rgba(255, 255, 255, 0.1)' : 
    '1px solid rgba(200, 200, 200, 0.4)'
  };
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.isDark ? 
    '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 
    'none'
  };
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space.md};
  height: calc(100dvh - 32px);
  width: ${({ $isCollapsed, $isMobile }) => $isMobile ? '280px' : ($isCollapsed ? '80px' : '280px')};
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.6s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out, width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease, filter 0.7s ease;
  opacity: ${({ $isFirstRender }) => ($isFirstRender ? 0 : 1)};
  filter: ${({ $isFirstRender }) => ($isFirstRender ? 'blur(6px)' : 'none')};
  will-change: transform, opacity, filter;

  ${({ $isMobile, $isOpen }) =>
    $isMobile &&
    css`
      transform: ${$isOpen ? 'translateX(0)' : 'translateX(calc(-100% - 16px))'};
      box-shadow: ${$isOpen ? '0 0 20px rgba(0,0,0,0.3)' : 'none'};
    `}
  
  ${({ $isMobile, $isFirstRender }) =>
    !$isMobile &&
    css`
      /* Slide in from left + fade/blur on first render (desktop) */
      transform: ${$isFirstRender ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${$isFirstRender ? 0 : 1};
      filter: ${$isFirstRender ? 'blur(6px)' : 'blur(0)'};
    `}
`;

const LogoContainer = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme, $isCollapsed }) => $isCollapsed ? '0' : theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  justify-content: ${({ $isCollapsed }) => $isCollapsed ? 'center' : 'flex-start'};
`;

const LogoImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  box-sizing: border-box;
`;

const LogoImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: filter 0.3s ease-in-out;
  filter: ${({ theme }) => (theme.isDark ? 'none' : 'invert(1)')};
`;

const LogoText = styled.h1<{ $isCollapsed?: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1;
  letter-spacing: 0.5px;
  opacity: ${({ $isCollapsed }) => $isCollapsed ? '0' : '1'};
  transform: ${({ $isCollapsed }) => $isCollapsed ? 'translateX(-15px) scale(0.9)' : 'translateX(0) scale(1)'};
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: ${({ $isCollapsed }) => $isCollapsed ? 'none' : 'auto'};
  white-space: nowrap;
  overflow: hidden;
  will-change: transform, opacity;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
  position: relative;
`;

const NavBackground = styled.div<{ $top: number; $height: number; $isVisible: boolean; $animate: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  border-radius: 8px;
  backdrop-filter: blur(8px);
  transition: ${({ $animate }) => $animate
    ? 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'scale(1)' : 'scale(0.95)'};
  pointer-events: none;
  z-index: 0;
`;

// Fondo de hover para los controles inferiores (GitHub, LinkedIn, toggles)
const ControlsHoverBackground = styled.div<{ $top: number; $left: number; $width: number; $height: number; $isVisible: boolean; $animate: boolean }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  border-radius: 8px;
  backdrop-filter: blur(8px);
  transition: ${({ $animate }) => $animate
    ? 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? 'scale(1)' : 'scale(0.95)')};
  pointer-events: none;
  z-index: 0;
`;



const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

const NavLink = styled.a<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0; /* evitamos saltos; manejamos espacio con margin del texto */
  padding: ${({ theme, $isCollapsed }) => $isCollapsed ? `${theme.space.sm} ${theme.space.sm}` : `${theme.space.sm} ${theme.space.md}`};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none !important;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;
  justify-content: flex-start; /* constante para evitar salto discreto */
  position: relative;
  z-index: 1;

  &.active {
    background-color: ${({ theme }) => (theme.isDark ? theme.colors.text : theme.colors.text)}; 
    color: ${({ theme }) => (theme.isDark ? theme.colors.sidebarBackground : theme.colors.background)}; 
    svg {
        color: ${({ theme }) => (theme.isDark ? theme.colors.sidebarBackground : theme.colors.background)};
    }
  }

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.9;
    flex-shrink: 0;
    transition: none;
  }

  svg:not(.chevron-icon) {
    transform: none !important;
  }

  svg.chevron-icon {
    margin-left: auto;
    display: ${({ $isCollapsed }) => $isCollapsed ? 'none' : 'inline'};
    opacity: ${({ $isCollapsed }) => $isCollapsed ? '0' : '1'};
    transform: ${({ $isCollapsed }) => $isCollapsed ? 'translateX(15px) scale(0.8)' : 'translateX(0) scale(1)'};
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    pointer-events: ${({ $isCollapsed }) => $isCollapsed ? 'none' : 'auto'};
    will-change: transform, opacity;
  }

  svg.chevron-icon.open {
    transform: ${({ $isCollapsed }) => $isCollapsed ? 'translateX(15px) scale(0.8) rotate(180deg)' : 'translateX(0) scale(1) rotate(180deg)'};
  }

  .nav-text {
    opacity: ${({ $isCollapsed }) => $isCollapsed ? '0' : '1'};
    transform: ${({ $isCollapsed }) => $isCollapsed ? 'translateX(-12px) scale(0.95)' : 'translateX(0) scale(1)'};
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    pointer-events: ${({ $isCollapsed }) => $isCollapsed ? 'none' : 'auto'};
    white-space: nowrap;
    overflow: hidden;
    will-change: transform, opacity;
    display: inline-block; /* mantener en flujo para animación */
    max-width: ${({ $isCollapsed }) => $isCollapsed ? '0' : '200px'}; /* ajustar si cambian los labels */
    margin-left: ${({ theme, $isCollapsed }) => $isCollapsed ? '0' : theme.space.sm};
  }
`;

/* Contenedor para el ícono que anima su ancho para centrarlo suavemente al colapsar */
const IconWrapper = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  opacity: ${({ $isCollapsed }) => $isCollapsed ? '1' : '1'};
  transform: ${({ $isCollapsed }) => $isCollapsed ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform, opacity;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '100%' : '18px')};
`;

const SubNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: ${({ theme }) => theme.space.lg};
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  &.open {
    max-height: 500px;
  }
`;

const SubNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space.xs};
  
  &:first-child {
    margin-top: ${({ theme }) => theme.space.sm};
  }
`;

const SubNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  padding-left: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none !important;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    box-shadow: 0 2px 8px ${({ theme }) => theme.isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &.active {
    background-color: ${({ theme }) => (theme.isDark ? theme.colors.text : theme.colors.text)}; 
    color: ${({ theme }) => (theme.isDark ? theme.colors.sidebarBackground : theme.colors.background)}; 
    svg {
        color: ${({ theme }) => (theme.isDark ? theme.colors.sidebarBackground : theme.colors.background)};
    }
  }

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.8;
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${({ theme }) => theme.isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1001;
  
  &:hover {
    background: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
    border: 1px solid ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, ${({ theme }) => theme.isDark ? '0.4' : '0.15'});
    transform: translateY(-50%) scale(1.1);
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
    transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  

  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ControlsContainer = styled.div<{ $isCollapsed?: boolean }>`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: 0;
  /* top divider handled by ControlsTopDivider for smooth transitions */
  display: flex;
  flex-direction: ${({ $isCollapsed }) => $isCollapsed ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
  gap: ${({ $isCollapsed }) => $isCollapsed ? '6px' : '14px'};
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: scale(1);
  will-change: gap, flex-direction;
  position: relative; /* para posicionar el fondo hover interno */
  overflow: visible; /* permitir que los tooltips sobresalgan sin ser recortados */
  min-height: 48px; /* asegura espacio estable mientras cambia la dirección */
`;

const ControlsFade = styled.div<{ $hidden: boolean }>`
  display: flex;
  flex-direction: inherit;
  align-items: center;
  justify-content: center;
  gap: inherit;
  width: 100%;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transform: ${({ $hidden }) => ($hidden ? 'translateY(6px)' : 'translateY(0)')};
  transition: ${({ $hidden }) =>
    $hidden
      ? 'none'
      : 'opacity 160ms ease, transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1)'};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
`;

const ControlsTopDivider = styled.div<{ $phase?: 'visible' | 'fading' | 'hidden' | 'showing'; $hidden?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: ${({ theme }) => (theme.isDark ? theme.colors.border : '#dee2e6')};
  opacity: ${({ $phase }) => ($phase === 'hidden' ? 0 : 1)};
  filter: blur(${({ $phase }) => ($phase === 'showing' ? '0px' : $phase === 'hidden' ? '4px' : '0px')});
  transition: ${({ $hidden }) => ($hidden ? 'none' : 'opacity 220ms ease, filter 220ms ease')};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  pointer-events: none;
`;


const LanguageSelectorWrapper = styled.div<{ $isCollapsed?: boolean; $index?: number; $total?: number; $phase?: 'visible' | 'fading' | 'hidden' | 'showing' }>`
  width: ${({ $isCollapsed }) => $isCollapsed ? '36px' : 'auto'};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;
  
  opacity: ${({ $phase }) => ($phase === 'hidden' ? 0 : $phase === 'fading' ? 0 : 1)};
  filter: blur(${({ $phase }) => ($phase === 'hidden' ? '4px' : $phase === 'fading' ? '4px' : '0px')});
  transform: translateY(0) translateX(0) scale(1);
  transition: opacity 220ms ease, filter 220ms ease, transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
  /* delay set inline per-instance to ensure correct order */
  will-change: transform, opacity;
  /* No visibility/pointer-events toggling during collapse/expand */

  /* hover visual handled by ControlsHoverBackground */
`;

const SocialMediaButton = styled.a<{ $isCollapsed?: boolean; $index?: number; $total?: number; $phase?: 'visible' | 'fading' | 'hidden' | 'showing' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  box-shadow: none;
  
  opacity: ${({ $phase }) => ($phase === 'hidden' ? 0 : $phase === 'fading' ? 0 : 1)};
  filter: blur(${({ $phase }) => ($phase === 'hidden' ? '4px' : $phase === 'fading' ? '4px' : '0px')});
  transform: translateY(0) translateX(0) scale(1);
  transition: opacity 220ms ease, filter 220ms ease, transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
  /* delay set inline per-instance to ensure correct order */
  will-change: transform, opacity;
  /* No visibility/pointer-events toggling during collapse/expand */

  /* hover visual handled by ControlsHoverBackground */

  &:active {
    transform: translateY(0) scale(0.98);
    transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  }

  svg {
    display: block;
    transition: none;
  }
  /* icon scale removed to match nav hover */
`;

const ThemeToggleWrapper = styled.div<{ $isCollapsed?: boolean; $index?: number; $total?: number; $phase?: 'visible' | 'fading' | 'hidden' | 'showing' }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;
  
  /* Ensure inner toggle never overflows the 36x36 wrapper in prod */
  overflow: hidden;
  box-sizing: border-box;

  opacity: ${({ $phase }) => ($phase === 'hidden' ? 0 : $phase === 'fading' ? 0 : 1)};
  filter: blur(${({ $phase }) => ($phase === 'hidden' ? '4px' : $phase === 'fading' ? '4px' : '0px')});
  transform: translateY(0) translateX(0) scale(1);
  transition: opacity 220ms ease, filter 220ms ease, transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
  /* delay set inline per-instance to ensure correct order */
  will-change: transform, opacity, filter;
  /* No visibility/pointer-events toggling during collapse/expand */
  /* hover visual handled by ControlsHoverBackground */

  label.toggle {
    transform: scale(1);
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

const TechTooltip = styled.div<{ $isVisible: boolean; $isDarkMode: boolean; $isCollapsed?: boolean; $distance?: number }>`
  position: absolute;
  ${({ $isCollapsed, $distance = 30, $isVisible }) => $isCollapsed ? `
    top: 50%;
    left: calc(100% + ${$distance}px);
    transform: translateY(-50%) ${$isVisible ? 'translateX(0) scale(1)' : 'translateX(-8px) scale(0.95)'};
  ` : `
    top: -35px;
    left: 0;
    transform: translateX(-20%) ${$isVisible ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.95)'};
  `}
  padding: 8px 12px;
  border-radius: 100px;
  font-size: 12px;
  white-space: nowrap;
  background: ${({ $isDarkMode }) =>
    $isDarkMode ? 'rgba(20, 20, 25, 0.95)' : 'rgba(240, 240, 245, 0.95)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, ${({ $isDarkMode }) => $isDarkMode ? '0.4' : '0.15'});
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${({ $isVisible }) => ($isVisible ? '300ms' : '0ms')};
  pointer-events: none;
  z-index: 10000;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#000000')};
  border: 1px solid ${({ $isDarkMode }) => $isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
`;

const ControlsSeparator = styled.div<{ $isCollapsed?: boolean; $phase?: 'visible' | 'fading' | 'hidden' | 'showing' }>`
  width: ${({ $isCollapsed }) => $isCollapsed ? '24px' : '1px'};
  height: ${({ $isCollapsed }) => $isCollapsed ? '1px' : '24px'};
  background: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 1px;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 220ms ease, filter 220ms ease;
  flex-shrink: 0;
  opacity: ${({ $phase }) => ($phase === 'hidden' ? 0 : 1)};
  filter: blur(${({ $phase }) => ($phase === 'showing' ? '0px' : $phase === 'hidden' ? '4px' : '0px')});
`;

/* Duplicate LanguageSelectorWrapper removed: consolidated earlier definition with flex sizing */

const MobileMenuButton = styled.button<{ $isMobile: boolean; $isOpen: boolean }>`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  /* Aplicando el mismo estilo glassmorphism del sidebar con color tenue */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  padding: ${({ theme }) => theme.space.xs};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.isDark ? 
    '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 
    '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };
  transition: background-color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease, transform 0.5s ease;
  width: 40px;
  height: 40px;
  display: ${({ $isMobile, $isOpen }) => (!$isMobile ? 'none' : $isOpen ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(-20px)' : 'translateX(0)')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'none' : 'auto')};

  /* Hover effects removed */
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isMobile, isCollapsed = false, toggleCollapse }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>("#home");
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showGithubTooltip, setShowGithubTooltip] = useState(false);
  const [showLinkedinTooltip, setShowLinkedinTooltip] = useState(false);
  const [showXTooltip, setShowXTooltip] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);
  const [showNavTooltips, setShowNavTooltips] = useState<{[key: string]: boolean}>({});
  const { theme } = useTheme();
  
  // Estados para el efecto hover estilo Vercel
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [navBackgroundPosition, setNavBackgroundPosition] = useState({ top: 0, height: 0 });
  const navListRef = useRef<HTMLUListElement>(null);

  // Estado para controlar la animación de fade de los iconos inferiores
  const [iconsFadePhase, setIconsFadePhase] = useState<'visible' | 'fading' | 'hidden' | 'showing'>('visible');
  const [controlsHidden, setControlsHidden] = useState(false);
  const [navBgAnimate, setNavBgAnimate] = useState(true);
  const navBgIdleTimeout = useRef<number | null>(null);

  const handleToggleCollapse = () => {
    if (!toggleCollapse) return;
    // Ocultar de inmediato (sin animación) y resetear fases para un stagger limpio
    setControlsHidden(true);
    setIconsFadePhase('hidden');
    setControlsBgVisible(false);
    toggleCollapse();
    const sidebarWidthTransitionMs = 400;
    const bufferMs = -140; // iniciar y terminar un pelín antes
    window.setTimeout(() => {
      setControlsHidden(false);
      setIconsFadePhase('showing');
      // Pasar a visible tras el desblur
      window.setTimeout(() => setIconsFadePhase('visible'), 220);
    }, sidebarWidthTransitionMs + bufferMs);
    if (!isCollapsed) {
      setOpenSubmenuKey(null);
    }
  };

  // Helper: stagger order depending on layout
  const totalControls = 5;
  const isCollapsedLayout = !isMobile && isCollapsed;
  const getStaggerDelay = (index: number) => {
    const step = 40; // ms, más inmediato
    const ms = isCollapsedLayout ? (totalControls - 1 - index) * step : index * step;
    return `${ms}ms`;
  };


  useEffect(() => {
    const body = document.body;
    if (isMobile && isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }


    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  const navLinks: NavLinkItem[] = [
    { href: '#home', labelKey: 'home', defaultLabel: 'Inicio', IconComponent: HomeIcon },
    { href: '#about', labelKey: 'navbar.about', defaultLabel: 'Sobre mí', IconComponent: AboutIcon },
    { href: '#services', labelKey: 'navbar.services', defaultLabel: 'Servicios', IconComponent: ServicesIcon },
    {
      href: '#experience',
      labelKey: 'experience',
      defaultLabel: 'Experiencia', 
      IconComponent: ExperienceIcon,
      subLinks: [
        { href: '/xcons', labelKey: 'navbar.xcons', defaultLabel: 'XCONS', IconComponent: ChevronRight }, 
        { href: '/fusionads', labelKey: 'navbar.fusionads', defaultLabel: 'FusionAds', IconComponent: ChevronRight },
        { href: '/bandit', labelKey: 'navbar.bandit', defaultLabel: 'Bandit', IconComponent: ChevronRight },
        { href: '/otros', labelKey: 'navbar.otros', defaultLabel: 'Otros proyectos', IconComponent: ChevronRight },
      ],
    },
    { href: '#contact', labelKey: 'contact', defaultLabel: 'Contacto', IconComponent: ContactIcon },
  ];



  const swipeThreshold = 50; 

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (swipeDistance > swipeThreshold && !isOpen) {
      toggleSidebar();
    }
    
    if (swipeDistance < -swipeThreshold && isOpen) {
      toggleSidebar();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Funciones para el efecto hover estilo Vercel
  const handleNavItemHover = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    // No mostrar hover si el elemento ya está activo
    if (href === activeLink) return;
    
    if (!navListRef.current) return;
    
    const navItem = event.currentTarget.parentElement;
    if (!navItem) return;
    
    const navListRect = navListRef.current.getBoundingClientRect();
    const navItemRect = navItem.getBoundingClientRect();
    
    const top = navItemRect.top - navListRect.top;
    const height = navItemRect.height;
    
    // Si estuvo inactivo, evitamos animación de deslizamiento en la primera aparición
    if (navBgIdleTimeout.current) {
      window.clearTimeout(navBgIdleTimeout.current);
      navBgIdleTimeout.current = null;
    }

    if (!hoveredNavItem && !navBgAnimate) {
      // Posicionar primero sin animar top/height, y mostrar
      setNavBackgroundPosition({ top, height });
      setHoveredNavItem(href);
      // Rehabilitar animación para siguientes movimientos
      requestAnimationFrame(() => setNavBgAnimate(true));
    } else {
      setHoveredNavItem(href);
      setNavBackgroundPosition({ top, height });
    }
  };

  const handleNavItemLeave = () => {
    setHoveredNavItem(null);
    // Tras un breve idle, desactivar animación de posición para que la próxima aparición no deslice
    if (navBgIdleTimeout.current) window.clearTimeout(navBgIdleTimeout.current);
    navBgIdleTimeout.current = window.setTimeout(() => {
      setNavBgAnimate(false);
    }, 400);
  };

  useEffect(() => {
    if (isMobile) {
      const handleDocumentTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
      };
      
      const handleDocumentTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
      };
      
      const handleDocumentTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) {
          return;
        }
        
        const swipeDistance = touchEndX.current - touchStartX.current;
        
        if (swipeDistance > swipeThreshold && !isOpen && touchStartX.current < 30) {
          toggleSidebar();
        }
        
        touchStartX.current = null;
        touchEndX.current = null;
      };
      
      document.addEventListener('touchstart', handleDocumentTouchStart);
      document.addEventListener('touchmove', handleDocumentTouchMove);
      document.addEventListener('touchend', handleDocumentTouchEnd);
      
      return () => {
        document.removeEventListener('touchstart', handleDocumentTouchStart);
        document.removeEventListener('touchmove', handleDocumentTouchMove);
        document.removeEventListener('touchend', handleDocumentTouchEnd);
      };
    }
  }, [isMobile, isOpen, toggleSidebar]);

  useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash) {
        setActiveLink(location.hash);
      } else if (location.state?.scrollToSection) {
        setActiveLink(`#${location.state.scrollToSection}`);
      } else {
        setActiveLink('#home');
      }
    } else {
      setActiveLink(location.pathname);
    }
  }, [location]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkItem: NavLinkItem) => {
    e.preventDefault();
    const { href, subLinks } = linkItem;
    
    setActiveLink(href);
    
    const isExperienceSublink = navLinks
        .find(link => link.href === '#experience')
        ?.subLinks?.some(subLink => subLink.href === href);

    if (subLinks && subLinks.length > 0) {
      if (openSubmenuKey === href) {
        setOpenSubmenuKey(null);
      } else {
        setOpenSubmenuKey(href);
      }
    } else if (!isExperienceSublink) {
      setOpenSubmenuKey(null);
    }
    
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
            
            try {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            } catch (error) {
              console.error("Error en scrollIntoView:", error);
            }
          }, 50);
        } else {
          console.warn(`Elemento con ID '${targetId}' no encontrado en el DOM.`);
        }
      } else {
        navigate('/', { state: { scrollToSection: href.substring(1) } });
      }
    } else {
      navigate(href);
    }
    
    if (isMobile && isOpen) {
      const isSublinkClick = navLinks.some(link => link.subLinks?.some(sl => sl.href === href));
      if ((!subLinks || subLinks.length === 0) || isSublinkClick) {
         toggleSidebar();
      }
    }
  };


  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, []);

  // Hover background state for bottom controls
  const controlsRef = useRef<HTMLDivElement>(null);
  const [controlsBgVisible, setControlsBgVisible] = useState(false);
  const [controlsBg, setControlsBg] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [controlsBgAnimate, setControlsBgAnimate] = useState(true);
  const controlsBgIdleTimeout = useRef<number | null>(null);

  const handleControlHover = (el: HTMLElement | null) => {
    if (!el || !controlsRef.current) return;
    const crect = controlsRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // Clear idle timer when re-entering
    if (controlsBgIdleTimeout.current) {
      window.clearTimeout(controlsBgIdleTimeout.current);
      controlsBgIdleTimeout.current = null;
    }

    const next = {
      top: r.top - crect.top,
      left: r.left - crect.left,
      width: r.width,
      height: r.height,
    };

    if (!controlsBgVisible && !controlsBgAnimate) {
      // First appearance after idle: position without sliding, then enable animation
      setControlsBg(next);
      setControlsBgVisible(true);
      requestAnimationFrame(() => setControlsBgAnimate(true));
    } else {
      setControlsBg(next);
      setControlsBgVisible(true);
    }
  };

  const handleControlLeave = () => {
    setControlsBgVisible(false);
    if (controlsBgIdleTimeout.current) window.clearTimeout(controlsBgIdleTimeout.current);
    controlsBgIdleTimeout.current = window.setTimeout(() => {
      setControlsBgAnimate(false);
    }, 400);
  };

  return (
    <>

      
      {isMobile && (
        <MobileMenuButton 
          $isMobile={isMobile}
          $isOpen={isOpen}
          onClick={toggleSidebar}
          aria-label={t('openMenu', 'Abrir menú')}
        >
          <Menu size={24} />
        </MobileMenuButton>
      )}

      {isMobile && <SidebarOverlay $isOpen={isOpen} onClick={toggleSidebar} />}

      <SidebarContainer 
        $isOpen={isOpen} 
        $isMobile={isMobile}
        $isFirstRender={isFirstRender}
        $isCollapsed={!isMobile && isCollapsed}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!isMobile && (
          <CollapseButton onClick={handleToggleCollapse}>
            {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </CollapseButton>
        )}
        
        <LogoContainer 
          $isCollapsed={!isMobile && isCollapsed}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (location.pathname === '/') {
              const el = document.getElementById('home');
              if (el) {
                try {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } catch {}
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              navigate('/', { state: { scrollToSection: 'home' } });
            }
            if (isMobile && isOpen) {
              toggleSidebar();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (location.pathname === '/') {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/', { state: { scrollToSection: 'home' } });
              }
              if (isMobile && isOpen) toggleSidebar();
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <LogoImageWrapper>
            <LogoImage src={PortfolioLogo} alt={t('portfolioLogoAlt', 'Logo del Portafolio')} />
          </LogoImageWrapper>
          <LogoText $isCollapsed={!isMobile && isCollapsed}>Alexis Vedia</LogoText>
        </LogoContainer>
        <NavList ref={navListRef}>
          <NavBackground 
            $top={navBackgroundPosition.top}
            $height={navBackgroundPosition.height}
            $isVisible={hoveredNavItem !== null}
            $animate={navBgAnimate}
          />
          {navLinks.map((linkItemMap) => {
            const { href: itemHref, labelKey, defaultLabel, IconComponent: ItemIconComponent, subLinks: itemSubLinks } = linkItemMap;
            
            const isSubmenuOpen = openSubmenuKey === itemHref;
            
            const isLinkActive = activeLink === itemHref;
            
            return (
              <NavItem key={itemHref}>
                <NavLink 
                  href={itemHref} 
                  onClick={(e) => handleLinkClick(e, linkItemMap)}
                  className={`${isLinkActive ? 'active' : ''} ${ItemIconComponent === ExperienceIcon ? 'experience-icon' : ''}`}
                  $isCollapsed={!isMobile && isCollapsed}
                  style={{ position: 'relative' }}
                  onMouseEnter={(e) => {
                     if (!isMobile) {
                       if (isCollapsed) {
                         setShowNavTooltips(prev => ({ ...prev, [itemHref]: true }));
                       }
                       const isExperienceParent = itemHref === '#experience';
                       const isExperienceChildActive = !!navLinks
                         .find((l) => l.href === '#experience')
                         ?.subLinks?.some((sl) => sl.href === activeLink);
                       if (isExperienceParent && isExperienceChildActive) {
                         return;
                       }
                       handleNavItemHover(itemHref, e);
                     }
                   }}
                  onMouseLeave={() => {
                    if (!isMobile && isCollapsed) {
                      setShowNavTooltips(prev => ({ ...prev, [itemHref]: false }));
                      handleNavItemLeave();
                    } else if (!isMobile && !isCollapsed) {
                      handleNavItemLeave();
                    }
                  }}
                >
                  <IconWrapper $isCollapsed={!isMobile && isCollapsed}>
                    <ItemIconComponent />
                  </IconWrapper>
                  <span className="nav-text">{t(labelKey, defaultLabel)}</span>
                  {itemSubLinks && itemSubLinks.length > 0 && (
                    <ChevronDown size={16} className={`chevron-icon ${isSubmenuOpen ? 'open' : ''}`} />
                  )}
                  {!isMobile && isCollapsed && (
                    <TechTooltip $isVisible={showNavTooltips[itemHref] || false} $isDarkMode={theme.isDark} $isCollapsed={true} $distance={25}>
                      {t(labelKey, defaultLabel)}
                    </TechTooltip>
                  )}
                </NavLink>
                {itemSubLinks && itemSubLinks.length > 0 && !isCollapsed && (
                  <SubNavList className={isSubmenuOpen ? 'open' : ''}>
                    {itemSubLinks.map((subLinkItem) => (
                      <SubNavItem key={subLinkItem.href}>
                        <SubNavLink 
                          href={subLinkItem.href} 
                          onClick={(e) => handleLinkClick(e, subLinkItem)}
                          className={activeLink === subLinkItem.href ? 'active' : ''}
                        >
                          {t(subLinkItem.labelKey, subLinkItem.defaultLabel)}
                        </SubNavLink>
                      </SubNavItem>
                    ))}
                  </SubNavList>
                )}
              </NavItem>
            );
          })}
        </NavList>



        <ControlsContainer $isCollapsed={!isMobile && isCollapsed} ref={controlsRef}>
          <ControlsTopDivider $phase={iconsFadePhase} $hidden={controlsHidden} />
          <ControlsHoverBackground 
            $top={controlsBg.top}
            $left={controlsBg.left}
            $width={controlsBg.width}
            $height={controlsBg.height}
            $isVisible={controlsBgVisible}
            $animate={controlsBgAnimate}
          />
          <ControlsFade $hidden={controlsHidden}>
          <SocialMediaButton 
             href="https://github.com/AlexisVedia" 
             target="_blank" 
             rel="noopener noreferrer" 
             aria-label="GitHub"
             $isCollapsed={!isMobile && isCollapsed}
             $index={0}
             $total={5}
             $phase={iconsFadePhase}
             onMouseEnter={(e) => { setShowGithubTooltip(true); handleControlHover(e.currentTarget); }}
             onMouseLeave={() => { setShowGithubTooltip(false); handleControlLeave(); }}
             style={{ transitionDelay: getStaggerDelay(0) }}
           >
             <FaGithub />
             <TechTooltip $isVisible={showGithubTooltip} $isDarkMode={theme.isDark} $isCollapsed={!isMobile && isCollapsed} $distance={30}>
               {t('tooltip.github')}
             </TechTooltip>
           </SocialMediaButton>
           <SocialMediaButton 
             href="https://www.linkedin.com/in/alexis-vedia/" 
             target="_blank" 
             rel="noopener noreferrer" 
             aria-label="LinkedIn"
             $isCollapsed={!isMobile && isCollapsed}
             $index={1}
             $total={5}
             $phase={iconsFadePhase}
             onMouseEnter={(e) => { setShowLinkedinTooltip(true); handleControlHover(e.currentTarget); }}
             onMouseLeave={() => { setShowLinkedinTooltip(false); handleControlLeave(); }}
             style={{ transitionDelay: getStaggerDelay(1) }}
           >
             <FaLinkedin />
             <TechTooltip $isVisible={showLinkedinTooltip} $isDarkMode={theme.isDark} $isCollapsed={!isMobile && isCollapsed} $distance={30}>
               {t('tooltip.linkedin')}
             </TechTooltip>
           </SocialMediaButton>
           <SocialMediaButton 
               href="https://x.com/AlexisVedia" 
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="X (Twitter)"
               $isCollapsed={!isMobile && isCollapsed}
               $index={2}
               $total={5}
               $phase={iconsFadePhase}
               onMouseEnter={(e) => { setShowXTooltip(true); handleControlHover(e.currentTarget); }}
               onMouseLeave={() => { setShowXTooltip(false); handleControlLeave(); }}
               style={{ transitionDelay: getStaggerDelay(2) }}
             >
              <FaXTwitter />
              <TechTooltip $isVisible={showXTooltip} $isDarkMode={theme.isDark} $isCollapsed={!isMobile && isCollapsed} $distance={30}>
                {t('tooltip.x')}
              </TechTooltip>
            </SocialMediaButton>
          <ControlsSeparator $isCollapsed={!isMobile && isCollapsed} $phase={iconsFadePhase} />
          <ThemeToggleWrapper 
              $isCollapsed={!isMobile && isCollapsed}
              $index={3}
              $total={5}
              $phase={iconsFadePhase}
              style={{ lineHeight: 1, position: 'relative', transitionDelay: getStaggerDelay(3) }}
              onMouseEnter={(e) => { setShowThemeTooltip(true); handleControlHover(e.currentTarget as HTMLDivElement); }}
              onMouseLeave={() => { setShowThemeTooltip(false); handleControlLeave(); }}
              
            >
              <ThemeToggle />
              <TechTooltip $isVisible={showThemeTooltip} $isDarkMode={theme.isDark} $isCollapsed={!isMobile && isCollapsed} $distance={30}>
                {t('tooltip.toggleTheme')}
              </TechTooltip>
            </ThemeToggleWrapper>
            <LanguageSelectorWrapper 
              $isCollapsed={!isMobile && isCollapsed}
              $index={4}
              $total={5}
              $phase={iconsFadePhase}
              style={{ lineHeight: 1, position: 'relative', transitionDelay: getStaggerDelay(4) }}
              onMouseEnter={(e) => { setShowLanguageTooltip(true); handleControlHover(e.currentTarget as HTMLDivElement); }}
              onMouseLeave={() => { setShowLanguageTooltip(false); handleControlLeave(); }}
            >
              <LanguageSelector isCollapsed={!isMobile && isCollapsed} />
              <TechTooltip $isVisible={showLanguageTooltip} $isDarkMode={theme.isDark} $isCollapsed={!isMobile && isCollapsed} $distance={30}>
                {t('tooltip.selectLanguage')}
              </TechTooltip>
           </LanguageSelectorWrapper>
          </ControlsFade>
        </ControlsContainer>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
