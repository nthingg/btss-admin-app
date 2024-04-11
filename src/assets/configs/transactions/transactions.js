export const transactionsColumns = [
  {
    field: "index",
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
    field: "id",
    headerClassName: "prodHeader",
    width: 70,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.id}</div>;
    },
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "status",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.status}</div>;
    },
    renderHeader: () => <span>TRẠNG THÁI</span>,
  },
  {
    field: "gcoinAmount",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.gcoinAmount}</div>;
    },
    renderHeader: () => <span>SỐ TIỀN</span>,
  },
  {
    field: "gateway",
    width: 250,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.gateway}</div>;
    },
    renderHeader: () => <span>CỔNG THANH TOÁN</span>,
  },
  {
    field: "createdAt",
    headerName: "Trạng thái",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.createdAt}</div>;
    },
    renderHeader: () => <span>NGÀY TẠO</span>,
  },
  {
    field: "accountName",
    headerName: "Trạng thái",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.account.name}</div>;
    },
    renderHeader: () => <span>NGƯỜI TẠO</span>,
  },
];
