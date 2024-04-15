import { Switch } from "@mui/material";

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
    width: 260,
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
    field: "endDate",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const date = new Date(params.row.node.endDate);

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
];
