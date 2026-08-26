import React, { useMemo, useState, useEffect } from 'react';
import {
  Calendar,
  Wand2,
  Sparkles,
  Search,
  RotateCcw,
  Check,
  Sliders,
  HelpCircle,
  Plus,
  Trash2,
  Layers,
  Compass,
  Star,
  Moon,
  FileText,
  Copy,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Store,
  Tag
} from 'lucide-react';
import { ReadingInputs, ReadingTier, CategoryCustomData, TarotCard } from '../types';
import { calculateLifePath } from '../utils/numerology';
import { TarotCardPicker } from './TarotCardPicker';
import { ReadingTopic, cleanTopicTitle, getTopicByTitleOrId } from '../data/readingTopics';
import { getCategorySpecByTopic, CategorySpec } from '../data/categoryConfig';
import { ZODIAC_PROFILES, getZodiacProfile, getZodiacFromDob } from '../utils/astrology';
import { parseClientParagraph, autoDrawSacredCards } from '../utils/clientDataParser';
import { TAROT_DECK } from '../data/tarotCards';

interface QuerentIntakeFormProps {
  inputs: ReadingInputs;
  onUpdateInputs: (updated: Partial<ReadingInputs>) => void;
  onGenerateReading: () => void;
  onClearForm?: () => void;
  onOpenCategories?: () => void;
  isLoading: boolean;
}

const SAMPLE_CLIENT_WITH_DOB = `Name - Julianne Thorne, DOB - 04/18/1991, Age - 33, Problem - Feeling unfulfilled in my 10-year corporate legal career and deeply longing to open a holistic wellness retreat, Question - Is this the aligned season to transition, and what hidden obstacles must I overcome?, Shop - Sacred Soul Sanctuary`;

const SAMPLE_CLIENT_NO_DOB = `Name: Marcus Vance, Age: 42, Problem: Facing an intense partnership dispute in my architectural firm where creative control is being compromised, Question: How should I navigate this contract negotiation to protect my integrity and financial peace?, Shop: Vance Mystic Oracle`;

