import LibraryStats from "./library-stats";
import { LibraryAnalytics } from "@/types/library";

type Props = {
  analytics: LibraryAnalytics;
};

export default function LibraryOverview({ analytics }: Props) {
  return (
    <div className="space-y-5">
      <LibraryStats analytics={analytics} />
    </div>
  );
}