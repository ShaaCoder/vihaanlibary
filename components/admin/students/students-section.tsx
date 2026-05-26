"use client";

import { useState } from "react";
import { toast } from "sonner";
import { students as initialStudents } from "@/lib/data/students";
import { Student } from "@/types/student";

import StudentForm from "./student-form";
import StudentsList from "./students-list";

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [classFilter, setClassFilter] = useState("All Classes");

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

  const handleAddStudent = (student: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setStudents([...students, newStudent]);
    toast.success("Student added successfully!");
  };

  const handleUpdateStudent = (id: string, studentData: Partial<Student>) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, ...studentData } : student
      )
    );
    setEditingStudent(null);
    toast.success("Student updated successfully!");
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
    toast.success("Student deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <StudentForm
        onAddStudent={handleAddStudent}
        editingStudent={editingStudent}
        onUpdateStudent={handleUpdateStudent}
      />
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
    </div>
  );
}
