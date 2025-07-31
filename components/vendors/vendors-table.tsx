import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Vendor, VendorResponse } from "@/types/vendor";
import Link from "next/link";

const columns: TableColumnsType<Vendor> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Coordinates",
    dataIndex: "longitude",
    key: "longitude",
    render: (_, record) => (
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
        target="_blank"
      >{`${record.longitude}, ${record.latitude}`}</Link>
    ),
  },
  {
    title: "Chain id",
    dataIndex: "chain.id",
    key: "chain.id",
    render: (_, record) => record.chain.id,
    responsive: ["lg"],
  },
  {
    title: "Chain name",
    dataIndex: "chain.name",
    key: "chain.name",
    render: (_, record) => record.chain.name,
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
    responsive: ["lg"],
    render: (text) => (
      <span>
        {Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(text))}
      </span>
    ),
  },
];

const VendorsTable: React.FC<{
  data: VendorResponse | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => (
  <Table<Vendor>
    loading={isLoading}
    columns={columns}
    dataSource={data?.data}
    pagination={{
      pageSize: data?.limit,
      current: data?.page,
      total: data?.total,
    }}
  />
);

export default VendorsTable;
