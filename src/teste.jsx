import React, { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  Martini, 
  Star, 
  ChevronRight, 
  Instagram, 
  Facebook,
  ArrowDownCircle,
  ArrowLeft, // Importado para o carrossel
  ArrowRight // Importado para o carrossel
} from 'lucide-react';
 
 
import { ChevronLeft,  Download, ExternalLink } from 'lucide-react';
 
import { ChefHat, Sparkle, Wind } from 'lucide-react'; // Ícones para os destaques
 const PATHS = { 
  drinks: 'https://placehold.co/400x600/1a1a1a/555?text=Drink+' ,
  images: 'VELEIROS-1-1024x687.png', food: 'https://placehold.co/800x600/222/888?text=Prato+' };
 
var pathBase = "/drinks/";
 

 const nomesDrinks = [
    "Sakura Kiss", "Tokyo Mule", "Shogun's G&T", "Lychee Martini", "Yuzu Sour",
    "Wasabi Blood Mary", "Matcha Highball", "Geisha's Whisper"
];
const descDrinks = [
    "Uma mistura delicada de saquê, flor de cerejeira e um toque de licor.",
    "Nossa versão do clássico, com gengibre fresco, yuzu e vodka premium.",
    "Gin tônica reinventado com botânicos japoneses e pepino.",
    "Elegante, doce e perfeitamente equilibrado. Um ícone do bar.",
    "Refrescante e cítrico, o equilíbrio perfeito entre o doce e o azedo.",
    "Para os corajosos: um toque picante e complexo no clássico.",
    "Energético e suave, com o sabor autêntico do matcha cerimonial.",
    "Um coquetel suave e aromático com shochu, pêssego e jasmim."
];

const drinks = [];
for (let i = 1; i <= 18; i++) {
    drinks.push({
        nome: nomesDrinks[i % nomesDrinks.length] || `Drink ${i}`,
        descricao: descDrinks[i % descDrinks.length] || "Descrição do drink.",
        altText: `Drink exclusivo Saikou Sushi ${i}`,  
        imagem: `${pathBase}drink${i}.jpeg`
    
    });
}

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


const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Anima um card de cada vez
        },
    },
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


// --- Mock Data (assumindo que você importaria isso) ---
// É importante ter os paths e dados corretos aqui.

const CONTACT = { whatsapp: '5511999998888' };
const CardapioNameDefault = 'cardapio.pdf';
const pdfUrl = CardapioNameDefault;
const cardapioName = "Cardapio-Saikou-Sushi.pdf";
const CardapioDestaque = [];

// Adicionando alguns dados fictícios para nome e descrição
var pathBase = "/cardapio/"

for (let i = 1; i <= 39; i++) {
    CardapioDestaque.push({
        nome: "",
        descricao: "", 
        altText: `Prato do cardápio Saikou Sushi ${i}`,
        imagem: pathBase + `prato${i}.jpeg`
    });
}

