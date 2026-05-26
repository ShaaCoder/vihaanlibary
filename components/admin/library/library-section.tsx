"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  libraryStudents as initialLibraryStudents,
  attendanceRecords as initialAttendanceRecords,
  paymentRecords as initialPaymentRecords,
  libraryAnalytics as initialLibraryAnalytics,
} from "@/lib/data/library";
import {
  LibraryStudent,
  AttendanceRecord,
  PaymentRecord,
  LibraryAnalytics as LibraryAnalyticsType,
} from "@/types/library";

import LibraryTabs from "./library-tabs";
import LibraryOverview from "./library-overview";

import LibraryStudents from "./students/library-students";
import LibraryAttendance from "./attendance/library-attendance";
import LibraryPayments from "./payments/library-payments";
import LibraryAnalytics from "./analytics/library-analytics";

export default function LibrarySection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [libraryStudents, setLibraryStudents] = useState<LibraryStudent[]>(initialLibraryStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>(initialPaymentRecords);

  const analytics: LibraryAnalyticsType = useMemo(() => {
    const totalStudents = libraryStudents.length;
    const activeStudents = libraryStudents.filter((s) => s.status === "active").length;
    const pendingPayments = libraryStudents.filter((s) => s.paymentStatus === "pending").length;
    const expiredMemberships = libraryStudents.filter((s) => s.status === "expired").length;
    const monthlyRevenue = paymentRecords
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      totalStudents,
      activeStudents,
      pendingPayments,
      expiredMemberships,
      monthlyRevenue,
    };
  }, [libraryStudents, paymentRecords]);

  // Library Students CRUD
  const handleAddLibraryStudent = (student: Omit<LibraryStudent, "id">) => {
    const newStudent: LibraryStudent = {
      ...student,
      id: Date.now().toString(),
    };
    setLibraryStudents([...libraryStudents, newStudent]);
    toast.success("Library student added successfully!");
  };

  const handleUpdateLibraryStudent = (id: string, studentData: Partial<LibraryStudent>) => {
    setLibraryStudents(
      libraryStudents.map((student) =>
        student.id === id ? { ...student, ...studentData } : student
      )
    );
    toast.success("Library student updated successfully!");
  };

  const handleDeleteLibraryStudent = (id: string) => {
    setLibraryStudents(libraryStudents.filter((student) => student.id !== id));
    toast.success("Library student deleted successfully!");
  };

  // Attendance CRUD
  const handleAddAttendance = (attendance: Omit<AttendanceRecord, "id">) => {
    const newAttendance: AttendanceRecord = {
      ...attendance,
      id: Date.now().toString(),
    };
    setAttendanceRecords([newAttendance, ...attendanceRecords]);
    toast.success("Attendance recorded successfully!");
  };

  // Payments CRUD
  const handleAddPayment = (payment: Omit<PaymentRecord, "id">) => {
    const newPayment: PaymentRecord = {
      ...payment,
      id: Date.now().toString(),
    };
    setPaymentRecords([newPayment, ...paymentRecords]);
    toast.success("Payment recorded successfully!");
  };

  return (
    <div className="space-y-5">
      <LibraryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && <LibraryOverview analytics={analytics} />}

      {activeTab === "students" && (
        <LibraryStudents
          libraryStudents={libraryStudents}
          onAddStudent={handleAddLibraryStudent}
          onUpdateStudent={handleUpdateLibraryStudent}
          onDeleteStudent={handleDeleteLibraryStudent}
        />
      )}

      {activeTab === "attendance" && (
        <LibraryAttendance
          attendanceRecords={attendanceRecords}
          libraryStudents={libraryStudents}
          onAddAttendance={handleAddAttendance}
        />
      )}

      {activeTab === "payments" && (
        <LibraryPayments
          paymentRecords={paymentRecords}
          libraryStudents={libraryStudents}
          onAddPayment={handleAddPayment}
        />
      )}

      {activeTab === "analytics" && (
        <LibraryAnalytics analytics={analytics} paymentRecords={paymentRecords} attendanceRecords={attendanceRecords} />
      )}
    </div>
  );
}