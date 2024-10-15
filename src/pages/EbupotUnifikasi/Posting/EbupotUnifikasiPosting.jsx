import React, { useState, useContext, useEffect } from "react";
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
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk memasukkan data bukti
        pemotongan kedalam Surat Pemberitahuan (SPT) Masa Pajak penghasilan
        (PPh) Unifikasi
      </p>
      <p>
        Untuk melakukan posting data Bukti Pemotongan kedalam SPT, pastikan Anda
        telah merekam semua data pada periode pelaporan Surat Pemberitahuan
        (SPT) Masa. Berikut ini adalah langkah-langkah melakukan posting Data
        Bukti Potong
      </p>
      <p>
        Pilih Periode Pajak (tahun dan masa pajak) kemudian klik tombol Check
      </p>
      <ol>
        <li>
          Sistem akan melakukan pengecekan data Bukti pemotongan dan/atau PPh
          disetor sendiri yang siap diposting sesuai dengan Masa Pajak yang
          ditentukan
        </li>
        <li>
          Berdasarkan hasil pengecekan, sistem akan menampilkan notifikasi
          pembuatan/pembetulan SPT sesuai dengan Masa Pajak yang ditentukan
        </li>
        <li>
          Jika Anda telah meyakini akan membuat/membetulkan SPT, klik tombol Ok
          pada tampilan notifikasi
        </li>
        <li>
          Sistem secara otomatis akan membentuk data SPT Masa PPh Unifikasi dan
          mengisikan daftar bukti pemotongan pada SPT Tersebut
        </li>
        <li>
          Setelah Anda melakukan proses Posting, lakukan perekaman bukti
          pembayaran pada menu Perekaman Bukti Penyetoran
        </li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiPosting() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // 01.) Accordion 1
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

  const [openSaved, setOpenSaved] = useState(false);
  const [openConfirmationSaved, setOpenConfirmationSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openLoadingPosting, setOpenLoadingPosting] = useState(false);
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

  const posting = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCondition =
      form.checkValidity() && tahunPajak.length !== 0 && masaPajak.length !== 0;

    if (tempCondition) {
      handleCloseConfirmationSaved(e);

      setOpenLoadingPosting(true);
      let eBupotUnifikasiPosted = await axios.post(
        `${tempUrl}/eBupotUnifikasiPosting`,
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
        setOpenLoadingPosting(false);
        setOpenSaved(true);
      }, 1000);
    } else {
      setValidated(true);
    }
  };

  const savedEbupotUnifikasiPosting = async (e) => {
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

  const inputPostingWrapper = {
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
              <EditIcon style={{ marginRight: "10px" }} />
              Posting Data Pajak Penghasilan
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleClickOpenConfirmationSaved}
              >
                <div style={inputPostingContainer}>
                  <div style={inputPostingWrapper}>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-4"
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
                        className="mb-4"
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
                  </div>
                </div>
                <hr />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="hover-button"
                    style={{ marginRight: "4px" }}
                    type="submit"
                  >
                    <SaveIcon fontSize="small" style={{ marginRight: "4px" }} />
                    Simpan
                  </button>
                </div>
              </Form>
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
        open={openLoadingPosting}
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
              <b>Posting Bukti Potong</b>
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
              onClick={posting}
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
              onClick={savedEbupotUnifikasiPosting}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiPosting;

const inputPostingContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
};
