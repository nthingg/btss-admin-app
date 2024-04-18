import "../../assets/scss/productTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { plansColumns } from "../../assets/configs/plans/plans";
import { accountPlansColumns } from "../../assets/configs/accounts/accountPlans";
import { destinationPlansColumns } from "../../assets/configs/destinations/destinationPlans";
import { planTotalColumns } from "../../assets/configs/plans/planTotal";

const PlanTable = ({ plans, planTotal, accountPlans, destinationPlans }) => {
  const navigate = useNavigate();

  const actionColumn = [
    {
      field: "action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let check = params.row.status;
        if (params.row.isPublished === true) {
          return (
            <IconButton
              color="info"
              onClick={() => {
                navigate(`/plans/${params.row.id}`);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          );
        }
        switch (check) {
          case "READY":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "VERIFIED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "FLAWED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "COMPLETED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          default:
            return (
              <IconButton color="info" disabled={true}>
                <VisibilityOffIcon />
              </IconButton>
            );
        }
      },
      renderHeader: () => <span>CHI TIẾT</span>,
    },
  ];
  const actionTotalColumn = [
    {
      field: "action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let check = params.row.node.status;
        if (params.row.node.isPublished === true) {
          return (
            <IconButton
              color="info"
              onClick={() => {
                navigate(`/plans/${params.row.node.id}`);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          );
        }
        switch (check) {
          case "READY":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.node.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "VERIFIED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.node.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "FLAWED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.node.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          case "COMPLETED":
            return (
              <IconButton
                color="info"
                onClick={() => {
                  navigate(`/plans/${params.row.node.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            );
          default:
            return (
              <IconButton color="info" disabled={true}>
                <VisibilityOffIcon />
              </IconButton>
            );
        }
      },
      renderHeader: () => <span>CHI TIẾT</span>,
    },
  ];
  return (
    <div>
      {plans && (
        <div className="planTable">
          <DataGrid
            rows={plans}
            columns={plansColumns.concat(actionColumn)}
            rowSelection={false}
            pagination
            autoPageSize
            // pageSizeOptions={8}
            // autoHeight={true}
            showColumnVerticalBorder={true}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#2C3E50",
                color: "white",
                fontWeight: 600,
                fontSize: 14,
              },
              "& .MuiDataGrid-columnHeader--withRightBorder": {
                borderRightWidth: "2px",
              },
              // ".MuiTablePagination-displayedRows": {
              //   display: "none",
              // },
              boxShadow: 0.4,
            }}
          />
        </div>
      )}
      {planTotal && (
        <div className="planTable">
          <DataGrid
            rows={planTotal}
            columns={planTotalColumns.concat(actionTotalColumn)}
            rowSelection={false}
            pagination
            autoPageSize
            getRowId={(row) => row.node.id}
            // pageSizeOptions={8}
            // autoHeight={true}
            showColumnVerticalBorder={true}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#2C3E50",
                color: "white",
                fontWeight: 600,
                fontSize: 14,
              },
              "& .MuiDataGrid-columnHeader--withRightBorder": {
                borderRightWidth: "2px",
              },
              // ".MuiTablePagination-displayedRows": {
              //   display: "none",
              // },
              boxShadow: 0.4,
            }}
          />
        </div>
      )}
      {accountPlans && (
        <div className="planAccountTable">
          <DataGrid
            rows={accountPlans}
            columns={accountPlansColumns}
            rowSelection={false}
            pagination
            autoPageSize={true}
            showColumnVerticalBorder={true}
            sx={{
              height: 320,
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#2C3E50",
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
      {destinationPlans && (
        <div className="planDestinationTable">
          <DataGrid
            rows={destinationPlans}
            columns={destinationPlansColumns}
            rowSelection={false}
            pagination
            autoPageSize={true}
            showColumnVerticalBorder={true}
            pageSizeOptions={[5, 10, 15]}
            sx={{
              height: 320,
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#2C3E50",
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
    </div>
  );
};

export default PlanTable;
