import React, { useState, useEffect, Fragment, useRef } from 'react';
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
  ArrowRight ,// Importado para o carrossel
  ShoppingBag
} from 'lucide-react';


import { ChevronLeft,  Download, ExternalLink, MessageCircle } from 'lucide-react';

import { ChefHat, Sparkle, Wind } from 'lucide-react'; // Ícones para os destaques
  const PATHS = { 
  drinks: 'https://placehold.co/400x600/1a1a1a/555?text=Drink+' ,
  images: 'VELEIROS-1-1024x687.png', // Placeholder
  food: 'https://placehold.co/800x600/222/888?text=Prato+' };

var pathBase = "/drinks/";

const IFOOD_LINKS = {
  VELEIROS: "https://www.ifood.com.br/delivery/sao-paulo-sp/saikou-sushi-express---comida-japonesa-jardim-ipanema/7db279b1-ac0a-4cbd-ad5a-fe90c3da4027?utm_medium=share",
  DUTRA: "https://www.ifood.com.br/delivery/sao-paulo-sp/saikou-sushi-dutra---comida-japonesa-cidade-dutra/081afe41-1079-468b-84b8-8fba950daf48?utm_medium=share"
};
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
// O objeto 'theme' foi removido pois as classes de gradiente serão aplicadas diretamente.

// --- Links (Simulados) ---
const navLinks = [
  { name: 'INICIO', href: '#sobre' },
  { name: 'PRATOS', href: '#cardapio' },
  { name: 'DRINKS', href: '#drinks' },
  { name: 'UNIDADES', href: '#locations' },
    { name: 'AVALIAÇÕES', href: '#reviews' },
    { name: 'TOUR 360°', href: '#visualizacao-360' },
  { name: 'DELIVERY', href: '#delivery' },
   { name: 'CONTATO', href: '#contato' },
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
 

const generateWhatsAppLink = (phone, locationName) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const fullPhone = cleanPhone.length === 11 ? `55${cleanPhone}` : cleanPhone;
  const message = encodeURIComponent(`Olá! Gostaria de fazer uma reserva no ${locationName}.`);
  return `https://wa.me/${fullPhone}?text=${message}`;
};

/**
 * Subcomponente para os botões de escolha de unidade
 */
