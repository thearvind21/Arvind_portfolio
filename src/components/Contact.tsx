import React, { forwardRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = forwardRef<HTMLElement>((_props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    margin: '-100px',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    
    try {
      // Formspree integration with your form ID
      const response = await fetch('https://formspree.io/f/xvgqvagj', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'arvindpadyachi1@gmail.com',
      href: 'mailto:arvindpadyachi1@gmail.com',
    },
    {
      label: 'Phone',
      value: '+91 7303855170',
      href: 'tel:+917303855170',
    },
    {
      label: 'Location',
      value: 'Mumbai, India',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      value: '@thearvind21',
      href: 'https://github.com/thearvind21',
    },
    {
      label: 'LinkedIn',
      value: 'Arvind Padyachi',
      href: 'https://www.linkedin.com/in/arvind-padyachi/',
    },
  ];

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
      className="py-32 bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-24"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tighter">
              LET'S CONNECT
            </h2>
            <div className="w-24 h-px bg-white mx-auto mb-16"></div>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed text-center">
              Ready to discuss your next project? I'm always open to new opportunities 
              and interesting conversations about technology and security.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <motion.div 
            variants={itemVariants} 
            className="grid lg:grid-cols-2 gap-16 lg:gap-24"
          >
            {/* Contact Information */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                  GET IN TOUCH
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="group block space-y-2 hover:opacity-70 transition-opacity"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-white/40 text-sm uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-white text-lg font-light">
                        {item.value}
                      </div>
                      <div className="h-px bg-white/10 group-hover:bg-white/30 transition-colors w-full"></div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                  SOCIAL
                </h3>
                <div className="space-y-6">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block space-y-2 hover:opacity-70 transition-opacity"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-white/40 text-sm uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-white text-lg font-light">
                        {item.value}
                      </div>
                      <div className="h-px bg-white/10 group-hover:bg-white/30 transition-colors w-full"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                SEND MESSAGE
              </h3>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="from_name"
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-4 focus:border-white focus:outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="from_email"
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-4 focus:border-white focus:outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-4 focus:border-white focus:outline-none transition-colors text-lg font-light"
                      required
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-4 focus:border-white focus:outline-none transition-colors resize-none text-lg font-light"
                      required
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm">
                    Failed to send message. Please try again or email me directly.
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group inline-flex items-center space-x-4 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-white/50 text-black/50 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <motion.div
                    className="w-4 h-4 border-t border-r border-black transform rotate-45 transition-transform group-hover:translate-x-1"
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
