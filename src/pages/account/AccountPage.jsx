import "../../assets/scss/accounts.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Link, useParams } from "react-router-dom";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountTable from "../../components/tables/AccountTable";
import Slider from "react-slick";
import { Box, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import client from "../../services/apollo/config";

const AccountPage = () => {
  const { sbsNumber } = useParams();
  const accountRole = ["TRAVELER", "PROVIDER", "STAFF"];
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(accountRole[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearchTerm, setPhoneSearchTerm] = useState(null);
  const [filterTraveler, setFilterTraveler] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  //count variables
  const [accountTravelers, setTravelers] = useState(0);
  const [accountSuppliers, setSuppliers] = useState(0);
  const [accountStaffs, setStaffs] = useState(0);
  //modal variables
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [accounts, setAccounts] = useState([]);
  const accountQueryInit = async (selectedRole, searchTerm, phoneQuery, filterQuery) => {
    let query = gql`
      query LoadAccountsInit {
        accounts(
          first: 100
          order: { id: DESC }
          where: { 
            ${phoneQuery}
            ${filterQuery}
          }
          dto: {
            role: ${selectedRole}
            isProviderNameSearch: false
            searchTerm: "${searchTerm}"
          }
        ) {
          edges {
            node {
              id
              name
              phone
              email
              isMale
              isActive
              prestigePoint
              provider {
                name
              }
              plans {
                id
              }
              publishedPlanCount
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  const providerSearch = async (searchTerm, phoneQuery, filterQuery) => {
    let query = gql`
      query LoadProviderInit {
        accounts(
          first: 100
          order: { id: DESC }
          where: { 
            ${phoneQuery}
            ${filterQuery}
          }
          dto: {
            role: PROVIDER
            isProviderNameSearch: true
            searchTerm: "${searchTerm}"
          }
        ) {
          edges {
            node {
              id
              name
              phone
              email
              isMale
              isActive
              prestigePoint
              provider {
                name
              }
              plans {
                id
              }
              publishedPlanCount
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    `

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  const countAccount = async (role, searchTerm, phoneQuery, filterQuery) => {
    const query = gql`
      query CountAccounts {
        accounts(
          where: { 
            ${phoneQuery}
            ${filterQuery}
          }
          dto: {
            role: ${role}
            isProviderNameSearch: false
            searchTerm: "${searchTerm}"
          }
        ) {
          totalCount
        }
      }
    `

    try {
      const result = await client.query({ query, fetchPolicy: "network-only" });
      return result.data;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClickSnackBar();
      localStorage.removeItem("errorMsg");
    }
  }

  const fetchAccount = async (role, searchTerm, phoneSearchTerm, filterValue) => {
    let phoneQuery = "";
    let filterQuery = "";
    if (phoneSearchTerm) {
      phoneQuery = `phone: { contains: "${phoneSearchTerm}" }`
    }
    if (filterValue && filterValue !== 'all') {
      if (filterValue === 'travelers') {
        filterQuery = `publishedPlanCount: { gt: 0 }`
      } else if (filterValue === 'others') {
        filterQuery = `publishedPlanCount: { lte: 0 }`
      }
    }

    const data = await accountQueryInit(role, searchTerm, phoneQuery, filterQuery);
    let accountData = data.accounts.edges;
    // if (data.plans.pageInfo.hasNextPage === true) {
    //   let check = true;
    //   let endCursor = data.plans.pageInfo.endCursor;
    //   while (check) {
    //     const dataRefetch = await planQuery(
    //       endCursor,
    //       statusQuery,
    //       searchTerm,
    //       utcDepartAtQuery,
    //       publishedQuery,
    //       onGoingQuery,
    //       ordersQuery,
    //       accountQuery
    //     );

    //     planData = planData.concat(dataRefetch.plans.edges);

    //     if (dataRefetch.plans.pageInfo.hasNextPage === true) {
    //       endCursor = dataRefetch.plans.pageInfo.endCursor;
    //     } else {
    //       check = false;
    //     }
    //   }
    // }

    if (role === "PROVIDER") {
      const dataProvider = await providerSearch(searchTerm, phoneQuery, filterQuery);
      if (dataProvider.accounts.edges.length > 0) {
        accountData = dataProvider.accounts.edges;
      }
    }

    let res = accountData.map((node, index) => {
      if (node) {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 };
      }
    });
    setAccounts(res);
    setIsLoading(false);
  }

  const fetchCountAccount = async (searchTerm, phoneSearchTerm, filterValue) => {
    let phoneQuery = "";
    let filterQuery = "";
    if (phoneSearchTerm) {
      phoneQuery = `phone: { contains: "${phoneSearchTerm}" }`
    }
    if (filterValue && filterValue !== 'all') {
      if (filterValue === 'travelers') {
        filterQuery = `publishedPlanCount: { gt: 0 }`
      } else if (filterValue === 'others') {
        filterQuery = `publishedPlanCount: { lte: 0 }`
      }
    }
    for (let role of accountRole) {
      const data = await countAccount(role, searchTerm, phoneQuery, filterQuery);
      let totalCount = data.accounts.totalCount;

      switch (role) {
        case "TRAVELER":
          setTravelers(totalCount);
          break;
        case "PROVIDER":
          const dataProvider = await providerSearch(searchTerm, phoneQuery, filterQuery);
          if (dataProvider.accounts.edges.length > 0) {
            totalCount = dataProvider.accounts.totalCount;
          }
          setSuppliers(totalCount);
          break;
        case "STAFF":
          setStaffs(totalCount);
          break;
      }
    }
    setIsLoading(false);
  }

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        fetchAccount(accountRole[0], searchTerm, phoneSearchTerm, filterTraveler);
        setSelectedStatus(accountRole[0]);
        break;
      case 1:
        fetchAccount(accountRole[1], searchTerm, phoneSearchTerm, filterTraveler);
        setSelectedStatus(accountRole[1]);
        break;
      case 2:
        fetchAccount(accountRole[2], searchTerm, phoneSearchTerm, filterTraveler);
        setSelectedStatus(accountRole[2]);
        break;
      default:
        break;
    }
  };

  // const {
  //   error: errorTotal,
  //   loading: loadingTotal,
  //   data: dataTotal,
  //   refetch: refetchTotal,
  // } = useQuery(LOAD_ACCOUNTS, {
  //   variables: {
  //     searchTerm: searchTerm,
  //   },
  //   fetchPolicy: "network-only"
  // });

  // useEffect(() => {
  //   if (
  //     !loadingTotal &&
  //     !errorTotal &&
  //     dataTotal &&
  //     dataTotal["accounts"]["nodes"]
  //   ) {
  //     fetchNumberAccount(dataTotal["accounts"]["nodes"], false);
  //     setIsLoading(false);
  //   }
  // }, [dataTotal, loadingTotal, errorTotal]);

  // const fetchNumberAccount = (data, isCountTravelerOnly) => {
  //   let countTraveler = 0;
  //   for (const item of data) {
  //     if (item["role"] === "TRAVELER" && item["plans"]) {
  //       countTraveler++;
  //     }
  //   }

  //   setTravelers(countTraveler);

  //   if (!isCountTravelerOnly) {
  //     let countSupplier = 0;
  //     for (const item of data) {
  //       if (item["role"] === "PROVIDER") {
  //         countSupplier++;
  //       }
  //     }

  //     let countStaff = 0;
  //     for (const item of data) {
  //       if (item["role"] === "STAFF") {
  //         countStaff++;
  //       }
  //     }
  //     setSuppliers(countSupplier);
  //     setStaffs(countStaff);
  //   }
  // };

  // const { error, loading, data, refetch } = useQuery(accountQuery, {
  //   variables: {
  //     role: selectedStatus,
  //     searchTerm: searchTerm,
  //     phone: phoneSearchTerm,
  //   },
  //   fetchPolicy: "network-only"
  // });

  // useEffect(() => {
  //   if (!loading && !error && data && data["accounts"]["nodes"]) {
  //     let res = data.accounts.nodes.map((node, index) => {
  //       const { __typename, ...rest } = node;
  //       return { ...rest, index: index + 1 }; // Add the index to the object
  //     });
  //     setAccounts(res);
  //   }
  // }, [data, loading, error]);

  const handleSearchSubmit = () => {
    setIsLoading(true);
    let search = document.getElementById("floatingValue").value;
    //isNaN(num): returns true if the variable does NOT contain a valid number
    if (!search) {
      setIsLoading(false);
      return;
    }
    if (isNaN(search)) {
      setSearchTerm(search);
      setPhoneSearchTerm("");
      fetchAccount(selectedStatus, search, null, filterTraveler);
      fetchCountAccount(search, null, filterTraveler);
    } else {
      if (search.startsWith("0")) {
        search = "84" + search.substring(1);
      }
      setSearchTerm("");
      setPhoneSearchTerm(search);
      fetchAccount(selectedStatus, "", search, filterTraveler);
      fetchCountAccount("", search, filterTraveler);
    }
  };

  useEffect(() => {
    if (sbsNumber === "1") {
      setFilterTraveler('travelers');
      fetchCountAccount(searchTerm, phoneSearchTerm, 'travelers');
      fetchAccount(accountRole[0], searchTerm, phoneSearchTerm, 'travelers');
    }
    else {
      fetchCountAccount(searchTerm);
      fetchAccount(accountRole[0], searchTerm);
    }
  }, []);

  const handleChangeFilter = (e) => {
    const filterValue = e.target.value;
    setFilterTraveler(filterValue);
    fetchAccount(selectedStatus, searchTerm, phoneSearchTerm, filterValue);
    fetchCountAccount(searchTerm, phoneSearchTerm, filterValue);
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
              setIsLoading(true);
              document.getElementById('floatingValue').value = "";
              setSearchTerm("");
              setPhoneSearchTerm(null);
              setFilterTraveler('all');
              fetchAccount(selectedStatus, "");
              fetchCountAccount("");
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
          <AccountTable travelers={accounts}
            fetchAccount={() => {
              fetchAccount(selectedStatus, searchTerm, phoneSearchTerm, filterTraveler)
            }} />
        )}
        {!isLoading && selectedStatus === "PROVIDER" && (
          <AccountTable suppliers={accounts}
            fetchAccount={() => {
              fetchAccount(selectedStatus, searchTerm, phoneSearchTerm, filterTraveler)
            }} />
        )}
        {!isLoading && selectedStatus === "STAFF" && (
          <AccountTable staffs={accounts}
            fetchAccount={() => {
              fetchAccount(selectedStatus, searchTerm, phoneSearchTerm, filterTraveler)
            }} />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
