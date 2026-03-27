import { motion } from 'motion/react';
import { Search, FileText, CheckCircle, RefreshCcw, TrendingUp } from 'lucide-react';
import RevealTitle from './RevealTitle';
import AnimatedIcon from './AnimatedIcon';
import SpotlightCard from './SpotlightCard';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: 'Análise do CPF',
      description: 'Consultamos seu CPF para identificar todos os apontamentos indevidos.',
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: 'Encaminhamento Legal',
      description: 'Nossos especialistas preparam a documentação baseada no CDC.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: 'Baixa das Negativações',
      description: 'Solicitamos a remoção dos registros nos órgãos de proteção.',
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-white" />,
      title: 'Atualização nos Órgãos',
      description: 'Acompanhamos a limpeza do seu nome em todos os sistemas.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: 'Recuperação do Score',
      description: 'Com o nome limpo, seu score volta a subir naturalmente.',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como funciona o processo?
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Um método transparente, legal e focado em resultados rápidos.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} relative z-10`}>
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>

                {/* Icon/Node */}
                <AnimatedIcon className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#155dfc] shadow-lg z-10 shrink-0 border-4 border-black">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 text-black rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </AnimatedIcon>

                {/* Empty space for alignment */}
                <div className="w-full md:w-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
