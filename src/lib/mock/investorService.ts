import type { TableRow } from "@/components/table/DataTable";

const investorRows: TableRow[] = [
  { id: "i1", name: "Ravi Patel", email: "ravi@investor.com", status: "processing", amount: 500000 },
  { id: "i2", name: "Sneha Jain", email: "sneha@investor.com", status: "paid", amount: 300000 },
  { id: "i3", name: "Akash Verma", email: "akash@investor.com", status: "pending", amount: 120000 },
  { id: "i4", name: "Priya Shah", email: "priya@investor.com", status: "failed", amount: 76000 },
  { id: "i5", name: "Harsh Mehta", email: "harsh@investor.com", status: "refunded", amount: 42000 },
  { id: "i6", name: "Vikas Rao", email: "vikas@investor.com", status: "paid", amount: 88000 },
  { id: "i7", name: "Tanvi K", email: "tanvi@investor.com", status: "processing", amount: 132000 },
  { id: "i8", name: "Naman K", email: "naman@investor.com", status: "pending", amount: 94000 },
];

export async function getInvestors(): Promise<TableRow[]> {
  await new Promise((r) => setTimeout(r, 300));
  return investorRows;
}