'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { LeadFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader as Loader2 } from 'lucide-react';

interface ContactFormProps {
  initialCourse?: string;
}

export function ContactForm({ initialCourse = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    course: initialCourse,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await (supabase.from('leads') as any).insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          course: formData.course,
          message: formData.message || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Thank you for your interest. We will contact you soon.',
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        course: initialCourse,
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl border-blue-100 shadow-xl shadow-blue-100/50">
      <CardHeader>
        <CardTitle className="text-blue-900">Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Your full name"
              className="border-blue-100 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="Your contact number"
              className="border-blue-100 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="border-blue-100 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course Interested In *</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              required
              placeholder="Course name"
              className="border-blue-100 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any additional questions or information..."
              rows={4}
              className="border-blue-100 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Enquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
