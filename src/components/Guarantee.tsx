import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award } from 'lucide-react';

export default function Guarantee() {
  return (
    <section className="py-24 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Certificate Wrapper Card with smooth side fade-in/up entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-blue-950/40 via-slate-900/35 to-indigo-950/45 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-amber-500/20 shadow-[0_30px_60px_rgba(21,93,252,0.1)] overflow-hidden text-center max-w-2xl mx-auto"
        >
          {/* Certificate Fine Decorative Inner Border */}
          <div className="absolute inset-4 rounded-2xl border border-amber-500/10 pointer-events-none" />
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-amber-500/40" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-amber-500/40" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-amber-500/40" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-amber-500/40" />

          {/* Glowing background behind stamp */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

          {/* Guarantee Header Badge */}
          <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-6">
            <ShieldCheck className="w-4 h-4" />
            Compromisso Ilumicred
          </div>

          {/* Certificate Main Title */}
          <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-2 uppercase font-sans">
            Certificado de Risco Zero
          </h2>
          <p className="text-xs uppercase tracking-widest text-amber-500/70 font-mono mb-6">
            GARANTIA DE SATISFAÇÃO E PROTEÇÃO JURÍDICA
          </p>

          {/* Refined Seal Stamp */}
          <div className="relative z-10 flex justify-center mb-8">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.4)] border-4 border-blue-950/80">
              <Award className="w-10 h-10 text-amber-950 stroke-[1.5]" />
              {/* Spinning Seal Teeth simulation or border dots */}
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-950/30" />
            </div>
          </div>

          {/* Summarized, Highly Authoritative Copy */}
          <div className="relative z-10 max-w-md mx-auto space-y-4 mb-8">
            <p className="text-base md:text-lg text-white/95 leading-relaxed font-semibold">
              Risco zero para o seu bolso e para você.
            </p>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Confiamos integralmente em nosso método legal. Garantimos o acompanhamento do seu CPF por <strong>6 meses completos</strong>. Caso os mesmos apontamentos contestados e removidos retornem de forma indevida nesse período, nós refazemos todo o procedimento sem qualquer custo adicional para você.
            </p>
          </div>

          {/* Bottom Security Seals & Compliance Badges */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-6 border-t border-white/5 max-w-md mx-auto text-[9px] uppercase font-mono tracking-wider text-white/40">
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-amber-500">100% REGULAR</span>
              <span>De Acordo com o CDC</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-white/5 px-2">
              <span className="font-bold text-amber-400">DADOS SEGUROS</span>
              <span>Proteção LGPD</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-amber-500">SUPORTE TOTAL</span>
              <span>6 Meses de Resguardo</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
