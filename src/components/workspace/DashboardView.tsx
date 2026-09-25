import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Folder,
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ArrowUp,
  UploadCloud, 
  Sliders, 
  Cpu, 
  BarChart3, 
  Search, 
  LayoutGrid, 
  List, 
  MoreHorizontal, 
  Lightbulb, 
  Database,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Building,
  RotateCcw,
  Sparkles,
  Compass,
  FileCode
} from 'lucide-react';
import { ProjectInfo } from '../../types';
import { useWorkspaceTheme } from '../../data/ThemeContext';

interface DashboardViewProps {
  projects: ProjectInfo[];
  onSelectProject: (proj: ProjectInfo) => void;
  onCreateProject: () => void;
  onOpenDrawingReview: (proj: ProjectInfo) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// MINI TABLE CAD THUMBNAIL
// ─────────────────────────────────────────────────────────────────────────────
const CadThumbnail: React.FC<{ index: number }> = ({ index }) => {
  const { themeConfig } = useWorkspaceTheme();
  const wallStroke = themeConfig.cadOuterWall;

  return (
    <div className={`w-12 h-9 rounded-lg bg-[#080d18] border ${themeConfig.accentBorder} p-1 flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-sky-400/50 transition-colors`}>
      <svg viewBox="0 0 52 40" className="w-full h-full fill-none" stroke={wallStroke} strokeWidth="1">
        {index % 3 === 0 && (
          <>
            <rect x="3" y="3" width="46" height="34" stroke={wallStroke} strokeWidth="1.2" />
            <line x1="3" y1="16" x2="49" y2="16" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="20" y1="3" x2="20" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="36" y1="16" x2="36" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <rect x="7" y="6" width="9" height="7" stroke={wallStroke} strokeWidth="0.6" strokeDasharray="1,1" />
            <rect x="24" y="20" width="8" height="6" stroke={wallStroke} strokeWidth="0.6" />
            <path d="M 20 12 A 4 4 0 0 1 24 16" stroke={wallStroke} strokeWidth="0.6" />
          </>
        )}
        {index % 3 === 1 && (
          <>
            <rect x="3" y="3" width="46" height="34" stroke={wallStroke} strokeWidth="1.2" />
            <line x1="26" y1="3" x2="26" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="3" y1="20" x2="26" y2="20" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="26" y1="24" x2="49" y2="24" stroke={wallStroke} strokeWidth="0.8" />
            <circle cx="14" cy="11" r="3" stroke={wallStroke} strokeWidth="0.6" />
            <path d="M 26 14 A 4 4 0 0 1 30 18" stroke={wallStroke} strokeWidth="0.6" />
            <rect x="30" y="7" width="14" height="12" stroke={wallStroke} strokeWidth="0.6" strokeDasharray="1.5,1.5" />
          </>
        )}
        {index % 3 === 2 && (
          <>
            <polygon points="3,10 26,3 49,10 49,37 3,37" stroke={wallStroke} strokeWidth="1" />
            <line x1="3" y1="22" x2="49" y2="22" stroke={wallStroke} strokeWidth="0.8" />
            <line x1="26" y1="10" x2="26" y2="37" stroke={wallStroke} strokeWidth="0.8" />
            <rect x="8" y="26" width="10" height="7" stroke={wallStroke} strokeWidth="0.6" />
            <rect x="32" y="26" width="10" height="7" stroke={wallStroke} strokeWidth="0.6" />
          </>
        )}
      </svg>
      <div 
        className="absolute top-1 right-1 w-1 h-1 rounded-full animate-pulse"
        style={{ backgroundColor: wallStroke }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPANDED CAD BLUEPRINT CARD BANNER (FOR GRID VIEW CARDS)
// ─────────────────────────────────────────────────────────────────────────────
const CadCardBanner: React.FC<{ index: number; status: ProjectInfo['status']; progress: number }> = ({ 
  index, 
  status,
  progress 
}) => {
  const { themeConfig } = useWorkspaceTheme();
  const strokeColor = status === 'Review Required' 
    ? '#f87171' 
    : status === 'Completed' || status === 'Approved' 
      ? '#38bdf8' 
      : '#0ea5e9';

  return (
    <div className="relative w-full h-32 bg-[#060b14] overflow-hidden rounded-t-2xl border-b border-white/10 group-hover:border-sky-500/30 transition-colors">
      {/* Blueprint Grid Lines Background */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Blueprint Vector Graphic */}
      <svg 
        viewBox="0 0 300 128" 
        className="absolute inset-0 w-full h-full fill-none pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dimension ticks */}
        <g stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.4">
          <line x1="20" y1="14" x2="280" y2="14" />
          <line x1="20" y1="10" x2="20" y2="18" />
          <line x1="140" y1="10" x2="140" y2="18" />
          <line x1="280" y1="10" x2="280" y2="18" />
          <text x="75" y="11" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">14.50 m</text>
          <text x="205" y="11" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">12.80 m</text>
        </g>

        {index % 3 === 0 && (
          <g transform="translate(20, 22)">
            {/* Outer Walls */}
            <rect x="0" y="0" width="260" height="92" stroke={strokeColor} strokeWidth="1.8" opacity="0.85" />
            <rect x="2" y="2" width="256" height="88" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.3" />
            
            {/* Interior partitions */}
            <line x1="0" y1="46" x2="260" y2="46" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="90" y1="0" x2="90" y2="92" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="180" y1="46" x2="180" y2="92" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            
            {/* Door swing arcs */}
            <path d="M 90 28 A 14 14 0 0 1 104 42" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
            <path d="M 180 62 A 12 12 0 0 1 192 74" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
            
            {/* Room identification labels */}
            <text x="35" y="26" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">P. KHÁCH</text>
            <text x="35" y="36" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">38.5 m²</text>

            <text x="125" y="26" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">P. NGỦ MASTER</text>
            <text x="125" y="36" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">24.2 m²</text>

            <text x="35" y="70" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">KHÔNG GIAN BẾP</text>
            <text x="35" y="80" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">18.0 m²</text>

            <text x="210" y="70" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">WC / TẮM</text>
            <text x="210" y="80" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">6.8 m²</text>
          </g>
        )}

        {index % 3 === 1 && (
          <g transform="translate(20, 22)">
            {/* Duplex / Office Suite layout */}
            <polygon points="0,0 260,0 260,92 80,92 80,60 0,60" stroke={strokeColor} strokeWidth="1.8" opacity="0.85" />
            <line x1="120" y1="0" x2="120" y2="60" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="190" y1="0" x2="190" y2="92" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            
            {/* Stairwell hatch */}
            <g stroke="#38bdf8" strokeWidth="0.6" opacity="0.4">
              <line x1="130" y1="10" x2="180" y2="10" />
              <line x1="130" y1="16" x2="180" y2="16" />
              <line x1="130" y1="22" x2="180" y2="22" />
              <line x1="130" y1="28" x2="180" y2="28" />
              <line x1="130" y1="34" x2="180" y2="34" />
            </g>

            <text x="40" y="32" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">VĂN PHÒNG MỞ</text>
            <text x="40" y="42" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">54.0 m²</text>

            <text x="215" y="48" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">HỘI NGHỊ</text>
            <text x="215" y="58" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">22.4 m²</text>
          </g>
        )}

        {index % 3 === 2 && (
          <g transform="translate(20, 22)">
            {/* Penthouse / Villa complex layout */}
            <rect x="0" y="10" width="260" height="82" stroke={strokeColor} strokeWidth="1.8" opacity="0.85" />
            <line x1="75" y1="10" x2="75" y2="92" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="185" y1="10" x2="185" y2="92" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
            <circle cx="130" cy="50" r="18" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2,2" opacity="0.5" />
            
            <text x="25" y="48" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">SUITE TÂY</text>
            <text x="25" y="58" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">31.0 m²</text>

            <text x="110" y="48" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">SANH CHÍNH</text>
            <text x="115" y="58" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">42.8 m²</text>

            <text x="210" y="48" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="600" opacity="0.75">SUITE ĐÔNG</text>
            <text x="210" y="58" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.7">33.5 m²</text>
          </g>
        )}
      </svg>

      {/* Top Left Tag: Drawing format badge */}
      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#080d18]/90 border border-white/10 text-[9px] font-mono text-white/70 backdrop-blur-md flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <span>VECTOR CAD · DWG</span>
      </div>

      {/* Top Right Status Badge */}
      <div className="absolute top-2.5 right-2.5">
        {status === 'Completed' || status === 'Approved' ? (
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-medium text-emerald-300 flex items-center gap-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Đã hoàn thành
          </span>
        ) : status === 'Review Required' ? (
          <span className="px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-500/40 text-[10px] font-mono font-medium text-rose-300 flex items-center gap-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Cần kiểm tra
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-500/40 text-[10px] font-mono font-medium text-sky-300 flex items-center gap-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Đang xử lý {progress}%
          </span>
        )}
      </div>

      {/* Subtle Scanline Animation */}
      <div 
        className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent pointer-events-none animate-pulse"
        style={{ left: `${(progress * 2.6) % 260}px` }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onOpenDrawingReview,
}) => {
  const { themeConfig } = useWorkspaceTheme();
  const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'completed' | 'review'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'progress'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  
  // Responsive Items Per Page: 6 for Grid (perfect for 1, 2, 3 cols), 5 for List
  const itemsPerPage = viewMode === 'grid' ? 6 : 5;

  // Real Metric Counts
  const totalCount = projects.length;
  const completedCount = projects.filter(p => p.status === 'Completed' || p.status === 'Approved').length;
  const processingCount = projects.filter(p => p.status === 'Processing' || p.status === 'Draft').length;
  const reviewCount = projects.filter(p => p.status === 'Review Required').length;

  // Filtered list
  const filteredProjects = useMemo(() => {
    let list = projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.name.toLowerCase().includes(q) ||
        p.fileName.toLowerCase().includes(q) ||
        p.building.toLowerCase().includes(q) ||
        p.engineer.toLowerCase().includes(q);
      
      if (!matchesSearch) return false;

      if (activeFilter === 'completed') {
        return p.status === 'Completed' || p.status === 'Approved';
      }
      if (activeFilter === 'processing') {
        return p.status === 'Processing' || p.status === 'Draft';
      }
      if (activeFilter === 'review') {
        return p.status === 'Review Required';
      }
      return true;
    });

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'progress') {
      list = [...list].sort((a, b) => (b.progressPct || 0) - (a.progressPct || 0));
    }
    return list;
  }, [projects, searchQuery, activeFilter, sortBy]);

  // Paginated list
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));

