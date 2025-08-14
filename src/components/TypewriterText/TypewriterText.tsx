import React from 'react';
import styled from 'styled-components';
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

const TypewriterContainer = styled.span`
  display: inline;
  position: relative;
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
