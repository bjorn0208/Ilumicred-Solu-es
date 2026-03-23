import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import RevealTitle from './RevealTitle';
import DynamicButton from './DynamicButton';

const words = ["legal", "segura", "jurídica"];

export default function Hero() {
  // Typewriter state
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setCurrentWord(
        isDeleting
          ? fullText.substring(0, currentWord.length - 1)
          : fullText.substring(0, currentWord.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 50);

      if (!isDeleting && currentWord === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 1800);
        return;
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-16 group">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          
          <RevealTitle as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight mt-20 uppercase">
            COM A <span className="text-blue-500">ILUMICRED SOLUÇÕES</span>, VOCÊ LIMPA SEU NOME E RECUPERA SEU CRÉDITO DE FORMA{' '}
            <span className="text-blue-400">{currentWord}</span>
            <span className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1 animate-pulse align-bottom" style={{ animationDuration: '1s' }}></span>
          </RevealTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Ajudamos você a remover apontamentos indevidos e restaurar seu score através de processos baseados no Código de Defesa do Consumidor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <DynamicButton href="#consulta">
              Consultar meu CPF agora
            </DynamicButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/80">
                Mais de <strong className="text-white">5.000</strong> clientes satisfeitos
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
