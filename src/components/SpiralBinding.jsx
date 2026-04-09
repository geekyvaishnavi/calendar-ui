import React from "react";

const SpiralBinding = () => {
  const loops =
    typeof window !== "undefined"
      ? (() => {
          const w = window.innerWidth;

          if (w < 640) return Math.floor(w / 35);
          if (w < 1024) return Math.floor(w / 50);
          return Math.floor(w / 90);
        })()
      : 24;

  const evenLoops = loops % 2 === 0 ? loops : loops - 1;
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      {/*  The Hanging Wire */}
      <div className="absolute -top-9 left-0 right-0 flex justify-center z-10">
        <svg
          width="75%"
          height="50"
          viewBox="0 0 560 70"
          fill="none"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="50%" stopColor="#222" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>

            <filter id="wire-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          {/* Shadow for the wire */}
          <path
            d="M0,48 
            L150,48 
            C230,48 255,40 272,38 
            C276,36 279,35 280,35 
            C281,35 284,36 288,38 
            C305,40 330,48 410,48
            L560,48"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={
              typeof window !== "undefined" && window.innerWidth < 640
                ? 2.8
                : 3.8
            }
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            transform="translate(0, 4)"
          />
          {/* The Wire */}
          <path
            d="M0,48 
            L150,48 
            C230,48 255,40 272,38 
            C276,36 279,35 280,35 
            C281,35 284,36 288,38 
            C305,40 330,48 410,48
            L560,48"
            stroke="url(#wire-grad)"
            strokeWidth={
              typeof window !== "undefined" && window.innerWidth < 640 ? 1.6 : 2
            }
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central loop detail */}
          <g>
            {/* Wall depth */}
            <ellipse cx="280" cy="22" rx="6" ry="4" fill="rgba(0,0,0,0.15)" />

            {/* Nail head */}
            <circle cx="280" cy="20" r="3.8" fill="#4a4a4a" />

            {/* Nail body */}
            <rect
              x="279"
              y="20"
              width="2"
              height="16"
              rx="1"
              fill="url(#wire-grad)"
            />

            <path
              d="M280,36 
              c1.5,2.5 4.5,2.5 6,0"
              stroke="url(#wire-grad)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeLinecap="round"
            />

            <rect
              x="279.6"
              y="20"
              width="0.6"
              height="14"
              fill="rgba(255,255,255,0.25)"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-20 flex justify-between items-start w-full px-3 sm:px-4 pt-3">
        {Array.from({ length: evenLoops }).map((_, i) => {
          const mid = Math.floor(evenLoops / 2);
          const isMiddleGap = i === mid || i === mid - 1;

          return (
            <div
              className="flex flex-col items-center relative"
              style={{ width: `${100 / evenLoops}%` }}
            >
              {!isMiddleGap && (
                <div
                  className="w-[7px] h-[7px] rounded-full 
                  bg-[#0f0f0f]
                  shadow-[inset_0_2px_3px_rgba(0,0,0,0.9),0_1px_0px_rgba(255,255,255,0.08)]"
                />
              )}

              {!isMiddleGap && (
                <div className="absolute -top-[20px] flex gap-[2px] sm:gap-[3.5px] items-start">
                  {[0, 1].map((j) => (
                    <div key={j} className="relative">
                      <div className="w-[1.2px] h-3 bg-black/25 rounded-full absolute -top-0 left-0 " />
                      <div className="w-[1.6px] h-6  bg-gradient-to-b from-[#6b7280] via-[#2f2f2f] to-[#000] rounded-full shadow-[1px_2px_3px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)]" />
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
