"use client";

import { useState, useEffect } from "react";
import { Blog } from "@/types/blog";
import BlogImageUpload from "./blog-image-upload";

type Props = {
  onAddBlog: (blog: Omit<Blog, "id" | "createdAt">) => void;
  editingBlog: Blog | null;
  onUpdateBlog: (id: string, blog: Partial<Blog>) => void;
};

export default function BlogForm({
  onAddBlog,
  editingBlog,
  onUpdateBlog,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1516321318423-f06f85e504b3");
  const [author, setAuthor] = useState("Vihaan Academy");

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setDescription(editingBlog.description);
      setImage(editingBlog.image);
      setAuthor(editingBlog.author);
    } else {
      setTitle("");
      setDescription("");
      setImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3");
      setAuthor("Vihaan Academy");
    }
  }, [editingBlog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      onUpdateBlog(editingBlog.id, { title, description, image, author });
    } else {
      onAddBlog({ title, description, image, author });
    }
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6">
      <h2 className="text-4xl font-bold text-blue-900 mb-8">
        {editingBlog ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Blog Title *
          </label>

          <input
            type="text"
            placeholder="e.g., How To Learn Coding"
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
            Blog Description *
          </label>

          <textarea
            rows={5}
            placeholder="Write blog description"
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

        {/* AUTHOR */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Author
          </label>

          <input
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Blog Image
          </label>
          <BlogImageUpload onImageChange={setImage} currentImage={image} />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          {editingBlog && (
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
            {editingBlog ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}