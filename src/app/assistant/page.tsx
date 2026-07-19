'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { sendChatMessage } from '@/lib/ai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_CHARS = 2000;

// সাজেস্টেড প্রম্পটগুলো বাংলায় করা হলো যাতে ইউজার এক্সপেরিয়েন্স সুন্দর হয়
const suggestedPrompts = [
  'সমুদ্র সৈকতের ৫ দিনের ট্যুর প্ল্যান দাও',
  'পাহাড়ে ঘোরার জন্য বছরের কোন সময়টা সেরা?',
  'কম বাজেটে অ্যাডভেঞ্চার ট্রিপের আইডিয়া দাও',
  'ফ্যামিলি নিয়ে ঘোরার মতো সুন্দর শহরের তালিকা',
];

const getUserMessageId = () => {
  if (typeof window === 'undefined') return '';
  try {
    const user = localStorage.getItem('MapMinds_user');
    let id = JSON.parse(user || '{}').id || JSON.parse(user || '{}')._id;
    if (!id) {
      id = localStorage.getItem('MapMinds_chat_id');
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('MapMinds_chat_id', id);
      }
    }
    return id;
  } catch (e) {
    return crypto.randomUUID();
  }
};

function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "হ্যালো! আমি আপনার ট্রেইলমাইন্ড (MapMinds) ট্রাভেল অ্যাসিস্ট্যান্ট। যেকোনো সুন্দর ডেস্টিনেশন, ট্যুর প্ল্যান কিংবা বাজেট নিয়ে আমাকে নির্দ্বিধায় জিজ্ঞাসা করুন!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userMessageIdRef = useRef<string>('');

  useEffect(() => {
    userMessageIdRef.current = getUserMessageId();
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldAutoScrollRef.current = distanceFromBottom < 80;
  };

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError('');
      shouldAutoScrollRef.current = true;

      // ১. ইউজারের মেসেজ স্টেটে সেট করা (স্ক্রিনে দেখানোর জন্য)
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      setInput('');
      setIsLoading(true);

      // টেক্সট এরিয়া রিসেট করা
      if (textareaRef.current) textareaRef.current.style.height = 'auto';

      try {
        // 💡 ফিক্স: হার্ডকোডেড আইডির বদলে জেনারেটেড userMessageIdRef পাঠানো হয়েছে
        const reply = await sendChatMessage({
          message: trimmed,
          userMessageId: userMessageIdRef.current || 'default_chat_user',
        });

        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch (err: any) {
        console.error("Chat API Error:", err);
        setError(err?.response?.data?.message || err?.message || 'দুঃখিত, কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        // 💡 ফিক্স: ক্যাচ ব্লকে ইউজারের মেসেজ স্ক্রিন থেকে আর রিমুভ করা হবে না, যাতে ইউজার দেখতে পান কী ফেইল হয়েছে
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const charsRemaining = MAX_CHARS - input.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 font-body antialiased bg-stone/20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="mb-6 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-3 shadow-sm">
            🌍 MapMinds Live Concierge
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-1">
            AI Travel Assistant
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium">
            Ask questions, plan itineraries, and get follow-up suggestions in real time.
          </p>
        </div>

        {/* মেইন চ্যাট ইন্টারফেস */}
        <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] flex flex-col h-[70vh] max-h-[640px] min-h-[460px] overflow-hidden">

          {/* মেসেজ স্ক্রলিং এরিয়া */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-gradient-to-b from-neutral-50/30 to-white"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-[2rem] px-5 py-3.5 text-sm font-medium leading-relaxed shadow-sm whitespace-pre-wrap ${m.role === 'user'
                    ? 'bg-black text-white rounded-br-none'
                    : 'bg-neutral-100/80 text-neutral-800 border border-neutral-200/40 rounded-bl-none'
                    }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* লোডিং এনিমেশন */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-[2rem] rounded-bl-none px-6 py-4 bg-neutral-100/80 text-neutral-800 border border-neutral-200/40 shadow-sm">
                  <span className="inline-flex gap-1.5 items-center" aria-label="Assistant is typing">
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-duration:0.8s]" />
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* এরর মেসেজ এবং রিট্রাই বাটন */}
          {error && (
            <div className="mx-6 mb-2 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider px-5 py-3 flex items-center justify-between shadow-sm animate-fade-in">
              <span>⚠️ {error}</span>
              <button
                type="button"
                onClick={() => sendMessage(input)}
                className="bg-white border border-red-200 hover:bg-red-100/50 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* ইনপুট এবং সাজেস্টেড চিপস এরিয়া */}
          <div className="border-t border-neutral-100 p-5 bg-white">
            {/* সাজেস্টেড প্রম্পট চিপস */}
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendMessage(p)}
                  disabled={isLoading}
                  className="text-xs bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 hover:border-neutral-400 text-neutral-600 font-semibold rounded-full px-4 py-2 transition-all disabled:opacity-40 shadow-sm"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* ইনপুট ফর্ম */}
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) {
                    setInput(e.target.value);
                    autoResizeTextarea();
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="কোথায় যেতে চান? বাজেট বা দিন লিখে এখানে বলুন... (New line এর জন্য Shift+Enter)"
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none bg-neutral-50/60 border border-neutral-200/80 rounded-2xl px-5 py-3.5 text-sm font-medium text-neutral-800 focus:outline-none focus:border-neutral-900 focus:bg-white max-h-40 transition-all disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex items-center justify-center bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-2xl h-[48px] px-6 transition-colors shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </form>

            {/* ক্যারেক্টার লিমিট ওয়ার্নিং */}
            {input.length > MAX_CHARS - 200 && (
              <p className={`text-[10px] font-bold uppercase tracking-wider mt-2 text-right ${charsRemaining < 0 ? 'text-red-500' : 'text-neutral-400'}`}>
                {charsRemaining} characters remaining
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <ProtectedRoute>
      <AssistantChat />
    </ProtectedRoute>
  );
}