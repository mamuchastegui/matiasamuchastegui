import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { sendMessageToN8N } from '../../services/n8nService';
import { useTheme } from '../../context/ThemeContext';
import TypewriterText from '../TypewriterText';

// Animaciones
const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

// Nueva animación Apple-style para el input
// const slideUpSpring = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(20px) scale(0.95);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0) scale(1);
//   }
// `;

// Nueva variante con un pequeño overshoot tipo iOS
const slideUpSpringPunch = keyframes`
  0% { opacity: 0; transform: translateY(24px) scale(0.94); }
  60% { opacity: 1; transform: translateY(-6px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;



// Nueva animación para globos flotantes
const floatIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
`;

// removed unused gentleFloat keyframes

// Styled components
const FloatingInputContainer = styled.div<{ 
  $isExpanded: boolean; 
  $isDark: boolean;
  $isSidebarPresent?: boolean;
  $isSidebarCollapsed?: boolean;
}>`
  position: fixed;
  bottom: 20px;
  left: ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
    if (!$isSidebarPresent) return '50%';
    const sidebarWidth = $isSidebarCollapsed ? '80px' : '280px';
    return `calc(50% + ${sidebarWidth} / 2)`;
  }};
  transform: translateX(-50%);
  z-index: 10000;
  width: ${({ $isExpanded }) => ($isExpanded ? '450px' : '300px')};
  transition: transform 0.22s ease, width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    left: 16px;
    transform: none;
  }
  
  /* Hover lift when chat is closed (smooth) */
  ${({ $isExpanded }) => !$isExpanded && css`
    &:hover {
      transform: translateX(-50%) translateY(-3px);
    }
  `}
`;

