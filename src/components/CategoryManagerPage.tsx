import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  RotateCcw,
  ArrowLeft,
  Check,
  Plus,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Sliders,
  Type,
  Heart,
  Briefcase,
  Clock,
  Zap,
  PawPrint,
  LayoutGrid,
  List as ListIcon,
  ArrowUpDown,
  Wand2,
  FileText,
  Play,
  Eye,
  CheckCircle2,
  Download,
  Upload
} from 'lucide-react';
import { CategorySpec, CategoryFieldDef } from '../data/categoryConfig';
import {
  loadCategoryStore,
  getAllMergedCategorySpecs,
  createCustomCategory,
  updateCategorySpec,
  deleteCustomCategory,
  resetBuiltInCategory,
  resetAllCategoriesToFactory,
  exportCategoriesToJson,
  importCategoriesFromJson,
  CATEGORIES_UPDATED_EVENT,
} from '../utils/categoryStorage';

interface CategoryManagerPageProps {
  onBackToOracle: () => void;
  onSelectCategoryForReading: (categoryTitleOrId: string | number) => void;
}

export interface CategoryDomain {
  id: string;
  name: string;
  icon: React.ReactNode;
  matchFn: (cat: CategorySpec) => boolean;
}

const CATEGORY_DOMAINS: CategoryDomain[] = [
  {
    id: 'all',
    name: 'All Categories',
    icon: <Layers className="w-3.5 h-3.5" />,
    matchFn: () => true,
  },
  {
    id: 'love',
    name: 'Love & Partner',
    icon: <Heart className="w-3.5 h-3.5 text-rose-500" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'relationship_partner' ||
        cat.categoryType === 'love_blocks' ||
        cat.categoryType === 'cord_cutting' ||
        text.includes('love') ||
        text.includes('soulmate') ||
        text.includes('partner') ||
        text.includes('situationship') ||
        text.includes('feelings') ||
        text.includes('come back') ||
        text.includes('twin flame')
      );
    },
  },
  {
    id: 'career_wealth',
    name: 'Career & Wealth',
    icon: <Briefcase className="w-3.5 h-3.5 text-amber-600" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'career_job' ||
        cat.categoryType === 'money_flow' ||
        text.includes('career') ||
        text.includes('job') ||
        text.includes('money') ||
        text.includes('wealth') ||
        text.includes('business') ||
        text.includes('financial')
      );
    },
  },
  {
    id: 'predictions',
    name: 'Timelines & Forecasts',
    icon: <Clock className="w-3.5 h-3.5 text-indigo-500" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'time_frame' ||
        cat.categoryType === 'twelve_months' ||
        cat.categoryType === 'eight_predictions' ||
        text.includes('time frame') ||
        text.includes('forecast') ||
        text.includes('prediction') ||
        text.includes('month') ||
        text.includes('future')
      );
    },
  },
  {
    id: 'deep_psychic',
    name: 'Psychic & Akashic',
    icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'blind_reading' ||
        cat.categoryType === 'brutal_truth' ||
        cat.categoryType === 'three_truths' ||
        cat.categoryType === 'past_life' ||
        cat.categoryType === 'spirit_guides' ||
        cat.categoryType === 'third_eye' ||
        text.includes('blind') ||
        text.includes('brutal') ||
        text.includes('past life') ||
        text.includes('spirit guide') ||
        text.includes('hidden') ||
        text.includes('third eye') ||
        text.includes('akashic')
      );
    },
  },
  {
    id: 'energy_karma',
    name: 'Energy & Karma',
    icon: <Zap className="w-3.5 h-3.5 text-emerald-600" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'energy_drain' ||
        cat.categoryType === 'energy_reset' ||
        cat.categoryType === 'evil_eye_blessings' ||
        cat.categoryType === 'karma' ||
        text.includes('energy') ||
        text.includes('aura') ||
        text.includes('karma') ||
        text.includes('evil eye') ||
        text.includes('blessings') ||
        text.includes('detox') ||
        text.includes('drain')
      );
    },
  },
  {
    id: 'specialty',
    name: 'Pets & Life Compass',
    icon: <PawPrint className="w-3.5 h-3.5 text-teal-600" />,
    matchFn: (cat) => {
      const text = `${cat.title} ${cat.headline} ${cat.description}`.toLowerCase();
      return (
        cat.categoryType === 'pet_reading' ||
        cat.categoryType === 'lost_item' ||
        cat.categoryType === 'dream_message' ||
        cat.categoryType === 'life_compass' ||
        text.includes('pet') ||
        text.includes('animal') ||
        text.includes('lost item') ||
        text.includes('dream') ||
        text.includes('compass')
      );
    },
  },
  {
    id: 'custom_only',
    name: 'Custom Listings',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    matchFn: (cat) => Number(cat.id) > 100,
  },
];

