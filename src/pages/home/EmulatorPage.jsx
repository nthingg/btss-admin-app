import { useEffect, useState } from "react";
import "../../assets/scss/emulator.scss";
import "../../assets/scss/shared.scss";
import Select from "react-select";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Alert, Snackbar, TextField } from "@mui/material";
import {
  CANCEL_PLAN_SIMULATOR,
  CHANGE_JOIN_METHOD_SIMULATOR,
  CHECK_NUMBERS_COMPLETED_PLANS,
  CHECK_NUMBERS_ONGOING_PLANS,
  CHECK_NUMBERS_PENDING_PLANS,
  CHECK_NUMBERS_READY_PLANS,
  CHECK_NUMBERS_REGISTERING_PLANS,
  CHECK_NUMBERS_VERIFIED_PLANS,
  CONFIRM_PLAN_SIMULATOR,
  CREATE_PLAN_SIMULATOR,
  FORCE_UPDATE_PRODUCTS_PRICE,
  GEN_MEM_SIMULATOR,
  GET_NEWEST_NAME,
  INVITE_PLANS_SIMULATOR,
  JOIN_PLAN_SIMULATOR,
  LOAD_PLANS_BY_ID_SIMULATOR,
  LOAD_PLANS_PUBLISHED_SIMULATOR,
  LOAD_PLANS_SIMULATOR,
  ORDER_CREATE_SIMULATOR,
  PUBLISH_PLAN_SIMULATOR,
  REQUEST_AUTH_SIMULATOR,
  REQUEST_OTP_SIMULATOR,
  RESET_TIME_SIMULATOR,
  SET_TIME_SIMULATOR,
  VERIFY_PLAN_SIMULATOR,
} from "../../services/graphql/simulator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { planData } from "../../assets/constants/plans";
import moment from "moment-timezone";
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATION_LOC_BY_ID,
  LOAD_DETAIL_DESTINATION,
} from "../../services/graphql/destination";
import { LOAD_PRODUCTS_BY_PROVIDER } from "../../services/graphql/products";
import client from "../../services/apollo/config";
import { v4 as uuidv4 } from "uuid";
import { companionData } from "../../assets/constants/companions";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import * as turf from "@turf/turf";
import { getDuration } from "../../services/apis/getDuration";

