import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import RevealTitle from './RevealTitle';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'O serviço é realmente legal?',
      answer: 'Sim, 100% legal. Nosso trabalho é baseado no Código de Defesa do Consumidor (Art. 42 e 43). Atuamos identificando falhas no processo de negativação, como a falta de notificação prévia, o que torna a restrição ilegal.',
    },
    {
      question: 'Quanto tempo demora para limpar o nome?',
      answer: 'O prazo médio para a remoção completa dos apontamentos é de 15 a 45 dias úteis após o início do processo. Os órgãos de proteção removem em até 5 dias após a baixa.',
    },
    {
      question: 'A dívida deixa de existir?',
      answer: 'Não. A dívida original com o credor continua existindo, porém ela não poderá mais constar nos órgãos de proteção ao crédito (Serasa, SPC, Boa Vista), permitindo que você volte a ter crédito no mercado.',
    },
    {
      question: 'Meu score vai subir?',
      answer: 'Sim! Com a remoção das negativações, seu score tende a subir em um prazo de 7 a 15 dias, podendo retornar à maior pontuação que você teve nos últimos 5 anos.',
    },
    {
      question: 'E se o meu nome voltar a ficar sujo?',
      answer: 'Oferecemos uma garantia de 6 meses. Se o seu nome for negativado novamente pelas mesmas dívidas nesse período, refazemos o serviço sem nenhum custo adicional.',
    },
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Visual background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-5xl font-bold text-white mb-4">
            Dúvidas Frequentes
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Passe o mouse sobre as dúvidas para obter respostas claras de forma imediata e tomar sua decisão com segurança.
          </motion.p>
        </div>

        {/* Hover FAQ Container List */}
        <motion.div layout className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                layout
                key={index}
                onMouseEnter={() => setOpenIndex(index)}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-r from-blue-950/40 via-slate-900/30 to-indigo-950/40 border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.08)]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                {/* Glowing Left Indicator Accent Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300 ${
                    isOpen ? 'bg-gradient-to-b from-blue-400 to-amber-400' : 'bg-transparent'
                  }`}
                />

                <motion.div layout className="p-6 flex items-center justify-between gap-4 cursor-pointer select-none">
                  <div className="flex items-center gap-4">
                    {/* Animated Emblems with brand colors */}
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 shrink-0 ${
                        isOpen
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                          : 'bg-blue-600/5 border-blue-500/10 text-blue-400'
                      }`}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <motion.h3
                      layout
                      className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-white/80'
                      }`}
                    >
                      {faq.question}
                    </motion.h3>
                  </div>
                  
                  {/* Chevron Right/Down Rotating */}
                  <motion.div
                    layout
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 ${isOpen ? 'text-amber-400' : 'text-white/35'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pl-20 pr-8 pb-6 text-sm text-white/70 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

