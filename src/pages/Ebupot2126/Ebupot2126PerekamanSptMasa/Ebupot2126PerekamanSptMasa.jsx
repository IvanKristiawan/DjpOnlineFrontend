import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { formatDate } from "../../../constants/helper";
import {
  ShowTableEbupotUnifikasiBuktiSetor,
  ShowTableEbupot2126DaftarTagihanPerekamPerKop,
  ShowTableEbupot2126DaftarTagihanPerekamPerKapKjs,
  ShowTableEbupot2126RingkasanPembayaran,
} from "../../../components/ShowTable";
import "../../../constants/defaultProgram.css";
import { Card, Form, Spinner, Row, Col } from "react-bootstrap";
import {
  Paper,
  Box,
  Pagination,
  Autocomplete,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  DialogActions,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NumericFormat } from "react-number-format";
import PaymentsIcon from "@mui/icons-material/Payments";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SendIcon from "@mui/icons-material/Send";
import CachedIcon from "@mui/icons-material/Cached";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";

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
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan perekaman
        bukti penyetoran/pembayaran Pajak Penghasilan (PPh)
      </p>
      <p>
        Pada form ini, Anda dapat melihat daftar tagihan yang disajikan per
        jenis pajak dan jenis setoran sesuai dengan masa pajak yang dipilih
      </p>
      <p>
        Daftar tagihan tersebut dibentuk berdasarkan data bukti pemotongan yang
        telah Anda Rekam
      </p>
      <p>
        Anda dapat menggunakan daftar tagihan ini untuk membuat kode billing
        sebagai dasar penyetoran pajak
      </p>
      <p>
        Jika Anda telah menyetorkan pajak penghasilan yang dipotong, Anda
        selanjutnya dapat melakukan perekaman bukti penyetoran tersebut pada
        form ini
      </p>
      <p>
        Berikut adalah langkah-langkah perekaman bukti penyetoran/pembayaran
      </p>
      <ul>
        <li>
          klik tombol Input Bukti Setor, sehingga Sistem menampilkan pop up
          perekaman bukti pembayaran
        </li>
        <li>
          Bukti Penyetoran yang dapat digunakan adalah Bukti Penerimaan Negara
          (BPN) dan Bukti Pemindahbukuan (Pbk)
        </li>
        <li>
          Jika Anda telah memiliki Bukti Penerimaan Negara yang diperoleh dari
          Bank saat melakukan penyetoran, Silahkan Anda pilih Surat Setoran
          Pajak pada pilihan Jenis Bukti Penyetoran
        </li>
        <li>
          Isikan Nomor Transaksi Penerimaan Negara (NTPN) yang tertera pada BPN
          pada kotak Nomor Bukti Penerimaan, kemudian Pilihlah tahun penyetoran
          yang sesuai
        </li>
        <li>
          Jika Anda telah menerima bukti pemindahbukan (pbk) dari Kantor
          Pelayanan Pajak (KPP), Silahkan Anda masukkan Nomor Pbk pada kotak
          isian yang tersedia, lalu klik tombol Cek Pemindahbukan
        </li>
        <li>
          Jika data pemindahbukuan Anda Valid, Sistem akan memberikan notifikasi
          bahwa data pembayaran Anda telah sesuai, kemudian klik tombol Simpan
        </li>
        <li>
          Jika setelah Anda Klik tombol cek pemindahbukan namun sistem merespon
          data pembayaran tidak ditemukan, Anda dapat menanyakan kepada Account
          Representative Anda di KPP Anda terdaftar
        </li>
      </ul>
    </div>
  );
};

