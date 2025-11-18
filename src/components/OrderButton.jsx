import  { useState } from 'react';
import { generateWhatsAppLink, locationsData } from '../constants/config';
import { motion, AnimatePresence } from 'framer-motion';
import {  X} from 'lucide-react';
export const OrderButton = () => {
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
              Pedir - Veleiros
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
              Pedir - Dutra
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