import { useEffect, useRef, useState } from 'react';

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

export const useOptimizedScroll = (options: LenisOptions = {}) => {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadLenis = async () => {
      if (typeof window === 'undefined') return;

      // Esperar a que la página esté completamente cargada
      const waitForLoad = () => {
        return new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', () => resolve(), { once: true });
          }
        });
      };

      await waitForLoad();

      // Cargar Lenis solo después de que todo esté cargado
      if (!window.Lenis) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js';
        script.async = true;
        script.defer = true;
        
        try {
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        } catch (error) {
          console.warn('Lenis no pudo cargarse, usando scroll nativo');
          return;
        }
      }

      // Configuración optimizada y suave
      if (window.Lenis && !lenisRef.current) {
        const smoothOptions = {
          duration: options.duration ?? 0.6, // más responsivo por defecto
          easing: options.easing ?? ((t: number) => t), // lineal por defecto para trackpad
          direction: 'vertical' as const,
          gestureDirection: 'vertical' as const,
          smooth: options.smooth !== false,
          mouseMultiplier: options.mouseMultiplier ?? 1,
          smoothTouch: options.smoothTouch !== false,
          touchMultiplier: options.touchMultiplier ?? 1.25,
          infinite: false,
          autoResize: options.autoResize !== false,
          ...options
        };

        lenisRef.current = new window.Lenis(smoothOptions);

        // Agregar clases CSS
        document.documentElement.classList.add('lenis');
        if (smoothOptions.smooth) {
          document.documentElement.classList.add('lenis-smooth');
        }

        // RAF estándar para mejor rendimiento
        const raf = (time: number) => {
          lenisRef.current?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };
        
        rafRef.current = requestAnimationFrame(raf);
        setIsLoaded(true);
      }
    };

    // Cargar después de un pequeño delay para asegurar que todo esté listo
    const timeoutId = setTimeout(() => {
      loadLenis();
    }, 100);

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
      setIsLoaded(false);
    };
  }, []);

  return { lenis: lenisRef.current, isLoaded };
};
