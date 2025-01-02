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
import {
  ShowTableEbupot21Bulanan,
  ShowTableEbupot21FinalTidakFinal,
  ShowTableEbupot21Tahunan,
} from "../../../components/ShowTable";
import "../../../constants/defaultProgram.css";
import { Card, Form, Spinner } from "react-bootstrap";
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
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CachedIcon from "@mui/icons-material/Cached";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

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
        <b>Deskripsi Form:</b> Form ini menampilkan data Data Bukti Potong PPh
        Pasal 21 yang telah dibuat/direkam.
      </p>
      <p>
        Anda dapat menggunakan form ini untuk melihat data ringkas Bukti Potong,
        Pada kolom paling kanan, tersedia tombol aksi yang berfungsi :
      </p>
      <ul>
        <li>
          Untuk melihat dokumen bukti pemotongan, serta untuk mengunduh atau
          mencetaknya (pastikan Anda telah memasang add on PDF Reader pada
          browser Anda.
        </li>
        <li>
          Untuk melakukan perubahan data Bukti Potong yang sudah direkam. Jika
          Bukti Potong telah dilaporkan dalam SPT dan disampaikan ke DITJEN
          PAJAK, maka proses perubahan mengakibatkan status Bukti Potong menjadi
          PEMBETULAN.
        </li>
        <li>
          Untuk melakukan penghapusan data Bukti Potong yang sudah direkam. Jika
          Bukti Potong telah dilaporkan dalam SPT dan disampaikan ke DITJEN
          PAJAK, maka proses penghapusan menjadikan status Bukti Pemotongan
          tersebut adalah BATAL.
        </li>
      </ul>
      <p>
        Kolom Status menunjukkan status dari Bukti Pemotongan apakah Normal,
        Ganti, Hapus atau Batal.
      </p>
      <p>
        Untuk melakukan filter pencarian data bukti pemotongan, Anda dapat
        menggunakan filter yang disediakan mencakup filter dengan Nomor Bukti
        Pemotongan, Identitas Wajib Pajak yang dipotong maupun periode.
      </p>
    </div>
  );
};

