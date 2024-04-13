import "../../assets/scss/accounts.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { MenuItem, Select, TextField, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  LOAD_PROVIDER,
  CREATE_STAFF,
} from "../../services/graphql/account";
import { useMutation, useQuery } from '@apollo/client';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "25rem",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AccountCreateTable({refetch, refetchTotal}) {
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providerId, setProvinceId] = useState(0);
  const [errorMsg, setErrMsg] = useState(false);
  const [successMsg, setSucessMsg] = useState(false);
  const [snackBarErrorOpen, setsnackBarErrorOpen] = useState(false);
  const [snackBarSuccessOpen, setsnackBarSucessOpen] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);

  const [providers, setProviders] = useState([]);
  const { loading, error, data } = useQuery(LOAD_PROVIDER);
  useEffect(() => {
    if (!loading && !error && data && data["providers"]["nodes"]) {
      let res = data.providers.nodes.map((node, index) => {
        const { __typename, ...rest } = node;
        return { ...rest, index: index + 1 };
      });
      setProviders(res);
    }
  }, [data, error, loading]);

  const [create, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_STAFF);

  const validateFormSubmit = () => {
    let result = true;
    const minNameLength = 4;
    const maxNameLength = 30;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;
    const passwordMaxLength = 20;
    const validateErrors = {};
    console.log(validateErrors);

    if (!name.trim()) {
      validateErrors.name = "Tên không được để trống!";
    } else if (name.length < minNameLength || name.length > maxNameLength) {
      validateErrors.name = "Độ dài của tên chỉ cho phép từ 4 tới 30!";
    }

    if (!email.trim()) {
      validateErrors.email = "Địa chỉ email không được để trống!";
    } else if (!email.match(emailRegex)) {
      validateErrors.email = "Địa chỉ email không hợp lệ!";
    }

    if (!password.trim()) {
      validateErrors.password = "Mật khẩu không được để trống!";
    } else if (password.length < passwordMinLength || password.length > passwordMaxLength) {
      validateErrors.password = "Độ dài của mật khẩu chỉ cho phép từ 8 tới 20!";
    }

    if (Object.keys(validateErrors).length !== 0) {
      result = false;
      setValidateErrors(validateErrors);
    }
    return result;
  }

  const handleSubmit = async () => {
      const dataCreate = {
        email: email,
        name,
        password,
        providerId: providerId === 0 ? null : parseInt(providerId)
      };
      console.log(dataCreate);

      try {
        const { data } = await create({
          variables: {
            dto: dataCreate,
          },
        });

        if (data) {
          setSucessMsg("Tạo thành công!");
          openSuccessSnackBar();

          setEmail("");
          setName("");
          setPassword("");
          setProvinceId(0);
          setValidateErrors({});

          refetch();
          refetchTotal();
        }
      } catch {
        console.log(error);
        const msg = localStorage.getItem("errorMsg");
        setErrMsg(msg);
        openErrorSnackBar();
        localStorage.removeItem("errorMsg");
      }
  }

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
    <div>
      <button className='link' onClick={handleOpen}>
        <AddCircleIcon />
        <span>Thêm quản lý</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="account-create-container">
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{ textAlign: "center", paddingBottom: "1rem" }}>
            Thêm người quản lý
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }} className="form-body">
            <div className="details">
              <div className="detailItem">
                <span className="itemKey">
                  Tên<span style={{ color: "red" }}>*</span>:
                </span>
                <TextField
                  className="outlined-disabled"
                  type="text"
                  placeholder="Nhập tên người quản lý"
                  size="small"
                  name="name"
                  value={name}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {validateErrors.name && <span className="errors">{validateErrors.name}</span>}
              </div>
            </div>
            <div className="details">
              <div className="detailItem">
                <span className="itemKey">
                  Email<span style={{ color: "red" }}>*</span>:
                </span>
                <TextField
                  className="outlined-disabled"
                  type="text"
                  placeholder="Nhập email"
                  size="small"
                  name="email"
                  // error={descriptionError}
                  // helperText={descriptionHelperText}
                  value={email}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {validateErrors.email && <span className="errors">{validateErrors.email}</span>}
              </div>
            </div>
            <div className="details">
              <div className="detailItem">
                <span className="itemKey">
                  Mật khẩu<span style={{ color: "red" }}>*</span>:
                </span>
                <TextField
                  className="outlined-disabled"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  size="small"
                  name="password"
                  value={password}
                  // error={descriptionError}
                  // helperText={descriptionHelperText}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {validateErrors.password && <span className="errors">{validateErrors.password}</span>}
              </div>
            </div>
            <div className="details">
              <div className="detailItem">
                <span className="itemKey">
                  Nhà cung cấp
                </span>
                <Select
                  id="outlined-disabled"
                  type="text"
                  placeholder="Nhập tên người quản lý"
                  size="small"
                  name="name"
                  // error={descriptionError}
                  // helperText={descriptionHelperText}
                  defaultValue={providerId}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setProvinceId(e.target.value);
                  }}>
                  <MenuItem value="0">- - Tên nhà cung cấp - -</MenuItem>
                  {providers.map(value => {
                    return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                  })}
                </Select>
              </div>
            </div>
            <button className="confirmBtn"
              onClick={() => {
                refetch();
                refetchTotal();
                if (validateFormSubmit()) {
                  handleSubmit();
                  handleClose();
                }
              }}>
              <span>Xác nhận</span>
            </button>
          </div>
        </Box>
      </Modal>
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
  );
}

export default AccountCreateTable;