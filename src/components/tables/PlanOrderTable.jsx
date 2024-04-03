import "../../assets/scss/plans.scss";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { planOrdersColumn } from "../../assets/configs/plans/planOrders";

const PlanOrderTable = ({ orders }) => {
  return (
    <div className="planOrderTable">
      <DataGrid
        rows={orders}
        columns={planOrdersColumn}
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
          ".MuiTablePagination-displayedRows": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default PlanOrderTable;
