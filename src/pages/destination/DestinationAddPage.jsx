import "../../assets/scss/productCreate.scss";
import "../../assets/scss/shared.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  ImageList,
  ImageListItem,
  InputAdornment,
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
    const imgName = await addPosts(files[0]);
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
              <div className="return-header">Thông tin chi tiết địa điểm</div>
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
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
              >
                {files.map((file) => (
                  <ImageListItem key={file}>
                    <img
                      src={`${URL.createObjectURL(file)}`}
                      srcSet={`${URL.createObjectURL(file)}`}
                      alt=""
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <img
                src={
                  files[0]
                    ? URL.createObjectURL(files[0])
                    : "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                }
                alt=""
              />
              <div className="formInput imageAdd">
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className="icon" />
                  <span>Thêm ảnh</span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    let res = files;
                    res.push(e.target.files[0]);
                    console.log(e.target.files[0]);
                    console.log(res);
                    setFiles(res);
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
                    onChange={(e) => {}}
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
                    onChange={(e) => {}}
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
                  <span className="itemKey">Địa hình:</span>
                  <Select
                    placeholder={"Chọn địa hình"}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={false}
                    isClearable={false}
                    name="topographic"
                    options={topoOptions}
                    onChange={(e) => {}}
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
                    onChange={(e) => {}}
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
              <div className="detailItem">
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
                    setName(e.target.value);
                  }}
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
