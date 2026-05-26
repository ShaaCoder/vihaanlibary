type Props = {
  title: string;
  value: string;
  color: string;
};

export default function LibraryStatCard({
  title,
  value,
  color,
}: Props) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
    },

    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-600",
    },

    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      text: "text-yellow-600",
    },

    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-600",
    },

    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-600",
    },
  };

  const theme =
    colors[color as keyof typeof colors];

  return (
    <div
      className={`
        ${theme.bg}
        ${theme.border}
        border
        rounded-2xl
        p-5
      `}
    >
      <h3 className="text-sm font-semibold text-gray-700">
        {title}
      </h3>

      <p
        className={`
          mt-5
          text-4xl
          font-bold
          ${theme.text}
        `}
      >
        {value}
      </p>
    </div>
  );
}