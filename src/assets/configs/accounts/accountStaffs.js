export const staffAccountsColumn = [
  {
    field: "index",
    width: 70,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.index}</div>;
    },
    renderHeader: () => <span>#</span>,
  },
  {
    field: "name",
    width: 260,
    align: "left",
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img
            className="cellImg"
            src={
              params.row.node.avatarUrl === null
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                : params.row.node.avatarUrl
            }
            alt="avatar"
          /> */}
          {params.row.node.name}
        </div>
      );
    },
    renderHeader: () => <span>TÀI KHOẢN</span>,
  },
  {
    field: "email",
    width: 260,
    align: "left",
    headerAlign: "left",
    renderCell: (params) => {
      return <div>{params.row.node.email}</div>;
    },
    renderHeader: () => <span>EMAIL</span>,
  },
];
