import { generateWhatsAppLinkRodizio } from "../constants/config";
import { locationsData } from "../constants/config";
import React, { Fragment, useState } from 'react';
import { ChevronRight,   Expand,ChevronLeft, X, ZoomIn,  RefreshCcw,ZoomOut } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const ImageLightbox = ({ imageUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}  
    > 
      <button 
        className="absolute top-5 right-5 text-white z-[60] bg-black/50 rounded-full p-2"
        onClick={onClose}
      >
        <X size={32} />
      </button>      
    
      <TransformWrapper
        initialScale={1}
        limitToBounds={true}  
        doubleClick={{ mode: 'zoomIn' }} 
        wheel={{ step: 0.2 }}  
        pinch={{ step: 0.1 }}  
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            
           
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[60] flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); zoomIn(); }} 
                className="text-white bg-black/50 rounded-full p-3 transition-transform hover:scale-110"
              >
                <ZoomIn size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); zoomOut(); }} 
                className="text-white bg-black/50 rounded-full p-3 transition-transform hover:scale-110"
              >
                <ZoomOut size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); resetTransform(); }} 
                className="text-white bg-black/50 rounded-full p-3 transition-transform hover:scale-110"
              >
                <RefreshCcw size={24} />
              </button>
            </div>
 
            <div 
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()} 
            >
              <TransformComponent
                
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full"
              >
                <img 
                  src={imageUrl} 
                  alt="Rodízio Premium - Imagem Expandida" 
                  className="block max-h-[90vh] max-w-[90vw] object-contain rounded-lg" 
                />
              </TransformComponent>
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};


const GoldButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto inline-block px-5 py-4 font-bold text-center text-gray-900 bg-[linear-gradient(145deg,_#FFDF70,_#d4af37,_#B8860B)] rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
  >
    {children}
  </a>
);


const rodizioImages = [
 
  'RodizioImg1.jpg',
  
  'RodizioImg2.jpg'
];

const GoldGradientText = ({ children, className = '' }) => (
  <span 
    className={`bg-[linear-gradient(145deg,_#FFDF70,_#B8860B,_#FFDF70)] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] ${className}`}
  >
    {children}
  </span>
);

const ImageCarousel = ({ onExpandClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? rodizioImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === rodizioImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // Corrigi 'h-100' para 'h-80' (já estava no seu código, mantive)
    <div className="w-full max-w-xl mx-auto h-80 md:h-96 relative group rounded-lg overflow-hidden shadow-lg shadow-black/30 border-2 border-yellow-800/30 mb-5">
      {/* Imagem de Fundo */}
      <div
        style={{ backgroundImage: `url(${rodizioImages[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      
      {/* Seta Esquerda (CORRIGIDO) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-3 text-white cursor-pointer p-2 bg-black/30 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={28} onClick={prevSlide} />
      </div>
      {/* Seta Direita (CORRIGIDO) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 text-white cursor-pointer p-2 bg-black/30 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <ChevronRight size={28} onClick={nextSlide} />
      </div>

      {/* Botão de Expandir (CORRIGIDO) */}
      <div 
        className="absolute top-3 right-3 text-white cursor-pointer p-2 bg-black/30 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        onClick={() => onExpandClick(rodizioImages[currentIndex])} // Chama a nova prop
      >
        <Expand size={24} />
      </div>

      {/* Bolinhas de Navegação */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {rodizioImages.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === slideIndex ? 'bg-white scale-110' : 'bg-gray-500/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const RodizioEmCasaSection = () => {
 const veleirosLinkRodizio = generateWhatsAppLinkRodizio(locationsData[0].phone, locationsData[0].name);
  const dutraLinkRodizio = generateWhatsAppLinkRodizio(locationsData[1].phone, locationsData[1].name);

 
  const [lightboxImage, setLightboxImage] = useState(null);
  const handleExpandClick = (imageUrl) => setLightboxImage(imageUrl);
  const closeLightbox = () => setLightboxImage(null);

  return (
        <Fragment>    
    <section className="w-full bg-black text-white py-20 md:py-28 font-['Inter']">
    
      {lightboxImage && (
        <ImageLightbox imageUrl={lightboxImage} onClose={closeLightbox} />
      )}
      <div className="container mx-auto max-w-6xl px-6">
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
           
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <ImageCarousel onExpandClick={handleExpandClick} />
          </div>
 
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
                   
            <div className="w-full max-w-3xl p-1 rounded-xl bg-[linear-gradient(145deg,_#B8860B,_#FFDF70,_#B8860B)] shadow-2xl shadow-yellow-500/20 mb-10">
              <div className="bg-black rounded-lg p-8 md:p-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight uppercase">
                  <GoldGradientText>PEÇA SEU RODÍZIO PREMIUM</GoldGradientText>
                  <br />
                  <span className="text-white">EM CASA!</span>
                </h2>
              </div>
            </div>
 
            <div className="w-full lg:hidden">
              <ImageCarousel onExpandClick={handleExpandClick} />
            </div>
             
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl">
              O nosso rodízio premium do Saikou tem <strong>60 itens</strong>, você pode <strong>pedir agora</strong> no conforto do seu lar.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 w-full max-w-md sm:max-w-none">
              <GoldButton href={veleirosLinkRodizio}>Pedir - Unidade Veleiros</GoldButton>
              <GoldButton href={dutraLinkRodizio}>Pedir - Unidade Dutra</GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Fragment>
  );
};