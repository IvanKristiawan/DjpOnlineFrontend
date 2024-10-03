import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu } from "../../components/index";
import { HeaderInfo, PetunjukPengisian } from "../../components/index";
import "../../constants/defaultProgram.css";
import { Card, InputGroup, Button, Form, Row, Col } from "react-bootstrap";
import { Paper, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import CaptchaImage from "../../assets/Captcha Image.jpeg";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReplayIcon from "@mui/icons-material/Replay";
import DescriptionIcon from "@mui/icons-material/Description";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <ol>
      <li>
        Pastikan Anda masih menyimpan EFIN (Electronic Filling Identification
        Number) yang diberikan oleh Kantor Pelayanan Pajak (KPP).
      </li>
      <li>
        Jika Anda lupa atau tidak menyimpan EFIN, silakan menelepon ke Kring
        Pajak 1500200 dengan menyiapkan NPWP dan konfirmasi data diri, atau
        melakukan live chatting dengan agen Chat Pajak pada laman
        www.pajak.go.id, atau bertanya lewat Twitter dengan me-mention akun
        Twitter @kring_pajak, atau meminta pencetakan ulang EFIN di KPP
        terdekat.
      </li>
      <li>
        Anda dapat mengubah email untuk menerima kata sandi baru, jika
        menghendakinya dengan memilih "YA" pada pilihan "Lupa Email?"
      </li>
      <li>
        Jika Anda mengubah email, maka kata sandi akan dikirimkan ke email Anda
        yang baru, dan email tersebut selanjutnya akan digunakan oleh sistem
        untuk mengirimkan pesan kepada Anda
      </li>
    </ol>
  );
};

function LupaPassword() {
  const { screenSize } = useStateContext();
  const [npwp15, setNpwp15] = useState("");
  const [efinVisible, setEfinVisible] = useState(false);
  const [efin, setEfin] = useState("");
  const [lupaEmail, setLupaEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [kodeKeamanan, setKodeKeamanan] = useState("");
  const navigate = useNavigate();

  const { error, dispatch } = useContext(AuthContext);

  // Toggle visibility
  const toggleEfinVisibility = () => {
    setEfinVisible(!efinVisible);
  };

  const inputWrapper = {
    paddingLeft: screenSize >= 1000 && "100px",
    paddingRight: screenSize >= 1000 && "100px",
    color: Colors.grey700,
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "80px 80px 100px 100px" : "80px 10px 40px 10px",
    padding: screenSize >= 900 ? "20px 50px 20px 20px" : "20px 20px 20px 20px",
    display: screenSize >= 900 && "flex",
    justifyContent: screenSize >= 900 && "space-around",
  };

  const inputButtonWrapper = {
    marginTop: screenSize >= 900 ? "100px" : "16px",
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
      <HeaderInfo />
      <Paper elevation={4} style={paperStyle}>
        <PetunjukPengisian
          defaultCollapse={false}
          width={"240px"}
          titlePetunjuk={"Permohonan Ubah Kata Sandi"}
          PetunjukPengisianComponent={PetunjukPengisianComponent}
        />
        <Card style={inputContainer}>
          <Card.Header style={inputTitle}>
            <LockIcon /> Permohonan Ubah Kata Sandi
          </Card.Header>
          <Card.Body>
            <div style={inputWrapper}>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3">
                      NPWP*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        required
                        placeholder="Masukkan Nomor Pokok Wajib Pajak"
                        value={npwp15}
                        onChange={(e) =>
                          setNpwp15(e.target.value.toUpperCase())
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3">
                      EFIN*
                    </Form.Label>
                    <Col sm="9">
                      <InputGroup>
                        <Form.Control
                          required
                          type={efinVisible ? "text" : "password"}
                          placeholder="Masukkan Nomor EFIN Anda"
                          value={efin}
                          onChange={(e) =>
                            setEfin(e.target.value.toUpperCase())
                          }
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={toggleEfinVisibility}
                          className="no-hover"
                        >
                          {efinVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </Button>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3">
                      Lupa Email?
                    </Form.Label>
                    <Col sm="2">
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={lupaEmail} />}
                          label="Ya"
                          onChange={() => setLupaEmail(!lupaEmail)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="7">
                      <Form.Control
                        required
                        placeholder="Masukkan Email Baru Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toUpperCase())}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3">
                      Kode Keamanan*
                    </Form.Label>
                    <Col sm="2">
                      <img
                        src={CaptchaImage}
                        alt="CaptchaImage"
                        style={{ width: "100px" }}
                      />
                    </Col>
                    <Col sm="7">
                      <Form.Control
                        required
                        placeholder="Masukkan Kode Keamanan"
                        value={kodeKeamanan}
                        onChange={(e) =>
                          setKodeKeamanan(e.target.value.toUpperCase())
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div style={inputButtonWrapper}>
              <hr />
              <div style={inputButtonContainer}>
                <button
                  className="blank-button"
                  type="submit"
                  style={{ marginRight: "4px" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ReplayIcon style={{ marginRight: "4px" }} />
                  Batal
                </button>
                <button className="hover-button" type="submit">
                  <DescriptionIcon style={{ marginRight: "4px" }} />
                  Submit
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Paper>
    </div>
  );
}

export default LupaPassword;

const inputButtonContainer = {
  display: "flex",
  justifyContent: "flex-end",
};
