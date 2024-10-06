import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Username
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NPWP
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NITKU
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL BAYAR
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NTPN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMINAL BAYAR
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMOR BUKTI PBK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NTPN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL PBK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TAHUN/MASA PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMOR BUKTI PBK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NTPN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL PBK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JENIS SPT
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TAHUN / MASA PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PEMBETULAN KE
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              STATUS
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NO
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NO.BPE/NTTE
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              MASA/TAHUN PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PBTL KE
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL KIRIM
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NO
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              ID DIPOTONG
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NO BUKTI POTONG
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL BUKTI POTONG
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JML PENGHASILAN BRUTO (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PPH (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMOR BPS
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TAHUN PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              TANGGAL DITERIMA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMOR BUKTI PEMOTONGAN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NPWP PEMOTONG
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JUMLAH BRUTO (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JUMLAH DIPOTONG (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              SUMBER DATA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NOMOR BUKTI PEMOTONGAN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              NPWP PEMOTONG
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JUMLAH BRUTO (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              JUMLAH DIPOTONG (RP)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              SUMBER DATA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
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
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpenConfirmationEdit = () => {
    setOpenConfirmationEdit(true);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
  };

  const handleClickOpenConfirmationDelete = () => {
    setOpenConfirmationDelete(true);
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
          <button className="aksi-button">
            <RemoveRedEyeIcon fontSize="small" />
          </button>
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              handleClickOpenConfirmationEdit();
            }}
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              handleClickOpenConfirmationDelete();
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>
          <button className="aksi-button" style={aksiButtonStyle}>
            <EmailIcon fontSize="small" />
          </button>
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
              className="hover-button"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                navigate(`/ebupotUnifikasi/${user.id}/edit`);
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
              className="hover-button"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => deleteFunction(user.id)}
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
                sx={{ fontWeight: "bold" }}
                className={classes.tableRightBorder}
              >
                PERIODE
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                className={classes.tableRightBorder}
              >
                KODE OBJEK PAJAK
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                className={classes.tableRightBorder}
              >
                NOMOR BUKTI SETOR
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                className={classes.tableRightBorder}
              >
                JUMLAH PENGHASILAN BRUTO (RP)
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                className={classes.tableRightBorder}
              >
                PPH DISETOR (RP)
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
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
