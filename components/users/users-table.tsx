import React from "react";
import { Button, Dropdown, Popover, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { User, UserResponse } from "@/types/user";
import {
  EllipsisOutlined,
  ApartmentOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const dropdownItems: MenuProps["items"] = [
  {
    key: "assign.vendor",
    label: (
      <div className="flex items-center gap-2">
        <ApartmentOutlined />
        Assign vendors
      </div>
    ),
    onClick: () => {},
  },
  {
    key: "delete.user",
    label: (
      <div className="flex items-center gap-2">
        <UserDeleteOutlined />
        Disactivate user
      </div>
    ),
    onClick: () => {},
  },
];

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
      <div className="flex flex-wrap gap-2">
        {record.vendors.length > 0 ? (
          record.vendors.map((vendor) => (
            <Popover
              key={vendor.id}
              content={`Vendor ID: ${vendor.id}`}
              trigger="hover"
            >
              <Tag color="blue">{vendor.display_name}</Tag>
            </Popover>
          ))
        ) : (
          <Tag color="warning">No vendors</Tag>
        )}
      </div>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
        <Button type="link">
          <EllipsisOutlined />
        </Button>
      </Dropdown>
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
