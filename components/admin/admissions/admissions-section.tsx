"use client";

import { useState } from "react";
import { toast } from "sonner";
import { admissions as initialAdmissions } from "@/lib/data/admissions";
import { Admission } from "@/types/admission";

import AdmissionFilters from "./admission-filters";
import AdmissionSearch from "./admission-search";
import AdmissionsTable from "./admissions-table";

export default function AdmissionsSection() {
  const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [courseFilter, setCourseFilter] = useState("All Courses");

  const filteredAdmissions = admissions.filter((admission) => {
    const matchesSearch =
      admission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All Status" || admission.status === statusFilter;

    const matchesCourse =
      courseFilter === "All Courses" || admission.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleUpdateStatus = (id: string, status: Admission["status"]) => {
    setAdmissions(
      admissions.map((admission) =>
        admission.id === id ? { ...admission, status } : admission
      )
    );
    toast.success(`Admission ${status} successfully!`);
  };

  const handleDeleteAdmission = (id: string) => {
    setAdmissions(admissions.filter((admission) => admission.id !== id));
    toast.success("Admission deleted successfully!");
  };

  return (
    <div className="space-y-5">
      {/* TOPBAR */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
      >
        <AdmissionSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AdmissionFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
        />
      </div>

      {/* TABLE */}
      <AdmissionsTable
        admissions={filteredAdmissions}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteAdmission}
      />
    </div>
  );
}