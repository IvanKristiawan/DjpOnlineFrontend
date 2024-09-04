import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import {
  Box,
  Alert,
  Button,
  Snackbar,
  Autocomplete,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";

const TambahWilayah = () => {
  const [isFetchError, setIsFetchError] = useState(false);
  const { screenSize } = useStateContext();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [namaWilayah, setNamaWilayah] = useState("");
  const [kodeWilayah, setKodeWilayah] = useState("");
  const [singkatanWilayah, setSingkatanWilayah] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getWilayahNextKode();
  }, []);

  const getWilayahNextKode = async () => {
    const response = await axios.post(`${tempUrl}/nextKodeWilayah`, {
      _id: user.id,
      token: user.token,
    });
    setKodeWilayah(response.data);
  };

  const saveWilayah = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setLoading(true);
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveWilayah`, {
          namaWilayah,
          kodeWilayah,
          singkatanWilayah,
          userIdInput: user.id,
          _id: user.id,
          token: user.token,
        });
        setLoading(false);
        navigate("/wilayah");
      } catch (error) {
        alert(error.response.data.message);
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

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  const textRight = {
    textAlign: screenSize >= 650 && "right",
  };

  return (
    <Container>
      <h3>Master</h3>
      <h5 style={{ fontWeight: 400 }}>Tambah Wilayah</h5>
      <hr />
      <Card>
        <Card.Header>Wilayah</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={saveWilayah}>
            <Row>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="5" style={textRight}>
                    Kode Wilayah :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      disabled
                      value={kodeWilayah}
                      onChange={(e) =>
                        setKodeWilayah(e.target.value.toUpperCase())
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
                  <Form.Label column sm="5" style={textRight}>
                    Nama Wilayah <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      value={namaWilayah}
                      onChange={(e) =>
                        setNamaWilayah(e.target.value.toUpperCase())
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
                  <Form.Label column sm="5" style={textRight}>
                    Singkatan Wilayah <b style={colorRed}>*</b> :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      value={singkatanWilayah}
                      onChange={(e) =>
                        setSingkatanWilayah(e.target.value.toUpperCase())
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Box sx={spacingTop}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/wilayah")}
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

export default TambahWilayah;

const colorRed = {
  color: "red",
};

const spacingTop = {
  mt: 4,
};

const alertBox = {
  width: "100%",
};