  const handleToggleSelectAll = () => {
    if (selectedProjectIds.length === paginatedProjects.length) {
      setSelectedProjectIds([]);
    } else {
      setSelectedProjectIds(paginatedProjects.map(p => p.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedProjectIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setCurrentPage(1);
  };

  const gridColor = themeConfig.gridStroke;

  return (
    <div 
      className="min-h-full p-4 sm:p-6 lg:p-8 space-y-7 text-white font-sans selection:bg-sky-500 selection:text-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        backgroundColor: '#080d18'
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PROFESSIONAL CONSTRUCTION MANAGEMENT CONSOLE HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1 border-b border-white/5">
        <div>
          {/* Technical Kicker / System Telemetry */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400 font-semibold tracking-wider uppercase mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HỆ THỐNG QUẢN LÝ DỰ ÁN & BÓC TÁCH KHỐI LƯỢNG CAD</span>
            <span className="text-white/30">|</span>
            <span className="text-white/50 lowercase">v2.4.1 online</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Không gian làm việc Kỹ sư</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300">
              Phát Đức (Lead QS)
            </span>
          </h1>
          <p className="text-sm text-white/60 mt-1 font-sans">
            Theo dõi tiến độ bóc tách diện tích tường, cửa, trần và dự toán định mức sơn công trình.
          </p>
        </div>

        {/* Quick Console Stats / System Clock */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col text-right pr-4 border-r border-white/10">
            <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Trạng thái công cụ</span>
            <span className="text-xs font-mono font-semibold text-emerald-400">AI CAD Engine 98.4% Acc.</span>
          </div>

          <button
            onClick={onCreateProject}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${themeConfig.primaryBtn} hover:brightness-110 active:scale-98 text-xs sm:text-sm font-extrabold text-white shadow-[0_4px_16px_rgba(14,165,233,0.35)] transition-all cursor-pointer`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tạo dự án mới</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. METRICS CARDS ROW (4 REFINED STATS + 1 BIG CTA ACTION)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Metric 1: Tổng số dự án */}
        <div className="p-4 rounded-2xl bg-[#0c1424] border border-white/10 flex flex-col justify-between hover:border-sky-500/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">TỔNG SỐ DỰ ÁN</span>
            <div className={`w-8 h-8 rounded-lg ${themeConfig.badgeBg} ${themeConfig.accentText} flex items-center justify-center border ${themeConfig.accentBorder}`}>
              <Folder className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono tabular-nums">
              {totalCount}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 mt-1 font-mono">
              <ArrowUp className="w-3 h-3" />
              <span>+2 bản vẽ tháng này</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Đã hoàn thành */}
        <div className="p-4 rounded-2xl bg-[#0c1424] border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">ĐÃ HOÀN TẤT</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono tabular-nums">
              {completedCount}
            </div>
            <div className="text-[11px] text-white/50 mt-1 font-mono">
              Tỷ lệ hoàn thành: {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Metric 3: Đang xử lý */}
        <div className="p-4 rounded-2xl bg-[#0c1424] border border-white/10 flex flex-col justify-between hover:border-sky-500/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">ĐANG XỬ LÝ</span>
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono tabular-nums">
              {processingCount}
            </div>
            <div className="text-[11px] text-sky-400/80 mt-1 font-mono">
              Đang phân tích vector CAD
            </div>
          </div>
        </div>

        {/* Metric 4: Cần kiểm tra */}
        <div className="p-4 rounded-2xl bg-[#0c1424] border border-white/10 flex flex-col justify-between hover:border-rose-500/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">CẦN KIỂM TRA</span>
            <div className="w-8 h-8 rounded-lg bg-rose-950/60 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-white font-mono tabular-nums">
              {reviewCount}
            </div>
            <div className="text-[11px] text-rose-400/80 mt-1 font-mono">
              Cần xác nhận đường bao
            </div>
          </div>
        </div>

        {/* Metric 5: Action CTA Box */}
        <div
          onClick={onCreateProject}
          className={`p-4 rounded-2xl ${themeConfig.primaryBtn} hover:brightness-110 active:scale-98 flex flex-col justify-between shadow-lg transition-all cursor-pointer group`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/80 font-bold">KHỞI TẠO NHANH</span>
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white group-hover:rotate-90 transition-transform">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-extrabold text-base leading-tight text-white flex items-center justify-between">
              <span>Tải bản vẽ CAD</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-[11px] text-white/80 mt-1 font-medium leading-tight">
              Hỗ trợ PDF, DWG, DXF đa tầng
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. QUY TRÌNH 4 BƯỚC BÓC TÁCH (ENGINEERING PIPELINE)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold flex items-center gap-2">
            <span>QUY TRÌNH BÓC TÁCH KHỐI LƯỢNG CHUẨN</span>
            <span className="h-px w-12 bg-white/10" />
          </h2>
          <span className="text-[11px] text-white/40 font-mono">4 Bước tự động hóa</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div 
            onClick={onCreateProject}
            className="p-3.5 rounded-xl bg-[#0c1424] border border-white/10 hover:border-sky-500/40 transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm"
          >
            <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono font-bold text-xs flex items-center justify-center shrink-0 group-hover:text-sky-400 group-hover:border-sky-500/30">
              01
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                Tải lên bản vẽ
              </div>
              <div className="text-[11px] text-white/45 truncate font-mono">
                DWG, DXF hoặc PDF
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={onCreateProject}
            className="p-3.5 rounded-xl bg-[#0c1424] border border-white/10 hover:border-sky-500/40 transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm"
          >
            <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono font-bold text-xs flex items-center justify-center shrink-0 group-hover:text-sky-400 group-hover:border-sky-500/30">
              02
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                Thiết lập thông số
              </div>
              <div className="text-[11px] text-white/45 truncate font-mono">
                Tầng, định mức, cao độ tường
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => projects.length > 0 && onSelectProject(projects[0])}
            className="p-3.5 rounded-xl bg-[#0c1424] border border-white/10 hover:border-sky-500/40 transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm"
          >
            <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono font-bold text-xs flex items-center justify-center shrink-0 group-hover:text-sky-400 group-hover:border-sky-500/30">
              03
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                AI bóc tách tự động
              </div>
              <div className="text-[11px] text-white/45 truncate font-mono">
                Quét phòng, trừ cửa sổ & cửa đi
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => projects.length > 0 && onOpenDrawingReview(projects[0])}
            className="p-3.5 rounded-xl bg-[#0c1424] border border-white/10 hover:border-sky-500/40 transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm"
          >
            <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono font-bold text-xs flex items-center justify-center shrink-0 group-hover:text-sky-400 group-hover:border-sky-500/30">
              04
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                Kiểm định & Xuất Excel
              </div>
              <div className="text-[11px] text-white/45 truncate font-mono">
                Bảng BOQ sơn sẵn sàng duyệt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MAIN PROJECT CONSOLE (RESPONSIVE GRID & TABLE)
      ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#0c1424] border border-white/10 p-4 sm:p-5 space-y-4 shadow-xl">
        
        {/* Header: Title + Filters + Search + View Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-white/10">
          
          {/* Left: Section Title + Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2 mr-2">
              <Building className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                DANH MỤC DỰ ÁN
              </h2>
            </div>

            <button
              onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Tất cả ({totalCount})
            </button>

            <button
              onClick={() => { setActiveFilter('processing'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeFilter === 'processing'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Đang xử lý ({processingCount})
            </button>

            <button
              onClick={() => { setActiveFilter('completed'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeFilter === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Hoàn thành ({completedCount})
            </button>

            <button
              onClick={() => { setActiveFilter('review'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeFilter === 'review'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40 shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
              }`}
            >
              Cần kiểm tra ({reviewCount})
            </button>
          </div>

          {/* Right Controls: Sort + View Toggle + Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-white/60 bg-[#080d18] border border-white/10 rounded-xl px-2.5 py-1.5">
              <span className="text-[11px] font-mono text-white/40">Sắp xếp:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sky-300 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="recent" className="bg-[#0c1424] text-white">Mới cập nhật</option>
                <option value="name" className="bg-[#0c1424] text-white">Tên công trình</option>
                <option value="progress" className="bg-[#0c1424] text-white">Tiến độ %</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs List */}
            <div className="flex items-center bg-[#080d18] border border-white/10 rounded-xl p-0.5">
              <button
                onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                  viewMode === 'grid' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-white/40 hover:text-white'
                }`}
                title="Dạng lưới thẻ (Grid Console)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Lưới</span>
              </button>
              <button
                onClick={() => { setViewMode('list'); setCurrentPage(1); }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                  viewMode === 'list' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-white/40 hover:text-white'
                }`}
                title="Dạng bảng (List Table)"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Bảng</span>
              </button>
            </div>

            {/* Filter Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên, file, tòa nhà..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-40 sm:w-48 bg-[#080d18] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-400 transition-colors font-sans"
              />
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            PROJECTS CONTENT: GRID CARDS OR LIST TABLE OR EMPTY STATE
        ───────────────────────────────────────────────────────────── */}

        {/* CASE 1: EMPTY STATE - NO PROJECTS OR FILTER MISMATCH */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 px-4 text-center rounded-xl bg-[#080d18]/60 border border-dashed border-white/10 flex flex-col items-center justify-center">
            {totalCount === 0 ? (
              // Scenario A: Completely empty project repository
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mx-auto shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                  <Compass className="w-8 h-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Chưa có dự án nào trong không gian làm việc
                  </h3>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    Tải lên bản vẽ mặt bằng kiến trúc đầu tiên (định dạng PDF, DWG hoặc DXF). Hệ thống AI sẽ tự động phân tách đường bao và bóc tách diện tích sơn.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onCreateProject}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${themeConfig.primaryBtn} text-xs font-bold text-white shadow-lg cursor-pointer hover:brightness-110`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tải bản vẽ CAD đầu tiên</span>
                  </button>
                </div>
              </div>
            ) : (
              // Scenario B: Search query or filter yielded 0 matches
              <div className="max-w-md mx-auto space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Không tìm thấy dự án phù hợp
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Không có kết quả nào khớp với bộ lọc <span className="text-sky-300 font-mono">"{searchQuery || activeFilter}"</span>. Hãy thử tìm kiếm bằng từ khóa khác hoặc thiết lập lại.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white font-medium cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                    <span>Xóa bộ lọc tìm kiếm</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          
          /* ─────────────────────────────────────────────────────────
             CASE 2: RESPONSIVE GRID LAYOUT (1 col mobile, 2 tablet, 3 desktop)
          ───────────────────────────────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProjects.map((proj, idx) => {
              const isCompleted = proj.status === 'Completed' || proj.status === 'Approved';
              const isProcessing = proj.status === 'Processing' || proj.status === 'Draft';
              const isReview = proj.status === 'Review Required';
              const progress = proj.progressPct || (isCompleted ? 100 : isProcessing ? 65 : 80);

              return (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#080d18] border border-white/10 hover:border-sky-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all flex flex-col justify-between group overflow-hidden"
                >
                  {/* Card Top: CAD Blueprint Banner */}
                  <CadCardBanner 
                    index={idx} 
                    status={proj.status} 
                    progress={progress} 
                  />

                  {/* Card Body */}
                  <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Project Title + Building Subtitle */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 
                            onClick={() => onSelectProject(proj)}
                            className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors cursor-pointer line-clamp-1"
                            title={proj.name}
                          >
                            {proj.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-white/50">
                            <span className="text-sky-400">{proj.building}</span>
                            <span>·</span>
                            <span className="truncate max-w-[140px]" title={proj.fileName}>{proj.fileName}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectProject(proj)}
                          className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                          title="Tùy chọn khác"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Technical Specs Metric Matrix */}
                      <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-[#0c1424] border border-white/5 font-mono">
                        <div>
                          <div className="text-[10px] uppercase text-white/40">Diện tích sơn</div>
                          <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                            {proj.totalArea ? `${proj.totalArea.toLocaleString('vi-VN')} m²` : 'Đang tính...'}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase text-white/40">Quy mô tầng</div>
                          <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                            {proj.floorsCount} tầng ({proj.drawingsCount || 4} bản vẽ)
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase text-white/40">Dự toán sơ bộ</div>
                          <div className="text-xs font-bold text-emerald-400 mt-0.5 tabular-nums">
                            {proj.totalCost ? `${(proj.totalCost / 1_000_000).toFixed(1)}M VNĐ` : '--'}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase text-white/40">Độ tin cậy AI</div>
                          <div className="text-xs font-bold text-sky-400 mt-0.5 tabular-nums flex items-center gap-1">
                            <span>{proj.avgConfidence}%</span>
                            {proj.issuesCount > 0 && (
                              <span className="text-[10px] text-rose-400">({proj.issuesCount} lỗi)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Milestone */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white/50">Tiến độ bóc tách</span>
                        <span className="text-white font-bold tabular-nums">{progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className={`h-full ${
                            isReview 
                              ? 'bg-rose-500' 
                              : isCompleted 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                                : 'bg-gradient-to-r from-sky-500 to-cyan-400'
                          } rounded-full transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer Actions: Last modified date + Action Button */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="text-[10px] font-mono text-white/40 truncate">
                        {proj.lastModified}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isCompleted && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>Xem kết quả</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {isProcessing && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-sky-300 bg-sky-950/60 hover:bg-sky-900/80 border border-sky-500/40 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>Tiếp tục</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {isReview && (
                          <button
                            onClick={() => onOpenDrawingReview(proj)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>Xem vấn đề</span>
                            <AlertTriangle className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        ) : (

          /* ─────────────────────────────────────────────────────────
             CASE 3: POLISHED TECHNICAL LIST TABLE VIEW
          ───────────────────────────────────────────────────────── */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/40">
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedProjectIds.length === paginatedProjects.length && paginatedProjects.length > 0}
                      onChange={handleToggleSelectAll}
                      className="rounded bg-[#080d18] border-white/20 text-sky-500 focus:ring-0 cursor-pointer accent-sky-500"
                    />
                  </th>
                  <th className="py-2.5 px-3">Tên dự án / Bản vẽ CAD</th>
                  <th className="py-2.5 px-3">Quy mô & Tầng</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3 w-36">Tiến độ</th>
                  <th className="py-2.5 px-3">Cập nhật</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-sans">
                {paginatedProjects.map((proj, idx) => {
                  const isSelected = selectedProjectIds.includes(proj.id);
                  const isCompleted = proj.status === 'Completed' || proj.status === 'Approved';
                  const isProcessing = proj.status === 'Processing' || proj.status === 'Draft';
                  const isReview = proj.status === 'Review Required';
                  const progress = proj.progressPct || (isCompleted ? 100 : isProcessing ? 65 : 80);

                  return (
                    <tr 
                      key={proj.id}
                      className={`hover:bg-sky-500/5 transition-colors group ${
                        isSelected ? 'bg-sky-500/10' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(proj.id)}
                          className="rounded bg-[#080d18] border-white/20 text-sky-500 focus:ring-0 cursor-pointer accent-sky-500"
                        />
                      </td>

                      {/* Tên dự án + Thumbnail */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <CadThumbnail index={idx} />
                          <div>
                            <div 
                              onClick={() => onSelectProject(proj)}
                              className="font-bold text-white group-hover:text-sky-300 transition-colors cursor-pointer"
                            >
                              {proj.name}
                            </div>
                            <div className="text-[11px] font-mono text-white/40">
                              {proj.fileName} · {proj.building}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Thông tin */}
                      <td className="py-3 px-3 text-white/70 font-mono text-xs">
                        <div>
                          {proj.floorsInfo ? proj.floorsInfo.split(' / ')[0] : `${proj.floorsCount} tầng`}
                        </div>
                        <div className="text-[11px] text-white/40">
                          {proj.floorsInfo ? proj.floorsInfo.split(' / ')[1] : `${proj.drawingsCount || 4} bản vẽ`}
                        </div>
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-3 font-mono">
                        {isCompleted && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Đã hoàn thành</span>
                          </div>
                        )}
                        {isProcessing && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                            <span>Đang xử lý</span>
                          </div>
                        )}
                        {isReview && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-rose-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            <span>Cần kiểm tra</span>
                          </div>
                        )}
                      </td>

                      {/* Tiến độ Bar */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 font-mono">
                          <div className="flex-1 h-1.5 rounded-full bg-[#080d18] overflow-hidden">
                            <div 
                              className={`h-full ${
                                isReview ? 'bg-rose-500' : isCompleted ? 'bg-emerald-500' : 'bg-sky-500'
                              } rounded-full transition-all duration-500`} 
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-white/60 w-8 text-right tabular-nums">
                            {progress}%
                          </span>
                        </div>
                      </td>

                      {/* Cập nhật gần nhất */}
                      <td className="py-3 px-3 text-white/60 font-mono text-[11px]">
                        <div>{proj.lastModified.includes(' ') ? proj.lastModified.split(' ')[0] : proj.lastModified}</div>
                        {proj.lastModified.includes(' ') && (
                          <div className="text-white/40">{proj.lastModified.split(' ')[1]}</div>
                        )}
                      </td>

                      {/* Thao tác */}
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {isCompleted && (
                            <button
                              onClick={() => onOpenDrawingReview(proj)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-500/30 hover:bg-sky-900/80 transition-all cursor-pointer"
                            >
                              Xem kết quả
                            </button>
                          )}
                          {isProcessing && (
                            <button
                              onClick={() => onOpenDrawingReview(proj)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-500/30 hover:bg-sky-900/80 transition-all cursor-pointer"
                            >
                              Tiếp tục
                            </button>
                          )}
                          {isReview && (
                            <button
                              onClick={() => onOpenDrawingReview(proj)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/80 transition-all cursor-pointer"
                            >
                              Xem lỗi
                            </button>
                          )}

                          <button 
                            onClick={() => onSelectProject(proj)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Tùy chọn khác"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGINATION & ITEM COUNTER
        ───────────────────────────────────────────────────────────── */}
        {filteredProjects.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-white/50 font-mono">
            <div>
              Hiển thị 1 - {paginatedProjects.length} trong tổng số {filteredProjects.length} dự án
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-sky-500 text-white font-bold shadow-xs'
                        : 'border border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CONSOLE TELEMETRY (MẸO KỸ THUẬT & LƯU TRỮ CAD)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Left Card: Mẹo chuẩn hóa CAD */}
        <div className="lg:col-span-8 p-4 sm:p-5 rounded-2xl bg-[#0c1424] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Tiêu chuẩn bản vẽ tối ưu</span>
                <span className="text-[10px] font-mono text-sky-400 font-normal">CAD Recommendation</span>
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
                Để kết quả nhận diện tự động đạt độ chính xác &gt; 98%, hãy sử dụng layer tường riêng biệt (`A-WALL`, `WALL`) và khép kín đường bao polyline trước khi xuất PDF/DWG.
              </p>
            </div>
          </div>

          <button
            onClick={() => projects.length > 0 && onSelectProject(projects[0])}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-sky-300 bg-sky-500/10 border border-sky-500/25 hover:bg-sky-500/20 transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
          >
            <span>Tài liệu quy chuẩn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Card: Lưu trữ & Hạn mức tính toán */}
        <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-[#0c1424] border border-white/10 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-white">
                Bộ nhớ bản vẽ đám mây
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#080d18] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full w-[24%]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mt-1">
                <span>2.4 GB / 10 GB</span>
                <span className="text-sky-400 font-bold">24%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Gói hiện tại: Kỹ sư Pro (10 GB CAD Cloud). Liên hệ quản trị viên để mở rộng hạn mức.')}
            className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-sky-500 to-cyan-400 text-white hover:brightness-110 transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-sm"
          >
            Mở rộng
          </button>
        </div>

      </div>

    </div>
  );
};