const EmulatorPage = () => {
  //#region Declaration
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [responseMsg, setResponseMsg] = useState([]);
  const [loadingState, setLoading] = useState(true);
  const [selectState, setSelectLoading] = useState(false);
  const [ini, setIni] = useState(true);
  const [selectedSimulator, setSelectedSimulator] = useState(0);
  const [idInputVisible, setIdInputVisible] = useState(false);
  const [joinId, setJoinId] = useState(1);
  const [joinNum, setJoinNum] = useState(1);
  const [companionsJoinNum, setCompanionsJoinNum] = useState(1);
  const [companionsHostJoinNum, setCompanionsHostJoinNum] = useState(1);
  const [companionsMassJoinNum, setCompanionsMassJoinNum] = useState(1);
  const [planNum, setPlanNum] = useState(1);
  const [registerNum, setRegisterNum] = useState(1);
  const [massPlanJoinNum, setMassPlanJoinNum] = useState(1);
  const [massTravelerJoinNum, setMassTravelerJoinNum] = useState(1);
  const [planReadyNum, setPlanReadyNum] = useState(1);
  const [planOrderNum, setPlanOrderNum] = useState(1);
  const [planVerifyNum, setPlanVerifyNum] = useState(1);
  const [planPublishNum, setPlanPublishNum] = useState(1);
  const [dateVisible, setDateVisible] = useState(false);
  const [planNumVisible, setPlanNumVisible] = useState(false);
  const [dateSimulator, setDateSimulator] = useState("");
  const [dateCreatePlanSimulator, setDateCreatePlanSimulator] = useState("");
  const [registerVisible, setRegisterVisible] = useState(false);
  const [massJoinVisible, setMassJoinVisible] = useState(false);
  const [readyNumVisible, setReadyNumVisible] = useState(false);
  const [orderNumVisible, setOrderNumVisible] = useState(false);
  const [verifyNumVisible, setVerifyNumVisible] = useState(false);
  const [publishNumVisible, setPublishNumVisible] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [isEmulatorLoading, setIsEmulatorLoading] = useState(true);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [totalMsg, setTotalMsg] = useState(0);
  const [successMsg, setSuccessMsg] = useState(0);
  const [planPeriod, setPlanPeriod] = useState(null);
  const [planDestination, setPlanDestination] = useState(null);

  const {
    error: errDestinations,
    loading: loadingDestinations,
    data: dataDestinations,
    refetch: refetchDestination,
  } = useQuery(LOAD_DESTINATIONS);
  const [destinations, setDestination] = useState(0);
  useEffect(() => {
    if (
      !loadingDestinations &&
      !errDestinations &&
      dataDestinations &&
      dataDestinations["destinations"]["nodes"]
    ) {
      setDestination(dataDestinations.destinations.nodes);
    }
  }, [dataDestinations, loadingDestinations, errDestinations]);

  const emulatorOptions = [
    {
      value: 0,
      label: "Giả lập tham gia kế hoạch theo ID.",
    },
    { value: 1, label: "Giả lập tạo kế hoạch." },
    {
      value: 2,
      label: "Giả lập trưởng nhóm tham gia kế hoạch.",
    },
    {
      value: 3,
      label: "Giả lập phượt thủ tham gia kế hoạch.",
    },
    {
      value: 4,
      label: "Giả lập chốt kế hoạch.",
    },
    {
      value: 5,
      label: "Giả lập đặt hàng cho kế hoạch.",
    },
    {
      value: 6,
      label: "Giả lập chỉnh sửa thời gian hệ thống.",
    },
    {
      value: 7,
      label: "Giả lập đặt lại thời gian hệ thống.",
    },
    {
      value: 8,
      label: "Giả lập check-in kế hoạch.",
    },
    {
      value: 9,
      label: "Giả lập chia sẻ kế hoạch.",
    },
    {
      value: 10,
      label: "Giả lập cập nhật giá sản phẩm trong hệ thống.",
    },
  ];

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const [planConfirm, { data: dataConfirm, error: errorConfirm }] = useMutation(
    CONFIRM_PLAN_SIMULATOR
  );

  const [publish, { data: dataPublish, error: errorPublish }] = useMutation(
    PUBLISH_PLAN_SIMULATOR
  );

  const [
    getDestination,
    {
      error: errDestination,
      loading: loadingDestination,
      data: dataDestination,
    },
  ] = useLazyQuery(LOAD_DETAIL_DESTINATION);

  const {
    error,
    loading,
    data,
    refetch: refetchAccounts,
  } = useQuery(GEN_MEM_SIMULATOR);

  const [rqOTP, { data: dataRqOTP, error: errorRqOTP }] = useMutation(
    REQUEST_OTP_SIMULATOR
  );

  const [rqAuth, { data: dataRqAuth, error: errorRqAuth }] = useMutation(
    REQUEST_AUTH_SIMULATOR
  );

  const [cancel, { data: dataCancel, error: errorCancel }] = useMutation(
    CANCEL_PLAN_SIMULATOR
  );

  const [checkIn, { data: dataCheckIn, error: errorCheckIn }] = useMutation(
    VERIFY_PLAN_SIMULATOR
  );

  const {
    error: errorPending,
    loading: loadingPending,
    data: dataPending,
    refetch: refetchPending,
  } = useQuery(CHECK_NUMBERS_PENDING_PLANS);

  const {
    error: errorRegistering,
    loading: loadingRegistering,
    data: dataRegistering,
    refetch: refetchRegistering,
  } = useQuery(CHECK_NUMBERS_REGISTERING_PLANS);

  const {
    error: errorReady,
    loading: loadingReady,
    data: dataReady,
    refetch: refetchReady,
  } = useQuery(CHECK_NUMBERS_READY_PLANS);

  const {
    error: errOngoing,
    loading: loadingOngoing,
    data: dataOngoing,
    refetch: refetchOngoing,
  } = useQuery(CHECK_NUMBERS_ONGOING_PLANS);

  const {
    error: errorVeri,
    loading: loadingVeri,
    data: dataVeri,
    refetch: refetchVeri,
  } = useQuery(CHECK_NUMBERS_COMPLETED_PLANS);

  const {
    error: errorLoadPlans,
    loading: loadingLoadPlans,
    data: dataLoadPlans,
    refetch: refetchLoadPlans,
  } = useQuery(LOAD_PLANS_SIMULATOR, {
    variables: {
      id: 0,
      status: "PENDING",
    },
  });

  const {
    error: errorLoadPublishedPlans,
    loading: loadingLoadPublishedPlans,
    data: dataLoadPublishedPlans,
    refetch: refetchLoadPublishedPlans,
  } = useQuery(LOAD_PLANS_PUBLISHED_SIMULATOR, {
    variables: {
      id: 0,
      status: "COMPLETED",
    },
  });

  const {
    error: errorLoadPlansId,
    loading: loadingLoadPlansId,
    data: dataLoadPlansId,
    refetch: refetchLoadPlansById,
  } = useQuery(LOAD_PLANS_BY_ID_SIMULATOR, {
    variables: {
      id: 0,
    },
  });

  const [join, { data: dataJoin, error: errorJoin }] =
    useMutation(JOIN_PLAN_SIMULATOR);

  const [setTime, { data: dataSetTime, error: errorSetTime }] =
    useMutation(SET_TIME_SIMULATOR);

  const [resetTime, { data: dataResetTime, error: errorResetTime }] =
    useMutation(RESET_TIME_SIMULATOR);

  const [forceUpdate, { data: dateForce, error: errorForce }] = useMutation(
    FORCE_UPDATE_PRODUCTS_PRICE
  );

  const [changeJoinMethod, { data: dataJoinMethod, error: errorJoinMethod }] =
    useMutation(CHANGE_JOIN_METHOD_SIMULATOR);

  const [create, { data: dataCreate, error: errorCreate }] = useMutation(
    CREATE_PLAN_SIMULATOR
  );

  const [createOrder, { data: dataOrder, error: errorOrder }] = useMutation(
    ORDER_CREATE_SIMULATOR
  );
  //#endregion

  const handlingAuth = async (travelerPhone, accs) => {
    try {
      const { data: dataRqOTP } = await rqOTP({
        variables: {
          dto: {
            channel: "VONAGE",
            phone: travelerPhone,
          },
        },
      });
      if (dataRqOTP) {
        const { data: dataRqAuth } = await rqAuth({
          variables: {
            dto: {
              channel: "VONAGE",
              otp: "123123",
              phone: travelerPhone,
            },
          },
        });

        for (let i = 0; i < accs.length; i++) {
          if (accs[i].phone === travelerPhone) {
            accs[i].token =
              dataRqAuth["travelerRequestAuthorize"]["accessToken"];
            break;
          }
        }
        setAccounts(accs);
        localStorage.setItem("loggedAcc", JSON.stringify(accs));
      } else {
        setErrMsg("Đăng nhập không thành công");
        handleClick();
      }
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      setErrMsg(msg);
      handleClick();
      localStorage.removeItem("errorMsg");
    }
  };

  const MassLogin = async (accs) => {
    for (let i = 0; i < accs?.length; i++) {
      await handlingAuth(accs[i].phone, accs);
    }
  };

  const {
    error: errorProduct,
    loading: loadingProduct,
    data: dataProduct,
    refetch: refetchProduct,
  } = useQuery(LOAD_PRODUCTS_BY_PROVIDER, {
    variables: {
      id: 0,
      type: ["BEVERAGE", "FOOD"],
    },
  });

  const handleCreatePlan = async (
    plan,
    count,
    acc,
    dateTime,
    tempOrders,
    period,
    schedule,
    destination
  ) => {
    try {
      let appendName = moment(dateTime).format("DDMMYYYY-HH:mm") + `_${acc.id}`;

      let destinationLoc = [
        destination.coordinate.coordinates[0],
        destination.coordinate.coordinates[1],
      ];

      const carDuration = await getDuration(
        10.841327798960252,
        106.80992590984253,
        destinationLoc[1],
        destinationLoc[0],
        "vDVXeg2sci8m0EAv3hy4A60D8xXXe9bgoRgAnYPK"
      );

      console.log(carDuration.routes[0].legs[0].duration.value);

      var durationCal = moment
        .utc(1000 * carDuration.routes[0].legs[0].duration.value)
        .format("HH:mm:ss");

      console.log(durationCal);

      console.log({
        departAt: dateTime,
        departure: plan.departure,
        destinationId: plan.destinationId,
        maxMemberCount: plan.maxMemberCount,
        maxMemberWeight: plan.maxMemberWeight,
        departureAddress: plan.departureAddress,
        name: plan.name + appendName,
        note: plan.note,
        periodCount: period,
        savedProviderIds: plan.savedProviderIds,
        schedule: schedule,
        surcharges: plan.surcharges,
        travelDuration: durationCal,
        tempOrders: tempOrders,
      });

      const { data } = await create({
        variables: {
          dto: {
            departAt: dateTime,
            departure: plan.departure,
            destinationId: plan.destinationId,
            maxMemberCount: plan.maxMemberCount,
            maxMemberWeight: plan.maxMemberWeight,
            departureAddress: plan.departureAddress,
            name: plan.name + appendName,
            note: plan.note,
            periodCount: period,
            savedProviderIds: plan.savedProviderIds,
            schedule: schedule,
            surcharges: plan.surcharges,
            travelDuration: durationCal,
            tempOrders: tempOrders,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Tạo kế hoạch",
        detail: `[${acc.name}] tạo kế hoạch [${plan.name + appendName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Tạo kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  async function fetchData(destination) {
    const query = gql`
        {
          providers(
            where: {
              coordinate: {
                distance: {
                  lte: 10000, 
                  geometry:{
                    type: Point,
                    coordinates: [${destination.coordinate.coordinates[0]}, ${destination.coordinate.coordinates[1]}]
                  }
                }
              }
              type: {nin: [GROCERY, REPAIR]}
            }
            order: {id: DESC}
            first: 100
          ) {
            nodes {
              id
              name
              address
              phone
              type
              imagePath
              coordinate {
                coordinates
              }
            }
          }
        }
      `;

    const result = await client.query({ query });
    return result.data;
  }

  function getOddNumber(min, max) {
    min = Math.ceil(min / 2) * 2;

    let per;
    do {
      per = Math.floor(Math.random() * (max - min + 1) + min);
    } while (per % 2 === 0);

    return per;
  }

  const simulateCreatePlans = async (planNum, dateTime) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let successCount = 0;

    let log = "";
    for (let i = 0; i < planNum; i++) {
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      count++;

      var arrivedAt = moment(dateTime).add({
        hours: 5,
        minutes: 30,
      });
      var arrivalTime = moment(arrivedAt).format("HH:mm:ss");

      const minCeiled = Math.ceil(4);
      const maxFloored = Math.floor(15);

      let period = getOddNumber(minCeiled, maxFloored);

      if (planPeriod !== null) {
        period = parseInt(planPeriod, 10);
      }

      if (arrivalTime >= "16:00:00" && arrivalTime < "20:00:00") {
        period++;
      }
      var maxDateLength = Math.ceil((period * 1.0) / 2);
      if (arrivalTime >= "16:00:00" && arrivalTime < "20:00:00") {
        maxDateLength++;
      }

      let random = Math.floor(Math.random() * destinations.length);

      let destination = destinations[random];

      if (planDestination !== null) {
        for (let index = 0; index < destinations.length; index++) {
          if (parseInt(planDestination, 10) === destinations[index].id) {
            destination = destinations[index];
            break;
          }
        }
      }

      const dataProvider = await fetchData(destination);

      let providers = dataProvider.providers.nodes;

      let fbProviders = [];
      let acmdationProviders = [];
      let vehicleProviders = [];
      for (let u = 0; u < providers.length; u++) {
        switch (providers[u].type) {
          case "FOOD_STALL":
            fbProviders.push(providers[u]);
            break;
          case "RESTAURANT":
            fbProviders.push(providers[u]);
            break;
          case "HOTEL":
            acmdationProviders.push(providers[u]);
            break;
          case "MOTEL":
            acmdationProviders.push(providers[u]);
            break;
          case "VEHICLE_RENTAL":
            vehicleProviders.push(providers[u]);
            break;
        }
      }

      let productAcmdation = [];
      let productFB = [];
      let productFBMorning = [];
      let productFBEve = [];
      let productVehicle = [];

      if (fbProviders.length > 0) {
        let findProvider = Math.floor(Math.random() * fbProviders.length);

        const { data: dataProduct } = await refetchProduct({
          id: fbProviders[findProvider].id,
          type: ["BEVERAGE", "FOOD"],
          period: ["MORNING"],
        });

        productFBMorning = dataProduct.products.nodes;
      }

      if (fbProviders.length > 0) {
        let findProvider = Math.floor(Math.random() * fbProviders.length);

        const { data: dataProduct } = await refetchProduct({
          id: fbProviders[findProvider].id,
          type: ["BEVERAGE", "FOOD"],
          period: ["EVENING"],
        });

        productFBEve = dataProduct.products.nodes;
      }

      if (fbProviders.length > 0) {
        let findProvider = Math.floor(Math.random() * fbProviders.length);

        const { data: dataProduct } = await refetchProduct({
          id: fbProviders[findProvider].id,
          type: ["BEVERAGE", "FOOD"],
          period: ["NOON"],
        });

        productFB = dataProduct.products.nodes;
      }

      if (vehicleProviders.length > 0) {
        let findProvider = Math.floor(Math.random() * vehicleProviders.length);

        const { data: dataProduct } = await refetchProduct({
          id: vehicleProviders[findProvider].id,
          type: ["VEHICLE"],
          period: ["NOON"],
        });

        productVehicle = dataProduct.products.nodes;
      }

      if (acmdationProviders.length > 0) {
        let findProvider = Math.floor(
          Math.random() * acmdationProviders.length
        );

        const { data: dataProduct } = await refetchProduct({
          id: acmdationProviders[findProvider].id,
          type: ["ROOM", "CAMP"],
          period: ["NOON"],
        });

        productAcmdation = dataProduct.products.nodes;
      }

      let planTempData = planData[0];

      planTempData.destinationId = destination.id;

      let contacts = [];
      for (let index = 0; index < providers.length; index++) {
        if (providers[index].type === "EMERGENCY") {
          contacts.push(providers[index].id);
        }
        if (contacts.length === 5) {
          break;
        }
      }
      planTempData.savedProviderIds = contacts;

      let tempOrders = [];
      let schedule = [];

      const [hours, minutes, seconds] = arrivalTime.split(":");
      const remainSpan = 22 - hours;

      console.log(arrivalTime);
      console.log(remainSpan);
      if (arrivalTime >= "16:00:00" && arrivalTime <= "20:00:00") {
        if (remainSpan <= 2) {
          schedule.push([planData[0].schedule[0][0]]);
        } else if (remainSpan > 2 && remainSpan <= 4) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 4 && remainSpan <= 5) {
          schedule.push([
            planData[0].schedule[0][0],
            // planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        } else {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][4],
            planData[0].schedule[0][6],
          ]);
        }
      } else if (arrivalTime >= "10:00:00" && arrivalTime < "16:00:00") {
        if (remainSpan <= 7) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][4],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 7 && remainSpan < 11) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][4],
            planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan >= 11 && remainSpan <= 12) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][2],
            planData[0].schedule[0][3],
            planData[0].schedule[0][4],
            planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        }
      } else {
        if (remainSpan <= 2) {
          schedule.push([planData[0].schedule[0][0]]);
        } else if (remainSpan > 2 && remainSpan <= 4) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 4 && remainSpan <= 5) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 5 && remainSpan <= 7) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][4],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 7 && remainSpan <= 11) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][4],
            planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        } else if (remainSpan > 11 && remainSpan <= 16) {
          schedule.push([
            planData[0].schedule[0][0],
            planData[0].schedule[0][2],
            planData[0].schedule[0][3],
            planData[0].schedule[0][4],
            planData[0].schedule[0][5],
            planData[0].schedule[0][6],
          ]);
        } else {
          schedule.push(planData[0].schedule[0]);
        }
      }

      for (let l = 1; l < maxDateLength - 1; l++) {
        schedule.push(planData[0].schedule[l]);
      }
      schedule.push(planData[0].schedule[9]);

      console.log(schedule);

      for (let z = 0; z < schedule.length; z++) {
        for (let y = 0; y < schedule[z].length; y++) {
          schedule[z][y].orderUUID = null;
        }
      }

      let tempCartAcmdation = [];
      if (productAcmdation.length > 0) {
        let numOfProducts = 1;

        for (let h = 0; h < numOfProducts; h++) {
          let random = Math.floor(Math.random() * productAcmdation.length);

          const found = tempCartAcmdation.find(
            (item) => item.key === productAcmdation[random].id
          );

          if (!found) {
            let check = true;
            let num = 0;
            while (check) {
              num++;
              if (num * productAcmdation[random].partySize >= 10) {
                check = false;
              }
            }
            tempCartAcmdation.push({
              key: productAcmdation[random].id,
              value: num,
            });
          }
        }
      }

      let tempCartFB = [];
      if (productFB.length > 0) {
        let numOfProducts = 2;

        for (let h = 0; h < numOfProducts; h++) {
          let random = Math.floor(Math.random() * productFB.length);

          const found = tempCartFB.find(
            (item) => item.key === productFB[random].id
          );

          if (!found) {
            let check = true;
            let num = 0;
            while (check) {
              num++;
              if (num * productFB[random].partySize >= 10) {
                check = false;
              }
            }
            tempCartFB.push({ key: productFB[random].id, value: num });
          }
        }
      }

      let tempCartFBMorning = [];
      if (productFBMorning.length > 0) {
        let numOfProducts = 2;

        for (let h = 0; h < numOfProducts; h++) {
          let random = Math.floor(Math.random() * productFBMorning.length);

          const found = tempCartFBMorning.find(
            (item) => item.key === productFBMorning[random].id
          );

          if (!found) {
            let check = true;
            let num = 0;
            while (check) {
              num++;
              if (num * productFBMorning[random].partySize >= 10) {
                check = false;
              }
            }
            tempCartFBMorning.push({
              key: productFBMorning[random].id,
              value: num,
            });
          }
        }
      }

      let tempCartFBEve = [];
      if (productFBEve.length > 0) {
        let numOfProducts = 2;

        for (let h = 0; h < numOfProducts; h++) {
          let random = Math.floor(Math.random() * productFBEve.length);

          const found = tempCartFBEve.find(
            (item) => item.key === productFBEve[random].id
          );

          if (!found) {
            let check = true;
            let num = 0;
            while (check) {
              num++;
              if (num * productFBEve[random].partySize >= 10) {
                check = false;
              }
            }
            tempCartFBEve.push({ key: productFBEve[random].id, value: num });
          }
        }
      }

      let tempCartVehicle = [];
      if (productVehicle.length > 0) {
        let numOfProducts = 1;

        for (let h = 0; h < numOfProducts; h++) {
          let random = Math.floor(Math.random() * productVehicle.length);

          const found = tempCartVehicle.find(
            (item) => item.key === productVehicle[random].id
          );

          if (!found) {
            let check = true;
            let num = 0;
            while (check) {
              num++;
              if (num * productVehicle[random].partySize >= 10) {
                check = false;
              }
            }
            tempCartVehicle.push({
              key: productVehicle[random].id,
              value: num,
            });
          }
        }
      }

      console.log(productFB);
      console.log(productVehicle);
      console.log(productAcmdation);

      console.log(tempCartFB);
      console.log(tempCartVehicle);
      console.log(tempCartAcmdation);

      let fixedPeriod = "NOON";

      let productsServe = [];
      if (schedule[0].length < 6) {
        for (let g = 1; g < schedule.length; g++) {
          productsServe.push(g);
        }
      } else {
        for (let g = 0; g < schedule.length; g++) {
          productsServe.push(g);
        }
      }

      let vehicleServe = [];
      let checkVehicleServe = false;
      for (let d = 0; d < schedule[0].length; d++) {
        if (schedule[0][d].type === "VISIT") {
          checkVehicleServe = true;
          break;
        }
      }
      if (checkVehicleServe) {
        for (let g = 0; g < schedule.length - 1; g++) {
          vehicleServe.push(g);
        }
      } else {
        for (let g = 1; g < schedule.length - 1; g++) {
          vehicleServe.push(g);
        }
      }

      let morningServe = [];
      for (let g = 1; g < schedule.length; g++) {
        morningServe.push(g);
      }

      let eveServe = [];
      if (schedule[0].length < 2) {
        for (let g = 1; g < schedule.length - 1; g++) {
          eveServe.push(g);
        }
      } else {
        for (let g = 0; g < schedule.length - 1; g++) {
          eveServe.push(g);
        }
      }

      const uuidFB = uuidv4();
      const uuidFBEve = uuidv4();
      const uuidFBMorning = uuidv4();
      const uuidVehicle = uuidv4();
      const uuidAcmdation = uuidv4();

      if (tempCartFB.length > 0) {
        tempOrders.push({
          uuid: uuidFB,
          cart: tempCartFB,
          note: null,
          period: fixedPeriod,
          serveDateIndexes: productsServe,
          type: "EAT",
        });
      }
      if (tempCartFBMorning.length > 0) {
        tempOrders.push({
          uuid: uuidFBMorning,
          cart: tempCartFBMorning,
          note: null,
          period: "MORNING",
          serveDateIndexes: morningServe,
          type: "EAT",
        });
      }
      if (tempCartFBEve.length > 0) {
        tempOrders.push({
          uuid: uuidFBEve,
          cart: tempCartFBEve,
          note: null,
          period: "EVENING",
          serveDateIndexes: eveServe,
          type: "EAT",
        });
      }

      if (tempCartVehicle.length > 0) {
        tempOrders.push({
          uuid: uuidVehicle,
          cart: tempCartVehicle,
          note: null,
          period: fixedPeriod,
          serveDateIndexes: vehicleServe,
          type: "VISIT",
        });
      }

      for (let m = 0; m < schedule.length; m++) {
        let haveVehicle = false;

        for (let k = 0; k < schedule[m].length; k++) {
          let fixedPeriod = "NOON";

          let checkIn = [];
          let fixedServe = [0];
          for (let g = 0; g < schedule.length; g++) {
            if (g < schedule.length - 1) {
              checkIn.push(g);
            }
          }
          fixedServe = checkIn;

          if (schedule[m][k].type === "CHECKIN") {
            if (arrivalTime >= "16:00:00" && arrivalTime <= "20:00:00") {
              fixedPeriod = "EVENING";
            } else if (arrivalTime >= "10:00:00" && arrivalTime < "16:00:00") {
              fixedPeriod = "AFTERNOON";
            }

            schedule[m][k].orderUUID = uuidAcmdation;
            tempOrders.push({
              uuid: schedule[m][k].orderUUID,
              cart: tempCartAcmdation,
              note: null,
              period: fixedPeriod,
              serveDateIndexes: fixedServe,
              type: schedule[m][k].type,
            });
          }

          if (schedule[m][k].type === "CHECKOUT") {
            schedule[m][k].orderUUID = uuidAcmdation;
          }

          if (
            schedule[m][k].type === "EAT" &&
            // m !== schedule.length - 1 &&
            schedule[m][k].shortDescription === "Ăn trưa." &&
            tempCartFB.length > 0
          ) {
            schedule[m][k].orderUUID = uuidFB;
          }

          if (
            schedule[m][k].type === "EAT" &&
            // m !== schedule.length - 1 &&
            schedule[m][k].shortDescription === "Ăn tối." &&
            tempCartFBEve.length > 0
          ) {
            schedule[m][k].orderUUID = uuidFBEve;
          }

          if (
            schedule[m][k].type === "EAT" &&
            // m !== schedule.length - 1 &&
            schedule[m][k].shortDescription === "Ăn sáng." &&
            tempCartFBMorning.length > 0
          ) {
            schedule[m][k].orderUUID = uuidFBMorning;
          }

          if (
            schedule[m][k].type === "VISIT" &&
            haveVehicle === false &&
            // m !== schedule.length - 1 &&
            tempCartVehicle.length > 0
          ) {
            schedule[m][k].orderUUID = uuidVehicle;
            haveVehicle = true;
          }
        }
      }

      console.log(schedule);
      console.log(tempOrders);

      const res = await handleCreatePlan(
        planData[0],
        count,
        loggedAcc[i],
        dateTime,
        tempOrders,
        period,
        schedule,
        destination
      );

      if (res.status) {
        successCount++;
      }
      response.push(res);
      setResponseMsg(response);
      log += `[Tạo kế hoạch] ${loggedAcc[i].name} \n`;
      setLoginMsg(log);
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  //#region Simulator

  const handleJoinPlan = async (dto, count, acc) => {
    try {
      const { data } = await join({
        variables: {
          dto: {
            companions: dto.companions,
            planId: dto.planId,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Tham gia kế hoạch",
        detail: `[${acc.name}] tham gia kế hoạch [${dto.planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Tham gia kế hoạch",
        detail: `${msg} (kế hoạch [${dto.planName}])`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const handleChangeJoinMethod = async (dto, count, acc) => {
    try {
      const { data } = await changeJoinMethod({
        variables: {
          dto: {
            planId: dto.planId,
            joinMethod: dto.joinMethod,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Thay đổi phương thức mời",
        detail: `[${acc.name}] chuyển cách tham gia của [${dto.planName}] sang [${dto.joinMethod}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Thay đổi phương thức mời",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const handleCancelPlan = async (dto, count, acc) => {
    try {
      const { data } = await cancel({
        variables: {
          id: dto.id,
        },
      });
      const response = {
        userName: acc.name,
        action: "Hủy kế hoạch",
        detail: `[${acc.name}] hủy kế hoạch [${dto.planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Hủy kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const simulateJoinAndChangeMethodPlan = async (
    numberRegistering,
    companionsNum
  ) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitRegister = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
          status: "PENDING",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;

      if (currentPlans.length > 0) {
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitRegister <= numberRegistering) {
            let companionsArr = [];
            for (let index = 0; index < companionsNum; index++) {
              companionsArr.push(companionData[companionsNum]);
            }

            const joinData = {
              companions: companionsArr.length !== 0 ? companionsArr : null,
              planId: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            let currentJoinMethod = "SCAN";
            if (currentPlans[j].joinMethod === "NONE") {
              // let random = Math.floor(Math.random() * 2);
              currentJoinMethod = "SCAN";
            } else if (currentPlans[j].joinMethod === "INVITE") {
              currentJoinMethod = "SCAN";
            }

            const changeData = {
              joinMethod: currentJoinMethod,
              planId: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            count++;
            log += `[Tham gia kế hoạch] ${loggedAcc[i].name} \n`;
            const resJoin = await handleJoinPlan(joinData, count, loggedAcc[i]);
            if (resJoin.status) {
              successCount++;
            }
            count++;
            log += `[Thay đổi phương thức tham gia] ${loggedAcc[i].name} \n`;
            const resChange = await handleChangeJoinMethod(
              changeData,
              count,
              loggedAcc[i]
            );
            if (resChange.status) {
              successCount++;
            }
            response.push(resJoin);
            response.push(resChange);

            limitRegister++;
          } else {
            const cancelData = {
              id: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            count++;
            log += `[Hủy kế hoạch] ${loggedAcc[i].name} \n`;
            const resCancel = await handleCancelPlan(
              cancelData,
              count,
              loggedAcc[i]
            );
            if (resCancel.status) {
              successCount++;
            }
            response.push(resCancel);
          }

          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const simulateMassJoinPlan = async (
    massPlan,
    massTraveler,
    companionsNum
  ) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitMassJoin = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
          status: "REGISTERING",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");

      if (currentPlans.length > 0) {
        let companionsArr = [];
        for (let index = 0; index < companionsNum; index++) {
          companionsArr.push(companionData[companionsNum]);
        }

        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitMassJoin <= massPlan) {
            let limitMember = 1;
            for (let k = 0; k < loggedAcc.length; k++) {
              if (limitMember > massTraveler) {
                break;
              }

              if (loggedAcc[k].id !== loggedAcc[i].id) {
                log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                localStorage.setItem("userToken", loggedAcc[k].token);

                const joinData = {
                  companions: companionsArr.length !== 0 ? companionsArr : null,
                  planId: currentPlans[j].id,
                  weight: 1,
                  planName: currentPlans[j].name,
                };
                count++;
                log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                const resJoin = await handleJoinPlan(
                  joinData,
                  count,
                  loggedAcc[k]
                );
                if (resJoin.status) {
                  successCount++;
                  response.push(resJoin);
                  limitMember++;
                }
              }
            }
            limitMassJoin++;
          }
          // else {
          //   const cancelData = {
          //     id: currentPlans[j].id,
          //     planName: currentPlans[j].name,
          //   };
          //   localStorage.setItem("userToken", loggedAcc[i].token);
          //   log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
          //   count++;
          //   log += `[Hủy kế hoạch] ${loggedAcc[i].name} \n`;
          //   const resCancel = await handleCancelPlan(
          //     cancelData,
          //     count,
          //     loggedAcc[i]
          //   );
          //   if (resCancel.status) {
          //     successCount++;
          //   }
          //   response.push(resCancel);
          // }

          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const handleConfirmMember = async (planId, count, acc, planName) => {
    try {
      const { data } = await planConfirm({
        variables: {
          dto: planId,
        },
      });
      const response = {
        userName: acc.name,
        action: "Chốt kế hoạch",
        detail: `[${acc.name}] chốt kế hoạch [${planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Chốt kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const simulateConfirmPlan = async (readyNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitReady = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
          status: "REGISTERING",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;

      if (currentPlans.length > 0) {
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitReady <= readyNum) {
            count++;
            log += `[Chốt kế hoạch] ${loggedAcc[i].name} \n`;
            const res = await handleConfirmMember(
              currentPlans[j].id,
              count,
              loggedAcc[i],
              currentPlans[j].name
            );
            if (res.status) {
              successCount++;
            }
            response.push(res);
            setLoginMsg(log);
            setResponseMsg(response);
            limitReady++;
          } else {
            const cancelData = {
              id: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            count++;
            log += `[Hủy kế hoạch] ${loggedAcc[i].name} \n`;
            const resCancel = await handleCancelPlan(
              cancelData,
              count,
              loggedAcc[i]
            );
            if (resCancel.status) {
              successCount++;
            }
            response.push(resCancel);
          }
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const handleOrderPlan = async (dto, count, acc) => {
    try {
      const { data } = await createOrder({
        variables: {
          dto: {
            cart: dto.cart,
            note: dto.note,
            // period: dto.period,
            planId: dto.planId,
            uuid: dto.uuid,
            // serveDates: dto.serveDates,
            // type: dto.type,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Đặt hàng cho kế hoạch",
        detail: `[${acc.name}] đặt hàng cho kế hoạch [${dto.planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Đặt hàng cho kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const simulateOrderPlan = async (orderNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitOrder = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list,
          status: "READY",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;

      if (currentPlans.length > 0) {
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitOrder > orderNum) {
            break;
          }

          console.log(currentPlans[j].tempOrders);

          for (let k = 0; k < currentPlans[j].tempOrders.length; k++) {
            if (currentPlans[j].tempOrders[k].type === "CHECKOUT") {
              continue;
            }

            count++;

            let listServeDates = [];
            for (
              let m = 0;
              m < currentPlans[j].tempOrders[k].serveDateIndexes.length;
              m++
            ) {
              var b = moment
                .utc(currentPlans[j].utcStartAt)
                .utcOffset("+07:00")
                .add(currentPlans[j].tempOrders[k].serveDateIndexes[m], "days");
              var formatted = b.format();
              listServeDates.push(formatted);
            }

            const convertedData = [];

            for (const key in currentPlans[j].tempOrders[k].cart) {
              convertedData.push({
                key: parseInt(key, 10),
                value: currentPlans[j].tempOrders[k].cart[key],
              });
            }
            console.log(currentPlans[j].tempOrders[k]);

            const orderData = {
              cart: convertedData,
              note: currentPlans[j].tempOrders[k].note,
              planId: currentPlans[j].id,
              serveDates: listServeDates,
              type: currentPlans[j].tempOrders[k].type,
              period: currentPlans[j].tempOrders[k].period,
              planName: currentPlans[j].name,
              uuid: currentPlans[j].tempOrders[k].uuid,
            };
            console.log(orderData);
            log += `[Đặt hàng cho kế hoạch] ${loggedAcc[i].name} \n`;
            const res = await handleOrderPlan(orderData, count, loggedAcc[i]);
            if (res.status) {
              successCount++;
            }
            response.push(res);
            setResponseMsg(response);
            setLoginMsg(log);
          }
          limitOrder++;
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const simulateJoinPlanByID = async (currentPlan, numJoin, companionsNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let joinByIDNum = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      if (joinByIDNum > numJoin) {
        break;
      }
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      localStorage.setItem("userToken", loggedAcc[i].token);

      let companionsArr = [];
      for (let index = 0; index < companionsNum; index++) {
        companionsArr.push(companionData[companionsNum]);
      }

      const joinData = {
        companions: companionsArr.length !== 0 ? companionsArr : null,
        planId: parseInt(currentPlan.id, 10),
        weight: 1,
        planName: currentPlan.name,
      };

      count++;
      log += `[Tham gia kế hoạch] ${loggedAcc[i].name} \n`;
      const resJoin = await handleJoinPlan(joinData, count, loggedAcc[i]);
      if (resJoin.status) {
        successCount++;
        response.push(resJoin);
        setResponseMsg(response);
        setLoginMsg(log);
        joinByIDNum++;
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const handleChangeSystemTime = async (date) => {
    try {
      const { data } = await setTime({
        variables: {
          time: date,
        },
      });
      let dt = "";
      let st = false;
      if (data) {
        st = true;
        dt = `Quản trị hệ thống thay đổi thời gian đến ${date}`;
      } else {
        dt = `Quản trị hệ thống thay đổi thời gian thất bại`;
      }
      const response = {
        userName: "Quản trị hệ thống",
        action: "Thay đổi thời gian hệ thống",
        detail: dt,
        status: st,
        id: 1,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: "Quản trị hệ thống",
        action: "Thay đổi thời gian hệ thống",
        detail: `${msg}`,
        status: false,
        id: 1,
      };
      return response;
    }
  };

  const handleResetSystemTime = async () => {
    try {
      const { data } = await resetTime();
      let dt = "";
      let st = false;
      if (data) {
        st = true;
        dt = `Quản trị hệ thống đặt lại thời gian thành công.`;
      } else {
        dt = `Quản trị hệ thống thay đổi thời gian thất bại`;
      }
      const response = {
        userName: "Quản trị hệ thống",
        action: "Đặt lại thời gian hệ thống",
        detail: dt,
        status: st,
        id: 1,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: "Quản trị hệ thống",
        action: "Đặt lại thời gian hệ thống",
        detail: `${msg}`,
        status: false,
        id: 1,
      };
      return response;
    }
  };

  const handleForceUpdateProductsPrice = async () => {
    try {
      const { data } = await forceUpdate();
      let dt = "";
      let st = false;
      if (data) {
        st = true;
        dt = `Quản trị hệ thống buộc cập nhật giá sản phẩm thành công.`;
      } else {
        dt = `Quản trị hệ thống buộc cập nhật giá sản phẩm thất bại`;
      }
      const response = {
        userName: "Quản trị hệ thống",
        action: "Cập nhật giá sản phẩm trong hệ thống",
        detail: dt,
        status: st,
        id: 1,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: "Quản trị hệ thống",
        action: "Cập nhật giá sản phẩm trong hệ thống",
        detail: `${msg}`,
        status: false,
        id: 1,
      };
      return response;
    }
  };

  const handleVerifyPlan = async (dto, count, acc, planName) => {
    try {
      const { data } = await checkIn({
        variables: {
          dto: {
            coordinate: dto.coordinate,
            planId: dto.planId,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Check-in kế hoạch",
        detail: `[${acc.name}] check-in kế hoạch [${planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Check-in kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const simulateVerifyPlan = async (verifyNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitVerify = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list,
          status: "ONGOING",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");
      localStorage.setItem("userToken", loggedAcc[i].token);

      if (currentPlans.length > 0) {
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitVerify > verifyNum) {
            break;
          }
          log += `[Đăng nhập] ${loggedAcc[i].name} \n`;

          count++;
          log += `[Check-in kế hoạch] ${loggedAcc[i].name} \n`;

          let destinationLoc = [];
          try {
            const { data } = await getDestination({
              variables: {
                id: parseInt(currentPlans[j].destination.id, 10),
              },
            });
            destinationLoc = [
              data["destinations"]["nodes"][0].coordinate.coordinates[0],
              data["destinations"]["nodes"][0].coordinate.coordinates[1],
            ];
          } catch (error) {
            console.log(error);
          }

          const verifyData = {
            planId: currentPlans[j].id,
            coordinate: destinationLoc,
          };

          const res = await handleVerifyPlan(
            verifyData,
            count,
            loggedAcc[i],
            currentPlans[j].name
          );
          if (res.status) {
            successCount++;
          }
          response.push(res);
          setLoginMsg(log);
          setResponseMsg(response);
          limitVerify++;
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };

  const handlePublishPlan = async (dto, count, acc, planName) => {
    try {
      const { data } = await publish({
        variables: {
          id: dto.planId,
        },
      });
      const response = {
        userName: acc.name,
        action: "Chia sẻ kế hoạch",
        detail: `[${acc.name}] chia sẻ kế hoạch [${planName}]`,
        status: true,
        id: count,
      };
      return response;
    } catch (error) {
      console.log(error);
      const msg = localStorage.getItem("errorMsg");
      // setErrMsg(msg);
      // handleClick();
      localStorage.removeItem("errorMsg");
      const response = {
        userName: acc.name,
        action: "Chia sẻ kế hoạch",
        detail: `${msg}`,
        status: false,
        id: count,
      };
      return response;
    }
  };

  const simulatePublishPlan = async (publishNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let successCount = 0;
    let log = "";
    let limitPublish = 1;
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPublishedPlans({
          id: loggedAcc[i].id, // Always refetches a new list,
          status: "COMPLETED",
        });
        currentPlans = data["plans"]["nodes"];
      } catch (error) {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        handleClick();
        localStorage.removeItem("errorMsg");
      }

      localStorage.setItem("checkIsUserCall", "yes");
      localStorage.setItem("userToken", loggedAcc[i].token);

      if (currentPlans.length > 0) {
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitPublish > publishNum) {
            break;
          }
          log += `[Đăng nhập] ${loggedAcc[i].name} \n`;

          count++;
          log += `[Chia sẻ kế hoạch] ${loggedAcc[i].name} \n`;

          const publishData = {
            planId: currentPlans[j].id,
          };

          const res = await handlePublishPlan(
            publishData,
            count,
            loggedAcc[i],
            currentPlans[j].name
          );
          if (res.status) {
            successCount++;
          }
          response.push(res);
          setLoginMsg(log);
          setResponseMsg(response);
          limitPublish++;
        }
      }
    }
    setTotalMsg(count);
    setSuccessMsg(successCount);
    setIsEmulatorLoading(false);
    localStorage.setItem("checkIsUserCall", "no");
  };
  //#endregion

  return (
    <div>
      <div className="emulator">
        <div className="shared-title">
          <div>
            <p className="title">Giả lập</p>
            <p className="sub-title">Giả lập hệ thống</p>
          </div>
        </div>
        <div className="emulatorContainer">
          <div className="emulator-title">
            <p>Máy ảo</p>
          </div>
          <div className="details">
            <div id="recaptcha-container"></div>
            <div className="input-field">
              <Select
                placeholder={"Chọn loại giả lập"}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                name="color"
                size="small"
                options={emulatorOptions}
                onChange={(e) => {
                  setIsLoadingVisible(false);
                  if (e != null) {
                    setSelectedSimulator(e.value);
                    //reset value
                    setJoinId("");
                    setJoinNum("");
                    setPlanNum("");
                    setRegisterNum("");
                    setMassPlanJoinNum("");
                    setMassTravelerJoinNum("");
                    setPlanReadyNum("");
                    setPlanOrderNum("");
                    setPlanVerifyNum("");
                    setCompanionsHostJoinNum("");
                    setCompanionsJoinNum("");
                    setCompanionsMassJoinNum("");
                    setPlanPublishNum("");
                    //
                    if (e.value === 0) {
                      setIdInputVisible(true);
                      setDateVisible(false);
                      setRegisterVisible(false);
                      setPlanNumVisible(false);
                      setReadyNumVisible(false);
                      setMassJoinVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 1) {
                      setPlanNumVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 2) {
                      setRegisterVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setPlanNumVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setVerifyNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 3) {
                      setMassJoinVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setReadyNumVisible(false);
                      setRegisterVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 4) {
                      setReadyNumVisible(true);
                      setMassJoinVisible(false);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 5) {
                      setOrderNumVisible(true);
                      setReadyNumVisible(false);
                      setVerifyNumVisible(false);
                      setMassJoinVisible(false);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 6) {
                      setDateVisible(true);
                      setVerifyNumVisible(false);
                      setReadyNumVisible(false);
                      setIdInputVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 8) {
                      setSelectLoading(false);
                      setVerifyNumVisible(true);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setIdInputVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    } else if (e.value === 9) {
                      setPublishNumVisible(true);
                      setRegisterVisible(false);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setPlanNumVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setVerifyNumVisible(false);
                    } else {
                      setIdInputVisible(false);
                      setVerifyNumVisible(false);
                      setReadyNumVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setPublishNumVisible(false);
                    }
                  } else {
                    setVerifyNumVisible(false);
                    setIdInputVisible(false);
                    setReadyNumVisible(false);
                    setDateVisible(false);
                    setRegisterVisible(false);
                    setPlanNumVisible(false);
                    setMassJoinVisible(false);
                    setOrderNumVisible(false);
                    setPublishNumVisible(false);
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
              {/*number of plan creating  */}
              <TextField
                style={
                  planNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planNum}
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="Số lượng kế hoạch"
                size="small"
                name="numberPlan"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPlanNum("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanNum(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanNum(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "13%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
              {/* date create plan */}
              <TextField
                id="outlined-disabled"
                style={
                  planNumVisible ? { display: "block" } : { display: "none" }
                }
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
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                className="basic-text ml-2"
                type="datetime-local"
                size="small"
                name="id"
                onChange={(e) => {
                  if (!e.target.value) {
                    setDateCreatePlanSimulator("");
                    setSelectLoading(true);
                  } else {
                    setDateCreatePlanSimulator(e.target.value);
                    setSelectLoading(false);
                  }
                }}
              />
              {/* Period  */}
              <TextField
                style={
                  planNumVisible
                    ? { display: "block", marginLeft: 50 }
                    : { display: "none", marginLeft: 50 }
                }
                id="outlined-disabled"
                className="basic-text"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="Số buổi"
                size="small"
                name="numberPlan"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPlanPeriod(null);
                  } else {
                    setPlanPeriod(e.target.value);
                  }
                }}
                fullWidth
                sx={{
                  width: "7%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
              {/* Destination  */}
              <TextField
                style={
                  planNumVisible
                    ? { display: "block", marginLeft: 20 }
                    : { display: "none", marginLeft: 20 }
                }
                id="outlined-disabled"
                className="basic-text"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="Địa điểm"
                size="small"
                name="numberPlan"
                onChange={(e) => {
                  if (!e.target.value) {
                    setPlanDestination(null);
                  } else {
                    setPlanDestination(e.target.value);
                  }
                }}
                fullWidth
                sx={{
                  width: "8%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
              {/* specific plan id to join */}
              <TextField
                style={
                  idInputVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={joinId}
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="Nhập ID"
                size="small"
                name="id"
                onChange={(e) => {
                  if (!e.target.value) {
                    setJoinId("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) <= 0) {
                    setJoinId(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setJoinId(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "8%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of traveler join to specific plan id*/}
              <TextField
                style={
                  idInputVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={joinNum}
                InputProps={{ inputProps: { min: 1 } }}
                placeholder="Số lượng phượt thủ tham gia"
                size="small"
                name="numberJoin"
                onChange={(e) => {
                  if (!e.target.value) {
                    setJoinNum("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) <= 0) {
                    setJoinNum(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setJoinNum(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "20%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of companions spec plan id*/}
              <TextField
                style={
                  idInputVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={companionsJoinNum}
                InputProps={{ inputProps: { min: 0 } }}
                placeholder="Số lượng thành viên đi kèm"
                size="small"
                name="numberJoin"
                onChange={(e) => {
                  if (!e.target.value) {
                    setCompanionsJoinNum("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) < 0) {
                    setCompanionsJoinNum(0);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setCompanionsJoinNum(e.target.value);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) === 0) {
                    setCompanionsJoinNum(0);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "20%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of host join their plans */}
              <TextField
                style={
                  registerVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={registerNum}
                placeholder="Số lượng kế hoạch được tham gia"
                size="small"
                name="numberRegister"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setRegisterNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setRegisterNum(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setRegisterNum(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of companions host join*/}
              <TextField
                style={
                  registerVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={companionsHostJoinNum}
                InputProps={{ inputProps: { min: 0 } }}
                placeholder="Số lượng thành viên đi kèm"
                size="small"
                name="numberJoin"
                onChange={(e) => {
                  if (!e.target.value) {
                    setCompanionsHostJoinNum("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) < 0) {
                    setCompanionsHostJoinNum(0);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setCompanionsHostJoinNum(e.target.value);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) === 0) {
                    setCompanionsHostJoinNum(0);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "20%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of plan mass join */}
              <TextField
                style={
                  massJoinVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={massPlanJoinNum}
                placeholder="Số lượng kế hoạch được tham gia"
                size="small"
                name="numberMassPlan"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setMassPlanJoinNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setMassPlanJoinNum(1);
                    if (massTravelerJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setMassPlanJoinNum(e.target.value);
                    if (massTravelerJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
              {/* number of traveler mass join */}
              <TextField
                style={
                  massJoinVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={massTravelerJoinNum}
                placeholder="Nhập số lượng thành viên tham gia"
                size="small"
                name="numberMassJoin"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setMassTravelerJoinNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setMassTravelerJoinNum(1);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setMassTravelerJoinNum(e.target.value);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of companions mass join*/}
              <TextField
                style={
                  massJoinVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={companionsMassJoinNum}
                InputProps={{ inputProps: { min: 0 } }}
                placeholder="Số lượng thành viên đi kèm"
                size="small"
                name="numberJoin"
                onChange={(e) => {
                  if (!e.target.value) {
                    setCompanionsMassJoinNum("");
                    setSelectLoading(true);
                  } else if (parseInt(e.target.value) < 0) {
                    setCompanionsMassJoinNum(0);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setCompanionsMassJoinNum(e.target.value);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) === 0) {
                    setCompanionsMassJoinNum(0);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "20%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of plan ready */}
              <TextField
                style={
                  readyNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planReadyNum}
                placeholder="Số lượng kế hoạch được chốt"
                size="small"
                name="numReady"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setPlanReadyNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanReadyNum(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanReadyNum(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of plan order */}
              <TextField
                style={
                  orderNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planOrderNum}
                placeholder="Số lượng kế hoạch được được đặt hàng"
                size="small"
                name="numOrder"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setPlanOrderNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanOrderNum(1);
                    setSelectLoading(false);
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanOrderNum(e.target.value);
                    setSelectLoading(false);
                  }
                }}
                fullWidth
                sx={{
                  width: "25%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of plan verify */}
              <TextField
                style={
                  verifyNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planVerifyNum}
                placeholder="Số lượng kế hoạch được check-in"
                size="small"
                name="numVerify"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setPlanVerifyNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanVerifyNum(1);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanVerifyNum(e.target.value);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* number of plan publish */}
              <TextField
                style={
                  publishNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planPublishNum}
                placeholder="Số lượng kế hoạch được chia sẻ"
                size="small"
                name="numPublish"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setPlanPublishNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanPublishNum(1);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanPublishNum(e.target.value);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  }
                }}
                fullWidth
                sx={{
                  width: "21%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />

              {/* date change system time */}
              <TextField
                id="outlined-disabled"
                style={dateVisible ? { display: "block" } : { display: "none" }}
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
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                className="basic-text ml-2"
                type="datetime-local"
                // placeholder="Nhập ID"
                size="small"
                name="id"
                onChange={(e) => {
                  setDateSimulator(e.target.value);
                }}
              />
            </div>

            <div className="btn-emulator">
              {selectState && (
                <button className={"linkDisabled"} disabled>
                  <PlayArrowIcon /> <span>Chạy giả lập</span>
                </button>
              )}
              {!selectState && (
                <button
                  className={"link"}
                  onClick={async () => {
                    setIsLoadingVisible(true);
                    setIsEmulatorLoading(true);

                    if (
                      selectedSimulator !== 6 &&
                      selectedSimulator !== 7 &&
                      selectedSimulator !== 10
                    ) {
                      try {
                        if (loadingState) {
                          const { data } = await refetchAccounts();
                          let res = data["accounts"]["nodes"].map((account) => {
                            const { __typename, ...rest } = account;
                            return { ...rest, token: "" };
                          });
                          await MassLogin(res);
                          setLoading(false);
                        }
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                        return;
                      }
                    }

                    if (selectedSimulator === 1) {
                      if (planNum > 50) {
                        const msg = `Giới hạn tạo 50 kế hoạch giả lập`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      let selectedDate = new Date(dateCreatePlanSimulator);

                      var a = moment.utc(selectedDate).utcOffset("+07:00");
                      var formatted = a.format();

                      simulateCreatePlans(planNum, formatted);
                    } else if (selectedSimulator === 2) {
                      if (companionsHostJoinNum > 5) {
                        const msg = `Giới hạn thành viên đi kèm 5 người`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      try {
                        const { data } = await refetchPending();
                        const limitPending = data.plans.totalCount;
                        if (registerNum > limitPending) {
                          const msg = `Số lượng kế hoạch đang chờ vượt quá kế hoạch hiện có (${limitPending})`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }
                        simulateJoinAndChangeMethodPlan(
                          registerNum,
                          companionsHostJoinNum
                        );
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 3) {
                      if (massTravelerJoinNum > 50) {
                        const msg = `Giới hạn 50 phượt thủ giả lập`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      if (companionsHostJoinNum > 5) {
                        const msg = `Giới hạn thành viên đi kèm 5 người`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      try {
                        const { data } = await refetchRegistering();
                        const limitRegistering = data.plans.totalCount;
                        if (massPlanJoinNum > limitRegistering) {
                          const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitRegistering} kế hoạch đang đăng ký)`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }
                        simulateMassJoinPlan(
                          massPlanJoinNum,
                          massTravelerJoinNum,
                          companionsMassJoinNum
                        );
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 4) {
                      try {
                        const { data } = await refetchRegistering();
                        const limitRegistering = data.plans.totalCount;
                        if (planReadyNum > limitRegistering) {
                          const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitRegistering} kế hoạch đang đăng ký)`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }

                        simulateConfirmPlan(planReadyNum);
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 5) {
                      try {
                        const { data } = await refetchReady();
                        const limitReady = data.plans.totalCount;
                        if (planOrderNum > limitReady) {
                          const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitReady} kế hoạch đã sẵn sàng)`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }

                        simulateOrderPlan(planOrderNum);
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 0) {
                      if (joinNum > 50) {
                        const msg = `Giới hạn 50 phượt thủ giả lập`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      if (companionsJoinNum > 5) {
                        const msg = `Giới hạn thành viên đi kèm 5 người`;
                        setErrMsg(msg);
                        handleClick();
                        setIsLoadingVisible(false);
                        return;
                      }

                      try {
                        const { data } = await refetchLoadPlansById({
                          id: parseInt(joinId, 10), // Always refetches a new list
                        });
                        let plan = data["plans"]["nodes"][0];
                        if (!plan) {
                          const msg = `Không có kế hoạch nào thuộc ID: ${joinId}`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                        } else {
                          simulateJoinPlanByID(
                            plan,
                            joinNum,
                            companionsJoinNum
                          );
                        }
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 6) {
                      let log = "";
                      log += "[Đăng nhập] Quản trị hệ thống \n";
                      log +=
                        "[Chỉnh sửa thời gian hệ thống] Quản trị hệ thống \n";
                      let response = [];

                      let selectedDate = new Date(dateSimulator);

                      var a = moment.utc(selectedDate).utcOffset("+07:00");
                      var formatted = a.format();

                      const res = await handleChangeSystemTime(formatted);

                      response.push(res);
                      setResponseMsg(response);
                      setLoginMsg(log);
                      setTotalMsg(1);
                      setSuccessMsg(1);
                      setIsEmulatorLoading(false);
                    } else if (selectedSimulator === 7) {
                      let log = "";
                      log += "[Đăng nhập] Quản trị hệ thống \n";
                      log +=
                        "[Đặt lại thời gian hệ thống] Quản trị hệ thống \n";
                      let response = [];
                      const res = await handleResetSystemTime();

                      response.push(res);
                      setResponseMsg(response);
                      setLoginMsg(log);
                      setTotalMsg(1);
                      setSuccessMsg(1);
                      setIsEmulatorLoading(false);
                    } else if (selectedSimulator === 8) {
                      try {
                        const { data } = await refetchOngoing();
                        const limitReady = data.plans.totalCount;
                        if (planVerifyNum > limitReady) {
                          const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitReady} kế hoạch đã đang diễn ra)`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }

                        simulateVerifyPlan(planVerifyNum);
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 9) {
                      console.log("123");

                      try {
                        const { data } = await refetchVeri();
                        const limitVerify = data.plans.totalCount;
                        if (planPublishNum > limitVerify) {
                          const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitVerify} kế hoạch chưa được chia sẻ)`;
                          setErrMsg(msg);
                          handleClick();
                          setIsLoadingVisible(false);
                          return;
                        }

                        simulatePublishPlan(planPublishNum);
                      } catch (error) {
                        console.log(error);
                        const msg = localStorage.getItem("errorMsg");
                        setErrMsg(msg);
                        handleClick();
                        localStorage.removeItem("errorMsg");
                      }
                    } else if (selectedSimulator === 10) {
                      let log = "";
                      log += "[Đăng nhập] Quản trị hệ thống \n";
                      log +=
                        "[Cập nhật giá sản phẩm trong hệ thống] Quản trị hệ thống \n";
                      let response = [];
                      const res = await handleForceUpdateProductsPrice();

                      response.push(res);
                      setResponseMsg(response);
                      setLoginMsg(log);
                      setTotalMsg(1);
                      setSuccessMsg(1);
                      setIsEmulatorLoading(false);
                    }
                  }}
                >
                  <PlayArrowIcon /> <span>Chạy giả lập</span>
                </button>
              )}

              {isLoadingVisible && (
                <div>
                  {isEmulatorLoading && (
                    <div className="loading-result">
                      <div className="left">
                        <div className="btn">
                          <RestartAltIcon sx={{ color: "#2c3d50" }} />
                        </div>
                      </div>
                      <div className="right">
                        <p>Đang xử lý...</p>
                      </div>
                    </div>
                  )}
                  {!isEmulatorLoading && (
                    <div className="loading-result">
                      <div className="left">
                        <div className="btn">
                          <CheckCircleIcon
                            sx={{
                              color: "green",
                            }}
                          />
                        </div>
                      </div>
                      <div className="right">
                        <p>{`${successMsg}/${totalMsg} thành công`}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="response-table">
              <div className="resultTable">
                <p className="title">Hành động</p>
                <div className="body login-res">
                  <span className="response">{loginMsg}</span>
                </div>
              </div>
              <div className="resultTable">
                <p className="title">Logs</p>
                <div className="body">
                  {responseMsg.map((message, index) => (
                    <div key={index} className="response-item">
                      <p className="response-msg">
                        {message.id}. {message.userName} - {message.action}
                      </p>
                      <p className="response-detail">{message.detail}</p>
                      {message.status && (
                        <p className="response-status success">Thành công</p>
                      )}
                      {!message.status && (
                        <p className="response-status fail">Thất bại</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbarOpen}
          onClose={handleClose}
          autoHideDuration={2000}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default EmulatorPage;
