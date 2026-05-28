"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Student } from "@/types/student";
import { createClient } from "@/lib/supabase/client";

import StudentForm from "./student-form";
import StudentsList from "./students-list";

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mappedData = (data || []).map((item: any) => ({
        id: item.id,
        fullName: item.name,
        email: item.email,
        enrollmentNumber: item.enrollment_number,
        phone: item.phone,
        course: item.course,
        classSection: item.class,
        subjects: item.subjects || [],
        referenceNumber: item.reference_number,
        createdAt: item.created_at,
      }));

      setStudents(mappedData);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollmentNumber.includes(searchQuery);
    const matchesCourse =
      courseFilter === "All Courses" || student.course === courseFilter;
    const matchesClass =
      classFilter === "All Classes" || student.classSection === classFilter;
    return matchesSearch && matchesCourse && matchesClass;
  });

  const handleAddStudent = async (student: Omit<Student, "id" | "createdAt">) => {
    try {
      const supabase = createClient() as any;
      const subjectsArray = Array.isArray(student.subjects)
        ? student.subjects.filter(s => s && s.trim())
        : [];

      const { error } = await supabase
        .from("students")
        .insert([
          {
            name: student.fullName,
            enrollment_number: student.enrollmentNumber,
            email: student.email,
            phone: student.phone,
            course: student.course,
            class: student.classSection,
            reference_number: student.referenceNumber,
            subjects: subjectsArray.length > 0 ? subjectsArray : null,
          },
        ]);

      if (error) throw error;
      toast.success("Student added successfully!");
      await fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student");
    }
  };

  const handleUpdateStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const supabase = createClient() as any;
      const subjectsArray = studentData.subjects
        ? Array.isArray(studentData.subjects)
          ? studentData.subjects.filter(s => s && s.trim())
          : []
        : null;

      const { error } = await supabase
        .from("students")
        .update({
          name: studentData.fullName,
          enrollment_number: studentData.enrollmentNumber,
          email: studentData.email,
          phone: studentData.phone,
          course: studentData.course,
          class: studentData.classSection,
          reference_number: studentData.referenceNumber,
          subjects: subjectsArray && subjectsArray.length > 0 ? subjectsArray : null,
        })
        .eq("id", id);

      if (error) throw error;
      setEditingStudent(null);
      toast.success("Student updated successfully!");
      await fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Student deleted successfully!");
      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
    }
  };

  return (
    <div className="space-y-6">
      <StudentForm
        onAddStudent={handleAddStudent}
        editingStudent={editingStudent}
        onUpdateStudent={handleUpdateStudent}
      />
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading students...</p>
        </div>
      ) : (
        <StudentsList
          students={filteredStudents}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          onEdit={setEditingStudent}
          onDelete={handleDeleteStudent}
        />
      )}
    </div>
  );
}
