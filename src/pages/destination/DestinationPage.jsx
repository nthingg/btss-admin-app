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
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_FILTER,
  IMPORT_EXCEL_DESTINATION,
} from "../../services/graphql/destination";
import { BikeScooter } from "@mui/icons-material";
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
  const [add, { data: dataAdd, error: errorAdd }] = useMutation(
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
            placeholder="Tìm kiếm ..."
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
          <button className="link">
            <FilterAltIcon />
          </button>
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
                {index === 7 && <RowingIcon sx={{ color: "#3498DB" }} />}
                {index === 8 && <TerrainIcon sx={{ color: "#3498DB" }} />}
                {index === 9 && <PoolIcon sx={{ color: "#3498DB" }} />}
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

        {selectedDiv !== 0 && (
          <DestinationTable refetch={refetch} destinations={destinations} />
        )}
        {selectedDiv === 0 && (
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
