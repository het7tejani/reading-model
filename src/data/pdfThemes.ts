import { PdfThemeId } from '../types';

export interface PdfThemeSwatch {
  bg: string;
  primary: string;
  accent: string;
  cardBg: string;
  border: string;
  isDark?: boolean;
}

export interface PdfThemeColors {
  pageBg: string;
  vignetteColor: string;
  textMain: string;
  textHeading: string;
  textSub: string;
  textMuted: string;
  accent: string;
  accentSecondary: string;
  borderSubtle: string;
  borderStrong: string;
  cornerFiligreeColor: string;
  cardBg: string;
  cardBorder: string;
  headerText: string;
  headerBorder: string;
  watermarkColor: string;
  watermarkOpacity: number;
  sealColor: string;
}

export interface PdfThemeConfig {
  id: PdfThemeId;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  archetype: string;
  swatch: PdfThemeSwatch;
  colors: PdfThemeColors;
  decorations: {
    watermarkType:
      | 'astrology_wheel'
      | 'midnight_celestial'
      | 'botanical_mandala'
      | 'third_eye_portal'
      | 'minimal_compass';
    borderStyle:
      | 'classic_double'
      | 'gilded_celestial'
      | 'organic_botanical'
      | 'cathedral_arch'
      | 'modern_hairline';
    cornerGlyph: string;
    dividerSymbol: string;
    headerIcon: string;
    sealText: string;
  };
  typography: {
    displayFont: string;
    headingFont: string;
    bodyFont: string;
    accentFont: string;
  };
}

