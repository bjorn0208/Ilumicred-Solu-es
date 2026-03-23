import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import LegalExplanation from './components/LegalExplanation';
import Benefits from './components/Benefits';
import MultiStepForm from './components/MultiStepForm';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Chatbot from './components/Chatbot';
import AuroraBackground from './components/AuroraBackground';
import ScrollRevealOverlay from './components/ScrollRevealOverlay';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-blue-500 selection:text-white relative cursor-none">
      <CustomCursor />
      <ScrollRevealOverlay />
      <AuroraBackground />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Problem />
        <HowItWorks />
        <SocialProof />
        <LegalExplanation />
        <Benefits />
        <MultiStepForm />
        <Guarantee />
        <FAQ />
        <FinalCTA />
        <Chatbot />
        
        <footer className="bg-black/50 backdrop-blur-md text-white py-12 text-center text-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <p className="mb-4">© 2022 Ilumicred Soluções. Todos os direitos reservados.</p>
            <p className="text-xs text-white/50 max-w-2xl mx-auto">
              A Ilumicred Soluções não é uma instituição financeira e não realiza operações de crédito. Atuamos exclusivamente como consultoria administrativa e jurídica abordando na defesa do consumidor.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