export const QuerentIntakeForm: React.FC<QuerentIntakeFormProps> = ({
  inputs,
  onUpdateInputs,
  onGenerateReading,
  onClearForm,
  onOpenCategories,
  isLoading,
}) => {
  // State for raw single paragraph text
  const [paragraphText, setParagraphText] = useState<string>(() => {
    if (inputs.name || inputs.problem || inputs.question) {
      const parts = [];
      if (inputs.name) parts.push(`Name - ${inputs.name}`);
      if (inputs.dob) parts.push(`DOB - ${inputs.dob}`);
      if (inputs.age) parts.push(`Age - ${inputs.age}`);
      if (inputs.problem) parts.push(`Problem - ${inputs.problem}`);
      if (inputs.question) parts.push(`Question - ${inputs.question}`);
      return parts.join(', ');
    }
    return '';
  });

  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const activeTier: ReadingTier = inputs.tier || 'detailed';
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);

  const numerology = useMemo(() => {
    return hasDob ? calculateLifePath(inputs.dob) : null;
  }, [inputs.dob, hasDob]);

  const safeTopic = inputs.topic?.trim() || 'Life Direction & Sacred Breakthrough';
  const categorySpec: CategorySpec = useMemo(() => {
    return getCategorySpecByTopic(inputs.topic || 1);
  }, [inputs.topic]);

  // Real-time synchronization when paragraph text changes
  const handleParagraphChange = (text: string) => {
    setParagraphText(text);
    const parsed = parseClientParagraph(text);

    const updatePayload: Partial<ReadingInputs> = {};
    if (parsed.name) updatePayload.name = parsed.name;
    if (parsed.age) updatePayload.age = parsed.age;
    
    // Explicitly update DOB (can be empty string if user removed it)
    updatePayload.dob = parsed.dob;

    if (parsed.problem) updatePayload.problem = parsed.problem;
    if (parsed.question) updatePayload.question = parsed.question;
    if (parsed.topic && !inputs.topic) updatePayload.topic = parsed.topic;
    if (parsed.shopName) {
      updatePayload.shopName = parsed.shopName;
      try {
        localStorage.setItem('user_tarot_shop_name', parsed.shopName);
      } catch (e) {}
    }

    if (parsed.dob) {
      const detectedZodiac = getZodiacFromDob(parsed.dob);
      if (detectedZodiac) {
        updatePayload.zodiacSign = detectedZodiac.name;
      }
    }

    onUpdateInputs(updatePayload);
  };

  const handleUpdateShopName = (newShopName: string) => {
    onUpdateInputs({ shopName: newShopName });
    try {
      localStorage.setItem('user_tarot_shop_name', newShopName);
    } catch (e) {}
  };

  const handleApplySample = (sampleText: string, sampleTopic: string) => {
    setParagraphText(sampleText);
    const parsed = parseClientParagraph(sampleText);
    const drawn = autoDrawSacredCards(sampleTopic, parsed.problem);
    
    onUpdateInputs({
      name: parsed.name,
      dob: parsed.dob,
      age: parsed.age,
      problem: parsed.problem,
      question: parsed.question,
      topic: sampleTopic,
      shopName: parsed.shopName || inputs.shopName || 'Sacred Intuitive Studio',
      cards: drawn,
      zodiacSign: parsed.dob ? getZodiacFromDob(parsed.dob)?.name || 'Aries' : 'Aries',
    });
  };

  const handleAutoDrawCards = () => {
    const drawn = autoDrawSacredCards(inputs.topic || 'Life Purpose', inputs.problem || 'Path Forward');
    onUpdateInputs({ cards: drawn });
  };

  // Ensure 3 cards are drawn on initial mount and load saved shop name if available
  useEffect(() => {
    const updateInit: Partial<ReadingInputs> = {};
    if (!inputs.cards[0] && !inputs.cards[1] && !inputs.cards[2]) {
      updateInit.cards = autoDrawSacredCards(inputs.topic || 'General Reading', inputs.problem || '');
    }
    if (!inputs.shopName) {
      try {
        const savedShop = localStorage.getItem('user_tarot_shop_name');
        if (savedShop) {
          updateInit.shopName = savedShop;
        } else {
          updateInit.shopName = 'Sacred Intuitive Studio';
        }
      } catch (e) {}
    }
    if (Object.keys(updateInit).length > 0) {
      onUpdateInputs(updateInit);
    }
  }, []);

  const hasThreeCards = Boolean(inputs.cards[0] && inputs.cards[1] && inputs.cards[2]);

  const isFormValid =
    inputs.name.trim() !== '' &&
    inputs.topic.trim() !== '' &&
    hasThreeCards;

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
      {/* Top Action & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs text-[#8C7B6A]">
          <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
          <span className="font-medium">
            Universal Reading Studio · Direct Title & Single-Paragraph Intake · Auto PDF Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onClearForm && (
            <button
              type="button"
              onClick={() => {
                setParagraphText('');
                onClearForm();
              }}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors py-1 px-2.5 rounded-xs hover:bg-[#E0D7CC]/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
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
                Select PDF Edition & Page Depth *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Standard (16-18p), Detailed (26-28p), or Premium Masterclass (34+p)
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#BC6C25] font-mono font-bold">
            {activeTier.toUpperCase()} EDITION
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
                  {hasDob ? '17 Pages' : '16 Pages (No DOB)'}
                </span>
              </div>
              <p className="text-xs text-[#6B5E51] leading-relaxed">
                Concise high-impact blueprint: 3-card spread artwork & analysis, unified breakthrough synthesis, 3-inquiry Q&A, and practical action plan.
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
                  {hasDob ? '27 Pages' : '26 Pages (No DOB)'}
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
                  {hasDob ? '34+ Pages' : '33+ Pages (No DOB)'}
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

      {/* 02. Title / Topic & Shop Name Input */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              02
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Reading Title & Shop / Studio Branding *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Set the inquiry topic and customize your Shop / Brand name for the PDF covers & headers
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#BC6C25] font-mono font-bold">
            PDF Branding & Intelligence
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Reading Title / Topic */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-wider font-bold text-[#4A3F35] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
                Reading Title / Topic (Any Subject or Word) *
              </label>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Career Transition, Crypto Investment, Neighbor Dispute, Soulmate Reunion, Divorce, Real Estate..."
              value={inputs.topic}
              onChange={(e) => onUpdateInputs({ topic: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 transition-all font-semibold"
            />
            {/* Quick Instant Topic Suggestions */}
            <div className="flex items-center gap-1 flex-wrap text-xs pt-1">
              <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider mr-1">
                Topics:
              </span>
              {[
                'Career Transition',
                'Soulmate Reunion',
                'Financial Breakthrough',
                'Crypto & Investments',
                'Neighbor Dispute',
                'Legal & Court Clarity',
                'Health & Vitality',
                'Life Purpose',
              ].map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => onUpdateInputs({ topic: suggested })}
                  className={`px-2 py-0.5 rounded-full text-[10px] border transition-all cursor-pointer ${
                    inputs.topic.toLowerCase() === suggested.toLowerCase()
                      ? 'bg-[#4A3F35] text-white border-[#4A3F35]'
                      : 'bg-[#F2EDE8] text-[#4A3F35] border-[#E0D7CC] hover:bg-[#E0D7CC]/60'
                  }`}
                >
                  {suggested}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Shop / Studio Name Option */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-wider font-bold text-[#4A3F35] flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#BC6C25]" />
                Shop / Studio Name (PDF Front Cover & Headers)
              </label>
              <span className="text-[10px] text-[#8C7B6A] font-mono">Auto-saved</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Sacred Intuitive Studio, Celestial Tarot Co., Golden Feather Oracle..."
                value={inputs.shopName || ''}
                onChange={(e) => handleUpdateShopName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 transition-all font-semibold"
              />
            </div>
            {/* Quick Preset Shop Names */}
            <div className="flex items-center gap-1 flex-wrap text-xs pt-1">
              <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider mr-1">
                Presets:
              </span>
              {[
                'Sacred Intuitive Studio',
                'Celestial Tarot Sanctuary',
                'Golden Path Divination',
                'Soul Blueprint Oracle',
                'Solstice Mystic Arts',
              ].map((shopPreset) => (
                <button
                  key={shopPreset}
                  type="button"
                  onClick={() => handleUpdateShopName(shopPreset)}
                  className={`px-2 py-0.5 rounded-full text-[10px] border transition-all cursor-pointer ${
                    (inputs.shopName || '').toLowerCase() === shopPreset.toLowerCase()
                      ? 'bg-[#BC6C25] text-white border-[#BC6C25]'
                      : 'bg-[#FAF7EE] text-[#6B5E51] border-[#E8E1D5] hover:bg-[#F2EDE8]'
                  }`}
                >
                  {shopPreset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 03. Client Data in Single Paragraph */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E0D7CC] gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              03
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Client Data (Single Paragraph or Key-Value) *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Paste or write Name, DOB (optional), Age, Problem, Question, and Shop all in one single paragraph
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8C7B6A] font-bold">Try Sample:</span>
            <button
              type="button"
              onClick={() => handleApplySample(SAMPLE_CLIENT_WITH_DOB, 'Career Transition & Purpose')}
              className="px-2 py-1 rounded-xs bg-[#FAF7EE] hover:bg-[#F2EDE8] border border-[#BC6C25]/40 text-[10px] font-bold text-[#BC6C25] uppercase transition-colors cursor-pointer"
            >
              With DOB
            </button>
            <button
              type="button"
              onClick={() => handleApplySample(SAMPLE_CLIENT_NO_DOB, 'Business Partnership Negotiation')}
              className="px-2 py-1 rounded-xs bg-[#FAF7EE] hover:bg-[#F2EDE8] border border-[#8C7B6A]/40 text-[10px] font-bold text-[#4A3F35] uppercase transition-colors cursor-pointer"
            >
              No DOB (Auto-Eliminate Page)
            </button>
          </div>
        </div>

        {/* Textarea for single paragraph */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={4}
              value={paragraphText}
              onChange={(e) => handleParagraphChange(e.target.value)}
              placeholder="Paste or write client data in one single paragraph:&#10;Name - Sarah Jenkins, DOB - 14/05/1990, Age - 34, Problem - Feeling stuck in current career, Question - Should I launch my own creative studio?, Shop - Sarah's Tarot Studio&#10;(Note: If you omit DOB, the system automatically eliminates the Numerology page from the PDF!)"
              className="w-full p-4 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-sans leading-relaxed transition-all"
            />
          </div>

          {/* Real-Time Extraction Status Dashboard */}
          <div className="p-4 bg-[#F2EDE8] border border-[#E0D7CC] rounded-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E0D7CC] pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3F35] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#BC6C25]" />
                Live Extracted Coordinates
              </span>
              <button
                type="button"
                onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                className="text-[10px] text-[#8C7B6A] hover:text-[#4A3F35] font-semibold underline cursor-pointer"
              >
                {showAdvancedFields ? 'Hide Individual Controls' : 'Fine-Tune Individual Fields / Shop Name'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {/* Name badge */}
              <div className="p-2.5 bg-white rounded-xs border border-[#E0D7CC]">
                <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider block mb-0.5">
                  Client Name
                </span>
                <p className="font-serif font-bold text-sm text-[#1F1914] truncate">
                  {inputs.name || <span className="text-[#8C7B6A]/60 italic font-sans text-xs">Waiting for name...</span>}
                </p>
              </div>

              {/* Age badge */}
              <div className="p-2.5 bg-white rounded-xs border border-[#E0D7CC]">
                <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider block mb-0.5">
                  Age
                </span>
                <p className="font-sans font-bold text-sm text-[#1F1914]">
                  {inputs.age ? `${inputs.age} years old` : <span className="text-[#8C7B6A]/60 italic font-normal text-xs">Waiting for age...</span>}
                </p>
              </div>

              {/* Shop / Studio Name badge */}
              <div className="p-2.5 bg-white rounded-xs border border-[#BC6C25]/30 bg-[#FAF7EE]/50">
                <span className="text-[9px] font-bold text-[#BC6C25] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                  <Store className="w-2.5 h-2.5" />
                  PDF Shop Brand
                </span>
                <p className="font-serif font-bold text-xs text-[#4A3F35] truncate" title={inputs.shopName || 'Sacred Intuitive Studio'}>
                  {inputs.shopName || 'Sacred Intuitive Studio'}
                </p>
              </div>

              {/* DOB & Numerology Status (KEY REQUIREMENT: DYNAMIC NUMEROLOGY PAGE ELIMINATION) */}
              <div className={`p-2.5 rounded-xs border sm:col-span-2 ${
                hasDob ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900' : 'bg-amber-50/70 border-amber-300 text-amber-900'
              }`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Date of Birth & Numerology Page
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                    hasDob ? 'bg-emerald-200/80 text-emerald-900' : 'bg-amber-200/80 text-amber-900'
                  }`}>
                    {hasDob ? 'PAGE INCLUDED' : 'PAGE ELIMINATED ✂️'}
                  </span>
                </div>
                {hasDob && numerology ? (
                  <p className="text-xs font-medium">
                    DOB: <strong>{inputs.dob}</strong> ➔ Life Path <strong>{numerology.lifePathNumber}</strong> ({numerology.coreEnergyTitle})
                  </p>
                ) : (
                  <p className="text-[11px] text-amber-800 leading-tight">
                    No birthdate provided — The PDF generation engine will <strong>automatically eliminate the Numerology page</strong>, cleanly renumbering all remaining pages.
                  </p>
                )}
              </div>
            </div>

            {/* Extracted Problem & Question preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-2.5 bg-white rounded-xs border border-[#E0D7CC]">
                <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider block mb-0.5">
                  Extracted Situation / Problem
                </span>
                <p className="text-xs text-[#2C2C2C] line-clamp-2 italic">
                  {inputs.problem || <span className="text-[#8C7B6A]/60 not-italic">None detected (Will auto-synthesize from title)</span>}
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xs border border-[#E0D7CC]">
                <span className="text-[9px] font-bold text-[#8C7B6A] uppercase tracking-wider block mb-0.5">
                  Extracted Question / Inquiry
                </span>
                <p className="text-xs text-[#2C2C2C] line-clamp-2 italic">
                  {inputs.question || <span className="text-[#8C7B6A]/60 not-italic">None detected (Will auto-channel highest inquiry)</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Fine-Tune Controls */}
        {showAdvancedFields && (
          <div className="p-4 bg-[#FAF8F3] border border-[#E0D7CC] rounded-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A3F35]">
              Manual Field Adjustments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-[#8C7B6A] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={inputs.name}
                  onChange={(e) => onUpdateInputs({ name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[#8C7B6A] uppercase mb-1">Age</label>
                <input
                  type="text"
                  value={inputs.age}
                  onChange={(e) => onUpdateInputs({ age: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[#8C7B6A] uppercase mb-1">DOB (Leave blank to omit page)</label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={inputs.dob}
                  onChange={(e) => {
                    const val = e.target.value;
                    const detectedZodiac = getZodiacFromDob(val);
                    onUpdateInputs({
                      dob: val,
                      zodiacSign: detectedZodiac?.name || inputs.zodiacSign || 'Aries',
                    });
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[#8C7B6A] uppercase mb-1">Zodiac Sign</label>
                <select
                  value={inputs.zodiacSign || (hasDob ? getZodiacFromDob(inputs.dob)?.name || 'Aries' : 'Aries')}
                  onChange={(e) => onUpdateInputs({ zodiacSign: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs"
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
              <div>
                <label className="block text-[9px] font-bold text-[#8C7B6A] uppercase mb-1">Shop / Studio Name (Header)</label>
                <input
                  type="text"
                  placeholder="e.g. Sacred Intuitive Studio"
                  value={inputs.shopName || ''}
                  onChange={(e) => onUpdateInputs({ shopName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 04. Sacred 3-Card Spread Selection */}
      <div className="p-6 md:p-7 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E0D7CC] gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              04
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#4A3F35]">
                Sacred 3-Card Tarot Spread *
              </h2>
              <p className="text-[11px] text-[#8C7B6A] font-medium">
                Auto-drawn based on topic or manually customize cards
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutoDrawCards}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#4A3F35] text-white hover:bg-[#2C241E] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Auto-Draw 3 Cards</span>
          </button>
        </div>

        <TarotCardPicker
          cards={inputs.cards}
          onUpdateCards={(newCards) => onUpdateInputs({ cards: newCards })}
        />
      </div>

      {/* Big Action Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-4.5 px-6 rounded-sm font-serif font-bold text-base uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer ${
            isFormValid && !isLoading
              ? 'bg-[#1F1914] hover:bg-[#382E26] text-white ring-2 ring-[#BC6C25]/40 hover:ring-[#BC6C25]'
              : 'bg-[#C4B6A4]/40 text-[#8C7B6A] cursor-not-allowed border border-[#E0D7CC]'
          }`}
        >
          {isLoading ? (
            <>
              <Wand2 className="w-5 h-5 animate-spin text-[#D4A373]" />
              <span>Channelling Deep Domain Knowledge & Blueprint PDF...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <span>Generate Deep Blueprint PDF ({activeTier.toUpperCase()})</span>
              <ArrowRight className="w-4 h-4 text-[#D4A373]" />
            </>
          )}
        </button>

        {!isFormValid && (
          <p className="text-center text-xs text-[#8C7B6A] mt-2 italic">
            Please enter a Title / Topic, Client Name in the paragraph box, and verify the 3 cards to generate.
          </p>
        )}
      </div>
    </form>
  );
};
