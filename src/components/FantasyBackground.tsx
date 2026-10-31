import React from 'react';

export const FantasyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4fa8ff] via-[#8ed1fc] to-[#e6f4fe]" />

      {/* Sun glow & light rays */}
      <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute top-8 right-12 w-32 h-32 rounded-full bg-yellow-200/50 blur-xl" />

      {/* Distant Clouds (Layer 1) */}
      <div className="absolute top-6 left-[-10%] w-[120%] flex justify-around opacity-40 animate-pulse duration-1000">
        <svg className="w-56 h-20 text-white" viewBox="0 0 100 40" fill="currentColor">
          <path d="M20,35 Q10,35 10,25 Q10,15 25,15 Q30,5 45,8 Q60,5 65,18 Q75,15 80,25 Q85,35 70,35 Z" />
        </svg>
        <svg className="w-72 h-24 text-white hidden md:block" viewBox="0 0 100 40" fill="currentColor">
          <path d="M20,35 Q10,35 10,25 Q10,15 25,15 Q30,5 45,8 Q60,5 65,18 Q75,15 80,25 Q85,35 70,35 Z" />
        </svg>
        <svg className="w-48 h-18 text-white" viewBox="0 0 100 40" fill="currentColor">
          <path d="M20,35 Q10,35 10,25 Q10,15 25,15 Q30,5 45,8 Q60,5 65,18 Q75,15 80,25 Q85,35 70,35 Z" />
        </svg>
      </div>

      {/* Closer Animated Clouds (Layer 2) */}
      <div className="absolute top-20 -left-20 w-80 h-28 opacity-75">
        <svg className="w-full h-full text-white/80 filter drop-shadow-sm" viewBox="0 0 120 50" fill="currentColor">
          <path d="M15,40 Q5,40 5,28 Q5,18 20,18 Q28,5 45,10 Q60,3 72,16 Q85,14 90,26 Q100,28 100,40 Z" />
        </svg>
      </div>
      <div className="absolute top-36 right-[-2rem] w-96 h-32 opacity-70">
        <svg className="w-full h-full text-white/80 filter drop-shadow-sm" viewBox="0 0 120 50" fill="currentColor">
          <path d="M15,40 Q5,40 5,28 Q5,18 20,18 Q28,5 45,10 Q60,3 72,16 Q85,14 90,26 Q100,28 100,40 Z" />
        </svg>
      </div>

      {/* Distant Mountains & Mondstadt Windmill Silhouette */}
      <div className="absolute bottom-28 left-0 right-0 h-48 opacity-45">
        <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none">
          <path
            d="M0,140 Q240,60 480,120 T960,80 T1440,130 L1440,200 L0,200 Z"
            fill="#7cb4e8"
          />
        </svg>
      </div>

      {/* Fantasy Windmills & Castle Spires */}
      <div className="absolute bottom-32 left-[12%] hidden sm:block opacity-65">
        {/* Windmill Tower */}
        <div className="relative w-8 h-20 bg-stone-500 rounded-t-sm shadow-md">
          {/* Windmill Cap */}
          <div className="absolute -top-4 -left-2 w-12 h-6 bg-red-800 rounded-t-full" />
          {/* Rotating Blades */}
          <div className="absolute -top-1 left-4 w-0 h-0 flex items-center justify-center animate-[spin_12s_linear_infinite]">
            <div className="absolute w-20 h-1.5 bg-amber-100/90 rounded-full shadow-sm" />
            <div className="absolute w-1.5 h-20 bg-amber-100/90 rounded-full shadow-sm" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-36 right-[15%] hidden md:block opacity-55 scale-75">
        {/* Second Windmill */}
        <div className="relative w-8 h-18 bg-stone-400 rounded-t-sm shadow-md">
          <div className="absolute -top-4 -left-2 w-12 h-5 bg-teal-800 rounded-t-full" />
          <div className="absolute -top-1 left-4 w-0 h-0 flex items-center justify-center animate-[spin_16s_linear_infinite]">
            <div className="absolute w-16 h-1 bg-amber-50/90 rounded-full" />
            <div className="absolute w-1 h-16 bg-amber-50/90 rounded-full" />
          </div>
        </div>
      </div>

      {/* Midground Rolling Green Hills */}
      <div className="absolute bottom-16 left-0 right-0 h-40">
        <svg className="w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none">
          <path
            d="M0,70 Q360,10 720,60 T1440,40 L1440,160 L0,160 Z"
            fill="#52b761"
          />
        </svg>
      </div>

      {/* Foreground Lush Grassland with flower specks */}
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
          <path
            d="M0,35 Q280,60 560,30 T1120,40 T1440,25 L1440,100 L0,100 Z"
            fill="#3da44f"
          />
        </svg>
      </div>

      {/* Floating Dandelion wind wisps (Anemo aesthetic) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 shadow-sm animate-pulse"
            style={{
              width: `${6 + (i % 3) * 3}px`,
              height: `${6 + (i % 3) * 3}px`,
              top: `${20 + (i * 14)}%`,
              left: `${10 + (i * 16)}%`,
              animationDuration: `${3 + i}s`,
            }}
          >
            <div className="w-full h-full rounded-full ring-2 ring-emerald-200/40" />
          </div>
        ))}
      </div>
    </div>
  );
};
