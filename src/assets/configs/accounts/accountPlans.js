export const accountPlansColumns = [
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
    field: "name",
    width: 310,
    renderCell: (params) => {
      return <div>{params.row.name}</div>;
    },
    renderHeader: () => <span>KẾ HOẠCH</span>,
  },
  {
    field: "destination",
    width: 260,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.destination.name}</div>;
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
        timeZone: "UTC",
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
      const date = new Date(params.row.utcEndAt);

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
