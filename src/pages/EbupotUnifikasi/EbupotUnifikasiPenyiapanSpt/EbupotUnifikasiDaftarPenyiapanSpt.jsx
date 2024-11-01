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
import { ShowTableEbupotUnifikasiPenyiapanSpt } from "../../../components/ShowTable";
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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk melengkapi dan
        mengirimkan Surat Pemberitahuan(SPT)
      </p>
      <p>
        Jika Anda sudah melakukan perekaman data penyetoran dengan sub menu
        perekaman bukti penyetoran, lengkapilah data SPT tersebut dengan klik
        tombol LENGKAPI pada kolom paling kanan
      </p>
      <p>
        Sistem akan melakukan pembentukan data SPT dari semua data yang terkait,
        mungkin akan membutuhkan waktu sejenak. jika pada kolom paling kanan
        muncul tombol REFRESH, silakan klik untuk melakukan penyegaran data
        sehigga tombol LENGKAPI dan KIRIM muncul kembali
      </p>
      <p>
        Klik tombol KIRIM jika semua data telah siap, dan pastikan Anda telah
        menyiapkan file Sertifikat Elektronik
      </p>
    </div>
  );
};

function EbupotUnifikasiDaftarPenyiapanSpt() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openLoading, setOpenLoading] = useState(false);
  const [
    ebupotUnifikasiDaftarPenyiapanSptPagination,
    setEbupotUnifikasiDaftarPenyiapanSptPagination,
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

  useEffect(() => {
    getEBupotUnifikasiPenyiapanSptData();
  }, [page, limit]);

  const getEBupotUnifikasiPenyiapanSptData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPenyiapanSptsByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupotUnifikasiPenyiapanSptId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEbupotUnifikasiDaftarPenyiapanSptPagination(
      response.data.eBupotUnifikasiPenyiapanSpts
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const deleteEBupotUnifikasiPenyiapanSpt = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/statusDeleteEBupotUnifikasiPenyiapanSpt/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupotUnifikasiPenyiapanSptData();
        setOpenLoading(false);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
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
                    onClick={() => {
                      getEBupotUnifikasiPenyiapanSptData();
                    }}
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
                <ShowTableEbupotUnifikasiPenyiapanSpt
                  currentPosts={ebupotUnifikasiDaftarPenyiapanSptPagination}
                  deleteFunction={deleteEBupotUnifikasiPenyiapanSpt}
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

export default EbupotUnifikasiDaftarPenyiapanSpt;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
