import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import UserForm from "./pages/UserForm";
import Assessment from "./pages/Assessment";
import Disclaimer from "./pages/Disclaimer";
import Evaluation from "./pages/Evaluation";
import DownloadReport from "./pages/DownloadReport";
import ThankYou from "./pages/ThankYou";
import Sidebar from "./components/Sidebar";

// ✅ Layout with sidebar logic
const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Show sidebar only on evaluation page
  const showSidebar = location.pathname === "/evaluation";

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-[#0a0e1a] text-white min-h-screen">
      {showSidebar && <Sidebar />}
      <div
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? (sidebarOpen ? "ml-64" : "ml-16") : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// ✅ Protect disclaimer if form not filled
const ProtectedDisclaimer = ({ children }) => {
  const formCompleted = localStorage.getItem("formCompleted") === "true";
  if (!formCompleted) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Step 1: User Form */}
          <Route path="/" element={<UserForm />} />

          {/* Step 2: Disclaimer (protected by form completion) */}
          <Route
            path="/disclaimer"
            element={
              <ProtectedDisclaimer>
                <Disclaimer />
              </ProtectedDisclaimer>
            }
          />

          {/* Step 3: Assessment */}
          <Route path="/assessment" element={<Assessment />} />

          {/* Step 4: Evaluation */}
          <Route path="/evaluation" element={<Evaluation />} />

          {/* Step 5: Download Report */}
          <Route path="/download-report" element={<DownloadReport />} />

          {/* Step 6: Thank You */}
          <Route path="/thankyou" element={<ThankYou />} />

          {/* Catch-all → redirect to form */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
