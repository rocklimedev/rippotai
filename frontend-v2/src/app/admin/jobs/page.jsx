"use client";
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import AdminLayout from "@/components/Admin/AdminLayout";
import {
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../../api/rippotaiApi";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminJobs = () => {
  const { data, isLoading, isError, error } = useGetJobsQuery();
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form] = Form.useForm();

  // Extract the jobs array from the response, default to empty array if undefined
  const jobData = Array.isArray(data?.jobs) ? data.jobs : [];

  // Handle error state
  if (isError) {
    console.error("Error fetching jobs:", error);
    return <div>Error loading jobs: {error.message || "Unknown error"}</div>;
  }

  const showModal = (job = null) => {
    setEditingJob(job);
    if (job) {
      form.setFieldsValue(job);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingJob) {
        await updateJob({ id: editingJob._id, ...values }).unwrap();
      } else {
        await createJob(values).unwrap();
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save job:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id).unwrap();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Manage Jobs
      </h1>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "var(--spacing-md)" }}
      >
        Add Job
      </Button>
      <ErrorBoundary>
        <Table
          columns={columns}
          dataSource={jobData}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </ErrorBoundary>
      <Modal
        title={editingJob ? "Edit Job" : "Add Job"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Select.Option value="Architecture">Architecture</Select.Option>
              <Select.Option value="Interiors">Interiors</Select.Option>
              <Select.Option value="Furniture">Furniture</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="details" label="Details">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminJobs;
