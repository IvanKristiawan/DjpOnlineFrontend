import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, PetunjukPengisian } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import { ShowTableEspop, ShowTableSpt } from "../../components/ShowTable";
import "../../constants/defaultProgram.css";
import { Card, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap";
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
import LogoEform from "../../assets/Logo Eform.png";
import LogoEfiling from "../../assets/Logo Efiling.png";
import LogoSptBeaMeterai from "../../assets/Logo Spt Bea Meterai.png";
import LogoEsptMasaPpn from "../../assets/Logo Espt Masa Ppn.png";
import LogoPbb from "../../assets/Logo Pbb.png";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>Menu Lapor dibedakan sub menu pelaporan dan pra pelaporan.</p>
      <ol>
        <li>
          Sub menu pelaporan menampilkan aplikasi e-filing & e-form yang
          digunakan untuk menyampaikan SPT Tahunan secara elektronik serta
          e-spop yang digunakan untuk menyampaikan SPOP Tahunan secara
          elektronik. Pada sub menu ini juga terdapat riwayat pelaporan yang
          dibatasi untuk 3 tahun terakhir.
        </li>
        <li>
          Sub menu pra pelaporan menampilkan aplikasi yang digunakan dalam
          pembuatan bukti pemotongan dan/atau pemungutan PPh sebelum melaporkan
          SPT. Pada sub menu ini juga terdapat riwayat pemotongan/pemungutan PPh
          yang dibatasi untuk 1 tahun terakhir. Beberapa aplikasi mungkin belum
          diaktivasi sehingga tidak tampil pada halaman ini. Untuk
          mengaktivasinya silahkan klik link ini.
        </li>
      </ol>
    </div>
  );
};

