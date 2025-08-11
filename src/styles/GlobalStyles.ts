import { createGlobalStyle } from 'styled-components';
import './fonts.css';


const latoFontsUrl =
  'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap';
const openSansFontsUrl =
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap';


const addFontLink = (url: string) => {
  if (!document.querySelector(`link[href="${url}"]`)) {
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
};


addFontLink(latoFontsUrl);
addFontLink(openSansFontsUrl);


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
    /* Fondo base con degradado moderno */
    background: 
      /* Degradado principal */
      linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.background} 0%,
        ${({ theme }) => theme.isDark 
          ? 'rgba(15, 15, 20, 1) 25%, rgba(10, 10, 15, 1) 50%, rgba(15, 15, 20, 1) 75%'
          : 'rgba(250, 250, 255, 1) 25%, rgba(245, 245, 250, 1) 50%, rgba(250, 250, 255, 1) 75%'
        },
        ${({ theme }) => theme.colors.background} 100%
      ),
      /* Degradado secundario para profundidad */
      radial-gradient(
        ellipse at top left,
        ${({ theme }) => theme.isDark 
          ? 'rgba(30, 20, 50, 0.3) 0%, transparent 50%'
          : 'rgba(200, 220, 255, 0.2) 0%, transparent 50%'
        }
      ),
      radial-gradient(
        ellipse at bottom right,
        ${({ theme }) => theme.isDark 
          ? 'rgba(50, 20, 30, 0.2) 0%, transparent 50%'
          : 'rgba(255, 200, 220, 0.15) 0%, transparent 50%'
        }
      );
    
    background-attachment: fixed;
    background-size: 100% 100%, 150% 150%, 120% 120%;
    
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    min-height: 100%;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden; 
    transition: background 0.5s ease, color 0.3s ease; 
  }


  p {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    color: inherit;
    margin-bottom: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
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
