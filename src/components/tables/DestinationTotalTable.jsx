import "../../assets/scss/destinations.scss";
import "../../assets/scss/header.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { destinationsTotalColumns } from "../../assets/configs/destinations/destinationsTotal";
import { CHANGE_STATUS_DESTINATION } from "../../services/graphql/destination";
import { useMutation } from "@apollo/client";

const DestinationTotalTable = ({ refetch, destinations }) => {
  const navigate = useNavigate();
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [anchorId, setAnchorId] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [errorMsg, setErrMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [okMsg, setOkMsg] = useState(false);
  const [snackbarOkOpen, setSnackbarOkOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState([false]);

  const options = ["Xem", "Chỉnh sửa"];
  const ITEM_HEIGHT = 48;

  const handleDetailClick = () => {
    navigate(`/destinations/${anchorId}`);
  };

  const handleEditClick = () => {
    // Logic for "Xác nhận" option
    navigate(`/destinations/update/${anchorId}`);
    // Add your specific code here
  };

  const handleClick = () => {
    setSnackbarOpen(true);
  };
  const handleCloseSnack = () => {
    setSnackbarOpen(false);
  };

  const handleClickOk = () => {
    setSnackbarOkOpen(true);
  };
  const handleCloseSnackOk = () => {
    setSnackbarOkOpen(false);
  };

  const handleClickOpenConfirm = (id) => {
    openConfirm[id] = true;
    setOpenConfirm([...openConfirm]);
  };

  const handleCloseConfirm = (id) => {
    openConfirm[id] = false;
    setOpenConfirm([...openConfirm]);
  };

  const [change, { data, error }] = useMutation(CHANGE_STATUS_DESTINATION);

  const handleChangeStatus = async (id) => {
    try {
      const { data } = await change({
        variables: {
          id: id,
        },
      });
      setOkMsg(
        `Thay đổi thành công trạng thái của: ${data.changeDestinationStatus.name}`
      );
      handleClickOk();
      handleCloseConfirm(id);
      refetch();
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClick();
      localStorage.removeItem("errorMsg");
    }
  };

  const actionColumn = [
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="destination-status">
            <a className="status active" title={params.row.isVisible ? "Đang hoạt động" : "Tạm ẩn"}>
              <Switch
                checked={params.row.isVisible}
                color={params.row.isVisible ? "success" : "error"}
                onClick={() => {
                  handleClickOpenConfirm(params.row.id);
                }}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#2c3d50",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2c3d50",
                  },
                }}
              />
            </a>
            <Dialog
              open={openConfirm[params.row.id]}
              onClose={() => {
                handleCloseConfirm(params.row.id);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="confirmDialog"
            >
              <DialogTitle id="alert-dialog-title">
                {"Xác nhận"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bạn có xác nhận muốn đổi trạng thái hiển thị của địa điểm {params.row.name} không?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn-change-status-cancel"
                  onClose={() => {
                    handleCloseConfirm(params.row.id);
                  }}
                  style={{
                    textDecoration: "none",
                    color: "rgb(44, 61, 80)",
                    backgroundColor: "white",
                    fontSize: "16px",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "1px solid",
                    transition: "0.4s"
                  }}>
                  Hủy bỏ
                </button>
                <button className="btn-change-status-confirm"
                  onClick={() => {
                    handleChangeStatus(params.row.id);
                  }}
                  autoFocus
                  style={{
                    textDecoration: "none",
                    color: "white",
                    backgroundColor: "#2c3d50",
                    fontSize: "16px",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                    transition: "0.4s"
                  }}>
                  Đồng ý
                </button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
      renderHeader: () => <span>TRẠNG THÁI</span>,
    },
    {
      field: "action",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isSelected = anchorId === params.row.id; // Check if the current row is selected
        const handleClick = (event) => {
          setAnchorId(isSelected ? null : params.row.id); // Toggle the selected row
          setAnchor(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorId(null);
        };

        return (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={isSelected ? "long-menu" : undefined}
              aria-expanded={isSelected ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchor}
              open={isSelected}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "12ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={false}
                  onClick={() => {
                    handleClose();
                    switch (option) {
                      case "Xem":
                        handleDetailClick();
                        break;
                      case "Chỉnh sửa":
                        handleEditClick();
                        break;
                      default:
                        break;
                    }
                  }}
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      },
      renderHeader: () => <span>THAO TÁC</span>,
    },
  ];
  return (
    <div className="destinationTable">
      <DataGrid
        rows={destinations}
        columns={destinationsTotalColumns.concat(actionColumn)}
        rowSelection={false}
        pagination
        autoPageSize
        showColumnVerticalBorder={true}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2c3d50",
            color: "white",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeader--withRightBorder": {
            borderRightWidth: "2px",
          },
        }}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
              }`,
          },
          noRowsLabel: "Không có dữ liệu",
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        onClose={handleCloseSnack}
        autoHideDuration={2000}
        key={"alert"}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOkOpen}
        onClose={handleCloseSnackOk}
        autoHideDuration={2000}
        key={"success"}
      >
        <Alert
          onClose={handleCloseSnackOk}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {okMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DestinationTotalTable;
