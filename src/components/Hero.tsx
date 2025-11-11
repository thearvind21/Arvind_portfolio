import { forwardRef, Suspense, lazy, useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import ErrorBoundary from './ErrorBoundary';

const Globe3D = lazy(() => import('./Globe3D'));
const Grid3D = lazy(() => import('./Grid3D'));

interface HeroProps {
  scrollToSection?: (sectionId: string) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ scrollToSection }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const { reducedMotion } = useTheme();
  const [enable3D, setEnable3D] = useState(false);
  const canWebGL = useMemo(() => {
    if (typeof document === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || !canWebGL) return;
    const activate = () => setEnable3D(true);
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout?: number }) => void }).requestIdleCallback(activate, { timeout: 1000 });
    } else {
      setTimeout(activate, 250);
    }
  }, [reducedMotion, canWebGL]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg)] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            mixBlendMode: 'normal'
          }}
        />
      </div>

      {/* Optional 3D background: prefer lightweight R3F grid, fallback to globe */}
      {enable3D && (
        <ErrorBoundary
          fallback={
            <Suspense fallback={null}>
              <div className="absolute inset-0 pointer-events-none">
                <Globe3D />
              </div>
            </Suspense>
          }
        >
          <Suspense fallback={null}>
            <div className="absolute inset-0 pointer-events-none">
              <Grid3D />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tighter"
            style={{ color: 'var(--fg)' }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
          >
            ARVIND
          </motion.h1>
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tighter -mt-4"
            style={{ color: 'rgba(var(--fg-rgb,255,255,255),0.6)' }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.645, 0.045, 0.355, 1] }}
          >
            PADYACHI
          </motion.h2>
        </motion.div>

        {/* Role description */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light" style={{ color: 'rgba(var(--fg-rgb,255,255,255),0.7)' }}>
            I turn ideas into sleek, responsive, and meaningful digital experiences that connect and inspire.
          </p>


        </motion.div>

        {/* CTA section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-8">
          <motion.button
            onClick={() => scrollToSection?.('projects')}
            className="group relative inline-flex items-center space-x-4 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore My Work</span>
            <motion.div
              className="w-4 h-4 border-t border-r border-white transform rotate-45 transition-transform group-hover:translate-x-1"
              transition={{ duration: 0.2 }}
            />
          </motion.button>

        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