export const PDF_THEMES: Record<PdfThemeId, PdfThemeConfig> = {
  parchment: {
    id: 'parchment',
    name: 'The Hermetic Manuscript',
    subtitle: 'Antique Grimoire & Alchemical Gold',
    category: 'Ancient Occult & Renaissance Grimoire',
    archetype: 'Sacred Hermetica, Rider-Waite & Alchemical Wisdom',
    description:
      'Aged vellum parchment with antique vignette margins, intricate Renaissance baroque corner filigree, alchemical decan wheel, and ceremonial inscriptional Roman typography.',
    swatch: {
      bg: '#FAF7EE',
      primary: '#1F1914',
      accent: '#BC6C25',
      cardBg: '#F4EFE6',
      border: '#D8CEBE',
      isDark: false,
    },
    colors: {
      pageBg: '#FAF7EE',
      vignetteColor: '#E8DECC',
      textMain: '#2A2118',
      textHeading: '#1A130E',
      textSub: '#48392B',
      textMuted: '#6B5844',
      accent: '#B06822',
      accentSecondary: '#C99355',
      borderSubtle: '#D6C8B4',
      borderStrong: '#9E8669',
      cornerFiligreeColor: '#B06822',
      cardBg: '#F5EFE4',
      cardBorder: '#D8CAB4',
      headerText: '#6B5844',
      headerBorder: '#E2D5C3',
      watermarkColor: '#8C7052',
      watermarkOpacity: 0.115,
      sealColor: '#B06822',
    },
    decorations: {
      watermarkType: 'astrology_wheel',
      borderStyle: 'classic_double',
      cornerGlyph: '✦',
      dividerSymbol: '✦',
      headerIcon: '✦',
      sealText: 'CONSECRATED HERMETIC READING',
    },
    typography: {
      displayFont: "'Cinzel Decorative', 'Cinzel', serif",
      headingFont: "'Cinzel', 'Cormorant Garamond', serif",
      bodyFont: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
      accentFont: "'Cormorant Garamond', italic, serif",
    },
  },

  midnight: {
    id: 'midnight',
    name: 'The Starlight Oracle',
    subtitle: 'Midnight Velvet & Celestial Gold',
    category: 'Celestial Astral & Spirit Telepathy',
    archetype: 'Cosmic Mediumship, Starlight & Lunar Deities',
    description:
      'Deep velvety astral midnight obsidian with glowing starlight constellations, lunar phase orbits, radiant golden starburst filigree corners, and luminous ceremonial gold typography.',
    swatch: {
      bg: '#0B0F19',
      primary: '#EDE8DF',
      accent: '#E0A96D',
      cardBg: '#131A2B',
      border: '#2A3752',
      isDark: true,
    },
    colors: {
      pageBg: '#0B0F19',
      vignetteColor: '#05070D',
      textMain: '#F2ECE1',
      textHeading: '#F7E2BA',
      textSub: '#D6C9B4',
      textMuted: '#A69882',
      accent: '#E5B070',
      accentSecondary: '#F7D678',
      borderSubtle: '#26344E',
      borderStrong: '#CCA456',
      cornerFiligreeColor: '#E5B070',
      cardBg: '#121A2A',
      cardBorder: '#2E3D5C',
      headerText: '#CCA456',
      headerBorder: '#233047',
      watermarkColor: '#CCA456',
      watermarkOpacity: 0.165,
      sealColor: '#F7D678',
    },
    decorations: {
      watermarkType: 'midnight_celestial',
      borderStyle: 'gilded_celestial',
      cornerGlyph: '✦',
      dividerSymbol: '☾ ✦ ☽',
      headerIcon: '✦',
      sealText: 'ASTRAL STARLIGHT ORACLE',
    },
    typography: {
      displayFont: "'Cinzel Decorative', 'Cinzel', serif",
      headingFont: "'Cinzel', 'Marcellus', serif",
      bodyFont: "'Cormorant Garamond', 'EB Garamond', serif",
      accentFont: "'Marcellus', serif",
    },
  },

  botanical: {
    id: 'botanical',
    name: 'The Herbal Alchemist',
    subtitle: 'Earth Linen, Sage & Laurel',
    category: 'Natural Apothecary & Energy Healing',
    archetype: 'Green Witchcraft, Aura & Botanical Remedies',
    description:
      'Organic herbal linen paper texture framed by hand-drawn botanical laurel vines, sacred geometry Seed of Life, and classical Renaissance natural philosophy typography.',
    swatch: {
      bg: '#F3F5ED',
      primary: '#1C241D',
      accent: '#556331',
      cardBg: '#E7ECE0',
      border: '#C4CFB9',
      isDark: false,
    },
    colors: {
      pageBg: '#F3F5ED',
      vignetteColor: '#E2E8D8',
      textMain: '#1A241C',
      textHeading: '#233024',
      textSub: '#3D4D3E',
      textMuted: '#5C6E5B',
      accent: '#556331',
      accentSecondary: '#825835',
      borderSubtle: '#C8D4BF',
      borderStrong: '#7D8E73',
      cornerFiligreeColor: '#556331',
      cardBg: '#E7ECE0',
      cardBorder: '#BFCCB4',
      headerText: '#556331',
      headerBorder: '#CCD7C4',
      watermarkColor: '#556331',
      watermarkOpacity: 0.115,
      sealColor: '#556331',
    },
    decorations: {
      watermarkType: 'botanical_mandala',
      borderStyle: 'organic_botanical',
      cornerGlyph: '🌿',
      dividerSymbol: '🪷',
      headerIcon: '🌿',
      sealText: 'NATURAL PHILOSOPHY & APOTHECARY',
    },
    typography: {
      displayFont: "'Cormorant Garamond', 'Cinzel', serif",
      headingFont: "'Cormorant Garamond', 'Cinzel', serif",
      bodyFont: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
      accentFont: "'Cormorant Garamond', italic, serif",
    },
  },

  amethyst: {
    id: 'amethyst',
    name: 'The Clairvoyant Sanctuary',
    subtitle: 'Mystic Amethyst & Sacred Third Eye',
    category: 'Psychic Mediumship & Third Eye',
    archetype: 'Clairvoyance, Ancestral Communion & Spirit Guides',
    description:
      'Ethereal lavender silk canvas with radiant third-eye of Providence aura, Gothic cathedral pointed arches, sacred geometry merkaba, and mystical illuminated typography.',
    swatch: {
      bg: '#FAF4FC',
      primary: '#23152C',
      accent: '#7B2CBF',
      cardBg: '#F2E7F7',
      border: '#DBCBE6',
      isDark: false,
    },
    colors: {
      pageBg: '#FAF4FC',
      vignetteColor: '#EBD9F3',
      textMain: '#24142E',
      textHeading: '#381652',
      textSub: '#573E6B',
      textMuted: '#795E91',
      accent: '#7B2CBF',
      accentSecondary: '#B565F0',
      borderSubtle: '#DACBE4',
      borderStrong: '#9973B5',
      cornerFiligreeColor: '#7B2CBF',
      cardBg: '#F1E6F7',
      cardBorder: '#D4BFE2',
      headerText: '#6F4E85',
      headerBorder: '#E2D1ED',
      watermarkColor: '#7B2CBF',
      watermarkOpacity: 0.115,
      sealColor: '#7B2CBF',
    },
    decorations: {
      watermarkType: 'third_eye_portal',
      borderStyle: 'cathedral_arch',
      cornerGlyph: '🜚',
      dividerSymbol: '🜚',
      headerIcon: '🜚',
      sealText: 'CLAIRVOYANT SANCTUARY CONSECRATION',
    },
    typography: {
      displayFont: "'Cinzel Decorative', 'Cinzel', serif",
      headingFont: "'Cinzel', 'Cormorant Garamond', serif",
      bodyFont: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
      accentFont: "'Marcellus', serif",
    },
  },

  minimalist: {
    id: 'minimalist',
    name: 'Haute Divination',
    subtitle: 'Modern Atelier & Sacred Geometry',
    category: 'Contemporary Luxury & Fine Art',
    archetype: 'Modern Mystic, High-End Studio & Swiss Grid',
    description:
      'Pristine museum archival vellum, ultra-fine architectural double hairlines, calibrated celestial coordinate ticks, Golden Ratio spiral, and high-fashion Italian display serif typography.',
    swatch: {
      bg: '#FDFCFB',
      primary: '#141414',
      accent: '#8A6B47',
      cardBg: '#F6F3EF',
      border: '#E2DDD6',
      isDark: false,
    },
    colors: {
      pageBg: '#FDFCFB',
      vignetteColor: '#F2EDE6',
      textMain: '#141414',
      textHeading: '#0A0A0A',
      textSub: '#424242',
      textMuted: '#6E6E6E',
      accent: '#8A6B47',
      accentSecondary: '#2E2E2E',
      borderSubtle: '#E2DDD6',
      borderStrong: '#9E978E',
      cornerFiligreeColor: '#8A6B47',
      cardBg: '#F6F3EF',
      cardBorder: '#DDD7CE',
      headerText: '#666666',
      headerBorder: '#E6E1D9',
      watermarkColor: '#222222',
      watermarkOpacity: 0.08,
      sealColor: '#8A6B47',
    },
    decorations: {
      watermarkType: 'minimal_compass',
      borderStyle: 'modern_hairline',
      cornerGlyph: '+',
      dividerSymbol: '—',
      headerIcon: '—',
      sealText: 'ATELIER DIVINATION ARCHIVE',
    },
    typography: {
      displayFont: "'Italiana', 'Cinzel', serif",
      headingFont: "'Italiana', 'Marcellus', 'Cinzel', serif",
      bodyFont: "'EB Garamond', 'Cormorant Garamond', serif",
      accentFont: "'Marcellus', serif",
    },
  },
};

export const PDF_THEME_LIST: PdfThemeConfig[] = [
  PDF_THEMES.parchment,
  PDF_THEMES.midnight,
  PDF_THEMES.botanical,
  PDF_THEMES.amethyst,
  PDF_THEMES.minimalist,
];

export function getPdfTheme(themeId?: PdfThemeId): PdfThemeConfig {
  if (themeId && PDF_THEMES[themeId]) {
    return PDF_THEMES[themeId];
  }
  return PDF_THEMES.parchment;
}
