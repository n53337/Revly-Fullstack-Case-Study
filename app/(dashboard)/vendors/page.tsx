"use client";
import VendorsTable from "@/components/vendors/vendors-table";
import { getVendors } from "@/queries/vendor.queries";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VendorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(Number(searchParams.get("limit")) || 10);

  // Sync the query params with the url
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    router.push(`?${params.toString()}`);
  }, [page, limit]);

  const { data, isLoading, isError, isFetching } = getVendors(
    Number(page),
    Number(limit)
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Vendors</h1>
      <VendorsTable data={data} isLoading={isLoading || isFetching} />
    </div>
  );
}
