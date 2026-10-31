import React from 'react';
import { Volume2, VolumeX, Music, Music2, BookOpen, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio.ts';

interface QuizHeaderProps {
  isMuted: boolean;
  isBgmEnabled: boolean;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onOpenStudyGuide: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  isMuted,
  isBgmEnabled,
  onToggleMute,
  onToggleBgm,
  onOpenStudyGuide,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-2 pb-1 px-4 text-center">
      {/* Top utility row */}
      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-amber-300 shadow-xs text-xs font-bold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Bahasa Melayu Tahun 4</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Study Guide Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStudyGuide();
            }}
            aria-label="Buka Nota Poket Kata Adjektif"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-xs text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Nota Poket</span>
          </button>

          {/* Background Music Toggle */}
          <button
            onClick={onToggleBgm}
            aria-label={isBgmEnabled ? 'Matikan Muzik Latar' : 'Mainkan Muzik Latar'}
            title={isBgmEnabled ? 'Muzik Latar: Hidup' : 'Muzik Latar: Padam'}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border shadow-xs text-xs font-bold transition-all cursor-pointer active:scale-95 ${
              isBgmEnabled && !isMuted
                ? 'bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300'
                : 'bg-white/80 hover:bg-slate-100 text-slate-400 border-slate-300'
            }`}
          >
            {isBgmEnabled && !isMuted ? (
              <>
                <Music className="w-3.5 h-3.5 text-sky-600 animate-bounce" />
                <span className="hidden sm:inline">Muzik: On</span>
              </>
            ) : (
              <>
                <Music2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Muzik: Off</span>
              </>
            )}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Bunyikan Audio Kuiz' : 'Senyapkan Audio Kuiz'}
            title={isMuted ? 'Audio Kuiz: Senyap' : 'Audio Kuiz: Hidup'}
            className="p-1.5 rounded-full bg-white/90 hover:bg-amber-50 text-slate-700 border border-amber-300 shadow-xs transition-colors cursor-pointer active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Title Badge */}
      <div className="relative inline-block my-0.5">
        <div className="absolute -inset-1 bg-amber-400 rounded-2xl blur-xs opacity-40" />
        <div className="relative bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 border-2 border-amber-200 px-5 py-1 rounded-2xl shadow-md">
          <h1 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl md:text-3xl font-black text-amber-950 tracking-wider uppercase drop-shadow-xs">
            KUIZ PANTAS PAIMON
          </h1>
        </div>
      </div>

      {/* Instruction text required by user */}
      <p className="mt-1 text-xs sm:text-sm font-bold text-slate-800 bg-white/85 backdrop-blur-xs px-3.5 py-1 rounded-xl border border-sky-200 shadow-xs max-w-xl mx-auto leading-snug">
        “Jawab semua soalan untuk membantu Paimon mengenal pasti kata adjektif cara dan kata adjektif perasaan!”
      </p>
    </header>
  );
};
