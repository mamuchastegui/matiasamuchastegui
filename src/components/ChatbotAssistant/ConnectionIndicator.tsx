import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ConnectionStatus } from '@hooks/useN8nConnection';

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
  isDark: boolean;
}

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.6; transform: scale(0.8); }
`;

const ConnectionDot = styled.div<{ $status: ConnectionStatus; $isDark: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 10;
  
  background-color: ${
    props => {
      switch (props.$status) {
        case 'connected':
          return '#10B981'; // Verde
        case 'connecting':
          return '#F59E0B'; // Amarillo
        case 'disconnected':
          return '#EF4444'; // Rojo
        default:
          return '#6B7280'; // Gris
      }
    }
  };
  
  ${props => props.$status === 'connecting' && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
  
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status, isDark }) => {
  return <ConnectionDot $status={status} $isDark={isDark} />;
};

export default ConnectionIndicator;