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
import NpwpFrontLogo from "../../assets/Npwp Front.png";
import QrCodeKartuLogo from "../../assets/Qr Code Kartu.png";
import MailIcon from "@mui/icons-material/Mail";
import DescriptionIcon from "@mui/icons-material/Description";

function Informasi() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const [openKartu, setOpenKartu] = useState(false);

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

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
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
                {openKartu === false && (
                  <div style={{ padding: "30px" }}>
                    <button
                      className="hover-button"
                      onClick={() => setOpenKartu(true)}
                    >
                      Tampilkan NPWP
                    </button>
                  </div>
                )}

                {openKartu === true && (
                  <>
                    <div style={{ padding: "30px" }}>
                      <button
                        className="hover-button"
                        onClick={() => setOpenKartu(false)}
                      >
                        Sembunyikan NPWP
                      </button>
                    </div>
                    <div style={kartuContainer}>
                      <img
                        src={NpwpFrontLogo}
                        alt="NpwpFrontLogo"
                        style={{ width: "300px" }}
                      />
                      <div style={kartuContentWrapper}>
                        <span style={kartuMarkStyle}>Untuk Edukasi</span>
                        <div style={kartuIdentitasStyle}>
                          <span style={kartuIdentitasNpwpStyle}>{`${user.npwp15
                            .trim()
                            .slice(0, 2)}.${user.npwp15.slice(
                            2,
                            5
                          )}.${user.npwp15.slice(5, 8)}.${user.npwp15.slice(
                            8,
                            9
                          )}-${user.npwp15.slice(9, 12)}.${user.npwp15.slice(
                            12
                          )}`}</span>
                          <div style={kartuIdentitasNamaWrapper}>
                            <span style={kartuIdentitasNamaStyle}>
                              {user.nama}
                            </span>
                          </div>
                          <div style={kartuIdentitasNpwp16Wrapper}>
                            <span style={kartuIdentitasNpwp16Style}>
                              NPWP16 :{" "}
                              {`${user.nikNpwp16.slice(
                                0,
                                4
                              )} ${user.nikNpwp16.slice(
                                4,
                                8
                              )} ${user.nikNpwp16.slice(
                                8,
                                12
                              )} ${user.nikNpwp16.slice(12, 16)}`}
                            </span>
                          </div>
                        </div>
                        <div style={kartuKeteranganWrapper}>
                          <img
                            src={QrCodeKartuLogo}
                            alt="QrCodeKartuLogo"
                            style={{ width: "50px", height: "50px" }}
                          />
                          <div style={kartuKeteranganStyle}>
                            <span>{user.alamat}</span>
                            <span>Tanggal Terdaftar 08/05/2018</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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

const kartuContainer = {
  position: "relative",
  marginBottom: "20px",
};

const kartuContentWrapper = {
  position: "absolute",
  top: 0,
  padding: "10px 20px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "black",
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontStyle: "normal",
};

const kartuMarkStyle = {
  width: "100%",
  paddingLeft: "50px",
  textAlign: "right",
  display: "block",
  fontSize: "6px",
};

const kartuIdentitasStyle = {
  paddingTop: "30px",
  width: "fit-content",
  width: "225px",
};

const kartuIdentitasNpwpStyle = {
  fontFamily: "Bebas Neue",
  fontWeight: "bold",
  fontStyle: "normal",
  fontSize: "25px",
};

const kartuIdentitasNamaWrapper = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  lineHeight: 1,
};

const kartuIdentitasNamaStyle = {
  fontWeight: "900",
  fontSize: "7px",
  color: "#000",
  lineHeight: 1.25,
};

const kartuIdentitasNpwp16Wrapper = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  lineHeight: 1,
};

const kartuIdentitasNpwp16Style = {
  fontWeight: "900",
  fontSize: "7px",
  color: "#000",
  lineHeight: 1.25,
};

const kartuKeteranganWrapper = {
  display: "flex",
  flexWrap: "nowrap",
  lineHeight: 1.25,
  paddingTop: "20px",
};

const kartuKeteranganStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "220px",
  fontSize: "6px",
  padding: "0px 25px 0px 10px",
};
