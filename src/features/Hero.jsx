import { motion } from 'framer-motion';
import { 
  ArrowDownCircle,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      {/* Vídeo de Fundo */}
      <video
        src="SaikouDutra360.mp4"
        autoPlay
        loop
        muted
        playsInline  
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        preload="auto"  
      />
      
      <div className="absolute inset-0 bg-black/60 z-10"></div>
 
      <motion.div
        className="relative z-20 flex flex-col items-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        
            <motion.div
            
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src= "LOGO.png" 
              alt="Saikou Sushi Logo" 
              className="h-20 sm:h-50 md:h-50 w-auto"
            />
          </motion.div>
        <h1 className={`text-3xl md:text-7xl lg:text-6xl font-black tracking-tighter text-gold-gradient`}>
          SAIKOU SUSHI
        </h1>
        
        <p className={`mt-6 max-w-xl text-lg md:text-xl text-gray-200`}>
          A experiência premium da culinária japonesa.
        </p>
        <motion.a
          href="#sobre"
          className={`mt-12 border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
        >
          VER MAIS
        </motion.a>
      </motion.div>
      
   
      <motion.a
        href="#sobre"
        className="absolute bottom-10 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDownCircle size={36} className="text-white" />
      </motion.a>
    </section>
  );
};

export default Hero;