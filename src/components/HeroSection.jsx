import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = ({
  currentDate,
  direction,
  onPrev,
  onNext,
  onToday,
  heroImages,
  themeColor
}) => {
  const variants = {
    enter: (direction) => ({
      rotateX: direction > 0 ? 90 : -90,
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      transformOrigin: direction > 0 ? "top" : "bottom"
    }),
    center: {
      zIndex: 1,
      rotateX: 0,
      y: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      rotateX: direction < 0 ? 90 : -90,
      y: direction < 0 ? 100 : -100,
      opacity: 0,
      transformOrigin: direction < 0 ? "top" : "bottom"
    })
  };

  return (
    <div className="relative w-full shrink-0 h-[220px] sm:h-[340px] md:h-[380px] overflow-hidden perspective-1000">

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentDate.getMonth()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentDate.getMonth()]}
            alt="Calendar Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      <div className="absolute top-8 sm:top-12 md:top-14 right-6 sm:right-8 flex items-center gap-2 z-30">
        <button
          onClick={onToday}
          style={{ backgroundColor: `${themeColor}66` }}
          className="px-4 py-[6px] text-white rounded-full backdrop-blur-md text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border border-white/30 hover:bg-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
        >
          Today
        </button>

        <button
          onClick={onPrev}
          style={{ backgroundColor: `${themeColor}66` }}
          className="p-2.5 text-white rounded-full backdrop-blur-md transition-all duration-300 border border-white/30 hover:bg-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={onNext}
          style={{ backgroundColor: `${themeColor}66` }}
          className="p-2.5 text-white rounded-full backdrop-blur-md transition-all duration-300 border border-white/30 hover:bg-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[45%] z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full h-full relative"
        >
          <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,150 L350,280 L520,150 L800,280 L800,300 L0,300 Z" fill={themeColor} />
            <path d="M480,150 L800,280 L800,80 L480,150 Z" fill={themeColor} className="opacity-80" />
            <path d="M0,150 L350,280 L520,150 L800,280 L800,300 L0,300 Z" fill={themeColor} />
          </svg>

          <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 text-right text-white z-20">
            <motion.div
              key={`year-${currentDate.getFullYear()}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              className="text-lg sm:text-2xl font-display font-medium tracking-[0.2em] uppercase"
            >
              {format(currentDate, 'yyyy')}
            </motion.div>

            <motion.div
              key={`month-${currentDate.getMonth()}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-display font-black uppercase tracking-tighter -mt-1 sm:-mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
            >
              {format(currentDate, 'MMMM')}
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default HeroSection;