import React, { useState } from 'react';
import { Sparkles, History, FileText, Compass, ChevronDown, Key, Layers } from 'lucide-react';
import { PRESET_READINGS } from '../data/presets';
import { ReadingInputs } from '../types';

interface NavbarProps {
  onSelectPreset: (preset: ReadingInputs) => void;
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  onOpenApiKeyModal: () => void;
  onOpenCategories: () => void;
  hasCustomApiKey: boolean;
  hasServerKey?: boolean;
  historyCount: number;
  activeView?: 'oracle' | 'categories';
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  onOpenHistory,
  onOpenGuide,
  onOpenApiKeyModal,
  onOpenCategories,
  hasCustomApiKey,
  hasServerKey = false,
  historyCount,
  activeView = 'oracle'
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const isAiActive = hasCustomApiKey || hasServerKey;

  return (
    <header className="border-b border-[#E0D7CC] bg-[#FCFAF7]/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#4A3F35] bg-[#F2EDE8] flex items-center justify-center text-[#4A3F35] shadow-xs">
            <span className="font-serif italic font-bold text-sm">✦</span>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C7B6A] font-bold">
              Tarot & Numerology
            </div>
            <h1 className="text-lg md:text-xl font-serif italic text-[#4A3F35] leading-tight">
              Sacred Oracle
            </h1>
          </div>
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-2">
          {/* Categories & Listings Studio Tab Button */}
          <button
            onClick={onOpenCategories}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold transition-all shadow-xs ${
              activeView === 'categories'
                ? 'bg-[#4A3F35] border-[#4A3F35] text-[#FCFAF7]'
                : 'bg-white border-[#BC6C25]/40 text-[#BC6C25] hover:bg-[#F2EDE8]'
            }`}
            title="Add & Customize Listing Categories"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Category Studio</span>
          </button>

          {/* Gemini API Key Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold transition-all shadow-xs ${
              isAiActive
                ? 'bg-[#F2EDE8] border-[#BC6C25]/40 text-[#BC6C25] hover:border-[#BC6C25]'
                : 'bg-white border-[#E0D7CC] text-[#5C554E] hover:border-[#4A3F35]'
            }`}
            title="Configure Google Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-[#BC6C25]" />
            <span className="hidden sm:inline">
              {isAiActive ? (hasCustomApiKey ? 'Gemini AI' : 'Gemini (.env)') : 'API Key'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isAiActive ? 'bg-emerald-500' : 'bg-[#D4A373]'}`} />
          </button>

          {/* Preset Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-medium text-[#4A3F35] transition-colors shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
              <span className="hidden sm:inline">Presets</span>
              <ChevronDown className="w-3 h-3 text-[#8C7B6A]" />
            </button>

            {showPresetsMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowPresetsMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E0D7CC] rounded-sm shadow-xl p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest border-b border-[#EEEAE5]">
                    Sample Querent Scenarios
                  </div>
                  {PRESET_READINGS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPreset(p.data);
                        setShowPresetsMenu(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xs hover:bg-[#F2EDE8] transition-colors flex items-start gap-2.5 group"
                    >
                      <span className="text-base">{p.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-[#4A3F35] group-hover:text-[#BC6C25] transition-colors">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-[#8C7B6A]">{p.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* PDF Format Guide */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-medium text-[#5C554E] hover:text-[#2C2C2C] transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#8C7B6A]" />
            <span className="hidden sm:inline">Format Guide</span>
          </button>

          {/* Reading Archives / History */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-medium text-[#5C554E] hover:text-[#2C2C2C] transition-colors relative shadow-xs"
          >
            <History className="w-3.5 h-3.5 text-[#8C7B6A]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#4A3F35] text-[#FCFAF7] font-bold text-[10px]">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
