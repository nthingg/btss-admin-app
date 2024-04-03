import "../../assets/scss/productCreate.scss";
import "../../assets/scss/shared.scss";
import AddressForm from "../../components/map/AddressForm";
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
import {
  ADD_DESTINATION,
  LOAD_PROVINCES,
} from "../../services/graphql/destination";

const DestinationAddPage = () => {
  const navigate = useNavigate();

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
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [position, setPosition] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [topo, setTopo] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const [add, { data: dataAdd, error: errorAdd }] =
    useMutation(ADD_DESTINATION);

  const { error, loading, data, refetch } = useQuery(LOAD_PROVINCES);
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["provinces"]["nodes"]) {
      let res = data.provinces.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return {
          value: data["provinces"]["nodes"][index].id,
          label: `${index + 1}. ${data["provinces"]["nodes"][index].name}`,
        };
      });
      setProvinces(res);
    }
  }, [data, loading, error]);

  const handleConfirmClick = async () => {
    let imagePath = [];
    for (let index = 0; index < files.length; index++) {
      const imgName = await addPosts(files[index]);
      imagePath.push(imgName);
    }

    const loc = JSON.parse(localStorage.getItem("loc"));
    const address = localStorage.getItem("address");

    let acts = [];
    for (let index = 0; index < activities.length; index++) {
      acts.push(activities[index].value);
    }

    let seas = [];
    for (let index = 0; index < seasons.length; index++) {
      seas.push(seasons[index].value);
    }

    // console.log(loc);
    // console.log(address);
    // console.log(name);
    // console.log(acts);
    // console.log(topo);
    // console.log(seas);
    // console.log(description);
    // console.log(provinceId);

    const dataDestination = {
      activities: acts,
      address: address,
      coordinate: [loc.lng, loc.lat],
      description: description,
      imageUrls: imagePath,
      name: name,
      provinceId: provinceId,
      seasons: seas,
      topographic: topo,
    };

    try {
      const { data } = await add({
        variables: {
          dto: dataDestination,
        },
      });
      navigate("/destinations");
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

  const [address, setAddress] = useState({
    streetAndNumber: "",
    latitude: 10.842033810975172,
    longitude: 106.80996883068278,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
      const result = await getLocations(address.streetAndNumber, TOKEN);
      updateCoordinates(result[0].center[1], result[0].center[0]);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
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
              <div className="return-header">Thêm thông tin địa điểm</div>
              <div className="return-body">
                <p>Danh sách địa điểm</p>
                <ArrowForwardIosIcon />
                <p>Thêm địa điểm</p>
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
                  {files.map((file) => (
                    <ImageListItem key={Math.random()}>
                      <img
                        src={`${URL.createObjectURL(file)}`}
                        // srcSet={`${URL.createObjectURL(file)}`}
                        alt=""
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}

              {/* {files.map((file) => (
                <img
                  key={file}
                  src={
                    files.length > 0
                      ? URL.createObjectURL(file)
                      : "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                  }
                  alt=""
                />
              ))}
               */}
              {files.length === 0 && (
                <img
                  src={
                    "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                  }
                  alt=""
                />
              )}
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
                    res.push(e.target.files[0]);
                    setFiles(res);
                    console.log(e.target.files);
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="details">
              <div className="left">
                <div className="detailItem">
                  <span className="itemKey">Tên:</span>
                  <TextField
                    id="outlined-disabled"
                    // label="Số người"
                    className="basic-single"
                    type="text"
                    // defaultValue={200000}
                    placeholder="Nhập tên địa điểm"
                    size="small"
                    name="name"
                    sx={{
                      width: "15%",
                      "& label.Mui-focused": {
                        color: "black",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "black",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gainsboro",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="detailItem">
                  <span className="itemKey">Mùa:</span>
                  <Select
                    placeholder={"Chọn các mùa"}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isClearable={false}
                    name="seasons"
                    isMulti
                    options={seasonOptions}
                    onChange={(e) => {
                      setSeasons(e);
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
                  <span className="itemKey">Tỉnh:</span>
                  <Select
                    placeholder={"Chọn tỉnh"}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isClearable={false}
                    name="province"
                    options={provinces}
                    onChange={(e) => {
                      setProvinceId(e.value);
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
                  <span className="itemKey">Địa điểm:</span>
                  <div className="address-cont">
                    <AddressForm
                      onSubmit={handleFormSubmit}
                      address={address}
                      setAddress={setAddress}
                    />
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
                      <DialogContentText style={{ padding: "20px 0 10px 0" }}>
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
                  <span className="itemKey">Địa hình:</span>
                  <Select
                    placeholder={"Chọn địa hình"}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isClearable={false}
                    name="topographic"
                    options={topoOptions}
                    onChange={(e) => {
                      setTopo(e.value);
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
                  <span className="itemKey">Hoạt động:</span>
                  <Select
                    placeholder={"Chọn các loại hoạt động"}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isClearable={false}
                    name="activities"
                    options={activityOptions}
                    isMulti
                    onChange={(e) => {
                      setActivities(e);
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
                <span className="itemKey">Mô tả:</span>
                <TextField
                  id="outlined-disabled"
                  className="textarea"
                  multiline
                  rows={6}
                  type="text"
                  placeholder="Nhập mô tả"
                  size="small"
                  name="description"
                  sx={{
                    width: "15%",
                    "& label.Mui-focused": {
                      color: "black",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "black",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gainsboro",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button
            className="link reset"
            onClick={async () => {
              setFiles([]);
            }}
          >
            <RotateLeftIcon />
            <span>Đặt lại</span>
          </button>

          <button
            className="link confirm"
            onClick={async () => {
              handleConfirmClick();
            }}
          >
            <ThumbUpAltIcon />
            <span>Xác nhận</span>
          </button>
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
  );
};

export default DestinationAddPage;
