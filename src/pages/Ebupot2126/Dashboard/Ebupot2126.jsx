import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import {
  ShowTableSptPph2126TelahDikirim,
  ShowTableBuktiPotongSptPph2126,
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
        Panduan User Manual silakan download{" "}
        <a href="https://drive.google.com/file/d/11CLyj8l15-pJzPBMK9G_2-3FE4-Y6M9n/view?usp=sharing">
          disini
        </a>
      </p>
      <p>
        Deskripsi Form: Form ini menampilkan data SPT Masa PPh Pasal 21 yang
        telah disubmit (dikirim) secara elektronik ke Sistem DJP. Form ini juga
        menyajikan data bukti potong yang dilaporkan dengan SPT tersebut.
      </p>
      <p>Aksi yang dapat Anda lakukan antara lain</p>
      <ul>
        <li>
          Mencetak bukti pengiriman secara elektronik (Bukti Penerimaan
          Elektronik).
        </li>
        <li>Melihat detil daftar bukti potong pada SPT Masa PPh Pasal 21.</li>
        <li>Mencetak SPT Masa PPh Pasal 21.</li>
        <li>Unduh seluruh bukti potong pada SPT Masa PPh Pasal 21.</li>
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

function Ebupot2126() {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

  const [openLoading, setOpenLoading] = useState(false);
  const [
    ebupot2126DaftarPenyiapanSptPagination,
    setEbupot2126DaftarPenyiapanSptPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const [eBupot2126CombinedPagination, setEBupot2126CombinedPagination] =
    useState([]);
  let [pageEBupot2126Combined, setPageEBupot2126Combined] = useState(0);
  const [limitEBupot2126Combined, setLimitEBupot2126Combined] = useState(10);
  const [pagesEBupot2126Combined, setPagesEBupot2126Combined] = useState(0);
  const [rowsEBupot2126Combined, setRowsEBupot2126Combined] = useState(0);
  const [queryEBupot2126Combined, setQueryEBupot2126Combined] = useState("");
  const handleChangeEBupot2126Combined = (e, p) => {
    setPageEBupot2126Combined(p - 1);
  };

  // useEffect(() => {
  //   getEBupot2126PenyiapanSptTerkirimData();
  // }, []);

  // useEffect(() => {
  //   getEBupot2126CombinedData();
  // }, [page, limit, tahunPajak, masaPajak]);

  const getEBupot2126PenyiapanSptTerkirimData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126PenyiapanSptsTerkirimByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
      {
        userEBupot2126PenyiapanSptId: user.id,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEbupot2126DaftarPenyiapanSptPagination(
      response.data.eBupot2126PenyiapanSpts
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTahunPajak(response.data.eBupot2126PenyiapanSpts[0].tahunPajak);
    setMasaPajak(response.data.eBupot2126PenyiapanSpts[0].masaPajak);

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const getEBupot2126CombinedData = async () => {
    setOpenLoading(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126CombinedPagination?search_query=&page=${pageEBupot2126Combined}&limit=${limitEBupot2126Combined}`,
      {
        userIdInput: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupot2126CombinedPagination(response.data.data);
    setPageEBupot2126Combined(response.data.page);
    setPagesEBupot2126Combined(response.data.totalPage);
    setRowsEBupot2126Combined(response.data.totalRows);

    setTimeout(async () => {
      setOpenLoading(false);
    }, 500);
  };

  const lihatBuktiPotongPadaSpt = async (tahunPajak, masaPajak) => {
    setTahunPajak(tahunPajak);
    setMasaPajak(masaPajak);
  };

  const mengajukanUnduhBuktiPotongEBupot2126PenyiapanSpt = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(
        `${tempUrl}/ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt/${id}`,
        {
          _id: user.id,
          token: user.token,
        }
      );

      setTimeout(async () => {
        getEBupot2126PenyiapanSptTerkirimData();
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
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/dashboard"} />
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
                  Daftar SPT Masa SPT 21
                </div>
                <div>
                  <button
                    className="ebupot-2126-refresh-button"
                    onClick={getEBupot2126PenyiapanSptTerkirimData}
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
                <ShowTableSptPph2126TelahDikirim
                  currentPosts={ebupot2126DaftarPenyiapanSptPagination}
                  lihatBuktiPotongPadaSpt={lihatBuktiPotongPadaSpt}
                  mengajukanUnduhBuktiPotong={
                    mengajukanUnduhBuktiPotongEBupot2126PenyiapanSpt
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

export default Ebupot2126;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
