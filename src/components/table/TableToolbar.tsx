"use client";

type TableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  statuses: string[];
};

export default function TableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  statuses,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name..."
        className="h-10 rounded-lg bg-white/5 border border-white/10 px-3 outline-none focus:border-[#27AE60] w-full md:max-w-sm"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-10 rounded-lg bg-white/5 border border-white/10 px-3 outline-none focus:border-[#27AE60]"
      >
        <option value="all">All Status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}