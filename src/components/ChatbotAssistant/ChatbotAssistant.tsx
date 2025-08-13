import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { HiSparkles } from 'react-icons/hi2';
import { FaTrash } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { sendMessageToN8N } from '../../services/n8nService';
import { useTheme } from '../../context/ThemeContext';
import { useN8nConnection, ConnectionStatus } from '@hooks/useN8nConnection';


// Animaciones
const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;



const glowExpand = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

// Resplandor mejorado con múltiples gradientes
const colorShift = keyframes`
  0% {
    background: 
      radial-gradient(ellipse 800px 400px at 50% 100%, 
        rgba(147, 51, 234, 0.15) 0%, 
        rgba(59, 130, 246, 0.1) 25%, 
        rgba(139, 92, 246, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 600px 300px at 30% 80%, 
        rgba(236, 72, 153, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 600px 300px at 70% 80%, 
        rgba(34, 197, 94, 0.08) 0%, 
        transparent 60%);
    transform: scale(1) rotate(0deg);
  }
  12.5% {
    background: 
      radial-gradient(ellipse 850px 425px at 52% 98%, 
        rgba(185, 85, 234, 0.15) 0%, 
        rgba(89, 150, 246, 0.1) 25%, 
        rgba(159, 112, 246, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 650px 325px at 35% 82%, 
        rgba(241, 102, 173, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 650px 325px at 65% 78%, 
        rgba(54, 207, 114, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.02) rotate(1deg);
  }
  25% {
    background: 
      radial-gradient(ellipse 900px 450px at 48% 95%, 
        rgba(239, 68, 68, 0.15) 0%, 
        rgba(147, 51, 234, 0.1) 25%, 
        rgba(59, 130, 246, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 700px 350px at 40% 85%, 
        rgba(245, 158, 11, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 700px 350px at 60% 75%, 
        rgba(168, 85, 247, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.05) rotate(2deg);
  }
  37.5% {
    background: 
      radial-gradient(ellipse 950px 475px at 45% 92%, 
        rgba(242, 88, 88, 0.15) 0%, 
        rgba(167, 71, 234, 0.1) 25%, 
        rgba(79, 150, 246, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 675px 337px at 45% 88%, 
        rgba(200, 138, 31, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 675px 337px at 55% 72%, 
        rgba(148, 105, 247, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.03) rotate(1.5deg);
  }
  50% {
    background: 
      radial-gradient(ellipse 1000px 500px at 52% 88%, 
        rgba(34, 197, 94, 0.15) 0%, 
        rgba(239, 68, 68, 0.1) 25%, 
        rgba(147, 51, 234, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 650px 325px at 60% 90%, 
        rgba(59, 130, 246, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 650px 325px at 40% 70%, 
        rgba(236, 72, 153, 0.08) 0%, 
        transparent 60%);
    transform: scale(1) rotate(0deg);
  }
  62.5% {
    background: 
      radial-gradient(ellipse 925px 462px at 48% 92%, 
        rgba(54, 177, 114, 0.15) 0%, 
        rgba(219, 88, 88, 0.1) 25%, 
        rgba(167, 71, 234, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 675px 337px at 55% 87%, 
        rgba(79, 150, 246, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 675px 337px at 45% 73%, 
        rgba(216, 92, 173, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.02) rotate(-1deg);
  }
  75% {
    background: 
      radial-gradient(ellipse 850px 425px at 55% 95%, 
        rgba(245, 158, 11, 0.15) 0%, 
        rgba(34, 197, 94, 0.1) 25%, 
        rgba(239, 68, 68, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 750px 375px at 35% 75%, 
        rgba(168, 85, 247, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 750px 375px at 65% 85%, 
        rgba(34, 197, 94, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.04) rotate(-2deg);
  }
  87.5% {
    background: 
      radial-gradient(ellipse 825px 412px at 51% 97%, 
        rgba(225, 138, 31, 0.15) 0%, 
        rgba(54, 177, 114, 0.1) 25%, 
        rgba(219, 88, 88, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 675px 337px at 32% 77%, 
        rgba(148, 105, 247, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 675px 337px at 68% 83%, 
        rgba(54, 177, 114, 0.08) 0%, 
        transparent 60%);
    transform: scale(1.01) rotate(-0.5deg);
  }
  100% {
    background: 
      radial-gradient(ellipse 800px 400px at 50% 100%, 
        rgba(147, 51, 234, 0.15) 0%, 
        rgba(59, 130, 246, 0.1) 25%, 
        rgba(139, 92, 246, 0.08) 50%,
        transparent 70%),
      radial-gradient(ellipse 600px 300px at 30% 80%, 
        rgba(236, 72, 153, 0.1) 0%, 
        transparent 60%),
      radial-gradient(ellipse 600px 300px at 70% 80%, 
        rgba(34, 197, 94, 0.08) 0%, 
        transparent 60%);
    transform: scale(1) rotate(0deg);
  }
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

const gentleFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg); 
  }
  25% { 
    transform: translateY(-3px) translateX(1px) rotate(0.5deg); 
  }
  50% { 
    transform: translateY(-6px) translateX(-1px) rotate(-0.5deg); 
  }
  75% { 
    transform: translateY(-3px) translateX(1px) rotate(0.3deg); 
  }
`;

