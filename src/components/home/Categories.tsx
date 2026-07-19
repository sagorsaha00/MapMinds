import Link from 'next/link';

const categories = [
  { name: 'Beach', icon: '🏖️' },
  { name: 'Mountain', icon: '⛰️' },
  { name: 'City', icon: '🏙️' },
  { name: 'Adventure', icon: '🧗' },
  { name: 'Cultural', icon: '🏛️' },
  { name: 'Wildlife', icon: '🦁' },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200 mb-3">
          Explore Types
        </span>
        <h2 className="text-4xl font-display font-medium text-neutral-900 tracking-tight mb-3">Browse by category</h2>
        <p className="text-neutral-500 font-medium">Find the kind of trip that matches your mood.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((c) => (
          <Link
            key={c.name}
            href={`/explore?category=${c.name}`}
            className="group bg-white border border-neutral-200/60 p-8 rounded-[2rem] text-center shadow-sm hover:shadow-xl hover:border-neutral-900 transition-all duration-300 flex flex-col items-center justify-center"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
            <span className="text-sm font-bold text-neutral-800 tracking-tight group-hover:text-black">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}