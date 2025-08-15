import React, { useMemo } from 'react';
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
  deblurWords?: boolean;
}

const TypewriterContainer = styled.span`
  display: inline;
  position: relative;
`;

const WordSpan = styled.span`
  display: inline;
  transition: filter 220ms ease;
  filter: blur(2px);

  &.complete {
    filter: blur(0px);
  }

  &.current {
    filter: blur(2px);
  }
`;


const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 15,
  delay = 0,
  onComplete,
  className,
  useMarkdown = true,
  deblurWords = true,
}) => {
  const { displayText, isComplete } = useTypewriter(text, {
    speed,
    delay,
    onComplete
  });
  
  const tokens = useMemo(() => {
    const result: { t: string; isSpace: boolean; start: number; end: number; i: number }[] = [];
    let idx = 0;
    const parts = text.split(/(\s+)/);
    parts.forEach((part, i) => {
      const isSpace = /^\s+$/.test(part);
      const start = idx;
      const end = idx + part.length;
      result.push({ t: part, isSpace, start, end, i });
      idx = end;
    });
    return result;
  }, [text]);

  // no markdown component overrides in this variant


  return (
    <TypewriterContainer className={className}>
      {isComplete && useMarkdown ? (
        <ReactMarkdown>{text}</ReactMarkdown>
      ) : deblurWords ? (
        tokens.map(({ t, isSpace, start, end, i }) => {
          const typedLen = displayText.length;
          if (typedLen <= start) {
            return null;
          }
          if (typedLen >= end) {
            return (
              <WordSpan key={i} className={isSpace ? 'space complete' : 'complete'}>
                {t}
              </WordSpan>
            );
          }
          const visible = t.slice(0, Math.max(0, typedLen - start));
          return (
            <WordSpan key={i} className={isSpace ? 'space current' : 'current'}>
              {visible}
            </WordSpan>
          );
        })
      ) : (
        useMarkdown ? <ReactMarkdown>{displayText}</ReactMarkdown> : displayText
      )}
    </TypewriterContainer>
  );
};

export default TypewriterText;
