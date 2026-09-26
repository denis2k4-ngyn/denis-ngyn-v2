import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Sparkles, HardHat } from 'lucide-react';

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
          AMBIENT TERRACOTTA & WARM SAND GLOW
          Animated breathing aura pulse
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      >
        <div className="w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.32)_0%,rgba(230,169,116,0.18)_45%,transparent_75%)] blur-2xl" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (TOP RIGHT)
          "Biến bản vẽ thành giá trị thật! ~" in Warm Espresso & Terracotta
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          y: [0, -6, 0],
          rotate: [3, 5.5, 3]
        }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        className="absolute -top-2 sm:-top-3 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans"
      >
        <div className="text-[#231B15] font-extrabold text-xs sm:text-base leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
          Biến bản vẽ<br />
          thành giá trị<br />
          <span className="text-[#C25E3E]">thật! ~</span>
        </div>
        <svg width="70" height="10" viewBox="0 0 100 12" className="mt-1 ml-auto text-[#C25E3E] sm:w-[100px] sm:h-[12px]">
          <path d="M 5 6 Q 50 1 95 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          TECHNICAL HUD METADATA (ARCHITECTURAL SPECIFICATION CARD)
          Warm Paper Style with Terracotta accents
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
        className="absolute -right-1 sm:-right-6 md:-right-8 top-20 sm:top-24 md:top-28 z-20 pointer-events-none bg-white/95 border border-[#E2DDD5] p-2.5 sm:p-3 rounded-xl backdrop-blur-md shadow-[0_12px_32px_rgba(35,27,21,0.08)] text-left font-mono scale-[0.82] sm:scale-100 origin-top-right"
      >
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#C25E3E] font-bold uppercase tracking-wider pb-1.5 border-b border-[#E8E1D5]">
          <span className="w-2 h-2 rounded-[2px] bg-[#C25E3E] shadow-[0_0_6px_rgba(194,94,62,0.6)]" />
          <span>ENGENIX SPECS</span>
          <span aria-hidden="true" className="text-[#C7BCAD]">/</span>
          <span className="text-[#6B6055]">V2.4</span>
        </div>
        <div className="mt-2 space-y-1.5 text-[11px] sm:text-xs text-[#231B15] font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#C25E3E] font-bold">30s</span>
            <span className="text-[#DDD5C7]">|</span>
            <span className="text-[#5C5248]">Xử lý tự động</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#2E6845] font-bold">95%+</span>
            <span className="text-[#DDD5C7]">|</span>
            <span className="text-[#5C5248]">Độ chuẩn xác</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C25E3E] font-bold">DXF · DWG</span>
            <span className="text-[#DDD5C7]">|</span>
            <span className="text-[#5C5248]">Vector gốc</span>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN SKETCH QUOTE (BOTTOM RIGHT POSITION)
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ 
          y: [0, -4, 0],
          rotate: [-2, -4, -2]
        }}
        transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-3 sm:-bottom-4 right-0 sm:-right-4 z-20 pointer-events-none text-right font-sans"
      >
        <div className="text-[#3A2E24] font-medium text-xs sm:text-sm leading-snug tracking-tight drop-shadow-sm">
          Cùng xây dựng<br />
          tương lai tốt đẹp hơn
        </div>
        <div className="text-[#C25E3E] text-sm font-bold rotate-[6deg]">
          ☺
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN 3D CHIBI CHARACTER RENDERER
          Natural breathing float physics with warm floor shadows
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        whileHover={{ scale: 1.025, transition: { duration: 0.25 } }}
        className={`relative group cursor-pointer transition-all duration-300 -translate-x-6 sm:translate-x-0 ${
          isDragOver ? 'scale-105 ring-4 ring-[#C25E3E] rounded-3xl' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        title="Nhấp để tải hoặc thay đổi ảnh Chibi Engineer"
      >
        {/* Floor drop shadow in warm umber with dynamic breathing scale */}
        <motion.div 
          animate={{ 
            scale: [1, 0.82, 1],
            opacity: [0.35, 0.18, 0.35]
          }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 sm:w-56 h-6 bg-[#382315]/40 rounded-[100%] blur-md" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 0.78, 1],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-3 bg-[#C25E3E]/25 rounded-[100%] blur-sm" 
        />

        {/* Display image if available */}
        {!imageError ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="Kỹ sư AI ENGENIX"
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
              className="relative w-72 sm:w-80 md:w-88 lg:w-96 h-auto max-h-[500px] sm:max-h-[540px] object-contain drop-shadow-[0_20px_35px_rgba(194,94,62,0.25)] drop-shadow-[0_8px_16px_rgba(40,25,15,0.15)] filter transition-transform duration-300 group-hover:scale-102"
            />
            {/* Quick change button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md border border-[#E2DDD5] px-2.5 py-1 rounded-full text-[10px] text-[#231B15] flex items-center gap-1 font-mono shadow-md">
              <Camera className="w-3 h-3 text-[#C25E3E]" />
              <span>Đổi ảnh</span>
            </div>
          </div>
        ) : (
          /* High-Fidelity 3D Chibi SVG illustration fallback with Warm Terracotta & Safety Vest */
          <div className="relative w-72 sm:w-80 md:w-88 h-[460px] rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F2ECE1] border-2 border-[#E2DDD5] p-5 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(35,27,21,0.08)] overflow-hidden group-hover:border-[#C25E3E]/50 transition-all">
            
            {/* Chibi Character Vector Representation */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center">
              {/* Terracotta Hardhat */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#A84A2C] via-[#C25E3E] to-[#D97757] flex items-center justify-center shadow-[0_12px_32px_rgba(194,94,62,0.35)] border-4 border-white">
                  <div className="flex flex-col items-center">
                    <HardHat className="w-16 h-16 text-white fill-white" />
                    <span className="text-[7px] font-black text-white tracking-widest uppercase mt-0.5">
                      BUILD BRIGHTER
                    </span>
                  </div>
                </div>
                {/* Cheerful star sparkle */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#C25E3E] border-2 border-white flex items-center justify-center text-white shadow-md animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Character Badge */}
              <div className="mt-3 text-center">
                <h4 className="font-extrabold text-[#231B15] text-base font-sans tracking-tight">
                  Kỹ sư AI ENGENIX
                </h4>
                <p className="text-[11px] text-[#C25E3E] font-mono mt-0.5">
                  &ldquo;Biến bản vẽ thành giá trị thật!&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Upload Action */}
            <div className="w-full bg-white border border-[#E2DDD5] hover:border-[#C25E3E] rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all shadow-2xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C25E3E]">
                <Upload className="w-3.5 h-3.5 text-[#C25E3E] animate-pulse" />
                <span>Nạp ảnh nogbtech.png</span>
              </div>
              <span className="text-[10px] text-[#5C5248] text-center leading-tight">
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
