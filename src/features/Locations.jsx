import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  ArrowRight, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

  import { locationsData } from "../constants/config";
import { SectionTitle } from "../components/SectionTitle";

// --- 1. MOCK DATA (Dados de Exemplo com Vídeos) ---
 
// --- 2. VARIANTES DE ANIMAÇÃO ---
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- 3. COMPONENTES VISUAIS (Wrapper e Title) ---
const SectionWrapper = ({ children, className, id }) => (
  <section id={id} className={`py-20 px-6 ${className}`}>
    <div className="container mx-auto">{children}</div>
  </section>
);

// --- 4. O NOVO COMPONENTE: MODAL DE VÍDEO ---
const VideoGalleryModal = ({ isOpen, onClose, location }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  if (!isOpen || !location) return null;

  const videos = location.videos || [];
  const hasMultipleVideos = videos.length > 1;

  const nextVideo = (e) => {
    e?.stopPropagation();
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = (e) => {
    e?.stopPropagation();
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Fecha ao clicar fora
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        >
          {/* Botão Fechar */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all z-50"
          >
            <X size={32} />
          </button>

          {/* Container do Player */}
          <div 
            className="relative w-full max-w-5xl aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no player
          >
            {videos.length > 0 ? (
              <motion.video
                key={currentVideoIndex} // Importante: força reload do player ao mudar vídeo
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={videos[currentVideoIndex]}
                controls
                autoPlay
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Sem vídeos disponíveis.
              </div>
            )}

            {/* Navegação (Setas) */}
            {hasMultipleVideos && (
              <>
                <button 
                  onClick={prevVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-[#B8860B] transition-colors backdrop-blur-sm group"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-[#B8860B] transition-colors backdrop-blur-sm group"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Indicadores (Bolinhas) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/40 rounded-full backdrop-blur-sm">
                  {videos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentVideoIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentVideoIndex ? 'w-8 bg-[#B8860B]' : 'w-2 bg-gray-500 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Info da Unidade no Modal */}
          <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <h3 className="text-2xl font-bold text-white mb-1">{location.name}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              Vídeo {currentVideoIndex + 1} de {videos.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 5. COMPONENT PRINCIPAL ---
export const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white">
      
      {/* Componente do Modal (Renderizado condicionalmente) */}
      <VideoGalleryModal 
        isOpen={!!selectedLocation} 
        onClose={() => setSelectedLocation(null)} 
        location={selectedLocation} 
      />

      <SectionWrapper id="locations" className="bg-black">
          <SectionTitle className="text-white" subtitle="Nossas Casas" title="Visite Nossas Unidades" >
         NOSSAS <span className="font-bold text-gold-gradient">UNIDADES</span>
       </SectionTitle>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {locationsData.map((loc) => (
            <motion.div 
              key={loc.name}
              variants={cardItemVariants}
              className="group bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-800 transition-all duration-500 hover:border-[#B8860B]/50 hover:shadow-2xl hover:shadow-[#B8860B]/20"
            >
              {/* ÁREA DA IMAGEM (Clicável) */}
              <div 
                className="relative overflow-hidden h-80 cursor-pointer"
                onClick={() => setSelectedLocation(loc)}
              >
                <img
                  src={loc.img}
                  alt={`Ambiente do ${loc.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
                />
                
                {/* Overlay do Botão Play */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-full border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-500 mb-3 hover:bg-[#B8860B] hover:border-[#B8860B]">
                    <Play size={32} className="text-white fill-white ml-1" />
                  </div>
                  <span className="text-white font-medium tracking-[0.2em] text-sm uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Assistir vídeos
                  </span>
                </div>

                {/* Badge "Vídeo Tour" (Sempre visível) */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg z-20">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    {loc.videos.length} Vídeos
                  </span>
                </div>

                {/* Gradiente inferior suave */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
              </div>
              
              {/* CONTEÚDO DO CARD */}
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#B8860B]">{loc.name}</h3>
                </div>
                
                <div className="space-y-4 text-zinc-400 mb-8">
                  <div className="flex items-start gap-3 group/item">
                    <MapPin size={18} className="text-[#B8860B] mt-1 flex-shrink-0 group-hover/item:text-white transition-colors" />
                    <span className="group-hover/item:text-zinc-200 transition-colors">{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-3 group/item">
                    <Phone size={18} className="text-[#B8860B] mt-1 flex-shrink-0 group-hover/item:text-white transition-colors" />
                    <span className="group-hover/item:text-zinc-200 transition-colors">{loc.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                  <a
                    href={loc.mapLink}
                    target="_blank"
                  rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors group/link"
                  >
                    ABRIR MAPA
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  <button
                    onClick={() => setSelectedLocation(loc)}
                    className="text-sm font-bold text-[#B8860B] hover:text-[#FFDF70] flex items-center gap-2 transition-colors"
                  >
                    <Play size={14} className="fill-current" />
                    VER VÍDEOS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

export default Locations;

// import SectionWrapper  from "../components/SectionWrapper"; 
// import { SectionTitle } from "../components/SectionTitle";
// import { motion } from 'framer-motion';
// import { cardContainerVariants } from "../components/CardContainerVariants";
// import { locationsData } from "../constants/config";
// import { cardItemVariants } from "../components/CardItemVariants";
// import {  MapPin, Phone,  ArrowRight } from 'lucide-react';

// export const Locations = () => {
//   return (
//     <SectionWrapper id="locations" className="bg-black">
 
//        <SectionTitle className="text-white" subtitle="Nossas Casas" title="Visite Nossas Unidades" >
//         NOSSAS <span className="font-bold text-gold-gradient">UNIDADES</span>
//       </SectionTitle>
//       <motion.div 
//         className="grid grid-cols-1 md:grid-cols-2 gap-12"
//         variants={cardContainerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {locationsData.map((loc) => ( // Usando locationsData
//           <motion.div 
//             key={loc.name}
//             variants={cardItemVariants}
//             className="group bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-[#B8860B]/50 hover:shadow-2xl hover:shadow-[#B8860B]/10"
//           >
//             {/* Imagem com Efeito de Zoom e Gradiente */}
//             <div className="relative overflow-hidden h-64">
//               <img
//                 src={loc.img}
//                 alt={`Ambiente do ${loc.name}`}
//                 className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//                 loading="lazy"
//               />
//               {/* Gradiente para fundir imagem com o card */}
//               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 to-transparent"></div>
//             </div>
            
//             {/* Conteúdo sobreposto ao gradiente */}
//             <div className="p-8 relative -mt-10 z-10">
//               <h3 className="text-2xl font-bold font-mono text-gold-gradient">{loc.name}</h3>
//               <div className="mt-4 space-y-3 text-zinc-300">
//                 <div className="flex items-start gap-3">
//                   <MapPin size={18} className="text-[#FFDF70]/80 mt-1 flex-shrink-0" />
//                   <span>{loc.address}</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Phone size={18} className="text-[#FFDF70]/80 mt-1 flex-shrink-0" />
//                   <span>{loc.phone}</span>
//                 </div>
//               </div>
//               <motion.a
//                 href={loc.mapLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group/button inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#FFDF70] transition-colors duration-300 hover:text-white"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 VER NO GOOGLE MAPS
//                 <ArrowRight size={16} className="transition-transform duration-300 group-hover/button:translate-x-1" />
//               </motion.a>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </SectionWrapper>
//   );
// };