function Ebupot2126PerekamanSptMasa() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accordionState, setAccordionState] = useState("1");

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
  const [validated, setValidated] = useState(false);

  let perekamOptions = [];
  const [perekam, setPerekam] = useState("");

  const [openPerekamanDataBuktiSetor, setOpenPerekamanDataBuktiSetor] =
    useState(false);
  const [jenisBuktiPenyetoran, setJenisBuktiPenyetoran] = useState(
    "Surat Setoran Pajak"
  );
  const [eBupot2126TagihanPemotonganId, setEBupot2126TagihanPemotonganId] =
    useState("");
  const [ntpnBilling, setNtpnBilling] = useState("");
  const [nomorPemindahbukuan, setNomorPemindahbukuan] = useState("");
  const [tahunPajakEBilling, setTahunPajakEBilling] = useState("");
  const [masaPajakEBilling, setMasaPajakEBilling] = useState("");
  const [jenisPajak, setJenisPajak] = useState("");
  const [jenisSetoran, setJenisSetoran] = useState("");
  const [jumlahSetor, setJumlahSetor] = useState("");
  const [tanggalSetor, setTanggalSetor] = useState("");

  const [detilSearchSuratSetoranPajak, setDetilSearchSuratSetoranPajak] =
    useState("");
  const [
    openConfirmationSearchSuratSetoranPajak,
    setOpenConfirmationSearchSuratSetoranPajak,
  ] = useState(false);
  const [openFoundSuratSetoranPajak, setOpenFoundSuratSetoranPajak] =
    useState(false);

  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccessGenerateIdBilling, setOpenSuccessGenerateIdBilling] =
    useState(false);
  const [
    eBupot2126TagihanPemotonganPagination,
    setEBupot2126TagihanPemotonganPagination,
  ] = useState([]);
  const [
    eBupot2126RingkasanPembayaranPagination,
    setEBupot2126RingkasanPembayaranPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const [eBupot2126BuktiSetorPagination, setEBupot2126BuktiSetorPagination] =
    useState([]);
  let [pageEBupot2126BuktiSetor, setPageEBupot2126BuktiSetor] = useState(0);
  const [limitEBupot2126BuktiSetor, setLimitEBupot2126BuktiSetor] =
    useState(10);
  const [pagesEBupot2126BuktiSetor, setPagesEBupot2126BuktiSetor] = useState(0);
  const [rowsEBupot2126BuktiSetor, setRowsEBupot2126BuktiSetor] = useState(0);
  const [queryEBupot2126BuktiSetor, setQueryEBupot2126BuktiSetor] =
    useState("");

  let [
    pageEBupot2126RingkasanPembayaran,
    setPageEBupot2126RingkasanPembayaran,
  ] = useState(0);
  const [
    limitEBupot2126RingkasanPembayaran,
    setLimitEBupot2126RingkasanPembayaran,
  ] = useState(10);
  const [
    pagesEBupot2126RingkasanPembayaran,
    setPagesEBupot2126RingkasanPembayaran,
  ] = useState(0);
  const [
    rowsEBupot2126RingkasanPembayaran,
    setRowsEBupot2126RingkasanPembayaran,
  ] = useState(0);
  const [
    queryEBupot2126RingkasanPembayaran,
    setQueryEBupot2126RingkasanPembayaran,
  ] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleChangeEBupot2126BuktiSetor = (e, p) => {
    setPageEBupot2126BuktiSetor(p - 1);
  };

  const handleChangeEBupot2126RingkasanPembayaran = (e, p) => {
    setPageEBupot2126RingkasanPembayaran(p - 1);
  };

  const handleCloseSuccessGenerateIdBilling = () => {
    setOpenSuccessGenerateIdBilling(false);
  };

  const handleClickOpenPerekamanDataBuktiSetor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenPerekamanDataBuktiSetor(true);
  };

  const handleClosePerekamanDataBuktiSetor = () => {
    setOpenPerekamanDataBuktiSetor(false);
  };

  // Handle Jenis Bukti Penyetoran input change
  const handleJenisBuktiPenyetoranChange = (e) => {
    setJenisBuktiPenyetoran(e.target.value);

    setMasaPajakEBilling("");
    setJenisPajak("");
    setJumlahSetor("");
    setTanggalSetor("");
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchSuratSetoranPajak(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundSuratSetoranPajak(false);
  };

  const handleClickOpenConfirmationSearchSuratSetoranPajak = async () => {
    if (ntpnBilling.length !== 16) {
      setDetilSearchSuratSetoranPajak(
        "DATAFORMAT - Nomor Bukti Setor harus diisi 16 karakter."
      );
    } else if (tahunPajakEBilling.length === 0) {
      setDetilSearchSuratSetoranPajak(
        "DATAFORMAT - Tahun Pajak harus diisi angka."
      );
    }

    if (ntpnBilling.length !== 16 || tahunPajakEBilling.length === 0) {
      setOpenConfirmationSearchSuratSetoranPajak(true);
    } else {
      setOpenLoading(true);

      setTimeout(async () => {
        const findEBupot2126TagihanPemotongan = await axios.post(
          `${tempUrl}/eBupot2126TagihanPemotonganByNtpnUser`,
          {
            ntpnBilling,
            tahunPajak: tahunPajakEBilling,
            userIdInput: user.id,
            _id: user.id,
            token: user.token,
          }
        );
        setOpenLoading(false);

        if (findEBupot2126TagihanPemotongan.data) {
          setEBupot2126TagihanPemotonganId(
            findEBupot2126TagihanPemotongan.data.id
          );
          setMasaPajakEBilling(findEBupot2126TagihanPemotongan.data.masaPajak);
          setJenisPajak(
            findEBupot2126TagihanPemotongan.data.objekpajak.jenissetoran
              .jenispajak.kodeJenisPajak
          );
          setJenisSetoran(
            findEBupot2126TagihanPemotongan.data.objekpajak.jenissetoran
              .kodeJenisSetoran
          );
          setJumlahSetor(
            findEBupot2126TagihanPemotongan.data.pphYangDipotong -
              findEBupot2126TagihanPemotongan.data.pphYangDisetor
          );
          setTanggalSetor(
            formatDate(
              findEBupot2126TagihanPemotongan.data.tanggalTagihanPemotongan
            )
          );

          setOpenFoundSuratSetoranPajak(true);
        } else {
          setDetilSearchSuratSetoranPajak(
            "SOA006 - Data Pembayaran G2 tidak ditemukan."
          );
          setOpenConfirmationSearchSuratSetoranPajak(true);
        }
      }, 500);
    }
  };

  let findDate = new Date(); // Get the current date
  let currentMonth = findDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January)

  let masaTahunPajakOptions = [
    {
      label: "test",
    },
  ];

  useEffect(() => {}, []);

  const findMasaPajakOptions = async (tahunPajak) => {
    setOpenLoading(true);
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

    setOpenLoading(false);
  };

  const getEBupot2126TagihanPemotonganData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126TagihanPemotongansByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupot2126TagihanPemotonganId: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupot2126TagihanPemotonganPagination(
      response.data.eBupot2126TagihanPemotongans
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    getEBupot2126RingkasanPembayaranData();
    getEBupot2126BuktiSetorData();

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const getEBupot2126BuktiSetorData = async () => {
    setOpenLoading(true);

    setTimeout(async () => {
      const response = await axios.post(
        `${tempUrl}/eBupot2126BuktiSetorsByUserSearchPagination?search_query=&page=${pageEBupot2126BuktiSetor}&limit=${limitEBupot2126BuktiSetor}`,
        {
          userEBupot2126BuktiSetorId: user.id,
          tahunPajak,
          masaPajak,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setEBupot2126BuktiSetorPagination(response.data.eBupot2126BuktiSetors);
      setPageEBupot2126BuktiSetor(response.data.page);
      setPagesEBupot2126BuktiSetor(response.data.totalPage);
      setRowsEBupot2126BuktiSetor(response.data.totalRows);
      setOpenLoading(false);
    }, 500);
  };

  const getEBupot2126RingkasanPembayaranData = async () => {
    setOpenLoading(true);

    setTimeout(async () => {
      const response = await axios.post(
        `${tempUrl}/eBupot2126TagihanPemotongansByUserSearchPagination?search_query=&page=${pageEBupot2126RingkasanPembayaran}&limit=${limitEBupot2126RingkasanPembayaran}`,
        {
          userEBupot2126TagihanPemotonganId: user.id,
          tahunPajak,
          masaPajak,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setEBupot2126RingkasanPembayaranPagination(
        response.data.eBupot2126TagihanPemotongans
      );
      setPageEBupot2126RingkasanPembayaran(response.data.page);
      setPagesEBupot2126RingkasanPembayaran(response.data.totalPage);
      setRowsEBupot2126RingkasanPembayaran(response.data.totalRows);
      setOpenLoading(false);
    }, 500);
  };

  const deleteEBupot2126PphDisetorSendiri = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/deleteEBupot2126BuktiSetor/${id}`, {
        _id: user.id,
        token: user.token,
      });

      setTimeout(async () => {
        getEBupot2126TagihanPemotonganData();
        setOpenLoading(false);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setOpenLoading(false);
  };

  const saveEBupot2126TagihanPemotongan = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      ntpnBilling.length === 16 &&
      tahunPajakEBilling.length !== 0 &&
      jumlahSetor.length !== 0;

    if (handlingInput) {
      try {
        setOpenLoading(true);

        let findEBupot2126TagihanPemotongan =
          eBupot2126TagihanPemotonganPagination.find(
            (eBupot2126TagihanPemotongan) =>
              eBupot2126TagihanPemotongan.id === eBupot2126TagihanPemotonganId
          );

        if (!findEBupot2126TagihanPemotongan) {
          setOpenLoading(false);
          setOpenPerekamanDataBuktiSetor(false);
          setDetilSearchSuratSetoranPajak("Tagihan sudah lunas.");
          setOpenConfirmationSearchSuratSetoranPajak(true);
          return;
        }

        console.log(findEBupot2126TagihanPemotongan);

        let transaksiEBupot2126BuktiSetor = await axios.post(
          `${tempUrl}/transaksiEBupot2126BuktiSetor`,
          {
            eBupot2126BuktiSetor: {
              userId: user.id,
              eBupot2126TagihanPemotonganId: findEBupot2126TagihanPemotongan.id,

              jenisBuktiPenyetoran,
              eBupot2126TagihanPemotonganId,
              kodeJenisSetoran: jenisSetoran,
              pphYangDisetor: jumlahSetor,

              userIdInput: user.id,
              kodeCabang: user.cabang.id,
              _id: user.id,
              token: user.token,
            },
            eBupot2126TagihanPemotongan: {
              idEBupot2126TagihanPemotongan: findEBupot2126TagihanPemotongan.id,
              pphYangDisetor: jumlahSetor,

              userIdInput: user.id,
              kodeCabang: user.cabang.id,
              _id: user.id,
              token: user.token,
            },
            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        // let savedEBupot2126BuktiSetor =
        getEBupot2126TagihanPemotonganData();
        setTimeout(async () => {
          setOpenLoading(false);
          setOpenPerekamanDataBuktiSetor(false);
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      if (ntpnBilling.length !== 16) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Nomor Bukti Setor harus diisi 16 karakter."
        );
      } else if (tahunPajakEBilling.length === 0) {
        setDetilSearchSuratSetoranPajak(
          "DATAFORMAT - Tahun Pajak harus diisi angka."
        );
      }

      setOpenConfirmationSearchSuratSetoranPajak(true);
    }
    setValidated(true);
  };

  const deleteInputEBupot2126TagihanPemotongan = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setJenisBuktiPenyetoran("Surat Setoran Pajak");
    setEBupot2126TagihanPemotonganId("");
    setNtpnBilling("");
    setNomorPemindahbukuan("");
    setMasaPajakEBilling("");
    setJenisPajak("");
    setJenisSetoran("");
    setJumlahSetor("");
    setTanggalSetor("");
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

  const inputPerekamanDataBuktiSetorContainer = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  };

  const inputPerekamanDataBuktiSetorWrapper = {
    display: "flex",
    flexDirection: "column",
    width: screenSize >= 900 ? "80%" : "100%",
  };

  const inputWrapper = {
    color: "#646c9a",
  };

  const inputWrapperCek = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: "#a7abc3",
  };

  const aksiDaftarBuktiSetorContainer = {
    display: screenSize >= 900 && "flex",
    justifyContent: "space-between",
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
              <PaymentsIcon style={{ marginRight: "10px" }} />
              Perekaman Bukti Penyetoran
            </Card.Header>
            <Card.Body>
              <div style={{ marginBottom: "20px" }}>
                <div style={searchContainer}>
                  <div style={searchWrapper1}>
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
                  <div style={searchWrapper2}>
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
                  <div style={searchWrapper3}>
                    <div>
                      <button
                        className="hover-button"
                        style={{ marginRight: "4px" }}
                        onClick={getEBupot2126TagihanPemotonganData}
                      >
                        <SendIcon
                          fontSize="small"
                          style={{ marginRight: "4px" }}
                        />
                        Cek
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Accordion defaultExpanded={accordionState === "1" && true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={accordionBlue}
                >
                  Rekap Bukti Penyetoran
                </AccordionSummary>
                <AccordionDetails>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <div style={aksiDaftarBuktiSetorContainer}>
                        <div>
                          <FormatListBulletedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Daftar Bukti Setor
                        </div>
                        <div>
                          <button
                            className="daftar-dokumen-button"
                            style={{ marginRight: "10px" }}
                            disabled={masaPajak.length === 0}
                          >
                            <CachedIcon
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Perbarui
                          </button>
                          <button
                            className="tambah-daftar-dokumen-button"
                            disabled={masaPajak.length === 0}
                            onClick={handleClickOpenPerekamanDataBuktiSetor}
                          >
                            <AddCircleIcon
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Tambah
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
                            setLimitEBupot2126BuktiSetor(e.target.value);
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
                        <ShowTableEbupotUnifikasiBuktiSetor
                          currentPosts={eBupot2126BuktiSetorPagination}
                          deleteEBupot2126PphDisetorSendiri={
                            deleteEBupot2126PphDisetorSendiri
                          }
                        />
                      </Box>
                      <Box sx={tableContainer}>
                        <Pagination
                          shape="rounded"
                          color="primary"
                          count={pagesEBupot2126BuktiSetor}
                          page={pageEBupot2126BuktiSetor + 1}
                          onChange={handleChangeEBupot2126BuktiSetor}
                          size={screenSize <= 600 ? "small" : "large"}
                        />
                      </Box>
                    </Card.Body>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded={accordionState === "2" && true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={accordionYellow}
                >
                  Tagihan Perekam
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ marginTop: "20px" }}>
                    <div style={searchContainer}>
                      <div style={searchWrapper1}>
                        <div style={{ marginBottom: "5px" }}>
                          Pencarian Berdasarkan Perekam
                        </div>
                        <div>
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={perekamOptions}
                            renderInput={(params) => (
                              <TextField size="small" {...params} />
                            )}
                            onInputChange={(e, value) => {
                              setPerekam(value);
                            }}
                            inputValue={perekam}
                            value={perekam}
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
                            // onClick={getEBupotUnifikasiPphDisetorSendiriData}
                          >
                            <SearchIcon style={{ marginRight: "5px" }} />
                            Cari
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <div style={aksiDaftarBuktiSetorContainer}>
                        <div>
                          <FormatListBulletedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Daftar Tagihan Perekam Per KOP
                        </div>
                        <div>
                          <button
                            className="daftar-dokumen-button"
                            disabled={masaPajak.length === 0}
                          >
                            <CachedIcon
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Perbarui
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
                        <ShowTableEbupot2126DaftarTagihanPerekamPerKop
                          currentPosts={eBupot2126TagihanPemotonganPagination}
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
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <div style={aksiDaftarBuktiSetorContainer}>
                        <div>
                          <FormatListBulletedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Daftar Tagihan Perekam Per KAP/KJS
                        </div>
                        <div>
                          <button
                            className="daftar-dokumen-button"
                            disabled={masaPajak.length === 0}
                          >
                            <CachedIcon
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Perbarui
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
                        <ShowTableEbupot2126DaftarTagihanPerekamPerKapKjs
                          currentPosts={eBupot2126TagihanPemotonganPagination}
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
              <Accordion defaultExpanded={accordionState === "3" && true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={accordionBlue}
                >
                  Ringkasan Pembayaran
                </AccordionSummary>
                <AccordionDetails>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <div style={aksiDaftarBuktiSetorContainer}>
                        <div>
                          <FormatListBulletedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Daftar Ringkasan Pembayaran
                        </div>
                        <div>
                          <button
                            className="daftar-dokumen-button"
                            disabled={masaPajak.length === 0}
                          >
                            <CachedIcon
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />
                            Perbarui
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
                            setLimitEBupot2126RingkasanPembayaran(
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
                        <ShowTableEbupot2126RingkasanPembayaran
                          currentPosts={eBupot2126TagihanPemotonganPagination}
                        />
                      </Box>
                      <Box sx={tableContainer}>
                        <Pagination
                          shape="rounded"
                          color="primary"
                          count={pagesEBupot2126RingkasanPembayaran}
                          page={pageEBupot2126RingkasanPembayaran + 1}
                          onChange={handleChangeEBupot2126RingkasanPembayaran}
                          size={screenSize <= 600 ? "small" : "large"}
                        />
                      </Box>
                    </Card.Body>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        onClose={handleClosePerekamanDataBuktiSetor}
        aria-labelledby="customized-dialog-title"
        open={openPerekamanDataBuktiSetor}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Perekaman Data Bukti Setor
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosePerekamanDataBuktiSetor}
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
          <div style={inputPerekamanDataBuktiSetorContainer}>
            <div style={inputPerekamanDataBuktiSetorWrapper}>
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
                      checked={jenisBuktiPenyetoran === "Surat Setoran Pajak"}
                      onChange={handleJenisBuktiPenyetoranChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                  <Col sm="4" className="mt-2">
                    <Form.Check
                      type="radio"
                      label="Pemindahbukuan"
                      name="Pemindahbukuan"
                      value="Pemindahbukuan"
                      checked={jenisBuktiPenyetoran === "Pemindahbukuan"}
                      onChange={handleJenisBuktiPenyetoranChange}
                      style={{ cursor: "pointer" }}
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
                  <div style={inputWrapper}>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        NTPN (Hanya Simulasi)
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          required
                          value={ntpnBilling}
                          onChange={(e) => {
                            let value = e.target.value.toUpperCase(); // Convert to uppercase
                            if (value.length <= 16) {
                              setNtpnBilling(value); // Set the value only if it's 16 characters or less
                            }

                            setMasaPajakEBilling("");
                            setJenisPajak("");
                            setJenisSetoran("");
                            setJumlahSetor("");
                            setTanggalSetor("");
                          }}
                        />
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
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={tahunPajakOptions}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                          onInputChange={(e, value) => {
                            setTahunPajakEBilling(value);

                            setMasaPajakEBilling("");
                            setJenisPajak("");
                            setJenisSetoran("");
                            setJumlahSetor("");
                            setTanggalSetor("");
                          }}
                          inputValue={tahunPajakEBilling}
                          value={tahunPajakEBilling}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapperCek}>
                    <button
                      className="hover-button"
                      onClick={() =>
                        handleClickOpenConfirmationSearchSuratSetoranPajak()
                      }
                    >
                      <SearchIcon
                        fontSize="small"
                        style={{ marginRight: "4px" }}
                      />
                      Cek Surat Setoran Pajak
                    </button>
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
                          required
                          value={nomorPemindahbukuan}
                          onChange={(e) => {
                            setNomorPemindahbukuan(e.target.value);

                            setMasaPajakEBilling("");
                            setJenisPajak("");
                            setJenisSetoran("");
                            setJumlahSetor("");
                            setTanggalSetor("");
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputWrapperCek}>
                    <button className="hover-button" type="submit">
                      <SearchIcon
                        fontSize="small"
                        style={{ marginRight: "4px" }}
                      />
                      Cek Pemindahbukuan
                    </button>
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
                    <Form.Control value={masaPajakEBilling} disabled />
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
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button"
              onClick={saveEBupot2126TagihanPemotongan}
            >
              <SaveIcon fontSize="small" style={{ marginRight: "4px" }} />
              Simpan
            </button>
            <button
              className="blank-button"
              onClick={deleteInputEBupot2126TagihanPemotongan}
            >
              <ReplayIcon fontSize="small" style={{ marginRight: "4px" }} />
              Batal
            </button>
          </div>
        </DialogContent>
      </Dialog>
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
        open={openSuccessGenerateIdBilling}
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
                <p>Pembuatan kode billing berhasil.</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="hover-button-no-icon"
                  style={{ paddingTop: "10px" }}
                  onClick={handleCloseSuccessGenerateIdBilling}
                >
                  Ok
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default Ebupot2126PerekamanSptMasa;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

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
