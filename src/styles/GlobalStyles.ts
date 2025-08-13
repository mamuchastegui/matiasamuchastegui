import { createGlobalStyle } from 'styled-components';
import './fonts.css';
import './typography.css';


const interFontsUrl =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
const manropeFontsUrl =
  'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap';


const addFontLink = (url: string) => {
  if (!document.querySelector(`link[href="${url}"]`)) {
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
};


addFontLink(interFontsUrl);
addFontLink(manropeFontsUrl);


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
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
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
    font-size: ${({ theme }) => theme.fontSizes.lg}; /* 18px como en el ejemplo */
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    color: inherit;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(2.25rem, 5vw, 3.75rem); /* text-4xl a text-6xl responsive */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1.1;
    letter-spacing: -0.025em; /* tracking-tight */
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['3xl']}; /* 30px */
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.2;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* 20px */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1.3;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
  }

  h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.lg}; /* 18px */
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
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
