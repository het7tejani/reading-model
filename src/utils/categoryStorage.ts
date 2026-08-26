import { CategorySpec, CATEGORY_SPECS } from '../data/categoryConfig';
import { ReadingTopic, READING_TOPICS } from '../data/readingTopics';
import { TopicBlueprintSpec, TOPIC_MASTER_BLUEPRINTS } from './categoryPageHelper';

export const CUSTOM_CATEGORIES_STORAGE_KEY = 'tarot_custom_categories_v1';
export const CATEGORY_OVERRIDES_STORAGE_KEY = 'tarot_category_overrides_v1';

export interface CategoryStoreData {
  customCategories: Record<number | string, CategorySpec>;
  categoryOverrides: Record<number, Partial<CategorySpec>>;
}

// Event for cross-component reactivity in React
export const CATEGORIES_UPDATED_EVENT = 'tarot_categories_updated';

export const notifyCategoriesUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CATEGORIES_UPDATED_EVENT));
  }
};

/**
 * Load custom categories and overrides from LocalStorage
 */
export const loadCategoryStore = (): CategoryStoreData => {
  if (typeof window === 'undefined') {
    return { customCategories: {}, categoryOverrides: {} };
  }

  try {
    const rawCustom = localStorage.getItem(CUSTOM_CATEGORIES_STORAGE_KEY);
    const rawOverrides = localStorage.getItem(CATEGORY_OVERRIDES_STORAGE_KEY);

    const customCategories: Record<number | string, CategorySpec> = rawCustom ? JSON.parse(rawCustom) : {};
    const categoryOverrides: Record<number, Partial<CategorySpec>> = rawOverrides ? JSON.parse(rawOverrides) : {};

    return { customCategories, categoryOverrides };
  } catch (err) {
    console.error('Error loading custom categories from localStorage:', err);
    return { customCategories: {}, categoryOverrides: {} };
  }
};

/**
 * Save custom categories to LocalStorage
 */
export const saveCustomCategoriesToStorage = (customCategories: Record<number | string, CategorySpec>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_CATEGORIES_STORAGE_KEY, JSON.stringify(customCategories));
    notifyCategoriesUpdated();
  } catch (err) {
    console.error('Error saving custom categories to localStorage:', err);
  }
};

/**
 * Save category overrides to LocalStorage
 */
export const saveCategoryOverridesToStorage = (overrides: Record<number, Partial<CategorySpec>>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CATEGORY_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
    notifyCategoriesUpdated();
  } catch (err) {
    console.error('Error saving category overrides to localStorage:', err);
  }
};

/**
 * Get all categories merged (built-in with overrides + custom categories)
 */
export const getAllMergedCategorySpecs = (): Record<number | string, CategorySpec> => {
  const { customCategories, categoryOverrides } = loadCategoryStore();

  const merged: Record<number | string, CategorySpec> = {};

  // 1. Built-in with overrides
  Object.entries(CATEGORY_SPECS).forEach(([idStr, baseSpec]) => {
    const id = Number(idStr);
    const override = categoryOverrides[id];
    if (override) {
      merged[id] = { ...baseSpec, ...override };
    } else {
      merged[id] = { ...baseSpec };
    }
  });

  // 2. Custom user-created categories
  Object.entries(customCategories).forEach(([idStr, customSpec]) => {
    merged[idStr] = { ...customSpec };
  });

  return merged;
};

/**
 * Get all reading topics list merged (including custom ones)
 */
export const getAllMergedReadingTopics = (): ReadingTopic[] => {
  const allSpecs = getAllMergedCategorySpecs();

  return Object.values(allSpecs).map((spec) => ({
    id: typeof spec.id === 'number' ? spec.id : Number(spec.id) || 100,
    title: spec.title,
    headline: spec.headline,
  }));
};

/**
 * Get single merged spec by ID or title
 */
