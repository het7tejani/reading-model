import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, Trash2, ArrowRight, Copy, Check, Calendar, Sparkles } from 'lucide-react';
import { StoredReading } from '../types';

interface ReadingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: StoredReading[];
  onSelectReading: (reading: StoredReading) => void;
  onDeleteReading: (id: string) => void;
  onClearHistory: () => void;
}

export const ReadingHistoryModal: React.FC<ReadingHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectReading,
  onDeleteReading,
  onClearHistory
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (reading: StoredReading, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(reading.markdownContent);
    setCopiedId(reading.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

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
              <History className="w-4 h-4 text-[#8C7B6A]" />
              <div>
                <h3 className="text-base font-serif italic font-bold text-[#4A3F35]">
                  Reading Archives & History
                </h3>
                <p className="text-xs text-[#8C7B6A]">
                  {history.length} saved reading{history.length === 1 ? '' : 's'} stored locally
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="px-2.5 py-1 text-xs text-[#BC6C25] hover:text-[#4A3F35] hover:bg-[#E0D7CC] rounded-xs transition-colors font-medium"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 text-[#8C7B6A] hover:text-[#4A3F35] rounded-xs hover:bg-[#E0D7CC] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
            {history.length === 0 ? (
              <div className="py-16 text-center text-[#8C7B6A] space-y-2">
                <Sparkles className="w-6 h-6 mx-auto text-[#8C7B6A]/50" />
                <p className="text-sm font-serif italic text-[#4A3F35]">No saved readings yet.</p>
                <p className="text-xs text-[#8C7B6A]">
                  Generate a reading and click "Save Reading" to archive it here.
                </p>
              </div>
            ) : (
              history.map((reading) => (
                <div
                  key={reading.id}
                  onClick={() => {
                    onSelectReading(reading);
                    onClose();
                  }}
                  className="p-4 rounded-xs bg-white border border-[#EEEAE5] hover:border-[#4A3F35] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif italic font-bold text-base text-[#4A3F35] group-hover:text-[#BC6C25] transition-colors">
                        {reading.inputs.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-xs bg-[#F2EDE8] border border-[#E0D7CC] text-[#4A3F35] font-mono font-bold">
                        LP {reading.lifePath}
                      </span>
                      <span className="text-xs text-[#8C7B6A]">• {reading.inputs.topic}</span>
                    </div>

                    <p className="text-xs text-[#5C554E] line-clamp-1 italic">
                      "{reading.inputs.question}"
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#8C7B6A] pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {new Date(reading.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span>Cards: {reading.inputs.cardNames.join(' • ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={(e) => handleCopy(reading, e)}
                      title="Copy Markdown"
                      className="p-1.5 text-[#8C7B6A] hover:text-[#4A3F35] rounded-xs hover:bg-[#F2EDE8] transition-colors"
                    >
                      {copiedId === reading.id ? (
                        <Check className="w-4 h-4 text-[#606C38]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReading(reading.id);
                      }}
                      title="Delete"
                      className="p-1.5 text-[#8C7B6A] hover:text-[#BC6C25] rounded-xs hover:bg-[#F2EDE8] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="p-1.5 text-[#8C7B6A] group-hover:text-[#4A3F35] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
