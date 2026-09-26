import React, { useState } from 'react';
import { X, UploadCloud, FileCode, CheckCircle2, AlertCircle, ArrowRight, Building, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProjectSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (projectName: string, building: string, floor: string, fileName: string) => void;
}

export const ProjectSetupModal: React.FC<ProjectSetupModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
}) => {
  const { themeConfig } = useTheme();
  const [projectName, setProjectName] = useState('Tổ hợp Chung cư Sunrise Tower - Giai đoạn 2');
  const [building, setBuilding] = useState('Tòa A - Căn hộ Cao cấp');
  const [floor, setFloor] = useState('Tầng 03');
  const [floorsCount, setFloorsCount] = useState(28);
  const [selectedFile, setSelectedFile] = useState<string>('Floor03_Architectural.dxf');
  const [uploadProgress, setUploadProgress] = useState(100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className={`rounded-2xl border shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
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
              <Building className={`w-4 h-4 ${themeConfig.accentText}`} />
              Tạo Dự án Mới & Nạp file DXF
            </h2>
            <p className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
              Nạp hình học không gian 2D phục vụ bóc tách khối lượng
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

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5 sm:col-span-2">
              <label className={`font-medium ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>TÊN DỰ ÁN</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'bg-[#161822] border-white/10 text-white focus:border-[#ffc474]/50'
                }`}
                placeholder="Ví dụ: Chung cư Sunrise Tower"
              />
            </div>

            <div className="space-y-1.5">
              <label className={`font-medium ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>TÒA NHÀ / PHÂN KHU</label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'bg-[#161822] border-white/10 text-white focus:border-[#ffc474]/50'
                }`}
                placeholder="Ví dụ: Tòa A"
              />
            </div>

            <div className="space-y-1.5">
              <label className={`font-medium ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>TẦNG MỤC TIÊU BÓC TÁCH</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'bg-[#161822] border-white/10 text-white focus:border-[#ffc474]/50'
                }`}
                placeholder="Ví dụ: Tầng 03"
              />
            </div>
          </div>

          {/* DXF Upload Area */}
          <div className="space-y-2">
            <label className={`text-xs font-mono font-medium ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
              TẢI LÊN BẢN VẼ CAD 2D (.DXF)
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              themeConfig.isLight 
                ? 'border-[#E8E1D5] hover:border-[#C25E3E] bg-[#FAF7F2]/50' 
                : 'border-white/15 hover:border-[#ffc474]/50 bg-white/5'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${
                themeConfig.isLight ? 'bg-white border border-[#E8E1D5]' : 'bg-white/5'
              }`}>
                <UploadCloud className={`w-5 h-5 ${themeConfig.accentText}`} />
              </div>
              <div className={`text-xs font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                Kéo thả bản vẽ DXF của bạn vào đây, hoặc nhấp để chọn file
              </div>
              <p className={`text-[11px] mt-1 font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>
                Hỗ trợ AutoCAD R12, R2000–R2024 ASCII và nhị phân DXF (tối đa 120MB)
              </p>

              {/* Sample files selector for instantaneous engineering trial */}
              <div className={`mt-4 pt-3 border-t text-left ${themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'}`}>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 ${
                  themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
                }`}>
                  Hoặc chọn bộ mẫu bản vẽ kỹ thuật đã kiểm chứng:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedFile('Floor03_Architectural.dxf')}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedFile === 'Floor03_Architectural.dxf'
                        ? (themeConfig.isLight ? 'border-[#C25E3E] bg-[#C25E3E]/10 text-[#231B15] shadow-xs' : 'border-[#ffc474] bg-[#ffc474]/15 text-white shadow-xs')
                        : (themeConfig.isLight ? 'border-[#E8E1D5] bg-white text-[#4A3E36] hover:bg-[#FAF7F2]' : 'border-white/10 bg-[#161822] text-white/70 hover:bg-white/10')
                    }`}
                  >
                    <div className="truncate">
                      <div className={`font-bold truncate ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                        Floor03_Architectural.dxf
                      </div>
                      <div className={`text-[10px] ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
                        48.2 MB · 32 Lớp CAD
                      </div>
                    </div>
                    {selectedFile === 'Floor03_Architectural.dxf' && (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${themeConfig.accentText}`} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFile('OceanRes_L08_Final.dxf')}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedFile === 'OceanRes_L08_Final.dxf'
                        ? (themeConfig.isLight ? 'border-[#C25E3E] bg-[#C25E3E]/10 text-[#231B15] shadow-xs' : 'border-[#ffc474] bg-[#ffc474]/15 text-white shadow-xs')
                        : (themeConfig.isLight ? 'border-[#E8E1D5] bg-white text-[#4A3E36] hover:bg-[#FAF7F2]' : 'border-white/10 bg-[#161822] text-white/70 hover:bg-white/10')
                    }`}
                  >
                    <div className="truncate">
                      <div className={`font-bold truncate ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                        OceanRes_L08_Final.dxf
                      </div>
                      <div className={`text-[10px] ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
                        32.6 MB · 28 Lớp CAD
                      </div>
                    </div>
                    {selectedFile === 'OceanRes_L08_Final.dxf' && (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${themeConfig.accentText}`} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Feedback */}
          <div className={`p-3.5 rounded-xl font-mono text-xs space-y-1.5 border ${
            themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5]' : 'bg-[#161822] border-white/10'
          }`}>
            <div className="flex items-center justify-between text-[11px]">
              <span className={`font-bold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white/80'}`}>
                KIỂM ĐỊNH TRƯỚC KHI NẠP
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Sẵn sàng phân tích AI</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>PHIÊN BẢN:</span>
                <span className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>AC1032 (2024)</span>
              </div>
              <div>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>LỚP CAD:</span>
                <span className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>32 lớp phát hiện</span>
              </div>
              <div>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>THỰC THỂ:</span>
                <span className={`font-semibold ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>18,492 đã phân tích</span>
              </div>
              <div>
                <span className={`block ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'}`}>ĐA TUYẾN:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">4,821 khép kín</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
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
            onClick={() => onStartAnalysis(projectName, building, floor, selectedFile)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer text-white ${
              themeConfig.primaryBtn
            }`}
          >
            <span>Bắt đầu Phân tích AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

