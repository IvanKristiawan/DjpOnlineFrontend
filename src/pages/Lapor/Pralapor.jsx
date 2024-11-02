import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, PetunjukPengisian } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import {
  ShowTablePphUnifikasi,
  ShowTablePph21,
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
  Autocomplete,
  TextField,
} from "@mui/material";
import LogoEbupot2126 from "../../assets/Logo Ebupot 21 26.png";
import LogoEbupotUnifikasi from "../../assets/Logo Ebupot Unifikasi.png";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>Menu Lapor dibedakan sub menu pelaporan dan pra pelaporan.</p>
      <ol>
        <li>
          Sub menu pelaporan menampilkan aplikasi e-filing & e-form yang
          digunakan untuk menyampaikan PPh 21 Tahunan secara elektronik serta
          e-spop yang digunakan untuk menyampaikan SPOP Tahunan secara
          elektronik. Pada sub menu ini juga terdapat riwayat pelaporan yang
          dibatasi untuk 3 tahun terakhir.
        </li>
        <li>
          Sub menu pra pelaporan menampilkan aplikasi yang digunakan dalam
          pembuatan bukti pemotongan dan/atau pemungutan PPh sebelum melaporkan
          PPh 21. Pada sub menu ini juga terdapat riwayat pemotongan/pemungutan
          PPh yang dibatasi untuk 1 tahun terakhir. Beberapa aplikasi mungkin
          belum diaktivasi sehingga tidak tampil pada halaman ini. Untuk
          mengaktivasinya silahkan klik link ini.
        </li>
      </ol>
    </div>
  );
};

