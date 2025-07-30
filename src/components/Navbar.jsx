import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Portfolio', to: '/portfolio' },
    { name: 'Skills', to: '/skills' },
    { name: 'PixelStore', to: '/pixelstore' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    
    <header className={`bg-black sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <h1 className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors duration-300 font-special-gothic">
            🎬 richpixel
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-gray-300 hover:text-red-500 font-medium transition-colors duration-300 relative group font-special-gothic text-lg ${
                  location.pathname === link.to ? 'text-red-500' : ''
                }`}
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-red-500 focus:outline-none transition duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-95 shadow-lg px-4 pt-2 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="block px-3 py-3 rounded-md text-lg font-medium text-gray-300 hover:text-red-500 hover:bg-gray-900 transition-colors duration-300 font-special-gothic"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
