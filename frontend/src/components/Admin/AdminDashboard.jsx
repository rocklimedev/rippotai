import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import AdminLayout from "./AdminLayout";
import {
  useGetQueriesQuery,
  useGetProjectsQuery,
  useGetJobsQuery,
  useGetApplicationsQuery,
} from "../../api/rippotaiApi";
import {
  MailOutlined,
  ProjectOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
const AdminDashboard = () => {
  const { data: queries } = useGetQueriesQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: jobs } = useGetJobsQuery();
  const { data: applications } = useGetApplicationsQuery();

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: "Neuropol", color: "var(--primary-color)" }}>
        Admin Dashboard
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Queries"
              value={queries?.length || 0}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Projects"
              value={projects?.length || 0}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Jobs"
              value={jobs?.length || 0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Applications"
              value={applications?.length || 0}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;
