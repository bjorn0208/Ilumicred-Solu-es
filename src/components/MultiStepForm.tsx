import React, { useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, User, Target, AlertCircle, HelpCircle, DollarSign, MessageCircle, Briefcase, FileText, Phone } from 'lucide-react';
import RevealTitle from './RevealTitle';
import DynamicButton from './DynamicButton';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../utils/sound';
import logo from '../logo.png';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    telefone: '',
    sonho: '',
    servico: '',
    negativado: '',
    valorDividas: '',
    proposta: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    cpf: '',
    telefone: ''
  });

  const validateName = (name: string) => {
    if (name.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
    return '';
  };

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return 'O CPF deve conter exatamente 11 dígitos.';
    if (/^(\d)\1+$/.test(cleanCPF)) return 'CPF inválido (números repetidos).';
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return 'CPF inválido.';
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return 'CPF invalid.';
    
    return '';
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return 'Telefone inválido. Deve conter DDD + 8 ou 9 dígitos.';
    }
    return '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 9) {
      formatted = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      formatted = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      formatted = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    
    setFormData((prev) => ({ ...prev, cpf: formatted }));
    
    if (value.length === 11) {
      const errorMsg = validateCPF(value);
      setErrors((prev) => ({ ...prev, cpf: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, cpf: '' }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 10) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      formatted = `(${value.slice(0)}`;
    }
    
    setFormData((prev) => ({ ...prev, telefone: formatted }));
    
    if (value.length >= 10) {
      const errorMsg = validatePhone(value);
      setErrors((prev) => ({ ...prev, telefone: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, telefone: '' }));
    }
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    let currentError = '';
    if (step === 1) {
      currentError = validateName(formData.name);
      if (currentError) {
        setErrors((prev) => ({ ...prev, name: currentError }));
        return;
      }
    } else if (step === 2) {
      const cleanCPF = formData.cpf.replace(/\D/g, '');
      currentError = validateCPF(cleanCPF);
      if (currentError) {
        setErrors((prev) => ({ ...prev, cpf: currentError }));
        return;
      }
    } else if (step === 3) {
      const cleanPhone = formData.telefone.replace(/\D/g, '');
      currentError = validatePhone(cleanPhone);
      if (currentError) {
        setErrors((prev) => ({ ...prev, telefone: currentError }));
        return;
      }
    }

    if (step < 9) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = () => {
    setStep(9);

    playSuccessSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#155dfc', '#fbbf24', '#ffffff']
    });
  };

  const redirectToWhatsApp = () => {
    const whatsappNumber = '5511961709847';
    const message = `*Novo Contato via Site*

*Nome:* ${formData.name}
*CPF:* ${formData.cpf}
*Telefone:* ${formData.telefone}
*Sonho:* ${formData.sonho}
*Serviço:* ${formData.servico}
*Negativado:* ${formData.negativado}
*Média das dívidas:* ${formData.valorDividas}
*O que achou da proposta:* ${formData.proposta}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim().length >= 3;
    if (step === 2) {
      const cleanCPF = formData.cpf.replace(/\D/g, '');
      return cleanCPF.length === 11 && !errors.cpf;
    }
    if (step === 3) {
      const cleanPhone = formData.telefone.replace(/\D/g, '');
      return (cleanPhone.length === 10 || cleanPhone.length === 11) && !errors.telefone;
    }
    if (step === 4) return formData.sonho !== '';
    if (step === 5) return formData.servico !== '';
    if (step === 6) return formData.negativado !== '';
    if (step === 7) return formData.valorDividas !== '';
    if (step === 8) return formData.proposta !== '';
    return true;
  };

  return (
    <section id="consulta" className="py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center">
          <img src={logo} alt="Ilumicred Logo" className="h-32 w-auto mb-6 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
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
              className="h-full bg-blue-500"
              initial={{ width: '12.5%' }}
              animate={{ width: `${(step / 8) * 100}%` }}
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
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white/80 mb-2">Seja bem vindo(a) a Ilumicred Soluções.</h3>
                    <p className="text-white/80 mb-4">Eu sou o Dominic, seu consultor financeiro de bolso.</p>
                    <h3 className="text-2xl font-bold">Com quem eu tenho o prazer de falar?</h3>
                  </div>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
                    placeholder="Seu nome completo"
                    className={`peer w-full text-xl p-4 pt-8 pb-2 border-b-2 ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-blue-400'} outline-none bg-transparent transition-colors text-white placeholder-transparent`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-white/40 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400 cursor-text"
                  >
                    Seu nome
                  </label>
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" /> {errors.name}
                  </p>
                )}
                
                <div className="flex justify-end mt-8">
                  <DynamicButton
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full md:w-auto"
                  >
                    Continuar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
                </div>
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
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-medium mb-2">Muito obrigado, {formData.name.split(' ')[0]}!</p>
                    <h3 className="text-2xl font-bold">Informe o seu CPF para realizarmos a consulta:</h3>
                    <p className="text-white/60 text-sm mt-1">Fique tranquilo, seus dados estão protegidos sob sigilo criptografado.</p>
                  </div>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    onKeyPress={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
                    placeholder="000.000.000-00"
                    className={`peer w-full text-xl p-4 pt-8 pb-2 border-b-2 ${errors.cpf ? 'border-red-500' : 'border-white/20 focus:border-blue-400'} outline-none bg-transparent transition-colors text-white placeholder-transparent`}
                  />
                  <label
                    htmlFor="cpf"
                    className="absolute left-4 top-2 text-white/40 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400 cursor-text"
                  >
                    Seu CPF
                  </label>
                </div>
                {errors.cpf && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" /> {errors.cpf}
                  </p>
                )}
                
                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Qual é o seu melhor Telefone / WhatsApp?</h3>
                    <p className="text-white/60 text-sm mt-1">Nossa equipe entrará em contato para te dar o resultado da análise.</p>
                  </div>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    onKeyPress={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
                    placeholder="(00) 00000-0000"
                    className={`peer w-full text-xl p-4 pt-8 pb-2 border-b-2 ${errors.telefone ? 'border-red-500' : 'border-white/20 focus:border-blue-400'} outline-none bg-transparent transition-colors text-white placeholder-transparent`}
                  />
                  <label
                    htmlFor="telefone"
                    className="absolute left-4 top-2 text-white/40 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400 cursor-text"
                  >
                    Seu WhatsApp
                  </label>
                </div>
                {errors.telefone && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" /> {errors.telefone}
                  </p>
                )}
                
                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
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
                <div className="flex items-start gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-medium mb-2">Perfeito, {formData.name.split(' ')[0]}!</p>
                    <h3 className="text-2xl font-bold">O que você sonha conquistar ao colocar suas contas em dia?</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {['Casa própria', 'Carro', 'Moto', 'Financiamento'].map((option) => (
                    <Magnetic key={option} strength={0.05}>
                      <button
                        onClick={() => handleOptionSelect('sonho', option)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-base font-medium transition-all ${
                          formData.sonho === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
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
                <div className="flex items-start gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Qual serviço você busca?</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Limpa Nome', 'Consultoria Financeira', 'Bacen', 'Cadin', 'Cheque', 'Cartório', 'Score'].map((option) => (
                    <Magnetic key={option} strength={0.05}>
                      <button
                        onClick={() => handleOptionSelect('servico', option)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-base font-medium transition-all ${
                          formData.servico === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Você já sabe se o seu nome está negativado (com restrições nos órgãos de proteção ao crédito) no momento?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['Sim', 'Não'].map((option) => (
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

                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Qual é a média dos valores (pode ser um chute)?</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['3.000 a 5.000', '5.000 a 7.000', '10.000+'].map((option) => (
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

                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={nextStep} disabled={!isStepValid()} className="w-full md:w-auto">
                    Confirmar <ChevronRight className="w-5 h-5" />
                  </DynamicButton>
                </div>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 text-white mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">
                    O que você acha da opção de pagar apenas R$ 147,00, parcelas essas que cabem no seu bolso?
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {['Acho incrível', 'Parece bom demais para ser verdade'].map((option) => (
                    <Magnetic key={option} strength={0.1}>
                      <button
                        onClick={() => handleOptionSelect('proposta', option)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-lg font-medium transition-all ${
                          formData.proposta === option 
                            ? 'border-blue-500 bg-blue-500/20 text-white' 
                            : 'border-white/10 hover:border-white/30 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {option}
                      </button>
                    </Magnetic>
                  ))}
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                  <DynamicButton onClick={handleFinalSubmit} disabled={!isStepValid()} className="w-full md:w-auto">
                    Finalizar Análise <CheckCircle2 className="w-5 h-5" />
                  </DynamicButton>
                </div>
              </motion.div>
            )}

            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                  className="w-24 h-24 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-blue-500" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white">
                  {formData.proposta === 'Acho incrível' 
                    ? 'Muito bem, clique no botão abaixo para falar com um atendente. Muito obrigado pela preferência.' 
                    : 'Pois é, muitos clientes pensam assim no início, mas após uma conversa com nosso atendente, você vai sanar todas as suas dúvidas. Vamos lá?'}
                </h3>
                
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10 inline-block w-full max-w-sm">
                  <DynamicButton
                    onClick={redirectToWhatsApp}
                    className="w-full"
                  >
                    Quero limpar meu nome
                  </DynamicButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

