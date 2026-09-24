import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, Camera, Upload, Sparkles, HardHat } from 'lucide-react';

interface EngineerMascotProps {
  className?: string;
  onGetStarted?: () => void;
}

export const EngineerMascot: React.FC<EngineerMascotProps> = ({
  className = '',
}) => {
  const [imageSrc, setImageSrc] = useState<string>('/nogbtech.png');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ai_paint_mascot_img');
    if (saved && saved.startsWith('data:image')) {
      setImageSrc(saved);
      setImageLoaded(true);
      setImageError(false);
    } else {
      setImageSrc('/nogbtech.png');
    }
  }, []);

  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          setImageError(false);
          setImageLoaded(true);
          try {
            localStorage.setItem('ai_paint_mascot_img', result);
          } catch {
            // Storage quota catch
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* ─────────────────────────────────────────────────────────────
          AMBIENT ELECTRIC CYAN & COBALT GLOW (Themed to Tech Blue Chibi)
          Animated breathing aura pulse
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      >
        <div className="w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.38)_0%,rgba(2,132,199,0.18)_45%,transparent_75%)] blur-2xl" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (TOP RIGHT)
          "Biến bản vẽ thành giá trị thật! ~" in Tech Cyan & Sky
          Gentle floating & swaying motion
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          y: [0, -6, 0],
          rotate: [3, 5.5, 3]
        }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        className="absolute -top-2 sm:-top-3 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans"
      >
        <div className="text-[#bae6fd] font-extrabold text-xs sm:text-base leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Biến bản vẽ<br />
          thành giá trị<br />
          <span className="text-[#38bdf8]">thật! ~</span>
        </div>
        <svg width="70" height="10" viewBox="0 0 100 12" className="mt-1 ml-auto text-[#0ea5e9] sm:w-[100px] sm:h-[12px]">
          <path d="M 5 6 Q 50 1 95 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          TECHNICAL HUD METADATA (ARCHITECTURAL SPECIFICATION CARD)
          Crisp, unboxed technical typography with standard separators (·, |, /)
          Scaled down gracefully on mobile to preserve character visibility
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          y: [0, -8, 0] 
        }}
        transition={{ 
          opacity: { duration: 0.6, delay: 0.25 },
          x: { duration: 0.6, delay: 0.25 },
          y: { repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.6 }
        }}
        className="absolute -right-1 sm:-right-6 md:-right-8 top-20 sm:top-24 md:top-28 z-20 pointer-events-none bg-[#0a1222]/95 border border-sky-400/40 p-2.5 sm:p-3 rounded-xl backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.7)] text-left font-mono scale-[0.82] sm:scale-100 origin-top-right"
      >
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-sky-400 font-bold uppercase tracking-wider pb-1.5 border-b border-sky-500/20">
          <span className="w-2 h-2 rounded-[2px] bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <span>ENGENIX SPECS</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span className="text-white/60">V2.4</span>
        </div>
        <div className="mt-2 space-y-1.5 text-[11px] sm:text-xs text-white/80 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-sky-300 font-bold">30s</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">Xử lý tự động</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">95%+</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">Độ chuẩn xác</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-300 font-bold">DXF · DWG</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">Vector gốc</span>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (ORIGINAL BOTTOM RIGHT POSITION)
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          y: [0, -4, 0],
          rotate: [-2, -4, -2]
        }}
        transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-3 sm:-bottom-4 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans"
      >
        <div className="text-sky-100/90 font-medium text-xs sm:text-sm leading-snug tracking-tight drop-shadow-md">
          Cùng xây dựng<br />
          tương lai tốt đẹp hơn
        </div>
        <div className="text-[#38bdf8] text-sm font-bold rotate-[6deg]">
          ☺
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN 3D CHIBI CHARACTER RENDERER
          Natural breathing float physics with synchronized floor shadows
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        whileHover={{ scale: 1.025, transition: { duration: 0.25 } }}
        className={`relative group cursor-pointer transition-all duration-300 -translate-x-6 sm:translate-x-0 ${
          isDragOver ? 'scale-105 ring-4 ring-sky-400 rounded-3xl' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        title="Nhấp để tải hoặc thay đổi ảnh Chibi Engineer"
      >
        {/* Floor drop shadow with dynamic breathing scale */}
        <motion.div 
          animate={{ 
            scale: [1, 0.82, 1],
            opacity: [0.85, 0.45, 0.85]
          }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 sm:w-56 h-6 bg-black/85 rounded-[100%] blur-md" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 0.78, 1],
            opacity: [0.45, 0.22, 0.45]
          }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-3 bg-sky-500/35 rounded-[100%] blur-sm" 
        />

        {/* Display image if available */}
        {!imageError ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="Kỹ sư AI ENGENIX Xanh Kỹ Thuật"
              referrerPolicy="no-referrer"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                if (imageSrc !== '/nogbtech.png') {
                  setImageSrc('/nogbtech.png');
                } else {
                  setImageError(true);
                }
              }}
              className="relative w-72 sm:w-80 md:w-88 lg:w-96 h-auto max-h-[500px] sm:max-h-[540px] object-contain drop-shadow-[0_20px_40px_rgba(14,165,233,0.45)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] filter transition-transform duration-300 group-hover:scale-102"
            />
            {/* Quick change button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-sky-400/40 px-2.5 py-1 rounded-full text-[10px] text-sky-200 flex items-center gap-1 font-mono shadow-md">
              <Camera className="w-3 h-3 text-sky-400" />
              <span>Đổi ảnh</span>
            </div>
          </div>
        ) : (
          /* High-Fidelity 3D Chibi SVG illustration fallback with Tech Blue Helmet & Safety Vest */
          <div className="relative w-72 sm:w-80 md:w-88 h-[460px] rounded-3xl bg-gradient-to-b from-[#0e1828]/95 via-[#0a1120]/95 to-[#060b14] border-2 border-sky-500/40 p-5 flex flex-col items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden group-hover:border-sky-400 transition-all">
            
            {/* Chibi Character Vector Representation */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center">
              {/* Electric Blue Hardhat with Mountain Logo & Text */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center shadow-[0_12px_32px_rgba(14,165,233,0.6)] border-4 border-[#080d18]">
                  <div className="flex flex-col items-center">
                    <HardHat className="w-16 h-16 text-[#080d18] fill-[#080d18]" />
                    <span className="text-[7px] font-black text-[#080d18] tracking-widest uppercase mt-0.5">
                      BUILD BRIGHTER
                    </span>
                  </div>
                </div>
                {/* Cheerful star sparkle in Cyan */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] border-2 border-white flex items-center justify-center text-white shadow-md animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Character Badge */}
              <div className="mt-3 text-center">
                <h4 className="font-extrabold text-white text-base font-sans tracking-tight">
                  Kỹ sư AI ENGENIX
                </h4>
                <p className="text-[11px] text-sky-300/90 font-mono mt-0.5">
                  &ldquo;Biến bản vẽ thành giá trị thật!&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Upload Action */}
            <div className="w-full bg-[#0c1628] border border-sky-500/40 hover:border-sky-400 rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300">
                <Upload className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                <span>Nạp ảnh nogbtech.png</span>
              </div>
              <span className="text-[10px] text-white/70 text-center leading-tight">
                Nhấp hoặc kéo thả file ảnh từ máy vào đây!
              </span>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </motion.div>
    </div>
  );
};