// Overlay fijo para blur y fondo negro/transparente - NO se mueve con sidebar
const FixedBlurOverlay = styled.div<{
  $isVisible: boolean;
  $isDark: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  backdrop-filter: ${({ $isVisible }) => ($isVisible ? 'blur(6px)' : 'blur(0px)')};
  -webkit-backdrop-filter: ${({ $isVisible }) => ($isVisible ? 'blur(6px)' : 'blur(0px)')};
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: ${({ $isVisible, $isDark }) => $isVisible 
    ? `linear-gradient(
        to top,
        ${$isDark ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 0.98)'} 0%,
        ${$isDark ? 'rgba(0, 0, 0, 0.90)' : 'rgba(255, 255, 255, 0.85)'} 25%,
        ${$isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.58)'} 50%,
        ${$isDark ? 'rgba(0, 0, 0, 0.40)' : 'rgba(255, 255, 255, 0.34)'} 75%,
        transparent 100%
      )`
    : 'transparent'};
  will-change: opacity, backdrop-filter;
`;

// Resplandor de colores que SÍ se mueve con el sidebar
const ColorGlowOverlay = styled.div<{ 
  $isVisible: boolean; 
  $isDark: boolean;
  $isSidebarPresent?: boolean;
  $isSidebarCollapsed?: boolean;
}>`
  position: fixed;
  top: 0;
  /* Ocupa siempre todo el ancho de la ventana */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: transparent;
  will-change: opacity, transform;

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
  }

  @keyframes colorShift {
    0%, 100% {
      filter: hue-rotate(0deg) brightness(1) saturate(1.2);
    }
    25% {
      filter: hue-rotate(15deg) brightness(1.1) saturate(1.4);
    }
    50% {
      filter: hue-rotate(-10deg) brightness(0.95) saturate(1.1);
    }
    75% {
      filter: hue-rotate(8deg) brightness(1.05) saturate(1.3);
    }
  }

  

  /* Resplandor principal */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    /* Lower the glow a bit */
    top: 64%;
    z-index: 2;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    animation: ${({ $isVisible }) => ($isVisible ? 'colorShift 10s ease-in-out infinite both, float 8s ease-in-out infinite' : 'none')};
    filter: blur(3px);
    transition: opacity 1.2s ease, transform 1.2s ease;
    pointer-events: none;
    will-change: opacity, transform;
    mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 90%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 90%);
    background:
      ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
        const expanded = $isSidebarPresent && !$isSidebarCollapsed;
        const size1 = expanded ? '1400px 520px' : '950px 420px';
        const size2 = expanded ? '900px 380px' : '720px 320px';
        const leftFiller = expanded
          ? `, radial-gradient(ellipse 900px 380px at 0% 108%, rgba(59,130,246,0.10) 0%, transparent 70%)`
          : '';
        return `radial-gradient(ellipse ${size1} at 50% 100%, rgba(59,130,246,0.38) 0%, rgba(56,189,248,0.32) 35%, rgba(37,99,235,0.26) 60%, transparent 75%),
                radial-gradient(ellipse ${size2} at 28% 112%, rgba(14,165,233,0.26) 0%, transparent 70%),
                radial-gradient(ellipse ${size2} at 72% 112%, rgba(2,132,199,0.26) 0%, transparent 70%)${leftFiller}`;
      }};
    background-repeat: no-repeat;
    background-size: cover, cover, cover;
    background-position: 
      ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
        const expanded = $isSidebarPresent && !$isSidebarCollapsed;
        const offset = expanded ? '140px' : '0px';
        const base = `calc(50% + ${offset}) 100%, calc(30% + ${offset}) 110%, calc(70% + ${offset}) 110%`;
        return expanded ? `${base}, 0% 110%` : base;
      }};
  }

  /* Resplandor secundario */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    /* Lower the secondary glow slightly more */
    top: 72%;
    z-index: 1;
    opacity: ${({ $isVisible }) => ($isVisible ? 0.7 : 0)};
    animation: ${({ $isVisible }) => ($isVisible ? 'colorShift 12s ease-in-out infinite reverse, float 10s ease-in-out infinite reverse' : 'none')};
    filter: blur(8px);
    transition: opacity 1.5s ease;
    pointer-events: none;
    will-change: opacity, transform;
    mask-image: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 75%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 75%);
    background:
      ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
        const expanded = $isSidebarPresent && !$isSidebarCollapsed;
        const size1 = expanded ? '1100px 420px' : '800px 350px';
        const size2 = expanded ? '820px 300px' : '600px 250px';
        const leftFiller = expanded
          ? `, radial-gradient(ellipse 820px 300px at 0% 106%, rgba(99,102,241,0.08) 0%, transparent 60%)`
          : '';
        return `radial-gradient(ellipse ${size1} at 50% 100%, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.20) 40%, transparent 70%),
                radial-gradient(ellipse ${size2} at 35% 105%, rgba(168,85,247,0.18) 0%, transparent 60%),
                radial-gradient(ellipse ${size2} at 65% 105%, rgba(59,130,246,0.18) 0%, transparent 60%)${leftFiller}`;
      }};
    background-repeat: no-repeat;
    background-size: cover, cover, cover;
    background-position:
      ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
        const expanded = $isSidebarPresent && !$isSidebarCollapsed;
        const offset = expanded ? '140px' : '0px';
        const base = `calc(50% + ${offset}) 100%, calc(35% + ${offset}) 105%, calc(65% + ${offset}) 105%`;
        return expanded ? `${base}, 0% 105%` : base;
      }};
  }
  
  /* Smooth hover lift when chat is closed */
  ${({ $isExpanded }) => !$isExpanded && css`
    &:hover {
      transform: translateX(-50%) translateY(-3px);
    }
  `}
`;

const InputWrapper = styled.div<{ $isExpanded: boolean; $isDark: boolean; $animate: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 0; /* base for hover lift when closed */
  background: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.88)')};
  border: ${({ $isDark }) => ($isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)')};
  border-radius: 32px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${({ $isDark }) => $isDark ? '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)' : '0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)'};
  /* Transición suave para el lift en hover */
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  will-change: transform, box-shadow;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    /* Neutral grayish accent instead of bluish */
    background: ${({ $isDark }) => 
      `radial-gradient(600px 300px at 50% 0%, ${$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}, transparent)`
    };
    pointer-events: none;
    border-radius: 32px;
  }
  /* Estado inicial: oculto y ligeramente desplazado; se corrige al animar */
  opacity: ${({ $animate }) => ($animate ? 1 : 0)};
  transform: ${({ $animate }) => ($animate ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.94)')};
  /* Animación al aparecer el input (primer render) */
  animation: ${({ $animate }) => ($animate ? slideUpSpringPunch : 'none')} 2500ms cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;

  /* Hover lift only when chat is closed */
  /* Hover lift is handled on FloatingInputContainer to avoid transform conflicts */
`;

