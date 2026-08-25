import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileUp, RefreshCw, CheckCircle, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';
import {
  convertPdfToPageImages,
  loadTemplatePagesFromLocalStorage,
  saveTemplatePagesToLocalStorage,
  TEMPLATE_STORAGE_KEY,
} from '../utils/pdfTemplateManager';

interface PdfTemplateUploaderProps {
  onTemplatePagesLoaded: (pages: string[] | null) => void;
  currentTemplatePagesCount: number;
}

export const PdfTemplateUploader: React.FC<PdfTemplateUploaderProps> = ({
  onTemplatePagesLoaded,
  currentTemplatePagesCount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check on mount if custom template is saved
  useEffect(() => {
    const cached = loadTemplatePagesFromLocalStorage();
    if (cached && cached.length > 0) {
      onTemplatePagesLoaded(cached);
      setFileName(`Saved Template (${cached.length} pages)`);
    }
  }, [onTemplatePagesLoaded]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMessage('Please select a valid .PDF document.');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setFileName(file.name);
      setProgressText('Reading PDF pages...');

      const pageImages = await convertPdfToPageImages(file, (current, total) => {
        setProgressText(`Rendering template page ${current} of ${total}...`);
      });

      if (pageImages.length === 0) {
        throw new Error('No pages could be extracted from this PDF.');
      }

      saveTemplatePagesToLocalStorage(pageImages);
      onTemplatePagesLoaded(pageImages);
      setProgressText('');
    } catch (err: any) {
      console.error('Failed to parse template PDF:', err);
      setErrorMessage(err.message || 'Failed to process template PDF.');
      onTemplatePagesLoaded(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearTemplate = () => {
    try {
      sessionStorage.removeItem(TEMPLATE_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    onTemplatePagesLoaded(null);
    setFileName(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-3 bg-[#FAF7F2] border border-[#D8CEBE] rounded-xs text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#EFE9DF] border border-[#BC6C25]/40 flex items-center justify-center text-[#BC6C25]">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-[#2C2621] block">
              Direct PDF Background / Base Template
            </span>
            <span className="text-[11px] text-[#7A6B5B]">
              {currentTemplatePagesCount > 0
                ? `Using original PDF background (${currentTemplatePagesCount} pages loaded)`
                : 'Upload your original PDF file to use its exact pages as the base background'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,application/pdf"
            className="hidden"
            id="pdf-base-template-input"
          />

          <label
            htmlFor="pdf-base-template-input"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-semibold text-xs transition-all shadow-xs cursor-pointer ${
              isProcessing
                ? 'bg-[#8C7B6A] text-white cursor-wait'
                : 'bg-[#4A3F35] hover:bg-[#2C2621] text-[#FAF7EE]'
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>{progressText}</span>
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 text-[#D4A373]" />
                <span>{currentTemplatePagesCount > 0 ? 'Replace Base PDF' : 'Upload Base PDF'}</span>
              </>
            )}
          </label>

          {currentTemplatePagesCount > 0 && (
            <button
              onClick={handleClearTemplate}
              title="Revert to built-in vector graphics"
              className="p-1.5 rounded-xs text-[#8C7B6A] hover:text-red-700 hover:bg-red-50 border border-[#D8CEBE] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="mt-2 text-[11px] text-red-700 flex items-center gap-1.5 bg-red-50 p-2 rounded-xs border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {currentTemplatePagesCount > 0 && !isProcessing && (
        <div className="mt-2 text-[11px] text-emerald-800 flex items-center gap-1.5 bg-emerald-50/80 p-1.5 rounded-xs border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>
            <strong>Active:</strong> Your uploaded PDF pages are placed directly behind the reading overlay with 100% fidelity.
          </span>
        </div>
      )}
    </div>
  );
};
