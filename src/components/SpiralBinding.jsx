import React from "react";

const SpiralBinding = () => {
  const loops =
    typeof window !== "undefined" ? Math.floor(window.innerWidth / 75) : 24;

  const evenLoops = loops % 2 === 0 ? loops : loops - 1;
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      {/*  The Hanging Wire */}
      <div className="absolute -top-9 left-0 right-0 flex justify-center z-10">
        <svg
          width="300"
          height="40"
          viewBox="0 0 440 60"
          fill="none"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="50%" stopColor="#222" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          {/* Shadow for the wire */}
          <path
            d="M0,48 
            L120,48 
            C190,48 205,34 220,32 
            C235,34 250,48 320,48 
            L440,48"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="6"
            className="blur-[2px]"
            strokeLinecap="round"
            transform="translate(0, 4)"
          />
          {/* The Wire */}
          <path
            d="M0,48 
            L120,48 
            C190,48 205,34 220,32 
            C235,34 250,48 320,48 
            L440,48"
            stroke="url(#wire-grad)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central loop detail */}
          <circle cx="220" cy="32" r="4.5" fill="#111" />
        </svg>
      </div>

      {/* The Spiral Coil (Twin-loop style) */}
      <div className="relative z-20 flex justify-between items-start w-full px-3 sm:px-4 pt-3">
        {Array.from({ length: evenLoops }).map((_, i) => {
          const mid = Math.floor(evenLoops / 2);
          const isMiddleGap = i === mid || i === mid - 1;

          return (
            <div className="flex-1 flex flex-col items-center relative">
              {/* Show hole ONLY if coil exists */}
              {!isMiddleGap && (
                <div
                  className="w-[8px] h-[8px] bg-gradient-to-b from-[#3a3a3a] to-[#111] rounded-sm
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.75),0_1px_0px_rgba(255,255,255,0.12)]"
                />
              )}

              {/* The Twin-Loop Wire */}
              {!isMiddleGap && (
                <div className="absolute -top-[20px] flex gap-[4px] sm:gap-[5px] items-start">
                  {[0, 1].map((j) => (
                    <div key={j} className="relative">
                      <div className="w-[1.2px] h-3 bg-black/25 rounded-full absolute -top-0 left-0 " />
                      <div className="w-[1.6px] h-6  bg-gradient-to-b from-[#6b7280] via-[#2f2f2f] to-[#000]rounded-full shadow-[1px_2px_3px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)]" />
                      <div className="w-[1px] h-4 bg-white/15 rounded-full absolute top-0 left-[0.5px]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpiralBinding;
