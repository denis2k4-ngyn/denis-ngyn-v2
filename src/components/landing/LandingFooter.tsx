import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  Phone, 
  Mail, 
  ArrowUp, 
  Award, 
  FileText,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface LandingFooterProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoClick = () => {
    if (onExploreDemo) {
      onExploreDemo();
    } else {
      const el = document.getElementById('preview');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-transparent text-white font-sans relative overflow-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════
          REDESIGNED SECTION: SẴN SÀNG BÓC TÁCH (HERO CTA REDESIGN)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-t border-sky-500/15 overflow-hidden">
        
        {/* Subtle Ambient Radial Glow behind text (Electric Sky Blue palette) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[340px] rounded-full blur-[110px] pointer-events-none opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(2, 132, 199, 0.18) 50%, transparent 75%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Main Title: Elegant Serif with Italic Gradient Highlight */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.18]">
            Sẵn sàng chuyển đổi quy trình
            <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#bae6fd] via-[#38bdf8] to-[#0284c7] mt-1 sm:mt-2 font-normal">
              bóc tách sơn chuyên nghiệp?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
            Nạp bản vẽ DXF dự án của bạn ngay hôm nay để trải nghiệm tốc độ bóc tách 2 giờ thay vì 14 ngày.
          </p>

          {/* Centered CTA Buttons */}
          <div className="mt-9 sm:mt-11 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            
            {/* Primary Action Button */}
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:brightness-110 active:scale-98 text-white font-bold text-sm sm:text-base shadow-[0_4px_24px_rgba(14,165,233,0.4)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.6)] transition-all cursor-pointer"
            >
              <span>Nạp bản vẽ DXF ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={handleDemoClick}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-[#0b1324]/90 hover:bg-sky-500/15 border border-sky-500/30 hover:border-sky-400 text-white font-medium text-sm sm:text-base transition-all cursor-pointer shadow-sm backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#38bdf8]" />
              <span>Khám phá Dự án mẫu Sunrise Tower</span>
            </button>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          FOOTER MAIN: 4 COLUMNS MATCHING SPEC & SCREENSHOT (No grid, solid dark)
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 bg-[#040711] border-t border-sky-500/20 pt-14 pb-10 text-white/60 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand & Description (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <div 
                className="flex items-center gap-2.5 mb-4 cursor-pointer group"
                onClick={scrollToTop}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] p-[1.5px] shadow-[0_2px_12px_rgba(14,165,233,0.4)]">
                  <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight font-sans leading-none block">
                    AI Paint Take-off
                  </span>
                  <span className="text-[10px] text-sky-200/60 font-sans tracking-tight">
                    by ENGENIX
                  </span>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed text-xs max-w-sm">
                Nền tảng trí tuệ nhân tạo chuyên sâu bóc tách khối lượng từ bản vẽ 2D CAD (DXF/DWG) và lập dự toán BoQ tự động cho kỹ sư xây dựng.
              </p>
            </div>

            {/* Col 2: TIÊU CHUẨN KỸ THUẬT (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full">
                TIÊU CHUẨN KỸ THUẬT
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>TCVN 8652:2012 — Sơn tường xây</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Định mức 12/2021/TT-BXD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>DXF ASCII / Binary R12–2024</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Truy xuất 3 chiều: Handle CAD → BoQ</span>
                </li>
              </ul>
            </div>

            {/* Col 3: TÍNH NĂNG LÕI (2.5 cols) */}
            <div className="lg:col-span-2 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full">
                TÍNH NĂNG LÕI
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-white/70">
                <li>
                  <button 
                    onClick={handleDemoClick} 
                    className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer"
                  >
                    Dự án mẫu CAD Chung cư (Demo)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onGetStarted} 
                    className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer"
                  >
                    Tải lên tệp bản vẽ DXF
                  </button>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#38bdf8] transition-colors">
                    Bóc tách sơn lót & sơn phủ
                  </a>
                </li>
                <li>
                  <a href="#preview" className="hover:text-[#38bdf8] transition-colors">
                    Trình xem CAD 2D trực quan
                  </a>
                </li>
                <li>
                  <button 
                    onClick={onGetStarted} 
                    className="hover:text-[#38bdf8] transition-colors text-left cursor-pointer"
                  >
                    Xuất BoQ định dạng Excel/CSV
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: HỖ TRỢ DOANH NGHIỆP & QS (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full">
                HỖ TRỢ DOANH NGHIỆP & QS
              </h4>
              <div className="flex flex-col gap-3 text-xs text-white/70">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <div>
                    <span className="text-white/50 text-[10px] block leading-tight">Hotline Kỹ thuật</span>
                    <span className="text-white font-semibold">1900 6892</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <div>
                    <span className="text-white/50 text-[10px] block leading-tight">Email hỗ trợ</span>
                    <a href="mailto:kythuat@aipaint-takeoff.vn" className="text-white hover:text-[#38bdf8] transition-colors font-medium">
                      kythuat@aipaint-takeoff.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span className="text-white/60 text-[11px] leading-tight">
                    Hỗ trợ đào tạo đội ngũ QS, tích hợp API ERP xây dựng
                  </span>
                </div>

                {/* AI Service Live Status */}
                <div className="mt-1 pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-white/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Máy chủ AI: Hoạt động bình thường (99.9%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
            <div>
              © 2026 ENGENIX. Nền tảng phân tích bản vẽ & bóc tách khối lượng tự động.
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sky-400/80 font-medium">✓ Tiết kiệm 80% thời gian</span>
              <span>•</span>
              <span className="text-sky-400/80 font-medium">✓ Độ chính xác 95%+</span>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-white/60 hover:text-[#38bdf8] transition-colors cursor-pointer"
              >
                <span>Lên đầu trang</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
