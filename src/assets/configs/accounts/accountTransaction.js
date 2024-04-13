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
    }
];
