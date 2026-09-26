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
    <div className="bg-transparent text-[#231B15] font-sans relative overflow-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════
          SECTION: SẴN SÀNG BÓC TÁCH (HERO CTA REDESIGN)
          Warm Sand & Terracotta Ambient Atmosphere
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-t border-[#E8E1D5] overflow-hidden">
        
        {/* Subtle Ambient Radial Glow behind text (Terracotta & Amber Palette) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[340px] rounded-full blur-[110px] pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 87, 0.35) 0%, rgba(230, 169, 116, 0.15) 50%, transparent 75%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Eyebrow Kicker */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#C25E3E] uppercase mb-4 sm:mb-5">
            <span className="shrink-0">TIẾT KIỆM 90% THỜI GIAN</span>
            <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
            <span className="shrink-0">ĐỘ CHUẨN XÁC 95%+</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#231B15] tracking-tight leading-[1.2]">
            Sẵn sàng chuyển đổi quy trình<br className="hidden sm:inline" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#231B15] via-[#C25E3E] to-[#9E4326]">
              bóc tách khối lượng tự động?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#5C5248] max-w-2xl mx-auto leading-relaxed">
            Nạp bản vẽ DXF dự án của bạn ngay hôm nay để trải nghiệm tốc độ bóc tách 2 giờ thay vì 14 ngày.
          </p>

          {/* Centered Dual CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 max-w-lg sm:max-w-none mx-auto">
            
            {/* Primary Terracotta Action Button */}
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl terracotta-button hover:brightness-105 active:scale-98 text-white font-bold text-sm sm:text-base shadow-[0_4px_24px_rgba(194,94,62,0.38)] transition-all cursor-pointer"
            >
              <span>Nạp bản vẽ DXF ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2DDD5] hover:border-[#C25E3E] text-[#231B15] font-medium text-sm sm:text-base transition-all cursor-pointer shadow-2xs backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#C25E3E]" />
              <span>Khám phá Dự án mẫu Sunrise Tower</span>
            </button>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER MAIN: Warm Architectural Espresso Charcoal Grounding
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 bg-[#16100B] border-t border-[#34241A] pt-14 pb-10 text-[#A89C90] text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#34241A]">
            
            {/* Col 1: Brand & Description (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <div 
                className="flex items-center gap-2.5 mb-4 cursor-pointer group"
                onClick={scrollToTop}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A84A2C] via-[#C25E3E] to-[#D97757] p-[1.5px] shadow-[0_2px_12px_rgba(194,94,62,0.4)]">
                  <div className="w-full h-full bg-[#201610] rounded-[10px] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#E29578]" />
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight font-sans leading-none block">
                    AI Paint Take-off
                  </span>
                  <span className="text-[10px] text-[#D97757] font-sans tracking-tight">
                    by ENGENIX
                  </span>
                </div>
              </div>

              <p className="text-[#A89C90] leading-relaxed text-xs max-w-sm">
                Nền tảng trí tuệ nhân tạo chuyên sâu bóc tách khối lượng từ bản vẽ 2D CAD (DXF/DWG) và lập dự toán BoQ tự động cho kỹ sư xây dựng.
              </p>
            </div>

            {/* Col 2: TIÊU CHUẨN KỸ THUẬT (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#E8DDD2] mb-4 pb-2 border-b border-[#34241A] w-full">
                TIÊU CHUẨN KỸ THUẬT
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A89C90]">
                <li className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <span>TCVN 8652:2012 — Sơn tường xây</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <span>Định mức 12/2021/TT-BXD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <span>DXF ASCII / Binary R12–2024</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <span>Truy xuất 3 chiều: Handle CAD → BoQ</span>
                </li>
              </ul>
            </div>

            {/* Col 3: TÍNH NĂNG LÕI (2.5 cols) */}
            <div className="lg:col-span-2 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#E8DDD2] mb-4 pb-2 border-b border-[#34241A] w-full">
                TÍNH NĂNG LÕI
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A89C90]">
                <li>
                  <button 
                    onClick={handleDemoClick} 
                    className="hover:text-[#D97757] transition-colors text-left cursor-pointer"
                  >
                    Dự án mẫu CAD Chung cư (Demo)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onGetStarted} 
                    className="hover:text-[#D97757] transition-colors text-left cursor-pointer"
                  >
                    Tải lên tệp bản vẽ DXF
                  </button>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#D97757] transition-colors">
                    Bóc tách sơn lót & sơn phủ
                  </a>
                </li>
                <li>
                  <a href="#preview" className="hover:text-[#D97757] transition-colors">
                    Trình xem CAD 2D trực quan
                  </a>
                </li>
                <li>
                  <button 
                    onClick={onGetStarted} 
                    className="hover:text-[#D97757] transition-colors text-left cursor-pointer"
                  >
                    Xuất BoQ định dạng Excel/CSV
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: HỖ TRỢ DOANH NGHIỆP & QS (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#E8DDD2] mb-4 pb-2 border-b border-[#34241A] w-full">
                HỖ TRỢ DOANH NGHIỆP & QS
              </h4>
              <div className="flex flex-col gap-3 text-xs text-[#A89C90]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <div>
                    <span className="text-[#82756A] text-[10px] block leading-tight">Hotline Kỹ thuật</span>
                    <span className="text-white font-semibold">1900 6892</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
                  <div>
                    <span className="text-[#82756A] text-[10px] block leading-tight">Email hỗ trợ</span>
                    <a href="mailto:kythuat@aipaint-takeoff.vn" className="text-white hover:text-[#D97757] transition-colors font-medium">
                      kythuat@aipaint-takeoff.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D97757] shrink-0 mt-0.5" />
                  <span className="text-[#A89C90] text-[11px] leading-tight">
                    Hỗ trợ đào tạo đội ngũ QS, tích hợp API ERP xây dựng
                  </span>
                </div>

                {/* AI Service Live Status */}
                <div className="mt-1 pt-2 border-t border-[#34241A] flex items-center gap-2 text-[10px] font-mono text-[#A89C90]">
                  <span className="w-1.5 h-1.5 bg-[#2E6845] animate-pulse" />
                  <span>HỆ THỐNG VECTOR CAD · KHẢ DỤNG 99.9%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#82756A]">
            <div>
              © 2026 ENGENIX · Nền tảng phân tích bản vẽ & bóc tách khối lượng tự động.
            </div>
            
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-[#D97757] font-medium">TIẾT KIỆM 80% THỜI GIAN</span>
              <span aria-hidden="true" className="text-[#4E392B]">·</span>
              <span className="text-[#5C7D64] font-medium">ĐỘ CHÍNH XÁC 95%+</span>
              <span aria-hidden="true" className="text-[#4E392B]">·</span>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-[#A89C90] hover:text-[#D97757] transition-colors cursor-pointer"
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
