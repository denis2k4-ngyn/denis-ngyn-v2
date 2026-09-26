import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Bot, 
  Edit3, 
  FileSpreadsheet, 
  FileText, 
  FileCode, 
  Zap, 
  Upload, 
  Crop, 
  Ruler, 
  CheckCircle2, 
  Download, 
  Check, 
  ChevronRight,
  Home,
  Layers,
  BarChart3,
  FileCheck,
} from 'lucide-react';
import { EngineerMascot } from './EngineerMascot';

interface LandingHeroProps {
  onGetStarted: () => void;
  onExploreDemo?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onGetStarted,
}) => {
  // Live AI Scanning Simulation state
  const [scanProgress, setScanProgress] = useState<number>(0);
  // Video Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Bottom Showcase Demo active tab
  const [demoSidebarTab, setDemoSidebarTab] = useState<'overview' | 'plans' | 'takeoff' | 'reports' | 'download'>('overview');

  // Chu kỳ quét Laser tự động lặp lại mượt mà
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let state: 'scanning' | 'paused' = 'scanning';
    let pauseStartTime = 0;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (state === 'scanning') {
        setScanProgress((prev) => {
          // Quét toàn bộ bản vẽ từ trên xuống dưới trong khoảng 4.2 giây
          const next = prev + (delta / 4200) * 100;
          if (next >= 100) {
            state = 'paused';
            pauseStartTime = time;
            return 100;
          }
          return next;
        });
      } else if (state === 'paused') {
        // Dừng 3.5 giây ở trạng thái hoàn tất 100% để người xem đọc kết quả
        if (time - pauseStartTime > 3500) {
          state = 'scanning';
          setScanProgress(0);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleDownloadSampleExcel = () => {
    // Simulated instant sample BOQ export download
    const csvContent = "data:text/csv;charset=utf-8,Hạng mục,Ký hiệu,Số lượng,Đơn vị,Ghi chú\nTường xây trát,T1,120.5,m,Tường gạch ống dày 100mm\nDiện tích sàn gạch,S1,85.2,m2,Lát gạch Granite 600x600\nCửa đi chính & phòng,D1-D4,8,bộ,Cửa nhôm kính Xingfa\nThiết bị vệ sinh,TB-01,12,bộ,Bàn cầu & Lavabo Toto\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ENGENIX_BaoCaoMau_85m2.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-[#231B15] selection:bg-[#C25E3E] selection:text-white overflow-x-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO (Phân tích bản vẽ mặt bằng ngay lập tức bằng AI)
          Warm Sand & Terracotta Architectural Hero
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="hero" 
        className="relative w-full min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100dvh-4.5rem)] flex flex-col justify-center py-10 lg:py-0 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Technical Eyebrow Kicker */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono tracking-wider text-[#C25E3E] uppercase mb-3 sm:mb-4"
            >
              <span className="relative flex h-2 w-2 mr-0.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C25E3E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C25E3E]" />
              </span>
              <span className="font-bold shrink-0">ENGENIX AI</span>
              <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
              <span className="shrink-0">BÓC TÁCH MẶT BẰNG</span>
              <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
              <span className="text-[#8C5036] shrink-0">CHUẨN VECTOR CAD</span>
            </motion.div>

            {/* Main Headline with Warm Sand & Terracotta Gradient text */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#231B15] tracking-tight leading-[1.15] mb-5 font-sans"
            >
              Phân tích bản vẽ mặt bằng<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#231B15] via-[#C25E3E] to-[#9E4326]">
                ngay lập tức bằng AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#5C5248] max-w-2xl font-normal leading-relaxed mb-8"
            >
              Bóc tách khối lượng tự động từ bản vẽ PDF chỉ trong 30 giây. ENGENIX giúp bạn tiết kiệm thời gian, giảm sai sót và sẵn sàng xuất file Excel, AutoCAD để sử dụng ngay.
            </motion.p>

            {/* Call to Actions with motion micro-interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8 w-full sm:w-auto"
            >
              {/* Primary Terracotta Button */}
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl terracotta-button hover:brightness-105 text-white font-extrabold text-sm sm:text-base shadow-[0_4px_22px_rgba(194,94,62,0.38)] transition-all cursor-pointer group"
              >
                <span>Phân tích bản vẽ ngay</span>
                <ArrowRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1" />
              </motion.button>

              {/* Secondary Button: Xem video giới thiệu */}
              <motion.button
                onClick={() => setShowVideoModal(true)}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2DDD5] hover:border-[#C25E3E] text-[#231B15] font-medium text-sm sm:text-base transition-all cursor-pointer group shadow-2xs"
              >
                <div className="w-5 h-5 rounded-md bg-[#FDF2EE] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-[#C25E3E] text-[#C25E3E] translate-x-0.5" />
                </div>
                <span>Xem video giới thiệu</span>
              </motion.button>
            </motion.div>

            {/* Refined Technical Metrics (Clean tabular data with separators) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-8 pt-5 sm:pt-6 border-t border-[#E2DDD5] w-full max-w-xl text-xs font-mono"
            >
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-[#231B15] font-mono tabular-nums leading-none">30s</div>
                <div className="text-[#6B6055] text-[10px] sm:text-[11px] mt-1 font-sans">Thời gian xử lý</div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-[#E2DDD5]" aria-hidden="true" />

              <div className="text-left border-l border-[#E2DDD5] pl-2 sm:border-0 sm:pl-0">
                <div className="text-xl sm:text-2xl font-bold text-[#C25E3E] font-mono tabular-nums leading-none">95%+</div>
                <div className="text-[#6B6055] text-[10px] sm:text-[11px] mt-1 font-sans">Độ chuẩn xác</div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-[#E2DDD5]" aria-hidden="true" />

              <div className="text-left border-l border-[#E2DDD5] pl-2 sm:border-0 sm:pl-0">
                <div className="text-xl sm:text-2xl font-bold text-[#231B15] font-mono tabular-nums leading-none">10.000+</div>
                <div className="text-[#6B6055] text-[10px] sm:text-[11px] mt-1 font-sans">Bản vẽ xử lý</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Chibi Mascot with Warm Sand & Terracotta Halo */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <EngineerMascot className="w-full max-w-[480px]" onGetStarted={onGetStarted} />
          </div>

        </div>
        </div>

        {/* Bottom Viewport Scroll Cue */}
        <div className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-2 text-[11px] font-mono text-[#8E8275] tracking-wider select-none pointer-events-none">
          <span>CUỘN ĐỂ XEM MÔ PHỎNG QUÉT CAD</span>
          <span className="animate-bounce text-[#C25E3E]">↓</span>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: XEM TRƯỚC KẾT QUẢ PHÂN TÍCH (Live AI Scanning Radar)
          Warm Architectural Paper Canvas
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="preview" 
        className="relative w-full min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100dvh-4.5rem)] flex flex-col justify-center py-12 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.div 
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/40 p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(35,27,21,0.06)] transition-all my-auto"
        >
          
          {/* Card Header: ⌂ XEM TRƯỚC KẾT QUẢ PHÂN TÍCH · ENGENIX AI */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-[#FDF2EE] text-[#C25E3E] flex items-center justify-center">
                <Home className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-[#231B15] tracking-wider uppercase font-sans">
                XEM TRƯỚC KẾT QUẢ PHÂN TÍCH (AI SCANNING)
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-[#231B15]">ENGENIX AI</span>
              <span className="inline-flex items-center gap-1.5 text-[#C25E3E] font-medium">
                <span className={`w-2 h-2 rounded-full ${scanProgress >= 95 ? 'bg-[#2E6845]' : 'bg-[#C25E3E] animate-pulse'}`} />
                <span className={scanProgress >= 95 ? 'text-[#2E6845] font-semibold' : 'text-[#C25E3E]'}>
                  {scanProgress >= 95 ? 'Đã hoàn tất phân tích' : 'Đang quét bản vẽ thời gian thực'}
                </span>
              </span>
            </div>
          </div>

          {/* Top Control & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${scanProgress >= 95 ? 'bg-[#2E6845]' : 'bg-[#C25E3E] animate-ping'}`} />
              <span className={scanProgress >= 95 ? 'text-[#2E6845] font-bold' : 'text-[#C25E3E] font-semibold'}>
                {scanProgress >= 95 ? 'ĐÃ PHÂN TÍCH HOÀN TẤT (100%)' : `TIA LASER AI ĐANG QUÉT (${Math.round(scanProgress)}%)`}
              </span>
            </div>

            {/* Live Progress Bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#5C5248]">
              <span className="hidden sm:inline text-[#6B6055]">Tiến độ bóc tách:</span>
              <div className="w-28 sm:w-36 h-2 rounded-full bg-[#F2ECE1] border border-[#E2DDD5] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#E29578] via-[#D97757] to-[#C25E3E] transition-all duration-75"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="w-10 text-right font-bold text-[#C25E3E]">{Math.round(scanProgress)}%</span>
            </div>
          </div>

          {/* Main Grid: CAD Floor Plan Viewport (Left) + Result Info Card (Right) */}
          {(() => {
            const isOuterScanned = scanProgress >= 15;
            const isLivingRoomScanned = scanProgress >= 28;
            const isKitchenScanned = scanProgress >= 36;
            const isBed1Scanned = scanProgress >= 62;
            const isBed2Scanned = scanProgress >= 70;
            const isWcScanned = scanProgress >= 78;

            const currentFloorArea = 
              scanProgress < 18 ? "0.0" :
              scanProgress >= 88 ? "85.2" :
              ((scanProgress - 18) / 70 * 85.2).toFixed(1);

            const currentWallLength = 
              scanProgress < 15 ? "0.0" :
              scanProgress >= 88 ? "120.5" :
              ((scanProgress - 15) / 73 * 120.5).toFixed(1);

            const currentDoorCount = 
              scanProgress < 28 ? 0 :
              scanProgress < 48 ? 2 :
              scanProgress < 65 ? 4 :
              scanProgress < 82 ? 6 : 8;

            const currentFixturesCount = 
              scanProgress < 78 ? 0 :
              scanProgress >= 88 ? 12 :
              Math.floor(((scanProgress - 78) / 10) * 12);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left 8 Cols: Architectural Floor Plan Viewport with Live Terracotta Laser */}
                <div className="lg:col-span-8 relative rounded-2xl bg-[#FDFCF9] border border-[#E2DDD5] p-4 min-h-[340px] sm:min-h-[390px] flex flex-col justify-between overflow-hidden shadow-inner">
                  
                  {/* Drafting grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ECE5D8_1px,transparent_1px),linear-gradient(to_bottom,#ECE5D8_1px,transparent_1px)] bg-[size:16px_16px] opacity-75" />

                  {/* Tia Laser Quét AI thời gian thực (Terracotta Laser Beam) */}
                  {scanProgress > 0 && scanProgress < 100 && (
                    <div 
                      className="absolute left-0 right-0 h-[2px] bg-[#C25E3E] pointer-events-none z-30 shadow-[0_0_12px_#C25E3E,0_0_24px_#D97757]"
                      style={{ top: `${scanProgress}%` }}
                    >
                      {/* Vệt quét mờ radar tỏa lên trên */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#C25E3E]/15 via-[#D97757]/5 to-transparent pointer-events-none" />
                      
                      {/* Technical HUD crosshair readout */}
                      <div className="absolute right-4 -top-3 flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#C25E3E] text-[10px] text-[#C25E3E] font-mono font-semibold tracking-wider whitespace-nowrap shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[#C25E3E] animate-pulse" />
                        <span>QUÉT VECTOR CAD: {Math.round(scanProgress)}%</span>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* SVG CAD Architectural Blueprint */}
                    <div className="w-full md:w-[68%] h-[270px] sm:h-[310px] flex items-center justify-center">
                      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[310px] select-none">
                        
                        {/* Dimension lines */}
                        <line x1="20" y1="20" x2="380" y2="20" stroke="#C7BCAD" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="20" y1="280" x2="380" y2="280" stroke="#C7BCAD" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="20" y1="20" x2="20" y2="280" stroke="#C7BCAD" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="380" y1="20" x2="380" y2="280" stroke="#C7BCAD" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Outer Boundary Wall (Chuyển sang màu Terracotta khi Laser quét qua) */}
                        <rect 
                          x="40" y="40" width="320" height="220" 
                          fill="none" 
                          stroke={isOuterScanned ? '#C25E3E' : '#B8ACA0'} 
                          strokeWidth={isOuterScanned ? '2.5' : '1.5'}
                          className="transition-colors duration-300"
                        />

                        {/* Room 1: Phòng Khách */}
                        <rect 
                          x="45" y="45" width="170" height="110" 
                          fill={isLivingRoomScanned ? 'rgba(194,94,62,0.12)' : 'none'} 
                          stroke={isLivingRoomScanned ? '#C25E3E' : '#B8ACA0'} 
                          strokeWidth={isLivingRoomScanned ? '2' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {isLivingRoomScanned && (
                          <g className="transition-opacity duration-300">
                            <text x="130" y="95" fill="#231B15" fontSize="11" fontWeight="bold" textAnchor="middle">
                              Phòng Khách
                            </text>
                            <text x="130" y="112" fill="#C25E3E" fontSize="9" fontWeight="bold" textAnchor="middle">
                              28.5 m²
                            </text>
                          </g>
                        )}

                        {/* Room 2: Bếp & Ăn */}
                        <rect 
                          x="220" y="45" width="135" height="110" 
                          fill={isKitchenScanned ? 'rgba(217,119,87,0.12)' : 'none'} 
                          stroke={isKitchenScanned ? '#D97757' : '#B8ACA0'} 
                          strokeWidth={isKitchenScanned ? '2' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {isKitchenScanned && (
                          <g className="transition-opacity duration-300">
                            <text x="287" y="95" fill="#231B15" fontSize="11" fontWeight="bold" textAnchor="middle">
                              Bếp & Ăn
                            </text>
                            <text x="287" y="112" fill="#C25E3E" fontSize="9" fontWeight="bold" textAnchor="middle">
                              21.2 m²
                            </text>
                          </g>
                        )}

                        {/* Room 3: Phòng Ngủ 1 */}
                        <rect 
                          x="45" y="160" width="140" height="95" 
                          fill={isBed1Scanned ? 'rgba(194,94,62,0.12)' : 'none'} 
                          stroke={isBed1Scanned ? '#C25E3E' : '#B8ACA0'} 
                          strokeWidth={isBed1Scanned ? '2' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {isBed1Scanned && (
                          <g className="transition-opacity duration-300">
                            <text x="115" y="205" fill="#231B15" fontSize="11" fontWeight="bold" textAnchor="middle">
                              Phòng Ngủ 1
                            </text>
                            <text x="115" y="222" fill="#C25E3E" fontSize="9" fontWeight="bold" textAnchor="middle">
                              18.0 m²
                            </text>
                          </g>
                        )}

                        {/* Room 4: Phòng Ngủ 2 */}
                        <rect 
                          x="190" y="160" width="110" height="95" 
                          fill={isBed2Scanned ? 'rgba(217,119,87,0.12)' : 'none'} 
                          stroke={isBed2Scanned ? '#D97757' : '#B8ACA0'} 
                          strokeWidth={isBed2Scanned ? '2' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {isBed2Scanned && (
                          <g className="transition-opacity duration-300">
                            <text x="245" y="205" fill="#231B15" fontSize="11" fontWeight="bold" textAnchor="middle">
                              Phòng Ngủ 2
                            </text>
                            <text x="245" y="222" fill="#C25E3E" fontSize="9" fontWeight="bold" textAnchor="middle">
                              12.5 m²
                            </text>
                          </g>
                        )}

                        {/* Room 5: WC Vệ Sinh */}
                        <rect 
                          x="305" y="160" width="50" height="95" 
                          fill={isWcScanned ? 'rgba(61,120,86,0.15)' : 'none'} 
                          stroke={isWcScanned ? '#3D7856' : '#B8ACA0'} 
                          strokeWidth={isWcScanned ? '2' : '1.5'}
                          className="transition-all duration-300"
                        />
                        {isWcScanned && (
                          <g className="transition-opacity duration-300">
                            <text x="330" y="205" fill="#231B15" fontSize="10" fontWeight="bold" textAnchor="middle">
                              WC
                            </text>
                            <text x="330" y="220" fill="#2E6845" fontSize="8" fontWeight="bold" textAnchor="middle">
                              5.0 m²
                            </text>
                          </g>
                        )}

                        {/* Doors & Windows */}
                        {isLivingRoomScanned ? (
                          <>
                            <rect x="110" y="38" width="30" height="6" fill="#C25E3E" rx="1" />
                            <path d="M 110 44 A 28 28 0 0 1 138 72" fill="none" stroke="#C25E3E" strokeWidth="1.5" strokeDasharray="2 2" />
                          </>
                        ) : (
                          <>
                            <line x1="110" y1="44" x2="110" y2="72" stroke="#C7BCAD" strokeWidth="1" />
                            <path d="M 110 44 A 28 28 0 0 1 138 72" fill="none" stroke="#C7BCAD" strokeWidth="1" />
                          </>
                        )}

                        {/* Door 2, 3, 4 */}
                        <rect x="217" y="90" width="6" height="24" fill={isKitchenScanned ? '#C25E3E' : '#C7BCAD'} rx="1" />
                        <rect x="187" y="180" width="6" height="20" fill={isBed1Scanned ? '#C25E3E' : '#C7BCAD'} rx="1" />
                        <rect x="302" y="180" width="6" height="20" fill={isWcScanned ? '#3D7856' : '#C7BCAD'} rx="1" />
                        
                        {/* Windows */}
                        <rect x="70" y="37" width="30" height="4" fill={isLivingRoomScanned ? '#D97757' : '#C7BCAD'} />
                        <rect x="250" y="37" width="35" height="4" fill={isKitchenScanned ? '#D97757' : '#C7BCAD'} />
                        <rect x="70" y="259" width="30" height="4" fill={isBed1Scanned ? '#D97757' : '#C7BCAD'} />
                        <rect x="220" y="259" width="30" height="4" fill={isBed2Scanned ? '#D97757' : '#C7BCAD'} />

                        {/* Sanitary Fixtures */}
                        {isWcScanned && (
                          <g className="transition-opacity duration-300">
                            <circle cx="325" cy="180" r="4.5" fill="#3D7856" />
                            <circle cx="335" cy="180" r="3.5" fill="#5C7D64" />
                            <rect x="315" y="225" width="22" height="14" rx="2" fill="none" stroke="#3D7856" strokeWidth="1.5" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Right Mini Legend */}
                    <div className="w-full md:w-[32%] flex flex-col gap-2.5 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2DDD5] font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm transition-colors duration-200 ${isOuterScanned ? 'bg-[#C25E3E] shadow-[0_0_8px_#C25E3E]' : 'bg-[#DDD5C7]'}`} />
                          <span className="text-[#231B15]">Tường</span>
                        </div>
                        <span className="text-[#C25E3E] font-bold">{currentWallLength} m</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm transition-colors duration-200 ${isLivingRoomScanned ? 'bg-[#D97757] shadow-[0_0_8px_#D97757]' : 'bg-[#DDD5C7]'}`} />
                          <span className="text-[#231B15]">Sàn</span>
                        </div>
                        <span className="text-[#C25E3E] font-bold">{currentFloorArea} m²</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm transition-colors duration-200 ${currentDoorCount > 0 ? 'bg-[#A84A2C] shadow-[0_0_8px_#A84A2C]' : 'bg-[#DDD5C7]'}`} />
                          <span className="text-[#231B15]">Cửa</span>
                        </div>
                        <span className="text-[#C25E3E] font-bold">{currentDoorCount} bộ</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm transition-colors duration-200 ${currentFixturesCount > 0 ? 'bg-[#3D7856] shadow-[0_0_8px_#3D7856]' : 'bg-[#DDD5C7]'}`} />
                          <span className="text-[#231B15]">Thiết bị</span>
                        </div>
                        <span className="text-[#2E6845] font-bold">{currentFixturesCount}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right 4 Cols: THÔNG TIN KẾT QUẢ Panel */}
                <div className="lg:col-span-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] p-5 flex flex-col justify-between shadow-xs">
                  
                  <div>
                    <h3 className="text-xs font-bold text-[#231B15] uppercase tracking-wider mb-4 pb-2 border-b border-[#E8E1D5] flex items-center justify-between">
                      <span>THÔNG TIN KẾT QUẢ</span>
                      <span className="text-[10px] text-[#C25E3E] font-mono">
                        {scanProgress >= 95 ? '✓ HOÀN TẤT' : '● SCANNING...'}
                      </span>
                    </h3>

                    <div className="flex flex-col gap-3.5 text-xs sm:text-sm font-sans">
                      
                      {/* Tổng diện tích sàn */}
                      <div className="flex items-center justify-between py-1 border-b border-[#E8E1D5]">
                        <div className="flex items-center gap-2 text-[#5C5248]">
                          <Layers className="w-4 h-4 text-[#C25E3E]" />
                          <span>Tổng diện tích sàn</span>
                        </div>
                        <span className="font-bold text-[#231B15] font-mono text-sm sm:text-base">
                          {currentFloorArea} m²
                        </span>
                      </div>

                      {/* Chiều dài tường */}
                      <div className="flex items-center justify-between py-1 border-b border-[#E8E1D5]">
                        <div className="flex items-center gap-2 text-[#5C5248]">
                          <Ruler className="w-4 h-4 text-[#D97757]" />
                          <span>Chiều dài tường</span>
                        </div>
                        <span className="font-bold text-[#231B15] font-mono text-sm sm:text-base">
                          {currentWallLength} m
                        </span>
                      </div>

                      {/* Số lượng cửa */}
                      <div className="flex items-center justify-between py-1 border-b border-[#E8E1D5]">
                        <div className="flex items-center gap-2 text-[#5C5248]">
                          <Home className="w-4 h-4 text-[#A84A2C]" />
                          <span>Số lượng cửa</span>
                        </div>
                        <span className="font-bold text-[#231B15] font-mono text-sm sm:text-base">
                          {currentDoorCount} bộ
                        </span>
                      </div>

                      {/* Thiết bị vệ sinh */}
                      <div className="flex items-center justify-between py-1 border-b border-[#E8E1D5]">
                        <div className="flex items-center gap-2 text-[#5C5248]">
                          <CheckCircle2 className="w-4 h-4 text-[#3D7856]" />
                          <span>Thiết bị vệ sinh</span>
                        </div>
                        <span className="font-bold text-[#231B15] font-mono text-sm sm:text-base">
                          {currentFixturesCount}
                        </span>
                      </div>

                      {/* Loại bản vẽ */}
                      <div className="flex items-center justify-between py-1 border-b border-[#E8E1D5]">
                        <div className="flex items-center gap-2 text-[#5C5248]">
                          <FileCheck className="w-4 h-4 text-[#C25E3E]" />
                          <span>Loại bản vẽ</span>
                        </div>
                        <span className="font-semibold text-[#231B15]">Nhà ở dân dụng</span>
                      </div>

                    </div>
                  </div>

                  {/* Terracotta Button: Tải báo cáo mẫu (Excel) ⤓ */}
                  <button
                    onClick={handleDownloadSampleExcel}
                    className="w-full mt-6 py-3 px-4 rounded-xl terracotta-button text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(194,94,62,0.35)] transition-all cursor-pointer"
                  >
                    <span>Tải báo cáo mẫu (Excel)</span>
                    <Download className="w-4 h-4 stroke-[2.5]" />
                  </button>

                </div>

              </div>
            );
          })()}

        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: TÍNH NĂNG NỔI BẬT (Mọi thứ bạn cần trong một nền tảng)
          Warm Sand & Terracotta Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Eyebrow Kicker, Title & Subtitle with Viewport Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#C25E3E] uppercase mb-3">
            <span>TÍNH NĂNG NỔI BẬT</span>
            <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
            <span>NỀN TẢNG THỐNG NHẤT</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#231B15] tracking-tight mb-3 font-sans">
            Mọi thứ bạn cần trong một nền tảng
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#5C5248] max-w-3xl mx-auto mb-8 sm:mb-12">
            Từ bóc tách tự động đến xuất file chuyên nghiệp, ENGENIX hỗ trợ toàn bộ quy trình phân tích bản vẽ.
          </p>
        </motion.div>

        {/* 6 Features Grid with Staggered Entrance & Micro-interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
          
          {/* Card 1: AI bóc tách tự động */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              AI bóc tách tự động
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Nhận diện tường, sàn, cửa, thiết bị... bằng AI siêu nhanh.
            </p>
          </motion.div>

          {/* Card 2: Chỉnh sửa thủ công */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#D97757] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Edit3 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              Chỉnh sửa thủ công
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Dễ dàng chỉnh sửa, bổ sung sau khi AI phân tích.
            </p>
          </motion.div>

          {/* Card 3: Xuất file Excel */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#A84A2C] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              Xuất file Excel
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Xuất bảng khối lượng chi tiết, sẵn sàng sử dụng.
            </p>
          </motion.div>

          {/* Card 4: PDF có chú thích */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              PDF có chú thích
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Tạo file PDF với màu sắc, ghi chú rõ ràng.
            </p>
          </motion.div>

          {/* Card 5: Hỗ trợ DWG/DXF */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#D97757] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <FileCode className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              Hỗ trợ DWG/DXF
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Xuất file AutoCAD gốc, tương thích dễ dàng.
            </p>
          </motion.div>

          {/* Card 6: Kết quả siêu nhanh */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-xl sm:rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#C25E3E]/60 p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 transition-all group hover:bg-[#FFFDFB] shadow-[0_4px_20px_rgba(35,27,21,0.04)] hover:shadow-[0_12px_30px_rgba(194,94,62,0.12)]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231B15] mt-1">
              Kết quả siêu nhanh
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
              Bóc tách bản vẽ chỉ trong 30 giây.
            </p>
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: QUY TRÌNH HOẠT ĐỘNG (Chỉ 6 bước đơn giản)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#E8E1D5]">
        
        {/* Eyebrow Kicker, Title & Subtitle with Viewport Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#C25E3E] uppercase mb-3">
            <span>QUY TRÌNH KỸ THUẬT</span>
            <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
            <span>6 BƯỚC KHÉP KÍN</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#231B15] tracking-tight mb-3 font-sans">
            Chỉ 6 bước đơn giản
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#5C5248] max-w-2xl mx-auto mb-16">
            Từ bản vẽ thô đến bảng khối lượng hoàn chỉnh, nhanh chóng và dễ dàng.
          </p>
        </motion.div>

        {/* 6 Steps Circular Pipeline with connecting energy beam */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          
          {/* Luồng kết nối 6 bước (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(100%/12+20px)] right-[calc(100%/12+20px)] h-[2px] -translate-y-1/2 pointer-events-none z-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-[#C25E3E]/20 via-[#D97757]/40 to-[#C25E3E]/20" />
            <motion.div
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#C25E3E] to-transparent shadow-[0_0_12px_#C25E3E]"
              animate={{
                x: ['-100%', '750%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Tia sáng kết nối dành cho Tablet */}
          <div className="hidden md:block lg:hidden absolute top-8 left-[calc(100%/6+20px)] right-[calc(100%/6+20px)] h-[2px] -translate-y-1/2 pointer-events-none z-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-[#C25E3E]/20 via-[#D97757]/40 to-[#C25E3E]/20" />
            <motion.div
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#C25E3E] to-transparent shadow-[0_0_12px_#C25E3E]"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
          </div>

          {/* Step 1: Tải lên bản vẽ */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Upload className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                01
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">Tải lên bản vẽ</h4>
            <p className="text-xs text-[#6B6055] leading-tight">PDF, DWG, DXF...</p>
          </motion.div>

          {/* Step 2: Cắt vùng bản vẽ */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Crop className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                02
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">Cắt vùng bản vẽ</h4>
            <p className="text-xs text-[#6B6055] leading-tight">Chọn khu vực cần phân tích</p>
          </motion.div>

          {/* Step 3: Thiết lập tỷ lệ */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Ruler className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                03
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">Thiết lập tỷ lệ</h4>
            <p className="text-xs text-[#6B6055] leading-tight">Nhập thông số hoặc auto-detect</p>
          </motion.div>

          {/* Step 4: AI phân tích */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                04
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">AI phân tích</h4>
            <p className="text-xs text-[#6B6055] leading-tight">Tự động nhận diện và bóc tách</p>
          </motion.div>

          {/* Step 5: Kiểm tra & chỉnh sửa */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                05
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">Kiểm tra & chỉnh sửa</h4>
            <p className="text-xs text-[#6B6055] leading-tight">Xem lại kết quả, điều chỉnh nếu cần</p>
          </motion.div>

          {/* Step 6: Xuất kết quả */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center text-center group relative z-10 cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#C25E3E] flex items-center justify-center text-[#C25E3E] shadow-[0_4px_16px_rgba(194,94,62,0.25)] group-hover:scale-110 group-hover:border-[#9E4326] transition-all">
                <Download className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-sm">
                06
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#231B15] mt-2 mb-1 group-hover:text-[#C25E3E] transition-colors">Xuất kết quả</h4>
            <p className="text-xs text-[#6B6055] leading-tight">Excel, PDF, DWG... sẵn sàng sử dụng</p>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: RA QUYẾT ĐỊNH NHANH HƠN VỚI DỮ LIỆU CHÍNH XÁC (Showcase)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E1D5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Value Props & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            
            {/* Eyebrow Kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#C25E3E] uppercase mb-3 sm:mb-4">
              <span className="shrink-0">DỮ LIỆU CHÍNH XÁC</span>
              <span aria-hidden="true" className="text-[#C7BCAD]">·</span>
              <span className="shrink-0">RA QUYẾT ĐỊNH KỸ THUẬT</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#231B15] tracking-tight leading-tight mb-4 font-sans">
              Ra quyết định nhanh hơn<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#231B15] via-[#C25E3E] to-[#9E4326]">
                với dữ liệu chính xác
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed mb-6">
              ENGENIX không chỉ giúp bạn bóc tách khối lượng, mà còn cung cấp cái nhìn tổng quan, trực quan về toàn bộ dự án. Tiết kiệm thời gian, tối ưu chi phí và nâng cao hiệu quả làm việc.
            </p>

            {/* 3 Value Prop Spec Badges */}
            <div className="w-full bg-white border border-[#E8E1D5] rounded-2xl p-3.5 sm:p-4 mb-6 sm:mb-8 shadow-xs space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-[#231B15] font-medium">Dữ liệu minh bạch, dễ dàng chia sẻ</span>
              </div>

              <div className="h-px bg-[#E8E1D5] w-full" />

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-[#231B15] font-medium">Giảm thiểu sai sót trong dự toán</span>
              </div>

              <div className="h-px bg-[#E8E1D5] w-full" />

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FDF2EE] border border-[#F3C7B8] flex items-center justify-center text-[#C25E3E] shrink-0 font-black">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                <span className="text-xs sm:text-sm text-[#231B15] font-medium">Phù hợp cho nhà thầu, tư vấn, chủ đầu tư</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl terracotta-button text-white font-extrabold text-sm shadow-[0_4px_18px_rgba(194,94,62,0.35)] transition-all cursor-pointer"
              >
                <span>Bắt đầu trải nghiệm miễn phí</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2DDD5] hover:border-[#C25E3E] text-[#231B15] font-semibold text-sm transition-all cursor-pointer text-center shadow-2xs"
              >
                <span>Xem bản vẽ mẫu</span>
                <ChevronRight className="w-4 h-4 text-[#C25E3E]" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: BÁO CÁO DỰ ÁN MẪU Interactive App Box */}
          <motion.div 
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="lg:col-span-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E1D5] p-5 sm:p-6 shadow-[0_20px_50px_rgba(35,27,21,0.06)]"
          >
            
            {/* Box Header: BÁO CÁO DỰ ÁN MẪU · Dự án Demo */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#C25E3E]" />
                <span className="text-xs font-bold text-[#231B15] uppercase tracking-wider">
                  BÁO CÁO DỰ ÁN MẪU
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[#C25E3E] text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#C25E3E] animate-pulse" />
                <span>Dự án Demo</span>
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              
              {/* Left Mini Sidebar Tabs */}
              <div className="col-span-12 sm:col-span-4 flex sm:flex-col gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-medium">
                <button
                  onClick={() => setDemoSidebarTab('overview')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'overview'
                      ? 'bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white font-bold shadow-sm'
                      : 'text-[#5C5248] hover:text-[#231B15] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Tổng quan</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('plans')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'plans'
                      ? 'bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white font-bold shadow-sm'
                      : 'text-[#5C5248] hover:text-[#231B15] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bản vẽ</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('takeoff')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'takeoff'
                      ? 'bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white font-bold shadow-sm'
                      : 'text-[#5C5248] hover:text-[#231B15] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bóc tách</span>
                </button>

                <button
                  onClick={() => setDemoSidebarTab('reports')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer ${
                    demoSidebarTab === 'reports'
                      ? 'bg-gradient-to-r from-[#D97757] to-[#C25E3E] text-white font-bold shadow-sm'
                      : 'text-[#5C5248] hover:text-[#231B15] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Báo cáo</span>
                </button>

                <button
                  onClick={handleDownloadSampleExcel}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap text-[#5C5248] hover:text-[#231B15] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải xuống</span>
                </button>
              </div>

              {/* Right Content: 4 Stats Tiles + Biểu đồ khối lượng */}
              <div className="col-span-12 sm:col-span-8 flex flex-col gap-4">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Sàn */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#231B15] font-mono leading-none">85.2 m²</div>
                      <div className="text-[10px] text-[#6B6055] mt-1">Diện tích sàn</div>
                    </div>
                    <Layers className="w-4 h-4 text-[#D97757]" />
                  </div>

                  {/* Tường */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#231B15] font-mono leading-none">120.5 m</div>
                      <div className="text-[10px] text-[#6B6055] mt-1">Chiều dài tường</div>
                    </div>
                    <Ruler className="w-4 h-4 text-[#C25E3E]" />
                  </div>

                  {/* Cửa */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#231B15] font-mono leading-none">8 bộ</div>
                      <div className="text-[10px] text-[#6B6055] mt-1">Cửa các loại</div>
                    </div>
                    <Home className="w-4 h-4 text-[#A84A2C]" />
                  </div>

                  {/* Thiết bị */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#231B15] font-mono leading-none">12</div>
                      <div className="text-[10px] text-[#6B6055] mt-1">Thiết bị vệ sinh</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#3D7856]" />
                  </div>
                </div>

                {/* Biểu đồ khối lượng */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <div className="text-xs font-semibold text-[#231B15] mb-3">
                    Biểu đồ khối lượng
                  </div>

                  {/* Custom Bar Visualization in Terracotta Palette */}
                  <div className="flex items-end justify-between gap-4 h-28 pt-2">
                    
                    {/* Bar 1: Tường 120.5m */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#C25E3E] rounded-t-md transition-all hover:brightness-105 shadow-sm shadow-[#C25E3E]/20" style={{ height: '90%' }} />
                      <span className="text-[9px] text-[#5C5248] font-mono">Tường</span>
                    </div>

                    {/* Bar 2: Sàn 85.2m2 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#D97757] rounded-t-md transition-all hover:brightness-105 shadow-sm shadow-[#D97757]/20" style={{ height: '65%' }} />
                      <span className="text-[9px] text-[#5C5248] font-mono">Sàn</span>
                    </div>

                    {/* Bar 3: Cửa 8 bộ */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#E29578] rounded-t-md transition-all hover:brightness-105 shadow-sm" style={{ height: '25%' }} />
                      <span className="text-[9px] text-[#5C5248] font-mono">Cửa</span>
                    </div>

                    {/* Bar 4: Thiết bị 12 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full max-w-[36px] bg-[#5C7D64] rounded-t-md transition-all hover:brightness-105 shadow-sm shadow-[#3D7856]/20" style={{ height: '35%' }} />
                      <span className="text-[9px] text-[#5C5248] font-mono">Thiết bị</span>
                    </div>

                    {/* Legend list on right */}
                    <div className="flex flex-col gap-1 text-[10px] font-mono text-[#231B15] pl-2 border-l border-[#E2DDD5] shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#C25E3E]" />
                        <span>Tường: 120.5m</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#D97757]" />
                        <span>Sàn: 85.2m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#E29578]" />
                        <span>Cửa: 8 bộ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#5C7D64]" />
                        <span>TB: 12</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VIDEO DEMO MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A120B]/70 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-white border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#FAF7F2] border-b border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#C25E3E]" />
                <span className="text-sm font-bold text-[#231B15] font-sans">
                  Video Giới Thiệu Phân Tích Bản Vẽ Mặt Bằng - ENGENIX AI
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-[#5C5248] hover:text-[#231B15] p-1 rounded-lg hover:bg-white text-xs font-mono cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="/videoENGENIX.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
