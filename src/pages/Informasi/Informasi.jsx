import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import "../../constants/defaultProgram.css";
import { Card } from "react-bootstrap";
import { Paper } from "@mui/material";
import CardLogo from "../../assets/Card Logo.png";
import MailIcon from "@mui/icons-material/Mail";
import DescriptionIcon from "@mui/icons-material/Description";

function Informasi() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

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

  const container1 = {
    flex: 1,
    padding: screenSize >= 900 ? "25px" : "5px",
  };

  const containerStyle = {
    display: screenSize >= 900 && "flex",
    flexDirection: screenSize <= 800 && "column",
  };

  const container2 = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderLeft: screenSize >= 900 && "2px solid",
    borderLeftColor: screenSize >= 900 && "#edf2f7",
    borderTop: screenSize <= 900 && "2px solid",
    borderTopColor: screenSize <= 900 && "gray",
  };

  const identitasNpwpDetil = {
    display: "block",
    fontSize: screenSize >= 900 ? "1.2rem" : "1rem",
    fontWeight: "600",
  };

  const kontakNpwp = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: screenSize >= 900 ? "14px" : "12px",
  };

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenu activeLink={"informasi"} />
      <Paper elevation={4} style={paperStyle}>
        <Card style={inputContainer}>
          <Card.Header style={inputTitle}>
            <DescriptionIcon /> Informasi
          </Card.Header>
          <Card.Body>
            <div style={containerStyle}>
              <div style={container1}>
                <div style={{ display: "flex" }}>
                  <div style={wpLogo}>WP</div>
                  <div
                    style={{
                      paddingLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.4rem", color: "#464457" }}>
                      {user.nama}
                    </div>
                  </div>
                </div>
                <div>
                  <div style={textWajibPajak}>
                    Anda merupakan Wajib Pajak yang telah terdaftar pada sistem
                    Direktorat Jenderal Pajak.
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={identitasNpwpLogo}>
                      <img
                        src={CardLogo}
                        alt="CardLogo"
                        style={{ width: "40px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                      <span style={identitasNpwpTitle}>NPWP</span>
                      <span style={identitasNpwpDetil}>{user.npwp15} /</span>
                      <span style={identitasNpwpDetil}>{user.nikNpwp16}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <div style={identitasNpwpLogo}>
                      <img
                        src={CardLogo}
                        alt="CardLogo"
                        style={{ width: "40px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                      <span style={identitasNpwpTitle}>NITKU</span>
                      <span style={identitasNpwpDetil}>{user.nitku}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div style={kontakNpwp}>
                      <span style={kontakNpwpTitle}>Email:</span>
                      <span style={kontakNpwpDetil}>{user.email}</span>
                    </div>
                    <div style={kontak2Npwp}>
                      <span style={kontakNpwpTitle}>No Telp:</span>
                      <span style={kontakNpwpDetil}>{user.nomorTelepon}</span>
                    </div>
                  </div>
                  <div style={ubahProfilButtonContainer}>
                    <div style={{ flex: 1 }}>
                      <button
                        className="yellow-button"
                        style={{ width: "100%" }}
                        onClick={() => {
                          navigate("/profil");
                        }}
                      >
                        Ubah Profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={container2}>
                <div style={{ padding: "30px" }}>
                  <button className="hover-button">Tampilkan NPWP</button>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#646c9a" }}>
                    Anda dapat mengirim NPWP Elektronik ke email Anda dengan
                    menekan tombol di bawah.
                  </p>
                  <button className="hover-button">
                    <MailIcon /> Kirim Email
                  </button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Paper>
    </div>
  );
}

export default Informasi;

const inputTitle = {
  height: "50px",
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.blue900,
};

const wpLogo = {
  borderRadius: "50%",
  background: "#5578eb1a",
  color: "#5578eb",
  width: "90px",
  height: "90px",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "700",
  display: "flex",
  justifyContent: "center",
};

const textWajibPajak = {
  padding: "1rem 0",
  color: "#6c7293",
};

const identitasNpwpLogo = {
  display: "flex",
  alignItems: "center",
};

const identitasNpwpTitle = {
  display: "block",
  color: "#6c7293",
};

const kontak2Npwp = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginTop: "10px",
};

const kontakNpwpTitle = {
  color: "#464457",
  fontWeight: "600",
};

const kontakNpwpDetil = {
  color: "#a7abc3",
  fontWeight: "400",
};

const ubahProfilButtonContainer = {
  display: "flex",
  marginTop: "40px",
};
