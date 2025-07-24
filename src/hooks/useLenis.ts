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

      // Cargar Lenis desde CDN si no está disponible
      if (!window.Lenis) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js';
        script.async = true;
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Inicializar Lenis
      if (window.Lenis && !lenisRef.current) {
        const defaultOptions = {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical' as const,
          gestureDirection: 'vertical' as const,
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          autoResize: true,
          ...options
        };

        lenisRef.current = new window.Lenis(defaultOptions);

        // Agregar clases CSS
        document.documentElement.classList.add('lenis');
        if (defaultOptions.smooth) {
          document.documentElement.classList.add('lenis-smooth');
        }

        // Función de animación
        const raf = (time: number) => {
          lenisRef.current?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);
      }
    };

    loadLenis();

    // Cleanup
    return () => {
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