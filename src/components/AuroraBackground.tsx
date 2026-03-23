import { motion } from 'motion/react';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      <motion.div
        animate={{
          x: ["0%", "10%", "-10%", "0%"],
          y: ["0%", "-10%", "10%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#155dfc]/20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: ["0%", "-15%", "10%", "0%"],
          y: ["0%", "15%", "-10%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-amber-500/10 blur-[150px]"
      />
      <motion.div
        animate={{
          x: ["0%", "20%", "-20%", "0%"],
          y: ["0%", "20%", "-20%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px]"
      />
    </div>
  );
}