// Nuevo keyframe para el efecto shiny del placeholder
const shine = keyframes`
  from { background-position: -125% 0; }
  to { background-position: 125% 0; }
`;

const ChatInput = styled.input<{ $isDark: boolean; $isExpanded: boolean }>`
  flex: 1;
  padding: 16px 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: ${({ $isDark, $isExpanded }) => (
    $isExpanded ? ($isDark ? '#ffffff' : '#000000') : ($isDark ? '#ffffff' : 'rgba(30, 30, 30, 0.8)')
  )};
  cursor: ${({ $isExpanded }) => ($isExpanded ? 'text' : 'pointer')};
  position: relative;
  z-index: 1;
  
  &::placeholder {
    color: transparent; /* usamos el overlay para mantener color y tipografía */
    position: relative;
    z-index: 1;
  }

  &:focus {
    outline: none;
    color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  }
`;

// Nuevo componente para el overlay del efecto shiny del placeholder
const ShinyPlaceholderOverlay = styled.div<{ $isDark: boolean; $hasValue: boolean; $isFocused: boolean; $isExpanded: boolean }>`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  font-family: inherit;
  white-space: nowrap;
  z-index: 0;
  opacity: ${({ $hasValue }) => ($hasValue ? 0 : 1)};
  transition: opacity 0.2s ease;
  
  color: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(30, 30, 30, 0.6)')};
  
  &::before {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) calc(50% - 12% / 2),
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) calc(50% + 12% / 2),
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 225% 100%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    filter: drop-shadow(0 0 0.2em rgba(255, 255, 255, 0.15));
    /* Mantener la dirección original del brillo (reverse) cuando corresponde */
    animation: ${({ $isFocused, $isExpanded }) => ($isFocused || $isExpanded) ? 'none' : css`${shine} 3.5s linear infinite reverse 5s`};
    will-change: background-position;
    transform: translateZ(0);
  }
`;

// Nueva animación especial para mensaje de bienvenida 
const welcomeEntrance = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.85) rotateY(-15deg);
    filter: blur(8px);
  }
  30% {
    opacity: 0.6;
    transform: translateY(15px) scale(0.95) rotateY(-5deg);
    filter: blur(4px);
  }
  60% {
    opacity: 0.9;
    transform: translateY(-8px) scale(1.02) rotateY(2deg);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateY(0deg);
    filter: blur(0px);
  }
`;

const SendButton = styled.button<{ $isDark: boolean; $isExpanded: boolean; $hasValue: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border: none;
  border-radius: 50%;
  /* Transparent background so the SVG circle defines the visual shape (avoids any ring) */
  background: transparent;
  color: inherit;
  cursor: ${({ $isExpanded, disabled }) => (!$isExpanded ? 'pointer' : (disabled ? 'not-allowed' : 'pointer'))};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $isExpanded, disabled }) => ($isExpanded && disabled ? 0.5 : 1)};
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
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

  /* No hover animations for send button */
  &:hover { }

  &:active:not(:disabled) {
    /* Remove press/click visual effect */
    transform: none;
    transition: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;



// Nuevo contenedor para mensajes flotantes
const FloatingMessagesContainer = styled.div<{ 
  $isVisible: boolean; 
  $isDark: boolean;
  $isSidebarPresent?: boolean;
  $isSidebarCollapsed?: boolean;
}>`
  position: fixed;
  /* Reduce gap between messages and input */
  bottom: 72px;
  left: ${({ $isSidebarPresent, $isSidebarCollapsed }) => {
    if (!$isSidebarPresent) return '50%';
    const sidebarWidth = $isSidebarCollapsed ? '80px' : '280px';
    return `calc(50% + ${sidebarWidth} / 2)`;
  }};
  transform: translateX(-50%);
  z-index: 9999;
  width: 450px;
  max-height: 400px;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    left: 16px;
    transform: none;
  }
