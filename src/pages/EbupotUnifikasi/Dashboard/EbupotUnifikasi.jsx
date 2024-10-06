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
import { Card, Tooltip, Form } from "react-bootstrap";
import { Paper, Box, Pagination } from "@mui/material";
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

  const [pbkTerimaPagination, setPbkTerimaPagination] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
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
                    // onClick={handleCloseInfo}
                  >
                    <RefreshIcon style={{ marginRight: "5px" }} />
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
                  currentPosts={pbkTerimaPagination}
                />
              </Box>
              <Box sx={tableContainer}>
                <Pagination
                  count={pages}
                  page={page + 1}
                  onChange={handleChange}
                  color="secondary"
                  variant="outlined"
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
                  currentPosts={pbkTerimaPagination}
                />
              </Box>
              <Box sx={tableContainer}>
                <Pagination
                  count={pages}
                  page={page + 1}
                  onChange={handleChange}
                  color="secondary"
                  variant="outlined"
                  size={screenSize <= 600 ? "small" : "large"}
                />
              </Box>
            </Card.Body>
          </Card>
        </div>
      </Paper>
    </div>
  );
}

export default EbupotUnifikasi;

const menuLaporContainer = {
  display: "flex",
  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
