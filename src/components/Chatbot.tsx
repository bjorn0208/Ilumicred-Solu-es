import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Anthropic from '@anthropic-ai/sdk';
import { playAppleSendSound, playLockSound } from '../utils/sound';
import Magnetic from './Magnetic';
import logo from '../logo.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const SYSTEM_PROMPT = `
## IDENTIDADE E PERSONA
Nome: Dominic
Cargo: Assistente Virtual da Ilumicred Soluções
Especialidade: Limpeza de nome e consultoria financeira

## OBJETIVOS PRINCIPAIS
1. Explicar o serviço de forma simples, clara e direta
2. Gerar confiança no usuário
3. Quebrar objeções de venda
4. Levar o cliente a tomar a decisão de preencher o formulário

## REGRAS DE COMPORTAMENTO OBRIGATÓRIAS
Tom de Voz: Sempre responda de forma curta, clara e objetiva
Linguagem: Nunca use linguagem difícil ou jurídica complexa
Atitude: Seja educado, direto e profissional
Limite de Texto: Evite textos longos a todo custo
Encerramento: NUNCA encerre a conversa por conta própria; o bot só para se o cliente sair da página ou fechar o chat

## LÓGICA DE FLUXO DA CONVERSA
1. Responde a pergunta do cliente
2. Aguarda a próxima pergunta
3. Repete o ciclo infinitamente

## BASE LEGAL E CONHECIMENTO TÉCNICO
Fundamento: O serviço é baseado estritamente no Código de Defesa do Consumidor (CDC)
Argumento Principal: Focamos nas falhas das empresas credoras, especificamente a falta de notificação prévia via Aviso de Recebimento (AR) antes de negativar o nome
Tese Jurídica: Se não houve notificação correta (AR), a negativação é considerada ilegal perante o CDC e deve ser removida

## SCRIPTS DE QUEBRA DE OBJEÇÕES
Para "É golpe?":
"Entendo sua preocupação. Trabalhamos 100% dentro da lei, usando o Código de Defesa do Consumidor. Temos milhares de clientes satisfeitos e oferecemos garantia em contrato."

Para "A dívida some?":
"Não. A dívida com o credor continua, mas ela sai do Serasa/SPC. Assim, você volta a ter crédito no mercado."

Para "Quanto tempo demora?":
"Em média, de 15 a 45 dias úteis para a remoção completa dos apontamentos."

Para "Tem garantia?":
"Sim! Oferecemos garantia de 6 meses. Se o nome sujar de novo pelas mesmas dívidas, refazemos o serviço sem custo."

## SCRIPT DE CONVERSÃO
Quando o cliente mostra interesse em fechar ou pergunta o preço:
"Ótimo! Para analisar seu caso e passar os valores exatos, preciso que você preencha o formulário rápido aqui na página. Nossa equipe vai te chamar no WhatsApp em seguida."

## MENSAGENS PADRÃO DE INTERFACE
Mensagem Inicial: "Posso ajudar em algo? Posso responder todas as suas dúvidas."
Campo de Input: "Digite sua mensagem..."
Confirmação de Fechamento: "Deseja mesmo fechar? Todo o histórico será apagado."
Erro de Processamento: "Desculpe, não consegui processar sua mensagem."
Erro de API/Instabilidade: "Desculpe, estou com instabilidade no momento. Por favor, preencha o formulário na página para que nossa equipe entre em contato via WhatsApp."
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
      const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
      if (!apiKey) {
        throw new Error('Claude API Key não configurada');
      }

      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
      
      const messagesForAPI = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text,
      }));
      
      messagesForAPI.push({
        role: 'user',
        content: userMessage.text,
      });

      const response = await client.messages.create({
        model: 'claude-opus-4-1',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messagesForAPI as Anthropic.MessageParam[],
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.content[0].type === 'text' ? response.content[0].text : 'Desculpe, não consegui processar sua mensagem.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Erro ao chamar Claude API:', error);
      console.error('Erro completo:', error?.response?.data || error?.message || error);
      
      let errorText = 'Desculpe, não consegui processar sua mensagem.';
      
      if (error?.status === 404) {
        errorText = 'Modelo de IA não encontrado. Verifique a configuração da API.';
      } else if (error?.message?.includes('not_found')) {
        errorText = 'Modelo claudeNão disponível. Tente novamente mais tarde.';
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
              setHasNotified(true);
            }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all overflow-hidden p-3 border-2 border-blue-400/50"
          >
            <Cpu className="w-8 h-8" />
            {showNotification && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full border-3 border-white animate-pulse shadow-lg"></span>
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
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-gradient-to-b from-slate-900 via-black to-black backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Dominic" className="w-10 h-10 object-contain" />
                <div>
                  <h3 className="font-bold text-white text-lg">Dominic</h3>
                  <p className="text-xs text-blue-300">Assistente Virtual</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseClick}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Close Confirmation Overlay */}
            <AnimatePresence>
              {showCloseConfirm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center rounded-3xl"
                >
                  <p className="text-white font-semibold mb-6 text-base">Deseja mesmo fechar? Todo o histórico será apagado.</p>
                  <div className="flex gap-3 w-full">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelClose}
                      className="flex-1 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      Voltar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={confirmClose}
                      className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                    >
                      Sim
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-lg'
                        : 'bg-white/10 backdrop-blur-sm border border-blue-500/30 text-white rounded-tl-sm hover:bg-white/15 transition-colors'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-blue-500/30 p-3 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-blue-500/20">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 border border-blue-500/30 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                />
                <Magnetic strength={0.2}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 shadow-lg border border-blue-400/50"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
