import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";
import { Container, Card, InputGroup, Button, Form } from "react-bootstrap";
import { Snackbar, Alert } from "@mui/material";
import LogoDjp from "../../assets/Logo DJP.png";
import CaptchaImage from "../../assets/Captcha Image.jpeg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const { screenSize } = useStateContext();
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [kodeKeamanan, setKodeKeamanan] = useState("");
  const navigate = useNavigate();

  const { error, dispatch } = useContext(AuthContext);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const cardContainer = {
    width: screenSize >= 650 ? "23rem" : "18rem",
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(`${tempUrl}/auth/login`, {
          username,
          password,
          kodeKeamanan,
        });
        const findSetting = await axios.post(`${tempUrl}/lastSetting`, {
          _id: res.data.details.id,
          token: res.data.details.token,
          kodeCabang: res.data.details.cabangId,
        });
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.details,
          setting: findSetting.data,
        });

        navigate("/admin");
      } catch (err) {
        setOpen(true);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    }
    setValidated(true);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={cardContainer}>
        <Card.Body>
          <div style={headerContainer}>
            <img
              src={LogoDjp}
              alt="LogoDjp"
              style={{ width: "170px", marginTop: "20px" }}
            />
            <p style={headerText}>Login</p>
          </div>
          <div style={{ margin: "20px" }}>
            <Form
              noValidate
              validated={validated}
              className="d-flex flex-column"
              onSubmit={handleClick}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>NIK/NPWP/NITKU</Form.Label>
                <Form.Control
                  required
                  placeholder="Masukan nomor NIK/NPWP/NITKU Anda"
                  className="mb-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                />
                <Form.Label>Kata Sandi</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.toUpperCase())}
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
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={CaptchaImage}
                    alt="CaptchaImage"
                    style={{ width: "120px" }}
                  />
                  <Form.Control
                    required
                    placeholder="Kode Keamanan"
                    style={{ width: "160px", height: "50px" }}
                    value={kodeKeamanan}
                    onChange={(e) =>
                      setKodeKeamanan(e.target.value.toUpperCase())
                    }
                  />
                </div>
                <Form.Label>klik untuk ubah kode</Form.Label>
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Form.Label>Lupa Kata Sandi ?</Form.Label>
              </div>
              <Button
                variant="warning"
                type="submit"
                style={{ height: "50px" }}
              >
                <b style={{ fontSize: "18px" }}>Login</b>
              </Button>
              <hr />
              <p style={{ textAlign: "center" }}>
                Pengguna Baru?{" "}
                <a href="" style={{ color: "black", textDecoration: "none" }}>
                  Daftar disini
                </a>
              </p>
              <Button variant="light">Belum Menerima Email Aktivasi ?</Button>
              <Button variant="light" style={{ marginTop: "10px" }}>
                Belum Punya NPWP ?
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Username atau Password salah!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default Login;

const headerContainer = {
  fontWeight: 700,
  textAlign: "center",
};

const headerText = {
  marginTop: "20px",
  marginBottom: 1,
  fontSize: "20px",
  fontWeight: 600,
};

const headerDetail = {
  fontSize: 12,
  fontWeight: 500,
  color: "gray",
};

const alertBox = {
  width: "100%",
};
