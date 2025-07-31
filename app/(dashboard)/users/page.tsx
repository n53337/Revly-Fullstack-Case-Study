"use client";
import UsersTable from "@/components/users/users-table";
import { getUsers } from "@/queries/user.queries";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UsersPageContent() {
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

  const { data, isLoading, isError, isFetching } = getUsers(
    Number(page),
    Number(limit)
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Users</h1>
      <UsersTable data={data} isLoading={isLoading || isFetching} />
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense>
      <UsersPageContent />
    </Suspense>
  );
}
