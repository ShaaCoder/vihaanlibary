'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { Course, Lead, Notice, Student, Admission } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { ImageUpload } from '@/components/image-upload';
import { LibraryDashboard } from '@/components/library-dashboard';
import { BlogCMS } from '@/components/admin/blog/blog-cms';
import Image from 'next/image';
import {
  Loader as Loader2,
  Trash2,
  CreditCard as Edit2,
  GraduationCap,
  LogOut,
  Users,
  FileText,
  Bell,
  BookOpen,
  ClipboardList,
  Mail,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const supabase = useRef(createClient()).current;
  const hasLoadedRef = useRef(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('courses');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentFilterCourse, setStudentFilterCourse] = useState('all');
  const [studentFilterClass, setStudentFilterClass] = useState('all');
  const { toast } = useToast();

  const [courseForm, setCourseForm] = useState({ title: '', description: '', image_url: null as string | null });
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', priority: 'medium', is_active: true });
  const [studentForm, setStudentForm] = useState({
    name: '', email: '', enrollment_number: '', course: '',
    phone: '', class: '', reference_number: '', subjects: '',
  });
  const [admissionStatusForm, setAdmissionStatusForm] = useState({ id: '', status: 'pending' });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [coursesRes, leadsRes, noticesRes, studentsRes, admissionsRes] = await Promise.all([
        supabase.from('courses').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('notices').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('created_at', { ascending: false }),
        supabase.from('admissions').select('*').order('created_at', { ascending: false }),
      ]);

      setCourses(coursesRes.data || []);
      setLeads(leadsRes.data || []);
      setNotices(noticesRes.data || []);
      setStudents(studentsRes.data || []);
      setAdmissions(admissionsRes.data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadData();
    }
  }, [authLoading, user, router, loadData]);

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await (supabase.from('courses') as any).update({ title: courseForm.title, description: courseForm.description, image_url: courseForm.image_url }).eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Success', description: 'Course updated' });
      } else {
        const { error } = await (supabase.from('courses') as any).insert([{ title: courseForm.title, description: courseForm.description, image_url: courseForm.image_url }]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Course added' });
      }
      setCourseForm({ title: '', description: '', image_url: null });
      setEditingId(null);
      setEditingType(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save course', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await (supabase.from('notices') as any).update({ title: noticeForm.title, content: noticeForm.content, priority: noticeForm.priority, is_active: noticeForm.is_active }).eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Success', description: 'Notice updated' });
      } else {
        const { error } = await (supabase.from('notices') as any).insert([{ title: noticeForm.title, content: noticeForm.content, priority: noticeForm.priority, is_active: noticeForm.is_active }]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Notice added' });
      }
      setNoticeForm({ title: '', content: '', priority: 'medium', is_active: true });
      setEditingId(null);
      setEditingType(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save notice', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const subjectsArray = studentForm.subjects
        ? studentForm.subjects.split(',').map(s => s.trim()).filter(s => s)
        : null;

      const payload = {
        name: studentForm.name,
        email: studentForm.email,
        enrollment_number: studentForm.enrollment_number,
        course: studentForm.course || null,
        phone: studentForm.phone || null,
        class: studentForm.class || null,
        reference_number: studentForm.reference_number || null,
        subjects: subjectsArray && subjectsArray.length > 0 ? subjectsArray : null,
      };
      if (editingId) {
        const { error } = await (supabase.from('students') as any).update(payload).eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Success', description: 'Student updated' });
      } else {
        const { error } = await (supabase.from('students') as any).insert([payload]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Student added' });
      }
      setStudentForm({ name: '', email: '', enrollment_number: '', course: '', phone: '', class: '', reference_number: '', subjects: '' });
      setEditingId(null);
      setEditingType(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save student', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAdmissionStatus = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await (supabase.from('admissions') as any).update({ status: admissionStatusForm.status }).eq('id', admissionStatusForm.id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Admission status updated' });
      setAdmissionStatusForm({ id: '', status: 'pending' });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: any, type: string) => {
    setEditingId(item.id);
    setEditingType(type);
    if (type === 'course') {
      setCourseForm({ title: item.title, description: item.description || '', image_url: item.image_url || null });
    } else if (type === 'notice') {
      setNoticeForm({ title: item.title, content: item.content || '', priority: item.priority || 'medium', is_active: item.is_active !== false });
    } else if (type === 'student') {
      const subjectsString = Array.isArray(item.subjects) ? item.subjects.join(', ') : item.subjects || '';
      setStudentForm({
        name: item.name, email: item.email, enrollment_number: item.enrollment_number,
        course: item.course || '', phone: item.phone || '', class: item.class || '',
        reference_number: item.reference_number || '', subjects: subjectsString,
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId || !deleteType) return;
    try {
      const { error } = await (supabase.from(deleteType) as any).delete().eq('id', deleteId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Item deleted' });
      setDeleteId(null);
      setDeleteType(null);
      setShowDeleteDialog(false);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingType(null);
    setCourseForm({ title: '', description: '', image_url: null });
    setNoticeForm({ title: '', content: '', priority: 'medium', is_active: true });
    setStudentForm({ name: '', email: '', enrollment_number: '', course: '', phone: '', class: '', reference_number: '', subjects: '' });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to logout', variant: 'destructive' });
    }
  };

  const confirmDelete = (id: string, type: string) => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteDialog(true);
  };

  const filteredStudents = students.filter(student => {
    const searchLower = studentSearchQuery.toLowerCase();
    const matchesSearch = !studentSearchQuery ||
      student.name.toLowerCase().includes(searchLower) ||
      student.enrollment_number.toLowerCase().includes(searchLower);

    const matchesCourse = studentFilterCourse === 'all' || student.course === studentFilterCourse;
    const matchesClass = studentFilterClass === 'all' || student.class === studentFilterClass;

    return matchesSearch && matchesCourse && matchesClass;
  });

  const uniqueCourses = Array.from(new Set(students.map(s => s.course).filter((c): c is string => !!c)));
  const uniqueClasses = Array.from(new Set(students.map(s => s.class).filter((c): c is string => !!c)));

  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-yellow-50 to-blue-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  const inputClass = 'border-blue-100 focus:border-blue-400 focus:ring-blue-400';

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50">
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Vihaan Education Academy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-gray-500 sm:inline">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-blue-50 p-1">
            <TabsTrigger value="courses" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" /> Courses <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{courses.length}</span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4" /> Blogs
            </TabsTrigger>
            <TabsTrigger value="notices" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4" /> Notices <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{notices.length}</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="h-4 w-4" /> Students <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{students.length}</span>
            </TabsTrigger>
            <TabsTrigger value="admissions" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardList className="h-4 w-4" /> Admissions <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{admissions.length}</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Mail className="h-4 w-4" /> Contact <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{leads.length}</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" /> Library
            </TabsTrigger>
          </TabsList>

          {/* ==================== COURSES ==================== */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">{editingType === 'course' ? 'Edit Course' : 'Add New Course'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCourse} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Course Title *</Label>
                    <Input id="course-title" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} required placeholder="e.g., Web Development" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-desc">Description *</Label>
                    <Textarea id="course-desc" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} required placeholder="Course description" rows={3} className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label>Course Image</Label>
                    <ImageUpload value={courseForm.image_url} onChange={(url) => setCourseForm({ ...courseForm, image_url: url })} folder="courses" />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700">
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editingType === 'course' ? 'Update Course' : 'Add Course'}
                    </Button>
                    {editingType === 'course' && <Button type="button" variant="outline" onClick={cancelEdit} className="border-blue-200 text-blue-700 hover:bg-blue-50">Cancel</Button>}
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="border-blue-100 transition-all hover:shadow-md hover:shadow-blue-100/50 overflow-hidden">
                  {course.image_url ? (
                    <div className="relative h-40 w-full">
                      <Image src={course.image_url} alt={course.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-24 items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-50">
                      <span className="text-4xl font-bold text-blue-200">{course.title.charAt(0)}</span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(course, 'course')} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"><Edit2 className="h-4 w-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(course.id, 'courses')}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ==================== BLOGS ==================== */}
          <TabsContent value="blogs" className="space-y-6">
            <BlogCMS />
          </TabsContent>

          {/* ==================== NOTICES ==================== */}
          <TabsContent value="notices" className="space-y-6">
            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">{editingType === 'notice' ? 'Edit Notice' : 'Add New Notice'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitNotice} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notice-title">Notice Title *</Label>
                    <Input id="notice-title" value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} required placeholder="Notice title" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notice-content">Content *</Label>
                    <Textarea id="notice-content" value={noticeForm.content} onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })} required placeholder="Notice content" rows={3} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority *</Label>
                      <Select value={noticeForm.priority} onValueChange={(v) => setNoticeForm({ ...noticeForm, priority: v })}>
                        <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={noticeForm.is_active ? 'active' : 'inactive'} onValueChange={(v) => setNoticeForm({ ...noticeForm, is_active: v === 'active' })}>
                        <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700">
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editingType === 'notice' ? 'Update Notice' : 'Add Notice'}
                    </Button>
                    {editingType === 'notice' && <Button type="button" variant="outline" onClick={cancelEdit} className="border-blue-200 text-blue-700 hover:bg-blue-50">Cancel</Button>}
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice.id} className="border-blue-100 transition-all hover:shadow-md hover:shadow-blue-100/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <CardTitle className="truncate">{notice.title}</CardTitle>
                        <CardDescription>
                          Priority: <span className={`font-semibold capitalize ${notice.priority === 'high' ? 'text-red-600' : notice.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`}>{notice.priority}</span>
                          {' | '}Status: <span className={notice.is_active ? 'text-green-600' : 'text-gray-400'}>{notice.is_active ? 'Active' : 'Inactive'}</span>
                        </CardDescription>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(notice, 'notice')} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"><Edit2 className="h-4 w-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => confirmDelete(notice.id, 'notices')}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent><p className="text-gray-600">{notice.content}</p></CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ==================== STUDENTS ==================== */}
          <TabsContent value="students" className="space-y-6">
            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">{editingType === 'student' ? 'Edit Student' : 'Add New Student'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitStudent} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name *</Label>
                      <Input id="student-name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} required placeholder="Student name" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email *</Label>
                      <Input id="student-email" type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} required placeholder="student@email.com" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-enrollment">Enrollment Number *</Label>
                      <Input id="student-enrollment" value={studentForm.enrollment_number} onChange={(e) => setStudentForm({ ...studentForm, enrollment_number: e.target.value })} required placeholder="e.g., VEA-2024-001" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-phone">Phone</Label>
                      <Input id="student-phone" type="tel" value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} placeholder="Contact number" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-course">Course</Label>
                      <Input id="student-course" value={studentForm.course} onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })} placeholder="Enrolled course" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-class">Class</Label>
                      <Input id="student-class" value={studentForm.class} onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })} placeholder="e.g., 10th, 12th" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-ref">Reference Number</Label>
                      <Input id="student-ref" value={studentForm.reference_number} onChange={(e) => setStudentForm({ ...studentForm, reference_number: e.target.value })} placeholder="Reference number" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-subjects">Subjects</Label>
                      <Input id="student-subjects" value={studentForm.subjects} onChange={(e) => setStudentForm({ ...studentForm, subjects: e.target.value })} placeholder="e.g., Math, Science, English" className={inputClass} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-700">
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editingType === 'student' ? 'Update Student' : 'Add Student'}
                    </Button>
                    {editingType === 'student' && <Button type="button" variant="outline" onClick={cancelEdit} className="border-blue-200 text-blue-700 hover:bg-blue-50">Cancel</Button>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-sm overflow-hidden">
              <CardHeader className="pb-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label htmlFor="student-search" className="text-xs text-gray-500">Search by Name or Enrollment</Label>
                      <Input
                        id="student-search"
                        type="text"
                        placeholder="Search students..."
                        value={studentSearchQuery}
                        onChange={(e) => setStudentSearchQuery(e.target.value)}
                        className={`${inputClass} mt-1`}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="student-filter-course" className="text-xs text-gray-500">Filter by Course</Label>
                      <Select value={studentFilterCourse} onValueChange={setStudentFilterCourse}>
                        <SelectTrigger id="student-filter-course" className={`${inputClass} mt-1`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          {uniqueCourses.map(course => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="student-filter-class" className="text-xs text-gray-500">Filter by Class</Label>
                      <Select value={studentFilterClass} onValueChange={setStudentFilterClass}>
                        <SelectTrigger id="student-filter-class" className={`${inputClass} mt-1`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          {uniqueClasses.map(cls => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(studentSearchQuery || studentFilterCourse !== 'all' || studentFilterClass !== 'all') && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setStudentSearchQuery('');
                          setStudentFilterCourse('all');
                          setStudentFilterClass('all');
                        }}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        Clear Filters
                      </Button>
                      <span className="text-sm text-gray-500 flex items-center">
                        {filteredStudents.length} of {students.length} student{students.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-blue-100 bg-blue-50">
                      <th className="px-4 py-3 text-left font-semibold text-blue-900">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-900">Enrollment No.</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-900">Email</th>
                      <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 md:table-cell">Class</th>
                      <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 lg:table-cell">Course</th>
                      <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 lg:table-cell">Subjects</th>
                      <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 md:table-cell">Ref No.</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-blue-50 hover:bg-yellow-50/30">
                        <td className="px-4 py-3 font-medium">{student.name}</td>
                        <td className="px-4 py-3"><span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">{student.enrollment_number}</span></td>
                        <td className="px-4 py-3 text-gray-600">{student.email}</td>
                        <td className="hidden px-4 py-3 md:table-cell">{student.class || '-'}</td>
                        <td className="hidden px-4 py-3 lg:table-cell">{student.course || '-'}</td>
                        <td className="hidden max-w-[200px] truncate px-4 py-3 lg:table-cell">{Array.isArray(student.subjects) ? student.subjects.join(', ') : student.subjects || '-'}</td>
                        <td className="hidden px-4 py-3 md:table-cell">{student.reference_number || '-'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(student, 'student')} className="h-8 w-8 border-yellow-200 p-0 text-yellow-700 hover:bg-yellow-50"><Edit2 className="h-3.5 w-3.5" /></Button>
                            <Button size="sm" variant="destructive" onClick={() => confirmDelete(student.id, 'students')} className="h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudents.length === 0 && students.length > 0 && <div className="py-12 text-center text-gray-400">No students match your search or filters.</div>}
                {students.length === 0 && <div className="py-12 text-center text-gray-400">No students yet. Add your first student above.</div>}
              </div>
            </Card>
          </TabsContent>

          {/* ==================== ADMISSIONS ==================== */}
          <TabsContent value="admissions" className="space-y-6">
            <Card className="border-blue-100 shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-blue-900">Admission Applications</CardTitle>
                <CardDescription>Review and manage admission applications from the website</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-blue-100 bg-blue-50">
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Student</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Phone</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Course</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 md:table-cell">Class</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 lg:table-cell">Subjects</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 lg:table-cell">Parent</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.map((admission) => (
                        <tr key={admission.id} className="border-b border-blue-50 hover:bg-yellow-50/30">
                          <td className="px-4 py-3 font-medium">{admission.student_name}</td>
                          <td className="px-4 py-3">{admission.phone}</td>
                          <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{admission.email}</td>
                          <td className="px-4 py-3"><span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">{admission.course}</span></td>
                          <td className="hidden px-4 py-3 md:table-cell">{admission.class || '-'}</td>
                          <td className="hidden max-w-[150px] truncate px-4 py-3 lg:table-cell">{admission.subjects || '-'}</td>
                          <td className="hidden px-4 py-3 lg:table-cell">{admission.parent_name || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              admission.status === 'approved' ? 'bg-green-100 text-green-800' :
                              admission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {admission.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Select
                                value={admissionStatusForm.id === admission.id ? admissionStatusForm.status : admission.status}
                                onValueChange={(v) => setAdmissionStatusForm({ id: admission.id, status: v })}
                              >
                                <SelectTrigger className="h-8 w-[110px] border-blue-100 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                              {admissionStatusForm.id === admission.id && admissionStatusForm.status !== admission.status && (
                                <Button size="sm" onClick={handleUpdateAdmissionStatus} disabled={isSubmitting} className="h-8 bg-blue-600 px-2 text-xs text-white hover:bg-blue-700">
                                  Save
                                </Button>
                              )}
                              <Button size="sm" variant="destructive" onClick={() => confirmDelete(admission.id, 'admissions')} className="h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {admissions.length === 0 && <div className="py-12 text-center text-gray-400">No admission applications yet.</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== CONTACT / LEADS ==================== */}
          <TabsContent value="leads" className="space-y-6">
            <Card className="border-blue-100 shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-blue-900">Contact Form Submissions</CardTitle>
                <CardDescription>Enquiries submitted through the Contact Us form</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-blue-100 bg-blue-50">
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Phone</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Course</th>
                        <th className="hidden px-4 py-3 text-left font-semibold text-blue-900 lg:table-cell">Message</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-blue-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-blue-50 hover:bg-yellow-50/30">
                          <td className="px-4 py-3 font-medium">{lead.name}</td>
                          <td className="px-4 py-3">{lead.phone}</td>
                          <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{lead.email || '-'}</td>
                          <td className="px-4 py-3"><span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">{lead.course}</span></td>
                          <td className="hidden max-w-[200px] truncate px-4 py-3 text-gray-500 lg:table-cell">{lead.message || '-'}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="destructive" onClick={() => confirmDelete(lead.id, 'leads')} className="h-8 w-8 p-0"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {leads.length === 0 && <div className="py-12 text-center text-gray-400">No contact submissions yet.</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== LIBRARY ==================== */}
          <TabsContent value="library" className="space-y-6">
            <LibraryDashboard />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-900">Delete Item</DialogTitle>
            <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="border-blue-200 text-blue-700 hover:bg-blue-50">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
