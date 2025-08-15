import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Lenis: any;
  }
}

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
  wrapper?: HTMLElement;
  content?: HTMLElement;
}

export const useLenis = (options: LenisOptions = {}) => {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const loadLenis = async () => {
      if (typeof window === 'undefined') return;

      // Cargar Lenis desde CDN con lazy loading
      if (!window.Lenis) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js';
        script.async = true;
        script.defer = true;
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Configuración ultra-optimizada para mejor rendimiento
      if (window.Lenis && !lenisRef.current) {
        const performanceOptions = {
          duration: 0.25, // Ultra-rápido: 0.25s
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical' as const,
          gestureDirection: 'vertical' as const,
          smooth: true,
          mouseMultiplier: 0.8, // Reducido para menos sensibilidad
          smoothTouch: false, // Desactivado para evitar conflictos táctiles
          touchMultiplier: 0.5, // Ultra-reducido
          infinite: false,
          autoResize: true,
          ...options
        };

        lenisRef.current = new window.Lenis(performanceOptions);

        // Agregar clases CSS
        document.documentElement.classList.add('lenis');
        if (performanceOptions.smooth) {
          document.documentElement.classList.add('lenis-smooth');
        }

        // RAF optimizado con throttling
        let lastTime = 0;
        const raf = (time: number) => {
          if (time - lastTime >= 16.67) { // ~60fps máximo
            lenisRef.current?.raf(time);
            lastTime = time;
          }
          rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);
      }
    };

    // Delay inicial para permitir que la página cargue completamente
    const timeoutId = setTimeout(() => {
      loadLenis();
    }, 300);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return lenisRef.current;
};