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
  author: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
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
  membership_type: 'basic' | 'premium' | 'annual';
  monthly_fee: number;
  join_date: string;
  membership_expiry: string | null;
  payment_status: 'paid' | 'pending' | 'overdue';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface LibraryAttendance {
  id: string;
  student_id: string;
  check_in_time: string | null;
  check_out_time: string | null;
  date: string;
  created_at: string;
}

export interface LibraryPayment {
  id: string;
  student_id: string;
  amount: number;
  payment_date: string;
  month: string | null;
  payment_method: string | null;
  status: 'completed' | 'pending';
  created_at: string;
}

export interface LibraryStudentFormData {
  name: string;
  phone: string;
  email: string;
  membership_type: 'basic' | 'premium' | 'annual';
  monthly_fee: number;
  membership_expiry: string;
}
