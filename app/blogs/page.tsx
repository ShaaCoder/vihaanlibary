import { createServerClient } from '@/lib/supabase/server';
import { Blog, BlogCategory, BlogTag } from '@/lib/types';
import {
  getPublishedBlogs,
  getFeaturedBlog,
  getAllCategories,
  getAllTags,
} from '@/lib/blog/queries';
import { BookOpen, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogNewsletter } from '@/components/blog/blog-newsletter';
import { BlogCTA } from '@/components/blog/blog-cta';

export const metadata: Metadata = {
  title: 'Blog - Vihaan Education Academy | Study Tips & Educational Insights',
  description:
    'Expert study tips, career guidance, exam preparation strategies, and educational insights from Vihaan Education Academy. Helping students excel since 2001.',
  keywords: [
    'education blog',
    'study tips',
    'exam preparation',
    'career guidance',
    'learning strategies',
    'Vihaan Education Academy',
    'student resources',
    'academic excellence',
  ],
  openGraph: {
    title: 'Blog - Vihaan Education Academy',
    description: 'Expert study tips, career guidance, and educational insights',
    siteName: 'Vihaan Education Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Vihaan Education Academy',
    description: 'Expert study tips, career guidance, and educational insights',
  },
  alternates: {
    canonical: '/blogs',
  },
};

export default async function BlogsPage() {
  const [featuredBlog, blogs, categories, tags] = await Promise.all([
    getFeaturedBlog(),
    getPublishedBlogs(12, 0),
    getAllCategories(),
    getAllTags(),
  ]);

  const latestBlogs = featuredBlog
    ? blogs.filter(b => b.id !== featuredBlog.id)
    : blogs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 pb-16 pt-12 sm:pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-sky-400 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-sky-200 backdrop-blur-sm mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Insights & Stories
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            The Vihaan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">
              Learning Hub
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Expert study tips, career guidance, exam strategies, and educational insights
            to help you excel academically and beyond.
          </p>

          {/* Quick Category Pills */}
          {categories.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.slice(0, 6).map(cat => (
                <Link key={cat.id} href={`/blogs/category/${cat.slug}`}>
                  <Badge
                    variant="outline"
                    className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer text-xs px-3 py-1"
                  >
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30 py-20 my-12">
            <BookOpen className="mb-4 h-12 w-12 text-slate-300" />
            <p className="text-lg text-slate-600 font-medium">No blog posts yet</p>
            <p className="mt-2 text-sm text-slate-400">Check back soon for new educational content!</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredBlog && (
              <section className="-mt-8 relative z-20 mb-10">
                <BlogCard blog={featuredBlog} variant="featured" />
              </section>
            )}

            {/* Main Content + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 pb-16">
              {/* Latest Articles Grid */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-sky-600" />
                  <h2 className="text-xl font-bold text-slate-900">Latest Articles</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {latestBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <BlogSidebar
                categories={categories}
                tags={tags}
                recentBlogs={latestBlogs.slice(0, 5)}
              />
            </div>
          </>
        )}

        {/* Newsletter */}
        <BlogNewsletter />

        {/* CTA Section */}
        <div className="mt-12 mb-16">
          <BlogCTA />
        </div>
      </main>

      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Vihaan Education Academy Blog',
            description: 'Expert study tips, career guidance, and educational insights',
            url: 'https://vihaaneducation.com/blogs',
            publisher: {
              '@type': 'Organization',
              name: 'Vihaan Education Academy',
              logo: {
                '@type': 'ImageObject',
                url: 'https://vihaaneducation.com/vihaanlogo.png',
              },
            },
          }),
        }}
      />
    </div>
  );
}