const LocationChoiceButton = ({ href, name, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg flex items-center gap-3 border border-gray-100"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.4, delay, type: "spring", bounce: 0.5 }}
    whileHover={{ scale: 1.1, x: -10 }}
  >
    <span className="font-semibold text-sm pr-2">{name}</span>
    <MessageCircle size={18} className="text-green-500" />
  </motion.a>
);

/**
 * Componente Principal do Botão Flutuante de WhatsApp
 */
const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Gera os links para os botões de escolha
  const veleirosLink = generateWhatsAppLink(locationsData[0].phone, locationsData[0].name);
  const dutraLink = generateWhatsAppLink(locationsData[1].phone, locationsData[1].name);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* 1. Os botões de escolha (Veleiros e Dutra) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* O delay na animação faz um sair depois do outro */}
            <LocationChoiceButton
              href={dutraLink}
              name={locationsData[1].name}
              delay={0}
            />
            <LocationChoiceButton
              href={veleirosLink}
              name={locationsData[0].name}
              delay={0.1}
            />
          </>
        )}
      </AnimatePresence>

      {/* 2. O botão principal (Toggle) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-gray-800 px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-200 relative overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          x: -5
        }}
      >
        {/* O ícone: troca entre Chat e X */}
        <motion.div
          className={`${isOpen ? 'bg-gray-600' : 'bg-green-500'} p-2 rounded-full transition-colors duration-300`}
        >
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <X size={20} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <MessageCircle size={20} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* O texto: troca entre "Chame-nos" e "Fechar" */}
        <div className="font-semibold text-sm pr-2">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="fechar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Fechar
                </motion.span>
              ) : (
                <motion.span
                  key="chamar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Chame-nos no WhatsApp
                </motion.span>
              )}
            </AnimatePresence>
        </div>


        {/* Efeito de brilho (só aparece quando está fechado) */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </div>
  );
};

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
              className={`flex items-center gap-3 text-2xl font-bold text-white tracking-wider`}
            >
              <img
                src="LOGO.png"
                alt="Saikou Sushi Logo"
                className="h-12 w-auto"
              />
            
              
              <b className={`text-gold-gradient`}>
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
                  className={`font-medium text-gray-200 hover:text-gold-gradient transition-colors`}
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
                href="#contato"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gold-gradient text-black py-3 px-10 rounded-full text-sm 
                font-bold hover:brightness-110 transition-all duration-300`}
              >
                RESERVAR
              </motion.a>
            </div>

            {/* Botão Menu Mobile */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white">
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
                className={`absolute top-4 right-4 text-gray-200`}
              >
                <X size={30} />
              </button>
              
              <div className="flex flex-col space-y-6 mt-16">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className={`text-2xl font-light text-white hover:text-gold-gradient`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#locations"
                  onClick={toggleMobileMenu}
                  className={`mt-6 bg-gold-gradient text-black py-3 px-6 rounded-full text-center font-semibold hover:brightness-110 transition-all duration-300`}
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
        <h1 className={`text-3xl md:text-7xl lg:text-6xl font-black tracking-tighter text-gold-gradient`}>
          SAIKOU SUSHI
        </h1>
        
        <p className={`mt-6 max-w-xl text-lg md:text-xl text-gray-200`}>
          A experiência premium da culinária japonesa.
        </p>
        <motion.a
          href="#experience"
          className={`mt-12 border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300`}
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
        <ArrowDownCircle size={36} className="text-white" />
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
      className={`py-20 md:py-32 bg-gray-950 ${className}`}
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
  <SectionWrapper id="sobre" className="bg-black text-white py-20 md:py-24">
    <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      
      {/* Coluna de Texto */}
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
            className="group relative overflow-hidden rounded-lg bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:shadow-[#B8860B]/10 hover:shadow-2xl hover:-translate-y-1 border border-zinc-800"
          >
            {/* Linha dourada sutil no topo */}
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4">
              {/* Círculo do Ícone */}
              <div className="flex-shrink-0 rounded-full bg-zinc-800 p-3 ring-2 ring-[#B8860B]/50 transition-all duration-300 group-hover:ring-[#B8860B] group-hover:bg-[#B8860B]/10">
                <ChefHat className="h-6 w-6 text-[#FFDF70]" />
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
          className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-zinc-700"
          loading="lazy" 
        />
        {/* Detalhe de borda dourada */}
        <div className="absolute -inset-2 rounded-2xl border-2 border-[#B8860B]/20 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100" style={{ clipPath: 'polygon(0 0, 10% 0, 10% 10%, 0 10%, 0 0, 100% 0, 100% 10%, 90% 10%, 90% 0, 100% 0, 100% 100%, 90% 100%, 90% 90%, 100% 90%, 100% 100%, 0 100%, 0 90%, 10% 90%, 10% 100%, 0 100%)' }}></div>
      </motion.div>

    </div>
  </SectionWrapper>
);
/**
 * Seção de Pratos (Carrossel)
 * Grid com imagens e descrições dos pratos.
 */

const Cardapio = () => {
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
            style={{ backgroundImage: `radial-gradient(circle at top right, rgba(184, 134, 11, 0.1), transparent 40%)`}} // Trocado vermelho por dourado
        >
            <SectionTitle className="text-white text-center text-3xl mb-12">NOSSO <span className="font-bold text-gold-gradient">CARDÁPIO</span></SectionTitle>
            
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
                <OrderButton />
            </div>

            {/* --- Botões de Ação (PDF) --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 px-3 ">
                {/* Botão Visualizar */}
                <motion.a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-gold-gradient text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"    
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
const OrderButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Gera os links para os botões de escolha
  const veleirosLink = generateWhatsAppLink(locationsData[0].phone, locationsData[0].name);
  const dutraLink = generateWhatsAppLink(locationsData[1].phone, locationsData[1].name);

  return (
    <div className="relative w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {isOpen ? (
          // --- ESTADO ABERTO (Mostra as duas unidades) ---
          <motion.div
            key="choices"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Botão Veleiros */}
            <motion.a
              href={veleirosLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-bold text-sm w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pedir no Veleiros
            </motion.a>
            
            {/* Botão Dutra */}
            <motion.a
              href={dutraLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-bold text-sm w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pedir no Dutra
            </motion.a>

            {/* Botão Fechar */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 p-2 absolute -right-4 -top-4 sm:static sm:p-0 sm:ml-2"
              whileHover={{ scale: 1.2 }}
              aria-label="Voltar"
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        ) : (
          // --- ESTADO FECHADO (Mostra "PEÇA AGORA") ---
          <motion.button
            key="order"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-8 py-3 rounded-md font-bold inline-block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            PEÇA AGORA
          </motion.button>
        )}
      </AnimatePresence>
    </div>
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
  const locationsData = [
    {
      name: 'SAIKOU VELEIROS',
      address: 'Praça Nicolau Aranha Pachêco, 64 – Jardim Ipanema, São Paulo – SP, 04784-280',
      phone: '(11) 96927-7577',
      img: 'VELEIROS-1-1024x687.png',
      mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Praça Nicolau Aranha Pachêco, 64 – Jardim Ipanema, São Paulo – SP, 04784-280')}`,
    },
    {
      name: 'SAIKOU DUTRA',
      address: 'Rua Padre José Garzotti, 342 – Cidade Dutra, São Paulo – SP, 04806-000',
      phone: '(11) 93334-4060',
      img: 'DUTRA-1-1024x687.png',
      mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Padre José Garzotti, 342 – Cidade Dutra, São Paulo – SP, 04806-000')}`,
    },
  ];

