import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  User as UserIcon, 
  ChevronUp, 
  MessageSquare,
  RefreshCw,
  Zap
} from 'lucide-react';
import { ChatMessage } from '../types';
import { askCommandAI } from '../services/api';

interface AIChatDrawerProps {
  darkMode: boolean;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "👋 Welcome to **Command AI Assistant**. How can I help you optimize hospital operations today?",
      timestamp: '09:44 AM',
      suggestions: [
        "How many beds tomorrow?",
        "Why is prediction high?",
        "Which department is overloaded?",
        "What inventory should we order?",
        "Summarize today's hospital status."
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const res = await askCommandAI(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply || "I have analyzed the operational logs and updated our command records.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Trigger Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold flex items-center gap-2.5 shadow-2xl shadow-sky-500/40 border border-sky-400/30 transition-all transform hover:scale-105 font-display text-xs"
        >
          <Bot className="w-5 h-5 animate-bounce" />
          <span>Ask Command AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Drawer Panel when open */}
      {isOpen && (
        <div className={`w-[360px] sm:w-[420px] h-[520px] rounded-2xl border shadow-2xl flex flex-col transition-all overflow-hidden ${
          darkMode ? 'bg-slate-900/95 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs flex items-center gap-1.5">
                  Command Center AI Assistant
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </h3>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  Powered by Gemini 3.6 Flash & XGBoost
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';

              return (
                <div key={m.id} className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    isAi
                      ? 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-none'
                      : 'bg-sky-600 text-white rounded-tr-none font-medium'
                  }`}>
                    <p className="whitespace-pre-line">{m.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {m.timestamp}
                  </span>

                  {/* Suggestions chips if available */}
                  {m.suggestions && (
                    <div className="mt-2.5 space-y-1.5 w-full">
                      <span className="text-[10px] font-bold text-slate-400 block">Suggested Prompts:</span>
                      <div className="flex flex-wrap gap-1">
                        {m.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(s)}
                            className="px-2.5 py-1 rounded-lg text-[10px] bg-slate-800 hover:bg-sky-600/30 border border-slate-700/80 text-sky-300 font-medium text-left transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-sky-400 font-bold p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Analyzing real-time hospital telemetry...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about beds, predictions, inventory..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border bg-slate-800 border-slate-700 text-slate-100 outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim() || isLoading}
                className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
