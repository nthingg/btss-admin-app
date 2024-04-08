import React, { useEffect, useState } from "react";
import {
    Box,
    Modal,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { Snackbar, Alert } from "@mui/material";

function HolidaysModal({ open, handleClose, data, setData, setErrMsg, setSucessMsg, setsnackBarErrorOpen, setsnackBarSucessOpen }) {
    const [vertical, setVertical] = useState("top");
    const [horizontal, setHorizontal] = useState("right");
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "65vw",
        bgcolor: 'background.paper',
        p: 4,
    };

    const tableHeaderStyle = {
        fontWeight: "bold",
        fontSize: "1.3rem",
    }

    const tableRowStyle = {
        fontSize: "1rem",
        p: 2
    }

    const addBtnStyle = {
        backgroundColor: "#2c3d50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "8px",
        fontSize: "1.2rem",
        fontWeight: 600,
        alignItems: "center",
        padding: "10px 0.5rem 10px 0.5rem",
        display: "flex",
        marginLeft: "auto",
        marginRight: 0,
        justifyContent: "center"
    }

    function validateFormInput(name, from, to) {
        let errorMsg = '';
        let result = true;

        if (name === '') {
            errorMsg += "Tên không được để trống!\n";
        }

        if (!from || !to) {
            errorMsg += "Ngày bắt đầu và ngày kết thúc không được để trống!\n";
        }

        if (new Date(from) > new Date(to)) {
            errorMsg += "Ngày bắt đầu phải trước ngày kết thúc!\n";
        }

        if (errorMsg !== '') {
            setErrMsg(errorMsg);
            setsnackBarErrorOpen(true);
            result = false;
        }

        return result;
    }

    //#region Render table body
    function RenderTableBody(data) {
        const initOpenIndex = () => {
            return new Array(data.length).fill(false);
        }
        const [open, setOpen] = useState([false]);
        const [name, setName] = useState("");
        const [from, setFrom] = useState(new Date());
        const [to, setTo] = useState(new Date());

        const handleClose = (index) => {
            open[index] = false;
            setOpen([...open]);
        }

        const handleOpen = (index) => {
            if (open.length === 0) {
                setOpen(() => {
                    return initOpenIndex();
                });
            }
            open[index] = true;
            setOpen([...open]);
            setName(data[index].name);
            setFrom(dayjs(data[index].from));
            setTo(dayjs(data[index].to));
        };

        const formSubmitInputStyle = {
            width: "auto",
            fontWeight: 600,
            marginRight: "5px",
            fontSize: "18px",
            display: "block"
        };

        const handleFormSubmit = (index) => {
            data[index].name = name;
            data[index].from = dayjs(from).format("YYYY-MM-DD");
            data[index].to = dayjs(to).format("YYYY-MM-DD");
            setSucessMsg("Cập nhật thành công!");
            setsnackBarSucessOpen(true);
        }

        return (
            data.map((row, index) => (
                <TableRow key={index}>
                    <TableCell sx={tableRowStyle}>{row.name}</TableCell>
                    <TableCell sx={tableRowStyle}>{row.from}</TableCell>
                    <TableCell sx={tableRowStyle}>{row.to}</TableCell>
                    <TableCell sx={{ ...tableRowStyle, padding: 0 }}>
                        <button
                            style={{
                                backgroundColor: "rgb(44 61 80)",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: 600,
                                padding: "0.7rem 1rem"
                            }}
                            onClick={() => {
                                handleOpen(index);
                            }}>
                            Sửa
                        </button>
                        <Modal
                            open={open[index]}
                            onClose={() => {
                                handleClose(index);
                            }}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...modalStyle, width: "auto", p: 3 }}>
                                <h2 id="child-modal-title" style={{ paddingBottom: "1rem" }}>Ngày nghỉ: {name}</h2>
                                <div id="child-modal-description">
                                    <div className="addHolidaysForm">
                                        <div className="detailItem">
                                            <span style={formSubmitInputStyle}>Tên:</span>
                                            <TextField
                                                id="outlined-disabled"
                                                className="basic-single"
                                                type="text"
                                                placeholder="Nhập tên ngày nghỉ"
                                                size="small"
                                                name="name"
                                                value={name}
                                                sx={{
                                                    width: "30rem",
                                                    "input": {
                                                        padding: "16.5px 14px",
                                                        height: "1.4375em"
                                                    },
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
                                            <span style={formSubmitInputStyle}>Ngày bắt đầu:</span>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="outlined-disabled"
                                                    className="basic-single"
                                                    size="small"
                                                    name="name"
                                                    value={from}
                                                    sx={{
                                                        width: "30rem",
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
                                                    onChange={(date) => {
                                                        setFrom(dayjs(date));
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="detailItem">
                                            <span style={formSubmitInputStyle}>Ngày kết thúc:</span>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="outlined-disabled"
                                                    className="basic-single"
                                                    size="small"
                                                    name="name"
                                                    value={to}
                                                    sx={{
                                                        width: "30rem",
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
                                                    onChange={(date) => {
                                                        setTo(dayjs(date));
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        var validateResult = validateFormInput(name, from, to);
                                        if (validateResult) {
                                            handleFormSubmit(index);
                                            handleClose(index);
                                        }
                                    }}
                                    style={{ ...addBtnStyle, marginTop: "1rem" }}>Lưu</button>
                            </Box>
                        </Modal>
                    </TableCell>
                    <TableCell sx={tableRowStyle}>
                        <button
                            style={{
                                backgroundColor: "rgb(178 4 27)",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: 600,
                                padding: "0.7rem 1rem"
                            }}
                            onClick={() => {
                                data.splice(index, 1);
                                setData([...data]);
                                setSucessMsg("Xóa thành công!");
                                setsnackBarSucessOpen(true);
                            }}>
                            Xóa
                        </button>
                    </TableCell>
                </TableRow>
            ))
        );
    }
    //#endregion

    //#region Child modal
    function ChildModal() {
        const [name, setName] = useState("");
        const [from, setFrom] = useState("");
        const [to, setTo] = useState("");
        const [open, setOpen] = useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        const formSubmitInputStyle = {
            width: "auto",
            fontWeight: 600,
            marginRight: "5px",
            fontSize: "18px",
            display: "block"
        };

        const handleFormSubmit = () => {
            setData([
                ...data,
                { name, from, to }
            ])
            setSucessMsg("Thêm thành công!");
            setsnackBarSucessOpen(true);
        }

        return (
            <React.Fragment>
                <button style={addBtnStyle} onClick={handleOpen}>
                    <AddIcon />
                    Thêm ngày nghỉ
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...modalStyle, width: "auto", p: 3 }}>
                        <h2 id="child-modal-title" style={{ paddingBottom: "1rem" }}>Thêm ngày nghỉ</h2>
                        <div id="child-modal-description">
                            <div className="addHolidaysForm">
                                <div className="detailItem">
                                    <span style={formSubmitInputStyle}>Tên:</span>
                                    <TextField
                                        id="outlined-disabled"
                                        className="basic-single"
                                        type="text"
                                        placeholder="Nhập tên ngày nghỉ"
                                        size="small"
                                        name="name"
                                        sx={{
                                            width: "30rem",
                                            "input": {
                                                padding: "16.5px 14px",
                                                height: "1.4375em"
                                            },
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
                                    <span style={formSubmitInputStyle}>Ngày bắt đầu:</span>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            id="outlined-disabled"
                                            className="basic-single"
                                            size="small"
                                            name="name"
                                            selected={from}
                                            sx={{
                                                width: "30rem",
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
                                            onChange={(date) => {
                                                const selectdDate = dayjs(new Date(date)).format('YYYY-MM-DD');
                                                setFrom(selectdDate);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="detailItem">
                                    <span style={formSubmitInputStyle}>Ngày kết thúc:</span>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            id="outlined-disabled"
                                            className="basic-single"
                                            size="small"
                                            name="name"
                                            sx={{
                                                width: "30rem",
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
                                            onChange={(date) => {
                                                const selectdDate = dayjs(new Date(date)).format('YYYY-MM-DD');
                                                setTo(selectdDate);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => {
                            const validateResult = validateFormInput(name, from, to);
                            if (validateResult) {
                                handleFormSubmit();
                                handleClose();
                            }
                        }} style={{ ...addBtnStyle, marginTop: "1rem" }}>Lưu</button>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }
    //#endregion
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Ngày nghỉ trong năm
                </Typography>
                <ChildModal />
                <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyle}>Tên ngày nghỉ</TableCell>
                                <TableCell sx={tableHeaderStyle}>Ngày bắt đầu</TableCell>
                                <TableCell sx={tableHeaderStyle}>Ngày kết thúc</TableCell>
                                <TableCell colSpan={2} sx={tableHeaderStyle} align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RenderTableBody(data)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal >
    )
}

export default HolidaysModal;