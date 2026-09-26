import React, { useState } from 'react';
import { X, Check, Edit3, ArrowRight, RotateCcw, AlertTriangle, Layers } from 'lucide-react';
import { RoomEntity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface GeometryEditorModalProps {
  room: RoomEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRoom: RoomEntity, oldArea: number, newArea: number) => void;
}

export const GeometryEditorModal: React.FC<GeometryEditorModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave,
}) => {
  const { themeConfig } = useTheme();

  if (!isOpen || !room) return null;

  // Local state for interactive adjustment
  const [offsetDelta, setOffsetDelta] = useState<number>(1.6); // +1.6 m²
  const [wallHeight, setWallHeight] = useState<number>(room.wallHeight);

  const originalFloorArea = room.floorArea;
  const newFloorArea = Math.round((originalFloorArea + offsetDelta) * 100) / 100;

  // Recalculate paint area
  const newGrossWallArea = Math.round((newFloorArea * 2) * 100) / 100;
  const newPaintArea = Math.round((newGrossWallArea - room.doorDeductions - room.windowDeductions) * 100) / 100;
  const newCost = Math.round(newPaintArea * room.unitRate);

  const handleApply = () => {
    const updated: RoomEntity = {
      ...room,
      floorArea: newFloorArea,
      grossWallArea: newGrossWallArea,
      netPaintArea: newPaintArea,
      totalCost: newCost,
      status: 'Corrected',
    };
    onSave(updated, originalFloorArea, newFloorArea);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className={`rounded-2xl border shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
        themeConfig.isLight ? 'bg-white border-[#E8E1D5] text-[#231B15]' : 'bg-[#12141a] border-white/10 text-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
        }`}>
          <div>
            <h2 className={`text-base font-bold flex items-center gap-2 ${
              themeConfig.isLight ? 'text-[#231B15]' : 'text-white'
            }`}>
              <Edit3 className={`w-4 h-4 ${themeConfig.accentText}`} />
              Hiệu chỉnh Ranh giới Hình học // {room.code}
            </h2>
            <p className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
              Nguồn: {room.sourceHandle} · Lớp CAD {room.layer}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              themeConfig.isLight 
                ? 'text-[#8C827A] hover:text-[#231B15] hover:bg-[#E8E1D5]/40' 
                : 'text-white/40 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className={`text-xs font-sans leading-relaxed ${
            themeConfig.isLight ? 'text-[#796E64]' : 'text-white/60'
          }`}>
            Điều chỉnh độ dịch chuyển tọa độ đỉnh hoặc chiều cao tường. Khối lượng bóc tách và dự toán liên quan sẽ được tự động tính toán lại tức thì.
          </div>

          {/* Interactive Vertex Extension Slider */}
          <div className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
          }`}>
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}`}>
                ĐỘ DỊCH CHUYỂN BÙ RANH GIỚI
              </span>
              <span className={`font-bold ${themeConfig.accentText}`}>
                {offsetDelta >= 0 ? `+${offsetDelta}` : offsetDelta} m²
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              step="0.1"
              value={offsetDelta}
              onChange={(e) => setOffsetDelta(parseFloat(e.target.value))}
              className="w-full accent-[#C25E3E] cursor-pointer"
            />
            <div className={`flex justify-between text-[10px] ${
              themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
            }`}>
              <span>Thu hẹp -5.0 m²</span>
              <span>Khớp chuẩn 0.0 m²</span>
              <span>Mở rộng +10.0 m²</span>
            </div>
          </div>

          {/* Wall height parameter */}
          <div className={`flex items-center justify-between font-mono text-xs p-3 rounded-xl border ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
          }`}>
            <span className={`font-sans ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>CHIỀU CAO THÔNG THỦY (m):</span>
            <input
              type="number"
              step="0.1"
              value={wallHeight}
              onChange={(e) => setWallHeight(parseFloat(e.target.value) || 3.2)}
              className={`w-24 px-2 py-1 border rounded text-right font-bold focus:outline-none ${
                themeConfig.isLight 
                  ? 'bg-white border-[#E8E1D5] text-[#C25E3E]' 
                  : 'bg-white/5 border-white/20 text-[#ffc474]'
              }`}
            />
          </div>

          {/* Signature Dependency Propagation Preview */}
          <div className={`p-4 rounded-xl border font-mono text-xs space-y-3 ${
            themeConfig.isLight 
              ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15]' 
              : 'bg-white/5 border-white/10 text-white'
          }`}>
            <div className={`text-[11px] font-bold flex items-center gap-1.5 uppercase ${themeConfig.accentText}`}>
              <Layers className="w-3.5 h-3.5" />
              Cập nhật Lan truyền Phụ thuộc & Tính toán lại
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className={`p-2.5 rounded-lg border ${
                themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
              }`}>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>DIỆN TÍCH SÀN:</span>
                <span className={`line-through mr-1 ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
                  {originalFloorArea.toFixed(2)} m²
                </span>
                <span className={`font-bold ${themeConfig.accentText}`}>
                  → {newFloorArea.toFixed(2)} m²
                </span>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                themeConfig.isLight ? 'bg-white border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
              }`}>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>DIỆN TÍCH SƠN THỰC:</span>
                <span className={`line-through mr-1 ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
                  {room.netPaintArea.toFixed(2)} m²
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  → {newPaintArea.toFixed(2)} m²
                </span>
              </div>
            </div>

            <div className={`pt-2 border-t flex items-center justify-between text-xs ${
              themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'
            }`}>
              <span className={`font-sans ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/60'}`}>Kinh phí sơn phòng:</span>
              <span className={`font-bold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                {room.totalCost.toLocaleString()} ₫ →{' '}
                <span className={themeConfig.accentText}>{newCost.toLocaleString()} ₫</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15]' : 'text-white/50 hover:text-white'
            }`}
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleApply}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer text-white ${
              themeConfig.primaryBtn
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Áp dụng & Cập nhật Dự toán</span>
          </button>
        </div>
      </div>
    </div>
  );
};

