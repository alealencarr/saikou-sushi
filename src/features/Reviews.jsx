import SectionWrapper  from "../components/SectionWrapper";
import { SectionTitle } from "../components/SectionTitle";
import { useRef } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const GoogleGLogo = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export const Reviews = () => {
  const scrollRef = useRef(null);

  const reviews = [
    { 
      quote: 'Excelente atendimento. O Rogério é extremamente educado e atencioso.', 
      name: 'Claudia Lima',
      date: '2024-04-20',
      stars: 5,
      img: 'https://lh3.googleusercontent.com/a-/ALV-UjV_sdXzL1JMfoKOrf_Yb4OaZ6a4z4JBKBI5eFwTs5j5eW3SaxpdnA=s120-c-rp-mo-br100'
    },
    { 
      quote: 'Atendimento muito zeloso pelo colaborador Rogério. Parabéns!!! A comida é fantástica...o sorvete de iogurte é o melhor dos melhores!!!!', 
      name: 'Fernando Roberto',
      date: '2024-04-19',
      stars: 5,
      img: 'https://lh3.googleusercontent.com/a-/ALV-UjXc4CxOectbwBpZW3F8buEqziTYtAJO4q9SlvIzdFJ3iu2Wmc-J6A=s120-c-rp-mo-br100'
    },
    { 
      quote: 'Ótima comida, ótimo atendimento super indico!! Atendimento ótimo do Rogério muito obrigado.', 
      name: 'Regiane Franca',
      date: '2024-04-20',
      stars: 5,
      img: 'https://lh3.googleusercontent.com/a/ACg8ocKHi3T6F3RtlUo4esnOLc8ImcHEa-5o3m1eF0VPOSUvcY6Rvw=s120-c-rp-mo-br100'
    },
    { 
      quote: 'Maravilhosa como sempre. Rogério foi excelente.', 
      name: 'Iasmim Zampar',
      date: '2024-04-20',
      stars: 5,
      img: 'https://lh3.googleusercontent.com/a-/ALV-UjUsS04ghQ8-ji9ru5tzNHbtT3NYxxjlChUbxfbpO1R9O6K9lJU=s120-c-rp-mo-br100'
    },
    { 
      quote: 'Muito delicioso esse japa 😻 Fui atendida pelo Rogério, e como sempre,  muito gentil e atencioso!', 
      name: 'Pamela Araujo',
      date: '2024-04-19',
      stars: 5,
      img: 'https://lh3.googleusercontent.com/a-/ALV-UjV3yK_wuQxLngJ70iraXP5SVDtcbhTL4REo5aQb2sgmG5A2MIGz=s120-c-rp-mo-br100'
    },
     { 
      quote: 'Amei o atendimento do Rogério ele é um excelente garçom', 
      name: 'Ana Garcia',
      date: '2024-04-20',
      stars: 4,
      img: 'https://lh3.googleusercontent.com/a/ACg8ocKKFkiS2ZphLKlaWAEs-TxqGkKRyHKFgAot5RW36jSd4-_xIw=s120-c-rp-mo-br100'
    },
  ];
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i <= rating ? "currentColor" : "none"} 
          className="text-[#FFDF70]" 
        />
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  const handleScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      // Rola 90% da largura do container
      const scrollAmount = scrollContainer.offsetWidth * 0.9;
      scrollContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SectionWrapper id="reviews" className="bg-black">
      <SectionTitle className="text-white">
          O QUE DIZEM <span className="font-bold text-gold-gradient">SOBRE NÓS?</span>
      </SectionTitle>
      
      <div className="relative">
        {/* BOTÃO ESQUERDA - MODIFICADO */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all duration-300 ease-in-out flex"
          aria-label="Anterior"
        >
          {/* Ícone menor no mobile, maior no desktop */}
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>

        {/* BOTÃO DIREITA - MODIFICADO */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all duration-300 ease-in-out flex"
          aria-label="Próximo"
        >
          {/* Ícone menor no mobile, maior no desktop */}
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 md:gap-8 p-1 reviews-scroll-container"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            .reviews-scroll-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {reviews.map((review, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-[90%] sm:w-[45%] lg:w-[31%]"
            >
              {/* TÉCNICA CORRIGIDA: Div externo para a borda/brilho */}
              <motion.div
                className="relative p-px rounded-xl h-full bg-gradient-to-r from-[#FFDF70] via-[#B8860B] to-[#FFDF70]"
                style={{
                  // O Brilho (box-shadow) usa as cores do seu gradiente
                  boxShadow: '0 0 15px rgba(255, 223, 112, 0.7), 0 0 5px rgba(184, 134, 11, 0.5)',
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                {/* Div interno para o conteúdo, com o fundo preto */}
                <div className="relative bg-zinc-900 p-8 rounded-[11px] h-full flex flex-col items-center text-center">
                  
                  {/* Google Logo com cor que combina (dourado/âmbar) */}
                  <div className="absolute top-6 right-6">
                    <GoogleGLogo className="w-5 h-5 text-amber-400 opacity-80" />
                  </div>

                  {/* ESTRUTURA CENTRALIZADA */}
                  <img 
                    src={review.img} 
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/333/888?text=S"; }}
                  />
                  <div className="mt-4">
                    <p className="font-semibold text-white text-lg">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>

                  <div className="mt-4">
                    {renderStars(review.stars)}
                  </div>
                  
                  <blockquote className="mt-6 text-base md:text-lg italic text-gray-300 flex-grow">
                    "{review.quote}"
                  </blockquote>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};