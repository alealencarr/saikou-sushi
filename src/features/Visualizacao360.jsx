import { motion } from 'framer-motion';
import { cardContainerVariants } from '../components/CardContainerVariants';
import { videos360Data } from '../constants/config';
import { cardItemVariants } from '../components/CardItemVariants';

export const Visualizacao360 = () => {
  return (
 
    <section id="visualizacao-360" className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
      
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
   
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">
            VISUALIZAÇÃO <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFDF70] to-[#B8860B]">360º</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Conheça nossas unidades Veleiros e Dutra por dentro.
          </p>
        </motion.div>
 
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
        
          {videos360Data.map((video) => (
            <motion.div 
              key={video.id}
              variants={cardItemVariants}
              className="group bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-[#B8860B]/50 hover:shadow-2xl hover:shadow-[#B8860B]/10"
            >
              
              <div className="relative aspect-video bg-zinc-800">
                <video
                  className="w-full h-full object-cover"
                  src={video.videoSrc}
                  poster={video.posterSrc}
                  controls
                  preload="metadata"
                  controlsList="nodownload"  
                >
                  Seu navegador não suporta o tag de vídeo.
                </video>
              </div>
    
              <div className="p-6">
                <h3 className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#FFDF70] to-[#B8860B]">
                  {video.name}
                </h3>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
