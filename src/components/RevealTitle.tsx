import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  delay?: number;
}

export default function RevealTitle({ children, className = '', as = 'h2', delay = 0 }: RevealTitleProps) {
  const Component = motion[as as keyof typeof motion] as any;

  return (
    <Component
      layout
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
