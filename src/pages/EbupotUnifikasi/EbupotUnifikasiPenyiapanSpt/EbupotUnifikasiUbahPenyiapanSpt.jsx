import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupotUnifikasiSptMasa,
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import { dasarPemotonganDokumenOptions } from "../../../constants/helper";
import { ShowTableEbupotUnifikasiBuktiSetorPenyiapanSpt } from "../../../components/ShowTable";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Pagination,
} from "@mui/material";
import DatePicker from "react-datepicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Dalam proses ini, sistem akan membimbing Anda
        untuk melengkapi SPT dengan merekam data Lampiran DOSS Bagian III nomor
        7, data Lampiran DOPP Bagian IV nomor 34, 35, 36, menambahkan data
        pembayaran ke SPT dan melengkapi data penandatangan SPT, berikut adalah
        langkah-langahnya:
      </p>
      <ol>
        <li>
          Silahkan melakukan perekaman detail Lampiran DOSS Bagian III nomor 7
          jika ada transaksi atas Imbalan yang diterima/diperoleh sehubungan
          dengan pengangkutan orang dan/atau barang termasuk penyewaan kapal
          laut oleh perusahaan pelayaran dalam negeri
        </li>
        <li>
          Silahkan melakukan perekaman detail Lampiran DOPP Bagian IV nomor 34
          35 dan 36 jika ada transaksi terkait Bunga Deposito/Tabungan, Diskonto
          SBI, Jasa Giro, Penjualan Saham dan/atau Bunga Diskonto Obligasi dan
          Surat Berharga
        </li>
        <li>Periksa Kembali apakah data penyetoran sudah lengkap</li>
        <li>
          Klik panel PENANDATANGAN, kemudian tentukan penandatangan dokumen SPT
          tersebut
        </li>
        <li>Klik tombol SIMPAN untuk menyelesaikan proses ini</li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiUbahPenyiapanSpt() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionState, setAccordionState] = useState("1");

  const [nama, setNama] = useState(user.nama);
  const [npwp, setNpwp] = useState(user.npwp15);
  const [nikNpwp16, setNikNpwp16] = useState(user.nikNpwp16);
  const [nitku, setNitku] = useState(user.nitku);
  const [pembetulanKe, setPembetulanKe] = useState("");
  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

  // 01.) Accordion 1

  // 03.) Accordion 3
  const [
    eBupotUnifikasiBuktiSetorPagination,
    setEBupotUnifikasiBuktiSetorPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  // 04.) Accordion 4
  const [bertindakSebagai, setBertindakSebagai] = useState("");
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [openSaved, setOpenSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);
  const [penandatangans, setPenandatangans] = useState([]);

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  let namaIdentitasOptions = penandatangans.map((namaIdentitas) => ({
    label: `${namaIdentitas.namaIdentitas}`,
  }));

  let bertindakSebagaiOptions = [
    {
      label: "Pengurus",
    },
    {
      label: "Kuasa",
    },
  ];

  useEffect(() => {
    getEbupotUnifikasiUbahPenyiapanSptById();
  }, []);

  const getEbupotUnifikasiUbahPenyiapanSptById = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPenyiapanSpts/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    // 01.) Accordion 1
    setTahunPajak(response.data.tahunPajak);
    setMasaPajak(response.data.masaPajak);
    setPembetulanKe(response.data.pembetulanKe);

    getEBupotUnifikasiBuktiSetorData(
      response.data.tahunPajak,
      response.data.masaPajak
    );

    // 04.) Accordion 4
    setBertindakSebagai(response.data.penandatangan.bertindakSebagai);
    setNamaIdentitas(response.data.penandatangan.namaIdentitas);

    setOpenSearchIdentitasWp(false);
  };

  const getEBupotUnifikasiBuktiSetorData = async (tahunPajak, masaPajak) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination`,
      {
        userEBupotUnifikasiBuktiSetorId: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiBuktiSetorPagination(
      response.data.eBupotUnifikasiBuktiSetors
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const getPenandatangan = async (bertindakSebagai) => {
    if (bertindakSebagai === "Pengurus") {
      bertindakSebagai = "Wakil Wajib Pajak (Pengurus)";
    }

    const response = await axios.post(
      `${tempUrl}/penandatangansByUserByBertindakSebagai`,
      {
        bertindakSebagai,
        userPenandatanganId: user.id,
        _id: user.id,
        token: user.token,
      }
    );
    if (response.data.length > 0) {
      setPenandatangans(response.data);
      setOpenSearchIdentitasWp(true);

      setTimeout(async () => {
        setOpenSearchIdentitasWp(false);
      }, 500);
    } else {
      setPenandatangans([]);
      setNamaIdentitas("");
    }
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchIdentitasWp(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const updateEbupotUnifikasiUbahPenyiapanSpt = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      bertindakSebagai.length !== 0 && namaIdentitas.length !== 0;

    if (handlingInput) {
      try {
        let updatedEBupotUnifikasiPenyiapanSpt = await axios.post(
          `${tempUrl}/updateEBupotUnifikasiPenyiapanSpt/${id}`,
          {
            userId: user.id,

            // 04.) Accordion 4
            namaIdentitas,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setOpenSearchIdentitasWp(true);
        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          navigate("/ebupotUnifikasi/sptMasa/penyiapanSpt");
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupotUnifikasiUbahPenyiapanSpt = async (e) => {
    setOpenSaved(false);

    setValidated(false);
    setAccordionState("1");

    // 01.) Accordion 1
    setTahunPajak("");
    setMasaPajak("");

    // 04.) Accordion 4
    setBertindakSebagai("");
    setNamaIdentitas("");
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

  const inputWrapper = {
    width: "100%",
    color: "#646c9a",
    display: "flex",
    flexDirection: screenSize <= 900 && "column",
  };

  const inputInput1 = {
    flex: 1,
  };

  const inputInput2 = {
    flex: 1,
    marginLeft: screenSize >= 900 && "20px",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupotUnifikasi username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupotUnifikasi
        activeLink={"/ebupotUnifikasi/sptMasa/rekamBuktiSetor"}
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
          <MenuEbupotUnifikasiSptMasa />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Lengkapi SPT
            </Card.Header>
            <Card.Body>
              <div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Nama
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={nama} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputInput2}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Tahun/Masa Pajak
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={`${tahunPajak}/${masaPajak}`}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        NPWP
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={`${npwp} / ${nikNpwp16}`}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputInput2}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Pembetulan
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={pembetulanKe} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        NITKU
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={nitku} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputInput2}></div>
                </div>
                <Accordion defaultExpanded={accordionState === "1" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={accordionBlue}
                  >
                    Perekaman Lampiran DOSS
                  </AccordionSummary>
                  <AccordionDetails>
                    <div></div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={accordionYellow}
                  >
                    Perekaman Lampiran DOPP
                  </AccordionSummary>
                  <AccordionDetails>
                    <div></div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    style={accordionBlue}
                  >
                    Dokumen Dasar Pemotongan
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card style={{ marginTop: "20px" }}>
                      <Card.Header style={inputTitle}>
                        <FormatListBulletedIcon
                          style={{ marginRight: "10px" }}
                        />
                        Daftar Bukti Setor
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
                          <ShowTableEbupotUnifikasiBuktiSetorPenyiapanSpt
                            currentPosts={eBupotUnifikasiBuktiSetorPagination}
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
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                    style={accordionYellow}
                  >
                    Penandatangan
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={updateEbupotUnifikasiUbahPenyiapanSpt}
                      >
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                Penandatangan Sebagai
                              </Form.Label>
                              <Col sm="7">
                                <Autocomplete
                                  size="small"
                                  disablePortal
                                  id="combo-box-demo"
                                  options={bertindakSebagaiOptions}
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      error={
                                        validated &&
                                        bertindakSebagai.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        bertindakSebagai.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setBertindakSebagai(value);
                                    getPenandatangan(value);
                                  }}
                                  inputValue={bertindakSebagai}
                                  value={bertindakSebagai}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </div>
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                Penandatangan Bukti Potong
                              </Form.Label>
                              <Col sm="7">
                                <Autocomplete
                                  size="small"
                                  disablePortal
                                  id="combo-box-demo"
                                  options={namaIdentitasOptions}
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      error={
                                        validated && namaIdentitas.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        namaIdentitas.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setNamaIdentitas(value);
                                  }}
                                  inputValue={namaIdentitas}
                                  value={namaIdentitas}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </div>
                        <hr />
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
                            <SaveIcon
                              fontSize="small"
                              style={{ marginRight: "4px" }}
                            />
                            Simpan
                          </button>
                          <button
                            className="blank-button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate("/ebupotUnifikasi/sptMasa/penyiapanSpt");
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
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
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
                Data berhasil disimpan. Apakah Anda ingin merekam Bukti Potong
                Pasal 26 lagi?
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
              onClick={() => {
                navigate("/ebupotUnifikasi/daftarPenyiapanSpt");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupotUnifikasiUbahPenyiapanSpt}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiUbahPenyiapanSpt;

const accordionBlue = {
  backgroundColor: "#a1ccf7",
  color: "black",
  fontWeight: 600,
};

const accordionYellow = {
  backgroundColor: "#ffefcc",
  color: "black",
  fontWeight: 600,
};

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const profilWrapper = {
  flex: 1,
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
