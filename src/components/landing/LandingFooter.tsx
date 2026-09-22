import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  Layers, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  CheckCircle2,
  Lock,
  Cpu,
  FileCheck
} from 'lucide-react';

interface LandingFooterProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onGetStarted,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050a14] border-t border-sky-500/20 pt-14 pb-10 text-white/60 text-xs font-sans relative overflow-hidden">
      {/* Background soft ambient grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Banner: Tự động hóa bóc tách dự án */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0c1628] via-[#0f1d36] to-[#0c1628] border border-sky-500/30 p-6 sm:p-8 mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-[#38bdf8] flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Sẵn sàng bóc tách bản vẽ dự án tiếp theo của bạn?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Trải nghiệm công nghệ AI bóc tách khối lượng tự động chỉ trong 30 giây.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onGetStarted}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:brightness-110 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(14,165,233,0.35)] transition-all cursor-pointer"
            >
              <span>Phân tích bản vẽ ngay</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <a
              href="#preview"
              className="hidden sm:inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white/5 hover:bg-sky-500/10 border border-white/15 hover:border-sky-400/50 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Xem kết quả mẫu
            </a>
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-sky-500/15">
          
          {/* Col 1: Brand & Enterprise Security (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-4 cursor-pointer" onClick={scrollToTop}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] p-[1.5px] shadow-[0_2px_12px_rgba(14,165,233,0.4)]">
                <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#38bdf8]">
                    <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M9 21.5V12.5H15V21.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="1.5" fill="#0ea5e9" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight font-sans leading-none block">
                  ENGENIX
                </span>
                <span className="text-[10px] text-sky-200/60 font-sans tracking-tight">
                  AI Paint & Take-off
                </span>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-xs mb-5 max-w-sm">
              Nền tảng trí tuệ nhân tạo chuyên biệt cho kỹ sư xây dựng, nhà thầu và đơn vị dự toán — tự động đọc hiểu bản vẽ mặt bằng PDF, bóc tách cấu kiện và xuất bảng khối lượng chuẩn xác.
            </p>

            {/* Enterprise Security Pill */}
            <div className="p-3 rounded-xl bg-[#091122] border border-sky-500/20 w-full max-w-sm flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-[11px]">Bảo mật dữ liệu bản vẽ</div>
                <div className="text-[10px] text-white/50 mt-0.5 leading-normal">
                  Mã hóa TLS 256-bit, tuân thủ ISO/IEC 27001, cam kết không chia sẻ dữ liệu dự án cho bên thứ ba.
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Sản phẩm & Giải pháp (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Sản phẩm & Giải pháp</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li>
                <a href="#hero" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  <span>Tổng quan ENGENIX</span>
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  <span>Xem trước kết quả bóc tách</span>
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  <span>Tính năng bóc tách tự động</span>
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  <span>Quy trình 4 bước hoạt động</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={onGetStarted} 
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  <span>Trình phân tích trực tuyến</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tiêu chuẩn & Kỹ thuật (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Tiêu chuẩn</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>TCVN Định mức XD</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>BIM & ISO 19650</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>Xuất file Excel/CSV</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>Đọc PDF Vector & Raster</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#38bdf8] shrink-0" />
                <span>Hiệu chuẩn thước tỷ lệ</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hỗ trợ Kỹ sư & Liên hệ (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200/90 mb-4 pb-2 border-b border-sky-500/20 w-full flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Hỗ trợ kỹ thuật</span>
            </h4>
            <div className="flex flex-col gap-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-sky-200/50">Email liên hệ</div>
                  <a href="mailto:support@engenix.ai" className="text-white hover:text-[#38bdf8] transition-colors font-medium">
                    support@engenix.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-sky-200/50">Hotline tư vấn kỹ sư</div>
                  <span className="text-white font-medium">1900 6868 (08:00 - 18:00)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-sky-200/50">Văn phòng hỗ trợ</div>
                  <span className="text-white/80">Hà Nội & TP. Hồ Chí Minh</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="mt-2 pt-2.5 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Máy chủ phân tích AI: Hoạt động bình thường</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Badges & Back to top */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <div>
            © 2026 ENGENIX. Nền tảng phân tích bản vẽ & bóc tách khối lượng tự động. Mọi quyền được bảo lưu.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-sky-400 font-semibold">✓ Tiết kiệm 80% thời gian</span>
            <span className="text-white/20">•</span>
            <span className="text-sky-400 font-semibold">✓ Độ chính xác 95%+</span>
            <span className="text-white/20">•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#38bdf8] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-sky-500/20"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
