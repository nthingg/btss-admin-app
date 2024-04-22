import { Switch } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const planTotalColumns = [
  {
    field: "index",
    width: 80,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.index}</div>;
    },
    renderHeader: () => <span>#</span>,
  },
  {
    field: "id",
    headerClassName: "prodHeader",
    width: 80,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.id}</div>;
    },
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "name",
    width: 200,
    renderCell: (params) => {
      return <div>{params.row.node.name}</div>;
    },
    renderHeader: () => <span>KẾ HOẠCH</span>,
  },
  {
    field: "status",
    width: 150,
    renderCell: (params) => {
      const statusType = {
        "COMPLETED": "Đã hoàn thành",
        "CANCELED": "Đã hủy",
        "READY": "Sắp diễn ra",
        "FLAWED": "Đã hoàn thành",
        "VERIFIED": "Đang diễn ra",
        "REGISTERING": "Chưa chốt"
      }
      return <div>{statusType[params.row.node.status]}</div>;
    },
    renderHeader: () => <span>TRẠNG THÁI</span>,
  },
  {
    field: "host",
    width: 180,
    align: "right",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.account.name}</div>;
    },
    renderHeader: () => <span>TRƯỞNG NHÓM</span>,
  },

  {
    field: "destination",
    width: 220,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.destination.name}</div>;
    },
    renderHeader: () => <span>ĐỊA ĐIỂM</span>,
  },
  {
    field: "memberCount",
    width: 160,
    align: "right",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div>
          {params.row.node.memberCount} / {params.row.node.maxMemberCount}
        </div>
      );
    },
    renderHeader: () => <span>THÀNH VIÊN</span>,
  },
  {
    field: "utcDepartAt",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const date = new Date(params.row.node.utcDepartAt);

      const formattedDateTime = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return (
        <div>
          <span>{formattedDateTime}</span>
        </div>
      );
    },
    renderHeader: () => <span>KHỞI HÀNH</span>,
  },
  {
    field: "utcEndAt",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const date = new Date(params.row.node.utcEndAt);

      const dateOnly = date.toLocaleDateString("vi-VN", {
        timeZone: "UTC",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return (
        <div>
          <span>{dateOnly}</span>
        </div>
      );
    },
    renderHeader: () => <span>KẾT THÚC</span>,
  },
  {
    field: "haveOrder",
    width: 120,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.node.orders.length > 0) {
        return (
          <div className="cellWithStatus AVAILABLE">{<CheckCircleIcon />}</div>
        );
      } else {
        return <div className="cellWithStatus NONE">{<CancelIcon />}</div>;
      }
    },
    renderHeader: () => <span>CÓ ĐƠN HÀNG</span>,
  },
];
