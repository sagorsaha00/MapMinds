import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogData';

export default function BlogPage() {
  return (
    <div className="container-page py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">MapMinds Blog</h1>
        <p className="text-neutral-600">Practical guides on trip planning, packing, budgeting, and how AI fits into modern travel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card flex flex-col overflow-hidden h-full">
            <div className="relative w-full h-44">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h2 className="font-semibold text-neutral-900 mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="text-xs text-neutral-500 flex items-center justify-between">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
