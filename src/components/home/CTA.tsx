import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-accent">
      <div className="container-page py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to plan smarter?</h2>
          <p className="text-white/90">Create your free account and get AI-matched trips in seconds.</p>
        </div>
        <Link
          href="/register"
          className="bg-white text-accent-dark px-6 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors whitespace-nowrap"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
