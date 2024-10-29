import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupotUnifikasi,
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import { ShowTableEbupotUnifikasiDaftarDokumenImporData } from "../../../components/ShowTable";
import { getMonthIndex } from "../../../constants/helper";
import {
  Card,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
  Button,
} from "react-bootstrap";
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
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RefreshIcon from "@mui/icons-material/Refresh";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk mengunggah data bukti
        pemotongan dalam format Excel (.xls). Ditujukan bagi Pemotong PPh yang
        menerbitkan bukti pemotongan dalam jumlah banyak yang tidak dapat
        direkam menggunakan fitur key in.
      </p>
      <p>
        Untuk format excel yang diupload Anda dapat mengunduhnya{" "}
        <a href="https://docs.google.com/spreadsheets/d/1PztfrNszTNO2NWLlyEbbpa5oT80zOCt9/export?format=xls">
          disini
        </a>
      </p>
      <p>Terdapat 2 bagian pada form ini:</p>
      <p>
        <b>Unggah Bukti Pemotongan,</b>berikut ini ketentuannya
      </p>
      <p>
        Bagian ini digunakan untuk memilih file dengan format .xls untuk
        diunggah.
      </p>
      <ol>
        <li>
          Aturan penamaan file adalah diawali dengan {"<15 digit NPWP>.xls"}
        </li>
        <li>
          Contoh: untuk WP dengan NPWP 123456789012345, nama file dapat berupa:
          <ol>
            <li>123456789012345.xls</li>
            <li>123456789012345_1.xls</li>
            <li>123456789012345 20171011 1.xls</li>
          </ol>
        </li>
      </ol>
      <p>
        <b>Daftar Dokumen</b>
      </p>
      <p>
        Bagian ini berfungsi untuk melakukan monitoring atas file .xls yang
        telah diimpor.
      </p>
      <ol>
        <li>
          Jika file sukses diimpor, maka kolom Status berisi "Validasi selesai".
        </li>
        <li>
          Jika file gagal diimpor, maka kolom Status berisi "Error validasi",
          dan akan ada tombol Lihat untuk mengetahui detil error. Silakan Anda
          klik
        </li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiImporData() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year

  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = [];

  for (let i = 0; i < 3; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajak, setTahunPajak] = useState("");

  const [masaPajak, setMasaPajak] = useState("");
  const [masaPajakOptions, setMasaPajakOptions] = useState([]);

  const [fileSertifikatElektronik, setFileSertifikatElektronik] =
    useState(null);
  const fileInputSertifikatElektronikRef = useRef(null);

  const handleButtonClickSertifikatElektronik = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputSertifikatElektronikRef.current.click();
  };
  const handleFileSertifikatElektronikChange = (event) => {
    setFileSertifikatElektronik(event.target.files[0]);
  };
  const handleSubmit = () => {
    if (fileSertifikatElektronik) {
      alert(`File selected: ${fileSertifikatElektronik.name}`);
      // You can add further logic to upload the file
    } else {
      alert("No file selected.");
    }
  };

  const [
    eBupotUnifikasiDaftarDokumenImporDataPagination,
    setEBupotUnifikasiDaftarDokumenImporDataPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const [openSaved, setOpenSaved] = useState(false);
  const [openConfirmationSaved, setOpenConfirmationSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openLoadingImporData, setOpenLoadingImporData] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  const handleClickOpenConfirmationSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmationSaved(true);
  };

  const handleCloseConfirmationSaved = () => {
    setOpenConfirmationSaved(false);
  };

  useEffect(() => {}, []);

  const findMasaPajakOptions = async (tahunPajak) => {
    setOpenSearchIdentitasWp(true);
    let masaPajakList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    let currentDate = new Date(); // Get the current date
    let currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2024)
    let currentMonth = currentDate.getMonth() + 1; // Get the current month (1-based, 1 for January, 10 for October, etc.)

    let masaPajakOptions = [];

    // Check if the tahunPajak matches the current year
    if (tahunPajak === currentYear.toString()) {
      // Create a new array containing months from "Januari" to the current month
      masaPajakOptions = masaPajakList.slice(0, currentMonth); // Slice the months up to the current month
    } else {
      // If the tahunPajak is not the current year, include all months
      masaPajakOptions = [...masaPajakList]; // Return all months
    }

    setMasaPajakOptions(masaPajakOptions);

    setOpenSearchIdentitasWp(false);
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchIdentitasWp(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const imporData = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCondition =
      form.checkValidity() && tahunPajak.length !== 0 && masaPajak.length !== 0;

    if (tempCondition) {
      handleCloseConfirmationSaved(e);

      setOpenLoadingImporData(true);
      let eBupotUnifikasiPosted = await axios.post(
        `${tempUrl}/eBupotUnifikasiImporData`,
        {
          userId: user.id,

          // 01.) Accordion 1
          tahunPajak,
          masaPajak,

          userIdInput: user.id,
          kodeCabang: user.cabang.id,
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        setOpenLoadingImporData(false);
        setOpenSaved(true);
      }, 1000);
    } else {
      setValidated(true);
    }
  };

  const savedEbupotUnifikasiImporData = async (e) => {
    setOpenSaved(false);

    // 01.) Accordion 1
    setTahunPajak("");
    setMasaPajak("");

    setOpenSaved(false);
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

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  const inputImporDataWrapper = {
    width: screenSize >= 900 && "50%",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupotUnifikasi username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupotUnifikasi
        activeLink={"/ebupotUnifikasi/daftarDisetorSendiri"}
      />
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
          <MenuEbupotUnifikasi />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <IosShareIcon style={{ marginRight: "10px" }} />
              Impor Data Pajak Penghasilan
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                // onSubmit={handleClickOpenConfirmationSaved}
              >
                <div style={inputImporDataContainer}>
                  <div style={inputImporDataWrapper}>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          NPWP
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            value={user.npwp15.replace(
                              /^(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})$/,
                              "$1.$2.$3.$4-$5.$6"
                            )}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          Jenis Bukti Potong
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            value={"PASAL 4(2), 15, 22, 23, dan 26"}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          Tahun Pajak
                        </Form.Label>
                        <Col sm="8">
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={tahunPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={validated && tahunPajak.length === 0}
                                helperText={
                                  validated &&
                                  tahunPajak.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setTahunPajak(value);
                              findMasaPajakOptions(value);
                            }}
                            inputValue={tahunPajak}
                            value={tahunPajak}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          Masa Pajak
                        </Form.Label>
                        <Col sm="8">
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={masaPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={validated && masaPajak.length === 0}
                                helperText={
                                  validated &&
                                  masaPajak.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setMasaPajak(value);
                            }}
                            inputValue={masaPajak}
                            value={masaPajak}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          File (*.xls)
                        </Form.Label>
                        <Col sm="8">
                          <button
                            className="upload-sertifikat-elektronik-button"
                            variant="primary"
                            onClick={handleButtonClickSertifikatElektronik}
                          >
                            Pilih File Bukti Pemotongan
                          </button>
                          <Form.Control
                            type="file"
                            ref={fileInputSertifikatElektronikRef}
                            onChange={handleFileSertifikatElektronikChange}
                            style={{ display: "none" }} // Hide the file input
                          />
                          <Form.Label>
                            Ukuran file maksimal 2MB berformat .xls
                          </Form.Label>
                          <Form.Label style={{ color: "#fd397a" }}>
                            Pastikan tidak melakukan impor excel dengan data
                            yang sama apabila terdapat excel yang belum selesai
                            diproses sebelumnya
                          </Form.Label>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="hover-button"
                    style={{ marginRight: "4px" }}
                    type="submit"
                  >
                    <FileUploadIcon
                      fontSize="small"
                      style={{ marginRight: "4px" }}
                    />
                    Unggah
                  </button>
                  <button className="blank-button">
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                  Daftar Dokumen
                </div>
                <div>
                  <button
                    className="ebupot-unifikasi-refresh-button"
                    // onClick={getEBupotUnifikasiPenyiapanSptTerkirimData}
                  >
                    <RefreshIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
                    Refresh
                  </button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
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
                <ShowTableEbupotUnifikasiDaftarDokumenImporData
                  currentPosts={eBupotUnifikasiDaftarDokumenImporDataPagination}
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
        open={openConfirmationSearchIdentitasWp}
        onClose={handleCloseConfirmationSearchSuratSetoranPajak}
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
              {detilSearchIdentitasWp}
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
              onClick={handleCloseConfirmationSearchSuratSetoranPajak}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openSearchIdentitasWp}
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
        open={openLoadingImporData}
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
              <b>ImporData Bukti Potong</b>
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
        open={openFoundIdentitasWp}
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
              onClick={handleCloseConfirmationFoundSuratSetoranPajak}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmationSaved}
        onClose={handleCloseConfirmationSaved}
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
                Anda akan memperbaharui SPT {tahunPajak}/
                {getMonthIndex(masaPajak)} revisi ke-0?
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="warning"
              style={{ paddingTop: "10px" }}
              onClick={handleCloseConfirmationSaved}
            >
              Batal
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={imporData}
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
                Berhasil Mengirim Bukti Potong.
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
              style={{
                paddingTop: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                padding: "10px 20px 10px 20px",
              }}
              onClick={savedEbupotUnifikasiImporData}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiImporData;

const inputImporDataContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
  color: "#646c9a",
};

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
