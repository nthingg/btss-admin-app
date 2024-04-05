import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Switch } from "@mui/material";

export const destinationsColumns = [
  {
    field: "id",
    headerClassName: "prodHeader",
    width: 70,
    align: "center",
    headerAlign: "center",
    // renderCell: (params) => params.rowIndex + 1,
    renderHeader: () => <span>#</span>,
  },
  {
    field: "name",
    width: 380,
    renderCell: (params) => {
      return <div>{params.row.name}</div>;
    },
    renderHeader: () => <span>ĐỊA ĐIỂM</span>,
  },
  {
    field: "province",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.province.name}</div>;
    },
    renderHeader: () => <span>TỈNH</span>,
  },
  {
    field: "comments",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.comments.length}</div>;
    },
    renderHeader: () => <span>ĐÁNH GIÁ</span>,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Switch
          checked={params.row.isVisible}
          onChange={() => {}}
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
