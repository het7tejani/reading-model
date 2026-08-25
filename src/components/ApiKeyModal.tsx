import React, { useState, useEffect } from 'react';
import { Key, Sparkles, CheckCircle2, AlertCircle, ExternalLink, X, ShieldCheck, Check } from 'lucide-react';
import { testGeminiKeyRobust } from '../utils/geminiClient.ts';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  serverHasKey?: boolean;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  serverHasKey = false,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setInputKey(apiKey);
    setTestResult(null);
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = inputKey.trim();
    if (!cleanKey) {
      onSaveApiKey('');
      setTestResult({
        success: true,
        message: serverHasKey
          ? 'Custom key cleared. App is actively using your .env GEMINI_API_KEY ✨'
          : 'Custom key cleared. App will use environment key if available.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testGeminiKeyRobust(cleanKey);
      if (result.success) {
        onSaveApiKey(cleanKey);
        setTestResult({ success: true, message: result.message || 'Google Gemini AI Connected Successfully! ✨' });
      } else {
        setTestResult({ success: false, message: result.error || 'Failed to validate Gemini API key.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Could not validate Gemini key.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveWithoutTest = () => {
    const cleanKey = inputKey.trim();
    onSaveApiKey(cleanKey);
    setTestResult({
      success: true,
      message: cleanKey ? 'API Key saved to your browser session! ✨' : 'Custom key cleared.',
    });
  };

  const handleTestServerKey = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await testGeminiKeyRobust('');
      if (result.success) {
        setTestResult({ success: true, message: 'Server .env GEMINI_API_KEY verified & working perfectly! ✨' });
      } else {
        setTestResult({ success: false, message: result.error || 'Server .env key failed validation.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Could not verify server .env key.' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white border border-[#E0D7CC] rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D7CC] bg-[#FCFAF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#4A3F35] bg-[#F2EDE8] flex items-center justify-center text-[#4A3F35]">
              <Key className="w-4 h-4 text-[#BC6C25]" />
            </div>
            <div>
              <h2 className="text-sm font-serif italic font-bold text-[#4A3F35]">
                Google Gemini AI Key Configuration
              </h2>
              <p className="text-[11px] text-[#8C7B6A]">
                Direct AI connection for 100% bespoke, non-templated readings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs hover:bg-[#E0D7CC]/50 text-[#8C7B6A] hover:text-[#4A3F35] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleTestAndSave} className="p-6 space-y-4">
          {serverHasKey && (
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xs flex items-center justify-between gap-2 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-semibold block text-[11px]">Server .env Key Detected</span>
                  <span className="text-[10px] text-emerald-700">GEMINI_API_KEY is active from the environment.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTestServerKey}
                disabled={isTesting}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-[10px] font-semibold transition-colors disabled:opacity-50"
              >
                Test .env Key
              </button>
            </div>
          )}

          <div className="p-3.5 bg-[#F2EDE8]/60 border border-[#E0D7CC] rounded-xs space-y-1.5 text-xs text-[#5C554E]">
            <div className="flex items-center gap-1.5 font-semibold text-[#4A3F35]">
              <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
              <span>Real-Time AI Generation</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              When configured with your Gemini API key (via <code>.env</code> file or entered below), every reading is dynamically channeled using <strong>Google Gemini Flash</strong> with 100% custom phrasing and unique intuitive insights tailored directly to your querent.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
              Custom Gemini API Key (Optional override)
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder={serverHasKey ? "Using server .env key (or enter custom key to override)..." : "AIzaSy..."}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] font-mono"
              />
            </div>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xs text-xs flex items-start gap-2 border ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-[11px] leading-relaxed font-medium">{testResult.message}</div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#BC6C25] hover:underline font-medium"
            >
              Get a free API key at Google AI Studio
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-[#8C7B6A] hover:text-[#4A3F35] font-medium transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveWithoutTest}
                className="px-3.5 py-2 bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-[#4A3F35] text-xs font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-[#BC6C25]" />
                Save Key
              </button>
              <button
                type="submit"
                disabled={isTesting}
                className="px-4 py-2 bg-[#4A3F35] hover:bg-[#382F28] text-white text-xs font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isTesting ? (
                  <>Testing Connection...</>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                    Save & Test
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
