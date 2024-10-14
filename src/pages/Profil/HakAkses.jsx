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
import { Card, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import {
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import InfoIcon from "@mui/icons-material/Info";
import ReplayIcon from "@mui/icons-material/Replay";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function HakAkses() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  // FITUR PRALAPOR
  const [eBupot2126, setEBupot2126] = useState(user.akses.eBupot2126);
  const [eBupotUnifikasi, setEBupotUnifikasi] = useState(
    user.akses.eBupotUnifikasi
  );
  const [eBupotPphPasal2326, setEBupotPphPasal2326] = useState(
    user.akses.eBupotPphPasal2326
  );
  // FITUR LAPOR LAINNYA
  const [pbb, setPbb] = useState(user.akses.pbb);
  // FITUR LAYANAN
  const [programPengungkapanSukarela, setProgramPengungkapanSukarela] =
    useState(user.akses.programPengungkapanSukarela);
  const [ePbk, setEPbk] = useState(user.akses.ePbk);
  const [fasilitasDanInsentif, setFasilitasDanInsentif] = useState(
    user.akses.fasilitasDanInsentif
  );
  const [ePspt, setEPspt] = useState(user.akses.ePspt);
  const [eCbcr, setECbcr] = useState(user.akses.eCbcr);
  const [eObjection, setEObjection] = useState(user.akses.eObjection);
  const [ePhtb, setEPhtb] = useState(user.akses.ePhtb);
  const [eSkd, setESkd] = useState(user.akses.eSkd);
  const [eSktd, setESktd] = useState(user.akses.eSktd);
  const [infoKswp, setInfoKswp] = useState(user.akses.infoKswp);
  const [portalLayanan, setPortalLayanan] = useState(user.akses.portalLayanan);
  const [rumahKonfirmasi, setRumahKonfirmasi] = useState(
    user.akses.rumahKonfirmasi
  );
  const [eReportingInvestasi, setEReportingInvestasi] = useState(
    user.akses.eReportingInvestasi
  );
  const [eReportingFasilitasDanInsentif, setEReportingFasilitasDanInsentif] =
    useState(user.akses.eReportingFasilitasDanInsentif);
  const [penyusutanDanAmortisasi, setPenyusutanDanAmortisasi] = useState(
    user.akses.penyusutanDanAmortisasi
  );

  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(0);

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickOpenConfirmation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const renderTooltipEBupot2126 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-Bupot 21/26</p>
        <hr />
        <p>
          Aplikasi Bukti Potong dan Pelaporan SPT Masa 21/26 secara elektronik.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipEBupotUnifikasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-Bupot Unifikasi</p>
        <hr />
        <p>
          Aplikasi Bukti Potong dan Pelaporan SPT Masa Unifikasi secara
          elektronik.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipEBupotPphPasal2326 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-Bupot PPh Pasal 23/26</p>
        <hr />
        <p>
          Sarana Pembuatan Bukti Pemotongan dan pelaporan SPT secara elektronik
          bagi para Pemotong Pajak.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipPbb = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>PBB</p>
        <hr />
        <p>
          Salah Satu Kanal Pemenuhan hak dan kewajiban PBB bagi Wajib Pajak
          secara elektronik.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipProgramPengungkapanSukarela = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Program Pengungkapan Sukarela</p>
        <hr />
        <p>Aplikasi Program Pengungkapan Sukarela Wajib Pajak.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipEPbk = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-PBK</p>
        <hr />
        <p>Permohonan pemindahbukuan secara elektronik.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipFasilitasDanInsentif = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Fasilitas & Insentif</p>
        <hr />
        <p>Permohonan Pemanfaatan Fasilitas dan Insentif Pajak.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipEPspt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-PSPT</p>
        <hr />
        <p>Pemberitahuan perpanjangan SPT Tahunan.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipECbcr = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-CBCR</p>
        <hr />
        <p>
          Cara menyampaikan notifikasi dan laporan per negara secara elektronik.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipEObjection = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-Objection</p>
        <hr />
        <p>Pengajuan keberatan secara elektronik.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipEPhtb = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-PHTB</p>
        <hr />
        <p>
          Aplikasi Permohonan Penelitian Bukti Pemenuhan Kewajiban Penyetoran
          PPHTB.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipESkd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-SKD</p>
        <hr />
        <p>
          Aplikasi perekaman surat keterangan domisili / persetujuan
          penghindaran pajak berganda.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipESktd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>e-SKTD</p>
        <hr />
        <p>
          Aplikasi penyampaian permohonan Surat Keterangan Tidak Dipungut bagi
          pengusaha yang melakukan impor atau penyerahan Barang/Jasa Kena Pajak
          (BKP/JKP) alat angkutan tertentu.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipInfoKswp = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Info KSWP</p>
        <hr />
        <p>Informasi terkait Konfirmasi Status Wajib Pajak.</p>
      </div>
    </Tooltip>
  );

  const renderTooltipPortalLayanan = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Portal Layanan</p>
        <hr />
        <p>
          Portal layanan merupakan portal khusus bagi Wajib Pajak untuk
          mendapatkan layanan online secara mandiri. Layanan yang tersedia saat
          ini yaitu Pengungkapan Permohonan Ketidakbenaran Perbuatan.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipRumahKonfirmasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Rumah Konfirmasi</p>
        <hr />
        <p>
          Aplikasi yang digunakan untuk melakukan konfirmasi validitas dokumen
          perpajakan yang diterbitkan oleh Direktorat Jenderal Pajak.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipEReportingInvestasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>eReporting Investasi</p>
        <hr />
        <p>
          Aplikasi penyampaian laporan realisasi investasi sesuai UU Cipta
          Kerja.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipEReportingFasilitasDanInsentif = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>eReporting Fasilitas & Insentif</p>
        <hr />
        <p>
          Aplikasi penyampaian laporan realisasi investasi pemanfaatan fasilitas
          dan insentif pajak.
        </p>
      </div>
    </Tooltip>
  );

  const renderTooltipPenyusutanDanAmortisasi = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ textAlign: "start" }}>
        <p>Penyusutan dan Amortisasi</p>
        <hr />
        <p>Pelaporan Penyusutan dan Amortisasi Aset Wajib Pajak.</p>
      </div>
    </Tooltip>
  );

  const updateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setLoading(true);
      try {
        await axios.post(`${tempUrl}/updateUserHakAkses/${user.id}`, {
          akses: {
            // FITUR PRALAPOR
            eBupot2126,
            eBupotUnifikasi,
            eBupotPphPasal2326,
            // FITUR LAPOR LAINNYA
            pbb,
            // FITUR LAYANAN
            programPengungkapanSukarela,
            ePbk,
            fasilitasDanInsentif,
            ePspt,
            eCbcr,
            eObjection,
            ePhtb,
            eSkd,
            eSktd,
            infoKswp,
            portalLayanan,
            rumahKonfirmasi,
            eReportingInvestasi,
            eReportingFasilitasDanInsentif,
            penyusutanDanAmortisasi,
          },
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

  const inputWrapper = {
    paddingLeft: screenSize >= 1000 && "10px",
    paddingRight: screenSize >= 1000 && "10px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
  };

  const inputWrapperTable = {
    paddingTop: screenSize >= 1000 && "40px",
    paddingLeft: screenSize >= 1000 && "10px",
    paddingRight: screenSize >= 1000 && "10px",
    color: Colors.grey700,
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
  };

  const profilWrapper2 = {
    flex: 1,
    marginLeft: screenSize >= 600 && "20px",
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
          <MenuProfil menuActive={"Aktivasi Fitur"} />
          <Petunjuk
            width={"350px"}
            titlePetunjuk={"Petunjuk"}
            PetunjukPengisianComponent={PetunjukPengisianProfil}
          />
        </div>
        <div style={inputContainer}>
          <Card>
            <Card.Header style={inputTitle}>
              <PushPinIcon /> Aktivasi Fitur
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column"
                onSubmit={handleClickOpenConfirmation}
              >
                <div style={inputWrapper}>
                  <div style={profilWrapper}>
                    <div style={{ marginBottom: "5px" }}>
                      Aktifkan fitur untuk saya
                    </div>
                    <div>
                      <div style={titleAkses}>
                        Pilih akses untuk menggunakan fitur pralapor
                      </div>
                      <div style={aksesInputWrapper}>
                        <Form.Check
                          type="checkbox"
                          label="e-Bupot 21/26"
                          checked={eBupot2126}
                          onChange={() => setEBupot2126(!eBupot2126)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEBupot2126}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-Bupot Unifikasi"
                          checked={eBupotUnifikasi}
                          onChange={() => setEBupotUnifikasi(!eBupotUnifikasi)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEBupotUnifikasi}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-Bupot PPh Pasal 23/26"
                          checked={eBupotPphPasal2326}
                          onChange={() =>
                            setEBupotPphPasal2326(!eBupotPphPasal2326)
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEBupotPphPasal2326}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={titleAkses}>
                        Pilih akses untuk menggunakan fitur lapor lainnya
                      </div>
                      <div style={aksesInputWrapper}>
                        <Form.Check
                          type="checkbox"
                          label="PBB"
                          checked={pbb}
                          onChange={() => setPbb(!pbb)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipPbb}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={titleAkses}>
                        Pilih akses untuk menggunakan fitur layanan
                      </div>
                      <div style={aksesInputWrapper}>
                        <Form.Check
                          type="checkbox"
                          label="Program Pengungkapan Sukarela"
                          checked={programPengungkapanSukarela}
                          onChange={() =>
                            setProgramPengungkapanSukarela(
                              !programPengungkapanSukarela
                            )
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipProgramPengungkapanSukarela}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-PBK"
                          checked={ePbk}
                          onChange={() => setEPbk(!ePbk)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEPbk}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="Fasilitas & Insentif"
                          checked={fasilitasDanInsentif}
                          onChange={() =>
                            setFasilitasDanInsentif(!fasilitasDanInsentif)
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipFasilitasDanInsentif}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-PSPT"
                          checked={ePspt}
                          onChange={() => setEPspt(!ePspt)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEPspt}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-CBCR"
                          checked={eCbcr}
                          onChange={() => setECbcr(!eCbcr)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipECbcr}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-Objection"
                          checked={eObjection}
                          onChange={() => setEObjection(!eObjection)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEObjection}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-PHTB"
                          checked={ePhtb}
                          onChange={() => setEPhtb(!ePhtb)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEPhtb}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-SKD"
                          checked={eSkd}
                          onChange={() => setESkd(!eSkd)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipESkd}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="e-SKTD"
                          checked={eSktd}
                          onChange={() => setESktd(!eSktd)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipESktd}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="Info KSWP"
                          checked={infoKswp}
                          onChange={() => setInfoKswp(!infoKswp)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipInfoKswp}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="Portal Layanan"
                          checked={portalLayanan}
                          onChange={() => setPortalLayanan(!portalLayanan)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipPortalLayanan}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="Rumah Konfirmasi"
                          checked={rumahKonfirmasi}
                          onChange={() => setRumahKonfirmasi(!rumahKonfirmasi)}
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipRumahKonfirmasi}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="eReporting Investasi"
                          checked={eReportingInvestasi}
                          onChange={() =>
                            setEReportingInvestasi(!eReportingInvestasi)
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEReportingInvestasi}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="eReporting Fasilitas & Insentif"
                          checked={eReportingFasilitasDanInsentif}
                          onChange={() =>
                            setEReportingFasilitasDanInsentif(
                              !eReportingFasilitasDanInsentif
                            )
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipEReportingFasilitasDanInsentif}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div style={aksesInputWrapper2}>
                        <Form.Check
                          type="checkbox"
                          label="Penyusutan dan Amortisasi"
                          checked={penyusutanDanAmortisasi}
                          onChange={() =>
                            setPenyusutanDanAmortisasi(!penyusutanDanAmortisasi)
                          }
                        />
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 50 }}
                          overlay={renderTooltipPenyusutanDanAmortisasi}
                        >
                          <div style={infoContainer}>
                            <InfoIcon fontSize="small" style={infoStyle} />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                  <div style={profilWrapper2}></div>
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
                      <ReplayIcon fontSize="small" style={{ marginRight: "4px" }} />
                      Batal
                    </button>
                    <button className="hover-button" type="submit">
                      <DriveFileRenameOutlineIcon
                        fontSize="small"
                        style={{ marginRight: "4px" }}
                      />
                      Ubah Fitur Layanan
                    </button>
                  </div>
                </div>
              </Form>
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Apakah Anda yakin ingin mengubah?</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Dengan mengubah Fitur Layanan, Anda akan otomatis Logout dari
              aplikasi ini.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={inputButtonContainer}>
              <button
                className="blank-button"
                style={{ marginRight: "4px" }}
                onClick={handleCloseConfirmation}
              >
                <NotInterestedOutlinedIcon fontSize="small" style={{ marginRight: "4px" }} />
                Tidak
              </button>
              <button className="hover-button" onClick={updateUser}>
                <ThumbUpOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "4px" }}
                />
                Ya
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default HakAkses;

const profilWrapper = {
  flex: 2,
};

const alertBox = {
  width: "100%",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const titleAkses = {
  marginBottom: "5px",
  color: "#a7abc3",
};

const infoContainer = {
  display: "flex",
  alignItems: "center",
};

const infoStyle = {
  color: Colors.yellow500,
};

const aksesInputWrapper = {
  display: "flex",
};

const aksesInputWrapper2 = {
  display: "flex",
  marginTop: "5px",
};

const inputButtonContainer = {
  display: "flex",
  justifyContent: "flex-end",
};
