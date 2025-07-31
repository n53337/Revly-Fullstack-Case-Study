import React from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { User, UserResponse } from "@/types/user";
import Link from "next/link";

const columns: TableColumnsType<User> = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Display name",
    dataIndex: "display_name",
    key: "display_name",
  },
  {
    title: "Is active",
    dataIndex: "is_active",
    key: "is_active",
    render: (_, record) => (record.is_active ? "Yes" : "No"),
    responsive: ["lg"],
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
  {
    title: "List of vendors",
    dataIndex: "vendors",
    key: "vendors",
    render: (_, record) => (
      <div>
        {record.vendors.map((vendor) => (
          <Tag key={vendor.id}>{vendor.display_name}</Tag>
        ))}
      </div>
    ),
  },
];

const UsersTable: React.FC<{
  data: UserResponse | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => (
  <Table<User>
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

export default UsersTable;
