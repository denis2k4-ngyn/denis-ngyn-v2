import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
  onLogin: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onGetStarted,
  onLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Sản phẩm');

  // Prevent background scrolling while mobile navigation menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Sản phẩm', href: '#hero' },
    { name: 'Xem trước', href: '#preview' },
    { name: 'Tính năng', href: '#features' },
    { name: 'Cách hoạt động', href: '#how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080d18]/95 backdrop-blur-xl border-b border-sky-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo: Tech Blue Isometric Home Icon + ENGENIX */}
        <div
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 min-w-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Electric Blue Gradient Icon matching Chibi's Tech Helmet & Vest */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] p-[1.5px] shadow-[0_2px_14px_rgba(14,165,233,0.4)] shrink-0">
            <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#38bdf8] sm:w-5 sm:h-5">
                <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21.5V12.5H15V21.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="1.5" fill="#0ea5e9" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col text-left truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight font-sans leading-none">
                ENGENIX
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">· AI CAD</span>
            </div>
            <span className="hidden sm:block text-[10px] text-white/50 font-mono tracking-tight leading-tight mt-1">
              BÓC TÁCH KHỐI LƯỢNG TỰ ĐỘNG
            </span>
          </div>
        </div>

        {/* Central Navigation Links with Tech Cyan hover indicators (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeNav === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveNav(item.name)}
                className={`relative py-1.5 transition-colors hover:text-[#38bdf8] ${
                  isActive ? 'text-white font-semibold' : 'text-white/70'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0284c7] to-[#38bdf8] rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Language VN + User [P] Phát Đức + Primary Blue Button + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Flag Selector */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 cursor-pointer hover:bg-white/10 hover:border-sky-500/30 transition-colors">
            <span className="text-sm">🇻🇳</span>
            <span>VN</span>
            <ChevronDown className="w-3 h-3 text-white/50" />
          </div>

          {/* User Account: Clean technical user label */}
          <div 
            onClick={onLogin}
            className="hidden sm:flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all cursor-pointer text-xs text-white"
          >
            <div className="w-5 h-5 rounded bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-[10px] font-mono font-bold text-sky-300">
              P
            </div>
            <span className="font-semibold hidden md:inline">Phát Đức</span>
            <span className="text-white/30 font-mono text-[10px] hidden md:inline">|</span>
            <span className="text-white/50 font-mono text-[10px] hidden md:inline">Kỹ sư</span>
          </div>

          {/* Primary Action Button: Bắt đầu ngay → (Hidden on mobile, shown in mobile drawer & on tablet/desktop) */}
          <button
            onClick={onGetStarted}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs md:text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:brightness-110 active:scale-98 rounded-xl shadow-[0_2px_12px_rgba(14,165,233,0.35)] transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>Bắt đầu ngay</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>

          {/* Mobile Menu Hamburger Button (Always visible on mobile & tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-sky-500/15 border border-sky-500/25 hover:border-sky-400/60 flex items-center justify-center text-white/90 hover:text-sky-300 transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop Overlay via React Portal directly into body */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden">
          {/* 1. Backdrop Scrim Overlay: Phủ mờ tối toàn bộ phần màn hình phía dưới */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-16 sm:top-18 bg-black/85 backdrop-blur-md z-40 transition-opacity duration-200"
            aria-hidden="true"
          />

          {/* 2. Floating Menu Drawer: Nền tối đặc 100% Solid Dark, hoàn toàn không xuyên thấu chữ phía sau */}
          <div className="fixed top-16 sm:top-18 left-0 right-0 z-50 bg-[#070c18] border-b border-sky-500/30 px-4 py-5 flex flex-col gap-2 text-sm text-white shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold px-3 pb-1 border-b border-white/10">
              ĐIỀU HƯỚNG NHANH
            </div>

            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-sky-500/10 hover:text-[#38bdf8] font-medium flex items-center justify-between"
            >
              <span>Sản phẩm</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-white/30" />
            </a>
            <a 
              href="#preview" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-sky-500/10 hover:text-[#38bdf8] font-medium flex items-center justify-between"
            >
              <span>Xem trước kết quả</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-white/30" />
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-sky-500/10 hover:text-[#38bdf8] font-medium flex items-center justify-between"
            >
              <span>Tính năng nổi bật</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-white/30" />
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-sky-500/10 hover:text-[#38bdf8] font-medium flex items-center justify-between"
            >
              <span>Quy trình hoạt động</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-white/30" />
            </a>

            {/* Mobile User Profile Info */}
            <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-[10px] font-mono font-bold text-sky-300">
                  P
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-xs text-white">Phát Đức</span>
                  <span className="text-white/50 text-[10px] font-mono">Kỹ sư dự toán</span>
                </div>
              </div>
              <span className="text-xs font-mono text-white/70">🇻🇳 VN</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] text-white font-bold text-sm text-center shadow-[0_4px_18px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Phân tích bản vẽ ngay</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
