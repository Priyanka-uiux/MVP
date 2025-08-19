// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  List,
  BarChart,
  History,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import logo from "../assets/images/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Add this line

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: <BarChart2 />, label: "Dashboard", path: "/dashboard", disabled: true },
    { icon: <List />, label: "Assessments", path: "/assessment", disabled: true },
    { icon: <BarChart />, label: "Evaluation", path: "/evaluation", disabled: false },
    { icon: <History />, label: "History", path: "/quizhistory", disabled: true },
    { icon: <MessageSquare />, label: "Support", path: "/support", disabled: true },
    { icon: <DollarSign />, label: "Subscription", path: "/subscription", disabled: true },
    { icon: <Settings />, label: "Settings", path: "/profile", disabled: true },
  ];

  return (
    <div>
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-200 border-r border-gray-800 flex flex-col transition-all duration-300 z-40
          ${isMobile ? (isOpen ? "w-64 translate-x-0" : "-translate-x-full") : isOpen ? "w-64" : "w-16"}`}
      >
        {/* Logo & Toggle */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          {isOpen && <img src={logo} alt="Logo" className="w-32 h-auto" />}
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-700 rounded-md">
            <Menu size={24} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-grow overflow-y-auto">
          <ul className="py-4 space-y-2">
            {navItems.map(({ icon, label, path, disabled }) => {
              const isActive = path === location.pathname;
              const baseStyle = "flex items-center space-x-3 px-4 py-2 text-sm rounded-md";
              const activeStyle = "bg-gray-800 text-white";
              const inactiveStyle = "bg-gray-900 text-gray-400 hover:bg-gray-700";

              return (
                <li key={label}>
                  <Link
                    to={disabled ? "#" : path}
                    onClick={(e) => disabled && e.preventDefault()}
                    className={`${baseStyle} ${
                      disabled
                        ? "cursor-not-allowed opacity-50"
                        : isActive
                        ? activeStyle
                        : inactiveStyle
                    }`}
                  >
                    {React.cloneElement(icon, { className: "w-5 h-5" })}
                    {isOpen && <span>{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => navigate("/thankyou")} // ✅ Redirects to Thank You
            className="flex items-center space-x-3 px-4 py-2 text-sm w-full hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Exit</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