export const getMergedCategorySpec = (topic: string | number): CategorySpec => {
  const allSpecs = getAllMergedCategorySpecs();

  if (typeof topic === 'number') {
    if (allSpecs[topic]) return allSpecs[topic];
  }

  const clean = String(topic)
    .trim()
    .toLowerCase()
    .replace(/^topic\s*\d+[:.\s]*/i, '')
    .replace(/^\d+[\.\)]\s*/, '');

  const found = Object.values(allSpecs).find((spec) => {
    return (
      spec.title.toLowerCase().includes(clean) ||
      clean.includes(spec.title.toLowerCase()) ||
      spec.headline.toLowerCase().includes(clean) ||
      clean.includes(spec.headline.toLowerCase())
    );
  });

  return found || allSpecs[1] || CATEGORY_SPECS[1];
};

/**
 * Create a new custom category
 */
export const createCustomCategory = (spec: Omit<CategorySpec, 'id'> & { id?: number }): CategorySpec => {
  const { customCategories } = loadCategoryStore();

  // Determine next unique ID (starting from 101 for custom categories)
  const existingIds = Object.keys(customCategories).map(Number).filter((n) => !isNaN(n));
  const maxCustomId = existingIds.length > 0 ? Math.max(...existingIds, 100) : 100;
  const newId = spec.id && spec.id > 100 ? spec.id : maxCustomId + 1;

  const newSpec: CategorySpec = {
    ...spec,
    id: newId,
  };

  customCategories[newId] = newSpec;
  saveCustomCategoriesToStorage(customCategories);

  return newSpec;
};

/**
 * Update an existing category (either custom category or override built-in category)
 */
export const updateCategorySpec = (id: number, updates: Partial<CategorySpec>) => {
  const { customCategories, categoryOverrides } = loadCategoryStore();

  if (id > 100 || customCategories[id]) {
    // It's a custom category
    if (customCategories[id]) {
      customCategories[id] = { ...customCategories[id], ...updates };
      saveCustomCategoriesToStorage(customCategories);
    }
  } else {
    // It's a built-in category override
    categoryOverrides[id] = { ...(categoryOverrides[id] || {}), ...updates };
    saveCategoryOverridesToStorage(categoryOverrides);
  }
};

/**
 * Delete a custom category
 */
export const deleteCustomCategory = (id: number): boolean => {
  const { customCategories } = loadCategoryStore();
  if (customCategories[id]) {
    delete customCategories[id];
    saveCustomCategoriesToStorage(customCategories);
    return true;
  }
  return false;
};

/**
 * Reset a built-in category back to defaults (remove its overrides)
 */
export const resetBuiltInCategory = (id: number) => {
  const { categoryOverrides } = loadCategoryStore();
  if (categoryOverrides[id]) {
    delete categoryOverrides[id];
    saveCategoryOverridesToStorage(categoryOverrides);
  }
};

/**
 * Reset all categories (clear custom and overrides)
 */
export const resetAllCategoriesToFactory = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CUSTOM_CATEGORIES_STORAGE_KEY);
  localStorage.removeItem(CATEGORY_OVERRIDES_STORAGE_KEY);
  notifyCategoriesUpdated();
};

/**
 * Export all categories and overrides to JSON
 */
export const exportCategoriesToJson = (): string => {
  const store = loadCategoryStore();
  const allMerged = getAllMergedCategorySpecs();
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      customCategories: store.customCategories,
      categoryOverrides: store.categoryOverrides,
      allCategoriesCount: Object.keys(allMerged).length,
    },
    null,
    2
  );
};

/**
 * Import categories from JSON
 */
export const importCategoriesFromJson = (jsonStr: string): { success: boolean; count: number; error?: string } => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, count: 0, error: 'Invalid JSON format' };
    }

    const custom = parsed.customCategories || {};
    const overrides = parsed.categoryOverrides || {};

    const currentStore = loadCategoryStore();
    const mergedCustom = { ...currentStore.customCategories, ...custom };
    const mergedOverrides = { ...currentStore.categoryOverrides, ...overrides };

    saveCustomCategoriesToStorage(mergedCustom);
    saveCategoryOverridesToStorage(mergedOverrides);

    const importedCount = Object.keys(custom).length + Object.keys(overrides).length;
    return { success: true, count: importedCount };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Failed to parse JSON file' };
  }
};
