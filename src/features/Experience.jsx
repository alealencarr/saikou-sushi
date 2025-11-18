import SectionWrapper from "../components/SectionWrapper";
import { motion } from 'framer-motion';
import { cardContainerVariants } from "../components/CardContainerVariants";
import { cardItemVariants } from "../components/CardItemVariants";
import { ChefHat, Sparkle } from 'lucide-react';
import { PATHS } from "../constants/config";

const Experience = () => (
  <SectionWrapper id="sobre" className="bg-black text-white py-20 md:py-24">
    <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
   
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono">NOSSA <span className="font-bold text-gold-gradient">FILOSOFIA</span></h2>
        <p className="text-zinc-300 text-base sm:text-lg mb-10">
          No <span className="text-white font-semibold">Saikou Sushi</span>, acreditamos que a culinária é uma forma de arte. Nossa missão é honrar a tradição japonesa, adicionando um toque de modernidade e criatividade para criar sabores inesquecíveis.
        </p>

        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
       
          <motion.div 
            variants={cardItemVariants}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:shadow-[#B8860B]/10 hover:shadow-2xl hover:-translate-y-1 border border-zinc-800"
          >
     
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4">
          
              <div className="flex-shrink-0 rounded-full bg-zinc-800 p-3 ring-2 ring-[#B8860B]/50 transition-all duration-300 group-hover:ring-[#B8860B] group-hover:bg-[#B8860B]/10">
                <ChefHat className="h-6 w-6 text-[#FFDF70]" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white">TRADIÇÃO E ARTE</h4>
                <p className="text-sm text-zinc-400">Pratos clássicos executados com maestria.</p>
              </div>
            </div>
          </motion.div>
          
       
          <motion.div 
            variants={cardItemVariants}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:shadow-[#B8860B]/10 hover:shadow-2xl hover:-translate-y-1 border border-zinc-800"
          >
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 rounded-full bg-zinc-800 p-3 ring-2 ring-[#B8860B]/50 transition-all duration-300 group-hover:ring-[#B8860B] group-hover:bg-[#B8860B]/10">
                <Sparkle className="h-6 w-6 text-[#FFDF70]" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white">TOQUE CRIATIVO</h4>
                <p className="text-sm text-zinc-400">Inovação que surpreende o paladar.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

     
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative"
      >
        <img 
          src={PATHS.images} 
          alt="Foto do interior do restaurante Saikou Sushi." 
          className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-zinc-700"
          loading="lazy" 
        />
       
        <div className="absolute -inset-2 rounded-2xl border-2 border-[#B8860B]/20 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100" style={{ clipPath: 'polygon(0 0, 10% 0, 10% 10%, 0 10%, 0 0, 100% 0, 100% 10%, 90% 10%, 90% 0, 100% 0, 100% 100%, 90% 100%, 90% 90%, 100% 90%, 100% 100%, 0 100%, 0 90%, 10% 90%, 10% 100%, 0 100%)' }}></div>
      </motion.div>

    </div>
  </SectionWrapper>
);

export default Experience;