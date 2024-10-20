import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import SendIcon from "@mui/icons-material/Send";
import { formatDate } from "../constants/helper";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: Colors.blue900,
    },
  },
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
  },
});

export function ShowTableUser({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              Username
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              Tipe User
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/daftarUser/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell>{user.tipeUser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableUserPerCabang({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NPWP
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NITKU
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NAMA
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {user.npwp15}
              </TableCell>
              <TableCell>{user.nitku}</TableCell>
              <TableCell>{user.nama}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBayarRiwayatPembayaran({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL BAYAR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NTPN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMINAL BAYAR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBayarRiwayatPbkKirim({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NTPN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBayarRiwayatPbkTerima({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NTPN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSpt({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JENIS SPT
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TAHUN / MASA PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PEMBETULAN KE
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              STATUS
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSptPphUnifikasiTelahDikirim({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO.BPE/NTTE
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              MASA/TAHUN PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PBTL KE
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL KIRIM
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBuktiPotongSptPphUnifikasi({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={8} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              ID DIPOTONG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO BUKTI POTONG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL BUKTI POTONG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JML PENGHASILAN BRUTO (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PPH (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEspop({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BPS
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TAHUN PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL DITERIMA
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePph21({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI PEMOTONGAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NPWP PEMOTONG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH BRUTO (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH DIPOTONG (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              SUMBER DATA
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePphUnifikasi({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {user.npwp15}
      </TableCell>
      <TableCell>{user.nitku}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
      <TableCell>{user.nama}</TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI PEMOTONGAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NPWP PEMOTONG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH BRUTO (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH DIPOTONG (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              SUMBER DATA
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableWilayah({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Wilayah
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Wilayah
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Singkatan Wilayah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/wilayah/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.kodeWilayah}
              </TableCell>
              <TableCell>{user.namaWilayah}</TableCell>
              <TableCell>{user.singkatanWilayah}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiPphDisetorSendiri({
  currentPosts,
  deleteFunction,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const handleClickOpenConfirmationDelete = (id) => {
    setOpenConfirmationDelete(true);
    setId(id);
  };

  const handleCloseConfirmationDelete = () => {
    setOpenConfirmationDelete(false);
  };

  const dataStyle = {
    fontWeight: 700,
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipLihat = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat</div>
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Ubah</div>
    </Tooltip>
  );

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Hapus</div>
    </Tooltip>
  );

  const renderTooltipEmail = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Kirim Email</div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" style={dataStyle}>
          {user.ebilling.masaPajakDariBulan}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.objekpajak.kodeObjekPajak}
        </TableCell>
        <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
        <TableCell style={dataStyle}>
          {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.ebilling.jumlahSetor.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={aksiButtonWrapper}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipLihat}
          >
            <button className="aksi-button" disabled={user.isHapus === true}>
              <RemoveRedEyeIcon fontSize="small" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipEdit}
          >
            <button
              className="aksi-button"
              disabled={user.isHapus === true}
              style={aksiButtonStyle}
              onClick={() => {
                handleClickOpenConfirmationEdit(user.id);
              }}
            >
              <EditIcon fontSize="small" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipDelete}
          >
            <button
              className="aksi-button"
              disabled={user.isHapus === true}
              style={aksiButtonStyle}
              onClick={() => {
                handleClickOpenConfirmationDelete(user.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipEmail}
          >
            <button
              className="aksi-button"
              disabled={user.isHapus === true}
              style={aksiButtonStyle}
            >
              <EmailIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        </TableCell>
      </TableRow>
      <Dialog
        open={openConfirmationEdit}
        onClose={handleCloseConfirmationEdit}
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Ubah Bukti Potong</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin akan mengubah Bukti Potong?
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
              onClick={handleCloseConfirmationEdit}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                navigate(`/ebupotUnifikasi/ubahDisetorSendiri/${id}`);
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmationDelete}
        onClose={handleCloseConfirmationDelete}
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Hapus Bukti Potong</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin akan menghapus Bukti Potong?
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
              onClick={handleCloseConfirmationDelete}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                deleteFunction(id);
                setOpenConfirmationDelete(false);
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PERIODE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KODE OBJEK PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NOMOR BUKTI SETOR
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PENGHASILAN BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PPH DISETOR (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupotUnifikasiPph42152223({
  currentPosts,
  deleteFunction,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const handleClickOpenConfirmationDelete = (id) => {
    setOpenConfirmationDelete(true);
    setId(id);
  };

  const handleCloseConfirmationDelete = () => {
    setOpenConfirmationDelete(false);
  };

  const dataStyle = {
    fontWeight: 700,
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const statusWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const statusTextStyle = {
    display: "inline",
    margin: 0,
    padding: 0,
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipLihat = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat</div>
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Ubah</div>
    </Tooltip>
  );

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Hapus</div>
    </Tooltip>
  );

  const renderTooltipEmail = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Kirim Email</div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => {
    let showStatusPosting = <></>;
    if (user.isPost) {
      showStatusPosting = (
        <div
          style={{
            backgroundColor: "#1dc9b7",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevent the text from wrapping
            overflow: "hidden", // Hide overflowed text
            textOverflow: "ellipsis", // Add "..." if the text overflows
          }}
        >
          <p style={statusTextStyle}>Sudah Posting</p>
        </div>
      );
    } else {
      showStatusPosting = (
        <div
          style={{
            backgroundColor: "#ffb822",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevent the text from wrapping
            overflow: "hidden", // Hide overflowed text
            textOverflow: "ellipsis", // Add "..." if the text overflows
          }}
        >
          <p style={statusTextStyle}>Belum Posting</p>
        </div>
      );
    }

    let showStatusHapus = <></>;
    if (user.isHapus) {
      showStatusHapus = (
        <div
          style={{
            backgroundColor: "#282a3c",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Dihapus</p>
        </div>
      );
    } else {
      showStatusHapus = (
        <div
          style={{
            backgroundColor: "#ccc",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Normal</p>
        </div>
      );
    }

    return (
      <>
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" style={dataStyle}>
            {user.bulanPajak} - {user.tahunPajak}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.objekpajak.kodeObjekPajak}
          </TableCell>
          <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
          <TableCell style={dataStyle}>
            {user.identitas === "NPWP/NITKU" ? user.npwpNitku : user.nik}
          </TableCell>
          <TableCell style={dataStyle}>{user.nama}</TableCell>
          <TableCell style={dataStyle}>
            {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            <div style={statusWrapper}>
              <div>{showStatusPosting}</div>
              <div>{showStatusHapus}</div>
            </div>
          </TableCell>
          <TableCell style={aksiButtonWrapper}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipLihat}
            >
              <button className="aksi-button" disabled={user.isHapus === true}>
                <RemoveRedEyeIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipEdit}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
                onClick={() => {
                  handleClickOpenConfirmationEdit(user.id);
                }}
              >
                <EditIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipDelete}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
                onClick={() => {
                  handleClickOpenConfirmationDelete(user.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipEmail}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
              >
                <EmailIcon fontSize="small" />
              </button>
            </OverlayTrigger>
          </TableCell>
        </TableRow>
        <Dialog
          open={openConfirmationEdit}
          onClose={handleCloseConfirmationEdit}
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
                  <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
                </div>
                <b>Ubah Bukti Potong</b>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah Anda yakin akan mengubah Bukti Potong?
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
                onClick={handleCloseConfirmationEdit}
              >
                Tidak
              </Button>
              <button
                className="hover-button-no-icon"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
                onClick={() => {
                  navigate(`/ebupotUnifikasi/ubahPph42152223/${id}`);
                }}
              >
                Ya
              </button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          open={openConfirmationDelete}
          onClose={handleCloseConfirmationDelete}
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
                  <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
                </div>
                <b>Hapus Bukti Potong</b>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah Anda yakin akan menghapus Bukti Potong?
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
                onClick={handleCloseConfirmationDelete}
              >
                Tidak
              </Button>
              <button
                className="hover-button-no-icon"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
                onClick={() => {
                  deleteFunction(id);
                  setOpenConfirmationDelete(false);
                }}
              >
                Ya
              </button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  });

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={9} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PERIODE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KODE OBJEK PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NOMOR BUKTI SETOR
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PENGHASILAN BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PPH TERUTANG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableDaftarDokumenPph42152223({
  currentPosts,
  hapusDaftarPemotongan,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>
        <p>Hapus Dokumen</p>
      </div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row" sx={textDataStyle}>
        {user.namaDokumen}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.noDokumen}</TableCell>
      <TableCell sx={textDataStyle}>
        {formatDate(user.tanggalDokumen)}
      </TableCell>
      <TableCell>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipDelete}
        >
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              hapusDaftarPemotongan(index);
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </OverlayTrigger>
      </TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={4} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NAMA DOKUMEN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR DOKUMEN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiPphNonResiden({
  currentPosts,
  deleteFunction,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const handleClickOpenConfirmationDelete = (id) => {
    setOpenConfirmationDelete(true);
    setId(id);
  };

  const handleCloseConfirmationDelete = () => {
    setOpenConfirmationDelete(false);
  };

  const dataStyle = {
    fontWeight: 700,
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const statusWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const statusTextStyle = {
    display: "inline",
    margin: 0,
    padding: 0,
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipLihat = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat</div>
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Ubah</div>
    </Tooltip>
  );

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Hapus</div>
    </Tooltip>
  );

  const renderTooltipEmail = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Kirim Email</div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => {
    let showStatusPosting = <></>;
    if (user.isPost) {
      showStatusPosting = (
        <div
          style={{
            backgroundColor: "#1dc9b7",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevent the text from wrapping
            overflow: "hidden", // Hide overflowed text
            textOverflow: "ellipsis", // Add "..." if the text overflows
          }}
        >
          <p style={statusTextStyle}>Sudah Posting</p>
        </div>
      );
    } else {
      showStatusPosting = (
        <div
          style={{
            backgroundColor: "#ffb822",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevent the text from wrapping
            overflow: "hidden", // Hide overflowed text
            textOverflow: "ellipsis", // Add "..." if the text overflows
          }}
        >
          <p style={statusTextStyle}>Belum Posting</p>
        </div>
      );
    }

    let showStatusHapus = <></>;
    if (user.isHapus) {
      showStatusHapus = (
        <div
          style={{
            backgroundColor: "#282a3c",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Dihapus</p>
        </div>
      );
    } else {
      showStatusHapus = (
        <div
          style={{
            backgroundColor: "#ccc",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Normal</p>
        </div>
      );
    }

    return (
      <>
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" style={dataStyle}>
            {user.bulanPajak} - {user.tahunPajak}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.objekpajak.kodeObjekPajak}
          </TableCell>
          <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
          <TableCell style={dataStyle}>{user.tin}</TableCell>
          <TableCell style={dataStyle}>{user.nama}</TableCell>
          <TableCell style={dataStyle}>
            {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            <div style={statusWrapper}>
              <div>{showStatusPosting}</div>
              <div>{showStatusHapus}</div>
            </div>
          </TableCell>
          <TableCell style={aksiButtonWrapper}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipLihat}
            >
              <button className="aksi-button" disabled={user.isHapus === true}>
                <RemoveRedEyeIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipEdit}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
                onClick={() => {
                  handleClickOpenConfirmationEdit(user.id);
                }}
              >
                <EditIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipDelete}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
                onClick={() => {
                  handleClickOpenConfirmationDelete(user.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipEmail}
            >
              <button
                className="aksi-button"
                disabled={user.isHapus === true}
                style={aksiButtonStyle}
              >
                <EmailIcon fontSize="small" />
              </button>
            </OverlayTrigger>
          </TableCell>
        </TableRow>
        <Dialog
          open={openConfirmationEdit}
          onClose={handleCloseConfirmationEdit}
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
                  <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
                </div>
                <b>Ubah Bukti Potong</b>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah Anda yakin akan mengubah Bukti Potong?
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
                onClick={handleCloseConfirmationEdit}
              >
                Tidak
              </Button>
              <button
                className="hover-button-no-icon"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
                onClick={() => {
                  navigate(`/ebupotUnifikasi/ubahPphNonResiden/${id}`);
                }}
              >
                Ya
              </button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          open={openConfirmationDelete}
          onClose={handleCloseConfirmationDelete}
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
                  <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
                </div>
                <b>Hapus Bukti Potong</b>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah Anda yakin akan menghapus Bukti Potong?
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
                onClick={handleCloseConfirmationDelete}
              >
                Tidak
              </Button>
              <button
                className="hover-button-no-icon"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
                onClick={() => {
                  deleteFunction(id);
                  setOpenConfirmationDelete(false);
                }}
              >
                Ya
              </button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  });

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={9} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PERIODE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KODE OBJEK PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NOMOR BUKTI SETOR
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PENGHASILAN BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PPH TERUTANG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableDaftarDokumenPphNonResiden({
  currentPosts,
  hapusDaftarPemotongan,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>
        <p>Hapus Dokumen</p>
      </div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row" sx={textDataStyle}>
        {user.namaDokumen}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.noDokumen}</TableCell>
      <TableCell sx={textDataStyle}>
        {formatDate(user.tanggalDokumen)}
      </TableCell>
      <TableCell>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipDelete}
        >
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              hapusDaftarPemotongan(index);
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </OverlayTrigger>
      </TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={4} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NAMA DOKUMEN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR DOKUMEN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePenandatangan({
  currentPosts,
  ubahStatusPenandatangan,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const dataStyle = {
    fontWeight: 700,
    textAlign: "center",
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const statusTextStyle = {
    display: "inline",
    margin: 0,
    padding: 0,
  };

  let dataTable = currentPosts.map((user, index) => {
    let tempBertindakSebagai = user.bertindakSebagai;
    if (user.bertindakSebagai == "Wakil Wajib Pajak (Pengurus)") {
      tempBertindakSebagai = "Pengurus / Wajib Pajak";
    }

    let showStatus = <></>;
    if (user.status) {
      showStatus = (
        <div
          style={{
            backgroundColor: "#1dc9b7",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Aktif</p>
        </div>
      );
    } else {
      showStatus = (
        <div
          style={{
            backgroundColor: "#fd397a",
            color: "white",
            borderRadius: "5px",
            display: "inline-block",
            padding: "2px 10px",
            textAlign: "center",
          }}
        >
          <p style={statusTextStyle}>Tidak Aktif</p>
        </div>
      );
    }

    const renderTooltipDelete = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        <div>
          <p>Aktifkan/Nonaktifkan Penandatangan</p>
        </div>
      </Tooltip>
    );

    return (
      <>
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" style={dataStyle}>
            {user.nomorIdentitas}
          </TableCell>
          <TableCell style={dataStyle}>{user.namaIdentitas}</TableCell>
          <TableCell style={dataStyle}>{tempBertindakSebagai}</TableCell>
          <TableCell style={dataStyle}>{showStatus}</TableCell>
          <TableCell style={aksiButtonWrapper}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 50 }}
              overlay={renderTooltipDelete}
            >
              <button
                className="aksi-button"
                style={aksiButtonStyle}
                onClick={() => {
                  ubahStatusPenandatangan(user.id);
                }}
              >
                <AutorenewIcon fontSize="small" />
              </button>
            </OverlayTrigger>
          </TableCell>
        </TableRow>
      </>
    );
  });

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                NOMOR IDENTITAS
              </TableCell>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                NAMA
              </TableCell>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                BERTINDAK SEBAGAI
              </TableCell>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                STATUS
              </TableCell>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupotUnifikasiTagihanPemotongan({
  currentPosts,
  generateIdBillingFunction,
  downloadPdf,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);

  const handleClickOpenConfirmationEdit = () => {
    setOpenConfirmationEdit(true);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const dataStyle = {
    fontWeight: 700,
  };

  const dataStyleRight = {
    fontWeight: 700,
    textAlign: "right",
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipBuatKodeBilling = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Buat Kode Billing</div>
    </Tooltip>
  );

  const renderTooltipCetakBilling = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Cetak Billing</div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" style={dataStyle}>
          {user.objekpajak.jenissetoran.jenispajak.kodeJenisPajak}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.objekpajak.jenissetoran.kodeJenisSetoran}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDipotong.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyle}>{user.idBilling}</TableCell>
        <TableCell style={aksiButtonWrapper}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipBuatKodeBilling}
          >
            <button
              className="aksi-button"
              disabled={
                user.isHapus === true ||
                user.pphYangDipotong - user.pphYangDisetor === 0
              }
              onClick={() => {
                generateIdBillingFunction(user.id);
              }}
            >
              <DescriptionIcon fontSize="small" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipCetakBilling}
          >
            <button
              className="aksi-button"
              disabled={
                user.idBilling.length === 0 ||
                user.pphYangDipotong - user.pphYangDisetor === 0
              }
              style={aksiButtonStyle}
              onClick={() => {
                downloadPdf(user.id);
              }}
            >
              <PrintIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        </TableCell>
      </TableRow>
      <Dialog
        open={openConfirmationEdit}
        onClose={handleCloseConfirmationEdit}
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Ubah Bukti Potong</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin akan mengubah Bukti Potong?
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
              onClick={handleCloseConfirmationEdit}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                navigate(`/ebupotUnifikasi/ubahDisetorSendiri/${user.id}`);
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={5} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JENIS PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JENIS SETORAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PPH YANG DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                ID BILLING
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupotUnifikasiBuktiSetor({
  currentPosts,
  deleteEBupotUnifikasiPphDisetorSendiri,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>
        <p>Hapus Dokumen</p>
      </div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row" sx={textDataStyle}>
        {index + 1}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.jenispajak.kodeJenisPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.kodeJenisSetoran}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.ebupotunifikasitagihanpemotongan.tahunPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {formatDate(user.tanggalBuktiSetor)}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.pphYangDisetor.toLocaleString("de-DE")}
      </TableCell>
      <TableCell>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipDelete}
        >
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              deleteEBupotUnifikasiPphDisetorSendiri(user.id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>
        </OverlayTrigger>
      </TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={8} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JENIS PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JENIS SETORAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              MASA TAHUN PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL SETOR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH SETOR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              AKSI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiBuktiSetorPenyiapanSpt({
  currentPosts,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <TableRow
      key={user.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row" sx={textDataStyle}>
        {index + 1}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.jenispajak.kodeJenisPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.kodeJenisSetoran}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.ebupotunifikasitagihanpemotongan.tahunPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {formatDate(user.tanggalBuktiSetor)}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.pphYangDisetor.toLocaleString("de-DE")}
      </TableCell>
    </TableRow>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={8} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JENIS PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JENIS SETORAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              MASA TAHUN PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL SETOR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH SETOR
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiRingkasanPembayaran({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");

  const dataStyle = {
    fontWeight: 700,
  };

  const dataStyleRight = {
    fontWeight: 700,
    textAlign: "right",
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" style={dataStyle}>
          {user.objekpajak.jenissetoran.jenispajak.kodeJenisPajak}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.objekpajak.jenissetoran.kodeJenisSetoran}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDipotong.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDisetor.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyle}>
          {(user.pphYangDipotong - user.pphYangDisetor).toLocaleString("de-DE")}
        </TableCell>
      </TableRow>
    </>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={5} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JENIS PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JENIS SETORAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PPH YANG DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PPH YANG DISETOR
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                SELISIH
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupotUnifikasiPenyiapanSpt({
  currentPosts,
  deleteFunction,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const handleClickOpenConfirmationDelete = (id) => {
    setOpenConfirmationDelete(true);
    setId(id);
  };

  const handleCloseConfirmationDelete = () => {
    setOpenConfirmationDelete(false);
  };

  const dataStyle = {
    fontWeight: 700,
    textAlign: "center",
  };

  const dataStyleRight = {
    fontWeight: 700,
    textAlign: "right",
  };

  const aksiButtonWrapper = {
    display: "flex",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const renderTooltipLengkapiSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lengkapi SPT</div>
    </Tooltip>
  );

  const renderTooltipKirimSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Kirim SPT</div>
    </Tooltip>
  );

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" style={dataStyle}>
          {user.tahunPajak}
        </TableCell>
        <TableCell style={dataStyle}>{user.masaPajak}</TableCell>
        <TableCell style={dataStyle}>{user.pembetulanKe}</TableCell>
        <TableCell style={dataStyleRight}>
          {user.jumlahPphKurangSetor.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyle}>{user.statusSpt}</TableCell>
        <TableCell style={dataStyle}>{user.keteranganSpt}</TableCell>
        <TableCell style={aksiButtonWrapper}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipLengkapiSpt}
          >
            <button
              className="aksi-button"
              disabled={user.isHapus === true}
              style={aksiButtonStyle}
              onClick={() => {
                navigate(
                  `/ebupotUnifikasi/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}`
                );
              }}
            >
              <EditIcon fontSize="small" />
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipKirimSpt}
          >
            <button
              className="aksi-button"
              disabled={user.isHapus === true}
              style={aksiButtonStyle}
            >
              <SendIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        </TableCell>
      </TableRow>
      <Dialog
        open={openConfirmationEdit}
        onClose={handleCloseConfirmationEdit}
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Ubah Bukti Potong</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin akan mengubah Bukti Potong?
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
              onClick={handleCloseConfirmationEdit}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                navigate(`/ebupotUnifikasi/ubahDisetorSendiri/${id}`);
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmationDelete}
        onClose={handleCloseConfirmationDelete}
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
                <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
              </div>
              <b>Hapus Bukti Potong</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Apakah Anda yakin akan menghapus Bukti Potong?
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
              onClick={handleCloseConfirmationDelete}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                deleteFunction(id);
                setOpenConfirmationDelete(false);
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={7} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                TAHUN PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                MASA PAJAK
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PBTL KE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH PPH KURANG SETOR
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                STATUS SPT
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KETERANGAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                AKSI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
