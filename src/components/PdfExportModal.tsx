import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  FileText,
  Check,
  Loader2,
  Sparkles,
  Layers,
  ShieldCheck,
  Compass,
  Star,
  BookOpen,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { ReadingInputs, ReadingTier } from '../types';
import { PdfPagesRenderer } from './PdfPagesRenderer';
import { PdfTemplateUploader } from './PdfTemplateUploader';
import { generateAndDownloadPdf, PdfGenerationProgress } from '../utils/pdfDownloadHelper';
import { getCategorySpecByTopic } from '../data/categoryConfig';
import { getTopicMasterBlueprint } from '../utils/categoryPageHelper';
import { MASTER_48_SECTIONS, resolveActiveSections, MasterSectionDomain } from '../utils/masterSectionsManager';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: ReadingInputs;
  markdown: string;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  markdown,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<PdfGenerationProgress | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [customTemplatePages, setCustomTemplatePages] = useState<string[] | null>(null);
  const [selectedTier, setSelectedTier] = useState<ReadingTier>(inputs.tier || 'detailed');
  const [showSectionsDirectory, setShowSectionsDirectory] = useState(false);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<MasterSectionDomain | 'all'>('all');

  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);
  const blueprint = getTopicMasterBlueprint(inputs.topic || categorySpec.id, selectedTier, hasDob);
  const [renderedTotalPages, setRenderedTotalPages] = useState<number>(blueprint.totalPages);

  const effectiveShopName = (inputs.shopName || '').trim() || 'Sacred Intuitive Studio';

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      setDownloadSuccess(false);
      await generateAndDownloadPdf(inputs.name, (p) => setProgress(p), effectiveShopName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGenerating(false);
      setProgress(null);
    }
  };

  const activeMasterSections = resolveActiveSections(inputs, selectedTier);

  const tierOptions: {
    id: ReadingTier;
    name: string;
    range: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: 'standard',
      name: 'Standard',
      range: hasDob ? '16–18 Pages' : '15–17 Pages',
      description: 'Core 3-card spread, synthesized Q&A, and action plan',
      icon: Compass,
    },
    {
      id: 'detailed',
      name: 'Detailed',
      range: hasDob ? '26–28 Pages' : '25–27 Pages',
      description: 'Full spread, celestial synergy, deep-dive inquiries & 4-phase protocol',
      icon: Layers,
    },
    {
      id: 'premium',
      name: 'Premium',
      range: hasDob ? '34–38 Pages' : '32–36 Pages',
      description: 'Masterclass edition with extensive worksheets, breakdowns & somatic guide',
      icon: Star,
    },
  ];

  const domainOptions: { id: MasterSectionDomain | 'all'; label: string }[] = [
    { id: 'all', label: 'All 48 Sections' },
    { id: 'intro_navigation', label: '1. Intro & Nav' },
    { id: 'numerology_astrology', label: '2. Numerology & Astro' },
    { id: 'divination_tarot', label: '3. Divination & Tarot' },
    { id: 'energy_chakras', label: '4. Energy & Chakras' },
    { id: 'vedic_remedies', label: '5. Vedic Upayas' },
    { id: 'action_manifestation', label: '6. Action & Roadmaps' },
    { id: 'specialized_focus', label: '7. Specialized Domains' },
    { id: 'conclusion_backmatter', label: '8. Backmatter' },
  ];

  const filteredMasterSections = MASTER_48_SECTIONS.filter((s) => {
    if (selectedDomainFilter !== 'all' && s.domain !== selectedDomainFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#FAF7F2] rounded-md shadow-2xl border border-[#E0D7CC] w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="p-3.5 bg-white border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F2EDE8] border border-[#4A3F35] flex items-center justify-center text-[#4A3F35]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif italic font-bold text-base text-[#4A3F35]">
                  {renderedTotalPages}-Page Client PDF Preview & Export
                </h3>
                <span className="px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#BC6C25]/40 text-[#BC6C25] text-[10px] font-bold uppercase tracking-wider font-mono">
                  {selectedTier.toUpperCase()} EDITION
                </span>
              </div>
              <p className="text-xs text-[#8C7B6A]">
                Client: {inputs.name || 'Querent'} • {categorySpec.title} ({renderedTotalPages} Pages {hasDob ? 'with Pythagorean Numerology' : 'without Numerology - DOB omitted'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSectionsDirectory(!showSectionsDirectory)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-semibold border transition-all cursor-pointer ${
                showSectionsDirectory
                  ? 'bg-[#4A3F35] text-white border-[#4A3F35]'
                  : 'bg-[#F2EDE8] text-[#4A3F35] border-[#D8CEBE] hover:bg-[#EAE2D8]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>48 Master Sections</span>
              {showSectionsDirectory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2 rounded-xs font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
                isGenerating
                  ? 'bg-[#8C7B6A] text-white cursor-wait'
                  : downloadSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] cursor-pointer'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{progress?.status || 'Rendering PDF...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded {renderedTotalPages} Pages!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Download {renderedTotalPages}-Page PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xs text-[#8C7B6A] hover:text-[#4A3F35] hover:bg-[#F2EDE8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tier Selector Bar */}
        <div className="px-4 py-2 bg-[#F2EDE8] border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#4A3F35] uppercase tracking-wider text-[11px]">
              Select PDF Tier:
            </span>
            <div className="flex items-center gap-1.5 bg-white p-1 rounded border border-[#E0D7CC]">
              {tierOptions.map((tier) => {
                const Icon = tier.icon;
                const isSelected = selectedTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4A3F35] text-white shadow-xs'
                        : 'text-[#6B5E51] hover:bg-[#FAF7F2] hover:text-[#1F1914]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tier.name}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F2EDE8] text-[#8C7B6A]'}`}>
                      {tier.range}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-[#6B5E51] flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BC6C25]" />
            <span>
              {hasDob ? 'DOB provided: Numerology + Cycles included' : 'DOB omitted: Numerology calculations safely removed'}
            </span>
          </div>
        </div>

        {/* Master Sections Directory Accordion */}
        <AnimatePresence>
          {showSectionsDirectory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-[#E0D7CC] overflow-hidden"
            >
              <div className="p-4 max-h-60 overflow-y-auto space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E0D7CC] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#4A3F35]">
                      48 Master Sections Architecture
                    </span>
                    <span className="text-[11px] text-[#8C7B6A]">
                      ({activeMasterSections.length} sections active for {selectedTier.toUpperCase()} tier)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                    {domainOptions.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDomainFilter(d.id)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          selectedDomainFilter === d.id
                            ? 'bg-[#4A3F35] text-white font-bold'
                            : 'bg-[#F2EDE8] text-[#6B5E51] hover:bg-[#E5DDD4]'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {filteredMasterSections.map((sec) => {
                    const isActive = activeMasterSections.some((a) => a.code === sec.code);
                    return (
                      <div
                        key={sec.code}
                        className={`p-2 rounded border transition-all ${
                          isActive
                            ? 'bg-[#FAF7F2] border-[#BC6C25]/50 text-[#1F1914]'
                            : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-serif font-bold truncate text-[11px]">
                            {sec.id}. {sec.title}
                          </span>
                          {isActive ? (
                            <span className="shrink-0 px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="shrink-0 px-1 py-0.2 rounded bg-gray-200 text-gray-600 text-[9px]">
                              OPT
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#6B5E51] mt-0.5 line-clamp-2">
                          {sec.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Base Template Uploader Bar */}
        <div className="px-4 py-2 bg-[#FAF8F3] border-b border-[#E0D7CC]">
          <PdfTemplateUploader
            currentTemplatePagesCount={customTemplatePages ? customTemplatePages.length : 0}
            onTemplatePagesLoaded={(pages) => setCustomTemplatePages(pages)}
          />
        </div>

        {/* Progress Banner during export */}
        {isGenerating && progress && (
          <div className="px-6 py-2.5 bg-[#4A3F35] text-white text-xs flex items-center justify-between border-b border-[#3E342B]">
            <div className="flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4A373]" />
              <span>{progress.status}</span>
            </div>
            <div className="w-48 bg-black/30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#D4A373] h-full transition-all duration-200"
                style={{ width: `${(progress.currentPage / progress.totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Live Scrollable Pages View */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-[#2B2621]">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="mb-4 text-center text-xs text-[#E0D7CC] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>
                {customTemplatePages && customTemplatePages.length > 0
                  ? `Rendering text on top of your original uploaded PDF base pages (${customTemplatePages.length} pages loaded):`
                  : `All ${renderedTotalPages} pages rendered in ${selectedTier.toUpperCase()} edition:`}
              </span>
            </div>

            {/* Renderer for dynamic pages */}
            <div className="transform origin-top scale-[0.8] sm:scale-[0.9] lg:scale-100 transition-transform">
              <PdfPagesRenderer
                inputs={inputs}
                markdown={markdown}
                customTemplatePages={customTemplatePages}
                overrideTier={selectedTier}
                onTotalPagesCalculated={(cnt) => setRenderedTotalPages(cnt)}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
