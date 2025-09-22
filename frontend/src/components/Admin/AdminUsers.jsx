import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Switch,
} from "antd";
import AdminLayout from "./AdminLayout";
import {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRolesMutation,
} from "../../api/rippotaiApi";

const { Option } = Select;

const AdminUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [assignRoles] = useAssignRolesMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Extract the users array from the API response
  const users = data?.data || []; // Safely access data.data, default to empty array if undefined

  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        roles: user.roles || [],
        isActive: user.isActive,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // Update user details
        await updateUser({ id: editingUser._id, ...values }).unwrap();
        // Assign roles separately if changed
        if (values.roles) {
          await assignRoles({
            id: editingUser._id,
            roles: values.roles,
          }).unwrap();
        }
      } else {
        // Create new user
        await createUser({ ...values }).unwrap();
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to save user:", error);
      // Optionally show user-friendly error
      // message.error("Failed to save user: " + (error.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Optionally show user-friendly error
      // message.error("Failed to delete user: " + (error.data?.message || error.message));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) =>
        roles && roles.length > 0 ? (
          roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))
        ) : (
          <Tag>No Roles</Tag>
        ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
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

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Manage Users
      </h1>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "var(--spacing-md)" }}
      >
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input disabled={!!editingUser} />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter the password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            name="roles"
            label="Roles"
            rules={[
              { required: true, message: "Please select at least one role" },
            ]}
          >
            <Select mode="multiple" placeholder="Select roles">
              <Option value="Employee">Employee</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Viewer">Viewer</Option>
              {/* Add more roles as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
            initialValue={true} // Default to active for new users
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminUsers;
