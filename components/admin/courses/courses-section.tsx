"use client";

import { useState } from "react";
import { toast } from "sonner";
import { courses as initialCourses } from "@/lib/data/courses";
import { Course } from "@/types/course";

import CourseForm from "./course-form";
import CoursesList from "./courses-list";

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = (course: Omit<Course, "id" | "createdAt">) => {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCourses([...courses, newCourse]);
    toast.success("Course added successfully!");
  };

  const handleUpdateCourse = (id: string, courseData: Partial<Course>) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, ...courseData } : course
      )
    );
    setEditingCourse(null);
    toast.success("Course updated successfully!");
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.success("Course deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-12 px-4 border border-blue-100 rounded-xl focus:outline-none focus:border-blue-500"
        />
      </div>
      <CourseForm
        onAddCourse={handleAddCourse}
        editingCourse={editingCourse}
        onUpdateCourse={handleUpdateCourse}
      />
      <CoursesList
        courses={filteredCourses}
        onEdit={setEditingCourse}
        onDelete={handleDeleteCourse}
      />
    </div>
  );
}