import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, LogOut, History, Shield, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import Magnetic from './Magnetic';
import logo from '../logo.png';
import { useAuth } from '../lib/AuthContext';

export default function Navbar() {
  const { user, simulations, signInWithGoogle, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full flex flex-col items-center justify-center px-6 py-2 bg-black/40 backdrop-blur-md z-50 neumorphism-header transition-all duration-300">
        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex justify-start flex-1 items-center gap-3">
            <img src={logo} alt="Ilumicred Logo" className="h-10 md:h-14 w-auto object-contain" />
            
            {user && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 py-1 px-2.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Área logada
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 items-center">
            {/* Quick login or User status inside header */}
            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="hidden sm:flex items-center gap-2 py-1.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold select-none cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <LogIn className="w-3.5 h-3.5" /> Entrar
              </button>
            ) : (
              <div 
                onClick={() => setIsSidebarOpen(true)}
                className="hidden sm:flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/95 hover:bg-white/10 cursor-pointer select-none transition-colors"
                title="Minha Área"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-[10px] text-blue-300 border border-blue-500/30">
                    {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="max-w-[100px] truncate">{user.displayName?.split(' ')[0]}</span>
              </div>
            )}

            <Magnetic strength={0.3}>
              <button onClick={() => setIsSidebarOpen(true)} className="text-white hover:text-blue-500 transition-colors pointer-events-auto p-2 relative cursor-pointer">
                <Menu className="w-8 h-8" />
                {user && simulations.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-black animate-ping" />
                )}
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="w-full overflow-hidden marquee-container pointer-events-none mt-2">
          <div className="marquee-content font-bold text-xs md:text-sm tracking-[0.3em] uppercase bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            ILUMICRED SOLUÇÕES LTDA - CNPJ: 50.584.948/0001-00 - Osasco / SP
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 sm:w-96 h-full bg-black/65 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col pointer-events-auto overflow-y-auto"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center mb-6">
                <img src={logo} alt="Ilumicred Logo" className="h-10 w-auto" />
                <Magnetic strength={0.3}>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 transition-transform hover:rotate-90 p-2 cursor-pointer">
                    <X className="w-8 h-8" />
                  </button>
                </Magnetic>
              </div>

              {/* User Identity Center */}
              <div className="py-4 border-b border-white/10 mb-6">
                {!user ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center space-y-3">
                    <div className="text-sm font-semibold text-white/95">Área do Cliente</div>
                    <p className="text-xs text-white/60">Acesse com sua conta do Google para visualizar e gerenciar seu histórico de simulações.</p>
                    <button
                      onClick={async () => {
                        try {
                          await signInWithGoogle();
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs transition-colors cursor-pointer shadow-md"
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 pointer-events-none" />
                      Entrar com Google
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'avatar'} className="w-12 h-12 rounded-full border-2 border-blue-500/50" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center text-lg text-blue-300 font-bold">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{user.displayName}</div>
                        <div className="text-xs text-white/50 truncate">{user.email}</div>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        try {
                          await logout();
                          setIsSidebarOpen(false);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/5 border border-red-500/10 py-1.5 px-3 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sair da conta
                    </button>
                  </div>
                )}
              </div>

              {/* Real-time Simulations Panel */}
              <div className="flex-1 space-y-4 min-h-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40">
                  <History className="w-4 h-4" />
                  <span>Histórico de Simulações</span>
                  {user && simulations.length > 0 && (
                    <span className="ml-auto bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                      {simulations.length}
                    </span>
                  )}
                </div>

                {!user ? (
                  <div className="py-8 text-center text-xs text-white/40">
                    Acesse sua conta para ver seus relatórios salvos.
                  </div>
                ) : simulations.length > 0 ? (
                  <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1.5 custom-scrollbar pb-4">
                    {simulations.map((sim, idx) => (
                      <div key={sim.id || idx} className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 text-white/50 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            {sim.createdAt ? new Date(sim.createdAt).toLocaleDateString('pt-BR') : 'Data Indisponível'}
                          </span>
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 py-0.5 px-2 rounded-full uppercase tracking-wider">
                            Em análise
                          </span>
                        </div>
                        
                        <div className="text-white">
                          <div className="font-semibold text-white/80">Objetivo/Sonho:</div>
                          <p className="text-white/60 line-clamp-2 mt-0.5">{sim.sonho}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/10">
                          <div>
                            <span className="text-white/40 block text-[10px]">Restrições:</span>
                            <span className="text-white font-medium">{sim.negativado}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[10px]">Média de Dívida:</span>
                            <span className="text-white font-medium">{sim.valorDividas}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-blue-400 bg-blue-500/5 border border-blue-500/10 rounded-lg p-2 flex items-center justify-between font-medium mt-1">
                          <span>Serviço Sugerido: {sim.servico}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-white/40 border border-dashed border-white/10 rounded-xl">
                    Nenhuma simulação anterior encontrada.<br />Utilize o simulador abaixo para gerar sua primeira análise!
                  </div>
                )}
              </div>

              {/* Sidebar Quick Navigation Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
                <a href="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white/70 hover:text-white transition-all group">
                  <span>- INÍCIO -</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#como-funciona" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white/70 hover:text-white transition-all group">
                  <span>- COMO FUNCIONA -</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#depoimentos" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white/70 hover:text-white transition-all group">
                  <span>- DEPOIMENTOS -</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#consulta" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3.5 py-2.5 rounded-xl text-xs text-blue-400 hover:text-blue-300 transition-all font-semibold group">
                  <span>- REALIZAR SIMULADOR -</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
