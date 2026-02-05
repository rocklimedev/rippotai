// src/components/Admin/AdminLayout.jsx
"use client";

import React from "react";
import { Layout, Menu, Avatar, Dropdown, Spin } from "antd";
import {
  DashboardOutlined,
  MailOutlined,
  ProjectOutlined,
  TeamOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/app/api/rippotaiApi";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfileQuery();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login"); // ← changed to a proper login route — adjust if needed
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/admin"),
    },
    {
      key: "queries",
      icon: <MailOutlined />,
      label: "Queries",
      onClick: () => router.push("/admin/queries"),
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      onClick: () => router.push("/admin/projects"),
    },
    {
      key: "jobs",
      icon: <TeamOutlined />,
      label: "Jobs",
      onClick: () => router.push("/admin/jobs"),
    },
    {
      key: "applications",
      icon: <FileOutlined />,
      label: "Applications",
      onClick: () => router.push("/admin/applications"),
    },
    {
      key: "users",
      icon: <SettingOutlined />,
      label: "Users",
      onClick: () => router.push("/admin/users"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="admin-sider">
        <div className="admin-logo">
          <Link href="/admin">Admin Panel</Link>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          className="admin-menu"
        />
      </Sider>

      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: "0 24px",
            background: "#1a3c34 !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64, // standard antd header height
            lineHeight: "64px",
          }}
        >
          {/* Left: Logo */}
          <div className="logo">
            <Link href="/" aria-label="Rippotai Architecture Home">
              <Image
                src={logo}
                alt="Rippotai Architecture Logo"
                width={180}
                height={60}
                priority
                className="logo-img"
                style={{ display: "block" }}
              />
            </Link>
          </div>

          {/* Right: User Dropdown or Loading */}
          {isLoading ? (
            <Spin size="default" />
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "profile",
                    label: "Profile",
                    onClick: () => router.push("/admin/profile"),
                  },
                  {
                    key: "logout",
                    label: "Logout",
                    danger: true,
                    onClick: handleLogout,
                  },
                ],
              }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#fff", // better visibility on dark green bg
                }}
              >
                <Avatar
                  size="default"
                  icon={!profile?.name && <UserOutlined />}
                  style={{ backgroundColor: "#1890ff" }}
                >
                  {profile?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <span>{profile?.name || "Admin"}</span>
              </div>
            </Dropdown>
          )}
        </Header>

        <Content
          className="admin-content"
          style={{ padding: "24px", background: "#f0f2f5" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
