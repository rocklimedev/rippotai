// app/team/TeamSection.jsx
"use client";

import { useState, useEffect } from "react";
import { Spin, Empty, Pagination, Select } from "antd";
import TeamMember from "./TeamMember";
import styles from "./team.module.css";

/**
 * Categories (STRICT – used for filtering)
 * --------------------------------------
 * architect
 * admin
 * accounts
 * intern
 * alumni
 * collaborator
 */

const mockTeamData = [
  {
    id: 1,
    name: "Sagar Chhabra",
    role: "Founder & Principal Architect",
    category: "architect",
    bio: "Founder and principal architect with over 18 years of professional experience. Leads design vision, project direction, and long-term practice strategy.",
    image: "/team/sagar.jpg",
  },
  {
    id: 2,
    name: "Jayant",
    role: "Architect",
    category: "architect",
    bio: "Architect involved in design development, working drawings, and on-site coordination across residential and commercial projects.",
    image:
      "https://static.cmtradingco.com/rippotai_projects/rippotai_images/jayant.jpeg",
  },
  {
    id: 3,
    name: "Saarthi",
    role: "Architect",
    category: "architect",
    bio: "Architect focusing on planning, detailing, and sustainable design strategies for housing and mixed-use projects.",
    image:
      "https://static.cmtradingco.com/rippotai_projects/rippotai_images/sarthi.jpeg",
  },
  {
    id: 4,
    name: "Bhav",
    role: "Social Media Intern",
    category: "intern",
    bio: "Handles social media content, visual storytelling, and digital engagement for studio projects and updates.",
    image:
      "https://static.cmtradingco.com/rippotai_projects/rippotai_images/bhav.jpeg",
  },
  {
    id: 5,
    name: "Megha Chhabra",
    role: "Stylist & Creative Head",
    category: "collaborator",
    bio: "Leads styling, visual language, and creative direction for interiors, photoshoots, and brand presentation.",
    image: "/team/megha.jpg",
  },
  {
    id: 6,
    name: "Priyanka",
    role: "Admin",
    category: "admin",
    bio: "Manages office administration, documentation, and day-to-day studio operations.",
    image: "/team/priyanka.jpg",
  },
  {
    id: 7,
    name: "Lakshay",
    role: "Accountant",
    category: "accounts",
    bio: "Handles accounting, billing, compliance, and financial records for the practice.",
    image: "",
  },
  {
    id: 8,
    name: "Sajjan",
    role: "Site Supervisor",
    category: "collaborator",
    bio: "Supervises site execution, coordinates with contractors, and ensures design intent is maintained on-site.",
    image: "",
  },
  {
    id: 9,
    name: "Shivani",
    role: "Architect",
    category: "alumni",
    bio: "Former team member who contributed to design development and project documentation.",
    image:
      "https://static.cmtradingco.com/rippotai_projects/rippotai_images/shivani.jpeg",
  },
  {
    id: 10,
    name: "Shivam Bhatia",
    role: "Architect",
    category: "alumni",
    bio: "Previously worked on architectural planning and detailing for studio projects.",
    image: "",
  },
  {
    id: 11,
    name: "Aniket",
    role: "Architect",
    category: "alumni",
    bio: "Contributed to concept design and working drawings during tenure with the studio.",
    image:
      "https://static.cmtradingco.com/rippotai_projects/rippotai_images/aniket.jpeg",
  },
  {
    id: 12,
    name: "Chhavi",
    role: "Architect (Collaborator)",
    category: "collaborator",
    bio: "External collaborator involved in select architectural and interior design projects.",
    image: "",
  },
];

// Pagination + filter helper
const getPaginatedAndFilteredTeam = (
  page = 1,
  limit = 12,
  category = "all",
) => {
  const filtered =
    category === "all"
      ? mockTeamData
      : mockTeamData.filter((member) => member.category === category);

  const total = filtered.length;
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    pagination: {
      current: page,
      total,
      pageSize: limit,
    },
  };
};

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 12,
  });
  const [categoryFilter, setCategoryFilter] = useState("all");

  const loadTeam = (page = 1, category = categoryFilter) => {
    setLoading(true);

    setTimeout(() => {
      const result = getPaginatedAndFilteredTeam(page, 12, category);
      setTeam(result.data);
      setPagination(result.pagination);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadTeam(1, categoryFilter);
  }, [categoryFilter]);

  return (
    <>
      {/* Controls */}
      <div className={styles.controls}>
        <Select
          value={categoryFilter}
          onChange={setCategoryFilter}
          style={{ width: 220 }}
          options={[
            { value: "all", label: "All Team" },
            { value: "architect", label: "Architects" },
            { value: "admin", label: "Admin" },
            { value: "accounts", label: "Accounts" },
            { value: "intern", label: "Interns" },
            { value: "collaborator", label: "Collaborators" },
            { value: "alumni", label: "Alumni" },
          ]}
        />

        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onChange={(page) => loadTeam(page, categoryFilter)}
          size="small"
          showSizeChanger={false}
          hideOnSinglePage={pagination.total <= pagination.pageSize}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      ) : team.length === 0 ? (
        <Empty description="No team members found." />
      ) : (
        <div className={styles.grid}>
          {team.map((member) => (
            <TeamMember key={member.id} {...member} />
          ))}
        </div>
      )}
    </>
  );
}
