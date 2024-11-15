import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import { getLastDateOfMonth, getMonthIndex } from "../../../constants/helper";
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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan perekaman data
        baru Bukti Pemotongan PPh 26 serta perubahannya.
      </p>
      <p>Form ini terdiri dari beberapa bagian antara lain:</p>
      <ol>
        <li>Bagian I, Identitas Wajib Pajak Yang Dipotong</li>
        <li>Bagian II, Penghasilan Yang Dipotong</li>
        <li>Bagian III, Identitas Pemotong Pajak</li>
      </ol>
      <p>Berikut ini petunjuk pengisian pada masing-masing bagian:</p>
      <p>
        <b>BAGIAN I,</b> Identitas Wajib Pajak Yang Dipotong
      </p>
      <ul>
        <li>
          Tahun Pajak, Tentukan tahun pajak saat melakukan pemotongan Pajak
          Penghasilan, tahun paling awal adalah 2020.
        </li>
        <li>
          Masa Pajak, Tentukan Masa Pajak yang sesuai untuk transaksi pemotongan
          Pajak Pengasilan, pilihan terdiri dari masa 1 s.d 12 bergantung pada
          tahun pajak yang Anda Pilih.
        </li>
        <li>
          Nomor Bukti Potong, isikan nomor bukti potong sesuai dengan Identitas,
          Identitas yang dperbolehkan digunakan hanya NPWP atau NIK(KTP), jika
          tidak memiliki, maka tidak diperbolehkan untuk dilakukan perekaman
          data dengan ketentuan yang berlaku.
        </li>
        <li>
          Dalam hal NPWP yang digunakan sebagai identitas, masukkan NPWP dari
          Wajib pajak yang dipotong, Sistem akan melakukan pencarian otomatis
          atas NPWP tersebut dan jika ditemukan datanya akan ditampilkan
          data-data yang sesuai pada isian dibawahnya.
        </li>
        <li>
          Dalam hal NIK yang digunakan sebagai identitas, masukkan NIK dari
          Wajib Pajak yang dipotong, Sistem akan melakukan pencarian data secara
          otomatis ke data yang bersumber dari Kementerian Dalam Negeri atas NIK
          yang dimasukkan.
        </li>
        <li>Tidak diperbolehkan menggunakan identitas yang tidak valid.</li>
      </ul>
      <p>
        <b>BAGIAN II,</b> Penghasilan Yang Dipotong
      </p>
      <ul>
        <li>
          Pilihlah Kode Objek Pajak dari pilihan yang tersedia, Anda dapat
          mengetikkan kata kunci untuk mempercepat pencarian objek pajak. Dengan
          memilih Kode Objek Pajak, sistem akan melakukan pencarian secara
          otomatis terhadap fasilitas yg dimilik oleh Wajib Pajak.
        </li>
        <li>Pilihlah fasilitas yang dimiliki oleh Wajib Pajak :</li>
        <ol>
          <li>
            Jika tidak memiliki fasilitas, maka pilihlah pilihan tanpa fasilitas
            pada pilihan yang tersedia.
          </li>
          <li>
            Jika memiliki fasilitas berupa dikenakan tarif sesuai Perjanjian
            Penghindaran Pajak Berganda (P3B), masukan nomor tanda terima SKD
            WPLN.
          </li>
          <li>
            Jika memiliki fasilitas DTP, masukkan Nomor Dokumen Pendukungnya
            serta NTPN atas pembayaran Penghasilan yang Ditanggung Pemerintah.
          </li>
          <li>
            Jika memiliki fasilitas lainnya, masukkan Nomor Dokumen Fasilitas
            lainnya.
          </li>
        </ol>
        <li>
          Dengan memilih Kode Objek Pajak, Sistem akan melakukan pencarian
          secara otomatis tarif dari jenis objek pajak.
        </li>
        <li>
          Isikan nilai nominal Penghasilan Bruto pada kotak yang tersedia,
          Sistem akan menghitung secara otomatis nilai Pajak Penghasilan yang
          dipotong .
        </li>
      </ul>
      <p>
        <b>BAGIAN III,</b> Identitas Pemotong
      </p>
      <ul>
        <li>
          Pastikan Anda telah melakukan perekaman data penandatangan pada menu
          Pengaturan, sebelum melakukan perekaman bukti pemotongan.
        </li>
        <li>
          Pada bagian ini, Anda harus menentukan, pihak yang akan menandatangani
          dokumen bukti pemotongan ini apakah Wajib Pajak/Wakil Wajib Wajib
          Pajak atau Kuasa.
        </li>
        <li>
          Tanggal Pemotongan adalah secara otomatis tanggal dari Sistem pada
          saat direkam Bukti Pemotongan.
        </li>
        <li>
          Pastikan isian Anda telah lengkap dan benar, kemudian contreng
          pernyataan yang disediakan yang menunjukkan Anda telah dengan seksama
          memastikan kebenaran isi dari bukti pemotongan yang dibuat, kemudian
          klik tombol simpan untuk menyimpan data.
        </li>
      </ul>
    </div>
  );
};

