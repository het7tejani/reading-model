import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { QuerentIntakeForm } from './components/QuerentIntakeForm';
import { ReadingResultView } from './components/ReadingResultView';
import { ReadingHistoryModal } from './components/ReadingHistoryModal';
import { FormattingGuideModal } from './components/FormattingGuideModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ReadingInputs, StoredReading, CategoryCustomData } from './types';
import { TAROT_DECK } from './data/tarotCards';
import { PRESET_READINGS } from './data/presets';
import { calculateLifePath } from './utils/numerology';
import { generateTarotNumerologyReadingMarkdown } from './utils/fallbackGenerator';
import { executeReading } from './utils/geminiClient';
import { getCategorySpecByTopic } from './data/categoryConfig';
import { getTopicByTitleOrId } from './data/readingTopics';
import { extractTarotCardsFromText } from './utils/clientDataParser';
import { Sparkles, AlertCircle, Wand2, Key } from 'lucide-react';

const STORAGE_KEY = 'tarot_numerology_readings_history_v1';
const API_KEY_STORAGE = 'gemini_user_api_key_v1';

const DEFAULT_TITLE =
  'Ancestral Psychic Reading | Spirit Guide Message, Tarot Insights (PDF)';
const DEFAULT_CLIENT_DETAILS =
  'Calida anderson birthday may 21, 1982. I want to know what my ancestors want me to know like mom Georgette anderson and others';

const EMPTY_INPUTS: ReadingInputs = {
  name: 'Calida Anderson',
  age: '42',
  dob: '05/21/1982',
  problem:
    'I want to know what my ancestors want me to know like mom Georgette anderson and others',
  question:
    'What do my ancestors want me to know, especially Mom Georgette Anderson and others?',
  topic: DEFAULT_TITLE,
  clientDetails: DEFAULT_CLIENT_DETAILS,
  tier: 'detailed',
  agenda: '',
  shopName: '',
  cards: [], // No fixed cards - AI will draw them dynamically based on querent energy, or prompt can provide them
};