// Componentes Mock para funcionar (substitua pelos seus)
const SectionWrapper = ({ children, id, className }) => (
    <section id={id} className={`py-16 sm:py-20 md:py-24 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
);
 

// --- Constantes de Design ---
// Usamos um tema escuro para sofisticação, com toques de âmbar/dourado.
const theme = {
  bg: 'bg-gray-950', // Quase preto, para elegância
  text: 'text-gray-200', // Texto principal, suave
  textHighlight: 'text-white', // Títulos
  accent: 'text-amber-500', // Dourado (ex: #D4AF37)
  accentBg: 'bg-amber-600', // Dourado escuro (ex: #B8860B)
  accentBorder: 'border-amber-600', // Borda Dourada escura
  cardBg: 'bg-gray-900', // Fundo dos cards
};

// --- Links (Simulados) ---
const navLinks = [
  { name: 'A EXPERIÊNCIA', href: '#experience' },
  { name: 'PRATOS', href: '#dishes' },
  { name: 'DRINKS', href: '#drinks' },
  { name: 'UNIDADES', href: '#locations' },
  { name: 'DELIVERY', href: '#delivery' },
];

// --- Componente de Ícone do WhatsApp (SVG Inline) ---
const WhatsAppIcon = (props) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.84L7.19 20.45C8.66 21.21 10.31 21.6 12.04 21.6C17.5 21.6 21.95 17.15 21.95 11.69C21.95 6.23 17.5 1.78 12.04 1.78L12.04 2Z M12.04 3.68C16.55 3.68 20.06 7.2 20.06 11.7C20.06 16.2 16.55 19.71 12.04 19.71C10.48 19.71 9.01 19.29 7.78 18.57L7.53 18.42L4.29 19.27L5.16 16.12L4.99 15.86C4.18 14.5 3.73 12.97 3.73 11.4C3.73 6.9 7.24 3.38 11.74 3.38L12.04 3.68Z M9.92 6.79C9.74 6.79 9.58 6.8 9.37 7.22C9.15 7.64 8.51 8.29 8.51 9.38C8.51 10.47 9.39 11.53 9.57 11.75C9.75 11.97 11.19 14.16 13.26 14.99C15.34 15.82 15.34 15.42 15.91 15.36C16.48 15.3 17.34 14.84 17.58 14.22C17.82 13.6 17.82 13.08 17.73 12.99C17.64 12.9 17.46 12.81 17.19 12.68C16.92 12.55 15.69 11.93 15.41 11.83C15.13 11.73 14.95 11.64 14.77 11.91C14.59 12.18 14.07 12.81 13.9 12.99C13.73 13.17 13.55 13.19 13.28 13.06C13.01 12.93 12.09 12.63 10.97 11.64C10.11 10.87 9.53 10.03 9.35 9.76C9.17 9.49 9.26 9.35 9.44 9.17C9.6 9.02 9.78 8.81 9.96 8.63C10.14 8.45 10.23 8.32 10.37 8.09C10.5 7.86 10.41 7.68 10.32 7.5C10.23 7.32 9.92 6.79 9.92 6.79Z" />
  </svg>
);

// --- Componente do Botão Flutuante do WhatsApp ---
const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/YOUR_PHONE_NUMBER" // <-- TROQUE PELO SEU NÚMERO
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 p-3 rounded-full shadow-lg"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.5 }}
    whileHover={{ scale: 1.1, backgroundColor: '#25D366' }}
    whileTap={{ scale: 0.9 }}
    aria-label="Fale conosco pelo WhatsApp"
  >
    <WhatsAppIcon className="w-8 h-8 text-white" />
  </motion.a>
);

// --- Componentes ---

/**
 * Header (Navegação)
 * Fixo no topo, com efeito de blur e menu mobile.
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito de scroll para o header
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
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-3 text-2xl font-bold ${theme.textHighlight} tracking-wider`}
            >
              <img
                src="LOGO.png"
                alt="Saikou Sushi Logo"
                className="h-12 w-auto"
              />
            
               
              <b className={` 
                            bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 
                            bg-clip-text text-transparent filter drop-shadow(0 2px 2px rgba(0,0,0,0.2))`}>
                SAIKOU 
              </b>
              SUSHI
            </motion.a>
          
            {/* Links Desktop */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`font-medium ${theme.text} hover:${theme.accent} transition-colors`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden md:block">
              <motion.a
                href="#locations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`border ${theme.accentBorder} ${theme.accent} py-3 px-10 rounded-full text-sm 
                font-bold hover:bg-amber-500 hover:text-black transition-all duration-300`}
              >
                RESERVAR
              </motion.a>
            </div>

            {/* Botão Menu Mobile */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className={theme.textHighlight}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </nav>
      </header> {/* <-- Correção: Tag </header> estava incompleta */}

      {/* Overlay do Menu Mobile */}
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
              onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar no menu
            >
              <button
                onClick={toggleMobileMenu}
                className={`absolute top-4 right-4 ${theme.text}`}
              >
                <X size={30} />
              </button>
              
              <div className="flex flex-col space-y-6 mt-16">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className={`text-2xl font-light ${theme.textHighlight} hover:${theme.accent}`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#locations"
                  onClick={toggleMobileMenu}
                  className={`mt-6 border ${theme.accentBorder} ${theme.accent} py-3 px-6 rounded-full text-center font-semibold hover:bg-amber-500 hover:text-black transition-all duration-300`}
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

/**
 * Hero Section
 * Fundo em vídeo com o arquivo MP4 fornecido.
 */
const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      {/* Vídeo de Fundo */}
      <video
        src="SaikouVeleiros360.mp4"
        autoPlay
        loop
        muted
        playsInline // Essencial para autoplay em dispositivos móveis
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        preload="auto" // Otimização: preload="metadata" seria mais leve, mas "auto" garante que comece rápido.
      />
      {/* Overlay Escuro */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Conteúdo de Texto */}
      <motion.div
        className="relative z-20 flex flex-col items-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Aplicando o gradiente de texto Dourado (Tamanho reduzido) */}
        
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
        <h1 className={`text-5xl md:text-7xl lg:text-6xl font-black tracking-tighter 
                       bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 
                       bg-clip-text text-transparent filter drop-shadow(0 2px 2px rgba(0,0,0,0.2))`}>
          SAIKOU SUSHI
        </h1>
         
        <p className={`mt-6 max-w-xl text-lg md:text-xl ${theme.text}`}>
          A experiência premium da culinária japonesa.
        </p>
        <motion.a
          href="#experience"
          className={`mt-12 border-2 border-white ${theme.textHighlight} py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
        >
          VER MAIS
        </motion.a>
      </motion.div>
      
      {/* Indicador de Scroll */}
      <motion.a
        href="#experience"
        className="absolute bottom-10 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDownCircle size={36} className={theme.textHighlight} />
      </motion.a>
    </section>
  );
};

