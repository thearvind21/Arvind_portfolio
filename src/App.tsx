import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SiteFooter from './components/SiteFooter';
import { useLenis } from './hooks/useLenis';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scrolling
  useLenis();

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = {
    hero: heroRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.entries(sectionRefs);
      const scrollPosition = window.scrollY + 100;

      for (const [sectionName, ref] of sections) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref.current) {
      // Use Lenis scrollTo method for smooth scrolling
  const lenis = (window as unknown as { lenis?: { scrollTo: (el: HTMLElement) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(ref.current);
      } else {
        // Fallback to native smooth scroll
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">      
      <Navbar 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <main id="content">
        <Hero ref={heroRef} scrollToSection={scrollToSection} />
        <About ref={aboutRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
