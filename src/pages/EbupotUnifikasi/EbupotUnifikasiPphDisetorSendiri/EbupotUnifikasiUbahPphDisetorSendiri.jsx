import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { formatDate } from "../../../constants/helper";
import { Card, Form, Row, Col, Spinner } from "react-bootstrap";
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
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini menampilkan data Data Bukti Setor atas
        PPh yang disetor sendiri yang telah direkam.
      </p>
      <p>
        Anda dapat menggunakan form ini untuk melihat data ringkas Bukti Setor
        atas PPh yang disetor sendiri yang mencakup Masa Pajak, Objek Pajak,
        Nomor Bukti Setor serta nominal Jumlah Penghasilan Bruto dan PPh yang
        disetor.
      </p>
      <p>
        Pada kolom paling kanan, tersedia tombol aksi yang berfungsi untuk :
      </p>
      <ul>
        <li>Melakukan perubahan data Bukti Setor yang sudah direkam.</li>
        <li>Melakukan penghapusan data Bukti Setor sudah direkam.</li>
      </ul>
      <p>Kolom Status menunjukkan status dari Bukti Setor.</p>
      <p>
        Untuk melakukan filter pencarian data bukti setor, Anda dapat
        menggunakan filter yang disediakan mencakup filter dengan Nomor Bukti
        Setor maupun period.
      </p>
    </div>
  );
};