// Componente Locations (V3 "Refinamento & Foco")
const Locations = () => {
  return (
    <SectionWrapper id="locations" className="bg-black">
 
       <SectionTitle className="text-white" subtitle="Nossas Casas" title="Visite Nossas Unidades" >
        NOSSAS <span className="font-bold text-gold-gradient">UNIDADES</span>
      </SectionTitle>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {locationsData.map((loc) => ( // Usando locationsData
          <motion.div 
            key={loc.name}
            variants={cardItemVariants}
            className="group bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-[#B8860B]/50 hover:shadow-2xl hover:shadow-[#B8860B]/10"
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
              <h3 className="text-2xl font-bold font-mono text-gold-gradient">{loc.name}</h3>
              <div className="mt-4 space-y-3 text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FFDF70]/80 mt-1 flex-shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#FFDF70]/80 mt-1 flex-shrink-0" />
                  <span>{loc.phone}</span>
                </div>
              </div>
              <motion.a
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#FFDF70] transition-colors duration-300 hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                VER NO GOOGLE MAPS
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
/**
 * Seção de Avaliações
 * Prova social para gerar confiança.
 */
const GoogleGLogo = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);


/**
 * Seção de Avaliações (Versão Carrossel - Neon Dourado)
 * Borda com efeito neon usando o gradiente dourado do site.
 * Layout interno centralizado.
 * CORRIGIDO: Trocada a técnica de 'mask' por 'div' aninhado para garantir a renderização.
 */
const Reviews = () => {
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
/**
 * Seção de Delivery (iFood)
 * CTA claro para os pedidos.
 */
const Delivery = () => (
  <SectionWrapper id="delivery" className="bg-black">
  
    
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
        
        {/* TÍTULO AJUSTADO */}
        <h2 className="flex justify-center items-baseline gap-2 md:gap-3 font-bold text-white mb-4">
          <span className="text-3xl md:text-4xl">PEÇA NO</span> 
          <span className="text-gold-gradient text-3xl md:text-5xl">iFood</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
          Escolha sua unidade preferida e receba o melhor do Saikou 
          em minutos, no conforto da sua casa.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* Botão Veleiros (Primário) */}
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
          
          {/* Botão Dutra (Secundário "Ghost") */}
          <motion.a
            href={IFOOD_LINKS.DUTRA}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border-2 border-gray-700 text-gray-300 py-[14px] px-10 rounded-full text-lg font-bold transition-all duration-300 hover:border-[#B8860B] hover:text-[#FFDF70]"
            whileHover={{ scale: 1.05 }}
          >
            FAZER PEDIDO (Dutra)
            <ExternalLink className="w-5 h-5 transition-colors duration-300" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

const videos360Data = [
  {
    id: 'dutra',
    name: 'Unidade Dutra - Tour 360º',
    videoSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/SaikouDutra360.mp4',
    posterSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/Captura-de-Tela-2024-04-20-as-15.21.11.png',
  },
  {
    id: 'veleiros',
    name: 'Unidade Veleiros - Tour 360º',
    videoSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/SaikouVeleiros360.mp4',
    posterSrc: 'https://saikousushi.com.br/wp-content/uploads/2024/04/Captura-de-Tela-2024-04-20-as-15.21.29.png',
  },
];

 

// Componente da Seção
const Visualizacao360 = () => {
  return (
    // Wrapper da Seção (replicando o estilo 'bg-black' do seu exemplo)
    // Assumindo que você tem um 'SectionWrapper' ou pode usar <section>
    <section id="visualizacao-360" className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        
        {/* Título da Seção (replicando o estilo 'SectionTitle') */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {/* O 'text-gold-gradient' precisa estar definido no seu tailwind.css ou ser emulado com classes */}
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">
            VISUALIZAÇÃO <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFDF70] to-[#B8860B]">360º</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Conheça nossas unidades Veleiros e Dutra por dentro.
          </p>
        </motion.div>

        {/* Container dos Vídeos (Grid com animação) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Mapeia os dados dos vídeos para criar os cards */}
          {videos360Data.map((video) => (
            <motion.div 
              key={video.id}
              variants={cardItemVariants}
              className="group bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-[#B8860B]/50 hover:shadow-2xl hover:shadow-[#B8860B]/10"
            >
              {/* O player de vídeo */}
              <div className="relative aspect-video bg-zinc-800">
                <video
                  className="w-full h-full object-cover"
                  src={video.videoSrc}
                  poster={video.posterSrc}
                  controls
                  preload="metadata"
                  controlsList="nodownload" // Do seu HTML original
                >
                  Seu navegador não suporta o tag de vídeo.
                </video>
              </div>

              {/* Conteúdo/Título abaixo do vídeo */}
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

/**
 * Footer
 * Rodapé com links e informações.
 */
 

// --- DADOS SOCIAIS ---
const SOCIAL = {
  instagram: 'https://www.instagram.com/saikou_sushi', // Ajuste se necessário
  instagramHandle: '@saikou_sushi', // Ajuste se necessário
};

const FACEBOOK_LINKS = [
  { 
    name: 'Facebook Veleiros', 
    href: 'https://www.facebook.com/saikouveleiros/?locale=pt_BR', 
    handle: 'saikouveleiros' 
  },
  { 
    name: 'Facebook Dutra', 
    href: 'https://www.facebook.com/saikoucidadedutra/#', 
    handle: 'saikoucidadedutra' 
  },
];

// --- Helper Function ---
/**
 * Cria um link de WhatsApp formatado a partir de um número de telefone.
 * Remove caracteres não numéricos e adiciona o código do Brasil (55).
 * @param {string} phone - O número de telefone (ex: (11) 9....)
 * @param {string} locationName - O nome da unidade (para a mensagem)
 * @returns {string} - A URL formatada do wa.me
 */
 


/**
 * Subcomponente para o card de localização
 * Agora inclui o botão de WhatsApp.
 */
const LocationCard = ({ location }) => {
  const whatsappUrl = generateWhatsAppLink(location.phone, location.name);

  return (
    <div className="bg-zinc-900 p-5 rounded-xl flex flex-col h-full border border-zinc-800 transition-all duration-300 hover:border-gold/50">
      <div className="flex items-center gap-3 mb-2">
        <MapPin size={18} className="text-[#FFDF70]/80 flex-shrink-0" />
        <h3 className="font-bold text-lg text-gold-gradient uppercase">{location.name}</h3>
      </div>
      <div className="border-t border-zinc-800 mb-3"></div>
      <span className="text-zinc-300 text-sm mb-3">
        {location.address}
      </span>
      <div className="flex items-center gap-3 mb-4">
        <Phone size={18} className="text-[#FFDF70]/80 flex-shrink-0" />
        <a href={`tel:${location.phone}`} className="text-white font-semibold text-sm hover:text-gold-gradient transition-colors">
          {location.phone}
        </a>
      </div>
      
      <div className="flex-grow"></div> {/* Empurra os botões para baixo */}

      {/* Botão Primário: WhatsApp */}
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center bg-gold-gradient text-black font-bold py-3 px-5 rounded-lg text-sm flex items-center justify-center gap-2 mb-3"
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={18} />
        RESERVAR VIA WHATSAPP
      </motion.a>

      {/* Botão Secundário: Mapa */}
      <motion.a 
        href={location.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center bg-zinc-800 border border-zinc-700 text-white font-bold py-2.5 px-5 rounded-lg text-sm hover:bg-zinc-700"
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        VER NO MAPA
      </motion.a>
    </div>
  );
};


/**
 * Componente principal do Footer (Layout V1 modificado)
 */
const Footer = () => (
  <footer id="contato" className="bg-zinc-950 text-zinc-400 py-12 md:py-16 font-sans border-t-2 border-gold">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
        CONTATO & <span className="text-gold-gradient">RESERVAS</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Coluna 1: Unidade A (Veleiros) */}
        {locationsData[0] && <LocationCard location={locationsData[0]} />}
        
        {/* Coluna 2: Unidade B (Dutra) */}
        {locationsData[1] && <LocationCard location={locationsData[1]} />}

        {/* Coluna 3: Contatos Gerais (Instagram e Facebook) */}
        <div className="bg-zinc-900 p-5 rounded-xl flex flex-col justify-start h-full border border-zinc-800">
          {/* Seção Instagram */}
          <div>
            <h3 className="font-bold text-lg text-gold-gradient">SIGA-NOS</h3>
            <div className="border-t border-zinc-800 mb-3"></div>
            <motion.a 
              href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-start gap-3 group py-3 px-4 bg-zinc-800 rounded-lg border border-zinc-700 w-full"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <Instagram className="text-[#FFDF70] flex-shrink-0" size={22} />
              <span className="text-white font-semibold text-sm group-hover:text-gold-gradient transition-colors">{SOCIAL.instagramHandle}</span>
            </motion.a>
          </div>
          
          {/* Seção Facebook (Nova) */}
          <div className="mt-6">
            <h3 className="font-bold text-lg text-gold-gradient">FACEBOOK</h3>
            <div className="border-t border-zinc-800 mb-3"></div>
            <div className="space-y-3">
              {FACEBOOK_LINKS.map((fb) => (
                <motion.a 
                  key={fb.name}
                  href={fb.href} 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-start gap-3 group py-3 px-4 bg-zinc-800 rounded-lg border border-zinc-700 w-full"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="text-blue-500 flex-shrink-0" size={22} />
                  <span className="text-white font-semibold text-sm group-hover:text-gold-gradient transition-colors">{fb.handle}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-zinc-500 text-xs text-center mt-12">
        <a
          href="https://alealencarrdev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-emerald-400"
        >
          &copy; {new Date().getFullYear()} - Desenvolvido por Alexandre Alencar
        </a>
      </p>
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
      {/* Estilos do Gradiente Dourado 
        Adicionados aqui para que o Tailwind possa ser sobrescrito 
        e para manter tudo em um só arquivo.
      */}
      <style>{`
        .text-gold-gradient {
          background-image: linear-gradient(145deg, #FFDF70, #B8860B, #FFDF70);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
        }
        
        .bg-gold-gradient {
          background-image: linear-gradient(145deg, #FFDF70, #B8860B, #FFDF70);
          background-size: 200% 200%; /* Para animação de hover se desejado */
          transition: background-position 0.4s ease;
        }

        .bg-gold-gradient:hover {
           background-position: right center; /* Efeito sutil no hover */
           filter: brightness(1.1);
        }
      `}</style>

      <div className={`bg-gray-950 text-gray-200`}>
        <Header />
        <main>
          <Hero />
          <Experience />
          <Cardapio />
          <Drinks />
          <Locations />
          <Reviews />
          <Visualizacao360 />
          <Delivery />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Fragment>
  );
}