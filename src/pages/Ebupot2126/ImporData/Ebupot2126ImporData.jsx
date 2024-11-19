import React, { useState, useContext, useEffect, useRef } from "react";
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
import {
  ShowTableEbupot2126DaftarDokumenImporData,
  ShowTableEbupot2126DaftarDetilValidasi,
} from "../../../components/ShowTable";
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
import * as XLSX from "xlsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CachedIcon from "@mui/icons-material/Cached";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
        <b>Deskripsi Form:</b> Form ini digunakan untuk mengunggah data bukti
        pemotongan dalam format Excel (.xlsx). Ditujukan bagi Pemotong PPh21
        yang menerbitkan bukti pemotongan dalam jumlah banyak yang tidak dapat
        direkam menggunakan fitur key in.
      </p>
      <p>Untuk format excel yang diupload Anda dapat mengunduhnya</p>
      <ol>
        <li>
          Bulanan dan Final/Tidak Final{" "}
          <a href="https://docs.google.com/spreadsheets/d/1Run5aTTJ8wmTRI9PjUux7DEDE01tIAu_/export?format=xlsx">
            disini
          </a>
        </li>
        <li>
          Tahunan{" "}
          <a href="https://docs.google.com/spreadsheets/d/1UIi0VI9y0JBOuo1IvqjN3YujYGN-Ri7F/export?format=xlsx">
            disini
          </a>
        </li>
      </ol>
      <p>Terdapat 2 bagian pada form ini:</p>
      <p>
        <b>Unggah Bukti Pemotongan,</b> berikut ini ketentuannya
      </p>
      <p>
        Bagian ini digunakan untuk memilih file dengan format .xlsx untuk
        diunggah.
      </p>
      <ul>
        <li>
          Aturan penamaan file adalah diawali dengan {"<15 digit NPWP>.xlsx"}
        </li>
        <li>
          Contoh: untuk WP dengan NPWP 123456789012345, nama file dapat berupa:
        </li>
        <ul>
          <li>123456789012345.xlsx</li>
          <li>123456789012345_1.xlsx</li>
          <li>123456789012345 20171011 1.xlsx</li>
        </ul>
      </ul>
      <p>
        <b>Daftar Dokumen</b>
      </p>
      <p>
        Bagian ini berfungsi untuk melakukan monitoring atas file .xlsx yang
        telah diimpor.
      </p>
      <ul>
        <li>
          Jika file sukses diimpor, maka kolom Status berisi "Validasi selesai".
        </li>
        <li>
          Jika file gagal diimpor, maka kolom Status berisi "Error validasi",
          dan akan ada tombol Lihat untuk mengetahui detil error. Silakan Anda
          klik
        </li>
      </ul>
    </div>
  );
};

