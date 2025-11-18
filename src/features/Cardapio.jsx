import  { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { dataCardapio } from '../constants/config';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft,  Download, ExternalLink } from 'lucide-react';
import { OrderButton } from '../components/OrderButton';

const Cardapio = () => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const nextPrato = () => setIndex((prev) => (prev + 1) % dataCardapio.cardapioDestaque.length);
    const prevPrato = () => setIndex((prev) => (prev - 1 + dataCardapio.cardapioDestaque.length) % dataCardapio.cardapioDestaque.length);

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(nextPrato, 5000);
        return () => clearInterval(timer);
    }, [index, isPlaying]);

    return (
        <SectionWrapper 
            id="cardapio" 
            className="bg-black py-16" 
            style={{ backgroundImage: `radial-gradient(circle at top right, rgba(184, 134, 11, 0.1), transparent 40%)`}} // Trocado vermelho por dourado
        >
            <SectionTitle className="text-white text-center text-3xl mb-12">NOSSO <span className="font-bold text-gold-gradient">CARDÁPIO</span></SectionTitle>
            
            <div 
                className="relative max-w-5xl mx-auto px-4"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
            >
             
                <div className="relative h-[350px] md:h-[500px] overflow-hidden mb-8">
                    {dataCardapio.cardapioDestaque.map((prato, i) => {
                        const offset = i - index;
                        const zIndex = dataCardapio.cardapioDestaque.length - Math.abs(offset);
                        
                        return (
                            <motion.div
                                key={i}
                                className="absolute w-[70%] md:w-[60%] h-full top-0 left-[15%] md:left-[20%]"
                                initial={false}  
                                animate={{
                                    x: `${offset * 60}%`,  
                                    scale: i === index ? 1 : 0.75,  
                                    opacity: i === index ? 1 : 0.3,  
                                    zIndex: zIndex,  
                                }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            >
                                <img
                                    src={prato.imagem}
                                    alt={prato.altText}
                                    className="w-full h-full object-cover rounded-lg border-2 border-zinc-800 shadow-xl"
                                />
                            </motion.div>
                        );
                    })}
                       <button onClick={prevPrato} className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-50"><ChevronLeft size={24} /></button>
                       <button onClick={nextPrato} className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-50"><ChevronRight size={24} /></button>
                </div>

                 
                <OrderButton />
            </div>

            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 px-3 ">
           
                <motion.a
                  href={dataCardapio.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-gold-gradient text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"    
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(251, 191, 36, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                 <ExternalLink size={20} />
                  <span className="text-sm md:text-base">VISUALIZAR CARDÁPIO COMPLETO</span>
                </motion.a>

                 
                <motion.a
                  href={dataCardapio.pdfUrl}
                  download={dataCardapio.cardapioName}
                  className="inline-flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border-2 border-zinc-700 hover:border-[#FFDF70]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  <span className="text-sm md:text-base">BAIXAR CARDÁPIO</span>
                </motion.a>
            </div>
        </SectionWrapper>
    );
};

export default Cardapio;