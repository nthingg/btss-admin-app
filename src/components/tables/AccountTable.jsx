import "../../assets/scss/accounts.scss";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Switch, IconButton } from "@mui/material";
import { accountTravelersColumn } from "../../assets/configs/accounts/accountTravelers";
import { providerAccountsColumn } from "../../assets/configs/accounts/accountProvider";
import { staffAccountsColumn } from "../../assets/configs/accounts/accountStaffs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const AccountTable = ({ travelers, suppliers, staffs }) => {
  const navigate = useNavigate();
  
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
            onChange={() => { }}
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
    }
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
    }
  ]
  return (
    <div>
      {travelers && (
        <div className="accountTable">
          <DataGrid
            rows={travelers}
            columns={accountTravelersColumn.concat(actionColumn).concat(detailColumn)}
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
          />
        </div>
      )}
    </div>
  );
};

export default AccountTable;
