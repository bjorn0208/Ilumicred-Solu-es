import { motion } from 'motion/react';
import { Scale, BookOpen, Shield, ShieldCheck, CheckCircle } from 'lucide-react';

export default function LegalExplanation() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle elegant background glowing effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-70" />
          
          {/* Main single card */}
          <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl overflow-hidden">
            {/* Top Security Line Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
            
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-8 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garantia e Segurança Jurídica
              </span>
              <span className="hidden sm:inline-flex items-center text-xs text-white/40">
                | Amparado pelo Código de Defesa do Consumidor
              </span>
            </div>

            {/* Title & Introduction */}
            <div className="text-center sm:text-left mb-10 pb-8 border-b border-white/5">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Tudo Amparado pela <span className="text-blue-400">Lei</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">
                Nosso trabalho não é baseado em facilidades temporárias ou promessas vazias. É a aplicação estrita e técnica do <strong>Código de Defesa do Consumidor (CDC)</strong>, garantindo de forma legal e definitiva a restauração da sua dignidade financeira.
              </p>
            </div>

            {/* Two-Column Internal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column: CDC Articles */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider font-mono">
                  Seus Direitos Resguardados
                </h3>
                
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 border border-blue-500/20">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Artigo 42 do CDC</h4>
                      <p className="text-sm text-white/60 mt-1 leading-relaxed">
                        O consumidor inadimplente não será exposto a ridículo, nem submetido a qualquer tipo de constrangimento ou ameaça.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 border border-blue-500/20">
                      <Scale className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Artigo 43 do CDC</h4>
                      <p className="text-sm text-white/60 mt-1 leading-relaxed">
                        É obrigação legal a notificação por escrito e com antecedência prévia sobre a inscrição de um CPF em qualquer cadastro de inadimplentes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Brecha / A Falha */}
              <div className="space-y-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white text-lg">A Falha Inadmissível das Empresas</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Mais de <strong>80% das negativações registradas</strong> hoje ocorrem sem o envio prévio obrigatório de correspondência formal (com Aviso de Recebimento de fato).
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Este vício procedimental configura desrespeito direto à lei, tornando a restrição sumariamente <strong>ilegal e passível de exclusão imediata</strong>.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-white/40">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nossos especialistas identificam e forçam legalmente a remoção.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
