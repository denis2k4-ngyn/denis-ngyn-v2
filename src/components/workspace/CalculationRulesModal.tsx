import React, { useState } from 'react';
import { X, Sliders, Check, RotateCcw } from 'lucide-react';
import { CalculationRules } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface CalculationRulesModalProps {
  isOpen: boolean;
  rules: CalculationRules;
  onClose: () => void;
  onSave: (newRules: CalculationRules) => void;
}

export const CalculationRulesModal: React.FC<CalculationRulesModalProps> = ({
  isOpen,
  rules,
  onClose,
  onSave,
}) => {
  const { themeConfig } = useTheme();
  const [formData, setFormData] = useState<CalculationRules>(rules);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              <Sliders className={`w-4 h-4 ${themeConfig.accentText}`} />
              Quy tắc Tính toán & Tái tính Dự toán Sơn
            </h2>
            <p className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
              Các tham số toàn cục xác định công thức bóc tách khối lượng
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={`font-bold block ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
                CHIỀU CAO THÔNG THỦY (m)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.defaultWallHeight}
                onChange={(e) =>
                  setFormData({ ...formData, defaultWallHeight: parseFloat(e.target.value) || 3.2 })
                }
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'border-[#E8E1D5] bg-[#FAF7F2] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'border-white/10 bg-white/5 text-white focus:border-sky-400'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`font-bold block ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>
                HỆ SỐ HAO HỤT VẬT TƯ (%)
              </label>
              <input
                type="number"
                value={formData.wasteFactorPct}
                onChange={(e) =>
                  setFormData({ ...formData, wasteFactorPct: parseInt(e.target.value) || 5 })
                }
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'border-[#E8E1D5] bg-[#FAF7F2] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'border-white/10 bg-white/5 text-white focus:border-sky-400'
                }`}
              />
            </div>
          </div>

          <div className={`pt-2 border-t space-y-3 ${themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'}`}>
            <span className={`font-bold block uppercase ${themeConfig.accentText}`}>
              Khấu trừ Hình học Không gian
            </span>

            <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
              themeConfig.isLight 
                ? 'border-[#E8E1D5] bg-[#FAF7F2] hover:border-[#C25E3E]' 
                : 'border-white/10 bg-[#161822] hover:border-white/20'
            }`}>
              <div>
                <span className={`font-semibold block font-sans ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                  Khấu trừ diện tích Cửa đi
                </span>
                <span className={`text-[11px] font-sans ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}`}>
                  Tự động trừ diện tích mở cửa đơn/đôi ra khỏi công thức (chu vi × chiều cao)
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.deductDoors}
                onChange={(e) => setFormData({ ...formData, deductDoors: e.target.checked })}
                className="w-4 h-4 rounded text-[#C25E3E] cursor-pointer"
              />
            </label>

            <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
              themeConfig.isLight 
                ? 'border-[#E8E1D5] bg-[#FAF7F2] hover:border-[#C25E3E]' 
                : 'border-white/10 bg-[#161822] hover:border-white/20'
            }`}>
              <div>
                <span className={`font-semibold block font-sans ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                  Khấu trừ diện tích Cửa sổ
                </span>
                <span className={`text-[11px] font-sans ${themeConfig.isLight ? 'text-[#796E64]' : 'text-white/50'}`}>
                  Trừ diện tích vách kính mặt dựng ra khỏi tổng diện tích tường thô
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.deductWindows}
                onChange={(e) => setFormData({ ...formData, deductWindows: e.target.checked })}
                className="w-4 h-4 rounded text-[#C25E3E] cursor-pointer"
              />
            </label>
          </div>

          <div className={`grid grid-cols-2 gap-4 pt-2 border-t ${themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'}`}>
            <div className="space-y-1">
              <label className={`font-bold block ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>SỐ LỚP SƠN LÓT</label>
              <input
                type="number"
                value={formData.primerCoats}
                onChange={(e) =>
                  setFormData({ ...formData, primerCoats: parseInt(e.target.value) || 1 })
                }
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'border-[#E8E1D5] bg-[#FAF7F2] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'border-white/10 bg-white/5 text-white focus:border-sky-400'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`font-bold block ${themeConfig.isLight ? 'text-[#4A3E36]' : 'text-white/70'}`}>SỐ LỚP SƠN PHỦ</label>
              <input
                type="number"
                value={formData.topCoats}
                onChange={(e) =>
                  setFormData({ ...formData, topCoats: parseInt(e.target.value) || 2 })
                }
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
                  themeConfig.isLight 
                    ? 'border-[#E8E1D5] bg-[#FAF7F2] text-[#231B15] focus:border-[#C25E3E]' 
                    : 'border-white/10 bg-white/5 text-white focus:border-sky-400'
                }`}
              />
            </div>
          </div>

          {/* Footer */}
          <div className={`pt-4 border-t flex items-center justify-between ${
            themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 transition-colors cursor-pointer ${
                themeConfig.isLight ? 'text-[#796E64] hover:text-[#231B15]' : 'text-white/60 hover:text-white'
              }`}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer ${
                themeConfig.primaryBtn
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Lưu & Tái tính toán</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

