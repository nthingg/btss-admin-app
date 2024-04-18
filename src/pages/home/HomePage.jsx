import "../../assets/scss/home.scss";
import "../../assets/scss/shared.scss";

import ForwardIcon from "@mui/icons-material/Forward";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import {
  LOAD_NUMBERS_CANCELED,
  LOAD_NUMBERS_COMPLETED,
  LOAD_NUMBERS_ONGOING,
  LOAD_NUMBERS_READY,
  LOAD_NUMBERS_REGISTERING,
  LOAD_NUMBERS_VERIFIED,
  LOAD_NUMBERS_PUBLISHED,
  LOAD_NUMBERS_TOTAL,
} from "../../services/graphql/plan";
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATION_TRENDING,
} from "../../services/graphql/destination";
import {
  LOAD_ACCOUNTS_TRAVELER,
  LOAD_ACCOUNT_USERS,
  LOAD_NUMBERS_NEWEST_TRAVELER,
} from "../../services/graphql/account";
import { Link } from "react-router-dom";
import { TrendingDestinationChart } from "../../components/charts/TrendingDestinationChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const HomePage = () => {
  const [now, setNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const {
    error: errUsers,
    loading: loadUsers,
    data: dataUsers,
    refetch: refetchUsers,
  } = useQuery(LOAD_ACCOUNT_USERS);
  const [users, setUsers] = useState(0);
  useEffect(() => {
    if (
      !loadUsers &&
      !errUsers &&
      dataUsers &&
      dataUsers["accounts"]["totalCount"]
    ) {
      setUsers(dataUsers.accounts.totalCount);
    }
  }, [dataUsers, loadUsers, errUsers]);

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
      dataTravelers["accounts"]["totalCount"]
    ) {
      // let res = dataTravelers.accounts.nodes.map(
      //   ({ __typename, ...rest }) => rest
      // );
      setTravelers(dataTravelers.accounts.totalCount);
    }
  }, [dataTravelers, loadingTravelers, errorTravelers]);

  const currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const {
    error: errorNewTravelers,
    loading: loadingNewTravelers,
    data: dataNewTravelers,
    refetch: refetchNewTravelers,
  } = useQuery(LOAD_NUMBERS_NEWEST_TRAVELER, {
    variables: {
      input: currentMonth.toISOString(),
    },
  });
  const [newTravelers, setNewTravelers] = useState(0);
  useEffect(() => {
    if (
      !loadingNewTravelers &&
      !errorNewTravelers &&
      dataNewTravelers &&
      dataNewTravelers["accounts"]["totalCount"]
    ) {
      // let res = dataTravelers.accounts.nodes.map(
      //   ({ __typename, ...rest }) => rest
      // );
      setNewTravelers(dataNewTravelers.accounts.totalCount);
    }
  }, [dataNewTravelers, loadingNewTravelers, errorNewTravelers]);

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

  // const {
  //   error: errVeri,
  //   loading: loadingVeri,
  //   data: dataVeri,
  //   refetch: refetchVeri,
  // } = useQuery(LOAD_NUMBERS_VERIFIED);
  // const [veri, setVeri] = useState(0);
  // useEffect(() => {
  //   if (!loadingVeri && !errVeri && dataVeri && dataVeri["plans"]) {
  //     setVeri(dataVeri["plans"].totalCount);
  //   }
  // }, [dataVeri, loadingVeri, errVeri]);

  const {
    error: errTotal,
    loading: loadingTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_NUMBERS_TOTAL);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!loadingTotal && !errTotal && dataTotal && dataTotal["plans"]) {
      setTotal(dataTotal["plans"].totalCount);
    }
  }, [dataTotal, loadingTotal, errTotal]);

  const {
    error: errorTemp,
    loading: loadingTemp,
    data: dataTemp,
    refetch: refetchTemp,
  } = useQuery(LOAD_NUMBERS_READY, {
    variables: {
      dateTime: now.toUTCString(),
    },
  });
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    if (!loadingTemp && !errorTemp && dataTemp && dataTemp["plans"]) {
      setTemp(dataTemp.plans.totalCount);
    }
  }, [dataTemp, loadingTemp, errorTemp]);

  const {
    error: errorOnGoing,
    loading: loadingOnGoing,
    data: dataOnGoing,
    refetch: refetchOnGoing,
  } = useQuery(LOAD_NUMBERS_ONGOING, {
    variables: {
      dateTime: now.toUTCString(),
    },
  });
  const [onGoing, setOnGoing] = useState(0);
  useEffect(() => {
    if (
      !loadingOnGoing &&
      !errorOnGoing &&
      dataOnGoing &&
      dataOnGoing["plans"]
    ) {
      setOnGoing(dataOnGoing["plans"].totalCount);
    }
  }, [dataOnGoing, loadingOnGoing, errorOnGoing]);

  const {
    error: errorPublished,
    loading: loadingPublished,
    data: dataPublished,
    refetch: refetchPublished,
  } = useQuery(LOAD_NUMBERS_PUBLISHED);
  const [published, setPublished] = useState(0);
  useEffect(() => {
    if (
      !loadingPublished &&
      !errorPublished &&
      dataPublished &&
      dataPublished["plans"]
    ) {
      setPublished(dataPublished["plans"].totalCount);
    }
  }, [dataPublished, loadingPublished, errorPublished]);

  const [trendingDest, setTrendingDest] = useState(null);
  const {
    error: errTrendDest,
    loading: loadingTrendDest,
    data: dataTrendDest,
  } = useQuery(LOAD_DESTINATION_TRENDING);
  useEffect(() => {
    if (
      !loadingTrendDest &&
      !errTrendDest &&
      dataTrendDest &&
      dataTrendDest["trendingDestinations"]
    ) {
      setTrendingDest(dataTrendDest.trendingDestinations);
    }
    setIsLoading(false);
  }, [errTrendDest, loadingTrendDest, dataTrendDest]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      refetch();
      refetchCancelled();
      refetchOnGoing();
      refetchTemp();
      refetchDestination();
      refetchComplete();
      refetchTotal();
      refetchTravelers();
      refetchPublished();
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup function to stop the timer when the component unmounts
  }, []);

  return (
    <div className="home">
      {isLoading && (
        <div className="loading">
          <RestartAltIcon
            sx={{
              fontSize: 80,
              color: "#2c3d50",
            }}
          />
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="shared-title">
            <div>
              <p className="title">Trang chủ</p>
              <p className="sub-title">Thông tin hệ thống </p>
            </div>
          </div>
          <div className="home_container">
            <div className="refresh-container">
              <div className="left">
                <p>Hôm nay: {now.toLocaleString()}</p>
              </div>
              <div className="right">
                <button
                  className="link"
                  onClick={() => {
                    setIsLoading(true);
                    refetch();
                    refetchCancelled();
                    refetchOnGoing();
                    refetchTemp();
                    refetchDestination();
                    refetchComplete();
                    refetchTotal();
                    // refetchVeri();
                    refetchTravelers();
                    refetchPublished();
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 500);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
            <h2 className="item-list-title">Báo cáo kế hoạch</h2>
            <div className="item-list-plan">
              <div className="item-container total">
                <div className="item-top">
                  <div className="item-title">Tổng số kế hoạch</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans`} className="navigateButton">
                        {/* <p>{pending}</p> */}
                        <p>{total}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/plans`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container temp">
                <div className="item-top">
                  <div className="item-title" style={{ fontSize: "17px" }}>
                    Kế hoạch chưa chốt thành viên
                  </div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/1`} className="navigateButton">
                        <p>{registering}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn temp">
                        <Link to={`/plans/sbs/1`} className="navigateButton">
                          <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container info">
                <div className="item-top">
                  <div className="item-title">Kế hoạch sắp diễn ra</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/2`} className="navigateButton">
                        <p>{temp}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/plans/sbs/2`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container info">
                <div className="item-top">
                  <div className="item-title">Kế hoạch đang diễn ra</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/3`} className="navigateButton">
                        <p>{onGoing}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/plans/sbs/3`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container success">
                <div className="item-top">
                  <div className="item-title">Kế hoạch đã hoàn thành</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/4`} className="navigateButton">
                        <p>{completed}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn success">
                        <Link to={`/plans/sbs/4`} className="navigateButton">
                          <CheckCircleOutlineOutlinedIcon
                            sx={{ color: "white" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="item-container info">
            <div className="item-top">
              <div className="item-title">Số kế hoạch lỗi</div>
              <div className="item-body">
                <div className="left">
                  <Link to={`/plans/sbs/6`} className="navigateButton">
                    <p>{OnGoing}</p>
                  </Link>
                </div>
                <div className="right">
                  <div className="btn info">
                    <Link to={`/plans/sbs/6`} className="navigateButton">
                      <InfoIcon sx={{ color: "white" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
              {/* <div className="item-container checkIn">
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
                    <Link to={`/plans/sbs/3`} className="navigateButton">
                      <InfoIcon sx={{ color: "white" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
              <div className="item-container publish">
                <div className="item-top">
                  <div className="item-title">Kế hoạch đã được chia sẻ</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/5`} className="navigateButton">
                        {published == 0 ? (
                          <p>{published} </p>
                        ) : (
                          <p>
                            {published} / {completed}
                          </p>
                        )}
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/plans/sbs/5`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container cancel">
                <div className="item-top">
                  <div className="item-title">Kế hoạch đã hủy</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/plans/sbs/6`} className="navigateButton">
                        <p>{cancelled}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn cancel">
                        <Link to={`/plans/sbs/6`} className="navigateButton">
                          <CancelOutlinedIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #e4e4e4", marginTop: "1rem" }} />
            <div className="item-list-title">
              <h2 style={{ display: "inline-block" }}>Báo cáo hệ thống</h2>
              {/* <span style={{fontSize: "1.3rem", float: "right"}}><em>*Tháng này đã có {newTravelers} người dùng mới đăng kí vào hệ thống</em></span> */}
            </div>
            <div className="item-list-system">
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
                        <Link to={`/destinations`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container info">
                <div className="item-top">
                  <div className="item-title">Số người dùng hiện tại</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/accounts`} className="navigateButton">
                        <p>{users}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/accounts`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
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
                        <Link to={`/accounts`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-container info">
                <div className="item-top">
                  <div className="item-title">Người dùng mới tháng này</div>
                  <div className="item-body">
                    <div className="left">
                      <Link to={`/accounts`} className="navigateButton">
                        <p>{newTravelers}</p>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="btn info">
                        <Link to={`/accounts`} className="navigateButton">
                          <InfoIcon sx={{ color: "white" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #e4e4e4", marginTop: "1rem" }} />
            <div className="item-list-title">
              <h2 style={{ display: "inline-block" }}>Địa điểm nổi bật</h2>
              {trendingDest && (
                <span style={{ fontSize: "1.1rem", float: "right" }}>
                  <em>
                    *Dữ liệu được thống kê từ{" "}
                    {new Date(trendingDest.from).toLocaleDateString("vi-VN")}{" "}
                    tới {new Date(trendingDest.to).toLocaleDateString("vi-VN")}{" "}
                    (Số liệu được cập nhật mỗi Thứ 2 hàng tuần).
                  </em>
                </span>
              )}
            </div>
            <div className="item-list-trending">
              <div className="item-container info">
                {trendingDest ? (
                  <TrendingDestinationChart chartData={trendingDest} />
                ) : (
                  <div>
                    <span style={{ fontSize: "1.3rem", fontStyle: "italic" }}>
                      Không có dữ liệu.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