/**
 * Wrapper de Seção
 * Componente reutilizável para aplicar animação de fade-in-up
 * em todas as seções, garantindo consistência.
 */
const Section = ({ children, className = '', id }) => {
  return (
    <motion.section
      id={id}
      className={`py-20 md:py-32 ${theme.bg} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Ativa quando 30% da seção está visível
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
};

/**
 * Título da Seção
 * Componente de título padronizado.
 */
const SectionTitle = ({ children, className }) => (
    <motion.h2 
        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 font-mono tracking-tighter ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
    >
        {children}
    </motion.h2>
);

/**
 * Seção "A Experiência" (Sobre)
 * Destaca a qualidade e o ambiente.
 */
 
const Experience = () => (
  <SectionWrapper id="sobre-v1" className="bg-black text-white py-20 md:py-24">
    <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      
      {/* Coluna de Texto */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono">NOSSA <span className="font-bold text-amber-400">FILOSOFIA</span></h2>
        <p className="text-zinc-300 text-base sm:text-lg mb-10">
          No <span className="text-white font-semibold">Saikou Sushi</span>, acreditamos que a culinária é uma forma de arte. Nossa missão é honrar a tradição japonesa, adicionando um toque de modernidade e criatividade para criar sabores inesquecíveis.
        </p>

        {/* Cards de Destaque V1 */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Card 1 */}
          <motion.div 
            variants={cardItemVariants}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:shadow-amber-500/10 hover:shadow-2xl hover:-translate-y-1 border border-zinc-800"
          >
            {/* Linha dourada sutil no topo */}
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4">
              {/* Círculo do Ícone */}
              <div className="flex-shrink-0 rounded-full bg-zinc-800 p-3 ring-2 ring-amber-400/50 transition-all duration-300 group-hover:ring-amber-400 group-hover:bg-amber-400/10">
                <ChefHat className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white">TRADIÇÃO E ARTE</h4>
                <p className="text-sm text-zinc-400">Pratos clássicos executados com maestria.</p>
              </div>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            variants={cardItemVariants}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:shadow-amber-500/10 hover:shadow-2xl hover:-translate-y-1 border border-zinc-800"
          >
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 rounded-full bg-zinc-800 p-3 ring-2 ring-amber-400/50 transition-all duration-300 group-hover:ring-amber-400 group-hover:bg-amber-400/10">
                <Sparkle className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-mono text-lg font-semibold text-white">TOQUE CRIATIVO</h4>
                <p className="text-sm text-zinc-400">Inovação que surpreende o paladar.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Coluna da Imagem */}
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
          className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-zinc-800"
          loading="lazy" 
        />
        {/* Detalhe de borda dourada */}
        <div className="absolute -inset-2 rounded-2xl border-2 border-amber-400/20 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100" style={{ clipPath: 'polygon(0 0, 10% 0, 10% 10%, 0 10%, 0 0, 100% 0, 100% 10%, 90% 10%, 90% 0, 100% 0, 100% 100%, 90% 100%, 90% 90%, 100% 90%, 100% 100%, 0 100%, 0 90%, 10% 90%, 10% 100%, 0 100%)' }}></div>
      </motion.div>

    </div>
  </SectionWrapper>
);
/**
 * Seção de Pratos (Carrossel)
 * Grid com imagens e descrições dos pratos.
 */
 
const Dishes = () => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const nextPrato = () => setIndex((prev) => (prev + 1) % CardapioDestaque.length);
    const prevPrato = () => setIndex((prev) => (prev - 1 + CardapioDestaque.length) % CardapioDestaque.length);

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(nextPrato, 5000);
        return () => clearInterval(timer);
    }, [index, isPlaying]);

    return (
        <SectionWrapper 
            id="cardapio" 
            className="bg-black py-16" 
            style={{ backgroundImage: `radial-gradient(circle at top right, rgba(220, 38, 38, 0.1), transparent 40%)`}}
        >
            <SectionTitle className="text-white text-center text-3xl mb-12">NOSSO <span className="font-bold text-yellow-400">CARDÁPIO</span></SectionTitle>
            
            <div 
                className="relative max-w-5xl mx-auto px-4"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
            >
                {/* --- Carrossel "Coverflow" --- */}
                <div className="relative h-[350px] md:h-[500px] overflow-hidden mb-8">
                    {CardapioDestaque.map((prato, i) => {
                        const offset = i - index;
                        const zIndex = CardapioDestaque.length - Math.abs(offset);
                        
                        return (
                            <motion.div
                                key={i}
                                className="absolute w-[70%] md:w-[60%] h-full top-0 left-[15%] md:left-[20%]"
                                initial={false} // Evita animação inicial
                                animate={{
                                    x: `${offset * 60}%`, // Distância entre os slides (ajuste)
                                    scale: i === index ? 1 : 0.75, // Escala dos slides laterais
                                    opacity: i === index ? 1 : 0.3, // Opacidade dos slides laterais
                                    zIndex: zIndex, // Garante que o slide central esteja na frente
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

                {/* --- Informações do Prato (Abaixo) --- */}
                <div className="relative h-18 text-center text-white px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index} // Chaveia pela informação
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* <h3 className="text-2xl md:text-3xl font-bold mb-2">{CardapioDestaque[index].nome}</h3>
                            <p className="text-zinc-300 mb-4 text-sm sm:text-base max-w-lg">{CardapioDestaque[index].descricao}</p> */}
                            <motion.a
                                href={`https://wa.me/${CONTACT.whatsapp}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido.`}
                                target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="bg-red-600 text-white px-8 py-3 rounded-md font-bold inline-block"
                            >
                                PEÇA AGORA
                            </motion.a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* --- Botões de Ação (PDF) --- */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-1 px-15">
                <motion.a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(251, 191, 36, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ExternalLink size={20} />
                    <span className="text-sm md:text-base">VISUALIZAR CARDÁPIO COMPLETO</span>
                </motion.a>

                <motion.a
                    href={pdfUrl}
                    download={cardapioName}
                    className="inline-flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border-2 border-zinc-700 hover:border-yellow-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Download size={20} />
                    <span className="text-sm md:text-base">BAIXAR CARDÁPIO</span>
                </motion.a>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 px-3 ">
                {/* Botão Visualizar */}
                <motion.a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-gold-gradient text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"      
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(251, 191, 36, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                 <ExternalLink size={20} />
                  <span className="text-sm md:text-base">VISUALIZAR CARDÁPIO COMPLETO</span>
                </motion.a>

                {/* Botão Download */}
                <motion.a
                  href={pdfUrl}
                  download={cardapioName}
                  className="inline-flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border-2 border-zinc-700 hover:border-amber-400"
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
/**
 * Seção de Drinks (Carrossel)
 * Foco nos drinks autorais com imagem de destaque.
 */
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



// --- Componente Principal ---
const Drinks  = () => {
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

  
  const drinkIndex = (page % drinks.length + drinks.length) % drinks.length;

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
          animation: scroll 10s linear infinite;
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
                  <DrinkCard drink={drinks[drinkIndex]} />
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
              {[...drinks, ...drinks].map((drink, i) => (
                <DrinkCard drink={drink} key={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

/**
 * Seção de Unidades (Veleiros e Dutra)
 * Componente crucial com informações das duas lojas.
 */
  const locations = [
    {
      name: 'SAIKOU VELEIROS',
      address: 'Praça Nicolau Aranha Pachêco, 64 – Jd. Ipanema',
      phone: '(11) 5522-3344',
      img: 'VELEIROS-1-1024x687.png',
      mapLink: '#',
    },
    {
      name: 'SAIKOU DUTRA',
      address: 'Rua Padre José Garzotti, 342 – Cidade Dutra',
      phone: '(11) 5666-7788',
      img: 'DUTRA-1-1024x687.png',
      mapLink: '#',
    },
  ];
 
//   const locations = [
//     {
//       name: 'Saikou Veleiros',
//       address: 'Praça Nicolau Aranha Pachêco, 64 – Jd. Ipanema',
//       phone: '(11) 5522-3344',
//       img: 'VELEIROS-1-1024x687.png',
//       mapLink: '#',
//     },
//     {
//       name: 'Saikou Dutra',
//       address: 'Rua Padre José Garzotti, 342 – Cidade Dutra',
//       phone: '(11) 5666-7788',
//       img: 'DUTRA-1-1024x687.png',
//       mapLink: '#',
//     },
//   ];

//   return (
//     <Section id="locations">
//       <SectionTitle subtitle="Nossas Casas" title="Visite Nossas Unidades" />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {locations.map((loc) => (
//           <div key={loc.name} className={`${theme.cardBg} rounded-lg shadow-xl overflow-hidden`}>
//             <img
//               src={loc.img}
//               alt={`Ambiente do ${loc.name}`}
//               className="w-full h-64 object-cover"
//               loading="lazy"
//             />
//             <div className="p-8">
//               <h3 className={`text-2xl font-bold ${theme.textHighlight}`}>{loc.name}</h3>
//               <div className={`mt-4 space-y-3 ${theme.text}`}>
//                 <div className="flex items-center">
//                   <MapPin size={20} className={`${theme.accent} mr-3`} />
//                   <span>{loc.address}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone size={20} className={`${theme.accent} mr-3`} />
//                   <span>{loc.phone}</span>
//                 </div>
//               </div>
//               <motion.a
//                 href={loc.mapLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`inline-block mt-6 border ${theme.accentBorder} ${theme.accent} py-2 px-6 rounded-full text-sm font-semibold hover:bg-amber-500 hover:text-black transition-all duration-300`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Abrir no Google Maps
//               </motion.a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// };
const Locations = () => {
  return (
    <Section id="locations">
      <SectionTitle subtitle="Nossas Casas" title="Visite Nossas Unidades" />
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {locations.map((loc) => (
          <motion.div 
            key={loc.name}
            variants={cardItemVariants}
            className="group bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-900/10"
          >
            {/* Imagem com Efeito de Zoom e Gradiente */}
            <div className="relative overflow-hidden h-64">
              <img
                src={loc.img}
                alt={`Ambiente do ${loc.name}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradiente para fundir imagem com o card */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
            
            {/* Conteúdo sobreposto ao gradiente */}
            <div className="p-8 relative -mt-10 z-10">
              <h3 className="text-2xl font-bold font-mono text-amber-400">{loc.name}</h3>
              <div className="mt-4 space-y-3 text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-400/80 mt-1 flex-shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-amber-400/80 mt-1 flex-shrink-0" />
                  <span>{loc.phone}</span>
                </div>
              </div>
              <motion.a
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center gap-2 mt-8 text-sm font-semibold text-amber-400 transition-colors duration-300 hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                VER NO GOOGLE MAPS
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
/**
 * Seção de Avaliações
 * Prova social para gerar confiança.
 */
const Reviews = () => {
  const reviews = [
    { quote: 'Simplesmente o melhor rodízio que já fui. O atendimento é impecável e o ambiente muito sofisticado.', name: 'Juliana R.' },
    { quote: 'Os drinks são de outro nível. Perfeito para ir com amigos. O Saikou Veleiros tem uma vista linda.', name: 'Marcos T.' },
    { quote: 'Qualidade do peixe é surreal. Vale cada centavo. Viramos clientes fiéis da unidade Dutra.', name: 'Carla e Breno' },
  ];
  
  // Função para renderizar estrelas
  const renderStars = () => (
    <div className={`flex ${theme.accent}`}>
      <Star size={18} fill="currentColor" />
      <Star size={18} fill="currentColor" />
      <Star size={18} fill="currentColor" />
      <Star size={18} fill="currentColor" />
      <Star size={18} fill="currentColor" />
    </div>
  );

  return (
    <Section id="reviews" className="bg-gray-900">
      <SectionTitle subtitle="Confiança" title="O que nossos clientes dizem" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className={`${theme.cardBg} p-8 rounded-lg shadow-lg flex flex-col justify-between`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {renderStars()}
            <blockquote className={`mt-4 text-lg italic ${theme.text} flex-grow`}>
              "{review.quote}"
            </blockquote>
            <p className={`mt-6 font-semibold ${theme.textHighlight}`}>{review.name}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/**
 * Seção de Delivery (iFood)
 * CTA claro para os pedidos.
 */
const Delivery = () => (
  <Section id="delivery" className={`${theme.bg} text-center`}>
    <SectionTitle subtitle="Conforto" title="Leve a Experiência Saikou" />
    <p className={`max-w-2xl mx-auto text-lg ${theme.text} -mt-8 mb-10`}>
      Aprecie a qualidade e o sabor do Saikou no conforto da sua casa. Peça agora pelo iFood e transforme seu jantar.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <motion.a
        href="#" // Link iFood Veleiros
        className={`inline-block ${theme.accentBg} text-black py-4 px-10 rounded-full text-lg font-bold transition-all duration-300 hover:bg-amber-500 hover:brightness-110 hover:shadow-lg hover:shadow-amber-500/20`}
        whileHover={{ scale: 1.05 }}
      >
        Pedir (Unidade Veleiros)
      </motion.a>
      <motion.a
        href="#" // Link iFood Dutra
        className={`inline-block bg-gray-700 ${theme.textHighlight} py-4 px-10 rounded-full text-lg font-bold transition-all duration-300 hover:bg-gray-600`}
        whileHover={{ scale: 1.05 }}
      >
        Pedir (Unidade Dutra)
      </motion.a>
    </div>
  </Section>
);

/**
 * Footer
 * Rodapé com links e informações.
 */
const Footer = () => (
  <footer className="bg-black text-gray-400 py-16">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e Sobre */}
        <div>
          <h3 className={`text-2xl font-bold ${theme.textHighlight} tracking-wider`}>SAIKOU SUSHI</h3>
          <p className="mt-4 text-sm">
            A experiência premium da culinária japonesa na Zona Sul de São Paulo.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-white"><Instagram size={24} /></a>
            <a href="#" className="hover:text-white"><Facebook size={24} /></a>
          </div>
        </div>
        
        {/* Links Rápidos */}
        <div>
          <h4 className={`font-semibold ${theme.textHighlight}`}>Navegar</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-white">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Unidade Veleiros */}
        <div>
          <h4 className={`font-semibold ${theme.textHighlight}`}>Unidade Veleiros</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Praça N. A. Pachêco, 64</li>
            <li>(11) 5522-3344</li>
          </ul>
        </div>
        
        {/* Unidade Dutra */}
        <div>
          <h4 className={`font-semibold ${theme.textHighlight}`}>Unidade Dutra</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Rua Pe. José Garzotti, 342</li>
            <li>(11) 5666-7788</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Saikou Sushi. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);


/**
 * Componente Principal (App)
 * Monta todas as seções.
 */
export default function App() {
  return (
    <Fragment>
      <div className={`${theme.bg} ${theme.text}`}>
        <Header />
        <main>
          <Hero />
          <Experience />
          <Dishes />
          <Drinks />
          <Locations />
          <Reviews />
          <Delivery />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Fragment>
  );
}