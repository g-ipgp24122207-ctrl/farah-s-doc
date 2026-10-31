import React from 'react';

export type CompanionMood = 'neutral' | 'happy' | 'thinking' | 'celebrating';

interface CompanionAvatarProps {
  mood?: CompanionMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  mood = 'neutral',
  speechText,
  size = 'md',
  layout = 'horizontal',
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  };

  const containerClass =
    layout === 'vertical'
      ? 'flex flex-col items-center gap-2 max-w-sm mx-auto my-1 text-center'
      : 'flex flex-row items-center gap-3 max-w-xl mx-auto my-1';

  return (
    <div className={containerClass}>
      {/* Floating Fairy Character Container */}
      <div className={`relative ${sizeMap[size]} shrink-0 animate-float`}>
        {/* Subtle Halo Glow */}
        <div className="absolute inset-1 bg-amber-200/40 rounded-full blur-md" />

        {/* SVG Illustration of Original Fantasy Guide Fairy */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md select-none transition-all duration-300"
          aria-label={`Watak Pembantu Paimon (${mood})`}
        >
          {/* Wings */}
          <g className="animate-pulse duration-1500">
            {/* Left Wing */}
            <path
              d="M 52,65 C 20,45 10,80 48,82 C 25,95 20,120 54,95 Z"
              fill="rgba(190, 235, 255, 0.85)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
            {/* Right Wing */}
            <path
              d="M 108,65 C 140,45 150,80 112,82 C 135,95 140,120 106,95 Z"
              fill="rgba(190, 235, 255, 0.85)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
          </g>

          {/* Floating Star Cape (Navy with Gold trim) */}
          <path
            d="M 55,95 C 40,135 60,150 80,148 C 100,150 120,135 105,95 Z"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
          {/* Cape Gold Constellation Star */}
          <polygon
            points="80,118 82,125 89,125 83,129 85,136 80,132 75,136 77,129 71,125 78,125"
            fill="#fbbf24"
          />

          {/* Body/Dress (White with gold embroidery) */}
          <path
            d="M 62,90 Q 80,95 98,90 L 92,126 Q 80,130 68,126 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <circle cx="80" cy="104" r="3" fill="#eab308" />
          <circle cx="80" cy="116" r="2.5" fill="#eab308" />

          {/* Hands */}
          {mood === 'celebrating' ? (
            <g>
              <circle cx="50" cy="78" r="6.5" fill="#ffe4d6" />
              <circle cx="110" cy="78" r="6.5" fill="#ffe4d6" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              <circle cx="68" cy="98" r="6" fill="#ffe4d6" />
              <circle cx="96" cy="85" r="6" fill="#ffe4d6" />
            </g>
          ) : (
            <g>
              <circle cx="52" cy="100" r="6" fill="#ffe4d6" />
              <circle cx="108" cy="100" r="6" fill="#ffe4d6" />
            </g>
          )}

          {/* Head Base */}
          <circle cx="80" cy="70" r="30" fill="#ffe8dc" />

          {/* Fluffy White/Silver Hair */}
          <path
            d="M 50,68 C 45,40 70,30 80,30 C 90,30 115,40 110,68 C 118,78 116,92 106,94 C 98,82 102,70 100,68 C 90,62 70,62 60,68 C 58,70 62,82 54,94 C 44,92 42,78 50,68 Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Front Bangs */}
          <path
            d="M 55,56 Q 70,72 80,58 Q 90,72 105,56 Q 80,42 55,56 Z"
            fill="#f1f5f9"
          />

          {/* Rosy Cheeks */}
          <ellipse cx="64" cy="76" rx="5" ry="3" fill="#fda4af" opacity="0.65" />
          <ellipse cx="96" cy="76" rx="5" ry="3" fill="#fda4af" opacity="0.65" />

          {/* Eyes according to Mood */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <g stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M 64,68 Q 70,62 74,68" />
              <path d="M 86,68 Q 90,62 96,68" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              <circle cx="68" cy="68" r="4.5" fill="#0284c7" />
              <circle cx="69" cy="67" r="1.5" fill="#ffffff" />
              <circle cx="92" cy="67" r="4.5" fill="#0284c7" />
              <circle cx="93" cy="66" r="1.5" fill="#ffffff" />
              <path d="M 65,60 Q 69,57 73,59" stroke="#475569" strokeWidth="1.5" fill="none" />
              <path d="M 88,57 Q 92,55 96,58" stroke="#475569" strokeWidth="1.5" fill="none" />
            </g>
          ) : (
            <g>
              <circle cx="68" cy="68" r="5" fill="#0284c7" />
              <circle cx="70" cy="66" r="1.8" fill="#ffffff" />
              <circle cx="92" cy="68" r="5" fill="#0284c7" />
              <circle cx="94" cy="66" r="1.8" fill="#ffffff" />
            </g>
          )}

          {/* Mouth according to Mood */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <path
              d="M 74,78 Q 80,88 86,78 Z"
              fill="#e11d48"
              stroke="#be123c"
              strokeWidth="1"
            />
          ) : mood === 'thinking' ? (
            <circle cx="80" cy="80" r="2.5" fill="#e11d48" />
          ) : (
            <path
              d="M 75,78 Q 80,83 85,78"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Golden Floating Crown / Hairpin */}
          <g>
            <polygon
              points="70,30 75,20 80,27 85,20 90,30 80,34"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="80" cy="27" r="2" fill="#ef4444" />
          </g>

          {/* Sparkles for Celebrating */}
          {mood === 'celebrating' && (
            <g>
              <polygon points="35,35 37,30 42,32 37,34" fill="#fbbf24" />
              <polygon points="125,35 127,30 132,32 127,34" fill="#fbbf24" />
              <polygon points="40,110 42,105 47,107 42,109" fill="#38bdf8" />
            </g>
          )}
        </svg>

        <div className="w-14 h-2 mx-auto bg-slate-800/20 rounded-full blur-xs mt-0.5" />
      </div>

      {/* Speech Bubble / Dialogue Box */}
      {speechText && (
        <div className="relative flex-1 bg-white/95 backdrop-blur-xs border-2 border-amber-400 rounded-2xl p-3 shadow-md text-slate-800 text-left">
          {/* Decorative Corner Gems */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-amber-400 rotate-45 rounded-xs" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rotate-45 rounded-xs" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-amber-400 rotate-45 rounded-xs" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-amber-400 rotate-45 rounded-xs" />

          {/* Pointer tail */}
          <div className="hidden sm:block absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-6 border-r-amber-400 border-b-6 border-b-transparent" />

          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-['Fredoka',sans-serif] text-[11px] font-bold tracking-wide uppercase px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Paimon (Pemandu Kuiz)
            </span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
            {speechText}
          </p>
        </div>
      )}
    </div>
  );
};
