import { createServerClient } from '@/lib/supabase/server';
import { Blog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Calendar,
  ArrowLeft,
  Clock,
  Share2,
  User,
  MapPin,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { ContactPopover } from '@/components/contact-popover';
import { MobileMenu } from '@/components/mobile-menu';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

async function getBlog(slug: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data as Blog | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found - Vihaan Education Academy',
    };
  }

  const description = blog.content.slice(0, 160).replace(/\n/g, ' ');

  return {
    title: `${blog.title} - Vihaan Education Academy`,
    description,
    keywords: [blog.title, blog.author, 'education', 'blog', 'Vihaan Education Academy', ...blog.title.split(' ').filter(w => w.length > 3)],
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description,
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: [blog.author],
      images: blog.image_url ? [{ url: blog.image_url, width: 1200, height: 630, alt: blog.title }] : [],
      siteName: 'Vihaan Education Academy',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: blog.image_url ? [blog.image_url] : [],
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
  };
}

async function getRelatedBlogs(currentSlug: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(3);
  return (data || []) as Blog[];
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(params.slug);
  const readingTime = Math.max(1, Math.ceil(blog.content.split(/\s+/).length / 200));
  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const paragraphs = blog.content.split('\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/20 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">Vihaan Education</h1>
                  <p className="text-xs text-gray-500">Academy</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-base font-bold text-gray-900">Vihaan</h1>
                </div>
              </Link>
            </div>

            <nav className="hidden gap-2 md:flex items-center">
              <Link href="/">
                <Button variant="ghost" className="text-gray-700 hover:bg-blue-50">Home</Button>
              </Link>
              <Link href="/blogs">
                <Button variant="ghost" className="text-gray-700 hover:bg-teal-50">Blogs</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-gray-700 hover:bg-blue-50">Contact</Button>
              </Link>
              <Link href="/admission">
                <Button className="gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 shadow-md">
                  Apply Now <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <ContactPopover />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="pt-6 sm:pt-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li><Link href="/blogs" className="hover:text-teal-600 transition-colors">Blogs</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">{blog.title}</li>
          </ol>
        </nav>

        {/* Hero Image */}
        <div className="mt-6 sm:mt-8 relative h-64 sm:h-80 lg:h-[450px] w-full overflow-hidden rounded-2xl shadow-xl">
          {blog.image_url ? (
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
              <BookOpen className="h-24 w-24 text-teal-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="relative -mt-16 sm:-mt-20 z-10">
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl border border-teal-100 p-6 sm:p-8 lg:p-12">
            {/* Meta */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5 text-teal-600 font-medium">
                <Calendar className="h-4 w-4" />
                <time dateTime={blog.created_at}>{formattedDate}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {blog.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
              {blog.title}
            </h1>

            {/* Author Card */}
            <div className="mb-8 sm:mb-10 flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 p-4 border border-teal-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600 shadow-md">
                <span className="text-sm font-bold text-white">
                  {blog.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{blog.author}</p>
                <p className="text-xs sm:text-sm text-gray-500">Vihaan Education Academy</p>
              </div>
              <div className="ml-auto shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-teal-200 text-teal-700 hover:bg-teal-50 text-xs"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: blog.title,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed sm:leading-relaxed lg:leading-loose"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Last updated on {new Date(blog.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <Link href="/blogs">
                  <Button
                    variant="outline"
                    className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    All Blogs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              More from our <span className="text-teal-600">Blog</span>
            </h2>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((related) => (
                <Link key={related.id} href={`/blogs/${related.slug}`} className="group block">
                  <Card className="flex h-full flex-col overflow-hidden border-blue-100 transition-all hover:shadow-xl hover:border-teal-200">
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
                          <BookOpen className="h-10 w-10 text-teal-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-teal-700 backdrop-blur-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(related.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">By {related.author}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.content.slice(0, 160),
            image: blog.image_url,
            author: {
              '@type': 'Person',
              name: blog.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Vihaan Education Academy',
              logo: {
                '@type': 'ImageObject',
                url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
              },
            },
            datePublished: blog.created_at,
            dateModified: blog.updated_at,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `/blogs/${blog.slug}`,
            },
          }),
        }}
      />

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-gradient-to-b from-white to-blue-50 py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Image src="/vihaanlogo.png" alt="Vihaan Education Academy" width={40} height={40} className="h-10 w-10 object-contain" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Vihaan Education</h3>
                  <p className="text-xs text-gray-500">Academy</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">Transforming lives through quality education since 2001.</p>
              <div className="flex gap-2">
                <a href="#" className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="p-1.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="p-1.5 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition-colors" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link></li>
                <li><Link href="/admission" className="hover:text-blue-600 transition-colors">Admission</Link></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>65/66, Vijay Vihar Phase I, Sector 5, Rohini, Delhi 110085</span>
                </li>
                <li className="flex gap-2">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>092126 44428</span>
                </li>
                <li className="flex gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>WhatsApp Available</span>
                </li>
              </ul>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Operating Hours</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex gap-2">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Mon - Fri: 9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex gap-2">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Sat: 10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex gap-2">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Sun: Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-blue-100 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
              <p>&copy; 2024 Vihaan Education Academy. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
