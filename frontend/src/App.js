import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./store/AuthContext";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "./App.css";
import AboutUsPage from "./components/About/AboutUsPage";
import ContactUsPage from "./components/Contact/ContactUsPage";
import ProjectsPage from "./components/Projects/ProjectsPage";
import CareersPage from "./components/Career/CareersPage";
import Home from "./components/Home/Home";
import CareersApplicationPage from "./components/Career/CareerApplicationPage";
import CTA from "./components/Home/CTA";
import ProjectDetailPage from "./components/Projects/ProjectDetailsPage";
import Error404 from "./components/Error/Error404";
import Error403 from "./components/Error/Error403";
import Error500 from "./components/Error/Error500";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminQueries from "./components/Admin/AdminQueries";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminApplications from "./components/Admin/AdminApplications";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Admin/Profile";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminUsers from "./components/Admin/AdminUsers";
// OR
import "antd/dist/reset.css"; // For v5
// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppWrapper() {
  const location = useLocation();

  // List of routes where we should hide header, footer, and CTA
  const noLayoutRoutes = ["/login", "/403", "/500", "/admin", "/admin/*"];
  const isNoLayoutPage = noLayoutRoutes.some(
    (route) =>
      location.pathname === route ||
      (route.endsWith("/*") &&
        location.pathname.startsWith(route.replace("/*", "")))
  );

  return (
    <>
      {!isNoLayoutPage && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareersApplicationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/403" element={<Error403 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/*" element={<Error404 />} />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <Profile />
            </AdminLayout>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute>
              <AdminQueries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute>
              <AdminApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isNoLayoutPage && <CTA />}
      {!isNoLayoutPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;
