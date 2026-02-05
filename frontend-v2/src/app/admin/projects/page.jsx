"use client";
import React, { useState } from "react";
import { Table, Button, Space, message, Image, Select, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/Admin/AdminLayout";
import ProjectModal from "@/components/Admin/ProjectModal"; // adjust path as needed
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
} from "../../api/rippotaiApi";

const { Option } = Select;

const AdminProjects = () => {
  const [statusFilter, setStatusFilter] = useState("all"); // "all" means no filter

  const {
    data: projects = [],
    isLoading: isListLoading,
    refetch,
  } = useGetProjectsQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();
  const [updateProjectStatus, { isLoading: updatingStatus }] =
    useUpdateProjectStatusMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const openModal = (project = null) => {
    setProjectToEdit(project);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await deleteProject(id).unwrap();
      message.success("Project deleted");
      refetch();
    } catch (err) {
      message.error("Failed to delete project");
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus({ id: projectId, status: newStatus }).unwrap();
      message.success("Status updated successfully");
      refetch();
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const handleModalSuccess = () => {
    refetch();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // No fixed width → takes remaining space
      ellipsis: true, // prevents title from breaking layout
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          loading={updatingStatus}
          size="small"
          style={{ width: 130 }}
          disabled={updatingStatus}
        >
          <Option value="draft">Draft</Option>
          <Option value="prunned">Prunned</Option>
          <Option value="working">Working</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: "Main Image",
      dataIndex: "image",
      key: "image",
      width: 90,
      align: "center",
      render: (img) =>
        img ? (
          <Image
            src={img}
            alt="main"
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: 6 }}
            preview={false}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      fixed: "right", // keeps actions column pinned on the right
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button size="small" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Button
            size="small"
            danger
            loading={deleting}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "Neuropol, sans-serif",
            color: "var(--primary-color)",
            margin: 0,
          }}
        >
          Manage Projects
        </h1>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Add New Project
          </Button>

          <Card size="small" style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 500 }}>Filter by Status:</span>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 180 }}
                allowClear
                placeholder="All statuses"
              >
                <Option value="all">All</Option>
                <Option value="draft">Draft</Option>
                <Option value="prunned">Prunned</Option>
                <Option value="working">Working</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </div>
          </Card>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        rowKey="_id"
        loading={isListLoading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: "max-content" }} // only scrolls if content overflows
        // Alternative: remove scroll entirely if you prefer no horizontal scroll at all
        // scroll={undefined}
      />

      <ProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        projectToEdit={projectToEdit}
        onSuccess={handleModalSuccess}
      />
    </AdminLayout>
  );
};

export default AdminProjects;
