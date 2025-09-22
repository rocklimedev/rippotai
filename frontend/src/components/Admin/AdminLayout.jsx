import React from "react";
import { Layout, Menu, Avatar, Dropdown, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  MailOutlined,
  ProjectOutlined,
  TeamOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined, // New icon for Users
} from "@ant-design/icons";
import { useGetProfileQuery } from "../../api/rippotaiApi";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetProfileQuery();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin"),
    },
    {
      key: "queries",
      icon: <MailOutlined />,
      label: "Queries",
      onClick: () => navigate("/admin/queries"),
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      onClick: () => navigate("/admin/projects"),
    },
    {
      key: "jobs",
      icon: <TeamOutlined />,
      label: "Jobs",
      onClick: () => navigate("/admin/jobs"),
    },
    {
      key: "applications",
      icon: <FileOutlined />,
      label: "Applications",
      onClick: () => navigate("/admin/applications"),
    },
    {
      key: "users",
      icon: <SettingOutlined />, // Added Users menu item
      label: "Users",
      onClick: () => navigate("/admin/users"),
    },
  ];

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Profile",
          onClick: () => navigate("/admin/profile"),
        },
        { key: "logout", label: "Logout", danger: true, onClick: handleLogout },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="admin-sider">
        <div className="admin-logo">Admin Panel</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          className="admin-menu"
        />
      </Sider>

      <Layout>
        <Header className="admin-header">
          {isLoading ? (
            <Spin />
          ) : (
            <Dropdown overlay={dropdownMenu} placement="bottomRight" arrow>
              <div className="header-user-info">
                <Avatar
                  icon={!profile?.name && <UserOutlined />}
                  style={{ backgroundColor: "#1890ff" }}
                >
                  {profile?.name?.charAt(0)}
                </Avatar>
                <span>{profile?.name}</span>
              </div>
            </Dropdown>
          )}
        </Header>

        <Content className="admin-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
