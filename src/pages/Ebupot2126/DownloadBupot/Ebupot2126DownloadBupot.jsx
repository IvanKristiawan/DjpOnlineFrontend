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
import { ShowTableEbupot26DownloadBupot } from "../../../components/ShowTable";
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
import CachedIcon from "@mui/icons-material/Cached";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditIcon from "@mui/icons-material/Edit";
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
        <b>Deskripsi Form:</b> Form ini menampilkan data bukti pemotongan yang
        telah dilakukan posting untuk tiap SPT Masa.
      </p>
      <p>Aksi yang dapat Anda lakukan antara lain</p>
      <ul>
        <li>Mengajukan unduh bukti potong.</li>
        <li>Unduh seluruh bukti potong pada SPT Masa.</li>
        <li>Mengajukan ulang unduh bukti potong.</li>
      </ul>
    </div>
  );
};

function Ebupot2126DownloadBupot() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [kataKunciSearch, setKataKunciSearch] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Periode");

  const [openLoading, setOpenLoading] = useState(false);
  const [
    ebupot2126DownloadBupotPagination,
    setEbupot2126DownloadBupotPagination,
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
      label: "Periode",
    },
  ];

  // useEffect(() => {
  //   getEbupot2126DownloadBupotData();
  // }, [page, limit]);

  const getEbupot2126DownloadBupotData = async () => {
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
          `${tempUrl}/ebupot2126DownloadBupotsByUserSearchPagination?search_query=&page=${page}&limit=${limit}`,
          {
            userEbupot2126DownloadBupotId: user.id,
            pencairanBerdasarkan,
            masaTahunPajakSearch,
            kataKunciSearch,
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        setEbupot2126DownloadBupotPagination(
          response.data.ebupot2126DownloadBupots
        );
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
        setOpenLoading(false);
      }, 500);
    }
  };

  const deleteEbupot2126DownloadBupot = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/statusDeleteEbupot2126DownloadBupot/${id}`, {
        _id: user.id,
        token: user.token,
      });

      setTimeout(async () => {
        getEbupot2126DownloadBupotData();
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
                  Download Bupot pada SPT Masa PPh 21/26
                </div>
                <div>
                  <button className="ebupot-unifikasi-rekam-button">
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
                <ShowTableEbupot26DownloadBupot
                  currentPosts={ebupot2126DownloadBupotPagination}
                  deleteFunction={deleteEbupot2126DownloadBupot}
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

export default Ebupot2126DownloadBupot;

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
