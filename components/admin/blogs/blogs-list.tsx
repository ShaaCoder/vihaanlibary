import { Blog } from "@/types/blog";
import BlogCard from "./blog-card";

type Props = {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
};

export default function BlogsList({ blogs, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onEdit={() => onEdit(blog)}
          onDelete={() => onDelete(blog.id)}
        />
      ))}
    </div>
  );
}