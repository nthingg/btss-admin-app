import "../../assets/scss/home.scss";
import "../../assets/scss/shared.scss";

import ForwardIcon from "@mui/icons-material/Forward";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import {
  LOAD_NUMBERS_CANCELED,
  LOAD_NUMBERS_COMPLETED,
  LOAD_NUMBERS_FLAWED,
  LOAD_NUMBERS_PENDING,
  LOAD_NUMBERS_READY,
  LOAD_NUMBERS_REGISTERING,
  LOAD_NUMBERS_VERIFIED,
} from "../../services/graphql/plan";
import { LOAD_DESTINATIONS } from "../../services/graphql/destination";
import { LOAD_ACCOUNTS_TRAVELER } from "../../services/graphql/account";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    error: errorTravelers,
    loading: loadingTravelers,
    data: dataTravelers,
    refetch: refetchTravelers,
  } = useQuery(LOAD_ACCOUNTS_TRAVELER);
  const [travelers, setTravelers] = useState(0);
  useEffect(() => {
    if (
      !loadingTravelers &&
      !errorTravelers &&
      dataTravelers &&
      dataTravelers["accounts"]["nodes"]
    ) {
      let res = dataTravelers.accounts.nodes.map(
        ({ __typename, ...rest }) => rest
      );
      setTravelers(res.length);
    }
  }, [dataTravelers, loadingTravelers, errorTravelers]);

  const {
    error: errDestinations,
    loading: loadingDestinations,
    data: dataDestinations,
    refetch: refetchDestination,
  } = useQuery(LOAD_DESTINATIONS);
  const [destinations, setDestination] = useState(0);
  useEffect(() => {
    if (
      !loadingDestinations &&
      !errDestinations &&
      dataDestinations &&
      dataDestinations["destinations"]["nodes"]
    ) {
      let res = dataDestinations.destinations.nodes.map(
        ({ __typename, ...rest }) => rest
      );
      setDestination(res.length);
    }
  }, [dataDestinations, loadingDestinations, errDestinations]);

  const { error, loading, data, refetch } = useQuery(LOAD_NUMBERS_REGISTERING);
  const [registering, setRegistering] = useState(0);
  useEffect(() => {
    if (!loading && !error && data && data["plans"]) {
      // let res = data.plans.nodes.map(({ __typename, ...rest }) => rest);
      setRegistering(data["plans"].totalCount);
    }
  }, [data, loading, error]);

  const {
    errorCancelled,
    loadingCancelled,
    data: dataCancelled,
    refetch: refetchCancelled,
  } = useQuery(LOAD_NUMBERS_CANCELED);
  const [cancelled, setCancelled] = useState(0);
  useEffect(() => {
    if (
      !loadingCancelled &&
      !errorCancelled &&
      dataCancelled &&
      dataCancelled["plans"]
    ) {
      setCancelled(dataCancelled["plans"].totalCount);
    }
  }, [dataCancelled, loadingCancelled, errorCancelled]);

  const {
    error: errComplete,
    loading: loadingComplete,
    data: dataComplete,
    refetch: refetchComplete,
  } = useQuery(LOAD_NUMBERS_COMPLETED);
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    if (
      !loadingComplete &&
      !errComplete &&
      dataComplete &&
      dataComplete["plans"]
    ) {
      setCompleted(dataComplete["plans"].totalCount);
    }
  }, [dataComplete, loadingComplete, errComplete]);

  const {
    error: errVeri,
    loading: loadingVeri,
    data: dataVeri,
    refetch: refetchVeri,
  } = useQuery(LOAD_NUMBERS_VERIFIED);
  const [veri, setVeri] = useState(0);
  useEffect(() => {
    if (!loadingVeri && !errVeri && dataVeri && dataVeri["plans"]) {
      setVeri(dataVeri["plans"].totalCount);
    }
  }, [dataVeri, loadingVeri, errVeri]);

  const {
    error: errPend,
    loading: loadingPend,
    data: dataPend,
    refetch: refetchPending,
  } = useQuery(LOAD_NUMBERS_PENDING);
  const [pending, setPending] = useState(0);
  useEffect(() => {
    if (!loadingPend && !errPend && dataPend && dataPend["plans"]) {
      setPending(dataPend["plans"].totalCount);
    }
  }, [dataPend, loadingPend, errPend]);

  const {
    errorTemp,
    loadingTemp,
    data: dataTemp,
    refetch: refetchTemp,
  } = useQuery(LOAD_NUMBERS_READY);
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    if (!loadingTemp && !errorTemp && dataTemp && dataTemp["plans"]) {
      setTemp(dataTemp.plans.totalCount);
    }
  }, [dataTemp, loadingTemp, errorTemp]);

  const {
    error: errorFlawed,
    loading: loadingFlawed,
    data: dataFlawed,
    refetch: refetchFlawed,
  } = useQuery(LOAD_NUMBERS_FLAWED);
  const [flawed, setFlawed] = useState(0);
  useEffect(() => {
    if (!loadingFlawed && !errorFlawed && dataFlawed && dataFlawed["plans"]) {
      setFlawed(dataFlawed["plans"].totalCount);
    }
  }, [dataFlawed, loadingFlawed, errorFlawed]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup function to stop the timer when the component unmounts
  }, []);

  return (
    <div className="home">
      <div className="shared-title">
        <div>
          <p className="title">Trang chủ</p>
          <p className="sub-title">Thông tin hệ thống </p>
        </div>
      </div>
      <div className="home_container">
        <div className="refresh-container">
          <div className="left">
            <p>Hôm nay: {date.toLocaleString()}</p>
          </div>
          <div className="right">
            <button
              className="link"
              onClick={() => {
                refetch();
                refetchCancelled();
                refetchFlawed();
                refetchTemp();
                refetchComplete();
                refetchPending();
                refetchVeri();
                refetchTravelers();
                refetchDestination();
              }}
            >
              <RefreshIcon />
            </button>
          </div>
        </div>
        <div className="item-list">
          <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số kế hoạch ban đầu</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans`} className="navigateButton">
                    <p>{pending}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container temp">
            <div className="item-top">
              <div className="item-title">Số kế hoạch chờ chốt</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/1`} className="navigateButton">
                    <p>{registering}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn temp">
                    <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số kế hoạch đã sẵn sàng</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/2`} className="navigateButton">
                    <p>{temp}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container success">
            <div className="item-top">
              <div className="item-title">Số kế hoạch đã hoàn thành</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/5`} className="navigateButton">
                    <p>{completed}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn success">
                    <CheckCircleOutlineOutlinedIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số kế hoạch lỗi</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/6`} className="navigateButton">
                    <p>{flawed}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container cancel">
            <div className="item-top">
              <div className="item-title">Số kế hoạch đã hủy</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/4`} className="navigateButton">
                    <p>{cancelled}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn cancel">
                    <CancelOutlinedIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container cancel">
            <div className="item-top">
              <div className="item-title">Số kế hoạch check-in</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/3`} className="navigateButton">
                    <p>{veri}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số địa điểm trong hệ thống</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/destinations`} className="navigateButton">
                    <p>{destinations}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số phượt thủ hiện tại</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/accounts`} className="navigateButton">
                    <p>{travelers}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <InfoIcon sx={{ color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
