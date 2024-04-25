import "../../assets/scss/travelerProfile.scss";
import "../../assets/scss/loading.scss";
import "../../assets/scss/shared.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Switch,
  styled,
  Alert, Snackbar
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import {
  CHANGE_STATUS_ACCOUNT,
  LOAD_DETAIL_ACCOUNT,
  LOAD_TRANSACTIONS_TOTAL_BY_ACCOUNT,
  LOAD_TRANSACTIONS_TOTAL_INIT_BY_ACCOUNT,
} from "../../services/graphql/account";
import {
  LOAD_TRANSACTIONS_TOTAL,
  LOAD_TRANSACTIONS_TOTAL_INIT,
  LOAD_TRAVELER_TRANSACTIONS,
} from "../../services/graphql/transaction";
import PlanTable from "../../components/tables/PlanTable";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TransactionTable from "../../components/tables/TransactionTable";

const AccountProfilePage = () => {
  const { planId, accountId } = useParams();
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [errorMsg, setErrMsg] = useState(false);
  const [successMsg, setSucessMsg] = useState(false);
  const [snackBarErrorOpen, setsnackBarErrorOpen] = useState(false);
  const [snackBarSuccessOpen, setsnackBarSucessOpen] = useState(false);
  const [traveler, setTraveler] = useState(null);
  const [plans, setPlans] = useState([]);
  const [phone, setPhone] = useState("");
  const transactionType = [
    "PLAN_FUND",
    "PLAN_REFUND",
    "ORDER",
    "ORDER_REFUND",
    "TOPUP",
    "GIFT",
  ];
  // const [phoneHide, setPhoneHide] = useState("");
  // const [phoneVisibility, setPhoneVisibility] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isMale, setIsMale] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [prestigeScore, setPrestigeScore] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openErrorSnackBar = () => {
    setsnackBarErrorOpen(true);
  };

  const openSuccessSnackBar = () => {
    setsnackBarSucessOpen(true);
  };

  const handleCloseSnack = () => {
    setsnackBarErrorOpen(false);
    setsnackBarSucessOpen(false);
  };

  const containerStyle = {
    width: "950px",
    height: "400px",
  };

  const { error, loading, data, refetch } = useQuery(LOAD_DETAIL_ACCOUNT, {
    variables: {
      id: parseInt(accountId, 10),
    },
  });

  const [changeStatus, { }] = useMutation(CHANGE_STATUS_ACCOUNT);

  const [
    getTransactions,
    { error: errorTotal, loading: loadingTotal, data: dataTotal },
  ] = useLazyQuery(LOAD_TRANSACTIONS_TOTAL_BY_ACCOUNT);

  const [
    getInitTransactions,
    { error: errorTotalInit, loading: loadingTotalInit, data: dataTotalInit },
  ] = useLazyQuery(LOAD_TRANSACTIONS_TOTAL_INIT_BY_ACCOUNT);

  const fetchData = async (transactionType) => {
    // Code to be executed on page load

    const { data } = await getInitTransactions({
      variables: { type: transactionType, accId: parseInt(accountId, 10) },
    });

    let transactionsData = data.transactions.edges;

    if (data.transactions.pageInfo.hasNextPage === true) {
      let check = true;
      let currentEndCursor = data.transactions.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getTransactions({
          variables: {
            cursor: currentEndCursor,
            type: transactionType,
            accId: parseInt(accountId, 10),
          },
        });

        transactionsData = transactionsData.concat(
          dataRefetch.transactions.edges
        );

        if (dataRefetch.transactions.pageInfo.hasNextPage === true) {
          currentEndCursor = dataRefetch.transactions.pageInfo.endCursor;
        } else {
          check = false;
        }
      }
    }

    let res = transactionsData.map((node, index) => {
      const { __typename, ...rest } = node;
      return { ...rest, index: index + 1 }; // Add the index to the object
    });
    setTransactions(res);
  };

  useEffect(() => {
    fetchData(transactionType);
  }, []);

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
    if (
      !loading &&
      !error &&
      data &&
      data["accounts"] &&
      data["accounts"]["nodes"]
    ) {
      setName(data["accounts"]["nodes"][0]["name"]);
      // setPhone(formatPhoneNumber(data["accounts"]["nodes"][0]["phone"]));
      // setPhoneHide(formatPhoneNumberCen(data["accounts"]["nodes"][0]["phone"]));
      setPhone(formatPhoneNumberCen(data["accounts"]["nodes"][0]["phone"]));
      let avt = data["accounts"]["nodes"][0]["avatarPath"];
      setAvatarUrl(avt);
      setIsActive(Boolean(data["accounts"]["nodes"][0]["isActive"]));
      let gender = data["accounts"]["nodes"][0]["isMale"];
      setIsMale(gender === true ? "Nam" : "Nữ");
      let gmail = data["accounts"]["nodes"][0]["email"];
      setEmail(gmail !== null ? gmail : "Không có");
      setPrestigeScore(data["accounts"]["nodes"][0]["prestigePoint"]);

      let res = data["accounts"]["nodes"][0]["plans"].map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setPlans(res);
    }
  }, [data, loading, error]);

  const handleConfirmChangeStatus = () => {
    try {
      changeStatus({
        variables: {
          id: parseInt(accountId)
        }
      });
      setIsActive(!isActive);
      setSucessMsg("Cập nhật thành công!");
      openSuccessSnackBar();
      handleClose();
    } catch {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      openErrorSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  return (
    <div>
      {name === "" && (
        <div className="loading">
          <RestartAltIcon
            sx={{
              fontSize: 80,
              color: "#2c3d50",
            }}
          />
        </div>
      )}
      {name !== "" && (
        <div className="travelerProfile">
          <div className="shared-title">
            <div className="navigation">
              <div className="left">
                <div className="return-btn">
                  {planId ? (
                    <Link to={`/plans/${planId}`} className="navigateButton">
                      <ArrowCircleLeftIcon />
                      <p>Trở về</p>
                    </Link>
                  ) : (
                    <Link to={`/accounts`} className="navigateButton">
                      <ArrowCircleLeftIcon />
                      <p>Trở về</p>
                    </Link>
                  )}
                </div>
                <div className="return-title">
                  <div className="return-header">
                    Thông tin chi tiết phượt thủ
                  </div>

                  {planId ? (
                    <div className="return-body">
                      <p>Danh sách kế hoạch</p>
                      <ArrowForwardIosIcon />
                      <p>Chi tiết kế hoạch</p>
                      <ArrowForwardIosIcon />
                      <p>Thông tin phượt thủ</p>
                    </div>
                  ) : (
                    <div className="return-body">
                      <p>Danh sách tài khoản</p>
                      <ArrowForwardIosIcon />
                      <p>Thông tin phượt thủ</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="planDetailContainer">
            <div className="top">
              <div className="profile-header">
                <div className="profile-name">
                  <img
                    className="cellImg"
                    src={
                      avatarUrl
                        ? `https://d38ozmgi8b70tu.cloudfront.net${avatarUrl}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt="avatar"
                  />
                  <p>{name}</p>
                </div>
                <div className="profile-status">
                  {/* {isActive === false && (
                    <p className="status cancelled">Ngưng hoạt động</p>
                  )}
                  {isActive === true && (
                    <p className="status confirmed">Đang hoạt động</p>
                  )} */}
                  <a className="status active" title={isActive ? "Đang hoạt động" : "Ngưng hoạt động"}>
                    <Switch checked={isActive} color={isActive ? "success" : "error"} onClick={handleClickOpen} />
                  </a>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="confirmDialog"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Xác nhận"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Bạn có xác nhận muốn thay đổi trạng thái của tài khoản này không?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button className="btn-change-status-cancel" onClick={handleClose}
                        style={{
                          textDecoration: "none",
                          color: "rgb(44, 61, 80)",
                          backgroundColor: "white",
                          fontSize: "16px",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          border: "1px solid",
                          transition: "0.4s"
                        }}>
                        Hủy bỏ
                      </button>
                      <button className="btn-change-status-confirm" onClick={handleConfirmChangeStatus} autoFocus
                        style={{
                          textDecoration: "none",
                          color: "white",
                          backgroundColor: "#2c3d50",
                          fontSize: "16px",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          border: "none",
                          transition: "0.4s"
                        }}>
                        Đồng ý
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="center">
              <div className="item">
                <h1 className="itemTitle">Thông tin chi tiết</h1>
                <div className="details">
                  <div className="left">
                    <div className="detailItem">
                      <span className="itemKey">Số điện thoại:</span>
                      <span className="itemValue">{phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{email}</span>
                    </div>
                  </div>
                  <div className="right">
                    <div className="detailItem">
                      <span className="itemKey">Giới tính:</span>
                      <span className="itemValue">{isMale}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Điểm uy tín:</span>
                      <span className="itemValue">{prestigeScore}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="item">
                  <h1 className="itemTitle">Danh sách kế hoạch đã tạo</h1>
                  <PlanTable accountPlans={plans} />
                </div>
                <div className="item">
                  <h1 className="itemTitle">Giao dịch gần đây</h1>
                  <TransactionTable accountTransactions={transactions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarErrorOpen}
        onClose={handleCloseSnack}
        autoHideDuration={2000}
        key={vertical + horizontal + "error"}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {/* <Typography whiteSpace="pre-line">{errorMsg}</Typography> */}
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarSuccessOpen}
        onClose={handleCloseSnack}
        autoHideDuration={2000}
        key={vertical + horizontal + "success"}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccountProfilePage;
