const baseTheme = {
  fonts: {
    body: "var(--font-satoshi, 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif)",
    heading: "var(--font-satoshi, 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif)",
  },
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px - Base size
    md: '1rem',        // 16px - Alias for base
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px - Improved scale
    '4xl': '2.5rem',   // 40px - Improved scale  
    '5xl': '3.5rem',   // 56px - Improved scale
    '6xl': '4.5rem',   // 72px - Improved scale
    '7xl': '6rem',     // 96px - Improved scale
    '8xl': '8rem',     // 128px - Improved scale
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '4rem',
    '3xl': '8rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#0070f3',
    secondary: '#1c1c1e',
    background: '#212121',
    sidebarBackground: '#171717',
    text: '#ffffff',
    accent: '#7928ca',
    cardBackground: '#252830',
    inputBg: '#2a2e36',
    border: '#3a3f4b',
    success: '#2ecc71',
    error: '#e74c3c',
  },
  isDark: true,
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#0070f3',
    secondary: '#f5f5f7',
    background: '#FFFFFF',
    sidebarBackground: '#F9F9F9',
    text: '#1D1F23',
    accent: '#7928ca',
    cardBackground: '#f8f9fa',
    inputBg: '#f2f3f5',
    border: '#e1e4e8',
    success: '#2ecc71',
    error: '#e74c3c',
  },
  isDark: false,
};

export const theme = darkTheme;

export type Theme = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
