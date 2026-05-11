import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    image: '/prova1.jpeg',
    summary: 'Cliente conseguiu financiar uma moto zero após limpar o nome.',
  },
  {
    id: 2,
    image: '/prova2.jpg',
    summary: 'Score Serasa atingiu 945 pontos (Excelente) após nosso serviço.',
  },
  {
    id: 3,
    image: '/prova3.jpg',
    summary: 'Casal realizou o sonho de comprar uma moto Yamaha nova.',
  },
  {
    id: 4,
    image: '/prova4.jpg',
    summary: 'Aplicativo Serasa mostrando 0 dívidas negativadas.',
  },
  {
    id: 5,
    image: '/prova5.jpg',
    summary: 'Mais um cliente com o nome totalmente limpo e sem pendências.',
  },
  {
    id: 6,
    image: '/prova6.jpg',
    summary: 'Banco do Brasil liberou cartão de crédito com limite de R$ 2.900.',
  },
  {
    id: 7,
    image: '/prova7.jpg',
    summary: 'Mais uma conquista realizada com o nome limpo.',
  }
];

export default function SatisfiedCustomers() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 2500); // Muda a cada 2.5 segundos
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="clientes-satisfeitos" className="py-24 bg-[#111111] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2"
          >
            Resultados Reais
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Clientes Satisfeitos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Veja depoimentos e resultados reais de pessoas que confiaram no meu trabalho e hoje estão com o nome limpo
          </motion.p>
        </div>

        <div className="flex flex-col items-center">
          {/* Main Image Display */}
          <div className="w-full max-w-3xl aspect-[4/3] md:aspect-[16/9] bg-[#1A1A1A] rounded-2xl overflow-hidden relative shadow-2xl mb-6 border border-white/5 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].summary}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain bg-black/50"
              />
            </AnimatePresence>
            
            {/* Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-blue-600 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 border border-white/10 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-blue-600 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 border border-white/10 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Summary Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-20">
              <p className="text-white text-lg md:text-xl font-medium text-center">
                {testimonials[activeIndex].summary}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto w-full pb-4 snap-x justify-start md:justify-center px-4 custom-scrollbar">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden snap-center transition-all duration-300 ${
                  index === activeIndex 
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#111111] scale-105' 
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
