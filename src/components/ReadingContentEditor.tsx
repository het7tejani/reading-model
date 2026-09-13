import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { cleanHeadingText, cleanMarkdownText, parsePageByPageOutput } from '../utils/readingParser';

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
}

export const ReadingContentEditor: React.FC<ReadingContentEditorProps> = ({
  initialMarkdown,
  originalAiMarkdown,
  onSave,
  onCancel,
  initialFocusedSectionId,
  isModal = false
}) => {
  const [editorTab, setEditorTab] = useState<'pages' | 'full' | 'split'>('pages');
  const [sections, setSections] = useState<EditableSection[]>(() =>
    parseMarkdownToEditableSections(initialMarkdown)
  );
  const [fullMarkdown, setFullMarkdown] = useState<string>(initialMarkdown);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialFocusedSectionId || (sections[0] ? sections[0].id : null)
  );

  // Sync when sections change in pages mode (auto-cleaning any pasted HTML tags)
  const handleSectionContentChange = (id: string, rawInput: string) => {
    let newContent = rawInput;
    let detectedAlign: 'left' | 'center' | 'right' | 'justify' | undefined;

    // Automatically strip any HTML tags pasted by non-tech users
    if (
      /<(?:div|p)[^>]*align=["'](left|center|right|justify)["']/i.test(newContent) ||
      /<\/?(?:div|p|span)[^>]*>/i.test(newContent)
    ) {
      detectedAlign = extractAlignmentFromText(newContent);
      newContent = stripAllHtmlTags(newContent);
    }

    setSections((prev) =>
      prev.map((sec) =>
        sec.id === id
          ? {
              ...sec,
              content: newContent,
              ...(detectedAlign ? { alignment: detectedAlign } : {}),
            }
          : sec
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSectionTitleChange = (id: string, newTitle: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, title: newTitle } : sec))
    );
    setHasUnsavedChanges(true);
  };

  // Directly set alignment for a section visually without any HTML tags
  const handleSetSectionAlignment = (
    sectionId: string,
    alignment: 'left' | 'center' | 'right' | 'justify'
  ) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, alignment } : sec))
    );
    setHasUnsavedChanges(true);
  };

  // Sync to full markdown whenever switching to full or split mode
  const handleTabChange = (newTab: 'pages' | 'full' | 'split') => {
    if (editorTab === 'pages' && (newTab === 'full' || newTab === 'split')) {
      setFullMarkdown(serializeSectionsToMarkdown(sections));
    } else if ((editorTab === 'full' || editorTab === 'split') && newTab === 'pages') {
      setSections(parseMarkdownToEditableSections(fullMarkdown));
    }
    setEditorTab(newTab);
  };

  const handleFullMarkdownChange = (val: string) => {
    setFullMarkdown(val);
    setHasUnsavedChanges(true);
  };

  // Clean all HTML tags across the entire reading in 1 click
  const handleCleanAllHtmlTags = () => {
    setFullMarkdown((prev) => stripAllHtmlTags(prev));
    setSections((prev) =>
      prev.map((s) => {
        const detectedAlign = extractAlignmentFromText(s.content) || s.alignment;
        return {
          ...s,
          content: stripAllHtmlTags(s.content),
          alignment: detectedAlign || 'center',
        };
      })
    );
    setHasUnsavedChanges(true);
  };

  const hasRawHtmlTags =
    /<\/?(?:div|p|span)[^>]*>/i.test(fullMarkdown) ||
    sections.some((s) => /<\/?(?:div|p|span)[^>]*>/i.test(s.content));

  // Insert markdown helper tokens
  const handleInsertToken = (tokenPrefix: string, tokenSuffix = '') => {
    const textarea = document.getElementById('full-markdown-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = fullMarkdown.substring(start, end);
    const replacement = `${tokenPrefix}${selectedText || 'text'}${tokenSuffix}`;

    const updated =
      fullMarkdown.substring(0, start) + replacement + fullMarkdown.substring(end);
    setFullMarkdown(updated);
    setHasUnsavedChanges(true);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tokenPrefix.length,
        start + tokenPrefix.length + (selectedText.length || 4)
      );
    }, 10);
  };

  // Align text in full or split markdown textarea
  const handleAlignFullMarkdown = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    const textarea = document.getElementById('full-markdown-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;
    applyTextAlignmentToTextarea(textarea, fullMarkdown, alignment, (newVal) => {
      handleFullMarkdownChange(newVal);
    });
  };

  // Universal top toolbar alignment handler
  const handleTopToolbarAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    if (editorTab === 'pages') {
      const targetId = activeSectionId || (sections[0] ? sections[0].id : null);
      if (targetId) {
        handleSetSectionAlignment(targetId, alignment);
      }
    } else {
      handleAlignFullMarkdown(alignment);
    }
  };

  // Insert New Line / Line Break / Paragraph Break handler
  const handleInsertNewLine = (
    breakType: 'newline' | 'paragraph' | 'br' = 'newline',
    targetSectionId?: string
  ) => {
    const breakString =
      breakType === 'paragraph'
        ? '\n\n'
        : breakType === 'br'
        ? '<br />\n'
        : '\n';

    if (editorTab === 'pages') {
      const sectionId =
        targetSectionId || activeSectionId || (sections[0] ? sections[0].id : null);
      if (!sectionId) return;

      const textarea = document.getElementById(
        `section-textarea-${sectionId}`
      ) as HTMLTextAreaElement | null;
      const sec = sections.find((s) => s.id === sectionId);
      if (!sec) return;

      if (textarea) {
        insertTextAtCursor(textarea, sec.content, breakString, (newContent) => {
          handleSectionContentChange(sectionId, newContent);
        });
      } else {
        handleSectionContentChange(sectionId, sec.content + breakString);
      }
    } else {
      const textarea = document.getElementById(
        'full-markdown-textarea'
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        insertTextAtCursor(textarea, fullMarkdown, breakString, (newContent) => {
          handleFullMarkdownChange(newContent);
        });
      } else {
        handleFullMarkdownChange(fullMarkdown + breakString);
      }
    }
  };

  // Save handler
  const handleSave = () => {
    let finalMarkdown = fullMarkdown;
    if (editorTab === 'pages') {
      finalMarkdown = serializeSectionsToMarkdown(sections);
    }
    onSave(finalMarkdown);
    setHasUnsavedChanges(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Reset to original
  const handleResetToOriginal = () => {
    if (!originalAiMarkdown) return;
    const confirmReset = window.confirm(
      'Are you sure you want to reset all edits back to the original AI generated reading?'
    );
    if (!confirmReset) return;

    setFullMarkdown(originalAiMarkdown);
    setSections(parseMarkdownToEditableSections(originalAiMarkdown));
    setHasUnsavedChanges(true);
  };

  const totalWords = countWords(
    editorTab === 'pages' ? serializeSectionsToMarkdown(sections) : fullMarkdown
  );

  return (
    <div
      className={`rounded-sm bg-white border border-[#E0D7CC] shadow-sm flex flex-col overflow-hidden ${
        isModal ? 'h-full max-h-[88vh]' : 'my-4'
      }`}
    >
      {/* Editor Header Bar */}
      <div className="p-3.5 bg-[#FAF7F2] border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4A3F35] text-white flex items-center justify-center">
            <Pencil className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif italic font-bold text-base text-[#4A3F35]">
                Edit Reading Content
              </h3>
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
              Customize any page or paragraph. Changes immediately sync to the Illuminated view and PDF export.
            </p>
          </div>
        </div>

        {/* Editor Mode Tabs & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#F2EDE8] p-0.5 rounded-xs border border-[#E0D7CC] text-xs">
            <button
              onClick={() => handleTabChange('pages')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all ${
                editorTab === 'pages'
                  ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                  : 'text-[#8C7B6A] hover:text-[#4A3F35]'
              }`}
            >
              <Layers className="w-3 h-3" />
              Page-by-Page ({sections.length})
            </button>
            <button
              onClick={() => handleTabChange('full')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all ${
                editorTab === 'full'
                  ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                  : 'text-[#8C7B6A] hover:text-[#4A3F35]'
              }`}
            >
              <FileText className="w-3 h-3" />
              Full Markdown
            </button>
            <button
              onClick={() => handleTabChange('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all ${
                editorTab === 'split'
                  ? 'bg-[#4A3F35] text-[#FCFAF7] shadow-xs'
                  : 'text-[#8C7B6A] hover:text-[#4A3F35]'
              }`}
            >
              <Columns className="w-3 h-3" />
              Live Split
            </button>
          </div>

          {/* Reset to Original if available */}
          {originalAiMarkdown && (
            <button
              onClick={handleResetToOriginal}
              title="Reset reading back to initial AI output"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>

          {/* Primary Save Button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Save & Apply</span>
          </button>
        </div>
      </div>

      {/* Word Count & Formatting / Alignment Helper Bar */}
      <div className="px-4 py-2 bg-[#FAF8F3] border-b border-[#E0D7CC] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-[#8C7B6A]">
          <span className="font-mono text-[11px]">
            Total Words: <strong className="text-[#4A3F35]">{totalWords}</strong>
          </span>
          <span className="text-[#D8CEBE]">|</span>
          <span className="text-[11px] italic">
            Click Left, Center, Right, or Justify to align text cleanly without any technical HTML tags.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Clean All HTML Tags button (if legacy tags are detected) */}
          {hasRawHtmlTags && (
            <button
              type="button"
              onClick={handleCleanAllHtmlTags}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-semibold text-[11px] cursor-pointer transition-colors shadow-2xs animate-pulse"
              title="Click to remove all <div align='...'> tags and convert to clean text"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Clean HTML Tags</span>
            </button>
          )}

          {/* Text Alignment Group (Active across all tabs - visual alignment) */}
          {(() => {
            const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
            const currentAlignment = activeSection?.alignment || 'center';
            return (
              <div
                className="flex items-center gap-0.5 bg-white p-0.5 rounded border border-[#E0D7CC]"
                title="Simple Text Alignment: click to align cleanly without any code tags"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A] px-1.5 hidden sm:inline">
                  Align
                </span>
                <button
                  type="button"
                  onClick={() => handleTopToolbarAlign('left')}
                  title="Align Left (No HTML tags needed)"
                  className={`p-1 rounded cursor-pointer transition-colors ${
                    currentAlignment === 'left'
                      ? 'bg-[#BC6C25] text-white'
                      : 'hover:bg-[#F2EDE8] text-[#4A3F35]'
                  }`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTopToolbarAlign('center')}
                  title="Align Center (Default)"
                  className={`p-1 rounded cursor-pointer transition-colors ${
                    currentAlignment === 'center' || !currentAlignment
                      ? 'bg-[#BC6C25] text-white'
                      : 'hover:bg-[#F2EDE8] text-[#4A3F35]'
                  }`}
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTopToolbarAlign('right')}
                  title="Align Right (No HTML tags needed)"
                  className={`p-1 rounded cursor-pointer transition-colors ${
                    currentAlignment === 'right'
                      ? 'bg-[#BC6C25] text-white'
                      : 'hover:bg-[#F2EDE8] text-[#4A3F35]'
                  }`}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTopToolbarAlign('justify')}
                  title="Justify Text (No HTML tags needed)"
                  className={`p-1 rounded cursor-pointer transition-colors ${
                    currentAlignment === 'justify'
                      ? 'bg-[#BC6C25] text-white'
                      : 'hover:bg-[#F2EDE8] text-[#4A3F35]'
                  }`}
                >
                  <AlignJustify className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })()}

          {/* New Line & Break Group (Active across all editor tabs) */}
          <div className="flex items-center gap-0.5 bg-white p-0.5 rounded border border-[#E0D7CC]" title="Insert New Line or Break at cursor">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A] px-1.5 hidden sm:inline">
              Break
            </span>
            <button
              type="button"
              onClick={() => handleInsertNewLine('newline')}
              title="Insert New Line (↵ Break at cursor)"
              className="flex items-center gap-1 px-1.5 py-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35] text-[11px] font-medium cursor-pointer transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5 text-[#BC6C25]" />
              <span className="hidden md:inline">New Line</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsertNewLine('paragraph')}
              title="Insert New Paragraph (↵↵ Double line break)"
              className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35] cursor-pointer"
            >
              <Pilcrow className="w-3.5 h-3.5 text-[#4A3F35]" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertNewLine('br')}
              title="Insert HTML <br/> Break tag"
              className="px-1.5 py-0.5 hover:bg-[#F2EDE8] rounded text-[10px] font-mono font-semibold text-[#8C7B6A] hover:text-[#4A3F35] cursor-pointer"
            >
              &lt;br&gt;
            </button>
          </div>

          {(editorTab === 'full' || editorTab === 'split') && (
            <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-[#E0D7CC]">
              <button
                onClick={() => handleInsertToken('**', '**')}
                title="Bold"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleInsertToken('*', '*')}
                title="Italic"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleInsertToken('## ')}
                title="Heading 2"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <Heading2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleInsertToken('### ')}
                title="Heading 3"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <Heading3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleInsertToken('> ')}
                title="Blockquote"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleInsertToken('• ')}
                title="Bullet"
                className="p-1 hover:bg-[#F2EDE8] rounded text-[#4A3F35]"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor Body Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FCFAF7] min-h-[420px]">
        {/* TAB 1: Page-by-Page Cards Editor */}
        {editorTab === 'pages' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {sections.map((sec, index) => {
              const words = countWords(sec.content);
              const isCardArtPage = /visual|card\s+\d.*(keyword|visual|intro|artwork)/i.test(sec.title);
              const isWordLimitOk = isCardArtPage
                ? words >= 25 && words <= 60
                : words >= 55 && words <= 135;
              const isWordTooLong = isCardArtPage ? words > 70 : words > 145;
              const isWordTooShort = isCardArtPage
                ? words < 20
                : words < 50 && sec.pageNumber !== 1;

              return (
                <div
                  key={sec.id}
                  id={sec.id}
                  className={`rounded-sm bg-white border transition-all p-4 space-y-3 ${
                    activeSectionId === sec.id
                      ? 'border-[#BC6C25] shadow-md ring-1 ring-[#BC6C25]/20'
                      : 'border-[#E0D7CC] hover:border-[#C4B6A4]'
                  }`}
                  onClick={() => setActiveSectionId(sec.id)}
                >
                  {/* Card Header: Page Number + Title Input + Word Count */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F2EDE8]">
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <span className="shrink-0 px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#D8CEBE] text-[#4A3F35] text-[10px] font-bold uppercase tracking-wider font-mono">
                        {sec.pageNumber ? `Page ${sec.pageNumber}` : `Section ${index + 1}`}
                      </span>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => handleSectionTitleChange(sec.id, e.target.value)}
                        placeholder="Page / Section Title..."
                        className="flex-1 px-2.5 py-1 text-sm font-serif font-bold text-[#1F1914] bg-[#FAF7F2] border border-[#E0D7CC] rounded-xs focus:bg-white focus:outline-none focus:border-[#BC6C25]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Visual Alignment Toolbar for this specific Page (No HTML tags needed) */}
                      <div
                        className="flex items-center gap-0.5 bg-[#FAF7F2] p-0.5 rounded border border-[#E0D7CC]"
                        title="Click to align text visually (No HTML tags required)"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetSectionAlignment(sec.id, 'left');
                          }}
                          title="Align Left"
                          className={`p-1 rounded-xs transition-colors cursor-pointer ${
                            sec.alignment === 'left'
                              ? 'bg-[#BC6C25] text-white shadow-2xs font-semibold'
                              : 'hover:bg-white text-[#6B5E51] hover:text-[#1F1914]'
                          }`}
                        >
                          <AlignLeft className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetSectionAlignment(sec.id, 'center');
                          }}
                          title="Align Center (Default)"
                          className={`p-1 rounded-xs transition-colors cursor-pointer ${
                            sec.alignment === 'center' || !sec.alignment
                              ? 'bg-[#BC6C25] text-white shadow-2xs font-semibold'
                              : 'hover:bg-white text-[#6B5E51] hover:text-[#1F1914]'
                          }`}
                        >
                          <AlignCenter className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetSectionAlignment(sec.id, 'right');
                          }}
                          title="Align Right"
                          className={`p-1 rounded-xs transition-colors cursor-pointer ${
                            sec.alignment === 'right'
                              ? 'bg-[#BC6C25] text-white shadow-2xs font-semibold'
                              : 'hover:bg-white text-[#6B5E51] hover:text-[#1F1914]'
                          }`}
                        >
                          <AlignRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetSectionAlignment(sec.id, 'justify');
                          }}
                          title="Justify Text"
                          className={`p-1 rounded-xs transition-colors cursor-pointer ${
                            sec.alignment === 'justify'
                              ? 'bg-[#BC6C25] text-white shadow-2xs font-semibold'
                              : 'hover:bg-white text-[#6B5E51] hover:text-[#1F1914]'
                          }`}
                        >
                          <AlignJustify className="w-3 h-3" />
                        </button>

                        <div className="w-[1px] h-3 bg-[#E0D7CC] my-auto mx-0.5"></div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInsertNewLine('newline', sec.id);
                          }}
                          title="Insert New Line (↵ Break at cursor)"
                          className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-white rounded-xs text-[#6B5E51] hover:text-[#BC6C25] transition-colors cursor-pointer text-[10px] font-medium"
                        >
                          <CornerDownLeft className="w-3 h-3 text-[#BC6C25]" />
                          <span>New Line</span>
                        </button>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          isWordLimitOk
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isWordTooLong
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : isWordTooShort
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                        title={
                          isWordLimitOk
                            ? (isCardArtPage ? 'Ideal word count (30–50 words for Card Art page)' : 'Ideal word count (60–130 words)')
                            : isWordTooLong
                            ? (isCardArtPage ? 'Exceeds 30–50 words for Card Art page' : 'Exceeds 130 words. May overflow single PDF page with 20px font.')
                            : 'Shorter than recommended'
                        }
                      >
                        {words} words
                      </span>
                    </div>
                  </div>

                  {/* Card Content Textarea */}
                  <div className="space-y-1">
                    <textarea
                      id={`section-textarea-${sec.id}`}
                      value={sec.content}
                      onChange={(e) => handleSectionContentChange(sec.id, e.target.value)}
                      rows={Math.max(4, Math.min(10, Math.ceil(sec.content.length / 80)))}
                      placeholder="Write or edit the channeled text for this page..."
                      style={{
                        textAlign: sec.alignment || 'center',
                      }}
                      className={`w-full p-3 text-sm leading-relaxed text-[#1F1914] font-serif bg-[#FCFAF7] border border-[#E8E1D5] rounded-xs focus:bg-white focus:outline-none focus:border-[#BC6C25] resize-y transition-colors ${
                        sec.alignment === 'justify'
                          ? 'text-justify'
                          : sec.alignment === 'left'
                          ? 'text-left'
                          : sec.alignment === 'right'
                          ? 'text-right'
                          : 'text-center'
                      }`}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#8C7B6A] pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[#8C7B6A]">Quick break:</span>
                        <button
                          type="button"
                          onClick={() => handleInsertNewLine('newline', sec.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs font-sans text-[10px] font-medium"
                          title="Insert single new line break (\n) at cursor"
                        >
                          <CornerDownLeft className="w-2.5 h-2.5 text-[#BC6C25]" />
                          <span>↵ New Line</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertNewLine('paragraph', sec.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs font-sans text-[10px] font-medium"
                          title="Insert double line break (\n\n) for a new paragraph"
                        >
                          <Pilcrow className="w-2.5 h-2.5 text-[#4A3F35]" />
                          <span>¶ New Paragraph</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertNewLine('br', sec.id)}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs font-mono text-[9px]"
                          title="Insert HTML <br /> break tag"
                        >
                          <span>&lt;br /&gt;</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="capitalize text-[#8C7B6A]">
                          Alignment: <strong className="text-[#4A3F35]">{sec.alignment || 'center'}</strong>
                        </span>
                        <span className="text-emerald-700 font-medium">✓ Clean visual mode</span>
                      </div>

                      {isWordTooLong && (
                        <span className="text-rose-600 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" /> Exceeds 100 words (may cause PDF page overflow)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Full Document Raw Markdown Editor */}
        {editorTab === 'full' && (
          <div className="max-w-4xl mx-auto space-y-2">
            <textarea
              id="full-markdown-textarea"
              value={fullMarkdown}
              onChange={(e) => handleFullMarkdownChange(e.target.value)}
              rows={22}
              className="w-full p-4 text-xs font-mono text-[#2C2C2C] bg-white border border-[#E0D7CC] rounded-xs focus:outline-none focus:border-[#BC6C25] leading-relaxed whitespace-pre-wrap select-text resize-y shadow-inner"
              placeholder="Full markdown reading content..."
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8C7B6A] pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[#8C7B6A] text-[10px]">Insert Break at Cursor:</span>
                <button
                  type="button"
                  onClick={() => handleInsertNewLine('newline')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs text-[11px]"
                  title="Insert single new line break (\n) at cursor"
                >
                  <CornerDownLeft className="w-3 h-3 text-[#BC6C25]" />
                  <span>↵ New Line</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertNewLine('paragraph')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs text-[11px]"
                  title="Insert double line break (\n\n) for a new paragraph"
                >
                  <Pilcrow className="w-3 h-3" />
                  <span>¶ New Paragraph</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertNewLine('br')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors shadow-2xs text-[10px] font-mono"
                  title="Insert HTML <br /> line break tag"
                >
                  <span>&lt;br /&gt;</span>
                </button>
              </div>
              <span className="text-[10px] text-[#8C7B6A]">Enter or Shift+Enter inserts lines directly</span>
            </div>
          </div>
        )}

        {/* TAB 3: Live Split Editor + Preview */}
        {editorTab === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[500px]">
            <div className="flex flex-col h-full space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A]">
                  Markdown Source
                </span>
                <div className="flex items-center gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => handleInsertNewLine('newline')}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors text-[10px]"
                    title="Insert single new line break (\n)"
                  >
                    <CornerDownLeft className="w-2.5 h-2.5 text-[#BC6C25]" />
                    <span>↵ New Line</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertNewLine('paragraph')}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors text-[10px]"
                    title="Insert double line break (\n\n)"
                  >
                    <Pilcrow className="w-2.5 h-2.5" />
                    <span>¶ Paragraph</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertNewLine('br')}
                    className="inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-[#E0D7CC] text-[#4A3F35] hover:border-[#BC6C25] hover:text-[#BC6C25] cursor-pointer transition-colors text-[9px] font-mono"
                    title="Insert HTML <br /> tag"
                  >
                    <span>&lt;br/&gt;</span>
                  </button>
                </div>
              </div>
              <textarea
                id="full-markdown-textarea"
                value={fullMarkdown}
                onChange={(e) => handleFullMarkdownChange(e.target.value)}
                className="flex-1 w-full p-3 text-xs font-mono text-[#2C2C2C] bg-white border border-[#E0D7CC] rounded-xs focus:outline-none focus:border-[#BC6C25] leading-relaxed resize-none shadow-inner"
              />
            </div>
            <div className="flex flex-col h-full space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6A]">
                Live Rendered Preview
              </span>
              <div className="flex-1 p-4 bg-white border border-[#E0D7CC] rounded-xs overflow-y-auto reading-content text-sm shadow-inner">
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
                      return <p className={`${className || ''} ${alignClass} whitespace-pre-line`} {...props} />;
                    },
                  }}
                >
                  {fullMarkdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer Bar */}
      <div className="p-3 bg-[#FAF7F2] border-t border-[#E0D7CC] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs text-[#8C7B6A]">
          {hasUnsavedChanges ? (
            <span className="text-amber-700 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              You have unsaved changes. Click &ldquo;Save & Apply&rdquo; to update your reading.
            </span>
          ) : (
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              All changes applied to reading & PDF preview.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xs bg-white hover:bg-[#F2EDE8] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Save & Apply Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
