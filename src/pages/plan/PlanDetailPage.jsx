import "../../assets/scss/plans.scss";
import "../../assets/scss/loading.scss";
import "../../assets/scss/shared.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { LOAD_DETAIL_PLAN } from "../../services/graphql/plan";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers";
import PlanOrderTable from "../../components/tables/PlanOrderTable";
import PlanReportTable from "../../components/tables/PlanReportTable";

const PlanDetailPage = () => {
  const { planId, sbsNumber } = useParams();
  const [plan, setPlan] = useState(null);
  const [orders, setOrders] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDepart, setOpenDepart] = useState(false);
  const [position, setPosition] = useState(null);
  const [positionDepart, setPositionDepart] = useState(null);
  const [departDate, setDepartDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [closeRegDate, setCloseRegDate] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState([]);
  const [eventIndex, setEventIndex] = useState(-1);
  const [activities, setActivities] = useState(null);
  const [members, setMembers] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [haveReport, setHaveReport] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(
    sbsNumber ? parseInt(sbsNumber, 10) : 0
  );

  const containerStyle = {
    width: "950px",
    height: "400px",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDepart = () => {
    setOpenDepart(true);
  };

  const handleCloseDepart = () => {
    setOpenDepart(false);
  };

  const { error, loading, data, refetch } = useQuery(LOAD_DETAIL_PLAN, {
    variables: {
      id: parseInt(planId, 10),
    },
  });

  function formatPhoneNumberCen(phoneNumber) {
    // Replace leading "+84" with "0" (if present)
    phoneNumber = phoneNumber.replace(/^\84/, "0"); // Replace leading "+84" with "0"

    let formattedParts;
    switch (phoneNumber.length) {
      case 9:
        formattedParts = [
          phoneNumber.slice(0, 3),
          "*".repeat(3),
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
          "*".repeat(5),
          phoneNumber.slice(7),
        ];
        break;
      default:
        // Handle invalid lengths (optional)
        return phoneNumber;
    }

    return formattedParts.join("");
  }

  useEffect(() => {
    if (!loading && !error && data && data["plans"] && data["plans"]["nodes"]) {
      setPlan(data["plans"]["nodes"][0]);

      const destination = {
        lat: data["plans"]["nodes"][0].destination.coordinate.coordinates[1],
        lng: data["plans"]["nodes"][0].destination.coordinate.coordinates[0],
      };
      setPosition(destination);
      const depart = {
        lat: data["plans"]["nodes"][0].departure.coordinates[1],
        lng: data["plans"]["nodes"][0].departure.coordinates[0],
      };
      setPositionDepart(depart);

      const departDate = new Date(data["plans"]["nodes"][0]["utcDepartAt"]);
      setDepartDate(
        departDate.toLocaleDateString("vi-VN", {
          timeZone: "UTC",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      const closeRegDate = new Date(data["plans"]["nodes"][0]["utcRegCloseAt"]);
      setCloseRegDate(
        closeRegDate.toLocaleDateString("vi-VN", {
          timeZone: "UTC",
        })
      );
      const endDate = new Date(data["plans"]["nodes"][0]["utcEndAt"]);
      setEndDate(
        endDate.toLocaleDateString("vi-VN", {
          timeZone: "UTC",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      const startDate = new Date(data["plans"]["nodes"][0]["startDate"]);
      setStartDate(
        startDate.toLocaleDateString("vi-VN", {
          timeZone: "UTC",
        })
      );
      const createdAt = new Date(data["plans"]["nodes"][0]["createdAt"]);
      setCreatedAt(
        createdAt.toLocaleDateString("vi-VN", {
          timeZone: "UTC",
        })
      );

      let res = data["plans"]["nodes"][0]["orders"].map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setOrders(res);

      //Schedule
      setSchedule(data["plans"]["nodes"][0]["schedule"]);

      setPhone(formatPhoneNumberCen(data["plans"]["nodes"][0].account.phone));

      const startDateFormat = new Date(startDate);
      const endDateFormat = new Date(endDate);

      const dateArray = [];
      let currentDate = startDate;

      while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().slice(0, 10)); // Extract YYYY-MM-DD format
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(dateArray);

      data["plans"]["nodes"][0]["members"].forEach((member) => {
        if (member.reportReason) {
          setHaveReport(true);
        }
      })
    }
  }, [data, loading, error]);

  const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }));

  //higlight the dates in highlightedDays arra
  const ServerDay = (props) => {
    const { dates = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth && dates.includes(day.format("YYYY-MM-DD"));

    return (
      <HighlightedDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={isSelected}
      />
    );
  };

  return (
    <div>
      {plan === null && (
        <div className="loading">
          <RestartAltIcon
            sx={{
              fontSize: 80,
              color: "#2c3d50",
            }}
          />
        </div>
      )}
      {plan !== null && (
        <div className="planDetail">
          <div className="shared-title">
            <div className="navigation">
              <div className="left">
                <div className="return-btn">
                  {parseInt(sbsNumber, 10) === 0 && (
                    <Link to={`/plans`} className="navigateButton">
                      <ArrowCircleLeftIcon />
                      <p>Trở về</p>
                    </Link>
                  )}
                  {parseInt(sbsNumber, 10) > 0 && (
                    <Link
                      to={`/plans/sbs/${selectedDiv}`}
                      className="navigateButton"
                    >
                      <ArrowCircleLeftIcon />
                      <p>Trở về</p>
                    </Link>
                  )}
                </div>
                <div className="return-title">
                  <div className="return-header">
                    Thông tin chi tiết kế hoạch
                  </div>
                  <div className="return-body">
                    <p>Danh sách kế hoạch</p>
                    <ArrowForwardIosIcon />
                    <p>Chi tiết kế hoạch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="planDetailContainer">
            <div className="top">
              <div className="detail-title">
                <p>{plan?.name}</p>
              </div>
            </div>
            <div className="center">
              <div className="item">
                <h1 className="item-title">Thông tin chi tiết</h1>
                <div className="details">
                  <div className="left">
                    <div className="detailItem">
                      <span className="itemKey">Trưởng nhóm:</span>
                      <span className="itemValue">
                        <a
                          href={`/plans/${plan?.id}/account/${plan?.account.id}`}
                        >
                          {plan?.account.name}
                        </a>
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Số điện thoại:</span>
                      <span className="itemValue">{phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Thành viên:</span>
                      <span className="itemValue">
                        {plan?.memberCount}/{plan?.maxMemberCount} người
                      </span>
                    </div>
                  </div>
                  <div className="right">
                    <div className="detailItem">
                      <span className="itemKey">Địa điểm:</span>
                      <span className="itemValue">
                        <a href={`/destinations/${plan?.destination.id}`}>
                          {plan?.destination.name}
                        </a>
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Ngày khởi hành:</span>
                      <span className="itemValue">{departDate}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Ngày kết thúc:</span>
                      <span className="itemValue">{endDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="bottom">
                  <div className="item">
                    <h1 className="item-title">Danh sách đơn hàng</h1>
                    {/* {orders.length > 0 && <PlanOrderTable orders={orders} />}
                    {(!orders || orders.length === 0) && (
                      <p style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                        <em>
                          Không có đơn hàng nào được đặt trong kế hoạch này.
                        </em>
                      </p>
                    )} */}
                    <PlanOrderTable orders={orders} />
                  </div>
                </div>
              </div>
              {haveReport && (
                <div className="bottom">
                  <div className="bottom">
                    <div className="item">
                      <h1 className="item-title">Danh sách danh sách báo cáo</h1>
                      <PlanReportTable planMembers={plan.members} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            maxWidth={false}
          >
            <DialogTitle backgroundColor={"#239b56"} color={"white"}>
              Bản đồ
            </DialogTitle>
            <DialogContent style={{ width: 1000 }}>
              <DialogContentText style={{ padding: "20px 0 10px 0" }}>
                Chi tiết địa điểm đến:
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PlanDetailPage;
