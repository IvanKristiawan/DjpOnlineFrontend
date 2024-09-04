import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { formatDate } from "../../../constants/helper";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Box, Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TampilSetting = () => {
  const { screenSize } = useStateContext();
  const { user, setting } = useContext(AuthContext);
  const [settingId, setSettingId] = useState("");
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
  const [tglUbahSimpananWajib, setTglUbahSimpananWajib] = useState("");
  const [simpananPokok, setSimpananPokok] = useState("");
  const [tglUbahSimpananPokok, setTglUbahSimpananPokok] = useState("");
  const [tglRapatTahunan, setTglRapatTahunan] = useState("");

  // Tabungan
  const [setoranMinimalTabunganUmum, setSetoranMinimalTabunganUmum] = useState("");
  const [setoranMinimalSelanjutnyaTabunganUmum, setSetoranMinimalSelanjutnyaTabunganUmum] = useState("");
  const [sukuBungaTabunganUmum, setSukuBungaTabunganUmum] = useState("");

  const [batasMinValidasiPembukaanTab, setBatasMinValidasiPembukaanTab] = useState(
    `${setting.batasMinValidasiPembukaanTab}`
  );
  const [batasMinValidasiSetoranTab, setBatasMinValidasiSetoranTab] = useState(`${setting.batasMinValidasiSetoranTab}`);
  const [batasMinValidasiTarikTab, setBatasMinValidasiTarikTab] = useState(`${setting.batasMinValidasiTarikTab}`);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSettingByCabang();
  }, []);

  const getSettingByCabang = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${tempUrl}/lastSetting`, {
        _id: user.id,
        token: user.token,
      });
      setSettingId(response.data.id);
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
      setTglUbahSimpananWajib(formatDate(response.data.tglUbahSimpananWajib));
      setSimpananPokok(response.data.simpananPokok.toLocaleString("en-US"));
      setTglUbahSimpananPokok(formatDate(response.data.tglUbahSimpananPokok));
      setTglRapatTahunan(formatDate(response.data.tglRapatTahunan));

      // Tabungan
      setSetoranMinimalTabunganUmum(response.data.setoranMinimalTabunganUmum.toLocaleString("en-US"));
      setSetoranMinimalSelanjutnyaTabunganUmum(
        response.data.setoranMinimalSelanjutnyaTabunganUmum.toLocaleString("en-US")
      );
      setSukuBungaTabunganUmum(response.data.sukuBungaTabunganUmum.toLocaleString("en-US"));

      setBatasMinValidasiPembukaanTab(response.data.batasMinValidasiPembukaanTab.toLocaleString("en-US"));
      setBatasMinValidasiSetoranTab(response.data.batasMinValidasiSetoranTab.toLocaleString("en-US"));
      setBatasMinValidasiTarikTab(response.data.batasMinValidasiTarikTab.toLocaleString("en-US"));
    } catch (error) {
      alert(error);
    }
    setLoading(false);
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
      <h5 style={{ fontWeight: 400 }}>Setting</h5>
      <Container className="d-flex justify-content-center">
        <ButtonGroup variant="contained">
          <Button
            color="primary"
            startIcon={<EditIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => {
              navigate(`/setting/${settingId}/edit`);
            }}
          >
            Ubah Setting
          </Button>
        </ButtonGroup>
      </Container>
      <hr />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="4" style={textRight}>
                  Nama Program :
                </Form.Label>
                <Col sm="8">
                  <Form.Control value={namaProgram} disabled readOnly />
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
                  <Form.Control value={alamatPerusahaan} disabled readOnly />
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
                  <Form.Control value={kabupatenPerusahaan} disabled readOnly />
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
                  <Form.Control value={teleponPerusahaan} disabled readOnly />
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
                  <Form.Control value={namaPerusahaan} disabled readOnly />
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
                  <Form.Control value={kotaPerusahaan} disabled readOnly />
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
                  <Form.Control value={provinsiPerusahaan} disabled readOnly />
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
                  <Form.Control value={direkturUtama} disabled readOnly />
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
                  <Form.Control as="textarea" rows={2} value={bendahara1} disabled readOnly />
                </Col>
                <Col sm="4">
                  <Form.Control as="textarea" rows={2} value={bendahara1Keterangan} disabled readOnly />
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
                  <Form.Control as="textarea" rows={2} value={manager} disabled readOnly />
                </Col>
                <Col sm="4">
                  <Form.Control as="textarea" rows={2} value={managerKeterangan} disabled readOnly />
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
          {" "}
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="4" style={textRightSmall}>
                  Simpanan Wajib :
                </Form.Label>
                <Col sm="4">
                  <Form.Control value={simpananWajib} disabled readOnly />
                </Col>
                <Col sm="4">
                  <Form.Control value={tglUbahSimpananWajib} disabled readOnly />
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
                <Col sm="4">
                  <Form.Control value={simpananPokok} disabled readOnly />
                </Col>
                <Col sm="4">
                  <Form.Control value={tglUbahSimpananPokok} disabled readOnly />
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
                  <Form.Control value={tglRapatTahunan} disabled readOnly />
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
                  <Form.Control value={setoranMinimalTabunganUmum} disabled readOnly />
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
                  <Form.Control value={setoranMinimalSelanjutnyaTabunganUmum} disabled readOnly />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="4" style={textRightSmall}>
                  Suku Bunga Tab. Umum :
                </Form.Label>
                <Col sm="8">
                  <Form.Control value={`${sukuBungaTabunganUmum} %`} disabled readOnly />
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
                  <Form.Control value={batasMinValidasiPembukaanTab} disabled readOnly />
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
                  <Form.Control value={batasMinValidasiSetoranTab} disabled readOnly />
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
                  <Form.Control value={batasMinValidasiTarikTab} disabled readOnly />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Box>
        <Box sx={[showDataWrapper, secondWrapper]}></Box>
      </Box>
    </Container>
  );
};

export default TampilSetting;

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
