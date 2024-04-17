import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Switch } from "@mui/material";

export const destinationsTotalColumns = [
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
    field: "rating",
    width: 210,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.comments.edges.length === 0) {
        return <div>Không có dữ liệu</div>;
      } else {
        return <div>{params.row.comments.edges.length} / 5</div>;
      }
    },
    renderHeader: () => <span>ĐÁNH GIÁ</span>,
  },
  {
    field: "topo",
    width: 210,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      switch (params.row.topographic) {
        case "BEACH":
          return "Bãi biển";
        case "BROOK":
          return "Suối";
        case "CAVE":
          return "Hang động";
        case "DUNE":
          return "Cồn cát";
        case "HILL":
          return "Đồi";
        case "JUNGLE":
          return "Rừng";
        case "LAKE":
          return "Hồ";
        case "MOUNTAIN":
          return "Núi";
        case "WATERFALL":
          return "Thác";
        default:
          return "Khác";
      }
    },
    renderHeader: () => <span>ĐỊA HÌNH</span>,
  },
];
