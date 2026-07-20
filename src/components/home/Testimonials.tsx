import React from 'react';

const testimonials = [
  {
    name: 'আরিফ আহমেদ',
    role: 'সোলো ট্রাভেলার',
    quote: 'হঠাৎ করে ফ্লাইট আর বাসের শিডিউল চেঞ্জ হওয়ায় বিপদে পড়েছিলাম। MapMinds-এর এআই অ্যাসিস্ট্যান্ট মাত্র কয়েক মিনিটে আমার পুরো সাজেক ভ্যালির ট্যুর প্ল্যান নতুন করে সাজিয়ে দিয়েছে। দারুণ কাজের একটা টুল!',
  },
  {
    name: 'রাইসা তানজিম',
    role: 'ফ্যামিলি ট্রিপ প্ল্যানার',
    quote: 'পারিবারিক ভ্রমণের জন্য পারফেক্ট! ছোট বাচ্চা আর বয়স্কদের কথা মাথায় রেখে কম জার্নি, সমুদ্র সৈকত আর কিডস-ফ্রেন্ডলি স্পটগুলো যেভাবে সাজেস্ট করেছে, তাতে আমার ঘণ্টার পর ঘণ্টা রিসার্চ করার সময় বেঁচে গেছে।',
  },
  {
    name: 'সাকিব হাসান',
    role: 'অ্যাডভেঞ্চার সন্ধানী',
    quote: 'আমি শুধু বলেছিলাম পাহাড় ট্র্যাকিং আর বন্যপ্রাণী পছন্দ করি। এআই আমাকে বান্দরবান আর রেমা-কালেঙ্গার এমন কিছু ট্রিপ প্ল্যান দেখিয়েছে যা আমি ভাবিওনি। দেখে সাথে সাথেই পরের সপ্তাহের জন্য ব্যাকপ্যাক গুছিয়ে ফেলেছি!',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 font-body antialiased bg-stone/5">
      {/* হেডার সেকশন */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black text-white mb-4">
          রিভিউসমূহ
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tighter mb-3">
          ভ্রমণকারীদের অভিজ্ঞতা
        </h2>
        <p className="text-neutral-500 font-medium text-sm md:text-base">
          যাঁরা MapMinds ব্যবহার করে বাংলাদেশে তাঁদের ভ্রমণের পরিকল্পনা করেছেন, তাঁদের বাস্তব মতামত।
        </p>
      </div>

      {/* টেস্টমোনিয়াল গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="card bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between"
          >
            {/* কোটেশন কন্টেন্ট */}
            <div className="relative">
              {/* স্টাইলিশ কোট আইকন */}
              <span className="text-4xl font-serif text-neutral-300 leading-none absolute -top-3 -left-1 select-none">“</span>
              <p className="text-neutral-600 text-sm md:text-base font-medium leading-relaxed pl-4 mb-6 italic relative z-10">
                {t.quote}
              </p>
            </div>

            {/* ইউজার প্রোফাইল ইনফো */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
              {/* DaisyUI Avatar উইথ ইনিশিয়ালস */}
              <div className="avatar placeholder">
                <div className="bg-neutral-900 text-white w-10 h-10 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center">
                  {/* বাংলা নামের প্রথম অক্ষর দেখানোর জন্য */}
                  <span>{t.name.split(' ')[0][0]}</span>
                </div>
              </div>

              <div>
                <div className="font-semibold text-neutral-950 text-sm md:text-base tracking-tight">
                  {t.name}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}