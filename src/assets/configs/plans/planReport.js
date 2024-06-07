export const planReportColumns = [
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
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div>{params.row.account.id}</div>;
      },
      renderHeader: () => <span>ID</span>,
    },
    {
      field: "status",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div>{params.row.account.name}</div>
      },
      renderHeader: () => <span>TÊN</span>,
    },
    {
      field: "type",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div>{params.row.weight}</div>
      },
      renderHeader: () => <span>SỐ NGƯỜI ĐI KÈM</span>,
    },
    {
      field: "total",
      width: 270,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <div>{params.row.reportReason}</div>
      },
      renderHeader: () => <span>LÍ DO BÁO CÁO</span>,
    },
  ];
  