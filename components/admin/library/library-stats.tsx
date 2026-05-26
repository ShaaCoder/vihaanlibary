import LibraryStatCard from "./library-stat-card";
import { LibraryAnalytics } from "@/types/library";

type Props = {
  analytics: LibraryAnalytics;
};

export default function LibraryStats({ analytics }: Props) {
  const stats = [
    {
      title: "Total Students",
      value: analytics.totalStudents.toString(),
      color: "blue",
    },
    {
      title: "Active Students",
      value: analytics.activeStudents.toString(),
      color: "green",
    },
    {
      title: "Pending Payments",
      value: analytics.pendingPayments.toString(),
      color: "yellow",
    },
    {
      title: "Expired Memberships",
      value: analytics.expiredMemberships.toString(),
      color: "red",
    },
    {
      title: "Monthly Revenue",
      value: `₹${analytics.monthlyRevenue}`,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
      {stats.map((stat) => (
        <LibraryStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
}