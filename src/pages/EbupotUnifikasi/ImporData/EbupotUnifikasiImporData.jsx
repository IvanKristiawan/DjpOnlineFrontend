import React, { useState, useContext, useEffect, useRef } from "react";
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
import {
  ShowTableEbupotUnifikasiDaftarDokumenImporData,
  ShowTableEbupotUnifikasiDaftarDetilValidasi,
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
        <b>Deskripsi Form:</b> Form ini digunakan untuk mengunggah data bukti
        pemotongan dalam format Excel (.xls). Ditujukan bagi Pemotong PPh yang
        menerbitkan bukti pemotongan dalam jumlah banyak yang tidak dapat
        direkam menggunakan fitur key in.
      </p>
      <p>
        Untuk format excel yang diupload Anda dapat mengunduhnya{" "}
        <a href="https://docs.google.com/spreadsheets/d/1PztfrNszTNO2NWLlyEbbpa5oT80zOCt9/export?format=xls">
          disini
        </a>
      </p>
      <p>Terdapat 2 bagian pada form ini:</p>
      <p>
        <b>Unggah Bukti Pemotongan,</b>berikut ini ketentuannya
      </p>
      <p>
        Bagian ini digunakan untuk memilih file dengan format .xls untuk
        diunggah.
      </p>
      <ol>
        <li>
          Aturan penamaan file adalah diawali dengan {"<15 digit NPWP>.xls"}
        </li>
        <li>
          Contoh: untuk WP dengan NPWP 123456789012345, nama file dapat berupa:
          <ol>
            <li>123456789012345.xls</li>
            <li>123456789012345_1.xls</li>
            <li>123456789012345 20171011 1.xls</li>
          </ol>
        </li>
      </ol>
      <p>
        <b>Daftar Dokumen</b>
      </p>
      <p>
        Bagian ini berfungsi untuk melakukan monitoring atas file .xls yang
        telah diimpor.
      </p>
      <ol>
        <li>
          Jika file sukses diimpor, maka kolom Status berisi "Validasi selesai".
        </li>
        <li>
          Jika file gagal diimpor, maka kolom Status berisi "Error validasi",
          dan akan ada tombol Lihat untuk mengetahui detil error. Silakan Anda
          klik
        </li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiImporData() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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
      console.log(sheetsData["42152223"]);
      console.log(sheetsData["NR"]);
      console.log(sheetsData["Dasar Pemotongan"]);
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
    eBupotUnifikasiImporDataPagination,
    setEBupotUnifikasiImporDataPagination,
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
    eBupotUnifikasiDetilValidasiPagination,
    setEBupotUnifikasiDetilValidasiPagination,
  ] = useState([]);
  let [pageEBupotUnifikasiDetilValidasi, setPageEBupotUnifikasiDetilValidasi] =
    useState(0);
  const [
    limitEBupotUnifikasiDetilValidasi,
    setLimitEBupotUnifikasiDetilValidasi,
  ] = useState(10);
  const [
    pagesEBupotUnifikasiDetilValidasi,
    setPagesEBupotUnifikasiDetilValidasi,
  ] = useState(0);
  const [
    rowsEBupotUnifikasiDetilValidasi,
    setRowsEBupotUnifikasiDetilValidasi,
  ] = useState(0);
  const [
    queryEBupotUnifikasiDetilValidasi,
    setQueryEBupotUnifikasiDetilValidasi,
  ] = useState("");

  const handleChangeEBupotUnifikasiDetilValidasi = (e, p) => {
    setPageEBupotUnifikasiDetilValidasi(p - 1);
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
    getEBupotUnifikasiImporData();
  }, [page, limit]);

  const getEBupotUnifikasiImporData = async () => {
    setOpenLoadingImporData(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiImporDatasByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupotUnifikasiImporDataId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiImporDataPagination(
      response.data.eBupotUnifikasiImporDatas
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoadingImporData(false);
    }, 500);
  };

  const getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination =
    async (userEBupotUnifikasiImporDataId) => {
      setOpenLoadingImporData(true);
      const response = await axios.post(
        `${tempUrl}/eBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination?search_query=&page=${page}&limit=${limit}`,
        {
          userEBupotUnifikasiDetilValidasiId: user.id,
          userEBupotUnifikasiImporDataId,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setEBupotUnifikasiDetilValidasiPagination(
        response.data.eBupotUnifikasiDetilValidasis
      );
      setPageEBupotUnifikasiDetilValidasi(response.data.page);
      setPagesEBupotUnifikasiDetilValidasi(response.data.totalPage);
      setRowsEBupotUnifikasiDetilValidasi(response.data.totalRows);

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
      let savedEBupotUnifikasiImporData = await axios.post(
        `${tempUrl}/saveEBupotUnifikasiImporData`,
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

      setTimeout(async () => {
        getEBupotUnifikasiImporData();
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

  const savedEbupotUnifikasiImporData = async (e) => {
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
              <IosShareIcon style={{ marginRight: "10px" }} />
              Impor Data Pajak Penghasilan
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
                          <Form.Control
                            value={"PASAL 4(2), 15, 22, 23, dan 26"}
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
                          File (*.xls)
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
                              accept=".xls"
                              ref={fileInputSertifikatElektronikRef}
                              onChange={handleFileUpload}
                              style={{ display: "none" }} // Hide the file input
                            />
                            <Form.Label>
                              Ukuran file maksimal 2MB berformat .xls
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
                    className="ebupot-unifikasi-refresh-button"
                    onClick={getEBupotUnifikasiImporData}
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
                <ShowTableEbupotUnifikasiDaftarDokumenImporData
                  currentPosts={eBupotUnifikasiImporDataPagination}
                  getDetilValidasi={
                    getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination
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
              onClick={savedEbupotUnifikasiImporData}
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
                  setLimitEBupotUnifikasiDetilValidasi(e.target.value);
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
              <ShowTableEbupotUnifikasiDaftarDetilValidasi
                currentPosts={eBupotUnifikasiDetilValidasiPagination}
              />
            </Box>
            <Box sx={tableContainer}>
              <Pagination
                shape="rounded"
                color="primary"
                count={pagesEBupotUnifikasiDetilValidasi}
                page={pageEBupotUnifikasiDetilValidasi + 1}
                onChange={handleChangeEBupotUnifikasiDetilValidasi}
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

export default EbupotUnifikasiImporData;

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
