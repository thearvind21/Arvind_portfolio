import React, { forwardRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import dtdsImg from '../image/DTDS.png';
import defroxImg from '../image/Defrox.png';
import bookingImg from '../image/Booking.png';

type Category = 'all' | 'security' | 'web';

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, 'all'>;
  year: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl?: string;
  metrics?: string[];
}

const Projects = forwardRef<HTMLElement>((_props, ref) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    margin: '-100px',
  });

  const projects: Project[] = [
    {
      id: 1,
      title: 'DTDS',
      category: 'security',
      year: '2024',
      description: 'AI-powered threat detection system with real-time monitoring and automated response capabilities.',
      tech: ['Python', 'TensorFlow', 'React', 'WebSocket'],
      image: dtdsImg,
      // githubUrl: 'https://github.com/yourusername/dtds',
    },
    {
      id: 2,
      title: 'DefroxPot Honeypot',
      category: 'security',
      year: '2023',
      description: 'Advanced honeypot system for detecting and analyzing cyber threats in real-time environments.',
      tech: ['Python', 'Flask', 'Django'],
      image: defroxImg,
      githubUrl: 'https://github.com/thearvind21/DefroxPot',
    },
    {
      id: 3,
      title: 'Movie Booking Platform',
      category: 'web',
      year: '2023',
      description: 'Modern cinema booking platform with real-time seat selection and payment integration.',
      tech: ['HTML', 'PHP', 'CSS', 'JavaScript ','MySQL'],
      image: bookingImg,
      githubUrl: 'https://github.com/thearvind21/movie-ticket-booking-main',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'security', label: 'Security' },
    { id: 'web', label: 'Web Apps' },
  ] as const;

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      ref={ref}
      className="py-20 bg-[var(--bg)] relative overflow-hidden"
    >
  <div className="max-w-6xl mx-auto px-5 lg:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[var(--fg)] mb-6 tracking-tighter">
              Projects 
            </h2>
            <div className="w-20 h-px mx-auto mb-10" style={{ backgroundColor: 'var(--fg)' }}></div>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-[color:var(--fg)]/60">
              A collection of projects that showcase my expertise in cybersecurity, 
              full-stack development, and innovative problem-solving.
            </p>
          </motion.div>

          {/* Filter Categories */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex items-center space-x-8 border rounded-full p-2" style={{ borderColor: 'var(--border)' }}>
              {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                      isActive
                        ? ''
                        : 'text-[color:var(--fg)]/60 hover:text-[color:var(--fg)]'
                    }`}
                    style={isActive ? { color: 'var(--bg)' } : undefined}
                    aria-pressed={isActive}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: 'var(--fg)' }}
                      layoutId="activeCategory"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  {/* Project Image */}
                  <motion.div 
                    className={`group relative overflow-hidden ${
                      index % 2 === 1 ? 'lg:col-start-2' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="relative w-full h-40 md:h-48 lg:h-56 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>

                  {/* Project Info */}
                  <motion.div 
                    className={`space-y-3 ${
                      index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-xs font-mono" style={{ color: 'rgba(var(--fg-rgb,255,255,255),0.4)' }}>
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="uppercase tracking-wider">{project.category}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight" style={{ color: 'var(--fg)' }}>
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-center mx-auto max-w-xl" style={{ color: 'rgba(var(--fg-rgb,255,255,255),0.6)' }}>
                      {project.description}
                    </p>

                    {/* Optional metrics, rendered only when provided */}
                    {project.metrics?.length ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.metrics.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 text-xs font-mono rounded-full"
                            style={{ backgroundColor: 'var(--bg-alt)', color: 'rgba(var(--fg-rgb,255,255,255),0.7)' }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                            className="px-2 py-0.5 text-xs font-mono rounded-full"
                            style={{ backgroundColor: 'var(--bg-alt)', color: 'rgba(var(--fg-rgb,255,255,255),0.6)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.githubUrl && (
                      <motion.button
                        onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                        className="group inline-flex items-center space-x-3 font-medium tracking-wider uppercase text-sm border-b transition-all duration-300 cursor-pointer"
                        style={{ color: 'var(--fg)', borderColor: 'var(--border)' }}
                        aria-label={`Open ${project.title} on GitHub`}
                        whileHover={{ x: 5 }}
                      >
                        <span>View Project</span>
                        <motion.div
                          className="w-4 h-4 border-t border-r transform rotate-45"
                          style={{ borderColor: 'var(--fg)' }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
