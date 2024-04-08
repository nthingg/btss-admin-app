import "../../assets/scss/configuration.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/filter.scss";
import "../../assets/scss/shared.scss";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Checkbox, TextField, Snackbar, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    LOAD_SYSTEM_CONFIGURATIONS,
    UPDATE_SYSTEM_CONFIGURATIONS
} from "../../services/graphql/configuration";
import CheckIcon from '@mui/icons-material/Check';
import dayjs from "dayjs";
import HolidaysModal from "../../components/tables/ConfigHolidaysTable";

const ConfigurationPage = () => {
    const [vertical, setVertical] = useState("top");
    const [horizontal, setHorizontal] = useState("right");
    const [configs, setConfig] = useState([]);
    const [isUseFixOtp, setUseFixOtp] = useState(true);
    const [budgetAssure, setBudgetAssure] = useState(0);
    const [defaultPrestigate, setDefaultPrestigate] = useState(0);
    const [minTopup, setMinTopup] = useState(0);
    const [maxTopup, setMaxTopup] = useState(0);
    const [holidayMealUp, setHolidayMealUp] = useState(0);
    const [holidayLodgingUp, setHolidayLodgingUp] = useState(0);
    const [holidayRidingUp, setHolidayRidingUp] = useState(0);
    const [orderDateMinDiff, setOrderDateMinDiff] = useState(0);
    const [orderCancelDateDuration, setOrderCancelDateDuration] = useState(0);
    const [memberRefundSelf, setMemberRefundSelf] = useState(0);
    const [orderRefundCustomerCancel, setOrderRefundCustomerCancel] = useState(0);
    const [productMaxPriceUp, setProductMaxPriceUp] = useState(0);
    const [holidays, setHolidays] = useState([]);
    const [lastModified, setLastModified] = useState("");
    const [errorMsg, setErrMsg] = useState(false);
    const [successMsg, setSucessMsg] = useState(false);
    const [snackBarErrorOpen, setsnackBarErrorOpen] = useState(false);
    const [snackBarSuccessOpen, setsnackBarSucessOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { error, loading, data, refetch } = useQuery(LOAD_SYSTEM_CONFIGURATIONS);
    const [update, { data: dataConfig, error: updateError }] = useMutation(UPDATE_SYSTEM_CONFIGURATIONS);

    useEffect(() => {
        if (!loading && !error && data && data["configurations"]) {
            let res = data.configurations;
            setConfig(res);
            loadData(res);
        }
    }, [data, loading, error]);

    const loadData = (configs) => {
        if (configs) {
            setUseFixOtp(configs.USE_FIXED_OTP)
            setBudgetAssure(configs.BUDGET_ASSURED_PCT);
            setDefaultPrestigate(configs.DEFAULT_PRESTIGE_POINT);
            setMinTopup(configs.MIN_TOPUP);
            setMaxTopup(configs.MAX_TOPUP);
            setHolidayMealUp(configs.HOLIDAY_MEAL_UP_PCT);
            setHolidayLodgingUp(configs.HOLIDAY_LODGING_UP_PCT);
            setHolidayRidingUp(configs.HOLIDAY_RIDING_UP_PCT);
            setOrderDateMinDiff(configs.ORDER_DATE_MIN_DIFF);
            setOrderCancelDateDuration(configs.ORDER_CANCEL_DATE_DURATION);
            setMemberRefundSelf(configs.MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT);
            setOrderRefundCustomerCancel(configs.ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT);
            setProductMaxPriceUp(configs.PRODUCT_MAX_PRICE_UP_PCT);
            holidays.splice(0, holidays.length);
            configs.HOLIDAYS?.map(holiday => {
                holidays.push({
                    from: holiday.from, to: holiday.to, name: holiday.name
                });
                setHolidays(holidays);
            });
            setLastModified(dayjs(configs.LAST_MODIFIED).format('DD/MM/YYYY, HH:mm'));
        }

        console.log(holidays);
    }

    // useEffect(() => {
    //     console.log("running");
    //     if (configs) {
    //         setUseFixOtp(configs.USE_FIXED_OTP)
    //         setBudgetAssure(configs.BUDGET_ASSURED_PCT);
    //         setDefaultPrestigate(configs.DEFAULT_PRESTIGE_POINT);
    //         setMinTopup(configs.MIN_TOPUP);
    //         setMaxTopup(configs.MAX_TOPUP);
    //         setHolidayMealUp(configs.HOLIDAY_MEAL_UP_PCT);
    //         setHolidayLodgingUp(configs.HOLIDAY_LODGING_UP_PCT);
    //         setHolidayRidingUp(configs.HOLIDAY_RIDING_UP_PCT);
    //         setOrderDateMinDiff(configs.ORDER_DATE_MIN_DIFF);
    //         setOrderCancelDateDuration(configs.ORDER_CANCEL_DATE_DURATION);
    //         setMemberRefundSelf(configs.MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT);
    //         setOrderRefundCustomerCancel(configs.ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT);
    //         setProductMaxPriceUp(configs.PRODUCT_MAX_PRICE_UP_PCT);
    //         configs.HOLIDAYS?.map(holiday => {
    //             holidays.push({
    //                 from: holiday.from, to: holiday.to, name: holiday.name
    //             });
    //             setHolidays(holidays);
    //         });
    //         setLastModified(dayjs(configs.LAST_MODIFIED).format('DD/MM/YYYY, HH:mm'));
    //     }
    // }, [configs])

    const handleSaveBtn = async () => {
        const configData = {
            default_PRESTIGE_POINT: defaultPrestigate,
            use_FIXED_OTP: isUseFixOtp,
            budget_ASSURED_PCT: budgetAssure,
            min_TOPUP: minTopup,
            max_TOPUP: maxTopup,
            holiday_MEAL_UP_PCT: holidayMealUp,
            holiday_LODGING_UP_PCT: holidayLodgingUp,
            holiday_RIDING_UP_PCT: holidayRidingUp,
            order_DATE_MIN_DIFF: orderDateMinDiff,
            order_CANCEL_DATE_DURATION: orderCancelDateDuration,
            member_REFUND_SELF_REMOVE_1_DAY_PCT: memberRefundSelf,
            order_REFUND_CUSTOMER_CANCEL_1_DAY_PCT: orderRefundCustomerCancel,
            product_MAX_PRICE_UP_PCT: productMaxPriceUp,
            holidays: holidays
        };


        try {
            const { data } = await update({
                variables: {
                    input: configData,
                },
            });

            if (data) {
                setSucessMsg("Cập nhật thành công!");
                openSuccessSnackBar();
            }
        } catch {
            console.log(error);
            const msg = localStorage.getItem("errorMsg");
            setErrMsg(msg);
            openErrorSnackBar();
            localStorage.removeItem("errorMsg");
        }
    };

    const openErrorSnackBar = () => {
        setsnackBarErrorOpen(true);
    }

    const openSuccessSnackBar = () => {
        setsnackBarSucessOpen(true);
    }

    const handleCloseSnack = () => {
        setsnackBarErrorOpen(false);
        setsnackBarSucessOpen(false);
    }

    return (
        <div className="configuration-page">
            <div className="shared-title">
                <div>
                    <p className="title">Cấu hình hệ thống</p>
                    <p className="sub-title">Danh sách cấu hình</p>
                </div>
            </div>

            <div className="header">
                <div className="left">
                    <input
                        type="text"
                        className={"form-control"}
                        id="floatingValue"
                        name="value"
                        placeholder="Tìm kiếm ..."
                    />
                    <button className="link" onClick={() => { }}>
                        <SearchIcon />
                    </button>
                </div>
                <div className="right">
                    <button
                        className="link"
                        onClick={() => {
                            refetch();
                            loadData(data.configurations);
                        }}
                    >
                        <RefreshIcon />
                    </button>
                </div>
            </div>

            <div className="configuration-container">
                <div className="detailItem">
                    <span className="itemKey">USE_FIXED_OTP</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <Checkbox
                            size="medium"
                            color="default"
                            checked={isUseFixOtp}
                            onClick={() => {
                                setUseFixOtp(!isUseFixOtp);
                            }} />
                    </div>
                    <span className="description">: Cấu hình sử dụng OTP cố định</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">BUDGET_ASSURED_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="BUDGET_ASSURED_PCT"
                            value={budgetAssure}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setBudgetAssure(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình hệ số đảm bảo ngân sách kế hoạch</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">DEFAULT_PRESTIGE_POINT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="DEFAULT_PRESTIGE_POINT"
                            value={defaultPrestigate}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setDefaultPrestigate(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình hệ số điểm uy tín mặc định</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">MIN_TOPUP</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="MIN_TOPUP"
                            value={minTopup}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setMinTopup(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình giá trị nạp tiền tối thiểu cho phép</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">MAX_TOPUP</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="MAX_TOPUP"
                            value={maxTopup}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setMaxTopup(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình giá trị nạp tiền tối đa cho phép</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">HOLIDAY_MEAL_UP_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="HOLIDAY_MEAL_UP_PCT"
                            value={holidayMealUp}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setHolidayMealUp(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình mức tăng giá dịch vụ ăn uống dịp lễ</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">HOLIDAY_LODGING_UP_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="HOLIDAY_LODGING_UP_PCT"
                            value={holidayLodgingUp}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setHolidayLodgingUp(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình mức tăng giá dịch vụ lưu trú dịp lễ</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">HOLIDAY_RIDING_UP_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="HOLIDAY_RIDING_UP_PCT"
                            value={holidayRidingUp}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setHolidayRidingUp(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình mức tăng giá dịch vụ thuê xe tự lái dịp lễ</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">ORDER_DATE_MIN_DIFF</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="ORDER_DATE_MIN_DIFF"
                            value={orderDateMinDiff}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setOrderDateMinDiff(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình khoảng cách ngày đặt dịch vụ tối thiểu</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">ORDER_CANCEL_DATE_DURATION</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="ORDER_CANCEL_DATE_DURATION"
                            value={orderCancelDateDuration}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setOrderCancelDateDuration(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình thời gian cho phép hủy đơn</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="MEMBER_REFUND_SELF_REMOVE_1_DAY_PCT"
                            value={memberRefundSelf}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setMemberRefundSelf(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình hệ số thành viên hoàn tiền tự xóa 1 ngày</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="ORDER_REFUND_CUSTOMER_CANCEL_1_DAY_PCT"
                            value={orderRefundCustomerCancel}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setOrderRefundCustomerCancel(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình hệ số hoàn tiền hủy đơn 1 ngày</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">PRODUCT_MAX_PRICE_UP_PCT</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="outlined-disabled"
                            className="basic-single"
                            type="text"
                            placeholder="PRODUCT_MAX_PRICE_UP_PCT"
                            value={productMaxPriceUp}
                            size="small"
                            name="name"
                            sx={{
                                width: "90%",
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
                                setProductMaxPriceUp(Number(e.target.value));
                            }}
                        />
                    </div>
                    <span className="description">: Cấu hình hệ số tăng giá sản phẩm tối đa</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">HOLIDAYS</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <button
                            className="holidaysBtn"
                            onClick={handleOpen}
                        >
                            <span>Chi tiết</span>
                        </button>
                        <HolidaysModal
                            open={open}
                            handleClose={handleClose}
                            data={holidays}
                            setData={setHolidays}
                            setErrMsg={setErrMsg}
                            setSucessMsg={setSucessMsg}
                            setsnackBarErrorOpen={setsnackBarErrorOpen}
                            setsnackBarSucessOpen={setsnackBarSucessOpen}
                        />
                    </div>
                    <span className="description">: Cấu hình ngày nghỉ trong năm</span>
                </div>

                <div className="detailItem">
                    <span className="itemKey">LAST_MODIFIED</span>
                    <div className="itemkeyValue" style={{ display: "inline-block" }}>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            className="basic-single"
                            placeholder="LAST_MODIFIED"
                            value={lastModified}
                            size="small"
                            name="name"
                            aria-readonly="true"
                            sx={{
                                width: "90%",
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
                                setLastModified(e.target.value);
                            }}
                        />
                    </div>
                    <span className="description">: Sửa đổi lần cuối</span>
                </div>

                <button
                    className="confirmBtn"
                    onClick={async () => {
                        handleSaveBtn();
                    }}
                >
                    <CheckIcon />
                    <span style={{ marginLeft: "10px" }}>Lưu</span>
                </button>
            </div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarErrorOpen}
                onClose={handleCloseSnack}
                autoHideDuration={2000}
                key={vertical + horizontal + "error"}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    <Typography whiteSpace="pre-line">
                        {errorMsg}
                    </Typography>
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarSuccessOpen}
                onClose={handleCloseSnack}
                autoHideDuration={2000}
                key={vertical + horizontal + "success"}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {successMsg}
                </Alert>
            </Snackbar>
        </div>
    )
};

export default ConfigurationPage;