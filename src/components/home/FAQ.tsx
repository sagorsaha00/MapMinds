'use client';

import { useState } from 'react';

const faqs = [
  { q: 'How does the AI recommend trips?', a: 'It analyzes your stated interests, budget range, and travel style, then compares them against our destination catalog to suggest the best matches.' },
  { q: 'Can I chat with the AI about a specific trip?', a: 'Yes. Open any trip and use the AI Assistant to ask questions or adjust the itinerary — it keeps the trip context in memory.' },
  { q: 'Is there a free way to try it?', a: 'Yes, use the Demo Login button on the login page to explore the platform with a pre-filled account.' },
  { q: 'Can I add my own trips?', a: 'Once logged in, use "Add Trip" to publish your own itinerary, then manage it from "My Trips".' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Help Center</span>
        <h2 className="text-4xl font-display font-medium text-neutral-900 tracking-tight">Frequently asked questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={f.q}
              className={`bg-white border transition-all duration-300 rounded-[1.5rem] overflow-hidden ${isOpen ? 'border-neutral-900 shadow-md' : 'border-neutral-200/80 shadow-sm'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-neutral-900 text-lg transition-colors hover:bg-neutral-50/50"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="pr-4">{f.q}</span>
                <span className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-6 text-sm text-neutral-500 font-medium leading-relaxed border-t border-neutral-50 pt-3">
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}