// Styled components
const FloatingInputContainer = styled.div<{ $isExpanded: boolean; $isDark: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ $isExpanded }) => ($isExpanded ? 9998 : 1000)};
  width: ${({ $isExpanded }) => ($isExpanded ? '450px' : '300px')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    left: 16px;
    transform: none;
  }
`;

const GlowOverlay = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9997;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  
  background: ${({ $isDark }) => 
    $isDark 
      ? 'rgba(0, 0, 0, 0.75)' 
      : 'rgba(0, 0, 0, 0.25)'
  };

  /* Desenfoque progresivo - más intenso abajo y desvaneciéndose hacia arriba */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(0px);
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0.1) 60%,
      transparent 90%
    );
  }

  /* Capa de desenfoque progresivo real */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(255, 255, 255, 0.01) 50%,
      transparent 100%
    );
    backdrop-filter: 
      blur(12px) 
      blur(10px) 
      blur(8px) 
      blur(6px) 
      blur(4px) 
      blur(2px) 
      blur(0px);
    mask: linear-gradient(
      to top,
      black 0%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.2) 80%,
      transparent 100%
    );
    -webkit-mask: linear-gradient(
      to top,
      black 0%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.2) 80%,
      transparent 100%
    );
  }

  /* Efecto de resplandor animado */
  .glow-layer {
    position: absolute;
    top: -20%;
    left: -20%;
    right: -20%;
    bottom: -20%;
    transform: scale(1.2);
    animation: ${({ $isVisible }) => $isVisible ? colorShift : 'none'} 8s ease-in-out infinite;
    transition: opacity 0.6s ease;
    filter: blur(2px);
  }
`;

const InputWrapper = styled.div<{ $isExpanded: boolean; $isDark: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ $isDark }) => 
    $isDark 
      ? 'rgba(30, 30, 35, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)'
  };
  border: 1px solid ${({ $isDark }) => 
    $isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${({ $isDark }) => ($isDark ? '0.3' : '0.15')});
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ $isExpanded }) => $isExpanded ? glowExpand : 'none'} 0.4s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, ${({ $isDark }) => ($isDark ? '0.4' : '0.2')});
  }
`;

const ChatInput = styled.input<{ $isDark: boolean; $isExpanded: boolean }>`
  flex: 1;
  padding: 16px 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1a1a1a')};
  
  &::placeholder {
    color: ${({ $isDark }) => 
      $isDark 
        ? 'rgba(255, 255, 255, 0.6)' 
        : 'rgba(0, 0, 0, 0.5)'
    };
  }

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button<{ $isDark: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border: none;
  border-radius: 50%;
  background: ${({ $isDark }) => 
    $isDark 
      ? 'rgba(147, 51, 234, 0.8)' 
      : 'rgba(59, 130, 246, 0.8)'
  };
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: ${({ $isDark }) => 
      $isDark 
        ? 'rgba(147, 51, 234, 1)' 
        : 'rgba(59, 130, 246, 1)'
    };
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

// Nuevo contenedor para mensajes flotantes
const FloatingMessagesContainer = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 450px;
  max-height: 400px;
  pointer-events: none;
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
  padding: 16px;
  position: relative;
  
  /* Ocultar scrollbar completamente */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  /* Máscara de desenfoque progresivo para mensajes que suben */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 10;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.6) 20%,
      rgba(255, 255, 255, 0.3) 40%,
      rgba(255, 255, 255, 0.1) 70%,
      transparent 100%
    );
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
`;

const ChatInterface = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  background: ${({ $isDark }) => 
    $isDark 
      ? 'rgba(20, 20, 25, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)'
  };
  border: 1px solid ${({ $isDark }) => 
    $isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, ${({ $isDark }) => ($isDark ? '0.4' : '0.2')});
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) => 
    $isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
  };
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
`;

