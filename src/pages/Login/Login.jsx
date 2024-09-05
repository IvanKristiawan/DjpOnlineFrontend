import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
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
  const [npwp15, setNpwp15] = useState("");
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
          npwp15,
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
        padding: "24px",
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
                <Form.Label style={inputText}>NIK/NPWP/NITKU</Form.Label>
                <Form.Control
                  required
                  placeholder="Masukan nomor NIK/NPWP/NITKU Anda"
                  className="mb-3"
                  value={npwp15}
                  onChange={(e) => setNpwp15(e.target.value.toUpperCase())}
                />
                <Form.Label style={inputText}>Kata Sandi</Form.Label>
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
                    onChange={(e) => setKodeKeamanan(e.target.value)}
                  />
                </div>
                <Form.Label style={captchaText}>
                  klik untuk ubah kode
                </Form.Label>
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <p style={penggunaBaruText}>
                  <a href="/lupaPassword" style={daftarButton}>
                    Lupa Kata Sandi ?
                  </a>
                </p>
              </div>
              <Button
                variant="warning"
                type="submit"
                style={{ height: "50px" }}
              >
                <b style={{ fontSize: "18px" }}>Login</b>
              </Button>
              <hr />
              <p style={penggunaBaruText}>
                Pengguna Baru?{" "}
                <a href="/registrasi" style={daftarButton}>
                  Daftar disini
                </a>
              </p>
              <Button variant="light" style={emailButton}>
                Belum Menerima Email Aktivasi ?
              </Button>
              <Button variant="light" style={daftarNpwpButton}>
                Belum Punya NPWP ?
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Npwp15 atau Password salah!
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

const inputText = {
  color: Colors.grey700,
  fontSize: ".9rem",
};

const captchaText = {
  color: Colors.grey600,
  fontSize: "12px",
};

const emailButton = {
  color: Colors.grey600,
  fontSize: "1rem",
};

const penggunaBaruText = {
  color: Colors.grey600,
  fontSize: "14px",
  textAlign: "center",
};

const daftarNpwpButton = {
  color: Colors.grey600,
  fontSize: "1rem",
  marginTop: "10px",
};

const buttonText = {
  color: Colors.grey800,
  fontSize: "1rem",
};

const daftarButton = {
  textDecoration: "none",
  color: Colors.grey800,
  fontSize: "1rem",
};

const alertBox = {
  width: "100%",
};
