import { motion } from 'motion/react';
import { AlertCircle, TrendingDown, Ban } from 'lucide-react';
import RevealTitle from './RevealTitle';
import AnimatedIcon from './AnimatedIcon';
import SpotlightCard from './SpotlightCard';

export default function Problem() {
  const problems = [
    {
      icon: <Ban className="w-8 h-8 text-white" />,
      title: 'Crédito sumariamente Negado',
      description: 'A dor e o constrangimento de receber uma resposta negativa imediata de gerentes e robôs de análise de crédito sempre que você tenta financiar um veículo, obter aprovação para cartões de crédito ou captar recursos para expandir sua empresa.',
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-white" />,
      title: 'Score Baixo e Estagnado',
      description: 'Mesmo mantendo todas as suas obrigações financeiras e contas estritamente em dia, sua pontuação de score de crédito teimosamente se recusa a subir devido ao peso de anotações antigas e injustas nos cadastros do mercado.',
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      title: 'Nome Negativado e Bloqueado',
      description: 'Apontamentos abusivos nos bancos de dados do SPC, Serasa ou Boa Vista que travam a sua vida financeira de ponta a ponta, inviabilizando compras básicas no carnê e até a simples aprovação da locação de um lar para sua família.',
    },
  ];

  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <RevealTitle className="text-2xl md:text-4xl font-semibold text-white/90 mb-4 tracking-tight leading-snug">
            Você está cansado de ver o seu <br />
            <span className="text-blue-400 font-bold">
              crédito ser recusado?
            </span>
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed font-sans"
          >
            A <strong className="text-white font-semibold">restrição de crédito</strong> afeta muito mais do que apenas um número nos sistemas. Ela limita a sua <strong className="text-blue-300 font-semibold">liberdade profissional</strong>, rouba a <strong className="text-amber-300 font-semibold">tranquilidade do seu sono</strong> e bloqueia o <strong className="text-white font-semibold">futuro dos seus sonhos</strong>.
          </motion.p>
        </div>

        {/* List Layout with staggered left/right spring transitions */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => {
            // Alternate entry directions: left and right
            const isEven = index % 2 === 0;
            const startX = isEven ? -150 : 150;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: startX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 45, 
                  damping: 14, 
                  duration: 0.85,
                  delay: 0.1 
                }}
                className="w-full"
              >
                <SpotlightCard className="rounded-2xl overflow-hidden w-full">
                  <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 hover:border-white/20 transition-all duration-300 holographic-shimmer w-full">
                    {/* Visual glowing icon container */}
                    <div className="relative shrink-0 select-none">
                      <AnimatedIcon className="w-16 h-16 bg-[#155dfc] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        {problem.icon}
                      </AnimatedIcon>
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-xl -z-10" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      {/* Interactive slide-in feel title inside the card */}
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                        {problem.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