const WelcomeBubble = styled.div<{ $isDark: boolean; $isVisible: boolean }>`
  position: relative;
  padding: 20px 24px;
  background: ${({ $isDark }) => 
    $isDark 
      ? 'rgba(147, 51, 234, 0.15)' 
      : 'rgba(59, 130, 246, 0.15)'
  };
  border: 1px solid ${({ $isDark }) => 
    $isDark 
      ? 'rgba(147, 51, 234, 0.4)' 
      : 'rgba(59, 130, 246, 0.4)'
  };
  border-radius: 20px;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1a1a1a')};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  
  animation: ${({ $isVisible }) => $isVisible ? 
    `${floatIn} 0.6s ease-out, ${gentleFloat} 4s ease-in-out infinite 0.6s` : 
    'none'
  };
  
  pointer-events: auto;
  font-size: 15px;
  line-height: 1.5;

  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 32px;
    width: 20px;
    height: 20px;
    background: inherit;
    border-right: 1px solid ${({ $isDark }) => 
      $isDark 
        ? 'rgba(147, 51, 234, 0.4)' 
        : 'rgba(59, 130, 246, 0.4)'
    };
    border-bottom: 1px solid ${({ $isDark }) => 
      $isDark 
        ? 'rgba(147, 51, 234, 0.4)' 
        : 'rgba(59, 130, 246, 0.4)'
    };
    transform: rotate(45deg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: ${({ $isDark }) => 
      $isDark 
        ? 'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))' 
        : 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
    };
    z-index: -2;
    filter: blur(2px);
  }
`;



const MessageBubble = styled.div<{ $isUser: boolean; $isDark: boolean; $index: number }>`
  max-width: 85%;
  padding: 16px 20px;
  border-radius: 20px;
  align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  background: ${({ $isUser, $isDark }) =>
    $isUser
      ? $isDark
        ? 'rgba(147, 51, 234, 0.2)'
        : 'rgba(59, 130, 246, 0.2)'
      : $isDark
        ? 'rgba(40, 40, 45, 0.8)'
        : 'rgba(240, 240, 245, 0.9)'
  };
  border: 1px solid ${({ $isUser, $isDark }) =>
    $isUser
      ? $isDark
        ? 'rgba(147, 51, 234, 0.4)'
        : 'rgba(59, 130, 246, 0.4)'
      : $isDark
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)'
  };
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1a1a1a')};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  animation: ${floatIn} 0.5s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;

  pointer-events: auto;
  font-size: 14px;
  line-height: 1.5;

  ${({ $isUser }) => !$isUser && css`
    animation: ${floatIn} 0.5s ease-out, ${gentleFloat} 6s ease-in-out infinite 0.5s;
  `}

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: ${({ $isUser, $isDark }) =>
      $isUser
        ? $isDark
          ? 'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))'
          : 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
        : 'transparent'
    };
    z-index: -1;
    filter: blur(2px);
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

const ChatHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ $isDark }) => 
    $isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
  };
`;

const HeaderTitle = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1a1a1a')};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IconButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ $isDark }) => ($isDark ? '#ffffff' : '#1a1a1a')};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $isDark }) => 
      $isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'
    };
  }
`;

// Status components
const ConnectionStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  opacity: 0.8;
`;

