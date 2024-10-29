import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
} from "../../../components/index";
import {
  ShowTableSptPphUnifikasiTelahDikirim,
  ShowTableBuktiPotongSptPphUnifikasi,
} from "../../../components/ShowTable";
import "../../../constants/defaultProgram.css";
import { Card, Tooltip, Form, Spinner } from "react-bootstrap";
import {
  Paper,
  Box,
  Pagination,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        Deskripsi Form: Form ini menampilkan data SPT Masa PPh Unifikasi yang
        telah disubmit (dikirim) secara elektronik ke Sistem DJP. Form ini juga
        menyajikan data bukti potong yang dilaporkan dengan SPT tersebut.
      </p>
      <p>Aksi yang dapat Anda lakukan antara lain</p>
      <ul>
        <li>
          Mencetak bukti pengiriman secara elektronik (Bukti Penerimaan
          Elektronik).
        </li>
        <li>Melihat detil daftar bukti potong pada SPT Masa PPh Unifikasi.</li>
        <li>Mencetak SPT Masa PPh Unifikasi.</li>
        <li>Unduh seluruh bukti potong pada SPT Masa PPh Unifikasi.</li>
      </ul>
      <p>
        Pada Bukti Penerimaan Elektronik (BPE) terdapat QRCode yang dapat
        digunakan untuk melakukan pengecekan status SPT secara online, gunakan
        perangkat mobile yang telah dilengkapi QRCode Scanner untuk
        memprosesnya.
      </p>
    </div>
  );
};

function EbupotUnifikasi() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

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

  const [
    eBupotUnifikasiCombinedPagination,
    setEBupotUnifikasiCombinedPagination,
  ] = useState([]);
  let [pageEBupotUnifikasiCombined, setPageEBupotUnifikasiCombined] =
    useState(0);
  const [limitEBupotUnifikasiCombined, setLimitEBupotUnifikasiCombined] =
    useState(10);
  const [pagesEBupotUnifikasiCombined, setPagesEBupotUnifikasiCombined] =
    useState(0);
  const [rowsEBupotUnifikasiCombined, setRowsEBupotUnifikasiCombined] =
    useState(0);
  const [queryEBupotUnifikasiCombined, setQueryEBupotUnifikasiCombined] =
    useState("");
  const handleChangeEBupotUnifikasiCombined = (e, p) => {
    setPageEBupotUnifikasiCombined(p - 1);
  };

  useEffect(() => {
    getEBupotUnifikasiPenyiapanSptTerkirimData();
  }, []);

  useEffect(() => {
    getEBupotUnifikasiCombinedData();
  }, [tahunPajak, masaPajak]);

  const getEBupotUnifikasiPenyiapanSptTerkirimData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPenyiapanSptsTerkirimByUserSearchPagination`,
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

    setTahunPajak(response.data.eBupotUnifikasiPenyiapanSpts[0].tahunPajak);
    setMasaPajak(response.data.eBupotUnifikasiPenyiapanSpts[0].masaPajak);

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const getEBupotUnifikasiCombinedData = async () => {
    setOpenLoading(true);
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
      setOpenLoading(false);
    }, 500);
  };

  const lihatBuktiPotongPadaSpt = async (tahunPajak, masaPajak) => {
    setTahunPajak(tahunPajak);
    setMasaPajak(masaPajak);
  };

  const mengajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/ajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupotUnifikasiPenyiapanSptTerkirimData();
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
    width: "100%",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "0px 80px 100px 100px" : "0px 10px 40px 10px",
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
      <MainMenuEbupotUnifikasi activeLink={"/ebupotUnifikasi/dashboard"} />
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
          <Card>
            <Card.Header style={inputTitle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <FormatListBulletedIcon style={{ marginRight: "10px" }} />
                  Daftar SPT Masa PPh Unifikasi yang telah dikirim
                </div>
                <div>
                  <button
                    className="ebupot-unifikasi-refresh-button"
                    onClick={getEBupotUnifikasiPenyiapanSptTerkirimData}
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
                <ShowTableSptPphUnifikasiTelahDikirim
                  currentPosts={ebupotUnifikasiDaftarPenyiapanSptPagination}
                  lihatBuktiPotongPadaSpt={lihatBuktiPotongPadaSpt}
                  mengajukanUnduhBuktiPotong={
                    mengajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt
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
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar bukti potong pada SPT Masa PPh Unifikasi
            </Card.Header>
            <Card.Body>
              <Box>
                <ShowTableBuktiPotongSptPphUnifikasi
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

export default EbupotUnifikasi;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
