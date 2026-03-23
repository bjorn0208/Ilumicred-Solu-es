import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
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
    <section className="py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dúvidas Frequentes
          </RevealTitle>
          <p className="text-lg text-white/70">
            Respostas claras para você tomar sua decisão com segurança.
          </p>
        </div>

        <motion.div layout className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              layout
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
            >
              <motion.div layout className="p-6 flex items-center justify-between">
                <motion.h3 layout className="text-lg font-bold text-white pr-8">{faq.question}</motion.h3>
                <motion.div layout className="shrink-0 text-blue-400">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-white/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
