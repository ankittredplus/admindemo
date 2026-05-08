"use client";

import { useEffect, useState } from "react";
import DataTable, { TableRow } from "@/components/table/DataTable";
import { getVendors } from "@/lib/mock/vendorService";

export default function VendorPage() {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendors()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/70">Loading vendors...</p>;
  }

  return (
    <main className="p-4">
      <DataTable title="Vendors" rows={rows} />
    </main>
  );
}