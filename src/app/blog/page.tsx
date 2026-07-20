import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogData';

export default function BlogPage() {
  // প্রথম পোস্টটিকে ফিচারড হিসেবে আলাদা করা এবং বাকিগুলো নিচে দেখানো
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-body antialiased bg-stone/5 min-h-screen">

      {/* হেডার সেকশন */}
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black text-white mb-4">
          Insights
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tighter mb-3">
          MapMinds Blog
        </h1>
        <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
          Practical guides on trip planning, packing, budgeting, and how AI fits into modern travel.
        </p>
      </div>

      {/* 🌟 ১. ফিচারড পোস্ট (যদি থাকে) */}
      {featuredPost && (
        <div className="mb-12">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-[2.5rem] p-4 md:p-6 overflow-hidden"
          >
            {/* ফিচারড ইমেজ */}
            <div className="relative w-full aspect-[16/10] lg:h-full rounded-[2rem] overflow-hidden bg-neutral-100">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                {featuredPost.category}
              </span>
            </div>

            {/* ফিচারড কন্টেন্ট */}
            <div className="flex flex-col justify-center p-4 lg:p-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3 block">
                ⭐ Featured Story
              </span>
              <h2 className="font-display text-2xl md:text-3.5xl font-semibold text-neutral-950 tracking-tight leading-tight mb-4 group-hover:text-neutral-800 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 font-medium leading-relaxed mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                <span>
                  {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  ⏱️ {featuredPost.readTime} min read
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* 📑 ২. রিমেইনিং পোস্ট গ্রিড (৩-কলাম লেআউট) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {remainingPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group card bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-[2.5rem] p-4 flex flex-col overflow-hidden h-full"
          >
            {/* রেগুলার কার্ড ইমেজ */}
            <div className="relative w-full aspect-[16/10] rounded-[1.8rem] overflow-hidden bg-neutral-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                {post.category}
              </span>
            </div>

            {/* রেগুলার কার্ড কন্টেন্ট */}
            <div className="flex flex-col flex-1 p-4 pt-5">
              <h2 className="font-display text-lg font-semibold text-neutral-950 tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-neutral-800 transition-colors">
                {post.title}
              </h2>
              <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-auto">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span>⏱️ {post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}