function Pralapor() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openConfirmationEbupot2126, setOpenConfirmationEbupot2126] =
    useState(false);
  const [openConfirmationEbupotUnifikasi, setOpenConfirmationEbupotUnifikasi] =
    useState(false);
  const [openInfo, setOpenInfo] = useState(true);
  const [menuLapor, setMenuLapor] = useState("PPh 21");
  const [userSearchPph21, setUserSearchPph21] = useState("");
  const [userSearchUnifikasi, setUserSearchUnifikasi] = useState("");
  const [masaTahunPajakSearchPph21, setMasaTahunPajakSearchPph21] =
    useState("");
  const [masaTahunPajakSearchUnifikasi, setMasaTahunPajakSearchUnifikasi] =
    useState("");
  const [jenisBuktiPotongSearchPph21, setJenisBuktiPotongSearchPph21] =
    useState("");
  const [jenisBuktiPotongSearchUnifikasi, setJenisBuktiPotongSearchUnifikasi] =
    useState("");

  const [userPerCabangs, setUserPerCabangs] = useState([]);
  const [pbkKirimPagination, setPbkKirimPagination] = useState([]);
  const [pbkTerimaPagination, setPbkTerimaPagination] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleClickOpenConfirmationEbupot2126 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationEbupot2126(true);
  };

  const handleCloseConfirmationEbupot2126 = () => {
    setOpenConfirmationEbupot2126(false);
  };

  const handleClickOpenConfirmationEbupotUnifikasi = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationEbupotUnifikasi(true);
  };

  const handleCloseConfirmationEbupotUnifikasi = () => {
    setOpenConfirmationEbupotUnifikasi(false);
  };

  const handleClickOpenInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  let userOptions = userPerCabangs.map((userPerCabang) => ({
    label: `${userPerCabang.npwp15} - ${userPerCabang.nama}`,
  }));

  let findDate = new Date(); // Get the current date
  let currentMonth = findDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January)
  let currentYear = findDate.getFullYear(); // Get the current year

  let masaTahunPajakOptions = [];

  // Loop from the current month back to January
  for (let month = currentMonth; month >= 1; month--) {
    // Format the month as a two-digit string (e.g., '01', '02', ...)
    let formattedMonth = month < 10 ? "0" + month : month;

    // Add the month and year as an object to the array
    masaTahunPajakOptions.push({
      label: `${formattedMonth}-${currentYear}`,
    });
  }

  let jenisBuktiPotongPph21Options = [
    {
      label: "Bulanan",
    },
    {
      label: "Final/Tidak Final",
    },
    {
      label: "Tahunan",
    },
  ];

  let jenisBuktiPotongPphUnifikasiOptions = [
    {
      label: "PPh Pasal 22",
    },
    {
      label: "PPh Pasal 23",
    },
    {
      label: "PPh Pasal 15",
    },
    {
      label: "PPh Pasal 4(2)",
    },
    {
      label: "PPh Pasal 26",
    },
  ];

  useEffect(() => {
    getUserPerCabangData();
  }, []);

  const getUserPerCabangData = async () => {
    const response = await axios.post(`${tempUrl}/usersPerCabang`, {
      _id: user.id,
      token: user.token,
      kodeCabang: user.cabang.id,
    });
    setUserPerCabangs(response.data);
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

  const searchContainer = {
    display: screenSize >= 900 && "flex",
  };

  const searchWrapper1 = {
    flex: screenSize >= 900 && 2,
  };

  const searchWrapper2 = {
    flex: screenSize >= 900 && 2,
    marginLeft: screenSize >= 900 && "20px",
  };

  const searchWrapper3 = {
    flex: screenSize >= 900 && 1,
    marginLeft: screenSize >= 900 && "20px",
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
      <MainMenu activeLink={"lapor"} />
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
          <div style={menuLaporanContainer}>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                className="paper-background"
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
                className="paper-background"
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
                      src={LogoEbupot2126}
                      alt="LogoEbupot2126"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/ebupot2126/dashboard");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>e-Bupot 21/26</h6>
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
                          onClick={handleClickOpenConfirmationEbupot2126}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div style={menuEbillingContainer2}>
                    <img
                      src={LogoEbupotUnifikasi}
                      alt="LogoEbupotUnifikasi"
                      style={logoMenuStyle}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/dashboard");
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <h6>e-Bupot Unifikasi</h6>
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
                          onClick={handleClickOpenConfirmationEbupotUnifikasi}
                        />
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar Bukti Pemotongan
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                  marginBottom: "20px",
                }}
              >
                {menuLapor === "PPh 21" ? (
                  <div
                    className="menu-data-pralapor-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("PPh 21")}
                  >
                    <DescriptionIcon /> PPh 21
                  </div>
                ) : (
                  <div
                    className="menu-data-pralapor-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("PPh 21")}
                  >
                    <DescriptionIcon /> PPh 21
                  </div>
                )}
                {menuLapor === "PPh Unifikasi" ? (
                  <div
                    className="menu-data-pralapor-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("PPh Unifikasi")}
                  >
                    <DescriptionIcon /> PPh Unifikasi
                  </div>
                ) : (
                  <div
                    className="menu-data-pralapor-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuLapor("PPh Unifikasi")}
                  >
                    <DescriptionIcon /> PPh Unifikasi
                  </div>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                {menuLapor === "PPh 21" && (
                  <div style={searchContainer}>
                    <div style={searchWrapper1}>
                      <div style={{ marginBottom: "5px" }}>Pencarian</div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={userOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Identitas"
                            />
                          )}
                          onChange={(e, value) => {
                            setUserSearchPph21(value);
                          }}
                          value={userSearchPph21}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper2}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={masaTahunPajakOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Masa/Tahun pajak"
                            />
                          )}
                          onChange={(e, value) => {
                            setMasaTahunPajakSearchPph21(value);
                          }}
                          value={masaTahunPajakSearchPph21}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper2}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={jenisBuktiPotongPph21Options}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Jenis Bukti Potong"
                            />
                          )}
                          onChange={(e, value) => {
                            setJenisBuktiPotongSearchPph21(value);
                          }}
                          value={jenisBuktiPotongSearchPph21}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper3}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <button
                          className="cari-pralapor-button"
                          // onClick={handleCloseInfo}
                        >
                          <SearchIcon style={{ marginRight: "5px" }} />
                          Cari
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {menuLapor === "PPh Unifikasi" && (
                  <div style={searchContainer}>
                    <div style={searchWrapper1}>
                      <div style={{ marginBottom: "5px" }}>Pencarian</div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={userOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Identitas"
                            />
                          )}
                          onChange={(e, value) => {
                            setUserSearchUnifikasi(value);
                          }}
                          value={userSearchUnifikasi}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper2}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={masaTahunPajakOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Masa/Tahun pajak"
                            />
                          )}
                          onChange={(e, value) => {
                            setMasaTahunPajakSearchUnifikasi(value);
                          }}
                          value={masaTahunPajakSearchUnifikasi}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper2}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={jenisBuktiPotongPphUnifikasiOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Jenis Bukti Potong"
                            />
                          )}
                          onChange={(e, value) => {
                            setJenisBuktiPotongSearchUnifikasi(value);
                          }}
                          value={jenisBuktiPotongSearchUnifikasi}
                        />
                      </div>
                    </div>
                    <div style={searchWrapper3}>
                      <div
                        style={{ marginBottom: "5px", visibility: "hidden" }}
                      >
                        Pencarian
                      </div>
                      <div>
                        <button
                          className="cari-pralapor-button"
                          // onClick={handleCloseInfo}
                        >
                          <SearchIcon style={{ marginRight: "5px" }} />
                          Cari
                        </button>
                      </div>
                    </div>
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
                {menuLapor === "PPh 21" && (
                  <ShowTablePph21 currentPosts={pbkTerimaPagination} />
                )}
                {menuLapor === "PPh Unifikasi" && (
                  <ShowTablePphUnifikasi currentPosts={pbkKirimPagination} />
                )}
              </Box>
              <Box sx={tableContainer}>
                <Pagination
                  shape="rounded"
                  color="primary"
                  count={pages}
                  page={page + 1}
                  onChange={handleChange}
                  size={screenSize <= 600 ? "small" : "large"}
                />
              </Box>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        open={openConfirmationEbupot2126}
        onClose={handleCloseConfirmationEbupot2126}
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
              e-Bupot 21/26
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationEbupot2126}
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
              Aplikasi Bukti Potong dan Pelaporan PPh 21 Masa 21/26 secara
              elektronik.
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
        open={openConfirmationEbupotUnifikasi}
        onClose={handleCloseConfirmationEbupotUnifikasi}
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
              e-Bupot Unifikasi
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmationEbupotUnifikasi}
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
              Aplikasi Bukti Potong dan Pelaporan PPh 21 Masa Unifikasi secara
              elektronik.
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
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
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
                <InfoOutlinedIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Informasi</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Untuk mencari data bukti potong, silakan memilih kategori
              penyaring yang sesuai dan klik tombol cari.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={handleCloseInfo}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Pralapor;

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
  marginTop: "40px",
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
