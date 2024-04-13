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
      const statusType = {
        "PENDING": "Chờ xác nhận",
        "ACCEPTED": "Thành công",
        "ERROR": "Thất bại"
      }
      return <div>{statusType[params.row.status]}</div>;
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
      const date = new Date(params.row.createdAt);

      const formattedDateTime = date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      return <div>{formattedDateTime}</div>;
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
      const value = params.row;
      if (value.account) {
        return <div>{params.row.account.name}</div>;
      } else if (value.provider) {
        return <div>{params.row.provider.name}</div>;
      }
    },
    renderHeader: () => <span>NGƯỜI TẠO</span>,
  },
  {
    field: "createdBy",
    headerName: "ROLE",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const value = params.row;
      if (value.account) {
        return <div>Người dùng</div>;
      } else if (value.provider) {
        return <div>Nhà cung cấp</div>;
      }
    },
    renderHeader: () => <span>VAI TRÒ</span>,
  },
];
