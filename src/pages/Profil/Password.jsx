import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, Petunjuk, Loader, MenuProfil } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import { default as PetunjukPengisianProfil } from "./PetunjukPengisianProfil";
import "../../constants/defaultProgram.css";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import {
  Paper,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CaptchaImage from "../../assets/Captcha Image.jpeg";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ReplayIcon from "@mui/icons-material/Replay";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Password() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const [passwordLamaVisible, setPasswordLamaVisible] = useState(false);
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordKonfirmasiVisible, setPasswordKonfirmasiVisible] =
    useState(false);
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState("");
  const [kodeKeamanan, setKodeKeamanan] = useState("");

  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFailedPasswordKonfirmasi, setOpenFailedPasswordKonfirmasi] =
    useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const [errorFailedPasswordKonfirmasi, setErrorFailedPasswordKonfirmasi] =
    useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Toggle password lama visibility
  const togglePasswordLamaVisibility = () => {
    setPasswordLamaVisible(!passwordLamaVisible);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle password konfirmasi visibility
  const togglePasswordKonfirmasiVisibility = () => {
    setPasswordKonfirmasiVisible(!passwordKonfirmasiVisible);
  };

  const handleClickOpenConfirmation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseFailedPasswordKonfirmasi = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailedPasswordKonfirmasi(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if Konfirmasi Password false
    if (password !== passwordKonfirmasi) {
      setErrorFailedPasswordKonfirmasi(true);
      setOpenFailedPasswordKonfirmasi(!openFailedPasswordKonfirmasi);
      return;
    }

    const form = e.currentTarget;
    if (
      form.checkValidity() &&
      passwordLama.length !== 0 &&
      password.length !== 0 &&
      passwordKonfirmasi.length !== 0
    ) {
      setLoading(true);
      try {
        await axios.post(`${tempUrl}/updateUserPassword/${user.id}`, {
          passwordLama,
          password,
          passwordKonfirmasi,
          cabangId: user.kodeCabang,
          _id: user.id,
          token: user.token,
        });

        dispatch({ type: "LOGOUT" });
        navigate("/");
      } catch (error) {
        alert(error.response.data.message);
      }
      setLoading(false);
    } else {
      setError(true);
      setOpen(!open);
    }
    setValidated(true);
  };

  const inputWrapper = {
    color: Colors.grey700,
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "0px 80px 100px 100px" : "80px 10px 40px 10px",
    padding: screenSize >= 900 ? "20px 50px 20px 20px" : "20px 20px 20px 20px",
    display: screenSize >= 900 && "flex",
    justifyContent: screenSize >= 900 && "space-around",
  };

  const kodeKeamananWrapper = {
    marginTop: "20px",
    display: "flex",
    alignItems: screenSize >= 900 && "center",
    justifyContent: "space-between",
    flexDirection: screenSize <= 900 && "column",
  };

  const kodeKeamananInput = {
    height: "50px",
    marginTop: screenSize <= 900 && "20px",
  };

  const inputButtonWrapper = {
    marginTop: screenSize >= 900 ? "100px" : "16px",
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenu activeLink={"profil"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <MenuProfil menuActive={"Ubah Kata Sandi"} />
          <Petunjuk
            width={"350px"}
            titlePetunjuk={"Petunjuk"}
            PetunjukPengisianComponent={PetunjukPengisianProfil}
          />
        </div>
        <div style={inputContainer}>
          <Card>
            <Card.Header style={inputTitle}>
              <LockIcon /> Ubah Kata Sandi
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column"
                onSubmit={handleClickOpenConfirmation}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <div style={inputWrapper}>
                    <div>
                      <div>
                        <div style={{ marginBottom: "5px" }}>
                          Kata Sandi saat ini
                        </div>
                        <div>
                          <InputGroup>
                            <Form.Control
                              required
                              type={passwordLamaVisible ? "text" : "password"}
                              value={passwordLama}
                              onChange={(e) =>
                                setPasswordLama(e.target.value.toUpperCase())
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={togglePasswordLamaVisibility}
                              className="no-hover"
                            >
                              {passwordLamaVisible ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Button>
                          </InputGroup>
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ marginBottom: "5px" }}>
                          Kata Sandi baru
                        </div>
                        <div>
                          <InputGroup>
                            <Form.Control
                              required
                              type={passwordVisible ? "text" : "password"}
                              value={password}
                              onChange={(e) =>
                                setPassword(e.target.value.toUpperCase())
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={togglePasswordVisibility}
                              className="no-hover"
                            >
                              {passwordVisible ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Button>
                          </InputGroup>
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ marginBottom: "5px" }}>
                          Konfirmasi Kata Sandi
                        </div>
                        <div>
                          <InputGroup hasValidation>
                            <Form.Control
                              required
                              isInvalid={
                                password !== passwordKonfirmasi && true
                              }
                              type={
                                passwordKonfirmasiVisible ? "text" : "password"
                              }
                              value={passwordKonfirmasi}
                              onChange={(e) =>
                                setPasswordKonfirmasi(
                                  e.target.value.toUpperCase()
                                )
                              }
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={togglePasswordKonfirmasiVisibility}
                              className="no-hover"
                            >
                              {passwordKonfirmasiVisible ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Button>
                          </InputGroup>
                        </div>
                      </div>
                      <div style={kodeKeamananWrapper}>
                        <img
                          src={CaptchaImage}
                          alt="CaptchaImage"
                          style={{ width: "120px" }}
                        />
                        <Form.Control
                          required
                          placeholder="Kode Keamanan"
                          style={kodeKeamananInput}
                          value={kodeKeamanan}
                          onChange={(e) => setKodeKeamanan(e.target.value)}
                        />
                      </div>
                      <Form.Label style={captchaText}>
                        klik untuk ubah kode
                      </Form.Label>
                    </div>
                  </div>
                </div>
                <div style={inputButtonWrapper}>
                  <hr />
                  <div style={inputButtonContainer}>
                    <button
                      className="blank-button"
                      style={{ marginRight: "4px" }}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      <ReplayIcon style={{ marginRight: "4px" }} />
                      Batal
                    </button>
                    <button className="hover-button" type="submit">
                      <DriveFileRenameOutlineIcon
                        style={{ marginRight: "4px" }}
                      />
                      Ubah Kata Sandi
                    </button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
      {errorFailedPasswordKonfirmasi && (
        <Snackbar
          open={openFailedPasswordKonfirmasi}
          autoHideDuration={6000}
          onClose={handleCloseFailedPasswordKonfirmasi}
        >
          <Alert
            onClose={handleCloseFailedPasswordKonfirmasi}
            severity="error"
            sx={alertBox}
          >
            Kata Sandi dan Konfirmasi Kata Sandi beda!
          </Alert>
        </Snackbar>
      )}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "30px" }}>
          <DialogTitle id="alert-dialog-title">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Apakah Anda yakin ingin mengubah?</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Kata Sandi akan berlaku setelah Anda login kembali
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={inputButtonContainer}>
              <button
                className="blank-button"
                style={{ marginRight: "4px" }}
                onClick={handleCloseConfirmation}
              >
                <NotInterestedOutlinedIcon style={{ marginRight: "4px" }} />
                Tidak
              </button>
              <button className="hover-button" onClick={updateUser}>
                <ThumbUpOutlinedIcon style={{ marginRight: "4px" }} />
                Ya
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Password;

const inputTitle = {
  height: "50px",
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.blue900,
};

const alertBox = {
  width: "100%",
};

const captchaText = {
  color: Colors.grey600,
  fontSize: "12px",
};

const inputButtonContainer = {
  display: "flex",
  justifyContent: "flex-end",
};
