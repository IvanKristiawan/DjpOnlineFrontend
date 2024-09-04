import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import { ShowTableUser } from "../../../components/ShowTable";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier,
} from "../../../components";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  Box,
  Pagination,
  Button,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDownloadExcel } from "react-export-table-to-excel";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

const DaftarUser = () => {
  const tableRef = useRef(null);
  const { user, setting } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [namaWilayah, setNamaWilayah] = useState("");
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");

  const [userReport, setUserReport] = useState([]);

  // Akses Master
  const [wilayah, setWilayah] = useState(false);
  const [unit, setUnit] = useState(false);
  const [anggotaKoperasi, setAnggotaKoperasi] = useState(false);
  const [anggotaKoperasiKeluar, setAnggotaKoperasiKeluar] = useState(false);
  const [kodeKartuTabungan, setKodeKartuTabungan] = useState(false);

  // Akses Mutasi Anggota
  const [mutasiUnit, setMutasiUnit] = useState(false);
  const [keluar, setKeluar] = useState(false);
  const [pembayaranKeluar, setPembayaranKeluar] = useState(false);

  // Akses Simpan
  const [shuSimpananWajib, setShuSimpananWajib] = useState(false);
  const [saldoDja, setSaldoDja] = useState(false);
  const [simpananWajib, setSimpananWajib] = useState(false);
  const [tabunganUmum, setTabunganUmum] = useState(false);

  // Akses Tabungan

  // Akses Laporan
  const [laporanSimpananWajib, setLaporanSimpananWajib] = useState(false);
  const [rekapPerhitungan, setRekapPerhitungan] = useState(false);
  const [laporanShuSimpananWajib, setLaporanShuSimpananWajib] = useState(false);

  // Akses Utility
  const [profilUser, setProfilUser] = useState(false);
  const [daftarUser, setDaftarUser] = useState(false);
  const [settingAkses, setSettingAkses] = useState(false);

  const [previewPdf, setPreviewPdf] = useState(false);
  const [previewExcel, setPreviewExcel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const PER_PAGE = 20;

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setSearchTerm(query);
  };

  useEffect(() => {
    id && getUserById();
  }, [id]);

  useEffect(() => {
    getUsers();
  }, [page, searchTerm]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${tempUrl}/usersPagination?search_query=${searchTerm}&page=${page}&limit=${limit}`,
        {
          tipeAdmin: user.tipeUser,
          _id: user.id,
          token: user.token,
        }
      );
      setQuery(searchTerm);
      setUser(response.data.tempAllUser);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getUserReportData = async () => {
    try {
      const response = await axios.post(`${tempUrl}/users`, {
        _id: user.id,
        token: user.token,
      });
      setUserReport(response.data);
    } catch (err) {
      setIsFetchError(true);
    }
  };

  const getUserById = async () => {
    setLoading(true);
    if (id) {
      const response = await axios.post(`${tempUrl}/findUser/${id}`, {
        _id: user.id,
        token: user.token,
      });
      setUsername(response.data.username);
      setTipeUser(response.data.tipeUser);
      setNamaWilayah(response.data.wilayah.namaWilayah);

      // Akses Master
      setWilayah(response.data.akses.wilayah);
      setUnit(response.data.akses.unit);
      setAnggotaKoperasi(response.data.akses.anggotaKoperasi);
      setAnggotaKoperasiKeluar(response.data.akses.anggotaKoperasiKeluar);
      setKodeKartuTabungan(response.data.akses.kodeKartuTabungan);

      // Akses Mutasi Anggota
      setMutasiUnit(response.data.akses.mutasiUnit);
      setKeluar(response.data.akses.keluar);
      setPembayaranKeluar(response.data.akses.pembayaranKeluar);

      // Akses Simpan
      setShuSimpananWajib(response.data.akses.shuSimpananWajib);
      setSaldoDja(response.data.akses.saldoDja);
      setSimpananWajib(response.data.akses.simpananWajib);
      setTabunganUmum(response.data.akses.tabunganUmum);

      // Akses Tabungan

      // Akses Laporan
      setLaporanSimpananWajib(response.data.akses.laporanSimpananWajib);
      setRekapPerhitungan(response.data.akses.rekapPerhitungan);
      setLaporanShuSimpananWajib(response.data.akses.laporanShuSimpananWajib);

      // Akses Utility
      setProfilUser(response.data.akses.profilUser);
      setDaftarUser(response.data.akses.daftarUser);
      setSettingAkses(response.data.akses.setting);
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${tempUrl}/users/deleteUser/${id}`, {
        tipeAdmin: user.tipeUser,
        _id: user.id,
        token: user.token,
      });
      getUsers();
      setNamaWilayah("");

      navigate("/daftarUser");
    } catch (error) {
      if (error.response.data.message.includes("foreign key")) {
        alert(`${username} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setLoading(false);
  };

  const downloadPdf = () => {
    var date = new Date();
    var current_date =
      date.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "-" +
      (date.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "-" +
      date.getFullYear();
    var current_time =
      date.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      date.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      date.getSeconds().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`${setting.namaPerusahaan} - ${setting.kotaPerusahaan}`, 15, 10);
    doc.text(`${setting.alamatPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Daftar User`, 90, 30);
    doc.setFontSize(10);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      290
    );
    doc.autoTable({
      html: "#table",
      startY: doc.pageCount > 1 ? doc.autoTableEndPosY() + 20 : 45,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0],
      },
    });
    window.open(URL.createObjectURL(doc.output("blob")));
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Daftar User",
    sheet: "DaftarUser",
  });

  const textRight = {
    textAlign: screenSize >= 650 && "right",
  };

  const textRightSmall = {
    textAlign: screenSize >= 650 && "right",
    fontSize: "14px",
  };

  if (loading) {
    return <Loader />;
  }

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  return (
    <Container>
      <h3>Utility</h3>
      <h5 style={{ fontWeight: 400 }}>Daftar User</h5>
      <Box sx={downloadButtons}>
        <ButtonGroup variant="outlined" color="secondary">
          <Button
            color="primary"
            startIcon={<SearchIcon />}
            onClick={() => {
              setPreviewPdf(!previewPdf);
              getUserReportData();
              setPreviewExcel(false);
            }}
          >
            PDF
          </Button>
          <Button
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={() => {
              setPreviewExcel(!previewExcel);
              getUserReportData();
              setPreviewPdf(false);
            }}
          >
            Excel
          </Button>
        </ButtonGroup>
      </Box>
      {previewPdf && (
        <div>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => downloadPdf()}
          >
            CETAK
          </Button>
          <table class="table" id="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Tipe User</th>
                <th>Nama Wilayah</th>
              </tr>
            </thead>
            <tbody>
              {userReport.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.tipeUser}</td>
                  <td>{user.wilayah.namaWilayah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {previewExcel && (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
          >
            EXCEL
          </Button>
        )}
        <table ref={tableRef}>
          {previewExcel && (
            <tbody>
              <tr>
                <th>Username</th>
                <th>Tipe User</th>
                <th>Nama Wilayah</th>
              </tr>
              {userReport.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.tipeUser}</td>
                  <td>{user.wilayah.namaWilayah}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={id}
          addLink={`/daftarUser/tambahUser`}
          editLink={`/daftarUser/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={username}
        />
      </Box>
      {id && (
        <Container>
          <hr />
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4" style={textRight}>
                    Username :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control value={username} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4" style={textRight}>
                    Tipe User :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control value={tipeUser} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4" style={textRight}>
                    Nama Wilayah :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control value={namaWilayah} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {user.tipeUser !== "ADMIN" && (
            <Container style={{ marginTop: 30 }}>
              <h4>Hak Akses User</h4>
              <Box sx={showDataContainerCheck}>
                <Row>
                  <Col>
                    <Typography variant="p" sx={[spacingTop]}>
                      Master
                    </Typography>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={wilayah} />}
                          disabled
                          label="Wilayah"
                          onChange={() => setWilayah(!wilayah)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={unit} />}
                          disabled
                          label="Unit"
                          onChange={() => setUnit(!unit)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={anggotaKoperasi} />}
                          disabled
                          label="Anggota Koperasi"
                          onChange={() => setAnggotaKoperasi(!anggotaKoperasi)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={anggotaKoperasiKeluar} />}
                          disabled
                          label="Anggota Koperasi Keluar"
                          onChange={() =>
                            setAnggotaKoperasiKeluar(!anggotaKoperasiKeluar)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={kodeKartuTabungan} />}
                          disabled
                          label="Kode Kartu Tab."
                          onChange={() =>
                            setKodeKartuTabungan(!kodeKartuTabungan)
                          }
                        />
                      </FormGroup>
                    </Form>
                    <Box sx={spacingTop}>
                      <Typography variant="p" sx={[spacingTop]}>
                        Mutasi Anggota
                      </Typography>
                    </Box>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={mutasiUnit} />}
                        disabled
                        label="Mutasi Unit"
                        onChange={() => setMutasiUnit(!mutasiUnit)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={keluar} />}
                        disabled
                        label="Keluar"
                        onChange={() => setKeluar(!keluar)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={pembayaranKeluar} />}
                        disabled
                        label="Pembayaran Keluar"
                        onChange={() => setPembayaranKeluar(!pembayaranKeluar)}
                      />
                    </FormGroup>
                    <Box sx={spacingTop}>
                      <Typography variant="p" sx={[spacingTop]}>
                        Simpan
                      </Typography>
                    </Box>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={shuSimpananWajib} />}
                        disabled
                        label="SHU Simpanan Wajib"
                        onChange={() => setShuSimpananWajib(!shuSimpananWajib)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={saldoDja} />}
                        disabled
                        label="Saldo DJA"
                        onChange={() => setSaldoDja(!saldoDja)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={simpananWajib} />}
                        disabled
                        label="Simpanan Wajib"
                        onChange={() => setSimpananWajib(!simpananWajib)}
                      />
                    </FormGroup>
                    <Box sx={spacingTop}>
                      <Typography variant="p" sx={[spacingTop]}>
                        Tabungan
                      </Typography>
                    </Box>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={tabunganUmum} />}
                        disabled
                        label="Tabungan Umum"
                        onChange={() => setTabunganUmum(!tabunganUmum)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Typography variant="p" sx={[spacingTop]}>
                      Laporan
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={laporanSimpananWajib} />}
                        disabled
                        label="Laporan Simpanan Wajib"
                        onChange={() =>
                          setLaporanSimpananWajib(!laporanSimpananWajib)
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={rekapPerhitungan} />}
                        disabled
                        label="Rekap Perhitungan"
                        onChange={() => setRekapPerhitungan(!rekapPerhitungan)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={laporanShuSimpananWajib} />}
                        disabled
                        label="Laporan SHU Simpanan Wajib"
                        onChange={() =>
                          setLaporanShuSimpananWajib(!laporanShuSimpananWajib)
                        }
                      />
                    </FormGroup>
                    <Box sx={spacingTop}>
                      <Typography variant="p" sx={[spacingTop]}>
                        Utility
                      </Typography>
                    </Box>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={profilUser} />}
                          disabled
                          label="Profil User"
                          onChange={() => setProfilUser(!profilUser)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={daftarUser} />}
                          disabled
                          label="Daftar User"
                          onChange={() => setDaftarUser(!daftarUser)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={settingAkses} />}
                          disabled
                          label="Anggota Koperasi"
                          onChange={() => setSettingAkses(!settingAkses)}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Box>
            </Container>
          )}
        </Container>
      )}
      <hr />
      <Form onSubmit={searchData}>
        <Box sx={searchBarContainer}>
          <SearchBar value={query} setSearchTerm={setQuery} />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disableElevation
          >
            Cari
          </Button>
        </Box>
      </Form>
      <Box sx={tableContainer}>
        <ShowTableUser currentPosts={users} />
      </Box>
      <Box sx={tableContainer}>
        <Pagination
          count={pages}
          page={page + 1}
          onChange={handleChange}
          color="primary"
          size={screenSize <= 600 ? "small" : "large"}
        />
      </Box>
    </Container>
  );
};

export default DaftarUser;

const showDataContainerCheck = {
  mt: 4,
  flexDirection: {
    xs: "column",
    sm: "row",
  },
};

const buttonModifierContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const downloadButtons = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const showDataContainer = {
  mt: 2,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw",
  },
};

const secondWrapper = {
  marginLeft: {
    sm: 4,
  },
  marginTop: {
    sm: 0,
    xs: 2,
  },
};

const checkboxTitle = {
  marginBottom: 0,
};

const secondCheckboxTitle = {
  marginTop: 15,
  marginBottom: 0,
};

const searchBarContainer = {
  pt: 6,
  display: "flex",
  justifyContent: "center",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const spacingTop = {
  mt: 4,
};
