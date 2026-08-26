import React, { useMemo, useState, useEffect } from 'react';
import { Calendar, Wand2, Sparkles, Search, RotateCcw, Check, Sliders, HelpCircle, Plus, Trash2, Layers, Compass, Star, Moon } from 'lucide-react';
import { ReadingInputs, ReadingTier, CategoryCustomData } from '../types';
import { calculateLifePath } from '../utils/numerology';
import { TarotCardPicker } from './TarotCardPicker';
import { ReadingTopic, getTopicByTitleOrId } from '../data/readingTopics';
import { getCategorySpecByTopic, CategorySpec } from '../data/categoryConfig';
import { getAllMergedReadingTopics, CATEGORIES_UPDATED_EVENT } from '../utils/categoryStorage';
import { ZODIAC_PROFILES, getZodiacProfile, getZodiacFromDob } from '../utils/astrology';

interface QuerentIntakeFormProps {
  inputs: ReadingInputs;
  onUpdateInputs: (updated: Partial<ReadingInputs>) => void;
  onGenerateReading: () => void;
  onClearForm?: () => void;
  onOpenCategories?: () => void;
  isLoading: boolean;
}

export const QuerentIntakeForm: React.FC<QuerentIntakeFormProps> = ({
  inputs,
  onUpdateInputs,
  onGenerateReading,
  onClearForm,
  onOpenCategories,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableTopics, setAvailableTopics] = useState<ReadingTopic[]>(() => getAllMergedReadingTopics());

  useEffect(() => {
    const handleUpdate = () => {
      setAvailableTopics(getAllMergedReadingTopics());
    };
    window.addEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);

  const numerology = useMemo(() => {
    return hasDob ? calculateLifePath(inputs.dob) : null;
  }, [inputs.dob, hasDob]);

  const currentTopicObj = useMemo(() => {
    return getTopicByTitleOrId(inputs.topic);
  }, [inputs.topic]);

  const categorySpec: CategorySpec = useMemo(() => {
    return getCategorySpecByTopic(currentTopicObj?.id || inputs.topic || 1);
  }, [currentTopicObj, inputs.topic]);

  const activeTier: ReadingTier = inputs.tier || 'detailed';

  const filteredTopics = useMemo(() => {
    return availableTopics.filter((topic) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.headline.toLowerCase().includes(q) ||
        String(topic.id) === q
      );
    });
  }, [availableTopics, searchQuery]);

  const isBlindReading = categorySpec.categoryType === 'blind_reading';

  const categoryData: CategoryCustomData = useMemo(() => {
    return inputs.categoryData || {};
  }, [inputs.categoryData]);

  const handleUpdateCategoryData = (fieldKey: keyof CategoryCustomData, value: any) => {
    const updated = {
      ...(inputs.categoryData || {}),
      [fieldKey]: value,
    };
    onUpdateInputs({ categoryData: updated });
  };

  const handleSelectTopic = (topic: ReadingTopic) => {
    const spec = getCategorySpecByTopic(topic.id);
    const initialCategoryData: CategoryCustomData = { ...(inputs.categoryData || {}) };

    // Pre-populate list defaults if not present
    spec.customFields.forEach((field) => {
      if (field.type === 'list' && field.defaultItems) {
        if (!initialCategoryData[field.key as keyof CategoryCustomData]) {
          (initialCategoryData as any)[field.key] = [...field.defaultItems];
        }
      }
    });

    const isCurrentProblemEmptyOrAuto = !inputs.problem.trim() || inputs.problem.startsWith('Navigating') || inputs.problem.startsWith('Seeking') || inputs.problem.startsWith('Feeling') || inputs.problem.startsWith('Tired') || inputs.problem.startsWith('Sensing') || inputs.problem.startsWith('Unsure') || inputs.problem.startsWith('Caught') || inputs.problem.startsWith('Experiencing') || inputs.problem.startsWith('Anticipating') || inputs.problem.startsWith('Desiring') || inputs.problem.startsWith('Pure');
    const isCurrentQuestionEmptyOrAuto = !inputs.question.trim() || inputs.question.startsWith('What is the true') || inputs.question.startsWith('What are their') || inputs.question.startsWith('Where is this') || inputs.question.startsWith('Will they') || inputs.question.startsWith('What is the exact') || inputs.question.startsWith('What are the major') || inputs.question.startsWith('What are the 8') || inputs.question.startsWith('What is the highest') || inputs.question.startsWith('What is my true') || inputs.question.startsWith('What does the universe') || inputs.question.startsWith('What is the brutal') || inputs.question.startsWith('What are the 3') || inputs.question.startsWith('Who are my primary') || inputs.question.startsWith('What past life') || inputs.question.startsWith('What or who') || inputs.question.startsWith('What is my pet') || inputs.question.startsWith('Where is my lost') || inputs.question.startsWith('What are the in-depth') || inputs.question.startsWith('What spiritual blockage') || inputs.question.startsWith('What subconscious or energetic') || inputs.question.startsWith('What emotional barrier') || inputs.question.startsWith('What is the karmic') || inputs.question.startsWith('What was the higher') || inputs.question.startsWith('What are the exact words') || inputs.question.startsWith('What is their true') || inputs.question.startsWith('What critical truth') || inputs.question.startsWith('How can I permanently sever') || inputs.question.startsWith('What comprehensive soul') || inputs.question.startsWith('What psychic visions') || inputs.question.startsWith('What is the prophetic') || inputs.question.startsWith('What secret feelings') || inputs.question.startsWith('What is the complete psychic');

    onUpdateInputs({
      topic: topic.title,
      problem: isCurrentProblemEmptyOrAuto && spec.suggestedProblem ? spec.suggestedProblem : inputs.problem,
      question: isCurrentQuestionEmptyOrAuto && spec.suggestedQuestion ? spec.suggestedQuestion : inputs.question,
      categoryData: initialCategoryData,
    });
  };

  // Auto-detect zodiac from DOB if DOB changes and zodiac is not manually locked
  const handleDobChange = (newDob: string) => {
    const detectedZodiac = getZodiacFromDob(newDob);
    onUpdateInputs({
      dob: newDob,
      zodiacSign: detectedZodiac?.name || inputs.zodiacSign || 'Aries',
    });
  };

  const isFormValid =
    inputs.name.trim() !== '' &&
    inputs.age.trim() !== '' &&
    inputs.topic.trim() !== '' &&
    (isBlindReading || (inputs.problem.trim() !== '' && inputs.question.trim() !== '')) &&
    inputs.cards[0] !== null &&
    inputs.cards[1] !== null &&
    inputs.cards[2] !== null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid && !isLoading) {
          onGenerateReading();
        }
      }}
      className="space-y-6"
    >
      {/* Top Action / Reset Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs text-[#8C7B6A]">
          <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
          <span>Professional Tarot Reading Studio · 3-Tier PDF Engine (Standard, Detailed, Premium)</span>
        </div>
        {onClearForm && (
          <button
            type="button"
            onClick={onClearForm}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors py-1 px-2 rounded-xs hover:bg-[#E0D7CC]/40 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All Fields
          </button>
        )}
      </div>

      {/* 01. PDF Tier Selection */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              01
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                PDF Generation Tier & Page Volume *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Choose the PDF depth and structure (Standard 15-18p, Detailed 25-28p, Premium 32+p)
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#BC6C25] font-mono font-bold">
            3 Tier Options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Standard Tier */}
          <button
            type="button"
            onClick={() => onUpdateInputs({ tier: 'standard' })}
            className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeTier === 'standard'
                ? 'bg-[#FAF7EE] border-[#4A3F35] ring-2 ring-[#4A3F35]/20 shadow-xs'
                : 'bg-[#FCFAF7] border-[#E0D7CC] hover:border-[#8C7B6A]'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#BC6C25]" />
                  <h3 className="font-serif font-bold text-sm text-[#1F1914]">Standard Edition</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E0D7CC]/60 text-[#4A3F35]">
                  {hasDob ? '17 Pages' : '16 Pages'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] leading-relaxed">
                Core 3-card spread artwork & deep analysis, unified breakthrough synthesis, 3-inquiry concise Q&A, and practical action plan.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-medium text-[#8C7B6A]">
              <span>15–18 Page Target</span>
              {activeTier === 'standard' && <Check className="w-4 h-4 text-[#BC6C25]" />}
            </div>
          </button>

          {/* Detailed Tier */}
          <button
            type="button"
            onClick={() => onUpdateInputs({ tier: 'detailed' })}
            className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeTier === 'detailed'
                ? 'bg-[#FAF7EE] border-[#4A3F35] ring-2 ring-[#4A3F35]/20 shadow-xs'
                : 'bg-[#FCFAF7] border-[#E0D7CC] hover:border-[#8C7B6A]'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#BC6C25]" />
                  <h3 className="font-serif font-bold text-sm text-[#1F1914]">Detailed Edition</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#BC6C25] text-white">
                  {hasDob ? '27 Pages' : '26 Pages'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] leading-relaxed">
                Full 3-card spread, celestial astrology synergy, 2-part synthesis, 6 deep-dive pages (3 inquiries × 2 pages), 4-phase protocol & complete prescription.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-medium text-[#8C7B6A]">
              <span>25–28 Page Target</span>
              {activeTier === 'detailed' && <Check className="w-4 h-4 text-[#BC6C25]" />}
            </div>
          </button>

          {/* Premium Tier */}
          <button
            type="button"
            onClick={() => onUpdateInputs({ tier: 'premium' })}
            className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeTier === 'premium'
                ? 'bg-[#FAF7EE] border-[#4A3F35] ring-2 ring-[#4A3F35]/20 shadow-xs'
                : 'bg-[#FCFAF7] border-[#E0D7CC] hover:border-[#8C7B6A]'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#BC6C25]" />
                  <h3 className="font-serif font-bold text-sm text-[#1F1914]">Premium Edition</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#4A3F35] text-white">
                  {hasDob ? '34+ Pages' : '33+ Pages'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] leading-relaxed">
                Masterclass edition with full 10-page inquiry deep-dives (or 12-month annual timeline), 4-week roadmap, somatic breathwork guide, and soul worksheets.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-medium text-[#8C7B6A]">
              <span>32+ Page Target</span>
              {activeTier === 'premium' && <Check className="w-4 h-4 text-[#BC6C25]" />}
            </div>
          </button>
        </div>
      </div>

      {/* 02. Querent Identity Section */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              02
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Querent Identity & Cosmic Coordinates
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Name, age, optional DOB (for Life Path calculation) and Zodiac sign
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#8C7B6A] font-mono hidden sm:inline">
            Identity
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Julianne Thorne"
              value={inputs.name}
              onChange={(e) => onUpdateInputs({ name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 transition-all font-sans"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
              Age *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 34"
              value={inputs.age}
              onChange={(e) => onUpdateInputs({ age: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 transition-all font-sans"
            />
          </div>

          {/* DOB (Optional) */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>DOB (Optional)</span>
              <span className="text-[9px] text-[#BC6C25] font-mono">Numerology</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/DD/YYYY (Optional)"
                value={inputs.dob}
                onChange={(e) => handleDobChange(e.target.value)}
                className="w-full pl-3.5 pr-9 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-mono transition-all"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B6A] pointer-events-none" />
            </div>
            <p className="text-[9px] text-[#8C7B6A] mt-1 italic">
              Leave blank to remove Numerology page
            </p>
          </div>

          {/* Zodiac Sign Selector */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Zodiac Sign</span>
              <span className="text-[9px] text-[#BC6C25] font-mono">Astrology</span>
            </label>
            <select
              value={inputs.zodiacSign || (hasDob ? getZodiacFromDob(inputs.dob)?.name || 'Aries' : 'Aries')}
              onChange={(e) => onUpdateInputs({ zodiacSign: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35] font-sans"
            >
              {Object.keys(ZODIAC_PROFILES).map((signKey) => {
                const z = ZODIAC_PROFILES[signKey];
                return (
                  <option key={signKey} value={signKey}>
                    {z.symbol} {z.name} ({z.element})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Shop / Studio Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Shop / Studio Name</span>
              <span className="text-[9px] text-[#BC6C25] font-semibold">PDF Header</span>
            </label>
            <input
              type="text"
              placeholder="Enter your shop / studio name"
              value={inputs.shopName || ''}
              onChange={(e) => onUpdateInputs({ shopName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 transition-all font-sans"
            />
          </div>
        </div>

        {/* Live Numerology Life Path Calculation Preview */}
        {numerology ? (
          <div className="p-3.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-[#4A3F35] bg-white text-[#4A3F35] font-serif italic font-bold flex items-center justify-center text-xs">
                  {numerology.lifePathNumber}
                </span>
                <span className="font-bold text-[#4A3F35] uppercase tracking-wide text-xs">
                  Life Path {numerology.lifePathNumber}: {numerology.coreEnergyTitle}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                  Numerology Page Active
                </span>
              </div>
              <p className="text-[#8C7B6A] font-mono text-[10px]">
                {numerology.mathBreakdown}
              </p>
            </div>
            <div className="text-[11px] text-[#5C554E] flex items-center gap-1 font-medium">
              <span>Governing: {numerology.governingPlanet}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xs bg-[#FAF8F3] border border-[#E0D7CC] flex items-center justify-between text-xs text-[#8C7B6A]">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#BC6C25]" />
              <span>
                No DOB entered — The PDF will seamlessly bypass the Numerology Calculation page and focus on Tarot & Astrology.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 03. Reading Topic (Options: Title & Main Headline in One Block) */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E0D7CC] gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              03
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Reading Topic & Specialized Modality *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Select from 32 distinct categories or use custom topics with tailored modules
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCategories && (
              <button
                type="button"
                onClick={onOpenCategories}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#FAF7EE] hover:bg-[#F2EDE8] border border-[#BC6C25]/40 text-xs font-bold text-[#BC6C25] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Customize / Add Categories</span>
              </button>
            )}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C7B6A]" />
              <input
                type="text"
                placeholder="Search 32 categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35]"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
          {filteredTopics.map((topic) => {
            const isSelected = inputs.topic === topic.title;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic)}
                className={`p-2.5 text-left rounded-xs border transition-all text-xs flex flex-col justify-between gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A3F35] text-[#FCFAF7] border-[#4A3F35] shadow-xs'
                    : 'bg-[#FCFAF7] text-[#2C2C2C] border-[#E0D7CC] hover:bg-[#F2EDE8] hover:border-[#8C7B6A]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[9px] font-mono ${isSelected ? 'text-[#D4A373]' : 'text-[#8C7B6A]'}`}>
                    #{topic.id < 10 ? `0${topic.id}` : topic.id}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#D4A373]" />}
                </div>
                <div>
                  <h4 className="font-serif font-bold line-clamp-1">{topic.title}</h4>
                  <p className={`text-[10px] line-clamp-1 italic ${isSelected ? 'text-[#FCFAF7]/80' : 'text-[#8C7B6A]'}`}>
                    {topic.headline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner */}
        <div className="p-3 bg-[#F2EDE8] rounded-xs border border-[#E0D7CC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#8C7B6A] uppercase tracking-wider">
              Active Category & Blueprint:
            </span>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm text-[#4A3F35]">{categorySpec.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white font-mono text-[#BC6C25] font-bold border border-[#E0D7CC]">
                {categorySpec.headline}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#5C554E] italic max-w-sm sm:text-right">
            {categorySpec.description}
          </p>
        </div>
      </div>

      {/* 04. Querent Problem & Direct Question */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              04
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Querent Situation & Direct Soul Inquiry *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                The specific crossroads and channeled question
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#8C7B6A] font-mono hidden sm:inline">
            Intake Inquiry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Specific Problem / Current Situation *</span>
              {categorySpec.suggestedProblem && (
                <button
                  type="button"
                  onClick={() => onUpdateInputs({ problem: categorySpec.suggestedProblem })}
                  className="text-[10px] text-[#BC6C25] hover:underline cursor-pointer"
                >
                  Insert Default
                </button>
              )}
            </label>
            <textarea
              required={!isBlindReading}
              rows={3}
              placeholder="e.g. Navigating mixed signals, emotional silence, and wondering if this connection has a mutual future."
              value={inputs.problem}
              onChange={(e) => onUpdateInputs({ problem: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] resize-y font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Direct Soul Question *</span>
              {categorySpec.suggestedQuestion && (
                <button
                  type="button"
                  onClick={() => onUpdateInputs({ question: categorySpec.suggestedQuestion })}
                  className="text-[10px] text-[#BC6C25] hover:underline cursor-pointer"
                >
                  Insert Default
                </button>
              )}
            </label>
            <textarea
              required={!isBlindReading}
              rows={3}
              placeholder="e.g. What is the true trajectory of our emotional connection and what action should I take?"
              value={inputs.question}
              onChange={(e) => onUpdateInputs({ question: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] resize-y font-sans"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Category Custom Fields (If Any) */}
      {categorySpec.customFields && categorySpec.customFields.length > 0 && (
        <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                  {categorySpec.title} Custom Parameters
                </h2>
                <p className="text-[11px] text-[#8C7B6A] font-medium">
                  Tailored inputs specific to {categorySpec.title}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#BC6C25] font-mono">
              Custom Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorySpec.customFields.map((field) => {
              if (field.type === 'textarea') {
                const val = (categoryData[field.key as keyof CategoryCustomData] as string) || '';
                return (
                  <div key={field.key}>
                    <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
                      <span>{field.label} {field.required ? '*' : ''}</span>
                      {field.helpText && <span className="text-[10px] text-[#8C7B6A] font-normal italic">{field.helpText}</span>}
                    </label>
                    <textarea
                      required={field.required}
                      rows={3}
                      placeholder={field.placeholder}
                      value={val}
                      onChange={(e) => handleUpdateCategoryData(field.key as keyof CategoryCustomData, e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] resize-y font-sans"
                    />
                  </div>
                );
              }

              // Text input default
              const val = (categoryData[field.key as keyof CategoryCustomData] as string) || '';
              return (
                <div key={field.key}>
                  <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
                    <span>{field.label} {field.required ? '*' : ''}</span>
                    {field.helpText && <span className="text-[10px] text-[#8C7B6A] font-normal italic">{field.helpText}</span>}
                  </label>
                  <input
                    type="text"
                    required={field.required}
                    placeholder={field.placeholder}
                    value={val}
                    onChange={(e) => handleUpdateCategoryData(field.key as keyof CategoryCustomData, e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] font-sans"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 05. Three-Card Sacred Spread */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              05
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Three-Card Energy Spread *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Card 1 (Current Energy) • Card 2 (The Blockage) • Card 3 (Path Forward)
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#8C7B6A] font-mono hidden sm:inline">
            Oracle Spread
          </span>
        </div>

        <TarotCardPicker
          cards={inputs.cards}
          onUpdateCards={(cards) => onUpdateInputs({ cards })}
        />
      </div>

      {/* Generate Reading Action Bar */}
      <div className="p-5 md:p-6 rounded-sm bg-[#F2EDE8] border border-[#E0D7CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
            {currentTopicObj ? `Ready for "${currentTopicObj.headline}"` : 'Ready for Sacred Oracle Reading'}
          </h4>
          <p className="text-xs text-[#5C554E]">
            Generates a bespoke transmission adapted for {categorySpec.title} in {activeTier.toUpperCase()} edition ({hasDob ? 'with' : 'without'} Numerology).
          </p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`px-7 py-3 rounded-xs font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer ${
            isFormValid && !isLoading
              ? 'bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] cursor-pointer'
              : 'bg-[#E0D7CC] text-[#8C7B6A] cursor-not-allowed border border-[#E0D7CC]'
          }`}
        >
          {isLoading ? (
            <>
              <Wand2 className="w-3.5 h-3.5 animate-spin text-[#FCFAF7]" />
              Channeling Oracle Reading...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              Generate Reading
            </>
          )}
        </button>
      </div>
    </form>
  );
};
