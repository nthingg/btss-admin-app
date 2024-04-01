export const planOrdersColumn = [
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
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.id.toString().padStart(9, "0")}</div>;
    },
    renderHeader: () => <span>MÃ ĐƠN</span>,
  },
  {
    field: "createdAt",
    width: 180,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const date = new Date(params.row.createdAt);

      const formattedDateTime = date.toLocaleString("en-GB");
      const formattedDate = formattedDateTime.substring(
        0,
        formattedDateTime.indexOf(", ")
      );

      return (
        <div>
          <span>{formattedDate}</span>
        </div>
      );
    },
    renderHeader: () => <span>NGÀY ĐẶT</span>,
  },
  {
    field: "status",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      switch (params.row.currentStatus) {
        case "RESERVED":
          return <div>Đã đặt</div>;
        case "PREPARED":
          return <div>Đã chuẩn bị</div>;
        case "SERVED":
          return <div>Đã phục vụ</div>;
        case "TEMPORARY":
          return <div>Đang xử lý</div>;
        case "COMPLAINED":
          return <div>Bị phản ánh</div>;
        case "CANCELLED":
          return <div>Đã hủy</div>;
        default:
          // Handle default case or unknown status
          break;
      }
    },
    renderHeader: () => <span>TRẠNG THÁI</span>,
  },
  {
    field: "type",
    width: 140,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      switch (params.row.type) {
        case "LODGING":
          return <div>Phòng nghỉ</div>;
        case "MEAL":
          return <div>Ăn uống</div>;
        case "MOVING":
          return <div>Phương tiện</div>;
        default:
          // Handle default case or unknown status
          break;
      }
    },
    renderHeader: () => <span>LOẠI ĐƠN</span>,
  },
  {
    field: "total",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const amount = params.row.total;
      const formattedPrice = amount.toLocaleString("vi-VN") + "đ";
      return <div className="prodPrice">{formattedPrice}</div>;
    },
    renderHeader: () => <span>TỔNG</span>,
  },
];
