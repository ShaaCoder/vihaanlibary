export default function AttendanceChart() {
  return (
    <div
      className="
        bg-white
        border
        border-blue-100
        rounded-2xl
        p-6
      "
    >
      <h2 className="text-xl font-bold mb-8">
        Attendance Trends (Last 7 Days)
      </h2>

      <div
        className="
          h-[320px]
          border
          border-dashed
          border-gray-200
          rounded-xl
          flex
          items-center
          justify-center
          text-gray-400
        "
      >
        Chart Placeholder
      </div>
    </div>
  );
}