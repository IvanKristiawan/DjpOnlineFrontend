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
import { Form } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import { NumericFormat } from "react-number-format";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import SendIcon from "@mui/icons-material/Send";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { formatDate, formatDateTime } from "../constants/helper";

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

export function ShowTableSptPphUnifikasiTelahDikirim({
  currentPosts,
  lihatBuktiPotongPadaSpt,
  mengajukanUnduhBuktiPotong,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const renderTooltipLihatBpe = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat BPE</div>
    </Tooltip>
  );

  const renderTooltipLihatBuktiPotongPadaSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat Bukti Potong pada SPT</div>
    </Tooltip>
  );

  const renderTooltipCetakSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Cetak SPT</div>
    </Tooltip>
  );

  const renderTooltipAjukanUnduhBuktiPotong = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Ajukan unduh Bukti Potong</div>
    </Tooltip>
  );

  const renderTooltipUnduhBuktiPotongPadaSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Unduh Bukti Potong Pada SPT</div>
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
      <TableCell sx={textDataStyle}>{user.noBpeNtte}</TableCell>
      <TableCell
        sx={textDataStyle}
      >{`${user.tahunPajak}-${user.masaPajak}`}</TableCell>
      <TableCell sx={textDataStyle}>{user.pembetulanKe}</TableCell>
      <TableCell sx={textDataStyle}>{formatDate(user.tanggalKirim)}</TableCell>
      <TableCell sx={textDataStyle}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipLihatBpe}
        >
          <button className="aksi-button">
            <Inventory2Icon fontSize="small" />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipLihatBuktiPotongPadaSpt}
        >
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              lihatBuktiPotongPadaSpt(user.tahunPajak, user.masaPajak);
            }}
          >
            <MenuIcon fontSize="small" />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipCetakSpt}
        >
          <button className="aksi-button" style={aksiButtonStyle}>
            <PrintIcon fontSize="small" />
          </button>
        </OverlayTrigger>
        {user.ajukanUnduhBuktiPotong === false ? (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipAjukanUnduhBuktiPotong}
          >
            <button
              className="aksi-button"
              style={aksiButtonStyle}
              onClick={() => {
                mengajukanUnduhBuktiPotong(user.id);
              }}
            >
              <SendIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipUnduhBuktiPotongPadaSpt}
          >
            <button className="aksi-button" style={aksiButtonStyle}>
              <DownloadIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        )}
      </TableCell>
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

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let dataTable = currentPosts.map((user, index) => {
    let tempPph = "0";
    if (user.ebilling) {
      tempPph = user.ebilling.jumlahSetor;
    } else if (user.pPhYangDipotongDipungut) {
      tempPph = user.pPhYangDipotongDipungut;
    }

    return (
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" sx={textDataStyle}>
          {index + 1}
        </TableCell>
        <TableCell sx={textDataStyle}>{user.id}</TableCell>
        <TableCell sx={textDataStyle}>
          {user.objekpajak.kodeObjekPajak}
        </TableCell>
        <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
        <TableCell sx={textDataStyle}>
          {formatDate(user.tanggalBuktiSetor)}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {tempPph.toLocaleString("de-DE")}
        </TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    );
  });

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
              KETERANGAN
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
              onClick={() => {
                if (user.penandatanganId === null) {
                  navigate(
                    `/ebupotUnifikasi/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}`
                  );
                } else {
                  navigate(
                    `/ebupotUnifikasi/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}/kirimSpt`
                  );
                }
              }}
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

