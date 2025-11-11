import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis with minimal options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    });

    // Make lenis accessible globally for scrollTo functionality
  (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
};
