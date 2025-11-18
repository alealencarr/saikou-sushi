import  { useState, useEffect } from 'react';
import { dataDrinks } from '../constants/config';
import SectionWrapper from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};


const DrinkCard = ({ drink }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 sm:p-3"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] cursor-pointer">
        <img 
          src={drink.imagem} 
          alt={drink.altText} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-black/20' : 'bg-black/40'}`}></div>
        <div className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-1/2 md:translate-y-1/3'}`}>
          
        </div>
      </div>
    </div>
  );
};

export const Drinks  = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

 
  useEffect(() => {
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  
  const drinkIndex = (page % dataDrinks.drinks.length + dataDrinks.drinks.length) % dataDrinks.drinks.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <SectionWrapper id="drinks" className="bg-black">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite; /* Aumentei a duração para 40s */
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <SectionTitle className="text-white">
        DRINKS <span className="font-bold text-gold-gradient">EXCLUSIVOS</span>
      </SectionTitle>
      
      <div className="relative">
        {isMobile ? (
          // --- Versão Mobile (Slider com Botões) ---
          <div className="max-w-xs mx-auto">
            <div className="relative h-[450px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  className="absolute w-full h-full"
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                >
                  <DrinkCard drink={dataDrinks.drinks[drinkIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={() => paginate(-1)} className="bg-gold-gradient text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                  <ChevronLeft size={24} />
              </button>
              <button onClick={() => paginate(1)} className="bg-gold-gradient text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                  <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          // --- Versão Desktop (Carrossel Infinito) ---
          <div 
            className="relative w-full overflow-hidden"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex animate-scroll">
              {[...dataDrinks.drinks, ...dataDrinks.drinks].map((drink, i) => (
                <DrinkCard drink={drink} key={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};
