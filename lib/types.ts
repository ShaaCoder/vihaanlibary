export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  course: string;
  message: string | null;
  created_at: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  image?: File;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  course: string;
  message?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  image_alt: string;
  author: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  canonical_url: string;
  og_image: string;
  reading_time: number;
  views: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: BlogCategory[];
  tags?: BlogTag[];
  faqs?: BlogFAQ[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogFAQ {
  id: string;
  blog_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollment_number: string;
  course: string | null;
  phone: string | null;
  class: string | null;
  reference_number: string | null;
  subjects: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  enrollment_number: string;
  course: string;
  phone: string;
  class: string;
  reference_number: string;
  subjects: string;
}

export interface Admission {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course: string;
  class: string | null;
  subjects: string | null;
  reference_number: string | null;
  parent_name: string | null;
  parent_phone: string | null;
  address: string | null;
  status: 'pending' | 'approved' | 'rejected';
  message: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdmissionFormData {
  student_name: string;
  email: string;
  phone: string;
  course: string;
  class: string;
  subjects: string;
  reference_number: string;
  parent_name: string;
  parent_phone: string;
  address: string;
  message: string;
}

export interface LibraryStudent {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  membership_type: 'monthly' | 'quarterly' | 'yearly';
  membership_start: string | null;
  membership_end: string | null;
  status: 'active' | 'expired' | 'suspended';
  created_at: string;
}

export interface LibraryAttendance {
  id: string;
  student_id: string | null;
  check_in: string | null;
  check_out: string | null;
  date: string;
  created_at: string;
}

export interface LibraryPayment {
  id: string;
  student_id: string | null;
  amount: number;
  payment_type: 'membership' | 'fine' | 'other';
  payment_date: string;
  status: 'completed' | 'pending' | 'failed';
  notes: string | null;
  created_at: string;
}

export interface LibraryStudentFormData {
  name: string;
  phone: string;
  email: string;
  membership_type: 'monthly' | 'quarterly' | 'yearly';
  membership_start: string;
  membership_end: string;
}
