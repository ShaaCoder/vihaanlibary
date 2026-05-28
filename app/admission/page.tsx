'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { AdmissionFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader as Loader2, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function AdmissionFormContent() {
  const [formData, setFormData] = useState<AdmissionFormData>({
    student_name: '',
    email: '',
    phone: '',
    course: '',
    class: '',
    subjects: '',
    reference_number: '',
    parent_name: '',
    parent_phone: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        student_name: formData.student_name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        class: formData.class || null,
        subjects: formData.subjects || null,
        reference_number: formData.reference_number || null,
        parent_name: formData.parent_name || null,
        parent_phone: formData.parent_phone || null,
        address: formData.address || null,
        message: formData.message || null,
      };

      const { error } = await (supabase.from('admissions') as any).insert([payload]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your admission application has been submitted. We will contact you soon.',
      });
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'border-blue-100 focus:border-blue-400 focus:ring-blue-400';

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50">
      
        <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900">Application Submitted!</h2>
          <p className="mb-8 text-lg text-gray-600">
            Thank you for applying to Vihaan Education Academy. We have received your application and will contact you shortly.
          </p>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">Back to Home</Button>
            </Link>
            <Button onClick={() => { setSubmitted(false); setFormData({ student_name: '', email: '', phone: '', course: '', class: '', subjects: '', reference_number: '', parent_name: '', parent_phone: '', address: '', message: '' }); }} className="bg-blue-600 text-white hover:bg-blue-700">
              Submit Another
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50">
    

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-yellow-800">
            Admissions Open
          </div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Admission <span className="text-blue-600">Form</span>
          </h2>
          <p className="text-gray-600">Fill out the form below to apply for admission</p>
        </div>

        <Card className="border-blue-100 shadow-xl shadow-blue-100/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900">Student Information</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="student_name">Full Name *</Label>
                  <Input id="student_name" value={formData.student_name} onChange={(e) => setFormData({ ...formData, student_name: e.target.value })} required placeholder="Student's full name" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-email">Email *</Label>
                  <Input id="admission-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="student@email.com" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-phone">Phone *</Label>
                  <Input id="admission-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required placeholder="Contact number" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-course">Course Applying For *</Label>
                  <Input id="admission-course" value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} required placeholder="e.g., Web Development" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-class">Class / Grade</Label>
                  <Input id="admission-class" value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} placeholder="e.g., 10th, 12th" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-subjects">Subjects</Label>
                  <Input id="admission-subjects" value={formData.subjects} onChange={(e) => setFormData({ ...formData, subjects: e.target.value })} placeholder="e.g., Math, Science" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission-ref">Reference Number</Label>
                  <Input id="admission-ref" value={formData.reference_number} onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })} placeholder="If you have a reference" className={inputClass} />
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900">Parent / Guardian Information</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parent_name">Parent / Guardian Name</Label>
                  <Input id="parent_name" value={formData.parent_name} onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })} placeholder="Parent's full name" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_phone">Parent / Guardian Phone</Label>
                  <Input id="parent_phone" type="tel" value={formData.parent_phone} onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })} placeholder="Parent's contact number" className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admission-address">Address</Label>
                <Textarea id="admission-address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Full address" rows={2} className={inputClass} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admission-message">Additional Message</Label>
                <Textarea id="admission-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Any additional information or questions..." rows={3} className={inputClass} />
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting Application...</>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

<<<<<<< HEAD
  
=======
      <footer className="border-t border-blue-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-500">
          <p>&copy; 2024 Vihaan Education Academy. All rights reserved.</p>
        </div>
      </footer>
>>>>>>> 62c3ca9c7a7ee7b247e8b1d157b14b6d6f3f7e49
    </div>
  );
}

export default function AdmissionPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <AdmissionFormContent />
    </Suspense>
  );
}
