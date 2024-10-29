import React, { useState, useContext, useEffect, useRef } from "react";
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
import { findMonth } from "../../../constants/helper";
import {
  ShowTableEbupotUnifikasiObjekPphYangDisetorSendiri,
  ShowTableEbupotUnifikasiObjekPajak,
  ShowTableEbupotUnifikasiDaftarBuktiPemungutan,
  ShowTableEbupotUnifikasiDaftarSuratSetoranPajak,
  ShowTableEbupotUnifikasiPphYangDisetorSendiri,
  ShowTableEbupotUnifikasiPphYangTelahDipotong,
  ShowTableEbupotUnifikasiRekapitulasiPph,
} from "../../../components/ShowTable";
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
import { NumericFormat } from "react-number-format";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan pengiriman SPT
        secara elektronik ke Direktorat Jenderal Pajak
      </p>
      <p>Berikut adalah langkah-langkahnya:</p>
      <ol>
        <li>
          Dalam form ini, akan ditampilkan data-data yang merupakan representasi
          dari SPT Masa Pajak Penghasilan SPT Masa PPh Unifikasi
        </li>
        <li>Data SPT ditampilkan dalam beberapa bagian yaitu</li>
        <ul>
          <li>Identitas SPT, memuat informasi Masa Pajak dan Tahun Pajak</li>
          <li>
            Identitas Pemotong, memuat informasi pihak yang berkewajiban
            menyampaikan SPT
          </li>
          <li>
            Lampiran DOSS, memuat informasi daftar rincian PPh yang disetor
            sendiri
          </li>
          <li>
            Lampiran DOPP, memuat informasi daftar objek pemotongan/pemungutan
            PPh pihak lain
          </li>
          <li>
            Lampiran DBP bagian I, memuat daftar bukti pemotongan/pemungutan PPh
            Unifikasi
          </li>
          <li>
            Lampiran DBP bagian II, memuat daftar bukti penerimaan
            negara/pemindah bukuan
          </li>
          <li>Induk SPT, memuat isian pada induk SPT</li>
        </ul>
        <li>
          Periksa kembali data SPT Anda sebelum melakukan pengiriman data,
          pastikan bahwa data-data tersebut telah sesuai dengan dokumen-dokumen
          pendukungnya
        </li>
        <li>Siapkan file/berkas sertifikat elektronik dalam format *.p12</li>
        <li>
          Klik tab paling kanan dengan judul kirim,kemudian klik tombol KIRIM
          sehingga dialog pengiriman tampil
        </li>
        <li>
          Browse file sertifikat elektronik anda dan masukkan passphrase yang
          sesuai, kemudian Klik tombol OK
        </li>
        <li>
          Jika pengiriman SPT berhasil, Anda akan menemukan notifikasi bahwa
          pengiriman berhasil
        </li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiPenyiapanSptKirimSpt() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionState, setAccordionState] = useState("1");

  const [menu, setMenu] = useState("Lampiran DOSS");

  const [nama, setNama] = useState(user.nama);
  const [npwp, setNpwp] = useState(user.npwp15);
  const [nikNpwp16, setNikNpwp16] = useState(user.nikNpwp16);
  const [nitku, setNitku] = useState(user.nitku);
  const [pembetulanKe, setPembetulanKe] = useState("");
  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

  // DOSS
  const [
    penghasilanDariIndonesiaJumlahDasar,
    setPenghasilanDariIndonesiaJumlahDasar,
  ] = useState("0");
  const [
    penghasilanDariIndonesiaJumlahPph,
    setPenghasilanDariIndonesiaJumlahPph,
  ] = useState("0");
  const [
    penghasilanDariLuarIndonesiaJumlahDasar,
    setPenghasilanDariLuarIndonesiaJumlahDasar,
  ] = useState("0");
  const [
    penghasilanDariLuarIndonesiaJumlahPph,
    setPenghasilanDariLuarIndonesiaJumlahPph,
  ] = useState("0");
  const [
    pphPasal24YangDapatDiperhitungkanJumlahPph,
    setPphPasal24YangDapatDiperhitungkanJumlahPph,
  ] = useState("0");
  const [
    pphYangDipotongPihakLainJumlahPph,
    setPphYangDipotongPihakLainJumlahPph,
  ] = useState("0");
  const [pphYangDisetorSendiriJumlahPph, setPphYangDisetorSendiriJumlahPph] =
    useState("0");

  const [passphrase, setPassphrase] = useState("");
  const [passphraseVisible, setPassphraseVisible] = useState(false);
  // Toggle Passphrase visibility
  const togglePassphraseVisibility = () => {
    setPassphraseVisible(!passphraseVisible);
  };
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

  // 03.) Accordion 3
  const [
    eBupotUnifikasiObjekPphYangDisetorSendiriPagination,
    setEBupotUnifikasiObjekPphYangDisetorSendiriPagination,
  ] = useState([]);
  const [
    eBupotUnifikasiPostingsPagination,
    setEBupotUnifikasiPostingsPagination,
  ] = useState([]);
  let [pageEBupotUnifikasiPosting, setPageEBupotUnifikasiPosting] = useState(0);
  const [limitEBupotUnifikasiPosting, setLimitEBupotUnifikasiPosting] =
    useState(5);
  const [pagesEBupotUnifikasiPosting, setPagesEBupotUnifikasiPosting] =
    useState(0);
  const [rowsEBupotUnifikasiPosting, setRowsEBupotUnifikasiPosting] =
    useState(0);
  const [queryEBupotUnifikasiPosting, setQueryEBupotUnifikasiPosting] =
    useState("");
  const handleChangeEBupotUnifikasiPosting = (e, p) => {
    setPageEBupotUnifikasiPosting(p - 1);
  };

  const [
    eBupotUnifikasiCombinedPagination,
    setEBupotUnifikasiCombinedPagination,
  ] = useState([]);
  let [pageEBupotUnifikasiCombined, setPageEBupotUnifikasiCombined] =
    useState(0);
  const [limitEBupotUnifikasiCombined, setLimitEBupotUnifikasiCombined] =
    useState(5);
  const [pagesEBupotUnifikasiCombined, setPagesEBupotUnifikasiCombined] =
    useState(0);
  const [rowsEBupotUnifikasiCombined, setRowsEBupotUnifikasiCombined] =
    useState(0);
  const [queryEBupotUnifikasiCombined, setQueryEBupotUnifikasiCombined] =
    useState("");
  const handleChangeEBupotUnifikasiCombined = (e, p) => {
    setPageEBupotUnifikasiCombined(p - 1);
  };

  const [
    eBupotUnifikasiDaftarSuratSetoranPajakPagination,
    setEBupotUnifikasiDaftarSuratSetoranPajakPagination,
  ] = useState([]);

  const [
    eBupotUnifikasiTagihanPemotonganPagination,
    setEBupotUnifikasiTagihanPemotonganPagination,
  ] = useState([]);
  let [
    pageEBupotUnifikasiTagihanPemotongan,
    setPageEBupotUnifikasiTagihanPemotongan,
  ] = useState(0);
  const [
    limitEBupotUnifikasiTagihanPemotongan,
    setLimitEBupotUnifikasiTagihanPemotongan,
  ] = useState(10);
  const [
    pagesEBupotUnifikasiTagihanPemotongan,
    setPagesEBupotUnifikasiTagihanPemotongan,
  ] = useState(0);
  const [
    rowsEBupotUnifikasiTagihanPemotongan,
    setRowsEBupotUnifikasiTagihanPemotongan,
  ] = useState(0);
  const [
    queryEBupotUnifikasiTagihanPemotongan,
    setQueryEBupotUnifikasiTagihanPemotongan,
  ] = useState("");
  const handleChangeEBupotUnifikasiTagihanPemotongan = (e, p) => {
    setPageEBupotUnifikasiTagihanPemotongan(p - 1);
  };

  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  // 04.) Accordion 4
  const [openSaved, setOpenSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  useEffect(() => {
    getEbupotUnifikasiUbahPenyiapanSptById();
  }, []);

  useEffect(() => {
    getEbupotUnifikasiUbahPenyiapanSptById();
  }, [
    pageEBupotUnifikasiPosting,
    limitEBupotUnifikasiPosting,
    pageEBupotUnifikasiCombined,
    limitEBupotUnifikasiCombined,
  ]);

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
    getEBupotUnifikasiPostingData(
      response.data.tahunPajak,
      response.data.masaPajak
    );
    getEBupotUnifikasiTagihanPemotonganData(
      response.data.tahunPajak,
      response.data.masaPajak
    );
    getEBupotUnifikasiCombinedData(
      response.data.tahunPajak,
      response.data.masaPajak
    );
    setPembetulanKe(response.data.pembetulanKe);

    // DOSS
    setPenghasilanDariIndonesiaJumlahDasar(
      response.data.penghasilanDariIndonesiaJumlahDasar
    );
    setPenghasilanDariIndonesiaJumlahPph(
      response.data.penghasilanDariIndonesiaJumlahPph
    );
    setPenghasilanDariLuarIndonesiaJumlahDasar(
      response.data.penghasilanDariLuarIndonesiaJumlahDasar
    );
    setPenghasilanDariLuarIndonesiaJumlahPph(
      response.data.penghasilanDariLuarIndonesiaJumlahPph
    );
    setPphPasal24YangDapatDiperhitungkanJumlahPph(
      response.data.pphPasal24YangDapatDiperhitungkanJumlahPph
    );
    setPphYangDipotongPihakLainJumlahPph(
      response.data.pphYangDipotongPihakLainJumlahPph
    );
    setPphYangDisetorSendiriJumlahPph(
      response.data.pphYangDisetorSendiriJumlahPph
    );

    setOpenSearchIdentitasWp(false);
  };

  const getEBupotUnifikasiPostingData = async (tahunPajak, masaPajak) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPostingsDossPagination?search_query=&page=${pageEBupotUnifikasiPosting}&limit=${limitEBupotUnifikasiPosting}`,
      {
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiPostingsPagination(response.data.eBupotUnifikasiPostings);
    setPageEBupotUnifikasiPosting(response.data.page);
    setPagesEBupotUnifikasiPosting(response.data.totalPage);
    setRowsEBupotUnifikasiPosting(response.data.totalRows);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const getEBupotUnifikasiCombinedData = async (tahunPajak, masaPajak) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiCombinedPagination?search_query=&page=${pageEBupotUnifikasiCombined}&limit=${limitEBupotUnifikasiCombined}`,
      {
        userIdInput: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiCombinedPagination(response.data.data);
    setPageEBupotUnifikasiCombined(response.data.page);
    setPagesEBupotUnifikasiCombined(response.data.totalPage);
    setRowsEBupotUnifikasiCombined(response.data.totalRows);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const getEBupotUnifikasiTagihanPemotonganData = async (
    tahunPajak,
    masaPajak
  ) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiTagihanPemotongansByUserSearchPagination?search_query=&page=${pageEBupotUnifikasiTagihanPemotongan}&limit=${limitEBupotUnifikasiTagihanPemotongan}`,
      {
        userEBupotUnifikasiTagihanPemotonganId: user.id,
        tahunPajak,
        masaPajak: findMonth(masaPajak),
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiTagihanPemotonganPagination(
      response.data.eBupotUnifikasiTagihanPemotongans
    );
    setPageEBupotUnifikasiTagihanPemotongan(response.data.page);
    setPagesEBupotUnifikasiTagihanPemotongan(response.data.totalPage);
    setRowsEBupotUnifikasiTagihanPemotongan(response.data.totalRows);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchIdentitasWp(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const kirimSptEbupotUnifikasiPenyiapanSpt = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput = passphrase.length !== 0;

    if (handlingInput) {
      if (user.passphrase !== passphrase) {
        setDetilSearchIdentitasWp("Passphrase salah!");
        setOpenConfirmationSearchIdentitasWp(true);
        return;
      }

      try {
        let terkirimSptEBupotUnifikasiPenyiapanSpt = await axios.post(
          `${tempUrl}/kirimSptEBupotUnifikasiPenyiapanSpt/${id}`,
          {
            passphraseBenar: user.passphrase,
            passphrase,
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
              <EditIcon style={{ marginRight: "40px" }} />
              Kirim SPT
            </Card.Header>
            <Card.Body>
              <div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-2"
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
                      className="mb-2"
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
                      className="mb-2"
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
                      className="mb-2"
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
                      className="mb-2"
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
                <div style={profilMenuContainer}>
                  <div style={profilMenuWrapper}>
                    {menu === "Lampiran DOSS" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DOSS")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DOSS
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DOSS")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DOSS
                      </div>
                    )}
                    {menu === "Lampiran DOPP" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DOPP")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DOPP
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DOPP")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DOPP
                      </div>
                    )}
                    {menu === "Lampiran DBP bagian I" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DBP bagian I")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DBP bagian I
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DBP bagian I")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DBP bagian I
                      </div>
                    )}
                    {menu === "Lampiran DBP bagian II" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DBP bagian II")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DBP bagian II
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Lampiran DBP bagian II")}
                      >
                        <DescriptionOutlinedIcon /> Lampiran DBP bagian II
                      </div>
                    )}
                    {menu === "Induk SPT" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Induk SPT")}
                      >
                        <DescriptionOutlinedIcon /> Induk SPT
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Induk SPT")}
                      >
                        <DescriptionOutlinedIcon /> Induk SPT
                      </div>
                    )}
                    {menu === "Kirim SPT" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Kirim SPT")}
                      >
                        <DescriptionOutlinedIcon /> Kirim SPT
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={{ marginRight: "40px" }}
                        onClick={() => setMenu("Kirim SPT")}
                      >
                        <DescriptionOutlinedIcon /> Kirim SPT
                      </div>
                    )}
                  </div>
                </div>
                {menu === "Lampiran DOSS" && (
                  <>
                    <Accordion defaultExpanded={accordionState === "1" && true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={accordionBlue}
                      >
                        I. Imbalan yang Diterima/Diperoleh Sehubungan dengan
                        Pengangkutan Orang dan/atau Barang Termasuk Penyewaan
                        Kapal Laut oleh Perusahaan Pelayaran Dalam Negeri
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ color: "#646c9a" }}>
                          <div>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label
                                column
                                sm="5"
                                style={{ visibility: "hidden" }}
                              >
                                Tahun/Masa Pajak
                              </Form.Label>
                              <Col sm="3">
                                <p style={{ textAlign: "center" }}>
                                  Jumlah Dasar Pengenaan Pajak (Rp)
                                </p>
                              </Col>
                              <Col sm="3">
                                <p style={{ textAlign: "center" }}>
                                  Jumlah PPh (Rp)
                                </p>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                a. Penghasilan dari Indonesia
                              </Form.Label>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={penghasilanDariIndonesiaJumlahDasar}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    penghasilanDariIndonesiaJumlahDasar.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      penghasilanDariIndonesiaJumlahDasar.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={penghasilanDariIndonesiaJumlahPph}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    penghasilanDariIndonesiaJumlahPph.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      penghasilanDariIndonesiaJumlahPph.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                b. Penghasilan dari Luar Indonesia
                              </Form.Label>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={
                                    penghasilanDariLuarIndonesiaJumlahDasar
                                  }
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    penghasilanDariLuarIndonesiaJumlahDasar.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      penghasilanDariLuarIndonesiaJumlahDasar.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={penghasilanDariLuarIndonesiaJumlahPph}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    penghasilanDariLuarIndonesiaJumlahPph.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      penghasilanDariLuarIndonesiaJumlahPph.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                c. PPh Pasal 24 yang dapat diperhitungkan
                              </Form.Label>
                              <Col sm="3"></Col>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={
                                    pphPasal24YangDapatDiperhitungkanJumlahPph
                                  }
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    pphPasal24YangDapatDiperhitungkanJumlahPph.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      pphPasal24YangDapatDiperhitungkanJumlahPph.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                d. PPh yang dipotong pihak lain
                              </Form.Label>
                              <Col sm="3"></Col>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={pphYangDipotongPihakLainJumlahPph}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    pphYangDipotongPihakLainJumlahPph.length ===
                                    0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      pphYangDipotongPihakLainJumlahPph.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                e. PPh yang disetor sendiri
                              </Form.Label>
                              <Col sm="3"></Col>
                              <Col sm="3">
                                <NumericFormat
                                  disabled
                                  value={pphYangDisetorSendiriJumlahPph}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  isInvalid={
                                    pphYangDisetorSendiriJumlahPph.length === 0
                                  }
                                  style={{
                                    textAlign: "right",
                                    borderColor:
                                      pphYangDisetorSendiriJumlahPph.length ===
                                      0
                                        ? "red"
                                        : "",
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={accordionYellow}
                      >
                        II. Objek PPh yang disetor sendiri
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                            <ShowTableEbupotUnifikasiObjekPphYangDisetorSendiri
                              currentPosts={
                                eBupotUnifikasiObjekPphYangDisetorSendiriPagination
                              }
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
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {menu === "Lampiran DOPP" && (
                  <>
                    <Accordion defaultExpanded={accordionState === "1" && true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={accordionBlue}
                      >
                        Objek Pajak yang dilakukan pemungutan/pemotongan
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                                // setLimit(e.target.value);
                                setLimitEBupotUnifikasiPosting(e.target.value);
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
                            <ShowTableEbupotUnifikasiObjekPajak
                              currentPosts={eBupotUnifikasiPostingsPagination}
                            />
                          </Box>
                          <Box sx={tableContainer}>
                            <Pagination
                              shape="rounded"
                              color="primary"
                              count={pagesEBupotUnifikasiPosting}
                              page={pageEBupotUnifikasiPosting + 1}
                              onChange={handleChangeEBupotUnifikasiPosting}
                              size={screenSize <= 600 ? "small" : "large"}
                            />
                          </Box>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {menu === "Lampiran DBP bagian I" && (
                  <>
                    <Accordion defaultExpanded={accordionState === "1" && true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={accordionBlue}
                      >
                        A. Daftar Bukti Pemotongan/Pemungutan Unifikasi
                        Berformat Standar
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                                setLimitEBupotUnifikasiCombined(e.target.value);
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
                            <ShowTableEbupotUnifikasiDaftarBuktiPemungutan
                              currentPosts={eBupotUnifikasiCombinedPagination}
                            />
                          </Box>
                          <Box sx={tableContainer}>
                            <Pagination
                              shape="rounded"
                              color="primary"
                              count={pagesEBupotUnifikasiCombined}
                              page={pageEBupotUnifikasiCombined + 1}
                              onChange={handleChangeEBupotUnifikasiCombined}
                              size={screenSize <= 600 ? "small" : "large"}
                            />
                          </Box>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {menu === "Lampiran DBP bagian II" && (
                  <>
                    <Accordion defaultExpanded={accordionState === "1" && true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={accordionBlue}
                      >
                        B. Daftar Surat Setoran Pajak, Bukti Penerimaan Negara
                        dan Bukti Pemindahbukuan
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
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
                            <ShowTableEbupotUnifikasiDaftarSuratSetoranPajak
                              currentPosts={
                                eBupotUnifikasiDaftarSuratSetoranPajakPagination
                              }
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
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {menu === "Induk SPT" && (
                  <>
                    <Accordion defaultExpanded={accordionState === "1" && true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={accordionBlue}
                      >
                        SPT Masa PPh Unifikasi
                      </AccordionSummary>
                      <AccordionDetails>
                        <Card style={{ marginTop: "20px" }}>
                          <Card.Header style={inputTitle}>
                            <FormatListBulletedIcon
                              style={{ marginRight: "10px" }}
                            />
                            I. PPh YANG DISETOR SENDIRI
                          </Card.Header>
                          <Card.Body>
                            <div>
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
                                    setLimitEBupotUnifikasiTagihanPemotongan(
                                      e.target.value
                                    );
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
                                <ShowTableEbupotUnifikasiPphYangDisetorSendiri
                                  currentPosts={
                                    eBupotUnifikasiTagihanPemotonganPagination
                                  }
                                />
                              </Box>
                              <Box sx={tableContainer}>
                                <Pagination
                                  shape="rounded"
                                  color="primary"
                                  count={pagesEBupotUnifikasiTagihanPemotongan}
                                  page={
                                    pageEBupotUnifikasiTagihanPemotongan + 1
                                  }
                                  onChange={
                                    handleChangeEBupotUnifikasiTagihanPemotongan
                                  }
                                  size={screenSize <= 600 ? "small" : "large"}
                                />
                              </Box>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card style={{ marginTop: "40px" }}>
                          <Card.Header style={inputTitle}>
                            <FormatListBulletedIcon
                              style={{ marginRight: "10px" }}
                            />
                            II. PPh YANG TELAH DILAKUKAN PEMOTONGAN/PEMUNGUTAN
                          </Card.Header>
                          <Card.Body>
                            <div>
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
                                <ShowTableEbupotUnifikasiPphYangTelahDipotong
                                  currentPosts={
                                    eBupotUnifikasiTagihanPemotonganPagination
                                  }
                                />
                              </Box>
                              <Box sx={tableContainer}>
                                <Pagination
                                  shape="rounded"
                                  color="primary"
                                  count={pagesEBupotUnifikasiTagihanPemotongan}
                                  page={
                                    pageEBupotUnifikasiTagihanPemotongan + 1
                                  }
                                  onChange={
                                    handleChangeEBupotUnifikasiTagihanPemotongan
                                  }
                                  size={screenSize <= 600 ? "small" : "large"}
                                />
                              </Box>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card style={{ marginTop: "40px" }}>
                          <Card.Header style={inputTitle}>
                            <FormatListBulletedIcon
                              style={{ marginRight: "10px" }}
                            />
                            III. REKAPITULASI PPh
                          </Card.Header>
                          <Card.Body>
                            <div>
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
                                <ShowTableEbupotUnifikasiRekapitulasiPph
                                  currentPosts={
                                    eBupotUnifikasiTagihanPemotonganPagination
                                  }
                                />
                              </Box>
                              <Box sx={tableContainer}>
                                <Pagination
                                  shape="rounded"
                                  color="primary"
                                  count={pagesEBupotUnifikasiTagihanPemotongan}
                                  page={
                                    pageEBupotUnifikasiTagihanPemotongan + 1
                                  }
                                  onChange={
                                    handleChangeEBupotUnifikasiTagihanPemotongan
                                  }
                                  size={screenSize <= 600 ? "small" : "large"}
                                />
                              </Box>
                            </div>
                          </Card.Body>
                        </Card>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {menu === "Kirim SPT" && (
                  <>
                    <Card style={{ marginTop: "20px" }}>
                      <Card.Header style={inputTitle}>
                        <SendIcon style={{ marginRight: "10px" }} />
                        Upload Sertifikat Elektronik
                      </Card.Header>
                      <Card.Body>
                        <Form
                          noValidate
                          validated={validated}
                          className="d-flex flex-column"
                          onSubmit={kirimSptEbupotUnifikasiPenyiapanSpt}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              color: "#646c9a",
                            }}
                          >
                            <div>
                              <Form.Group
                                as={Row}
                                className="mb-2"
                                controlId="formPlaintextPassword"
                              >
                                <Form.Label column sm="4">
                                  Passphrase
                                </Form.Label>
                                <Col sm="8">
                                  <InputGroup>
                                    <Form.Control
                                      required
                                      type={
                                        passphraseVisible ? "text" : "password"
                                      }
                                      value={passphrase}
                                      onChange={(e) =>
                                        setPassphrase(
                                          e.target.value.toUpperCase()
                                        )
                                      }
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      onClick={togglePassphraseVisibility}
                                      className="no-hover"
                                    >
                                      {passphraseVisible ? (
                                        <VisibilityIcon />
                                      ) : (
                                        <VisibilityOffIcon />
                                      )}
                                    </Button>
                                  </InputGroup>
                                </Col>
                              </Form.Group>
                              <Form.Group
                                as={Row}
                                className="mb-2"
                                controlId="formPlaintextPassword"
                              >
                                <Form.Label column sm="4">
                                  File (*.p12)
                                </Form.Label>
                                <Col sm="8">
                                  <button
                                    className="upload-sertifikat-elektronik-button"
                                    variant="primary"
                                    onClick={
                                      handleButtonClickSertifikatElektronik
                                    }
                                  >
                                    Pilih Sertifikat Elektronik
                                  </button>
                                  <Form.Control
                                    type="file"
                                    ref={fileInputSertifikatElektronikRef}
                                    onChange={
                                      handleFileSertifikatElektronikChange
                                    }
                                    style={{ display: "none" }} // Hide the file input
                                  />
                                  <Form.Label>
                                    Upload Sertifikat Elektronik
                                  </Form.Label>
                                </Col>
                              </Form.Group>
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
                                  <SendIcon
                                    fontSize="small"
                                    style={{ marginRight: "4px" }}
                                  />
                                  Kirim SPT
                                </button>
                                <button
                                  className="blank-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(
                                      "/ebupotUnifikasi/sptMasa/penyiapanSpt"
                                    );
                                  }}
                                >
                                  <ReplayIcon
                                    fontSize="small"
                                    style={{ marginRight: "4px" }}
                                  />
                                  Batal
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </>
                )}
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
        fullWidth={true}
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
            <DialogContentText
              id="alert-dialog-description"
              style={{ textAlign: "center" }}
            >
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

export default EbupotUnifikasiPenyiapanSptKirimSpt;

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

const profilMenuContainer = {
  borderBottom: "1px solid rgba(255,184,34,0.1)",
  borderBottomColor: "rgba(255,184,34,0.1)",
  marginTop: "30px",
};

const profilMenuWrapper = {
  display: "flex",
  flexWrap: "wrap",
  borderBottom: "2px solid rgba(255,184,34,0.1)",
};
