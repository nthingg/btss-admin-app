import "../../assets/scss/plans.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PlanTable from "../../components/tables/PlanTable";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PublicIcon from "@mui/icons-material/Public";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  LOAD_NUMBERS_CANCELED,
  LOAD_NUMBERS_COMPLETED,
  LOAD_NUMBERS_READY,
  LOAD_NUMBERS_REGISTERING,
  LOAD_NUMBERS_PUBLISHED,
  LOAD_NUMBERS_TOTAL,
  LOAD_PLANS_FILTER,
  LOAD_PLAN_READY,
  LOAD_TOTAL_PLAN,
  LOAD_TOTAL_PLAN_INIT,
  LOAD_PLANS_PUBLISHED_FILTER,
  LOAD_PLAN_ONGOING,
  LOAD_NUMBERS_ONGOING,
} from "../../services/graphql/plan";
import Slider from "react-slick";
import { useParams } from "react-router-dom";

const PlanPage = () => {
  const { sbsNumber } = useParams();
  const [now, setNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const planStat = [
    "TOTAL",
    "REGISTERING",
    "READY",
    "ONGOING",
    "COMPLETED",
    "FLAWED",
    "CANCELED",
  ];
  const [selectedDiv, setSelectedDiv] = useState(
    sbsNumber ? parseInt(sbsNumber, 10) : 0
  );
  const [selectedStatus, setSelectedStatus] = useState(
    planStat[sbsNumber ? parseInt(sbsNumber, 10) : 0]
  );

  useEffect(() => {
    if (sbsNumber) {
      switch (sbsNumber) {
        case "2": {
          setPlanQuery(LOAD_PLAN_READY);
          setSelectedStatus(planStat[2])
          break;
        }
        case "3": {
          setPlanQuery(LOAD_PLAN_ONGOING);
          setSelectedStatus(planStat[3]);
          break;
        }
        case "4": {
          setPlanQuery(LOAD_PLANS_FILTER);
          setSelectedStatus([planStat[4], planStat[5]]);
          break;
        }
        case "7": {
          setPlanQuery(LOAD_PLANS_PUBLISHED_FILTER);
          setSelectedStatus(true);
          refetch();
          break;
        }
      }
    }
    else {
      // setPlanQuery(LOAD_TOTAL_PLAN);
      fetchTotalPlan(null);
    }
    setIsLoading(false);
  }, []);

  const [planQuery, setPlanQuery] = useState(LOAD_PLANS_FILTER);
  const [searchTerm, setSearchTerm] = useState(null);
  const [totalPlan, setTotalPlan] = useState([]);
  const [getTotalPlan, { refetch: refetchTotalPlan }] = useLazyQuery(LOAD_TOTAL_PLAN);
  const [getInitTotalPlan, { refetch: refetchTotalPlanInit }] = useLazyQuery(LOAD_TOTAL_PLAN_INIT);

  const fetchTotalPlan = async (searchTerm) => {
    const { data } = await getInitTotalPlan({
      variables: {
        searchTerm: searchTerm
      }
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getTotalPlan({
          variables: {
            searchTerm: searchTerm,
            endCursor: endCursor
          }
        });

        planData = planData.concat(dataRefetch.plans.edges);

        if (dataRefetch.plans.pageInfo.hasNextPage === true) {
          endCursor = dataRefetch.plans.pageInfo.endCursor;
        } else {
          check = false;
        }
      }
    }

    let res = planData.map((node, index) => {
      if (node) {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 };
      }
    });
    setTotalPlan(res);
    setIsLoading(false);
  }

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        setSelectedStatus(planStat[0]);
        refetch();
        break;
      case 1:
        setPlanQuery(LOAD_PLANS_FILTER);
        setSelectedStatus(planStat[1]);
        refetch();
        break;
      case 2:
        setPlanQuery(LOAD_PLANS_FILTER);
        setSelectedStatus(planStat[2]);
        refetch();
        break;
      case 3:
        setPlanQuery(LOAD_PLAN_ONGOING);
        setSelectedStatus(planStat[3]);
        refetch();
        break;
      case 4:
        setPlanQuery(LOAD_PLANS_FILTER);
        setSelectedStatus([planStat[4], planStat[5]]);
        refetch();
        break;
      case 5:
        setPlanQuery(LOAD_PLANS_PUBLISHED_FILTER);
        setSelectedStatus(true);
        refetch();
        break;
      case 6:
        setPlanQuery(LOAD_PLANS_FILTER);
        setSelectedStatus(planStat[6]);
        refetch();
        break;
      // case 7:
      //   setPlanQuery(LOAD_PLANS_PUBLISHED_FILTER);
      //   setSelectedStatus(true);
      //   refetch();
      //   break;
      default:
        break;
    }
    refetchRegis();
    // refetchPending();
    refetchCancelled();
    // refetchFlawed();
    refetchTemp();
    refetchComplete();
    refetchOngoing();
    refetchPublished();
  };

  const { error, loading, data, refetch } = useQuery(planQuery, {
    variables: {
      status: selectedStatus,
      searchTerm: searchTerm,
      dateTime: now.toUTCString()
    },
  });

  const [plans, setPlans] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["plans"]["nodes"]) {
      let res = data.plans.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setPlans(res);
    }
  }, [data, loading, error]);

  const {
    error: errTotal,
    loading: loadTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_NUMBERS_TOTAL, {
    variables: {
      searchTerm: searchTerm
    }
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!loadTotal && !errTotal && dataTotal && dataTotal["plans"]) {
      setTotal(dataTotal["plans"].totalCount);
    }
  }, [dataTotal, errTotal, loadTotal]);

  const {
    error: errRegis,
    loading: loadingRegis,
    data: dataRegis,
    refetch: refetchRegis,
  } = useQuery(LOAD_NUMBERS_REGISTERING, {
    variables: {
      searchTerm: searchTerm
    }
  });
  const [registering, setRegistering] = useState(0);
  useEffect(() => {
    if (!loadingRegis && !errRegis && dataRegis && dataRegis["plans"]) {
      // let res = data.plans.nodes.map(({ __typename, ...rest }) => rest);
      setRegistering(dataRegis["plans"].totalCount);
    }
  }, [dataRegis, loadingRegis, errRegis]);

  const {
    errorCancelled,
    loadingCancelled,
    data: dataCancelled,
    refetch: refetchCancelled,
  } = useQuery(LOAD_NUMBERS_CANCELED, {
    variables: {
      searchTerm: searchTerm
    }
  });
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
  } = useQuery(LOAD_NUMBERS_COMPLETED, {
    variables: {
      searchTerm: searchTerm
    }
  });
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
    error: errOngoing,
    loading: loadingOngoing,
    data: dataOngoing,
    refetch: refetchOngoing,
  } = useQuery(LOAD_NUMBERS_ONGOING, {
    variables: {
      searchTerm: searchTerm,
      dateTime: now.toUTCString()
    }
  });
  const [onGoing, setOngoing] = useState(0);
  useEffect(() => {
    if (!loadingOngoing && !errOngoing && dataOngoing && dataOngoing["plans"]) {
      setOngoing(dataOngoing["plans"].totalCount);
    }
  }, [dataOngoing, loadingOngoing, errOngoing]);

  // const {
  //   error: errPend,
  //   loading: loadingPend,
  //   data: dataPend,
  //   refetch: refetchPending,
  // } = useQuery(LOAD_NUMBERS_PENDING, {
  //   variables: {
  //     searchTerm: searchTerm
  //   }
  // });
  // const [pending, setPending] = useState(0);
  // useEffect(() => {
  //   if (!loadingPend && !errPend && dataPend && dataPend["plans"]) {
  //     setPending(dataPend["plans"].totalCount);
  //   }
  // }, [dataPend, loadingPend, errPend]);

  const {
    errorTemp,
    loadingTemp,
    data: dataTemp,
    refetch: refetchTemp,
  } = useQuery(LOAD_NUMBERS_READY, {
    variables: {
      searchTerm: searchTerm,
      dateTime: now.toUTCString()
    }
  });
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    if (!loadingTemp && !errorTemp && dataTemp && dataTemp["plans"]) {
      setTemp(dataTemp.plans.totalCount);
    }
  }, [dataTemp, loadingTemp, errorTemp]);

  // const {
  //   error: errorFlawed,
  //   loading: loadingFlawed,
  //   data: dataFlawed,
  //   refetch: refetchFlawed,
  // } = useQuery(LOAD_NUMBERS_FLAWED, {
  //   variables: {
  //     searchTerm: searchTerm
  //   }
  // });
  // const [flawed, setFlawed] = useState(0);
  // useEffect(() => {
  //   if (!loadingFlawed && !errorFlawed && dataFlawed && dataFlawed["plans"]) {
  //     setFlawed(dataFlawed["plans"].totalCount);
  //   }
  // }, [dataFlawed, loadingFlawed, errorFlawed]);

  const {
    error: errorPublished,
    loading: loadingPublished,
    data: dataPublished,
    refetch: refetchPublished,
  } = useQuery(LOAD_NUMBERS_PUBLISHED, {
    variables: {
      searchTerm: searchTerm
    }
  });
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

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerPadding: "60px",
  };

  const handleSearchSubmit = async () => {
    const search = document.getElementById('floatingValue').value;
    setSearchTerm(search);
    refetch();
    // if (!result.loading && !result.error && result.data && result.data["plans"]["nodes"]) {
    //   const totalCount = result.data.plans.totalCount;
    //   switch (selectedStatus) {
    //     // case planStat[0]: {
    //     //   setPending(totalCount);
    //     //   break;
    //     // }
    //     case planStat[1]: {
    //       setRegistering(totalCount);
    //       break;
    //     }
    //     case planStat[2]: {
    //       setTemp(totalCount);
    //       break;
    //     }
    //     case planStat[3]: {
    //       setOngoing(totalCount);
    //       break;
    //     }
    //     case planStat[4]: {
    //       setCompleted(totalCount);
    //       break;
    //     }
    //     // case planStat[5]: {
    //     //   setCompleted(totalCount);
    //     //   break;
    //     // }
    //     case planStat[6]: {
    //       setCancelled(totalCount);
    //       break;
    //     }
    //     case planStat[true]: {
    //       setPublished(totalCount);
    //       break;
    //     }
    //   }
    // }
  }

  return (
    <div className="plan">
      <div className="shared-title">
        <div>
          <p className="title">Kế hoạch</p>
          <p className="sub-title">Danh sách kế hoạch</p>
        </div>
      </div>
      <div className="header">
        <div className="left">
          <input
            type="text"
            className={"form-control"}
            id="floatingValue"
            name="value"
            placeholder="Tìm kiếm ..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
          <button className="link" onClick={() => {
            handleSearchSubmit();
            const search = document.getElementById('floatingValue').value;
            setIsLoading(true);
            fetchTotalPlan(search);
          }}>
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          <button className="link">
            <CloudDownloadIcon />
          </button>
          <button className="link">
            <FilterAltIcon />
          </button>
          <button
            className="link"
            onClick={() => {
              setSearchTerm(null);
              refetch();
              refetchRegis();
              // refetchPending();
              refetchCancelled();
              // refetchFlawed();
              refetchTemp();
              refetchComplete();
              refetchOngoing();
              refetchPublished();
              setIsLoading(true);
              fetchTotalPlan(null);
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="planContainer">
        <div className="icon-row">
          <Slider {...settings}>
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className={`icon-item ${selectedDiv === index ? "selected" : ""
                  }`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {/* Replace with appropriate icons */}
                {index === 0 && <FlagCircleIcon sx={{ color: "#3498DB" }} />}
                {index === 1 && (
                  <AppRegistrationIcon sx={{ color: "#3498DB" }} />
                )}
                {index === 2 && (
                  <PlaylistAddCheckIcon sx={{ color: "#3498DB" }} />
                )}
                {index === 3 && <NoCrashIcon sx={{ color: "#3498DB" }} />}
                {index === 4 && <CheckCircleIcon color="success" />}
                {/* {index === 6 && <BuildCircleIcon sx={{ color: "#3498DB" }} />} */}
                {index === 5 && <PublicIcon sx={{ color: "#3498DB" }} />}
                {index === 6 && <CancelIcon sx={{ color: "#E74C3C" }} />}
                <span>
                  {index === 0 && `Tất cả (${total})`}
                  {index === 1 && `Chưa chốt (${registering})`}
                  {index === 2 && `Sắp diễn ra (${temp})`}
                  {index === 3 && `Đang diễn ra (${onGoing})`}
                  {index === 4 && `Đã hoàn thành (${completed})`}
                  {/* {index === 6 && `Có vấn đề (${flawed})`} */}
                  {index === 5 && `Đã chia sẻ (${published})`}
                  {index === 6 && `Đã hủy (${cancelled})`}
                </span>
              </div>
            ))}
          </Slider>
        </div>
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
        {!isLoading && selectedStatus === planStat[0] ?
          <PlanTable planTotal={totalPlan} /> :
          <PlanTable plans={plans} />
        }
      </div>
    </div>
  );
};

export default PlanPage;
