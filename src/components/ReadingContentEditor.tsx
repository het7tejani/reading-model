import React, { useState, useEffect, useDeferredValue, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Save,
  RotateCcw,
  X,
  Check,
  FileText,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Eye,
  Columns,
  Sparkles,
  AlertCircle,
  Layers,
  BookOpen,
  ArrowRight,
  Pencil,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  CornerDownLeft,
  Pilcrow,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Palette,
  ExternalLink,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { cleanHeadingText, cleanMarkdownText, parsePageByPageOutput } from '../utils/readingParser';
import { PdfPagesRenderer } from './PdfPagesRenderer';
import { PDF_THEME_LIST, getPdfTheme } from '../data/pdfThemes';
import { ReadingInputs, ReadingTier, PdfThemeId } from '../types';

export interface EditableSection {
  id: string;
  pageNumber?: number;
  title: string;
  content: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  rawHeaderPrefix?: string;
}

/**
 * Strips all HTML tags (<div align="...">, <p>, <span>, etc.) and comments,
 * leaving 100% clean, non-technical plain text for non-tech users.
 */
export function stripAllHtmlTags(text: string): string {
  if (!text) return '';
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?(?:div|p|span|font|section|article)[^>]*>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Extracts alignment directive from text if present (from markdown comments or legacy HTML tags)
 */
export function extractAlignmentFromText(text: string): 'left' | 'center' | 'right' | 'justify' | undefined {
  if (!text) return undefined;
  const commentMatch = text.match(/<!--\s*align:\s*(left|center|right|justify)\s*-->/i);
  if (commentMatch) {
    return commentMatch[1].toLowerCase() as any;
  }
  const tagMatch = text.match(/<(?:div|p)[^>]*align=["'](left|center|right|justify)["']/i);
  if (tagMatch) {
    return tagMatch[1].toLowerCase() as any;
  }
  return undefined;
}

/**
 * Parses markdown into structured editable sections (either Page-by-Page or ## sections)
 * Guaranteed to strip all confusing HTML tags from content!
 */
export function parseMarkdownToEditableSections(rawMarkdown: string): EditableSection[] {
  if (!rawMarkdown) return [];

  // Check for PAGE X format
  const pageItems = parsePageByPageOutput(rawMarkdown);
  if (pageItems.length > 0) {
    return pageItems.map((item, idx) => {
      const rawContent = item.paragraphs.join('\n\n') || item.content || '';
      const detectedAlign = item.alignment || extractAlignmentFromText(rawContent) || 'center';
      const cleanContent = stripAllHtmlTags(rawContent);

      return {
        id: `page-${item.pageNumber || idx + 1}`,
        pageNumber: item.pageNumber || idx + 1,
        title: item.title,
        content: cleanContent,
        alignment: detectedAlign,
        rawHeaderPrefix: `### PAGE ${item.pageNumber || idx + 1}:`,
      };
    });
  }

  // Fallback: Parse by headings (## or ###)
  const sections: EditableSection[] = [];
  const lines = rawMarkdown.split('\n');
  let currentTitle = 'Introduction';
  let currentPrefix = '##';
  let currentBuffer: string[] = [];
  let secIdx = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      if (currentBuffer.length > 0 || sections.length > 0) {
        const rawContent = currentBuffer.join('\n');
        const detectedAlign = extractAlignmentFromText(rawContent) || 'center';
        sections.push({
          id: `section-${secIdx++}`,
          title: currentTitle,
          content: stripAllHtmlTags(rawContent),
          alignment: detectedAlign,
          rawHeaderPrefix: currentPrefix,
        });
      }
      currentPrefix = headingMatch[1];
      currentTitle = headingMatch[2].trim();
      currentBuffer = [];
    } else {
      currentBuffer.push(line);
    }
  }

  if (currentBuffer.length > 0 || currentTitle) {
    const rawContent = currentBuffer.join('\n');
    const detectedAlign = extractAlignmentFromText(rawContent) || 'center';
    sections.push({
      id: `section-${secIdx}`,
      title: currentTitle,
      content: stripAllHtmlTags(rawContent),
      alignment: detectedAlign,
      rawHeaderPrefix: currentPrefix,
    });
  }

  return sections;
}

/**
 * Serializes editable sections back to clean markdown with zero raw HTML tags
 */
export function serializeSectionsToMarkdown(sections: EditableSection[]): string {
  return sections
    .map((sec) => {
      const cleanTitle = cleanHeadingText(sec.title, 'Section');
      const cleanContent = stripAllHtmlTags(sec.content);

      // Save alignment as a non-intrusive markdown comment (never exposing ugly <div> tags)
      const alignDirective =
        sec.alignment && sec.alignment !== 'center'
          ? `<!-- align: ${sec.alignment} -->\n\n`
          : '';

      if (sec.pageNumber) {
        return `### PAGE ${sec.pageNumber} — ${cleanTitle}\n\n${alignDirective}${cleanContent}`;
      }
      const prefix = sec.rawHeaderPrefix || '##';
      return `${prefix} ${cleanTitle}\n\n${alignDirective}${cleanContent}`;
    })
    .join('\n\n---\n\n');
}

/**
 * Helper to count words in a string
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Sets alignment without injecting HTML tags into the text!
 * In full markdown mode, it inserts a clean <!-- align: ... --> comment.
 */
export function applyTextAlignmentToTextarea(
  textarea: HTMLTextAreaElement,
  currentText: string,
  alignment: 'left' | 'center' | 'right' | 'justify',
  onTextUpdate: (newText: string) => void
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  let selStart = start;
  let selEnd = end;

  // If no text is actively selected, auto-select surrounding paragraph or sentence
  if (selStart === selEnd) {
    let pStart = currentText.lastIndexOf('\n', selStart - 1);
    pStart = pStart === -1 ? 0 : pStart + 1;
    let pEnd = currentText.indexOf('\n', selEnd);
    pEnd = pEnd === -1 ? currentText.length : pEnd;

    selStart = pStart;
    selEnd = pEnd;
  }

  const selectedSubstring = currentText.substring(selStart, selEnd);
  if (!selectedSubstring.trim()) return;

  // Strip any old HTML tags completely
  const cleanSelected = stripAllHtmlTags(selectedSubstring);

  // Use clean markdown comment directive instead of <div align="...">
  const replacement = `<!-- align: ${alignment} -->\n${cleanSelected}`;

  const updated =
    currentText.substring(0, selStart) + replacement + currentText.substring(selEnd);

  onTextUpdate(updated);

  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(selStart, selStart + replacement.length);
  }, 20);
}

