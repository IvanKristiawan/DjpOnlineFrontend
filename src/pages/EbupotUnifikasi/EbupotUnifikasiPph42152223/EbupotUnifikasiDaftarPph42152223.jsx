import React, { useState, useContext, useEffect } from "react";
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
import { ShowTableEbupotUnifikasiPph42152223 } from "../../../components/ShowTable";
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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini menampilkan data Data Bukti Potong PPh
        Unifikasi yang telah dibuat/direkam.
      </p>
      <p>
        Anda dapat menggunakan form ini untuk melihat data ringkas Bukti Potong
        yang mencakup Masa Pajak, Objek Pajak, Nomor Bukti Pemotongan, Identitas
        Wajib Pajak, Nama Wajib Pajak serta nominal DPP dan Pajak Peghasilan
        yang dipotong.
      </p>
      <p>Pada kolom paling kanan, tersedia tombol aksi yang berfungsi :</p>
      <ul>
        <li>
          Untuk melihat dokumen bukti pemotongan, serta untuk mengunduh atau
          mencetaknya (pastikan Anda telah memasang add on PDF Reader pada
          browser Anda.)
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
        <li>
          Untuk mengirimkan dokumen bukti pemotongan berupa file PDF kepada
          Wajib Pajak yang Penghasilannya telah dipotong.
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
      <p>
        Sebelum melakukan ekspor data ke excel silahkan melakukan pencarian
        daftar bukti potong terlebih dahulu.
      </p>
    </div>
  );
};

function EbupotUnifikasiDaftarPph42152223() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nomorBuktiSetor, setNomorBuktiSetor] = useState("");
  const [identitas, setIdentitas] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Periode");

  const [openLoading, setOpenLoading] = useState(false);
  const [eBupotUnifikasiPph42152223Data, setEBupotUnifikasiPph42152223Data] =
    useState([]);
  const [
    eBupotUnifikasiPph42152223Pagination,
    setEBupotUnifikasiPph42152223Pagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

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
    getEBupotUnifikasiPph42152223Data();
  }, [page, limit]);

  const getEBupotUnifikasiPph42152223Data = async () => {
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
      const response = await axios.post(
        `${tempUrl}/eBupotUnifikasiPph42152223sByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
        {
          userEBupotUnifikasiPph42152223Id: user.id,
          pencairanBerdasarkan,
          masaTahunPajakSearch,
          nomorBuktiSetor,
          identitas,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setEBupotUnifikasiPph42152223Pagination(
        response.data.eBupotUnifikasiPph42152223s
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);

      setTimeout(async () => {
        setOpenLoading(false);
      }, 500);
    }
  };

  const deleteEBupotUnifikasiPph42152223 = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/statusDeleteEBupotUnifikasiPph42152223/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupotUnifikasiPph42152223Data();
        setOpenLoading(false);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
      setOpenLoading(false);
    }
  };

  // Function to export the data to Excel
  const exportToExcel = (dataExcel) => {
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
    saveAs(data, "EKSPOR_BUKTI_POTONG.xlsx");
  };

  const getEBupotUnifikasiPph42152223AllData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPph42152223sByUserForExcel`,
      {
        userEBupotUnifikasiPph42152223Id: user.id,
        pencairanBerdasarkan,
        masaTahunPajakSearch,
        nomorBuktiSetor,
        identitas,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiPph42152223Data(response.data);

    setTimeout(async () => {
      setOpenLoading(false);
      exportToExcel(response.data);
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                  Daftar Bukti Potong Pasal 4 ayat (2), 15, 22, 23
                </div>
                <div>
                  <button
                    className="ebupot-unifikasi-refresh-button"
                    // onClick={handleCloseInfo}
                    onClick={() => {
                      getEBupotUnifikasiPph42152223AllData();
                      // exportToExcel();
                    }}
                  >
                    <InsertDriveFileIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
                    Ekspor Excel
                  </button>
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
                        onClick={getEBupotUnifikasiPph42152223Data}
                      >
                        <SearchIcon style={{ marginRight: "5px" }} />
                        Cari
                      </button>
                    </div>
                  </div>
                </div>
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
                <ShowTableEbupotUnifikasiPph42152223
                  currentPosts={eBupotUnifikasiPph42152223Pagination}
                  deleteFunction={deleteEBupotUnifikasiPph42152223}
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

export default EbupotUnifikasiDaftarPph42152223;

const menuLaporContainer = {
  display: "flex",
  marginTop: "40px",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
