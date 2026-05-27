"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/types";
import CourseImageUpload from "./course-image-upload";

type Props = {
  onAddCourse: (course: Omit<Course, "id" | "created_at">) => void;
  editingCourse: Course | null;
  onUpdateCourse: (id: string, course: Partial<Course>) => void;
};

export default function CourseForm({
  onAddCourse,
  editingCourse,
  onUpdateCourse,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1498050108023-c5249f4df085");

  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title);
      setDescription(editingCourse.description);
      setImage(editingCourse.image_url || "");
    } else {
      setTitle("");
      setDescription("");
      setImage("https://images.unsplash.com/photo-1498050108023-c5249f4df085");
    }
  }, [editingCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      onUpdateCourse(editingCourse.id, { title, description, image_url: image });
    } else {
      onAddCourse({ title, description, image_url: image });
    }
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6">
      <h2 className="text-4xl font-bold text-blue-900 mb-8">
        {editingCourse ? "Edit Course" : "Add New Course"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Course Title *
          </label>

          <input
            type="text"
            placeholder="e.g., Web Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              h-14
              border
              border-blue-100
              rounded-xl
              px-4
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Description *
          </label>

          <textarea
            rows={5}
            placeholder="Course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full
              border
              border-blue-100
              rounded-xl
              p-4
              outline-none
              resize-none
              focus:border-blue-500
            "
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Course Image
          </label>
          <CourseImageUpload onImageChange={setImage} currentImage={image} />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          {editingCourse && (
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
              }}
              className="
                h-12
                px-6
                bg-gray-200
                hover:bg-gray-300
                transition
                rounded-xl
                font-medium
              "
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="
              h-12
              px-6
              bg-blue-600
              hover:bg-blue-700
              transition
              rounded-xl
              text-white
              font-medium
            "
          >
            {editingCourse ? "Update Course" : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
}