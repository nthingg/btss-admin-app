import "../../assets/scss/destinations.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../../assets/scss/filter.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import DestinationTable from "../../components/tables/DestinationTable";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import WaterIcon from "@mui/icons-material/Water";
import HikingIcon from "@mui/icons-material/Hiking";
import TerrainIcon from "@mui/icons-material/Terrain";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import ForestIcon from "@mui/icons-material/Forest";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RowingIcon from "@mui/icons-material/Rowing";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BikeScooter } from "@mui/icons-material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Snackbar, Alert, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import {
  LOAD_TRANSACTIONS_FILTER,
  LOAD_TRANSACTIONS_GIFT,
  LOAD_TRANSACTIONS_ORDER,
  LOAD_TRANSACTIONS_ORDER_REFUND,
  LOAD_TRANSACTIONS_PLAN_FUND,
  LOAD_TRANSACTIONS_PLAN_REFUND,
  LOAD_TRANSACTIONS_TOPUP,
  LOAD_TRANSACTIONS_TOTAL,
  LOAD_TRANSACTIONS_TOTAL_COUNT,
  LOAD_TRANSACTIONS_TOTAL_INIT,
} from "../../services/graphql/transaction";
import TransactionTable from "../../components/tables/TransactionTable";

const TransactionPage = () => {
  const topoType = [
    "PLAN_FUND",
    "PLAN_REFUND",
    "ORDER",
    "ORDER_REFUND",
    "TOPUP",
    "GIFT",
  ];
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(topoType);
  const [errorMsg, setErrMsg] = useState(false);
  const [successMsg, setSucessMsg] = useState(false);
  const [snackBarErrorOpen, setsnackBarErrorOpen] = useState(false);
  const [snackBarSuccessOpen, setsnackBarSucessOpen] = useState(false);
  const [filter, setFilter] = useState([0, 1, 2, 3, 4, 5, 6]);

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        setSelectedStatus(topoType);
        fetchData(topoType);
        break;
      case 1:
        setSelectedStatus(topoType[0]);
        fetchData([topoType[0]]);
        break;
      case 2:
        setSelectedStatus(topoType[1]);
        fetchData([topoType[1]]);
        break;
      case 3:
        setSelectedStatus(topoType[2]);
        fetchData([topoType[2]]);
        break;
      case 4:
        setSelectedStatus(topoType[3]);
        fetchData([topoType[3]]);
        break;
      case 5:
        setSelectedStatus(topoType[4]);
        fetchData([topoType[4]]);
        break;
      case 6:
        setSelectedStatus(topoType[5]);
        fetchData([topoType[5]]);
        break;
      default:
        break;
    }
  };

  const { error, loading, data, refetch } = useQuery(LOAD_TRANSACTIONS_FILTER, {
    variables: {
      type: selectedStatus,
    },
  });

  const [transactions, setTransactions] = useState([]);
  // useEffect(() => {
  //   if (!loading && !error && data && data["transactions"]["nodes"]) {
  //     let res = data.transactions.nodes.map((node, index) => {
  //       const { __typename, ...rest } = node;
  //       return { ...rest, index: index + 1 }; // Add the index to the object
  //     });
  //     setTransactions(res);
  //   }
  // }, [data, loading, error]);

  const [
    getTransactions,
    { error: errorTotal, loading: loadingTotal, data: dataTotal },
  ] = useLazyQuery(LOAD_TRANSACTIONS_TOTAL);

  const [
    getInitTransactions,
    { error: errorTotalInit, loading: loadingTotalInit, data: dataTotalInit },
  ] = useLazyQuery(LOAD_TRANSACTIONS_TOTAL_INIT);

  const fetchData = async (transactionType) => {
    // Code to be executed on page load

    const { data } = await getInitTransactions({
      variables: { type: transactionType },
    });

    let transactionsData = data.transactions.edges;

    if (data.transactions.pageInfo.hasNextPage === true) {
      let check = true;
      let currentEndCursor = data.transactions.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getTransactions({
          variables: { cursor: currentEndCursor, type: transactionType },
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
    console.log("Component mounted!");
  };

  useEffect(() => {
    fetchData(topoType);
  }, []);

  const {
    error: errGift,
    loading: loadGift,
    data: dataGift,
    refetch: refetchGift,
  } = useQuery(LOAD_TRANSACTIONS_GIFT);
  const [gift, setGift] = useState(0);
  useEffect(() => {
    if (!loadGift && !errGift && dataGift && dataGift["transactions"]) {
      setGift(dataGift["transactions"].totalCount);
    }
  }, [dataGift, loadGift, errGift]);

  const {
    error: errOrder,
    loading: loadOrder,
    data: dataOrder,
    refetch: refetchOrder,
  } = useQuery(LOAD_TRANSACTIONS_ORDER);
  const [order, setOrder] = useState(0);
  useEffect(() => {
    if (!loadOrder && !errOrder && dataOrder && dataOrder["transactions"]) {
      setOrder(dataOrder["transactions"].totalCount);
    }
  }, [dataOrder, loadOrder, errOrder]);

  const {
    error: errOrderRefund,
    loading: loadOrderRefund,
    data: dataOrderRefund,
    refetch: refetchOrderRefund,
  } = useQuery(LOAD_TRANSACTIONS_ORDER_REFUND);
  const [orderRefund, setOrderRefund] = useState(0);
  useEffect(() => {
    if (
      !loadOrderRefund &&
      !errOrderRefund &&
      dataOrderRefund &&
      dataOrderRefund["transactions"]
    ) {
      setOrderRefund(dataOrderRefund["transactions"].totalCount);
    }
  }, [dataOrderRefund, loadGift, errOrderRefund]);

  const {
    error: errTotal,
    loading: loadTotal,
    data: dataTransacTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_TRANSACTIONS_TOTAL_COUNT);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (
      !loadTotal &&
      !errTotal &&
      dataTransacTotal &&
      dataTransacTotal["transactions"]
    ) {
      setTotal(dataTransacTotal["transactions"].totalCount);
    }
  }, [dataTransacTotal, loadTotal, errTotal]);

  const {
    error: errPlanFund,
    loading: loadPlanFund,
    data: dataPlanFund,
    refetch: refetchPlanFund,
  } = useQuery(LOAD_TRANSACTIONS_PLAN_FUND);
  const [planFund, setPlanFund] = useState(0);
  useEffect(() => {
    if (
      !loadPlanFund &&
      !errPlanFund &&
      dataPlanFund &&
      dataPlanFund["transactions"]
    ) {
      setPlanFund(dataPlanFund["transactions"].totalCount);
    }
  }, [dataPlanFund, loadPlanFund, errPlanFund]);

  const {
    error: errPlanRefund,
    loading: loadPlanRefund,
    data: dataPlanRefund,
    refetch: refetchPlanRefund,
  } = useQuery(LOAD_TRANSACTIONS_PLAN_REFUND);
  const [planRefund, setPlanRefund] = useState(0);
  useEffect(() => {
    if (
      !loadPlanRefund &&
      !errPlanRefund &&
      dataPlanRefund &&
      dataPlanRefund["transactions"]
    ) {
      setPlanRefund(dataPlanRefund["transactions"].totalCount);
    }
  }, [dataPlanRefund, loadPlanRefund, errPlanRefund]);

  const {
    error: errTopup,
    loading: loadTopup,
    data: dataTopup,
    refetch: refetchTopup,
  } = useQuery(LOAD_TRANSACTIONS_TOPUP);
  const [topup, setTopup] = useState(0);
  useEffect(() => {
    if (!loadTopup && !errTopup && dataTopup && dataTopup["transactions"]) {
      setTopup(dataTopup["transactions"].totalCount);
    }
  }, [dataTopup, loadTopup, errTopup]);

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerPadding: "60px",
  };

  return (
    <div className="destination-page">
      <div className="shared-title">
        <div>
          <p className="title">Giao dịch</p>
          <p className="sub-title">Danh sách giao dịch</p>
        </div>
      </div>
      <div className="header">
        <div className="left">
          <input
            type="text"
            className={"form-control"}
            id="floatingValue"
            name="value"
            placeholder="Nhập mã giao dịch..."
          />
          <button className="link">
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          <button className="link">
            <FilterAltIcon />
          </button>
          <button
            className="link"
            onClick={() => {
              refetch();
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="destinationContainer">
        <div className="icon-row">
          <Slider {...settings}>
            {filter.map((index) => (
              <div
                key={index}
                className={`icon-item ${
                  selectedDiv === index ? "selected" : ""
                }`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {/* Replace with appropriate icons */}
                {index === 0 && (
                  <FormatListBulletedIcon sx={{ color: "#3498DB" }} />
                )}
                {index === 1 && <BeachAccessIcon sx={{ color: "#3498DB" }} />}
                {index === 2 && <WaterIcon sx={{ color: "#3498DB" }} />}
                {index === 3 && <HikingIcon sx={{ color: "#3498DB" }} />}
                {index === 4 && (
                  <DirectionsBikeIcon sx={{ color: "#3498DB" }} />
                )}
                {index === 5 && <GolfCourseIcon sx={{ color: "#3498DB" }} />}
                {index === 6 && <ForestIcon sx={{ color: "#3498DB" }} />}
                <span>
                  {index === 0 && `Tất cả (${total})`}
                  {index === 1 && `Đóng quỹ (${planFund})`}
                  {index === 2 && `Hoàn quỹ (${planRefund})`}
                  {index === 3 && `Đặt đơn (${order})`}
                  {index === 4 && `Hoàn đơn (${orderRefund})`}
                  {index === 5 && `Nạp tiền (${topup})`}
                  {index === 6 && `Tặng quà (${gift})`}
                </span>
              </div>
            ))}
          </Slider>
        </div>

        {selectedDiv === 0 && (
          <TransactionTable totalTransactions={transactions} />
        )}
        {selectedDiv !== 0 && <TransactionTable transactions={transactions} />}
      </div>
    </div>
  );
};

export default TransactionPage;
