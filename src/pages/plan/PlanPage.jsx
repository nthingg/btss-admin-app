import "../../assets/scss/plans.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
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
import PublicIcon from '@mui/icons-material/Public';
import {
  LOAD_NUMBERS_CANCELED,
  LOAD_NUMBERS_COMPLETED,
  LOAD_NUMBERS_FLAWED,
  LOAD_NUMBERS_PENDING,
  LOAD_NUMBERS_READY,
  LOAD_NUMBERS_REGISTERING,
  LOAD_NUMBERS_VERIFIED,
  LOAD_NUMBERS_PUBLISHED,
  LOAD_PLANS,
  LOAD_PLANS_FILTER,
} from "../../services/graphql/plan";
import Slider from "react-slick";
import { useParams } from "react-router-dom";

const PlanPage = () => {
  const { sbsNumber } = useParams();
  const planStat = [
    "PENDING",
    "REGISTERING",
    "READY",
    "VERIFIED",
    "CANCELED",
    "COMPLETED",
    "FLAWED",
    "PUBLISHED"
  ];
  const [selectedDiv, setSelectedDiv] = useState(
    sbsNumber ? parseInt(sbsNumber, 10) : 0
  );
  const [selectedStatus, setSelectedStatus] = useState(
    planStat[sbsNumber ? parseInt(sbsNumber, 10) : 0]
  );

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        setSelectedStatus(planStat[0]);
        break;
      case 1:
        setSelectedStatus(planStat[1]);
        break;
      case 2:
        setSelectedStatus(planStat[2]);
        break;
      case 3:
        setSelectedStatus(planStat[3]);
        break;
      case 4:
        setSelectedStatus(planStat[4]);
        break;
      case 5:
        setSelectedStatus(planStat[5]);
        break;
      case 6:
        setSelectedStatus(planStat[6]);
        break;
      case 7:
        // setSelectedStatus(planStat[7]);
        break;
      default:
        break;
    }
    refetch();
  };

  const { error, loading, data, refetch } = useQuery(LOAD_PLANS_FILTER, {
    variables: {
      status: selectedStatus,
    },
  });
  const {
    error: errorTotal,
    loading: loadingTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_PLANS);

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
    error: errRegis,
    loading: loadingRegis,
    data: dataRegis,
    refetch: refetchRegis,
  } = useQuery(LOAD_NUMBERS_REGISTERING);
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
  
  const {
    error: errorPublished,
    loading: loadingPublished,
    data: dataPublished,
    refetch: refetchPublished,
  } = useQuery(LOAD_NUMBERS_PUBLISHED);
  const [published, setPublished] = useState(0);
  useEffect(() => {
    if (!loadingPublished && !errorPublished && dataPublished && dataPublished["plans"]) {
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
          />
          <button className="link" onClick={() => { }}>
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
              refetch();
              refetchTotal();
              refetchRegis();
              refetchPending();
              refetchCancelled();
              refetchFlawed();
              refetchTemp();
              refetchComplete();
              refetchVeri();
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="planContainer">
        <div className="icon-row">
          <Slider {...settings}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
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
                {index === 4 && <CancelIcon sx={{ color: "#E74C3C" }} />}
                {index === 5 && <CheckCircleIcon color="success" />}
                {index === 6 && <BuildCircleIcon sx={{ color: "#3498DB" }} />}
                {index === 7 && <PublicIcon sx={{ color: "#3498DB" }}/>}
                <span>
                  {index === 0 && `Ban đầu (${pending})`}
                  {index === 1 && `Chờ chốt (${registering})`}
                  {index === 2 && `Sẵn sàng (${temp})`}
                  {index === 3 && `Check-in (${veri})`}
                  {index === 4 && `Đã hủy (${cancelled})`}
                  {index === 5 && `Đã hoàn thành (${completed})`}
                  {index === 6 && `Có vấn đề (${flawed})`}
                  {index === 7 && `Đã chia sẻ (${published})`}
                </span>
              </div>
            ))}
          </Slider>
        </div>
        <PlanTable plans={plans} />
      </div>
    </div>
  );
};

export default PlanPage;
