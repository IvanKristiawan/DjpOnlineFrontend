import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  ShowTableEbupotUnifikasiTagihanPemotongan,
  ShowTableEbupotUnifikasiBuktiSetor,
  ShowTableEbupotUnifikasiRingkasanPembayaran,
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
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

function EbupotUnifikasiPerekamanSptMasa() {
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

  const [kataKunciSearch, setKataKunciSearch] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Periode");

  const [subjekPajakNpwp, setSubjekPajakNpwp] = useState(user.npwp15);
  const [subjekPajakNitku, setSubjekPajakNitku] = useState(user.nitku);
  const [subjekPajakNikNpwp16, setSubjekPajakNikNpwp16] = useState(
    user.nikNpwp16
  );
  const [subjekPajakNama, setSubjekPajakNama] = useState(user.nama);
  const [subjekPajakAlamat, setSubjekPajakAlamat] = useState(user.alamat);

  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccessGenerateIdBilling, setOpenSuccessGenerateIdBilling] =
    useState(false);
  const [
    eBupotUnifikasiPphDisetorSendiriPagination,
    setEBupotUnifikasiPphDisetorSendiriPagination,
  ] = useState([]);
  const [
    eBupotUnifikasiTagihanPemotonganPagination,
    setEBupotUnifikasiTagihanPemotonganPagination,
  ] = useState([]);
  const [
    eBupotUnifikasiRingkasanPembayaranPagination,
    setEBupotUnifikasiRingkasanPembayaranPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const [eBupotUnifikasiBuktiSetor, setEBupotUnifikasiBuktiSetor] = useState(
    []
  );
  let [pageEBupotUnifikasiBuktiSetor, setPageEBupotUnifikasiBuktiSetor] =
    useState(0);
  const [limitEBupotUnifikasiBuktiSetor, setLimitEBupotUnifikasiBuktiSetor] =
    useState(10);
  const [pagesEBupotUnifikasiBuktiSetor, setPagesEBupotUnifikasiBuktiSetor] =
    useState(0);
  const [rowsEBupotUnifikasiBuktiSetor, setRowsEBupotUnifikasiBuktiSetor] =
    useState(0);
  const [queryEBupotUnifikasiBuktiSetor, setQueryEBupotUnifikasiBuktiSetor] =
    useState("");

  const [
    eBupotUnifikasiRingkasanPembayaran,
    setEBupotUnifikasiRingkasanPembayaran,
  ] = useState([]);
  let [
    pageEBupotUnifikasiRingkasanPembayaran,
    setPageEBupotUnifikasiRingkasanPembayaran,
  ] = useState(0);
  const [
    limitEBupotUnifikasiRingkasanPembayaran,
    setLimitEBupotUnifikasiRingkasanPembayaran,
  ] = useState(10);
  const [
    pagesEBupotUnifikasiRingkasanPembayaran,
    setPagesEBupotUnifikasiRingkasanPembayaran,
  ] = useState(0);
  const [
    rowsEBupotUnifikasiRingkasanPembayaran,
    setRowsEBupotUnifikasiRingkasanPembayaran,
  ] = useState(0);
  const [
    queryEBupotUnifikasiRingkasanPembayaran,
    setQueryEBupotUnifikasiRingkasanPembayaran,
  ] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleChangeEBupotUnifikasiBuktiSetor = (e, p) => {
    setPageEBupotUnifikasiBuktiSetor(p - 1);
  };

  const handleChangeEBupotUnifikasiRingkasanPembayaran = (e, p) => {
    setPageEBupotUnifikasiRingkasanPembayaran(p - 1);
  };

  const handleCloseSuccessGenerateIdBilling = () => {
    setOpenSuccessGenerateIdBilling(false);
  };

  let findDate = new Date(); // Get the current date
  let currentMonth = findDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January)

  let masaTahunPajakOptions = [
    {
      label: "test",
    },
  ];

  const [masaTahunPajakSearch, setMasaTahunPajakSearch] = useState(
    masaTahunPajakOptions[0].label
  );

  let pencairanBerdasarkanOptions = [
    {
      label: "Nomor Bukti Setor",
    },
    {
      label: "Periode",
    },
  ];

  useEffect(() => {
    // getEBupotUnifikasiPphDisetorSendiriData();
  }, []);

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

  const getEBupotUnifikasiPphDisetorSendiriData = async () => {
    let tempCondition = pencairanBerdasarkan.length !== 0;
    if (pencairanBerdasarkan === "Periode") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && masaTahunPajakSearch.length !== 0;
    } else {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && kataKunciSearch.length !== 0;
    }

    if (tempCondition) {
      setOpenLoading(true);

      setTimeout(async () => {
        const response = await axios.post(
          `${tempUrl}/eBupotUnifikasiPphDisetorSendirisByUserSearchPagination`,
          {
            userEBupotUnifikasiPphDisetorSendiriId: user.id,
            pencairanBerdasarkan,
            masaTahunPajakSearch,
            kataKunciSearch,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setEBupotUnifikasiPphDisetorSendiriPagination(
          response.data.eBupotUnifikasiPphDisetorSendiris
        );
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
        setOpenLoading(false);
      }, 500);
    }
  };

  const getEBupotUnifikasiTagihanPemotonganData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiTagihanPemotongansByUserSearchPagination`,
      {
        userEBupotUnifikasiTagihanPemotonganId: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiTagihanPemotonganPagination(
      response.data.eBupotUnifikasiTagihanPemotongans
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    getEBupotUnifikasiRingkasanPembayaranData();

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const getEBupotUnifikasiRingkasanPembayaranData = async () => {
    setOpenLoading(true);

    setTimeout(async () => {
      const response = await axios.post(
        `${tempUrl}/eBupotUnifikasiTagihanPemotongansByUserSearchPagination`,
        {
          userEBupotUnifikasiTagihanPemotonganId: user.id,
          tahunPajak,
          masaPajak,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setEBupotUnifikasiRingkasanPembayaranPagination(
        response.data.eBupotUnifikasiTagihanPemotongans
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setOpenLoading(false);
    }, 500);
  };

  const generateIdBillingEBupotUnifikasiTagihanPemotongan = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/generateIdBillingEBupotUnifikasiTagihanPemotongan/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupotUnifikasiTagihanPemotonganData();
        setOpenLoading(false);
        setOpenSuccessGenerateIdBilling(true);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setOpenLoading(false);
  };

  const deleteEBupotUnifikasiPphDisetorSendiri = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/statusDeleteEBupotUnifikasiPphDisetorSendiri/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupotUnifikasiPphDisetorSendiriData();
        setOpenLoading(false);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setOpenLoading(false);
  };

  const downloadPdf = async (id) => {
    let findEBupotUnifikasiTagihanPemotongan = await axios.post(
      `${tempUrl}/eBupotUnifikasiTagihanPemotongans/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    setOpenLoading(true);

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
    doc.text(
      `: ${
        findEBupotUnifikasiTagihanPemotongan.data.nop.length === 0
          ? "-"
          : findEBupotUnifikasiTagihanPemotongan.data.nop
      }`,
      70,
      tempY
    );

    tempY += 8;
    doc.text("JENIS PAJAK", 30, tempY);
    doc.text(
      `: ${findEBupotUnifikasiTagihanPemotongan.data.objekpajak.jenissetoran.jenispajak.kodeJenisPajak}`,
      70,
      tempY
    );

    tempY += 8;
    doc.text("JENIS SETORAN", 30, tempY);
    doc.text(
      `: ${findEBupotUnifikasiTagihanPemotongan.data.objekpajak.jenissetoran.kodeJenisSetoran}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("MASA PAJAK", 30, tempY);
    doc.text(
      `: ${findEBupotUnifikasiTagihanPemotongan.data.masaPajak}${findEBupotUnifikasiTagihanPemotongan.data.masaPajak}`,
      70,
      tempY
    );

    tempY += 8;
    doc.text("TAHUN PAJAK", 30, tempY);
    doc.text(
      `: ${findEBupotUnifikasiTagihanPemotongan.data.tahunPajak}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("NOMOR KETETAPAN", 30, tempY);
    doc.text(
      `: ${
        findEBupotUnifikasiTagihanPemotongan.data.nomorKetetapan.length === 0
          ? "-"
          : findEBupotUnifikasiTagihanPemotongan.data.nomorKetetapan
      }`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("JUMLAH SETOR", 30, tempY);
    doc.text(
      `: Rp. ${parseInt(
        findEBupotUnifikasiTagihanPemotongan.data.jumlahSetor
      ).toLocaleString("de-DE")}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("TERBILANG", 30, tempY);
    doc.text(
      `: ${angkaTerbilang(
        findEBupotUnifikasiTagihanPemotongan.data.jumlahSetor
      )} Rupiah`,
      70,
      tempY
    );

    tempY += 14;
    doc.text("URAIAN", 30, tempY);
    doc.text(
      `: ${
        findEBupotUnifikasiTagihanPemotongan.data.uraian === 0
          ? "-"
          : findEBupotUnifikasiTagihanPemotongan.data.uraian
      }`,
      70,
      tempY
    );

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
    doc.text(
      `: ${findEBupotUnifikasiTagihanPemotongan.data.idBilling}`,
      70,
      tempY
    );
    tempY += 8;
    doc.text("MASA AKTIF", 30, tempY);
    doc.text(
      `: ${new Date(
        findEBupotUnifikasiTagihanPemotongan.data.masaAktifKodeBilling
      ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Use 24-hour format
        timeZone: "Asia/Jakarta", // Set time zone to Asia/Jakarta
      })}`,
      70,
      tempY
    );
    // tempY += 8;
    // doc.text("NTPN", 30, tempY);
    // doc.text(`: ${ntpnBilling}`, 70, tempY);

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
    setOpenLoading(false);
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                  Daftar SPT Masa PPh Unifikasi
                </div>
                <div>
                  <button
                    className="ebupot-unifikasi-refresh-button"
                    // onClick={handleCloseInfo}
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
                        onClick={getEBupotUnifikasiTagihanPemotonganData}
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
                  Jumlah Tagihan Per Masa Pajak
                </AccordionSummary>
                <AccordionDetails>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                      Daftar Tagihan Pemotongan atas Bukti Pemotongan Pemungutan
                      PPh Unifikasi
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
                        <ShowTableEbupotUnifikasiTagihanPemotongan
                          currentPosts={
                            eBupotUnifikasiTagihanPemotonganPagination
                          }
                          generateIdBillingFunction={
                            generateIdBillingEBupotUnifikasiTagihanPemotongan
                          }
                          downloadPdf={downloadPdf}
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
              <Accordion defaultExpanded={accordionState === "2" && true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={accordionYellow}
                >
                  Rekap Bukti Penyetoran
                </AccordionSummary>
                <AccordionDetails>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header style={inputTitle}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <FormatListBulletedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Daftar Bukti Setor
                        </div>
                        <div>
                          <button
                            className="daftar-dokumen-button"
                            // onClick={handleClickOpenSavedDokumenDasarPemotongan}
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
                          // onChange={(e) => {
                          //   setPER_PAGE(e.target.value);
                          // }}
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
                          currentPosts={eBupotUnifikasiBuktiSetor}
                          // hapusDaftarPemotongan={hapusDaftarPemotongan}
                        />
                      </Box>
                      <Box sx={tableContainer}>
                        <Pagination
                          shape="rounded"
                          color="primary"
                          count={pagesEBupotUnifikasiBuktiSetor}
                          page={pageEBupotUnifikasiBuktiSetor + 1}
                          onChange={handleChangeEBupotUnifikasiBuktiSetor}
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
                      <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                      Daftar Ringkasan Pembayaran
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
                          // onChange={(e) => {
                          //   setPER_PAGE(e.target.value);
                          // }}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                        </Form.Select>
                        <p style={{ paddingTop: "10px" }}>Entry</p>
                      </div>
                      <Box>
                        <ShowTableEbupotUnifikasiRingkasanPembayaran
                          currentPosts={
                            eBupotUnifikasiTagihanPemotonganPagination
                          }
                        />
                      </Box>
                      <Box sx={tableContainer}>
                        <Pagination
                          shape="rounded"
                          color="primary"
                          count={pagesEBupotUnifikasiRingkasanPembayaran}
                          page={pageEBupotUnifikasiRingkasanPembayaran + 1}
                          onChange={
                            handleChangeEBupotUnifikasiRingkasanPembayaran
                          }
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

export default EbupotUnifikasiPerekamanSptMasa;

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
