import React from 'react';
import { X, BookOpen, Sparkles, Heart, Zap } from 'lucide-react';
import { STUDY_NOTES } from '../quiz/quizData.ts';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#fffef5] to-[#fbf7eb] border-4 border-amber-400 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header corner gems */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-amber-400 rotate-45" />
        <div className="absolute top-2 right-2 w-4 h-4 bg-amber-400 rotate-45" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Nota Poket"
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 bg-amber-400 text-amber-950 rounded-2xl shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 id="modal-title" className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-amber-950">
              Nota Poket Pengembara
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Panduan Cepat Bahasa Melayu Tahun 4
            </p>
          </div>
        </div>

        {/* Card 1: Kata Adjektif Cara */}
        <div className="mb-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h3 className="font-['Fredoka',sans-serif] text-lg font-bold">
              {STUDY_NOTES.cara.title}
            </h3>
          </div>
          <p className="text-sm text-slate-700 mb-2">
            {STUDY_NOTES.cara.description}
          </p>
          <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 mb-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block mb-1">
              Contoh Perkataan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STUDY_NOTES.cara.examples.map((ex) => (
                <span
                  key={ex}
                  className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-md border border-emerald-300"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-600 italic">
            Contoh ayat: “{STUDY_NOTES.cara.sampleSentence}”
          </p>
        </div>

        {/* Card 2: Kata Adjektif Perasaan */}
        <div className="mb-5 bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold mb-1">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-['Fredoka',sans-serif] text-lg font-bold">
              {STUDY_NOTES.perasaan.title}
            </h3>
          </div>
          <p className="text-sm text-slate-700 mb-2">
            {STUDY_NOTES.perasaan.description}
          </p>
          <div className="bg-white/80 p-2.5 rounded-xl border border-rose-200 mb-2">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wide block mb-1">
              Contoh Perkataan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STUDY_NOTES.perasaan.examples.map((ex) => (
                <span
                  key={ex}
                  className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-xs rounded-md border border-rose-300"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-600 italic">
            Contoh ayat: “{STUDY_NOTES.perasaan.sampleSentence}”
          </p>
        </div>

        {/* Quick Tip Box */}
        <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5 mb-5">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-950 font-medium">
            <strong className="font-bold">Petua Paimon:</strong> Jika perkataan itu boleh ditambah perkataan <span className="underline font-bold">“berasa”</span> di hadapannya (cth: berasa gembira, berasa bimbang), itu ialah <span className="font-bold">Kata Adjektif Perasaan</span>!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-['Fredoka',sans-serif] text-lg font-bold rounded-2xl shadow-md border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all cursor-pointer"
        >
          Saya Sudah Faham! Sambung Kuiz
        </button>
      </div>
    </div>
  );
};
