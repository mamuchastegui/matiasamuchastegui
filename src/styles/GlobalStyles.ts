import { createGlobalStyle } from 'styled-components';
import './fonts.css';
import './typography.css';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    height: 100%;
    font-size: 16px;
  }

  /* Lenis Smooth Scrolling Styles */
  html.lenis {
    height: auto;
  }

  html.lenis-smooth {
    scroll-behavior: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }

  body {
    margin: 0;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    min-height: 100%;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    overflow-x: hidden; 
    transition: background 0.5s ease, color 0.3s ease; 
    
    @media (max-width: 768px) {
      padding: 0 0.75rem;
    }
    
    @media (max-width: 480px) {
      padding: 0 0.5rem;
    }
  }

  p {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.lg}; /* 18px - mejor para legibilidad */
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: inherit;
    margin-bottom: 1rem;
  }

  /* Jerarquía tipográfica moderna y escalada */
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['5xl']}); /* 56px max responsive */
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1.5rem 0;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['4xl']}; /* 40px */
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.snug};
    letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1.25rem 0;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['3xl']}; /* 32px */
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.snug};
    letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
  }

  h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']}; /* 24px */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.75rem 0;
  }

  h5 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* 20px */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.5rem 0;
  }

  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.lg}; /* 18px */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.5rem 0;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 4px;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
