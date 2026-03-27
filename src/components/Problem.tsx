import { motion } from 'motion/react';
import { AlertCircle, XCircle, Ban } from 'lucide-react';
import RevealTitle from './RevealTitle';
import AnimatedIcon from './AnimatedIcon';
import SpotlightCard from './SpotlightCard';

export default function Problem() {
  const problems = [
    {
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      title: 'Nome Negativado',
      description: 'Dificuldade para aprovar cartões, financiamentos e até alugar imóveis.',
    },
    {
      icon: <XCircle className="w-8 h-8 text-white" />,
      title: 'Score Baixo',
      description: 'Mesmo pagando as contas em dia, seu score não sobe por causa do histórico.',
    },
    {
      icon: <Ban className="w-8 h-8 text-white" />,
      title: 'Crédito Negado',
      description: 'Portas fechadas no mercado financeiro, impedindo seus planos e sonhos.',
    },
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
            Você está cansado de ter o <span className="text-blue-400">crédito negado?</span>
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Ter o nome sujo não afeta apenas suas finanças, afeta sua paz de espírito e seus projetos de vida.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <SpotlightCard key={index} className="rounded-2xl">
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors h-full holographic-shimmer"
              >
                <AnimatedIcon className="w-16 h-16 bg-[#155dfc] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  {problem.icon}
                </AnimatedIcon>
                <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-white/70">{problem.description}</p>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
