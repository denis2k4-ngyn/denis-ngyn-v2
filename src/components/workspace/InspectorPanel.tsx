import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Edit3, 
  FileCode, 
  Info, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  CornerDownRight, 
  ExternalLink,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { RoomEntity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface InspectorPanelProps {
  room: RoomEntity | null;
  onConfirm: (roomId: string) => void;
  onCorrect: (room: RoomEntity) => void;
  onReject: (roomId: string) => void;
  onHighlightSource: (sourceHandle: string) => void;
  onApplySuggestion: (room: RoomEntity) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  room,
  onConfirm,
  onCorrect,
  onReject,
  onHighlightSource,
  onApplySuggestion,
}) => {
  const { themeConfig } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  if (!room) {
    return (
      <aside className={`w-80 border-l p-6 flex flex-col justify-between text-xs font-mono select-none shrink-0 transition-colors ${
        themeConfig.isLight 
          ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#8C827A]' 
          : 'bg-[#0e1015] border-white/10 text-white/50'
      }`}>
        <div>
          <div className={`pb-3 border-b font-bold uppercase text-[10px] tracking-wider ${
            themeConfig.isLight ? 'border-[#E8E1D5] text-[#796E64]' : 'border-white/10 text-white/40'
          }`}>
            Bảng kiểm tra thực thể
          </div>
          <div className="mt-8 text-center space-y-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border ${
              themeConfig.isLight 
                ? 'bg-[#C25E3E]/10 border-[#C25E3E]/20 text-[#C25E3E]' 
                : 'bg-amber-500/10 border-amber-500/20 text-[#ffc474]'
            }`}>
              <Layers className="w-6 h-6" />
            </div>
            <p className={`font-sans font-medium text-xs ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/90'}`}>
              Chưa chọn phòng nào
            </p>
            <p className={`text-[11px] font-sans leading-relaxed ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/40'}`}>
              Nhấp vào bất kỳ ranh giới phòng hoặc cửa nào trên bản vẽ CAD để kiểm tra thông số kỹ thuật.
            </p>
          </div>
        </div>
        <div className={`text-[10px] text-center font-mono ${themeConfig.isLight ? 'text-[#A89F91]' : 'text-white/30'}`}>
          Bộ máy truy xuất CAD đang hoạt động
        </div>
      </aside>
    );
  }

  const isNeedsReview = room.status === 'Needs Review';
  const isConfirmed = room.status === 'Confirmed';

  return (
    <aside
      className={`border-l transition-all duration-200 flex flex-col justify-between shrink-0 select-none z-20 ${
        themeConfig.isLight ? 'bg-white border-[#E8E1D5] text-[#231B15]' : 'bg-[#0e1015] border-white/10 text-white'
      } ${isCollapsed ? 'w-12' : 'w-84 sm:w-92'}`}
    >
      {/* Top Header */}
      <div className={`h-12 px-4 border-b flex items-center justify-between ${
        themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#12141a] border-white/10'
      }`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
              themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'
            }`}>
              Kiểm tra thực thể
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold border ${
              themeConfig.isLight 
                ? `${themeConfig.badgeBg} ${themeConfig.accentText} border-[#E8E1D5]` 
                : 'bg-sky-500/15 border-sky-500/30 text-sky-400'
            }`}>
              {room.sourceHandle}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1 rounded transition-colors ml-auto cursor-pointer ${
            themeConfig.isLight 
              ? 'text-[#796E64] hover:text-[#231B15] hover:bg-[#E8E1D5]/40' 
              : 'text-white/40 hover:text-white hover:bg-white/10'
          }`}
          title={isCollapsed ? 'Mở rộng bảng' : 'Thu gọn bảng'}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Body */}
      {!isCollapsed ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Room Title & Status */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className={`text-xl font-extrabold font-mono tracking-tight ${
                themeConfig.isLight ? 'text-[#231B15]' : 'text-white'
              }`}>
                {room.code}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                  isNeedsReview
                    ? (themeConfig.isLight ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-amber-500/20 text-[#ffc474] border-amber-500/40')
                    : isConfirmed
                    ? (themeConfig.isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40')
                    : (themeConfig.isLight ? 'bg-[#FAF7F2] text-[#4A3E36] border-[#E8E1D5]' : 'bg-white/10 text-white/70 border-white/15')
                }`}
              >
                {isNeedsReview
                  ? '⚠️ Cần thẩm định'
                  : isConfirmed
                  ? '✓ Đã duyệt'
                  : room.status === 'Corrected'
                  ? '✏️ Đã hiệu chỉnh'
                  : room.status === 'Rejected'
                  ? '✕ Đã từ chối'
                  : '✓ Đã phát hiện'}
              </span>
            </div>
            <div className={`text-xs font-semibold ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/80'}`}>{room.name}</div>
            <div className={`text-[11px] font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
              {room.building} · {room.floor}
            </div>
          </div>

          {/* Key Area Metrics */}
          <div className="grid grid-cols-2 gap-2.5 font-mono">
            <div className={`p-3 rounded-xl border ${
              themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
            }`}>
              <div className={`text-[10px] ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>DIỆN TÍCH SÀN</div>
              <div className={`text-lg font-bold mt-0.5 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                {room.floorArea.toFixed(2)} <span className={`text-xs font-normal ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>m²</span>
              </div>
              <div className={`text-[10px] mt-1 ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
                Chu vi: {room.perimeter.toFixed(1)}m
              </div>
            </div>

            <div className={`p-3 rounded-xl border ${
              themeConfig.isLight 
                ? 'bg-[#C25E3E]/10 border-[#C25E3E]/20' 
                : 'bg-amber-500/10 border-amber-500/25'
            }`}>
              <div className={`text-[10px] font-bold ${themeConfig.accentText}`}>DIỆN TÍCH SƠN THỰC</div>
              <div className={`text-lg font-bold mt-0.5 ${themeConfig.accentText}`}>
                {room.netPaintArea.toFixed(2)} <span className={`text-xs font-normal opacity-70`}>m²</span>
              </div>
              <div className={`text-[10px] mt-1 font-sans ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}`}>
                {room.primerCoats} Lót + {room.topCoats} Phủ
              </div>
            </div>
          </div>

          {/* Detailed Geometric Breakdown */}
          <div className={`p-3.5 rounded-xl border font-mono text-[11px] space-y-1.5 ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#141720] border-white/10'
          }`}>
            <div className={`text-[10px] font-bold uppercase pb-1 border-b ${
              themeConfig.isLight ? 'border-[#E8E1D5] text-[#796E64]' : 'border-white/10 text-white/40'
            }`}>
              Chi tiết Bóc tách Hình học
            </div>
            <div className={`flex justify-between ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
              <span>Chiều cao thông thủy:</span>
              <span className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>{room.wallHeight.toFixed(2)} m</span>
            </div>
            <div className={`flex justify-between ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
              <span>Diện tích tường thô:</span>
              <span className={themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}>{room.grossWallArea.toFixed(2)} m²</span>
            </div>
            <div className={`flex justify-between ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
              <span>Khấu trừ cửa đi:</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">-{room.doorDeductions.toFixed(2)} m²</span>
            </div>
            <div className={`flex justify-between ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
              <span>Khấu trừ cửa sổ:</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">-{room.windowDeductions.toFixed(2)} m²</span>
            </div>
            <div className={`pt-1 border-t flex justify-between font-bold ${
              themeConfig.isLight ? 'border-[#E8E1D5] text-[#231B15]' : 'border-white/10 text-white'
            }`}>
              <span>Tổng diện tích sơn tường:</span>
              <span className={themeConfig.accentText}>{room.netPaintArea.toFixed(2)} m²</span>
            </div>
          </div>

          {/* Paint System & Rate */}
          <div className={`p-3.5 rounded-xl border space-y-1.5 ${
            themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'border-white/10 bg-[#161822]'
          }`}>
            <div className={`text-[10px] font-mono font-bold uppercase ${
              themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
            }`}>
              Hệ sơn & Kinh phí
            </div>
            <div className={`text-xs font-semibold leading-tight ${
              themeConfig.isLight ? 'text-[#231B15]' : 'text-white'
            }`}>
              {room.paintSystem}
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className={themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}>Đơn giá:</span>
              <span className={themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}>{room.unitRate.toLocaleString()} ₫/m²</span>
            </div>
            <div className={`flex items-center justify-between text-xs font-mono font-bold pt-1.5 border-t ${
              themeConfig.isLight ? 'border-[#E8E1D5] text-[#231B15]' : 'border-white/10 text-white'
            }`}>
              <span>Thành tiền phòng:</span>
              <span className={`text-sm ${themeConfig.accentText}`}>
                {room.totalCost.toLocaleString()} ₫
              </span>
            </div>
          </div>

          {/* Source Handle & CAD Traceability */}
          <div className={`p-3.5 rounded-xl font-mono text-xs space-y-2 border ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#0c0e12] border-white/10 text-white'
          }`}>
            <div className="flex items-center justify-between text-[10px] uppercase font-bold">
              <span className={`flex items-center gap-1.5 ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}`}>
                <FileCode className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
                Truy xuất nguồn gốc DXF
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">● {room.confidence}% TIN CẬY</span>
            </div>

            <div className={`space-y-1 text-[11px] ${themeConfig.isLight ? 'text-[#5C5248]' : 'text-white/70'}`}>
              <div className="flex justify-between">
                <span className={themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}>Handle DXF:</span>
                <span className={`font-bold ${themeConfig.accentText}`}>{room.sourceHandle}</span>
              </div>
              <div className="flex justify-between">
                <span className={themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}>Lớp CAD:</span>
                <span className={themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}>{room.layer}</span>
              </div>
              <div className="flex justify-between">
                <span className={themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}>Số đỉnh vector:</span>
                <span className={themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}>{room.vertices.length} đỉnh</span>
              </div>
            </div>

            <button
              onClick={() => onHighlightSource(room.sourceHandle)}
              className={`w-full mt-2 py-2 rounded-lg border text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                themeConfig.isLight 
                  ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#C25E3E]' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-400'
              }`}
            >
              <span>Làm sáng thực thể trên CAD</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* AI Explainability Drawer */}
          {room.aiExplanation && (
            <div className={`border rounded-xl overflow-hidden ${
              themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'border-white/10 bg-[#161822]'
            }`}>
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className={`w-full px-3 py-2 flex items-center justify-between text-xs font-mono transition-colors cursor-pointer ${
                  themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15]' : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5 font-semibold">
                  <Info className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
                  Giải trình thuật toán AI
                </span>
                {showExplanation ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showExplanation && (
                <div className={`p-3 pt-1 text-[11px] font-sans border-t leading-relaxed ${
                  themeConfig.isLight ? 'border-[#E8E1D5] text-[#5C5248]' : 'border-white/10 text-white/70'
                }`}>
                  {room.aiExplanation}
                </div>
              )}
            </div>
          )}

          {/* AI Suggestion Card if available */}
          {room.aiSuggestion && (
            <div className={`p-3.5 rounded-xl border space-y-2 ${
              themeConfig.isLight 
                ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${
                themeConfig.isLight ? 'text-amber-800' : 'text-[#ffc474]'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                Đề xuất Hình học từ AI
              </div>
              <p className="text-[11px] font-sans leading-snug">
                {room.aiSuggestion.text}
              </p>
              <button
                onClick={() => onApplySuggestion(room)}
                className={`w-full py-2 text-xs font-semibold transition-all shadow-xs cursor-pointer text-center rounded-xl text-white ${
                  themeConfig.primaryBtn
                }`}
              >
                Áp dụng đề xuất (+{room.aiSuggestion.deltaArea.toFixed(1)} m²)
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className={`rotate-90 text-[10px] font-mono tracking-widest whitespace-nowrap ${
            themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
          }`}>
            KIỂM TRA THỰC THỂ
          </div>
        </div>
      )}

      {/* HITL Action Footer Bar */}
      {!isCollapsed && (
        <div className={`p-4 border-t space-y-2 shrink-0 ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#12141a] border-white/10'
        }`}>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium">
            <button
              onClick={() => onConfirm(room.id)}
              className="py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center transition-all shadow-xs active:scale-98 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Phê duyệt</span>
            </button>

            <button
              onClick={() => onCorrect(room)}
              className={`py-2.5 rounded-lg border font-semibold text-center transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                themeConfig.isLight 
                  ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15]' 
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
              }`}
            >
              <Edit3 className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
              <span>Hiệu chỉnh</span>
            </button>

            <button
              onClick={() => onReject(room.id)}
              className="py-2.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-500 font-semibold text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Từ chối</span>
            </button>
          </div>
          <p className={`text-[10px] font-mono text-center ${
            themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
          }`}>
            Phê duyệt của kỹ sư sẽ khóa số liệu vào hồ sơ dự toán công trình
          </p>
        </div>
      )}
    </aside>
  );
};

