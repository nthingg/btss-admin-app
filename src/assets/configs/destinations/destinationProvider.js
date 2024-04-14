import { IconButton, Switch } from "@mui/material";

export const providersColumns = [
    {
      field: "id",
      headerClassName: "prodHeader",
      width: 70,
      align: "center",
      headerAlign: "center",
      // renderCell: (params) => params.rowIndex + 1,
      renderHeader: () => <span>#</span>,
    },
    {
      field: "name",
      width: 380,
      renderCell: (params) => {
        return (
          // <div className="cellWithImg">
          //   <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
          //   {params.row.name}
          // </div>
          <div>{params.row.name}</div>
        );
      },
      renderHeader: () => <span>TÊN</span>,
    },
    {
      field: "phone",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        function formatPhoneNumberCen(phoneNumber) {
          // Replace leading "+84" with "0" (if present)
          phoneNumber = phoneNumber.replace(/^\84/, "0"); // Replace leading "+84" with "0"
  
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
  
        if (params.row.phone !== null) {
          return (
            <div>
              <span className="itemValue">
                {formatPhoneNumberCen(params.row.phone)}
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
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let check = false;
        if (params.row.account !== null) {
          check = true;
        }
        return (
          <Switch
            checked={params.row.isActive}
            onChange={() => {}}
            disabled={check}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#2c3d50",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#2c3d50",
              },
            }}
          />
        );
      },
      renderHeader: () => <span>TRẠNG THÁI</span>,
    },
  ];
  