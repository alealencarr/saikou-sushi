import { motion } from 'framer-motion';
export const SectionTitle = ({ children, className }) => (
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