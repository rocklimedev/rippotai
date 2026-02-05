import React from "react";
import {
  Card,
  Avatar,
  Descriptions,
  Tag,
  Spin,
  Typography,
  Space,
  List,
  message,
  Button,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useGetProfileQuery } from "@/app/api/rippotaiApi";
import "@/components/Admin/profile.css";

const { Title, Text } = Typography;

const Profile = () => {
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  if (isLoading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  if (isError || !profile)
    return (
      <Title
        level={4}
        type="danger"
        style={{ textAlign: "center", marginTop: 50 }}
      >
        Failed to load profile information.
      </Title>
    );

  return (
    <Card
      className="profile-card"
      bordered={false}
      style={{ maxWidth: 700, margin: "0 auto" }}
    >
      <div className="profile-header">
        <Avatar
          size={96}
          style={{ backgroundColor: "#1890ff" }}
          icon={!profile.name && <UserOutlined />}
        >
          {profile.name?.charAt(0)}
        </Avatar>
        <Title level={3} style={{ marginTop: 12 }}>
          {profile.name}
        </Title>
        <Space wrap>
          {profile.roles?.map((role) => (
            <Tag color="blue" key={role}>
              <SafetyCertificateOutlined /> {role}
            </Tag>
          ))}
        </Space>
      </div>

      <Descriptions
        column={1}
        bordered
        size="middle"
        className="profile-details"
      >
        <Descriptions.Item
          label={
            <>
              <MailOutlined /> Email
            </>
          }
        >
          {profile.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> User ID
            </>
          }
        >
          {profile._id}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CheckCircleOutlined /> Status
            </>
          }
        >
          <Tag color={profile.isActive ? "green" : "red"}>
            {profile.isActive ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <ClockCircleOutlined /> Last Login
            </>
          }
        >
          {profile.lastLogin
            ? new Date(profile.lastLogin).toLocaleString()
            : "Never"}
        </Descriptions.Item>
        <Descriptions.Item label="Permissions">
          {profile.permissions?.length > 0 ? (
            <List
              dataSource={profile.permissions}
              size="small"
              renderItem={(perm) => <List.Item>✅ {perm}</List.Item>}
            />
          ) : (
            <Text type="secondary">No explicit permissions</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;
