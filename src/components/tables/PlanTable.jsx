import "../../assets/scss/productTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { plansColumns } from "../../assets/configs/plans/plans";
import { accountPlansColumns } from "../../assets/configs/accounts/accountPlans";
import { destinationPlansColumns } from "../../assets/configs/destinations/destinationPlans";
import { planTotalColumns } from "../../assets/configs/plans/planTotal";
import { plansCompletedColumns } from "../../assets/configs/plans/planCompleted";

const PlanTable = ({
  plans,
  plansCompleted,
  planTotal,
  accountPlans,
  destinationPlans,
  sbs,
}) => {
  const navigate = useNavigate();

  const actionColumn = [
    {
      field: "action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let check = params.row.node.status;
        if (params.row.node.isPublished === true) {
          return (
            <NavLink
              to={`/plans/${params.row.node.id}/sbs/${sbs}`}
              style={{ textDecoration: "none" }}
            >
              <IconButton color="info">
                <VisibilityIcon />
              </IconButton>
            </NavLink>
          );
        }
        switch (check) {
          case "READY":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "VERIFIED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "FLAWED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "COMPLETED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
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
            <NavLink
              to={`/plans/${params.row.node.id}/sbs/${sbs}`}
              style={{ textDecoration: "none" }}
            >
              <IconButton color="info">
                <VisibilityIcon />
              </IconButton>
            </NavLink>
          );
        }
        switch (check) {
          case "READY":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "VERIFIED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "FLAWED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            );
          case "COMPLETED":
            return (
              <NavLink
                to={`/plans/${params.row.node.id}/sbs/${sbs}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton color="info">
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
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
            getRowId={(row) => row.node.id}
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
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      )}
      {plansCompleted &&
        <div className="planTable">
          <DataGrid
            rows={plansCompleted}
            columns={plansCompletedColumns.concat(actionColumn)}
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
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      }
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
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
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
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
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
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                  }`,
              },
              noRowsLabel: "Không có dữ liệu",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlanTable;
