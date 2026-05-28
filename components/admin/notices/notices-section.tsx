"use client";

import { useState } from "react";
import { toast } from "sonner";
import { notices as initialNotices } from "@/lib/data/notices";
import { Notice } from "@/types/notice";

import NoticeForm from "./notice-form";
import NoticesList from "./notices-list";

export default function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNotice = (notice: Omit<Notice, "id" | "createdAt">) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setNotices([...notices, newNotice]);
    toast.success("Notice added successfully!");
  };

  const handleUpdateNotice = (id: string, noticeData: Partial<Notice>) => {
    setNotices(
      notices.map((notice) =>
        notice.id === id ? { ...notice, ...noticeData } : notice
      )
    );
    setEditingNotice(null);
    toast.success("Notice updated successfully!");
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id));
    toast.success("Notice deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search notices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-12 px-4 border border-blue-100 rounded-xl focus:outline-none focus:border-blue-500"
        />
      </div>
      <NoticeForm
        onAddNotice={handleAddNotice}
        editingNotice={editingNotice}
        onUpdateNotice={handleUpdateNotice}
      />
      <NoticesList
        notices={filteredNotices}
        onEdit={setEditingNotice}
        onDelete={handleDeleteNotice}
      />
    </div>
  );
}