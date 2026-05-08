import type { TableRow } from "@/components/table/DataTable";

const vendorRows: TableRow[] = [
  { id: "v1", name: "Nimesh Solanki", email: "nimesh@vendor.com", status: "active", amount: 120000 },
  { id: "v2", name: "Himalya Bhanderi", email: "himalya@vendor.com", status: "pending", amount: 82000 },
  { id: "v3", name: "Meet Shah", email: "meet@vendor.com", status: "active", amount: 45000 },
  { id: "v4", name: "Dubey Aman", email: "aman@vendor.com", status: "inactive", amount: 22000 },
  { id: "v5", name: "Maniram Creations", email: "maniram@vendor.com", status: "active", amount: 96000 },
  { id: "v6", name: "Dangote Cement", email: "dangote@vendor.com", status: "pending", amount: 138000 },
  { id: "v7", name: "Solanki Traders", email: "solanki@vendor.com", status: "active", amount: 70000 },
  { id: "v8", name: "Bharderi Group", email: "bg@vendor.com", status: "inactive", amount: 34000 },
];

export async function getVendors(): Promise<TableRow[]> {
  await new Promise((r) => setTimeout(r, 300));
  return vendorRows;
}