const ARCHETYPE_OPTIONS = [
  { value: 'five_questions', label: '5 Questions Deep Dive (34-Page PDF)', desc: '5 channeled inquiries with 2-page somatic & subconscious breakdown', tag: '34 Pages' },
  { value: 'ten_questions', label: '10 Questions Deep Dive (44-Page PDF)', desc: '10 exhaustive channeled inquiries for comprehensive store reading', tag: '44 Pages' },
  { value: 'eight_predictions', label: '8 Future Predictions (40-Page PDF)', desc: '8 structured future predictive milestones with time horizons', tag: '40 Pages' },
  { value: 'twelve_months', label: '12 Months Forecast (40-Page PDF)', desc: 'Month-by-month predictive forecast with zodiac & elements', tag: '40 Pages' },
  { value: 'relationship_partner', label: 'Relationship & Partner Dynamics', desc: 'Partner connection, mutual thoughts, feelings & trajectory', tag: 'Relationship' },
  { value: 'career_job', label: 'Career, Vocation & Shift', desc: 'Workplace transition, leadership & financial breakthrough', tag: 'Career' },
  { value: 'money_flow', label: 'Money Flow & Abundance', desc: 'Abundance blocks, money mindset & ancestral beliefs', tag: 'Abundance' },
  { value: 'spirit_guides', label: 'Spirit Guides & Higher Self', desc: 'Angel numbers, spiritual masters & intuitive signs', tag: 'Guides' },
  { value: 'past_life', label: 'Past Life & Akashic Records', desc: 'Past-life karmic lessons, soul lineage & uncompleted vows', tag: 'Akashic' },
  { value: 'energy_drain', label: 'Energy Leak & Aura Reset', desc: 'Aura scanning, boundary repairs & somatic grounding', tag: 'Aura' },
  { value: 'pet_reading', label: 'Pet Psychic Communication', desc: 'Animal behavior, pet emotional needs & soul bond', tag: 'Pet Psychic' },
  { value: 'lost_item', label: 'Lost Item Psychic Search', desc: 'Cardinal direction, room location & intuitive retrieval', tag: 'Search' },
  { value: 'blind_reading', label: 'Blind Reading (Name & DOB)', desc: 'Unbiased channeled message with zero querent prompts', tag: 'Pure Channel' },
  { value: 'brutal_truth', label: 'Direct / Brutal Truth', desc: 'Direct, unfiltered reality check and boundary enforcement', tag: 'Direct' },
  { value: 'life_compass', label: 'Life Compass & Destiny', desc: 'Life purpose, existential alignment & soul vocation', tag: 'Destiny' },
  { value: 'standard', label: 'Universal Standard Oracle Spread', desc: 'Flexible general divination architecture for any store spread', tag: 'Standard' },
];

