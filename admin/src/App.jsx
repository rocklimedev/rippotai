import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Common/Sidebar";
import Header from "./components/Common/Header";
import MobileNav from "./components/Common/MobileNav";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <body class="bg-bg">
        <Sidebar />
        <div class="sidebar-overlay" id="sidebar-overlay"></div>

        <main class="main-content">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <MobileNav />
      </body>
    </Router>
  );
}

export default App;
