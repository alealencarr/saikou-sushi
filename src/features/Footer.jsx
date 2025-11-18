import { locationsData, FACEBOOK_LINKS, SOCIAL, generateWhatsAppLink } from "../constants/config";
import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook,  MessageCircle} from 'lucide-react';

const LocationCard = ({ location }) => {
  const whatsappUrl = generateWhatsAppLink(location.phone, "reserva");

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
      
      <div className="flex-grow"></div>  
 
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

export const Footer = () => (
  <footer id="contato" className="bg-zinc-950 text-zinc-400 py-12 md:py-16 font-sans border-t-2 border-gold">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
        CONTATO & <span className="text-gold-gradient">RESERVAS</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {locationsData[0] && <LocationCard location={locationsData[0]} />}
             
        {locationsData[1] && <LocationCard location={locationsData[1]} />}
 
        <div className="bg-zinc-900 p-5 rounded-xl flex flex-col justify-start h-full border border-zinc-800">
     
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