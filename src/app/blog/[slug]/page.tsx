import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <div className="container-page py-12 max-w-3xl">
      <Link href="/blog" className="text-primary text-sm font-medium hover:underline">
        ← Back to blog
      </Link>

      <div className="mt-6 mb-8">
        <span className="inline-block bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">{post.title}</h1>
        <p className="text-neutral-500 text-sm">
          {post.author} · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.readTime} min read
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-card overflow-hidden mb-10">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </div>

      <div className="space-y-5 text-neutral-700 leading-relaxed">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-5">More on {post.category}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="card p-4">
                <h3 className="font-medium text-neutral-900 text-sm mb-1 line-clamp-2">{r.title}</h3>
                <p className="text-xs text-neutral-500">{r.readTime} min read</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
