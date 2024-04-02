import "../../assets/scss/destinations.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../../assets/scss/filter.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuery } from "@apollo/client";
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
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_FILTER,
} from "../../services/graphql/destination";
import { BikeScooter } from "@mui/icons-material";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const DestinationPage = () => {
  const topoType = [
    "BEACH",
    "BROOK",
    "CAVE",
    "DUNE",
    "HILL",
    "JUNGLE",
    "LAKE",
    "MOUNTAIN",
    "WATERFALL",
  ];
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(topoType);

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        setSelectedStatus(topoType);
        refetch();
        break;
      case 1:
        setSelectedStatus(topoType[0]);
        refetch();
        break;
      case 2:
        setSelectedStatus(topoType[1]);
        refetch();
        break;
      case 3:
        setSelectedStatus(topoType[2]);
        refetch();
        break;
      case 4:
        setSelectedStatus(topoType[3]);
        refetch();
        break;
      case 5:
        setSelectedStatus(topoType[4]);
        refetch();
        break;
      case 6:
        setSelectedStatus(topoType[5]);
        refetch();
        break;
      case 7:
        setSelectedStatus(topoType[6]);
        refetch();
        break;
      case 8:
        setSelectedStatus(topoType[7]);
        refetch();
        break;
      case 9:
        setSelectedStatus(topoType[8]);
        refetch();
        break;
      default:
        break;
    }
  };

  const { error, loading, data, refetch } = useQuery(LOAD_DESTINATIONS_FILTER, {
    variables: {
      topo: selectedStatus,
    },
  });
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["destinations"]["nodes"]) {
      let res = data.destinations.nodes.map(({ __typename, ...rest }) => rest);
      setDestinations(res);
    }
  }, [data, loading, error]);

  const {
    error: errorTotal,
    loading: loadingTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_DESTINATIONS);

  const [beach, setBeach] = useState(0);
  const [brook, setBrook] = useState(0);
  const [cave, setCave] = useState(0);
  const [dune, setDune] = useState(0);
  const [hill, setHill] = useState(0);
  const [jungle, setJungle] = useState(0);
  const [lake, setLake] = useState(0);
  const [mountain, setMountain] = useState(0);
  const [waterfall, setWaterfall] = useState(0);
  useEffect(() => {
    if (
      !loadingTotal &&
      !errorTotal &&
      dataTotal &&
      dataTotal["destinations"]["nodes"]
    ) {
      let countBeach = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "BEACH") {
          countBeach++;
        }
      }

      let countCave = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "CAVE") {
          countCave++;
        }
      }

      let countBrook = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "BROOK") {
          countBrook++;
        }
      }

      let countDune = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "DUNE") {
          countDune++;
        }
      }

      let countHill = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "HILL") {
          countHill++;
        }
      }

      let countJungle = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "JUNGLE") {
          countJungle++;
        }
      }

      let countLake = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "LAKE") {
          countLake++;
        }
      }

      let countMountain = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "MOUNTAIN") {
          countMountain++;
        }
      }

      let countWaterfall = 0;
      for (const item of dataTotal["destinations"]["nodes"]) {
        if (item["topographic"] === "WATERFALL") {
          countWaterfall++;
        }
      }

      setBeach(countBeach);
      setBrook(countBrook);
      setCave(countCave);
      setDune(countDune);
      setHill(countHill);
      setJungle(countJungle);
      setLake(countLake);
      setMountain(countMountain);
      setWaterfall(countWaterfall);
    }
  }, [dataTotal, loadingTotal, errorTotal]);

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
          <p className="title">Địa điểm</p>
          <p className="sub-title">Danh sách địa điểm</p>
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
          <button className="link">
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          <Link to="/destinations/add" className="link">
            <AddCircleIcon />
            <span>Thêm địa điểm</span>
          </Link>
          <button className="link">
            <FilterAltIcon />
          </button>
          <button className="link">
            <CloudDownloadIcon />
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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
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
                {index === 7 && <RowingIcon sx={{ color: "#3498DB" }} />}
                {index === 8 && <TerrainIcon sx={{ color: "#3498DB" }} />}
                {index === 9 && <BikeScooter sx={{ color: "#3498DB" }} />}
                <span>
                  {index === 0 && `Tất cả`}
                  {index === 1 && `Bãi biển (${beach})`}
                  {index === 2 && `Suối (${brook})`}
                  {index === 3 && `Hang động (${cave})`}
                  {index === 4 && `Cồn cát (${dune})`}
                  {index === 5 && `Đồi (${hill})`}
                  {index === 6 && `Rừng (${jungle})`}
                  {index === 7 && `Hồ (${lake})`}
                  {index === 8 && `Núi (${mountain})`}
                  {index === 9 && `Thác (${waterfall})`}
                </span>
              </div>
            ))}
          </Slider>
        </div>
        <DestinationTable destinations={destinations} />
      </div>
    </div>
  );
};

export default DestinationPage;
