import "../../assets/scss/destinations.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../../assets/scss/filter.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuery, useMutation } from "@apollo/client";
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
import PoolIcon from "@mui/icons-material/Pool";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_FILTER,
  IMPORT_EXCEL_DESTINATION,
} from "../../services/graphql/destination";
import { BikeScooter, Kayaking, Landscape } from "@mui/icons-material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Snackbar, Alert, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import DestinationTotalTable from "../../components/tables/DestinationTotalTable";

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
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(topoType);
  const [errorMsg, setErrMsg] = useState(false);
  const [successMsg, setSucessMsg] = useState(false);
  const [snackBarErrorOpen, setsnackBarErrorOpen] = useState(false);
  const [snackBarSuccessOpen, setsnackBarSucessOpen] = useState(false);
  const [filter, setFilter] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchedData, setSearchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      searchTerm: searchTerm,
    },
  });
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["destinations"]["nodes"]) {
      let res = data.destinations.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setDestinations(res);
      setIsLoading(false);
    }
  }, [data, loading, error]);

  const {
    error: errorTotal,
    loading: loadingTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(LOAD_DESTINATIONS, {
    variables: {
      searchTerm: searchTerm,
    },
  });

  const [beach, setBeach] = useState(0);
  const [brook, setBrook] = useState(0);
  const [cave, setCave] = useState(0);
  const [dune, setDune] = useState(0);
  const [hill, setHill] = useState(0);
  const [jungle, setJungle] = useState(0);
  const [lake, setLake] = useState(0);
  const [mountain, setMountain] = useState(0);
  const [waterfall, setWaterfall] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (
      !loadingTotal &&
      !errorTotal &&
      dataTotal &&
      dataTotal["destinations"]["nodes"]
    ) {
      initSlider(dataTotal["destinations"]["nodes"]);
      setTotal(dataTotal["destinations"]["nodes"].length);
    }
  }, [dataTotal, loadingTotal, errorTotal, searchedData]);

  useEffect(() => {
    if (searchedData && searchTerm) {
      initSlider(searchedData);
    }
  }, [searchedData]);

  const initSlider = (dataArr) => {
    let countBeach = 0;
    let countCave = 0;
    let countBrook = 0;
    let countDune = 0;
    let countHill = 0;
    let countJungle = 0;
    let countLake = 0;
    let countMountain = 0;
    let countWaterfall = 0;

    for (const item of dataArr) {
      switch (item["topographic"]) {
        case "BEACH":
          countBeach++;
          break;
        case "CAVE":
          countCave++;
          break;
        case "BROOK":
          countBrook++;
          break;
        case "DUNE":
          countDune++;
          break;
        case "HILL":
          countHill++;
          break;
        case "JUNGLE":
          countJungle++;
          break;
        case "LAKE":
          countLake++;
          break;
        case "MOUNTAIN":
          countMountain++;
          break;
        case "WATERFALL":
          countWaterfall++;
          break;
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

    const arrInt = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const locArr = {
      beach: 1,
      brook: 1,
      cave: 0,
      dune: 0,
      hill: 0,
      jungle: 2,
      lake: 1,
      mountain: 8,
      waterfall: 8,
    };

    // Create a new array to store the sorted indices
    const sortedArr = arrInt.slice().sort((a, b) => {
      // Get the location values for indices a and b
      const locValueA = locArr[Object.keys(locArr)[a]];
      const locValueB = locArr[Object.keys(locArr)[b]];

      // Sort descending by location value
      return locValueB - locValueA;
    });
    sortedArr.unshift(0);
    setFilter(sortedArr);
  };

  //#region Import excel
  const [add] = useMutation(
    IMPORT_EXCEL_DESTINATION
  );

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

  const seas = ["SPRING", "SUMMER", "FALL", "WINTER"];
  const topos = [
    "LAKE",
    "MOUNTAIN",
    "BEACH",
    "BROOK",
    "JUNGLE",
    "CAVE",
    "DUNE",
    "WATERFALL",
    "HILL",
  ];
  const actis = [
    "BATHING",
    "CAMPING",
    "CLIMBING",
    "PADDLING",
    "DIVING",
    "SURFING",
    "FISHING",
  ];

  const validateImportData = (data, index) => {
    const minNameLength = 10;
    const maxNameLength = 30;
    const minDescriptionLength = 100;
    const maxDescriptionLength = 999;
    const imageUrlsMax = 5;
    const imageUrlSource = "https://d38ozmgi8b70tu.cloudfront.net";
    const addressMinLength = 20;
    const addressMaxLength = 120;
    let errorMsg = "Lỗi tại dòng " + (index + 1) + ":\n";
    let result = true;

    if (
      !data.name ||
      data.name.length < minNameLength ||
      data.name.length > maxNameLength
    ) {
      errorMsg +=
        "Tên không hợp lệ! Tên không được để trống và độ dài cho phép từ 10 tới 30!\n";
    }

    if (
      !data.description ||
      data.description.length < minDescriptionLength ||
      data.description.length > maxDescriptionLength
    ) {
      errorMsg +=
        "Mô tả không hợp lệ! Mô tả không được để trống và độ dài cho phép từ 100 tới 999!\n";
    }

    if (!data.imageUrls || data.imageUrls.length > imageUrlsMax) {
      errorMsg +=
        "Đường dẫn ảnh không hợp lệ! Đường dẫn ảnh không được để trống và số lượng ảnh không vượt quá 5!\n";
    }

    for (let i = 0; i < data.imageUrls.length; i++) {
      if (!data.imageUrls[i].startsWith(imageUrlSource)) {
        errorMsg += "Đường dẫn ảnh tới từ nguồn không hợp lệ!\n";
        break;
      }
    }

    if (
      !data.address ||
      data.address.length < addressMinLength ||
      data.address.length > addressMaxLength
    ) {
      errorMsg +=
        "Địa chỉ không hợp lệ! Địa chỉ không được để trống và độ dài cho phép từ 20 tới 120!\n";
    }

    if (!data.topographic || !topos.some((t) => t.includes(data.topographic))) {
      errorMsg += "Loại địa hình không hợp lệ!\n";
    }

    if (!data.seasons || !data.seasons.every((s) => seas.includes(s))) {
      errorMsg += "Mùa không hợp lệ!\n";
    }

    if (!data.activities || !data.activities.every((a) => actis.includes(a))) {
      errorMsg += "Hoạt động không hợp lệ!\n";
    }

    if (errorMsg !== "Lỗi tại dòng " + (index + 1) + ":\n") {
      setErrMsg(errorMsg);
      setsnackBarErrorOpen(true);
      result = false;
    }

    return result;
  };

  const handleImportExcel = (e) => {
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const importData = [];
        parsedData.forEach((value) => {
          importData.push({
            activities: value.Activities.substring(
              1,
              value.Activities.length - 1
            ).split(", "),
            address: value.Address,
            coordinate: [value.Longitude, value.Latitude],
            description: value.Description,
            imageUrls: value.ImagePaths.substring(
              1,
              value.ImagePaths.length - 1
            ).split(", "),
            name: value.Name,
            provinceId: value.ProvinceId,
            seasons: value.Seasons.substring(1, value.Seasons.length - 1).split(
              ", "
            ),
            topographic: value.Topographic,
          });
        });

        let isValidData = true;

        for (let i = 0; i < importData.length; i++) {
          if (!validateImportData(importData[i], i)) {
            isValidData = false;
            break;
          }
        }

        if (isValidData) {
          const { inputData } = await add({
            variables: {
              input: importData,
            },
          });

          setSucessMsg("Thêm thành công!");
          openSuccessSnackBar();
        }

        refetch();
        document.getElementById("upload-excel").value = "";
      };
    } catch {
      document.getElementById("upload-excel").value = "";
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      openErrorSnackBar();
      localStorage.removeItem("errorMsg");
    }
  };
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
    const result = await refetch({
      searchTerm: search,
    });
    setSearchedData(result["data"]["destinations"]["nodes"]);
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
            placeholder="Nhập tên địa điểm..."
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await handleSearchSubmit();
              }
            }}
          />
          <button className="link" onClick={handleSearchSubmit}>
            <SearchIcon />
          </button>
        </div>
        <div className="right">
          <Link to="/destinations/add" className="link">
            <AddCircleIcon />
            <span>Thêm địa điểm</span>
          </Link>
          {/* <button className="link">
            <FilterAltIcon />
          </button> */}
          <input
            type="file"
            id="upload-excel"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            hidden
          />
          <label
            htmlFor="upload-excel"
            className="link"
            style={{ marginLeft: "10px" }}
            onChange={handleImportExcel}
          >
            <CloudDownloadIcon />
          </label>
          <button
            className="link"
            onClick={() => {
              setSearchTerm(null);
              setSearchedData(null);
              setIsLoading(true);
              refetch();
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
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
                {index === 2 && (
                  // <WaterIcon sx={{ color: "#3498DB" }} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <rect width="512" height="512" fill="none" />
                    <path
                      fill="#3498DB"
                      d="M357.676 20.387q-3.917.014-7.856.29c-63.314 4.438-131.13 58.006-142.117 130.253L494 162.992V89.656c-8.09-7.792-16.415-15.25-24.953-22.177c-34.59-28.067-72.195-47.234-111.37-47.093zM125.55 40.812C89.363 40.94 51.743 55.725 18 86.825v81.3l172.107-18.815l-.363-.054c3.872-26.688 14.327-50.957 29.162-71.742c-26.973-24.13-59.536-36.82-93.357-36.7zm110.263 129.514c-24.49-.258-109.87 12.136-109.602 27.078c.46 25.55 104.433 51.553 94.726 53.018C122.553 265.27 67.968 265.427 35.34 295.2c-38.914 35.507 214.983 80.92 184.422 89.687c-57.204 16.412-107.82 36.256-109.002 88.414c-.17 7.52.8 14.385 2.705 20.7h54.945c-15.423-20.635-24.05-40.664-14.6-45.912c10.413 15.107 22.492 31.126 36.174 45.912h64.286c-19.474-9.912-51.732-29.408-50.594-49.424c1.6-28.17 66.37-47.758 69.883-47.758c0 0-48.786 26.384-49.867 49.866c-.767 16.68 22.317 36.985 35.69 47.316h51.976c-16.454-12.325-26.478-24.92-20.426-31.885c15.54 11.066 33.115 22.438 51.826 31.885h106.717c-56.74-15.988-102.683-32.67-115.225-53.127c-10.196-16.63 72.362-27.836 60.408-78.902c-5.79-24.738-58.24-41.094-203.222-62.626c-25.368-3.768 134.358-19.456 129.818-57.11c-2.65-21.98-103.288-26.85-114.58-36.933c-4.746-4.237 5.863-29.56 29.137-34.974zM91.425 308.056c33.376-.145 84.385 22.424 122.8 36.747l-1.79 11.67c-28.404-10.606-103.905-37.464-127.442-48.077c2.06-.22 4.207-.332 6.432-.34m270.234 53.803q.156-.01-.015.253c3.9 12.183-21.487 44.05-61.807 42.842c14.153-7.15 59.732-43.004 61.822-43.096z"
                    />
                  </svg>
                )}
                {index === 3 && (
                  // <HikingIcon sx={{ color: "#3498DB" }} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <rect width="512" height="512" fill="none" />
                    <path
                      fill="#815836"
                      d="M346.951 24.582L299.193 72.34l-101.136-7.024l-40.97 80.737l68.688 25.35l37.153-19.936l8.511 15.861l-44.293 23.768l-79.7-29.416l-70.19 55.341l35.117 58.995l-.375.2l13.014 21.585l29.134 2.361l55.06-35.123l9.679 15.176l-60.16 38.377l-44.364-3.596l-18.23-30.234l-56.8 30.586l33.712 61.804l-33.713 40.735L18 444.177V494h170.62l-5.6-45.592a261 261 0 0 1-5.147-4.512c-4.186-3.761-5.89-5.444-8.027-7.484l-73.13 21.797l-21.339-20.484l12.467-12.985l13.777 13.225l73.068-21.78l3.784 3.667s4.24 4.09 9.216 8.636l37.797-37.248l8.133 79.54l6.3-93.444l10.364 28.387l6.281-45.112l3.14-3.091l-.29-.233l22.486-27.974l.465-.907l.188.096l11.453-14.248l14.03 11.277l-9.122 11.348l67.803 34.715l27.008-9.489l22.478 17.71l22.924-12.036l8.367 15.938l-33.262 17.46l-23.875-18.81l-24.964 8.772l-9.584-4.907l39.04 87.842L383.923 494H494v-28.512L462.713 478.2l-6.776-16.678L494 446.06V211.176l-23.438-26.463l-21.654-67.371l-33.547 32.666l-107.77-13.873l-28.019-29.096l12.967-12.486l23.629 24.539l92.867 11.953l31.442-30.615l-52.79-61.801zm27.53 177.74l34.177 41.428l28.863-6.56l-4.136-13.59l17.22-5.243l9.77 32.098l-58.543 13.307l-31.377-38.033l-33.086 19.853l-9.262-15.436z"
                    />
                  </svg>
                )}
                {index === 4 && <Landscape sx={{ color: "#ff9d22" }} />}
                {index === 5 && (
                  // <GolfCourseIcon sx={{ color: "#198532" }} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <rect width="512" height="512" fill="none" />
                    <path
                      fill="#248a4b"
                      d="M416.104 18A88 84.324 0 0 0 494 99.674V18zM128 137c-42.657 0-79.727 10.965-110 25.322v128.002c30.184-5.45 59.138-8.394 86.82-9.08c50.9-1.26 97.525 5.05 139.744 17.12c42.768-27.11 86.74-52.815 134.387-73.048C304.435 169.018 211.563 137 128 137m366 71.98c-85.695 15.81-157.66 53.443-226.953 96.485c22.08 7.666 42.85 16.937 62.283 27.537c73.712 40.21 128.137 99.163 162.81 160.998H494zm-373.03 90.008q-7.792-.051-15.738.15c-27.682.703-56.767 3.78-87.232 9.5V494h453.242c-33.246-55.78-83.587-108.678-150.53-145.195c-55.257-30.142-121.817-49.31-199.743-49.817z"
                    />
                  </svg>
                )}
                {index === 6 && <ForestIcon sx={{ color: "#198532" }} />}
                {index === 7 && <Kayaking sx={{ color: "#3498DB" }} />}
                {index === 8 && <TerrainIcon sx={{ color: "#198532" }} />}
                {index === 9 && (
                  // <PoolIcon sx={{ color: "#3498DB" }} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      fill="#3498DB"
                      d="M20 20c-1.39 0-2.78-.47-4-1.33c-2.44 1.71-5.56 1.71-8 0C6.78 19.53 5.39 20 4 20H2v2h2c1.37 0 2.74-.35 4-1c2.5 1.3 5.5 1.3 8 0c1.26.65 2.62 1 4 1h2v-2m-2-4c-1.39 0-2.78-.47-4-1.33c-2.44 1.71-5.56 1.71-8 0C6.78 15.53 5.39 16 4 16H2v2h2c1.37 0 2.74-.35 4-1c2.5 1.3 5.5 1.3 8 0c1.26.65 2.62 1 4 1h2v-2m0-14H2v2h4v12h12V4h4M9 4h2v6H9m4-2h2v6h-2Z"
                    />
                  </svg>
                )}
                <span>
                  {index === 0 && `Tất cả (${total})`}
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
        {!isLoading && selectedDiv !== 0 && (
          <DestinationTable refetch={refetch} destinations={destinations} />
        )}
        {!isLoading && selectedDiv === 0 && (
          <DestinationTotalTable
            refetch={refetch}
            destinations={destinations}
          />
        )}
      </div>
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
          <Typography whiteSpace="pre-line">{errorMsg}</Typography>
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

export default DestinationPage;
