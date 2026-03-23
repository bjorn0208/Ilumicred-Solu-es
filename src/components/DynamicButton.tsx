import { motion } from 'motion/react';
import React, { ReactNode, useRef, useState } from 'react';

interface DynamicButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function DynamicButton({ children, href, onClick, className = '', type = "button", disabled }: DynamicButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = `relative overflow-hidden group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#155dfc] text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(21,93,252,0.3)] transition-colors ${className}`;
  
  const content = (
    <motion.span 
      className="relative z-10 flex items-center gap-2"
      animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        whileHover={{ boxShadow: "0px 0px 30px rgba(21,93,252,0.6)" }}
        whileTap={{ scale: 0.95 }}
        className={baseClasses}
        onMouseEnter={() => {
          // Simulate prefetching for smooth UX
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          document.head.appendChild(link);
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={disabled ? {} : { boxShadow: "0px 0px 30px rgba(21,93,252,0.6)" }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </motion.button>
  );
}
