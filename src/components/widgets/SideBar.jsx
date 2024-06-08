import React, { useEffect, useState } from "react";
import "../../assets/scss/sidebar.scss";
import Dashboard from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TerminalIcon from "@mui/icons-material/Terminal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../assets/scss/announce-table.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { REFRESH_AUTH } from "../../services/graphql/auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  LOAD_ANNOUNCEMENT,
  MARK_ALL_ANNOUNCE,
  MARK_SINGLE_ANNOUNCE,
} from "../../services/graphql/announcement";

const SideBar = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const refreshToken = localStorage.getItem("refreshToken");

  const [refresh, { data, loading, error }] = useMutation(REFRESH_AUTH);

  const [getAnnouncements, {}] = useLazyQuery(LOAD_ANNOUNCEMENT, {
    fetchPolicy: "no-cache",
  });

  const [markAll, { data: dataAll, loading: loadingAll, error: errorAll }] =
    useMutation(MARK_ALL_ANNOUNCE);

  const [
    markSingle,
    { data: dataSingle, loading: loadingSingle, error: errorSingle },
  ] = useMutation(MARK_SINGLE_ANNOUNCE);

  const markSingleRead = async (id) => {
    try {
      const { data } = await markSingle({
        variables: {
          id: id,
        },
      });
      fetchAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    try {
      const { data } = await markAll();
      fetchAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const { data } = await getAnnouncements();
      setAnnouncement(data["announcements"]["nodes"]);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAuth = async (e) => {
    try {
      const { data } = await refresh({
        variables: {
          token: refreshToken,
        },
      });

      localStorage.setItem("adminToken", data["refreshAuth"]["accessToken"]);
      localStorage.setItem("refreshToken", data["refreshAuth"]["refreshToken"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const decode = JSON.parse(atob(token.split(".")[1]));
      if (decode.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
        navigate(0);
      }
    }

    if (refreshToken) {
      refreshAuth();
      console.log("call");
      fetchAnnouncements();
    }
  }, []);

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
          <span className="logo label">BTSS</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <Dashboard className="icon" />
              <span className="label">Trang chủ</span>
            </li>
          </NavLink>
          <NavLink to="/plans" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span className="label">Quản lý kế hoạch</span>
            </li>
          </NavLink>
          <NavLink to="/accounts" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span className="label">Quản lý tài khoản</span>
            </li>
          </NavLink>
          <NavLink to="/destinations" style={{ textDecoration: "none" }}>
            <li>
              <MapIcon className="icon" />
              <span className="label">Quản lý địa điểm</span>
            </li>
          </NavLink>
          <NavLink to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptIcon className="icon" />
              <span className="label">Quản lý giao dịch</span>
            </li>
          </NavLink>
          <NavLink to="/emulator" style={{ textDecoration: "none" }}>
            <li>
              <TerminalIcon className="icon" />
              <span className="label">Giả lập</span>
            </li>
          </NavLink>
          <NavLink to="/configuration" style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span className="label">Hệ thống</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom" style={{ marginTop: "auto" }}>
        <div className="user_container">
          <div className="left">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              className="user_image"
              alt="Profile"
            ></img>
            <div className="user_info">
              <span className="name label">Administrator</span>
              <span className="role label">BTSS Admin</span>
            </div>
            <button
              className="user_logout"
              type="button"
              onClick={(e) => {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("refreshToken");
                navigate("/");
                navigate(0);
              }}
            >
              <ExitToAppIcon className="logout" />
            </button>
          </div>
        </div>
      </div>
      <Fab
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
        sx={{ color: "#2c3d50" }}
        style={{ right: 10, bottom: 10, position: "fixed", zIndex: 1600 }}
      >
        <NotificationsActiveIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: { position: "fixed", bottom: -20, right: 50, width: 500 },
        }}
      >
        <DialogTitle backgroundColor={"#2c3d50"} color={"white"}>
          <div className="mark">
            <div className="left">
              <p>Thông báo mới</p>
            </div>
            <div className="right">
              <Tooltip title="Đã đọc tất cả">
                <button
                  onClick={() => {
                    markAllRead();
                  }}
                >
                  <FactCheckIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="announce-table">
            <div className="body">
              {announcement.map((message, index) => (
                <div
                  key={index}
                  className="response-item"
                  onClick={() => {
                    markSingleRead(message.id);
                    navigate(`/plans/${message.plan.id}`);
                  }}
                >
                  <p className="response-msg">
                    {message.title}{" "}
                    {message.isRead === false && (
                      <span style={{ color: "red", fontSize: 18 }}>!</span>
                    )}
                  </p>
                  <p className="response-detail">{message.body}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideBar;
