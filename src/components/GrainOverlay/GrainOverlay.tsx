import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación para el degradado de malla
const meshGradientAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

// Animación sutil para las partículas flotantes
const floatingParticles = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
`;

const GrainElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 1;
  
  /* Degradado de malla moderno con múltiples capas */
  background: 
    /* Capa de textura granular */
    url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"),
    /* Degradado de malla principal */
    radial-gradient(circle at 20% 80%, rgba(120, 40, 200, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 100, 150, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(50, 150, 255, 0.1) 0%, transparent 50%),
    /* Degradado base dinámico */
    linear-gradient(
      135deg,
      rgba(30, 30, 35, 0.95) 0%,
      rgba(25, 25, 30, 0.98) 25%,
      rgba(20, 20, 25, 0.99) 50%,
      rgba(25, 25, 30, 0.98) 75%,
      rgba(30, 30, 35, 0.95) 100%
    );
  
  background-size: 
    200px 200px,
    800px 800px,
    600px 600px,
    400px 400px,
    400% 400%;
  
  background-position:
    0 0,
    0% 0%,
    100% 100%,
    50% 50%,
    0% 50%;
  
  animation: ${meshGradientAnimation} 20s ease-in-out infinite;
  
  /* Efectos adicionales según el tema */
  ${({ theme }) => theme.isDark 
    ? `
      filter: brightness(0.9) contrast(1.1);
      backdrop-filter: blur(0.5px);
    ` 
    : `
      filter: brightness(1.1) contrast(0.9);
      backdrop-filter: blur(0.3px);
    `}
  
  /* Partículas flotantes decorativas */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 50% 10%, rgba(120, 40, 200, 0.03) 2px, transparent 2px),
      radial-gradient(circle at 10% 90%, rgba(255, 100, 150, 0.025) 1.5px, transparent 1.5px);
    background-size: 100px 100px, 150px 150px, 200px 200px, 120px 120px;
    animation: ${floatingParticles} 15s ease-in-out infinite;
    opacity: 0.6;
  }
  
  /* Efecto de desenfoque de cristal sutil */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.005) 50%,
      transparent 70%
    );
    background-size: 300px 300px;
    animation: ${meshGradientAnimation} 25s linear infinite reverse;
  }
`;

const GrainOverlay: React.FC = () => {
  return <GrainElement />;
};

export default GrainOverlay;