'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { LibraryStudent, LibraryAttendance, LibraryPayment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserPlus, Clock, CreditCard, TrendingUp, Trash2, CreditCard as Edit2, Search, Download, CircleCheck as CheckCircle, CircleAlert as AlertCircle, DollarSign, Calendar, Phone as PhoneIcon, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MEMBERSHIP_FEES = {
  basic: 500,
  premium: 1000,
  annual: 10000,
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function LibraryDashboard() {
  const supabase = useRef(createClient()).current;
  const { toast } = useToast();

  const [libraryStudents, setLibraryStudents] = useState<LibraryStudent[]>([]);
  const [attendance, setAttendance] = useState<LibraryAttendance[]>([]);
  const [payments, setPayments] = useState<LibraryPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all');
  const [filterMembership, setFilterMembership] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [studentForm, setStudentForm] = useState<{
    name: string;
    phone: string;
    email: string;
    membership_type: 'basic' | 'premium' | 'annual';
    monthly_fee: number;
    membership_expiry: string;
  }>({
    name: '',
    phone: '',
    email: '',
    membership_type: 'basic',
    monthly_fee: 500,
    membership_expiry: '',
  });

  const [attendanceForm, setAttendanceForm] = useState({
    student_id: '',
    check_in_time: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [paymentForm, setPaymentForm] = useState({
    student_id: '',
    amount: 0,
    month: '',
    payment_method: 'cash',
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [studentsRes, attendanceRes, paymentsRes] = await Promise.all([
        (supabase.from('library_students') as any).select('*').order('created_at', { ascending: false }),
        (supabase.from('library_attendance') as any).select('*').order('created_at', { ascending: false }).limit(100),
        (supabase.from('library_payments') as any).select('*').order('created_at', { ascending: false }).limit(100),
      ]);

      setLibraryStudents((studentsRes.data || []) as LibraryStudent[]);
      setAttendance((attendanceRes.data || []) as LibraryAttendance[]);
      setPayments((paymentsRes.data || []) as LibraryPayment[]);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load library data', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await (supabase.from('library_students') as any)
          .update({
            name: studentForm.name,
            phone: studentForm.phone,
            email: studentForm.email,
            membership_type: studentForm.membership_type,
            monthly_fee: studentForm.monthly_fee,
            membership_expiry: studentForm.membership_expiry ? new Date(studentForm.membership_expiry).toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: 'Success', description: 'Student updated' });
      } else {
        const { error } = await (supabase.from('library_students') as any).insert([
          {
            name: studentForm.name,
            phone: studentForm.phone,
            email: studentForm.email,
            membership_type: studentForm.membership_type,
            monthly_fee: studentForm.monthly_fee,
            membership_expiry: studentForm.membership_expiry ? new Date(studentForm.membership_expiry).toISOString() : null,
            payment_status: 'pending',
            status: 'active',
          },
        ]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Student added' });
      }
      resetStudentForm();
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save student', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const checkInTime = new Date(`${attendanceForm.date}T${attendanceForm.check_in_time}`).toISOString();
      const { error } = await (supabase.from('library_attendance') as any).insert([
        {
          student_id: attendanceForm.student_id,
          check_in_time: checkInTime,
          date: attendanceForm.date,
        },
      ]);

      if (error) throw error;
      toast({ title: 'Success', description: 'Check-in recorded' });
      setAttendanceForm({ student_id: '', check_in_time: '', date: new Date().toISOString().split('T')[0] });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to record attendance', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const currentMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      const { error } = await (supabase.from('library_payments') as any).insert([
        {
          student_id: paymentForm.student_id,
          amount: paymentForm.amount,
          month: paymentForm.month || currentMonth,
          payment_method: paymentForm.payment_method,
          status: 'completed',
        },
      ]);

      if (error) throw error;

      const student = libraryStudents.find(s => s.id === paymentForm.student_id);
      if (student) {
        await (supabase.from('library_students') as any)
          .update({ payment_status: 'paid', updated_at: new Date().toISOString() })
          .eq('id', paymentForm.student_id);
      }

      toast({ title: 'Success', description: 'Payment recorded' });
      setPaymentForm({ student_id: '', amount: 0, month: '', payment_method: 'cash' });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to record payment', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (student: LibraryStudent) => {
    setEditingId(student.id);
    setStudentForm({
      name: student.name,
      phone: student.phone,
      email: student.email || '',
      membership_type: student.membership_type as 'basic' | 'premium' | 'annual',
      monthly_fee: student.monthly_fee,
      membership_expiry: student.membership_expiry ? student.membership_expiry.split('T')[0] : '',
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await (supabase.from('library_students') as any).delete().eq('id', deleteId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Student deleted' });
      setShowDeleteDialog(false);
      setDeleteId(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete student', variant: 'destructive' });
    }
  };

  const resetStudentForm = () => {
    setStudentForm({ name: '', phone: '', email: '', membership_type: 'basic', monthly_fee: 500, membership_expiry: '' });
    setEditingId(null);
  };

  const filteredStudents = libraryStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.phone.includes(searchQuery);
    const matchesPayment = filterPaymentStatus === 'all' || student.payment_status === filterPaymentStatus;
    const matchesMembership = filterMembership === 'all' || student.membership_type === filterMembership;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesPayment && matchesMembership && matchesStatus;
  });

  const stats = {
    totalStudents: libraryStudents.length,
    activeStudents: libraryStudents.filter(s => s.status === 'active').length,
    pendingPayments: libraryStudents.filter(s => s.payment_status === 'pending' || s.payment_status === 'overdue').length,
    expiredMemberships: libraryStudents.filter(s => s.membership_expiry && new Date(s.membership_expiry) < new Date()).length,
    monthlyRevenue: payments
      .filter(p => {
        const paymentDate = new Date(p.created_at);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const attendanceByDay = Object.entries(
    attendance.reduce((acc: Record<string, number>, att) => {
      acc[att.date] = (acc[att.date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, visits: count })).slice(-7);

  const revenueByMonth = Object.entries(
    payments.reduce((acc: Record<string, number>, p) => {
      const month = new Date(p.created_at).toLocaleDateString('en-US', { month: 'short' });
      acc[month] = (acc[month] || 0) + p.amount;
      return acc;
    }, {})
  ).map(([month, amount]) => ({ month, revenue: amount })).slice(-6);

  const membershipDistribution = [
    { name: 'Basic', value: libraryStudents.filter(s => s.membership_type === 'basic').length },
    { name: 'Premium', value: libraryStudents.filter(s => s.membership_type === 'premium').length },
    { name: 'Annual', value: libraryStudents.filter(s => s.membership_type === 'annual').length },
  ];

  const inputClass = 'border-blue-200 focus:border-blue-500 focus:ring-blue-500';

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Active Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-green-600">{stats.activeStudents}</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-gradient-to-br from-red-50 to-pink-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Expired Memberships</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-red-600">{stats.expiredMemberships}</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-purple-600">₹{stats.monthlyRevenue}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-sm">Attendance Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-sm">Revenue Trends (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-sm">Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={membershipDistribution} cx="50%" cy="50%" labelLine={false} label={{ fill: '#666', fontSize: 12 }} outerRadius={80} fill="#8884d8" dataKey="value">
                  {membershipDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Students Tab */}
      <TabsContent value="students" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Student' : 'Add New Library Student'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} required placeholder="Full name" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} required placeholder="Phone number" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} placeholder="Email address" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Membership Type *</Label>
                  <Select value={studentForm.membership_type} onValueChange={(value) => {
                    const fee = MEMBERSHIP_FEES[value as keyof typeof MEMBERSHIP_FEES];
                    setStudentForm({ ...studentForm, membership_type: value as any, monthly_fee: fee });
                  }}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - ₹500</SelectItem>
                      <SelectItem value="premium">Premium - ₹1000</SelectItem>
                      <SelectItem value="annual">Annual - ₹10000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Monthly Fee</Label>
                  <Input type="number" value={studentForm.monthly_fee} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label>Membership Expiry</Label>
                  <Input type="date" value={studentForm.membership_expiry} onChange={(e) => setStudentForm({ ...studentForm, membership_expiry: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Add'} Student
                </Button>
                {editingId && <Button type="button" variant="outline" onClick={resetStudentForm}>Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Students List</CardTitle>
            <div className="space-y-3 mt-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search by name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <Select value={filterPaymentStatus} onValueChange={setFilterPaymentStatus}>
                  <SelectTrigger><SelectValue placeholder="Payment Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMembership} onValueChange={setFilterMembership}>
                  <SelectTrigger><SelectValue placeholder="Membership" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Memberships</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-blue-50 hover:bg-blue-50">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{student.membership_type}</span></TableCell>
                      <TableCell>₹{student.monthly_fee}</TableCell>
                      <TableCell>{student.membership_expiry ? new Date(student.membership_expiry).toLocaleDateString() : '-'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          student.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                          student.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {student.payment_status}
                        </span>
                      </TableCell>
                      <TableCell><span className={`px-2 py-1 rounded text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{student.status}</span></TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(student)}><Edit2 className="h-3 w-3" /></Button>
                          <Button size="sm" variant="destructive" onClick={() => { setDeleteId(student.id); setShowDeleteDialog(true); }}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Attendance Tab */}
      <TabsContent value="attendance" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Record Check-In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAttendance} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Student *</Label>
                  <Select value={attendanceForm.student_id} onValueChange={(value) => setAttendanceForm({ ...attendanceForm, student_id: value })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {libraryStudents.filter(s => s.status === 'active').map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Check-In Time *</Label>
                  <Input type="time" value={attendanceForm.check_in_time} onChange={(e) => setAttendanceForm({ ...attendanceForm, check_in_time: e.target.value })} className={inputClass} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Clock className="h-4 w-4" /> Record Check-In
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Check-In</TableHead>
                    <TableHead>Check-Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.slice(0, 20).map((att) => {
                    const student = libraryStudents.find(s => s.id === att.student_id);
                    return (
                      <TableRow key={att.id} className="border-blue-50 hover:bg-blue-50">
                        <TableCell>{att.date}</TableCell>
                        <TableCell>{student?.name || '-'}</TableCell>
                        <TableCell>{att.check_in_time ? new Date(att.check_in_time).toLocaleTimeString() : '-'}</TableCell>
                        <TableCell>{att.check_out_time ? new Date(att.check_out_time).toLocaleTimeString() : '-'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Payments Tab */}
      <TabsContent value="payments" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Record Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <Label>Student *</Label>
                  <Select value={paymentForm.student_id} onValueChange={(value) => setPaymentForm({ ...paymentForm, student_id: value })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {libraryStudents.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹) *</Label>
                  <Input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) })} required placeholder="0" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Month</Label>
                  <Input type="month" value={paymentForm.month} onChange={(e) => setPaymentForm({ ...paymentForm, month: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select value={paymentForm.payment_method} onValueChange={(value) => setPaymentForm({ ...paymentForm, payment_method: value })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <DollarSign className="h-4 w-4" /> Record Payment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.slice(0, 20).map((payment) => {
                    const student = libraryStudents.find(s => s.id === payment.student_id);
                    return (
                      <TableRow key={payment.id} className="border-blue-50 hover:bg-blue-50">
                        <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>{student?.name || '-'}</TableCell>
                        <TableCell className="font-medium">₹{payment.amount}</TableCell>
                        <TableCell>{payment.month || '-'}</TableCell>
                        <TableCell>{payment.payment_method || '-'}</TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{payment.status}</span></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-sm">Daily Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Bar dataKey="visits" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-sm">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} formatter={(value) => `₹${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-sm">Payment Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-600 font-medium">Paid</p>
                <p className="text-2xl font-bold text-green-700">{libraryStudents.filter(s => s.payment_status === 'paid').length}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">{libraryStudents.filter(s => s.payment_status === 'pending').length}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-600 font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-700">{libraryStudents.filter(s => s.payment_status === 'overdue').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>Are you sure you want to delete this student? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
