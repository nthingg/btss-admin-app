import "../../assets/scss/emergencyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { emergenciesColumns } from "../../assets/configs/destinations/emergencies";

const EmergencyTable = ({ list }) => {
  return (
    <div className="emergencyTable">
      <DataGrid
        rows={list}
        columns={emergenciesColumns}
        rowSelection={false}
        pagination
        pageSizeOptions={[]}
        autoHeight={true}
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
          backgroundColor: "white",
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

export default EmergencyTable;
