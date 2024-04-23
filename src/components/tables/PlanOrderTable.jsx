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
  );
};

export default PlanOrderTable;
