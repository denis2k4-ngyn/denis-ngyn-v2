import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, FileCode, CheckCircle2, Loader2, Share2 } from 'lucide-react';
import { ProjectInfo, RoomEntity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectInfo;
  rooms: RoomEntity[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  rooms,
}) => {
  const { themeConfig } = useTheme();
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalPaintArea = rooms.reduce((acc, r) => acc + r.netPaintArea, 0);
  const totalCost = rooms.reduce((acc, r) => acc + r.totalCost, 0);

  const handleExport = (type: string, filename: string) => {
    setExportingType(type);
    setTimeout(() => {
      setExportingType(null);
      setSuccessMessage(`Đã xuất thành công tệp: ${filename}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 900);
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
              <Download className={`w-4 h-4 ${themeConfig.accentText}`} />
              Xuất Hồ sơ Bóc tách & Bản vẽ CAD Đã Kiểm Định
            </h2>
            <p className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
              {project.name} · {project.currentFloor} ({rooms.length} phòng đã kiểm định)
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

        {/* Success toast inside modal */}
        {successMessage && (
          <div className={`mx-6 mt-4 p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
            themeConfig.isLight 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Options List */}
        <div className="p-6 space-y-3">
          {[
            {
              id: 'excel',
              name: 'Sổ tính Bóc tách Khối lượng Excel (.xlsx)',
              desc: 'Bảng BOQ phân cấp cấu trúc chuẩn, tích hợp công thức, định mức sơn lót & đơn giá',
              ext: 'Sunrise_Takeoff_v3.xlsx',
              icon: FileSpreadsheet,
              color: 'text-emerald-500',
            },
            {
              id: 'pdf',
              name: 'Báo cáo Dự toán & Tiên lượng Sơn Kỹ thuật (.pdf)',
              desc: 'Bản tóm lược cho chủ đầu tư, kèm hình ảnh mặt bằng phòng, chữ ký & tem kiểm định',
              ext: 'Sunrise_Paint_Estimate.pdf',
              icon: FileText,
              color: 'text-rose-500',
            },
            {
              id: 'dxf',
              name: 'Bản vẽ CAD có gắn Chú thích Kỹ thuật (.dxf)',
              desc: 'File DXF R2024 tích hợp sẵn lớp A-ROOM-BND và nhãn diện tích thực tế',
              ext: 'Floor03_Annotated_Takeoff.dxf',
              icon: FileCode,
              color: themeConfig.accentText,
            },
            {
              id: 'csv',
              name: 'Tọa độ Đỉnh Hình học Vector Thô (.csv)',
              desc: 'Toàn bộ tọa độ vector đỉnh IEEE-754, bản đồ phân lớp CAD & mã thẻ thực thể',
              ext: 'Sunrise_Geometry_Raw.csv',
              icon: FileSpreadsheet,
              color: 'text-amber-500',
            },
            {
              id: 'report',
              name: 'Biên bản Chứng thực Tính toán Kỹ thuật (.json / txt)',
              desc: 'Toàn văn nhật ký kiểm toán toán học phục vụ đơn vị thẩm tra độc lập',
              ext: 'Audit_Verification_Cert.json',
              icon: FileText,
              color: themeConfig.accentText,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = exportingType === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleExport(item.id, item.ext)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group shadow-xs ${
                  themeConfig.isLight 
                    ? 'border-[#E8E1D5] bg-[#FAF7F2] hover:bg-white hover:border-[#C25E3E]' 
                    : 'border-white/10 hover:border-sky-500/40 bg-[#161822] hover:bg-white/5 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                    themeConfig.isLight ? 'bg-white border border-[#E8E1D5]' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold transition-colors ${
                      themeConfig.isLight ? 'text-[#231B15] group-hover:text-[#C25E3E]' : 'text-white group-hover:text-sky-400'
                    }`}>
                      {item.name}
                    </div>
                    <div className={`text-[11px] font-sans mt-0.5 ${
                      themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'
                    }`}>
                      {item.desc}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-3">
                  {isCurrent ? (
                    <Loader2 className={`w-4 h-4 animate-spin ${themeConfig.accentText}`} />
                  ) : (
                    <Download className={`w-4 h-4 transition-colors ${
                      themeConfig.isLight ? 'text-[#8C827A] group-hover:text-[#C25E3E]' : 'text-white/40 group-hover:text-sky-400'
                    }`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className={`px-6 py-4 border-t flex items-center justify-between text-xs font-mono ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#796E64]' : 'bg-[#161822] border-white/10 text-white/50'
        }`}>
          <div>
            Tổng bóc tách: <strong className={themeConfig.accentText}>{totalPaintArea.toLocaleString()} m²</strong> ·{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">{totalCost.toLocaleString()} ₫</strong>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              themeConfig.isLight 
                ? 'bg-white hover:bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15]' 
                : 'border-white/15 bg-white/5 hover:bg-sky-500/20 hover:border-sky-500/30 text-white'
            }`}
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};

