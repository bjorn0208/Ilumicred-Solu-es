import React, { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, User, Phone, AlertCircle, HelpCircle, DollarSign, Target } from 'lucide-react';
import RevealTitle from './RevealTitle';
import DynamicButton from './DynamicButton';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../utils/sound';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    negativado: '',
    valorDividas: '',
    objetivo: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name: string) => {
    if (name.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
    return '';
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) return 'Telefone inválido. Digite o DDD e o número.';
    return '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  const nextStep = () => {
    let currentError = '';
    if (step === 1) currentError = validateName(formData.name);
    if (step === 2) currentError = validatePhone(formData.phone);
    
    if (currentError) {
      setErrors((prev) => ({ ...prev, [step === 1 ? 'name' : 'phone']: currentError }));
      return;
    }

    if (step < 6) setStep(step + 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/marcospereira0208@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nome: formData.name,
          Telefone: formData.phone,
          Negativado: formData.negativado,
          ValorDividas: formData.valorDividas,
          Objetivo: formData.objetivo,
          _subject: 'Novo Lead - Ilumicred',
          _template: 'table'
        })
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }

    setIsSubmitting(false);

    const whatsappNumber = '5511961709847';
    const message = `Olá! Meu nome é ${formData.name}, meu WhatsApp é ${formData.phone}. Estou negativado? ${formData.negativado}. Valor das dívidas: ${formData.valorDividas}. Meu objetivo: ${formData.objetivo}. Gostaria de limpar meu nome.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');

    playSuccessSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#155dfc', '#fbbf24', '#ffffff']
    });
    setStep(6);
  };

  return (
    <section id="consulta" className="py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <RevealTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
            Descubra se você tem direito à <span className="text-blue-400">limpeza</span>
          </RevealTitle>
          <p className="text-lg text-white/70">
            Preencha os dados abaixo para uma análise gratuita e sem compromisso.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-white/5">
            <motion.div
              className="h-full bg-amber-400"
              initial={{ width: '20%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-[#155dfc] rounded-full flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">1. Qual é o seu nome?</h3>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className={`peer w-full text-xl p-4 pt-8 pb-2 border-b-2 ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-blue-400'} outline-none bg-transparent transition-colors text-white placeholder-transparent`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-white/40 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400 cursor-text"
                  >
                    Seu nome completo
                  </label>
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" /> {errors.name}
                  </p>
                )}
                
                <DynamicButton
                  onClick={nextStep}
                  disabled={!formData.name.trim()}
                  className="w-full mt-8"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </DynamicButton>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-[#155dfc] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">2. Qual é o seu WhatsApp?</h3>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    className={`peer w-full text-xl p-4 pt-8 pb-2 border-b-2 ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-blue-400'} outline-none bg-transparent transition-colors text-white placeholder-transparent`}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-2 text-white/40 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400 cursor-text"
                  >
                    (00) 00000-0000
                  </label>
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" /> {errors.phone}
                  </p>
                )}
                
                <DynamicButton
                  onClick={nextStep}
                  disabled={formData.phone.length < 10}
                  className="w-full mt-8"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </DynamicButton>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-[#155dfc] rounded-full flex items-center justify-center shrink-0">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">3. Você está com o nome negativado atualmente?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['Sim', 'Não', 'Não sei'].map((option) => (
                    <Magnetic key={option} strength={0.1}>
                      <button
                        onClick={() => handleOptionSelect('negativado', option)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-lg font-medium transition-all ${
                          formData.negativado === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-[#155dfc] rounded-full flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">4. Você sabe o valor total das suas dívidas?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['Sei exatamente', 'Tenho uma noção', 'Não faço ideia'].map((option) => (
                    <Magnetic key={option} strength={0.1}>
                      <button
                        onClick={() => handleOptionSelect('valorDividas', option)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-lg font-medium transition-all ${
                          formData.valorDividas === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-[#155dfc] rounded-full flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">5. Qual seu principal objetivo ao resolver seu nome?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['Conseguir crédito/cartão', 'Financiar (carro/moto/casa)', 'Sair das dívidas', 'Outro'].map((option) => (
                    <Magnetic key={option} strength={0.1}>
                      <button
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, objetivo: option }));
                        }}
                        className={`w-full p-4 rounded-xl border-2 text-left text-lg font-medium transition-all ${
                          formData.objetivo === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>

                <DynamicButton
                  onClick={() => { handleSubmit(); }}
                  disabled={!formData.objetivo || isSubmitting}
                  className="w-full mt-8"
                >
                  {isSubmitting ? 'Enviando...' : 'Finalizar Análise'} <CheckCircle2 className="w-5 h-5" />
                </DynamicButton>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                  className="w-24 h-24 bg-[#155dfc]/20 border border-[#155dfc]/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#155dfc]" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Tudo Certo, {formData.name.split(' ')[0]}!</h3>
                <p className="text-lg text-white/70 max-w-md mx-auto">
                  Recebemos seus dados. Nossos especialistas vão analisar seu CPF e entrarão em contato pelo WhatsApp em breve.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