const StatusDot = styled.div<{ $status: ConnectionStatus; $isDark: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$status) {
      case 'connected':
        return '#22c55e';
      case 'connecting':
        return '#f59e0b';
      case 'disconnected':
        return '#ef4444';
      default:
        return props.$isDark ? '#6b7280' : '#9ca3af';
    }
  }};
  ${props => props.$status === 'connecting' && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
  transition: all 0.3s ease;
`;

const StatusText = styled.span<{ $isDark: boolean }>`
  color: ${({ $isDark }) => ($isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')};
  font-weight: 500;
  text-transform: capitalize;
`;

// Connection components
interface ConnectionStatusTextProps {
  status: ConnectionStatus;
  isDark: boolean;
}

const ConnectionStatusText: React.FC<ConnectionStatusTextProps> = ({ status, isDark }) => {
  const { t } = useTranslation();
  
  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return t('Conectado');
      case 'connecting':
        return t('Conectando...');
      case 'disconnected':
        return t('Desconectado');
      default:
        return t('Desconocido');
    }
  };

  return (
    <ConnectionStatusContainer>
      <StatusDot $status={status} $isDark={isDark} />
      <StatusText $isDark={isDark}>{getStatusText(status)}</StatusText>
    </ConnectionStatusContainer>
  );
};

// Main component
interface ChatbotAssistantProps {
  initialDelay?: number;
  n8nServerReady?: boolean;
}

const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ initialDelay = 500 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  
  // Hook de conexión n8n
  const { connectionStatus } = useN8nConnection();

  // Chat state
  const welcomeMessageKey = '¡Hola! Soy tu AI Portfolio Assistant. ¿En qué puedo ayudarte hoy?';
  const getWelcomeMessage = useCallback(() => {
    return t(welcomeMessageKey);
  }, [t, welcomeMessageKey]);

  const [messages, setMessages] = useState(() => [{ text: t(welcomeMessageKey), isUser: false }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

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

  // Auto scroll messages
  useEffect(() => {
    if (messagesEndRef.current && isExpanded) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

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

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendMessageToN8N(inputValue);
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

  // Handle clear chat
  const handleClearChat = useCallback(() => {
    setMessages([{ text: getWelcomeMessage(), isUser: false }]);
  }, [getWelcomeMessage]);

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <GlowOverlay 
        $isVisible={isExpanded} 
        $isDark={isDark} 
        onClick={(e) => {
          // Cerrar si clickea fuera del contenedor principal
          if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsExpanded(false);
          }
        }} 
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      />

      {/* Mensajes flotantes independientes del contenedor */}
      <FloatingMessagesContainer $isVisible={isExpanded} $isDark={isDark}>
        <FloatingMessagesScrollContainer>
          {!hasBeenExpanded ? (
            <WelcomeBubble $isDark={isDark} $isVisible={isExpanded}>
              {getWelcomeMessage()}
            </WelcomeBubble>
          ) : (
            <>
              {messages.map((message, index) => (
                <MessageBubble key={index} $isUser={message.isUser} $isDark={isDark} $index={index}>
                  {message.isUser ? message.text : <ReactMarkdown>{message.text}</ReactMarkdown>}
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
      >
        {/* Chat Interface - ahora solo header y estado */}
        <ChatInterface $isVisible={isExpanded} $isDark={isDark}>
          <ChatHeader $isDark={isDark}>
            <HeaderTitle $isDark={isDark}>
              <HiSparkles size={20} />
              {t('AI Portfolio Assistant')}
            </HeaderTitle>
            <HeaderActions>
              <IconButton $isDark={isDark} onClick={handleClearChat}>
                <FaTrash size={14} />
              </IconButton>
              <IconButton $isDark={isDark} onClick={() => setIsExpanded(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6L18 18"></path>
                </svg>
              </IconButton>
            </HeaderActions>
          </ChatHeader>

          <div style={{ padding: '0 16px 16px' }}>
            <ConnectionStatusText status={connectionStatus} isDark={isDark} />
          </div>
        </ChatInterface>

        {/* Input Bar */}
        <InputWrapper 
          $isExpanded={isExpanded} 
          $isDark={isDark}
          onClick={handleInputClick}
          style={{ cursor: isExpanded ? 'default' : 'pointer' }}
        >
          <ChatInput
            ref={inputRef}
            type="text"
            placeholder={t('Escribe un mensaje...')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                handleInputClick();
              }
            }}
            $isDark={isDark}
            $isExpanded={isExpanded}
          />
          <SendButton
            $isDark={isDark}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </SendButton>
        </InputWrapper>
      </FloatingInputContainer>
    </>
  );
};

export default ChatbotAssistant;
