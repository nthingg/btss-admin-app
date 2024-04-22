import "../../assets/scss/accounts.scss";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Switch, IconButton, Snackbar, Alert } from "@mui/material";
import { accountTravelersColumn } from "../../assets/configs/accounts/accountTravelers";
import { providerAccountsColumn } from "../../assets/configs/accounts/accountProvider";
import { staffAccountsColumn } from "../../assets/configs/accounts/accountStaffs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { CHANGE_STATUS_DESTINATION } from "../../services/graphql/destination";
import { useMutation } from "@apollo/client";
import { CHANGE_STATUS_ACCOUNT } from "../../services/graphql/account";

const AccountTable = ({ refetch, travelers, suppliers, staffs }) => {
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const navigate = useNavigate();
  const [errorMsg, setErrMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [okMsg, setOkMsg] = useState(false);
  const [snackbarOkOpen, setSnackbarOkOpen] = useState(false);

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

  const [change, { data, error }] = useMutation(CHANGE_STATUS_ACCOUNT);

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
      field: "action",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row.isActive}
            onChange={() => {
              // handleChangeStatus(params.row.id);
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
        );
      },
      renderHeader: () => <span>TRẠNG THÁI</span>,
    },
  ];

  const detailColumn = [
    {
      field: "details",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <IconButton
            color="info"
            onClick={() => {
              navigate(`/accounts/${params.row.id}`);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
      renderHeader: () => <span>CHI TIẾT</span>,
    },
  ];
  return (
    <div>
      {travelers && (
        <div className="accountTable">
          <DataGrid
            rows={travelers}
            columns={accountTravelersColumn
              .concat(actionColumn)
              .concat(detailColumn)}
            rowSelection={false}
            pagination
            autoPageSize={true}
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
                  `${from} - ${to} trong ${
                    count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      )}
      {suppliers && (
        <div className="accountTable">
          <DataGrid
            rows={suppliers}
            columns={providerAccountsColumn.concat(actionColumn)}
            rowSelection={false}
            pagination
            autoPageSize={true}
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
              boxShadow: 2,
            }}
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${
                    count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      )}
      {staffs && (
        <div className="accountTable">
          <DataGrid
            rows={staffs}
            columns={staffAccountsColumn.concat(actionColumn)}
            rowSelection={false}
            pagination
            autoPageSize={true}
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
              boxShadow: 2,
            }}
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${
                    count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      )}
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

export default AccountTable;
