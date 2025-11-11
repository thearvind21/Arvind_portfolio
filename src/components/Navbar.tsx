import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-md border-b bg-white/80 dark:bg-black/80 border-black/10 dark:border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-black dark:text-white text-xl font-medium tracking-wider hover:opacity-70 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Go to home"
            >
              ARVIND PADYACHI
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-wider transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-black dark:text-white' 
                      : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-black dark:bg-white"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Resume Download Button */}
              <motion.button
                type="button"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Arvind_Final.pdf';
                  link.download = 'Arvind_Padyachi_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="group relative inline-flex items-center space-x-2 px-6 py-3 border text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:text-white dark:hover:bg-white/10 dark:hover:text-white"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Download resume"
              >
                <span>Resume</span>
                <motion.div
                  className="w-3 h-3 border-t border-r border-current transform rotate-45 transition-transform group-hover:translate-x-0.5"
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              {/* Theme Toggle removed per request */}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className="md:hidden p-2 text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
            {/* Mobile Theme Toggle removed per request */}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-light text-white tracking-wider hover:opacity-70 transition-opacity"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Mobile Resume Download */}
              <motion.button
                type="button"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Arvind_Final.pdf';
                  link.download = 'Arvind_Padyachi_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-8 px-8 py-4 border border-white/20 text-white text-sm font-medium tracking-wider uppercase hover:bg-white/10 hover:text-white transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                aria-label="Download resume"
              >
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;