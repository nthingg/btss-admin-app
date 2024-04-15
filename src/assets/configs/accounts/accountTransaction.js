export const accounttransactionsColumns = [
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
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      let idString = params.row.node.id.toString();
      const zerosNeeded = Math.max(10 - idString.length, 0);
      for (let i = 0; i < zerosNeeded; i++) {
        idString = "0" + idString;
      }

      return <div>{params.row.node.id}</div>;
    },
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "status",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const statusType = {
        PENDING: "Chờ xác nhận",
        ACCEPTED: "Thành công",
        ERROR: "Thất bại",
      };
      return <div>{statusType[params.row.node.status]}</div>;
    },
    renderHeader: () => <span>TRẠNG THÁI</span>,
  },
  {
    field: "gcoinAmount",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.gcoinAmount}</div>;
    },
    renderHeader: () => <span>SỐ TIỀN</span>,
  },
  {
    field: "gateway",
    width: 250,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.gateway}</div>;
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
      const date = new Date(params.row.node.createdAt);

      const formattedDateTime = date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return <div>{formattedDateTime}</div>;
    },
    renderHeader: () => <span>NGÀY TẠO</span>,
  },
];
