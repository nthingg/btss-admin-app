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
    renderCell: (params) => {
      return <div>{params.row.index}</div>;
    },
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
    width: 210,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.comments.edges.length === 0) {
        return <div>Không có dữ liệu</div>;
      } else {
        return <div>{params.row.comments.edges.length}</div>;
      }
    },
    renderHeader: () => <span>ĐÁNH GIÁ</span>,
  },
];
