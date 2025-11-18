import SectionWrapper from "../components/SectionWrapper";
import { ArrowRight , ShoppingBag }from 'lucide-react';
import { IFOOD_LINKS } from "../constants/config";
import { motion } from 'framer-motion';

export const Delivery = () => (
  <SectionWrapper id="delivery" className="bg-zinc-950 text-zinc-400 py-12 md:py-16 font-sans border-t-1 border-gold">  
    
    <div className="relative max-w-3xl mx-auto text-center">
      
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center mb-6">
          <span className="flex items-center justify-center w-16 h-16 bg-gray-900 border border-gray-700/50 rounded-full">
            <ShoppingBag className="icon-gold" size={32} />
          </span>
        </div>
  
        <h2 className="flex justify-center items-baseline gap-2 md:gap-3 font-bold text-white mb-4">
          <span className="text-3xl md:text-4xl">PEÇA NO</span> 
          <span className="text-gold-gradient text-3xl md:text-5xl">iFood</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
          Escolha sua unidade preferida e receba o melhor do Saikou 
          em minutos, no conforto da sua casa.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
   
          <motion.a
            href={IFOOD_LINKS.VELEIROS}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gold-gradient text-black py-4 px-10 rounded-full text-lg font-bold transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-[#B8860B]/30"
            whileHover={{ scale: 1.05, backgroundPosition: '100% 0' }}
          >
            FAZER PEDIDO (Veleiros)
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
  
          <motion.a
            href={IFOOD_LINKS.DUTRA}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border-2 border-gray-700 text-gray-300 py-[14px] px-10 rounded-full text-lg font-bold transition-all duration-300 hover:border-[#B8860B] hover:text-[#FFDF70]"
            whileHover={{ scale: 1.05 }}
          >
            FAZER PEDIDO (Dutra)
             <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);