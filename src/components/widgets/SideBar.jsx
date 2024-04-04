import React from "react";
import "../../assets/scss/sidebar.scss";
import Dashboard from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TerminalIcon from "@mui/icons-material/Terminal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const SideBar = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/");
    navigate(0);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <div className="img-cont">
          <img
            src="https://btss-uploads.s3.ap-southeast-2.amazonaws.com/logo.png"
            className="user_image"
            alt="Profile"
          ></img>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">BTSS</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <Dashboard className="icon" />
              <span>Trang chủ</span>
            </li>
          </NavLink>
          <NavLink to="/plans" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Quản lý kế hoạch</span>
            </li>
          </NavLink>
          <NavLink to="/accounts" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>Quản lý tài khoản</span>
            </li>
          </NavLink>
          <NavLink to="/destinations" style={{ textDecoration: "none" }}>
            <li>
              <MapIcon className="icon" />
              <span>Quản lý địa điểm</span>
            </li>
          </NavLink>
          <NavLink to="/emulator" style={{ textDecoration: "none" }}>
            <li>
              <TerminalIcon className="icon" />
              <span>Giả lập</span>
            </li>
          </NavLink>
          <NavLink to="/configuration" style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Hệ thống</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom" style={{ marginTop: "auto" }}>
        <div className="user_container">
          <div className="left">
            <img
              src="https://imgs2.dab3games.com/among-us-2-online355.png"
              className="user_image"
              alt="Profile"
            ></img>
            <div className="user_info">
              <span className="name">Administrator</span>
              <span className="role">BTSS Admin</span>
            </div>
            <button
              className="user_logout"
              type="button"
              onClick={(e) => {
                localStorage.removeItem("adminToken");
                navigate("/");
                navigate(0);
              }}
            >
              <ExitToAppIcon className="logout" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
