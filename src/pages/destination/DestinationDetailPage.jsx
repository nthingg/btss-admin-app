import "../../assets/scss/destinations.scss";
import "../../assets/scss/shared.scss";
import "../../assets/scss/loading.scss";
import EditIcon from "@mui/icons-material/Edit";
import StaticMap from "../../components/map/StaticMap";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { LOAD_DETAIL_DESTINATION } from "../../services/graphql/destination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EmergencyTable from "../../components/tables/EmergencyTable";
import MapIcon from "@mui/icons-material/Map";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlanTable from "../../components/tables/PlanTable";
import { LOAD_DESTINATION_PLANS } from "../../services/graphql/plan";
import ProviderTable from "../../components/tables/ProviderTable";
import ReadMore from "../../components/others/ReadMoreComponent";

const DestinationDetailPage = () => {
  const initQuery = gql`
    {
      providers(
        where: {
          coordinate: {
            distance: {
              geometry: { type: Point, coordinates: [0, 0], crs: 4326 }
              buffer: 0.09138622285234489
              eq: 0
            }
          }
          type: { eq: EMERGENCY }
        }
        order: { id: DESC }
      ) {
        nodes {
          id
          name
          address
          phone
          imagePath
          coordinate {
            coordinates
          }
        }
      }
    }
  `;

  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [emergencies, setEmergencies] = useState([]);
  const [activities, setActivities] = useState("");
  const [seasons, setSeasons] = useState("");
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [emerQuery, setEmerQuery] = useState(initQuery);
  const [plans, setPlans] = useState([]);

  const containerStyle = {
    width: "950px",
    height: "400px",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { error, loading, data, refetch } = useQuery(LOAD_DETAIL_DESTINATION, {
    variables: {
      id: parseInt(destinationId, 10),
    },
  });

  refetch();

  const {
    error: errorProvider,
    loading: loadingProvider,
    data: dataProvider,
    refetch: refetchProvider,
  } = useQuery(emerQuery);

  useEffect(() => {
    refetchProvider();
  }, [emerQuery]);

  useEffect(() => {
    if (
      !loadingProvider &&
      !errorProvider &&
      dataProvider &&
      dataProvider["providers"] &&
      dataProvider["providers"]["nodes"]
    ) {
      let res = dataProvider.providers.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 }; // Add the index to the object
      });
      setEmergencies(res);
    }
  }, [dataProvider, loadingProvider, errorProvider]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data["destinations"] &&
      data["destinations"]["nodes"]
    ) {
      setDestination(data["destinations"]["nodes"][0]);

      let acts = "";
      for (
        let index = 0;
        index < data["destinations"]["nodes"][0]["activities"].length;
        index++
      ) {
        switch (data["destinations"]["nodes"][0]["activities"][index]) {
          case "BATHING":
            acts += "Tắm, ";
            break;
          case "CAMPING":
            acts += "Cắm trại, ";
            break;
          case "CLIMBING":
            acts += "Leo trèo, ";
            break;
          case "DIVING":
            acts += "Lặn, ";
            break;
          case "FISHING":
            acts += "Câu cá, ";
            break;
          case "PADDLING":
            acts += "Chèo thuyền, ";
            break;
          case "SURFING":
            acts += "Lướt sóng, ";
            break;
          default:
            acts += "Khác, ";
            break;
        }
      }

      let seasons = "";
      for (
        let index = 0;
        index < data["destinations"]["nodes"][0]["seasons"].length;
        index++
      ) {
        switch (data["destinations"]["nodes"][0]["seasons"][index]) {
          case "SPRING":
            seasons += "Xuân, ";
            break;
          case "SUMMER":
            seasons += "Hạ, ";
            break;
          case "FALL":
            seasons += "Thu, ";
            break;
          case "WINTER":
            seasons += "Đông, ";
            break;
          default:
            seasons += "Khác, ";
            break;
        }
      }

      const lastSpaceIndex = acts.lastIndexOf(", ");
      const newString = acts.substring(0, lastSpaceIndex);
      setActivities(newString);

      const lastSpaceIndexSea = seasons.lastIndexOf(", ");
      const newStringSea = seasons.substring(0, lastSpaceIndexSea);
      setSeasons(newStringSea);

      const destination = {
        lat: data["destinations"]["nodes"][0].coordinate.coordinates[1],
        lng: data["destinations"]["nodes"][0].coordinate.coordinates[0],
      };
      setPosition(destination);

      const query = gql`
        {
          providers(
            where: {
              coordinate: {
                distance: {
                  lte: 10000, 
                  geometry:{
                    type: Point,
                    coordinates: [${data["destinations"]["nodes"][0].coordinate.coordinates[0]}, ${data["destinations"]["nodes"][0].coordinate.coordinates[1]}]
                  }
                }
              }
            }
            order: {id: DESC}
          ) {
            nodes {
              id
              name
              address
              phone
              imagePath
              coordinate {
                coordinates
              }
              type
            }
          }
        }
      `;
      setEmerQuery(query);
    }
  }, [data, loading, error]);

  const {
    error: errorPlans,
    loading: loadingPlans,
    data: dataPlans,
    refetch: refetchPlans,
  } = useQuery(LOAD_DESTINATION_PLANS, {
    variables: {
      id: parseInt(destinationId, 10),
    },
  });
  useEffect(() => {
    if (
      !loadingPlans &&
      !errorPlans &&
      dataPlans &&
      dataPlans["plans"]["nodes"]
    ) {
      let res = dataPlans.plans.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 };
      });
      setPlans(res);
    }
  }, [dataPlans, errorPlans, loadingPlans]);

  const providerQuery = gql`
    query {
      providers(
          where: {
          coordinate: {
              distance: {
              lte: 10000
              geometry: { type: Point, coordinates: [${
                destination && destination.coordinate.coordinates[0]
              }, ${destination && destination.coordinate.coordinates[1]}] }
              }
          }
          type: { in: [HOTEL, MOTEL, RESTAURANT, REPAIR, VEHICLE_RENTAL] }
          }
          order: { id: DESC }
      ) {
          nodes {
            id
            name
            address
            phone
            imagePath
            coordinate {
                coordinates
            }
            isActive
          }
      }
    }
  `;
  // const { error: errorProvi, loading: loadingProvi, data: dataProvi } = useQuery(providerQuery);
  // useEffect(() => {
  //   if (!loadingProvi && !errorProvi && dataProvi && dataProvi["providers"]["nodes"]) {
  //     let res = dataProvi.providers.nodes.map((node, index) => {
  //       const { __typename, ...rest } = node;
  //       return { ...rest, index: index + 1 };
  //     });
  //     setProviders(res);
  //   }
  // }, [dataProvi, errorProvi, loadingProvi])

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
        <div className="detailDestination">
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
                    Thông tin chi tiết địa điểm
                  </div>
                  <div className="return-body">
                    <p>Danh sách địa điểm</p>
                    <ArrowForwardIosIcon />
                    <p>Chi tiết địa điểm</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <Link
                  to={`/destinations/update/${destination?.id}`}
                  className="link"
                >
                  <EditIcon />
                  <p>Chỉnh sửa</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="detailContainer">
            <div className="destination-header">
              <div className="destination-header">
                <div className="destination-name">
                  <p>{destination?.name}</p>
                </div>
                <div className="destination-status">
                  {!destination?.isVisible && (
                    <a className="status cancelled" title="Tạm ẩn">
                      <CancelIcon />
                    </a>
                  )}
                  {destination?.isVisible && (
                    <a className="status served" title="Đang hoạt động">
                      <CheckCircleIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="destinationDetail">
              <div className="left slider-container">
                <Slider arrows={false} {...settings}>
                  {destination?.imagePaths.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        src={`https://d38ozmgi8b70tu.cloudfront.net/600x300${imageUrl}`}
                        alt=""
                      />
                    </div>
                  ))}
                </Slider>
                {/* <img src={destination?.imageUrls[0]} alt="" /> */}
              </div>
              <div className="right">
                <div className="details">
                  <div className="detailItem">
                    <span className="itemKey">Địa chỉ:</span>
                    <span className="itemValue">
                      {destination?.address}{" "}
                      <IconButton
                        className="mapBtn"
                        color="info"
                        onClick={handleClickOpen}
                      >
                        <MapIcon />
                      </IconButton>
                    </span>
                  </div>
                  {/* <div className="detailItem">
                    <span className="itemKey">Trạng thái:</span>
                    <span className="itemValue">
                      {(() => {
                        switch (destination?.isVisible) {
                          case false:
                            return "Tạm ẩn";
                          case true:
                            return "Đang hiển thị";
                          default:
                            return "Khác";
                        }
                      })()}
                    </span>
                  </div> */}
                  <div className="detailItem">
                    <span className="itemKey">Tỉnh:</span>
                    <span className="itemValue">
                      {destination?.province.name}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Địa hình:</span>
                    <span className="itemValue">
                      {(() => {
                        switch (destination?.topographic) {
                          case "BEACH":
                            return "Bãi biển";
                          case "BROOK":
                            return "Suối";
                          case "CAVE":
                            return "Hang động";
                          case "DUNE":
                            return "Cồn cát";
                          case "HILL":
                            return "Đồi";
                          case "JUNGLE":
                            return "Rừng";
                          case "LAKE":
                            return "Hồ";
                          case "MOUNTAIN":
                            return "Núi";
                          case "WATERFALL":
                            return "Thác";
                          default:
                            return "Khác";
                        }
                      })()}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Hoạt động khuyến nghị:</span>
                    <span className="itemValue">{activities}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Thời điểm lí tưởng:</span>
                    <span className="itemValue">
                      {/* {destination?.seasons.map((season) => (
                      <div
                        key={season}
                        className={`period-item ${season.toLowerCase()}`}
                      >
                        <span className="period-text">
                          {(() => {
                            switch (season) {
                              case "SPRING":
                                return "Xuân, ";
                              case "SUMMER":
                                return "Hạ, ";
                              case "FALL":
                                return "Thu, ";
                              case "WINTER":
                                return "Đông, ";
                              default:
                                return "Khác";
                            }
                          })()}
                        </span>
                      </div>
                    ))} */}
                      {seasons}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Mô tả:</span>
                    <span
                      className="itemValue"
                      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                    >
                      <ReadMore children={destination?.description} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="destination">
          <div className="item">
            <div className="reasonTable">
              <p className="title">Mô tả</p>
              <div className="body">
                <p>{destination?.description}</p>
              </div>
            </div>
          </div>
        </div> */}
            {/* <div className="bottom">
              <Accordion sx={{ boxShadow: "none", width: 1400 }}>
                <AccordionSummary
                  sx={{
                    fontSize: 24,
                    backgroundColor: "#2c3d50",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Mô tả
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f8f9f9",
                  }}
                >
                  {destination?.description}
                </AccordionDetails>
              </Accordion>
            </div> */}
            <div className="bottom">
              <Accordion sx={{ boxShadow: "none", width: 1400 }} defaultExpanded>
                <AccordionSummary
                  sx={{
                    fontSize: 24,
                    backgroundColor: "#2c3d50",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Danh sách dịch vụ xung quanh
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f8f9f9",
                  }}
                >
                  <EmergencyTable list={emergencies} />
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="bottom">
              <Accordion sx={{ boxShadow: "none", width: 1400 }} defaultExpanded>
                <AccordionSummary
                  sx={{
                    fontSize: 24,
                    backgroundColor: "#2c3d50",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Danh sách kế hoạch đã được tạo
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f8f9f9",
                  }}
                >
                  <PlanTable destinationPlans={plans} />
                </AccordionDetails>
              </Accordion>
            </div>
            {/* <div className="bottom">
              <Accordion sx={{ boxShadow: "none", width: 1400 }}>
                <AccordionSummary
                  sx={{
                    fontSize: 24,
                    backgroundColor: "#2c3d50",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "600",
                  }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Danh sách dịch vụ xung quanh
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f8f9f9",
                  }}
                >
                  <ProviderTable providers={providers} />
                </AccordionDetails>
              </Accordion>
            </div> */}
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
                Chi tiết địa điểm đến:
              </DialogContentText>
              {position.lng && position.lat && (
                <StaticMap longitude={position.lng} latitude={position.lat} />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default DestinationDetailPage;
