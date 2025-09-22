import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Descriptions,
  Typography,
  Space,
  message,
} from "antd";
import AdminLayout from "./AdminLayout";
import {
  useGetApplicationsQuery,
  useDeleteApplicationMutation,
} from "../../api/rippotaiApi";

const { Text } = Typography;

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

const AdminApplications = () => {
  const { data, isLoading, isError, error } = useGetApplicationsQuery();
  const [deleteApplication] = useDeleteApplicationMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Extract the applications array from the response, default to empty array if undefined
  const applicationsData = Array.isArray(data?.applications)
    ? data.applications
    : [];

  // Handle error state
  if (isError) {
    console.error("Error fetching applications:", error);
    message.error(
      "Failed to load applications: " + (error.message || "Unknown error")
    );
    return null; // Render nothing or a fallback UI
  }

  // Function to show modal with application details
  const showModal = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  // Function to close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  // Function to handle delete with confirmation
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this application?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteApplication(id).unwrap();
          message.success("Application deleted successfully");
        } catch (error) {
          console.error("Failed to delete application:", error);
          message.error(
            "Failed to delete application: " +
              (error.data?.message || error.message)
          );
        }
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },
    { title: "Position", dataIndex: "position", key: "position" },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (resume) =>
        resume ? (
          <a href={resume} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        ) : (
          "No Resume"
        ),
    },
    { title: "Cover Letter", dataIndex: "coverLetter", key: "coverLetter" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Manage Applications
      </h1>
      <ErrorBoundary>
        <Table
          columns={columns}
          dataSource={applicationsData}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title="Application Details"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedApplication && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {selectedApplication.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedApplication.email}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {selectedApplication.position}
              </Descriptions.Item>
              <Descriptions.Item label="Resume">
                {selectedApplication.resume ? (
                  <a
                    href={selectedApplication.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  "No Resume"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Cover Letter">
                {selectedApplication.coverLetter || "No Cover Letter"}
              </Descriptions.Item>
              {selectedApplication.createdAt && (
                <Descriptions.Item label="Created At">
                  {new Date(selectedApplication.createdAt).toLocaleString()}
                </Descriptions.Item>
              )}
              {selectedApplication.updatedAt && (
                <Descriptions.Item label="Updated At">
                  {new Date(selectedApplication.updatedAt).toLocaleString()}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </ErrorBoundary>
    </AdminLayout>
  );
};

export default AdminApplications;
