import { LibraryAnalytics as LibraryAnalyticsType, PaymentRecord, AttendanceRecord } from "@/types/library";
import AttendanceChart from "../attendance-chart";
import RevenueChart from "../revenue-chart";
import MembershipChart from "../membership-chart";

type Props = {
  analytics: LibraryAnalyticsType;
  paymentRecords: PaymentRecord[];
  attendanceRecords: AttendanceRecord[];
};

export default function LibraryAnalytics({
  analytics,
  paymentRecords,
  attendanceRecords,
}: Props) {
  return (
    <div className="space-y-5">
      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* ATTENDANCE */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Daily Attendance
          </h2>
          <AttendanceChart />
        </div>

        {/* REVENUE */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Revenue
          </h2>
          <RevenueChart />
        </div>
      </div>

      {/* MEMBERSHIP CHART */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Membership Overview
        </h2>
        <MembershipChart />
      </div>

      {/* STATUS */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-8">
          Payment Status Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* PAID */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <h3 className="text-green-700 font-medium">
              Paid
            </h3>

            <p className="text-5xl font-bold text-green-700 mt-4">
              {paymentRecords.filter((p) => p.status === "paid").length}
            </p>
          </div>

          {/* PENDING */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
            <h3 className="text-yellow-700 font-medium">
              Pending
            </h3>

            <p className="text-5xl font-bold text-yellow-700 mt-4">
              {paymentRecords.filter((p) => p.status === "pending").length}
            </p>
          </div>

          {/* OVERDUE */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <h3 className="text-red-700 font-medium">
              Overdue
            </h3>

            <p className="text-5xl font-bold text-red-700 mt-4">
              {paymentRecords.filter((p) => p.status === "failed").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}