`;

const FloatingMessagesScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Aleja el contenido del fade superior para que el primer mensaje no se oculte al tope */
  padding: 28px 16px 16px;
  position: relative;
  touch-action: pan-y;

  /* Un pequeño margen extra para el primer mensaje */
  & > *:first-child {
    margin-top: 8px;
  }
  
  /* Fade-out superior un poco más amplio: 0 antes del borde, sin línea */
  mask-image: linear-gradient(
    to top,
    rgba(0,0,0,1) 78%,
    rgba(0,0,0,0.4) 90%,
    rgba(0,0,0,0.15) 96%,
    rgba(0,0,0,0) 99%,
    rgba(0,0,0,0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0,0,0,1) 78%,
    rgba(0,0,0,0.4) 90%,
    rgba(0,0,0,0.15) 96%,
    rgba(0,0,0,0) 99%,
    rgba(0,0,0,0) 100%
  );
  
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

// Textura de ruido para efecto acrílico tipo Windows 11


const MessageBubble = styled.div<{ $isUser: boolean; $isDark: boolean; $index: number }>`
  position: relative;
  max-width: 85%;
  padding: ${({ $isUser }) => $isUser ? '6px 13px' : '12px 16px'};
  border-radius: 24px;
  align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  
  /* Efecto translúcido para mensajes del usuario */
  background: ${({ $isUser, $isDark }) =>
    $isUser
      ? $isDark
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(255, 255, 255, 0.15)'
      : 'transparent'
  };
  
  /* Múltiples capas de glassmorphism */
  background-size: 200px 200px, 100%;
  background-repeat: repeat, no-repeat;
  
  /* Borde con efecto de cristal - MÁS VISIBLE */
  border: ${({ $isUser, $isDark }) =>
    $isUser
      ? $isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(200, 200, 200, 0.4)'
      : 'transparent'
  };
  
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  
  /* Backdrop filter solo para mensajes del usuario */
  backdrop-filter: ${({ $isUser }) => $isUser ? 'blur(20px) saturate(180%) brightness(110%)' : 'none'};
  -webkit-backdrop-filter: ${({ $isUser }) => $isUser ? 'blur(20px) saturate(180%) brightness(110%)' : 'none'};
  
  /* Sombras solo para mensajes del usuario */
  box-shadow: ${({ $isUser }) => $isUser ? `
    0 8px 32px rgba(0, 0, 0, 0.22),
    0 2px 8px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15)
  ` : 'none'};

  /* Tipografía unificada */
  font-size: 14px;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fonts.body};

  /* Normalización del Markdown */
  & :where(p) {
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
  }
  & :where(p + p) {
    margin-top: 0.5em;
  }
  & :where(ul, ol, li, code, pre, strong, em, a) {
    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
  }
  & :where(h1, h2, h3, h4, h5, h6) {
    font-size: 1em;
    line-height: inherit;
    font-weight: 600;
    margin: 0;
  }

  /* Mensajes del usuario: sin delay y animación más rápida */
  animation: ${({ $index, $isUser }) => 
    $isUser
      ? css`${floatIn} 0.3s ease-out`
      : ($index === 0
          ? css`${welcomeEntrance} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
          : css`${floatIn} 0.5s ease-out`)
  };
  animation-delay: ${props => props.$isUser ? '0s' : (props.$index === 0 ? '0s' : `${props.$index * 0.1}s`)};
  animation-fill-mode: both;

  pointer-events: auto;

  /* Removemos el movimiento continuo (gentleFloat) en mensajes de la AI */
  ${({ $isUser, $index }) => !$isUser && $index !== 0 && css`
    animation: ${css`${floatIn} 0.5s ease-out`};
  `}

  ${({ $isUser, $index }) => !$isUser && $index === 0 && css`
    animation: ${css`${welcomeEntrance} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`};
  `}

  /* Pseudo-elemento para resplandor adicional en burbujas del usuario */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: 'transparent';
    z-index: -1;
    opacity: 0.6;
  }

  /* Efecto de resplandor exterior para burbujas del usuario */
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 26px;
    background: 'transparent';
    z-index: -2;
    filter: blur(6px);
    opacity: 0.4;
  }
`;

const LoadingDot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
  animation: ${pulse} 1s infinite;
  animation-delay: ${props => props.$delay}s;
`;

// Main component
interface ChatbotAssistantProps {
  initialDelay?: number;
  n8nServerReady?: boolean;
  isSidebarPresent?: boolean;
  isSidebarCollapsed?: boolean;
}

const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ 
  initialDelay = 0, 
  isSidebarPresent = false, 
  isSidebarCollapsed = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  // Nuevo: estado para disparar animación inicial del input
  const [inputAnimated, setInputAnimated] = useState(false);

  // Chat state
  const getWelcomeMessage = useCallback(() => {
    const lang = (i18n?.language || 'es').toLowerCase();
    if (lang.startsWith('en')) {
      return `Hi, I’m Alexis Vedia’s assistant. Developed with n8n and powered by AI, I’m here to help.\n\nWould you like a tour of projects, to talk about the stack, or to explore ideas for your next step?`;
    }
    return `Hola, soy el asistente de Alexis Vedia. Desarrollado con n8n y potenciado por IA, estoy acá para ayudarte.\n\n¿Te muestro proyectos, hablamos del stack o exploramos ideas para tu próximo paso?`;
  }, [i18n?.language]);

  // Placeholder según idioma
  const getPlaceholder = useCallback(() => {
    const lang = (i18n?.language || 'es').toLowerCase();
    if (lang.startsWith('en')) return 'Tell me how I can help…';
    return 'Contame en qué te ayudo…';
  }, [i18n?.language]);

  const [messages, setMessages] = useState(() => [{ text: getWelcomeMessage(), isUser: false }]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Cuando el overlay sea visible, disparamos la animación del input con un pequeño delay
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setInputAnimated(true), 0);
    return () => clearTimeout(t);
  }, [isVisible]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isExpanded && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  // Close on ESC key when expanded
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Reset welcome message when language changes
  useEffect(() => {
    const newWelcome = getWelcomeMessage();
    setMessages([{ text: newWelcome, isUser: false }]);
    setHasBeenExpanded(false);
    setIsTyping(false);
    setInputValue('');
    setAutoScrollEnabled(true);
  }, [i18n?.language, getWelcomeMessage]);

  // Auto scroll messages
  useEffect(() => {
    if (messagesEndRef.current && isExpanded && autoScrollEnabled) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded, autoScrollEnabled]);

  // Handle scroll detection to disable auto-scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
      
      // If user scrolls up, disable auto-scroll
      if (!isAtBottom) {
        setAutoScrollEnabled(false);
      } else {
        // If user scrolls back to bottom, re-enable auto-scroll
        setAutoScrollEnabled(true);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Smooth auto-scroll while content grows (e.g., typewriter)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !isExpanded) return;

    let rafId: number | null = null;

    const scrollToBottom = () => {
      if (!autoScrollEnabled) return;
      // Scroll only if we're near the bottom or auto-scroll explicitly on
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    };

    const scheduleScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        scrollToBottom();
      });
    };

    const observer = new MutationObserver(() => {
      // Any change in messages (including text updates) triggers a scheduled scroll
      scheduleScroll();
    });

    observer.observe(scrollContainer, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [isExpanded, autoScrollEnabled]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isExpanded]);

  // Handle input click
  const handleInputClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setHasBeenExpanded(true);
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    
    // Add user message immediately
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInputValue('');
    
    // Re-enable auto-scroll when sending a new message
    setAutoScrollEnabled(true);
    
    setIsTyping(true);

    try {
      const response = await sendMessageToN8N(userMessage);
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setIsTyping(false);
      
      setMessages(prev => [
        ...prev,
        {
          text: '❌ **Error de conexión**\n\nHubo un problema al comunicarse con el servidor. Por favor, intenta de nuevo en unos momentos.',
          isUser: false,
        },
      ]);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay fijo para blur y fondo negro - NO se mueve con sidebar */}
      <FixedBlurOverlay 
        $isVisible={isExpanded || inputFocused} 
        $isDark={isDark}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsExpanded(false);
          }
        }}
      />
      
      {/* Resplandor de colores que SÍ se mueve con el sidebar */}
      <ColorGlowOverlay 
        $isVisible={isExpanded || inputFocused} 
        $isDark={isDark}
        $isSidebarPresent={isSidebarPresent}
        $isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Mensajes flotantes independientes del contenedor */}
      <FloatingMessagesContainer 
        $isVisible={isExpanded} 
        $isDark={isDark}
        $isSidebarPresent={isSidebarPresent}
        $isSidebarCollapsed={isSidebarCollapsed}
      >
        <FloatingMessagesScrollContainer ref={scrollContainerRef}>
          {!hasBeenExpanded ? (
            <MessageBubble $isUser={false} $isDark={isDark} $index={0}>
              <ReactMarkdown>{getWelcomeMessage()}</ReactMarkdown>
            </MessageBubble>
          ) : (
            <>
              {messages.map((message, index) => (
                <MessageBubble key={index} $isUser={message.isUser} $isDark={isDark} $index={index}>
                  {message.isUser ? (
                    message.text
                  ) : (
                    <TypewriterText
                      text={message.text}
                      speed={10}
                      delay={index === 0 ? 700 : 50}
                    />
                  )}
                </MessageBubble>
              ))}
              {isTyping && (
                <MessageBubble $isUser={false} $isDark={isDark} $index={messages.length}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <LoadingDot key={i} $delay={delay} />
                    ))}
                  </div>
                </MessageBubble>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </FloatingMessagesScrollContainer>
      </FloatingMessagesContainer>
      
      <FloatingInputContainer 
        ref={containerRef}
        $isExpanded={isExpanded} 
        $isDark={isDark}
        $isSidebarPresent={isSidebarPresent}
        $isSidebarCollapsed={isSidebarCollapsed}
      >
        {/* Input Bar */}
        <InputWrapper 
          $isExpanded={isExpanded} 
          $isDark={isDark}
          $animate={inputAnimated}
          onClick={handleInputClick}
          style={{ cursor: isExpanded ? 'text' : 'pointer' }}
        >
          <ChatInput
            ref={inputRef}
            type="text"
            placeholder={getPlaceholder()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                handleInputClick();
              }
            }}
            $isDark={isDark}
            $isExpanded={isExpanded}
          />
          <ShinyPlaceholderOverlay
            $isDark={isDark}
            $hasValue={!!inputValue}
            $isFocused={inputFocused}
            $isExpanded={isExpanded}
            data-text={getPlaceholder()}
          >
            {getPlaceholder()}
          </ShinyPlaceholderOverlay>
          <SendButton
            $isDark={isDark}
            $isExpanded={isExpanded}
            $hasValue={!!inputValue.trim()}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                handleInputClick();
                return;
              }
              handleSendMessage();
            }}
            disabled={isExpanded ? !inputValue.trim() : false}
            aria-label={t('Enviar mensaje')}
          >

<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{border: 'none', outline: 'none'}}>
  <circle cx="20" cy="20" r="16" fill={isDark ? '#ffffff' : '#000000'} stroke="none" strokeWidth="0"/>
  <path d="M20 26 V14" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
  <path d="M14 20 L20 14 L26 20" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
</svg>

          </SendButton>
        </InputWrapper>
      </FloatingInputContainer>
    </>
  );
};

export default ChatbotAssistant;