/**
 * Inserts text (such as \n newline, \n\n paragraph break, or <br />) at current cursor position
 */
export function insertTextAtCursor(
  textarea: HTMLTextAreaElement,
  currentText: string,
  textToInsert: string,
  onTextUpdate: (newText: string) => void
) {
  const start = textarea.selectionStart ?? currentText.length;
  const end = textarea.selectionEnd ?? currentText.length;

  const updated =
    currentText.substring(0, start) + textToInsert + currentText.substring(end);

  onTextUpdate(updated);

  setTimeout(() => {
    textarea.focus();
    const newPos = start + textToInsert.length;
    textarea.setSelectionRange(newPos, newPos);
  }, 15);
}

interface ReadingContentEditorProps {
  initialMarkdown: string;
  originalAiMarkdown?: string;
  onSave: (newMarkdown: string) => void;
  onCancel: () => void;
  initialFocusedSectionId?: string;
  isModal?: boolean;
  inputs?: ReadingInputs;
  onLiveChange?: (newMarkdown: string) => void;
}

export const ReadingContentEditor: React.FC<ReadingContentEditorProps> = ({
  initialMarkdown,
  originalAiMarkdown,
  onSave,
  onCancel,
  initialFocusedSectionId,
  isModal = false,
  inputs,
  onLiveChange,
}) => {
  const [sections, setSections] = useState<EditableSection[]>(() =>
    parseMarkdownToEditableSections(initialMarkdown)
  );
  const [fullMarkdown, setFullMarkdown] = useState<string>(initialMarkdown);
  const [editMode, setEditMode] = useState<'page' | 'full'>('page');
  const [previewMode, setPreviewMode] = useState<'pdf' | 'illuminated'>('pdf');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<PdfThemeId>(inputs?.pdfTheme || 'parchment');
  const [zoomLevel, setZoomLevel] = useState<number>(75);

  const [activeSectionId, setActiveSectionId] = useState<string>(
    initialFocusedSectionId || (sections[0] ? sections[0].id : 'page-1')
  );

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const activeTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Smooth deferred value of markdown for live preview to guarantee 60fps typing speed
  const deferredMarkdown = useDeferredValue(fullMarkdown);

  // Active section helper
  const activeSection = useMemo(() => {
    return sections.find((s) => s.id === activeSectionId) || sections[0] || null;
  }, [sections, activeSectionId]);

  const activePageIndex = useMemo(() => {
    return sections.findIndex((s) => s.id === activeSectionId);
  }, [sections, activeSectionId]);

  // Fallback inputs if not provided
  const effectiveInputs: ReadingInputs = useMemo(() => {
    return (
      inputs || {
        name: 'Querent',
        age: '33',
        dob: '1990-05-15',
        problem: 'Navigating life crossroads and seeking clarity',
        question: 'What is my highest soul path?',
        topic: 'Intuitive Soul Path',
        tier: 'detailed',
        cards: [],
      }
    );
  }, [inputs]);

  // Sync sections to full markdown and notify live change
  const syncSectionsToFullMarkdown = (updatedSections: EditableSection[]) => {
    const serialized = serializeSectionsToMarkdown(updatedSections);
    setFullMarkdown(serialized);
    onLiveChange?.(serialized);
  };

  // When editing content in Page mode
  const handleActiveContentChange = (newContent: string) => {
    let cleaned = newContent;
    let detectedAlign: 'left' | 'center' | 'right' | 'justify' | undefined;

    if (
      /<(?:div|p)[^>]*align=["'](left|center|right|justify)["']/i.test(cleaned) ||
      /<\/?(?:div|p|span)[^>]*>/i.test(cleaned)
    ) {
      detectedAlign = extractAlignmentFromText(cleaned);
      cleaned = stripAllHtmlTags(cleaned);
    }

    setSections((prev) => {
      const updated = prev.map((sec) =>
        sec.id === activeSectionId
          ? {
              ...sec,
              content: cleaned,
              ...(detectedAlign ? { alignment: detectedAlign } : {}),
            }
          : sec
      );
      syncSectionsToFullMarkdown(updated);
      return updated;
    });

    setHasUnsavedChanges(true);
  };

  // When editing title in Page mode
  const handleActiveTitleChange = (newTitle: string) => {
    setSections((prev) => {
      const updated = prev.map((sec) =>
        sec.id === activeSectionId ? { ...sec, title: newTitle } : sec
      );
      syncSectionsToFullMarkdown(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Change alignment for active page
  const handleSetActiveAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    setSections((prev) => {
      const updated = prev.map((sec) =>
        sec.id === activeSectionId ? { ...sec, alignment } : sec
      );
      syncSectionsToFullMarkdown(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Full Markdown direct edit
  const handleFullMarkdownChange = (newVal: string) => {
    setFullMarkdown(newVal);
    onLiveChange?.(newVal);
    setHasUnsavedChanges(true);
  };

  // When switching modes
  const handleSwitchEditMode = (mode: 'page' | 'full') => {
    if (mode === 'full') {
      setFullMarkdown(serializeSectionsToMarkdown(sections));
    } else {
      const parsed = parseMarkdownToEditableSections(fullMarkdown);
      setSections(parsed);
      if (parsed.length > 0 && !parsed.some((s) => s.id === activeSectionId)) {
        setActiveSectionId(parsed[0].id);
      }
    }
    setEditMode(mode);
  };

  // Navigate pages
  const handleSelectSection = (secId: string) => {
    setActiveSectionId(secId);
    const sec = sections.find((s) => s.id === secId);
    if (sec?.pageNumber) {
      scrollToPreviewPage(sec.pageNumber);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      const prev = sections[activePageIndex - 1];
      handleSelectSection(prev.id);
    }
  };

  const handleNextPage = () => {
    if (activePageIndex < sections.length - 1) {
      const next = sections[activePageIndex + 1];
      handleSelectSection(next.id);
    }
  };

  // Scroll to a specific page inside the preview container
  const scrollToPreviewPage = (pageNum: number) => {
    if (!previewContainerRef.current) return;
    const pageEl = previewContainerRef.current.querySelector(
      `#pdf-page-${pageNum}`
    ) as HTMLElement | null;
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle clicking a page inside the preview
  const handlePreviewContainerClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest('[id^="pdf-page-"]');
    if (target && target.id) {
      const num = parseInt(target.id.replace('pdf-page-', ''), 10);
      if (!isNaN(num)) {
        const found = sections.find((s) => s.pageNumber === num);
        if (found) {
          setActiveSectionId(found.id);
        }
      }
    }
  };

  // Insert token at cursor
  const handleInsertToken = (tokenPrefix: string, tokenSuffix = '') => {
    if (editMode === 'page') {
      if (!activeTextareaRef.current || !activeSection) return;
      const ta = activeTextareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const sel = activeSection.content.substring(start, end);
      const rep = `${tokenPrefix}${sel || 'text'}${tokenSuffix}`;
      const updated =
        activeSection.content.substring(0, start) + rep + activeSection.content.substring(end);
      handleActiveContentChange(updated);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(
          start + tokenPrefix.length,
          start + tokenPrefix.length + (sel.length || 4)
        );
      }, 15);
    } else {
      const ta = document.getElementById('full-markdown-textarea') as HTMLTextAreaElement | null;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const sel = fullMarkdown.substring(start, end);
      const rep = `${tokenPrefix}${sel || 'text'}${tokenSuffix}`;
      const updated = fullMarkdown.substring(0, start) + rep + fullMarkdown.substring(end);
      handleFullMarkdownChange(updated);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(
          start + tokenPrefix.length,
          start + tokenPrefix.length + (sel.length || 4)
        );
      }, 15);
    }
  };

  // Insert line break or paragraph break
  const handleInsertBreak = (type: 'newline' | 'paragraph' | 'br') => {
    const breakStr = type === 'paragraph' ? '\n\n' : type === 'br' ? '<br />\n' : '\n';
    if (editMode === 'page') {
      if (!activeTextareaRef.current || !activeSection) return;
      insertTextAtCursor(
        activeTextareaRef.current,
        activeSection.content,
        breakStr,
        handleActiveContentChange
      );
    } else {
      const ta = document.getElementById('full-markdown-textarea') as HTMLTextAreaElement | null;
      if (!ta) return;
      insertTextAtCursor(ta, fullMarkdown, breakStr, handleFullMarkdownChange);
    }
  };

  // Clean all HTML tags
  const handleCleanAllHtml = () => {
    const cleanedFull = stripAllHtmlTags(fullMarkdown);
    setFullMarkdown(cleanedFull);
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        content: stripAllHtmlTags(s.content),
      }))
    );
    onLiveChange?.(cleanedFull);
    setHasUnsavedChanges(true);
  };

  const hasHtmlTags =
    /<\/?(?:div|p|span)[^>]*>/i.test(fullMarkdown) ||
    sections.some((s) => /<\/?(?:div|p|span)[^>]*>/i.test(s.content));

  // Save handler
  const handleSave = () => {
    let finalMd = fullMarkdown;
    if (editMode === 'page') {
      finalMd = serializeSectionsToMarkdown(sections);
    }
    onSave(finalMd);
    setHasUnsavedChanges(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Reset to original
  const handleResetToOriginal = () => {
    if (!originalAiMarkdown) return;
    const ok = window.confirm(
      'Are you sure you want to reset all edits back to the initial AI transmission?'
    );
    if (!ok) return;

    setFullMarkdown(originalAiMarkdown);
    const parsed = parseMarkdownToEditableSections(originalAiMarkdown);
    setSections(parsed);
    if (parsed[0]) setActiveSectionId(parsed[0].id);
    onLiveChange?.(originalAiMarkdown);
    setHasUnsavedChanges(true);
  };

  const currentWords = activeSection ? countWords(activeSection.content) : 0;
  const isCardArt = activeSection
    ? /visual|card\s+\d.*(keyword|visual|intro|artwork)/i.test(activeSection.title)
    : false;
  const idealWordRange = isCardArt ? '30–60 words' : '65–125 words';

  return (
    <div
      className={`rounded-sm bg-white border border-[#E0D7CC] shadow-md flex flex-col overflow-hidden transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-none h-screen w-screen'
          : isModal
          ? 'h-full max-h-[90vh]'
          : 'my-4 min-h-[780px]'
      }`}
    >
      {/* Top Header Bar: Studio Title, Unsaved Badge, Global Controls */}
      <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4A3F35] text-white flex items-center justify-center shadow-xs">
            <Pencil className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif italic font-bold text-base text-[#4A3F35] tracking-tight">
                Live Reading Studio
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Preview Synchronized
              </span>
              {hasUnsavedChanges && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Unsaved Edits
                </span>
              )}
              {savedSuccess && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>
            <p className="text-xs text-[#8C7B6A]">
              Left pane edits content in real time • Right pane renders live authentic PDF folio
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {originalAiMarkdown && (
            <button
              onClick={handleResetToOriginal}
              title="Reset reading back to initial AI generation"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Workspace'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span className="hidden sm:inline">Minimize</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>

          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Save & Apply</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Studio Body (Left: Content Edit, Right: Live Preview) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 bg-[#FCFAF7]">
        {/* ========================================================= */}
        {/* LEFT PANE: CONTENT EDIT                                   */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col border-b lg:border-b-0 lg:border-r border-[#E0D7CC] bg-white overflow-hidden shrink-0">
          {/* Left Pane Top Bar: Page Selector & Mode Switch */}
          <div className="p-3 bg-[#FAF8F3] border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Page navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={activePageIndex <= 0}
                className="p-1 rounded-xs bg-white border border-[#E0D7CC] hover:bg-[#F2EDE8] text-[#4A3F35] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Selector Dropdown */}
              <div className="relative">
                <select
                  value={activeSectionId}
                  onChange={(e) => handleSelectSection(e.target.value)}
                  className="px-2.5 py-1 pr-6 text-xs font-serif font-bold text-[#1F1914] bg-white border border-[#E0D7CC] rounded-xs focus:outline-none focus:border-[#BC6C25] cursor-pointer max-w-[200px] sm:max-w-[260px] truncate"
                >
                  {sections.map((sec, idx) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.pageNumber ? `Page ${sec.pageNumber}: ` : `Section ${idx + 1}: `}
                      {sec.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={activePageIndex >= sections.length - 1}
                className="p-1 rounded-xs bg-white border border-[#E0D7CC] hover:bg-[#F2EDE8] text-[#4A3F35] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Page-by-Page vs Full Markdown Toggle */}
            <div className="flex items-center bg-[#F2EDE8] p-0.5 rounded-xs border border-[#E0D7CC]">
              <button
                type="button"
                onClick={() => handleSwitchEditMode('page')}
                className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  editMode === 'page'
                    ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                    : 'text-[#8C7B6A] hover:text-[#4A3F35]'
                }`}
              >
                Page-by-Page
              </button>
              <button
                type="button"
                onClick={() => handleSwitchEditMode('full')}
                className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  editMode === 'full'
                    ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                    : 'text-[#8C7B6A] hover:text-[#4A3F35]'
                }`}
              >
                Full Markdown
              </button>
            </div>
          </div>

          {/* Formatting & Alignment Toolbar */}
          <div className="px-3 py-2 bg-white border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-2">
            {/* Visual Alignment Controls */}
            <div className="flex items-center gap-0.5 bg-[#FAF7F2] p-0.5 rounded border border-[#E0D7CC]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A] px-1.5 hidden sm:inline">
                Align
              </span>
              <button
                type="button"
                onClick={() => handleSetActiveAlignment('left')}
                title="Align Left (No HTML tags needed)"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  activeSection?.alignment === 'left'
                    ? 'bg-[#BC6C25] text-white shadow-2xs'
                    : 'hover:bg-white text-[#6B5E51]'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSetActiveAlignment('center')}
                title="Align Center (Default)"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  activeSection?.alignment === 'center' || !activeSection?.alignment
                    ? 'bg-[#BC6C25] text-white shadow-2xs'
                    : 'hover:bg-white text-[#6B5E51]'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSetActiveAlignment('right')}
                title="Align Right"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  activeSection?.alignment === 'right'
                    ? 'bg-[#BC6C25] text-white shadow-2xs'
                    : 'hover:bg-white text-[#6B5E51]'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSetActiveAlignment('justify')}
                title="Justify Text"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  activeSection?.alignment === 'justify'
                    ? 'bg-[#BC6C25] text-white shadow-2xs'
                    : 'hover:bg-white text-[#6B5E51]'
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Break Insertion Controls */}
            <div className="flex items-center gap-0.5 bg-[#FAF7F2] p-0.5 rounded border border-[#E0D7CC]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A] px-1.5 hidden sm:inline">
                Break
              </span>
              <button
                type="button"
                onClick={() => handleInsertBreak('newline')}
                title="Insert New Line (↵ Break at cursor)"
                className="flex items-center gap-1 px-1.5 py-1 hover:bg-white rounded-xs text-[#4A3F35] text-[11px] font-medium cursor-pointer transition-colors"
              >
                <CornerDownLeft className="w-3 h-3 text-[#BC6C25]" />
                <span className="hidden sm:inline">Line</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertBreak('paragraph')}
                title="Insert Double Line Break (↵↵ Paragraph)"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <Pilcrow className="w-3 h-3 text-[#4A3F35]" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertBreak('br')}
                title="Insert HTML <br/> Break tag"
                className="px-1.5 py-0.5 hover:bg-white rounded-xs text-[10px] font-mono text-[#8C7B6A] hover:text-[#4A3F35] cursor-pointer"
              >
                &lt;br&gt;
              </button>
            </div>

            {/* Markdown Tokens */}
            <div className="flex items-center gap-0.5 bg-[#FAF7F2] p-0.5 rounded border border-[#E0D7CC]">
              <button
                type="button"
                onClick={() => handleInsertToken('**', '**')}
                title="Bold (**text**)"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertToken('*', '*')}
                title="Italic (*text*)"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertToken('### ')}
                title="Heading 3"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <Heading3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertToken('> ')}
                title="Quote"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertToken('• ')}
                title="Bullet"
                className="p-1 hover:bg-white rounded-xs text-[#4A3F35] cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {hasHtmlTags && (
              <button
                type="button"
                onClick={handleCleanAllHtml}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-semibold text-[10px] cursor-pointer transition-colors"
                title="Clean all <div align='...'> tags and convert to clean text"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Clean HTML</span>
              </button>
            )}
          </div>

          {/* Left Pane Editing Form Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-3 min-h-[300px]">
            {editMode === 'page' && activeSection ? (
              <>
                {/* Page Title Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A] flex items-center gap-1">
                      <span>Page Title</span>
                      <span className="text-[#BC6C25]">
                        ({activeSection.pageNumber ? `Page ${activeSection.pageNumber}` : 'Section'})
                      </span>
                    </span>
                    <span className="text-[11px] text-[#6B5E51] font-mono">
                      Words: <strong className="text-[#1F1914]">{currentWords}</strong> • Target: {idealWordRange}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={activeSection.title}
                    onChange={(e) => handleActiveTitleChange(e.target.value)}
                    placeholder="Page Title..."
                    className="w-full px-3 py-1.5 text-sm font-serif font-bold text-[#1F1914] bg-[#FAF8F3] border border-[#E0D7CC] rounded-xs focus:bg-white focus:outline-none focus:border-[#BC6C25] transition-colors"
                  />
                </div>

                {/* Page Content Textarea */}
                <div className="flex-1 flex flex-col space-y-1 min-h-[220px]">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A]">
                    <span>Content (Type to update live preview instantly)</span>
                    <span className="font-mono lowercase text-[#BC6C25]">
                      alignment: {activeSection.alignment || 'center'}
                    </span>
                  </div>
                  <textarea
                    ref={activeTextareaRef}
                    value={activeSection.content}
                    onChange={(e) => handleActiveContentChange(e.target.value)}
                    placeholder="Enter spiritual interpretation text here..."
                    className="flex-1 w-full p-3.5 text-xs font-sans text-[#2C2C2C] bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs focus:bg-white focus:outline-none focus:border-[#BC6C25] leading-relaxed resize-none shadow-inner min-h-[220px]"
                  />
                </div>
              </>
            ) : (
              /* Full Markdown Textarea */
              <div className="flex-1 flex flex-col space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A]">
                  <span>Full Markdown Transmission</span>
                  <span className="font-mono">
                    Total Words: <strong className="text-[#1F1914]">{countWords(fullMarkdown)}</strong>
                  </span>
                </div>
                <textarea
                  id="full-markdown-textarea"
                  value={fullMarkdown}
                  onChange={(e) => handleFullMarkdownChange(e.target.value)}
                  className="flex-1 w-full p-3.5 text-xs font-mono text-[#2C2C2C] bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs focus:bg-white focus:outline-none focus:border-[#BC6C25] leading-relaxed resize-none shadow-inner min-h-[300px]"
                />
              </div>
            )}
          </div>

          {/* Quick Page Jumper Strip at bottom of Left Pane */}
          {editMode === 'page' && (
            <div className="p-2 bg-[#FAF7F2] border-t border-[#E0D7CC] flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C7B6A] shrink-0 pl-1">
                Pages:
              </span>
              {sections.map((sec, idx) => {
                const isSelected = sec.id === activeSectionId;
                const pageNum = sec.pageNumber || idx + 1;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSection(sec.id)}
                    title={`Jump to Page ${pageNum}: ${sec.title}`}
                    className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#BC6C25] text-white shadow-2xs scale-105'
                        : 'bg-white border border-[#E0D7CC] text-[#6B5E51] hover:border-[#BC6C25] hover:text-[#1F1914]'
                    }`}
                  >
                    P{pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANE: LIVE PREVIEW                                  */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col bg-[#241E19] overflow-hidden min-h-[400px]">
          {/* Right Pane Top Controls: Theme Switcher & Zoom */}
          <div className="px-4 py-2.5 bg-[#1F1914] border-b border-[#3D342B] flex flex-wrap items-center justify-between gap-3 text-xs text-[#FAF7EE] shrink-0">
            {/* Live Preview Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xs text-[#FAF7EE] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span className="hidden sm:inline">Live Preview:</span>
              </span>

              <div className="flex items-center bg-[#2C241D] p-0.5 rounded border border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setPreviewMode('pdf')}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    previewMode === 'pdf'
                      ? 'bg-[#BC6C25] text-white shadow-xs'
                      : 'text-[#A89887] hover:text-[#FAF7EE]'
                  }`}
                >
                  Authentic PDF Folio
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('illuminated')}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    previewMode === 'illuminated'
                      ? 'bg-[#BC6C25] text-white shadow-xs'
                      : 'text-[#A89887] hover:text-[#FAF7EE]'
                  }`}
                >
                  Illuminated Web
                </button>
              </div>
            </div>

            {/* PDF Themes and Zoom */}
            <div className="flex items-center gap-2">
              {/* Theme Swatches */}
              {previewMode === 'pdf' && (
                <div className="flex items-center gap-1 bg-[#2C241D] p-1 rounded border border-[#4A3F35] overflow-x-auto">
                  {PDF_THEME_LIST.map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        title={`PDF Theme: ${theme.name}`}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#4A3F35] text-white ring-1 ring-[#BC6C25]'
                            : 'text-[#A89887] hover:text-white'
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full border border-black/40"
                          style={{ backgroundColor: theme.swatch.accent }}
                        />
                        <span className="hidden md:inline">{theme.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-[#2C241D] p-0.5 rounded border border-[#4A3F35]">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(45, z - 10))}
                  title="Zoom Out"
                  className="p-1 hover:bg-[#4A3F35] rounded text-[#FAF7EE] cursor-pointer"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="px-1 text-[10px] font-mono text-[#FAF7EE] min-w-[32px] text-center">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(115, z + 10))}
                  title="Zoom In"
                  className="p-1 hover:bg-[#4A3F35] rounded text-[#FAF7EE] cursor-pointer"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(75)}
                  title="Reset Zoom to 75%"
                  className="px-1.5 py-0.5 hover:bg-[#4A3F35] rounded text-[9px] font-bold text-[#BC6C25] cursor-pointer"
                >
                  Fit
                </button>
              </div>

              {/* Sync to Editor Page button */}
              {activeSection?.pageNumber && previewMode === 'pdf' && (
                <button
                  type="button"
                  onClick={() => scrollToPreviewPage(activeSection.pageNumber!)}
                  title={`Scroll live preview directly to Page ${activeSection.pageNumber}`}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-[#BC6C25] hover:bg-[#A35919] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Sync P{activeSection.pageNumber}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Pane Scrollable Viewport */}
          <div
            ref={previewContainerRef}
            onClick={handlePreviewContainerClick}
            className="flex-1 overflow-y-auto overflow-x-auto p-4 md:p-6 flex flex-col items-center select-text"
          >
            {previewMode === 'pdf' ? (
              <div
                className="transition-transform origin-top duration-150"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                }}
              >
                <PdfPagesRenderer
                  inputs={effectiveInputs}
                  markdown={deferredMarkdown}
                  overrideTheme={selectedTheme}
                  overrideTier={effectiveInputs.tier || 'detailed'}
                />
              </div>
            ) : (
              /* Illuminated Reading Web View */
              <div className="w-full max-w-3xl bg-white rounded-sm border border-[#E0D7CC] p-6 md:p-8 text-[#2C2C2C] shadow-lg reading-content">
                <div className="mb-4 pb-3 border-b border-[#E0D7CC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7B6A] font-bold block">
                      Illuminated Reading Preview
                    </span>
                    <h2 className="font-serif italic font-bold text-xl text-[#4A3F35]">
                      {effectiveInputs.name} • {effectiveInputs.topic || 'Intuitive Guidance'}
                    </h2>
                  </div>
                  <span className="text-xs text-[#8C7B6A] font-mono">
                    DOB: {effectiveInputs.dob || 'N/A'}
                  </span>
                </div>

                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    div: ({ node, className, align, ...props }: any) => {
                      const alignClass =
                        align === 'left'
                          ? 'text-left'
                          : align === 'right'
                          ? 'text-right'
                          : align === 'justify'
                          ? 'text-justify'
                          : align === 'center'
                          ? 'text-center'
                          : '';
                      return <div className={`${className || ''} ${alignClass}`} {...props} />;
                    },
                    p: ({ node, className, align, ...props }: any) => {
                      const alignClass =
                        align === 'left'
                          ? 'text-left'
                          : align === 'right'
                          ? 'text-right'
                          : align === 'justify'
                          ? 'text-justify'
                          : align === 'center'
                          ? 'text-center'
                          : '';
                      return (
                        <p
                          className={`${className || ''} ${alignClass} whitespace-pre-line my-3 leading-relaxed`}
                          {...props}
                        />
                      );
                    },
                  }}
                >
                  {deferredMarkdown}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
