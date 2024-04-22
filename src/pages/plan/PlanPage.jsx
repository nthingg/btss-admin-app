import "../../assets/scss/plans.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import NoCrashIcon from "@mui/icons-material/NoCrash";
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
  LOAD_NUMBERS_ONGOING,
  LOAD_NUMBERS_TOTAL,
  LOAD_TOTAL_PLAN,
  LOAD_TOTAL_PLAN_INIT,
  LOAD_PLANS_PUBLISHED_FILTER_INIT,
  LOAD_PLANS_PUBLISHED_FITLER,
  LOAD_PLAN_FILTER_ORDERS_INIT,
  LOAD_PLAN_FILTER_ORDERS,
  LOAD_PLANS_FILTER_INIT,
  LOAD_PLAN_COMMING_SOON_INIT,
  LOAD_PLAN_ONGOING_INIT,
  LOAD_PLAN_COMMING_SOON,
  LOAD_PLANS_FILTER,
  LOAD_PLAN_ONGOING,
} from "../../services/graphql/plan";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import FilterModal from "../../components/others/PlanFilterOrderModal";

function usePlanFilters() {
  const [filters, _updateFilter] = useState({
    status: undefined,
    orders: undefined,
    isPublished: undefined,
    utcDepartAt: undefined
  });

  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}

