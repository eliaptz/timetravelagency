import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            ⏳ TimeTravel Agency
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => scrollToSection('destinations')}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réserver
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
