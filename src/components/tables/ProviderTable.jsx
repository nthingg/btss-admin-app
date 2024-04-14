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
      />
    </div>
  );
};

export default ProviderTable;
