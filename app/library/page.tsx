// app/library/page.tsx

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  Star,
  ArrowRight,
  Library,
  BookMarked,
  Wifi,
  Laptop,
  LampDesk,
} from "lucide-react";

export default function LibraryPage() {
  const libraryFeatures = [
    {
      title: "1000+ Books",
      description:
        "Wide collection of academic, competitive exam, and reference books.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Silent Study Area",
      description:
        "Peaceful and comfortable environment for focused learning.",
      icon: LampDesk,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Digital Learning",
      description:
        "Access e-books, PDFs, and online study resources anytime.",
      icon: Laptop,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Free WiFi",
      description:
        "High-speed internet available for all students in the library.",
      icon: Wifi,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    "NIOS Study Material",
    "CBSE Books",
    "Competitive Exam Books",
    "English Grammar",
    "Computer Science",
    "Mathematics",
    "Science & Technology",
    "Current Affairs",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-cyan-100/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <Library className="mr-2 h-4 w-4" />
                Knowledge Hub
              </div>

              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Welcome to Our
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Library
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Explore our modern library filled with academic books,
                competitive exam resources, digital learning materials, and a
                peaceful study environment designed for student success.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/admission">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105">
                    Join Academy
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link href="/contact">
                  <button className="rounded-xl border-2 border-blue-300 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">
                    Visit Library
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                  alt="Library"
                  width={800}
                  height={600}
                  className="h-[500px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      500+
                    </h4>

                    <p className="text-sm text-gray-600">
                      Active Readers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Library Features
            </h2>

            <p className="mt-4 text-gray-600">
              Everything students need for better learning and preparation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {libraryFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              <BookMarked className="mr-2 h-4 w-4" />
              Book Categories
            </div>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Available Resources
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Environment */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
                alt="Study Environment"
                width={800}
                height={600}
                className="h-[450px] w-full object-cover"
              />
            </div>

            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <GraduationCap className="mr-2 h-4 w-4" />
                Smart Learning Space
              </div>

              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                A Perfect Place
                <span className="text-blue-600"> To Study</span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                Our library provides a peaceful and motivating atmosphere where
                students can focus on studies, prepare for exams, and access
                quality educational resources with complete comfort.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">
                    Comfortable Seating Area
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">
                    Daily Newspapers & Magazines
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">
                    Separate Reading Sections
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">
                    Competitive Exam Preparation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-8 text-center text-white shadow-2xl sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Start Learning Today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
              Visit our library and explore thousands of educational resources
              designed to help students succeed academically.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <button className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300">
                  Visit Library
                </button>
              </Link>

              <Link href="/admission">
                <button className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  Take Admission
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}