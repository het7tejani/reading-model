import React, { useMemo, useState } from 'react';
import { Calendar, Wand2, Sparkles, Search, RotateCcw, Check, Sliders, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { ReadingInputs, CategoryCustomData } from '../types';
import { calculateLifePath } from '../utils/numerology';
import { TarotCardPicker } from './TarotCardPicker';
import { READING_TOPICS, ReadingTopic, getTopicByTitleOrId } from '../data/readingTopics';
import { getCategorySpecByTopic, CategorySpec } from '../data/categoryConfig';

interface QuerentIntakeFormProps {
  inputs: ReadingInputs;
  onUpdateInputs: (updated: Partial<ReadingInputs>) => void;
  onGenerateReading: () => void;
  onClearForm?: () => void;
  isLoading: boolean;
}

export const QuerentIntakeForm: React.FC<QuerentIntakeFormProps> = ({
  inputs,
  onUpdateInputs,
  onGenerateReading,
  onClearForm,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const numerology = useMemo(() => {
    return calculateLifePath(inputs.dob);
  }, [inputs.dob]);

  const currentTopicObj = useMemo(() => {
    return getTopicByTitleOrId(inputs.topic);
  }, [inputs.topic]);

  const categorySpec: CategorySpec = useMemo(() => {
    return getCategorySpecByTopic(currentTopicObj?.id || inputs.topic || 1);
  }, [currentTopicObj, inputs.topic]);

  const filteredTopics = useMemo(() => {
    return READING_TOPICS.filter((topic) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.headline.toLowerCase().includes(q) ||
        String(topic.id) === q
      );
    });
  }, [searchQuery]);

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

  const isFormValid =
    inputs.name.trim() !== '' &&
    inputs.age.trim() !== '' &&
    inputs.dob.trim() !== '' &&
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
          <span>Choose from 32 specialized reading categories with custom tailored parameters</span>
        </div>
        {onClearForm && (
          <button
            type="button"
            onClick={onClearForm}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors py-1 px-2 rounded-xs hover:bg-[#E0D7CC]/40"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All Fields
          </button>
        )}
      </div>

      {/* 01. Querent Identity Section */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              01
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Querent Identity & Birth Blueprint
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Calculates life path vibrational coordinate
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#8C7B6A] font-mono hidden sm:inline">
            Coordinates
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* DOB */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>DOB (MM/DD/YYYY) *</span>
              <span className="text-[9px] text-[#D4A373] font-mono">Life Path</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="MM/DD/YYYY (e.g. 05/12/1988)"
                value={inputs.dob}
                onChange={(e) => onUpdateInputs({ dob: e.target.value })}
                className="w-full pl-3.5 pr-9 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-mono transition-all"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B6A] pointer-events-none" />
            </div>
          </div>

          {/* Shop / Studio Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Shop / Studio Name</span>
              <span className="text-[9px] text-[#BC6C25] font-semibold">PDF Header</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Daisy Medium Studio"
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
          inputs.dob.length > 3 && (
            <p className="text-[11px] text-[#8C7B6A] italic">
              Enter DOB in format MM/DD/YYYY (e.g. 05/12/1988) to calculate Life Path energy.
            </p>
          )
        )}
      </div>

      {/* 02. Reading Topic (32 Options: Title & Main Headline in One Block) */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              02
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Reading Topic & Main Headline (32 Options) *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Select an option block below to calibrate the reading
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7B6A]" />
          <input
            type="text"
            placeholder="Search 32 topics by name or headline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35]"
          />
        </div>

        {/* 32 Topic Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-84 overflow-y-auto pr-1 border border-[#E0D7CC] p-2.5 rounded-xs bg-[#FCFAF7]">
          {filteredTopics.map((topic) => {
            const isSelected = currentTopicObj?.id === topic.id;
            return (
              <button
                type="button"
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`p-3 rounded-xs text-left border transition-all flex flex-col justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A3F35] text-[#FCFAF7] border-[#4A3F35] shadow-xs'
                    : 'bg-white border-[#E0D7CC] text-[#2C2C2C] hover:border-[#BC6C25] hover:bg-[#F2EDE8]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#4A3F35]'}`}>
                    {topic.title}
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  )}
                </div>

                <div
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-[#D4A373]' : 'text-[#BC6C25]'
                  }`}
                >
                  {topic.headline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Below */}
        {currentTopicObj ? (
          <div className="p-4 rounded-xs bg-[#F2EDE8] border-2 border-[#BC6C25]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7B6A]">
                Selected Option:
              </div>
              <div className="text-xs font-bold text-[#4A3F35]">
                {currentTopicObj.title}
              </div>
              <div className="text-xs font-mono font-bold text-[#BC6C25] tracking-wide">
                {currentTopicObj.headline}
              </div>
              <p className="text-[11px] text-[#6B5E51] font-sans">
                {categorySpec.description}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-white border border-[#E0D7CC] text-[10px] text-emerald-800 font-bold font-mono self-start sm:self-center">
              <Check className="w-3 h-3 text-emerald-600" />
              Selected
            </span>
          </div>
        ) : (
          <div className="p-3 bg-[#FCFAF7] border border-dashed border-[#BC6C25]/40 rounded-xs text-xs text-[#BC6C25] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Please click on an option above to select your reading topic.</span>
          </div>
        )}

        {/* Current Problem Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest">
              Current Problem / Situation Context {isBlindReading ? '(Optional for Blind Reading)' : '*'}
            </label>
            {categorySpec?.suggestedProblem && (
              <button
                type="button"
                onClick={() => onUpdateInputs({ problem: categorySpec.suggestedProblem })}
                className="text-[10px] text-[#BC6C25] hover:text-[#8C7B6A] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Use Category Focus</span>
              </button>
            )}
          </div>
          <textarea
            required={!isBlindReading}
            rows={3}
            placeholder={
              isBlindReading
                ? "Blind Reading: Name and birthdate only (Optional notes)..."
                : "Enter the specific situation or problem..."
            }
            value={inputs.problem}
            onChange={(e) => onUpdateInputs({ problem: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 resize-y font-sans transition-all"
          />
        </div>

        {/* Sacred Question */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest">
              Sacred Question to the Oracle {isBlindReading ? '(Optional for Blind Reading)' : '*'}
            </label>
            <span className="text-[10px] text-[#8C7B6A] font-normal lowercase italic">select or customize</span>
          </div>
          <input
            type="text"
            required={!isBlindReading}
            placeholder={
              isBlindReading
                ? "Blind Reading: (Optional question)..."
                : "Enter your question for the oracle..."
            }
            value={inputs.question}
            onChange={(e) => onUpdateInputs({ question: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-sans transition-all font-medium text-[#4A3F35]"
          />

          {/* Quick Category Question Selector Chips */}
          {categorySpec?.suggestedQuestions && categorySpec.suggestedQuestions.length > 0 && !isBlindReading && (
            <div className="pt-1.5 space-y-1.5">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#8C7B6A] flex items-center gap-1">
                <span>✦ Suggested Questions for {categorySpec.title}:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categorySpec.suggestedQuestions.map((q, idx) => {
                  const isSelected = inputs.question.trim().toLowerCase() === q.trim().toLowerCase();
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onUpdateInputs({ question: q })}
                      className={`text-left text-[11px] px-2.5 py-1.5 rounded-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A3F35] text-white border-[#4A3F35] font-semibold shadow-xs'
                          : 'bg-[#FCFAF7] border-[#E0D7CC] text-[#6B5E51] hover:border-[#BC6C25] hover:bg-[#F2EDE8] hover:text-[#4A3F35]'
                      }`}
                    >
                      {isSelected ? '✓ ' : ''}{q}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 02.5 DYNAMIC CATEGORY-SPECIFIC PROPERTIES & INQUIRY FIELDS */}
      {categorySpec && categorySpec.customFields.length > 0 && (
        <div className="p-6 md:p-7 bg-white border-2 border-[#BC6C25]/30 rounded-sm shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-[#BC6C25] flex items-center justify-center text-xs font-serif italic text-[#BC6C25] bg-[#F2EDE8]">
                ✦
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                  {categorySpec.title}: Custom Parameters & Inquiries
                </h3>
                <p className="text-[11px] text-[#8C7B6A] font-medium">
                  {categorySpec.pdfSectionTitle}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#BC6C25] font-mono px-2 py-0.5 bg-[#F2EDE8] border border-[#BC6C25]/30 rounded-xs">
              Category Adaptations
            </span>
          </div>

          <div className="space-y-4">
            {categorySpec.customFields.map((field) => {
              if (field.type === 'list') {
                const currentList: string[] =
                  (categoryData[field.key as keyof CategoryCustomData] as string[]) ||
                  field.defaultItems ||
                  [];

                const handleListItemChange = (index: number, val: string) => {
                  const updated = [...currentList];
                  updated[index] = val;
                  handleUpdateCategoryData(field.key as keyof CategoryCustomData, updated);
                };

                const handleAddListItem = () => {
                  if (field.maxItems && currentList.length >= field.maxItems) return;
                  const updated = [...currentList, `${currentList.length + 1}. Enter your custom question or focus`];
                  handleUpdateCategoryData(field.key as keyof CategoryCustomData, updated);
                };

                const handleResetDefaults = () => {
                  if (field.defaultItems) {
                    handleUpdateCategoryData(field.key as keyof CategoryCustomData, [...field.defaultItems]);
                  }
                };

                return (
                  <div key={field.key} className="space-y-3 bg-[#FCFAF7] p-4 border border-[#E0D7CC] rounded-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold text-[#4A3F35] uppercase tracking-wider">
                        {field.label} ({currentList.length} items)
                      </label>
                      <div className="flex items-center gap-2">
                        {field.defaultItems && (
                          <button
                            type="button"
                            onClick={handleResetDefaults}
                            className="text-[10px] text-[#8C7B6A] hover:text-[#4A3F35] underline cursor-pointer"
                          >
                            Reset to Defaults
                          </button>
                        )}
                        {(!field.maxItems || currentList.length < field.maxItems) && (
                          <button
                            type="button"
                            onClick={handleAddListItem}
                            className="flex items-center gap-1 text-[10px] font-bold text-[#BC6C25] hover:text-[#8C7B6A] bg-white border border-[#E0D7CC] px-2 py-0.5 rounded-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Item
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {currentList.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#F2EDE8] border border-[#E0D7CC] text-[11px] font-mono font-bold text-[#4A3F35] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleListItemChange(idx, e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] font-sans"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

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

      {/* 03. Three-Card Sacred Spread */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              03
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Three-Card Energy Spread *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Current Energy • The Blockage • Path Forward
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
            Generates a 100% bespoke, non-templated synthesis adapted for {categorySpec.title} with custom layout and exact parameters.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`px-7 py-3 rounded-xs font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 ${
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
