import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, FileText, Check, Loader2, Sparkles } from 'lucide-react';
import { ReadingInputs } from '../types';
import { PdfPagesRenderer } from './PdfPagesRenderer';
import { PdfTemplateUploader } from './PdfTemplateUploader';
import { generateAndDownloadPdf, PdfGenerationProgress } from '../utils/pdfDownloadHelper';
import { getCategorySpecByTopic } from '../data/categoryConfig';
import { getTopicMasterBlueprint } from '../utils/categoryPageHelper';

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

  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);
  const blueprint = getTopicMasterBlueprint(inputs.topic || categorySpec.id);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#FAF7F2] rounded-md shadow-2xl border border-[#E0D7CC] w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="p-4 bg-white border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-3 shrink-0">
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
                  {effectiveShopName}
                </span>
              </div>
              <p className="text-xs text-[#8C7B6A]">
                Client: {inputs.name || 'Querent'} • {categorySpec.title} ({renderedTotalPages} Pages Dynamic Blueprint)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Base Template Uploader Bar */}
        <div className="px-4 py-2.5 bg-[#FAF8F3] border-b border-[#E0D7CC]">
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
                  : `All ${renderedTotalPages} pages rendered with card artwork, numerology mandala, and dynamic category modules:`}
              </span>
            </div>

            {/* Renderer for dynamic pages */}
            <div className="transform origin-top scale-[0.8] sm:scale-[0.9] lg:scale-100 transition-transform">
              <PdfPagesRenderer
                inputs={inputs}
                markdown={markdown}
                customTemplatePages={customTemplatePages}
                onTotalPagesCalculated={(cnt) => setRenderedTotalPages(cnt)}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
