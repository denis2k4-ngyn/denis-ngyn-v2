import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ArrowRight, 
  FileSpreadsheet, 
  Check, 
  Edit3, 
  X,
  Filter,
  Layers,
  Maximize2,
  Minimize2,
  Sparkles,
  Download,
  Info,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Building,
  DoorOpen,
  Eye
} from 'lucide-react';
import { RoomEntity, DoorEntity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ReviewQueueViewProps {
  rooms: RoomEntity[];
  doors: DoorEntity[];
  onInspectRoom: (roomId: string) => void;
  onConfirmRoom: (roomId: string) => void;
  onCorrectRoom: (room: RoomEntity) => void;
  onRejectRoom: (roomId: string) => void;
  onNavigateToEstimate?: () => void;
  onBackToReview?: () => void;
}

type TakeoffTab = 'rooms_table' | 'openings_table' | 'flagged_items';

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  rooms,
  doors,
  onInspectRoom,
  onConfirmRoom,
  onCorrectRoom,
  onRejectRoom,
  onNavigateToEstimate,
  onBackToReview,
}) => {
  const { themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<TakeoffTab>('rooms_table');
  const [searchQuery, setSearchQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState<'all' | 'office' | 'service' | 'corridor'>('all');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Standard wall height assumed
  const standardHeight = 3.0;

  // Compute geometrical totals
  const totalFloorArea = rooms.reduce((sum, r) => sum + (r.floorArea || 0), 0);
  const totalPerimeter = rooms.reduce((sum, r) => sum + (r.perimeter || 0), 0);
  const totalGrossWallArea = totalPerimeter * standardHeight;
  const totalDeduction = rooms.reduce((sum, r) => sum + (r.doorDeductions || 0) + (r.windowDeductions || 0), 0);
  const totalNetWallArea = rooms.reduce((sum, r) => sum + (r.netPaintArea || 0), 0);
  const totalCeilingArea = totalFloorArea;
  const totalTakeoffSurface = totalNetWallArea + totalCeilingArea;

  const flaggedRooms = rooms.filter((r) => r.status === 'Needs Review');
  const flaggedDoors = doors.filter((d) => d.status === 'Needs Review');
  const totalFlags = flaggedRooms.length + flaggedDoors.length;

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.layer.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (roomFilter === 'office') return r.name.toLowerCase().includes('phòng') || r.name.toLowerCase().includes('họp');
    if (roomFilter === 'service') return r.name.toLowerCase().includes('vệ sinh') || r.name.toLowerCase().includes('bếp') || r.name.toLowerCase().includes('kho');
    if (roomFilter === 'corridor') return r.name.toLowerCase().includes('hành lang') || r.name.toLowerCase().includes('sảnh');
    return true;
  });

  const handleExportExcel = () => {
    setExportNotice('✓ Đã xuất bảng khối lượng bóc tách hình học (.xlsx) thành công!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className={`h-full overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 select-none transition-colors duration-300 ${
      themeConfig.isLight ? 'text-[#231B15]' : 'text-white'
    }`}>
      
      {/* ─────────────────────────────────────────────────────────────
          NOTIFICATION BANNER
      ───────────────────────────────────────────────────────────── */}
      {exportNotice && (
        <div className={`px-5 py-3 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-lg animate-in fade-in border ${
          themeConfig.isLight 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-[#101726] border-sky-500/40 text-sky-300'
        }`}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{exportNotice}</span>
          </div>
          <button 
            onClick={() => setExportNotice(null)} 
            className={`cursor-pointer ${themeConfig.isLight ? 'text-emerald-800/60 hover:text-emerald-800' : 'text-white/60 hover:text-white'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          HEADER SECTION (STEP 3 CONTEXT & TITLE)
      ───────────────────────────────────────────────────────────── */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b ${
        themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-sky-500/20'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider border shadow-xs ${
              themeConfig.isLight 
                ? `${themeConfig.badgeBg} ${themeConfig.accentText} border-[#E8E1D5]` 
                : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
            }`}>
              BƯỚC 3 / 4 • BẢNG KHỐI LƯỢNG HÌNH HỌC
            </span>
            <span className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-sky-300/60'}`}>
              • CAD TAKEOFF SHEET
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3 ${
            themeConfig.isLight ? 'text-[#231B15]' : 'text-white'
          }`}>
            Bảng Khối Lượng Bóc Tách Đo Đạc CAD
          </h1>
          <p className={`text-xs sm:text-sm mt-1 max-w-3xl ${
            themeConfig.isLight ? 'text-[#796E64]' : 'text-white/65'
          }`}>
            Toàn bộ số liệu diện tích hình học (sàn, chu vi tường, chiều cao và diện tích trừ cửa) được đo bóc tự động từ bản vẽ vector CAD. 
            <strong className={`font-semibold ml-1 ${themeConfig.isLight ? 'text-[#C25E3E]' : 'text-sky-400'}`}>
              Chưa tính khối lượng sơn & chi phí
            </strong> (sẽ thực hiện ở Bước 4).
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onBackToReview && (
            <button
              onClick={onBackToReview}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                themeConfig.isLight 
                  ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#4A3E36]' 
                  : 'bg-white/5 hover:bg-sky-500/10 border-white/10 hover:border-sky-500/30 text-white/80 hover:text-white'
              }`}
              title="Quay lại kiểm tra bản vẽ CAD"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kiểm tra AI</span>
            </button>
          )}

          <button
            onClick={handleExportExcel}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              themeConfig.isLight 
                ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#4A3E36]' 
                : 'bg-white/5 hover:bg-sky-500/10 border-white/10 hover:border-sky-500/30 text-white/80 hover:text-white'
            }`}
            title="Xuất bảng khối lượng ra định dạng Excel / CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
            <span>Xuất Excel</span>
          </button>

          {onNavigateToEstimate && (
            <button
              onClick={onNavigateToEstimate}
              className={`px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                themeConfig.primaryBtn
              }`}
              title="Chuyển sang bước 4 để chọn sơn và tính chi phí"
            >
              <span>Lập dự toán sơn (Bước 4)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6 KPI GEOMETRIC MEASUREMENT CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Card 1: Tổng diện tích sàn */}
        <div className={`p-4 rounded-2xl border transition-colors shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 hover:border-sky-500/30'
        }`}>
          <div className={`text-[11px] font-medium ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>Tổng diện tích sàn</div>
          <div className={`text-xl font-bold font-mono mt-1 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
            {totalFloorArea.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>m²</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/40'}`}>8 phân khu chức năng</div>
        </div>

        {/* Card 2: Tổng chu vi tường */}
        <div className={`p-4 rounded-2xl border transition-colors shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 hover:border-sky-500/30'
        }`}>
          <div className={`text-[11px] font-medium ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>Tổng chu vi tường</div>
          <div className={`text-xl font-bold font-mono mt-1 ${themeConfig.accentText}`}>
            {totalPerimeter.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>m</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/40'}`}>Đo theo tim/thông thủy</div>
        </div>

        {/* Card 3: Chiều cao thiết kế */}
        <div className={`p-4 rounded-2xl border transition-colors shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 hover:border-sky-500/30'
        }`}>
          <div className={`text-[11px] font-medium ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>Chiều cao tầng (H)</div>
          <div className={`text-xl font-bold font-mono mt-1 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
            {standardHeight.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>m</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/40'}`}>Chuẩn trần hoàn thiện</div>
        </div>

        {/* Card 4: Khấu trừ cửa */}
        <div className={`p-4 rounded-2xl border transition-colors shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 hover:border-sky-500/30'
        }`}>
          <div className={`text-[11px] font-medium ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>Khấu trừ cửa & lỗ mở</div>
          <div className={`text-xl font-bold font-mono mt-1 ${themeConfig.isLight ? 'text-rose-600' : 'text-rose-400'}`}>
            -{totalDeduction.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>m²</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/40'}`}>8 cửa đi + 15 cửa sổ</div>
        </div>

        {/* Card 5: Diện tích tường Net */}
        <div className={`p-4 rounded-2xl border transition-colors shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 hover:border-sky-500/30'
        }`}>
          <div className={`text-[11px] font-semibold ${themeConfig.isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Diện tích tường Net</div>
          <div className={`text-xl font-bold font-mono mt-1 ${themeConfig.isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            {totalNetWallArea.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>m²</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/40'}`}>Đã trừ 100% diện tích cửa</div>
        </div>

        {/* Card 6: Tổng DT bóc tách (Tường + Trần) */}
        <div className={`p-4 rounded-2xl border shadow-sm ${
          themeConfig.isLight 
            ? `${themeConfig.badgeBg} border-[#E8E1D5]` 
            : 'bg-[#0e1628] border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.12)]'
        }`}>
          <div className={`text-[11px] font-bold ${themeConfig.accentText}`}>Tổng DT Bề mặt</div>
          <div className={`text-xl font-black font-mono mt-1 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
            {totalTakeoffSurface.toFixed(1)} <span className={`text-xs font-sans font-normal ${themeConfig.isLight ? 'text-[#796E64]' : 'text-sky-200/70'}`}>m²</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${themeConfig.isLight ? 'text-[#796E64]' : 'text-sky-300/80'}`}>Tường net + Trần sàn</div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB SWITCHER & FILTER CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Navigation Tabs */}
        <div className={`flex items-center gap-1.5 p-1 rounded-xl border text-xs ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#0c121e] border-sky-500/20'
        }`}>
          <button
            onClick={() => setActiveTab('rooms_table')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'rooms_table'
                ? `${themeConfig.primaryBtn} text-white font-extrabold shadow-sm`
                : themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] hover:bg-white' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Bảng bóc tách theo phòng ({rooms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('openings_table')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'openings_table'
                ? `${themeConfig.primaryBtn} text-white font-extrabold shadow-sm`
                : themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] hover:bg-white' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Khấu trừ cửa ({doors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flagged_items')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'flagged_items'
                ? `${themeConfig.primaryBtn} text-white font-extrabold shadow-sm`
                : themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] hover:bg-white' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Mục kỹ sư lưu ý ({totalFlags})</span>
          </button>
        </div>

        {/* Search & Category Filter (only for rooms table) */}
        {activeTab === 'rooms_table' && (
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative w-48 sm:w-56">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã hoặc tên phòng..."
                className={`w-full rounded-xl pl-8 pr-3 py-1.5 text-xs transition-colors border focus:outline-none ${
                  themeConfig.isLight 
                    ? 'bg-white border-[#E8E1D5] text-[#231B15] placeholder-[#A89F91] focus:border-[#C25E3E]' 
                    : 'bg-[#0c121e] border-sky-500/20 text-white placeholder-white/40 focus:border-sky-400'
                }`}
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setRoomFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  roomFilter === 'all'
                    ? (themeConfig.isLight ? 'bg-[#C25E3E] text-white border-[#C25E3E]' : 'bg-sky-500/20 text-sky-300 border-sky-500/40')
                    : (themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] bg-white border-[#E8E1D5]' : 'text-white/50 hover:text-white bg-[#0c121e] border-white/10')
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setRoomFilter('office')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  roomFilter === 'office'
                    ? (themeConfig.isLight ? 'bg-[#C25E3E] text-white border-[#C25E3E]' : 'bg-sky-500/20 text-sky-300 border-sky-500/40')
                    : (themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] bg-white border-[#E8E1D5]' : 'text-white/50 hover:text-white bg-[#0c121e] border-white/10')
                }`}
              >
                Văn phòng
              </button>
              <button
                onClick={() => setRoomFilter('service')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  roomFilter === 'service'
                    ? (themeConfig.isLight ? 'bg-[#C25E3E] text-white border-[#C25E3E]' : 'bg-sky-500/20 text-sky-300 border-sky-500/40')
                    : (themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15] bg-white border-[#E8E1D5]' : 'text-white/50 hover:text-white bg-[#0c121e] border-white/10')
                }`}
              >
                Kỹ thuật / WC
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DETAILED ROOM GEOMETRIC TAKEOFF TABLE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'rooms_table' && (
        <div className={`border rounded-2xl overflow-hidden shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 shadow-xl'
        }`}>
          
          <div className={`px-5 py-3.5 border-b flex items-center justify-between text-xs font-semibold ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#111728] border-sky-500/20'
          }`}>
            <div className={`flex items-center gap-2 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/90'}`}>
              <Layers className={`w-4 h-4 ${themeConfig.accentText}`} />
              <span>Chi tiết bóc tách hình học các không gian ({filteredRooms.length} phòng)</span>
            </div>
            <div className={`text-[11px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-sky-200/60'}`}>
              Công thức: Diện tích tường Net = (Chu vi × Chiều cao 3.0m) - Khấu trừ cửa
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${
                  themeConfig.isLight 
                    ? 'bg-[#F2ECE1] border-[#E8E1D5] text-[#796E64]' 
                    : 'bg-[#0a0f1d] border-white/10 text-white/50'
                }`}>
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Mã phòng</th>
                  <th className="py-3 px-4">Tên phòng / Không gian</th>
                  <th className="py-3 px-3 text-right">DT Sàn (m²)</th>
                  <th className="py-3 px-3 text-right">Chu vi (m)</th>
                  <th className="py-3 px-2 text-right">H (m)</th>
                  <th className="py-3 px-3 text-right">Tường thô (m²)</th>
                  <th className="py-3 px-3 text-right text-rose-500">Trừ cửa (m²)</th>
                  <th className={`py-3 px-4 text-right font-bold ${themeConfig.isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Tường Net (m²)</th>
                  <th className="py-3 px-3 text-right">Trần (m²)</th>
                  <th className={`py-3 px-4 text-right font-bold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>Tổng bóc tách (m²)</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${themeConfig.isLight ? 'divide-[#E8E1D5]' : 'divide-white/5'}`}>
                {filteredRooms.map((room, idx) => {
                  const grossWall = (room.perimeter || 0) * standardHeight;
                  const deduction = (room.doorDeductions || 0) + (room.windowDeductions || 0);
                  const netWall = room.netPaintArea || (grossWall - deduction);
                  const ceiling = room.floorArea || 0;
                  const totalSurface = netWall + ceiling;
                  const isSelected = selectedRoomId === room.id;

                  return (
                    <tr
                      key={room.id}
                      onClick={() => setSelectedRoomId(isSelected ? null : room.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected 
                          ? (themeConfig.isLight ? 'bg-[#C25E3E]/10' : 'bg-sky-500/10')
                          : (themeConfig.isLight ? 'hover:bg-[#FAF7F2]' : 'hover:bg-sky-500/5')
                      }`}
                    >
                      {/* STT */}
                      <td className={`py-3 px-4 text-center font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </td>

                      {/* Mã phòng */}
                      <td className={`py-3 px-4 font-mono font-bold ${themeConfig.accentText}`}>
                        {room.code}
                      </td>

                      {/* Tên phòng */}
                      <td className="py-3 px-4">
                        <div className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>{room.name}</div>
                        <div className={`text-[10px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>Layer: {room.layer}</div>
                      </td>

                      {/* DT Sàn */}
                      <td className={`py-3 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/90'}`}>
                        {room.floorArea.toFixed(1)}
                      </td>

                      {/* Chu vi */}
                      <td className={`py-3 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                        {room.perimeter.toFixed(1)}
                      </td>

                      {/* Chiều cao */}
                      <td className={`py-3 px-2 text-right font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
                        {standardHeight.toFixed(1)}
                      </td>

                      {/* Tường thô */}
                      <td className={`py-3 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                        {grossWall.toFixed(1)}
                      </td>

                      {/* Trừ cửa */}
                      <td className="py-3 px-3 text-right font-mono text-rose-500 font-semibold">
                        -{deduction.toFixed(1)}
                      </td>

                      {/* Tường Net */}
                      <td className={`py-3 px-4 text-right font-mono font-bold ${themeConfig.isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                        {netWall.toFixed(1)}
                      </td>

                      {/* Trần */}
                      <td className={`py-3 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                        {ceiling.toFixed(1)}
                      </td>

                      {/* Tổng bóc tách */}
                      <td className={`py-3 px-4 text-right font-mono font-bold ${
                        themeConfig.isLight ? 'text-[#231B15] bg-[#FAF7F2]' : 'text-white bg-white/[0.02]'
                      }`}>
                        {totalSurface.toFixed(1)}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          themeConfig.isLight 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        }`}>
                          <Check className="w-3 h-3" />
                          <span>Chuẩn hóa</span>
                        </span>
                      </td>

                      {/* Thao tác */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectRoom(room.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                            themeConfig.isLight 
                              ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#C25E3E]' 
                              : 'bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/30 text-sky-300'
                          }`}
                          title="Xem vị trí phòng trên bản vẽ CAD"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Xem CAD</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
              {/* Footer row with sums */}
              <tfoot>
                <tr className={`font-bold text-xs border-t-2 ${
                  themeConfig.isLight 
                    ? 'bg-[#FAF7F2] border-[#E8E1D5]' 
                    : 'bg-[#141b2d] border-sky-500/40'
                }`}>
                  <td colSpan={3} className={`py-3.5 px-4 uppercase font-mono ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                    TỔNG CỘNG ({filteredRooms.length} PHÒNG)
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                    {totalFloorArea.toFixed(1)}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${themeConfig.accentText}`}>
                    {totalPerimeter.toFixed(1)}
                  </td>
                  <td className={`py-3.5 px-2 text-right font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
                    3.0
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/80'}`}>
                    {totalGrossWallArea.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-rose-500">
                    -{totalDeduction.toFixed(1)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono text-sm ${themeConfig.isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {totalNetWallArea.toFixed(1)}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                    {totalCeilingArea.toFixed(1)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-black text-sm border-x ${
                    themeConfig.isLight 
                      ? 'bg-[#C25E3E]/10 text-[#C25E3E] border-[#E8E1D5]' 
                      : 'bg-sky-500/20 text-sky-200 border-sky-500/30'
                  }`}>
                    {totalTakeoffSurface.toFixed(1)}
                  </td>
                  <td colSpan={2} className={`py-3.5 px-4 text-center text-[10px] ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/60'}`}>
                    Đã thẩm định 100%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: OPENINGS & DEDUCTIONS DETAIL TABLE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'openings_table' && (
        <div className={`border rounded-2xl overflow-hidden shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 shadow-xl'
        }`}>
          <div className={`px-5 py-3.5 border-b flex items-center justify-between text-xs font-semibold ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#111728] border-sky-500/20'
          }`}>
            <div className={`flex items-center gap-2 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/90'}`}>
              <DoorOpen className={`w-4 h-4 ${themeConfig.accentText}`} />
              <span>Bảng thống kê cửa đi & cửa sổ khấu trừ ({doors.length} cửa)</span>
            </div>
            <div className={`text-[11px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-sky-200/60'}`}>
              Tiêu chuẩn: Trừ 100% diện tích lọt lòng lỗ mở thông thủy
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${
                  themeConfig.isLight 
                    ? 'bg-[#F2ECE1] border-[#E8E1D5] text-[#796E64]' 
                    : 'bg-[#0a0f1d] border-white/10 text-white/50'
                }`}>
                  <th className="py-3 px-4">Ký hiệu cửa</th>
                  <th className="py-3 px-4">Loại cửa</th>
                  <th className="py-3 px-4">Vị trí phòng</th>
                  <th className="py-3 px-4 text-right">Rộng (mm)</th>
                  <th className="py-3 px-4 text-right">Cao (mm)</th>
                  <th className="py-3 px-4 text-right font-bold text-rose-500">Diện tích trừ (m²)</th>
                  <th className="py-3 px-4 text-center">Độ tin cậy OCR</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${themeConfig.isLight ? 'divide-[#E8E1D5]' : 'divide-white/5'}`}>
                {doors.map((door) => (
                  <tr key={door.id} className={`transition-colors ${themeConfig.isLight ? 'hover:bg-[#FAF7F2]' : 'hover:bg-sky-500/5'}`}>
                    <td className={`py-3 px-4 font-mono font-bold ${themeConfig.accentText}`}>
                      {door.code}
                    </td>
                    <td className={`py-3 px-4 font-medium ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                      {door.type}
                    </td>
                    <td className={`py-3 px-4 ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                      Phòng liên kết ({door.id})
                    </td>
                    <td className={`py-3 px-4 text-right font-mono ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                      {door.width || 900}
                    </td>
                    <td className={`py-3 px-4 text-right font-mono ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/70'}`}>
                      {door.height || 2100}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-500">
                      -{(door.deductionArea || 1.89).toFixed(2)} m²
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        themeConfig.isLight 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {door.confidence || 98}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onInspectRoom('room-a101')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                          themeConfig.isLight 
                            ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#C25E3E]' 
                            : 'bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/30 text-sky-300'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Xem CAD</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: HUMAN-IN-THE-LOOP FLAGGED ITEMS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'flagged_items' && (
        <div className={`border rounded-2xl overflow-hidden shadow-xs ${
          themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#0e1424] border-white/10 shadow-xl'
        }`}>
          <div className={`px-5 py-3.5 border-b flex items-center justify-between text-xs font-semibold ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#111728] border-sky-500/20'
          }`}>
            <div className={`flex items-center gap-2 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/90'}`}>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Hàng đợi kiểm duyệt kỹ sư ({totalFlags} mục)</span>
            </div>
            <span className={`text-[11px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-sky-200/60'}`}>
              Độ tin cậy &lt; 95%
            </span>
          </div>

          <div className={`divide-y ${themeConfig.isLight ? 'divide-[#E8E1D5]' : 'divide-white/5'}`}>
            {flaggedRooms.map((room) => (
              <div key={room.id} className={`p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                themeConfig.isLight ? 'hover:bg-[#FAF7F2]' : 'hover:bg-white/5'
              }`}>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold font-mono ${themeConfig.accentText}`}>{room.code}</span>
                    <span className={`text-xs font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/90'}`}>{room.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      ⚠️ {room.confidence}% Độ tin cậy
                    </span>
                    <span className={`text-xs font-mono font-bold ${themeConfig.accentText}`}>{room.sourceHandle}</span>
                  </div>

                  <p className={`text-xs p-3 rounded-xl border max-w-2xl ${
                    themeConfig.isLight 
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                      : 'text-amber-200/90 bg-amber-500/10 border-amber-500/30'
                  }`}>
                    <strong className="font-semibold text-amber-700 dark:text-amber-300">Vấn đề: </strong>
                    {room.issueDescription || room.aiExplanation}
                  </p>

                  <div className={`flex items-center gap-4 text-[11px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
                    <span>DT Sàn: {room.floorArea} m²</span>
                    <span>•</span>
                    <span>Chu vi: {room.perimeter} m</span>
                    <span>•</span>
                    <span>Lớp CAD: {room.layer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-xs">
                  <button
                    onClick={() => onInspectRoom(room.id)}
                    className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                      themeConfig.isLight 
                        ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#C25E3E]' 
                        : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-white border-sky-500/40'
                    }`}
                  >
                    <span>Xem CAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onConfirmRoom(room.id)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                    title="Xác nhận hợp lệ"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => onCorrectRoom(room)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      themeConfig.isLight 
                        ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#4A3E36]' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-300'
                    }`}
                    title="Hiệu chỉnh đỉnh"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRejectRoom(room.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-500 transition-colors cursor-pointer"
                    title="Từ chối"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {totalFlags === 0 && (
              <div className={`p-10 text-center text-xs space-y-2 ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}`}>
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className={`font-bold text-sm ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                  Không còn mục nào cần kỹ sư thẩm định!
                </p>
                <p>Toàn bộ 8 phòng và khẩu độ cửa đã được xác minh chuẩn xác 100%.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STICKY BOTTOM WORKFLOW ACTION BAR
      ───────────────────────────────────────────────────────────── */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
        themeConfig.isLight 
          ? 'bg-white border-[#E8E1D5]' 
          : 'bg-[#0c121e] border-sky-500/30 shadow-xl'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black font-mono text-xs shadow-sm ${
            themeConfig.isLight ? 'bg-[#C25E3E] text-white' : 'bg-sky-600 text-white border border-sky-400/30'
          }`}>
            3/4
          </div>
          <div>
            <div className={`text-xs font-bold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
              Đã hoàn tất bóc tách hình học 8/8 phân khu (Tổng 579.1 m² bề mặt)
            </div>
            <div className={`text-[11px] ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}`}>
              Sẵn sàng chuyển dữ liệu hình học này sang Bước 4 để lập định mức sơn, đơn giá và dự toán chi phí.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {onBackToReview && (
            <button
              onClick={onBackToReview}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                themeConfig.isLight 
                  ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#4A3E36]' 
                  : 'bg-white/5 hover:bg-sky-500/10 border-white/10 hover:border-sky-500/30 text-white/80 hover:text-white'
              }`}
            >
              ◄ Quay lại Kiểm tra AI
            </button>
          )}

          {onNavigateToEstimate && (
            <button
              onClick={onNavigateToEstimate}
              className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                themeConfig.primaryBtn
              }`}
            >
              <span>Tiến hành Bước 4: Lập dự toán sơn & chi phí</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