const STARTER_TEMPLATES: Array<{
  name: string;
  tag: string;
  category: Partial<CategorySpec>;
}> = [
  {
    name: 'Twin Flame Reunion & Separation',
    tag: 'Love & Union',
    category: {
      title: 'Twin Flame Reunion & Separation',
      headline: 'TWIN FLAME & SOULMATE UNION PSYCHIC READING',
      categoryType: 'relationship_partner',
      description: 'Deep channeled reading for twin flames navigating separation, runner/chaser dynamics, and divine timing for reunion.',
      suggestedProblem: 'Navigating intense energetic separation from my counterpart and seeking clarity on divine timing and our next contact.',
      suggestedQuestion: 'What are their current unspoken feelings and when will the energetic barrier dissolve for reunion?',
      suggestedQuestions: [
        '1. What is the current soul frequency and telepathic connection between us?',
        '2. What is my counterpart currently learning in their personal life during separation?',
        '3. What subconscious shadow is triggering the runner/chaser dynamic?',
        '4. What specific astrological or seasonal window holds the highest potential for contact?',
        '5. What sacred action should I take right now to align with highest self-love and union?',
      ],
      customFields: [
        {
          key: 'personName',
          label: "Counterpart / Partner's Name",
          type: 'text',
          placeholder: 'e.g. Liam Sterling',
          helpText: 'Helps tune into their specific energetic signature',
        },
        {
          key: 'separationStage',
          label: 'Current Dynamic / Separation Duration',
          type: 'text',
          placeholder: 'e.g. 3 months no contact, sporadic texting, divine pause',
        },
      ],
      pdfSectionTitle: 'TWIN FLAME UNION & SACRED REUNION MATRIX',
    },
  },
  {
    name: 'Career Breakthrough & Next Job',
    tag: 'Career & Wealth',
    category: {
      title: 'Career Shift & Wealth Elevation',
      headline: 'EXECUTIVE CAREER & FINANCIAL BREAKTHROUGH READING',
      categoryType: 'career_job',
      description: 'Targeted oracle spread to identify upcoming job offers, salary negotiations, leadership transitions, and vocation fulfillment.',
      suggestedProblem: 'Feeling uninspired in my current position and seeking guidance on when and how to transition into a higher-paying aligned role.',
      suggestedQuestion: 'What is the exact trajectory of my next career breakthrough and how can I maximize financial abundance?',
      suggestedQuestions: [
        '1. What is the overarching energetic climate around my current career and workplace?',
        '2. What hidden leadership strength or unique superpower am I currently underutilizing?',
        '3. What is the timeline and nature of the next major job offer or promotion?',
        '4. What financial mindset block or scarcity conditioning must be cleared for wealth flow?',
        '5. What concrete strategic step should I take over the next 30 days to seal success?',
      ],
      customFields: [
        {
          key: 'currentIndustry',
          label: 'Current Field & Dream Target Role',
          type: 'text',
          placeholder: 'e.g. Marketing Lead aspiring to launch an independent consultancy',
        },
      ],
      pdfSectionTitle: 'VOCATIONAL DESTINY & WEALTH MULTIPLICATION',
    },
  },
  {
    name: 'Urgent Burning Question (24hr Fast)',
    tag: 'Quick Clarity',
    category: {
      title: 'Urgent Burning Question (24hr Fast)',
      headline: 'URGENT BURNING QUESTION PSYCHIC CLARITY',
      categoryType: 'five_questions',
      description: 'Quick-response channeled psychic clarity for immediate decisions, sudden turning points, and time-sensitive crossroads.',
      suggestedProblem: 'Facing a sudden critical dilemma that requires swift intuitive confirmation and energetic foresight.',
      suggestedQuestion: 'What is the immediate truth of this situation and what action produces the best outcome?',
      suggestedQuestions: [
        '1. What is the immediate truth beneath the surface of this urgent question?',
        '2. What outcome is most likely if I take swift action right now?',
        '3. What unseen pitfall or deceptive influence must I avoid today?',
        '4. How will this situation evolve over the next 7 to 14 days?',
        '5. What final empowering decree does Spirit offer for peace of mind?',
      ],
      customFields: [
        {
          key: 'urgencyContext',
          label: 'Urgent Deadline or Context Notes',
          type: 'textarea',
          placeholder: 'Explain any immediate deadlines or specific parties involved...',
        },
      ],
      pdfSectionTitle: 'URGENT INTUITIVE DIRECTIVE & OUTCOME',
    },
  },
  {
    name: 'Akashic Soul Purpose & Destiny',
    tag: 'Akashic',
    category: {
      title: 'Akashic Soul Purpose & Destiny Blueprint',
      headline: 'AKASHIC SOUL CONTRACT & PURPOSE BLUEPRINT',
      categoryType: 'past_life',
      description: 'Exhaustive exploration of soul lineage, past-life gifts, sacred life purpose, and karmic lessons chosen for this lifetime.',
      suggestedProblem: 'Seeking to understand my deepest existential purpose and how my past incarnations inform my present vocation.',
      suggestedQuestion: 'What did my soul incarnate in this lifetime to master, teach, and experience?',
      suggestedQuestions: [
        '1. What is the core soul origin and spiritual lineage of my higher consciousness?',
        '2. What key past-life mastery or esoteric gift am I reactivating in this life?',
        '3. What unresolved karmic contract or vow is ready to be completely released?',
        '4. How can I align my everyday work with my sacred spiritual mission?',
        '5. What is the ultimate expansion my soul is destined to manifest before age 50?',
      ],
      customFields: [],
      pdfSectionTitle: 'AKASHIC SOUL ARCHIVE & DESTINY CODES',
    },
  },
];

