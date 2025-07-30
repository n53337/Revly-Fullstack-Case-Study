"use client";
import VendorsTable from "@/components/vendors/vendors-table";

export default function VendorsPage() {
  return (<div className="p-4 flex flex-col gap-4">
        <h1>Vendors</h1>
        <VendorsTable />
      </div>)
}