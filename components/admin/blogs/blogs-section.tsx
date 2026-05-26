"use client";

import { useState } from "react";
import { toast } from "sonner";
import { blogs as initialBlogs } from "@/lib/data/blogs";
import { Blog } from "@/types/blog";

import BlogForm from "./blog-form";
import BlogsList from "./blogs-list";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBlog = (blog: Omit<Blog, "id" | "createdAt">) => {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBlogs([...blogs, newBlog]);
    toast.success("Blog added successfully!");
  };

  const handleUpdateBlog = (id: string, blogData: Partial<Blog>) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, ...blogData } : blog
      )
    );
    setEditingBlog(null);
    toast.success("Blog updated successfully!");
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    toast.success("Blog deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-12 px-4 border border-blue-100 rounded-xl focus:outline-none focus:border-blue-500"
        />
      </div>
      <BlogForm
        onAddBlog={handleAddBlog}
        editingBlog={editingBlog}
        onUpdateBlog={handleUpdateBlog}
      />
      <BlogsList
        blogs={filteredBlogs}
        onEdit={setEditingBlog}
        onDelete={handleDeleteBlog}
      />
    </div>
  );
}