function Ebupot2126InputPph26() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year

  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = [];

  for (let i = 0; i < 3; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajak, setTahunPajak] = useState("");

  const [maxMasaPajak, setMaxMasaPajak] = useState(new Date());
  const [masaPajak, setMasaPajak] = useState("");
  const [masaPajakOptions, setMasaPajakOptions] = useState([]);
  const [tinPasporKitasKitap, setTinPasporKitasKitap] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaNegara, setNamaNegara] = useState("");

  // Kondisi
  const [isFasilitasValid, setIsFasilitasValid] = useState(false);

  // 02.) JENIS PEMOTONGAN PPH PASAL 26
  const [kodeObjekPajak, setKodeObjekPajak] = useState("");
  const [fasilitasPajakPenghasilan, setFasilitasPajakPenghasilan] =
    useState("SKD WPLN");
  const [nomorSkdWpln, setNomorSkdWpln] = useState("");

  // 03.) PENGHITUNGAN PPH PASAL 26
  const [jumlahPenghasilanBruto, setJumlahPenghasilanBruto] = useState("");
  const [tarif, setTarif] = useState("");
  const [pPhYangDipotongDipungut, setPPhYangDipotongDipungut] = useState("");

  const [tanggalDokumen, setTanggalDokumen] = useState(new Date());

  // 04.) PENANDATANGAN BUKTI PEMOTONGAN
  const [bertindakSebagai, setBertindakSebagai] = useState(
    "Wakil Wajib Pajak (Pengurus)"
  );
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [pernyataanBenar, setPernyataanBenar] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);
  const [negaras, setNegaras] = useState([]);
  const [objekPajaks, setObjekPajaks] = useState([]);
  const [penandatangans, setPenandatangans] = useState([]);

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  let negarasOptions = negaras.map((negara) => ({
    label: `${negara.namaNegara}`,
  }));

  let objekPajakOptions = objekPajaks.map((objekPajak) => ({
    label: `${objekPajak.kodeObjekPajak} - ${objekPajak.namaObjekPajak}`,
  }));

  let namaIdentitasOptions = penandatangans.map((namaIdentitas) => ({
    label: `${namaIdentitas.namaIdentitas}`,
  }));

  useEffect(() => {
    getNegara();
    getObjekPajakData();
    getPenandatangan();
  }, []);

  const getNegara = async () => {
    const response = await axios.post(`${tempUrl}/negaras`, {
      userId: user.id,
      _id: user.id,
      token: user.token,
    });
    setNegaras(response.data);
    setOpenSearchIdentitasWp(true);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const getObjekPajakData = async () => {
    const response = await axios.post(`${tempUrl}/objekPajaksBupot2126`, {
      untukBupot2126: "PPh 26",
      _id: user.id,
      token: user.token,
    });
    setObjekPajaks(response.data);
    if (response.data) {
      setTarif(response.data[0].tarifPersen);
    }
  };

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

  const getTarifPersen = async (kodeObjekPajak) => {
    setTarif("");
    const response = await axios.post(`${tempUrl}/objekPajakByKode`, {
      kodeObjekPajak,
      _id: user.id,
      token: user.token,
    });
    if (response.data) {
      setTarif(response.data.tarifPersen);

      let hitungPph =
        (jumlahPenghasilanBruto * response.data.tarifPersen) / 100;
      setPPhYangDipotongDipungut(parseInt(hitungPph));
    }
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

  // Handle Fasilitas Pajak Penghasilan input change
  const handleFasilitasPajakPenghasilanChange = (e) => {
    setFasilitasPajakPenghasilan(e.target.value);
    getTarifPersen(kodeObjekPajak);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const saveEbupot2126InputPph26 = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      tahunPajak.length !== 0 &&
      masaPajak.length !== 0 &&
      tinPasporKitasKitap.length !== 0 &&
      nama.length !== 0 &&
      alamat.length !== 0 &&
      namaNegara.length !== 0 &&
      kodeObjekPajak.length !== 0 &&
      jumlahPenghasilanBruto.length !== 0 &&
      tarif.length !== 0 &&
      pPhYangDipotongDipungut.length !== 0 &&
      bertindakSebagai.length !== 0 &&
      namaIdentitas.length !== 0;

    if (handlingInput) {
      try {
        setOpenSearchIdentitasWp(true);
        let savedEBupot2126Pph26 = await axios.post(
          `${tempUrl}/saveEBupot2126Pph26`,
          {
            userId: user.id,

            // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
            tahunPajak,
            masaPajak,
            tinPasporKitasKitap,
            nama,
            alamat,
            namaNegara,

            // Kondisi
            isFasilitasValid,

            // 02.) JENIS PEMOTONGAN PPH PASAL 26
            kodeObjekPajak: kodeObjekPajak.split(" -", 2)[0],
            fasilitasPajakPenghasilan,
            nomorSkdWpln,

            // 03.) PENGHITUNGAN PPH PASAL 26
            jumlahPenghasilanBruto,
            tarif: tarif.toString().replace(",", "."),
            pPhYangDipotongDipungut,

            // 04.) PENANDATANGAN BUKTI PEMOTONGAN
            namaIdentitas,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          setOpenSaved(true);
        }, 1000);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupot2126InputPph26 = async (e) => {
    setOpenSaved(false);

    setValidated(false);

    // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
    setTahunPajak("");
    setMaxMasaPajak("");
    setMasaPajak("");
    setMasaPajakOptions([]);
    setTinPasporKitasKitap("");
    setNama("");
    setAlamat("");
    setNamaNegara("");

    // Kondisi
    setFasilitasPajakPenghasilan("Tanpa Fasilitas");

    // 02.) JENIS PEMOTONGAN PPH PASAL 26
    setKodeObjekPajak("");
    setFasilitasPajakPenghasilan("SKD WPLN");
    setNomorSkdWpln("");

    // 03.) PENGHITUNGAN PPH PASAL 26
    setJumlahPenghasilanBruto("");
    setTarif("");
    setPPhYangDipotongDipungut("");

    // 04.) PENANDATANGAN BUKTI PEMOTONGAN
    setBertindakSebagai("");
    setNamaIdentitas("");
    setPernyataanBenar(false);
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

  const inputWrapperDialogueSaved = {
    marginTop: screenSize >= 1000 && "20px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
    paddingLeft: screenSize >= 600 && "60px",
    paddingRight: screenSize >= 600 && "60px",
  };

  const inputRadioWrapper = {
    display: screenSize >= 900 && "flex",
  };

  const inputRadio = {
    cursor: "pointer",
    marginLeft: screenSize >= 900 && "20px",
  };

  const inputTindakanRadio = {
    cursor: "pointer",
    marginLeft: screenSize >= 900 && "20px",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/buktiPotongPasal26"} />
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
          <MenuEbupot2126 />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="hover-button"
              style={{ marginRight: "4px" }}
              onClick={() => {
                navigate("/ebupot2126/posting");
              }}
            >
              <CachedIcon fontSize="small" style={{ marginRight: "4px" }} />
              Posting
            </button>
          </div>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Perekaman Bukti Potong Pasal 26
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={saveEbupot2126InputPph26}
              >
                <div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
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
                    <div style={inputInput2}>
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

                              const month = getMonthIndex(value);
                              const lastDate = getLastDateOfMonth(
                                tahunPajak,
                                month
                              );
                              setMaxMasaPajak(lastDate);
                              setTanggalDokumen(lastDate);
                            }}
                            inputValue={masaPajak}
                            value={masaPajak}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div>
                    <div style={submenuContainer}>
                      <div style={submenuWrapper}>
                        IDENTITAS WAJIB PAJAK YANG DIPOTONG
                      </div>
                    </div>
                    <hr />

                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            TIN / Paspor / KITAS/KITAP
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              value={tinPasporKitasKitap}
                              onChange={(e) => {
                                setTinPasporKitasKitap(e.target.value);
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputInput2}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Nama
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              value={nama}
                              onChange={(e) => {
                                setNama(e.target.value.toUpperCase());
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
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
                              required
                              value={alamat}
                              onChange={(e) => {
                                setAlamat(e.target.value.toUpperCase());
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
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
                            Negara
                          </Form.Label>
                          <Col sm="8">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={negarasOptions}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  error={validated && namaNegara.length === 0}
                                  helperText={
                                    validated &&
                                    namaNegara.length === 0 &&
                                    "Kolom ini diperlukan."
                                  }
                                  {...params}
                                />
                              )}
                              onInputChange={(e, value) => {
                                setNamaNegara(value);
                              }}
                              inputValue={namaNegara}
                              value={namaNegara}
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>
                      JENIS PEMOTONGAN PPH PASAL 26
                    </div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Kode Objek Pajak
                        </Form.Label>
                        <Col sm="9">
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={objekPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={validated && kodeObjekPajak.length === 0}
                                helperText={
                                  validated &&
                                  kodeObjekPajak.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setKodeObjekPajak(value.split(" ", 1)[0]);
                            }}
                            inputValue={kodeObjekPajak}
                            value={kodeObjekPajak}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Fasilitas PPh Pasal 26
                        </Form.Label>
                        <Col sm="9">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={isFasilitasValid}
                                  onChange={() => {
                                    setIsFasilitasValid(!isFasilitasValid);

                                    if (!isFasilitasValid == true) {
                                      setJumlahPenghasilanBruto("");
                                      setTarif("");
                                      setPPhYangDipotongDipungut("");
                                    } else {
                                      getObjekPajakData();
                                      setJumlahPenghasilanBruto("");
                                      setPPhYangDipotongDipungut("");
                                    }
                                  }}
                                />
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  {isFasilitasValid && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="3"
                            style={{ visibility: "hidden" }}
                          >
                            Fasilitas PPh Pasal 26
                          </Form.Label>
                          <Col sm="4">
                            <Form.Check
                              type="radio"
                              label="SKD WPLN"
                              name="SKD WPLN"
                              value="SKD WPLN"
                              checked={fasilitasPajakPenghasilan === "SKD WPLN"}
                              onChange={handleFasilitasPajakPenghasilanChange}
                              style={{ cursor: "pointer" }}
                            />
                          </Col>
                          <Col sm="5">
                            {fasilitasPajakPenghasilan === "SKD WPLN" ? (
                              <>
                                <Form.Control
                                  required
                                  placeholder="Nomor Suket DTP"
                                  value={nomorSkdWpln}
                                  onChange={(e) => {
                                    setNomorSkdWpln(e.target.value);
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </>
                            ) : (
                              <>
                                <Form.Control
                                  placeholder="Nomor Suket DTP"
                                  value={nomorSkdWpln}
                                  readOnly
                                />
                              </>
                            )}
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>PENGHITUNGAN PPH PASAL 26</div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Jumlah Penghasilan Bruto
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          <NumericFormat
                            required
                            value={jumlahPenghasilanBruto}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setJumlahPenghasilanBruto(tempValues);

                              let totalPphYangDipotongDipungut =
                                (parseInt(tempValues) * parseInt(tarif)) / 100;
                              setPPhYangDipotongDipungut(
                                totalPphYangDipotongDipungut
                              );
                            }}
                          />
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Tarif
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          {isFasilitasValid ? (
                            <InputGroup>
                              <NumericFormat
                                required
                                value={tarif}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                customInput={Form.Control}
                                style={{ textAlign: "right" }}
                                onValueChange={(values) => {
                                  let tempValues = values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "");

                                  setTarif(tempValues);

                                  let totalPphYangDipotongDipungut =
                                    (parseInt(jumlahPenghasilanBruto) *
                                      parseInt(tempValues)) /
                                    100;
                                  setPPhYangDipotongDipungut(
                                    totalPphYangDipotongDipungut
                                  );
                                }}
                              />
                              <InputGroup.Text id="basic-addon1">
                                %
                              </InputGroup.Text>
                            </InputGroup>
                          ) : (
                            <InputGroup>
                              <NumericFormat
                                required
                                value={tarif}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                customInput={Form.Control}
                                style={{ textAlign: "right" }}
                                disabled
                              />
                              <InputGroup.Text id="basic-addon1">
                                %
                              </InputGroup.Text>
                            </InputGroup>
                          )}
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          PPh Pasal 26
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          <NumericFormat
                            required
                            value={pPhYangDipotongDipungut}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPPhYangDipotongDipungut(tempValues);
                            }}
                            disabled
                          />
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>
                      PENANDATANGAN BUKTI PEMOTONGAN
                    </div>
                  </div>
                  <hr />
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
                          <Form.Control value={"Pengurus"} readOnly />
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
                                error={validated && namaIdentitas.length === 0}
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
                  <div
                    style={{
                      border: "1px solid #f8aa00",
                      padding: "10px",
                      marginBottom: "20px",
                      color: "#646c9a",
                    }}
                  >
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Dengan ini saya menyatakan bahwa Bukti Pemotongan PPh Pasal 21/26 telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
                        checked={pernyataanBenar}
                        onChange={() => setPernyataanBenar(!pernyataanBenar)}
                      />
                    </div>
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
                      disabled={pernyataanBenar === false && true}
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
                Pasal 4(2), 15, 22, 23 lagi?
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
                navigate("/ebupot2126/buktiPotongPasal26");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupot2126InputPph26}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Ebupot2126InputPph26;

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

const titleContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const titleWrapper = {
  background: "#ffb822",
  borderRadius: "4px",
  padding: "0 0.75rem",
  fontWeight: 700,
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
