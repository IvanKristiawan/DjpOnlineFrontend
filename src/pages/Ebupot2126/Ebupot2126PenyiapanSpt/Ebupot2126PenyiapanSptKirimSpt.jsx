import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126SptMasa,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import {
  ShowTableEbupot2126PenyiapanSptObjekPajak,
  ShowTableEbupot2126PenyiapanSptObjekPajakFinal,
} from "../../../components/ShowTable";
import { makeStyles } from "@mui/styles";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: Colors.blue900,
    },
  },
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
  },
});

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
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan pengiriman SPT
        secara elektronik ke Direktorat Jenderal Pajak
      </p>
      <p>Berikut adalah langkah-langkahnya:</p>
      <ol>
        <li>
          Dalam form ini, akan ditampilkan data-data yang merupakan representasi
          dari SPT Masa Pajak Penghasilan SPT Masa PPh 21
        </li>
        <li>Data SPT ditampilkan dalam beberapa bagian yaitu</li>
        <ul>
          <li>Identitas SPT, memuat informasi Masa Pajak dan Tahun Pajak</li>
          <li>
            Identitas Pemotong, memuat informasi pihak yang berkewajiban
            menyampaikan SPT
          </li>
          <li>
            Formulir 1721, memuat informasi daftar objek pajak final dan tidak
            final
          </li>
        </ul>
        <li>
          Periksa kembali data SPT Anda sebelum melakukan pengiriman data,
          pastikan bahwa data-data tersebut telah sesuai dengan dokumen-dokumen
          pendukungnya
        </li>
        <li>
          Klik tab paling kanan dengan judul kirim,kemudian klik tombol KIRIM
          sehingga dialog pengiriman tampil
        </li>
        <li>
          Klik tombol kirim kode untuk mendapakan kode verisikasi anda dan
          masukkan token yang telah dikirim, kemudian Klik tombol OK
        </li>
        <li>
          Jika pengiriman SPT berhasil, Anda akan menemukan notifikasi bahwa
          pengiriman berhasil
        </li>
      </ol>
    </div>
  );
};

