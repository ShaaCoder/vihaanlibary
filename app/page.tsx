import { createServerClient } from '@/lib/supabase/server';
import { CourseCard } from '@/components/course-card';
import { Course, Blog, Notice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { BookOpen, GraduationCap, MapPin, Phone, MessageCircle, ChevronRight, Star, Users, Trophy, Clock, Menu, X, ArrowRight, Calendar, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { ContactPopover } from '@/components/contact-popover';
import { MobileMenu } from '@/components/mobile-menu';
import Image from 'next/image';

export default async function Home() {
  const supabase = createServerClient();

  const [coursesResult, blogsResult, noticesResult] = await Promise.all([
    supabase.from('courses').select('*').order('created_at', { ascending: false }).limit(6),
    supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
  ]);

  const courses = (coursesResult.data || []) as Course[];
  const blogs = (blogsResult.data || []) as Blog[];
  const notices = (noticesResult.data || []) as Notice[];

  const faqs = [
    {
      id: '1',
      question: 'What are the admission requirements?',
      answer: 'We welcome students of all backgrounds. You need to fill out our admission form with basic information. Our team will review your application and contact you within 24 hours.',
    },
    {
      id: '2',
      question: 'What courses do you offer?',
      answer: 'We offer a variety of courses ranging from basic academics to specialized technical training. Check our Courses section to explore all available programs.',
    },
    {
      id: '3',
      question: 'How can I contact the academy?',
      answer: 'You can contact us through our website contact form, call us directly, send a WhatsApp message, or visit our office location. Use the contact options in the header.',
    },
    {
      id: '4',
      question: 'What is your fee structure?',
      answer: 'Our fees vary by course and level. Please contact our admissions team directly for detailed fee information. We offer flexible payment options.',
    },
    {
      id: '5',
      question: 'Do you provide online classes?',
      answer: 'Yes, we offer both in-person and online classes. Please discuss your preferences with our admissions team during registration.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
   

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-900 shadow-sm">
                  <Star className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                  Excellence in Education
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  Your Journey to <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Success</span> Starts Here
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Vihaan Education Academy provides world-class education with expert instructors, modern facilities, and personalized learning paths designed to unlock your potential.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-2">
                <Link href="/admission" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 shadow-lg">
                    Start Your Journey <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full gap-2 border-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                    Learn More <BookOpen className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">500+</div>
                  <p className="text-xs sm:text-sm text-gray-600">Happy Students</p>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">50+</div>
                  <p className="text-xs sm:text-sm text-gray-600">Expert Courses</p>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">95%</div>
                  <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-cyan-200/50 to-blue-100/50 rounded-2xl lg:rounded-3xl"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-blue-400/20 via-transparent to-yellow-300/20 rounded-2xl lg:rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="mx-auto h-20 sm:h-24 w-20 sm:w-24 text-blue-600/40 mb-4" />
                  <p className="text-gray-600 font-semibold text-sm sm:text-base">Transform Your Future</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        {notices.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mb-8 sm:mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-red-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-red-800">
                <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Latest Updates
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Important <span className="text-red-600">Notices</span>
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {notices.map((notice) => (
                <Card key={notice.id} className={`border-2 transition-all hover:shadow-lg ${
                  notice.priority === 'high' ? 'border-red-200 bg-gradient-to-r from-red-50/80 to-white' :
                  notice.priority === 'medium' ? 'border-yellow-200 bg-gradient-to-r from-yellow-50/80 to-white' :
                  'border-blue-200 bg-gradient-to-r from-blue-50/80 to-white'
                }`}>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl shadow-sm ${
                        notice.priority === 'high' ? 'bg-red-100' :
                        notice.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <Clock className={`h-5 w-5 sm:h-6 sm:w-6 ${
                          notice.priority === 'high' ? 'text-red-600' :
                          notice.priority === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{notice.title}</h3>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${
                            notice.priority === 'high' ? 'bg-red-200 text-red-800' :
                            notice.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {notice.priority}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs sm:text-sm text-gray-600">{notice.content}</p>
                        <p className="mt-2 text-xs text-gray-400">
                          {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Courses Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 sm:mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-800">
              <BookOpen className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Featured Programs
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Our <span className="text-blue-600">Courses</span>
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">Explore our comprehensive range of courses designed for every level</p>
          </div>

          {courses && courses.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              {courses.length === 6 && (
                <div className="mt-8 sm:mt-12 text-center">
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="gap-2 border-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                      View All Courses <ChevronRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 py-12 sm:py-16">
              <BookOpen className="mb-4 h-10 sm:h-12 w-10 sm:w-12 text-blue-300" />
              <p className="text-base sm:text-lg text-gray-600">No courses available yet</p>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">Check back soon for new courses!</p>
            </div>
          )}
        </section>

        {/* Blogs Section */}
        {blogs.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mb-8 sm:mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-teal-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-teal-800">
                <BookOpen className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Insights & Stories
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Latest <span className="text-teal-600">Blogs</span>
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">Tips, stories, and insights from our community</p>
            </div>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <Card className="flex flex-col overflow-hidden border-blue-100 transition-all hover:shadow-xl hover:border-teal-200 h-full">
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      {blog.featured_image ? (
                        <Image src={blog.featured_image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100">
                          <BookOpen className="h-12 sm:h-16 w-12 sm:w-16 text-teal-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-teal-700 backdrop-blur-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="flex-1 p-3 sm:p-4">
                      <CardTitle className="line-clamp-2 text-sm sm:text-base group-hover:text-teal-600 transition-colors">{blog.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">By {blog.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-3 sm:p-4 pt-0">
                      <p className="line-clamp-3 text-xs sm:text-sm text-gray-600">{blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 120)}</p>
                    </CardContent>
                    <div className="border-t border-blue-100 p-3 sm:p-4">
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

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose <span className="text-blue-600">Us?</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all">
              <CardHeader className="p-4 sm:p-6">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-600">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-gray-600">Learn from experienced educators with industry expertise</p>
              </CardContent>
            </Card>
            <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50 hover:shadow-lg transition-all">
              <CardHeader className="p-4 sm:p-6">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-yellow-500">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Proven Results</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-gray-600">95% of our students achieve their academic goals</p>
              </CardContent>
            </Card>
            <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all">
              <CardHeader className="p-4 sm:p-6">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-green-600">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-gray-600">Online and offline classes at your convenience</p>
              </CardContent>
            </Card>
            <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
              <CardHeader className="p-4 sm:p-6">
                <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-purple-600">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Modern Curriculum</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-gray-600">Updated courses aligned with industry standards</p>
              </CardContent>
            </Card>
          </div>
        </section>
     {/* FAQ Section */}
<section className="py-12 sm:py-16 lg:py-20">
  <div className="mb-8 sm:mb-12 text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
      Frequently Asked{" "}
      <span className="text-blue-600">Questions</span>
    </h2>

    <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">
      Find answers to common questions about our academy
    </p>
  </div>

  <div className="mx-auto max-w-3xl">
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all"
        >
          <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:no-underline hover:text-blue-600 sm:text-base">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="px-5 pb-5 pt-0 text-sm leading-relaxed text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">Find answers to common questions about our academy</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-blue-100 rounded-lg px-3 sm:px-4 py-2 data-[state=open]:bg-blue-50/50 transition-colors">
                  <AccordionTrigger className="hover:text-blue-600 font-semibold text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-gray-600 pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 p-6 sm:p-8 lg:p-12 text-center text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Ready to Transform Your Future?</h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8">
              Join thousands of successful students who have achieved their dreams with Vihaan Education Academy.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4">
              <Link href="/admission">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold gap-2 shadow-lg text-sm sm:text-base">
                  Apply Now <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/20 font-semibold gap-2 text-sm sm:text-base">
                  Get In Touch <MessageCircle className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
