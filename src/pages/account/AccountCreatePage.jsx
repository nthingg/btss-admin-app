import "../../assets/scss/shared.scss";
import "../../assets/scss/accounts.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import Select from "react-select";
import { addPosts } from "../../services/apis/imageUploader";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_STAFF,
  GET_PROVIDER_BRIEF_BY_ID,
  LOAD_PROVIDER,
  LOAD_PROVIDER_INIT,
} from "../../services/graphql/account";

const AccountCreatePage = () => {
  const navigate = useNavigate();

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [file, setFile] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(null);
  const [errorMsg, setErrMsg] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //error
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [nameFinErr, setNameFinErr] = useState(true);
  const [emailFinErr, setEmailFinErr] = useState(true);

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnack = () => {
    setSnackbarOpen(false);
  };

  const [
    getProvidersInit,
    { loading: loadingInit, error: errorInit, data: dataInit },
  ] = useLazyQuery(LOAD_PROVIDER_INIT);

  const [getProviders, { loading, error, data }] = useLazyQuery(LOAD_PROVIDER);

  const [
    getProviderBrief,
    {
      loading: loadingProviderBrief,
      error: errorProviderBrief,
      data: dataProviderBrief,
    },
  ] = useLazyQuery(GET_PROVIDER_BRIEF_BY_ID);

  const fetchData = async () => {
    const { data } = await getProvidersInit();

    let providersData = data.noAccountProviders.edges;

    if (data.noAccountProviders.pageInfo.hasNextPage === true) {
      let check = true;
      let currentEndCursor = data.noAccountProviders.pageInfo.endCursor;
      while (check) {
        const { data: dataRefetch } = await getProviders({
          variables: { cursor: currentEndCursor },
        });

        providersData = providersData.concat(
          dataRefetch.noAccountProviders.edges
        );

        if (dataRefetch.noAccountProviders.pageInfo.hasNextPage === true) {
          currentEndCursor = dataRefetch.noAccountProviders.pageInfo.endCursor;
        } else {
          check = false;
        }
      }
    }

    let res = providersData.map((provider, index) => {
      return {
        value: provider.node.id,
        label: `${index + 1}. ${provider.node.name}`,
      };
    });
    setProviders(res);
    console.log("Component mounted!");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [
    create,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_STAFF);

  const handleConfirmClick = async () => {
    const dataAccount = {
      providerId: providerId,
      email: email,
      name: accountName,
    };

    console.log(dataAccount);

    try {
      const { data } = await create({
        variables: {
          dto: dataAccount,
        },
      });
      navigate(`/accounts`);
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClick();
      localStorage.removeItem("errorMsg");
    }
  };

  return (
    <div className="acc-create">
      <div className="shared-title">
        <div className="navigation">
          <div className="left">
            <div className="return-btn">
              <Link to={`/accounts`} className="navigateButton">
                <ArrowCircleLeftIcon />
                <p>Trở về</p>
              </Link>
            </div>
            <div className="return-title">
              <div className="return-header">Thêm tài khoản nhà cung cấp</div>
              <div className="return-body">
                <p>Danh sách tài khoản</p>
                <ArrowForwardIosIcon />
                <p>Thêm tài khoản</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="create-cont">
        <div className="create-cont-header">
          <div className="right">
            <div className="details">
              <div className="left">
                <div className="detailItem">
                  <span className="itemKey">
                    Tên tài khoản<span style={{ color: "red" }}>*</span>:
                  </span>
                  <TextField
                    id="outlined-disabled"
                    className="basic-single"
                    type="text"
                    placeholder="Nhập tên tài khoản"
                    size="small"
                    name="accountName"
                    sx={{
                      width: "15%",
                    }}
                    error={nameError}
                    helperText={nameHelperText}
                    onChange={(e) => {
                      if (e.target.value.length < 4) {
                        setNameError(true);
                        setNameHelperText("Tên tài khoản gồm ít nhất 4 kí tự");
                        setNameFinErr(true);
                      } else if (e.target.value.length > 30) {
                        setNameError(true);
                        setNameHelperText(
                          "Tên tài khoản gồm nhiều nhất 30 kí tự"
                        );
                        setNameFinErr(true);
                      } else {
                        setNameError(false);
                        setNameHelperText("");
                        setNameFinErr(false);
                        setAccountName(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Email<span style={{ color: "red" }}>*</span>:
                  </span>
                  <TextField
                    id="outlined-disabled"
                    className="basic-single"
                    type="text"
                    placeholder="Nhập email"
                    size="small"
                    name="partySize"
                    sx={{
                      width: "15%",
                    }}
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={(e) => {
                      if (
                        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
                      ) {
                        setEmailError(true);
                        setEmailHelperText("Email sai định dạng");
                        setEmailFinErr(true);
                      } else {
                        setEmailError(false);
                        setEmailHelperText("");
                        setEmailFinErr(false);
                        setEmail(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="right">
                <div className="rightCont">
                  <div className="detailItem">
                    <span className="itemKey">Nhà cung cấp:</span>
                    <Select
                      placeholder={"Không có dữ liệu"}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={true}
                      name="province"
                      options={providers}
                      onChange={async (e) => {
                        if (e) {
                          setProviderId(e.value);
                          const { data } = await getProviderBrief({
                            variables: { id: e.value },
                          });

                          let type = "";
                          switch (data.providers.nodes[0].type) {
                            case "FOOD_STALL":
                              type = "Quán ăn";
                              break;
                            case "HOTEL":
                              type = "Khách sạn";
                              break;
                            case "MOTEL":
                              type = "Nhà nghỉ";
                              break;
                            case "RESTAURANT":
                              type = "Nhà hàng";
                              break;
                            case "VEHICLE_RENTAL":
                              type = "Thuê xe";
                              break;
                            default:
                              type = data.providers.nodes[0].type;
                              break;
                          }

                          setType(type);
                          setAddress(data.providers.nodes[0].address);
                          setFile(
                            `https://d38ozmgi8b70tu.cloudfront.net${data.providers.nodes[0].imagePath}`
                          );
                        } else {
                          setProviderId(null);
                          setType("");
                          setAddress("");
                          setFile("");
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
                    <span className="itemKey">Danh mục:</span>
                    <TextField
                      id="outlined-disabled"
                      className="basic-single"
                      type="text"
                      placeholder="Không có dữ liệu"
                      size="small"
                      name="type"
                      value={type}
                      disabled={true}
                      sx={{
                        width: "15%",
                      }}
                    />
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Địa chỉ nhà cung cấp:</span>
                    <TextField
                      id="outlined-disabled"
                      className="basic-single"
                      type="text"
                      placeholder="Không có dữ liệu"
                      size="small"
                      value={address}
                      disabled={true}
                      name="address"
                      sx={{
                        width: "15%",
                      }}
                    />
                  </div>
                </div>
                <div className="leftCont">
                  <div className="detailItem">
                    <span className="itemKey">Hình ảnh:</span>
                    <div className="image_container">
                      <img
                        src={
                          file
                            ? file
                            : "https://vinhphucwater.com.vn/wp-content/uploads/2023/05/no-image.jpg"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-group">
          {(nameFinErr || emailFinErr) && (
            <button className="link deny">
              <ThumbUpAltIcon />
              <span>Xác nhận</span>
            </button>
          )}
          {!nameFinErr && !emailFinErr && (
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

export default AccountCreatePage;
