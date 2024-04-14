export const destinationPlansColumns = [
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
    width: 80,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.id}</div>;
    },
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "name",
    width: 240,
    renderCell: (params) => {
      return <div>{params.row.name}</div>;
    },
    renderHeader: () => <span>KẾ HOẠCH</span>,
  },
  {
    field: "host",
    width: 180,
    align: "right",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.account.name}</div>;
    },
    renderHeader: () => <span>TRƯỞNG NHÓM</span>,
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
          {params.row.memberCount} / {params.row.maxMemberCount}
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
      const date = new Date(params.row.utcDepartAt);

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
      const date = new Date(params.row.endDate);

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
