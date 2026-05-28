"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { PaymentRecord, LibraryStudent } from "@/types/library";

type Props = {
  paymentRecords: PaymentRecord[];
  libraryStudents: LibraryStudent[];
  onAddPayment: (payment: Omit<PaymentRecord, "id">) => void;
};

export default function LibraryPayments({
  paymentRecords,
  libraryStudents,
  onAddPayment,
}: Props) {
  const [studentName, setStudentName] = useState("");
  const [amount, setAmount] = useState(500);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "card">("upi");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName) {
      onAddPayment({
        studentName,
        amount,
        paymentDate,
        paymentMethod,
        status: "paid",
      });
      setStudentName("");
      setAmount(500);
    }
  };

  return (
    <div className="space-y-5">
      {/* FORM */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-8">
          Record Payment
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* STUDENT */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Student Name *
            </label>

            <select
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option value="">Select student</option>
              {libraryStudents.map((student) => (
                <option key={student.id} value={student.fullName}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Amount (₹) *
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Payment Date
            </label>

            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* METHOD */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </div>
        </form>

        <button
          type="submit"
          className="
            mt-6
            h-12
            px-6
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
          <DollarSign size={18} />
          Record Payment
        </button>
      </div>

      {/* HISTORY */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-6">
          Payment History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 text-left">
                <th className="py-4 px-3">Date</th>
                <th className="py-4 px-3">Student</th>
                <th className="py-4 px-3">Amount</th>
                <th className="py-4 px-3">Method</th>
                <th className="py-4 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((record) => (
                <tr key={record.id} className="border-t border-blue-100">
                  <td className="py-4 px-3">{record.paymentDate}</td>
                  <td className="py-4 px-3 font-medium">{record.studentName}</td>
                  <td className="py-4 px-3 font-semibold">₹{record.amount}</td>
                  <td className="py-4 px-3 capitalize">{record.paymentMethod}</td>
                  <td className="py-4 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        record.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : record.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {record.status}
                    </span>
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