export function ShowTableEbupotUnifikasiObjekPphYangDisetorSendiri({
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
        {user.nomorBuktiSetor}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.jenispajak.kodeJenisPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.kodeJenisSetoran}
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
              URAIAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH DPP (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH (RP)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiObjekPajak({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyleLeft = {
    fontWeight: "bold",
    textAlign: "left",
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
      <TableCell component="th" scope="row" sx={textDataStyleLeft}>
        {user.objekpajak.namaObjekPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.objekpajak.kodeObjekPajak}</TableCell>
      <TableCell sx={textDataStyle}>
        {user.jumlahDpp.toLocaleString("de-DE")}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jumlahPph.toLocaleString("de-DE")}
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
              URAIAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH DPP (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH (RP)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiDaftarBuktiPemungutan({
  currentPosts,
}) {
  console.log(currentPosts);

  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let dataTable = currentPosts.map((user, index) => {
    let tempIdentitas = "";
    if (user.ebilling) {
      tempIdentitas = user.ebilling.subjekPajakNpwp;
    } else if (user.npwpNitku) {
      tempIdentitas = user.npwpNitku;
    } else if (user.nik) {
      tempIdentitas = user.nik;
    } else if (user.noKitasKitap.length !== 0) {
      tempIdentitas = user.noKitasKitap;
    }

    let tempNama = "";
    if (user.ebilling) {
      tempNama = user.ebilling.subjekPajakNama;
    } else if (user.nama.length !== 0) {
      tempNama = user.nama;
    }

    let tempPph = "0";
    if (user.ebilling) {
      tempPph = user.ebilling.jumlahSetor;
    } else if (user.pPhYangDipotongDipungut) {
      tempPph = user.pPhYangDipotongDipungut;
    }

    return (
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" sx={textDataStyle}>
          {user.objekpajak.jenissetoran.jenispajak.namaJenisPajak}
        </TableCell>
        <TableCell sx={textDataStyle}>{tempIdentitas}</TableCell>
        <TableCell sx={textDataStyle}>{tempNama}</TableCell>
        <TableCell sx={textDataStyle}>
          {user.objekpajak.kodeObjekPajak}
        </TableCell>
        <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
        <TableCell sx={textDataStyle}>
          {formatDate(user.tanggalBuktiSetor)}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {tempPph.toLocaleString("de-DE")}
        </TableCell>
        <TableCell sx={textDataStyle}>-</TableCell>
      </TableRow>
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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PASAL
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NPWP/NIK/TIN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NAMA
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NOMOR BUKTI POTONG/PUNGUT
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL BUKTI POTONG/PUNGUT
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH DPP (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PAJAK (RP)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KETERANGAN
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiDaftarSuratSetoranPajak({
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
        {user.nomorBuktiSetor}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.jenispajak.kodeJenisPajak}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.kodeJenisSetoran}
      </TableCell>
      <TableCell sx={textDataStyle}>
        {user.jenissetoran.kodeJenisSetoran}
      </TableCell>
    </TableRow>
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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE AKUN PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE JENIS SETORAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NTPN/NO BUKTI PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              TANGGAL SSP/BPN/BUKTI PBK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH DISETOR
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiPphYangDisetorSendiri({
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

  const textDataStyleLeft = {
    fontWeight: "bold",
    textAlign: "left",
  };

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let tempNo = 0;
  let tempPphYangDipotong = 0;
  let tempPphYangDitanggungPemerintah = 0;
  let tempPphYangDisetor = 0;

  let dataTable = currentPosts.map((user, index) => {
    if (user.jenis === "PphDisetorSendiri") {
      tempNo++;
      tempPphYangDipotong += user.pphYangDipotong;
      tempPphYangDitanggungPemerintah += 0;
      tempPphYangDisetor += user.pphYangDisetor;

      return (
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={textDataStyle}>
            {index + 1}
          </TableCell>
          <TableCell sx={textDataStyleLeft}>
            {user.objekpajak.jenissetoran.jenispajak.namaJenisPajak}
          </TableCell>
          <TableCell sx={textDataStyleRight}>
            {user.pphYangDipotong.toLocaleString("de-DE")}
          </TableCell>
          <TableCell sx={textDataStyleRight}>0</TableCell>
          <TableCell sx={textDataStyleRight}>
            {user.pphYangDisetor.toLocaleString("de-DE")}
          </TableCell>
        </TableRow>
      );
    }
  });

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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              URAIAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PPH TERUTANG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DITANGGUNG PEMERINTAH
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DISETOR (RP)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable}
          {currentPosts.length !== 0 && (
            <TableRow
              key="total"
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={textDataStyle}>
                {tempNo + 1}
              </TableCell>
              <TableCell sx={textDataStyleLeft}>
                JUMLAH YANG DISETORKAN SENDIRI
              </TableCell>
              <TableCell sx={textDataStyleRight}>
                {tempPphYangDipotong.toLocaleString("de-DE")}
              </TableCell>
              <TableCell sx={textDataStyleRight}>
                {tempPphYangDitanggungPemerintah.toLocaleString("de-DE")}
              </TableCell>
              <TableCell sx={textDataStyleRight}>
                {tempPphYangDisetor.toLocaleString("de-DE")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiPphYangTelahDipotong({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const textDataStyleLeft = {
    fontWeight: "bold",
    textAlign: "left",
  };

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let tempNo = 0;
  let tempPphYangDipotong = 0;
  let tempPphYangDitanggungPemerintah = 0;
  let tempPphYangDisetor = 0;

  let dataTable = currentPosts.map((user, index) => {
    if (user.jenis !== "PphDisetorSendiri") {
      tempNo++;
      tempPphYangDipotong += user.pphYangDipotong;
      tempPphYangDitanggungPemerintah += 0;
      tempPphYangDisetor += user.pphYangDisetor;

      return (
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={textDataStyle}>
            {index + 1}
          </TableCell>
          <TableCell sx={textDataStyleLeft}>
            {user.objekpajak.jenissetoran.jenispajak.namaJenisPajak}
          </TableCell>
          <TableCell sx={textDataStyleRight}>
            {user.pphYangDipotong.toLocaleString("de-DE")}
          </TableCell>
          <TableCell sx={textDataStyleRight}>0</TableCell>
          <TableCell sx={textDataStyleRight}>
            {user.pphYangDisetor.toLocaleString("de-DE")}
          </TableCell>
        </TableRow>
      );
    }
  });

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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              URAIAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PPH TERUTANG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DITANGGUNG PEMERINTAH
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DISETOR (RP)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable}
          {currentPosts.length !== 0 && (
            <>
              <TableRow
                key="total"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={textDataStyle}>
                  {tempNo + 1}
                </TableCell>
                <TableCell sx={textDataStyleLeft}>
                  JUMLAH YANG DISETORKAN SENDIRI
                </TableCell>
                <TableCell sx={textDataStyleRight}>
                  {tempPphYangDipotong.toLocaleString("de-DE")}
                </TableCell>
                <TableCell sx={textDataStyleRight}>
                  {tempPphYangDitanggungPemerintah.toLocaleString("de-DE")}
                </TableCell>
                <TableCell sx={textDataStyleRight}>
                  {tempPphYangDisetor.toLocaleString("de-DE")}
                </TableCell>
              </TableRow>
              <TableRow
                key="total"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={textDataStyle}
                ></TableCell>
                <TableCell sx={textDataStyle}>
                  JUMLAH BUKTI PEMOTONGAN/PEMUNGUTAN
                </TableCell>
                <TableCell sx={textDataStyleRight}></TableCell>
                <TableCell sx={textDataStyleRight}></TableCell>
                <TableCell sx={textDataStyleRight}>
                  {tempNo.toLocaleString("de-DE")}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiRekapitulasiPph({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const textDataStyleLeft = {
    fontWeight: "bold",
    textAlign: "left",
  };

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let tempNo = 0;
  let tempPphYangDipotong = 0;
  let tempPphYangDitanggungPemerintah = 0;
  let tempPphYangDisetor = 0;

  currentPosts.map((user, index) => {
    tempNo++;
    tempPphYangDipotong += user.pphYangDipotong;
    tempPphYangDitanggungPemerintah += 0;
    tempPphYangDisetor += user.pphYangDisetor;

    return;
  });

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              URAIAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PPH TERUTANG
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DITANGGUNG PEMERINTAH
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PPH YANG DISETOR (RP)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="total"
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={textDataStyle}>
              1
            </TableCell>
            <TableCell sx={textDataStyleLeft}>
              JUMLAH TOTAL PPh DAN PPh YANG DISETOR
            </TableCell>
            <TableCell sx={textDataStyleRight}>
              {tempPphYangDipotong.toLocaleString("de-DE")}
            </TableCell>
            <TableCell sx={textDataStyleRight}>
              {tempPphYangDitanggungPemerintah.toLocaleString("de-DE")}
            </TableCell>
            <TableCell sx={textDataStyleRight}>
              {tempPphYangDisetor.toLocaleString("de-DE")}
            </TableCell>
          </TableRow>
          <TableRow
            key="total"
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={textDataStyle}>
              2
            </TableCell>
            <TableCell sx={textDataStyleLeft}>
              JUMLAH TOTAL PPh YANG DISETOR PADA SPT YANG DIBETULKAN
            </TableCell>
            <TableCell sx={textDataStyleRight}></TableCell>
            <TableCell sx={textDataStyleRight}></TableCell>
            <TableCell sx={textDataStyleRight}>0</TableCell>
          </TableRow>
          <TableRow
            key="total"
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={textDataStyle}>
              3
            </TableCell>
            <TableCell sx={textDataStyleLeft}>
              JUMLAH PPh YANG KURANG (LEBIH) DISETOR KARENA PEMBETULAN
            </TableCell>
            <TableCell sx={textDataStyleRight}></TableCell>
            <TableCell sx={textDataStyleRight}></TableCell>
            <TableCell sx={textDataStyleRight}>0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupotUnifikasiDaftarDokumenImporData({
  currentPosts,
  getDetilValidasi,
  setOpenDetilValidasi,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
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

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
        onClick={() => {
          getDetilValidasi(user.id);
          setOpenDetilValidasi(true);
        }}
      >
        <TableCell component="th" scope="row" style={textDataStyle}>
          {user.nomorTiket}
        </TableCell>
        <TableCell style={textDataStyle}>{user.namaFile}</TableCell>
        <TableCell style={textDataStyle}>
          {formatDateTime(user.tanggalUpload)}
        </TableCell>
        <TableCell style={textDataStyle}>{user.jumlahBaris}</TableCell>
        <TableCell style={textDataStyle}>{user.status}</TableCell>
        <TableCell style={textDataStyle}>{user.keteranganUpload}</TableCell>
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
                NOMOR TIKET
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA FILE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                TANGGAL UPLOAD
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BARIS
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
                KETERANGAN UPLOAD
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

export function ShowTableEbupotUnifikasiDaftarDetilValidasi({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

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
        <TableCell component="th" scope="row" style={textDataStyle}>
          {user.pasal}
        </TableCell>
        <TableCell style={textDataStyle}>{user.barisExcel}</TableCell>
        <TableCell style={textDataStyle}>{user.statusValidasi}</TableCell>
        <TableCell style={textDataStyle}>{user.keteranganValidasi}</TableCell>
      </TableRow>
    </>
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
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PASAL
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                BARIS EXCEL
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                STATUS VALIDASI
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KETERANGAN VALIDASI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableSptPph2126TelahDikirim({
  currentPosts,
  lihatBuktiPotongPadaSpt,
  mengajukanUnduhBuktiPotong,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const renderTooltipLihatBpe = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat BPE</div>
    </Tooltip>
  );

  const renderTooltipLihatBuktiPotongPadaSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Lihat Bukti Potong pada SPT</div>
    </Tooltip>
  );

  const renderTooltipCetakSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Cetak SPT</div>
    </Tooltip>
  );

  const renderTooltipAjukanUnduhBuktiPotong = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Ajukan unduh Bukti Potong</div>
    </Tooltip>
  );

  const renderTooltipUnduhBuktiPotongPadaSpt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div>Unduh Bukti Potong Pada SPT</div>
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
      <TableCell sx={textDataStyle}>{user.noBpeNtte}</TableCell>
      <TableCell
        sx={textDataStyle}
      >{`${user.tahunPajak}-${user.masaPajak}`}</TableCell>
      <TableCell sx={textDataStyle}>{user.pembetulanKe}</TableCell>
      <TableCell sx={textDataStyle}>{formatDate(user.tanggalKirim)}</TableCell>
      <TableCell sx={textDataStyle}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipLihatBpe}
        >
          <button className="aksi-button">
            <Inventory2Icon fontSize="small" />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipLihatBuktiPotongPadaSpt}
        >
          <button
            className="aksi-button"
            style={aksiButtonStyle}
            onClick={() => {
              lihatBuktiPotongPadaSpt(user.tahunPajak, user.masaPajak);
            }}
          >
            <MenuIcon fontSize="small" />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 50 }}
          overlay={renderTooltipCetakSpt}
        >
          <button className="aksi-button" style={aksiButtonStyle}>
            <PrintIcon fontSize="small" />
          </button>
        </OverlayTrigger>
        {user.ajukanUnduhBuktiPotong === false ? (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipAjukanUnduhBuktiPotong}
          >
            <button
              className="aksi-button"
              style={aksiButtonStyle}
              onClick={() => {
                mengajukanUnduhBuktiPotong(user.id);
              }}
            >
              <SendIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipUnduhBuktiPotongPadaSpt}
          >
            <button className="aksi-button" style={aksiButtonStyle}>
              <DownloadIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        )}
      </TableCell>
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

export function ShowTableBuktiPotongSptPph2126({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };

  const textDataStyleRight = {
    fontWeight: "bold",
    textAlign: "right",
  };

  let dataTable = currentPosts.map((user, index) => {
    let tempPph = "0";
    if (user.ebilling) {
      tempPph = user.ebilling.jumlahSetor;
    } else if (user.pPhYangDipotongDipungut) {
      tempPph = user.pPhYangDipotongDipungut;
    }

    return (
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" sx={textDataStyle}>
          {index + 1}
        </TableCell>
        <TableCell sx={textDataStyle}>{user.id}</TableCell>
        <TableCell sx={textDataStyle}>
          {user.objekpajak.kodeObjekPajak}
        </TableCell>
        <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
        <TableCell sx={textDataStyle}>
          {formatDate(user.tanggalBuktiSetor)}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
        </TableCell>
        <TableCell sx={textDataStyleRight}>
          {tempPph.toLocaleString("de-DE")}
        </TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    );
  });

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
              KETERANGAN
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

// export function ShowTableEbupot21Bulanan({ currentPosts, deleteFunction }) {
//   let navigate = useNavigate();
//   const classes = useStyles();
//   const [id, setId] = useState("");
//   const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
//   const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

//   const handleClickOpenConfirmationEdit = (id) => {
//     setOpenConfirmationEdit(true);
//     setId(id);
//   };

//   const handleCloseConfirmationEdit = () => {
//     setOpenConfirmationEdit(false);
//   };

//   const handleClickOpenConfirmationDelete = (id) => {
//     setOpenConfirmationDelete(true);
//     setId(id);
//   };

//   const handleCloseConfirmationDelete = () => {
//     setOpenConfirmationDelete(false);
//   };

//   const dataStyle = {
//     fontWeight: 700,
//   };

//   const aksiButtonWrapper = {
//     display: "flex",
//   };

//   const aksiButtonStyle = {
//     marginLeft: "5px",
//   };

//   const statusWrapper = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   };

//   const statusTextStyle = {
//     display: "inline",
//     margin: 0,
//     padding: 0,
//   };

//   const textDataStyle = {
//     fontWeight: "bold",
//     textAlign: "center",
//   };

//   const renderTooltipLihat = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Lihat</div>
//     </Tooltip>
//   );

//   const renderTooltipEdit = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Ubah</div>
//     </Tooltip>
//   );

//   const renderTooltipDelete = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Hapus</div>
//     </Tooltip>
//   );

//   let dataTable = currentPosts.map((user, index) => {
//     let showStatusPosting = <></>;
//     if (user.isPost) {
//       showStatusPosting = (
//         <div
//           style={{
//             backgroundColor: "#1dc9b7",
//             color: "white",
//             borderRadius: "5px",
//             display: "inline-block",
//             padding: "2px 10px",
//             textAlign: "center",
//             whiteSpace: "nowrap", // Prevent the text from wrapping
//             overflow: "hidden", // Hide overflowed text
//             textOverflow: "ellipsis", // Add "..." if the text overflows
//           }}
//         >
//           <p style={statusTextStyle}>Sudah Posting</p>
//         </div>
//       );
//     } else {
//       showStatusPosting = (
//         <div
//           style={{
//             backgroundColor: "#ffb822",
//             color: "white",
//             borderRadius: "5px",
//             display: "inline-block",
//             padding: "2px 10px",
//             textAlign: "center",
//             whiteSpace: "nowrap", // Prevent the text from wrapping
//             overflow: "hidden", // Hide overflowed text
//             textOverflow: "ellipsis", // Add "..." if the text overflows
//           }}
//         >
//           <p style={statusTextStyle}>Belum Posting</p>
//         </div>
//       );
//     }

//     let showStatusHapus = <></>;
//     if (user.isHapus) {
//       showStatusHapus = (
//         <div
//           style={{
//             backgroundColor: "#282a3c",
//             color: "white",
//             borderRadius: "5px",
//             display: "inline-block",
//             padding: "2px 10px",
//             textAlign: "center",
//           }}
//         >
//           <p style={statusTextStyle}>Dihapus</p>
//         </div>
//       );
//     } else {
//       showStatusHapus = (
//         <div
//           style={{
//             backgroundColor: "#ccc",
//             borderRadius: "5px",
//             display: "inline-block",
//             padding: "2px 10px",
//             textAlign: "center",
//           }}
//         >
//           <p style={statusTextStyle}>Normal</p>
//         </div>
//       );
//     }

//     return (
//       <>
//         <TableRow
//           key={user.id}
//           sx={{
//             "&:last-child td, &:last-child th": { border: 0 },
//           }}
//         >
//           <TableCell component="th" scope="row" style={dataStyle}></TableCell>
//           <TableCell style={dataStyle}>
//             {user.bulanPajak} - {user.tahunPajak}
//           </TableCell>
//           <TableCell style={dataStyle}>
//             {user.objekpajak.kodeObjekPajak}
//           </TableCell>
//           <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
//           <TableCell style={dataStyle}>
//             {user.identitas === "NPWP/NITKU" ? user.npwpNitku : user.nik}
//           </TableCell>
//           <TableCell style={dataStyle}>{user.nama}</TableCell>
//           <TableCell style={dataStyle}>
//             {user.jumlahPenghasilan.toLocaleString("de-DE")}
//           </TableCell>
//           <TableCell style={dataStyle}>
//             {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
//           </TableCell>
//           <TableCell style={dataStyle}>{user.user.npwp15}</TableCell>
//           <TableCell style={dataStyle}>
//             <div style={statusWrapper}>
//               <div>{showStatusPosting}</div>
//               <div>{showStatusHapus}</div>
//             </div>
//           </TableCell>
//           <TableCell style={aksiButtonWrapper}>
//             <OverlayTrigger
//               placement="bottom"
//               delay={{ show: 250, hide: 50 }}
//               overlay={renderTooltipLihat}
//             >
//               <button className="aksi-button" disabled={user.isHapus === true}>
//                 <RemoveRedEyeIcon fontSize="small" />
//               </button>
//             </OverlayTrigger>
//             <OverlayTrigger
//               placement="bottom"
//               delay={{ show: 250, hide: 50 }}
//               overlay={renderTooltipEdit}
//             >
//               <button
//                 className="aksi-button"
//                 disabled={user.isHapus === true}
//                 style={aksiButtonStyle}
//                 onClick={() => {
//                   handleClickOpenConfirmationEdit(user.id);
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </button>
//             </OverlayTrigger>
//             <OverlayTrigger
//               placement="bottom"
//               delay={{ show: 250, hide: 50 }}
//               overlay={renderTooltipDelete}
//             >
//               <button
//                 className="aksi-button"
//                 disabled={user.isHapus === true}
//                 style={aksiButtonStyle}
//                 onClick={() => {
//                   handleClickOpenConfirmationDelete(user.id);
//                 }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </button>
//             </OverlayTrigger>
//           </TableCell>
//         </TableRow>
//         <Dialog
//           open={openConfirmationEdit}
//           onClose={handleCloseConfirmationEdit}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           maxWidth={"xs"}
//         >
//           <div style={{ padding: "30px" }}>
//             <DialogTitle id="alert-dialog-title">
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   textAlign: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
//                 </div>
//                 <b>Ubah Bukti Potong</b>
//               </div>
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Apakah Anda yakin akan mengubah Bukti Potong?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Button
//                 variant="warning"
//                 style={{ paddingTop: "10px" }}
//                 onClick={handleCloseConfirmationEdit}
//               >
//                 Tidak
//               </Button>
//               <button
//                 className="hover-button-no-icon"
//                 style={{ paddingLeft: "15px", paddingRight: "15px" }}
//                 onClick={() => {
//                   navigate(`/ebupot2126/buktiPotongPasal21/ubahRekam21/${id}`);
//                 }}
//               >
//                 Ya
//               </button>
//             </DialogActions>
//           </div>
//         </Dialog>
//         <Dialog
//           open={openConfirmationDelete}
//           onClose={handleCloseConfirmationDelete}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           maxWidth={"xs"}
//         >
//           <div style={{ padding: "30px" }}>
//             <DialogTitle id="alert-dialog-title">
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   textAlign: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
//                 </div>
//                 <b>Hapus Bukti Potong</b>
//               </div>
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Apakah Anda yakin akan menghapus Bukti Potong?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Button
//                 variant="warning"
//                 style={{ paddingTop: "10px" }}
//                 onClick={handleCloseConfirmationDelete}
//               >
//                 Tidak
//               </Button>
//               <button
//                 className="hover-button-no-icon"
//                 style={{ paddingLeft: "15px", paddingRight: "15px" }}
//                 onClick={() => {
//                   deleteFunction(id);
//                   setOpenConfirmationDelete(false);
//                 }}
//               >
//                 Ya
//               </button>
//             </DialogActions>
//           </div>
//         </Dialog>
//       </>
//     );
//   });

//   if (currentPosts.length === 0) {
//     dataTable = (
//       <TableRow>
//         <TableCell colSpan={11} style={{ textAlign: "center" }}>
//           <b>Tidak ditemukan</b>
//         </TableCell>
//       </TableRow>
//     );
//   }

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ width: "100%" }}>
//         <Table aria-label="simple table">
//           <TableHead className={classes.root}>
//             <TableRow>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 <Form.Check
//                   type="checkbox"
//                   label=""
//                   // checked={pbb}
//                   // onChange={() => setPbb(!pbb)}
//                 />
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 PERIODE
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 KODE OBJEK PAJAK
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 NOMOR BUKTI PEMOTONGAN
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 IDENTITAS DIPOTONG
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 NAMA DIPOTONG
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 JUMLAH BRUTO (RP)
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 JUMLAH DIPOTONG (RP)
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 PEREKAM
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 STATUS
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 AKSI
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>{dataTable}</TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

export function ShowTableEbupot21Bulanan({
  currentPosts,
  deleteFunction,
  setOpenLoading,
  getEbupot2126DaftarPPh21Data,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [openConfirmationDeleteMany, setOpenConfirmationDeleteMany] =
    useState(false);

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

  const handleClickOpenConfirmationDeleteMany = (id) => {
    setOpenConfirmationDeleteMany(true);
    setId(id);
  };

  const handleCloseConfirmationDeleteMany = () => {
    setOpenConfirmationDeleteMany(false);
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

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentPosts.map((post) => post.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle Individual Row Checkbox
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id); // Check if a row is selected

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
            <Form.Check
              type="checkbox"
              checked={isRowSelected(user.id)}
              onChange={() => handleRowSelect(user.id)}
            />
          </TableCell>
          <TableCell style={dataStyle}>
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
            {user.jumlahPenghasilan.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>{user.user.npwp15}</TableCell>
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
                  navigate(`/ebupot2126/buktiPotongPasal21/ubahRekam21/${id}`);
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
                  setOpenLoading(true);

                  deleteFunction(id);
                  setOpenConfirmationDelete(false);

                  setSelectedRows([]);
                  setTimeout(async () => {
                    getEbupot2126DaftarPPh21Data();
                    setOpenLoading(false);
                  }, 500);
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
        <TableCell colSpan={11} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <div
          style={{ color: "#fd397a", display: "flex", marginBottom: "20px" }}
        >
          <p style={{ paddingTop: "10px" }}>
            <b>Item Terpilih {selectedRows.length} item:</b>
          </p>
          <button
            style={{ marginLeft: "10px" }}
            className="delete-all-button"
            onClick={() => {
              handleClickOpenConfirmationDeleteMany();
            }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: "5px" }} />
            <b>Hapus Item Terpilih</b>
          </button>
        </div>
      )}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.length === currentPosts.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                NOMOR BUKTI PEMOTONGAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH DIPOTONG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PEREKAM
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
      <Dialog
        open={openConfirmationDeleteMany}
        onClose={handleCloseConfirmationDeleteMany}
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
                <ErrorOutlineIcon color="warning" sx={{ fontSize: 80 }} />
              </div>
              <b>Perhatian!</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ textAlign: "center" }}>
                <p>
                  Penghapusan Bukti Potong dalam jumlah banyak dilakukan secara
                  batch dengan memperhatikan :
                </p>
                <ol>
                  <li>
                    bukti potong yang sudah masuk pada SPT dan sudah dilaporkan
                    tidak dapat dihapus, melainkan dibatalkan satu per satu
                  </li>
                  <li>
                    penghapusan bukti potong secara batch dilakukan secara
                    antrian layaknya impor bupot
                  </li>
                  <li>
                    bukti potong yang sudah terhapus maka tidak ditampilkan,
                    sedangkan bukti potong yang gagal terhapus akan tetap
                    ditampilkan
                  </li>
                  <li>
                    Request hapus bupot yang sudah diajukan tidak dapat
                    dibatalkan
                  </li>
                </ol>
              </div>
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
              onClick={handleCloseConfirmationDeleteMany}
            >
              Batal
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                setOpenLoading(true);
                // console.log(selectedRows);
                for (let id of selectedRows) {
                  // console.log(id);
                  deleteFunction(id);
                }
                setOpenConfirmationDeleteMany(false);

                setSelectedRows([]);
                setTimeout(async () => {
                  getEbupot2126DaftarPPh21Data();
                  setOpenLoading(false);
                }, 500);
              }}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function ShowTableEbupot21FinalTidakFinal({
  currentPosts,
  deleteFunction,
  setOpenLoading,
  getEbupot2126DaftarPPh21Data,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [openConfirmationDeleteMany, setOpenConfirmationDeleteMany] =
    useState(false);

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

  const handleClickOpenConfirmationDeleteMany = (id) => {
    setOpenConfirmationDeleteMany(true);
    setId(id);
  };

  const handleCloseConfirmationDeleteMany = () => {
    setOpenConfirmationDeleteMany(false);
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

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentPosts.map((post) => post.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle Individual Row Checkbox
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id); // Check if a row is selected

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
            <Form.Check
              type="checkbox"
              checked={isRowSelected(user.id)}
              onChange={() => handleRowSelect(user.id)}
            />
          </TableCell>
          <TableCell style={dataStyle}>
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
            {user.jumlahPenghasilan.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>{user.user.npwp15}</TableCell>
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
                  navigate(`/ebupot2126/buktiPotongPasal21/ubahRekam21/${id}`);
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
                  setOpenLoading(true);

                  deleteFunction(id);
                  setOpenConfirmationDelete(false);

                  setSelectedRows([]);
                  setTimeout(async () => {
                    getEbupot2126DaftarPPh21Data();
                    setOpenLoading(false);
                  }, 500);
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
        <TableCell colSpan={11} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <div
          style={{ color: "#fd397a", display: "flex", marginBottom: "20px" }}
        >
          <p style={{ paddingTop: "10px" }}>
            <b>Item Terpilih {selectedRows.length} item:</b>
          </p>
          <button
            style={{ marginLeft: "10px" }}
            className="delete-all-button"
            onClick={() => {
              handleClickOpenConfirmationDeleteMany();
            }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: "5px" }} />
            <b>Hapus Item Terpilih</b>
          </button>
        </div>
      )}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.length === currentPosts.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                NOMOR BUKTI PEMOTONGAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH DIPOTONG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PEREKAM
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
      <Dialog
        open={openConfirmationDeleteMany}
        onClose={handleCloseConfirmationDeleteMany}
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
                <ErrorOutlineIcon color="warning" sx={{ fontSize: 80 }} />
              </div>
              <b>Perhatian!</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ textAlign: "center" }}>
                <p>
                  Penghapusan Bukti Potong dalam jumlah banyak dilakukan secara
                  batch dengan memperhatikan :
                </p>
                <ol>
                  <li>
                    bukti potong yang sudah masuk pada SPT dan sudah dilaporkan
                    tidak dapat dihapus, melainkan dibatalkan satu per satu
                  </li>
                  <li>
                    penghapusan bukti potong secara batch dilakukan secara
                    antrian layaknya impor bupot
                  </li>
                  <li>
                    bukti potong yang sudah terhapus maka tidak ditampilkan,
                    sedangkan bukti potong yang gagal terhapus akan tetap
                    ditampilkan
                  </li>
                  <li>
                    Request hapus bupot yang sudah diajukan tidak dapat
                    dibatalkan
                  </li>
                </ol>
              </div>
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
              onClick={handleCloseConfirmationDeleteMany}
            >
              Batal
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                setOpenLoading(true);
                // console.log(selectedRows);
                for (let id of selectedRows) {
                  // console.log(id);
                  deleteFunction(id);
                }
                setOpenConfirmationDeleteMany(false);

                setSelectedRows([]);
                setTimeout(async () => {
                  getEbupot2126DaftarPPh21Data();
                  setOpenLoading(false);
                }, 500);
              }}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function ShowTableEbupot21Tahunan({
  currentPosts,
  deleteFunction,
  setOpenLoading,
  getEbupot2126DaftarPPh21Data,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [openConfirmationDeleteMany, setOpenConfirmationDeleteMany] =
    useState(false);

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

  const handleClickOpenConfirmationDeleteMany = (id) => {
    setOpenConfirmationDeleteMany(true);
    setId(id);
  };

  const handleCloseConfirmationDeleteMany = () => {
    setOpenConfirmationDeleteMany(false);
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

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentPosts.map((post) => post.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle Individual Row Checkbox
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id); // Check if a row is selected

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
            <Form.Check
              type="checkbox"
              checked={isRowSelected(user.id)}
              onChange={() => handleRowSelect(user.id)}
            />
          </TableCell>
          <TableCell style={dataStyle}>
            {user.bulanPajakAwal}-{user.bulanPajakAkhir}/{user.tahunPajak}
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
            {user.jumlahPenghasilanBruto1sd7.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.jumlahPenghasilan.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pph21KurangLebihBayarMasaPajakTerakhir.toLocaleString(
              "de-DE"
            )}
          </TableCell>
          <TableCell style={dataStyle}>{user.user.npwp15}</TableCell>
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
                  navigate(
                    `/ebupot2126/buktiPotongPasal21/ubahRekam21Tahunan/${id}`
                  );
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
                  setOpenLoading(true);

                  deleteFunction(id);
                  setOpenConfirmationDelete(false);

                  setSelectedRows([]);
                  setTimeout(async () => {
                    getEbupot2126DaftarPPh21Data();
                    setOpenLoading(false);
                  }, 500);
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
        <TableCell colSpan={11} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <div
          style={{ color: "#fd397a", display: "flex", marginBottom: "20px" }}
        >
          <p style={{ paddingTop: "10px" }}>
            <b>Item Terpilih {selectedRows.length} item:</b>
          </p>
          <button
            style={{ marginLeft: "10px" }}
            className="delete-all-button"
            onClick={() => {
              handleClickOpenConfirmationDeleteMany();
            }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: "5px" }} />
            <b>Hapus Item Terpilih</b>
          </button>
        </div>
      )}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.length === currentPosts.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                NOMOR BUKTI PEMOTONGAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BRUTO MASA TERAKHIR (Rp)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH DIPOTONG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PEREKAM
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
      <Dialog
        open={openConfirmationDeleteMany}
        onClose={handleCloseConfirmationDeleteMany}
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
                <ErrorOutlineIcon color="warning" sx={{ fontSize: 80 }} />
              </div>
              <b>Perhatian!</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ textAlign: "center" }}>
                <p>
                  Penghapusan Bukti Potong dalam jumlah banyak dilakukan secara
                  batch dengan memperhatikan :
                </p>
                <ol>
                  <li>
                    bukti potong yang sudah masuk pada SPT dan sudah dilaporkan
                    tidak dapat dihapus, melainkan dibatalkan satu per satu
                  </li>
                  <li>
                    penghapusan bukti potong secara batch dilakukan secara
                    antrian layaknya impor bupot
                  </li>
                  <li>
                    bukti potong yang sudah terhapus maka tidak ditampilkan,
                    sedangkan bukti potong yang gagal terhapus akan tetap
                    ditampilkan
                  </li>
                  <li>
                    Request hapus bupot yang sudah diajukan tidak dapat
                    dibatalkan
                  </li>
                </ol>
              </div>
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
              onClick={handleCloseConfirmationDeleteMany}
            >
              Batal
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                setOpenLoading(true);
                // console.log(selectedRows);
                for (let id of selectedRows) {
                  // console.log(id);
                  deleteFunction(id);
                }
                setOpenConfirmationDeleteMany(false);

                setSelectedRows([]);
                setTimeout(async () => {
                  getEbupot2126DaftarPPh21Data();
                  setOpenLoading(false);
                }, 500);
              }}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

// export function ShowTableEbupot21Tahunan({ currentPosts, deleteFunction }) {
//   let navigate = useNavigate();
//   const classes = useStyles();
//   const [id, setId] = useState("");
//   const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
//   const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

//   const handleClickOpenConfirmationEdit = (id) => {
//     setOpenConfirmationEdit(true);
//     setId(id);
//   };

//   const handleCloseConfirmationEdit = () => {
//     setOpenConfirmationEdit(false);
//   };

//   const handleClickOpenConfirmationDelete = (id) => {
//     setOpenConfirmationDelete(true);
//     setId(id);
//   };

//   const handleCloseConfirmationDelete = () => {
//     setOpenConfirmationDelete(false);
//   };

//   const dataStyle = {
//     fontWeight: 700,
//   };

//   const aksiButtonWrapper = {
//     display: "flex",
//   };

//   const aksiButtonStyle = {
//     marginLeft: "5px",
//   };

//   const textDataStyle = {
//     fontWeight: "bold",
//     textAlign: "center",
//   };

//   const renderTooltipLihat = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Lihat</div>
//     </Tooltip>
//   );

//   const renderTooltipEdit = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Ubah</div>
//     </Tooltip>
//   );

//   const renderTooltipDelete = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Hapus</div>
//     </Tooltip>
//   );

//   const renderTooltipEmail = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       <div>Kirim Email</div>
//     </Tooltip>
//   );

//   let dataTable = currentPosts.map((user, index) => (
//     <>
//       <TableRow
//         key={user.id}
//         sx={{
//           "&:last-child td, &:last-child th": { border: 0 },
//         }}
//       >
//         <TableCell component="th" scope="row" style={dataStyle}>
//           {user.ebilling.masaPajakDariBulan}
//         </TableCell>
//         <TableCell style={dataStyle}>
//           {user.objekpajak.kodeObjekPajak}
//         </TableCell>
//         <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
//         <TableCell style={dataStyle}>
//           {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
//         </TableCell>
//         <TableCell style={dataStyle}>
//           {user.ebilling.jumlahSetor.toLocaleString("de-DE")}
//         </TableCell>
//         <TableCell style={aksiButtonWrapper}>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 50 }}
//             overlay={renderTooltipLihat}
//           >
//             <button className="aksi-button" disabled={user.isHapus === true}>
//               <RemoveRedEyeIcon fontSize="small" />
//             </button>
//           </OverlayTrigger>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 50 }}
//             overlay={renderTooltipEdit}
//           >
//             <button
//               className="aksi-button"
//               disabled={user.isHapus === true}
//               style={aksiButtonStyle}
//               onClick={() => {
//                 handleClickOpenConfirmationEdit(user.id);
//               }}
//             >
//               <EditIcon fontSize="small" />
//             </button>
//           </OverlayTrigger>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 50 }}
//             overlay={renderTooltipDelete}
//           >
//             <button
//               className="aksi-button"
//               disabled={user.isHapus === true}
//               style={aksiButtonStyle}
//               onClick={() => {
//                 handleClickOpenConfirmationDelete(user.id);
//               }}
//             >
//               <DeleteIcon fontSize="small" />
//             </button>
//           </OverlayTrigger>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 50 }}
//             overlay={renderTooltipEmail}
//           >
//             <button
//               className="aksi-button"
//               disabled={user.isHapus === true}
//               style={aksiButtonStyle}
//             >
//               <EmailIcon fontSize="small" />
//             </button>
//           </OverlayTrigger>
//         </TableCell>
//       </TableRow>
//       <Dialog
//         open={openConfirmationEdit}
//         onClose={handleCloseConfirmationEdit}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         maxWidth={"xs"}
//       >
//         <div style={{ padding: "30px" }}>
//           <DialogTitle id="alert-dialog-title">
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
//               </div>
//               <b>Ubah Bukti Potong</b>
//             </div>
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               Apakah Anda yakin akan mengubah Bukti Potong?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Button
//               variant="warning"
//               style={{ paddingTop: "10px" }}
//               onClick={handleCloseConfirmationEdit}
//             >
//               Tidak
//             </Button>
//             <button
//               className="hover-button-no-icon"
//               style={{ paddingLeft: "15px", paddingRight: "15px" }}
//               onClick={() => {
//                 navigate(`/ebupotUnifikasi/ubahDisetorSendiri/${id}`);
//               }}
//             >
//               Ya
//             </button>
//           </DialogActions>
//         </div>
//       </Dialog>
//       <Dialog
//         open={openConfirmationDelete}
//         onClose={handleCloseConfirmationDelete}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         maxWidth={"xs"}
//       >
//         <div style={{ padding: "30px" }}>
//           <DialogTitle id="alert-dialog-title">
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <HelpOutlineIcon color="primary" sx={{ fontSize: 80 }} />
//               </div>
//               <b>Hapus Bukti Potong</b>
//             </div>
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               Apakah Anda yakin akan menghapus Bukti Potong?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Button
//               variant="warning"
//               style={{ paddingTop: "10px" }}
//               onClick={handleCloseConfirmationDelete}
//             >
//               Tidak
//             </Button>
//             <button
//               className="hover-button-no-icon"
//               style={{ paddingLeft: "15px", paddingRight: "15px" }}
//               onClick={() => {
//                 deleteFunction(id);
//                 setOpenConfirmationDelete(false);
//               }}
//             >
//               Ya
//             </button>
//           </DialogActions>
//         </div>
//       </Dialog>
//     </>
//   ));

//   if (currentPosts.length === 0) {
//     dataTable = (
//       <TableRow>
//         <TableCell colSpan={12} style={{ textAlign: "center" }}>
//           <b>Tidak ditemukan</b>
//         </TableCell>
//       </TableRow>
//     );
//   }

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ width: "100%" }}>
//         <Table aria-label="simple table">
//           <TableHead className={classes.root}>
//             <TableRow>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 <Form.Check
//                   type="checkbox"
//                   label=""
//                   // checked={pbb}
//                   // onChange={() => setPbb(!pbb)}
//                 />
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 PERIODE
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 KODE OBJEK PAJAK
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 NOMOR BUKTI PEMOTONGAN
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 IDENTITAS DIPOTONG
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 NAMA DIPOTONG
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 JUMLAH BRUTO (RP)
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 JUMLAH BRUTO MASA TERAKHIR (RP)
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 JUMLAH DIPOTONG (RP)
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 PEREKAM
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 STATUS
//               </TableCell>
//               <TableCell
//                 sx={textDataStyle}
//                 className={classes.tableRightBorder}
//               >
//                 AKSI
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>{dataTable}</TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

export function ShowTableEbupot26({
  currentPosts,
  deleteFunction,
  setOpenLoading,
  getEbupot2126DaftarPPh21Data,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [openConfirmationDeleteMany, setOpenConfirmationDeleteMany] =
    useState(false);

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

  const handleClickOpenConfirmationDeleteMany = (id) => {
    setOpenConfirmationDeleteMany(true);
    setId(id);
  };

  const handleCloseConfirmationDeleteMany = () => {
    setOpenConfirmationDeleteMany(false);
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

  // Handle Select All Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentPosts.map((post) => post.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle Individual Row Checkbox
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id); // Check if a row is selected

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
            <Form.Check
              type="checkbox"
              checked={isRowSelected(user.id)}
              onChange={() => handleRowSelect(user.id)}
            />
          </TableCell>
          <TableCell style={dataStyle}>
            {user.bulanPajak} - {user.tahunPajak}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.objekpajak.kodeObjekPajak}
          </TableCell>
          <TableCell style={dataStyle}>{user.nomorBuktiSetor}</TableCell>
          <TableCell style={dataStyle}>{user.tinPasporKitasKitap}</TableCell>
          <TableCell style={dataStyle}>{user.nama}</TableCell>
          <TableCell style={dataStyle}>
            {user.jumlahPenghasilanBruto.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>
            {user.pPhYangDipotongDipungut.toLocaleString("de-DE")}
          </TableCell>
          <TableCell style={dataStyle}>{user.user.npwp15}</TableCell>
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
                  navigate(`/ebupot2126/buktiPotongPasal26/ubahRekam26/${id}`);
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
                  setOpenLoading(true);

                  deleteFunction(id);
                  setOpenConfirmationDelete(false);

                  setSelectedRows([]);
                  setTimeout(async () => {
                    getEbupot2126DaftarPPh21Data();
                    setOpenLoading(false);
                  }, 500);
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
        <TableCell colSpan={11} style={{ textAlign: "center" }}>
          <b>Tidak ditemukan</b>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <div
          style={{ color: "#fd397a", display: "flex", marginBottom: "20px" }}
        >
          <p style={{ paddingTop: "10px" }}>
            <b>Item Terpilih {selectedRows.length} item:</b>
          </p>
          <button
            style={{ marginLeft: "10px" }}
            className="delete-all-button"
            onClick={() => {
              handleClickOpenConfirmationDeleteMany();
            }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: "5px" }} />
            <b>Hapus Item Terpilih</b>
          </button>
        </div>
      )}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.length === currentPosts.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                NOMOR BUKTI PEMOTONGAN
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                IDENTITAS DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA DIPOTONG
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BRUTO (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH DIPOTONG (RP)
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PEREKAM
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
      <Dialog
        open={openConfirmationDeleteMany}
        onClose={handleCloseConfirmationDeleteMany}
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
                <ErrorOutlineIcon color="warning" sx={{ fontSize: 80 }} />
              </div>
              <b>Perhatian!</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ textAlign: "center" }}>
                <p>
                  Penghapusan Bukti Potong dalam jumlah banyak dilakukan secara
                  batch dengan memperhatikan :
                </p>
                <ol>
                  <li>
                    bukti potong yang sudah masuk pada SPT dan sudah dilaporkan
                    tidak dapat dihapus, melainkan dibatalkan satu per satu
                  </li>
                  <li>
                    penghapusan bukti potong secara batch dilakukan secara
                    antrian layaknya impor bupot
                  </li>
                  <li>
                    bukti potong yang sudah terhapus maka tidak ditampilkan,
                    sedangkan bukti potong yang gagal terhapus akan tetap
                    ditampilkan
                  </li>
                  <li>
                    Request hapus bupot yang sudah diajukan tidak dapat
                    dibatalkan
                  </li>
                </ol>
              </div>
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
              onClick={handleCloseConfirmationDeleteMany}
            >
              Batal
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                setOpenLoading(true);
                // console.log(selectedRows);
                for (let id of selectedRows) {
                  // console.log(id);
                  deleteFunction(id);
                }
                setOpenConfirmationDeleteMany(false);

                setSelectedRows([]);
                setTimeout(async () => {
                  getEbupot2126DaftarPPh21Data();
                  setOpenLoading(false);
                }, 500);
              }}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export function ShowTableEbupot2126DaftarDokumenImporData({
  currentPosts,
  getDetilValidasi,
  setOpenDetilValidasi,
}) {
  let navigate = useNavigate();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [openConfirmationEdit, setOpenConfirmationEdit] = useState(false);

  const handleClickOpenConfirmationEdit = (id) => {
    setOpenConfirmationEdit(true);
    setId(id);
  };

  const handleCloseConfirmationEdit = () => {
    setOpenConfirmationEdit(false);
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

  let dataTable = currentPosts.map((user, index) => (
    <>
      <TableRow
        key={user.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
        onClick={() => {
          getDetilValidasi(user.id);
          setOpenDetilValidasi(true);
        }}
      >
        <TableCell component="th" scope="row" style={textDataStyle}>
          {user.nomorTiket}
        </TableCell>
        <TableCell style={textDataStyle}>{user.namaFile}</TableCell>
        <TableCell style={textDataStyle}>
          {formatDateTime(user.tanggalUpload)}
        </TableCell>
        <TableCell style={textDataStyle}>{user.jumlahBaris}</TableCell>
        <TableCell style={textDataStyle}>{user.status}</TableCell>
        <TableCell style={textDataStyle}>{user.keteranganUpload}</TableCell>
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
                NOMOR TIKET
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                NAMA FILE
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                TANGGAL UPLOAD
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                JUMLAH BARIS
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
                KETERANGAN UPLOAD
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

export function ShowTableEbupot2126DaftarDetilValidasi({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

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
        <TableCell component="th" scope="row" style={textDataStyle}>
          {user.pasal}
        </TableCell>
        <TableCell style={textDataStyle}>{user.barisExcel}</TableCell>
        <TableCell style={textDataStyle}>{user.statusValidasi}</TableCell>
        <TableCell style={textDataStyle}>{user.keteranganValidasi}</TableCell>
      </TableRow>
    </>
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
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead className={classes.root}>
            <TableRow>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PASAL
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                BARIS EXCEL
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                STATUS VALIDASI
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                KETERANGAN VALIDASI
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupot26DownloadBupot({
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
        <TableCell colSpan={4} style={{ textAlign: "center" }}>
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
                PEMBETULAN KE
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

export function ShowTableEbupot2126DaftarTagihanPerekamPerKop({
  currentPosts,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const dataStyle = {
    fontWeight: 700,
  };

  const dataStyleRight = {
    fontWeight: 700,
    textAlign: "right",
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
          {user.objekpajak.kodeObjekPajak}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.jumlahDpp.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.jumlahPph.toLocaleString("de-DE")}
        </TableCell>
      </TableRow>
    </>
  ));

  if (currentPosts.length === 0) {
    dataTable = (
      <TableRow>
        <TableCell colSpan={3} style={{ textAlign: "center" }}>
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
                KOP
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PENGHASILAN BRUTO
              </TableCell>
              <TableCell
                sx={textDataStyle}
                className={classes.tableRightBorder}
              >
                PPH TERUTANG
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataTable}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function ShowTableEbupot2126DaftarTagihanPerekamPerKapKjs({
  currentPosts,
}) {
  let navigate = useNavigate();
  const classes = useStyles();

  const dataStyle = {
    fontWeight: 700,
  };

  const dataStyleRight = {
    fontWeight: 700,
    textAlign: "right",
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
          {user.jenissetoran.jenispajak.kodeJenisPajak}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.jenissetoran.kodeJenisSetoran}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDipotong.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDisetor.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
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

export function ShowTableEbupot2126BuktiSetor({
  currentPosts,
  deleteEBupot2126PphDisetorSendiri,
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
        {user.ebupot2126tagihanpemotongan.tahunPajak}
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
              deleteEBupot2126PphDisetorSendiri(user.id);
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

export function ShowTableEbupot2126RingkasanPembayaran({
  currentPosts,
  generateIdBillingFunction,
}) {
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
          {user.jenissetoran.jenispajak.kodeJenisPajak}
        </TableCell>
        <TableCell style={dataStyle}>
          {user.jenissetoran.kodeJenisSetoran}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDipotong.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {user.pphYangDisetor.toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyleRight}>
          {(user.pphYangDipotong - user.pphYangDisetor).toLocaleString("de-DE")}
        </TableCell>
        <TableCell style={dataStyle}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltipCetakBilling}
          >
            <button
              className="aksi-button"
              disabled={user.pphYangDipotong - user.pphYangDisetor === 0}
              style={aksiButtonStyle}
              onClick={() => {
                generateIdBillingFunction(user.id);
              }}
            >
              <PrintIcon fontSize="small" />
            </button>
          </OverlayTrigger>
        </TableCell>
      </TableRow>
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

export function ShowTableEbupot2126PenyiapanSpt({
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
                  `/ebupot2126/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}`
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
              onClick={() => {
                if (user.penandatanganId === null) {
                  navigate(
                    `/ebupot2126/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}`
                  );
                } else {
                  navigate(
                    `/ebupot2126/sptMasa/penyiapanSpt/lengkapiSpt/${user.id}/kirimSpt`
                  );
                }
              }}
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
                JUMLAH PPH KURANG/LEBIH SETOR
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
                KETERANGAN SPT
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

export function ShowTablePerekam({ currentPosts, ubahStatusPenandatangan }) {
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
        <TableCell colSpan={4} style={{ textAlign: "center" }}>
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
                NPWP PEREKAM
              </TableCell>
              <TableCell sx={dataStyle} className={classes.tableRightBorder}>
                NAMA PEREKAM
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

export function ShowTableEbupot2126BuktiSetorPenyiapanSpt({ currentPosts }) {
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
        {user.ebupot2126tagihanpemotongan.tahunPajak}
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

export function ShowTableEbupot2126PenyiapanSptObjekPajak({ currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();

  const aksiButtonStyle = {
    marginLeft: "5px",
  };

  const textDataStyle = {
    fontWeight: "bold",
    textAlign: "center",
  };
  let tempNo = 0;
  let isSubMenu = true;
  let totalJumlahPenerimaPenghasilan = 0;
  let totalJumlahDpp = 0;
  let totalJumlahPph = 0;

  let dataTable = currentPosts.map((user, index) => {
    let ifNotSubMenu =
      user.objekpajak.kodeObjekPajak !== "21-100-04" &&
      user.objekpajak.kodeObjekPajak !== "21-100-05" &&
      user.objekpajak.kodeObjekPajak !== "21-100-06" &&
      user.objekpajak.kodeObjekPajak !== "21-100-07" &&
      user.objekpajak.kodeObjekPajak !== "21-100-09" &&
      user.objekpajak.kodeObjekPajak !== "21-401-01" &&
      user.objekpajak.kodeObjekPajak !== "21-401-02" &&
      user.objekpajak.kodeObjekPajak !== "21-402-01" &&
      user.objekpajak.kodeObjekPajak !== "21-499-99";

    if (ifNotSubMenu) {
      tempNo++;
      totalJumlahPenerimaPenghasilan += parseInt(
        user.jumlahPenerimaPenghasilan
      );
      totalJumlahDpp += parseInt(user.jumlahDpp);
      totalJumlahPph += parseInt(user.jumlahPph);

      return (
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={textDataStyle}>
            {tempNo}
          </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>
            {user.objekpajak.namaObjekPajak.toUpperCase()}
          </TableCell>
          <TableCell sx={textDataStyle}>
            {user.objekpajak.kodeObjekPajak}
          </TableCell>
          <TableCell sx={textDataStyle}>
            <NumericFormat
              required
              value={user.jumlahPenerimaPenghasilan}
              decimalSeparator={","}
              thousandSeparator={"."}
              customInput={Form.Control}
              style={{ textAlign: "right" }}
              disabled
            />
          </TableCell>
          <TableCell sx={textDataStyle}>
            <NumericFormat
              required
              value={user.jumlahDpp}
              decimalSeparator={","}
              thousandSeparator={"."}
              customInput={Form.Control}
              style={{ textAlign: "right" }}
              disabled
            />
          </TableCell>
          <TableCell sx={textDataStyle}>
            <NumericFormat
              required
              value={user.jumlahPph}
              decimalSeparator={","}
              thousandSeparator={"."}
              customInput={Form.Control}
              style={{ textAlign: "right" }}
              disabled
            />
          </TableCell>
        </TableRow>
      );
    } else {
      if (isSubMenu) {
        isSubMenu = false;
        tempNo++;
        let find2110004 = currentPosts.find(
          (input) => input.objekpajak.kodeObjekPajak === "21-100-04"
        );
        totalJumlahPenerimaPenghasilan += parseInt(
          find2110004.jumlahPenerimaPenghasilan
        );
        totalJumlahDpp += parseInt(find2110004.jumlahDpp);
        totalJumlahPph += parseInt(find2110004.jumlahPph);

        let find2110005 = currentPosts.find(
          (input) => input.objekpajak.kodeObjekPajak === "21-100-05"
        );
        totalJumlahPenerimaPenghasilan += parseInt(
          find2110005.jumlahPenerimaPenghasilan
        );
        totalJumlahDpp += parseInt(find2110005.jumlahDpp);
        totalJumlahPph += parseInt(find2110005.jumlahPph);

        let find2110006 = currentPosts.find(
          (input) => input.objekpajak.kodeObjekPajak === "21-100-06"
        );
        totalJumlahPenerimaPenghasilan += parseInt(
          find2110006.jumlahPenerimaPenghasilan
        );
        totalJumlahDpp += parseInt(find2110006.jumlahDpp);
        totalJumlahPph += parseInt(find2110006.jumlahPph);

        let find2110007 = currentPosts.find(
          (input) => input.objekpajak.kodeObjekPajak === "21-100-07"
        );
        totalJumlahPenerimaPenghasilan += parseInt(
          find2110007.jumlahPenerimaPenghasilan
        );
        totalJumlahDpp += parseInt(find2110007.jumlahDpp);
        totalJumlahPph += parseInt(find2110007.jumlahPph);

        let find2110009 = currentPosts.find(
          (input) => input.objekpajak.kodeObjekPajak === "21-100-09"
        );
        totalJumlahPenerimaPenghasilan += parseInt(
          find2110009.jumlahPenerimaPenghasilan
        );
        totalJumlahDpp += parseInt(find2110009.jumlahDpp);
        totalJumlahPph += parseInt(find2110009.jumlahPph);

        return (
          <>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={textDataStyle}>
                4
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>BUKAN PEGAWAI</TableCell>
            </TableRow>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={textDataStyle}
              ></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                4a. {find2110004.objekpajak.namaObjekPajak.toUpperCase()}
              </TableCell>
              <TableCell sx={textDataStyle}>
                {find2110004.objekpajak.kodeObjekPajak}
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110004.jumlahPenerimaPenghasilan}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110004.jumlahDpp}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110004.jumlahPph}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
            </TableRow>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={textDataStyle}
              ></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                4b. {find2110005.objekpajak.namaObjekPajak.toUpperCase()}
              </TableCell>
              <TableCell sx={textDataStyle}>
                {find2110005.objekpajak.kodeObjekPajak}
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110005.jumlahPenerimaPenghasilan}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110005.jumlahDpp}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110005.jumlahPph}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
            </TableRow>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={textDataStyle}
              ></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                4c. {find2110006.objekpajak.namaObjekPajak.toUpperCase()}
              </TableCell>
              <TableCell sx={textDataStyle}>
                {find2110006.objekpajak.kodeObjekPajak}
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110006.jumlahPenerimaPenghasilan}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110006.jumlahDpp}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110006.jumlahPph}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
            </TableRow>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={textDataStyle}
              ></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                4d. {find2110007.objekpajak.namaObjekPajak.toUpperCase()}
              </TableCell>
              <TableCell sx={textDataStyle}>
                {find2110007.objekpajak.kodeObjekPajak}
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110007.jumlahPenerimaPenghasilan}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110007.jumlahDpp}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110007.jumlahPph}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
            </TableRow>
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={textDataStyle}
              ></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                4e. {find2110009.objekpajak.namaObjekPajak.toUpperCase()}
              </TableCell>
              <TableCell sx={textDataStyle}>
                {find2110009.objekpajak.kodeObjekPajak}
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110009.jumlahPenerimaPenghasilan}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110009.jumlahDpp}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
              <TableCell sx={textDataStyle}>
                <NumericFormat
                  required
                  value={find2110009.jumlahPph}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  customInput={Form.Control}
                  style={{ textAlign: "right" }}
                  disabled
                />
              </TableCell>
            </TableRow>
          </>
        );
      }
    }
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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PENERIMA PENGHASILAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PENERIMA PENGHASILAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PENGHASILAN BRUTO (Rp)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PAJAK DIPOTONG (Rp)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable}
          <TableRow
            key={"total"}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={textDataStyle}>
              11
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              JUMLAH (PENJUMLAHAN ANGKA 1 S.D.10)
            </TableCell>
            <TableCell sx={textDataStyle}></TableCell>
            <TableCell sx={textDataStyle}>
              <NumericFormat
                required
                value={totalJumlahPenerimaPenghasilan}
                decimalSeparator={","}
                thousandSeparator={"."}
                customInput={Form.Control}
                style={{ textAlign: "right" }}
                disabled
              />
            </TableCell>
            <TableCell sx={textDataStyle}>
              <NumericFormat
                required
                value={totalJumlahDpp}
                decimalSeparator={","}
                thousandSeparator={"."}
                customInput={Form.Control}
                style={{ textAlign: "right" }}
                disabled
              />
            </TableCell>
            <TableCell sx={textDataStyle}>
              <NumericFormat
                required
                value={totalJumlahPph}
                decimalSeparator={","}
                thousandSeparator={"."}
                customInput={Form.Control}
                style={{ textAlign: "right" }}
                disabled
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupot2126PenyiapanSptKurangLebih({ currentPosts }) {
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
      <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
        {index + 1}
      </TableCell>
      <TableCell colSpan={4} sx={{ fontWeight: "bold", textAlign: "left" }}>
        {user.nomorBuktiSetor}
      </TableCell>
      <TableCell sx={textDataStyle}>{user.nomorBuktiSetor}</TableCell>
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
              colSpan={5}
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PENGHITUNGAN PPh PASAL 21 DAN/ATAU PASAL 26 YANG KURANG (LEBIH)
              DISETOR
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataTable}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableEbupot2126PenyiapanSptObjekPajakFinal({
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
  let tempNo = 0;
  let totalJumlahDpp = 0;
  let totalJumlahPph = 0;

  let dataTable = currentPosts.map((user, index) => {
    let ifNotTampil =
      user.objekpajak.kodeObjekPajak === "21-401-01" ||
      user.objekpajak.kodeObjekPajak === "21-401-02" ||
      user.objekpajak.kodeObjekPajak === "21-402-01" ||
      user.objekpajak.kodeObjekPajak === "21-499-99";

    if (ifNotTampil) {
      tempNo++;
      totalJumlahDpp += parseInt(user.jumlahDpp);
      totalJumlahPph += parseInt(user.jumlahPph);

      return (
        <TableRow
          key={user.id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={textDataStyle}>
            {tempNo}
          </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>
            {user.objekpajak.namaObjekPajak.toUpperCase()}
          </TableCell>
          <TableCell sx={textDataStyle}>
            {user.objekpajak.kodeObjekPajak}
          </TableCell>
          <TableCell sx={textDataStyle}>
            <NumericFormat
              required
              value={user.jumlahDpp}
              decimalSeparator={","}
              thousandSeparator={"."}
              customInput={Form.Control}
              style={{ textAlign: "right" }}
              disabled
            />
          </TableCell>
          <TableCell sx={textDataStyle}>
            <NumericFormat
              required
              value={user.jumlahPph}
              decimalSeparator={","}
              thousandSeparator={"."}
              customInput={Form.Control}
              style={{ textAlign: "right" }}
              disabled
            />
          </TableCell>
        </TableRow>
      );
    }
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
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              NO
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              PENERIMA PENGHASILAN
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              KODE OBJEK PAJAK
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PENGHASILAN BRUTO (Rp)
            </TableCell>
            <TableCell sx={textDataStyle} className={classes.tableRightBorder}>
              JUMLAH PAJAK DIPOTONG (Rp)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable}
          <TableRow
            key={"total"}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={textDataStyle}>
              5
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              JUMLAH BAGIAN C (PENJUMLAHAN ANGKA 1 S.D. 5)
            </TableCell>
            <TableCell sx={textDataStyle}></TableCell>
            <TableCell sx={textDataStyle}>
              <NumericFormat
                required
                value={totalJumlahDpp}
                decimalSeparator={","}
                thousandSeparator={"."}
                customInput={Form.Control}
                style={{ textAlign: "right" }}
                disabled
              />
            </TableCell>
            <TableCell sx={textDataStyle}>
              <NumericFormat
                required
                value={totalJumlahPph}
                decimalSeparator={","}
                thousandSeparator={"."}
                customInput={Form.Control}
                style={{ textAlign: "right" }}
                disabled
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
