import Hero from "./features/Hero";
import Experience from "./features/Experience";
import Cardapio from './features/Cardapio';
import { Footer } from './features/Footer';
import { Drinks } from './features/Drinks';
import { Locations } from './features/Locations';
import { Reviews } from './features/Reviews';
import { Visualizacao360 } from './features/Visualizacao360';
import { RodizioEmCasaSection } from './features/RodizioEmCasaSection';
import { Delivery } from './features/Delivery';
import { WhatsAppButton } from './features/WhatsAppButton';
import { Header } from './features/Header.JSX';

export default function App() {
  return (
   
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
          <RodizioEmCasaSection />
          <Delivery />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
 
  );
}