const PlanPage = () => {
  const { sbsNumber } = useParams();
  const { operations, models } = usePlanFilters();
  const [now, setNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [filterOrder, setFilterOrders] = useState('all');
  const planStat = [
    "REGISTERING",
    "READY",
    "VERIFIED",
    "COMPLETED",
    "FLAWED",
    "CANCELED",
  ];
  const [selectedDiv, setSelectedDiv] = useState(
    sbsNumber ? parseInt(sbsNumber, 10) : 0
  );
  const [selectedStatus, setSelectedStatus] = useState(
    sbsNumber ? planStat[parseInt(sbsNumber, 10)] : planStat
  );

  useEffect(() => {
    if (sbsNumber) {
      switch (sbsNumber) {
        case "1":
          setSelectedStatus(planStat[0]);
          fetchPlanFilter(planStat[0], searchTerm);
          break;
        case "2":
          setSelectedStatus(planStat[1]);
          fetchPlanCommingSoon(searchTerm);
          break;
        case "3":
          setSelectedStatus(planStat[2]);
          fetchPlanOngoing(planStat[2], searchTerm);
          break;
        case "4":
          setSelectedStatus([planStat[3], planStat[4]]);
          fetchPlanFilter([planStat[3], planStat[4]], searchTerm);
          break;
        case "5":
          setSelectedStatus(true);
          fetchPlanPublished(searchTerm);
          break;
        case "6":
          setSelectedStatus(planStat[5]);
          fetchPlanFilter(planStat[5], searchTerm);
          break;
      }
    } else {
      setSelectedStatus(planStat);
      fetchTotalPlan(null);
    }
    setIsLoading(false);
  }, []);

  // const [planQuery, setPlanQuery] = useState(LOAD_PLANS_FILTER);
  const [searchTerm, setSearchTerm] = useState(null);
  const [totalPlan, setTotalPlan] = useState([]);
  const [getTotalPlan, { }] = useLazyQuery(LOAD_TOTAL_PLAN, {
    fetchPolicy: "no-cache",
  });
  const [getInitTotalPlan, { }] = useLazyQuery(LOAD_TOTAL_PLAN_INIT, {
    fetchPolicy: "no-cache",
  });
  const [getPlanFilterInit, { }] = useLazyQuery(LOAD_PLANS_FILTER_INIT, {
    fetchPolicy: "network-only"
  });
  const [getPlanFilter, { }] = useLazyQuery(LOAD_PLANS_FILTER, {
    fetchPolicy: "network-only"
  });
  const [getPlanCommingSoonInit, { }] = useLazyQuery(LOAD_PLAN_COMMING_SOON_INIT);
  const [getPlanCommingSoon, { }] = useLazyQuery(LOAD_PLAN_COMMING_SOON);
  const [getPlanOnGoingInit, { }] = useLazyQuery(LOAD_PLAN_ONGOING_INIT);
  const [getPlanOnGoing, { }] = useLazyQuery(LOAD_PLAN_ONGOING);
  const [getPublishedPlanInit, { }] = useLazyQuery(LOAD_PLANS_PUBLISHED_FILTER_INIT);
  const [getPublishedPlan, { }] = useLazyQuery(LOAD_PLANS_PUBLISHED_FITLER)
  const [filterPlanOrdersInit, { }] = useLazyQuery(LOAD_PLAN_FILTER_ORDERS_INIT, {
    fetchPolicy: "network-only"
  });;
  const [filterPlanOrders, { }] = useLazyQuery(LOAD_PLAN_FILTER_ORDERS, {
    fetchPolicy: "network-only"
  });;

  const fetchTotalPlan = async (searchTerm) => {
    const { data } = await getInitTotalPlan({
      variables: {
        searchTerm: searchTerm,
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getTotalPlan({
          variables: {
            searchTerm: searchTerm,
            endCursor: endCursor,
          },
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
  };

  const fetchPlanOrdersFilter = async (selectedStatus, haveOrders) => {
    const { data } = await filterPlanOrdersInit({
      variables: {
        searchTerm: searchTerm,
        status: selectedStatus,
        haveOrder: haveOrders
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await filterPlanOrders({
          variables: {
            searchTerm: searchTerm,
            status: selectedStatus,
            haveOrder: haveOrders,
            endCursor: endCursor,
          },
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
    setPlans(res);
    setTotalPlan(res);
    setIsLoading(false);
  }

  const fetchPlanFilter = async (selectedStatus, searchTerm) => {
    const { data } = await getPlanFilterInit({
      variables: {
        status: selectedStatus,
        searchTerm: searchTerm,
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getPlanFilter({
          variables: {
            status: selectedStatus,
            searchTerm: searchTerm,
            endCursor: endCursor,
          },
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
    setPlans(res);
    setIsLoading(false);
  }

  const fetchPlanCommingSoon = async (searchTerm) => {
    const { data } = await getPlanCommingSoonInit({
      variables: {
        searchTerm: searchTerm,
        dateTime: now.toUTCString()
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getPlanCommingSoon({
          variables: {
            searchTerm: searchTerm,
            dateTime: now.toUTCString(),
            endCursor: endCursor,
          },
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
    setPlans(res);
    setIsLoading(false);
  }

  const fetchPlanOngoing = async (searchTerm) => {
    const { data } = await getPlanOnGoingInit({
      variables: {
        searchTerm: searchTerm,
        dateTime: now.toUTCString()
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getPlanOnGoing({
          variables: {
            searchTerm: searchTerm,
            dateTime: now.toUTCString(),
            endCursor: endCursor,
          },
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
    setPlans(res);
    setIsLoading(false);
  }

  const fetchPlanPublished = async (searchTerm) => {
    const { data } = await getPublishedPlanInit({
      variables: {
        searchTerm: searchTerm
      },
    });
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getPublishedPlan({
          variables: {
            searchTerm: searchTerm,
            endCursor: endCursor,
          },
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
    setPlans(res);
    setIsLoading(false);
  }

  const handleClick = (index) => {
    setSelectedDiv(index);
    let selectStatus;
    switch (index) {
      case 0:
        setSelectedStatus(planStat);
        fetchTotalPlan(searchTerm);
        selectStatus = planStat;
        break;
      case 1:
        setSelectedStatus(planStat[0]);
        fetchPlanFilter(planStat[0], searchTerm);
        selectStatus = planStat[0];
        break;
      case 2:
        setSelectedStatus(planStat[1]);
        fetchPlanCommingSoon(searchTerm);
        selectStatus = planStat[1];
        break;
      case 3:
        setSelectedStatus(planStat[2]);
        fetchPlanOngoing(planStat[2], searchTerm);
        selectStatus = planStat[2];
        break;
      case 4:
        setSelectedStatus([planStat[3], planStat[4]]);
        fetchPlanFilter([planStat[3], planStat[4]], searchTerm);
        selectStatus = [planStat[3], planStat[4]];
        break;
      case 5:
        setSelectedStatus(true);
        fetchPlanPublished(searchTerm);
        selectStatus = planStat[3];
        break;
      case 6:
        setSelectedStatus(planStat[5]);
        fetchPlanFilter(planStat[5], searchTerm);
        selectStatus = planStat[5];
        break;
      // case 7:
      //   setPlanQuery(LOAD_PLANS_PUBLISHED_FILTER);
      //   setSelectedStatus(true);
      //   refetch();
      //   break;
      default:
        break;
    }
    if (filterOrder !== 'all') {
      setIsLoading(true);
      fetchPlanOrdersFilter(selectStatus, filterOrder === 'haveOrders');
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

  // const { error, loading, data, refetch } = useQuery(planQuery, {
  //   variables: {
  //     status: selectedStatus,
  //     searchTerm: searchTerm,
  //     dateTime: now.toUTCString(),
  //   },
  // });

  const [plans, setPlans] = useState([]);
  // useEffect(() => {
  //   if (!loading && !error && data && data["plans"]["nodes"]) {
  //     let res = data.plans.nodes.map((node, index) => {
  //       const { __typename, ...rest } = node;
  //       return { ...rest, index: index + 1 }; // Add the index to the object
  //     });
  //     setPlans(res);
  //   }
  // }, [data, loading, error]);

  const {
    error: errTotal,
    loading: loadTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_NUMBERS_TOTAL, {
    variables: {
      searchTerm: searchTerm,
    },
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
      searchTerm: searchTerm,
    },
  });
  const [registering, setRegistering] = useState(0);
  useEffect(() => {
    if (!loadingRegis && !errRegis && dataRegis && dataRegis["plans"]) {
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
      searchTerm: searchTerm,
    },
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
      searchTerm: searchTerm,
    },
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
      dateTime: now.toUTCString(),
    },
  });
  const [onGoing, setOngoing] = useState(0);
  useEffect(() => {
    if (!loadingOngoing && !errOngoing && dataOngoing && dataOngoing["plans"]) {
      setOngoing(dataOngoing["plans"].totalCount);
    }
  }, [dataOngoing, loadingOngoing, errOngoing]);

  const {
    errorTemp,
    loadingTemp,
    data: dataTemp,
    refetch: refetchTemp,
  } = useQuery(LOAD_NUMBERS_READY, {
    variables: {
      searchTerm: searchTerm,
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
    error: errorPublished,
    loading: loadingPublished,
    data: dataPublished,
    refetch: refetchPublished,
  } = useQuery(LOAD_NUMBERS_PUBLISHED, {
    variables: {
      searchTerm: searchTerm,
    },
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
    const search = document.getElementById("floatingValue").value;
    setSearchTerm(search);
  };

  const handleChangeFilter = (e) => {
    var orderFilter = e.target.value;
    let haveOrder = true;
    setFilterOrders(orderFilter);
    setIsLoading(true);
    switch (orderFilter) {
      case "all": {
        fetchTotalPlan(null);
        return;
      }
      case "haveOrders": {
        haveOrder = true;
        break;
      }
      case "noOrders": {
        haveOrder = false;
        break;
      }
    }
    fetchPlanOrdersFilter(selectedStatus, haveOrder);
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
            placeholder="Nhập tên kế hoạch..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
                const search = document.getElementById("floatingValue").value;
                setIsLoading(true);
                fetchTotalPlan(search);
              }
            }}
          />
          <button
            className="link"
            onClick={() => {
              handleSearchSubmit();
              const search = document.getElementById("floatingValue").value;
              setIsLoading(true);
              fetchTotalPlan(search);
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          {/* <button className="link">
            <CloudDownloadIcon />
          </button> */}
          <FilterModal filterOrder={filterOrder} handleChangeFilter={handleChangeFilter} />
          <button
            className="link"
            onClick={() => {
              setIsLoading(true);
              setSearchTerm(null);
              refetchRegis();
              refetchCancelled();
              refetchTotal();
              refetchTemp();
              refetchComplete();
              refetchOngoing();
              refetchPublished();
              setFilterOrders('all');
              switch (selectedStatus.toString()) {
                case planStat.toString():
                  fetchTotalPlan(null);
                  break;
                case planStat[0].toString():
                  fetchPlanFilter(planStat[0], null);
                  break;
                case planStat[1].toString():
                  fetchPlanCommingSoon(null);
                  break;
                case planStat[2].toString():
                  fetchPlanOngoing(planStat[2], null);
                  break;
                case planStat[3].toString():
                  fetchPlanFilter([planStat[3], planStat[4]], null);
                  break;
                case planStat[4].toString():
                  fetchPlanPublished(null);
                  break;
                case planStat[5].toString():
                  fetchPlanFilter(planStat[5], null);
                  break;
              }
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
                  {index === 0 && (filterOrder === 'all' ? `Tất cả (${total})` : `Tất cả`)}
                  {index === 1 && (filterOrder === 'all' ? `Chưa chốt (${registering})` : `Chưa chốt`)}
                  {index === 2 && (filterOrder === 'all' ? `Sắp diễn ra (${temp})` : `Sắp diễn ra`)}
                  {index === 3 && (filterOrder === 'all' ? `Đang diễn ra (${onGoing})` : `Đang diễn ra`)}
                  {index === 4 && (filterOrder === 'all' ? `Đã hoàn thành (${completed})` : `Đã hoàn thành`)}
                  {/* {index === 6 && `Có vấn đề (${flawed})`} */}
                  {index === 5 && (filterOrder === 'all' ? `Đã chia sẻ (${published})` : `Đã chia sẻ`)}
                  {index === 6 && (filterOrder === 'all' ? `Đã hủy (${cancelled})` : `Đã hủy`)}
                </span>
              </div>
            ))}
          </Slider>
        </div>
        {isLoading && (
          <div className="tbl-loading">
            <RestartAltIcon
              sx={{
                fontSize: 80,
                color: "#2c3d50",
              }}
            />
          </div>
        )}
        {!isLoading && selectedStatus.toString() === planStat.toString() &&
          <PlanTable planTotal={totalPlan} />}

        {!isLoading && selectedStatus.toString() !== planStat.toString() &&
          <PlanTable plans={plans} />}
      </div>
    </div>
  );
};

export default PlanPage;
