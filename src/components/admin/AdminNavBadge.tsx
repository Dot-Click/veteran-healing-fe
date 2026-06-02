interface AdminNavBadgeProps {
  count: number;
}

export default function AdminNavBadge({ count }: AdminNavBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold bg-red-500 text-white rounded-full">
      {count > 9 ? "9+" : count}
    </span>
  );
}