export const CategoryManagerPage: React.FC<CategoryManagerPageProps> = ({
  onBackToOracle,
  onSelectCategoryForReading,
}) => {
  const [categories, setCategories] = useState<Record<number | string, CategorySpec>>({});
  const [categoryOverrides, setCategoryOverrides] = useState<Record<number, Partial<CategorySpec>>>({});
  const [customCategories, setCustomCategories] = useState<Record<number | string, CategorySpec>>({});

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'custom' | 'edited'>('all');
  const [archetypeFilter, setArchetypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'id_asc' | 'title_asc' | 'questions_desc'>('id_asc');

  // Expanded Questions on Cards
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string | number, boolean>>({});

  // Inspection Drawer/Modal
  const [inspectingCategory, setInspectingCategory] = useState<CategorySpec | null>(null);

  // Editor State
  const [editingCategory, setEditingCategory] = useState<CategorySpec | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'details' | 'questions' | 'fields'>('details');

  // Modals & Feedback
  const [showStarterTemplatesModal, setShowStarterTemplatesModal] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatusMessage, setImportStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [resetAllConfirmOpen, setResetAllConfirmOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshData = () => {
    const store = loadCategoryStore();
    setCustomCategories(store.customCategories);
    setCategoryOverrides(store.categoryOverrides);
    setCategories(getAllMergedCategorySpecs());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
  }, []);

  const customCount = Object.keys(customCategories).length;
  const editedCount = Object.keys(categoryOverrides).length;
  const totalCount = Object.keys(categories).length;

  // Filtered List
  const filteredCategoryList = useMemo(() => {
    const activeDomain = CATEGORY_DOMAINS.find((d) => d.id === selectedDomain);

    let list = Object.values(categories).filter((cat) => {
      const isCustom = Number(cat.id) > 100 || Boolean(customCategories[cat.id]);
      const isEdited = Boolean(categoryOverrides[cat.id]);

      if (activeDomain && !activeDomain.matchFn(cat)) return false;
      if (filterType === 'custom' && !isCustom) return false;
      if (filterType === 'edited' && !isEdited && !isCustom) return false;
      if (archetypeFilter !== 'all' && cat.categoryType !== archetypeFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (cat.title || '').toLowerCase().includes(q);
        const matchHeadline = (cat.headline || '').toLowerCase().includes(q);
        const matchDesc = (cat.description || '').toLowerCase().includes(q);
        const matchId = String(cat.id).includes(q);
        const matchQuestions = (cat.suggestedQuestions || []).some((qst) => qst.toLowerCase().includes(q));
        return matchTitle || matchHeadline || matchDesc || matchId || matchQuestions;
      }

      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'id_asc') return Number(a.id) - Number(b.id);
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'questions_desc') return (b.suggestedQuestions?.length || 0) - (a.suggestedQuestions?.length || 0);
      return 0;
    });

    return list;
  }, [categories, customCategories, categoryOverrides, selectedDomain, filterType, archetypeFilter, searchQuery, sortBy]);

  const toggleCardQuestions = (id: string | number) => {
    setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartCreateNew = (template?: Partial<CategorySpec>) => {
    const defaultNewSpec: CategorySpec = {
      id: 101,
      title: template?.title || 'New Custom Listing',
      headline: template?.headline || 'EXCLUSIVE PSYCHIC & TAROT READING',
      categoryType: template?.categoryType || 'five_questions',
      description: template?.description || 'Deep channeled reading offering somatic alignment, clear energetic timelines, and grounded answers.',
      suggestedProblem: template?.suggestedProblem || 'Navigating a significant life transition and seeking intuitive clarity on next steps.',
      suggestedQuestion: template?.suggestedQuestion || 'What is the highest alignment and divine message for my situation?',
      suggestedQuestions: template?.suggestedQuestions || [
        '1. What is the core energetic frequency influencing this situation?',
        '2. What subconscious blockage or fear is ready to be released?',
        '3. What unseen blessings or spiritual allies are supporting me?',
        '4. How can I best navigate the next 3 to 6 months in sovereign alignment?',
        '5. What is the ultimate expansion awaiting on the other side of this transition?',
      ],
      customFields: template?.customFields || [
        {
          key: 'specialFocus',
          label: 'Specific Focus / Querent Notes',
          type: 'textarea',
          placeholder: 'Add any specific circumstances, names, or timelines...',
          helpText: 'Optional notes for personalized accuracy',
        },
      ],
      pdfSectionTitle: template?.pdfSectionTitle || 'SACRED PSYCHIC DECREE & ROADMAP',
    };

    setEditingCategory(defaultNewSpec);
    setIsCreatingNew(true);
    setActiveEditorTab('details');
    setShowStarterTemplatesModal(false);
  };

  const handleEditCategory = (cat: CategorySpec) => {
    setEditingCategory(JSON.parse(JSON.stringify(cat)));
    setIsCreatingNew(false);
    setActiveEditorTab('details');
  };

  const handleDuplicateCategory = (cat: CategorySpec) => {
    const cloned: CategorySpec = JSON.parse(JSON.stringify(cat));
    cloned.title = `${cloned.title} (Copy)`;
    cloned.headline = `${cloned.headline} (NEW)`;
    cloned.id = 101;
    setEditingCategory(cloned);
    setIsCreatingNew(true);
    setActiveEditorTab('details');
    showToast(`Duplicating "${cat.title}"`);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    if (!editingCategory.title.trim()) {
      alert('Please provide a category title.');
      return;
    }

    if (isCreatingNew) {
      const created = createCustomCategory(editingCategory);
      showToast(`Created "${created.title}"`);
    } else {
      updateCategorySpec(editingCategory.id, editingCategory);
      showToast(`Updated "${editingCategory.title}"`);
    }

    setEditingCategory(null);
    setIsCreatingNew(false);
    refreshData();
  };

  const handleDeleteCustomCategory = (id: number) => {
    deleteCustomCategory(id);
    setDeleteConfirmId(null);
    refreshData();
    showToast('Category deleted');
  };

  const handleResetBuiltIn = (id: number) => {
    resetBuiltInCategory(id);
    refreshData();
    showToast('Reset back to factory defaults');
  };

  const handleResetAll = () => {
    resetAllCategoriesToFactory();
    setResetAllConfirmOpen(false);
    refreshData();
    showToast('All categories restored to factory defaults');
  };

  const handleExportJson = () => {
    const jsonStr = exportCategoriesToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tarot_Categories_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded backup JSON');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const res = importCategoriesFromJson(importJsonText);
    if (res.success) {
      setImportStatusMessage({ type: 'success', text: `Imported ${res.count} categories!` });
      refreshData();
      setTimeout(() => {
        setIsImportExportOpen(false);
        setImportJsonText('');
        setImportStatusMessage(null);
        showToast(`Imported ${res.count} categories`);
      }, 1200);
    } else {
      setImportStatusMessage({ type: 'error', text: res.error || 'Failed to import JSON' });
    }
  };

  // Question editing helpers
  const handleAddQuestion = () => {
    if (!editingCategory) return;
    const currentList = editingCategory.suggestedQuestions || [];
    const nextNum = currentList.length + 1;
    const updated = [...currentList, `${nextNum}. What intuitive guidance applies here?`];
    setEditingCategory({ ...editingCategory, suggestedQuestions: updated });
  };

  const handleUpdateQuestion = (idx: number, text: string) => {
    if (!editingCategory) return;
    const currentList = [...(editingCategory.suggestedQuestions || [])];
    currentList[idx] = text;
    setEditingCategory({ ...editingCategory, suggestedQuestions: currentList });
  };

  const handleRemoveQuestion = (idx: number) => {
    if (!editingCategory) return;
    const currentList = [...(editingCategory.suggestedQuestions || [])];
    currentList.splice(idx, 1);
    setEditingCategory({ ...editingCategory, suggestedQuestions: currentList });
  };

  // Field editing helpers
  const handleAddField = () => {
    if (!editingCategory) return;
    const currentFields = editingCategory.customFields || [];
    const newField: CategoryFieldDef = {
      key: `field_${Date.now().toString().slice(-4)}`,
      label: 'New Intake Field',
      type: 'text',
      placeholder: 'e.g. Details...',
    };
    setEditingCategory({ ...editingCategory, customFields: [...currentFields, newField] });
  };

  const handleUpdateField = (idx: number, updates: Partial<CategoryFieldDef>) => {
    if (!editingCategory) return;
    const currentFields = [...(editingCategory.customFields || [])];
    currentFields[idx] = { ...currentFields[idx], ...updates };
    setEditingCategory({ ...editingCategory, customFields: currentFields });
  };

  const handleRemoveField = (idx: number) => {
    if (!editingCategory) return;
    const currentFields = [...(editingCategory.customFields || [])];
    currentFields.splice(idx, 1);
    setEditingCategory({ ...editingCategory, customFields: currentFields });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-3 sm:px-6">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-full bg-stone-900 text-stone-50 text-xs font-medium shadow-xl flex items-center gap-2 border border-stone-700/60 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* HEADER SECTION (CLEAN, FLUID, NO CLUTTERED STAT BOXES) */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <button
            onClick={onBackToOracle}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Oracle</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Category Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-[11px] font-medium font-mono">
              {totalCount} Spreads {customCount > 0 && `• ${customCount} Custom`}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-xl">
            Configure reading templates, customize channeled question layouts, and tailor intake forms for your clients.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowStarterTemplatesModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-900 hover:bg-amber-100/80 text-xs font-medium transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Starter Kits</span>
          </button>

          <button
            onClick={() => setIsImportExportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium transition-all shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-stone-400" />
            <span>Sync</span>
          </button>

          <button
            onClick={() => handleStartCreateNew()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-medium shadow-xs hover:shadow transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DOMAIN PILLS (STREAMLINED & SOFT) */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_DOMAINS.map((domain) => {
          const count = Object.values(categories).filter((cat) => domain.matchFn(cat)).length;
          const isSelected = selectedDomain === domain.id;

          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              <span>{domain.icon}</span>
              <span>{domain.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SEARCH & FILTERS BAR (UNIFIED, NON-BOXY) */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-50/70 p-2 rounded-xl border border-stone-200/70">
        {/* Search Field */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search categories by title, question, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills & View Switcher */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filterType === 'all' ? 'bg-stone-900 text-stone-50' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('custom')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1 ${
                filterType === 'custom' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Custom ({customCount})
            </button>
            {editedCount > 0 && (
              <button
                onClick={() => setFilterType('edited')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterType === 'edited' ? 'bg-stone-900 text-stone-50' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Edited ({editedCount})
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-400"
          >
            <option value="id_asc">Default Order</option>
            <option value="title_asc">Alphabetical</option>
            <option value="questions_desc">Most Questions</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARDS LISTING (ELEGANT, SMOOTH ROUNDED CORNERS, NO SQUARE SLOP) */}
      {/* ========================================================================= */}
      {filteredCategoryList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200/80 space-y-3">
          <HelpCircle className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="text-sm font-semibold text-stone-800">No categories found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search query or reset the filters to see all spreads.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('all');
              setFilterType('all');
              setArchetypeFilter('all');
            }}
            className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-700"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategoryList.map((cat) => {
            const isCustom = Number(cat.id) > 100 || Boolean(customCategories[cat.id]);
            const isEdited = Boolean(categoryOverrides[cat.id]);
            const qCount = cat.suggestedQuestions?.length || 5;
            const fieldsCount = cat.customFields?.length || 0;
            const isExpanded = Boolean(expandedCardIds[cat.id]);
            const archetypeInfo = ARCHETYPE_OPTIONS.find((a) => a.value === cat.categoryType);

            return (
              <div
                key={cat.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group hover:shadow-md ${
                  isCustom
                    ? 'border-amber-300/80 ring-1 ring-amber-200/50'
                    : isEdited
                    ? 'border-stone-400'
                    : 'border-stone-200/80 hover:border-stone-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-[10px] font-mono font-medium text-stone-600">
                        #{cat.id}
                      </span>
                      {isCustom && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          Custom
                        </span>
                      )}
                      {isEdited && !isCustom && (
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium">
                          Edited
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-stone-50 text-stone-500 text-[10px]">
                        {archetypeInfo?.tag || 'Spread'}
                      </span>
                    </div>

                    <span className="text-[11px] text-stone-400 font-mono">
                      {qCount} Questions
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div>
                    <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider font-mono truncate mt-0.5">
                      {cat.headline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {cat.description || 'Personalized spiritual and intuitive spread.'}
                  </p>

                  {/* Custom Fields Indicator */}
                  {fieldsCount > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/60 px-2.5 py-1 rounded-lg border border-amber-100">
                      <Type className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span className="truncate">
                        Intake fields: {cat.customFields.map((f) => f.label).join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Expandable Channeled Questions */}
                  <div className="pt-1">
                    <button
                      onClick={() => toggleCardQuestions(cat.id)}
                      className="w-full flex items-center justify-between text-[11px] font-medium text-stone-500 hover:text-stone-800 transition-colors py-1"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-stone-400" />
                        <span>View Channeled Questions ({qCount})</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-1.5 pt-2 pb-1"
                        >
                          {cat.suggestedQuestions.map((q, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100 leading-relaxed"
                            >
                              {q}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-stone-100">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicateCategory(cat)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                      title="Duplicate as New"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setInspectingCategory(cat)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                      title="Quick Inspect"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {isCustom ? (
                      <button
                        onClick={() => setDeleteConfirmId(Number(cat.id))}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : isEdited ? (
                      <button
                        onClick={() => handleResetBuiltIn(Number(cat.id))}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                        title="Reset to Factory Default"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => onSelectCategoryForReading(cat.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-amber-700 text-xs font-medium transition-all shadow-xs"
                  >
                    <span>Use in Oracle</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden divide-y divide-stone-100 shadow-xs">
          {filteredCategoryList.map((cat) => {
            const isCustom = Number(cat.id) > 100 || Boolean(customCategories[cat.id]);
            const isEdited = Boolean(categoryOverrides[cat.id]);
            const qCount = cat.suggestedQuestions?.length || 5;

            return (
              <div
                key={cat.id}
                className="p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-[11px] font-mono text-stone-600">
                    #{cat.id}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {cat.title}
                      </h4>
                      {isCustom && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 text-[9px] font-medium">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 truncate">{cat.headline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs text-stone-500 font-mono mr-2">
                    {qCount} Qs
                  </span>
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectCategoryForReading(cat.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-amber-700 text-xs font-medium transition-colors"
                  >
                    <span>Select</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE & EDIT MODAL (CLEAN, ROUNDED, AIRY, UNCLUTTERED) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {editingCategory && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {isCreatingNew ? 'Create New Category' : `Edit Category #${editingCategory.id}`}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Configure listing titles, archetype layouts, and custom question spreads.
                  </p>
                </div>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Pill Tabs */}
              <div className="px-5 pt-3 pb-2 border-b border-stone-100 bg-stone-50/50 flex items-center gap-1">
                <button
                  onClick={() => setActiveEditorTab('details')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeEditorTab === 'details'
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  1. Details & Layout
                </button>
                <button
                  onClick={() => setActiveEditorTab('questions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeEditorTab === 'questions'
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>2. Questions Spread</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700 text-[10px] font-mono">
                    {editingCategory.suggestedQuestions?.length || 0}
                  </span>
                </button>
                <button
                  onClick={() => setActiveEditorTab('fields')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeEditorTab === 'fields'
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>3. Intake Fields</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700 text-[10px] font-mono">
                    {editingCategory.customFields?.length || 0}
                  </span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                {activeEditorTab === 'details' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Category Title
                        </label>
                        <input
                          type="text"
                          value={editingCategory.title}
                          onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                          placeholder="e.g. Twin Flame Reunion Reading"
                          className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          PDF Banner Headline
                        </label>
                        <input
                          type="text"
                          value={editingCategory.headline}
                          onChange={(e) => setEditingCategory({ ...editingCategory, headline: e.target.value })}
                          placeholder="e.g. TWIN FLAME & SOULMATE UNION"
                          className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Layout Blueprint & PDF Architecture
                      </label>
                      <select
                        value={editingCategory.categoryType}
                        onChange={(e) => setEditingCategory({ ...editingCategory, categoryType: e.target.value as any })}
                        className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                      >
                        {ARCHETYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        placeholder="Brief summary of what this reading delivers..."
                        className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        PDF Section Header
                      </label>
                      <input
                        type="text"
                        value={editingCategory.pdfSectionTitle || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, pdfSectionTitle: e.target.value })}
                        placeholder="e.g. SACRED PSYCHIC DECREE & ROADMAP"
                        className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>

                    {/* Default Context Placeholders */}
                    <div className="pt-2 border-t border-stone-100 space-y-3">
                      <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">
                        Default Intake Suggestions
                      </span>

                      <div>
                        <label className="block text-xs text-stone-600 mb-1">
                          Default Problem Context
                        </label>
                        <textarea
                          rows={2}
                          value={editingCategory.suggestedProblem || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, suggestedProblem: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-600 mb-1">
                          Default Core Question
                        </label>
                        <input
                          type="text"
                          value={editingCategory.suggestedQuestion || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, suggestedQuestion: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeEditorTab === 'questions' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-700">
                        Channeled Inquiry Spread ({editingCategory.suggestedQuestions?.length || 0})
                      </span>
                      <button
                        onClick={handleAddQuestion}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-stone-600" />
                        <span>Add Question</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {(editingCategory.suggestedQuestions || []).map((q, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
                          <span className="text-xs font-mono text-stone-400 mt-2 px-1">
                            {idx + 1}
                          </span>
                          <textarea
                            rows={2}
                            value={q}
                            onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                          />
                          <button
                            onClick={() => handleRemoveQuestion(idx)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors mt-1"
                            title="Delete question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeEditorTab === 'fields' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-700">
                        Dynamic Querent Intake Fields ({editingCategory.customFields?.length || 0})
                      </span>
                      <button
                        onClick={handleAddField}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-stone-600" />
                        <span>Add Field</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(editingCategory.customFields || []).length === 0 ? (
                        <p className="text-xs text-stone-400 italic py-4 text-center">
                          No custom intake fields configured. The standard Name, DOB, Problem, and Question inputs will be used.
                        </p>
                      ) : (
                        editingCategory.customFields.map((f, idx) => (
                          <div key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200/70 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={f.label}
                                onChange={(e) => handleUpdateField(idx, { label: e.target.value })}
                                placeholder="Field Label (e.g. Partner Name)"
                                className="flex-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800"
                              />
                              <select
                                value={f.type}
                                onChange={(e) => handleUpdateField(idx, { type: e.target.value as any })}
                                className="px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs text-stone-700"
                              >
                                <option value="text">Single Line Text</option>
                                <option value="textarea">Multi-line Notes</option>
                              </select>
                              <button
                                onClick={() => handleRemoveField(idx)}
                                className="p-1 text-stone-400 hover:text-rose-600 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={f.placeholder || ''}
                              onChange={(e) => handleUpdateField(idx, { placeholder: e.target.value })}
                              placeholder="Placeholder text..."
                              className="w-full px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs text-stone-600"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="px-5 py-2 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-medium shadow-xs transition-colors"
                >
                  {isCreatingNew ? 'Create Category' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* STARTER KITS MODAL (CLEAN & MINIMAL) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showStarterTemplatesModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Listing Starter Kits
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Launch pre-built reading configurations instantly.
                  </p>
                </div>
                <button
                  onClick={() => setShowStarterTemplatesModal(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto">
                {STARTER_TEMPLATES.map((tmpl, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-stone-200/80 hover:border-stone-400 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                          {tmpl.name}
                        </h4>
                        <span className="px-2 py-0.2 rounded-full bg-stone-100 text-[10px] text-stone-600 font-medium">
                          {tmpl.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {tmpl.category.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartCreateNew(tmpl.category)}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-medium whitespace-nowrap transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* QUICK INSPECTOR MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingCategory && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {inspectingCategory.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">
                    {inspectingCategory.headline}
                  </p>
                </div>
                <button
                  onClick={() => setInspectingCategory(null)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs max-h-[350px] overflow-y-auto pr-1">
                <div>
                  <span className="font-medium text-stone-500 block mb-1">Channeled Questions:</span>
                  <div className="space-y-1.5">
                    {inspectingCategory.suggestedQuestions.map((q, i) => (
                      <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-100 text-stone-700">
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {inspectingCategory.customFields && inspectingCategory.customFields.length > 0 && (
                  <div>
                    <span className="font-medium text-stone-500 block mb-1">Intake Fields:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectingCategory.customFields.map((f, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200 text-[11px]">
                          {f.label} ({f.type})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    handleEditCategory(inspectingCategory);
                    setInspectingCategory(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Edit Category
                </button>
                <button
                  onClick={() => {
                    onSelectCategoryForReading(inspectingCategory.id);
                    setInspectingCategory(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-stone-50 text-xs font-medium hover:bg-amber-700"
                >
                  Launch in Oracle
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* BACKUP & SYNC MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isImportExportOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Backup & Sync Categories
                </h3>
                <button
                  onClick={() => {
                    setIsImportExportOpen(false);
                    setImportStatusMessage(null);
                  }}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-medium text-stone-700 block mb-1.5">
                    Export Categories (JSON)
                  </span>
                  <button
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-medium text-stone-700 block mb-1.5">
                    Import Categories (JSON)
                  </span>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste JSON configuration payload here..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-800 focus:outline-none focus:bg-white"
                  />
                  {importStatusMessage && (
                    <p className={`text-xs mt-1 ${importStatusMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {importStatusMessage.text}
                    </p>
                  )}
                  <button
                    onClick={handleImportJson}
                    disabled={!importJsonText.trim()}
                    className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 disabled:opacity-50 text-xs font-medium transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3 shadow-2xl border border-stone-200 text-center"
            >
              <h4 className="text-sm font-serif font-bold text-stone-900">
                Delete Category #{deleteConfirmId}?
              </h4>
              <p className="text-xs text-stone-500">
                This custom listing will be removed from your catalog.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteCustomCategory(deleteConfirmId)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
