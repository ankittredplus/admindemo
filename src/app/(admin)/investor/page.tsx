"use client";

import { useEffect, useState } from "react";
import DataTable, { TableRow } from "@/components/table/DataTable";
import { getInvestors } from "@/lib/mock/investorService";

export default function InvestorPage() {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvestors()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/70">Loading investors...</p>;
  }

  return (
    <main className="p-4">
      <DataTable title="Investors" rows={rows} />
    </main>
  );
}