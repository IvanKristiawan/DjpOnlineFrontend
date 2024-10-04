import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, PetunjukPengisian } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import {
  ShowTableBayarRiwayatPbkKirim,
  ShowTableBayarRiwayatPbkTerima,
  ShowTableBayarRiwayatPembayaran,
} from "../../components/ShowTable";
import "../../constants/defaultProgram.css";
import { Card, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import {
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from "@mui/material";
import LogoEbilling from "../../assets/Logo Ebilling.png";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        Menu Bayar menampilkan riwayat pembayaran dan aplikasi e-billing yang
        digunakan dalam pembuatan kode billing pembayaran pajak. Riwayat
        pembayaran yang ditampilkan antara lain:
      </p>
      <ol>
        <li>
          Pembayaran Pembayaran yang dilakukan menggunakan kode billing/Surat
          Setoran Pajak (SSP) langsung ke kas negara.
        </li>
        <li>
          Pemindahbukuan (Pbk) Kirim Penyesuaian pembayaran yang dilakukan
          melalui mekanisme pemindahbukuan dari rekening Wajib Pajak, baik ke
          rekening Wajib Pajak itu sendiri maupun ke rekening Wajib Pajak lain.
        </li>
        <li>
          Pemindahbukuan (Pbk) Terima Penyesuaian pembayaran yang dilakukan
          melalui mekanisme pemindahbukuan ke rekening Wajib Pajak, baik dari
          rekening Wajib Pajak itu sendiri maupun dari rekening Wajib Pajak
          lain.
        </li>
      </ol>
      <p>
        Riwayat pembayaran yang ditampilkan dibatasi untuk 2 tahun terakhir.
      </p>
    </div>
  );
};

function Bayar() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const [openKartu, setOpenKartu] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [menuBayar, setMenuBayar] = useState("Pembayaran");

  const [riwayatPembayaranPagination, setRiwayatPembayaranPagination] =
    useState([]);
  const [pbkKirimPagination, setPbkKirimPagination] = useState([]);
  const [pbkTerimaPagination, setPbkTerimaPagination] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleClickOpenConfirmation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
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
    background: "#EBECF1",
  };

  const warningContainer = {
    border: "2px solid #ffb822",
    boxShadow: "0 0 0 rgba(204,169,44, 0.4)",
    animation: "pulse 1s infinite",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    paddingTop: "12px",
    marginBottom: "20px",
    paddingLeft: screenSize <= 900 && "10px",
    paddingRight: screenSize <= 900 && "10px",
  };

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  const renderTooltipEBilling = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Informasi</p>
      </div>
    </Tooltip>
  );

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenu activeLink={"bayar"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <PetunjukPengisian
            defaultCollapse={screenSize >= 900 ? false : true}
            width={"240px"}
            titlePetunjuk={"Petunjuk Pengisian"}
            PetunjukPengisianComponent={PetunjukPengisianComponent}
          />
        </div>
        <div style={inputContainer}>
          <Card>
            <Card.Body>
              <div style={menuEbillingContainer}>
                <img
                  src={LogoEbilling}
                  alt="LogoEbilling"
                  style={logoEbillingStyle}
                  onClick={() => {
                    navigate("/eBilling");
                  }}
                />
                <div style={{ textAlign: "center" }}>
                  <h6>e-Billing</h6>
                </div>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 50 }}
                  overlay={renderTooltipEBilling}
                >
                  <div style={infoContainer}>
                    <InfoIcon
                      fontSize="small"
                      style={infoStyle}
                      onClick={handleClickOpenConfirmation}
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
          <div style={warningContainer}>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              "Apabila terdapat data yang tidak sesuai, silakan menghubungi KPP
              Administrasi atau Kring Pajak 1500200"
            </p>
          </div>
          <Card>
            <Card.Header style={inputTitle}>
              <DescriptionIcon style={{ marginRight: "10px" }} />
              Riwayat Pembayaran
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                  marginBottom: "20px",
                }}
              >
                {menuBayar === "Pembayaran" ? (
                  <div
                    className="menu-data-bayar-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("Pembayaran")}
                  >
                    <DescriptionIcon /> Pembayaran
                  </div>
                ) : (
                  <div
                    className="menu-data-bayar-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("Pembayaran")}
                  >
                    <DescriptionIcon /> Pembayaran
                  </div>
                )}
                {menuBayar === "PBK Kirim" ? (
                  <div
                    className="menu-data-bayar-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("PBK Kirim")}
                  >
                    <DescriptionIcon /> PBK Kirim
                  </div>
                ) : (
                  <div
                    className="menu-data-bayar-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("PBK Kirim")}
                  >
                    <DescriptionIcon /> PBK Kirim
                  </div>
                )}
                {menuBayar === "PBK Terima" ? (
                  <div
                    className="menu-data-bayar-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("PBK Terima")}
                  >
                    <DescriptionIcon /> PBK Terima
                  </div>
                ) : (
                  <div
                    className="menu-data-bayar-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBayar("PBK Terima")}
                  >
                    <DescriptionIcon /> PBK Terima
                  </div>
                )}
              </div>
              <div style={menuBayarContainer}>
                <p style={{ paddingTop: "10px" }}>Tampilkan</p>
                <Form.Select
                  size="sm"
                  style={{
                    width: "auto",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </Form.Select>
                <p style={{ paddingTop: "10px" }}>Entry</p>
              </div>
              <Box>
                {menuBayar === "Pembayaran" && (
                  <ShowTableBayarRiwayatPembayaran
                    currentPosts={riwayatPembayaranPagination}
                  />
                )}
                {menuBayar === "PBK Kirim" && (
                  <ShowTableBayarRiwayatPbkKirim
                    currentPosts={pbkKirimPagination}
                  />
                )}
                {menuBayar === "PBK Terima" && (
                  <ShowTableBayarRiwayatPbkTerima
                    currentPosts={pbkTerimaPagination}
                  />
                )}
              </Box>
              <Box sx={tableContainer}>
                <Pagination
                  count={pages}
                  page={page + 1}
                  onChange={handleChange}
                  color="secondary"
                  variant="outlined"
                  size={screenSize <= 600 ? "small" : "large"}
                />
              </Box>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
      >
        <div style={{ padding: "20px" }}>
          <DialogTitle id="alert-dialog-title">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              e-Billing
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmation}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Aplikasi pembuatan kode billing untuk pembayaran pajak.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <button className="yellow-button" style={{ width: "100%" }}>
                FAQ / Pertanyaan Umum
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Bayar;

const menuEbillingContainer = {
  cursor: "pointer",
  width: "max-content",
  wordWrap: "break-word",
  backgroundColor: "#fff",
  backgroundClip: "border-box",
  border: "1px solid #ebedf2",
  borderRadius: ".25rem",
  padding: 14,
};

const logoEbillingStyle = {
  width: "200px",
  border: "2px solid #212c5f",
  borderRadius: "4px",
};

const menuBayarContainer = {
  display: "flex",
  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
  marginBottom: "20px",
};

const infoContainer = {
  display: "flex",
  justifyContent: "end",
  marginTop: "-20px",
};

const infoStyle = {
  color: Colors.yellow500,
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
