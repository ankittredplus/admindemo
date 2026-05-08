"use client";

import { useMemo, useState } from "react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";

export type TableRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  amount?: number;
};

type DataTableProps = {
  rows: TableRow[];
  title: string;
};

const PAGE_SIZE = 6;

export default function DataTable({ rows, title }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "email" | "status">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const statuses = useMemo(
    () => Array.from(new Set(rows.map((r) => r.status))),
    [rows]
  );

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const searchMatch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter === "all" ? true : row.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [rows, search, statusFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aValue = a[sortBy].toLowerCase();
      const bValue = b[sortBy].toLowerCase();

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortBy, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const pagedRows = useMemo(() => {
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page, pageCount]);

  function handleSort(column: "name" | "email" | "status") {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(column);
    setSortOrder("asc");
  }

  return (
    <section className="rounded-xl border border-white/10 bg-[#0B1020] p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <TableToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statuses={statuses}
      />

      <div className="overflow-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-white/70 text-sm">
              <th
                className="cursor-pointer"
                onClick={() => handleSort("name")}
                title="Sort by name"
              >
                Name
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("email")}
                title="Sort by email"
              >
                Email
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("status")}
                title="Sort by status"
              >
                Status
              </th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-white/60">
                  No records found
                </td>
              </tr>
            ) : (
              pagedRows.map((row) => (
                <tr key={row.id} className="bg-white/5">
                  <td className="py-2 px-2 rounded-l-lg">{row.name}</td>
                  <td className="py-2 px-2">{row.email}</td>
                  <td className="py-2 px-2">{row.status}</td>
                  <td className="py-2 px-2 rounded-r-lg">
                    {typeof row.amount === "number" ? `₹${row.amount}` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </section>
  );
}