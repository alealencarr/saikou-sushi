import { navLinks } from "../constants/config";
import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X} from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => { 
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/70 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto max-w-12x2 px-4 sm:px-12 lg:px-8 py-5">
          <div className="flex justify-between items-center">
          
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-3 text-2xl font-bold text-white tracking-wider`}
            >
              <img
                src="LOGO.png"
                alt="Saikou Sushi Logo"
                className="h-12 w-auto"
              />
            
              
              <b className={`text-gold-gradient`}>
                SAIKOU 
              </b>
              SUSHI
            </motion.a>
       
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-gray-200 hover:text-gold-gradient transition-colors`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
 
            <div className="hidden md:block">
              <motion.a
                href="#contato"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gold-gradient text-black py-3 px-10 rounded-full text-sm 
                font-bold hover:brightness-110 transition-all duration-300`}
              >
                RESERVAR
              </motion.a>
            </div>
 
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </nav>
      </header>  

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[60] md:hidden"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-0 right-0 h-full w-3/4 bg-gray-950 p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={toggleMobileMenu}
                className={`absolute top-4 right-4 text-gray-200`}
              >
                <X size={30} />
              </button>
              
              <div className="flex flex-col space-y-6 mt-16">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className={`text-2xl font-light text-white hover:text-gold-gradient`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#locations"
                  onClick={toggleMobileMenu}
                  className={`mt-6 bg-gold-gradient text-black py-3 px-6 rounded-full text-center font-semibold hover:brightness-110 transition-all duration-300`}
                >
                  Reservar
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
