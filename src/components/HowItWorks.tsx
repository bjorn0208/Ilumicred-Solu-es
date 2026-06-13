import { motion } from 'motion/react';
import RevealTitle from './RevealTitle';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico do CPF',
      subtitle: 'Identificação de brechas',
      description: 'Análise aprofundada do seu CPF nos birôs de crédito para mapear falhas administrativas e ausência de notificações obrigatórias por lei.',
    },
    {
      number: '02',
      title: 'Fundamentação Legal',
      subtitle: 'Defesa pautada no CDC',
      description: 'Elaboração de uma contestação jurídica irrefutável com base nas infrações cometidas no ato de registro de sua negativação.',
    },
    {
      number: '03',
      title: 'Retirada de Restrições',
      subtitle: 'Exclusão dos apontamentos',
      description: 'Notificação e cobrança jurídica para a suspensão imediata e baixa das anotações no Serasa, SPC Brasil e Boa Vista SCPC.',
    },
    {
      number: '04',
      title: 'Auditoria de Sincronização',
      subtitle: 'Garantia de limpeza integral',
      description: 'Varredura final e auditoria completa em todas as ramificações de registro para garantir que seu CPF fique 100% livre de resquícios.',
    },
    {
      number: '05',
      title: 'Restauração do Score',
      subtitle: 'Retorno da confiança do mercado',
      description: 'Removidos os apontamentos do passado, os algoritmos atualizam sua nota e o seu Score volta a subir de maneira consistente.',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <RevealTitle className="text-3xl md:text-5xl font-bold text-white mb-6">
            Como funciona o processo?
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Um método transparente, legalizado e focado em restabelecer a sua dignidade e score financeiro.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-10 relative">
            {/* Elegant Background Connecting Line (vertical visual guide) */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent transform -translate-x-1/2 hidden md:block" />

            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  // Soft elegant side entry animation with high-speed smooth bezier easing
                  initial={{ opacity: 0, x: isEven ? -60 : 60, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                  className={`flex flex-col md:flex-row items-stretch gap-6 ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card wrapper */}
                  <div className="w-full md:w-[47%]">
                    <div className="group relative h-full bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.06] hover:to-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] flex flex-col justify-between overflow-hidden">
                      {/* Left glowing marker indicator */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Floating Large background elegant watermark numbers */}
                      <span className="absolute right-4 bottom-1 text-8xl font-mono font-bold text-white/[0.02] group-hover:text-white/[0.05] select-none tracking-tighter transition-all duration-500 transform group-hover:scale-105">
                        {step.number}
                      </span>

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                          {/* Sleek Badge index */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono font-bold text-sm">
                            {step.number}
                          </div>
                          <div>
                            <span className="text-xs uppercase font-mono tracking-wider text-blue-400 font-semibold">{step.subtitle}</span>
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual spacer element to align timelines nicely on desktop */}
                  <div className="hidden md:block md:w-[6%] relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping absolute" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-[47%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
