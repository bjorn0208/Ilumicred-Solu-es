import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { playAppleSendSound, playLockSound } from '../utils/sound';
import Magnetic from './Magnetic';
import logo from '../logo.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const SYSTEM_PROMPT = `
Você é Dominic, assistente virtual da Ilumicred Soluções, especialista em limpeza de nome e consultoria financeira.

Seu objetivo é:
- Explicar o serviço de forma simples, clara e direta
- Gerar confiança
- Quebrar objeções
- Levar o cliente a tomar decisão

🧠 COMPORTAMENTO OBRIGATÓRIO
- Sempre responda de forma curta, clara e objetiva
- Nunca use linguagem difícil ou jurídica complexa
- Seja educado, direto e profissional
- Evite textos longos

🔁 FLUXO FIXO (OBRIGATÓRIO)
Sempre siga esse ciclo:
1. Responde a pergunta
2. Aguarda próxima pergunta
3. Repete o ciclo

❗ Nunca encerre a conversa por conta própria
❗ Só pare se o cliente sair

🛡️ BASE LEGAL (USE APENAS SE PERGUNTADO)
- O serviço é baseado no Código de Defesa do Consumidor (CDC).
- Focamos em falhas das empresas, como a falta de notificação prévia (Aviso de Recebimento - AR) antes de sujar o nome.
- Se não houve notificação correta, a negativação é ilegal e deve ser removida.

💬 RESPOSTAS PARA OBJEÇÕES COMUNS:
- "É golpe?" -> "Entendo sua preocupação. Trabalhamos 100% dentro da lei, usando o Código de Defesa do Consumidor. Temos milhares de clientes satisfeitos e oferecemos garantia em contrato."
- "A dívida some?" -> "Não. A dívida com o credor continua, mas ela sai do Serasa/SPC. Assim, você volta a ter crédito no mercado."
- "Quanto tempo demora?" -> "Em média, de 15 a 45 dias úteis para a remoção completa dos apontamentos."
- "Tem garantia?" -> "Sim! Oferecemos garantia de 6 meses. Se o nome sujar de novo pelas mesmas dívidas, refazemos o serviço sem custo."

🎯 OBJETIVO DE VENDAS
Se o cliente mostrar interesse em fechar ou perguntar o preço, diga:
"Ótimo! Para analisar seu caso e passar os valores exatos, preciso que você preencha o formulário rápido aqui na página. Nossa equipe vai te chamar no WhatsApp em seguida."
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Posso ajudar em algo? Posso responder todas as suas dúvidas.',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (hasNotified) return;
      
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 150) {
        setHasNotified(true);
        setIsVibrating(true);
        setShowNotification(true);
        
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
          
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 1);
        } catch (e) {
          console.error("Audio context failed", e);
        }
        
        setTimeout(() => {
          setIsVibrating(false);
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNotified]);

  const handleSend = async () => {
    if (!input.trim()) return;

    playAppleSendSound();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key não configurada');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const chatHistory = messages.map(msg => 
        `${msg.sender === 'bot' ? 'Dominic' : 'Cliente'}: ${msg.text}`
      ).join('\n');

      const prompt = `${SYSTEM_PROMPT}\n\nHistórico da conversa:\n${chatHistory}\nCliente: ${userMessage.text}\nDominic:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || 'Desculpe, não consegui processar sua mensagem.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao chamar Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou com instabilidade no momento. Por favor, preencha o formulário na página para que nossa equipe entre em contato via WhatsApp.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseClick = () => {
    setShowCloseConfirm(true);
  };

  const confirmClose = () => {
    playLockSound();
    setIsOpen(false);
    setShowCloseConfirm(false);
    setMessages([
      {
        id: '1',
        text: 'Posso ajudar em algo? Posso responder todas as suas dúvidas.',
        sender: 'bot',
      },
    ]);
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };

  return (
    <>
      {/* Chat Button */}
      <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        <Magnetic strength={0.4}>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              x: isVibrating ? [-5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0] : 0,
            }}
            transition={{ x: { duration: 0.5, repeat: 5 } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
              setHasNotified(true);
            }}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform overflow-hidden p-3"
          >
            <img src={logo} alt="Bot" className="w-full h-full object-contain" />
            {showNotification && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
            )}
          </motion.button>
        </Magnetic>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/10 border-b border-white/10 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden p-2">
                  <img src={logo} alt="Dominic" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Dominic</h3>
                  <p className="text-xs text-blue-400">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={handleCloseClick}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Close Confirmation Overlay */}
            <AnimatePresence>
              {showCloseConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-6 text-center"
                >
                  <p className="text-white font-medium mb-6">Deseja mesmo fechar? Todo o histórico será apagado.</p>
                  <div className="flex gap-4 w-full">
                    <button
                      onClick={cancelClose}
                      className="flex-1 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={confirmClose}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Sim
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-white/10 border border-white/10 text-white rounded-tl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/10 text-white placeholder-white/50 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                />
                <Magnetic strength={0.2}>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