function Ebupot2126PenyiapanSptKirimSpt() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionState, setAccordionState] = useState("1");

  const [menu, setMenu] = useState("Formulir 1721");

  const [nama, setNama] = useState(user.nama);
  const [npwp, setNpwp] = useState(user.npwp15);
  const [nikNpwp16, setNikNpwp16] = useState(user.nikNpwp16);
  const [nitku, setNitku] = useState(user.nitku);
  const [email, setEmail] = useState(user.email);
  const [nomorTelepon, setNomorTelepon] = useState(user.nomorTelepon);
  const [alamat, setAlamat] = useState(user.alamat);
  const [pembetulanKe, setPembetulanKe] = useState("");
  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

  // PENGHITUNGAN PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG (LEBIH) DISETOR
  const [pph21Dtp, setPph21Dtp] = useState("0");
  const [stpPph, setStpPph] = useState("0");
  const [kelebihanSetorJanuari, setKelebihanSetorJanuari] = useState(false);
  const [kelebihanSetorFebruari, setKelebihanSetorFebruari] = useState(false);
  const [kelebihanSetorMaret, setKelebihanSetorMaret] = useState(false);
  const [kelebihanSetorApril, setKelebihanSetorApril] = useState(false);
  const [kelebihanSetorMei, setKelebihanSetorMei] = useState(false);
  const [kelebihanSetorJuni, setKelebihanSetorJuni] = useState(false);
  const [kelebihanSetorJuli, setKelebihanSetorJuli] = useState(false);
  const [kelebihanSetorAgustus, setKelebihanSetorAgustus] = useState(false);
  const [kelebihanSetorSeptember, setKelebihanSetorSeptember] = useState(false);
  const [kelebihanSetorOktober, setKelebihanSetorOktober] = useState(false);
  const [kelebihanSetorNovember, setKelebihanSetorNovember] = useState(false);
  const [kelebihanSetorDesember, setKelebihanSetorDesember] = useState(false);

  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year
  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = ["-"];

  for (let i = 0; i < 5; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajakPenyiapanSpt, setTahunPajakPenyiapanSpt] = useState("");
  const [kelebihanSetor, setKelebihanSetor] = useState("0");
  const [keterangan, setKeterangan] = useState("");
  const [jumlahAngka1213, setJumlahAngka1213] = useState("0");
  const [tempTotalKurangAtauLebih, setTempTotalKurangAtauLebih] = useState("0");
  const [totalKurangAtauLebih, setTotalKurangAtauLebih] = useState("0");
  const [
    totalKurangAtauLebihPadaSptYangDibetulkan,
    setTotalKurangAtauLebihPadaSptYangDibetulkan,
  ] = useState("0");
  const [
    totalKurangAtauLebihKarenaPembetulan,
    setTotalKurangAtauLebihKarenaPembetulan,
  ] = useState("0");

  const [tahunPajakKompensasi, setTahunPajakKompensasi] = useState("");
  const [masaPajakOptions, setMasaPajakOptions] = useState([]);
  const [masaPajakKompensasi, setMasaPajakKompensasi] = useState("");

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
  const [eBupot2126ObjekPajaks, setEBupot2126ObjekPajaks] = useState([]);
  const [penandatangans, setPenandatangans] = useState([]);

  const [jenisOtentikasi, setJenisOtentikasi] = useState(
    "Sertifikat Elektronik"
  );
  const [passphrase, setPassphrase] = useState("");
  const [passphraseVisible, setPassphraseVisible] = useState(false);
  // Toggle Passphrase visibility
  const togglePassphraseVisibility = () => {
    setPassphraseVisible(!passphraseVisible);
  };
  const [kodeVerifikasi, setKodeVerifikasi] = useState("");
  const [kodeVerifikasiVisible, setKodeVerifikasiVisible] = useState(false);
  // Toggle Kode Verifikasi visibility
  const toggleKodeVerifikasiVisibility = () => {
    setKodeVerifikasiVisible(!kodeVerifikasiVisible);
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

  const [inputValues, setInputValues] = useState([]);
  // Function to handle value change
  const handleValueChange = (id, field, formattedValue) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [field]: formattedValue.split(".").join("").replace(/,/g, ""),
      },
    }));
  };

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

  let jenisOtentikasiOptions = [
    {
      label: "Sertifikat Elektronik",
    },
    {
      label: "Kode Verifikasi via Email",
    },
  ];

  useEffect(() => {
    getEbupot2126UbahPenyiapanSptById();
    getPenandatangan();
  }, []);

  const getEBupot2126PostingsMasaTahunPajak = async (
    masaPajak,
    tahunPajak,
    tempTotalKurangAtauLebih
  ) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126PostingsMasaTahunPajak`,
      {
        userEBupot2126PostingId: user.id,
        masaPajak,
        tahunPajak,
        _id: user.id,
        token: user.token,
      }
    );
    setEBupot2126ObjekPajaks(response.data);

    let totalJumlahPph = 0;
    for (let data of response.data) {
      let ifNotSubMenu =
        data.objekpajak.kodeObjekPajak !== "21-401-01" &&
        data.objekpajak.kodeObjekPajak !== "21-401-02" &&
        data.objekpajak.kodeObjekPajak !== "21-499-99";

      if (ifNotSubMenu) {
        totalJumlahPph += parseInt(data.jumlahPph);
      }
    }
    setTempTotalKurangAtauLebih(totalJumlahPph);
    if (tempTotalKurangAtauLebih === 0) {
      setTotalKurangAtauLebih(totalJumlahPph);
    }

    setOpenSearchIdentitasWp(false);
  };

  const getEbupot2126UbahPenyiapanSptById = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126PenyiapanSpts/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    getEBupot2126PostingsMasaTahunPajak(
      response.data.masaPajak,
      response.data.tahunPajak,
      response.data.totalKurangAtauLebih
    );

    // 01.) Accordion 1
    setTahunPajak(response.data.tahunPajak);
    setMasaPajak(response.data.masaPajak);
    setPembetulanKe(response.data.pembetulanKe);

    // PENGHITUNGAN PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG (LEBIH) DISETOR
    setPph21Dtp(response.data.pph21Dtp);
    setStpPph(response.data.stpPph);
    setKelebihanSetorJanuari(response.data.kelebihanSetorJanuari);
    setKelebihanSetorFebruari(response.data.kelebihanSetorFebruari);
    setKelebihanSetorMaret(response.data.kelebihanSetorMaret);
    setKelebihanSetorApril(response.data.kelebihanSetorApril);
    setKelebihanSetorMei(response.data.kelebihanSetorMei);
    setKelebihanSetorJuni(response.data.kelebihanSetorJuni);
    setKelebihanSetorJuli(response.data.kelebihanSetorJuli);
    setKelebihanSetorAgustus(response.data.kelebihanSetorAgustus);
    setKelebihanSetorSeptember(response.data.kelebihanSetorSeptember);
    setKelebihanSetorOktober(response.data.kelebihanSetorOktober);
    setKelebihanSetorNovember(response.data.kelebihanSetorNovember);
    setKelebihanSetorDesember(response.data.kelebihanSetorDesember);

    setTahunPajakPenyiapanSpt(response.data.tahunPajakPenyiapanSpt);
    setKelebihanSetor(response.data.kelebihanSetor);
    setKeterangan(response.data.keterangan);
    setJumlahAngka1213(response.data.jumlahAngka1213);
    setTempTotalKurangAtauLebih(response.data.tempTotalKurangAtauLebih);
    setTotalKurangAtauLebih(response.data.totalKurangAtauLebih);
    setTotalKurangAtauLebihPadaSptYangDibetulkan(
      response.data.totalKurangAtauLebihPadaSptYangDibetulkan
    );
    setTotalKurangAtauLebihKarenaPembetulan(
      response.data.totalKurangAtauLebihKarenaPembetulan
    );

    setTahunPajakKompensasi(response.data.tahunPajakKompensasi);
    setMasaPajakKompensasi(response.data.masaPajakKompensasi);

    // 04.) Accordion 4
    setNamaIdentitas(response.data.ebupot2126penandatangan.namaIdentitas);

    setOpenSearchIdentitasWp(false);
  };

  const getPenandatangan = async () => {
    let bertindakSebagai = "Wakil Wajib Pajak (Pengurus)";

    const response = await axios.post(
      `${tempUrl}/eBupot2126PenandatangansByUserByBertindakSebagai`,
      {
        bertindakSebagai,
        userEBupot2126PenandatanganId: user.id,
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

  const updateEbupot2126UbahPenyiapanSpt = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      namaIdentitas.length !== 0 &&
      stpPph.length !== 0 &&
      kelebihanSetor.length !== 0;

    if (handlingInput) {
      try {
        let updatedEBupot2126PenyiapanSpt = await axios.post(
          `${tempUrl}/updateEBupot2126PenyiapanSpt/${id}`,
          {
            userId: user.id,

            namaIdentitas,

            // PENGHITUNGAN PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG (LEBIH) DISETOR
            pph21Dtp,
            stpPph,
            kelebihanSetorJanuari,
            kelebihanSetorFebruari,
            kelebihanSetorMaret,
            kelebihanSetorApril,
            kelebihanSetorMei,
            kelebihanSetorJuni,
            kelebihanSetorJuli,
            kelebihanSetorAgustus,
            kelebihanSetorSeptember,
            kelebihanSetorOktober,
            kelebihanSetorNovember,
            kelebihanSetorDesember,

            tahunPajakPenyiapanSpt,
            kelebihanSetor,
            keterangan,
            jumlahAngka1213,
            tempTotalKurangAtauLebih,
            totalKurangAtauLebih,
            totalKurangAtauLebihPadaSptYangDibetulkan,
            totalKurangAtauLebihKarenaPembetulan,

            tahunPajakKompensasi,
            masaPajakKompensasi,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setOpenSearchIdentitasWp(true);
        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          navigate("/ebupot2126/sptMasa/penyiapanSpt");
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const kirimSptEbupot2126PenyiapanSpt = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput = passphrase.length !== 0;

    if (handlingInput) {
      if (
        jenisOtentikasi === "Sertifikat Elektronik" &&
        user.passphrase !== passphrase
      ) {
        setDetilSearchIdentitasWp("Passphrase salah!");
        setOpenConfirmationSearchIdentitasWp(true);
        return;
      }
      if (
        jenisOtentikasi === "Kode Verifikasi via Email" &&
        kodeVerifikasi.length !== 0
      ) {
        setDetilSearchIdentitasWp("Kode Verifikasi via Email salah!");
        setOpenConfirmationSearchIdentitasWp(true);
        return;
      }

      try {
        let terkirimSptEBupot2126PenyiapanSpt = await axios.post(
          `${tempUrl}/kirimSptEBupot2126PenyiapanSpt/${id}`,
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
          navigate("/ebupot2126/sptMasa/penyiapanSpt");
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupot2126UbahPenyiapanSpt = async (e) => {
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
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/posting"} />
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
          <MenuEbupot2126SptMasa />
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
                  <div style={inputInput2}>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        No Telepon
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={nomorTelepon} disabled />
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
                        Email
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={email} disabled />
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
                        Alamat
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={alamat} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <div style={profilMenuContainer}>
                  <div style={profilMenuWrapper}>
                    {menu === "Formulir 1721" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={profilMenuStyle}
                        onClick={() => setMenu("Formulir 1721")}
                      >
                        <DescriptionOutlinedIcon /> Formulir 1721
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={profilMenuStyle}
                        onClick={() => setMenu("Formulir 1721")}
                      >
                        <DescriptionOutlinedIcon /> Formulir 1721
                      </div>
                    )}
                    {menu === "Kirim SPT" ? (
                      <div
                        className="menu-data-kirim-spt-text-active"
                        style={profilMenuStyle}
                        onClick={() => setMenu("Kirim SPT")}
                      >
                        <DescriptionOutlinedIcon /> Kirim SPT
                      </div>
                    ) : (
                      <div
                        className="menu-data-kirim-spt-text"
                        style={profilMenuStyle}
                        onClick={() => setMenu("Kirim SPT")}
                      >
                        <DescriptionOutlinedIcon /> Kirim SPT
                      </div>
                    )}
                  </div>
                </div>
                {menu === "Formulir 1721" && (
                  <div>
                    <div style={{ marginTop: "20px" }}>
                      <Card style={{ marginTop: "20px" }}>
                        <Card.Header style={inputTitle}>
                          <FileCopyIcon style={{ marginRight: "10px" }} />
                          OBJEK PAJAK
                        </Card.Header>
                        <Card.Body>
                          <div>
                            <ShowTableEbupot2126PenyiapanSptObjekPajak
                              currentPosts={eBupot2126ObjekPajaks}
                            />
                          </div>
                          <TableContainer
                            component={Paper}
                            sx={{ width: "100%" }}
                          >
                            <Table aria-label="simple table">
                              <TableHead className={classes.root}>
                                <TableRow>
                                  <TableCell
                                    colSpan={5}
                                    sx={{ fontWeight: "bold" }}
                                    className={classes.tableRightBorder}
                                  >
                                    PENGHITUNGAN PPh PASAL 21 DAN/ATAU PASAL 26
                                    YANG KURANG (LEBIH) DISETOR
                                  </TableCell>
                                  <TableCell
                                    sx={textDataStyle}
                                    className={classes.tableRightBorder}
                                  >
                                    JUMLAH
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    11a
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    PPh PASAL 21 DITANGGUNG PEMERINTAH
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      required
                                      value={pph21Dtp}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    12
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    STP PPh PASAL 21 DAN/ATAU PASAL 26 (HANYA
                                    POKOK PAJAK)
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      isInvalid={stpPph.length === 0}
                                      value={stpPph}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    13
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    KELEBIHAN PENYETORAN PPh PASAL 21 DAN/ATAU
                                    PASAL 26 DARI :
                                  </TableCell>
                                  <TableCell sx={textDataStyle}></TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  ></TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      <div style={{ display: "flex" }}>
                                        <div
                                          style={{
                                            width: "40px",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Masa Pajak
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorJanuari}
                                            disabled
                                          />
                                          <div>JAN</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorFebruari}
                                            disabled
                                          />
                                          <div>FEB</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorMaret}
                                            disabled
                                          />
                                          <div>MAR</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorApril}
                                            disabled
                                          />
                                          <div>APR</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorMei}
                                            disabled
                                          />
                                          <div>MEI</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorJuni}
                                            disabled
                                          />
                                          <div>JUN</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorJuli}
                                            disabled
                                          />
                                          <div>JUL</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorAgustus}
                                            disabled
                                          />
                                          <div>AGU</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorSeptember}
                                            disabled
                                          />
                                          <div>SEP</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorOktober}
                                            disabled
                                          />
                                          <div>OKT</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorNovember}
                                            disabled
                                          />
                                          <div>NOV</div>
                                        </div>
                                        <div style={checkboxMasaPajakContainer}>
                                          <Form.Check
                                            type="checkbox"
                                            checked={kelebihanSetorDesember}
                                            disabled
                                          />
                                          <div>DES</div>
                                        </div>
                                        <div style={tahunMasaPajakContainer}>
                                          <Form.Group
                                            as={Row}
                                            className="mb-4"
                                            controlId="formPlaintextPassword"
                                          >
                                            <Col sm="12">
                                              <Autocomplete
                                                size="small"
                                                disablePortal
                                                id="combo-box-demo"
                                                options={tahunPajakOptions}
                                                renderInput={(params) => (
                                                  <TextField
                                                    size="small"
                                                    placeholder="Tahun Kalender"
                                                    {...params}
                                                  />
                                                )}
                                                inputValue={
                                                  tahunPajakPenyiapanSpt
                                                }
                                                value={tahunPajakPenyiapanSpt}
                                                disabled
                                              />
                                            </Col>
                                          </Form.Group>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      isInvalid={kelebihanSetor.length === 0}
                                      value={kelebihanSetor}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  ></TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      <div style={{ display: "flex" }}>
                                        <div style={{ width: "100%" }}>
                                          <Form.Group
                                            as={Row}
                                            className="mb-3"
                                            controlId="formPlaintextPassword"
                                          >
                                            <Form.Label column sm="4">
                                              Keterangan
                                            </Form.Label>
                                            <Col sm="8">
                                              <Form.Control
                                                value={keterangan}
                                                disabled
                                              />
                                            </Col>
                                          </Form.Group>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}></TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    14
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    JUMLAH (ANGKA 12 + ANGKA 13)
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      value={jumlahAngka1213}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    15
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG
                                      (LEBIH) DISETOR (ANGKA 11 KOLOM 6 - ANGKA
                                      11a - ANGKA 14)
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      value={totalKurangAtauLebih}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    16
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG
                                      (LEBIH) DISETOR PADA SPT YANG DIBETULKAN
                                      (PINDAHAN DARI
                                    </div>
                                    <div>
                                      BAGIAN B ANGKA 15 DARI SPT YANG
                                      DIBETULKAN)
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      value={
                                        totalKurangAtauLebihPadaSptYangDibetulkan
                                      }
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    17
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG
                                      (LEBIH) DISETOR KARENA PEMBETULAN (ANGKA
                                      15 - ANGKA 16)
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}>
                                    <NumericFormat
                                      value={
                                        totalKurangAtauLebihKarenaPembetulan
                                      }
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      disabled
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    18
                                  </TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div>
                                      KELEBIHAN SETOR PADA ANGKA 15 ATAU ANGKA
                                      17 AKAN DIKOMPENSASIKAN KE MASA PAJAK (mm
                                      - yyyy)
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}></TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow
                                  key={"11a"}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                  ></TableCell>
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div style={{ display: "flex" }}>
                                      <div style={{ flex: 1 }}>
                                        <Form.Group
                                          as={Row}
                                          className="mb-3"
                                          controlId="formPlaintextPassword"
                                        >
                                          <Form.Label column sm="4">
                                            Tahun Kalender
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
                                                  placeholder="Pilih Tahun Pajak"
                                                  error={
                                                    validated &&
                                                    tahunPajakKompensasi.length ===
                                                      0
                                                  }
                                                  helperText={
                                                    validated &&
                                                    tahunPajakKompensasi.length ===
                                                      0 &&
                                                    "Kolom ini diperlukan."
                                                  }
                                                  {...params}
                                                />
                                              )}
                                              onInputChange={(e, value) => {
                                                setTahunPajakKompensasi(value);
                                              }}
                                              inputValue={tahunPajakKompensasi}
                                              value={tahunPajakKompensasi}
                                              disabled
                                            />
                                          </Col>
                                        </Form.Group>
                                      </div>
                                      <div
                                        style={{ flex: 1, marginLeft: "10px" }}
                                      >
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
                                                  placeholder="Pilih Masa Pajak"
                                                  error={
                                                    validated &&
                                                    masaPajakKompensasi.length ===
                                                      0
                                                  }
                                                  helperText={
                                                    validated &&
                                                    masaPajakKompensasi.length ===
                                                      0 &&
                                                    "Kolom ini diperlukan."
                                                  }
                                                  {...params}
                                                />
                                              )}
                                              onInputChange={(e, value) => {
                                                setMasaPajakKompensasi(value);
                                              }}
                                              inputValue={masaPajakKompensasi}
                                              value={masaPajakKompensasi}
                                              disabled
                                            />
                                          </Col>
                                        </Form.Group>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell sx={textDataStyle}></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Card.Body>
                      </Card>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <Card style={{ marginTop: "20px" }}>
                        <Card.Header style={inputTitle}>
                          <FileCopyIcon style={{ marginRight: "10px" }} />
                          OBJEK PAJAK FINAL
                        </Card.Header>
                        <Card.Body>
                          <div>
                            <ShowTableEbupot2126PenyiapanSptObjekPajakFinal
                              currentPosts={eBupot2126ObjekPajaks}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )}
                {menu === "Kirim SPT" && (
                  <>
                    <Card style={{ marginTop: "20px" }}>
                      <Card.Header style={inputTitle}>
                        <SendIcon style={{ marginRight: "10px" }} />
                        Kirim SPT Masa PPh 21/26
                      </Card.Header>
                      <Card.Body>
                        <Form
                          noValidate
                          validated={validated}
                          className="d-flex flex-column"
                          onSubmit={kirimSptEbupot2126PenyiapanSpt}
                        >
                          <div
                            style={{ textAlign: "center", color: "#646c9a" }}
                          >
                            <p>
                              Untuk dapat mengirim SPT silakan memilih
                              otentikasi
                            </p>
                          </div>
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
                                  Jenis Otentikasi
                                </Form.Label>
                                <Col sm="8">
                                  <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={jenisOtentikasiOptions}
                                    renderInput={(params) => (
                                      <TextField size="small" {...params} />
                                    )}
                                    onInputChange={(e, value) => {
                                      setJenisOtentikasi(value);
                                    }}
                                    inputValue={jenisOtentikasi}
                                    value={jenisOtentikasi}
                                  />
                                </Col>
                              </Form.Group>
                              {jenisOtentikasi == "Sertifikat Elektronik" ? (
                                <>
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
                                            passphraseVisible
                                              ? "text"
                                              : "password"
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
                                </>
                              ) : (
                                <>
                                  <Form.Group
                                    as={Row}
                                    className="mb-2"
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="4">
                                      Ambil Kode Verifikasi
                                    </Form.Label>
                                    <Col sm="8">
                                      <div>
                                        <button
                                          className="ebupot-unifikasi-rekam-button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                          }}
                                        >
                                          <b>[di sini]</b>
                                        </button>
                                        <p>
                                          Pastikan server code yang anda terima
                                          sesuai.
                                        </p>
                                      </div>
                                    </Col>
                                  </Form.Group>
                                  <Form.Group
                                    as={Row}
                                    className="mb-2"
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="4">
                                      Kode Verifikasi
                                    </Form.Label>
                                    <Col sm="8">
                                      <InputGroup>
                                        <Form.Control
                                          required
                                          type={
                                            kodeVerifikasiVisible
                                              ? "text"
                                              : "password"
                                          }
                                          value={kodeVerifikasi}
                                          onChange={(e) =>
                                            setKodeVerifikasi(
                                              e.target.value.toUpperCase()
                                            )
                                          }
                                        />
                                        <Button
                                          variant="outline-secondary"
                                          onClick={
                                            toggleKodeVerifikasiVisibility
                                          }
                                          className="no-hover"
                                        >
                                          {kodeVerifikasiVisible ? (
                                            <VisibilityIcon />
                                          ) : (
                                            <VisibilityOffIcon />
                                          )}
                                        </Button>
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>
                                </>
                              )}
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
                                      "/ebupot2126/sptMasa/penyiapanSpt"
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
                navigate("/ebupot2126/daftarPenyiapanSpt");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupot2126UbahPenyiapanSpt}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Ebupot2126PenyiapanSptKirimSpt;

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

const submenuContainer = {
  display: "flex",
  marginBottom: "20px",
};

const submenuWrapper = {
  background: "#282a3c",
  borderRadius: "4px",
  padding: "0 0.75rem",
  fontWeight: 700,
  color: "white",
};

const submenuWrapper2 = {
  background: "#212c5f",
  borderRadius: "4px",
  padding: "0 0.75rem",
  fontWeight: 700,
  color: "white",
};

const textDataStyle = {
  fontWeight: "bold",
  textAlign: "center",
};

const checkboxMasaPajakContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "10px",
};

const tahunMasaPajakContainer = {
  width: "250px",
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

const profilMenuStyle = {
  marginRight: "40px",
  flex: 1,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};
