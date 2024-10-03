import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, Petunjuk, Loader, MenuProfil } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import { default as PetunjukPengisianProfil } from "./PetunjukPengisianProfil";
import "../../constants/defaultProgram.css";
import { Card, Button, Form } from "react-bootstrap";
import {
  Paper,
  Autocomplete,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function Profil() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  // Data Utama
  const [npwp15, setNpwp15] = useState(user.npwp15);
  const [nikNpwp16, setNikNpwp16] = useState(user.nikNpwp16);
  const [nitku, setNitku] = useState(user.nitku);
  const [nama, setNama] = useState(user.nama);
  const [bentukBadan, setBentukBadan] = useState(user.bentukBadan);
  // Data Lainnya
  const [alamat, setAlamat] = useState(user.alamat);
  const [nomorTelepon, setNomorTelepon] = useState(user.nomorTelepon);
  const [email, setEmail] = useState(user.email);
  // Data KLU
  const [uraianKlu, setUraianKlu] = useState(
    user.kelompokkegiatanekonomiklu.namaKelompokKegiatanEkonomiKlu
  );
  const [kluUtama, setKluUtama] = useState(
    `${user.kelompokkegiatanekonomiklu.kodeKelompokKegiatanEkonomiKlu} - ${user.kelompokkegiatanekonomiklu.namaKelompokKegiatanEkonomiKlu}`
  );
  const [kodeKelompokKegiatanEkonomiKlu, setKodeKelompokKegiatanEkonomiKlu] =
    useState(
      `${user.kelompokkegiatanekonomiklu.kodeKelompokKegiatanEkonomiKlu} - ${user.kelompokkegiatanekonomiklu.namaKelompokKegiatanEkonomiKlu}`
    );
  const [
    kodeKelompokKegiatanEkonomiKluLama,
    setKodeKelompokKegiatanEkonomiKluLama,
  ] = useState(
    `${user.kelompokkegiatanekonomiklu.kodeKelompokKegiatanEkonomiKlu} - ${user.kelompokkegiatanekonomiklu.namaKelompokKegiatanEkonomiKlu}`
  );
  // Info Perpajakan
  const [kppAdministrasi, setKppAdministrasi] = useState(user.kppAdministrasi);
  const [noTeleponKpp, setNoTeleponKpp] = useState(user.noTeleponKpp);
  const [accountRepresentative, setAccountRepresentative] = useState(
    user.accountRepresentative
  );
  const [statusWp, setStatusWp] = useState(user.statusWp);
  const [statusPkp, setStatusPkp] = useState(user.statusPkp);
  // Identitas Penanggung Jawab
  const [namaPenanggungJawab, setNamaPenanggungJawab] = useState(
    user.namaPenanggungJawab
  );
  const [nikPenanggungJawab, setNikPenanggungJawab] = useState(
    user.nikPenanggungJawab
  );
  const [npwpPenanggungJawab, setNpwpPenanggungJawab] = useState(
    user.npwpPenanggungJawab
  );
  const [jabatanPenanggungJawab, setJabatanPenanggungJawab] = useState(
    user.jabatanPenanggungJawab
  );
  const [kebangsaanPenanggungJawab, setKebangsaanPenanggungJawab] = useState(
    user.kebangsaanPenanggungJawab
  );
  const [alamatPjBadanPenanggungJawab, setAlamatPjBadanPenanggungJawab] =
    useState(user.alamatPjBadanPenanggungJawab);
  // Dokumen Pendirian
  const [nomorAkta, setNomorAkta] = useState(user.nomorAkta);
  const [tempatAkta, setTempatAkta] = useState(user.tempatAkta);
  const [namaNotaris, setNamaNotaris] = useState(user.namaNotaris);
  const [nomorAktaPerubahan, setNomorAktaPerubahan] = useState(
    user.nomorAktaPerubahan
  );

  // Akses Kewajiban Perpajakan
  const [pphPasal25, setPphPasal25] = useState(
    user.kewajibanPerpajakan.pphPasal25
  );
  const [pphPasal29, setPphPasal29] = useState(
    user.kewajibanPerpajakan.pphPasal29
  );
  const [pphFinal, setPphFinal] = useState(user.kewajibanPerpajakan.pphFinal);
  const [pphPasal4Ayat2, setPphPasal4Ayat2] = useState(
    user.kewajibanPerpajakan.pphPasal4Ayat2
  );
  const [pphPasal15, setPphPasal15] = useState(
    user.kewajibanPerpajakan.pphPasal15
  );
  const [pphPasal19, setPphPasal19] = useState(
    user.kewajibanPerpajakan.pphPasal19
  );
  const [pphPasal21, setPphPasal21] = useState(
    user.kewajibanPerpajakan.pphPasal21
  );
  const [pphPasal23, setPphPasal23] = useState(
    user.kewajibanPerpajakan.pphPasal23
  );
  const [pphPasal26, setPphPasal26] = useState(
    user.kewajibanPerpajakan.pphPasal26
  );

  const [menuProfil, setMenuProfil] = useState("Data Utama");

  const [kelompokKegiatanEkonomiKlus, setKelompokKegiatanEkonomiKlus] =
    useState([]);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  let kelompokKegiatanEkonomiKlusOptions = kelompokKegiatanEkonomiKlus.map(
    (kelompokKegiatanEkonomiKlus) => ({
      label: `${kelompokKegiatanEkonomiKlus.kodeKelompokKegiatanEkonomiKlu} - ${kelompokKegiatanEkonomiKlus.namaKelompokKegiatanEkonomiKlu}`,
    })
  );

  useEffect(() => {
    getKelompokKegiatanEkonomiKluData();
  }, []);

  const getKelompokKegiatanEkonomiKluData = async () => {
    const response = await axios.post(
      `${tempUrl}/kelompokKegiatanEkonomiKlus`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    setKelompokKegiatanEkonomiKlus(response.data);
  };

  const inputWrapper = {
    marginTop: screenSize >= 1000 && "40px",
    paddingLeft: screenSize >= 1000 && "10px",
    paddingRight: screenSize >= 1000 && "10px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
  };

  const warningContainer = {
    border: "2px solid #ffb822",
    boxShadow: "0 0 0 rgba(204,169,44, 0.4)",
    animation: "pulse 1s infinite",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    paddingBottom: "5px",
    marginBottom: "20px",
    paddingLeft: screenSize <= 900 && "10px",
    paddingRight: screenSize <= 900 && "10px",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "0px 80px 100px 100px" : "80px 10px 40px 10px",
    padding: screenSize >= 900 ? "20px 50px 20px 20px" : "20px 20px 20px 20px",
    display: screenSize >= 900 && "flex",
    justifyContent: screenSize >= 900 && "space-around",
    background: "#EBECF1",
  };

  const profilWrapper2 = {
    flex: 1,
    marginLeft: screenSize >= 600 && "20px",
  };

  const inputButtonWrapper = {
    marginTop: screenSize >= 900 ? "40px" : "16px",
  };

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  const updateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setLoading(true);
      try {
        await axios.post(`${tempUrl}/users/${user.id}`, {
          // Data KLU
          kodeKelompokKegiatanEkonomiKlu: kodeKelompokKegiatanEkonomiKlu.split(
            " -",
            1
          )[0],

          cabangId: user.kodeCabang,
          _id: user.id,
          token: user.token,
        });

        dispatch({ type: "LOGOUT" });
        navigate("/");
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

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenu activeLink={"profil"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <MenuProfil menuActive={"Data Profil"} />
          <Petunjuk
            width={"350px"}
            titlePetunjuk={"Petunjuk"}
            PetunjukPengisianComponent={PetunjukPengisianProfil}
          />
        </div>
        <div style={inputContainer}>
          <div style={warningContainer}>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              "Apabila terdapat data yang tidak sesuai, silakan menghubungi KPP
              Administrasi"
            </p>
          </div>
          <Card>
            <Card.Header style={inputTitle}>
              <PersonIcon /> Data Profil
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
              <div style={profilMenuContainer}>
                <div style={profilMenuWrapper}>
                  {menuProfil === "Data Utama" ? (
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data Utama")}
                    >
                      <PermIdentityIcon /> Data Utama
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data Utama")}
                    >
                      <PermIdentityIcon /> Data Utama
                    </div>
                  )}
                  {menuProfil === "Data Lainnya" ? (
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data Lainnya")}
                    >
                      <PinDropIcon /> Data Lainnya
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data Lainnya")}
                    >
                      <PinDropIcon /> Data Lainnya
                    </div>
                  )}
                  {menuProfil === "Data KLU" ? (
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data KLU")}
                    >
                      <ViewInArIcon /> Data KLU
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Data KLU")}
                    >
                      <ViewInArIcon /> Data KLU
                    </div>
                  )}
                  {menuProfil === "Info Perpajakan" ? (
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Info Perpajakan")}
                    >
                      <InfoOutlinedIcon /> Info Perpajakan
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      style={{ marginRight: "10px" }}
                      onClick={() => setMenuProfil("Info Perpajakan")}
                    >
                      <InfoOutlinedIcon /> Info Perpajakan
                    </div>
                  )}
                  {menuProfil === "Identitas Penanggung Jawab" ? (
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                      onClick={() =>
                        setMenuProfil("Identitas Penanggung Jawab")
                      }
                    >
                      <PeopleAltOutlinedIcon /> Identitas Penanggung Jawab
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      style={{ marginRight: "10px" }}
                      onClick={() =>
                        setMenuProfil("Identitas Penanggung Jawab")
                      }
                    >
                      <PeopleAltOutlinedIcon /> Identitas Penanggung Jawab
                    </div>
                  )}
                  {menuProfil === "Dokumen Pendirian" ? (
                    <div
                      className="menu-data-profil-text-active"
                      onClick={() => setMenuProfil("Dokumen Pendirian")}
                    >
                      <DescriptionOutlinedIcon /> Dokumen Pendirian
                    </div>
                  ) : (
                    <div
                      className="menu-data-profil-text"
                      onClick={() => setMenuProfil("Dokumen Pendirian")}
                    >
                      <DescriptionOutlinedIcon /> Dokumen Pendirian
                    </div>
                  )}
                </div>
              </div>
              {menuProfil === "Data Utama" && (
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>NPWP15</div>
                      <div>
                        <Form.Control value={npwp15} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>NIK/NPWP16</div>
                      <div>
                        <Form.Control value={nikNpwp16} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>NITKU</div>
                      <div>
                        <Form.Control value={nitku} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Jenis Usaha</div>
                      <div>
                        <Form.Control value={uraianKlu} disabled />
                      </div>
                    </div>
                  </div>
                  <div style={profilWrapper2}>
                    {screenSize >= 600 && (
                      <div style={{ visibility: "hidden" }}>
                        <div style={{ marginBottom: "5px" }}>Nama</div>
                        <div>
                          <Form.Control value={npwp15} disabled />
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Nama</div>
                      <div>
                        <Form.Control value={nama} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Bentuk Badan</div>
                      <div>
                        <Form.Control value={bentukBadan} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {menuProfil === "Data Lainnya" && (
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>
                        Alamat Tempat Kedudukan
                      </div>
                      <div>
                        <Form.Control
                          value={alamat}
                          as="textarea"
                          rows={3}
                          disabled
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Nomor Handphone</div>
                      <div>
                        <Form.Control value={nomorTelepon} disabled />
                      </div>
                    </div>
                  </div>
                  <div style={profilWrapper2}>
                    {screenSize >= 600 && (
                      <div style={{ visibility: "hidden" }}>
                        <div style={{ marginBottom: "5px" }}>Nama</div>
                        <div>
                          <Form.Control
                            value={alamat}
                            as="textarea"
                            rows={3}
                            disabled
                          />
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>
                        Email DJP Online
                      </div>
                      <div>
                        <Form.Control value={email} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {menuProfil === "Data KLU" && (
                <>
                  <div style={inputWrapper}>
                    <div style={profilWrapper}>
                      <div>
                        <div style={{ marginBottom: "5px" }}>
                          Status Validitas Data KLU
                        </div>
                        <div>
                          <Form.Control value={npwp15} disabled />
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ marginBottom: "5px" }}>Uraian KLU</div>
                        <div>
                          <Form.Control value={uraianKlu} disabled />
                        </div>
                      </div>
                    </div>
                    <div style={profilWrapper2}>
                      <div>
                        <div style={{ marginBottom: "5px" }}>KLU Utama</div>
                        <div>
                          <Form.Control value={kluUtama} disabled />
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ marginBottom: "5px" }}>Kode KLU</div>
                        <div>
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={kelompokKegiatanEkonomiKlusOptions}
                            renderInput={(params) => (
                              <TextField
                                error={
                                  error &&
                                  kodeKelompokKegiatanEkonomiKlu.length === 0 &&
                                  true
                                }
                                size="small"
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setKodeKelompokKegiatanEkonomiKlu(value);
                              setUraianKlu(value.split(" -", 2)[1]);
                            }}
                            inputValue={kodeKelompokKegiatanEkonomiKlu}
                            onChange={(e, value) =>
                              setKodeKelompokKegiatanEkonomiKluLama(value)
                            }
                            value={kodeKelompokKegiatanEkonomiKluLama}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={inputButtonWrapper}>
                    <hr />
                    <div style={inputButtonContainer}>
                      <button
                        className="blank-button"
                        style={{ marginRight: "4px" }}
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <ReplayIcon style={{ marginRight: "4px" }} />
                        Batal
                      </button>
                      <button
                        className="hover-button"
                        onClick={() => {
                          handleClickOpenConfirmation();
                        }}
                      >
                        <DescriptionIcon style={{ marginRight: "4px" }} />
                        Submit
                      </button>
                    </div>
                  </div>
                  <Dialog
                    open={openConfirmation}
                    onClose={handleCloseConfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
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
                            <HelpOutlineIcon
                              color="primary"
                              sx={{ fontSize: 80 }}
                            />
                          </div>
                          <b>Apakah Anda yakin ingin mengubah?</b>
                        </div>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Dengan ini Anda menyatakan bahwa data yang ingin
                          diubah adalah benar
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="warning"
                          style={{ paddingTop: "10px" }}
                          onClick={handleCloseConfirmation}
                        >
                          Tidak
                        </Button>
                        <button
                          className="hover-button"
                          style={{ paddingLeft: "15px", paddingRight: "15px" }}
                          onClick={updateUser}
                        >
                          Ya
                        </button>
                      </DialogActions>
                    </div>
                  </Dialog>
                </>
              )}
              {menuProfil === "Info Perpajakan" && (
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>
                        KPP Administrasi
                      </div>
                      <div>
                        <Form.Control value={kppAdministrasi} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>
                        Nomor Telepon KPP
                      </div>
                      <div>
                        <Form.Control value={noTeleponKpp} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>
                        Account Representative
                      </div>
                      <div>
                        <Form.Control value={accountRepresentative} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Status WP</div>
                      <div>
                        <Form.Control value={statusWp} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Status PKP</div>
                      <div>
                        <Form.Control value={statusPkp} disabled />
                      </div>
                    </div>
                  </div>
                  <div style={profilWrapper2}>
                    <div style={{ marginBottom: "5px" }}>
                      Kewajiban Perpajakan
                    </div>
                    <div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal25 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 25</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal29 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 29</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphFinal === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Final</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal4Ayat2 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 4 Ayat 2</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal15 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 15</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal19 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 19</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal21 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 21</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal23 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 23</p>
                      </div>
                      <div style={kewajibanPerpajakanWrapper}>
                        <div>
                          {pphPasal26 === true ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 15, color: "#1dc9b7" }}
                            />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                          )}
                        </div>
                        <p>PPh Pasal 26</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {menuProfil === "Identitas Penanggung Jawab" && (
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>Nama</div>
                      <div>
                        <Form.Control value={namaPenanggungJawab} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>NIK</div>
                      <div>
                        <Form.Control value={nikPenanggungJawab} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>NPWP</div>
                      <div>
                        <Form.Control value={npwpPenanggungJawab} disabled />
                      </div>
                    </div>
                  </div>
                  <div style={profilWrapper2}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>Jabatan</div>
                      <div>
                        <Form.Control value={jabatanPenanggungJawab} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Kebangsaan</div>
                      <div>
                        <Form.Control
                          value={kebangsaanPenanggungJawab}
                          disabled
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Alamat PJ Badan</div>
                      <div>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={alamatPjBadanPenanggungJawab}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {menuProfil === "Dokumen Pendirian" && (
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div>
                      <div style={{ marginBottom: "5px" }}>Nomor Akta</div>
                      <div>
                        <Form.Control value={nomorAkta} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Tempat Akta</div>
                      <div>
                        <Form.Control value={tempatAkta} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>Nama Notaris</div>
                      <div>
                        <Form.Control value={namaNotaris} disabled />
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "5px" }}>
                        Nomor Akta Perubahan
                      </div>
                      <div>
                        <Form.Control value={nomorAktaPerubahan} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Paper>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Profil;

const profilMenuContainer = {
  borderBottom: "1px solid rgba(255,184,34,0.1)",
  borderBottomColor: "rgba(255,184,34,0.1)",
};

const profilMenuWrapper = {
  display: "flex",
  flexWrap: "wrap",
};

const profilWrapper = {
  flex: 1,
};

const alertBox = {
  width: "100%",
};

const inputButtonContainer = {
  display: "flex",
  justifyContent: "flex-end",
};

const kewajibanPerpajakanWrapper = {
  display: "flex",
  height: "30px",
};
