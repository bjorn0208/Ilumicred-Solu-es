import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';

export default function AnimatedIcon({ children, className = '' }: { children: ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${className} ${isInView ? 'draw-svg' : ''}`}
    >
      {children}
    </motion.div>
  );
}
