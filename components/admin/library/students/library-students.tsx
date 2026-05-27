"use client";

import { useState } from "react";
import { Search, CreditCard as Edit, Trash2 } from "lucide-react";
import { LibraryStudent } from "@/types/library";

type Props = {
  libraryStudents: LibraryStudent[];
  onAddStudent: (student: Omit<LibraryStudent, "id">) => void;
  onUpdateStudent: (id: string, student: Partial<LibraryStudent>) => void;
  onDeleteStudent: (id: string) => void;
};

export default function LibraryStudents({
  libraryStudents,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [membershipFilter, setMembershipFilter] = useState("All Memberships");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editingStudent, setEditingStudent] = useState<LibraryStudent | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    phone: "",
    email: "",
    membershipPlan: "Premium",
    joiningDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "active",
    paymentStatus: "paid",
  });

  const filteredStudents = libraryStudents.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery);

    const matchesPayment =
      paymentFilter === "All Payments" || student.paymentStatus === paymentFilter;

    const matchesMembership =
      membershipFilter === "All Memberships" || student.membershipPlan === membershipFilter;

    const matchesStatus =
      statusFilter === "All Status" || student.status === statusFilter;

    return matchesSearch && matchesPayment && matchesMembership && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdateStudent(editingStudent.id, formData as any);
      setEditingStudent(null);
    } else {
      onAddStudent(formData as any);
    }
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      membershipPlan: "Premium",
      joiningDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "active",
      paymentStatus: "paid",
    });
  };

  const handleEdit = (student: LibraryStudent) => {
    setEditingStudent(student);
    setFormData(student as unknown as Record<string, string>);
  };

  return (
    <div className="space-y-5">
      {/* FORM */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-8">
          {editingStudent ? "Edit Library Student" : "Add New Library Student"}
        </h2>

        <form id="form-element" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-3">Name *</label>
            <input
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-semibold mb-3">Phone *</label>
            <input
              type="text"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold mb-3">Email</label>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* MEMBERSHIP */}
          <div>
            <label className="block text-sm font-semibold mb-3">Membership Type *</label>
            <select
              value={formData.membershipPlan}
              onChange={(e) => setFormData({ ...formData, membershipPlan: e.target.value as any })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
          </div>

          {/* JOINING DATE */}
          <div>
            <label className="block text-sm font-semibold mb-3">Joining Date</label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* EXPIRY */}
          <div>
            <label className="block text-sm font-semibold mb-3">Membership Expiry</label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm font-semibold mb-3">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* PAYMENT STATUS */}
          <div>
            <label className="block text-sm font-semibold mb-3">Payment Status</label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </form>

        <div className="flex gap-4 mt-6">
          {editingStudent && (
            <button
              type="button"
              onClick={() => {
                setEditingStudent(null);
                setFormData({
                  fullName: "",
                  phone: "",
                  email: "",
                  membershipPlan: "Premium",
                  joiningDate: new Date().toISOString().split("T")[0],
                  expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                  status: "active",
                  paymentStatus: "paid",
                });
              }}
              className="h-12 px-6 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
            form="form-element"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-6">Students List</h2>

        {/* SEARCH */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 border border-blue-100 rounded-xl pl-11 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="h-12 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
          >
            <option>All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
            className="h-12 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
          >
            <option>All Memberships</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-12 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 text-left">
                <th className="py-4 px-3">Name</th>
                <th className="py-4 px-3">Phone</th>
                <th className="py-4 px-3">Membership</th>
                <th className="py-4 px-3">Joining</th>
                <th className="py-4 px-3">Expiry</th>
                <th className="py-4 px-3">Payment</th>
                <th className="py-4 px-3">Status</th>
                <th className="py-4 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t border-blue-100">
                  <td className="py-4 px-3 font-medium">{student.fullName}</td>
                  <td className="py-4 px-3">{student.phone}</td>
                  <td className="py-4 px-3">{student.membershipPlan}</td>
                  <td className="py-4 px-3">{student.joiningDate}</td>
                  <td className="py-4 px-3">{student.expiryDate}</td>
                  <td className="py-4 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        student.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : student.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : student.status === "expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student.id)}
                        className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
