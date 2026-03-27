import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Guarantee() {
  return (
    <section className="py-24 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">Garantia Incondicional</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Risco Zero para você e para o seu bolso.
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Confiamos tanto em nosso método que oferecemos uma garantia de 6 meses. Se o seu nome voltar a ser negativado pelas mesmas dívidas nesse período, nós refazemos o serviço sem nenhum custo adicional.
            </p>
            
            <ul className="space-y-4">
              {[
                'Processo 100% amparado por lei',
                'Sigilo absoluto dos seus dados',
                'Contrato claro e sem letras miúdas',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-amber-400 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full max-w-md mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-white text-center relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg border-4 border-black">
                <Lock className="w-5 h-5 text-black" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 mt-4">Certificado de Segurança</h3>
              <p className="text-white/60 text-sm mb-6">
                Seus dados são criptografados e tratados de acordo com a LGPD (Lei Geral de Proteção de Dados).
              </p>
              
              <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                <p className="font-bold text-blue-400">
                  Garantia de 6 Meses
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Proteção estendida após a limpeza do seu nome.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
