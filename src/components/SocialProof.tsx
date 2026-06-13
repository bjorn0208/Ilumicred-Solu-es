import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Empresário',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      text: 'Consegui limpar meu nome em menos de 30 dias. O atendimento foi impecável e me passaram muita segurança.',
      scoreBefore: 350,
      scoreAfter: 700,
    },
    {
      name: 'Amanda Oliveira',
      role: 'Autônoma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      text: 'Eu tinha dívidas antigas que não saíam do Serasa. A Ilumicred resolveu tudo de forma legal e rápida.',
      scoreBefore: 210,
      scoreAfter: 720,
    },
    {
      name: 'Roberto Santos',
      role: 'Servidor Público',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
      text: 'Meu score subiu absurdamente depois do serviço. Finalmente consegui financiar meu carro novo.',
      scoreBefore: 400,
      scoreAfter: 780,
    },
  ];

  return (
    <section id="depoimentos" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Resultados que falam por si
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mt-6"
          >
            <div className="text-4xl md:text-5xl font-black text-blue-400">
              +<Counter end={5000} />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Clientes Atendidos</div>
              <div className="text-sm text-white/70">Nomes limpos e vidas transformadas</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <SpotlightCard key={index} className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group h-full holographic-shimmer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                
                <div className="flex text-amber-400 mb-6 relative z-10">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/80 mb-8 italic relative z-10">"{testimonial.text}"</p>
                
                <div className="border-t border-white/10 pt-6 mt-auto relative z-10">
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-white/15 shadow-md flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white transition-colors duration-300 group-hover:text-amber-400 leading-tight">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-white/50">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white/60 uppercase">Score Antes</span>
                      <span className="text-xs font-semibold text-blue-400 uppercase flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Score Depois
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white/50">{testimonial.scoreBefore}</span>
                      <div className="flex-1 h-2 mx-4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-amber-400 to-blue-500"
                        />
                      </div>
                      <span className="text-2xl font-black text-blue-400">
                        <Counter end={testimonial.scoreAfter} />
                      </span>
                    </div>
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
