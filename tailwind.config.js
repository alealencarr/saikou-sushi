/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  // 1. Arquivos para o Tailwind "ler"
  // ATENÇÃO: Isso é crucial para o build de produção
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // 2. Extensão do Tema (aqui entram as fontes)
  theme: {
    extend: {
      fontFamily: {
        // Define 'font-sans' como Inter (com fallback)
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        
        // Define 'font-serif' como Playfair Display (com fallback)
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      // Aqui você também poderia adicionar suas cores 'gold-gradient', etc.
    },
  },
  
  // 3. Plugins (se precisar no futuro)
  plugins: [],
}