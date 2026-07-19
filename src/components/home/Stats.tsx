const stats = [
  { value: '250+', label: 'Curated Destinations' },
  { value: '40K+', label: 'Trips Planned' },
  { value: '65', label: 'Countries Covered' },
  { value: '4.8/5', label: 'Average Traveler Rating' },
];

export default function Stats() {
  return (
    <section className="bg-white py-24 border-b border-neutral-100 font-body antialiased">
      <div className="max-w-7xl mx-auto px-6">

        {/* ইমেজের মতো সেকশন হেডার ও পিল ব্যাজ */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200 mb-3">
            🎯 Captured Memories
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-neutral-900 tracking-tight mb-3">
            Our Platform by the Numbers
          </h2>
          <p className="text-neutral-500 font-medium text-sm md:text-base">
            Relive every sunrise, trail, and volcanic moment with trusted data.
          </p>
        </div>

        {/* মডার্ন গ্রিড লেআউট: গ্লাস-কার্ড এফেক্ট ও প্রফেশনাল স্পেসিং */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-neutral-50/60 border border-neutral-200/50 p-8 rounded-[2rem] text-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
            >
              {/* ছবির মতো বড় বোল্ড নাম্বার এবং কাস্টম ট্রাভেল কালার */}
              <div className="text-4xl md:text-5xl font-display font-semibold text-neutral-900 tracking-tight mb-2">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}