export default function App() {
  // Start with clean default workflow fields
  const [inputs, setInputs] = useState<ReadingInputs>(EMPTY_INPUTS);
  const [markdownResult, setMarkdownResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // API Key Management
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [serverHasKey, setServerHasKey] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // History and Modals
  const [history, setHistory] = useState<StoredReading[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [generationSource, setGenerationSource] = useState<'luna-ai' | 'gemini-ai' | 'algorithmic'>('luna-ai');
  const [generationModel, setGenerationModel] = useState<string>('gemini-3.7-flash');

  // Load API Key and history from localStorage, and check server .env API key status
  useEffect(() => {
    const metaEnv = (import.meta as any).env || {};
    const clientViteKey = ((metaEnv.VITE_GEMINI_API_KEY || metaEnv.VITE_API_KEY) as string || '').trim();
    if (clientViteKey && clientViteKey !== 'MY_GEMINI_API_KEY' && clientViteKey !== 'YOUR_GEMINI_API_KEY') {
      setServerHasKey(true);
    }

    try {
      const savedKey = localStorage.getItem(API_KEY_STORAGE);
      if (savedKey) {
        setCustomApiKey(savedKey);
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history or API key from localStorage', e);
    }

    // Check if server has an API key configured in .env (or Vercel Serverless environment)
    fetch('/api/config')
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data?.hasEnvApiKey || data?.hasServerKey) {
          setServerHasKey(true);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch server config:', err);
      });
  }, []);

  const handleSaveApiKey = (key: string) => {
    setCustomApiKey(key);
    try {
      if (key) {
        localStorage.setItem(API_KEY_STORAGE, key);
      } else {
        localStorage.removeItem(API_KEY_STORAGE);
      }
    } catch (e) {
      console.error('Failed to persist API key', e);
    }
  };

  const saveHistoryToStorage = (newHistory: StoredReading[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  };

  const handleUpdateInputs = (updated: Partial<ReadingInputs>) => {
    setInputs((prev) => ({ ...prev, ...updated }));
  };

  const handleClearForm = () => {
    setInputs(EMPTY_INPUTS);
    setMarkdownResult(null);
    setErrorMessage(null);
    setIsSaved(false);
  };

  const handleSelectPreset = (preset: ReadingInputs) => {
    setInputs(preset);
    setMarkdownResult(null);
    setErrorMessage(null);
    setIsSaved(false);
  };

  const handleGenerateReading = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const metaEnv = (import.meta as any).env || {};
      const viteKey = ((metaEnv.VITE_GEMINI_API_KEY || metaEnv.VITE_API_KEY) as string || '').trim();
      const savedLunaKey = localStorage.getItem('luna_api_key_v1') || '';
      const savedLunaUrl = localStorage.getItem('luna_base_url_v1') || '';
      const savedLunaModel = localStorage.getItem('luna_model_name_v1') || '';

      const result = await executeReading({
        name: inputs.name,
        age: inputs.age,
        dob: inputs.dob,
        clientDetails: inputs.clientDetails || inputs.problem,
        agenda: inputs.agenda || inputs.question,
        tier: inputs.tier || 'detailed',
        shopName: inputs.shopName,
        problem: inputs.problem || inputs.clientDetails,
        question: inputs.question || inputs.agenda,
        topic: inputs.topic || inputs.agenda || 'Strategic Consultation',
        lunaApiKey: savedLunaKey || undefined,
        lunaBaseUrl: savedLunaUrl || undefined,
        lunaModelName: savedLunaModel || undefined,
        cards: inputs.cards.map((c) => ({
          name: c?.name || 'The Star',
          arcana: c?.arcana,
          element: c?.element,
          archetype: c?.archetype,
          keywords: c?.keywords,
          customDetails: c?.customDetails,
        })),
        categoryData: inputs.categoryData,
        userApiKey: customApiKey || viteKey || savedLunaKey || undefined,
      });

      if (result.markdown) {
        setMarkdownResult(result.markdown);
        setGenerationSource((result.source as any) || 'gemini-ai');
        if (result.model) {
          setGenerationModel(result.model);
        }

        // Automatically adopt the cards which the AI gave as output
        const outputCards = (result.cards && result.cards.length >= 3)
          ? { cards: result.cards }
          : extractTarotCardsFromText(result.markdown);

        if (outputCards.cards && outputCards.cards.length >= 3) {
          setInputs((prev) => ({
            ...prev,
            cards: outputCards.cards!,
          }));
        }
      } else {
        throw new Error('No markdown content received from generation engine');
      }
    } catch (err: any) {
      console.warn('API error encountered:', err);
      if (customApiKey) {
        setErrorMessage(`API Notice: ${err.message}. Please check your API key in the top bar.`);
      }
      
      // Generate customized fallback reading
      const fallbackMarkdown = generateTarotNumerologyReadingMarkdown(inputs);
      setMarkdownResult(fallbackMarkdown);
      setGenerationSource('algorithmic');
      const fallbackCards = extractTarotCardsFromText(fallbackMarkdown);
      if (fallbackCards.cards && fallbackCards.cards.length >= 3) {
        setInputs((prev) => ({
          ...prev,
          cards: fallbackCards.cards!,
        }));
      }
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveReading = () => {
    if (!markdownResult) return;

    const lp = calculateLifePath(inputs.dob)?.lifePathNumber || 7;
    const newEntry: StoredReading = {
      id: `reading_${Date.now()}`,
      createdAt: new Date().toISOString(),
      inputs: {
        name: inputs.name,
        age: inputs.age,
        dob: inputs.dob,
        problem: inputs.problem,
        question: inputs.question,
        topic: inputs.topic,
        shopName: inputs.shopName,
        cardNames: [
          inputs.cards[0]?.name || 'Card 1',
          inputs.cards[1]?.name || 'Card 2',
          inputs.cards[2]?.name || 'Card 3',
        ],
      },
      lifePath: lp,
      markdownContent: markdownResult,
      source: generationSource,
    };

    const updated = [newEntry, ...history];
    saveHistoryToStorage(updated);
    setIsSaved(true);
  };

  const handleSelectHistoricalReading = (item: StoredReading) => {
    // Find matching cards in deck
    const c1 = TAROT_DECK.find((c) => c.name === item.inputs.cardNames[0]) || TAROT_DECK[0];
    const c2 = TAROT_DECK.find((c) => c.name === item.inputs.cardNames[1]) || TAROT_DECK[1];
    const c3 = TAROT_DECK.find((c) => c.name === item.inputs.cardNames[2]) || TAROT_DECK[2];

    setInputs({
      name: item.inputs.name,
      age: item.inputs.age,
      dob: item.inputs.dob,
      problem: item.inputs.problem,
      question: item.inputs.question,
      topic: item.inputs.topic,
      shopName: item.inputs.shopName || '',
      cards: [c1, c2, c3],
    });
    setMarkdownResult(item.markdownContent);
    setGenerationSource(item.source || 'luna-ai');
    setIsSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReading = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistoryToStorage(updated);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved readings?')) {
      saveHistoryToStorage([]);
    }
  };

  const handleSelectCategoryForReading = (categoryTitleOrId: string | number) => {
    const topicObj = getTopicByTitleOrId(categoryTitleOrId);
    const topicTitle = topicObj?.title || String(categoryTitleOrId);
    const spec = getCategorySpecByTopic(categoryTitleOrId);
    const initialCategoryData: CategoryCustomData = { ...(inputs.categoryData || {}) };

    spec.customFields?.forEach((field) => {
      if (field.type === 'list' && field.defaultItems) {
        if (!initialCategoryData[field.key as keyof CategoryCustomData]) {
          (initialCategoryData as any)[field.key] = [...field.defaultItems];
        }
      }
    });

    const isCurrentProblemEmptyOrAuto = !inputs.problem.trim() || inputs.problem.startsWith('Navigating') || inputs.problem.startsWith('Seeking') || inputs.problem.startsWith('Feeling') || inputs.problem.startsWith('Tired') || inputs.problem.startsWith('Sensing') || inputs.problem.startsWith('Unsure') || inputs.problem.startsWith('Caught') || inputs.problem.startsWith('Experiencing') || inputs.problem.startsWith('Anticipating') || inputs.problem.startsWith('Desiring') || inputs.problem.startsWith('Pure');
    const isCurrentQuestionEmptyOrAuto = !inputs.question.trim() || inputs.question.startsWith('What is the true') || inputs.question.startsWith('What are their') || inputs.question.startsWith('Where is this') || inputs.question.startsWith('Will they') || inputs.question.startsWith('What is the exact') || inputs.question.startsWith('What are the major') || inputs.question.startsWith('What are the 8') || inputs.question.startsWith('What is the highest') || inputs.question.startsWith('What is my true') || inputs.question.startsWith('What does the universe') || inputs.question.startsWith('What is the brutal') || inputs.question.startsWith('What are the 3') || inputs.question.startsWith('Who are my primary') || inputs.question.startsWith('What past life') || inputs.question.startsWith('What or who') || inputs.question.startsWith('What is my pet') || inputs.question.startsWith('Where is my lost') || inputs.question.startsWith('What are the in-depth') || inputs.question.startsWith('What spiritual blockage') || inputs.question.startsWith('What subconscious or energetic') || inputs.question.startsWith('What emotional barrier') || inputs.question.startsWith('What is the karmic') || inputs.question.startsWith('What was the higher') || inputs.question.startsWith('What are the exact words') || inputs.question.startsWith('What is their true') || inputs.question.startsWith('What critical truth') || inputs.question.startsWith('How can I permanently sever') || inputs.question.startsWith('What comprehensive soul') || inputs.question.startsWith('What psychic visions') || inputs.question.startsWith('What is the prophetic') || inputs.question.startsWith('What secret feelings') || inputs.question.startsWith('What is the complete psychic');

    setInputs((prev) => ({
      ...prev,
      topic: topicTitle,
      problem: isCurrentProblemEmptyOrAuto && spec.suggestedProblem ? spec.suggestedProblem : prev.problem,
      question: isCurrentQuestionEmptyOrAuto && spec.suggestedQuestion ? spec.suggestedQuestion : prev.question,
      categoryData: initialCategoryData,
    }));

    setMarkdownResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2C2C2C] flex flex-col selection:bg-[#E0D7CC] selection:text-[#4A3F35] font-sans">
      {/* Top Navigation */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomApiKey={Boolean(customApiKey)}
        hasServerKey={serverHasKey}
        historyCount={history.length}
        shopName={inputs.shopName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-10 space-y-8">
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-xs bg-[#FDF2F2] border border-[#F87171]/40 text-[#991B1B] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {markdownResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ReadingResultView
                markdown={markdownResult}
                inputs={inputs}
                onEditInputs={() => setMarkdownResult(null)}
                onSaveReading={handleSaveReading}
                isSaved={isSaved}
                source={generationSource}
                model={generationModel}
                onUpdateMarkdown={(newMd) => {
                  setMarkdownResult(newMd);
                  setIsSaved(false);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Hero Banner Header */}
              <div className="text-center space-y-2.5 max-w-2xl mx-auto py-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EDE8] border border-[#E0D7CC] text-[#4A3F35] text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#BC6C25]" />
                  {inputs.shopName ? `${inputs.shopName} Sanctuary` : 'Sacred Intuitive Reading Sanctuary'}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif italic text-[#4A3F35] tracking-tight">
                  Psychic & Ancestral Readings
                </h1>
                <p className="text-sm text-[#8C7B6A] leading-relaxed max-w-xl mx-auto">
                  Enter your listing title, client details, reading tier, agenda, and 3-card spread to generate complete, page-by-page spiritual transmissions.
                </p>
              </div>

              {/* Intake Form */}
              <QuerentIntakeForm
                inputs={inputs}
                onUpdateInputs={handleUpdateInputs}
                onGenerateReading={handleGenerateReading}
                onClearForm={handleClearForm}
                onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-[#E0D7CC] bg-[#F2EDE8] py-6 text-center text-xs text-[#8C7B6A]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px]">
          <span>Tarot & Numerology Oracle • Empathetic Spiritual Guidance</span>
          <span>Calibrated for 8-Section PDF Markdown Generation</span>
        </div>
      </footer>

      {/* Modals */}
      <ReadingHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectReading={handleSelectHistoricalReading}
        onDeleteReading={handleDeleteReading}
        onClearHistory={handleClearHistory}
      />

      <FormattingGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={customApiKey}
        serverHasKey={serverHasKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}
