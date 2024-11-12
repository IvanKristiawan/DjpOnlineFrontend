import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126Pengaturan,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import { ShowTablePenandatangan } from "../../../components/ShowTable";
import "../../../constants/defaultProgram.css";
import { Card, Form, Row, Col, Spinner, InputGroup } from "react-bootstrap";
import {
  Paper,
  Box,
  Pagination,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getRandomIndonesianName } from "../../../constants/helper";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        Panduan User Manual silakan download{" "}
        <a href="https://drive.google.com/file/d/11CLyj8l15-pJzPBMK9G_2-3FE4-Y6M9n/view?usp=sharing">
          disini
        </a>
      </p>
      <p>
        <b>Deskripsi Form:</b> Form ini menampilkan data penandatangan yang
        telah didaftarkan.
      </p>
      <p>
        Penandatangan dapat dilakukan pada saat perekaman bukti potong dan
        submit SPT
      </p>
      <p>
        Anda dapat menggunakan form ini untuk melihat data ringkas daftar
        penandatangan
      </p>
      <p>
        Pada kolom paling kanan, tersedia tombol aksi yang berfungsi untuk
        mengubah status aktif/tidak aktif dari penandatangan.
      </p>
    </div>
  );
};

function TampilEbupot2126Penandatangan() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [masaTahunPajakSearch, setMasaTahunPajakSearch] = useState("");
  const [kataKunciSearch, setKataKunciSearch] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Semua");
  const [bertindakSebagai, setBertindakSebagai] = useState(
    "Wakil Wajib Pajak (Pengurus)"
  );
  const [jenisIdentitas, setJenisIdentitas] = useState("NPWP");
  const [nomorIdentitas, setNomorIdentitas] = useState("");
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [status, setStatus] = useState("");
  const [isNikValid, setIsNikValid] = useState(false);
  const [detilSearchNik, setDetilSearchNik] = useState("");
  const [openConfirmationSearchNik, setOpenConfirmationSearchNik] =
    useState(false);
  const [openFoundNik, setOpenFoundNik] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [openLoading, setOpenLoading] = useState(false);
  const [penandatanganPagination, setPenandatanganPagination] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  // Handle Bertindak Sebagai input change
  const handleBertindakSebagaiChange = (e) => {
    setBertindakSebagai(e.target.value);
  };

  // Handle Jenis Identitas input change
  const handleJenisIdentitasChange = (e) => {
    setJenisIdentitas(e.target.value);
    setNomorIdentitas("");
    setNamaIdentitas("");
  };

  // Handle Search Nik
  const handleSearchNik = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenLoading(true);

    setTimeout(async () => {
      if (nomorIdentitas.length !== 0 && namaIdentitas.length !== 0) {
        setIsNikValid(true);
        setOpenLoading(false);
        setOpenFoundNik(true);
      } else {
        setDetilSearchNik(
          "NIK002 - Data NIK tidak ditemukan. Cek kembali kesesuaian penulisan NIK atau Silahkan menghubungi Call Center Dukcapil dengan Nomor Call Center: 1500537"
        );
        setOpenLoading(false);
        setOpenConfirmationSearchNik(true);
      }
    }, 500);
  };

  const handleCloseConfirmationSearchNik = () => {
    setOpenConfirmationSearchNik(false);
  };

  const handleCloseConfirmationFoundNik = () => {
    setOpenFoundNik(false);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  let findDate = new Date(); // Get the current date
  let currentMonth = findDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January)
  let currentYear = findDate.getFullYear(); // Get the current year

  let masaTahunPajakOptions = [];

  // Loop for the current year and the previous 3 years
  for (let year = currentYear; year > currentYear - 3; year--) {
    // For the current year, start from the current month; for previous years, go until December
    let monthLimit = year === currentYear ? currentMonth : 12;

    for (let month = monthLimit; month >= 1; month--) {
      // Format the month as a two-digit string (e.g., '01', '02', ...)
      let formattedMonth = month < 10 ? "0" + month : month;

      // Add the month and year as an object to the array
      masaTahunPajakOptions.push({
        label: `${formattedMonth}-${year}`,
      });
    }
  }

  let pencairanBerdasarkanOptions = [
    {
      label: "Semua",
    },
    {
      label: "Nomor Identitas",
    },
    {
      label: "Nama",
    },
  ];

  useEffect(() => {
    getAllPenandatanganData();
  }, [page, limit]);

  const getAllPenandatanganData = async () => {
    setOpenLoading(true);

    setTimeout(async () => {
      const response = await axios.post(
        `${tempUrl}/eBupot2126PenandatangansByUserPagination?search_query=&page=${page}&limit=${limit}`,
        {
          userEBupot2126PenandatanganId: user.id,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setPenandatanganPagination(response.data.eBupot2126Penandatangans);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setOpenLoading(false);
    }, 500);
  };

  const searcAllPenandatanganData = async () => {
    if (pencairanBerdasarkan.length !== 0 && kataKunciSearch.length !== 0) {
      setOpenLoading(true);

      setTimeout(async () => {
        const response = await axios.post(
          `${tempUrl}/eBupot2126PenandatangansByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
          {
            pencairanBerdasarkan,
            kataKunciSearch,
            userEBupot2126PenandatanganId: user.id,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setPenandatanganPagination(response.data.penandatangans);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
        setOpenLoading(false);
      }, 500);
    } else if (kataKunciSearch.length === 0) {
      setOpenLoading(true);

      getAllPenandatanganData();
      setTimeout(async () => {
        setOpenLoading(false);
      }, 500);
    }
  };

  const ubahStatusPenandatangan = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/updateEBupot2126PenandatanganStatus/${id}`, {
        _id: user.id,
        token: user.token,
      });
      getAllPenandatanganData();
      setTimeout(async () => {
        setOpenLoading(false);
        setOpenSaved(true);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
      setOpenLoading(false);
    }
  };

  const deletePenandatangan = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/deleteEBupot2126Penandatangan/${id}`, {
        _id: user.id,
        token: user.token,
      });
      setPenandatanganPagination([]);
      navigate("/ebupotUnifikasi/daftarDisetorSendiri");
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setOpenLoading(false);
  };

  const savePenandatangan = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCheckValid;

    if (jenisIdentitas === "NPWP") {
      tempCheckValid =
        form.checkValidity() &&
        nomorIdentitas.length >= 15 &&
        namaIdentitas.length !== 0;
    } else {
      tempCheckValid =
        form.checkValidity() &&
        nomorIdentitas.length >= 16 &&
        namaIdentitas.length !== 0 &&
        isNikValid === true;
    }

    if (tempCheckValid) {
      try {
        setOpenLoading(true);
        let savedPenandatangan = await axios.post(
          `${tempUrl}/saveEBupot2126Penandatangan`,
          {
            userId: user.id,
            bertindakSebagai,
            jenisIdentitas,
            nomorIdentitas,
            namaIdentitas,
            status,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        getAllPenandatanganData();
        setTimeout(async () => {
          setOpenLoading(false);
          setOpenSaved(true);
          setNomorIdentitas("");
          setNamaIdentitas("");
          setStatus(false);
        }, 500);
      } catch (error) {
        // alert(error.response.data.message);
        setOpenLoading(false);
        setDetilSearchNik(error.response.data.message);
        setOpenConfirmationSearchNik(true);
        setNomorIdentitas("");
        setNamaIdentitas("");
        setStatus(false);
      }
    } else {
      if (isNikValid === false) {
        setDetilSearchNik(
          "Pastikan NIK dan nama Anda sudah benar dan status valid telah aktif."
        );
        setOpenConfirmationSearchNik(true);
      }
    }
    setValidated(true);
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

  const searchContainer = {
    display: screenSize >= 900 && "flex",
  };

  const searchWrapper1 = {
    flex: screenSize >= 900 && 1,
  };

  const searchWrapper2 = {
    flex: screenSize >= 900 && 1,
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

  const inputWrapper = {
    width: screenSize >= 900 ? "60%" : "100%",
    color: "#646c9a",
  };

  const inputRadioWrapper = {
    display: screenSize >= 900 && "flex",
  };

  const inputRadio = {
    cursor: "pointer",
    marginLeft: screenSize >= 900 && "20px",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/pengaturan/penandatangan"} />
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
          <MenuEbupot2126Pengaturan />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar Penandatangan Bukti Potong 21 dan SPT Masa 21
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={savePenandatangan}
              >
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-2"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Bertindak Sebagai
                        </Form.Label>
                        <Col sm="9" className="mt-2">
                          <div style={inputRadioWrapper}>
                            <Form.Check
                              type="radio"
                              label="Wakil Wajib Pajak (Pengurus)"
                              name="Wakil Wajib Pajak (Pengurus)"
                              value="Wakil Wajib Pajak (Pengurus)"
                              checked={
                                bertindakSebagai ===
                                "Wakil Wajib Pajak (Pengurus)"
                              }
                              onChange={handleBertindakSebagaiChange}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Identitas
                        </Form.Label>
                        <Col sm="9" className="mt-2">
                          <div style={inputRadioWrapper}>
                            <Form.Check
                              type="radio"
                              label="NPWP"
                              name="NPWP"
                              value="NPWP"
                              checked={jenisIdentitas === "NPWP"}
                              onChange={handleJenisIdentitasChange}
                              style={{ cursor: "pointer" }}
                            />
                            <Form.Check
                              type="radio"
                              label="NIK"
                              name="NIK"
                              value="NIK"
                              checked={jenisIdentitas === "NIK"}
                              onChange={
                                bertindakSebagai ===
                                  "Wakil Wajib Pajak (Pengurus)" &&
                                handleJenisIdentitasChange
                              }
                              style={inputRadio}
                            />
                          </div>
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputWrapper}>
                      {jenisIdentitas === "NPWP" ? (
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            NPWP
                          </Form.Label>
                          <Col sm="9">
                            <InputGroup>
                              <InputGroup.Text id="basic-addon1">
                                <PriceChangeIcon color="disabled" />
                              </InputGroup.Text>
                              <Form.Control
                                required
                                value={nomorIdentitas}
                                isInvalid={
                                  validated &&
                                  nomorIdentitas.length > 0 &&
                                  nomorIdentitas.length < 15
                                }
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, "");

                                  if (value.length <= 15) {
                                    setNomorIdentitas(value);
                                  }

                                  if (value.length >= 15) {
                                    setNamaIdentitas(getRandomIndonesianName());
                                  } else {
                                    setNamaIdentitas("");
                                  }
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Isian belum lengkap.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      ) : (
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            NIK
                          </Form.Label>
                          <Col sm="9">
                            <InputGroup>
                              <InputGroup.Text id="basic-addon1">
                                <BadgeIcon color="disabled" />
                              </InputGroup.Text>
                              <Form.Control
                                required
                                value={nomorIdentitas}
                                isInvalid={
                                  nomorIdentitas.length > 0 &&
                                  nomorIdentitas.length < 16
                                }
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, "");

                                  if (value.length <= 16) {
                                    setNomorIdentitas(value);
                                  }

                                  setNamaIdentitas("");
                                  setIsNikValid(false);
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Isian belum lengkap.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      )}
                    </div>
                    <div style={inputWrapper}>
                      {jenisIdentitas === "NPWP" ? (
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Nama
                          </Form.Label>
                          <Col sm="9">
                            <InputGroup>
                              <InputGroup.Text id="basic-addon1">
                                <PersonIcon color="disabled" />
                              </InputGroup.Text>
                              <Form.Control
                                required
                                value={namaIdentitas}
                                readOnly
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      ) : (
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Nama
                          </Form.Label>
                          <Col sm="9">
                            <InputGroup>
                              <InputGroup.Text id="basic-addon1">
                                <PersonIcon color="disabled" />
                              </InputGroup.Text>
                              <Form.Control
                                required
                                value={namaIdentitas}
                                onChange={(e) => {
                                  setNamaIdentitas(
                                    e.target.value.toUpperCase()
                                  );
                                  setIsNikValid(false);
                                }}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      )}
                    </div>
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Status
                        </Form.Label>
                        <Col sm="9" className="mt-2">
                          <Form.Check
                            type="checkbox"
                            label="Aktif"
                            checked={status}
                            onChange={() => setStatus(!status)}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    {jenisIdentitas === "NIK" && (
                      <div style={inputWrapper}>
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="3"
                            style={{ visibility: "hidden" }}
                          >
                            Cek
                          </Form.Label>
                          <Col sm="4">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                className="hover-button"
                                style={{ marginRight: "4px" }}
                                onClick={handleSearchNik}
                              >
                                <SearchIcon
                                  fontSize="small"
                                  style={{ marginRight: "4px" }}
                                />
                                Cek
                              </button>
                            </div>
                          </Col>
                          <Col sm="5">
                            {isNikValid === true ? (
                              <div style={{ display: "flex" }}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch checked={isNikValid} readOnly />
                                    }
                                  />
                                </FormGroup>
                                <p style={{ marginTop: "8px" }}>Valid</p>
                              </div>
                            ) : (
                              <div style={{ display: "flex" }}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch checked={isNikValid} readOnly />
                                    }
                                  />
                                </FormGroup>
                                <p style={{ marginTop: "8px" }}>Tidak Valid</p>
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="hover-button"
                    style={{ marginRight: "4px" }}
                    type="submit"
                  >
                    <SaveIcon fontSize="small" style={{ marginRight: "4px" }} />
                    Simpan
                  </button>
                  <button
                    className="blank-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setNomorIdentitas("");
                      setNamaIdentitas("");
                      setStatus(false);
                    }}
                  >
                    <ReplayIcon
                      fontSize="small"
                      style={{ marginRight: "4px" }}
                    />
                    Batal
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar Penandatangan Bukti Potong
            </Card.Header>
            <Card.Body>
              <div style={{ marginTop: "20px" }}>
                <div style={searchContainer}>
                  <div style={searchWrapper1}>
                    <div style={{ marginBottom: "5px" }}>
                      Pencarian Berdasarkan
                    </div>
                    <div>
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={pencairanBerdasarkanOptions}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                        onInputChange={(e, value) => {
                          setPencairanBerdasarkan(value);
                        }}
                        inputValue={pencairanBerdasarkan}
                        value={pencairanBerdasarkan}
                      />
                    </div>
                  </div>
                  <div style={searchWrapper2}>
                    <div style={{ marginBottom: "5px" }}>Kata Kunci</div>
                    <div>
                      <Form.Control
                        required
                        className="mb-3"
                        value={kataKunciSearch}
                        onChange={(e) => setKataKunciSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={searchWrapper3}>
                    <div style={{ marginBottom: "5px", visibility: "hidden" }}>
                      Pencarian
                    </div>
                    <div>
                      <button
                        className="cari-pralapor-button"
                        onClick={searcAllPenandatanganData}
                      >
                        <SearchIcon style={{ marginRight: "5px" }} />
                        Cari
                      </button>
                    </div>
                  </div>
                </div>
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
                <ShowTablePenandatangan
                  currentPosts={penandatanganPagination}
                  ubahStatusPenandatangan={ubahStatusPenandatangan}
                />
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
        open={openConfirmationSearchNik}
        onClose={handleCloseConfirmationSearchNik}
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
                <HighlightOffIcon color="error" sx={{ fontSize: 80 }} />
              </div>
              <b>Kesalahan</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {detilSearchNik}
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
              style={{ paddingTop: "10px" }}
              onClick={handleCloseConfirmationSearchNik}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openLoading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
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
              <b>Memproses</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>Mohon Sabar Menunggu</p>
                <Spinner animation="border" variant="primary" />
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog
        open={openFoundNik}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
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
                <InfoOutlinedIcon color="info" sx={{ fontSize: 80 }} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ textAlign: "center" }}
            >
              Data ditemukan.
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
              style={{
                paddingTop: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                padding: "10px 20px 10px 20px",
              }}
              onClick={handleCloseConfirmationFoundNik}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openSaved}
        onClose={handleCloseSaved}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
        fullWidth
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
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
              </div>
              <b>Sukses</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Data berhasil disimpan.
              </div>
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
              style={{ paddingTop: "10px" }}
              onClick={handleCloseSaved}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default TampilEbupot2126Penandatangan;

const menuLaporContainer = {
  display: "flex",
  marginTop: "40px",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
