import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import LogoDjp from "../assets/Logo DJP.png";
import LogoProfilMenu from "../assets/Logo Profil Menu.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

function HeaderMainProfil({ username }) {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle box visibility
  const toggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const logoutButtonHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const marginButton = {
    visibility: screenSize <= 1000 ? "visible" : "hidden",
    marginLeft: "-5px",
    marginRight: "-5px",
  };

  return (
    <Navbar
      className="bg-body-tertiary"
      style={{
        height: "60px",
        background:
          "linear-gradient(180deg, rgba(244, 244, 244, 1) 0, rgba(255, 255, 255, 1) 76%, rgba(224, 224, 224, 1) 100%)",
      }}
    >
      <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  <p style={{ color: Colors.yellow500 }}>Halo,</p>
                  <p style={{ color: Colors.blue900, marginLeft: "10px" }}>
                    {username}
                  </p>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <button className="user-button" onClick={toggleBox}>
                    <PersonIcon />
                  </button>
                  {isBoxVisible && (
                    <div style={userPopup}>
                      <div style={{ display: "flex" }}>
                        <div style={userPopupIconContainer}>
                          <PersonIcon
                            style={{ width: "30px", height: "30px" }}
                          />
                        </div>
                        <div style={userPopupNamaContainer}>
                          <span style={userPopupNama}>{user.nama}</span>
                        </div>
                      </div>
                      <div
                        style={userPopupProfilLogoContainer}
                        onClick={() => {
                          navigate("/profil");
                        }}
                      >
                        <div style={userPopupProfilLogoWrapper}>
                          <img
                            src={LogoProfilMenu}
                            alt="LogoProfilMenu"
                            style={{ width: "17px" }}
                          />
                        </div>
                        <div style={{ flex: 1, paddingLeft: "10px" }}>
                          <div style={{ color: "#6c7293", fontSize: "12px" }}>
                            Profil Saya
                          </div>
                          <div style={{ color: "#a7abc3", fontSize: "12px" }}>
                            Pengaturan akun dan lainnya
                          </div>
                        </div>
                        <div style={{ color: "#a7abc3" }}>{">"}</div>
                      </div>
                      <div style={{ marginTop: "40px" }}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={logoutButtonHandler}
                        >
                          Keluar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderMainProfil;

const userPopup = {
  cursor: "auto",
  position: "absolute", // Position it below the button
  transform: "translateX(-80%)",
  width: "300px",
  padding: "20px",
  backgroundColor: "white",
  zIndex: 1000, // Ensure it stays in front
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
};

const userPopupIconContainer = {
  background: "#5578eb1a",
  color: "#5578eb",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const userPopupNamaContainer = {
  paddingLeft: "1rem",
  display: "flex",
  alignItems: "center",
};

const userPopupNama = {
  color: "#6c7293",
  fontSize: "1.1rem",
};

const userPopupProfilLogoContainer = {
  display: "flex",
  marginTop: "40px",
  cursor: "pointer",
};

const userPopupProfilLogoWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
