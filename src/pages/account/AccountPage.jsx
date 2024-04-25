import "../../assets/scss/accounts.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Link, useParams } from "react-router-dom";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  LOAD_ACCOUNTS,
  LOAD_ACCOUNTS_FILTER,
  LOAD_NON_TRAVELER_FILTER,
  LOAD_TRAVELER_ACCOUNT_FILTER,
  LOAD_TRAVELER_FILTER,
} from "../../services/graphql/account";
import AccountTable from "../../components/tables/AccountTable";
import Slider from "react-slick";
import { Box, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";

const AccountPage = () => {
  const { sbsNumber } = useParams();
  const accountRole = ["TRAVELER", "PROVIDER", "STAFF"];
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(accountRole[0]);
  const [accountQuery, setAccoutQuery] = useState(LOAD_ACCOUNTS_FILTER);
  const [totalQuery, setTotalQuery] = useState(LOAD_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearchTerm, setPhoneSearchTerm] = useState("");
  const [searchedTraveler, setSearchedTraveler] = useState(null);
  const [filterTraveler, setFilterTraveler] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        if (filterTraveler !== 'all') {
          if (filterTraveler === 'travelers') {
            setAccoutQuery(LOAD_TRAVELER_FILTER);
          } else {
            setAccoutQuery(LOAD_NON_TRAVELER_FILTER);
          }
        } else if (searchTerm !== "" || phoneSearchTerm !== "") {
          setAccoutQuery(LOAD_TRAVELER_ACCOUNT_FILTER);
        }
        setSelectedStatus(accountRole[0]);
        refetch();
        break;
      case 1:
        setAccoutQuery(LOAD_ACCOUNTS_FILTER);
        setSelectedStatus(accountRole[1]);
        refetch();
        break;
      case 2:
        setAccoutQuery(LOAD_ACCOUNTS_FILTER);
        setSelectedStatus(accountRole[2]);
        refetch();
        break;
      default:
        break;
    }
  };

  const {
    error: errorTotal,
    loading: loadingTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(filterTraveler === 'all' ? LOAD_ACCOUNTS : (filterTraveler === 'travelers' ? LOAD_ACCOUNTS_FILTER : LOAD_NON_TRAVELER_FILTER), {
    variables: {
      searchTerm: searchTerm,
    },
    fetchPolicy: "network-only"
  });

  const [accountTravelers, setTravelers] = useState(0);
  const [accountSuppliers, setSuppliers] = useState(0);
  const [accountStaffs, setStaffs] = useState(0);
  useEffect(() => {
    if (
      !loadingTotal &&
      !errorTotal &&
      dataTotal &&
      dataTotal["accounts"]["nodes"]
    ) {
      fetchNumberAccount(dataTotal["accounts"]["nodes"], false);
      setIsLoading(false);
    }
  }, [dataTotal, loadingTotal, errorTotal]);

  const fetchNumberAccount = (data, isCountTravelerOnly) => {
    let countTraveler = 0;
    for (const item of data) {
      if (item["role"] === "TRAVELER" && item["plans"]) {
        countTraveler++;
      }
    }

    setTravelers(countTraveler);

    if (!isCountTravelerOnly) {
      let countSupplier = 0;
      for (const item of data) {
        if (item["role"] === "PROVIDER") {
          countSupplier++;
        }
      }

      let countStaff = 0;
      for (const item of data) {
        if (item["role"] === "STAFF") {
          countStaff++;
        }
      }
      setSuppliers(countSupplier);
      setStaffs(countStaff);
    }
  };

  const { error, loading, data, refetch } = useQuery(accountQuery, {
    variables: {
      role: selectedStatus,
      searchTerm: searchTerm,
      phone: phoneSearchTerm,
    },
    fetchPolicy: "network-only"
  });

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["accounts"]["nodes"]) {
      let res = data.accounts.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setAccounts(res);
      if (accountQuery === LOAD_TRAVELER_ACCOUNT_FILTER || accountQuery === LOAD_TRAVELER_FILTER || accountQuery === LOAD_NON_TRAVELER_FILTER) {
        setSearchedTraveler(res);
      }
      setIsLoading(false);
    }
  }, [data, loading, error]);

  const handleSearchSubmit = () => {
    setIsLoading(true);
    let search = document.getElementById("floatingValue").value;
    //isNaN(num): returns true if the variable does NOT contain a valid number
    if (isNaN(search)) {
      setSearchTerm(search);
      setPhoneSearchTerm("");
    } else {
      if (search.startsWith("0")) {
        search = "84" + search.substring(1);
      }
      if (filterTraveler !== 'all') {
        if (filterTraveler === 'travelers') {
          setAccoutQuery(LOAD_TRAVELER_FILTER);
        } else {
          setAccoutQuery(LOAD_NON_TRAVELER_FILTER);
        }
      } else {
        setAccoutQuery(LOAD_TRAVELER_ACCOUNT_FILTER);
      }
      setSearchTerm("");
      setPhoneSearchTerm(search);
    }
    refetch();
    refetchTotal();
  };

  useEffect(() => {
    if (searchedTraveler) {
      let countTraveler = 0;
      for (const item of searchedTraveler) {
        countTraveler++;
      }
      setTravelers(countTraveler);
    }
  }, [searchedTraveler]);

  const fetchData = async () => {
    setAccoutQuery(LOAD_ACCOUNTS_FILTER);
    setSearchTerm("");
    setPhoneSearchTerm("");
    refetchTotal();
  };

  useEffect(() => {
    fetchData();
    if (sbsNumber === "1") {
      setFilterTraveler('travelers');
      setAccoutQuery(LOAD_TRAVELER_FILTER);
      refetch();
    }
  }, []);

  const [countTraveler, { }] = useLazyQuery(LOAD_TRAVELER_FILTER);
  const [countNonTraveler, { }] = useLazyQuery(LOAD_NON_TRAVELER_FILTER);

  const handleChangeFilter = async (e) => {
    const filterValue = e.target.value;
    setFilterTraveler(filterValue);
    switch (filterValue) {
      case 'all':
        setAccoutQuery(LOAD_ACCOUNTS_FILTER);
        refetch();
        break;
      case 'travelers':
        setAccoutQuery(LOAD_TRAVELER_FILTER);
        const { data: dataTravelers } = await countTraveler({
          variables: {
            role: selectedStatus,
            searchTerm: searchTerm,
            phone: phoneSearchTerm,
          }
        });
        setTravelers(dataTravelers.accounts.totalCount);
        refetch();
        break;
      case 'others':
        setAccoutQuery(LOAD_NON_TRAVELER_FILTER);
        const { data: dataNonTravelers } = await countNonTraveler({
          variables: {
            role: selectedStatus,
            searchTerm: searchTerm,
            phone: phoneSearchTerm,
          }
        });
        setTravelers(dataNonTravelers.accounts.totalCount);
        refetch();
        break;
    }
    handleClose();
  }

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerPadding: "60px",
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 430,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="account">
      <div className="shared-title">
        <div>
          <p className="title">Tài khoản</p>
          <p className="sub-title">Danh sách tài khoản</p>
        </div>
      </div>
      <div className="header">
        <div className="left">
          <input
            type="text"
            className={"form-control"}
            id="floatingValue"
            name="value"
            placeholder="Nhập tên hoặc số điện thoại..."
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
          <Link to="/accounts/add" className="link">
            <AddCircleIcon />
            <span>Thêm quản lý</span>
          </Link>
          {/* <button className="link">
            <CloudDownloadIcon />
          </button> */}
          <div>
            <button className="link" id="filterTraveler" onClick={handleOpen}>
              <FilterAltIcon />
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bộ Lọc
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="label-filter"
                    >
                      Phượt thủ
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={filterTraveler}
                      onChange={(e) => {
                        handleChangeFilter(e);
                      }}
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value="travelers"
                        control={<Radio />}
                        label="Phượt thủ"
                      />
                      <FormControlLabel
                        value="others"
                        control={<Radio />}
                        label="Khác"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Box>
            </Modal>
          </div>
          <button
            className="link"
            onClick={() => {
              setAccoutQuery(LOAD_ACCOUNTS_FILTER);
              setIsLoading(true);
              document.getElementById('floatingValue').value = "";
              setSearchTerm("");
              setPhoneSearchTerm("");
              setFilterTraveler('all');
              setSearchedTraveler(null);
              refetch();
              refetchTotal();
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className="accountContainer">
        <div className="icon-row">
          <Slider {...settings}>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`icon-item ${selectedDiv === index ? "selected" : ""
                  }`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {/* Replace with appropriate icons */}
                {index === 0 && <PersonRoundedIcon sx={{ color: "#3498DB" }} />}
                {index === 1 && (
                  <StorefrontRoundedIcon sx={{ color: "#3498DB" }} />
                )}
                {index === 2 && (
                  <ManageAccountsRoundedIcon sx={{ color: "#3498DB" }} />
                )}
                <span>
                  {index === 0 && `Du khách (${accountTravelers})`}
                  {index === 1 && `Nhà cung cấp (${accountSuppliers})`}
                  {index === 2 && `Quản lý (${accountStaffs})`}
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
        {!isLoading && selectedStatus === "TRAVELER" && (
          <AccountTable travelers={accounts} />
        )}
        {!isLoading && selectedStatus === "PROVIDER" && (
          <AccountTable suppliers={accounts} />
        )}
        {!isLoading && selectedStatus === "STAFF" && (
          <AccountTable staffs={accounts} />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
