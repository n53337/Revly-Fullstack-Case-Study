import React, { useState } from "react";
import { Button, Dropdown, Popconfirm, Popover, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { User, UserResponse } from "@/types/user";
import {
  EllipsisOutlined,
  ApartmentOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { updateUserStatus } from "@/queries/user.queries";
import NewAssignementModal from "./new-assignement-modal";

const UsersTable: React.FC<{
  data: UserResponse | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const { mutate: updateUserStatusMutation } = updateUserStatus();
  const [newAssignementModalOpen, setNewAssignementModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const getDropdownItems = (record: User): MenuProps["items"] => {
    return [
      {
        key: "assign.vendor",
        label: (
          <div className="flex items-center gap-2">
            <ApartmentOutlined />
            Assign vendors
          </div>
        ),
        onClick: () => {
          setNewAssignementModalOpen(true);
          setSelectedUserId(record.id);
        },
      },
      {
        key: "delete.user",
        danger: Boolean(record.is_active),
        label: (
          <Popconfirm
            onConfirm={() => {
              updateUserStatusMutation({
                id: record.id,
                status: !record.is_active,
              });
            }}
            title={
              record.is_active
                ? "Are you sure you want to disactivate this user?"
                : "Are you sure you want to activate this user?"
            }
          >
            <div className="flex items-center gap-2">
              <UserDeleteOutlined />
              {record.is_active ? "Disactivate user" : "Activate user"}
            </div>
          </Popconfirm>
        ),
        onClick: () => {},
      },
    ];
  };

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
      render: (_, record) => {
        return (
          <Dropdown
            menu={{ items: getDropdownItems(record) }}
            trigger={["click"]}
          >
            <Button type="link">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <>
      <NewAssignementModal
        open={newAssignementModalOpen}
        onClose={() => setNewAssignementModalOpen(false)}
        userId={selectedUserId ?? 0}
      />
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
    </>
  );
};

export default UsersTable;
