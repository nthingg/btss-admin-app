import "../../assets/scss/accounts.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuery } from "@apollo/client";
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
  LOAD_TRAVELER_ACCOUNT_FILTER,
} from "../../services/graphql/account";
import AccountTable from "../../components/tables/AccountTable";
import Slider from "react-slick";

const AccountPage = () => {
  const accountRole = ["TRAVELER", "PROVIDER", "STAFF"];
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(accountRole[0]);
  const [accountQuery, setAccoutQuery] = useState(LOAD_ACCOUNTS_FILTER);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearchTerm, setPhoneSearchTerm] = useState("");
  const [searchedTraveler, setSearchedTraveler] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (index) => {
    setSelectedDiv(index);
    switch (index) {
      case 0:
        if (searchTerm !== "") {
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
  } = useQuery(LOAD_ACCOUNTS, {
    variables: {
      searchTerm: searchTerm
    }
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
      fetchNumberAccount(dataTotal["accounts"]["nodes"]);
      setIsLoading(false);
    }
  }, [dataTotal, loadingTotal, errorTotal]);

  const fetchNumberAccount = (data) => {
    let countTraveler = 0;
    for (const item of data) {
      if (item["role"] === "TRAVELER" && item["plans"]) {
        countTraveler++;
      }
    }

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

    setTravelers(countTraveler);
    setSuppliers(countSupplier);
    setStaffs(countStaff);
  }

  const { error, loading, data, refetch } = useQuery(accountQuery, {
    variables: {
      role: selectedStatus,
      searchTerm: searchTerm,
      phone: phoneSearchTerm
    },
  });

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    if (!loading && !error && data && data["accounts"]["nodes"]) {
      let res = data.accounts.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setAccounts(res);
    }
  }, [data, loading, error]);

  const handleSearchSubmit = () => {
    setIsLoading(true);
    let search = document.getElementById("floatingValue").value;
    //isNaN(num): returns true if the variable does NOT contain a valid number
    if (isNaN(search)) {
      setSearchTerm(search);
    } else {
      if (search.startsWith("0")) {
        search = "84" + search.substring(1);
      }
      setAccoutQuery(LOAD_TRAVELER_ACCOUNT_FILTER);
      setSearchTerm("");
      setPhoneSearchTerm(search);
    }
    refetch();
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
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerPadding: "60px",
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
          <button className="link">
            <CloudDownloadIcon />
          </button>
          <button className="link">
            <FilterAltIcon />
          </button>
          <button
            className="link"
            onClick={() => {
              setAccoutQuery(LOAD_ACCOUNTS_FILTER);
              setSearchTerm("");
              setPhoneSearchTerm("");
              setIsLoading(true);
              refetch();
              refetchTotal();
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
          <div className="loading">
            <RestartAltIcon
              sx={{
                fontSize: 80,
                color: "#2c3d50",
              }}
            />
          </div>
        )}
        {!isLoading && selectedStatus === "TRAVELER" && <AccountTable travelers={accounts} />}
        {!isLoading && selectedStatus === "PROVIDER" && <AccountTable suppliers={accounts} />}
        {!isLoading && selectedStatus === "STAFF" && <AccountTable staffs={accounts} />}
      </div>
    </div>
  );
};

export default AccountPage;
