import { Pencil, Trash2 } from "lucide-react";
import { Blog } from "@/types/blog";

type Props = {
  blog: Blog;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BlogCard({ blog, onEdit, onDelete }: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-blue-100
      "
    >
      {/* IMAGE */}
      <div className="h-56 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-2">
          {blog.title}
        </h3>
        <p className="text-blue-500 text-sm mb-2">
          by {blog.author}
        </p>
        <p className="text-gray-500 text-sm leading-6">
          {blog.description}
        </p>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onEdit}
            className="
              h-11
              px-5
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              flex
              items-center
              gap-2
              transition
            "
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="
              h-11
              px-5
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              flex
              items-center
              gap-2
              transition
            "
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}