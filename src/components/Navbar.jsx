import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAdminLoggedIn, isVoterLoggedIn, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogin = (role) => {
    setShowDropdown(false);
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "voter") {
      navigate("/survey");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#6200ea",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        height: "60px",
        position: "relative",
      }}
    >
      <div style={{ flex: 1 }}></div>

      <h1
        style={{
          margin: 0,
          flex: 1,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          userSelect: "none",
        }}
      >
        Exit Poll
      </h1>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "15px",
          position: "relative",
        }}
        ref={dropdownRef}
      >
        {(isAdminLoggedIn || isVoterLoggedIn) ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid white",
              borderRadius: "4px",
              color: "white",
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: "600",
              userSelect: "none",
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid white",
              borderRadius: "4px",
              color: "white",
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: "600",
              userSelect: "none",
            }}
          >
            Login
          </button>
        )}

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 5px)",
              right: 0,
              backgroundColor: "white",
              color: "#6200ea",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "120px",
              fontWeight: "600",
            }}
          >
            <button
              onClick={() => handleLogin("admin")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleLogin("voter")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Voter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
