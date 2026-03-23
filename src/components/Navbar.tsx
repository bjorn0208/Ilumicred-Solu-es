import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full flex flex-col items-center justify-center px-6 py-2 bg-black/40 backdrop-blur-md z-50 neumorphism-header transition-all duration-300">
        <div className="flex items-center justify-between w-full relative z-10">
          <div className="w-12"></div> {/* Spacer for centering */}
          
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Ilumicred Logo" className="h-12 md:h-16 w-auto object-contain" />
          </div>

          <div className="flex justify-end w-12">
            <Magnetic strength={0.3}>
              <button onClick={() => setIsSidebarOpen(true)} className="text-white hover:text-blue-500 transition-colors pointer-events-auto p-2">
                <Menu className="w-8 h-8" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="w-full overflow-hidden marquee-container pointer-events-none mt-2">
          <div className="marquee-content text-white/80 font-medium text-sm md:text-base tracking-widest uppercase">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full bg-black/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <Magnetic strength={0.3}>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 transition-transform hover:rotate-90 p-2">
                    <X className="w-8 h-8" />
                  </button>
                </Magnetic>
              </div>
              <div className="flex flex-col gap-8 text-xl items-center justify-center h-full pb-20">
                <Magnetic strength={0.2}>
                  <a href="#" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - INÍCIO -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#como-funciona" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - COMO FUNCIONA -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#depoimentos" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - DEPOIMENTOS -
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="#consulta" onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-blue-500 hover:scale-110 font-bold font-sans transition-all duration-300 uppercase tracking-widest inline-block">
                    - CONTATO -
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
