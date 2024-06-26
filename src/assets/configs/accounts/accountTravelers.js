import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const accountTravelersColumn = [
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
    width: 230,
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
    field: "phone",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      function formatPhoneNumberCen(phoneNumber) {
        // Replace leading "+84" with "0" (if present)
        phoneNumber = phoneNumber.replace(/^84/, "0"); // Replace leading "+84" with "0"

        let formattedParts;
        switch (phoneNumber.length) {
          case 9:
            formattedParts = [
              phoneNumber.slice(0, 3),
              "*".repeat(4),
              phoneNumber.slice(6),
            ];
            break;
          case 10:
            formattedParts = [
              phoneNumber.slice(0, 3),
              "*".repeat(4),
              phoneNumber.slice(7),
            ];
            break;
          case 11:
            formattedParts = [
              phoneNumber.slice(0, 3),
              "*".repeat(4),
              phoneNumber.slice(8),
            ];
            break;
          default:
            // Handle invalid lengths (optional)
            return phoneNumber;
        }

        return formattedParts.join("");
      }

      if (params.row.node.phone !== null) {
        return (
          <div>
            <span className="itemValue">
              {formatPhoneNumberCen(params.row.node.phone)}
            </span>
          </div>
        );
      } else {
        return <div>Không có</div>;
      }
    },
    renderHeader: () => <span>SĐT</span>,
  },
  {
    field: "isMale",
    width: 120,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.isMale === true ? "Nam" : "Nữ"}</div>;
    },
    renderHeader: () => <span>GIỚI TÍNH</span>,
  },
  {
    field: "prestigePoint",
    width: 200,
    align: "right",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="prestigePoint">{params.row.node.prestigePoint}</div>
      );
    },
    renderHeader: () => <span>ĐIỂM UY TÍN</span>,
  },
  {
    field: "IsTraveler",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.node.publishedPlanCount > 0) {
        return (
          <div className="cellWithStatus AVAILABLE">{<CheckCircleIcon />}</div>
        );
      } else {
        return <div className="cellWithStatus NONE">{<CancelIcon />}</div>;
      }
    },
    renderHeader: () => <span>PHƯỢT THỦ</span>,
  },
  {
    field: "publishedPlanCount",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div>{params.row.node.publishedPlanCount}</div>;
    },
    renderHeader: () => <span>KẾ HOẠCH ĐÃ XUẤT BẢN</span>,
  },
];
