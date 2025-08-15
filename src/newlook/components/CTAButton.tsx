import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const splitText = (text: string) => {
  return text.split('').map((char, index) => (
    <CharWrapper key={index} style={{ '--char-index': index } as React.CSSProperties}>
      <CharInner>{char === ' ' ? '\u00A0' : char}</CharInner>
    </CharWrapper>
  ));
};

const CTAButton: React.FC<CTAButtonProps> = ({ children, onClick }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const text = typeof children === 'string' ? children : 'Más acerca de mí';

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const background = button.querySelector('.background');
    const clip = button.querySelector('.clip');

    const ctx = gsap.context(() => {
      gsap.set(background, { scale: 0.5, opacity: 0 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: button.closest('.info-blocks-container') || button,
          start: 'top bottom-=10%',
          once: true,
        }
      });

      tl.to(background, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power3.out' })
        .from(clip, { opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.5);

    }, buttonRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton ref={buttonRef} onClick={handleClick}>
      <Clip className="clip">
        <Word>{splitText(text)}</Word>
        <Word>{splitText(text)}</Word>
      </Clip>
      <Background className="background" />
    </StyledButton>
  );
};

const StyledButton = styled.a`
  position: relative;
  z-index: 1;
  color: #FCFCFC;
  padding-inline: 2.87rem;
  height: 4.28rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  border-radius: 9999px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 500;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #141414;
  z-index: -1;
  border-radius: 9999px;
  transform-origin: center;
  transition: transform 0.6s cubic-bezier(0, 0, 0, 1);
  
  ${StyledButton}:hover & {
    transform: scale(1.125);
  }
`;

const Clip = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
`;

const CharWrapper = styled.div`
  --char-index: 0;
`;

const CharInner = styled.div`
  display: inline-block;
  transition: transform 0.7s cubic-bezier(0, 0, 0.2, 1);
  transition-delay: calc(var(--char-index) * 0.0101s);
`;

const Word = styled.div`
  display: flex;
  
  &:last-of-type {
    position: absolute;
    top: 0;
    left: 0;
    
    ${CharInner} {
      transform: translateY(110%);
    }
  }
  
  ${StyledButton}:hover &:first-of-type ${CharInner} {
    transform: translateY(-110%);
  }
  
  ${StyledButton}:hover &:last-of-type ${CharInner} {
    transform: translateY(0%);
  }
`;

export default CTAButton;