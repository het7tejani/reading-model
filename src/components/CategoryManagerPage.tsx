import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderPlus,
  Search,
  Filter,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  ArrowLeft,
  Check,
  AlertCircle,
  Plus,
  Layers,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  BookOpen,
  ArrowRight,
  Eye,
  Sliders,
  ListPlus,
  Type
} from 'lucide-react';
import { CategorySpec, CategoryFieldDef, CATEGORY_SPECS } from '../data/categoryConfig';
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

const ARCHETYPE_OPTIONS = [
  { value: 'five_questions', label: '5 Questions Deep Dive (34-Page PDF)', desc: '5 channeled inquiries with 2-page somatic & subconscious breakdown' },
  { value: 'ten_questions', label: '10 Questions Deep Dive (44-Page PDF)', desc: '10 exhaustive channeled inquiries' },
  { value: 'eight_predictions', label: '8 Future Predictions (40-Page PDF)', desc: '8 structured future predictive milestones' },
  { value: 'twelve_months', label: '12 Months Forecast (40-Page PDF)', desc: 'Month-by-month predictive forecast with zodiac & elements' },
  { value: 'relationship_partner', label: 'Relationship & Partner Dynamics', desc: 'Partner connection, mutual thoughts, feelings & trajectory' },
  { value: 'career_job', label: 'Career, Vocation & Vocation Shift', desc: 'Workplace transition, leadership & financial breakthrough' },
  { value: 'money_flow', label: 'Money Flow & Wealth Scarcity Blocks', desc: 'Abundance blocks, money mindset & ancestral beliefs' },
  { value: 'spirit_guides', label: 'Spirit Guides & Higher Self Communication', desc: 'Angel numbers, spiritual masters & intuitive signs' },
  { value: 'past_life', label: 'Past Life & Akashic Soul Contracts', desc: 'Past-life karmic lessons, soul lineage & uncompleted vows' },
  { value: 'energy_drain', label: 'Energy Leak & Aura Reset Scan', desc: 'Aura scanning, boundary repairs & somatic grounding' },
  { value: 'pet_reading', label: 'Pet Psychic & Animal Companion Communication', desc: 'Animal behavior, pet emotional needs & soul bond' },
  { value: 'lost_item', label: 'Lost Item Psychic Search & Direction', desc: 'Cardinal direction, room location & intuitive retrieval' },
  { value: 'blind_reading', label: 'Blind Reading (Name & DOB Only)', desc: 'Unbiased channeled message with zero querent prompts' },
  { value: 'brutal_truth', label: 'Brutal / No Sugar-Coating Truth', desc: 'Direct, unfiltered reality check and boundary enforcement' },
  { value: 'life_compass', label: 'Life Compass & Sacred Destiny Path', desc: 'Life purpose, existential alignment & soul vocation' },
  { value: 'standard', label: 'Universal Standard Oracle Spread', desc: 'Flexible general divination architecture' },
];

