'use client';

import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactPageContent() {
  const searchParams = useSearchParams();
  const course = searchParams.get('course') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50">
     

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ContactForm initialCourse={course} />
      </main>

     

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