function Lapor() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const [openConfirmationEform, setOpenConfirmationEform] = useState(false);
  const [openConfirmationEfiling, setOpenConfirmationEfiling] = useState(false);
  const [openConfirmationSptBeaMeterai, setOpenConfirmationSptBeaMeterai] =
    useState(false);
  const [openConfirmationEsptMasaPpn, setOpenConfirmationEsptMasaPpn] =
    useState(false);
  const [openConfirmationPbb, setOpenConfirmationPbb] = useState(false);
  const [menuLapor, setMenuLapor] = useState("SPT");

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

  const handleClickOpenConfirmationEform = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationEform(true);
  };

  const handleCloseConfirmationEform = () => {
    setOpenConfirmationEform(false);
  };

  const handleClickOpenConfirmationEfiling = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationEfiling(true);
  };

  const handleCloseConfirmationEfiling = () => {
    setOpenConfirmationEfiling(false);
  };

  const handleClickOpenConfirmationSptBeaMeterai = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationSptBeaMeterai(true);
  };

  const handleCloseConfirmationSptBeaMeterai = () => {
    setOpenConfirmationSptBeaMeterai(false);
  };

  const handleClickOpenConfirmationEsptMasaPpn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationEsptMasaPpn(true);
  };

  const handleCloseConfirmationEsptMasaPpn = () => {
    setOpenConfirmationEsptMasaPpn(false);
  };

  const handleClickOpenConfirmationPbb = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationPbb(true);
  };

  const handleCloseConfirmationPbb = () => {
    setOpenConfirmationPbb(false);
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
    width: screenSize >= 900 ? "60%" : "100%",
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

  const menuLaporanContainer = {
    display: screenSize >= 900 && "flex",
    width: "100%",
    marginBottom: "20px",
  };

  const menuLaporanWrapper = {
    display: "flex",
    justifyContent: screenSize >= 900 && "center",
    flexDirection: screenSize >= 900 && "column",
    alignItems: screenSize >= 900 && "center",
    padding: screenSize >= 900 ? "30px 10px" : "10px 10px",
    cursor: "pointer",
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
      <MainMenu activeLink={"lapor"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <PetunjukPengisian
            defaultCollapse={false}
            width={"240px"}
            titlePetunjuk={"Petunjuk Pengisian"}
            PetunjukPengisianComponent={PetunjukPengisianComponent}
          />
        </div>
        <div style={inputContainer}>
          <div style={menuLaporanContainer}>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                style={menuLaporanWrapper}
                onClick={() => {
                  navigate("/lapor");
                }}
              >
                <AssignmentTurnedInIcon
                  style={{ fill: "#ffb822" }}
                  fontSize="large"
                />
                <b>Pelaporan</b>
              </div>
            </Paper>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                style={menuLaporanWrapper}
                onClick={() => {
                  navigate("/pralapor");
                }}
              >
                <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>Pra Pelaporan</b>
              </div>
            </Paper>
          </div>
          <Card>
            <Card.Body>
              <div
                style={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={menuEbillingContainer}>
                    <img
                      src={LogoEform}
                      alt="LogoEform"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/eform");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>e-Form PDF</h6>
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
                          onClick={handleClickOpenConfirmationEform}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div style={menuEbillingContainer2}>
                    <img
                      src={LogoEfiling}
                      alt="LogoEfiling"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/efilling");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>e-Filing</h6>
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
                          onClick={handleClickOpenConfirmationEfiling}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div style={menuEbillingContainer2}>
                    <img
                      src={LogoSptBeaMeterai}
                      alt="LogoSptBeaMeterai"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/sptBeaMeterai");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>SPT Masa Pemungut Bea Meterai</h6>
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
                          onClick={handleClickOpenConfirmationSptBeaMeterai}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div style={menuEbillingContainer2}>
                    <img
                      src={LogoEsptMasaPpn}
                      alt="LogoEsptMasaPpn"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/esptMasaPpn");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>e-SPT Masa PPN 1107PUT Web</h6>
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
                          onClick={handleClickOpenConfirmationEsptMasaPpn}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div style={menuEbillingContainer2}>
                    <img
                      src={LogoPbb}
                      alt="LogoPbb"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/pbb");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>PBB</h6>
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
                          onClick={handleClickOpenConfirmationPbb}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
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
              Riwayat Pelaporan
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                  marginBottom: "20px",
                }}
              >
                {menuLapor === "SPT" ? (
                  <div
                    className="menu-data-bayar-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("SPT")}
                  >
                    <DescriptionIcon /> SPT
                  </div>
                ) : (
                  <div
                    className="menu-data-bayar-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("SPT")}
                  >
                    <DescriptionIcon /> SPT
                  </div>
                )}
                {menuLapor === "ESPOP" ? (
                  <div
                    className="menu-data-bayar-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("ESPOP")}
                  >
                    <DescriptionIcon /> ESPOP
                  </div>
                ) : (
                  <div
                    className="menu-data-bayar-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("ESPOP")}
                  >
                    <DescriptionIcon /> ESPOP
                  </div>
                )}
              </div>
              <div style={menuLaporContainer}>
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
                {menuLapor === "SPT" && (
                  <ShowTableSpt currentPosts={pbkTerimaPagination} />
                )}
                {menuLapor === "ESPOP" && (
                  <ShowTableEspop currentPosts={pbkKirimPagination} />
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
        open={openConfirmationEform}
        onClose={handleCloseConfirmationEform}
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
              e-Form PDF
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationEform}
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
              Formulir SPT Elektronik versi terbaru dalam format dokumen
              portabel (PDF). Mudah pengisiannya tanpa terhubung ke internet.
              Biasakan dengan yang baru, mulai dari sekarang.
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
      <Dialog
        open={openConfirmationEfiling}
        onClose={handleCloseConfirmationEfiling}
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
              e-Filing
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationEfiling}
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
              Sampaikan SPT Tahunanmu secara online dengan mudah, cepat, dan
              aman. Pastikan juga jaringan internet tidak terputus.
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
      <Dialog
        open={openConfirmationSptBeaMeterai}
        onClose={handleCloseConfirmationSptBeaMeterai}
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
              SPT Masa Pemungut Bea Meterai
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationSptBeaMeterai}
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
              Aplikasi Pelaporan SPT Masa Pemungut Bea Meterai.
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
      <Dialog
        open={openConfirmationEsptMasaPpn}
        onClose={handleCloseConfirmationEsptMasaPpn}
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
              e-SPT Masa PPN 1107PUT Web
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationEsptMasaPpn}
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
              eSPT Masa PPN 1107PUT Versi Web.
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
      <Dialog
        open={openConfirmationPbb}
        onClose={handleCloseConfirmationPbb}
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
              PBB
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationPbb}
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
              Salah Satu Kanal Pemenuhan hak dan kewajiban PBB bagi Wajib Pajak
              secara elektronik.
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

export default Lapor;

const inputTitle = {
  height: "50px",
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.blue900,
};

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

const menuEbillingContainer2 = {
  cursor: "pointer",
  width: "max-content",
  wordWrap: "break-word",
  backgroundColor: "#fff",
  backgroundClip: "border-box",
  border: "1px solid #ebedf2",
  borderRadius: ".25rem",
  padding: 14,
  paddingLeft: 14,
  marginLeft: "20px",
};

const logoMenuStyle = {
  width: "200px",
  border: "2px solid #212c5f",
  borderRadius: "4px",
};

const menuLaporContainer = {
  display: "flex",
  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
  marginBottom: "20px",
};

const infoContainer = {
  display: "flex",
  justifyContent: "end",
  marginTop: "-10px",
};

const infoStyle = {
  color: Colors.yellow500,
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
