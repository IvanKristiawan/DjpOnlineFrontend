import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126Pengaturan,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import { ShowTablePerekam } from "../../../components/ShowTable";
import "../../../constants/defaultProgram.css";
import { Card, Form, Row, Col, Spinner } from "react-bootstrap";
import {
  Paper,
  Box,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
        <b>Deskripsi Form:</b> Form ini menampilkan data perekam yang telah
        didaftarkan.
      </p>
      <p>
        perekam dapat melakukan perekaman bukti potong dan impor bukti potong
      </p>
      <p>
        Anda dapat menggunakan form ini untuk melihat data ringkas daftar
        perekam
      </p>
      <p>
        Pada kolom paling kanan, tersedia tombol aksi yang berfungsi untuk
        mengubah status aktif/tidak aktif dan menghapus perekam.
      </p>
    </div>
  );
};

function TampilEbupot2126Perekam() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [nomorIdentitas, setNomorIdentitas] = useState("");
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [emailIdentitas, setEmailIdentitas] = useState("");
  const [passwordIdentitas, setPasswordIdentitas] = useState("");
  const [status, setStatus] = useState("");
  const [detilSearchNik, setDetilSearchNik] = useState("");
  const [openConfirmationSearchNik, setOpenConfirmationSearchNik] =
    useState(false);
  const [openFoundNik, setOpenFoundNik] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [openLoading, setOpenLoading] = useState(false);
  const [perekamPagination, setPerekamPagination] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleCloseConfirmationSearchNik = () => {
    setOpenConfirmationSearchNik(false);
  };

  const handleCloseConfirmationFoundNik = () => {
    setOpenFoundNik(false);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
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

  // useEffect(() => {
  //   getAllPerekamData();
  // }, [page, limit]);

  const getAllPerekamData = async () => {
    setOpenLoading(true);

    setTimeout(async () => {
      const response = await axios.post(
        `${tempUrl}/perekamsByUserPagination?search_query=&page=${page}&limit=${limit}`,
        {
          userPerekamId: user.id,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );
      setPerekamPagination(response.data.perekams);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setOpenLoading(false);
    }, 500);
  };

  const ubahStatusPerekam = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/updatePerekamStatus/${id}`, {
        _id: user.id,
        token: user.token,
      });
      getAllPerekamData();
      setTimeout(async () => {
        setOpenLoading(false);
        setOpenSaved(true);
      }, 500);
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
      setOpenLoading(false);
    }
  };

  const deletePerekam = async (id) => {
    setOpenLoading(true);
    try {
      await axios.post(`${tempUrl}/deletePerekam/${id}`, {
        _id: user.id,
        token: user.token,
      });
      setPerekamPagination([]);
      navigate("/ebupotUnifikasi/daftarDisetorSendiri");
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        // alert(`${namaKategoriKlu} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setOpenLoading(false);
  };

  const savePerekam = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCheckValid =
      form.checkValidity() &&
      nomorIdentitas.length >= 16 &&
      namaIdentitas.length !== 0;

    if (tempCheckValid) {
      try {
        setOpenLoading(true);
        let savedPerekam = await axios.post(`${tempUrl}/savePerekam`, {
          userId: user.id,
          nomorIdentitas,
          namaIdentitas,
          status,

          userIdInput: user.id,
          kodeCabang: user.cabang.id,
          _id: user.id,
          token: user.token,
        });

        getAllPerekamData();
        setTimeout(async () => {
          setOpenLoading(false);
          setOpenSaved(true);
          setNomorIdentitas("");
          setNamaIdentitas("");
          setStatus(false);
        }, 500);
      } catch (error) {
        // alert(error.response.data.message);
        setOpenLoading(false);
        setDetilSearchNik(error.response.data.message);
        setOpenConfirmationSearchNik(true);
        setNomorIdentitas("");
        setNamaIdentitas("");
        setStatus(false);
      }
    } else {
      setDetilSearchNik(
        "Pastikan NIK dan nama Anda sudah benar dan status valid telah aktif."
      );
      setOpenConfirmationSearchNik(true);
    }
    setValidated(true);
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

  const inputWrapper = {
    width: screenSize >= 900 ? "60%" : "100%",
    color: "#646c9a",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/pengaturan/penandatangan"} />
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
          <MenuEbupot2126Pengaturan />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Tambah Perekam
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={savePerekam}>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          NPWP
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            required
                            value={nomorIdentitas}
                            onChange={(e) => {
                              setNomorIdentitas(e.target.value.toUpperCase());
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Nama Lengkap
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            required
                            value={namaIdentitas}
                            onChange={(e) => {
                              setNamaIdentitas(e.target.value.toUpperCase());
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Email
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            required
                            value={emailIdentitas}
                            onChange={(e) => {
                              setEmailIdentitas(e.target.value.toUpperCase());
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputWrapper}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Password
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            required
                            value={passwordIdentitas}
                            onChange={(e) => {
                              setPasswordIdentitas(
                                e.target.value.toUpperCase()
                              );
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="hover-button"
                    style={{ marginRight: "4px" }}
                    type="submit"
                  >
                    <SaveIcon fontSize="small" style={{ marginRight: "4px" }} />
                    Simpan
                  </button>
                  <button
                    className="blank-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setNomorIdentitas("");
                      setNamaIdentitas("");
                      setStatus(false);
                    }}
                  >
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
              <FormatListBulletedIcon style={{ marginRight: "10px" }} />
              Daftar Perekam Bukti Potong
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
                <ShowTablePerekam
                  currentPosts={perekamPagination}
                  ubahStatusPerekam={ubahStatusPerekam}
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
        open={openConfirmationSearchNik}
        onClose={handleCloseConfirmationSearchNik}
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
              {detilSearchNik}
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
              onClick={handleCloseConfirmationSearchNik}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
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
      <Dialog
        open={openFoundNik}
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
              onClick={handleCloseConfirmationFoundNik}
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
                Data berhasil disimpan.
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
              style={{ paddingTop: "10px" }}
              onClick={handleCloseSaved}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default TampilEbupot2126Perekam;

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
