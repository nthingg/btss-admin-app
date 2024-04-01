import { useEffect, useState } from "react";
import "../../assets/scss/emulator.scss";
import "../../assets/scss/shared.scss";
import Select from "react-select";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useMutation, useQuery } from "@apollo/client";
import { Alert, Snackbar, TextField } from "@mui/material";
import {
  CANCEL_PLAN_SIMULATOR,
  CHANGE_JOIN_METHOD_SIMULATOR,
  CONFIRM_PLAN_SIMULATOR,
  CREATE_PLAN_SIMULATOR,
  GEN_MEM_SIMULATOR,
  INVITE_PLANS_SIMULATOR,
  JOIN_PLAN_SIMULATOR,
  LOAD_PLANS_BY_ID_SIMULATOR,
  LOAD_PLANS_SIMULATOR,
  ORDER_CREATE_SIMULATOR,
  REQUEST_AUTH_SIMULATOR,
  REQUEST_OTP_SIMULATOR,
  RESET_TIME_SIMULATOR,
  SET_TIME_SIMULATOR,
} from "../../services/graphql/simulator";
import { planData } from "../../assets/constants/plans";
import { companionData } from "../../assets/constants/companions";

const EmulatorPage = () => {
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [responseMsg, setResponseMsg] = useState([]);
  const [loadingState, setLoading] = useState(true);
  const [selectState, setSelectLoading] = useState(true);
  const [ini, setIni] = useState(true);
  const [selectedSimulator, setSelectedSimulator] = useState(0);
  const [idInputVisible, setIdInputVisible] = useState(false);
  const [joinId, setJoinId] = useState(0);
  const [joinNum, setJoinNum] = useState(0);
  const [planNum, setPlanNum] = useState(0);
  const [dateVisible, setDateVisible] = useState(false);
  const [planNumVisible, setPlanNumVisible] = useState(false);
  const [dateSimulator, setDateSimulator] = useState("");

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

  const { error, loading, data, refetch } = useQuery(GEN_MEM_SIMULATOR);

  const [rqOTP, { data: dataRqOTP, error: errorRqOTP }] = useMutation(
    REQUEST_OTP_SIMULATOR
  );

  const [rqAuth, { data: dataRqAuth, error: errorRqAuth }] = useMutation(
    REQUEST_AUTH_SIMULATOR
  );

  const [cancel, { data: dataCancel, error: errorCancel }] = useMutation(
    CANCEL_PLAN_SIMULATOR
  );

  const {
    error: errorLoadPlans,
    loading: loadingLoadPlans,
    data: dataLoadPlans,
    refetch: refetchLoadPlans,
  } = useQuery(LOAD_PLANS_SIMULATOR, {
    variables: {
      id: 0,
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

  const [invite, { data: dataInvite, error: errorInvite }] = useMutation(
    INVITE_PLANS_SIMULATOR
  );

  const [setTime, { data: dataSetTime, error: errorSetTime }] =
    useMutation(SET_TIME_SIMULATOR);

  const [resetTime, { data: dataResetTime, error: errorResetTime }] =
    useMutation(RESET_TIME_SIMULATOR);

  const [changeJoinMethod, { data: dataJoinMethod, error: errorJoinMethod }] =
    useMutation(CHANGE_JOIN_METHOD_SIMULATOR);

  const [create, { data: dataCreate, error: errorCreate }] = useMutation(
    CREATE_PLAN_SIMULATOR
  );

  const [createOrder, { data: dataOrder, error: errorOrder }] = useMutation(
    ORDER_CREATE_SIMULATOR
  );

  const handleCreatePlan = async (plan, count, acc) => {
    try {
      const { data } = await create({
        variables: {
          dto: {
            departAt: plan.departAt,
            departure: plan.departure,
            destinationId: plan.destinationId,
            gcoinBudgetPerCapita: plan.gcoinBudgetPerCapita,
            maxMemberCount: plan.maxMemberCount,
            maxMemberWeight: plan.maxMemberWeight,
            departureAddress: plan.departureAddress,
            name: plan.name + count,
            note: plan.note,
            periodCount: plan.periodCount,
            savedProviderIds: plan.savedProviderIds,
            schedule: plan.schedule,
            surcharges: plan.surcharges,
            tempOrders: plan.tempOrders,
            travelDuration: plan.travelDuration,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Tạo kế hoạch",
        detail: `[${acc.name}] tạo kế hoạch [${plan.name + count}]`,
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

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data["accounts"] &&
      data["accounts"]["nodes"]
    ) {
      let res = data["accounts"]["nodes"].map((account) => {
        const { __typename, ...rest } = account;
        return { ...rest, token: "" };
      });
      console.log(res);
      setAccounts(res);
    }
  }, [data, loading, error]);

  const handlingAuth = async (travelerPhone) => {
    try {
      const { data: dataRqOTP } = await rqOTP({
        variables: {
          dto: {
            channel: "VONAGE",
            phone: travelerPhone,
          },
        },
      });
      console.log(dataRqOTP);
      if (dataRqOTP) {
        const { data: dataRqAuth } = await rqAuth({
          variables: {
            dto: {
              channel: "VONAGE",
              deviceToken: "test123",
              otp: "123123",
              phone: travelerPhone,
            },
          },
        });

        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].phone === travelerPhone) {
            accounts[i].token =
              dataRqAuth["travelerRequestAuthorize"]["accessToken"];
            if (accounts[i].phone === accounts[accounts.length - 1].phone) {
              setLoading(false);
            }
            break;
          }
        }
        setAccounts(accounts);
        localStorage.setItem("loggedAcc", JSON.stringify(accounts));
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

  const MassLogin = async () => {
    for (let i = 0; i < accounts?.length; i++) {
      await handlingAuth(accounts[i].phone);
    }
  };

  const simulateCreatePlans = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      for (let j = 0; j < 10; j++) {
        count++;
        const res = await handleCreatePlan(planData[0], count, loggedAcc[i]);
        response.push(res);
        setResponseMsg(response);
        log += `[Tạo kế hoạch] ${loggedAcc[i].name} \n`;
        setLoginMsg(log);
      }
    }
    // for (let i = 0; i < 2; i++) {
    //   localStorage.setItem("userToken", loggedAcc[0].token);
    //   const res = await handleCreatePlan(planData[0], 1, loggedAcc[i]);
    //   response.push(res);
    // }
    localStorage.setItem("checkIsUserCall", "no");
  };

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
        detail: `${msg}`,
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

  const handleInvitePlan = async (dto, count, acc, guest) => {
    try {
      const { data } = await invite({
        variables: {
          dto: {
            accountId: dto.accountId,
            planId: dto.planId,
          },
        },
      });
      const response = {
        userName: acc.name,
        action: "Mời phượt thủ khác",
        detail: `[${acc.name}] mời [${guest.name}] tham gia kế hoạch [${dto.planName}]`,
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
        action: "Mời phượt thủ khác",
        detail: `[${acc.name}] mời [${guest.name}] tham gia kế hoạch [${dto.planName}]`,
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

  const simulateJoinAndChangeMethodPlan = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));
    // console.log(loggedAcc);
    // return;

    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
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
          count++;

          if (loggedAcc[i].id !== 10) {
            const joinData = {
              companions: null,
              planId: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            let currentJoinMethod = "NONE";
            if (currentPlans[j].joinMethod === "NONE") {
              if (loggedAcc[i].id !== 6 && loggedAcc[i].id !== 7) {
                currentJoinMethod = "INVITE";
              } else {
                currentJoinMethod = "SCAN";
              }
            } else if (currentPlans[j].joinMethod === "INVITE") {
              currentJoinMethod = "SCAN";
            } else {
              currentJoinMethod = "INVITE";
            }

            const changeData = {
              joinMethod: currentJoinMethod,
              planId: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            log += `[Tham gia kế hoạch] ${loggedAcc[i].name} \n`;
            const resJoin = await handleJoinPlan(joinData, count, loggedAcc[i]);
            count++;
            log += `[Thay đổi phương thức tham gia] ${loggedAcc[i].name} \n`;
            const resChange = await handleChangeJoinMethod(
              changeData,
              count,
              loggedAcc[i]
            );
            response.push(resJoin);
            response.push(resChange);

            if (currentJoinMethod === "INVITE") {
              for (let index = 0; index < loggedAcc?.length; index++) {
                count++;
                if (loggedAcc[index].id !== loggedAcc[i].id) {
                  const inviteData = {
                    accountId: loggedAcc[index].id,
                    planId: currentPlans[j].id,
                    planName: currentPlans[j].name,
                  };
                  log += `[Mời thành viên khác] ${loggedAcc[i].name} \n`;
                  const resInvite = await handleInvitePlan(
                    inviteData,
                    count,
                    loggedAcc[i],
                    loggedAcc[index]
                  );
                  response.push(resInvite);
                }
              }
            }
          } else {
            const cancelData = {
              id: currentPlans[j].id,
              planName: currentPlans[j].name,
            };

            log += `[Hủy kế hoạch] ${loggedAcc[i].name} \n`;
            const resCancel = await handleCancelPlan(
              cancelData,
              count,
              loggedAcc[i]
            );

            response.push(resCancel);
          }

          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
    localStorage.setItem("checkIsUserCall", "no");
  };

  const simulateMassJoinPlan = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      if (loggedAcc[i].id === 10) {
        continue;
      }

      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
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
        for (let j = 0; j < currentPlans?.length; j++) {
          if (loggedAcc[i].id !== 6) {
            let setThree = false;
            for (let k = 0; k < loggedAcc?.length; k++) {
              if (loggedAcc[k].id !== loggedAcc[i].id) {
                count++;
                log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                localStorage.setItem("userToken", loggedAcc[k].token);
                let tempCompanion = null;
                let tempWeight = 1;
                if (loggedAcc[i].id !== 7 && loggedAcc[i].id !== 8) {
                  if (!setThree) {
                    tempCompanion = [companionData[0], companionData[1]];
                    tempWeight = 3;
                    setThree = true;
                  } else {
                    tempCompanion = [companionData[0]];
                    tempWeight = 2;
                  }
                }
                const joinData = {
                  companions: tempCompanion,
                  planId: currentPlans[j].id,
                  weight: tempWeight,
                  planName: currentPlans[j].name,
                };
                log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                const resJoin = await handleJoinPlan(
                  joinData,
                  count,
                  loggedAcc[k]
                );
                response.push(resJoin);
              }
            }
          } else {
            const cancelData = {
              id: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            localStorage.setItem("userToken", loggedAcc[i].token);
            log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
            log += `[Hủy kế hoạch] ${loggedAcc[i].name} \n`;
            const resCancel = await handleCancelPlan(
              cancelData,
              count,
              loggedAcc[i]
            );

            response.push(resCancel);
          }

          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
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

  const simulateConfirmPlan = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      if (loggedAcc[i].id === 6 || loggedAcc[i].id === 10) {
        continue;
      }

      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
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
          count++;
          log += `[Chốt kế hoạch] ${loggedAcc[i].name} \n`;
          const res = await handleConfirmMember(
            currentPlans[j].id,
            count,
            loggedAcc[i],
            currentPlans[j].name
          );
          response.push(res);
          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
    localStorage.setItem("checkIsUserCall", "no");
  };

  const handleOrderPlan = async (dto, count, acc) => {
    try {
      const { data } = await createOrder({
        variables: {
          dto: {
            cart: dto.cart,
            note: dto.note,
            period: dto.period,
            planId: dto.planId,
            serveDates: dto.serveDates,
            type: dto.type,
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

  const simulateOrderPlan = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      if (loggedAcc[i].id === 6 || loggedAcc[i].id === 10) {
        continue;
      }

      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
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
          let temp = [];
          if (loggedAcc[i].id === 7) {
            temp = [planData[0].tempOrders[0], planData[0].tempOrders[1]];
            console.log("half");
            console.log(temp);
          } else if (loggedAcc[i].id === 8) {
            temp = planData[0].tempOrders;
            console.log("full");
            console.log(temp);
          } else {
            temp = [
              planData[0].tempOrders[0],
              planData[0].tempOrders[1],
              planData[0].tempOrders[2],
            ];
            console.log("70%");
            console.log(temp);
          }

          for (let k = 0; k < temp.length; k++) {
            count++;
            const orderData = {
              cart: temp[k].cart,
              note: temp[k].note,
              planId: currentPlans[j].id,
              serveDates: temp[k].serveDates,
              type: temp[k].type,
              period: temp[k].period,
              planName: currentPlans[j].name,
            };
            // console.log("/////////////////////////////////////");
            // console.log(orderData);
            log += `[Đặt hàng cho kế hoạch] ${loggedAcc[i].name} \n`;
            const res = await handleOrderPlan(orderData, count, loggedAcc[i]);
            response.push(res);
            setResponseMsg(response);
            setLoginMsg(log);
          }
        }
      }
    }
    localStorage.setItem("checkIsUserCall", "no");
  };

  //add logic change test account if already join plan
  const simulateJoinPlanByID = async (currentPlan, numJoin) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < 1; i++) {
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      count++;
      localStorage.setItem("userToken", loggedAcc[i].token);

      let comp = [];
      for (let index = 0; index < numJoin; index++) {
        comp.push(companionData[index]);
      }

      const joinData = {
        companions: comp,
        planId: parseInt(joinId, 10),
        weight: numJoin,
        planName: currentPlan.name,
      };

      log += `[Tham gia kế hoạch] ${loggedAcc[i].name} \n`;
      const resJoin = await handleJoinPlan(joinData, count, loggedAcc[i]);
      response.push(resJoin);
      setResponseMsg(response);
      setLoginMsg(log);
    }
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

  const handleVerifyPlan = async (planId, count, acc, planName) => {
    try {
      const { data } = await planConfirm({
        variables: {
          dto: planId,
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

  const simulateVerifyPlan = async () => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < loggedAcc?.length; i++) {
      if (
        loggedAcc[i].id === 6 ||
        loggedAcc[i].id === 10 ||
        loggedAcc[i].id === 9
      ) {
        continue;
      }

      localStorage.setItem("checkIsUserCall", "no");

      let currentPlans = [];
      try {
        const { data } = await refetchLoadPlans({
          id: loggedAcc[i].id, // Always refetches a new list
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
          count++;
          log += `[Check-in kế hoạch] ${loggedAcc[i].name} \n`;
          const res = await handleVerifyPlan(
            currentPlans[j].id,
            count,
            loggedAcc[i],
            currentPlans[j].name
          );
          response.push(res);
          setLoginMsg(log);
          setResponseMsg(response);
        }
      }
    }
    localStorage.setItem("checkIsUserCall", "no");
  };

  const [loginMsg, setLoginMsg] = useState("");

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
                  if (e != null) {
                    setSelectedSimulator(e.value);
                    setSelectLoading(false);
                    if (e.value === 0) {
                      setIdInputVisible(true);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                    } else if (e.value === 1) {
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(true);
                    } else if (e.value === 6) {
                      setDateVisible(true);
                      setIdInputVisible(false);
                      setPlanNumVisible(false);
                    } else {
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                    }
                  } else {
                    setSelectLoading(true);
                    setIdInputVisible(false);
                    setDateVisible(false);
                    setPlanNumVisible(false);
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
              <TextField
                style={
                  idInputVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="text"
                placeholder="Nhập ID"
                size="small"
                name="id"
                onChange={(e) => {
                  setJoinId(e.target.value);
                }}
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
              />
              <TextField
                style={
                  idInputVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="text"
                placeholder="Nhập số lượng tham gia"
                size="small"
                name="numberJoin"
                onChange={(e) => {
                  setJoinNum(e.target.value);
                }}
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
              />
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
            {selectState && (
              <button className={"linkDisabled"} disabled>
                <PlayArrowIcon /> <span>Chạy giả lập</span>
              </button>
            )}
            {!selectState && (
              <button
                className={"link"}
                onClick={async () => {
                  if (loadingState) {
                    await MassLogin();
                  }

                  if (selectedSimulator === 1) {
                    simulateCreatePlans();
                  } else if (selectedSimulator === 2) {
                    simulateJoinAndChangeMethodPlan();
                  } else if (selectedSimulator === 3) {
                    simulateMassJoinPlan();
                  } else if (selectedSimulator === 4) {
                    simulateConfirmPlan();
                  } else if (selectedSimulator === 5) {
                    simulateOrderPlan();
                  } else if (selectedSimulator === 0) {
                    try {
                      if (joinNum < 0 && joinId < 0) {
                        console.log(error);
                        const msg = `Nhập số lớn hơn 0`;
                        setErrMsg(msg);
                        handleClick();
                        return;
                      }
                      const num = parseInt(joinNum, 10);

                      const { data } = await refetchLoadPlansById({
                        id: parseInt(joinId, 10), // Always refetches a new list
                      });
                      let plan = data["plans"]["nodes"][0];
                      if (!plan) {
                        const msg = `Không có kế hoạch nào thuộc ID: ${joinId}`;
                        setErrMsg(msg);
                        handleClick();
                      } else {
                        simulateJoinPlanByID(plan, num);
                      }
                    } catch (error) {
                      console.log(error);
                      const msg = `Vui lòng nhập đúng định dạng số`;
                      setErrMsg(msg);
                      handleClick();
                    }
                  } else if (selectedSimulator === 6) {
                    let log = "";
                    log += "[Đăng nhập] Quản trị hệ thống \n";
                    log +=
                      "[Chỉnh sửa thời gian hệ thống] Quản trị hệ thống \n";
                    let response = [];
                    const res = await handleChangeSystemTime(dateSimulator);

                    response.push(res);
                    setResponseMsg(response);
                    setLoginMsg(log);
                  } else if (selectedSimulator === 7) {
                    let log = "";
                    log += "[Đăng nhập] Quản trị hệ thống \n";
                    log += "[Đặt lại thời gian hệ thống] Quản trị hệ thống \n";
                    let response = [];
                    const res = await handleResetSystemTime();

                    response.push(res);
                    setResponseMsg(response);
                    setLoginMsg(log);
                  } else if (selectedSimulator === 8) {
                    simulateVerifyPlan();
                  }
                }}
              >
                <PlayArrowIcon /> <span>Chạy giả lập</span>
              </button>
            )}

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
