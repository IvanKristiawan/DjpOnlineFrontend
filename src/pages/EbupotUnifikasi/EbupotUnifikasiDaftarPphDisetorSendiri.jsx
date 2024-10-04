import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, PetunjukPengisian } from "../../components/index";
import {
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
} from "../../components/index";
import { ShowTableEbupotUnifikasiPphDisetorSendiri } from "../../components/ShowTable";
import "../../constants/defaultProgram.css";
import { Card, Tooltip, Form } from "react-bootstrap";
import { Paper, Box, Pagination, Autocomplete, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IosShareIcon from "@mui/icons-material/IosShare";
import LockResetIcon from "@mui/icons-material/LockReset";
import SearchIcon from "@mui/icons-material/Search";

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

function EbupotUnifikasiDaftarPphDisetorSendiri() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [masaTahunPajakSearch, setMasaTahunPajakSearch] = useState("");
  const [kataKunciSearch, setKataKunciSearch] = useState("");
  const [pencairanBerdasarkan, setPencairanBerdasarkan] = useState("Periode");
  const [openMenuPphYangDisetorSendiri, setOpenMenuPphYangDisetorSendiri] =
    useState(false);
  const [openMenuPph4, setOpenMenuPph4] = useState(false);
  const [openMenuPphNonResiden, setOpenMenuPphNonResiden] = useState(false);

  const [userPerCabangs, setUserPerCabangs] = useState([]);
  const [pbkTerimaPagination, setPbkTerimaPagination] = useState([]);
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

  let pencairanBerdasarkanOptions = [
    {
      label: "Nomor Bukti Setor",
    },
    {
      label: "Periode",
    },
  ];

  useEffect(() => {
    getUserPerCabangData();
  }, []);

  const getUserPerCabangData = async () => {
    const response = await axios.post(`${tempUrl}/usersPerCabang`, {
      _id: user.id,
      token: user.token,
      kodeCabang: user.cabang.id,
    });
    setUserPerCabangs(response.data);
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

  const menuLaporanContainer = {
    display: screenSize >= 900 && "flex",
    width: "100%",
    marginBottom: "20px",
  };

  const menuLaporanWrapper = {
    display: "flex",
    justifyContent: screenSize >= 900 && "center",
    flexDirection: screenSize >= 900 && "column",
    alignItems: screenSize >= 900 && "center",
    padding: screenSize >= 900 ? "30px 10px" : "10px 10px",
    cursor: "pointer",
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

  const menuStyle = {
    marginBottom: screenSize >= 900 && "-15px",
    marginTop: screenSize >= 900 && "-10px",
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
          <div style={menuLaporanContainer}>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                className="paper-background"
                style={menuLaporanWrapper}
                onClick={() => {
                  setOpenMenuPphYangDisetorSendiri(
                    !openMenuPphYangDisetorSendiri
                  );
                  setOpenMenuPph4(false);
                  setOpenMenuPphNonResiden(false);
                }}
              >
                <PaymentsIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>PPh yang Disetor Sendiri</b>
                <div style={menuStyle}>
                  <KeyboardArrowDownIcon
                    fontSize="small"
                    style={{ fill: "gray" }}
                  />
                </div>
              </div>
              {openMenuPphYangDisetorSendiri && (
                <div style={userPopupContainer}>
                  <div style={userPopup}>
                    <div
                      style={userPopupWrapper1}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/daftarDisetorSendiri");
                      }}
                    >
                      <MenuIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>
                        Daftar PPh yang Disetor Sendiri
                      </b>
                    </div>
                    <div
                      style={userPopupWrapper2}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/inputDisetorSendiri");
                      }}
                    >
                      <EditIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>
                        Rekam PPh yang Disetor Sendiri
                      </b>
                    </div>
                  </div>
                </div>
              )}
            </Paper>
            <Paper elevation={6} style={{ flex: 1.2 }}>
              <div
                className="paper-background"
                style={menuLaporanWrapper}
                onClick={() => {
                  setOpenMenuPphYangDisetorSendiri(false);
                  setOpenMenuPph4(!openMenuPph4);
                  setOpenMenuPphNonResiden(false);
                }}
              >
                <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>PPh Pasal 4 ayat (2), 15, 22, 23</b>
                <div style={menuStyle}>
                  <KeyboardArrowDownIcon
                    fontSize="small"
                    style={{ fill: "gray" }}
                  />
                </div>
              </div>
              {openMenuPph4 && (
                <div style={userPopupContainer}>
                  <div style={userPopup}>
                    <div
                      style={userPopupWrapper1}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/daftarPph4");
                      }}
                    >
                      <MenuIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>Daftar BP Ps 4(2), 15, 22, 23</b>
                    </div>
                    <div
                      style={userPopupWrapper2}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/inputPph4");
                      }}
                    >
                      <EditIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>Rekam BP Ps 4(2), 15, 22, 23</b>
                    </div>
                  </div>
                </div>
              )}
            </Paper>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                className="paper-background"
                style={menuLaporanWrapper}
                onClick={() => {
                  setOpenMenuPphYangDisetorSendiri(false);
                  setOpenMenuPph4(false);
                  setOpenMenuPphNonResiden(!openMenuPphNonResiden);
                }}
              >
                <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>PPh Non Residen</b>
                <div style={menuStyle}>
                  <KeyboardArrowDownIcon
                    fontSize="small"
                    style={{ fill: "gray" }}
                  />
                </div>
              </div>
              {openMenuPphNonResiden && (
                <div style={userPopupContainer}>
                  <div style={userPopup}>
                    <div
                      style={userPopupWrapper1}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/daftarPphNonResiden");
                      }}
                    >
                      <MenuIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>
                        Daftar Bukti Potong PPh Non Residen
                      </b>
                    </div>
                    <div
                      style={userPopupWrapper2}
                      onClick={() => {
                        navigate("/ebupotUnifikasi/inputPphNonResiden");
                      }}
                    >
                      <EditIcon className="icon-ebupot-pph" />
                      <b style={userPopupTeks}>
                        Rekam Bukti Potong PPh Non Residen
                      </b>
                    </div>
                  </div>
                </div>
              )}
            </Paper>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                className="paper-background"
                style={menuLaporanWrapper}
                onClick={() => {
                  navigate("/ebupotUnifikasi/import");
                }}
              >
                <IosShareIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>Impor Data PPh</b>
              </div>
            </Paper>
            <Paper elevation={6} style={{ flex: 1 }}>
              <div
                className="paper-background"
                style={menuLaporanWrapper}
                onClick={() => {
                  navigate("/ebupotUnifikasi/posting");
                }}
              >
                <LockResetIcon style={{ fill: "#ffb822" }} fontSize="large" />
                <b>Posting</b>
              </div>
            </Paper>
          </div>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar Bukti Setor atas PPh yang disetor Sendiri
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
                      {pencairanBerdasarkan === "Periode" ? (
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
                            setMasaTahunPajakSearch(value);
                          }}
                          value={masaTahunPajakSearch}
                        />
                      ) : (
                        <Form.Control
                          required
                          className="mb-3"
                          value={kataKunciSearch}
                          onChange={(e) => setKataKunciSearch(e.target.value)}
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
                        // onClick={handleCloseInfo}
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
                <ShowTableEbupotUnifikasiPphDisetorSendiri
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

export default EbupotUnifikasiDaftarPphDisetorSendiri;

const menuLaporContainer = {
  display: "flex",
  borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
  marginTop: "40px",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const userPopupContainer = {
  position: "relative",
};

const userPopupWrapper1 = {
  cursor: "pointer",
};

const userPopupWrapper2 = {
  cursor: "pointer",
  marginTop: "20px",
};

const userPopupTeks = {
  marginLeft: "5px",
};

const userPopup = {
  cursor: "auto",
  position: "absolute",
  transform: "translateX(0%)",
  width: "300px",
  padding: "20px",
  backgroundColor: "white",
  zIndex: 1000, // Ensure it stays in front
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
  borderRadius: "5px",
};
