import React, { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = forwardRef<HTMLElement>((_props, ref) => {
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    margin: '-100px',
  });  const containerVariants = {
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
  };  const skills = [
    { name: 'Frontend Development', percentage: 85 },
    { name: 'Cybersecurity', percentage: 60 },
    { name: 'Backend Systems', percentage: 60 },
    { name: 'Python Developer', percentage: 70 },
  ];  return (
    <section
      ref={ref}
      className="py-24 md:py-28 lg:py-32 bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-24 md:space-y-28 lg:space-y-32"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              About Me
            </h2>
            <div className="w-16 h-px bg-white/60 mx-auto mb-12" />
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-8 text-center">
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed mx-auto max-w-3xl">
              Hey, I’m Arvind Padyachi — a full‑stack developer who loves creating smart, efficient, and meaningful digital experiences.
            </p>
            <p className="text-base md:text-lg text-white/60 leading-relaxed mx-auto max-w-3xl">
              I enjoy turning ideas into beautiful, functional products using Python, Django, Flask, and modern web technologies. I’m passionate about clean code, creative problem‑solving, and building things that make an impact.
            </p>
            <p className="text-sm md:text-base text-white/50 tracking-wide uppercase">
              Always learning. Always building.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="space-y-12 text-center">
              <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">
                EXPERTISE
              </h3>
              <div className="space-y-8 max-w-3xl mx-auto">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    className="space-y-3 max-w-xl mx-auto text-left"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 text-base md:text-lg font-light">{skill.name}</span>
                      <span className="text-white/60 text-sm font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="h-px bg-white/10 relative">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-white"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.percentage}%` } : {}}
                        transition={{ delay: index * 0.1 + 0.8, duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div variants={itemVariants} className="text-center">
            <blockquote className="text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mx-auto">
              "Security isn't just about protection—it's about enabling innovation 
              with confidence and building systems that people can trust."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl"></div>
    </section>
  );
});

About.displayName = 'About';

export default About;