function Ebupot2126ImporData() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  let jenisBuktiPotongOptions = [
    {
      label: "Bulanan dan Final/Tidak Final",
    },
    {
      label: "Tahunan",
    },
  ];
  const [jenisBuktiPotong, setJenisBuktiPotong] = useState("");

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

  const [menuImporData, setMenuImporData] = useState(
    "Bulanan & Final/Tidak Final"
  );

  const [fileSertifikatElektronik, setFileSertifikatElektronik] =
    useState(null);
  const fileInputSertifikatElektronikRef = useRef(null);

  const handleButtonClickSertifikatElektronik = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputSertifikatElektronikRef.current.click();
  };

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [jsonData, setJsonData] = useState({});
  const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

  const resetFileInput = () => {
    if (fileInputSertifikatElektronikRef.current) {
      fileInputSertifikatElektronikRef.current.value = null;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if there's a file
    if (!file) return;

    // Check file size
    if (file && file.size > maxFileSize) {
      alert("Ukuran file melebihi 2MB. Harap upload file yang lebih kecil.");
      resetFileInput();
      return;
    }

    if (!file.name.includes(user.npwp15)) {
      setOpenFormatNamaFileSalah(true);
      resetFileInput();
      return;
    }

    // Store the file name in state
    setFileName(file.name);

    // Check file size and convert it to KB or MB
    let fileSizeDisplay;
    if (file) {
      const fileSizeInKB = parseInt(file.size / 1024);
      fileSizeDisplay =
        file.size < 1024 * 1024
          ? `${fileSizeInKB} KB`
          : `${parseInt(file.size / (1024 * 1024))} MB`;
    }
    setFileSize(fileSizeDisplay);

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetsData = {};

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonSheetData = XLSX.utils.sheet_to_json(worksheet);
        sheetsData[sheetName] = jsonSheetData;
      });

      setJsonData(sheetsData);

      resetFileInput();

      // Process Data
      console.log("File name:", file.name);
      console.log(sheetsData["Rekap"]);
      console.log(sheetsData["21"]);
      console.log(sheetsData["26"]);
      console.log(sheetsData["A1"]);
      console.log(sheetsData);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
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
    eBupot2126ImporDataBulananPagination,
    setEBupot2126ImporDataBulananPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const [
    eBupot2126ImporDataTahunanPagination,
    setEBupot2126ImporDataTahunanPagination,
  ] = useState([]);
  let [pageTahunan, setPageTahunan] = useState(0);
  const [limitTahunan, setLimitTahunan] = useState(10);
  const [pagesTahunan, setPagesTahunan] = useState(0);
  const [rowsTahunan, setRowsTahunan] = useState(0);
  const [queryTahunan, setQueryTahunan] = useState("");

  const handleChangeTahunan = (e, p) => {
    setPageTahunan(p - 1);
  };

  const [
    eBupot2126DetilValidasiPagination,
    setEBupot2126DetilValidasiPagination,
  ] = useState([]);
  let [pageEBupot2126DetilValidasi, setPageEBupot2126DetilValidasi] =
    useState(0);
  const [limitEBupot2126DetilValidasi, setLimitEBupot2126DetilValidasi] =
    useState(10);
  const [pagesEBupot2126DetilValidasi, setPagesEBupot2126DetilValidasi] =
    useState(0);
  const [rowsEBupot2126DetilValidasi, setRowsEBupot2126DetilValidasi] =
    useState(0);
  const [queryEBupot2126DetilValidasi, setQueryEBupot2126DetilValidasi] =
    useState("");

  const handleChangeEBupot2126DetilValidasi = (e, p) => {
    setPageEBupot2126DetilValidasi(p - 1);
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
  const [openFormatNamaFileSalah, setOpenFormatNamaFileSalah] = useState(false);

  const [openDetilValidasi, setOpenDetilValidasi] = useState(false);

  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Semua");

  // Handle Pencairan Berdasarkan input change
  const handlePencairanBerdasarkanChange = (e) => {
    setPencairanBerdasarkan(e.target.value);
  };

  const handleCloseDetilValidasi = () => {
    setOpenDetilValidasi(false);
  };

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

  useEffect(() => {
    getEBupot2126ImporDataBulanan();
  }, [page, limit]);

  useEffect(() => {
    getEBupot2126ImporDataTahunan();
  }, [pageTahunan, limitTahunan]);

  const getEBupot2126ImporDataBulanan = async () => {
    setOpenLoadingImporData(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126ImporDatasBulananByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupot2126ImporDataId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupot2126ImporDataBulananPagination(response.data.eBupot2126ImporDatas);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoadingImporData(false);
    }, 500);
  };

  const getEBupot2126ImporDataTahunan = async () => {
    setOpenLoadingImporData(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126ImporDatasTahunanByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupot2126ImporDataId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupot2126ImporDataTahunanPagination(response.data.eBupot2126ImporDatas);
    setPageTahunan(response.data.page);
    setPagesTahunan(response.data.totalPage);
    setRowsTahunan(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoadingImporData(false);
    }, 500);
  };

  const getEBupot2126DetilValidasisByUserByImporDataSearchPagination = async (
    userEBupot2126ImporDataId
  ) => {
    setOpenLoadingImporData(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126DetilValidasisByUserByImporDataSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupot2126DetilValidasiId: user.id,
        userEBupot2126ImporDataId,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupot2126DetilValidasiPagination(
      response.data.eBupot2126DetilValidasis
    );
    setPageEBupot2126DetilValidasi(response.data.page);
    setPagesEBupot2126DetilValidasi(response.data.totalPage);
    setRowsEBupot2126DetilValidasi(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoadingImporData(false);
    }, 500);
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

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchIdentitasWp(false);
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const handleCloseFormatNamaFileSalah = () => {
    setOpenFormatNamaFileSalah(false);
  };

  const imporData = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCondition =
      form.checkValidity() &&
      tahunPajak.length !== 0 &&
      masaPajak.length !== 0 &&
      fileName.length !== 0;

    if (tempCondition) {
      handleCloseConfirmationSaved(e);

      setOpenLoadingImporData(true);

      if (jenisBuktiPotong === "Bulanan dan Final/Tidak Final") {
        let savedEBupot2126BulananImporData = await axios.post(
          `${tempUrl}/saveEBupot2126BulananImporData`,
          {
            userId: user.id,

            // 01.) Accordion 1
            tahunPajak,
            masaPajak,
            fileName,

            jsonData,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );
      } else {
        let savedEBupot2126TahunanImporData = await axios.post(
          `${tempUrl}/saveEBupot2126TahunanImporData`,
          {
            userId: user.id,

            // 01.) Accordion 1
            tahunPajak,
            masaPajak,
            fileName,

            jsonData,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );
      }

      setTimeout(async () => {
        getEBupot2126ImporDataBulanan();
        getEBupot2126ImporDataTahunan();
        setOpenLoadingImporData(false);
        setValidated(false);
        setFileName("");
        setFileSize("");
        setJsonData({});
        setOpenSaved(true);
      }, 1000);
    } else {
      setValidated(true);
    }
  };

  const savedEbupot2126ImporData = async (e) => {
    setOpenSaved(false);

    // 01.) Accordion 1
    setJenisBuktiPotong("");
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

  const detilValidasiWrapper = {
    display: screenSize >= 900 && "flex",
    justifyContent: "space-between",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/buktiPotongPasal21"} />
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
              <IosShareIcon style={{ marginRight: "10px" }} />
              Impor Data Bukti Pemotongan/Pemungutan
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={imporData}>
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
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={jenisBuktiPotongOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={
                                  validated && jenisBuktiPotong.length === 0
                                }
                                helperText={
                                  validated &&
                                  jenisBuktiPotong.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setJenisBuktiPotong(value);
                            }}
                            inputValue={jenisBuktiPotong}
                            value={jenisBuktiPotong}
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
                          File (*.xlsx)
                        </Form.Label>
                        <Col sm="8">
                          {fileName.length === 0 ? (
                            <button
                              className="upload-sertifikat-elektronik-button"
                              variant="primary"
                              onClick={handleButtonClickSertifikatElektronik}
                            >
                              Pilih File...
                            </button>
                          ) : (
                            <button
                              className="upload-sertifikat-elektronik-button"
                              variant="primary"
                              onClick={handleButtonClickSertifikatElektronik}
                            >
                              Ubah File...
                            </button>
                          )}
                          <div>
                            <Form.Control
                              type="file"
                              accept=".xlsx"
                              ref={fileInputSertifikatElektronikRef}
                              onChange={handleFileUpload}
                              style={{ display: "none" }} // Hide the file input
                            />
                            <Form.Label>
                              Ukuran file maksimal 2MB berformat .xlsx
                            </Form.Label>
                            <Form.Label style={{ color: "#fd397a" }}>
                              Pastikan tidak melakukan impor excel dengan data
                              yang sama apabila terdapat excel yang belum
                              selesai diproses sebelumnya
                            </Form.Label>
                          </div>
                        </Col>
                      </Form.Group>
                    </div>
                    <div
                      style={{
                        color: "black",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <p>{fileName}</p>
                      <p>{fileSize}</p>
                      {fileName.length !== 0 && (
                        <button
                          className="delete-button"
                          onClick={() => {
                            setFileName("");
                            setFileSize("");
                            setJsonData({});
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      )}
                    </div>
                    {/* {Object.keys(jsonData).length > 0 && (
                      <div>
                        {Object.keys(jsonData).map((sheetName) => (
                          <div key={sheetName}>
                            <h3>Sheet: {sheetName}</h3>
                            <pre>
                              {JSON.stringify(jsonData[sheetName], null, 2)}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )} */}
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
                    className="ebupot-2126-refresh-button"
                    onClick={getEBupot2126ImporDataBulanan}
                  >
                    <RefreshIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
                    Perbarui
                  </button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                  marginBottom: "20px",
                }}
              >
                {menuImporData === "Bulanan & Final/Tidak Final" ? (
                  <div
                    className="menu-data-profil-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() =>
                      setMenuImporData("Bulanan & Final/Tidak Final")
                    }
                  >
                    <CalendarMonthIcon fontSize="small" /> Bulanan & Final/Tidak
                    Final
                  </div>
                ) : (
                  <div
                    className="menu-data-profil-text"
                    style={{ marginRight: "10px" }}
                    onClick={() =>
                      setMenuImporData("Bulanan & Final/Tidak Final")
                    }
                  >
                    <CalendarMonthIcon fontSize="small" /> Bulanan & Final/Tidak
                    Final
                  </div>
                )}
                {menuImporData === "Tahunan" ? (
                  <div
                    className="menu-data-profil-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuImporData("Tahunan")}
                  >
                    <BookmarkBorderIcon fontSize="small" /> Tahunan
                  </div>
                ) : (
                  <div
                    className="menu-data-profil-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuImporData("Tahunan")}
                  >
                    <BookmarkBorderIcon fontSize="small" /> Tahunan
                  </div>
                )}
              </div>
              {menuImporData === "Bulanan & Final/Tidak Final" && (
                <>
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
                    <ShowTableEbupot2126DaftarDokumenImporData
                      currentPosts={eBupot2126ImporDataBulananPagination}
                      getDetilValidasi={
                        getEBupot2126DetilValidasisByUserByImporDataSearchPagination
                      }
                      setOpenDetilValidasi={setOpenDetilValidasi}
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
                </>
              )}
              {menuImporData === "Tahunan" && (
                <>
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
                        setLimitTahunan(e.target.value);
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
                    <ShowTableEbupot2126DaftarDokumenImporData
                      currentPosts={eBupot2126ImporDataTahunanPagination}
                      getDetilValidasi={
                        getEBupot2126DetilValidasisByUserByImporDataSearchPagination
                      }
                      setOpenDetilValidasi={setOpenDetilValidasi}
                    />
                  </Box>
                  <Box sx={tableContainer}>
                    <Pagination
                      shape="rounded"
                      color="primary"
                      count={pagesTahunan}
                      page={pageTahunan + 1}
                      onChange={handleChangeTahunan}
                      size={screenSize <= 600 ? "small" : "large"}
                    />
                  </Box>
                </>
              )}
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
              <b>Memuat</b>
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
        open={openFormatNamaFileSalah}
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InfoOutlinedIcon color="info" sx={{ fontSize: 80 }} />
                Format Nama file tidak sesuai
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ textAlign: "center" }}
            >
              Mohon sesuaikan dengan format yang ada pada petunjuk panduan
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
              onClick={handleCloseFormatNamaFileSalah}
            >
              Ok
            </button>
          </DialogActions>
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
              onClick={savedEbupot2126ImporData}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        onClose={handleCloseDetilValidasi}
        aria-labelledby="customized-dialog-title"
        open={openDetilValidasi}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Detil Validasi
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDetilValidasi}
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
          <div style={detilValidasiWrapper}>
            <div style={{ flex: 1 }}>
              <div>
                <p>Pencarian Berdasarkan</p>
                <Row>
                  <Col sm="4" className="mt-2">
                    <Form.Check
                      type="radio"
                      label="Semua"
                      name="Semua"
                      value="Semua"
                      checked={pencairanBerdasarkan === "Semua"}
                      onChange={handlePencairanBerdasarkanChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                  <Col sm="4" className="mt-2">
                    <Form.Check
                      type="radio"
                      label="Baris Error"
                      name="Baris Error"
                      value="Baris Error"
                      checked={pencairanBerdasarkan === "Baris Error"}
                      onChange={handlePencairanBerdasarkanChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                  <Col sm="4">
                    <Button className="cari-pralapor-button">
                      <SearchIcon style={{ marginRight: "5px" }} />
                      Cari
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                  height: "100%",
                }}
              >
                <button className="cari-pralapor-button">
                  <InsertDriveFileIcon style={{ marginRight: "5px" }} />
                  Unduh Hasil Validasi
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
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
                  setLimitEBupot2126DetilValidasi(e.target.value);
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
              <ShowTableEbupot2126DaftarDetilValidasi
                currentPosts={eBupot2126DetilValidasiPagination}
              />
            </Box>
            <Box sx={tableContainer}>
              <Pagination
                shape="rounded"
                color="primary"
                count={pagesEBupot2126DetilValidasi}
                page={pageEBupot2126DetilValidasi + 1}
                onChange={handleChangeEBupot2126DetilValidasi}
                size={screenSize <= 600 ? "small" : "large"}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default Ebupot2126ImporData;

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

const aksiButtonStyle = {
  marginLeft: "5px",
};
