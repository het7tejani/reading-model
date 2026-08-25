import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
}

/**
 * Renders each page of an uploaded PDF File or ArrayBuffer into high-res data URLs (PNG / JPEG)
 */
export async function convertPdfToPageImages(
  fileOrBuffer: File | ArrayBuffer,
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const arrayBuffer = fileOrBuffer instanceof File ? await fileOrBuffer.arrayBuffer() : fileOrBuffer;
  const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdfDoc.numPages;
  const pageImages: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) {
      onProgress(i, numPages);
    }
    const page = await pdfDoc.getPage(i);
    // Render at 2x scale for crisp retina background
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      };
      await page.render(renderContext).promise;
      const imgUrl = canvas.toDataURL('image/jpeg', 0.95);
      pageImages.push(imgUrl);
    }
  }

  return pageImages;
}

// Local storage key for custom template background images cache
export const TEMPLATE_STORAGE_KEY = 'daisy_medium_custom_pdf_template_pages';

export function saveTemplatePagesToLocalStorage(pages: string[]) {
  try {
    sessionStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    console.warn('SessionStorage quota exceeded or error storing template pages:', e);
  }
}

export function loadTemplatePagesFromLocalStorage(): string[] | null {
  try {
    const raw = sessionStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
