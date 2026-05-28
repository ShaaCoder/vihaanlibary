"use client";

import { ImagePlus } from "lucide-react";

type Props = {
  onImageChange: (url: string) => void;
  currentImage: string;
};

export default function CourseImageUpload({ onImageChange, currentImage }: Props) {
  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="h-48 rounded-xl overflow-hidden">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <label
        className="
          border
          border-dashed
          border-blue-200
          rounded-2xl
          h-64
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          hover:bg-blue-50/40
          transition
        "
      >
        <input
          type="text"
          placeholder="Or paste image URL..."
          value={currentImage}
          onChange={(e) => onImageChange(e.target.value)}
          className="
            w-4/5
            h-12
            px-4
            border
            border-blue-100
            rounded-xl
            mb-4
            outline-none
            focus:border-blue-500
          "
        />
        <ImagePlus size={42} className="text-blue-400 mb-4" />
        <p className="text-blue-600 font-medium">
          Paste image URL or click to upload
        </p>
        <span className="text-sm text-blue-400 mt-1">
          PNG, JPG up to 5MB
        </span>
      </label>
    </div>
  );
}