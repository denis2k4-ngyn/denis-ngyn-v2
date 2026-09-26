import React from 'react';
import { X, History, User, Clock, CheckCircle2, FileText, Database } from 'lucide-react';
import { AuditEvent } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditTrail: AuditEvent[];
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  auditTrail,
}) => {
  const { themeConfig } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className={`rounded-2xl border shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
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
              <History className={`w-4 h-4 ${themeConfig.accentText}`} />
              Nhật ký Kiểm toán & Lịch sử Kỹ thuật Bất biến
            </h2>
            <p className={`text-xs font-mono ${themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/50'}`}>
              Nhật ký hành động được gắn dấu thời gian phục vụ thẩm định minh bạch
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

        {/* Timeline Body */}
        <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
          <div className={`relative pl-6 border-l-2 space-y-6 ${
            themeConfig.isLight ? 'border-[#E8E1D5]' : 'border-white/10'
          }`}>
            {auditTrail.map((ev) => (
              <div key={ev.id} className="relative group">
                {/* Node dot */}
                <div 
                  className={`absolute -left-[31px] top-0.5 w-3 h-3 rounded-full border-2 shadow-xs group-hover:scale-125 transition-transform ${
                    themeConfig.isLight 
                      ? 'bg-[#C25E3E] border-white' 
                      : 'bg-[#ffc474] border-[#12141a]'
                  }`} 
                />

                <div className={`flex items-center justify-between font-mono text-xs ${
                  themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
                }`}>
                  <span className={`font-bold text-xs ${themeConfig.isLight ? 'text-[#231B15]' : 'text-white'}`}>
                    {ev.action}
                  </span>
                  <span className={`flex items-center gap-1 text-[11px] ${
                    themeConfig.isLight ? 'text-[#8C827A]' : 'text-white/40'
                  }`}>
                    <Clock className={`w-3 h-3 ${themeConfig.accentText}`} />
                    {ev.timestamp}
                  </span>
                </div>

                <div className={`text-[11px] font-mono mt-0.5 ${themeConfig.accentText}`}>
                  Đối tượng: {ev.target} · Người thực hiện: {ev.user}
                </div>

                <p className={`text-xs mt-1 font-sans p-3 rounded-xl border ${
                  themeConfig.isLight 
                    ? 'bg-[#FAF7F2] text-[#4A3E36] border-[#E8E1D5]' 
                    : 'text-white/70 bg-white/5 border-white/10'
                }`}>
                  {ev.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-between text-xs font-mono ${
          themeConfig.isLight ? 'bg-[#FAF7F2] border-[#E8E1D5] text-[#8C827A]' : 'bg-[#161822] border-white/10 text-white/40'
        }`}>
          <span>Tổng số sự kiện ghi nhận: {auditTrail.length}</span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border ${
              themeConfig.isLight 
                ? 'bg-white hover:bg-[#FAF7F2] text-[#231B15] border-[#E8E1D5]' 
                : 'bg-white/10 text-white hover:bg-white/20 border-transparent'
            }`}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

