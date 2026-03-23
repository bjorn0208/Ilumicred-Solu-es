import { motion } from 'motion/react';
import RevealTitle from './RevealTitle';
import DynamicButton from './DynamicButton';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <RevealTitle className="text-4xl md:text-5xl font-bold mb-6">
          Pronto para dar o primeiro passo?
        </RevealTitle>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/80 mb-10"
        >
          Não deixe que o nome sujo impeça você de realizar seus sonhos. Fale com um especialista agora mesmo.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <DynamicButton href="#consulta">
            Quero Limpar Meu Nome
          </DynamicButton>
        </motion.div>
      </div>
    </section>
  );
}
