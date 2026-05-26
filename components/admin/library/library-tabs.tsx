type Props = {
  activeTab: string;

  setActiveTab: (
    tab: string
  ) => void;
};

const tabs = [
  {
    label: "Overview",
    value: "overview",
  },

  {
    label: "Students",
    value: "students",
  },

  {
    label: "Attendance",
    value: "attendance",
  },

  {
    label: "Payments",
    value: "payments",
  },

  {
    label: "Analytics",
    value: "analytics",
  },
];

export default function LibraryTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        border-blue-100
        rounded-xl
        p-1
        flex
        items-center
        overflow-x-auto
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() =>
            setActiveTab(tab.value)
          }
          className={`
            flex-1
            h-12
            rounded-lg
            text-sm
            font-medium
            whitespace-nowrap
            transition

            ${
              activeTab === tab.value
                ? "bg-blue-50 text-blue-700"
                : "text-gray-500 hover:bg-gray-50"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}