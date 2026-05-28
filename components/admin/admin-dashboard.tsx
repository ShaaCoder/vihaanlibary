"use client";

import { useState } from "react";

import DashboardHeader from "./dashboard-header";
import DashboardTabs from "./dashboard-tabs";

import CoursesSection from "./courses/courses-section";
import { BlogCMS } from "./blog/blog-cms";
import NoticesSection from "./notices/notices-section";
import StudentsSection from "./students/students-section";
import AdmissionsSection from "./admissions/admissions-section";
import ContactSection from "./contact/contact-section";
import LibrarySection from "./library/library-section";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="container mx-auto py-6 space-y-6">
        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "courses" && <CoursesSection />}
        {activeTab === "blogs" && <BlogCMS />}
        {activeTab === "notices" && <NoticesSection />}
        {activeTab === "students" && <StudentsSection />}
        {activeTab === "admissions" && <AdmissionsSection />}
        {activeTab === "contact" && <ContactSection />}
        {activeTab === "library" && <LibrarySection />}
      </div>
    </div>
  );
}