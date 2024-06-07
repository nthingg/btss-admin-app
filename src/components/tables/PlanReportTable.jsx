import "../../assets/scss/plans.scss";
import { DataGrid } from "@mui/x-data-grid";
import { planReportColumns } from "../../assets/configs/plans/planReport";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const PlanReportTable = ({ planMembers }) => {
    const [open, setOpen] = React.useState([false]);
    const handleOpen = (id) => {
        open[id] = true
        console.log(open);
        setOpen({...open});
    }
    const handleClose = (id) => {
        open[id] = false;
        setOpen({...open});
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const actionColumn = [
        {
            field: "action",
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton color="info" onClick={() => {
                            handleOpen(params.row.account.id);
                        }}>
                            <VisibilityIcon />
                        </IconButton>
                        <Modal
                            open={open[params.row.account.id]}
                            onClose={() => {
                                handleClose(params.row.account.id);
                            }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Lí do báo cáo
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {params.row.reportReason}
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                );
            },
            renderHeader: () => <span>CHI TIẾT</span>,
        },
    ];

    return (
        <div className="planOrderTable">
            <DataGrid
                rows={planMembers}
                columns={planReportColumns.concat(actionColumn)}
                rowSelection={false}
                pagination
                autoPageSize={true}
                showColumnVerticalBorder={true}
                getRowId={(row) => row.account.id}
                sx={{
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#2c3d50",
                        color: "white",
                        fontWeight: "bold",
                    },
                    "& .MuiDataGrid-columnHeader--withRightBorder": {
                        borderRightWidth: "2px",
                    },
                }}
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            `${from} - ${to} trong ${count === -1 ? `nhiều hơn ${to}` : count
                            }`,
                    },
                    noRowsLabel: "Không có dữ liệu",
                }}
            />
        </div>
    );
};

export default PlanReportTable;
