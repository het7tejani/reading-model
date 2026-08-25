import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ShieldCheck } from 'lucide-react';

interface FormattingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormattingGuideModal: React.FC<FormattingGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      num: '01',
      title: 'Numerology (Life Path)',
      desc: 'Accurate single-digit or master reduction formula breakdown (Month: X, Day: Y, Year: Z, Total: N -> M) followed by two concise paragraphs detailing Core Energy in relation to the problem.'
    },
    {
      num: '02',
      title: '3-Card Energy Overview',
      desc: 'Subheadings for Card 1 (Current Energy), Card 2 (The Blockage), and Card 3 (Path Forward), each accompanied by 5-7 keywords and exactly two interpretive paragraphs.'
    },
    {
      num: '03',
      title: 'Synthesis',
      desc: 'Exactly 4-5 paragraphs weaving Life Path number, the 3 spread cards, and the querent’s question into an empowering narrative arc.'
    },
    {
      num: '04',
      title: 'Q&A Insights',
      desc: 'Exact 2-3 sentence answers to 5 core soul questions (Hidden lesson, Embody energy, Subconscious block to release, Recognizing the path, Ultimate potential).'
    },
    {
      num: '05',
      title: 'Action Steps & Reflection',
      desc: '4 numbered steps ([1], [2], [3], [4]) structured across the next 30 days.'
    },
    {
      num: '06',
      title: 'Your Energetic Mantras',
      desc: '5 bulleted custom "I AM" affirmations crafted for the querent’s vibration.'
    },
    {
      num: '07',
      title: 'Soul Inquiries',
      desc: '3 deep introspective journaling questions.'
    },
    {
      num: '08',
      title: 'Your Spiritual Prescription',
      desc: '1-2 Crystals, 1-2 Botanicals (tea/aromatherapy), and 1 grounding Mindfulness Practice.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#FCFAF7] border border-[#E0D7CC] rounded-sm shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0D7CC] bg-[#F2EDE8]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#8C7B6A]" />
              <div>
                <h3 className="text-base font-serif italic font-bold text-[#4A3F35]">
                  PDF Template Specification
                </h3>
                <p className="text-xs text-[#8C7B6A]">
                  Strict 8-section layout calibrated for document compilation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#8C7B6A] hover:text-[#4A3F35] rounded-xs hover:bg-[#E0D7CC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="p-3.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-xs text-[#5C554E] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#4A3F35] flex-shrink-0 mt-0.5" />
              <p>
                Every reading output is strictly structured in Markdown without conversational preambles or postscripts, allowing clean integration directly into PDF generation pipelines.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {sections.map((sec) => (
                <div
                  key={sec.num}
                  className="p-3.5 rounded-xs bg-white border border-[#EEEAE5] flex items-start gap-3 shadow-xs"
                >
                  <span className="w-6 h-6 rounded-full border border-[#4A3F35] bg-[#F2EDE8] text-[#4A3F35] font-serif italic font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {sec.num}
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#4A3F35]">{sec.title}</h4>
                    <p className="text-xs text-[#5C554E] mt-0.5 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#E0D7CC] bg-[#F2EDE8] flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xs bg-white hover:bg-[#E0D7CC] border border-[#E0D7CC] text-xs font-semibold text-[#4A3F35] transition-colors shadow-xs"
            >
              Close Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
