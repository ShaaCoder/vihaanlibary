import { createServerClient } from '@/lib/supabase/server';
import { Blog } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, GraduationCap, ChevronRight, Calendar, ArrowRight, Clock, MapPin, Phone, MessageCircle, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { ContactPopover } from '@/components/contact-popover';
import { MobileMenu } from '@/components/mobile-menu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs - Vihaan Education Academy',
  description: 'Tips, stories, and insights from our educators and community at Vihaan Education Academy',
  keywords: ['education blog', 'study tips', 'learning insights', 'Vihaan Education Academy', 'student resources'],
  openGraph: {
    title: 'Blogs - Vihaan Education Academy',
    description: 'Tips, stories, and insights from our educators and community',
    siteName: 'Vihaan Education Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs - Vihaan Education Academy',
    description: 'Tips, stories, and insights from our educators and community',
  },
  alternates: {
    canonical: '/blogs',
  },
};

export default async function BlogsPage() {
  const supabase = createServerClient();

  const { data } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  const blogs = (data || []) as Blog[];

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/30 via-white to-blue-50/30">
     

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-teal-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-teal-800">
              <BookOpen className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Insights & Stories
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Our <span className="text-teal-600">Blog</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Tips, stories, and insights from our educators and community
            </p>
          </div>
        </section>

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/30 py-16 sm:py-24 mb-16">
            <BookOpen className="mb-4 h-12 w-12 text-teal-300" />
            <p className="text-lg text-gray-600">No blog posts yet</p>
            <p className="mt-2 text-sm text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            {/* Featured Blog */}
            {featuredBlog && (
              <section className="pb-8 sm:pb-12">
                <Link href={`/blogs/${featuredBlog.slug}`} className="group block">
                  <Card className="overflow-hidden border-teal-100 transition-all hover:shadow-2xl hover:border-teal-200">
                    <div className="grid lg:grid-cols-2">
                      <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[400px] w-full overflow-hidden">
                        {featuredBlog.image_url ? (
                          <Image
                            src={featuredBlog.image_url}
                            alt={featuredBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
                            <BookOpen className="h-20 w-20 text-teal-200" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                        <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                          <span className="inline-flex items-center gap-1 text-teal-600 font-medium">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(featuredBlog.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {Math.ceil(featuredBlog.content.split(' ').length / 200)} min read
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                          {featuredBlog.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                              <span className="text-xs font-bold text-teal-700">
                                {featuredBlog.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{featuredBlog.author}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all">
                            Read Article <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </section>
            )}

            {/* Blog Grid */}
            {remainingBlogs.length > 0 && (
              <section className="pb-12 sm:pb-16 lg:pb-20">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingBlogs.map((blog) => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                      <Card className="flex h-full flex-col overflow-hidden border-blue-100 transition-all hover:shadow-xl hover:border-teal-200">
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                          {blog.image_url ? (
                            <Image
                              src={blog.image_url}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
                              <BookOpen className="h-12 w-12 text-teal-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-teal-700 backdrop-blur-sm">
                              <Calendar className="h-3 w-3" />
                              {new Date(blog.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                        <CardHeader className="flex-1 p-4 sm:p-5">
                          <CardTitle className="line-clamp-2 text-sm sm:text-base group-hover:text-teal-600 transition-colors">
                            {blog.title}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm">
                            By {blog.author}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-4 sm:p-5 pt-0">
                          <p className="line-clamp-3 text-xs sm:text-sm text-gray-600">{blog.content}</p>
                        </CardContent>
                        <div className="border-t border-blue-100 p-4 sm:p-5">
                          <span className="text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

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
