import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, PetunjukPengisian } from "../../components/index";
import {
  HeaderMain,
  HeaderMainProfil,
  MenuEBilling,
} from "../../components/index";
import "../../constants/defaultProgram.css";
import CaptchaImage from "../../assets/Captcha Image.jpeg";
import { Card, Form, Row, Col } from "react-bootstrap";
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import InputMask from "react-input-mask";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { styled } from "@mui/material/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <ol>
        <li>Pilih Jenis Pajak yang akan Anda bayar</li>
        <li>Pilih Jenis Setoran yang sesuai</li>
        <li>
          Jika Anda memilih jenis setoran tahunan, masa pajak akan terisi
          otomatis masa tahunan, dan Anda TIDAK DAPAT mengubahnya
        </li>
        <li>
          Jika Anda memilih jenis setoran masa, pilih masa pajak yang sesuai
        </li>
        <li>
          Untuk Jenis Pajak dan Jenis Setoran tertentu, Anda dapat membuat kode
          Billing untuk NPWP lainnya
        </li>
        <li>
          Jika Pihak Lain yang Anda buatkan kode billing tidak memiliki NPWP,
          Masukkan NPWP dengan isian angka nol (0) sebanyak 9 digit, Kode KPP
          dan Kode Cabang "000"
        </li>
        <li>Pilih Tahun Pajak yang sesuai</li>
        <li>
          Jika Anda akan melakukan pembayaran Pajak atas Surat Tagihan Pajak
          atau Surat Ketetapan Pajak, masukkan Nomor SK yang Anda terima
        </li>
        <li>
          Untuk Pajak Bumi dan Bangunan Sektor P3 dan Jenis Pajak lain tertentu,
          isikan Nomor Objek Pajak (NOP) yang sesuai
        </li>
        <li>
          Klik Tombol "Buat Kode Billing" untuk proses pembuatan kode billing
        </li>
        <li>
          Jika proses berhasil, akan ditampilkan ringkasan informasi Surat Surat
          Elektronik beserta kode billing dan masa berlakunya
        </li>
      </ol>
    </div>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function EBilling() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [jenisPajak, setJenisPajak] = useState("");
  const [jenisSetoran, setJenisSetoran] = useState("");

  let dateToday = new Date();
  const [masaPajakDariBulan, setMasaPajakDariBulan] = useState(
    `${(dateToday.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`
  );
  const [masaPajakSampaiBulan, setMasaPajakSampaiBulan] = useState(
    `${(dateToday.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`
  );
  const [tahunPajak, setTahunPajak] = useState("");
  const [jumlahSetorMataUang, setJumlahSetorMataUang] = useState("");
  const [subjekPajak, setSubjekPajak] = useState("NPWP Sendiri");
  const [subjekPajakNpwp, setSubjekPajakNpwp] = useState(user.npwp15);
  const [subjekPajakNitku, setSubjekPajakNitku] = useState(user.nitku);
  const [subjekPajakNikNpwp16, setSubjekPajakNikNpwp16] = useState(
    user.nikNpwp16
  );
  const [subjekPajakNama, setSubjekPajakNama] = useState(user.nama);
  const [subjekPajakAlamat, setSubjekPajakAlamat] = useState(user.alamat);
  const [nop, setNop] = useState("");
  const [nomorKetetapan, setNomorKetetapan] = useState("");
  const [jumlahSetor, setJumlahSetor] = useState("");
  const [uraian, setUraian] = useState("");

  const [masaBulan, setMasaBulan] = useState(3);
  const [npwpLain, setNpwpLain] = useState(0);
  const [butuhNop, setButuhNop] = useState(0);
  const [butuhNosk, setButuhNosk] = useState(0);
  const [kodeKeamanan, setKodeKeamanan] = useState("");

  const [kodeBilling, setKodeBilling] = useState("");
  const [masaAktifKodeBilling, setMasaAktifKodeBilling] = useState("");

  const [jenisPajaks, setJenisPajaks] = useState([]);
  const [jenisSetorans, setJenisSetorans] = useState([]);
  const [tahunPajaks, setTahunPajaks] = useState([]);

  const handleClickOpenConfirmation = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (
      form.checkValidity() &&
      jenisPajak.length > 0 &&
      jenisSetoran.length > 0 &&
      tahunPajak.length > 0
    ) {
      setOpenConfirmation(true);
    } else {
      setValidated(true);
    }
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  const masaPajakOptions = [
    { value: "01", label: "01-Januari" },
    { value: "02", label: "02-Februari" },
    { value: "03", label: "03-Maret" },
    { value: "04", label: "04-April" },
    { value: "05", label: "05-Mei" },
    { value: "06", label: "06-Juni" },
    { value: "07", label: "07-Juli" },
    { value: "08", label: "08-Agustus" },
    { value: "09", label: "09-September" },
    { value: "10", label: "10-Oktober" },
    { value: "11", label: "11-November" },
    { value: "12", label: "12-Desember" },
  ];

  useEffect(() => {
    getJenisPajaksData();
    getTahunPajaksData();
  }, []);

  const getJenisPajaksData = async () => {
    setJenisPajak("");
    const response = await axios.post(`${tempUrl}/jenisPajaks`, {
      _id: user.id,
      token: user.token,
    });
    setJenisPajaks(response.data);
  };

  const getJenisSetoransData = async (jenisPajakId) => {
    setJenisSetoran("");
    const response = await axios.post(`${tempUrl}/jenisSetoransByJenisPajak`, {
      jenisPajakId,
      _id: user.id,
      token: user.token,
    });
    setJenisSetorans(response.data);
  };

  const findJenisSetoransData = async (jenisSetoranId) => {
    const response = await axios.post(
      `${tempUrl}/jenisSetorans/${jenisSetoranId}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    setMasaBulan(response.data.masaBulan);
    setNpwpLain(response.data.npwpLain);
    setButuhNop(response.data.butuhNop);
    setButuhNosk(response.data.butuhNosk);
  };

  const getTahunPajaksData = async () => {
    setTahunPajak("");
    const response = await axios.post(`${tempUrl}/tahuns`, {
      _id: user.id,
      token: user.token,
    });
    setTahunPajaks(response.data);
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

  const inputWrapper = {
    marginTop: screenSize >= 1000 && "20px",
    paddingLeft: screenSize >= 1000 && "60px",
    paddingRight: screenSize >= 1000 && "60px",
    color: Colors.grey700,
    // display: screenSize >= 600 && "flex",
  };

  const inputWrapperDialogueSaved = {
    marginTop: screenSize >= 1000 && "20px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
  };

  const profilWrapper2 = {
    flex: 1,
    marginLeft: screenSize >= 600 && "20px",
  };

  const savedSpacingTop0 = {
    marginTop: screenSize >= 600 ? "0px" : "10px",
  };

  const savedSpacingTop30 = {
    marginTop: screenSize >= 600 ? "30px" : "10px",
  };

  const savedSpacingTop60 = {
    marginTop: screenSize >= 600 ? "60px" : "10px",
  };

  const downloadPdf = async () => {
    let tempY = 15;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("CETAKAN KODE", 140, tempY);
    tempY += 5;
    doc.text("BILLING", 150, tempY);
    doc.setFontSize(10);

    tempY += 15;
    doc.text("NPWP", 30, tempY);
    doc.text(`: ${subjekPajakNpwp} / ${subjekPajakNikNpwp16}`, 70, tempY);
    tempY += 8;
    doc.text("NITKU", 30, tempY);
    doc.text(`: ${subjekPajakNitku}`, 70, tempY);
    tempY += 8;
    doc.text("NAMA", 30, tempY);
    doc.text(`: ${subjekPajakNama}`, 70, tempY);
    tempY += 8;
    doc.text("ALAMAT", 30, tempY);
    doc.text(
      `: ${subjekPajakNitku}-${subjekPajakAlamat.substring(0, 23)}`,
      70,
      tempY
    );
    tempY += 14;
    doc.text("NOP", 30, tempY);
    doc.text(`: ${nop.length === 0 ? "-" : nop}`, 70, tempY);

    const findJenisPajak = await axios.post(
      `${tempUrl}/jenisPajaks/${jenisPajak}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    tempY += 8;
    doc.text("JENIS PAJAK", 30, tempY);
    doc.text(`: ${findJenisPajak.data.kodeJenisPajak}`, 70, tempY);

    const findJenisSetoran = await axios.post(
      `${tempUrl}/jenisSetorans/${jenisSetoran}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    tempY += 8;
    doc.text("JENIS SETORAN", 30, tempY);
    doc.text(`: ${findJenisSetoran.data.kodeJenisSetoran}`, 70, tempY);
    tempY += 8;
    doc.text("MASA PAJAK", 30, tempY);
    doc.text(`: ${masaPajakDariBulan}-${masaPajakSampaiBulan}`, 70, tempY);

    const findTahun = await axios.post(`${tempUrl}/tahuns/${tahunPajak}`, {
      _id: user.id,
      token: user.token,
    });
    tempY += 8;
    doc.text("TAHUN PAJAK", 30, tempY);
    doc.text(`: ${findTahun.data.tahun}`, 70, tempY);
    tempY += 8;
    doc.text("NOMOR KETETAPAN", 30, tempY);
    doc.text(
      `: ${nomorKetetapan.length === 0 ? "-" : nomorKetetapan}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("JUMLAH SETOR", 30, tempY);
    doc.text(
      `: Rp. ${parseInt(jumlahSetor).toLocaleString("de-DE")}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("TERBILANG", 30, tempY);
    doc.text(`: ${angkaTerbilang(jumlahSetor)} Rupiah`, 70, tempY);

    tempY += 14;
    doc.text("URAIAN", 30, tempY);
    doc.text(`: ${uraian}`, 70, tempY);

    tempY += 14;
    doc.text("NPWP PENYETOR", 30, tempY);
    doc.text(`: ${user.npwp15} / ${user.nikNpwp16}`, 70, tempY);
    tempY += 8;
    doc.text("NITKU PENYETOR", 30, tempY);
    doc.text(`: ${user.nitku}`, 70, tempY);
    tempY += 8;
    doc.text("NAMA PENYETOR", 30, tempY);
    doc.text(`: ${user.nama}`, 70, tempY);

    tempY += 14;
    doc.text(
      "GUNAKAN KODE BILLING DI BAWAH INI UNTUK MELAKUKAN PEMBAYARAN.",
      30,
      tempY
    );
    tempY += 8;
    doc.text("ID BILLING", 30, tempY);
    doc.text(`: ${kodeBilling}`, 70, tempY);
    tempY += 8;
    doc.text("MASA AKTIF", 30, tempY);
    doc.text(`: ${masaAktifKodeBilling}`, 70, tempY);

    tempY += 14;
    doc.text(
      "Catatan : Apabila ada kesalahan dalam isian Kode Billing atau masa berlakunya berakhir, Kode Billing",
      30,
      tempY
    );
    tempY += 4;
    doc.text(
      "dapat dibuat kembali. Tanggung jawab isian Kode Billing ada pada Wajib Pajak yang namanya",
      40,
      tempY
    );
    tempY += 4;
    doc.text("tercantum di dalamnya.", 40, tempY);
    doc.save("Cetakan Kode Billing.pdf");
  };

  const saveEBilling = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // setLoading(true);
      try {
        let savedBilling = await axios.post(`${tempUrl}/saveEBilling`, {
          userId: user.id,

          jenisSetoran,

          masaPajakDariBulan,
          masaPajakSampaiBulan,

          tahunPajak,

          subjekPajak,
          subjekPajakNpwp,
          subjekPajakNitku,
          subjekPajakNikNpwp16,
          subjekPajakNama,
          subjekPajakAlamat,

          nop,

          nomorKetetapan,

          jumlahSetorMataUang,
          jumlahSetor,
          uraian,

          userIdInput: user.id,
          kodeCabang: user.cabang.id,
          _id: user.id,
          token: user.token,
        });
        setKodeBilling(
          savedBilling.data.kodeBilling
            .match(/.{1,4}/g) // This splits the string into groups of up to 4 characters
            .join(" ") // Join the groups with a space
        );
        setMasaAktifKodeBilling(
          new Date(savedBilling.data.masaAktifKodeBilling).toLocaleString(
            "en-GB",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false, // Use 24-hour format
              timeZone: "Asia/Jakarta", // Set time zone to Asia/Jakarta
            }
          )
        );
        handleCloseConfirmation();
        handleClickOpenSaved(e);
      } catch (error) {
        alert(error.response.data.message);
      }
      // setLoading(false);
    } else {
      // setError(true);
      // setOpen(!open);
    }
    setValidated(true);
  };

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MenuEBilling activeLink={"Surat Setoran Elektronik"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <PetunjukPengisian
            defaultCollapse={true}
            width={"240px"}
            titlePetunjuk={"Petunjuk Pengisian"}
            PetunjukPengisianComponent={PetunjukPengisianComponent}
          />
        </div>
        <div style={inputContainer}>
          <Form
            noValidate
            validated={validated}
            className="d-flex flex-column"
            onSubmit={handleClickOpenConfirmation}
          >
            <Card>
              <Card.Header style={inputTitle}>
                <BorderColorIcon />
                Form Buat Kode Billing
              </Card.Header>
              <Card.Body>
                <div style={inputWrapper}>
                  <div>
                    <Row>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            NPWP
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              value={`${user.npwp15} / ${user.nikNpwp16}`}
                              readOnly
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            NITKU
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control value={user.nitku} readOnly />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Nama
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control value={user.nama} readOnly />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Alamat
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              value={user.alamat}
                              as="textarea"
                              rows={2}
                              readOnly
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Jenis Pajak *
                          </Form.Label>
                          <Col sm="9">
                            <Form.Select
                              required
                              isInvalid={jenisPajak.length === 0 ? true : false}
                              value={jenisPajak}
                              onChange={(e) => {
                                let tempJenisPajak = e.target.value;
                                if (tempJenisPajak === "Pilih.....") {
                                  tempJenisPajak = "";
                                }

                                setJenisPajak(tempJenisPajak);
                                getJenisSetoransData(tempJenisPajak);

                                setSubjekPajakNpwp(user.npwp15);
                                setSubjekPajakNitku(user.nitku);
                                setSubjekPajakNikNpwp16(user.nikNpwp16);
                                setSubjekPajakNama(user.nama);
                                setSubjekPajakAlamat(user.alamat);
                              }}
                            >
                              <option>Pilih.....</option>
                              {jenisPajaks.map((jenisPajak, index) => (
                                <option value={jenisPajak.id}>
                                  {jenisPajak.kodeJenisPajak} -{" "}
                                  {jenisPajak.namaJenisPajak}
                                </option>
                              ))}
                            </Form.Select>
                            {jenisPajak.length === 0 && (
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Jenis Setoran *
                          </Form.Label>
                          <Col sm="9">
                            <Form.Select
                              required
                              isInvalid={
                                jenisSetoran.length === 0 ? true : false
                              }
                              value={jenisSetoran}
                              onChange={(e) => {
                                let tempJenisSetoran = e.target.value;
                                if (tempJenisSetoran === "Pilih.....") {
                                  tempJenisSetoran = "";
                                }

                                setJenisSetoran(tempJenisSetoran);
                                findJenisSetoransData(tempJenisSetoran);

                                setSubjekPajakNpwp(user.npwp15);
                                setSubjekPajakNitku(user.nitku);
                                setSubjekPajakNikNpwp16(user.nikNpwp16);
                                setSubjekPajakNama(user.nama);
                                setSubjekPajakAlamat(user.alamat);
                              }}
                            >
                              <option>Pilih.....</option>
                              {jenisSetorans.map((jenisSetoran, index) => (
                                <option value={jenisSetoran.id}>
                                  {jenisSetoran.kodeJenisSetoran} -{" "}
                                  {jenisSetoran.namaJenisSetoran}
                                </option>
                              ))}
                            </Form.Select>
                            {jenisSetoran.length === 0 && (
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    {masaBulan !== 2 && (
                      <Row style={inputSpace}>
                        <Col>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="3">
                              Masa Pajak *
                            </Form.Label>
                            <Col sm="9">
                              <Row className="g-0">
                                <Col sm="5">
                                  <Form.Select
                                    value={masaPajakDariBulan}
                                    onChange={(e) => {
                                      setMasaPajakDariBulan(e.target.value);
                                      setMasaPajakSampaiBulan(e.target.value);
                                    }}
                                  >
                                    {masaPajakOptions.map(
                                      (masaPajak, index) => (
                                        <option
                                          key={index}
                                          value={masaPajak.value}
                                        >
                                          {masaPajak.label}
                                        </option>
                                      )
                                    )}
                                  </Form.Select>
                                </Col>
                                <Col sm="2">
                                  <Form.Control
                                    value={"s/d"}
                                    disabled
                                    readOnly
                                  />
                                </Col>
                                <Col sm="5">
                                  <Form.Select
                                    disabled={masaBulan === 1 && true}
                                    value={masaPajakSampaiBulan}
                                    onChange={(e) => {
                                      setMasaPajakSampaiBulan(e.target.value);
                                    }}
                                  >
                                    {masaPajakOptions.map(
                                      (masaPajak, index) => (
                                        <option
                                          key={index}
                                          value={masaPajak.value}
                                        >
                                          {masaPajak.label}
                                        </option>
                                      )
                                    )}
                                  </Form.Select>
                                </Col>
                              </Row>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Tahun Pajak *
                          </Form.Label>
                          <Col sm="9">
                            <Form.Select
                              required
                              isInvalid={tahunPajak.length === 0 ? true : false}
                              value={tahunPajak}
                              onChange={(e) => {
                                let tempTahunPajak = e.target.value;
                                if (tempTahunPajak === "Pilih.....") {
                                  tempTahunPajak = "";
                                }

                                setTahunPajak(tempTahunPajak);
                              }}
                            >
                              <option>Pilih.....</option>
                              {tahunPajaks.map((tahunPajak, index) => (
                                <option value={tahunPajak.id}>
                                  {tahunPajak.tahun}
                                </option>
                              ))}
                            </Form.Select>
                            {tahunPajak.length === 0 && (
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            )}
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    {npwpLain === 1 && (
                      <Row style={inputSpace}>
                        <Col>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="3">
                              Subjek Pajak *
                            </Form.Label>
                            <Col sm="9">
                              <div key={`inline-radio`} className="mb-3">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="NPWP Sendiri"
                                  name="radioGroup"
                                  value="NPWP Sendiri"
                                  checked={subjekPajak === "NPWP Sendiri"}
                                  onChange={(e) => {
                                    setSubjekPajak(e.target.value);
                                    setSubjekPajakNpwp(user.npwp15);
                                    setSubjekPajakNitku(user.nitku);
                                    setSubjekPajakNikNpwp16(user.nikNpwp16);
                                    setSubjekPajakNama(user.nama);
                                    setSubjekPajakAlamat(user.alamat);
                                  }}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="NPWP Lain/Non NPWP"
                                  name="radioGroup"
                                  value="NPWP Lain/Non NPWP"
                                  checked={subjekPajak === "NPWP Lain/Non NPWP"}
                                  onChange={(e) => {
                                    setSubjekPajak(e.target.value);
                                    setSubjekPajakNpwp("");
                                    setSubjekPajakNitku("");
                                    setSubjekPajakNama("");
                                    setSubjekPajakAlamat("");
                                  }}
                                />
                              </div>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    {subjekPajak === "NPWP Lain/Non NPWP" && (
                      <>
                        <Row style={inputSpace}>
                          <Col>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="3">
                                NPWP/NITKU *
                              </Form.Label>
                              <Col sm="9">
                                <Form.Control
                                  required
                                  value={subjekPajakNpwp}
                                  onChange={(e) => {
                                    setSubjekPajakNpwp(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    if (e.target.value.length > 0) {
                                      // Create Nitku
                                      const part1 = Math.floor(
                                        Math.random() * Math.pow(10, 11)
                                      )
                                        .toString()
                                        .padStart(11, "0"); // 11 digits
                                      const part2 = Math.floor(
                                        Math.random() * Math.pow(10, 11)
                                      )
                                        .toString()
                                        .padStart(11, "0"); // 11 digits

                                      const padded22DigitNitku = part1 + part2;

                                      // Create Nik Npwp 16
                                      const random15DigitNikNpwp16 = Math.floor(
                                        Math.random() * Math.pow(10, 15)
                                      ).toString();

                                      const padded15DigitNikNpwp16 =
                                        random15DigitNikNpwp16.padStart(
                                          15,
                                          "0"
                                        );

                                      setSubjekPajakNitku(padded22DigitNitku);
                                      setSubjekPajakNikNpwp16(
                                        padded15DigitNikNpwp16
                                      );
                                      setSubjekPajakNama("CONTOH NAMA");
                                      setSubjekPajakAlamat("CONTOH ALAMAT");
                                    } else {
                                      setSubjekPajakNitku(user.nitku);
                                      setSubjekPajakNikNpwp16(user.nikNpwp16);
                                      setSubjekPajakNama("");
                                      setSubjekPajakAlamat("");
                                    }
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row style={inputSpace}>
                          <Col>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="3">
                                Nama *
                              </Form.Label>
                              <Col sm="9">
                                <Form.Control
                                  disabled
                                  value={subjekPajakNama}
                                />
                              </Col>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row style={inputSpace}>
                          <Col>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="3">
                                Alamat *
                              </Form.Label>
                              <Col sm="9">
                                <Form.Control
                                  disabled
                                  value={subjekPajakAlamat}
                                />
                              </Col>
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}
                    {butuhNop === 1 && (
                      <Row style={inputSpace}>
                        <Col>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="3">
                              NOP *
                            </Form.Label>
                            <Col sm="9">
                              <InputMask
                                mask="99.99.999.999.999-9999.9" // The pattern you want
                                value={nop}
                                onChange={(e) => {
                                  setNop(e.target.value);
                                }}
                              >
                                {(inputProps) => (
                                  <Form.Control required {...inputProps} />
                                )}
                              </InputMask>
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    {butuhNosk === 1 && (
                      <Row style={inputSpace}>
                        <Col>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="3">
                              Nomor Ketetapan *
                            </Form.Label>
                            <Col sm="9">
                              <InputMask
                                mask="99999/999/99/999/99" // The pattern you want
                                value={nomorKetetapan}
                                onChange={(e) => {
                                  setNomorKetetapan(e.target.value);
                                }}
                              >
                                {(inputProps) => (
                                  <Form.Control required {...inputProps} />
                                )}
                              </InputMask>
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Jumlah Setor *
                          </Form.Label>
                          <Col sm="3">
                            <Form.Select disabled value={jumlahSetorMataUang}>
                              <option>IDR (Rp)</option>
                            </Form.Select>
                          </Col>
                          <Col sm="6">
                            <NumericFormat
                              required
                              value={jumlahSetor}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              onValueChange={(values) => {
                                setJumlahSetor(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Terbilang
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              value={`${angkaTerbilang(jumlahSetor)} Rupiah`}
                              as="textarea"
                              rows={3}
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Uraian
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={uraian}
                              onChange={(e) => {
                                setUraian(e.target.value);
                              }}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={inputSpace}>
                      <Col>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            <b>Catatan :</b>
                          </Form.Label>
                          <Col sm="9">
                            <b>
                              Apabila ada kesalahan dalam isian Kode Billing
                              atau masa berlakunya berakhir, Kode Billing dapat
                              dibuat kembali. Tanggung jawab isian Kode Billing
                              ada pada Wajib Pajak yang namanya tercantum di
                              dalamnya.
                            </b>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                  <div style={inputButtonContainer}>
                    <button
                      className="blank-button"
                      style={{ marginRight: "4px" }}
                      onClick={() => {
                        setJenisPajak("");
                        setJenisSetoran("");
                        setTahunPajak("");
                        setJumlahSetor("");
                      }}
                    >
                      <ReplayIcon style={{ marginRight: "4px" }} />
                      Kosongkan
                    </button>
                    <button className="hover-button" type="submit">
                      <SaveOutlinedIcon style={{ marginRight: "4px" }} />
                      Buat Kode Billing
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </div>
      </Paper>
      <BootstrapDialog
        onClose={handleCloseConfirmation}
        aria-labelledby="customized-dialog-title"
        open={openConfirmation}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Buat Kode Billing
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
        <DialogContent dividers>
          <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            <Row>
              <Col>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="6">
                    Kode Keamanan
                  </Form.Label>
                  <Col sm="6">
                    <img
                      src={CaptchaImage}
                      alt="CaptchaImage"
                      style={{ width: "120px" }}
                    />
                    <p>klik untuk ubah kode</p>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="6">
                    Isikan Kode Keamanan
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control
                      required
                      value={kodeKeamanan}
                      onChange={(e) => {
                        setKodeKeamanan(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="blank-button"
            style={{ marginRight: "4px" }}
            onClick={handleCloseConfirmation}
          >
            Batal
          </button>
          <button className="hover-button" onClick={saveEBilling}>
            Submit
          </button>
        </DialogActions>
      </BootstrapDialog>
      <Dialog
        onClose={handleCloseSaved}
        aria-labelledby="customized-dialog-title"
        open={openSaved}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ringkasan Surat Setoran Elektronik
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseSaved}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={inputWrapperDialogueSaved}>
            <div style={profilWrapper}>
              <Row>
                <Col>
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
                        value={`${subjekPajakNpwp} / ${subjekPajakNikNpwp16}`}
                        as="textarea"
                        rows={2}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      NITKU
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={subjekPajakNitku} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Nama
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={subjekPajakNama} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={savedSpacingTop60}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Alamat
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        value={subjekPajakAlamat}
                        as="textarea"
                        rows={2}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Jenis Pajak
                    </Form.Label>
                    <Col sm="8">
                      <Form.Select disabled value={jenisPajak}>
                        <option>Pilih.....</option>
                        {jenisPajaks.map((jenisPajak, index) => (
                          <option value={jenisPajak.id}>
                            {jenisPajak.kodeJenisPajak}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={savedSpacingTop30}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Jenis Setoran
                    </Form.Label>
                    <Col sm="8">
                      <Form.Select disabled value={jenisSetoran}>
                        <option>Pilih.....</option>
                        {jenisSetorans.map((jenisSetoran, index) => (
                          <option value={jenisSetoran.id}>
                            {jenisSetoran.kodeJenisSetoran}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Masa Pajak
                    </Form.Label>
                    <Col sm="8">
                      <Row className="g-0">
                        <Form.Control
                          value={`${masaPajakDariBulan}-${masaPajakSampaiBulan}`}
                          disabled
                          readOnly
                        />
                      </Row>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Tahun Pajak
                    </Form.Label>
                    <Col sm="8">
                      <Form.Select disabled value={tahunPajak}>
                        <option>Pilih.....</option>
                        {tahunPajaks.map((tahunPajak, index) => (
                          <option value={tahunPajak.id}>
                            {tahunPajak.tahun}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Nomor Ketetapan
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={nomorKetetapan} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div style={profilWrapper2}>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      NOP
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={nop} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={savedSpacingTop30}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Jumlah Setor
                    </Form.Label>
                    <Col sm="1">
                      <p style={{ paddingTop: "10px" }}>Rp.</p>
                    </Col>
                    <Col sm="7">
                      <NumericFormat
                        disabled
                        value={jumlahSetor}
                        decimalSeparator={","}
                        thousandSeparator={"."}
                        customInput={Form.Control}
                        onValueChange={(values) => {
                          setJumlahSetor(
                            values.formattedValue
                              .split(".")
                              .join("")
                              .replace(/,/g, "")
                          );
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={savedSpacingTop0}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Terbilang
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        value={`${angkaTerbilang(jumlahSetor)} Rupiah`}
                        as="textarea"
                        rows={3}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Uraian
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={uraian}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      NPWP Penyetor
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        value={`${user.npwp15} / ${user.nikNpwp16}`}
                        as="textarea"
                        rows={2}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      NITKU Penyetor
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={user.nitku} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Nama Penyetor
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={user.nama} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Kode Billing
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={kodeBilling} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={inputSpace}>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Masa Aktif Kode Billing
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control value={masaAktifKodeBilling} disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="blank-button"
            style={{ marginRight: "4px" }}
            onClick={handleCloseSaved}
          >
            Tutup
          </button>
          <button
            className="hover-button"
            // onClick={saveEBilling}
            onClick={() => downloadPdf()}
          >
            Cetak
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EBilling;

const inputTitle = {
  height: "50px",
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.blue900,
};

const inputButtonContainer = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "80px",
};

const inputSpace = {
  marginTop: "10px",
};

const profilWrapper = {
  flex: 1,
};
