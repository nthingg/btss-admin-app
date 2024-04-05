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
  CHECK_NUMBERS_PENDING_PLANS,
  CHECK_NUMBERS_READY_PLANS,
  CHECK_NUMBERS_REGISTERING_PLANS,
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
  VERIFY_PLAN_SIMULATOR,
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
  const [joinId, setJoinId] = useState(1);
  const [joinNum, setJoinNum] = useState(1);
  const [planNum, setPlanNum] = useState(1);
  const [registerNum, setRegisterNum] = useState(1);
  const [massPlanJoinNum, setMassPlanJoinNum] = useState(1);
  const [massTravelerJoinNum, setMassTravelerJoinNum] = useState(1);
  const [planReadyNum, setPlanReadyNum] = useState(1);
  const [planOrderNum, setPlanOrderNum] = useState(1);
  const [planVerifyNum, setPlanVerifyNum] = useState(1);
  const [dateVisible, setDateVisible] = useState(false);
  const [planNumVisible, setPlanNumVisible] = useState(false);
  const [dateSimulator, setDateSimulator] = useState("");
  const [registerVisible, setRegisterVisible] = useState(false);
  const [massJoinVisible, setMassJoinVisible] = useState(false);
  const [readyNumVisible, setReadyNumVisible] = useState(false);
  const [orderNumVisible, setOrderNumVisible] = useState(false);
  const [verifyNumVisible, setVerifyNumVisible] = useState(false);

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
              deviceToken: "test123",
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

  const simulateCreatePlans = async (planNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
    let log = "";
    for (let i = 0; i < planNum; i++) {
      localStorage.setItem("userToken", loggedAcc[i].token);
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      count++;
      const res = await handleCreatePlan(planData[0], count, loggedAcc[i]);
      response.push(res);
      setResponseMsg(response);
      log += `[Tạo kế hoạch] ${loggedAcc[i].name} \n`;
      setLoginMsg(log);
    }
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

  const simulateJoinAndChangeMethodPlan = async (numberRegistering) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
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
          count++;

          if (limitRegister <= numberRegistering) {
            const joinData = {
              companions: null,
              planId: currentPlans[j].id,
              planName: currentPlans[j].name,
            };
            let currentJoinMethod = "NONE";
            if (currentPlans[j].joinMethod === "NONE") {
              let random = Math.floor(Math.random() * 2);
              if (random !== 0) {
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
              let countMax = 1;
              for (let index = 0; index < loggedAcc?.length; index++) {
                count++;
                if (countMax > 10) {
                  break;
                }
                if (loggedAcc[index].id !== loggedAcc[i].id) {
                  const inviteData = {
                    accountId: loggedAcc[index].id,
                    planId: currentPlans[j].id,
                    planName: currentPlans[j].name,
                  };
                  log += `[Mời phượt thủ khác tham gia] ${loggedAcc[i].name} \n`;
                  const resInvite = await handleInvitePlan(
                    inviteData,
                    count,
                    loggedAcc[i],
                    loggedAcc[index]
                  );
                  response.push(resInvite);
                  countMax++;
                }
              }
            }
            limitRegister++;
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

  const simulateMassJoinPlan = async (massPlan, massTraveler) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
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
        for (let j = 0; j < currentPlans?.length; j++) {
          if (limitMassJoin <= massPlan) {
            if (currentPlans[j].joinMethod === "INVITE") {
              const members = currentPlans[j].members.filter(
                (mem) => mem.status === "INVITED"
              );

              if (members.length > massTraveler) {
                let limitMember = 1;
                for (let k = 0; k < loggedAcc.length; k++) {
                  if (limitMember > massTraveler) {
                    break;
                  }

                  if (loggedAcc[k].id !== loggedAcc[i].id) {
                    const acc = members.find(
                      (member) => member.account.id === loggedAcc[k].id
                    );

                    if (acc) {
                      count++;
                      log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                      localStorage.setItem("userToken", loggedAcc[k].token);

                      const joinData = {
                        companions: null,
                        planId: currentPlans[j].id,
                        weight: 1,
                        planName: currentPlans[j].name,
                      };
                      log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                      const resJoin = await handleJoinPlan(
                        joinData,
                        count,
                        loggedAcc[k]
                      );
                      response.push(resJoin);
                      limitMember++;
                    }
                  }
                }
              } else {
                if (members.length === 0) {
                  let limitMember = 1;
                  for (let k = 0; k < loggedAcc.length; k++) {
                    if (limitMember > massTraveler) {
                      break;
                    }

                    if (loggedAcc[k].id !== loggedAcc[i].id) {
                      count++;
                      log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                      localStorage.setItem("userToken", loggedAcc[k].token);

                      const joinData = {
                        companions: null,
                        planId: currentPlans[j].id,
                        weight: 1,
                        planName: currentPlans[j].name,
                      };
                      log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                      const resJoin = await handleJoinPlan(
                        joinData,
                        count,
                        loggedAcc[k]
                      );
                      response.push(resJoin);
                      limitMember++;
                    }
                  }
                } else {
                  let limitMember = 1;
                  let limitMemberRemain = 1;
                  for (let k = 0; k < loggedAcc.length; k++) {
                    if (limitMember > members.length) {
                      break;
                    }

                    if (loggedAcc[k].id !== loggedAcc[i].id) {
                      const acc = members.find(
                        (member) => member.account.id === loggedAcc[k].id
                      );

                      if (acc) {
                        count++;
                        log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                        localStorage.setItem("userToken", loggedAcc[k].token);

                        const joinData = {
                          companions: null,
                          planId: currentPlans[j].id,
                          weight: 1,
                          planName: currentPlans[j].name,
                        };
                        log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                        const resJoin = await handleJoinPlan(
                          joinData,
                          count,
                          loggedAcc[k]
                        );
                        response.push(resJoin);
                        limitMember++;
                      }
                    }
                  }
                  for (let k = 0; k < loggedAcc.length; k++) {
                    if (limitMemberRemain > massTraveler - members.length) {
                      break;
                    }

                    if (loggedAcc[k].id !== loggedAcc[i].id) {
                      count++;
                      log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                      localStorage.setItem("userToken", loggedAcc[k].token);

                      const joinData = {
                        companions: null,
                        planId: currentPlans[j].id,
                        weight: 1,
                        planName: currentPlans[j].name,
                      };
                      log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                      const resJoin = await handleJoinPlan(
                        joinData,
                        count,
                        loggedAcc[k]
                      );
                      response.push(resJoin);
                      limitMemberRemain++;
                    }
                  }
                }
              }
            } else {
              let limitMember = 1;
              for (let k = 0; k < loggedAcc.length; k++) {
                if (limitMember > massTraveler) {
                  break;
                }

                if (loggedAcc[k].id !== loggedAcc[i].id) {
                  count++;
                  log += `[Đăng nhập] ${loggedAcc[k].name} \n`;
                  localStorage.setItem("userToken", loggedAcc[k].token);

                  const joinData = {
                    companions: null,
                    planId: currentPlans[j].id,
                    weight: 1,
                    planName: currentPlans[j].name,
                  };
                  log += `[Tham gia kế hoạch] ${loggedAcc[k].name} \n`;
                  const resJoin = await handleJoinPlan(
                    joinData,
                    count,
                    loggedAcc[k]
                  );
                  response.push(resJoin);
                  limitMember++;
                }
              }
            }
            limitMassJoin++;
            console.log(limitMassJoin);
          } else {
            console.log("im in");
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

  const simulateConfirmPlan = async (readyNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    let response = [];
    let count = 0;
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
          if (limitReady > readyNum) {
            break;
          }
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
          limitReady++;
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

  const simulateOrderPlan = async (orderNum) => {
    const loggedAcc = JSON.parse(localStorage.getItem("loggedAcc"));

    localStorage.setItem("checkIsUserCall", "yes");
    let response = [];
    let count = 0;
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
          limitOrder++;
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
    for (let i = 0; i < numJoin; i++) {
      log += `[Đăng nhập] ${loggedAcc[i].name} \n`;
      count++;
      localStorage.setItem("userToken", loggedAcc[i].token);

      const joinData = {
        companions: null,
        planId: parseInt(currentPlan.id, 10),
        weight: 1,
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
    let log = "";
    let limitVerify = 1;
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
          if (limitVerify > verifyNum) {
            break;
          }

          count++;
          log += `[Check-in kế hoạch] ${loggedAcc[i].name} \n`;

          const verifyData = {
            planId: currentPlans[j].id,
            coordinate: [105.04567995200371, 10.573465807537024],
          };

          const res = await handleVerifyPlan(
            verifyData,
            count,
            loggedAcc[i],
            currentPlans[j].name
          );
          response.push(res);
          setLoginMsg(log);
          setResponseMsg(response);
          limitVerify++;
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
                    //reset value
                    setJoinId(1);
                    setJoinNum(1);
                    setPlanNum(1);
                    setRegisterNum(1);
                    setMassPlanJoinNum(1);
                    setMassTravelerJoinNum(1);
                    setPlanReadyNum(1);
                    setPlanOrderNum(1);
                    setPlanVerifyNum(1);
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
                    } else if (e.value === 1) {
                      setPlanNumVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                    } else if (e.value === 2) {
                      setRegisterVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setPlanNumVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                      setVerifyNumVisible(false);
                    } else if (e.value === 3) {
                      setMassJoinVisible(true);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setReadyNumVisible(false);
                      setRegisterVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                    } else if (e.value === 4) {
                      setReadyNumVisible(true);
                      setMassJoinVisible(false);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setVerifyNumVisible(false);
                      setOrderNumVisible(false);
                    } else if (e.value === 5) {
                      setOrderNumVisible(true);
                      setReadyNumVisible(false);
                      setVerifyNumVisible(false);
                      setMassJoinVisible(false);
                      setIdInputVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                    } else if (e.value === 6) {
                      setDateVisible(true);
                      setVerifyNumVisible(false);
                      setReadyNumVisible(false);
                      setIdInputVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                    } else if (e.value === 8) {
                      setVerifyNumVisible(true);
                      setDateVisible(false);
                      setReadyNumVisible(false);
                      setIdInputVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                    } else {
                      setIdInputVisible(false);
                      setVerifyNumVisible(false);
                      setReadyNumVisible(false);
                      setDateVisible(false);
                      setPlanNumVisible(false);
                      setRegisterVisible(false);
                      setMassJoinVisible(false);
                      setOrderNumVisible(false);
                    }
                  } else {
                    setSelectLoading(true);
                    setVerifyNumVisible(false);
                    setIdInputVisible(false);
                    setReadyNumVisible(false);
                    setDateVisible(false);
                    setRegisterVisible(false);
                    setPlanNumVisible(false);
                    setMassJoinVisible(false);
                    setOrderNumVisible(false);
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
                placeholder="Số lượng kế hoạch được tạo"
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
                  width: "18%",
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
                  width: "6%",
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
                  width: "17%",
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
                placeholder="Số lượng kế hoạch được host tham gia"
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
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanReadyNum(e.target.value);
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

              {/* number of plan order */}
              <TextField
                style={
                  orderNumVisible ? { display: "block" } : { display: "none" }
                }
                id="outlined-disabled"
                className="basic-text ml-2"
                type="number"
                value={planOrderNum}
                placeholder="Số lượng kế hoạch được được đặt dịch vụ"
                size="small"
                name="numOrder"
                onChange={(e) => {
                  if (!e.target.value) {
                    setSelectLoading(true);
                    setPlanOrderNum("");
                  } else if (parseInt(e.target.value) <= 0) {
                    setPlanOrderNum(1);
                    if (massPlanJoinNum !== "") {
                      setSelectLoading(false);
                    }
                  } else if (parseInt(e.target.value) > 0) {
                    setPlanOrderNum(e.target.value);
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
            {selectState && (
              <button className={"linkDisabled"} disabled>
                <PlayArrowIcon /> <span>Chạy giả lập</span>
              </button>
            )}
            {!selectState && (
              <button
                className={"link"}
                onClick={async () => {
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

                  const loggedAcc = JSON.parse(
                    localStorage.getItem("loggedAcc")
                  );
                  console.log(loggedAcc);

                  if (selectedSimulator === 1) {
                    if (planNum > 50) {
                      const msg = `Giới hạn tạo 50 kế hoạch giả lập`;
                      setErrMsg(msg);
                      handleClick();
                      return;
                    }
                    simulateCreatePlans(planNum);
                  } else if (selectedSimulator === 2) {
                    try {
                      const { data } = await refetchPending();
                      const limitPending = data.plans.totalCount;
                      if (registerNum > limitPending) {
                        const msg = `Số lượng kế hoạch đang chờ vượt quá kế hoạch hiện có (${limitPending})`;
                        setErrMsg(msg);
                        handleClick();
                        return;
                      }
                      simulateJoinAndChangeMethodPlan(registerNum);
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
                      return;
                    }
                    try {
                      const { data } = await refetchRegistering();
                      const limitRegistering = data.plans.totalCount;
                      if (massPlanJoinNum > limitRegistering) {
                        const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitRegistering} kế hoạch đang đăng ký)`;
                        setErrMsg(msg);
                        handleClick();
                        return;
                      }
                      simulateMassJoinPlan(
                        massPlanJoinNum,
                        massTravelerJoinNum
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
                      } else {
                        simulateJoinPlanByID(plan, joinNum);
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
                    try {
                      const { data } = await refetchReady();
                      const limitReady = data.plans.totalCount;
                      if (planVerifyNum > limitReady) {
                        const msg = `Số lượng nhập vượt quá số kế hoạch hiện có (${limitReady} kế hoạch đã sẵn sàng)`;
                        setErrMsg(msg);
                        handleClick();
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
