import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";
import {
  Box,
  Alert,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahUser = () => {
  const [isFetchError, setIsFetchError] = useState(false);
  const { screenSize } = useStateContext();
  const { user, setting } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [kodeWilayah, setKodeWilayah] = useState("");
  const [password, setPassword] = useState("");
  const [wilayahs, setWilayahs] = useState([]);

  // Akses Master
  const [checkAllAkses, setCheckAllAkses] = useState(false);
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

  // Akses Laporan
  const [laporanSimpananWajib, setLaporanSimpananWajib] = useState(false);
  const [rekapPerhitungan, setRekapPerhitungan] = useState(false);
  const [laporanShuSimpananWajib, setLaporanShuSimpananWajib] = useState(false);

  // Akses Utility
  const [profilUser, setProfilUser] = useState(false);
  const [daftarUser, setDaftarUser] = useState(false);
  const [settingAkses, setSettingAkses] = useState(false);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openAlertUsername, setOpenAlertUsername] = useState(false);

  const handleClickOpenAlertUsername = () => {
    setOpenAlertUsername(true);
  };

  const handleCloseAlertUsername = () => {
    setOpenAlertUsername(false);
  };

  const tipeUserOption = ["MANAGER", "ADMIN"];
  const tipeUserOptionOwner = ["OWNER", "MANAGER", "ADMIN"];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const wilayahOption = wilayahs.map((wil) => ({
    //id: wil.id,
    label: `${wil.kodeWilayah} - ${wil.namaWilayah}`,
  }));

  useEffect(() => {
    getWilayahs();
  }, []);

  const getWilayahs = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${tempUrl}/wilayahs`, {
        _id: user.id,
        token: user.token,
      });
      setWilayahs(response.data);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setLoading(true);
      try {
        let tempUsername = await axios.post(`${tempUrl}/getUsername`, {
          username,
          _id: user.id,
          token: user.token,
        });

        let isUsernameAlreadyExist =
          tempUsername.data.length > 0 && kodeWilayah.length !== 0;
        if (isUsernameAlreadyExist) {
          handleClickOpenAlertUsername();
        } else {
          setLoading(true);
          await axios.post(`${tempUrl}/auth/register`, {
            username,
            password,
            tipeUser,
            kodeWilayah,
            akses: {
              wilayah,
              unit,
              anggotaKoperasi,
              anggotaKoperasiKeluar,
              kodeKartuTabungan,
              mutasiUnit,
              keluar,
              pembayaranKeluar,
              shuSimpananWajib,
              saldoDja,
              simpananWajib,
              tabunganUmum,
              laporanSimpananWajib,
              rekapPerhitungan,
              laporanShuSimpananWajib,
              profilUser,
              daftarUser,
              setting: settingAkses,
            },
            _id: user.id,
            token: user.token,
          });
          setLoading(false);
          navigate("/daftarUser");
        }
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    } else {
      setError(true);
      setOpen(!open);
    }
    setValidated(true);
  };

  if (loading) {
    return <Loader />;
  }

  const textRight = {
    textAlign: screenSize >= 650 && "right",
  };

  const textRightSmall = {
    textAlign: screenSize >= 650 && "right",
    fontSize: "14px",
  };

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  return (
    <Container>
      <h3>Utility</h3>
      <h5 style={{ fontWeight: 400 }}>Tambah User</h5>
      <Dialog
        open={openAlertUsername}
        onClose={handleCloseAlertUsername}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Data Username Sama`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{`Username ${username} sudah ada, ganti Username!`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertUsername}>Ok</Button>
        </DialogActions>
      </Dialog>
      <hr />
      <Card>
        <Card.Header>User</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={saveUser}>
            <Row>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4" style={textRight}>
                    Username <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      required
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toUpperCase())
                      }
                    />
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
                    Tipe User <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="8">
                    {user.tipeUser === "OWNER" ? (
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={tipeUserOptionOwner}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            error={error && tipeUser.length === 0 && true}
                            helperText={
                              error &&
                              tipeUser.length === 0 &&
                              "Tipe User harus diisi!"
                            }
                            {...params}
                          />
                        )}
                        onInputChange={(e, value) => {
                          setTipeUser(value);
                        }}
                      />
                    ) : (
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={tipeUserOption}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            error={error && tipeUser.length === 0 && true}
                            helperText={
                              error &&
                              tipeUser.length === 0 &&
                              "Tipe User harus diisi!"
                            }
                            {...params}
                          />
                        )}
                        onInputChange={(e, value) => {
                          setTipeUser(value);
                        }}
                      />
                    )}
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
                    Nama Wilayah <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="8">
                    <Autocomplete
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={wilayahOption}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          error={error && kodeWilayah.length === 0 && true}
                          helperText={
                            error &&
                            kodeWilayah.length === 0 &&
                            "Nama Wilayah harus diisi!"
                          }
                          {...params}
                        />
                      )}
                      onInputChange={(e, value) => {
                        setKodeWilayah(value.split(" ", 1)[0]);
                      }}
                    />
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
                    Password <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      required
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value.toUpperCase())
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Container style={{ marginTop: 30 }}>
              <h4>Hak Akses User</h4>
              <Box sx={showDataContainerCheck}>
                <Row>
                  <Col>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={checkAllAkses} />}
                        label="Pilih Semua"
                        onChange={() => {
                          setCheckAllAkses(!checkAllAkses); // Akses Master
                          setWilayah(!checkAllAkses);
                          setUnit(!checkAllAkses);
                          setAnggotaKoperasi(!checkAllAkses);
                          setAnggotaKoperasiKeluar(!checkAllAkses);
                          setKodeKartuTabungan(!checkAllAkses);
                          setMutasiUnit(!checkAllAkses);
                          setKeluar(!checkAllAkses);
                          setPembayaranKeluar(!checkAllAkses);
                          setShuSimpananWajib(!checkAllAkses);
                          setSaldoDja(!checkAllAkses);
                          setSimpananWajib(!checkAllAkses);
                          setTabunganUmum(!checkAllAkses);
                          setLaporanSimpananWajib(!checkAllAkses);
                          setRekapPerhitungan(!checkAllAkses);
                          setLaporanShuSimpananWajib(!checkAllAkses);
                          setProfilUser(!checkAllAkses);
                          setDaftarUser(!checkAllAkses);
                          setSettingAkses(!checkAllAkses);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Box>
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
                          label="Wilayah"
                          onChange={() => setWilayah(!wilayah)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={unit} />}
                          label="Unit"
                          onChange={() => setUnit(!unit)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={anggotaKoperasi} />}
                          label="Anggota Koperasi"
                          onChange={() => setAnggotaKoperasi(!anggotaKoperasi)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={anggotaKoperasiKeluar} />}
                          label="Anggota Koperasi Keluar"
                          onChange={() =>
                            setAnggotaKoperasiKeluar(!anggotaKoperasiKeluar)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={kodeKartuTabungan} />}
                          label="Kode Kartu Tab."
                          onChange={() =>
                            setKodeKartuTabungan(!kodeKartuTabungan)
                          }
                        />
                      </FormGroup>
                    </Form>
                    <Box sx={spacingTop}>
                      <Typography variant="p">Mutasi Anggota</Typography>
                    </Box>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={mutasiUnit} />}
                          label="Mutasi Unit"
                          onChange={() => setMutasiUnit(!mutasiUnit)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={keluar} />}
                          label="Keluar"
                          onChange={() => setKeluar(!keluar)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={pembayaranKeluar} />}
                          label="Pembayaran Keluar"
                          onChange={() =>
                            setPembayaranKeluar(!pembayaranKeluar)
                          }
                        />
                      </FormGroup>
                    </Form>
                    <Box sx={spacingTop}>
                      <Typography variant="p">Simpan</Typography>
                    </Box>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={shuSimpananWajib} />}
                          label="SHU Simpanan Wajib"
                          onChange={() =>
                            setShuSimpananWajib(!shuSimpananWajib)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={saldoDja} />}
                          label="Saldo DJA"
                          onChange={() => setSaldoDja(!saldoDja)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={simpananWajib} />}
                          label="Simpanan Wajib"
                          onChange={() => setSimpananWajib(!simpananWajib)}
                        />
                      </FormGroup>
                    </Form>
                    <Box sx={spacingTop}>
                      <Typography variant="p">Tabungan</Typography>
                    </Box>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={tabunganUmum} />}
                          label="Tabungan Umum"
                          onChange={() => setTabunganUmum(!tabunganUmum)}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col>
                    <Typography variant="p">Laporan</Typography>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={laporanSimpananWajib} />}
                          label="Laporan Simpanan Wajib"
                          onChange={() =>
                            setLaporanSimpananWajib(!laporanSimpananWajib)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={rekapPerhitungan} />}
                          label="Rekap Perhitungan"
                          onChange={() =>
                            setRekapPerhitungan(!rekapPerhitungan)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={laporanShuSimpananWajib} />
                          }
                          label="Laporan SHU Simpanan Wajib"
                          onChange={() =>
                            setLaporanShuSimpananWajib(!laporanShuSimpananWajib)
                          }
                        />
                      </FormGroup>
                    </Form>
                    <Box sx={spacingTop}>
                      <Typography variant="p" sx={[spacingTop]}>
                        Utility
                      </Typography>
                    </Box>
                    <Form>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={profilUser} />}
                          label="Profil User"
                          onChange={() => setProfilUser(!profilUser)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={daftarUser} />}
                          label="Daftar User"
                          onChange={() => setDaftarUser(!daftarUser)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={settingAkses} />}
                          label="Setting Akses"
                          onChange={() => setSettingAkses(!settingAkses)}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Box>
            </Container>
            <Box sx={spacingTop}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/daftarUser")}
                sx={{ marginRight: 2 }}
              >
                {"< Kembali"}
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Simpan
              </Button>
            </Box>
          </Form>
        </Card.Body>
      </Card>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default TambahUser;

const colorRed = {
  color: "red",
};

const showDataContainerCheck = {
  mt: 4,
  flexDirection: {
    xs: "column",
    sm: "row",
  },
};

const spacingTop = {
  mt: 4,
};

const alertBox = {
  width: "100%",
};

const showDataContainer = {
  mt: 4,
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
    xs: 4,
  },
};

const checkboxTitle = {
  marginBottom: 0,
};

const secondCheckboxTitle = {
  marginTop: 15,
  marginBottom: 0,
};
