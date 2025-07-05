import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Posts", route: "/posts" },
    { label: "New Post", route: "/createpost" },
    { label: "Dashboard", route: "/dashboard" },
    { label: "MyProfile", route: "/myprofile" },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => handleNavigate("/dashboard")}
      >
        MS BLOG
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-link ${
              location.pathname === item.route ? "active" : ""
            }`}
            onClick={() => handleNavigate(item.route)}
          >
            {item.label}
          </div>
        ))}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
