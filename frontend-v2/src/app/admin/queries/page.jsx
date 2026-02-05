"use client";
import React from "react";
import { Table, Button, message } from "antd";
import AdminLayout from "@/components/Admin/AdminLayout";
import {
  useGetQueriesQuery,
  useDeleteQueryMutation,
} from "../../api/rippotaiApi";

const AdminQueries = () => {
  const { data: queries, isLoading } = useGetQueriesQuery();
  const [deleteQuery, { isLoading: isDeleting }] = useDeleteQueryMutation();

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteQuery(id).unwrap();
      message.success("Query deleted successfully");
    } catch (error) {
      message.error("Failed to delete query");
      console.error("Delete error:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => handleDelete(record._id)}
          loading={isDeleting}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Manage Queries
      </h1>
      <Table
        columns={columns}
        dataSource={queries}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
};

export default AdminQueries;
