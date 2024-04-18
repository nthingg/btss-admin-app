import "../../assets/scss/transactions.scss";
import "../../assets/scss/header.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { transactionsColumns } from "../../assets/configs/transactions/transactions";
import { accounttransactionsColumns } from "../../assets/configs/accounts/accountTransaction";
import { transactionsTotalColumns } from "../../assets/configs/transactions/transactionsTotal";
import { roleTransactionsColumns } from "../../assets/configs/transactions/transactionsRoleTotal";
import { roleTransactionsTotalColumns } from "../../assets/configs/transactions/transactionsRoleFilter";

const TransactionTable = ({
  totalTransactions,
  transactions,
  accountTransactions,
  roleTransactions,
  roleTransactionsTotal,
}) => {
  const navigate = useNavigate();
  const [anchorId, setAnchorId] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const options = ["Xem", "Chỉnh sửa"];
  const ITEM_HEIGHT = 48;

  const handleDetailClick = () => {
    navigate(`/destinations/${anchorId}`);
  };

  const handleEditClick = () => {
    // Logic for "Xác nhận" option
    console.log("Xác nhận clicked");
    // Add your specific code here
  };

  const actionColumn = [
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
    <div>
      {transactions && (
        <div className="transactionsTable">
          <DataGrid
            rows={transactions}
            columns={transactionsColumns}
            rowSelection={false}
            pagination
            autoPageSize
            getRowId={(row) => row.node.id}
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
      {totalTransactions && (
        <div className="transactionsTable">
          <DataGrid
            rows={totalTransactions}
            columns={transactionsTotalColumns}
            rowSelection={false}
            pagination
            autoPageSize
            getRowId={(row) => row.node.id}
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
      {accountTransactions && (
        <div
          className="accountTransactionTable"
          style={{ width: "fit-content", height: "23.28rem" }}
        >
          <DataGrid
            rows={accountTransactions}
            columns={accounttransactionsColumns}
            getRowId={(row) => row.node.id}
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
          />
        </div>
      )}
      {roleTransactions && (
        <div
          className="roleTransactionTable"
          style={{ width: "fit-content", height: "23.28rem", margin: "auto" }}>
          <DataGrid
            rows={roleTransactions}
            columns={roleTransactionsColumns}
            getRowId={(row) => row.node.id}
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
          />
        </div>
      )}
      {roleTransactionsTotal && (
        <div
          className="roleTransactionTable"
          style={{ width: "fit-content", height: "23.28rem", margin: "auto" }}>
          <DataGrid
            rows={roleTransactionsTotal}
            columns={roleTransactionsTotalColumns}
            getRowId={(row) => row.node.id}
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
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