export const CategoryManagerPage: React.FC<CategoryManagerPageProps> = ({
  onBackToOracle,
  onSelectCategoryForReading,
}) => {
  const [categories, setCategories] = useState<Record<number | string, CategorySpec>>({});
  const [categoryOverrides, setCategoryOverrides] = useState<Record<number, Partial<CategorySpec>>>({});
  const [customCategories, setCustomCategories] = useState<Record<number | string, CategorySpec>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'custom' | 'builtin' | 'edited'>('all');
  const [archetypeFilter, setArchetypeFilter] = useState<string>('all');

  // Editing state
  const [editingCategory, setEditingCategory] = useState<CategorySpec | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'identity' | 'questions' | 'fields' | 'preview'>('identity');

  // Modals & Feedback
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatusMessage, setImportStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [resetAllConfirmOpen, setResetAllConfirmOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshData = () => {
    const store = loadCategoryStore();
    setCustomCategories(store.customCategories);
    setCategoryOverrides(store.categoryOverrides);
    setCategories(getAllMergedCategorySpecs());
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CATEGORIES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  // Filtered categories
  const filteredCategoryList = useMemo(() => {
    return Object.values(categories).filter((cat) => {
      const isCustom = Number(cat.id) > 100 || Boolean(customCategories[cat.id]);
      const isEdited = Boolean(categoryOverrides[cat.id]);

      // Filter Type
      if (filterType === 'custom' && !isCustom) return false;
      if (filterType === 'builtin' && isCustom) return false;
      if (filterType === 'edited' && !isEdited && !isCustom) return false;

      // Archetype Filter
      if (archetypeFilter !== 'all' && cat.categoryType !== archetypeFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = cat.title.toLowerCase().includes(q);
        const matchHeadline = cat.headline.toLowerCase().includes(q);
        const matchDesc = (cat.description || '').toLowerCase().includes(q);
        const matchId = String(cat.id).includes(q);
        const matchType = (cat.categoryType || '').toLowerCase().includes(q);
        return matchTitle || matchHeadline || matchDesc || matchId || matchType;
      }

      return true;
    });
  }, [categories, customCategories, categoryOverrides, filterType, archetypeFilter, searchQuery]);

  const customCount = Object.keys(customCategories).length;
  const editedCount = Object.keys(categoryOverrides).length;
  const totalCount = Object.keys(categories).length;

  // Handlers
  const handleStartCreateNew = () => {
    const defaultNewSpec: CategorySpec = {
      id: 101,
      title: 'New Store Listing Category',
      headline: 'EXCLUSIVE PSYCHIC & TAROT READING',
      categoryType: 'five_questions',
      description: 'Custom Etsy / Store listing offering deep channeled psychic insights, somatic alignment, and actionable guidance.',
      suggestedProblem: 'Navigating a significant life transition and seeking intuitive clarity on next steps and spiritual alignment.',
      suggestedQuestion: 'What is the highest alignment and divine message for my current situation?',
      suggestedQuestions: [
        '1. What is the core energetic frequency influencing this situation?',
        '2. What subconscious blockage or fear is ready to be released?',
        '3. What unseen blessings or spiritual allies are supporting me?',
        '4. How can I best navigate the next 3 to 6 months in sovereign alignment?',
        '5. What is the ultimate expansion awaiting on the other side of this transition?',
      ],
      customFields: [
        {
          key: 'specialFocus',
          label: 'Specific Area of Focus / Querent Notes',
          type: 'textarea',
          placeholder: 'Add any specific circumstances, names, or timelines...',
          helpText: 'Optional contextual details for personalized accuracy',
        },
      ],
      pdfSectionTitle: 'SACRED PSYCHIC DECREE & ROADMAP',
    };

    setEditingCategory(defaultNewSpec);
    setIsCreatingNew(true);
    setActiveEditorTab('identity');
  };

  const handleEditCategory = (cat: CategorySpec) => {
    setEditingCategory(JSON.parse(JSON.stringify(cat)));
    setIsCreatingNew(false);
    setActiveEditorTab('identity');
  };

  const handleDuplicateCategory = (cat: CategorySpec) => {
    const cloned: CategorySpec = JSON.parse(JSON.stringify(cat));
    cloned.title = `${cloned.title} (Copy)`;
    cloned.headline = `${cloned.headline} (NEW)`;
    cloned.id = 101; // Will be auto-assigned
    setEditingCategory(cloned);
    setIsCreatingNew(true);
    setActiveEditorTab('identity');
    showToast(`Duplicating "${cat.title}" as a new custom listing`);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    if (!editingCategory.title.trim()) {
      alert('Please provide a category title.');
      return;
    }

    if (isCreatingNew) {
      const created = createCustomCategory(editingCategory);
      showToast(`Created new listing category: "${created.title}"`);
    } else {
      updateCategorySpec(editingCategory.id, editingCategory);
      showToast(`Updated category: "${editingCategory.title}"`);
    }

    setEditingCategory(null);
    setIsCreatingNew(false);
    refreshData();
  };

  const handleDeleteCustomCategory = (id: number) => {
    deleteCustomCategory(id);
    setDeleteConfirmId(null);
    refreshData();
    showToast('Custom category deleted');
  };

  const handleResetBuiltIn = (id: number) => {
    resetBuiltInCategory(id);
    refreshData();
    showToast('Restored category back to factory defaults');
  };

  const handleExportJson = () => {
    const jsonStr = exportCategoriesToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tarot_Shop_Categories_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded category listing backup JSON');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const res = importCategoriesFromJson(importJsonText);
    if (res.success) {
      setImportStatusMessage({ type: 'success', text: `Successfully imported ${res.count} category configurations!` });
      refreshData();
      setTimeout(() => {
        setIsImportExportOpen(false);
        setImportJsonText('');
        setImportStatusMessage(null);
        showToast(`Imported ${res.count} categories`);
      }, 1500);
    } else {
      setImportStatusMessage({ type: 'error', text: res.error || 'Failed to import JSON' });
    }
  };

  // Helper for Question Management in Editor
  const handleAddQuestion = () => {
    if (!editingCategory) return;
    const currentList = editingCategory.suggestedQuestions || [];
    const nextNum = currentList.length + 1;
    const updated = [...currentList, `${nextNum}. New channeled inquiry regarding your situation?`];
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

  const handleMoveQuestion = (idx: number, dir: 'up' | 'down') => {
    if (!editingCategory) return;
    const currentList = [...(editingCategory.suggestedQuestions || [])];
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentList.length) return;
    const temp = currentList[idx];
    currentList[idx] = currentList[targetIdx];
    currentList[targetIdx] = temp;
    setEditingCategory({ ...editingCategory, suggestedQuestions: currentList });
  };

  // Helper for Custom Field Management in Editor
  const handleAddField = () => {
    if (!editingCategory) return;
    const currentFields = editingCategory.customFields || [];
    const newField: CategoryFieldDef = {
      key: `customField_${Date.now()}`,
      label: 'New Querent Intake Field',
      type: 'text',
      placeholder: 'e.g. Additional querent details...',
      helpText: 'Guidance text for this input',
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
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-sm bg-[#4A3F35] text-[#FCFAF7] text-xs font-medium shadow-xl flex items-center gap-2 border border-[#BC6C25]/40"
          >
            <Sparkles className="w-4 h-4 text-[#BC6C25]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0D7CC] pb-4">
        <div>
          <button
            onClick={onBackToOracle}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Reading Oracle</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3F35]">
              Category & Listing Studio
            </h1>
            <span className="px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-[10px] font-bold text-[#8C7B6A] uppercase tracking-wider font-mono">
              {totalCount} Listings Active
            </span>
          </div>
          <p className="text-xs text-[#8C7B6A] mt-0.5">
            Add new reading listings, tailor targeted question spreads, and customize input fields for your Etsy shop and clients.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsImportExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xs bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-medium text-[#5C554E] hover:text-[#2C2C2C] transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-[#8C7B6A]" />
            <span>Import / Export</span>
          </button>

          <button
            onClick={() => setResetAllConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xs bg-white border border-[#E0D7CC] hover:border-[#DC2626] text-xs font-medium text-[#8C7B6A] hover:text-[#DC2626] transition-colors shadow-xs"
            title="Reset all categories to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleStartCreateNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#BC6C25]" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Metrics & Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-[#E0D7CC] rounded-xs shadow-xs">
          <div className="text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest">Total Categories</div>
          <div className="text-xl font-serif font-bold text-[#4A3F35] mt-1">{totalCount}</div>
        </div>
        <div className="p-3 bg-white border border-[#E0D7CC] rounded-xs shadow-xs">
          <div className="text-[10px] font-bold text-[#BC6C25] uppercase tracking-widest">Custom Listings</div>
          <div className="text-xl font-serif font-bold text-[#BC6C25] mt-1">{customCount}</div>
        </div>
        <div className="p-3 bg-white border border-[#E0D7CC] rounded-xs shadow-xs">
          <div className="text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest">Edited Defaults</div>
          <div className="text-xl font-serif font-bold text-[#4A3F35] mt-1">{editedCount}</div>
        </div>
        <div className="p-3 bg-white border border-[#E0D7CC] rounded-xs shadow-xs">
          <div className="text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest">Built-in Archetypes</div>
          <div className="text-xl font-serif font-bold text-[#4A3F35] mt-1">32</div>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="p-4 bg-white border border-[#E0D7CC] rounded-xs shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B6A]" />
            <input
              type="text"
              placeholder="Search listings by title, headline, questions, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] placeholder:text-[#8C7B6A]/60 focus:outline-none focus:border-[#4A3F35] font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7B6A] hover:text-[#4A3F35]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                filterType === 'all'
                  ? 'bg-[#4A3F35] text-[#FCFAF7]'
                  : 'bg-[#F2EDE8] text-[#5C554E] hover:bg-[#E0D7CC]'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilterType('custom')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                filterType === 'custom'
                  ? 'bg-[#BC6C25] text-white'
                  : 'bg-[#F2EDE8] text-[#5C554E] hover:bg-[#E0D7CC]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Custom ({customCount})
            </button>
            <button
              onClick={() => setFilterType('edited')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                filterType === 'edited'
                  ? 'bg-[#4A3F35] text-[#FCFAF7]'
                  : 'bg-[#F2EDE8] text-[#5C554E] hover:bg-[#E0D7CC]'
              }`}
            >
              Edited ({editedCount})
            </button>
            <button
              onClick={() => setFilterType('builtin')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
                filterType === 'builtin'
                  ? 'bg-[#4A3F35] text-[#FCFAF7]'
                  : 'bg-[#F2EDE8] text-[#5C554E] hover:bg-[#E0D7CC]'
              }`}
            >
              Built-In
            </button>
          </div>
        </div>

        {/* Archetype Filter Sub-row */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#EEEAE5] text-xs text-[#8C7B6A] overflow-x-auto pb-1">
          <span className="font-bold uppercase tracking-wider text-[10px] flex-shrink-0">Archetype:</span>
          <select
            value={archetypeFilter}
            onChange={(e) => setArchetypeFilter(e.target.value)}
            className="px-2.5 py-1 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#4A3F35] focus:outline-none focus:border-[#4A3F35]"
          >
            <option value="all">All Archetypes & Layouts</option>
            {ARCHETYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-[#8C7B6A] ml-auto">
            Showing {filteredCategoryList.length} of {totalCount} listings
          </span>
        </div>
      </div>

      {/* Category Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCategoryList.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white border border-[#E0D7CC] rounded-xs space-y-3">
            <HelpCircle className="w-8 h-8 text-[#8C7B6A] mx-auto opacity-50" />
            <h3 className="text-base font-serif font-bold text-[#4A3F35]">No categories found</h3>
            <p className="text-xs text-[#8C7B6A] max-w-sm mx-auto">
              No listing matched your search or active filters. Try adjusting your query or click below to create a new category.
            </p>
            <button
              onClick={handleStartCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-[#4A3F35] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider hover:bg-[#382F28] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#BC6C25]" />
              <span>Create New Listing</span>
            </button>
          </div>
        ) : (
          filteredCategoryList.map((cat) => {
            const isCustom = Number(cat.id) > 100 || Boolean(customCategories[cat.id]);
            const isEdited = Boolean(categoryOverrides[cat.id]);
            const qCount = cat.suggestedQuestions?.length || 5;
            const fieldsCount = cat.customFields?.length || 0;

            return (
              <div
                key={cat.id}
                className={`p-4.5 bg-white border rounded-xs shadow-xs transition-all flex flex-col justify-between group hover:border-[#4A3F35] ${
                  isCustom
                    ? 'border-[#BC6C25]/50 ring-1 ring-[#BC6C25]/10'
                    : isEdited
                    ? 'border-[#4A3F35]/40'
                    : 'border-[#E0D7CC]'
                }`}
              >
                <div className="space-y-2.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-[10px] font-bold text-[#4A3F35] font-mono">
                        #{cat.id}
                      </span>
                      {isCustom && (
                        <span className="px-2 py-0.5 rounded-xs bg-[#BC6C25]/15 border border-[#BC6C25]/40 text-[#BC6C25] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Custom Listing
                        </span>
                      )}
                      {isEdited && !isCustom && (
                        <span className="px-2 py-0.5 rounded-xs bg-[#4A3F35]/10 border border-[#4A3F35]/30 text-[#4A3F35] text-[10px] font-bold uppercase tracking-wider">
                          Edited Default
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8C7B6A] uppercase tracking-wider font-mono">
                      {qCount} Questions
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#1F1914] group-hover:text-[#BC6C25] transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <div className="text-[11px] font-mono font-semibold text-[#8C7B6A] tracking-wider uppercase truncate mt-0.5">
                      {cat.headline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#5C554E] line-clamp-2 leading-relaxed">
                    {cat.description || 'Custom reading spread designed for high-depth personal guidance.'}
                  </p>

                  {/* Feature Highlights Pills */}
                  <div className="flex items-center gap-2 text-[10px] text-[#8C7B6A] flex-wrap pt-1">
                    <span className="px-2 py-0.5 rounded-xs bg-[#FCFAF7] border border-[#EEEAE5]">
                      Layout: {cat.categoryType.replace(/_/g, ' ')}
                    </span>
                    {fieldsCount > 0 && (
                      <span className="px-2 py-0.5 rounded-xs bg-[#FCFAF7] border border-[#EEEAE5] text-[#BC6C25] font-semibold">
                        +{fieldsCount} Custom Inputs
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 mt-3 border-t border-[#EEEAE5] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="p-1.5 rounded-xs hover:bg-[#F2EDE8] text-[#5C554E] hover:text-[#4A3F35] transition-colors"
                      title="Edit Category & Custom Fields"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Duplicate Button */}
                    <button
                      onClick={() => handleDuplicateCategory(cat)}
                      className="p-1.5 rounded-xs hover:bg-[#F2EDE8] text-[#5C554E] hover:text-[#BC6C25] transition-colors"
                      title="Duplicate as New Custom Listing"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Reset built-in button */}
                    {isEdited && !isCustom && (
                      <button
                        onClick={() => handleResetBuiltIn(cat.id)}
                        className="p-1.5 rounded-xs hover:bg-[#F2EDE8] text-[#8C7B6A] hover:text-[#DC2626] transition-colors"
                        title="Reset to Factory Defaults"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete custom button */}
                    {isCustom && (
                      <button
                        onClick={() => setDeleteConfirmId(cat.id)}
                        className="p-1.5 rounded-xs hover:bg-[#FDF2F2] text-[#8C7B6A] hover:text-[#DC2626] transition-colors"
                        title="Delete Custom Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Primary "Use for Reading" CTA */}
                  <button
                    onClick={() => onSelectCategoryForReading(cat.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-semibold transition-all shadow-xs"
                  >
                    <span>Use in Reading</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#BC6C25]" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* CATEGORY EDITOR & BUILDER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {editingCategory && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-white border-b border-[#E0D7CC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F2EDE8] border border-[#4A3F35] flex items-center justify-center text-[#4A3F35]">
                    <Layers className="w-4 h-4 text-[#BC6C25]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#4A3F35]">
                      {isCreatingNew ? 'Create New Listing Category' : `Customize: ${editingCategory.title}`}
                    </h2>
                    <p className="text-xs text-[#8C7B6A]">
                      Configure listing metadata, tailored channeled questions, and custom intake fields.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-1.5 rounded-xs hover:bg-[#F2EDE8] text-[#8C7B6A] hover:text-[#4A3F35]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-[#E0D7CC] bg-[#F2EDE8]/60 px-4 pt-2 gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveEditorTab('identity')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeEditorTab === 'identity'
                      ? 'border-[#4A3F35] text-[#4A3F35] bg-white'
                      : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
                  }`}
                >
                  1. Listing Identity
                </button>
                <button
                  onClick={() => setActiveEditorTab('questions')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
                    activeEditorTab === 'questions'
                      ? 'border-[#4A3F35] text-[#4A3F35] bg-white'
                      : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
                  }`}
                >
                  <span>2. Questions Spread</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#E0D7CC] text-[#4A3F35] text-[10px]">
                    {editingCategory.suggestedQuestions?.length || 0}
                  </span>
                </button>
                <button
                  onClick={() => setActiveEditorTab('fields')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
                    activeEditorTab === 'fields'
                      ? 'border-[#4A3F35] text-[#4A3F35] bg-white'
                      : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
                  }`}
                >
                  <span>3. Custom Intake Fields</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#E0D7CC] text-[#4A3F35] text-[10px]">
                    {editingCategory.customFields?.length || 0}
                  </span>
                </button>
                <button
                  onClick={() => setActiveEditorTab('preview')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeEditorTab === 'preview'
                      ? 'border-[#4A3F35] text-[#4A3F35] bg-white'
                      : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
                  }`}
                >
                  4. Live Summary
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-5">
                {/* TAB 1: LISTING IDENTITY */}
                {activeEditorTab === 'identity' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                          Category / Listing Title *
                        </label>
                        <input
                          type="text"
                          value={editingCategory.title}
                          onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                          placeholder="e.g. Twin Flame Separation & Reunion"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                        />
                      </div>

                      {/* Headline */}
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                          Banner Headline (PDF Top & Header) *
                        </label>
                        <input
                          type="text"
                          value={editingCategory.headline}
                          onChange={(e) => setEditingCategory({ ...editingCategory, headline: e.target.value.toUpperCase() })}
                          placeholder="e.g. TWIN FLAME REUNION & SEPARATION INSIGHTS"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] font-mono focus:outline-none focus:border-[#4A3F35]"
                        />
                      </div>
                    </div>

                    {/* Archetype Layout */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>Archetype Layout & PDF Module Blueprint</span>
                        <span className="text-[10px] text-[#BC6C25] font-semibold">Controls PDF Architecture</span>
                      </label>
                      <select
                        value={editingCategory.categoryType}
                        onChange={(e) => setEditingCategory({ ...editingCategory, categoryType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                      >
                        {ARCHETYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label} — {opt.desc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                        Listing Purpose & Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        placeholder="Describe the spiritual focus and purpose of this listing..."
                        className="w-full px-3.5 py-2 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                      />
                    </div>

                    {/* PDF Section Header Title */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                        PDF Section Header Title
                      </label>
                      <input
                        type="text"
                        value={editingCategory.pdfSectionTitle || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, pdfSectionTitle: e.target.value })}
                        placeholder="e.g. SACRED INTUITIVE DECREE & ROADMAP"
                        className="w-full px-3.5 py-2 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                      />
                    </div>

                    {/* Querent Default Suggestions */}
                    <div className="p-4 bg-[#F2EDE8]/50 border border-[#E0D7CC] rounded-xs space-y-3">
                      <div className="text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#BC6C25]" />
                        <span>Intake Form Default Suggestions</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5C554E] uppercase mb-1">
                          Suggested Default Problem Context:
                        </label>
                        <textarea
                          rows={2}
                          value={editingCategory.suggestedProblem || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, suggestedProblem: e.target.value })}
                          placeholder="Example problem context that querents can click to auto-fill..."
                          className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5C554E] uppercase mb-1">
                          Suggested Default Core Question:
                        </label>
                        <input
                          type="text"
                          value={editingCategory.suggestedQuestion || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, suggestedQuestion: e.target.value })}
                          placeholder="Example core question for this reading..."
                          className="w-full px-3 py-1.5 bg-white border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: QUESTIONS SPREAD */}
                {activeEditorTab === 'questions' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#4A3F35] uppercase tracking-wider">
                          Targeted Questions Spread ({editingCategory.suggestedQuestions?.length || 0})
                        </h4>
                        <p className="text-[11px] text-[#8C7B6A]">
                          These questions are channeled in Module C of the PDF. Reorder or customize them below.
                        </p>
                      </div>
                      <button
                        onClick={handleAddQuestion}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-bold uppercase tracking-wider"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#BC6C25]" />
                        <span>Add Question</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(editingCategory.suggestedQuestions || []).map((q, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white border border-[#E0D7CC] rounded-xs flex items-start gap-2.5 group hover:border-[#4A3F35]"
                        >
                          <span className="w-6 h-6 rounded-full bg-[#F2EDE8] border border-[#E0D7CC] flex items-center justify-center text-[10px] font-bold text-[#4A3F35] flex-shrink-0 mt-1">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={q}
                              onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                              className="w-full px-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                            />
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleMoveQuestion(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded-xs hover:bg-[#F2EDE8] text-[#8C7B6A] disabled:opacity-30"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveQuestion(idx, 'down')}
                              disabled={idx === (editingCategory.suggestedQuestions?.length || 0) - 1}
                              className="p-1 rounded-xs hover:bg-[#F2EDE8] text-[#8C7B6A] disabled:opacity-30"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleRemoveQuestion(idx)}
                              className="p-1 rounded-xs hover:bg-[#FDF2F2] text-[#8C7B6A] hover:text-[#DC2626]"
                              title="Remove Question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: CUSTOM INTAKE FIELDS */}
                {activeEditorTab === 'fields' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#4A3F35] uppercase tracking-wider">
                          Custom Querent Intake Fields ({editingCategory.customFields?.length || 0})
                        </h4>
                        <p className="text-[11px] text-[#8C7B6A]">
                          Add special fields that will dynamically appear on the Querent Intake Form (e.g. Partner Name, Pet Type, Business Niche).
                        </p>
                      </div>
                      <button
                        onClick={handleAddField}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-bold uppercase tracking-wider"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#BC6C25]" />
                        <span>Add Field</span>
                      </button>
                    </div>

                    {(editingCategory.customFields || []).length === 0 ? (
                      <div className="p-8 text-center bg-white border border-[#E0D7CC] rounded-xs space-y-2">
                        <Type className="w-6 h-6 text-[#8C7B6A] mx-auto opacity-50" />
                        <p className="text-xs text-[#8C7B6A]">No custom intake fields configured for this category.</p>
                        <button
                          onClick={handleAddField}
                          className="text-xs font-bold text-[#BC6C25] hover:underline"
                        >
                          + Add a custom querent field
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(editingCategory.customFields || []).map((field, idx) => (
                          <div key={idx} className="p-4 bg-white border border-[#E0D7CC] rounded-xs space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-[#EEEAE5] pb-2">
                              <span className="text-xs font-bold text-[#4A3F35] font-mono">
                                Field #{idx + 1}: {field.key}
                              </span>
                              <button
                                onClick={() => handleRemoveField(idx)}
                                className="p-1 text-[#8C7B6A] hover:text-[#DC2626]"
                                title="Remove Field"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase mb-1">
                                  Field Label
                                </label>
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => handleUpdateField(idx, { label: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase mb-1">
                                  Field Input Type
                                </label>
                                <select
                                  value={field.type}
                                  onChange={(e) => handleUpdateField(idx, { type: e.target.value as any })}
                                  className="w-full px-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C]"
                                >
                                  <option value="text">Single Line Text</option>
                                  <option value="textarea">Multi-line Text Area</option>
                                  <option value="list">Custom List / Questions Items</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase mb-1">
                                  Placeholder
                                </label>
                                <input
                                  type="text"
                                  value={field.placeholder || ''}
                                  onChange={(e) => handleUpdateField(idx, { placeholder: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase mb-1">
                                  Help / Guidance Text
                                </label>
                                <input
                                  type="text"
                                  value={field.helpText || ''}
                                  onChange={(e) => handleUpdateField(idx, { helpText: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: LIVE PREVIEW */}
                {activeEditorTab === 'preview' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-[#4A3F35] rounded-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-xs bg-[#BC6C25]/20 text-[#BC6C25] text-[10px] font-bold uppercase tracking-wider font-mono">
                          Listing Summary Preview
                        </span>
                        <span className="text-xs font-mono text-[#8C7B6A]">ID: #{editingCategory.id}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#1F1914]">{editingCategory.title}</h3>
                      <div className="text-xs font-mono font-bold text-[#8C7B6A] tracking-wider uppercase">
                        {editingCategory.headline}
                      </div>

                      <p className="text-xs text-[#5C554E] leading-relaxed border-t border-[#EEEAE5] pt-2">
                        {editingCategory.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs">
                          <span className="text-[10px] font-bold text-[#8C7B6A] uppercase block">Archetype:</span>
                          <span className="font-semibold text-[#4A3F35]">{editingCategory.categoryType}</span>
                        </div>
                        <div className="p-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs">
                          <span className="text-[10px] font-bold text-[#8C7B6A] uppercase block">Channeled Inquiries:</span>
                          <span className="font-semibold text-[#4A3F35]">
                            {editingCategory.suggestedQuestions?.length || 0} Questions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white border-t border-[#E0D7CC] flex items-center justify-between">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xs border border-[#E0D7CC] hover:bg-[#F2EDE8] text-xs font-medium text-[#5C554E]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="flex items-center gap-2 px-5 py-2 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Check className="w-4 h-4 text-[#BC6C25]" />
                  <span>{isCreatingNew ? 'Create Listing' : 'Save Changes'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* IMPORT / EXPORT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isImportExportOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs shadow-2xl max-w-xl w-full p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E0D7CC] pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#BC6C25]" />
                  <h3 className="text-base font-serif font-bold text-[#4A3F35]">
                    Category Backup & Sync
                  </h3>
                </div>
                <button
                  onClick={() => setIsImportExportOpen(false)}
                  className="p-1 text-[#8C7B6A] hover:text-[#4A3F35]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {importStatusMessage && (
                <div
                  className={`p-3 rounded-xs text-xs flex items-center gap-2 ${
                    importStatusMessage.type === 'success'
                      ? 'bg-[#F0FDF4] border border-[#86EFAC] text-[#166534]'
                      : 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B]'
                  }`}
                >
                  {importStatusMessage.type === 'success' ? (
                    <Check className="w-4 h-4 text-[#16A34A]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                  )}
                  <span>{importStatusMessage.text}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4A3F35] uppercase tracking-wider">
                    Export Listings:
                  </span>
                  <button
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-semibold text-[#4A3F35]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#BC6C25]" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="border-t border-[#EEEAE5] pt-3">
                  <label className="block text-xs font-bold text-[#4A3F35] uppercase tracking-wider mb-1.5">
                    Import or Restore Listings (Paste JSON):
                  </label>
                  <textarea
                    rows={5}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste exported category JSON configuration here..."
                    className="w-full p-3 bg-white border border-[#E0D7CC] rounded-xs text-xs font-mono text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleImportJson}
                      disabled={!importJsonText.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#4A3F35] text-[#FCFAF7] hover:bg-[#382F28] text-xs font-bold uppercase tracking-wider disabled:opacity-40"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#BC6C25]" />
                      <span>Import Listings</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {deleteConfirmId !== null && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#E0D7CC] rounded-xs shadow-2xl max-w-sm w-full p-5 space-y-3"
            >
              <h3 className="text-base font-serif font-bold text-[#DC2626] flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Custom Category?</span>
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Are you sure you want to delete this custom category? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1.5 rounded-xs border border-[#E0D7CC] text-xs font-medium text-[#5C554E]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteCustomCategory(deleteConfirmId)}
                  className="px-3 py-1.5 rounded-xs bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B91C1C]"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* RESET ALL CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {resetAllConfirmOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#E0D7CC] rounded-xs shadow-2xl max-w-sm w-full p-5 space-y-3"
            >
              <h3 className="text-base font-serif font-bold text-[#4A3F35] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#BC6C25]" />
                <span>Reset to Factory Defaults?</span>
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                This will remove all custom categories and restore built-in categories to their original factory defaults.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setResetAllConfirmOpen(false)}
                  className="px-3 py-1.5 rounded-xs border border-[#E0D7CC] text-xs font-medium text-[#5C554E]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetAllCategoriesToFactory();
                    setResetAllConfirmOpen(false);
                    refreshData();
                    showToast('All categories restored to factory defaults');
                  }}
                  className="px-3 py-1.5 rounded-xs bg-[#4A3F35] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider hover:bg-[#382F28]"
                >
                  Reset All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
