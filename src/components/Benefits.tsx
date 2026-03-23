import { motion } from 'motion/react';
import { CreditCard, Home, Car, HeartHandshake } from 'lucide-react';
import RevealTitle from './RevealTitle';
import AnimatedIcon from './AnimatedIcon';
import SpotlightCard from './SpotlightCard';

export default function Benefits() {
  const benefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-white" />,
      title: 'Cartões de Crédito',
      description: 'Volte a ter limites aprovados nos principais bancos.',
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: 'Financiamento Imobiliário',
      description: 'Realize o sonho da casa própria sem barreiras no crédito.',
    },
    {
      icon: <Car className="w-8 h-8 text-white" />,
      title: 'Compra de Veículos',
      description: 'Aprove financiamentos de carros e motos com taxas melhores.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-white" />,
      title: 'Paz de Espírito',
      description: 'Durma tranquilo sem ligações de cobrança e restrições.',
    },
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
            O que muda na sua vida?
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Nome limpo é sinônimo de liberdade financeira.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <SpotlightCard key={index} className="rounded-3xl">
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 h-full holographic-shimmer"
              >
                <AnimatedIcon className="w-16 h-16 bg-[#155dfc] rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                  {benefit.icon}
                </AnimatedIcon>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{benefit.title}</h3>
                <p className="text-white/70 relative z-10">{benefit.description}</p>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
