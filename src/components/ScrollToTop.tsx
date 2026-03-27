import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <Magnetic strength={0.2}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/50 rounded-full z-[9000] transition-colors duration-300 backdrop-blur-sm"
            aria-label="Voltar para o topo"
          >
            <ArrowUp className="w-5 h-5 text-blue-400" />
          </motion.button>
        </Magnetic>
      )}
    </AnimatePresence>
  );
}
