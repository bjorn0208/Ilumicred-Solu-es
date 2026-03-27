import { motion } from 'motion/react';
import { Scale, BookOpen, Shield } from 'lucide-react';

export default function LegalExplanation() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tudo amparado pela <span className="text-blue-400">Lei</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Nosso trabalho não é "jeitinho". É a aplicação rigorosa do Código de Defesa do Consumidor (CDC) para garantir seus direitos.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-400/30">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Artigo 42 do CDC</h4>
                  <p className="text-white/70">O consumidor inadimplente não será exposto a ridículo, nem será submetido a qualquer tipo de constrangimento ou ameaça.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#155dfc]/20 rounded-xl flex items-center justify-center shrink-0 border border-[#155dfc]/30">
                  <Scale className="w-6 h-6 text-[#155dfc]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Artigo 43 do CDC</h4>
                  <p className="text-white/70">O consumidor deve ser comunicado por escrito e com antecedência sobre a inscrição de seu nome em cadastros de inadimplentes.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-amber-400 rounded-3xl transform rotate-3 opacity-20 blur-lg" />
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative z-10 shadow-2xl">
              <Shield className="w-16 h-16 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">A Falha das Empresas</h3>
              <p className="text-white/70 mb-6">
                Mais de 80% das negativações no Brasil ocorrem sem a notificação prévia exigida por lei (AR). Isso torna a negativação <strong className="text-white">ilegal</strong>.
              </p>
              <p className="text-white/70">
                Nós identificamos essa falha e exigimos judicialmente ou administrativamente a remoção imediata do apontamento, restaurando seu crédito.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
