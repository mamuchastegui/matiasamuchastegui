import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from '../../hooks/useTypewriter';

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  useMarkdown?: boolean;
}

// Animación del cursor parpadeante
const fadeIn = keyframes`
  from {
    opacity: 0;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
`;

const TypewriterContainer = styled.span`
  display: inline;
  position: relative;
  
  & > * {
    animation: ${fadeIn} 0.3s ease-out;
  }
`;



const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 15,
  delay = 0,
  onComplete,
  className,
  useMarkdown = true
}) => {
  const { displayText } = useTypewriter(text, {
    speed,
    delay,
    onComplete
  });

  return (
    <TypewriterContainer className={className}>
      {useMarkdown ? (
        <ReactMarkdown>{displayText}</ReactMarkdown>
      ) : (
        displayText
      )}
    </TypewriterContainer>
  );
};

export default TypewriterText;