import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  RotateCcw,
  Sliders,
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
  Check,
  AlertTriangle
} from 'lucide-react';
import { ReadingTier, SectionDefinition } from '../types';
import {
  MASTER_SECTIONS_LIST,
  ARCHETYPES,
  ArchetypeId,
  ArchetypeMeta,
  detectReadingArchetype,
  calculateSectionState,
} from '../data/masterSectionsCatalog';

interface SectionStructurizerProps {
  topic: string;
  problem: string;
  question: string;
  dob: string;
  tier: ReadingTier;
  customSections?: string[];
  excludedSections?: string[];
  onChangeTier?: (tier: ReadingTier) => void;
  onUpdateSectionOverrides: (custom: string[], excluded: string[]) => void;
}

export const SectionStructurizer: React.FC<SectionStructurizerProps> = ({
  topic,
  problem,
  question,
  dob,
  tier,
  customSections = [],
  excludedSections = [],
  onChangeTier,
  onUpdateSectionOverrides,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'selected' | 'eliminated'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [manualArchetypeOverride, setManualArchetypeOverride] = useState<ArchetypeId | null>(null);

  const hasDob = Boolean(dob && dob.trim().length > 3);

  // Auto-detect archetype based on input topic, problem, question
  const detectedArchetype = useMemo(() => {
    if (manualArchetypeOverride) {
      return ARCHETYPES[manualArchetypeOverride];
    }
    return detectReadingArchetype(topic || 'Universal Reading', problem, question);
  }, [topic, problem, question, manualArchetypeOverride]);

  // Compute selected vs eliminated sections
  const { selectedSections, eliminatedSections, totalPagesCount } = useMemo(() => {
    return calculateSectionState(
      tier,
      detectedArchetype,
      hasDob,
      customSections,
      excludedSections
    );
  }, [tier, detectedArchetype, hasDob, customSections, excludedSections]);

  const isSectionSelected = (sectionId: string): boolean => {
    return selectedSections.some((s) => s.id === sectionId);
  };

  const getEliminationReason = (sectionId: string): string | null => {
    const found = eliminatedSections.find((e) => e.section.id === sectionId);
    return found ? found.reason : null;
  };

  // Toggle individual section inclusion / exclusion
  const handleToggleSection = (section: SectionDefinition) => {
    const currentlySelected = isSectionSelected(section.id);

    let newCustom = [...customSections];
    let newExcluded = [...excludedSections];

    if (currentlySelected) {
      // User wants to REMOVE / ELIMINATE this section
      newCustom = newCustom.filter((id) => id !== section.id);
      if (!newExcluded.includes(section.id)) {
        newExcluded.push(section.id);
      }
    } else {
      // User wants to ADD / INCLUDE this section
      newExcluded = newExcluded.filter((id) => id !== section.id);
      if (!newCustom.includes(section.id)) {
        newCustom.push(section.id);
      }
    }

    onUpdateSectionOverrides(newCustom, newExcluded);
  };

  // Reset to default archetype & tier settings
  const handleResetToDefaults = () => {
    setManualArchetypeOverride(null);
    onUpdateSectionOverrides([], []);
  };

  // Quick include all available sections (Masterclass 38 pages)
  const handleIncludeAll = () => {
    const allIds = MASTER_SECTIONS_LIST.map((s) => s.id);
    onUpdateSectionOverrides(allIds, []);
  };

  // Filtered sections list for display
  const displayedSections = useMemo(() => {
    return MASTER_SECTIONS_LIST.filter((section) => {
      // Category filter
      if (selectedCategory !== 'all' && section.category !== selectedCategory) {
        return false;
      }
      // Status filter
      const isSelected = isSectionSelected(section.id);
      if (filterMode === 'selected' && !isSelected) return false;
      if (filterMode === 'eliminated' && isSelected) return false;
      return true;
    });
  }, [selectedCategory, filterMode, selectedSections]);

  // Archetype icon renderer helper
  const renderArchetypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-[#BC6C25]" />;
      case 'CalendarDays':
        return <CalendarDays className="w-5 h-5 text-[#BC6C25]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#BC6C25]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#BC6C25]" />;
      case 'Sparkle':
        return <Sparkle className="w-5 h-5 text-[#BC6C25]" />;
      default:
        return <Compass className="w-5 h-5 text-[#BC6C25]" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'core':
        return 'Core Front-Matter';
      case 'numerology_astrology':
        return 'Numerology & Astrology';
      case 'tarot_spread':
        return 'Tarot Spread & Cards';
      case 'master_specialized':
        return 'Specialized Archetype';
      case 'synthesis_psychology':
        return 'Psychological Synthesis';
      case 'remedies_action':
        return 'Upayas, Remedies & Action';
      default:
        return cat;
    }
  };

  return (
    <div className="bg-white border border-[#E0D7CC] rounded-sm shadow-xs overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="p-5 md:p-6 bg-[#FAF7EE] border-b border-[#E0D7CC] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            ⚙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                AI Type Detection & Section Structurizer
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#BC6C25] text-white text-[10px] font-mono font-bold">
                {totalPagesCount} Pages Active
              </span>
            </div>
            <p className="text-[11px] text-[#6B5E51] font-medium mt-0.5">
              Auto-detects reading archetype, manages selected vs eliminated sections, and lets you add/remove any page.
            </p>
          </div>
        </div>

        {/* Top Quick Status & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-[11px] font-bold text-[#4A3F35] transition-colors cursor-pointer"
            title="Reset to default archetype sections"
          >
            <RotateCcw className="w-3 h-3 text-[#BC6C25]" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-[#4A3F35] text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer hover:bg-[#2C241E]"
          >
            <span>{isExpanded ? 'Collapse Structurizer' : 'Expand Structurizer'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 md:p-6 space-y-6">
          {/* 1. Intelligent Archetype Detection Banner */}
          <div className="p-4 md:p-5 rounded-sm border border-[#BC6C25]/40 bg-[#FAF7EE] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D5] pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-sm border border-[#BC6C25]/30 shadow-xs">
                  {renderArchetypeIcon(detectedArchetype.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#BC6C25] bg-white px-2 py-0.5 rounded-xs border border-[#BC6C25]/30">
                      {detectedArchetype.code}
                    </span>
                    <h3 className="font-serif font-bold text-sm md:text-base text-[#1F1914]">
                      {detectedArchetype.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B5E51] font-medium mt-0.5">
                    {detectedArchetype.tagline}
                  </p>
                </div>
              </div>

              {/* Manual Archetype Switcher Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] uppercase font-bold text-[#8C7B6A] whitespace-nowrap">
                  Reading Type:
                </label>
                <select
                  value={detectedArchetype.id}
                  onChange={(e) => setManualArchetypeOverride(e.target.value as ArchetypeId)}
                  className="px-2.5 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs font-semibold text-[#4A3F35] focus:outline-none focus:border-[#4A3F35]"
                >
                  <option value="A">Archetype A: Exact Thoughts & Feelings</option>
                  <option value="B">Archetype B: 12-Month Future Predictions</option>
                  <option value="C">Archetype C: Deep Love & Soulmates</option>
                  <option value="D">Archetype D: Career & Wealth Abundance</option>
                  <option value="E">Archetype E: Spiritual Awakening & Karma</option>
                  <option value="F">Archetype F: Universal / Custom Domain</option>
                </select>
              </div>
            </div>

            {/* Archetype Description & Spread info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="md:col-span-2 space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C7B6A]">
                  AI Channeled Focus:
                </span>
                <p className="text-xs text-[#2C2C2C] leading-relaxed">
                  {detectedArchetype.description}
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xs border border-[#E0D7CC] space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C7B6A] block">
                  Prescribed Spread Architecture:
                </span>
                <p className="font-serif font-bold text-xs text-[#1F1914]">
                  {detectedArchetype.spreadType}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Live Selected vs Eliminated Summary Counts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Total Selected */}
            <div className="p-3.5 bg-[#F4F9F4] border border-emerald-300 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Selected / Active
                </span>
                <p className="text-lg font-serif font-bold text-emerald-950">
                  {selectedSections.length} Sections
                </p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Total Eliminated */}
            <div className="p-3.5 bg-[#FFF9F2] border border-amber-300 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Eliminated / Omitted
                </span>
                <p className="text-lg font-serif font-bold text-amber-950">
                  {eliminatedSections.length} Sections
                </p>
              </div>
              <XCircle className="w-6 h-6 text-amber-600" />
            </div>

            {/* Master Catalog Pool */}
            <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5E51] block">
                  Master Modular Catalog
                </span>
                <p className="text-lg font-serif font-bold text-[#1F1914]">
                  {MASTER_SECTIONS_LIST.length} Total Sections
                </p>
              </div>
              <Layers className="w-6 h-6 text-[#BC6C25]" />
            </div>
          </div>

          {/* 3. Filter Bar & Quick Tools */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 border-t border-[#E8E1D5]">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-[#4A3F35] text-white shadow-xs'
                    : 'bg-[#F2EDE8] text-[#6B5E51] hover:bg-[#E0D7CC]'
                }`}
              >
                All Sections ({MASTER_SECTIONS_LIST.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('selected')}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterMode === 'selected'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Check className="w-3 h-3" />
                <span>Selected Only ({selectedSections.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterMode('eliminated')}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterMode === 'eliminated'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <XCircle className="w-3 h-3" />
                <span>Eliminated Only ({eliminatedSections.length})</span>
              </button>
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#8C7B6A]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#4A3F35] font-medium focus:outline-none"
              >
                <option value="all">All Functional Groups</option>
                <option value="core">Core Front-Matter (7)</option>
                <option value="numerology_astrology">Numerology & Astrology (4)</option>
                <option value="tarot_spread">Sacred Altar & Spread (6)</option>
                <option value="master_specialized">Specialized Archetype Modules (6)</option>
                <option value="synthesis_psychology">Psychological Synthesis & Inquiries (5)</option>
                <option value="remedies_action">Upayas, Chakras & Action Protocols (10)</option>
              </select>
            </div>
          </div>

          {/* 4. Interactive Section List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {displayedSections.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs text-xs text-[#8C7B6A] italic">
                No sections match the current filter selection.
              </div>
            ) : (
              displayedSections.map((section, idx) => {
                const isSelected = isSectionSelected(section.id);
                const eliminationReason = getEliminationReason(section.id);

                return (
                  <div
                    key={section.id}
                    className={`p-3.5 rounded-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#D4C8B8] hover:border-[#BC6C25] shadow-2xs'
                        : 'bg-[#FAF8F5]/80 border-[#E8E1D5] opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Left Column: Section Details */}
                    <div className="space-y-1 sm:max-w-[70%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-serif font-bold text-[#1F1914]">
                          {section.name}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F2EDE8] text-[#6B5E51] border border-[#E0D7CC]">
                          {getCategoryLabel(section.category)}
                        </span>
                        {section.requiresDob && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                            Requires DOB
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#6B5E51] leading-relaxed">
                        {section.description}
                      </p>

                      {/* Elimination reason note */}
                      {!isSelected && eliminationReason && (
                        <div className="flex items-center gap-1.5 text-[10.5px] text-amber-800 font-medium pt-0.5">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{eliminationReason}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Toggle Action Button */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {isSelected ? (
                        <button
                          type="button"
                          onClick={() => handleToggleSection(section)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                          title="Click to remove this page from PDF"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Omit Page</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleSection(section)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                          title="Click to include this page in PDF"
                        >
                          <Plus className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Include Page</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Guidance Footer Note */}
          <div className="p-3 bg-[#FAF7EE] border border-[#E8E1D5] rounded-xs flex items-center justify-between text-[11px] text-[#6B5E51]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
              <span>
                <strong>Structuring Rule:</strong> When Date of Birth is omitted, Numerology is cleanly excluded and remaining pages automatically renumber seamlessly.
              </span>
            </div>
            <span className="font-mono font-bold text-[#4A3F35] hidden sm:inline">
              Target Depth: {totalPagesCount} Pages
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
