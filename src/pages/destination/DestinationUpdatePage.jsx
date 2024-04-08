import "../../assets/scss/productCreate.scss";
import "../../assets/scss/shared.scss";
import "../../assets/scss/dialog.scss";
import "../../assets/scss/loading.scss";
import CustomMap from "../../components/map/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import getLocations from "../../services/apis/getLocations";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MapIcon from "@mui/icons-material/Map";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Snackbar,
  TextField,
} from "@mui/material";
import Select from "react-select";
import { addPosts } from "../../services/apis/imageUploader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  ADD_DESTINATION,
  LOAD_DETAIL_DESTINATION,
  LOAD_PROVINCES,
  UDPATE_DESTINATION,
} from "../../services/graphql/destination";
import * as turf from "@turf/turf";
import { regionData } from "../../services/location/region";

const DestinationUpdatePage = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  const provinceOptions = [
    {
      value: 1,
      label: "1. An Giang",
    },
    {
      value: 2,
      label: "2. Bà Rịa - Vũng Tàu",
    },
    {
      value: 3,
      label: "3. Bạc Liêu",
    },
    {
      value: 7,
      label: "4. Bến Tre",
    },
    {
      value: 8,
      label: "5. Bình Dương",
    },
    {
      value: 9,
      label: "6. Bình Định",
    },
    {
      value: 10,
      label: "7. Bình Phước",
    },
    {
      value: 11,
      label: "8. Bình Thuận",
    },
    {
      value: 12,
      label: "9. Cà Mau",
    },
    {
      value: 14,
      label: "10. Cần Thơ",
    },
    {
      value: 16,
      label: "11. Đắk Lắk",
    },
    {
      value: 17,
      label: "12. Đắk Nông",
    },
    {
      value: 19,
      label: "13. Đồng Nai",
    },
    {
      value: 20,
      label: "14. Đồng Tháp",
    },
    {
      value: 21,
      label: "15. Gia Lai",
    },
    {
      value: 28,
      label: "16. Hậu Giang",
    },
    {
      value: 31,
      label: "17. Khánh Hòa",
    },
    {
      value: 32,
      label: "18. Kiên Giang",
    },
    {
      value: 33,
      label: "19. Kon Tum",
    },
    {
      value: 37,
      label: "20. Lâm Đồng",
    },
    {
      value: 38,
      label: "21. Long An",
    },
    {
      value: 42,
      label: "22. Ninh Thuận",
    },
    {
      value: 44,
      label: "23. Phú Yên",
    },
    {
      value: 50,
      label: "24. Sóc Trăng",
    },
    {
      value: 52,
      label: "25. Tây Ninh",
    },
    {
      value: 56,
      label: "26. TP Hồ Chí Minh",
    },
    {
      value: 58,
      label: "27. Tiền Giang",
    },
    {
      value: 59,
      label: "28. Trà Vinh",
    },
    {
      value: 61,
      label: "29. Vĩnh Long",
    },
  ];

  const activityOptions = [
    { value: "BATHING", label: "Tắm" },
    { value: "CAMPING", label: "Cắm trại" },
    { value: "CLIMBING", label: "Leo trèo" },
    { value: "DIVING", label: "Lặn" },
    { value: "FISHING", label: "Câu cá" },
    { value: "PADDLING", label: "Chèo thuyền" },
    { value: "SURFING", label: "Lướt sóng" },
  ];

  const seasonOptions = [
    { value: "SPRING", label: "Xuân" },
    { value: "SUMMER", label: "Hạ" },
    { value: "FALL", label: "Thu" },
    { value: "WINTER", label: "Đông" },
  ];

  const topoOptions = [
    { value: "BEACH", label: "Bãi biển" },
    { value: "BROOK", label: "Suối" },
    { value: "CAVE", label: "Hang động" },
    { value: "DUNE", label: "Cồn cát" },
    { value: "HILL", label: "Đồi" },
    { value: "JUNGLE", label: "Rừng" },
    { value: "LAKE", label: "Hồ" },
    { value: "MOUNTAIN", label: "Núi" },
    { value: "WATERFALL", label: "Thác" },
  ];

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [topo, setTopo] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [acceptState, setAcceptState] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  //error
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressHelperText, setAddressHelperText] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState("");
  const [seasonError, setSeasonError] = useState(false);
  const [topoError, setTopoError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [activitiesError, setActivitiesError] = useState(false);
  const [nameFinErr, setNameFinErr] = useState(false);
  const [addressFinErr, setAddressFinErr] = useState(false);
  const [descriptionFinErr, setDescriptionFinErr] = useState(false);
  const [destination, setDestination] = useState(null);
  const [provinces, setProvinces] = useState([]);
  //redirect

  const [address, setAddress] = useState({
    streetAndNumber: "",
    latitude: 10.842033810975172,
    longitude: 106.80996883068278,
  });

  const handleClick = () => {
    setSnackbarOpen(true);
  };
  const handleCloseSnack = () => {
    setSnackbarOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [update, { data: dataUpdate, error: errorUpdate }] =
    useMutation(UDPATE_DESTINATION);

  const {
    error: errDes,
    loading: loadingDes,
    data: dataDes,
  } = useQuery(LOAD_DETAIL_DESTINATION, {
    variables: {
      id: parseInt(destinationId, 10),
    },
  });

  useEffect(() => {
    if (
      !loadingDes &&
      !errDes &&
      dataDes &&
      dataDes["destinations"] &&
      dataDes["destinations"]["nodes"]
    ) {
      setDestination(dataDes["destinations"]["nodes"][0]);

      setAddress({
        streetAndNumber: dataDes["destinations"]["nodes"][0].address,
        latitude: dataDes["destinations"]["nodes"][0].coordinate.coordinates[1],
        longitude:
          dataDes["destinations"]["nodes"][0].coordinate.coordinates[0],
      });
      setAddressDetail(dataDes["destinations"]["nodes"][0].address);
      setName(dataDes["destinations"]["nodes"][0].name);
      setDescription(dataDes["destinations"]["nodes"][0].description);
      let arrFiles = [];
      for (
        let index = 0;
        index < dataDes["destinations"]["nodes"][0].imagePaths.length;
        index++
      ) {
        arrFiles.push({
          file: null,
          url: `https://d38ozmgi8b70tu.cloudfront.net${dataDes["destinations"]["nodes"][0].imagePaths[index]}`,
        });
      }
      setFiles(arrFiles);

      const seas = dataDes["destinations"]["nodes"][0].seasons;
      let seasonsInit = [];
      for (let i = 0; i < seas.length; i++) {
        for (let j = 0; j < seasonOptions.length; j++) {
          if (seasonOptions[j].value === seas[i]) {
            seasonsInit.push(seasonOptions[j]);
          }
        }
      }
      setSeasons(seasonsInit);

      const acts = dataDes["destinations"]["nodes"][0].activities;
      let actsInit = [];
      for (let i = 0; i < acts.length; i++) {
        for (let j = 0; j < activityOptions.length; j++) {
          if (activityOptions[j].value === acts[i]) {
            actsInit.push(activityOptions[j]);
          }
        }
      }
      setActivities(actsInit);

      const topo = dataDes["destinations"]["nodes"][0].topographic;
      let topoInit = null;
      for (let j = 0; j < topoOptions.length; j++) {
        if (topoOptions[j].value === topo) {
          topoInit = topoOptions[j];
        }
      }
      setTopo(topoInit);

      const prov = dataDes["destinations"]["nodes"][0].province.id;
      let provInit = null;
      for (let j = 0; j < provinceOptions?.length; j++) {
        if (provinceOptions[j].value === prov) {
          provInit = provinceOptions[j];
        }
      }
      setProvinces(provInit);
      setProvinceId(provInit.value);
    }
  }, [dataDes, loadingDes, errDes]);

  const handleConfirmClick = async () => {
    let imagePath = [];
    for (let index = 0; index < files.length; index++) {
      if (files[index].file === null) {
        imagePath.push(files[index].url);
      } else {
        const imgName = await addPosts(files[index].file);
        imagePath.push(imgName);
      }
    }

    const loc = JSON.parse(localStorage.getItem("loc"));
    const address = addressDetail;

    let acts = [];
    for (let index = 0; index < activities.length; index++) {
      acts.push(activities[index].value);
    }

    let seas = [];
    for (let index = 0; index < seasons.length; index++) {
      seas.push(seasons[index].value);
    }

    const dataDestination = {
      activities: acts,
      address: address,
      coordinate: [loc.lng, loc.lat],
      description: description,
      imageUrls: imagePath,
      name: name,
      provinceId: provinceId,
      seasons: seas,
      topographic: topo.value,
      destinationId: parseInt(destinationId, 10),
    };

    console.log(dataDestination);

    try {
      const { data } = await update({
        variables: {
          dto: dataDestination,
        },
      });
      navigate(`/destinations/${destinationId}`);
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClick();
      localStorage.removeItem("errorMsg");
    }
  };

  const TOKEN =
    "pk.eyJ1IjoicGhhbmR1eSIsImEiOiJjbGswaDQzNjgwbGJlM2Z0NXd2c2V0eTgxIn0.mu5cOmm7meqqmT7eicLbKA";

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query) => {
    const suggestions = await getLocations(query, TOKEN);

    let res = [];

    for (let index = 0; index < suggestions.length; index++) {
      let points = turf.points([
        [suggestions[index].center[0], suggestions[index].center[1]],
      ]);

      let searchWithin = turf.polygon(
        regionData.features[0].geometry.coordinates[0]
      );

      var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);

      if (ptsWithin.features.length > 0) {
        res.push(suggestions[index]);
      }
    }

    setSuggestions(res);
  };

  const handleSuggestionClick = (suggestion) => {
    // const streetAndNumber = suggestion.place_name.split(",")[0];

    if (suggestion.place_name.length < 20) {
      setAddressError(true);
      setAddressHelperText("Vị trí địa điểm gồm ít nhất 20 kí tự");
    } else if (suggestion.place_name.length > 100) {
      setAddressError(true);
      setAddressHelperText("Vị trí địa điểm gồm nhiều nhất 100 kí tự");
    } else {
      setAddressError(false);
      setAddressHelperText("");
    }

    const streetAndNumber = suggestion.place_name;
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address = {
      streetAndNumber,
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];

      address[identifier] = element.text;
    });

    const loc = {
      lng: address.longitude,
      lat: address.latitude,
    };
    localStorage.setItem("loc", JSON.stringify(loc));

    console.log(address);
    console.log(loc);

    setAddress(address);
    setAddressDetail(address.streetAndNumber);
    setSuggestions([]);
  };

  return (
    <div>
      {destination === null && (
        <div className="loading">
          <RestartAltIcon
            sx={{
              fontSize: 80,
              color: "#2c3d50",
            }}
          />
        </div>
      )}
      {destination !== null && (
        <div className="edit">
          <div className="shared-title">
            <div className="navigation">
              <div className="left">
                <div className="return-btn">
                  <Link to="/destinations" className="navigateButton">
                    <ArrowCircleLeftIcon />
                    <p>Trở về</p>
                  </Link>
                </div>
                <div className="return-title">
                  <div className="return-header">
                    Chỉnh sửa thông tin địa điểm
                  </div>
                  <div className="return-body">
                    <p>Danh sách địa điểm</p>
                    <ArrowForwardIosIcon />
                    <p>{destination?.name}</p>
                    <ArrowForwardIosIcon />
                    <p>Chỉnh sửa địa điểm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="destination-add-cont">
            <div className="destination-create">
              <div className="left">
                <div className="image_container">
                  {files.length > 0 && (
                    <ImageList
                      sx={{ width: 500, height: 450 }}
                      cols={2}
                      rowHeight={210}
                    >
                      {files.map((file, index) => (
                        <ImageListItem key={Math.random(index)}>
                          <img
                            src={`${file.url}`}
                            // srcSet={`${URL.createObjectURL(file)}`}
                            alt=""
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                  {files.length === 0 && (
                    <img
                      src={
                        "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                      }
                      alt=""
                    />
                  )}
                  <div className="img-btns">
                    <button
                      className="link reset"
                      onClick={async () => {
                        setFiles([]);
                        setImgError(true);
                      }}
                    >
                      <RotateLeftIcon />
                      <span>Đặt lại</span>
                    </button>
                    <div className="formInput imageAdd">
                      <label htmlFor="file">
                        <DriveFolderUploadOutlinedIcon className="icon" />
                        <span>Thêm ảnh</span>
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => {
                          if (files.length === 5) {
                            setErrMsg("Giới hạn hình ảnh của địa điểm là 5");
                            handleClick();
                            localStorage.removeItem("errorMsg");
                            return;
                          }
                          let res = files;
                          const imgData = {
                            file: e.target.files[0],
                            url: URL.createObjectURL(e.target.files[0]),
                          };
                          res.push(imgData);
                          setFiles(res);
                          if (res.length > 0) {
                            setImgError(false);
                          } else {
                            setImgError(true);
                          }
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="details">
                  <div className="left">
                    <div className="detailItem">
                      <span className="itemKey">
                        Tên<span style={{ color: "red" }}>*</span>:
                      </span>
                      <TextField
                        id="outlined-disabled"
                        className="basic-single"
                        type="text"
                        placeholder="Nhập tên địa điểm"
                        size="small"
                        name="name"
                        value={name}
                        error={nameError}
                        helperText={nameHelperText}
                        sx={{
                          width: "15%",
                        }}
                        onChange={(e) => {
                          if (e.target.value.length < 10) {
                            setNameError(true);
                            setNameHelperText(
                              "Tên địa điểm gồm ít nhất 10 kí tự"
                            );
                            setNameFinErr(true);
                          } else if (e.target.value.length > 50) {
                            setNameError(true);
                            setNameHelperText(
                              "Tên địa điểm gồm nhiều nhất 50 kí tự"
                            );
                            setNameFinErr(true);
                          } else {
                            setNameError(false);
                            setNameHelperText("");
                            setNameFinErr(false);
                          }
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Mùa<span style={{ color: "red" }}>*</span>:
                      </span>
                      <Select
                        placeholder={"Chọn các mùa"}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable={false}
                        name="seasons"
                        isMulti
                        value={seasons}
                        options={seasonOptions}
                        onChange={(e) => {
                          if (e.length > 0) {
                            setSeasons(e);
                            setSeasonError(false);
                          } else {
                            setSeasons([]);
                            setSeasonError(true);
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#2c3d50",
                          },
                        })}
                      />
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Tỉnh<span style={{ color: "red" }}>*</span>:
                      </span>
                      <Select
                        placeholder={"Chọn tỉnh"}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable={false}
                        name="province"
                        value={provinces}
                        options={provinceOptions}
                        onChange={(e) => {
                          setProvinceId(e.value);
                          setProvinces(e);
                          console.log(e.value);
                          if (e.value) {
                            setProvinceError(false);
                          } else {
                            setProvinceId(0);
                            setProvinceError(true);
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#2c3d50",
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="detailItem">
                      <span className="itemKey">
                        Địa điểm<span style={{ color: "red" }}>*</span>:
                      </span>
                      <div className="address-cont autoCompleteInputContainer">
                        <TextField
                          id="address"
                          className="basic-single"
                          size="small"
                          type="text"
                          placeholder="Nhập địa điểm"
                          error={addressError}
                          helperText={addressHelperText}
                          value={addressDetail}
                          onChange={(e) => {
                            if (e.target.value.length < 20) {
                              setAddressError(true);
                              setAddressFinErr(true);
                              setAddressHelperText(
                                "Vị trí địa điểm gồm ít nhất 20 kí tự"
                              );
                            } else if (e.target.value.length > 100) {
                              setAddressError(true);
                              setAddressFinErr(true);
                              setAddressHelperText(
                                "Vị trí địa điểm gồm nhiều nhất 100 kí tự"
                              );
                            } else {
                              setAddressError(false);
                              setAddressFinErr(false);
                              setAddressHelperText("");
                            }
                            setAddressDetail(e.target.value);
                            handleChange(e);
                          }}
                          sx={{
                            width: "15%",
                          }}
                          onBlur={() => {
                            setTimeout(function () {
                              setSuggestions([]);
                            }, 500);
                          }}
                        />
                        <ul className="addressSuggestions">
                          {suggestions?.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                handleSuggestionClick(suggestion);
                                console.log("alo");
                              }}
                            >
                              {suggestion.place_name}
                            </li>
                          ))}
                        </ul>
                        <IconButton
                          className="mapBtn"
                          color="info"
                          onClick={handleClickOpen}
                        >
                          <MapIcon />
                        </IconButton>
                      </div>

                      <Dialog
                        open={open}
                        onClose={() => {
                          setOpen(false);
                        }}
                        maxWidth={false}
                      >
                        <DialogTitle
                          backgroundColor={"#2c3d50"}
                          color={"white"}
                          fontWeight={600}
                        >
                          Bản đồ
                        </DialogTitle>
                        <DialogContent style={{ width: 1000, height: 600 }}>
                          <DialogContentText
                            style={{ padding: "20px 0 10px 0" }}
                          >
                            Chi tiết địa điểm:
                          </DialogContentText>
                          {address.longitude && address.latitude && (
                            <CustomMap
                              longitude={address.longitude}
                              latitude={address.latitude}
                              updateCoordinates={updateCoordinates}
                            />
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Đóng</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Địa hình<span style={{ color: "red" }}>*</span>:
                      </span>
                      <Select
                        placeholder={"Chọn địa hình"}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable={false}
                        name="topographic"
                        value={topo}
                        options={topoOptions}
                        onChange={(e) => {
                          setTopo(e);
                          console.log(e);
                          if (e.value) {
                            setTopoError(false);
                          } else {
                            setTopo("");
                            setTopoError(true);
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#2c3d50",
                          },
                        })}
                      />
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Hoạt động<span style={{ color: "red" }}>*</span>:
                      </span>
                      <Select
                        placeholder={"Chọn các loại hoạt động"}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        value={activities}
                        isClearable={false}
                        name="activities"
                        options={activityOptions}
                        isMulti
                        onChange={(e) => {
                          if (e.length > 0) {
                            setActivities(e);
                            setActivitiesError(false);
                          } else {
                            setActivities([]);
                            setActivitiesError(true);
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#2c3d50",
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="detailItem description">
                    <span className="itemKey">
                      Mô tả<span style={{ color: "red" }}>*</span>:
                    </span>
                    <TextField
                      id="outlined-disabled"
                      className="textarea"
                      multiline
                      rows={6}
                      type="text"
                      placeholder="Nhập mô tả"
                      size="small"
                      name="description"
                      error={descriptionError}
                      helperText={descriptionHelperText}
                      value={description}
                      sx={{
                        width: "15%",
                      }}
                      onChange={(e) => {
                        if (e.target.value.length < 100) {
                          setDescriptionError(true);
                          setDescriptionHelperText(
                            "Mô tả địa điểm gồm ít nhất 100 kí tự"
                          );
                          setDescriptionFinErr(true);
                        } else if (e.target.value.length > 999) {
                          setDescriptionError(true);
                          setDescriptionHelperText(
                            "Mô tả địa điểm gồm nhiều nhất 999 kí tự"
                          );
                          setDescriptionFinErr(true);
                        } else {
                          setDescriptionError(false);
                          setDescriptionHelperText("");
                          setDescriptionFinErr(false);
                        }
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              {!nameFinErr &&
                !imgError &&
                !addressFinErr &&
                !seasonError &&
                !topoError &&
                !provinceError &&
                !activitiesError &&
                !descriptionFinErr && (
                  <button
                    className="link confirm"
                    onClick={async () => {
                      handleConfirmClick();
                    }}
                  >
                    <ThumbUpAltIcon />
                    <span>Xác nhận</span>
                  </button>
                )}

              {(nameFinErr ||
                imgError ||
                addressFinErr ||
                seasonError ||
                topoError ||
                provinceError ||
                activitiesError ||
                descriptionFinErr) && (
                <button className="link deny">
                  <ThumbUpAltIcon />
                  <span>Xác nhận</span>
                </button>
              )}
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={snackbarOpen}
            onClose={handleCloseSnack}
            autoHideDuration={2000}
            key={vertical + horizontal}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMsg}
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default DestinationUpdatePage;
