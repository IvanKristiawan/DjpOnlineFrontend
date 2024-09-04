import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UbahSetting = () => {
  const { screenSize } = useStateContext();
  const { user, dispatch, setting } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [namaProgram, setNamaProgram] = useState("");
  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [alamatPerusahaan, setAlamatPerusahaan] = useState("");
  const [kotaPerusahaan, setKotaPerusahaan] = useState("");
  const [kabupatenPerusahaan, setKabupatenPerusahaan] = useState("");
  const [provinsiPerusahaan, setProvinsiPerusahaan] = useState("");
  const [teleponPerusahaan, setTeleponPerusahaan] = useState("");
  const [direkturUtama, setDirekturUtama] = useState("");

  // Karyawan
  const [bendahara1, setBendahara1] = useState("");
  const [bendahara1Keterangan, setBendahara1Keterangan] = useState("");
  const [manager, setManager] = useState("");
  const [managerKeterangan, setManagerKeterangan] = useState("");

  // Angka
  const [simpananWajib, setSimpananWajib] = useState("");
  const [simpananPokok, setSimpananPokok] = useState("");
  const [tglRapatTahunan, setTglRapatTahunan] = useState(new Date());

  // Tabungan
  const [setoranMinimalTabunganUmum, setSetoranMinimalTabunganUmum] = useState("");
  const [setoranMinimalSelanjutnyaTabunganUmum, setSetoranMinimalSelanjutnyaTabunganUmum] = useState("");
  const [sukuBungaTabunganUmum, setSukuBungaTabunganUmum] = useState("");

  const [batasMinValidasiPembukaanTab, setBatasMinValidasiPembukaanTab] = useState(
    `${setting.batasMinValidasiPembukaanTab}`
  );
  const [batasMinValidasiSetoranTab, setBatasMinValidasiSetoranTab] = useState(`${setting.batasMinValidasiSetoranTab}`);
  const [batasMinValidasiTarikTab, setBatasMinValidasiTarikTab] = useState(`${setting.batasMinValidasiTarikTab}`);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSettingById();
  }, []);

  const getSettingById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/settings/${id}`, {
      _id: user.id,
      token: user.token,
    });
    setNamaProgram(response.data.namaProgram);
    setNamaPerusahaan(response.data.namaPerusahaan);
    setAlamatPerusahaan(response.data.alamatPerusahaan);
    setKotaPerusahaan(response.data.kotaPerusahaan);
    setKabupatenPerusahaan(response.data.kabupatenPerusahaan);
    setProvinsiPerusahaan(response.data.provinsiPerusahaan);
    setTeleponPerusahaan(response.data.teleponPerusahaan);
    setDirekturUtama(response.data.direkturUtama);

    // Karyawan
    setBendahara1(response.data.bendahara1);
    setBendahara1Keterangan(response.data.bendahara1Keterangan);
    setManager(response.data.manager);
    setManagerKeterangan(response.data.managerKeterangan);

    // Angka
    setSimpananWajib(response.data.simpananWajib.toLocaleString("en-US"));
    setSimpananPokok(response.data.simpananPokok.toLocaleString("en-US"));
    setTglRapatTahunan(new Date(response.data.tglRapatTahunan));

    // Tabungan
    setSetoranMinimalTabunganUmum(response.data.setoranMinimalTabunganUmum.toLocaleString("en-US"));
    setSetoranMinimalSelanjutnyaTabunganUmum(
      response.data.setoranMinimalSelanjutnyaTabunganUmum.toLocaleString("en-US")
    );
    setSukuBungaTabunganUmum(response.data.sukuBungaTabunganUmum.toLocaleString("en-US"));

    setBatasMinValidasiPembukaanTab(response.data.batasMinValidasiPembukaanTab.toLocaleString("en-US"));
    setBatasMinValidasiSetoranTab(response.data.batasMinValidasiSetoranTab.toLocaleString("en-US"));
    setBatasMinValidasiTarikTab(response.data.batasMinValidasiTarikTab.toLocaleString("en-US"));

    setLoading(false);
  };

  const updateSetting = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (simpananWajib.length === 0) {
      alert(`Simpanan Wajib belum diisi!`);
      return;
    }

    if (simpananPokok.length === 0) {
      alert(`Simpanan Pokok belum diisi!`);
      return;
    }

    if (form.checkValidity()) {
      setLoading(true);
      try {
        setLoading(true);
        try {
          setLoading(true);
          await axios.post(`${tempUrl}/updateSetting/${id}`, {
            namaProgram,
            namaPerusahaan,
            alamatPerusahaan,
            kotaPerusahaan,
            kabupatenPerusahaan,
            provinsiPerusahaan,
            teleponPerusahaan,
            direkturUtama,
            bendahara1,
            bendahara1Keterangan,
            manager,
            managerKeterangan,
            simpananWajib: simpananWajib.replace(/,/g, ""),
            tglUbahSimpananWajib: new Date(),
            simpananPokok: simpananPokok.replace(/,/g, ""),
            tglUbahSimpananPokok: new Date(),
            tglRapatTahunan,
            setoranMinimalTabunganUmum: setoranMinimalTabunganUmum.replace(/,/g, ""),
            setoranMinimalSelanjutnyaTabunganUmum: setoranMinimalSelanjutnyaTabunganUmum.replace(/,/g, ""),
            sukuBungaTabunganUmum: sukuBungaTabunganUmum.replace(/,/g, ""),
            batasMinValidasiPembukaanTab: batasMinValidasiPembukaanTab.replace(/,/g, ""),
            batasMinValidasiSetoranTab: batasMinValidasiSetoranTab.replace(/,/g, ""),
            batasMinValidasiTarikTab: batasMinValidasiTarikTab.replace(/,/g, ""),
            userIdUpdate: user.id,
            _id: user.id,
            token: user.token,
          });
          const findSetting = await axios.post(`${tempUrl}/lastSetting`, {
            _id: user.id,
            token: user.token,
          });
          const updateUser = await axios.post(`${tempUrl}/updateUserThenLogin/${user.id}`, {
            _id: user.id,
            token: user.token,
          });
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: updateUser.data.details,
            setting: findSetting.data,
          });
          setLoading(false);
          navigate(`/setting`);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    } else {
      setError(true);
      setOpen(!open);
    }
    setValidated(true);
  };

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

  return (
    <Container>
      <h3>Utility</h3>
      <h5 style={{ fontWeight: 400 }}>Ubah Setting</h5>
      <hr />
      <Card>
        <Card.Header>Setting</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={updateSetting}>
            <Box sx={showDataContainer}>
              <Box sx={showDataWrapper}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRight}>
                        Nama Program :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={namaProgram}
                          required
                          onChange={(e) => setNamaProgram(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Alamat Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={alamatPerusahaan}
                          required
                          onChange={(e) => setAlamatPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Kabupaten Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={kabupatenPerusahaan}
                          required
                          onChange={(e) => setKabupatenPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Telepon Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={teleponPerusahaan}
                          required
                          onChange={(e) => setTeleponPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
              <Box sx={[showDataWrapper, secondWrapper]}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRight}>
                        Nama Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={namaPerusahaan}
                          required
                          onChange={(e) => setNamaPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRight}>
                        Kota Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={kotaPerusahaan}
                          required
                          onChange={(e) => setKotaPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Provinsi Perusahaan :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={provinsiPerusahaan}
                          required
                          onChange={(e) => setProvinsiPerusahaan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Direktur Utama :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={direkturUtama}
                          required
                          onChange={(e) => setDirekturUtama(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
            </Box>

            <hr />
            <Box sx={showDataContainer}>
              <Box sx={showDataWrapper}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Bendahara 1 :
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={bendahara1}
                          required
                          onChange={(e) => setBendahara1(e.target.value.toUpperCase())}
                        />
                      </Col>
                      <Col sm="4">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={bendahara1Keterangan}
                          required
                          onChange={(e) => setBendahara1Keterangan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Manager :
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={manager}
                          required
                          onChange={(e) => setManager(e.target.value.toUpperCase())}
                        />
                      </Col>
                      <Col sm="4">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={managerKeterangan}
                          required
                          onChange={(e) => setManagerKeterangan(e.target.value.toUpperCase())}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
              <Box sx={[showDataWrapper, secondWrapper]}></Box>
            </Box>

            <hr />
            <Box sx={showDataContainer}>
              <Box sx={showDataWrapper}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Simpanan Wajib :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={simpananWajib}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setSimpananWajib(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Simpanan Pokok :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={simpananPokok}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setSimpananPokok(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Tgl. Rapat Tahunan :
                      </Form.Label>
                      <Col sm="8">
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          customInput={<Form.Control required />}
                          selected={tglRapatTahunan}
                          onChange={(date) => setTglRapatTahunan(date)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
              <Box sx={[showDataWrapper, secondWrapper]}></Box>
            </Box>

            <hr />
            <Box sx={showDataContainer}>
              <Box sx={showDataWrapper}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Setoran Min. Tab. Umum :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={setoranMinimalTabunganUmum}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setSetoranMinimalTabunganUmum(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Setoran Min. Lanjut. Tab. Umum :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={setoranMinimalSelanjutnyaTabunganUmum}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setSetoranMinimalSelanjutnyaTabunganUmum(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Suku Bunga Tab. Umum (%) :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={sukuBungaTabunganUmum}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setSukuBungaTabunganUmum(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
              <Box sx={[showDataWrapper, secondWrapper]}></Box>
            </Box>

            <hr />
            <Box sx={showDataContainer}>
              <Box sx={showDataWrapper}>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Batas Min. Validasi Pembukaan Tab. Umum :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={batasMinValidasiPembukaanTab}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setBatasMinValidasiPembukaanTab(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Batas Min. Validasi Setoran Tab. Umum :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={batasMinValidasiSetoranTab}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setBatasMinValidasiSetoranTab(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" style={textRightSmall}>
                        Batas Min. Validasi Tarik Tab. Umum :
                      </Form.Label>
                      <Col sm="8">
                        <NumericFormat
                          value={batasMinValidasiTarikTab}
                          thousandSeparator
                          customInput={Form.Control}
                          onValueChange={(values) => {
                            setBatasMinValidasiTarikTab(values.formattedValue);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Box>
              <Box sx={[showDataWrapper, secondWrapper]}></Box>
            </Box>

            <Box>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/setting")} sx={{ marginRight: 2 }}>
                {"< Kembali"}
              </Button>
              <Button variant="contained" startIcon={<EditIcon />} type="submit">
                Edit
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

export default UbahSetting;

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
