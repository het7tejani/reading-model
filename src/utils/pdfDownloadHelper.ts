import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfGenerationProgress {
  currentPage: number;
  totalPages: number;
  status: string;
}

export const generateAndDownloadPdf = async (
  querentName: string,
  onProgress?: (progress: PdfGenerationProgress) => void
): Promise<void> => {
  const pageElements = document.querySelectorAll<HTMLElement>('.pdf-page');
  const totalPages = pageElements.length || 25;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4', // 595.28 x 841.89 pt
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    const pageEl = document.getElementById(`pdf-page-${i}`);
    if (!pageEl) continue;

    if (onProgress) {
      onProgress({
        currentPage: i,
        totalPages,
        status: `Rendering page ${i} of ${totalPages}...`,
      });
    }

    // Capture the page element with html2canvas
    const canvas = await html2canvas(pageEl, {
      scale: 2, // High resolution (retina)
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FAF7EE',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 1) {
      pdf.addPage();
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  if (onProgress) {
    onProgress({
      currentPage: totalPages,
      totalPages,
      status: 'Saving PDF file...',
    });
  }

  const cleanName = querentName.trim().replace(/\s+/g, '_') || 'Querent';
  pdf.save(`Tarot_Numerology_Reading_${cleanName}.pdf`);
};