function Ebupot2126DaftarPPh21() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openMenuRekam, setOpenMenuRekam] = useState(false);
  const [kataKunciSearch, setKataKunciSearch] = useState("");
  const [nomorBuktiSetor, setNomorBuktiSetor] = useState("");
  const [identitas, setIdentitas] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Periode");
  const [menuBuktiPotong, setMenuBuktiPotong] = useState("Bulanan");

  const [openLoading, setOpenLoading] = useState(false);
  const [ebupot2126DaftarPPh21Pagination, setEbupot2126DaftarPPh21Pagination] =
    useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const [
    ebupot2126DaftarPPh21FinalPagination,
    setEbupot2126DaftarPPh21FinalPagination,
  ] = useState([]);
  let [pageFinal, setPageFinal] = useState(0);
  const [limitFinal, setLimitFinal] = useState(10);
  const [pagesFinal, setPagesFinal] = useState(0);
  const [rowsFinal, setRowsFinal] = useState(0);
  const [queryFinal, setQueryFinal] = useState("");

  const handleChangeFinal = (e, p) => {
    setPageFinal(p - 1);
  };

  const [
    ebupot2126DaftarPPh21TahunanData,
    setEbupot2126DaftarPPh21TahunanData,
  ] = useState([]);
  let [pageTahunan, setPageTahunan] = useState(0);
  const [limitTahunan, setLimitTahunan] = useState(10);
  const [pagesTahunan, setPagesTahunan] = useState(0);
  const [rowsTahunan, setRowsTahunan] = useState(0);
  const [queryTahunan, setQueryTahunan] = useState("");

  const handleChangeTahunan = (e, p) => {
    setPageTahunan(p - 1);
  };

  const [ebupot2126DaftarPPh21Data, setEbupot2126DaftarPPh21Data] = useState(
    []
  );

  let findDate = new Date(); // Get the current date
  let currentMonth = findDate.getMonth() + 1; // getMonth() is zero-indexed (0 for January)
  let currentYear = findDate.getFullYear(); // Get the current year

  let masaTahunPajakOptions = [];

  // Loop for the current year and the previous 3 years
  for (let year = currentYear; year > currentYear - 3; year--) {
    // For the current year, start from the current month; for previous years, go until December
    let monthLimit = year === currentYear ? currentMonth : 12;

    for (let month = monthLimit; month >= 1; month--) {
      // Format the month as a two-digit string (e.g., '01', '02', ...)
      let formattedMonth = month < 10 ? "0" + month : month;

      // Add the month and year as an object to the array
      masaTahunPajakOptions.push({
        label: `${formattedMonth}-${year}`,
      });
    }
  }

  const [masaTahunPajakSearch, setMasaTahunPajakSearch] = useState(
    masaTahunPajakOptions[0].label
  );

  let pencairanBerdasarkanOptions = [
    {
      label: "Nomor Bukti Setor",
    },
    {
      label: "Identitas",
    },
    {
      label: "Periode",
    },
  ];

  useEffect(() => {
    getEbupot2126DaftarPPh21Data();
  }, [page, limit]);

  useEffect(() => {
    getEbupot2126DaftarPPh21FinalData();
  }, [pageFinal, limitFinal]);

  useEffect(() => {
    getEBupot2126Pph21TahunanData();
  }, [pageTahunan, limitTahunan]);

  const getEbupot2126DaftarPPh21Data = async () => {
    let tempCondition = pencairanBerdasarkan.length !== 0;
    if (pencairanBerdasarkan === "Periode") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && masaTahunPajakSearch.length !== 0;
    } else if (pencairanBerdasarkan === "Nomor Bukti Setor") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && nomorBuktiSetor.length !== 0;
    } else {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && identitas.length !== 0;
    }

    if (tempCondition) {
      setOpenLoading(true);

      setTimeout(async () => {
        const dataBulanan = await axios.post(
          `${tempUrl}/eBupot2126Pph21sBulananByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
          {
            userEBupot2126Pph21Id: user.id,
            pencairanBerdasarkan,
            masaTahunPajakSearch,
            nomorBuktiSetor,
            identitas,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setEbupot2126DaftarPPh21Pagination(dataBulanan.data.eBupot2126Pph21s);
        setPage(dataBulanan.data.page);
        setPages(dataBulanan.data.totalPage);
        setRows(dataBulanan.data.totalRows);
        setOpenLoading(false);
      }, 500);
    }
  };

  const getEbupot2126DaftarPPh21FinalData = async () => {
    let tempCondition = pencairanBerdasarkan.length !== 0;
    if (pencairanBerdasarkan === "Periode") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && masaTahunPajakSearch.length !== 0;
    } else if (pencairanBerdasarkan === "Nomor Bukti Setor") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && nomorBuktiSetor.length !== 0;
    } else {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && identitas.length !== 0;
    }

    if (tempCondition) {
      setOpenLoading(true);

      setTimeout(async () => {
        const dataBulanan = await axios.post(
          `${tempUrl}/eBupot2126Pph21sFinalByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
          {
            userEBupot2126Pph21Id: user.id,
            pencairanBerdasarkan,
            masaTahunPajakSearch,
            nomorBuktiSetor,
            identitas,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setEbupot2126DaftarPPh21FinalPagination(
          dataBulanan.data.eBupot2126Pph21s
        );
        setPageFinal(dataBulanan.data.page);
        setPagesFinal(dataBulanan.data.totalPage);
        setRowsFinal(dataBulanan.data.totalRows);
        setOpenLoading(false);
      }, 500);
    }
  };

  const getEBupot2126Pph21TahunanData = async () => {
    let tempCondition = pencairanBerdasarkan.length !== 0;
    if (pencairanBerdasarkan === "Periode") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && masaTahunPajakSearch.length !== 0;
    } else if (pencairanBerdasarkan === "Nomor Bukti Setor") {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && nomorBuktiSetor.length !== 0;
    } else {
      tempCondition =
        pencairanBerdasarkan.length !== 0 && identitas.length !== 0;
    }

    if (tempCondition) {
      setOpenLoading(true);

      setTimeout(async () => {
        const dataBulanan = await axios.post(
          `${tempUrl}/eBupot2126Pph21TahunansByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
          {
            userEBupot2126Pph21Id: user.id,
            pencairanBerdasarkan,
            masaTahunPajakSearch,
            nomorBuktiSetor,
            identitas,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setEbupot2126DaftarPPh21TahunanData(
          dataBulanan.data.eBupot2126Pph21Tahunans
        );
        setPageTahunan(dataBulanan.data.page);
        setPagesTahunan(dataBulanan.data.totalPage);
        setRowsTahunan(dataBulanan.data.totalRows);
        setOpenLoading(false);
      }, 500);
    }
  };

  const deleteEBupot2126Pph21 = async (id) => {
    // setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/deleteEBupot2126Pph21/${id}`, {
        _id: user.id,
        token: user.token,
      });

      // setTimeout(async () => {
      //   getEbupot2126DaftarPPh21Data();
      //   setOpenLoading(false);
      // }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    // setOpenLoading(false);
  };

  const deleteEBupot2126Pph21Tahunan = async (id) => {
    // setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/deleteEBupot2126Pph21Tahunan/${id}`, {
        _id: user.id,
        token: user.token,
      });

      // setTimeout(async () => {
      //   getEbupot2126DaftarPPh21Data();
      //   setOpenLoading(false);
      // }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    // setOpenLoading(false);
  };

  const exportToExcelBulanan = (dataExcel) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert your data to a worksheet
    // const ws = XLSX.utils.json_to_sheet(eBupotUnifikasiPph42152223Data);
    const ws = XLSX.utils.json_to_sheet(dataExcel);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and trigger a download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "EKSPOR_BUPOT_PPH21_BULANAN.xlsx");
  };

  const exportToExcelFinal = (dataExcel) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert your data to a worksheet
    // const ws = XLSX.utils.json_to_sheet(eBupotUnifikasiPph42152223Data);
    const ws = XLSX.utils.json_to_sheet(dataExcel);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and trigger a download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "EKSPOR_BUPOT_PPH21_FINALTIDAKFINAL.xlsx");
  };

  const exportToExcelTahunan = (dataExcel) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert your data to a worksheet
    // const ws = XLSX.utils.json_to_sheet(eBupotUnifikasiPph42152223Data);
    const ws = XLSX.utils.json_to_sheet(dataExcel);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and trigger a download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "EKSPOR_BUPOT_PPH21_TAHUNAN.xlsx");
  };

  const getEBupot2126Pph21BulananAllData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126Pph21sBulananByUserForExcel`,
      {
        userEBupot2126Pph21Id: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEbupot2126DaftarPPh21Data(response.data);

    setTimeout(async () => {
      setOpenLoading(false);
      exportToExcelBulanan(response.data);
    }, 500);
  };

  const getEBupot2126Pph21FinalAllData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126Pph21sFinalByUserForExcel`,
      {
        userEBupot2126Pph21Id: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEbupot2126DaftarPPh21Data(response.data);

    setTimeout(async () => {
      setOpenLoading(false);
      exportToExcelFinal(response.data);
    }, 500);
  };

  const getEBupot2126Pph21TahunanAllData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126Pph21TahunansByUserForExcel`,
      {
        userEBupot2126Pph21TahunanId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEbupot2126DaftarPPh21Data(response.data);

    setTimeout(async () => {
      setOpenLoading(false);
      exportToExcelTahunan(response.data);
    }, 500);
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

  const titleContainer = {
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
              <div style={titleContainer}>
                <div>
                  <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                  Daftar Bukti Potong PPh Pasal 21
                </div>
                <div>
                  <button
                    className="ebupot-unifikasi-rekam-button"
                    onClick={() => {
                      setOpenMenuRekam(!openMenuRekam);
                    }}
                  >
                    <EditIcon fontSize="small" style={{ marginRight: "5px" }} />
                    Rekam
                    <KeyboardArrowDownIcon fontSize="small" />
                  </button>
                  {openMenuRekam && (
                    <div style={userPopupContainer}>
                      <div style={userPopup}>
                        <div
                          style={userPopupWrapper1}
                          onClick={() => {
                            navigate("/ebupot2126/buktiPotongPasal21/rekam21");
                          }}
                        >
                          Bupot Bulanan/Final Tidak Final
                        </div>
                        <div
                          style={userPopupWrapper2}
                          onClick={() => {
                            navigate(
                              "/ebupot2126/buktiPotongPasal21/rekam21Tahunan"
                            );
                          }}
                        >
                          Bupot Tahunan A1
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ marginTop: "20px" }}>
                <div style={searchContainer}>
                  <div style={searchWrapper1}>
                    <div style={{ marginBottom: "5px" }}>
                      Pencarian Berdasarkan
                    </div>
                    <div>
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={pencairanBerdasarkanOptions}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                        onInputChange={(e, value) => {
                          setPencairanBerdasarkan(value);
                        }}
                        inputValue={pencairanBerdasarkan}
                        value={pencairanBerdasarkan}
                      />
                    </div>
                  </div>
                  <div style={searchWrapper2}>
                    <div style={{ marginBottom: "5px" }}>Kata Kunci</div>
                    <div>
                      {pencairanBerdasarkan === "Periode" && (
                        <Autocomplete
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={masaTahunPajakOptions}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              label="Pilih Masa/Tahun pajak"
                            />
                          )}
                          onChange={(e, value) => {
                            setMasaTahunPajakSearch(value.label);
                          }}
                          value={masaTahunPajakSearch}
                        />
                      )}
                      {pencairanBerdasarkan === "Nomor Bukti Setor" && (
                        <Form.Control
                          required
                          className="mb-3"
                          value={nomorBuktiSetor}
                          onChange={(e) => setNomorBuktiSetor(e.target.value)}
                        />
                      )}
                      {pencairanBerdasarkan === "Identitas" && (
                        <Form.Control
                          required
                          className="mb-3"
                          value={identitas}
                          onChange={(e) => setIdentitas(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div style={searchWrapper3}>
                    <div style={{ marginBottom: "5px", visibility: "hidden" }}>
                      Pencarian
                    </div>
                    <div>
                      <button
                        className="cari-pralapor-button"
                        onClick={() => {
                          if (menuBuktiPotong === "Bulanan") {
                            getEbupot2126DaftarPPh21Data();
                          } else if (menuBuktiPotong === "Final/Tidak Final") {
                            getEbupot2126DaftarPPh21FinalData();
                          } else {
                            getEBupot2126Pph21TahunanData();
                          }
                        }}
                      >
                        <SearchIcon style={{ marginRight: "5px" }} />
                        Cari
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                  marginBottom: "10px",
                  marginTop: "40px",
                }}
              >
                {menuBuktiPotong === "Bulanan" ? (
                  <div
                    className="menu-data-profil-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Bulanan")}
                  >
                    <CalendarMonthIcon fontSize="small" /> Bulanan
                  </div>
                ) : (
                  <div
                    className="menu-data-profil-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Bulanan")}
                  >
                    <CalendarMonthIcon fontSize="small" /> Bulanan
                  </div>
                )}
                {menuBuktiPotong === "Final/Tidak Final" ? (
                  <div
                    className="menu-data-profil-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Final/Tidak Final")}
                  >
                    <NotificationsNoneIcon fontSize="small" /> Final/Tidak Final
                  </div>
                ) : (
                  <div
                    className="menu-data-profil-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Final/Tidak Final")}
                  >
                    <NotificationsNoneIcon fontSize="small" /> Final/Tidak Final
                  </div>
                )}
                {menuBuktiPotong === "Tahunan" ? (
                  <div
                    className="menu-data-profil-text-active"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Tahunan")}
                  >
                    <BookmarkBorderIcon fontSize="small" /> Tahunan
                  </div>
                ) : (
                  <div
                    className="menu-data-profil-text"
                    style={{ marginRight: "10px" }}
                    onClick={() => setMenuBuktiPotong("Tahunan")}
                  >
                    <BookmarkBorderIcon fontSize="small" /> Tahunan
                  </div>
                )}
              </div>
              {menuBuktiPotong === "Bulanan" && (
                <>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className="ekspor-bupot-button"
                      onClick={() => {
                        getEBupot2126Pph21BulananAllData();
                      }}
                    >
                      <InsertDriveFileIcon
                        fontSize="small"
                        style={{ marginRight: "5px" }}
                      />
                      Ekspor Bupot Bulanan
                    </button>
                  </div>
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
                    <ShowTableEbupot21Bulanan
                      currentPosts={ebupot2126DaftarPPh21Pagination}
                      deleteFunction={deleteEBupot2126Pph21}
                      setOpenLoading={setOpenLoading}
                      getEbupot2126DaftarPPh21Data={
                        getEbupot2126DaftarPPh21Data
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
                </>
              )}
              {menuBuktiPotong === "Final/Tidak Final" && (
                <>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className="ekspor-bupot-button"
                      onClick={() => {
                        getEBupot2126Pph21FinalAllData();
                      }}
                    >
                      <InsertDriveFileIcon
                        fontSize="small"
                        style={{ marginRight: "5px" }}
                      />
                      Ekspor Bupot Final/Tidak Final
                    </button>
                  </div>
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
                        setLimitFinal(e.target.value);
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
                    <ShowTableEbupot21FinalTidakFinal
                      currentPosts={ebupot2126DaftarPPh21FinalPagination}
                      deleteFunction={deleteEBupot2126Pph21}
                      setOpenLoading={setOpenLoading}
                      getEbupot2126DaftarPPh21Data={
                        getEbupot2126DaftarPPh21FinalData
                      }
                    />
                  </Box>
                  <Box sx={tableContainer}>
                    <Pagination
                      shape="rounded"
                      color="primary"
                      count={pagesFinal}
                      page={pageFinal + 1}
                      onChange={handleChangeFinal}
                      size={screenSize <= 600 ? "small" : "large"}
                    />
                  </Box>
                </>
              )}
              {menuBuktiPotong === "Tahunan" && (
                <>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className="ekspor-bupot-button"
                      onClick={() => {
                        getEBupot2126Pph21TahunanAllData();
                      }}
                    >
                      <InsertDriveFileIcon
                        fontSize="small"
                        style={{ marginRight: "5px" }}
                      />
                      Ekspor Bupot Tahunan
                    </button>
                  </div>
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
                    <ShowTableEbupot21Tahunan
                      currentPosts={ebupot2126DaftarPPh21TahunanData}
                      deleteFunction={deleteEBupot2126Pph21Tahunan}
                      setOpenLoading={setOpenLoading}
                      getEbupot2126DaftarPPh21Data={
                        getEBupot2126Pph21TahunanData
                      }
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
    </div>
  );
}

export default Ebupot2126DaftarPPh21;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const userPopupContainer = {
  position: "relative",
  color: "#646c9a",
};

const userPopup = {
  cursor: "auto",
  position: "absolute", // Position it below the button
  transform: "translateX(-0%)",
  width: "260px",
  padding: "20px",
  backgroundColor: "white",
  zIndex: 1000, // Ensure it stays in front
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
  borderRadius: "5px",
};

const userPopupWrapper1 = {
  cursor: "pointer",
  fontSize: "16px",
};

const userPopupWrapper2 = {
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "16px",
};

const userPopupTeks = {
  marginLeft: "5px",
};
