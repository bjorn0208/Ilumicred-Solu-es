import { useEffect, useState } from 'react';
import logo from '../logo.png';

export default function ScrollRevealOverlay() {
  const [virtualScroll, setVirtualScroll] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Virtual Scroll Logic
  useEffect(() => {
    if (isDone) return;

    let currentScroll = 0;
    const maxScroll = 800; // Amount of scroll needed to dismiss the overlay
    let startY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (currentScroll >= maxScroll) return;
      e.preventDefault(); // Prevent actual page scrolling
      
      currentScroll += e.deltaY;
      if (currentScroll < 0) currentScroll = 0;
      
      if (currentScroll >= maxScroll) {
        currentScroll = maxScroll;
        setIsDone(true);
      }
      
      setVirtualScroll(currentScroll);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (currentScroll >= maxScroll) return;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (currentScroll >= maxScroll) return;
      e.preventDefault(); // Prevent actual page scrolling
      
      const deltaY = startY - e.touches[0].clientY;
      startY = e.touches[0].clientY;
      
      currentScroll += deltaY;
      if (currentScroll < 0) currentScroll = 0;
      
      if (currentScroll >= maxScroll) {
        currentScroll = maxScroll;
        setIsDone(true);
      }
      
      setVirtualScroll(currentScroll);
    };

    // Lock body scroll and force scroll to top
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // Use passive: false to allow e.preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      // Restore body scroll when component unmounts or is done
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDone]);

  if (isDone) return null;

  const maxScroll = 800;
  const progress = Math.min(virtualScroll / maxScroll, 1);

  // Easing function for smoother transition (ease-out cubic)
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOut(progress);

  const overlayOpacity = 1 - easedProgress;
  const logoScaleDown = 1 - (easedProgress * 0.4); // Scales down to 0.6
  const logoOpacity = 1 - (progress * 1.5); // Fades out slightly faster than the background
  const logoBlur = progress * 15; // Blur up to 15px

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-75 pointer-events-auto"
      style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, ${0.85 * overlayOpacity}), rgba(0, 0, 0, ${0.95 * overlayOpacity}))`,
        backdropFilter: `blur(${20 * overlayOpacity}px)`,
        WebkitBackdropFilter: `blur(${20 * overlayOpacity}px)`,
      }}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{
          transform: `scale(${logoScaleDown}) translateY(-${virtualScroll * 0.3}px)`,
          opacity: Math.max(0, logoOpacity),
          filter: `blur(${logoBlur}px)`,
        }}
      >
        {/* Soft Glow */}
        <div 
          className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full"
          style={{ transform: 'scale(1.5)' }}
        ></div>
        
        {/* Logo - Metade da tela (50vw / 50vh) */}
        <img 
          src={logo}
          alt="Logo"
          className="w-[50vw] h-[50vh] object-contain relative z-10"
          style={{
            filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))'
          }}
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: Math.max(0, 1 - progress * 3) }}
      >
        <span className="text-white/50 text-sm tracking-widest uppercase font-medium">Role para baixo</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
