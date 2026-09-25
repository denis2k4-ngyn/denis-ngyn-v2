import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Minus, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  FileText, 
  Ruler, 
  HardHat, 
  Layers, 
  Calculator,
  CheckCircle2,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionKey: string;
    tab?: string;
  }[];
}

interface EngenixChatWidgetProps {
  onNavigateTab?: (tab: string) => void;
  onOpenRules?: () => void;
  onOpenExport?: () => void;
  onSwitchToWorkspace?: () => void;
  currentMode?: 'landing' | 'app';
}

const QUICK_PROMPTS = [
  { label: '📐 AI đọc bản vẽ CAD thế nào?', query: 'ai_cad' },
  { label: '⚡ Cách tính khối lượng sơn tường?', query: 'paint_calc' },
  { label: '🚪 Quy tắc trừ diện tích cửa đi & sổ?', query: 'door_deduction' },
  { label: '📊 Xuất dự toán sang Excel & BOQ?', query: 'export_excel' },
  { label: '🔍 Kiểm tra phòng cần đối soát?', query: 'review_check' },
];

export const EngenixChatWidget: React.FC<EngenixChatWidgetProps> = ({
  onNavigateTab,
  onOpenRules,
  onOpenExport,
  onSwitchToWorkspace,
  currentMode = 'landing',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [mascotImgSrc, setMascotImgSrc] = useState<string>('/nogbtech.png');
  const [mascotError, setMascotError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Check saved mascot image from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('ai_paint_mascot_img');
    if (saved && saved.startsWith('data:image')) {
      setMascotImgSrc(saved);
    }
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Xin chào! Tôi là **ENGENIX Assistant** 👷‍♂️ — Trợ lý AI chuyên trách bóc tách khối lượng và kiểm soát bản vẽ xây dựng.\n\nTôi có thể hỗ trợ bạn giải đáp quy chuẩn CAD, công thức tính diện tích sơn, trừ lỗ mở cửa hay hướng dẫn xuất hồ sơ dự toán.',
      timestamp: 'Vừa xong',
      quickActions: [
        { label: 'Xem phân tích CAD', actionKey: 'nav_cad', tab: 'drawing-review' },
        { label: 'Công thức tính sơn', actionKey: 'show_formula' },
        { label: 'Quy chuẩn trừ cửa', actionKey: 'show_doors' },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      if (!hasOpenedOnce) {
        setHasOpenedOnce(true);
        setUnreadCount(0);
      }
    }
  }, [messages, isOpen, isMinimized, hasOpenedOnce]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: 'Cuộc hội thoại đã được làm mới. Bạn cần hỗ trợ gì về dự án hoặc bản vẽ kỹ thuật hôm nay?',
        timestamp: 'Vừa xong',
        quickActions: [
          { label: 'Bóc tách bản vẽ DWG', actionKey: 'nav_cad', tab: 'drawing-review' },
          { label: 'Xem bảng khối lượng BOQ', actionKey: 'nav_estimate', tab: 'estimate' },
        ],
      },
    ]);
  };

  // Automated intelligent domain responder
  const generateBotReply = (query: string): { text: string; actions?: ChatMessage['quickActions'] } => {
    const q = query.toLowerCase();

    if (q.includes('ai_cad') || q.includes('đọc bản vẽ') || q.includes('dwg') || q.includes('dxf') || q.includes('cad')) {
      return {
        text: '⚡ **Quy trình AI xử lý bản vẽ CAD:**\n1. **Phân tích Layer gốc**: Tách lớp tường (`WALL`), cột (`COLUMN`), cửa (`DOOR`).\n2. **Khép kín Topology**: Tự động vá các khe hở vi mô (<5mm) giữa các đoạn LWPOLYLINE.\n3. **Nhận diện không gian**: Tạo đa giác phòng kín và gán mã định danh (Room Tag) tự động.\n4. **Độ chính xác**: Đạt trên 95% theo chuẩn kiểm định hình học CAD vector.',
        actions: [
          { label: 'Mở Không gian Bản vẽ', actionKey: 'nav_cad', tab: 'drawing-review' },
          { label: 'Tải bản vẽ mới', actionKey: 'nav_create', tab: 'create-project' },
        ],
      };
    }

    if (q.includes('paint_calc') || q.includes('công thức') || q.includes('tính sơn') || q.includes('khối lượng')) {
      return {
        text: '📐 **Công thức tính Khối lượng Sơn Tường chuẩn Engenix:**\n\n`Diện tích sơn = (Chu vi tường × Chiều cao thông thủy) - Diện tích trừ lỗ mở (Cửa đi + Cửa sổ) + Hao hụt vật tư`\n\n• **Chiều cao mặc định**: 3.20m (từ sàn đến mép dầm/trần).\n• **Tỷ lệ hao hụt thi công**: Mặc định 5.0% (có thể tùy chỉnh theo vật tư dulux/jotun/kova).\n• **Quy trình hoàn thiện**: 1 lớp lót kháng kiềm + 2 lớp phủ màu.',
        actions: [
          { label: 'Xem Bảng Dự toán', actionKey: 'nav_estimate', tab: 'estimate' },
          { label: 'Tùy chỉnh Quy tắc', actionKey: 'open_rules' },
        ],
      };
    }

    if (q.includes('door_deduction') || q.includes('cửa') || q.includes('lỗ mở') || q.includes('trừ')) {
      return {
        text: '🚪 **Quy tắc khấu trừ lỗ mở tiêu chuẩn:**\n\n• **Cửa đi (D1-D3)**: Khấu trừ chuẩn kích thước thông thủy (ví dụ D1: 900×2100mm = 1.89 m²).\n• **Cửa sổ (W1-W4)**: Khấu trừ theo ranh giới khung cửa trong bản vẽ kiến trúc.\n• **Hệ số cạnh hộc cửa**: Tự động bù 10% diện tích cạnh lồi/hõm nếu bật tùy chọn hoàn thiện nẹp góc.',
        actions: [
          { label: 'Chỉnh Quy chuẩn Cửa', actionKey: 'open_rules' },
          { label: 'Kiểm tra trên Canvas CAD', actionKey: 'nav_cad', tab: 'drawing-review' },
        ],
      };
    }

    if (q.includes('export_excel') || q.includes('xuất') || q.includes('excel') || q.includes('boq') || q.includes('pdf')) {
      return {
        text: '📊 **Hồ sơ xuất dự toán Engenix hỗ trợ:**\n\n1. **Excel (.xlsx)**: Đầy đủ công thức động (SUM/ROUND), bảng phân tích vật tư và nhân công.\n2. **Báo cáo BOQ chi tiết**: Bóc tách theo từng tầng, từng phòng và phân vùng thi công.\n3. **Kiểm tra nguồn gốc**: Mỗi dòng khối lượng đều kèm mã Entity Handle trong file CAD gốc để đối soát.',
        actions: [
          { label: 'Mở Hộp thoại Xuất hồ sơ', actionKey: 'open_export' },
          { label: 'Xem Bảng Khối lượng', actionKey: 'nav_estimate', tab: 'estimate' },
        ],
      };
    }

    if (q.includes('review_check') || q.includes('đối soát') || q.includes('lỗi') || q.includes('chờ duyệt') || q.includes('cảnh báo')) {
      return {
        text: '🔍 **Trung tâm Kiểm toán & Đối soát AI:**\n\nCác phòng có hình học phức tạp, lỗ hổng tường hoặc thiếu layer cửa sẽ được đưa vào hàng đợi kiểm tra (**Review Queue**).\n\nBạn có thể: dùng công cụ sửa hình học (Geometry Editor), vá nhanh đa giác hoặc xác nhận thủ công chỉ với 1 click.',
        actions: [
          { label: 'Xem Hàng đợi Cần duyệt', actionKey: 'nav_review', tab: 'review-queue' },
          { label: 'Kiểm tra hình học phòng', actionKey: 'nav_cad', tab: 'drawing-review' },
        ],
      };
    }

    // Default friendly assistant response
    return {
      text: `Tôi đã ghi nhận yêu cầu: "${query}".\n\nLà trợ lý chuyên sâu cho kỹ sư dự toán và bóc tách CAD, tôi có thể giúp bạn kiểm tra kích thước phòng, tính khối lượng sơn hoàn thiện, thiết lập chiều cao thông thủy và xuất hồ sơ báo giá chính xác.`,
      actions: [
        { label: 'Bóc tách bản vẽ CAD', actionKey: 'nav_cad', tab: 'drawing-review' },
        { label: 'Xem Bảng Dự toán', actionKey: 'nav_estimate', tab: 'estimate' },
        { label: 'Quy tắc tính toán', actionKey: 'open_rules' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart assistant calculation / reply latency
    setTimeout(() => {
      const replyData = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        quickActions: replyData.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (actionKey: string, tab?: string) => {
    if (tab && onNavigateTab) {
      if (currentMode === 'landing' && onSwitchToWorkspace) {
        onSwitchToWorkspace();
      }
      onNavigateTab(tab);
    } else if (actionKey === 'open_rules' && onOpenRules) {
      if (currentMode === 'landing' && onSwitchToWorkspace) {
        onSwitchToWorkspace();
      }
      onOpenRules();
    } else if (actionKey === 'open_export' && onOpenExport) {
      if (currentMode === 'landing' && onSwitchToWorkspace) {
        onSwitchToWorkspace();
      }
      onOpenExport();
    } else if (actionKey === 'show_formula') {
      handleSendMessage('Cách tính khối lượng sơn tường?');
    } else if (actionKey === 'show_doors') {
      handleSendMessage('Quy tắc trừ diện tích cửa đi & sổ?');
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          FLOATING LAUNCHER BUTTON (Bottom-Right)
          With 3D Chibi Engineer Avatar & Online Pulse
      ───────────────────────────────────────────────────────────── */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end gap-3 select-none">
          {/* Subtle invitation badge if user hasn't opened yet */}
          {!hasOpenedOnce && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              onClick={handleOpen}
              className="hidden sm:flex items-center gap-2 bg-[#0c1424]/95 border border-sky-400/40 text-white text-xs px-3.5 py-2 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer hover:border-sky-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-sky-300 font-medium font-sans">Trợ lý Engenix trực tuyến!</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleOpen}
            aria-label="Mở Trợ lý ENGENIX"
            className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0a1222] via-[#0f1d38] to-[#1e3a6a] p-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.7)] border border-sky-400/50 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer transition-all duration-300"
          >
            {/* Ambient Aura */}
            <div className="absolute inset-0 rounded-full bg-sky-500/20 group-hover:bg-sky-400/30 blur-md transition-all -z-10" />

            {/* Circular Avatar Clip */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#070d18] relative flex items-center justify-center">
              {!mascotError ? (
                <img 
                  src={mascotImgSrc} 
                  alt="ENGENIX Assistant Chibi Avatar" 
                  onError={() => setMascotError(true)}
                  className="w-full h-full object-cover object-top scale-135 translate-y-1 transition-transform group-hover:scale-145"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-sky-400">
                  <HardHat className="w-7 h-7 text-amber-400" />
                </div>
              )}
            </div>

            {/* Glowing Active Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a1222] shadow-[0_0_8px_rgba(16,185,129,0.9)] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>

            {/* Unread count badge if any */}
            {unreadCount > 0 && !hasOpenedOnce && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white font-mono font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg border border-white/20 animate-bounce">
                1
              </span>
            )}
          </motion.button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MINIMIZED DOCK BAR (When user minimizes the window)
      ───────────────────────────────────────────────────────────── */}
      {isOpen && isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 bg-[#0a1222]/95 border border-sky-400/40 rounded-full pl-2 pr-4 py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl cursor-pointer hover:border-sky-300 transition-colors"
          onClick={handleRestore}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[#070d18] border border-sky-400/60 relative">
            <img 
              src={mascotImgSrc} 
              alt="Mascot Avatar" 
              className="w-full h-full object-cover object-top scale-135 translate-y-0.5" 
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">ENGENIX Assistant</span>
            <span className="text-[10px] text-emerald-400 font-mono">● Đang thu nhỏ · Nhấp để mở</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="ml-2 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10"
            title="Đóng chat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          EXPANDED CHAT CONSOLE WINDOW
          Matches the uploaded screenshot design aesthetic
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[560px] max-h-[86vh] flex flex-col bg-[#090f1d]/98 border border-sky-500/30 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden font-sans"
          >
            {/* ── Top Header ── */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#0d172c] via-[#0f1d38] to-[#0d172c] border-b border-sky-500/20 select-none">
              <div className="flex items-center gap-3">
                {/* Circular Chibi Avatar with Online Indicator */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#070d18] ring-2 ring-sky-400/40 shadow-sm flex items-center justify-center">
                    {!mascotError ? (
                      <img 
                        src={mascotImgSrc} 
                        alt="ENGENIX Assistant" 
                        onError={() => setMascotError(true)}
                        className="w-full h-full object-cover object-top scale-135 translate-y-0.5"
                      />
                    ) : (
                      <HardHat className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d172c] shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
                </div>

                {/* Assistant Info */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-wide">ENGENIX Assistant</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20">AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Trực tuyến · Hỗ trợ CAD 24/7</span>
                  </div>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1 text-white/60">
                <button
                  onClick={handleResetChat}
                  title="Làm mới hội thoại"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleMinimize}
                  title="Thu nhỏ"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  title="Đóng chat"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Chat Messages Scroll Body ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-sky-500/20 scrollbar-track-transparent">
              {/* Domain banner notice */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50 font-mono">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Được tối ưu cho bóc tách sơn & kiểm toán DWG/DXF
                </span>
              </div>

              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {/* Bot Avatar Icon in Thread */}
                    {isBot && (
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-[#0a1424] border border-sky-400/40 shrink-0 mt-0.5">
                        <img 
                          src={mascotImgSrc} 
                          alt="Bot" 
                          className="w-full h-full object-cover object-top scale-135" 
                        />
                      </div>
                    )}

                    {/* Bubble Container */}
                    <div className={`space-y-2 max-w-[85%] ${isBot ? 'text-left' : 'text-right'}`}>
                      <div
                        className={`p-3 sm:p-3.5 rounded-2xl ${
                          isBot
                            ? 'bg-[#131d33] border border-sky-500/20 text-slate-100 rounded-tl-xs shadow-sm font-sans'
                            : 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-xs shadow-md font-sans'
                        }`}
                      >
                        {/* Message text with bold markdown rendering */}
                        <div className="whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px]">
                          {msg.text.split('\n').map((line, idx) => (
                            <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                              {line.split(/(\*\*.*?\*\*|`.*?`)/g).map((chunk, cIdx) => {
                                if (chunk.startsWith('**') && chunk.endsWith('**')) {
                                  return (
                                    <strong key={cIdx} className="font-bold text-sky-300">
                                      {chunk.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                if (chunk.startsWith('`') && chunk.endsWith('`')) {
                                  return (
                                    <code key={cIdx} className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-sky-200 text-[11px] border border-sky-400/20">
                                      {chunk.slice(1, -1)}
                                    </code>
                                  );
                                }
                                return chunk;
                              })}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Quick Interactive Actions inside Bot Message */}
                      {isBot && msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.quickActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(action.actionKey, action.tab)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 hover:text-white text-[11px] font-medium transition-all cursor-pointer active:scale-95"
                            >
                              <span>{action.label}</span>
                              <ChevronRight className="w-3 h-3 text-sky-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="text-[10px] text-white/35 font-mono px-1">
                        {msg.timestamp}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-xs font-mono pl-9">
                  <div className="flex gap-1 py-1.5 px-3 rounded-xl bg-[#131d33] border border-sky-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Kỹ sư AI đang soạn câu trả lời...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Quick Questions ── */}
            <div className="px-3 py-2 bg-[#080d1a] border-t border-white/5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {QUICK_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt.label.replace(/^[^\s]+\s/, ''))}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/15 border border-white/10 hover:border-sky-400/40 text-[11px] text-white/70 hover:text-sky-200 transition-colors cursor-pointer shrink-0"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* ── Input Bar Footer ── */}
            <div className="p-3 bg-[#0a101f] border-t border-sky-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Hỏi về bản vẽ, khối lượng hoặc kỹ thuật..."
                    className="w-full bg-[#121a2e] border border-white/10 focus:border-sky-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Gửi tin nhắn"
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 hover:brightness-110 active:scale-95'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
