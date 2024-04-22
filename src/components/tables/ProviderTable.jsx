import "../../assets/scss/providers.scss";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { providersColumns } from "../../assets/configs/destinations/destinationProvider";

const ProviderTable = ({ providers }) => {
  return (
    <div className="provider-table">
      <DataGrid
        rows={providers}
        columns={providersColumns}
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
            borderRightStyle: "none",
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

export default ProviderTable;
