import React, { useState, useEffect } from 'react';
import { Key, Sparkles, CheckCircle2, AlertCircle, ExternalLink, X, ShieldCheck, Check, Bot, Globe, Cpu } from 'lucide-react';
import { testLunaKeyRobust } from '../utils/lunaClient.ts';
import { testGeminiKeyRobust } from '../utils/geminiClient.ts';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  serverHasKey?: boolean;
  onSaveApiKey: (key: string) => void;
}

const LUNA_KEY_STORAGE = 'luna_api_key_v1';
const LUNA_URL_STORAGE = 'luna_base_url_v1';
const LUNA_MODEL_STORAGE = 'luna_model_name_v1';

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  serverHasKey = false,
  onSaveApiKey,
}) => {
  const [activeTab, setActiveTab] = useState<'gemini' | 'luna'>('gemini');

  // Luna 5.6 settings
  const [lunaKey, setLunaKey] = useState<string>(() => {
    return localStorage.getItem(LUNA_KEY_STORAGE) || apiKey || '';
  });
  const [lunaBaseUrl, setLunaBaseUrl] = useState<string>(() => {
    return localStorage.getItem(LUNA_URL_STORAGE) || 'https://api.openai.com/v1';
  });
  const [lunaModelName, setLunaModelName] = useState<string>(() => {
    return localStorage.getItem(LUNA_MODEL_STORAGE) || 'luna-5.6';
  });

  // Gemini settings
  const [geminiKey, setGeminiKey] = useState<string>(apiKey);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setLunaKey(localStorage.getItem(LUNA_KEY_STORAGE) || apiKey || '');
    setGeminiKey(apiKey);
    setTestResult(null);
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleTestAndSaveLuna = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = lunaKey.trim();
    const cleanUrl = lunaBaseUrl.trim() || 'https://api.openai.com/v1';
    const cleanModel = lunaModelName.trim() || 'luna-5.6';

    localStorage.setItem(LUNA_KEY_STORAGE, cleanKey);
    localStorage.setItem(LUNA_URL_STORAGE, cleanUrl);
    localStorage.setItem(LUNA_MODEL_STORAGE, cleanModel);
    onSaveApiKey(cleanKey);

    if (!cleanKey) {
      setTestResult({
        success: true,
        message: 'Custom key cleared. App will use server environment credentials if available.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testLunaKeyRobust({
        apiKey: cleanKey,
        apiBaseUrl: cleanUrl,
        modelName: cleanModel,
      });

      if (result.success) {
        setTestResult({ success: true, message: result.message || 'Connected to Luna 5.6 API successfully! ✨' });
      } else {
        setTestResult({ success: false, message: result.error || 'Failed to connect to Luna 5.6 API.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Could not test Luna connection.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestGemini = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await testGeminiKeyRobust(geminiKey.trim());
      if (result.success) {
        onSaveApiKey(geminiKey.trim());
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white border border-[#E0D7CC] rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0D7CC] bg-[#FCFAF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#4A3F35] bg-[#F2EDE8] flex items-center justify-center text-[#4A3F35]">
              <Cpu className="w-4 h-4 text-[#BC6C25]" />
            </div>
            <div>
              <h2 className="text-sm font-serif italic font-bold text-[#4A3F35]">
                AI Model & API Configuration
              </h2>
              <p className="text-[11px] text-[#8C7B6A]">
                Luna 5.6 (OpenAI Compatible) & Backup Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs hover:bg-[#E0D7CC]/50 text-[#8C7B6A] hover:text-[#4A3F35] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E0D7CC] bg-[#FAF7F2] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('luna'); setTestResult(null); }}
            className={`flex-1 py-2.5 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'luna'
                ? 'border-[#4A3F35] text-[#4A3F35] bg-white font-bold'
                : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#BC6C25]" />
            <span>Luna 5.6 (Primary)</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('gemini'); setTestResult(null); }}
            className={`flex-1 py-2.5 px-4 text-center border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'gemini'
                ? 'border-[#4A3F35] text-[#4A3F35] bg-white font-bold'
                : 'border-transparent text-[#8C7B6A] hover:text-[#4A3F35]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
            <span>Google Gemini AI</span>
          </button>
        </div>

        {/* Luna 5.6 Tab */}
        {activeTab === 'luna' && (
          <form onSubmit={handleTestAndSaveLuna} className="p-6 space-y-4">
            <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1 text-xs text-[#5C554E]">
              <div className="flex items-center gap-1.5 font-semibold text-[#4A3F35]">
                <Bot className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span>Luna 5.6 Custom-Trained Model</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Connects to the OpenAI-compatible endpoint with your model identifier (e.g. <code>luna-5.6</code>). Captured client details & agenda are formatted and sent directly.
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                Luna / OpenAI API Key *
              </label>
              <input
                type="password"
                placeholder="sk-proj-... or custom API Key"
                value={lunaKey}
                onChange={(e) => setLunaKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] font-mono focus:outline-none focus:border-[#4A3F35]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1">
                  API Base URL
                </label>
                <input
                  type="text"
                  placeholder="https://api.openai.com/v1"
                  value={lunaBaseUrl}
                  onChange={(e) => setLunaBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs font-mono text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1">
                  Model Identifier
                </label>
                <input
                  type="text"
                  placeholder="luna-5.6"
                  value={lunaModelName}
                  onChange={(e) => setLunaModelName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs font-mono text-[#2C2C2C] focus:outline-none focus:border-[#4A3F35]"
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
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-[#8C7B6A] hover:text-[#4A3F35] font-medium transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isTesting}
                  className="px-4 py-2 bg-[#4A3F35] hover:bg-[#382F28] text-white text-xs font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isTesting ? (
                    <>Testing Luna API...</>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                      Save & Test Luna 5.6
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Gemini Tab */}
        {activeTab === 'gemini' && (
          <div className="p-6 space-y-4">
            <div className="p-3.5 bg-[#F2EDE8]/60 border border-[#E0D7CC] rounded-xs space-y-1 text-xs text-[#5C554E]">
              <div className="flex items-center gap-1.5 font-semibold text-[#4A3F35]">
                <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
                <span>Google Gemini AI Fallback</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Provides fallback generation using Google Gemini 3.7/2.5 Flash if Luna endpoint is unreachable.
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8C7B6A] uppercase tracking-widest mb-1.5">
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs text-[#2C2C2C] font-mono focus:outline-none focus:border-[#4A3F35]"
              />
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
                Get Gemini Key
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs text-[#8C7B6A] hover:text-[#4A3F35] font-medium cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleTestGemini}
                  disabled={isTesting}
                  className="px-4 py-2 bg-[#4A3F35] hover:bg-[#382F28] text-white text-xs font-semibold rounded-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isTesting ? 'Testing Gemini...' : 'Save & Test Gemini'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