function EbupotUnifikasiUbahPphDisetorSendiri() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [jenisBuktiPenyetoran, setJenisBuktiPenyetoran] = useState(
    "Surat Setoran Pajak"
  );
  const [eBillingId, setEBillingId] = useState("");
  const [ntpnBilling, setNtpnBilling] = useState("");
  const [nomorPemindahbukuan, setNomorPemindahbukuan] = useState("");
  const [masaPajak, setMasaPajak] = useState("");
  const [jenisPajak, setJenisPajak] = useState("");
  const [jenisSetoran, setJenisSetoran] = useState("");
  const [kodeObjekPajak, setKodeObjekPajak] = useState("");
  const [jumlahPenghasilanBruto, setJumlahPenghasilanBruto] = useState("");
  const [jumlahSetor, setJumlahSetor] = useState("");
  const [tanggalSetor, setTanggalSetor] = useState("");

  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year

  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = [];

  for (let i = 0; i < 3; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajak, setTahunPajak] = useState("");

  const [validated, setValidated] = useState(false);
  const [detilSearchSuratSetoranPajak, setDetilSearchSuratSetoranPajak] =
    useState("");
  const [
    openConfirmationSearchSuratSetoranPajak,
    setOpenConfirmationSearchSuratSetoranPajak,
  ] = useState(false);
  const [openSearchSuratSetoranPajak, setOpenSearchSuratSetoranPajak] =
    useState(false);
  const [openFoundSuratSetoranPajak, setOpenFoundSuratSetoranPajak] =
    useState(false);
  const [objekPajaks, setObjekPajaks] = useState([]);

  // Handle Jenis Bukti Penyetoran input change
  const handleJenisBuktiPenyetoranChange = (e) => {
    setJenisBuktiPenyetoran(e.target.value);

    setMasaPajak("");
    setJenisPajak("");
    setJenisSetoran("");
    setJumlahSetor("");
    setTanggalSetor("");
  };

  let objekPajakOptions = objekPajaks.map((objekPajak) => ({
    label: `${objekPajak.kodeObjekPajak} - ${objekPajak.namaObjekPajak}`,
  }));

  // Check if there's an error Jumlah Penghasilan Bruto
  const errorJumlahPenghasilanBruto =
    parseInt(jumlahPenghasilanBruto) < parseInt(jumlahSetor);

  useEffect(() => {
    getKategoriKluById();
  }, []);

  const getObjekPajakData = async (jenisSetoranId) => {
    const response = await axios.post(`${tempUrl}/objekPajaksByJenisSetoran`, {
      jenisSetoranId,
      _id: user.id,
      token: user.token,
    });
    setObjekPajaks(response.data);
  };

  const getKategoriKluById = async () => {
    setOpenSearchSuratSetoranPajak(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPphDisetorSendiris/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    setJenisBuktiPenyetoran(response.data.jenisBuktiPenyetoran);
    setEBillingId(response.data.id);
    setNtpnBilling(response.data.ebilling.ntpnBilling);
    setNomorPemindahbukuan("");

    let tempMasaPajak = new Date(
      response.data.ebilling.tanggalSetorKodeBilling
    );
    setTahunPajak(tempMasaPajak.getFullYear());

    setMasaPajak(response.data.ebilling.masaPajakDariBulan);
    setJenisPajak(
      response.data.ebilling.jenissetoran.jenispajak.kodeJenisPajak
    );
    setJenisSetoran(response.data.ebilling.jenissetoran.kodeJenisSetoran);
    setKodeObjekPajak(
      `${response.data.objekpajak.kodeObjekPajak} - ${response.data.objekpajak.namaObjekPajak}`
    );
    setJumlahPenghasilanBruto(response.data.jumlahPenghasilanBruto);
    setJumlahSetor(response.data.ebilling.jumlahSetor);
    setTanggalSetor(formatDate(response.data.ebilling.tanggalSetorKodeBilling));
    getObjekPajakData(response.data.ebilling.jenissetoran.id);

    setOpenSearchSuratSetoranPajak(false);
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchSuratSetoranPajak(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundSuratSetoranPajak(false);
  };

  const updateEbupotUnifikasiUbahPphDisetorSendiri = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      ntpnBilling.length === 16 &&
      tahunPajak.length !== 0 &&
      kodeObjekPajak.length !== 0 &&
      parseInt(jumlahPenghasilanBruto) >= parseInt(jumlahSetor);

    if (handlingInput) {
      try {
        let updatedEBupotUnifikasiPphDisetorSendiri = await axios.post(
          `${tempUrl}/updateEBupotUnifikasiPphDisetorSendiri/${id}`,
          {
            kodeObjekPajak: kodeObjekPajak.split(" -", 2)[0],
            jumlahPenghasilanBruto,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setOpenSearchSuratSetoranPajak(true);
        setTimeout(async () => {
          navigate("/ebupotUnifikasi/daftarDisetorSendiri");
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      if (ntpnBilling.length !== 16) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Nomor Bukti Setor harus diisi 16 karakter."
        );
      } else if (tahunPajak.length === 0) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Tahun Pajak harus diisi angka."
        );
      } else if (
        parseInt(jumlahPenghasilanBruto) < parseInt(jumlahSetor) ||
        jumlahPenghasilanBruto.length === 0
      ) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Jumlah Bruto harus lebih dari 0."
        );
      } else if (kodeObjekPajak.length === 0) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Kode Objek Pajak harus diisi."
        );
      }

      setOpenConfirmationSearchSuratSetoranPajak(true);
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

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  const inputWrapper = {
    width: screenSize >= 900 ? "50%" : "100%",
    color: "#646c9a",
  };

  const inputWrapperCek = {
    width: screenSize >= 900 ? "40%" : "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: "#a7abc3",
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
              Ubah data Bukti Setor atas PPh yang disetor sendiri
            </Card.Header>
            <Card.Body>
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
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Jenis Bukti Penyetoran
                      </Form.Label>
                      <Col sm="4" className="mt-2">
                        <Form.Check
                          type="radio"
                          label="Surat Setoran Pajak"
                          name="Surat Setoran Pajak"
                          value="Surat Setoran Pajak"
                          checked={
                            jenisBuktiPenyetoran === "Surat Setoran Pajak"
                          }
                        />
                      </Col>
                      <Col sm="4" className="mt-2">
                        <Form.Check
                          type="radio"
                          label="Pemindahbukuan"
                          name="Pemindahbukuan"
                          value="Pemindahbukuan"
                          checked={jenisBuktiPenyetoran === "Pemindahbukuan"}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  {jenisBuktiPenyetoran === "Surat Setoran Pajak" && (
                    <>
                      <div style={inputWrapper}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            NTPN
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control value={ntpnBilling} disabled />
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputWrapper}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Tahun Pajak
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control value={tahunPajak} disabled />
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputWrapperCek}>
                        <button className="hover-button" disabled>
                          <SearchIcon style={{ marginRight: "4px" }} />
                          Cek Surat Setoran Pajak
                        </button>
                        <p style={{ marginTop: "20px" }}>
                          Pastikan bahwa Surat Setoran Pajak/Bukti
                          Pemindahbukuan yang direkam bukan merupakan penyetoran
                          atau bagian penyetoran atas transaksi yang dibuatkan
                          atau seharusnya dibuatkan Bukti Pemotongan/Pemungutan
                          Unifikasi Berformat Standar
                        </p>
                      </div>
                    </>
                  )}
                  {jenisBuktiPenyetoran === "Pemindahbukuan" && (
                    <>
                      <div style={inputWrapper}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Nomor Pemindahbukuan
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              value={nomorPemindahbukuan}
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputWrapperCek}>
                        <button className="hover-button" disabled>
                          <SearchIcon style={{ marginRight: "4px" }} />
                          Cek Pemindahbukuan
                        </button>
                        <p style={{ marginTop: "20px" }}>
                          Pastikan bahwa Surat Setoran Pajak/Bukti
                          Pemindahbukuan yang direkam bukan merupakan penyetoran
                          atau bagian penyetoran atas transaksi yang dibuatkan
                          atau seharusnya dibuatkan Bukti Pemotongan/Pemungutan
                          Unifikasi Berformat Standar
                        </p>
                      </div>
                    </>
                  )}
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Masa Pajak
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={masaPajak} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Jenis Pajak (MAP)
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={jenisPajak} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Jenis Setoran
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={jenisSetoran} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Kode Objek Pajak
                      </Form.Label>
                      <Col sm="8">
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={objekPajakOptions}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                          onInputChange={(e, value) => setKodeObjekPajak(value)}
                          value={kodeObjekPajak}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Jumlah Penghasilan Bruto
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          required
                          value={jumlahPenghasilanBruto}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          customInput={Form.Control}
                          style={{ textAlign: "right" }}
                          className={
                            errorJumlahPenghasilanBruto ? "is-invalid" : ""
                          }
                          onValueChange={(values) => {
                            setJumlahPenghasilanBruto(
                              values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "")
                            );
                          }}
                        />
                        {errorJumlahPenghasilanBruto && (
                          <Form.Control.Feedback type="invalid">
                            Jumlah Penghasilan Bruto harus lebih besar atau sama
                            dengan Jumlah Setor.
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Jumlah Setor (Rp)
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={jumlahSetor}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          customInput={Form.Control}
                          style={{ textAlign: "right" }}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Tanggal Setor
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={tanggalSetor} disabled />
                      </Col>
                    </Form.Group>
                  </div>
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
                  onClick={updateEbupotUnifikasiUbahPphDisetorSendiri}
                >
                  <SaveIcon style={{ marginRight: "4px" }} />
                  Simpan
                </button>
                <button
                  className="blank-button"
                  onClick={() => {
                    navigate("/ebupotUnifikasi/daftarDisetorSendiri");
                  }}
                >
                  <ReplayIcon style={{ marginRight: "4px" }} />
                  Batal
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        open={openConfirmationSearchSuratSetoranPajak}
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
              {detilSearchSuratSetoranPajak}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button"
              style={{ paddingTop: "10px" }}
              onClick={handleCloseConfirmationSearchSuratSetoranPajak}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openSearchSuratSetoranPajak}
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
        open={openFoundSuratSetoranPajak}
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
              className="hover-button"
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
    </div>
  );
}

export default EbupotUnifikasiUbahPphDisetorSendiri;
