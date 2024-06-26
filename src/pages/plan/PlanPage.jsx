import "../../assets/scss/plans.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
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
import { Alert, Snackbar } from "@mui/material";
import {
  LOAD_NUMBERS_CANCELED,
  LOAD_NUMBERS_COMPLETED,
  LOAD_NUMBERS_READY,
  LOAD_NUMBERS_REGISTERING,
  LOAD_NUMBERS_PUBLISHED,
  LOAD_NUMBERS_ONGOING,
  LOAD_NUMBERS_TOTAL,
} from "../../services/graphql/plan";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import FilterModal from "../../components/others/PlanFilterOrderModal";
import client from "../../services/apollo/config";

const PlanPage = () => {
  //#region Variables
  const { sbsNumber } = useParams();
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);
  const [now, setNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [filterOrder, setFilterOrders] = useState("all");
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const planStat = [
    "REGISTERING",
    "READY",
    "VERIFIED",
    "COMPLETED",
    "FLAWED",
    "CANCELED",
  ];

  //#endregion

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
          fetchPlanFilter(planStat[1]);
          break;
        case "3":
          setSelectedStatus(planStat[2]);
          fetchPlanFilter(planStat[2], searchTerm);
          break;
        case "4":
          setSelectedStatus([planStat[3], planStat[4]]);
          fetchPlanFilter(`[${planStat[3]}, ${planStat[4]}]`, searchTerm);
          break;
        case "5":
          setSelectedStatus(true);
          fetchPlanFilter(true, searchTerm);
          break;
        case "6":
          setSelectedStatus(planStat[5]);
          fetchPlanFilter(planStat[5], searchTerm);
          break;
      }
    } else {
      setSelectedStatus(planStat);
      fetchPlanFilter(`[${planStat.toString()}, PENDING, ONGOING]`, null);
    }
    setIsLoading(false);
  }, []);

  const handleClickSnackBar = () => {
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  async function planQueryInit(
    statusQuery,
    searchTerm,
    publishedQuery,
    onGoingQuery,
    ordersQuery,
    accountQuery
  ) {
    let query;
    if (onGoingQuery !== "") {
      query = gql`
      query LoadPlansFilterInit {
        plans(
          first: 100
          order: { id: DESC }
          where: { 
            ${onGoingQuery}
            ${ordersQuery}
            ${accountQuery}
          }
          ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
        ) {
          edges {
            node {
              id
              name
              account {
                name
              }
              destination {
                name
              }
              utcDepartAt
              utcStartAt
              memberCount
              maxMemberCount
              utcEndAt
              status
              isPublished
              orders {
                id
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;
    } else if (publishedQuery !== "") {
      query = gql`
        query LoadPlansFilterInit {
          plans(
            first: 100
            order: { id: DESC }
            where: { 
              ${publishedQuery}
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            edges {
              node {
                id
                name
                account {
                  name
                }
                destination {
                  name
                }
                utcDepartAt
                utcStartAt
                memberCount
                maxMemberCount
                utcEndAt
                status
                isPublished
                orders {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
    } else {
      query = gql`
        query LoadPlansFilterInit {
          plans(
            first: 100
            order: { id: DESC }
            where: { 
              ${statusQuery} 
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            edges {
              node {
                id
                name
                account {
                  name
                }
                destination {
                  name
                }
                utcDepartAt
                utcStartAt
                memberCount
                maxMemberCount
                utcEndAt
                status
                isPublished
                orders {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
    `;
    }

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  async function planQuery(
    cursor,
    statusQuery,
    searchTerm,
    publishedQuery,
    onGoingQuery,
    ordersQuery,
    accountQuery
  ) {
    let query;
    if (onGoingQuery !== "") {
      query = gql`
        query LoadPlansFilter {
          plans(
            first: 100
            after: "${cursor}"
            order: { id: DESC }
            where: { 
              ${onGoingQuery}
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            edges {
              node {
                id
                name
                account {
                  name
                }
                destination {
                  name
                }
                utcDepartAt
                utcStartAt
                memberCount
                maxMemberCount
                utcEndAt
                status
                isPublished
                orders {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
    } else if (publishedQuery !== "") {
      query = gql`
        query LoadPlansFilter {
          plans(
            first: 100
            after: "${cursor}"
            order: { id: DESC }
            where: { 
              ${publishedQuery}
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            edges {
              node {
                id
                name
                account {
                  name
                }
                destination {
                  name
                }
                utcDepartAt
                utcStartAt
                memberCount
                maxMemberCount
                utcEndAt
                status
                isPublished
                orders {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
    } else {
      query = gql`
        query LoadPlansFilter {
          plans(
            first: 100
            after: "${cursor}"
            order: { id: DESC }
            where: { 
              ${statusQuery} 
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            edges {
              node {
                id
                name
                account {
                  name
                }
                destination {
                  name
                }
                utcDepartAt
                utcStartAt
                memberCount
                maxMemberCount
                utcEndAt
                status
                isPublished
                orders {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
    }

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  async function countPlan(
    statusQuery,
    searchTerm,
    publishedQuery,
    onGoingQuery,
    ordersQuery,
    accountQuery
  ) {
    let query;
    if (onGoingQuery !== "") {
      query = gql`
      query CountOnGoingPlans {
        plans(
          where: { 
            ${onGoingQuery}
            ${ordersQuery}
            ${accountQuery}
          }
          ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
        ) {
          totalCount
        }
      }
    `;
    } else if (publishedQuery !== "") {
      query = gql`
        query CountPublishedPlans {
          plans(
            where: { 
              ${publishedQuery}
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            totalCount
          }
        }
      `;
    } else {
      query = gql`
        query CountPlanFilter {
          plans(
            where: { 
              ${statusQuery} 
              ${ordersQuery}
              ${accountQuery}
            }
            ${searchTerm ? `searchTerm: "${searchTerm.toString()}"` : ""}
          ) {
            totalCount
          }
        }
    `;
    }

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  const fetchPlanFilter = async (
    selectedStatus,
    searchTerm,
    filterOrder,
    accountId
  ) => {
    let statusQuery = `status: { in: ${selectedStatus} }`;
    let onGoingQuery = "";
    let publishedQuery = "";
    let ordersQuery = "";
    let accountQuery = "";
    switch (selectedStatus) {
      case "REGISTERING":
        statusQuery = `status: { in: [PENDING, REGISTERING] }`;
        break;
      case "[REGISTERING]":
        statusQuery = `status: { in: [PENDING, REGISTERING] }`;
        break;
      case "VERIFIED":
        statusQuery = "status: { in: [ONGOING, VERIFIED] }";
        break;
      case "[VERIFIED]":
        statusQuery = "status: { in: [ONGOING, VERIFIED] }";
        break;
      case true: {
        statusQuery = "";
        publishedQuery = `isPublished: { eq: true }`;
        break;
      }
      case "[true]": {
        statusQuery = "";
        publishedQuery = `isPublished: { eq: true }`;
        break;
      }
    }
    if (filterOrder && filterOrder !== "all") {
      ordersQuery = ` orders: { any: ${filterOrder === "haveOrders"} }`;
    }
    if (accountId) {
      accountQuery = `accountId: { eq: ${accountId} }`;
    }
    const data = await planQueryInit(
      statusQuery,
      searchTerm,
      publishedQuery,
      onGoingQuery,
      ordersQuery,
      accountQuery
    );
    let planData = data.plans.edges;
    if (data.plans.pageInfo.hasNextPage === true) {
      let check = true;
      let endCursor = data.plans.pageInfo.endCursor;
      while (check) {
        const dataRefetch = await planQuery(
          endCursor,
          statusQuery,
          searchTerm,
          publishedQuery,
          onGoingQuery,
          ordersQuery,
          accountQuery
        );

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
  };

  const fetchPlanCount = async (searchTerm, filterOrder, accountId) => {
    let statusQuery = `status: { in: [${planStat}, PENDING, ONGOING] }`;
    let onGoingQuery = "";
    let publishedQuery = "";
    let ordersQuery = "";
    let accountQuery = "";
    if (filterOrder && filterOrder !== "all") {
      ordersQuery = ` orders: { any: ${filterOrder === "haveOrders"} }`;
    }
    if (accountId) {
      accountQuery = `accountId: { eq: ${accountId} }`;
    }
    const planTotalCount = await countPlan(
      statusQuery,
      searchTerm,
      publishedQuery,
      onGoingQuery,
      ordersQuery,
      accountQuery
    );
    setTotal(planTotalCount.plans.totalCount);
    for (let i = 1; i < 7; i++) {
      onGoingQuery = "";
      publishedQuery = "";
      let selectedStatus = planStat[i - 1];
      if (i === 4) {
        selectedStatus = [planStat[3], planStat[4]];
      } else if (i === 5) {
        selectedStatus = true;
      }
      statusQuery = `status: { in: [${selectedStatus}] }`;
      switch (selectedStatus) {
        case "REGISTERING":
          statusQuery = `status: { in: [PENDING, REGISTERING] }`;
          break;
        case "VERIFIED":
          statusQuery = "status: { in: [ONGOING, VERIFIED] }";
          break;
        case true: {
          statusQuery = "";
          publishedQuery = `isPublished: { eq: true }`;
          break;
        }
      }
      switch (i) {
        case 1:
          const registeringCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setRegistering(registeringCount.plans.totalCount);
          break;
        case 2:
          const commingSoonCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setTemp(commingSoonCount.plans.totalCount);
          break;
        case 3:
          const onGoingCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setOngoing(onGoingCount.plans.totalCount);
          break;
        case 4:
          const completedCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setCompleted(completedCount.plans.totalCount);
          break;
        case 5:
          const publishedCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setPublished(publishedCount.plans.totalCount);
          break;
        case 6:
          const cancelledCount = await countPlan(
            statusQuery,
            searchTerm,
            publishedQuery,
            onGoingQuery,
            ordersQuery,
            accountQuery
          );
          setCancelled(cancelledCount.plans.totalCount);
          break;
        default:
          break;
      }
    }
  };

  const handleClick = (index) => {
    setSelectedDiv(index);
    setIsLoading(true);
    switch (index) {
      case 0:
        setSelectedStatus(planStat);
        // fetchTotalPlan(searchTerm);
        fetchPlanFilter(
          `[${planStat.toString()}, PENDING, ONGOING]`,
          searchTerm,
          filterOrder,
          accountId
        );
        break;
      case 1:
        setSelectedStatus(planStat[0]);
        fetchPlanFilter(planStat[0], searchTerm, filterOrder, accountId);
        break;
      case 2:
        setSelectedStatus(planStat[1]);
        // fetchPlanCommingSoon(searchTerm);
        fetchPlanFilter(planStat[1], searchTerm, filterOrder, accountId);
        break;
      case 3:
        setSelectedStatus(planStat[2]);
        // fetchPlanOngoing(planStat[2], searchTerm);
        fetchPlanFilter(planStat[2], searchTerm, filterOrder, accountId);
        break;
      case 4:
        setSelectedStatus([planStat[3], planStat[4]]);
        fetchPlanFilter(
          `[${planStat[3]}, ${planStat[4]}]`,
          searchTerm,
          filterOrder,
          accountId
        );
        break;
      case 5:
        setSelectedStatus(true);
        // fetchPlanPublished(searchTerm);
        fetchPlanFilter(true, searchTerm, filterOrder, accountId);
        break;
      case 6:
        setSelectedStatus(planStat[5]);
        fetchPlanFilter(planStat[5], searchTerm, filterOrder, accountId);
        break;
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

  //#region UseState
  const {
    error: errTotal,
    loading: loadTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_NUMBERS_TOTAL);
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
  } = useQuery(LOAD_NUMBERS_REGISTERING);
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
  //#endregion

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerPadding: "60px",
  };

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    const search = document.getElementById("floatingValue").value;
    setSearchTerm(search);
    fetchPlanCount(search, filterOrder);
    selectedStatus.toString() === planStat.toString()
      ? fetchPlanFilter(`[${planStat}, PENDING, ONGOING]`, search, filterOrder)
      : fetchPlanFilter(`[${selectedStatus}]`, search, filterOrder);
  };

  const handleChangeFilter = (e) => {
    var orderFilter = e.target.value;
    setFilterOrders(orderFilter);
  };

  const handleModalSubmit = async (filterOrder, accountId) => {
    setIsLoading(true);
    fetchPlanCount(searchTerm, filterOrder, accountId);
    selectedStatus.toString() === planStat.toString()
      ? fetchPlanFilter(
          `[${planStat}, PENDING, ONGOING]`,
          searchTerm,
          filterOrder,
          accountId
        )
      : fetchPlanFilter(
          `[${selectedStatus}]`,
          searchTerm,
          filterOrder,
          accountId
        );
  };

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
              }
            }}
          />
          <button className="link" onClick={handleSearchSubmit}>
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          {/* <button className="link">
            <CloudDownloadIcon />
          </button> */}
          <FilterModal
            filterOrder={filterOrder}
            handleChangeFilter={handleChangeFilter}
            accountId={accountId}
            setAccountId={setAccountId}
            handleModalSubmit={handleModalSubmit}
          />
          <button
            className="link"
            onClick={() => {
              setIsLoading(true);
              setSearchTerm(null);
              setFilterOrders("all");
              document.getElementById("floatingValue").value = "";
              setAccountId(null);
              refetchRegis();
              refetchCancelled();
              refetchTotal();
              refetchTemp();
              refetchComplete();
              refetchOngoing();
              refetchPublished();
              fetchPlanCount();
              selectedStatus.toString() === planStat.toString()
                ? fetchPlanFilter(`[${planStat}, PENDING, ONGOING]`, null)
                : fetchPlanFilter(`[${selectedStatus}]`, null);
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
                className={`icon-item ${
                  selectedDiv === index ? "selected" : ""
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
                  {index === 1 && `Chờ tham gia (${registering})`}
                  {index === 2 && `Sắp diễn ra (${temp})`}
                  {index === 3 && `Đang diễn ra (${onGoing})`}
                  {index === 4 && `Đã kết thúc (${completed})`}
                  {/* {index === 6 && `Có vấn đề (${flawed})`} */}
                  {index === 5 && `Đã xuất bản (${published})`}
                  {index === 6 && `Đã hủy (${cancelled})`}
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
        {!isLoading && selectedStatus.toString() === planStat.toString() && (
          <PlanTable planTotal={plans} sbs={selectedDiv} />
        )}

        {!isLoading &&
          selectedStatus.toString() ===
            [planStat[3], planStat[4]].toString() && (
            <PlanTable plansCompleted={plans} sbs={selectedDiv} />
          )}

        {!isLoading &&
          selectedStatus.toString() !== planStat.toString() &&
          selectedStatus.toString() !==
            [planStat[3], planStat[4]].toString() && (
            <PlanTable plans={plans} sbs={selectedDiv} />
          )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        onClose={handleClose}
        autoHideDuration={2000}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PlanPage;
