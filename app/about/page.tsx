import Link from 'next/link';
import Image from 'next/image';

import {
  GraduationCap,
  Users,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Quality Education',
      description:
        'Industry-focused practical learning designed for real-world success.',
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description:
        'Learn directly from experienced professionals and industry experts.',
    },
    {
      icon: Trophy,
      title: 'Student Success',
      description:
        'We focus on placements, confidence, and long-term career growth.',
    },
  ];

  const stats = [
    {
      number: '5000+',
      label: 'Students Trained',
    },
    {
      number: '50+',
      label: 'Expert Mentors',
    },
    {
      number: '100+',
      label: 'Courses',
    },
    {
      number: '95%',
      label: 'Success Rate',
    },
  ];

  const features = [
    'Live Practical Training',
    'Real Projects & Assignments',
    'Placement Assistance',
    'Updated Industry Curriculum',
    'Affordable Fee Structure',
    'Certification Programs',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
    

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-yellow-100/30" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-800 shadow-sm">
              About Vihaan Education
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight text-gray-900 sm:text-6xl">
              Building Skills
              <span className="block text-blue-600">
                For The Future
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
              Vihaan Education Academy empowers students
              with practical learning, modern technology
              education, and industry-ready skills to help
              them build successful careers in today’s
              digital world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/admission">
                <Button
                  size="lg"
                  className="h-12 gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 text-black hover:from-yellow-500 hover:to-yellow-600"
                >
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-blue-200 px-8 text-blue-700 hover:bg-blue-50"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-yellow-200 blur-3xl" />

            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <GraduationCap className="h-10 w-10" />
                </div>

                <h3 className="mb-4 text-3xl font-bold">
                  Transform Your Career
                </h3>

                <p className="mb-8 text-blue-100">
                  Learn modern skills with practical
                  training and expert mentorship.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <BookOpen className="mb-2 h-6 w-6" />
                    <h4 className="font-semibold">
                      Practical Learning
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <Award className="mb-2 h-6 w-6" />
                    <h4 className="font-semibold">
                      Certified Courses
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* STORY */}
          <div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Our Story
            </h2>

            <div className="space-y-5 text-lg leading-relaxed text-gray-600">
              <p>
                Vihaan Education Academy started with a
                mission to make quality technical education
                accessible to every student.
              </p>

              <p>
                We believe education should not only teach
                theory but also prepare students for real
                industry challenges through hands-on
                practical learning.
              </p>

              <p>
                Over the years, we have helped thousands of
                students improve their careers, develop
                confidence, and gain valuable professional
                skills.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <CheckCircle className="h-5 w-5 text-blue-600" />

                  <span className="font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
            <h3 className="mb-8 text-3xl font-bold text-gray-900">
              Visit Our Campus
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <MapPin className="h-6 w-6 text-blue-700" />
                </div>

               <div>
  <h4 className="mb-1 font-bold text-gray-900">
    Address
  </h4>

  <p className="text-gray-600">
    VIHAAN EDUCATION ACADEMY,
    <br />
    2nd Floor, Vijay Vihar,
    <br />
    Vijay Vihar Phase I,
    <br />
    Phase 1, Sector 4, Rohini,
    <br />
    New Delhi, Delhi - 110085
  </p>
</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-yellow-100 p-3">
                  <Phone className="h-6 w-6 text-yellow-700" />
                </div>

                <div>
                  <h4 className="mb-1 font-bold text-gray-900">
                    Phone
                  </h4>

                  <p className="text-gray-600">
                    +91 92126 44428
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-green-100 p-3">
                  <Clock className="h-6 w-6 text-green-700" />
                </div>

                <div>
                  <h4 className="mb-1 font-bold text-gray-900">
                    Working Hours
                  </h4>

                  <p className="text-gray-600">
                    Monday - Friday:
                    <br />
                    9:00 AM - 8:00 PM
                    <br />
                    Saturday:
                    <br />
                    10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Our Values
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything we do is focused on helping
              students succeed with confidence and practical
              skills.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Card
                  key={index}
                  className="rounded-3xl border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-yellow-100">
                      <Icon className="h-8 w-8 text-blue-700" />
                    </div>

                    <CardTitle className="text-2xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="leading-relaxed text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Our Impact
            </h2>

            <p className="text-lg text-gray-600">
              Numbers that reflect our dedication to
              education
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-10 text-center shadow-xl"
              >
                <div className="mb-3 text-5xl font-black text-blue-600">
                  {stat.number}
                </div>

                <div className="text-lg font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-10 text-center text-white shadow-2xl lg:p-16">
            <h2 className="mb-6 text-4xl font-black">
              Start Your Learning Journey Today
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
              Join thousands of students building successful
              careers with Vihaan Education Academy.
            </p>

            <Link href="/admission">
              <Button
                size="lg"
                className="h-14 rounded-2xl bg-yellow-400 px-10 text-lg font-bold text-black hover:bg-yellow-300"
              >
                Apply For Admission
              </Button>
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
}