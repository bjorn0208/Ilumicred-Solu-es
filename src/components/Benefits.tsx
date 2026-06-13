import { motion } from 'motion/react';
import { CreditCard, Home, Car, Heart } from 'lucide-react';
import RevealTitle from './RevealTitle';
import AnimatedIcon from './AnimatedIcon';
import SpotlightCard from './SpotlightCard';

export default function Benefits() {
  const benefits = [
    {
      icon: <CreditCard className="w-8 h-8 text-black" />,
      title: 'Novos Limites e Cartões',
      description: 'Chega de ter compras recusadas em caixas. Recupere o direito de aprovar limites nos principais bancos e tenha acesso novamente a cartões de crédito para suas necessidades e conquistas diárias.',
      theme: {
        containerClass: 'relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-amber-500/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(245,158,11,0.08)] transition-all duration-300 transform hover:-translate-y-2 h-[340px] overflow-hidden group flex flex-col justify-between',
        iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
        badge: 'text-amber-400 border border-amber-500/20 bg-amber-500/10',
        badgeText: 'GOLD VISA',
        customDecoration: (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Holographic credit card wave lines */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[60%] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full filter blur-xl transform -rotate-12" />
            
            {/* Metallic credit card chip */}
            <div className="absolute right-8 top-20 w-11 h-8 rounded-md bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-500 border border-yellow-200/40 p-1 flex flex-col justify-between shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)]">
              <div className="flex justify-between">
                <div className="w-2 h-1.5 bg-black/20 rounded-sm" />
                <div className="w-2.5 h-1.5 bg-black/20 rounded-sm" />
                <div className="w-2 h-1.5 bg-black/20 rounded-sm" />
              </div>
              <div className="w-full h-[2px] bg-black/20" />
              <div className="flex justify-between">
                <div className="w-2 h-1.5 bg-black/20 rounded-sm" />
                <div className="w-2.5 h-1.5 bg-black/20 rounded-sm" />
                <div className="w-2 h-1.5 bg-black/20 rounded-sm" />
              </div>
            </div>

            {/* Simulated credit card number */}
            <div className="absolute left-8 bottom-6 font-mono text-[10px] tracking-[0.25em] text-white/20 group-hover:text-amber-400/30 transition-colors duration-500 uppercase">
              ••••  ••••  ••••  8824
            </div>
          </div>
        )
      }
    },
    {
      icon: <Home className="w-8 h-8 text-black" />,
      title: 'Financiamento Imobiliário',
      description: 'O passaporte definitivo para tirar sua família do aluguel. Um CPF limpo é o requisito número um exigido pelas instituições para aprovar as chaves da sua casa própria ou apartamento.',
      theme: {
        containerClass: 'relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-blue-500/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-blue-400/60 shadow-[0_15px_35px_rgba(59,130,246,0.08)] transition-all duration-300 transform hover:-translate-y-2 h-[340px] overflow-hidden group flex flex-col justify-between',
        iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        badge: 'text-blue-400 border border-blue-500/20 bg-blue-500/10',
        badgeText: 'LAR SEGURO',
        customDecoration: (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Architect house outline shape blueprint in the background */}
            <svg className="absolute right-4 bottom-2 w-36 h-36 text-blue-500/5 group-hover:text-blue-400/10 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Pitch Roof */}
              <path d="M10 50 L50 15 L90 50 Z" />
              {/* House Base */}
              <rect x="22" y="50" width="56" height="40" />
              {/* Door */}
              <rect x="42" y="65" width="16" height="25" />
              {/* Window Left */}
              <rect x="30" y="56" width="10" height="10" />
              {/* Window Right */}
              <rect x="60" y="56" width="10" height="10" />
              {/* Chimney */}
              <path d="M70 30 L70 20 L78 20 L78 37.5" />
            </svg>
            
            {/* Grid architecture lines */}
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>
        )
      }
    },
    {
      icon: <Car className="w-8 h-8 text-black" />,
      title: 'Compra de Carros ou Motos',
      description: 'Aprove as melhores linhas de financiamento de veículos no mercado, com menor exigência de entrada e livre-arbítrio para negociar taxas de juros justas e parcelas adequadas ao seu bolso.',
      theme: {
        containerClass: 'relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-blue-500/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-blue-400/60 shadow-[0_15px_35px_rgba(59,130,246,0.08)] transition-all duration-300 transform hover:-translate-y-2 h-[340px] overflow-hidden group flex flex-col justify-between',
        iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        badge: 'text-blue-400 border border-blue-500/20 bg-blue-500/10',
        badgeText: 'CRÉDITO AUTO',
        customDecoration: (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Performance speedometer gauge watermark in background */}
            <svg className="absolute right-4 bottom-2 w-32 h-32 text-blue-500/5 group-hover:text-blue-400/10 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Speedometer semi-circle arc */}
              <path d="M15 75 A 38 38 0 1 1 85 75" strokeDasharray="3 3" />
              <path d="M22 68 A 38 38 0 0 1 78 68" strokeDasharray="14 4" strokeWidth="2" />
              {/* Speed ticks */}
              <line x1="15" y1="75" x2="22" y2="70" strokeWidth="2" />
              <line x1="50" y1="12" x2="50" y2="20" strokeWidth="2" />
              <line x1="85" y1="75" x2="78" y2="70" strokeWidth="2" />
              {/* Pointer dial pointing at maximum speed/limit dashboard */}
              <line x1="50" y1="50" x2="75" y2="35" strokeWidth="2.5" strokeLinecap="round" className="text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors duration-500" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>

            {/* Sporty carbon fiber texture or racing guide lines */}
            <div className="absolute bottom-6 right-8 flex gap-1">
              <div className="w-[3px] h-3 bg-blue-500/10 group-hover:bg-blue-500/30 transition-colors" />
              <div className="w-[3px] h-3 bg-blue-500/10 group-hover:bg-blue-500/30 transition-colors" />
              <div className="w-[3px] h-3 bg-blue-500/10 group-hover:bg-blue-500/30 transition-colors" />
              <div className="w-[3px] h-3 bg-yellow-500/10 group-hover:bg-yellow-500/40 transition-colors" />
            </div>
          </div>
        )
      }
    },
    {
      icon: <Heart className="w-8 h-8 text-black" />,
      title: 'Tranquilidade e Paz Mental',
      description: 'Sinta o alívio de não ser mais incomodado por ligações de assessorias de cobrança abusivas aos finais de semana. Recupere a dignidade de manter sua privacidade blindada e protegida.',
      theme: {
        containerClass: 'relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-amber-500/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-amber-400/60 shadow-[0_15px_35px_rgba(245,158,11,0.08)] transition-all duration-300 transform hover:-translate-y-2 h-[340px] overflow-hidden group flex flex-col justify-between',
        iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
        badge: 'text-amber-400 border border-amber-500/20 bg-amber-500/10',
        badgeText: 'PAZ MENTAL',
        customDecoration: (
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Concentric peaceful pulsing glowing heart vector */}
            <svg className="absolute right-4 bottom-2 w-32 h-32 text-amber-500/5 group-hover:text-amber-400/10 transition-all duration-700 transform group-hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              {/* Outer light heart */}
              <path d="M12 35 C 12 18, 38 15, 50 32 C 62 15, 88 18, 88 35 C 88 58, 62 78, 50 88 C 38 78, 12 58, 12 35 Z" strokeDasharray="3 3" />
              {/* Inner glowing heart */}
              <path d="M22 38 C 22 24, 42 22, 50 36 C 58 22, 78 24, 78 38 C 78 56, 58 72, 50 80 C 42 72, 22 56, 22 38 Z" strokeWidth="1.5" />
            </svg>

            {/* Glowing peaceful circular concentric halo in bottom corner */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border border-amber-500/5 group-hover:border-amber-500/10 transition-all duration-1000 animate-pulse" />
          </div>
        )
      }
    },
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealTitle className="text-3xl md:text-5xl font-bold text-white mb-4">
            O que muda na sua vida?
          </RevealTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Nome limpo é sinônimo de conquistas e liberdade financeira irrestrita.
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
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={benefit.theme.containerClass}
              >
                {/* Specific card watermark/custom layout details */}
                {benefit.theme.customDecoration}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <AnimatedIcon className={`w-14 h-14 rounded-2xl flex items-center justify-center ${benefit.theme.iconBg}`}>
                        {benefit.icon}
                      </AnimatedIcon>
                      
                      <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full ${benefit.theme.badge}`}>
                        {benefit.theme.badgeText}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

