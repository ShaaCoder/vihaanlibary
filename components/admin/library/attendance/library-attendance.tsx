"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { AttendanceRecord, LibraryStudent } from "@/types/library";

type Props = {
  attendanceRecords: AttendanceRecord[];
  libraryStudents: LibraryStudent[];
  onAddAttendance: (attendance: Omit<AttendanceRecord, "id">) => void;
};

export default function LibraryAttendance({
  attendanceRecords,
  libraryStudents,
  onAddAttendance,
}: Props) {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [checkIn, setCheckIn] = useState("09:00");
  const [checkOut, setCheckOut] = useState("17:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = libraryStudents.find((s) => s.id === studentId);
    if (student) {
      onAddAttendance({
        studentId,
        studentName: student.fullName,
        date,
        checkIn,
        checkOut,
        status: "present",
      });
      setStudentId("");
      setCheckIn("09:00");
      setCheckOut("17:00");
    }
  };

  return (
    <div className="space-y-5">
      {/* FORM */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-8">
          Record Check-In
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* STUDENT */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Student *
            </label>

            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            >
              <option value="">Select student</option>
              {libraryStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Date *
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* TIME */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Check-In Time *
            </label>

            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* CHECK-OUT */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Check-Out Time
            </label>

            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full h-14 border border-blue-100 rounded-xl px-4 outline-none focus:border-blue-500"
            />
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
          <Clock3 size={18} />
          Record Check-In
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-4xl font-bold mb-6">
          Recent Attendance
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 text-left">
                <th className="py-4 px-3">Date</th>
                <th className="py-4 px-3">Student</th>
                <th className="py-4 px-3">Check-In</th>
                <th className="py-4 px-3">Check-Out</th>
                <th className="py-4 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="border-t border-blue-100">
                  <td className="py-4 px-3">{record.date}</td>
                  <td className="py-4 px-3 font-medium">{record.studentName}</td>
                  <td className="py-4 px-3">{record.checkIn}</td>
                  <td className="py-4 px-3">{record.checkOut || "-"}</td>
                  <td className="py-4 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        record.status === "present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "late"
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