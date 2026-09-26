import { WorkspaceTheme } from '../types';

export interface ThemeConfig {
  id: WorkspaceTheme;
  name: string;
  tagline: string;
  badge: string;
  badgeBg: string;
  iconColor: string;
  activeIndicator: string;
  isLight?: boolean;
  
  // Base Canvas & Grid
  bgCanvas: string;
  sidebarBg: string;
  headerBg: string;
  gridStroke: string;
  gridPatternColor: string;
  
  // Accents & Borders
  accentText: string;
  accentBadgeBg: string;
  accentBorder: string;
  accentIconBg: string;
  cardBg: string;
  borderSubtle: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Primary CTA Buttons
  primaryBtn: string;
  primaryBtnHover: string;
  secondaryBtn: string;
  stepperActive: string;
  navActive: string;
  
  // CAD Blueprint Specifics
  cadOuterWall: string;
  cadInnerWall: string;
  cadLabelText: string;
  cadToolActive: string;
  cadDropzone: string;
  cadCloudIcon: string;
  roomColors: {
    room1: { fill: string; stroke: string };
    room2: { fill: string; stroke: string };
    room3: { fill: string; stroke: string };
    room4: { fill: string; stroke: string };
  };
}

export const WORKSPACE_THEMES: Record<WorkspaceTheme, ThemeConfig> = {
  'warm-sand': {
    id: 'warm-sand',
    name: 'Cát Ấm & Đất Nung (Warm Sand & Terracotta)',
    tagline: 'Phong cách kiến trúc Địa Trung Hải, sáng dịu, sang trọng bậc nhất',
    badge: 'Đề xuất mới',
    badgeBg: 'bg-[#C25E3E]/15 text-[#C25E3E] border border-[#C25E3E]/30',
    iconColor: '#C25E3E',
    activeIndicator: 'bg-[#C25E3E]',
    isLight: true,
    
    bgCanvas: '#F9F6F0',
    sidebarBg: '#FAF7F2',
    headerBg: '#FAF7F2',
    cardBg: 'bg-white',
    gridStroke: 'rgba(194, 94, 62, 0.08)',
    gridPatternColor: '#C25E3E',
    
    accentText: 'text-[#C25E3E]',
    accentBadgeBg: 'bg-[#FDF3EF] text-[#C25E3E] border border-[#E8C2B3]',
    accentBorder: 'border-[#E8E1D5]',
    accentIconBg: 'bg-[#FDF3EF] border border-[#E8C2B3] text-[#C25E3E] shadow-xs',
    borderSubtle: 'border-[#E8E1D5]',
    
    textPrimary: 'text-[#231B15]',
    textSecondary: 'text-[#5C5248]',
    textMuted: 'text-[#8C827A]',
    
    primaryBtn: 'bg-gradient-to-r from-[#C25E3E] to-[#A3482B] hover:brightness-105 text-white font-semibold shadow-xs border border-[#C25E3E]/40',
    primaryBtnHover: 'hover:brightness-105',
    secondaryBtn: 'bg-white hover:bg-[#F5EFEB] text-[#231B15] border border-[#DDD5C7] font-semibold',
    stepperActive: 'bg-[#C25E3E] text-white font-bold shadow-xs border border-[#A3482B]',
    navActive: 'bg-[#FDF3EF] text-[#C25E3E] border border-[#E8C2B3] font-bold shadow-xs',
    
    cadOuterWall: '#C25E3E',
    cadInnerWall: '#2C241E',
    cadLabelText: '#9E4326',
    cadToolActive: 'bg-[#C25E3E] text-white font-bold shadow-xs border border-[#A3482B]',
    cadDropzone: 'border-[#C25E3E]/40 hover:border-[#C25E3E] bg-[#FDF3EF]/60 hover:bg-[#FDF3EF]',
    cadCloudIcon: 'bg-[#FDF3EF] border border-[#E8C2B3] text-[#C25E3E] shadow-xs',
    roomColors: {
      room1: { fill: 'rgba(194, 94, 62, 0.18)', stroke: '#C25E3E' },
      room2: { fill: 'rgba(217, 119, 6, 0.18)', stroke: '#D97706' },
      room3: { fill: 'rgba(74, 124, 89, 0.18)', stroke: '#4A7C59' },
      room4: { fill: 'rgba(163, 72, 43, 0.18)', stroke: '#A3482B' },
    }
  },
  
  'steel-blue': {
    id: 'steel-blue',
    name: 'Xanh Thép & Lam Hồ',
    tagline: 'Dịu mắt, chuẩn CAD / Revit, giảm căng thẳng thị giác',
    badge: 'CAD Chuẩn',
    badgeBg: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    iconColor: '#38bdf8',
    activeIndicator: 'bg-sky-400',
    isLight: false,
    
    bgCanvas: '#090e1a',
    sidebarBg: '#0c1120',
    headerBg: '#0c1120',
    cardBg: 'bg-[#0e1628]',
    gridStroke: 'rgba(56, 189, 248, 0.06)',
    gridPatternColor: '#38bdf8',
    
    accentText: 'text-sky-400',
    accentBadgeBg: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    accentBorder: 'border-sky-500/25',
    accentIconBg: 'bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    borderSubtle: 'border-white/10',
    
    textPrimary: 'text-white',
    textSecondary: 'text-white/70',
    textMuted: 'text-white/40',
    
    primaryBtn: 'bg-sky-600 hover:bg-sky-500 text-white font-semibold border border-sky-400/30 shadow-[0_2px_12px_rgba(2,132,199,0.3)]',
    primaryBtnHover: 'hover:bg-sky-500',
    secondaryBtn: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold',
    stepperActive: 'bg-sky-600 text-white font-bold shadow-sm border border-sky-400/40',
    navActive: 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#38bdf8',
    cadInnerWall: '#0284c7',
    cadLabelText: '#7dd3fc',
    cadToolActive: 'bg-sky-600 text-white font-bold shadow-sm border border-sky-400/40',
    cadDropzone: 'border-sky-500/35 hover:border-sky-400 bg-sky-950/15 hover:bg-sky-950/25',
    cadCloudIcon: 'bg-sky-500/15 border-sky-500/30 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(56, 189, 248, 0.18)', stroke: '#38bdf8' },
      room2: { fill: 'rgba(14, 165, 233, 0.18)', stroke: '#0ea5e9' },
      room3: { fill: 'rgba(99, 102, 241, 0.18)', stroke: '#818cf8' },
      room4: { fill: 'rgba(20, 184, 166, 0.18)', stroke: '#2dd4bf' },
    }
  },
  
  'sage-green': {
    id: 'sage-green',
    name: 'Xanh Xô Thơm & Bạc Hà',
    tagline: 'Êm dịu nhất cho mắt người, tối ưu làm việc ca đêm',
    badge: 'Êm dịu',
    badgeBg: 'bg-emerald-500/15',
    iconColor: '#34d399',
    activeIndicator: 'bg-emerald-400',
    isLight: false,
    
    bgCanvas: '#081210',
    sidebarBg: '#0b1a16',
    headerBg: '#0b1a16',
    cardBg: 'bg-[#0b1a16]',
    gridStroke: 'rgba(52, 211, 153, 0.06)',
    gridPatternColor: '#34d399',
    
    accentText: 'text-emerald-400',
    accentBadgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    accentBorder: 'border-emerald-500/25',
    accentIconBg: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    borderSubtle: 'border-white/10',
    
    textPrimary: 'text-white',
    textSecondary: 'text-white/70',
    textMuted: 'text-white/40',
    
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border border-emerald-400/30 shadow-[0_2px_12px_rgba(16,185,129,0.3)]',
    primaryBtnHover: 'hover:bg-emerald-500',
    secondaryBtn: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold',
    stepperActive: 'bg-emerald-600 text-white font-bold shadow-sm border border-emerald-400/40',
    navActive: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#34d399',
    cadInnerWall: '#059669',
    cadLabelText: '#6ee7b7',
    cadToolActive: 'bg-emerald-600 text-white font-bold shadow-sm border border-emerald-400/40',
    cadDropzone: 'border-emerald-500/35 hover:border-emerald-400 bg-emerald-950/15 hover:bg-emerald-950/25',
    cadCloudIcon: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(52, 211, 153, 0.18)', stroke: '#34d399' },
      room2: { fill: 'rgba(16, 185, 129, 0.18)', stroke: '#10b981' },
      room3: { fill: 'rgba(20, 184, 166, 0.18)', stroke: '#14b8a6' },
      room4: { fill: 'rgba(101, 163, 13, 0.18)', stroke: '#84cc16' },
    }
  },
  
  'muted-sand': {
    id: 'muted-sand',
    name: 'Cát Ấm & Than Trầm',
    tagline: 'Tone ấm tự nhiên, đã hạ bão hòa 60% không gây chói',
    badge: 'Ấm mờ',
    badgeBg: 'bg-amber-500/15',
    iconColor: '#f59e0b',
    activeIndicator: 'bg-amber-400',
    isLight: false,
    
    bgCanvas: '#111114',
    sidebarBg: '#18181c',
    headerBg: '#18181c',
    cardBg: 'bg-[#18181c]',
    gridStroke: 'rgba(217, 119, 6, 0.05)',
    gridPatternColor: '#d97706',
    
    accentText: 'text-amber-400',
    accentBadgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    accentBorder: 'border-amber-500/25',
    accentIconBg: 'bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    borderSubtle: 'border-white/10',
    
    textPrimary: 'text-white',
    textSecondary: 'text-white/70',
    textMuted: 'text-white/40',
    
    primaryBtn: 'bg-amber-700/90 hover:bg-amber-600 text-amber-50 font-semibold border border-amber-500/30 shadow-[0_2px_12px_rgba(217,119,6,0.25)]',
    primaryBtnHover: 'hover:bg-amber-600',
    secondaryBtn: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold',
    stepperActive: 'bg-amber-700 text-amber-50 font-bold shadow-sm border border-amber-500/40',
    navActive: 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#d97706',
    cadInnerWall: '#b45309',
    cadLabelText: '#fcd34d',
    cadToolActive: 'bg-amber-700 text-amber-50 font-bold shadow-sm border border-amber-500/40',
    cadDropzone: 'border-amber-500/35 hover:border-amber-400 bg-amber-950/15 hover:bg-amber-950/25',
    cadCloudIcon: 'bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(217, 119, 6, 0.18)', stroke: '#d97706' },
      room2: { fill: 'rgba(180, 83, 9, 0.18)', stroke: '#b45309' },
      room3: { fill: 'rgba(161, 98, 7, 0.18)', stroke: '#a16207' },
      room4: { fill: 'rgba(202, 138, 4, 0.18)', stroke: '#ca8a04' },
    }
  }
};
