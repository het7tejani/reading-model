import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Compass,
  Star,
  BrainCircuit,
  HeartHandshake,
  TrendingUp,
  Sparkle,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Filter,
  Scale,
  Scissors,
  Eye,
  Flame,
  Shield,
  Baby,
  Gavel,
  Trees,
  PawPrint,
  Moon,
  ShieldAlert,
  KeyRound,
  Lock,
  GitFork,
  Hourglass,
  Radar,
  Zap,
  Feather,
} from 'lucide-react';
import {
  PRODUCT_BLOCKS,
  ProductBlockNumber,
  ProductBlockMeta,
  detectProductBlock,
  InjectedSectionItem,
  EliminatedSectionItem,
} from '../data/masterSectionsCatalog';

interface SectionStructurizerProps {
  topic: string;
  problem: string;
  question: string;
  dob?: string;
  title?: string;
  tier?: string;
  onSelectProductBlock?: (blockId: ProductBlockNumber) => void;
}

export const SectionStructurizer: React.FC<SectionStructurizerProps> = ({
  topic,
  problem,
  question,
  title = '',
  onSelectProductBlock,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'selected' | 'eliminated'>('selected');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [manualBlockOverride, setManualBlockOverride] = useState<ProductBlockNumber | null>(null);

  // Auto-detect Product Block based on inputs
  const activeProductBlock: ProductBlockMeta = useMemo(() => {
    if (manualBlockOverride) {
      return PRODUCT_BLOCKS[manualBlockOverride];
    }
    return detectProductBlock(topic || '', problem || '', question || '', title || '');
  }, [topic, problem, question, title, manualBlockOverride]);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarDays':
        return <CalendarDays className="w-5 h-5 text-[#8B6B43]" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#8B6B43]" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#8B6B43]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#8B6B43]" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-[#8B6B43]" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#8B6B43]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#8B6B43]" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-[#8B6B43]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#8B6B43]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#8B6B43]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#8B6B43]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#8B6B43]" />;
      case 'Sparkle':
        return <Sparkle className="w-5 h-5 text-[#8B6B43]" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-[#8B6B43]" />;
      case 'PawPrint':
        return <PawPrint className="w-5 h-5 text-[#8B6B43]" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-[#8B6B43]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#8B6B43]" />;
      case 'Gavel':
        return <Gavel className="w-5 h-5 text-[#8B6B43]" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-[#8B6B43]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#8B6B43]" />;
      case 'GitFork':
        return <GitFork className="w-5 h-5 text-[#8B6B43]" />;
      case 'Hourglass':
        return <Hourglass className="w-5 h-5 text-[#8B6B43]" />;
      case 'Radar':
        return <Radar className="w-5 h-5 text-[#8B6B43]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#8B6B43]" />;
      case 'Feather':
        return <Feather className="w-5 h-5 text-[#8B6B43]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8B6B43]" />;
    }
  };

  const handleBlockChange = (blockIdStr: string) => {
    if (blockIdStr === 'auto') {
      setManualBlockOverride(null);
    } else {
      const num = parseInt(blockIdStr, 10) as ProductBlockNumber;
      setManualBlockOverride(num);
      if (onSelectProductBlock) {
        onSelectProductBlock(num);
      }
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#D8CEBF] rounded-sm shadow-xs overflow-hidden transition-all duration-300">
      {/* Header Banner */}
      <div className="p-5 md:p-6 border-b border-[#E0D7CC] bg-gradient-to-r from-[#F5EFEB] to-[#FAF7F2]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-[#4A3F35] text-[#FAF7F2] flex items-center justify-center shadow-xs shrink-0 mt-0.5">
              {getProductIcon(activeProductBlock.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-[#4A3F35] text-[#FAF7F2] px-2 py-0.5 rounded-xs font-semibold">
                  {activeProductBlock.code}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-[#E8DEC8] text-[#5A4525] px-2 py-0.5 rounded-xs font-bold border border-[#D4C3A3]">
                  AI Selected: {activeProductBlock.injectedSections.length} Injected Sections
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-[#EFE9E1] text-[#7A6B5C] px-2 py-0.5 rounded-xs">
                  {activeProductBlock.spreadCardCount} Cards Spread ({activeProductBlock.spreadName})
                </span>
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#2A241E] mt-1 tracking-tight">
                {activeProductBlock.name}
              </h3>
              <p className="text-xs text-[#6A5E52] mt-0.5 max-w-3xl leading-relaxed">
                <span className="font-semibold text-[#4A3F35]">Target Focus:</span> {activeProductBlock.targetFocus}
              </p>
            </div>
          </div>

          {/* Action & Override Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            {/* Product Block Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#D4C8B8] rounded-xs px-2.5 py-1.5 shadow-2xs">
              <label htmlFor="product-block-select" className="text-[10px] font-mono uppercase text-[#7A6B5C] font-semibold">
                Block:
              </label>
              <select
                id="product-block-select"
                value={manualBlockOverride ? manualBlockOverride.toString() : 'auto'}
                onChange={(e) => handleBlockChange(e.target.value)}
                className="text-xs bg-transparent text-[#2A241E] font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="auto">✨ Auto-Detect (via Topic)</option>
                {Object.values(PRODUCT_BLOCKS).map((pb) => (
                  <option key={pb.id} value={pb.id.toString()}>
                    {pb.code}: {pb.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 bg-white hover:bg-[#F2ECE4] border border-[#D4C8B8] rounded-xs text-[#5A4E42] transition-colors"
              title={isExpanded ? 'Collapse Section List' : 'Expand Section List'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Section Details */}
      {isExpanded && (
        <div className="p-5 md:p-6 space-y-5">
          {/* Filter Bar & Counters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DFC8]">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterMode('selected')}
                className={`text-xs px-3 py-1 rounded-xs font-medium transition-all ${
                  filterMode === 'selected'
                    ? 'bg-[#4A3F35] text-[#FAF7F2] shadow-2xs font-semibold'
                    : 'bg-white text-[#6A5E52] border border-[#D8CEBF] hover:bg-[#F5EFEB]'
                }`}
              >
                ✓ Injected Sections ({activeProductBlock.injectedSections.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('eliminated')}
                className={`text-xs px-3 py-1 rounded-xs font-medium transition-all ${
                  filterMode === 'eliminated'
                    ? 'bg-[#8B4513] text-white shadow-2xs font-semibold'
                    : 'bg-white text-[#6A5E52] border border-[#D8CEBF] hover:bg-[#F5EFEB]'
                }`}
              >
                ✕ Eliminated ({activeProductBlock.eliminatedSections.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`text-xs px-3 py-1 rounded-xs font-medium transition-all ${
                  filterMode === 'all'
                    ? 'bg-[#4A3F35] text-[#FAF7F2] shadow-2xs font-semibold'
                    : 'bg-white text-[#6A5E52] border border-[#D8CEBF] hover:bg-[#F5EFEB]'
                }`}
              >
                All Sections ({activeProductBlock.injectedSections.length + activeProductBlock.eliminatedSections.length})
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#7A6B5C] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#8B6B43]" />
              Strict Scope Control: Injected strictly per Product Block & Category
            </div>
          </div>

          {/* Section 1: Injected Sections List */}
          {(filterMode === 'selected' || filterMode === 'all') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#2A241E] flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Active Injected Sections for {activeProductBlock.code}
                </h4>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs">
                  {activeProductBlock.injectedSections.length} Sections Generated in PDF
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeProductBlock.injectedSections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-3 bg-white border border-[#DDD4C5] rounded-xs shadow-2xs hover:border-[#8B6B43] transition-all flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#F2EDE8] border border-[#8B6B43] flex items-center justify-center text-[10px] font-serif font-bold text-[#4A3F35] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono uppercase bg-[#F0EBE1] text-[#6A5A48] px-1.5 py-0.2 rounded-xs border border-[#DFD5C5]">
                          {sec.category}
                        </span>
                        <h5 className="font-serif text-xs font-bold text-[#2A241E] leading-snug">
                          {sec.name}
                        </h5>
                      </div>
                      <p className="text-[11px] text-[#6A5E52] mt-1 leading-relaxed line-clamp-2">
                        {sec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Eliminated Sections List */}
          {(filterMode === 'eliminated' || filterMode === 'all') && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#6A5E52] flex items-center gap-1.5 font-mono">
                  <XCircle className="w-4 h-4 text-[#A0522D]" />
                  Eliminated Sections (Out of Scope for {activeProductBlock.code})
                </h4>
                <span className="text-[11px] text-[#8B4513] font-medium bg-[#F9F3EB] border border-[#E6DACB] px-2 py-0.5 rounded-xs">
                  {activeProductBlock.eliminatedSections.length} Irrelevant Modules Omitted
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeProductBlock.eliminatedSections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FBF9F6] border border-[#E8DEC8] rounded-xs opacity-85 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#EFE9DF] border border-[#D5C9B5] flex items-center justify-center text-[10px] font-mono text-[#8C7A68] shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono uppercase bg-[#EAE2D5] text-[#8C7A68] px-1.5 py-0.2 rounded-xs">
                          {sec.category}
                        </span>
                        <h5 className="font-serif text-xs font-semibold text-[#665849] line-through">
                          {sec.name}
                        </h5>
                      </div>
                      <p className="text-[11px] text-[#8C7A68] mt-1 italic leading-relaxed">
                        Reason: {sec.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
