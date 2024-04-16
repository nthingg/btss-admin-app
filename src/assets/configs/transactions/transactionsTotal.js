export const transactionsTotalColumns = [
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

      return <div>{idString}</div>;
    },
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "accountName",
    headerName: "Trạng thái",
    width: 300,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const value = params.row.node;
      if (value.account) {
        return <div>{params.row.node.account.name}</div>;
      } else if (value.provider) {
        return <div>{params.row.node.provider.name}</div>;
      }
    },
    renderHeader: () => <span>NGƯỜI TẠO</span>,
  },
  {
    field: "createdBy",
    headerName: "ROLE",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const value = params.row.node;
      if (value.account) {
        return <div>Người dùng</div>;
      } else if (value.provider) {
        return <div>Nhà cung cấp</div>;
      }
    },
    renderHeader: () => <span>VAI TRÒ</span>,
  },
  {
    field: "type",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const type = {
        GIFT: "Tặng quà",
        ORDER: "Đặt đơn",
        ORDER_REFUND: "Hoàn đơn",
        PLAN_FUND: "Đóng quỹ",
        PLAN_REFUND: "Hoàn quỹ",
        TOPUP: "Nạp tiền",
      };
      return <div>{type[params.row.node.type]}</div>;
    },
    renderHeader: () => <span>LOẠI</span>,
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
    renderHeader: () => <span>SỐ GCOIN</span>,
  },
  {
    field: "gateway",
    width: 180,
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