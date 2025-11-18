import  { useState } from 'react';
import { generateWhatsAppLink,locationsData } from '../constants/config';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle} from 'lucide-react';

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

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const veleirosLink = generateWhatsAppLink(locationsData[0].phone, locationsData[0].name);
  const dutraLink = generateWhatsAppLink(locationsData[1].phone, locationsData[1].name);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      <AnimatePresence>
        {isOpen && (
          <>
         
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