import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import Magnetic from './Magnetic';
import logo from '../logo.png';

const ALL_QUESTIONS = [
  "Como funciona a limpeza de nome?",
  "Quanto tempo demora?",
  "É garantido?",
  "Quais dívidas vocês limpam?",
  "Quero falar com um atendente"
];

const ANSWERS: Record<string, string> = {
  "Como funciona a limpeza de nome?": "Nós entramos com uma ação judicial baseada no Código de Defesa do Consumidor para remover os apontamentos do seu CPF nos órgãos de proteção ao crédito (Serasa, SPC, Boa Vista).",
  "Quanto tempo demora?": "Processo Jurídico não tem data prevista. O que podemos dizer é que geralmente dura em torno de 15 a 45 úteis.",
  "É garantido?": "Sim! Trabalhamos com garantia em contrato. Você tem 6 meses de garantia caso o nome volte neste intermédio e você estiver pagando certinho suas parcelas conosco.",
  "Quais dívidas vocês limpam?": "Nós não quitamos a sua dívida! Nós removemos seus apontamentos dos ógãos de proteção ao crédito não governamentais.",
  "Quero falar com um atendente": "Ótimo! Vou te transferir para o nosso WhatsApp agora mesmo."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Sou o Dominic, assistente virtual da Ilumicred. Como posso ajudar com a recuperação do seu crédito hoje?', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [availableQuestions, setAvailableQuestions] = useState(ALL_QUESTIONS);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (question: string) => {
    // Add user message
    const userMsg = { id: Date.now().toString(), text: question, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    
    // Remove question from available
    setAvailableQuestions(prev => prev.filter(q => q !== question));
    
    setIsLoading(true);

    setTimeout(() => {
      const botMsg = { id: (Date.now() + 1).toString(), text: ANSWERS[question], sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      if (question === "Quero falar com um atendente") {
        setTimeout(() => {
          window.open("https://wa.me/5511961709847?text=Olá, vim pelo site e gostaria de falar com um atendente sobre a limpeza do meu nome.", "_blank");
        }, 1500);
      }
    }, 1000);
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        <Magnetic strength={0.4}>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
            }}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform overflow-hidden p-2"
          >
            <img src={logo} alt="Bot" className="w-full h-full object-contain" />
            {showNotification && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
            )}
          </motion.button>
        </Magnetic>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-[#0B1120] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-blue-600 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                  <img src={logo} alt="Dominic" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Dominic</h3>
                  <p className="text-blue-200 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0B1120]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-[#1E293B] text-slate-200 rounded-tl-sm'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1E293B] p-3 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[#0B1120] border-t border-white/5 shrink-0">
              <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
                {availableQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="w-full text-left bg-[#1E293B] hover:bg-blue-600 text-slate-200 hover:text-white text-sm py-3 px-4 rounded-xl border border-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
                {availableQuestions.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-2">Nenhuma outra pergunta disponível.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
