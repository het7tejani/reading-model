import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Download,
  Printer,
  ArrowLeft,
  BookOpen,
  Code,
  Bookmark,
  Sparkles,
  FileText
} from 'lucide-react';
import { ReadingInputs } from '../types';
import { calculateLifePath } from '../utils/numerology';
import { PdfExportModal } from './PdfExportModal';

interface ReadingResultViewProps {
  markdown: string;
  inputs: ReadingInputs;
  onEditInputs: () => void;
  onSaveReading: () => void;
  isSaved: boolean;
  source?: 'gemini-ai' | 'algorithmic';
  model?: string;
}

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  markdown,
  inputs,
  onEditInputs,
  onSaveReading,
  isSaved,
  source = 'gemini-ai',
  model = 'gemini-3.7-flash'
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'illuminated' | 'markdown'>('illuminated');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const numerology = calculateLifePath(inputs.dob);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#D4A373', '#BC6C25', '#4A3F35', '#606C38', '#E0D7CC']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const cleanName = inputs.name.replace(/\s+/g, '_') || 'Querent';
    const filename = `Tarot_Numerology_Reading_${cleanName}.md`;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* 26-Page PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        inputs={inputs}
        markdown={markdown}
      />

      {/* Top Navigation & Action Controls Bar */}
      <div className="no-print p-3.5 rounded-sm bg-white border border-[#E0D7CC] flex flex-wrap items-center justify-between gap-3 sticky top-3 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={onEditInputs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#FCFAF7] hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Inputs / Draw Again</span>
            <span className="sm:hidden">Edit</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F2EDE8] p-0.5 rounded-xs border border-[#E0D7CC] text-xs">
            <button
              onClick={() => setViewMode('illuminated')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'illuminated'
                  ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                  : 'text-[#8C7B6A] hover:text-[#4A3F35]'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              Illuminated
            </button>
            <button
              onClick={() => setViewMode('markdown')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'markdown'
                  ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                  : 'text-[#8C7B6A] hover:text-[#4A3F35]'
              }`}
            >
              <Code className="w-3 h-3" />
              Raw Markdown
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Primary 26-Page PDF Export Button */}
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-[#BC6C25] hover:bg-[#9B561B] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>26-Page PDF Preview & Export</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xs bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D4A373]" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Text
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            title="Download formatted .md file"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#8C7B6A]" />
            <span className="hidden sm:inline">.md</span>
          </button>

          <button
            onClick={handlePrint}
            title="Print reading"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#8C7B6A]" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={onSaveReading}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors border ${
              isSaved
                ? 'bg-[#F2EDE8] text-[#606C38] border-[#606C38]/40'
                : 'bg-white hover:bg-[#F2EDE8] text-[#4A3F35] border-[#E0D7CC]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Querent Summary Banner */}
      <div className="p-6 md:p-8 rounded-sm bg-white border border-[#E0D7CC] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E0D7CC]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7B6A] font-bold">
                Customized Sacred Reading
              </span>
              {source === 'gemini-ai' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#BC6C25]/30 text-[#BC6C25] text-[9px] font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-[#BC6C25]" />
                  Google Gemini AI ({model})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-[#8C7B6A] text-[9px] font-bold uppercase tracking-wider font-mono">
                  Synthesized Oracle
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif italic text-[#4A3F35] tracking-tight mt-0.5">
              {inputs.name} <span className="text-sm font-sans font-normal text-[#8C7B6A]">({inputs.age} yrs • DOB: {inputs.dob})</span>
            </h1>
          </div>

          {numerology && (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-xs">
              <span className="w-7 h-7 rounded-full border border-[#4A3F35] bg-white text-[#4A3F35] font-serif italic font-bold flex items-center justify-center text-xs">
                {numerology.lifePathNumber}
              </span>
              <div>
                <div className="font-bold text-[#4A3F35] uppercase tracking-wider text-[11px]">
                  Life Path {numerology.lifePathNumber}
                </div>
                <div className="text-[10px] text-[#8C7B6A]">{numerology.archetype}</div>
              </div>
            </div>
          )}
        </div>

        {/* Cards Spread Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {inputs.cards.map((card, index) => {
            const titles = ['Position 01: Current', 'Position 02: Blockage', 'Position 03: Path Forward'];
            if (!card) return null;
            return (
              <div
                key={index}
                className="p-3 rounded-xs bg-[#FCFAF7] border border-[#EEEAE5] flex items-center gap-3"
              >
                <div className="text-2xl">{card.symbol}</div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-widest block">
                    {titles[index]}
                  </span>
                  <h4 className="font-serif italic font-bold text-sm text-[#4A3F35] truncate">{card.name}</h4>
                  <p className="text-[10px] text-[#8C7B6A] truncate">{card.keywords.slice(0, 3).join(', ')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Illuminated or Raw Markdown */}
      {viewMode === 'illuminated' ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 md:p-12 rounded-sm bg-white border border-[#E0D7CC] shadow-xs reading-content max-w-none"
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-sm bg-white border border-[#E0D7CC] shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#8C7B6A]" />
              <span className="text-[10px] font-bold text-[#4A3F35] uppercase tracking-widest">
                Raw Markdown (Calibrated for PDF Template Copy-Paste)
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="text-xs text-[#4A3F35] hover:text-[#BC6C25] font-bold uppercase tracking-wider transition-colors"
            >
              {copied ? 'Copied!' : 'Click to Copy'}
            </button>
          </div>

          <pre className="p-4 rounded-xs bg-[#FCFAF7] text-xs font-mono text-[#2C2C2C] whitespace-pre-wrap break-words leading-relaxed max-h-[600px] overflow-y-auto border border-[#EEEAE5] select-all">
            {markdown}
          </pre>
        </motion.div>
      )}
    </div>
  );
};
