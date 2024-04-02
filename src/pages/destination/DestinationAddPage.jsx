import "../assets/scss/productCreate.scss";
import "../assets/scss/shared.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { InputAdornment, TextField } from "@mui/material";
import Select from "react-select";
import { addPosts } from "../../services/apis/imageUploader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
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

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [position, setPosition] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [topo, setTopo] = useState("");

  const [add, { data: dataAdd, error: errorAdd }] =
    useMutation(ADD_DESTINATION);

  const { error, loading, data, refetch } = useQuery(LOAD_PROVINCES);
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["provinces"]["nodes"]) {
      res = [];
      for (let index = 0; index < data["provinces"]["nodes"].length; index++) {
        res.push({
          value: data["provinces"]["nodes"].id,
          label: `${data["provinces"]["nodes"].id}. ${data["provinces"]["nodes"].name}`,
        });
      }
      setDestinations(res);
    }
  }, [data, loading, error]);

  const handleConfirmClick = async () => {
    const imgName = await addPosts(file);

    const convertPeriods = JSON.stringify();
    const productData = {
      name,
      type,
      paymentType,
      price: parseInt(price),
      periods: periods.map((item) => item.value),
      partySize: parseInt(partySize),
      imageUrl: imgName,
      supplierId: parseInt(supplierId),
    };

    console.log(productData);

    const prodCreated = await handleAddProduct(productData);
    if (prodCreated !== null) {
      navigate(`/suppliers/${supplierId}`);
    } else {
      // Handle product creation failure
      console.error("Product creation failed");
      // Display an error message to the user
    }
  };

  return (
    <div className="edit">
      <div className="sharedTitle">
        <div className="navigation">
          <div className="left">
            <div className="return-btn">
              <Link to="/suppliers" className="navigateButton">
                <ArrowCircleLeftIcon />
                <p>Trở về</p>
              </Link>
            </div>
            <div className="return-title">
              <div className="return-header">Thêm địa điểm</div>
              <div className="return-body">
                <p>Danh sách địa điểm</p>
                <ArrowForwardIosIcon />
                <p>{supplier?.name}</p>
                <ArrowForwardIosIcon />
                <p>Thêm địa điểm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detailContainer">
        <div className="productCreate">
          <div className="left">
            <div className="image_container">
              <div className="formInput imageAdd">
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFiles([e.target.files[0]])}
                  style={{ display: "none" }}
                />
              </div>
              <img
                src={
                  file
                    ? URL.createObjectURL(file[0])
                    : "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <div className="details">
              <div className="detailItem">
                <span className="itemKey">Tên dịch vụ:</span>
                <TextField
                  id="outlined-disabled"
                  color="success"
                  // label="Số người"
                  className="basic-single"
                  type="text"
                  // defaultValue={200000}
                  placeholder="Nhập tên dịch vụ"
                  size="small"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="detailItem">
                <span className="itemKey">Loại dịch vụ:</span>
                <Select
                  placeholder={"Chọn loại dịch vụ"}
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isClearable={false}
                  name="service"
                  options={prod}
                  onChange={(e) => {
                    setType(e.value);
                    if (e.value == "FOOD" || e.value == "BEVERAGE") {
                      setDisabledPayment(false);
                      setPayment([paymentOptions[1]]);
                    } else {
                      setDisabledPayment(false);
                      setPayment([paymentOptions[0]]);
                    }
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#58D68D",
                      primary: "#28B463",
                    },
                  })}
                />
              </div>

              <div className="detailItem">
                <span className="itemKey">Hình thức thanh toán:</span>
                <Select
                  placeholder={"Chọn hình thức thanh toán"}
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={disabledPayment}
                  isClearable={false}
                  name="paymentType"
                  options={payment}
                  onChange={(e) => {
                    setPaymentType(e.value);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#58D68D",
                      primary: "#28B463",
                    },
                  })}
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">Đơn giá:</span>
                <TextField
                  id="outlined-disabled"
                  // label="Số người"
                  className="basic-single"
                  type="text"
                  // defaultValue={200000}
                  placeholder="Nhập đơn giá"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">đ</InputAdornment>
                    ),
                  }}
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  color="success"
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">Thời gian phục vụ:</span>
                <Select
                  placeholder={"Chọn thời gian phục vụ"}
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isClearable={false}
                  name="periods"
                  isMulti
                  options={periodOptions}
                  onChange={(e) => {
                    setPeriods(e);
                    console.log(e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#58D68D",
                      primary: "#28B463",
                    },
                  })}
                />
              </div>
              <div className="detailItem">
                <span className="itemKey">Phù hợp với:</span>
                <TextField
                  id="outlined-disabled"
                  // label="Số người"
                  className="basic-single"
                  type="text"
                  // defaultValue={200000}
                  placeholder="Nhập số người phù hợp"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">người</InputAdornment>
                    ),
                  }}
                  size="small"
                  name="partySize"
                  onChange={(e) => {
                    setPartySize(e.target.value);
                  }}
                  color="success"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="prodTitle">
          <button
            className="link"
            onClick={async () => {
              handleConfirmClick();
            }}
          >
            <ThumbUpAltIcon />
            <p>Xác nhận</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationAddPage;
