import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Image,
  Space,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "./AdminLayout";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../api/rippotaiApi";

const AdminProjects = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [additionalFileList, setAdditionalFileList] = useState([]);

  const showModal = (project = null) => {
    setEditingProject(project);
    if (project) {
      form.setFieldsValue({
        ...project,
        image: project.image
          ? [
              {
                uid: "-1",
                name: "main-image",
                status: "done",
                url: project.image,
              },
            ]
          : [],
        images: project.images
          ? project.images.map((url, index) => ({
              uid: `-${index + 2}`,
              name: `image-${index + 1}`,
              status: "done",
              url,
            }))
          : [],
      });
      setFileList(
        project.image
          ? [
              {
                uid: "-1",
                name: "main-image",
                status: "done",
                url: project.image,
              },
            ]
          : []
      );
      setAdditionalFileList(
        project.images
          ? project.images.map((url, index) => ({
              uid: `-${index + 2}`,
              name: `image-${index + 1}`,
              status: "done",
              url,
            }))
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
      setAdditionalFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("details", values.details || "");

      // Handle main image
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (editingProject && fileList.length > 0) {
        formData.append("image", editingProject.image); // Keep existing image URL if unchanged
      }

      // Handle additional images
      additionalFileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });
      // If editing, include existing image URLs that weren't deleted
      if (editingProject) {
        const existingImages = additionalFileList
          .filter((file) => !file.originFileObj) // Keep only URLs (not new files)
          .map((file) => file.url);
        formData.append("existingImages", JSON.stringify(existingImages));
      }

      if (editingProject) {
        await updateProject({ id: editingProject._id, formData }).unwrap();
      } else {
        await createProject(formData).unwrap();
      }
      setIsModalVisible(false);
      setFileList([]);
      setAdditionalFileList([]);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id).unwrap();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image
            src={image}
            alt="Project"
            width={50}
            height={50}
            style={{ objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const uploadProps = {
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false; // Prevent automatic upload
    },
    fileList,
  };

  const additionalUploadProps = {
    onRemove: (file) => {
      setAdditionalFileList((prev) =>
        prev.filter((item) => item.uid !== file.uid)
      );
    },
    beforeUpload: (file) => {
      setAdditionalFileList((prev) => [...prev, file]);
      return false; // Prevent automatic upload
    },
    fileList: additionalFileList,
  };

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Manage Projects
      </h1>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "var(--spacing-md)" }}
      >
        Add Project
      </Button>
      <Table
        columns={columns}
        dataSource={projects}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
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
              <Select.Option value="Residential">Residential</Select.Option>
              <Select.Option value="Commercial">Commercial</Select.Option>
              {/* Add more categories as needed */}
            </Select>
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
          <Form.Item name="image" label="Main Image">
            <Upload {...uploadProps} accept="image/*" listType="picture">
              <Button icon={<UploadOutlined />}>Upload Main Image</Button>
            </Upload>
            {fileList.length > 0 && fileList[0].url && (
              <Image
                src={fileList[0].url}
                alt="Main Image Preview"
                width={100}
                style={{ marginTop: 10 }}
              />
            )}
          </Form.Item>
          <Form.Item name="images" label="Additional Images">
            <Upload
              {...additionalUploadProps}
              accept="image/*"
              listType="picture"
              multiple
            >
              <Button icon={<UploadOutlined />}>
                Upload Additional Images
              </Button>
            </Upload>
            {additionalFileList.length > 0 && (
              <div style={{ marginTop: 10 }}>
                {additionalFileList.map(
                  (file) =>
                    file.url && (
                      <div
                        key={file.uid}
                        style={{ display: "inline-block", marginRight: 10 }}
                      >
                        <Image
                          src={file.url}
                          alt="Additional Image"
                          width={100}
                          style={{ marginBottom: 10 }}
                        />
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => additionalUploadProps.onRemove(file)}
                          style={{ display: "block" }}
                        >
                          Remove
                        </Button>
                      </div>
                    )
                )}
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProjects;
