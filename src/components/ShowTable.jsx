import * as React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Colors } from "../constants/styles";

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

export function ShowTableEbupotUnifikasiPphDisetorSendiri({ currentPosts }) {
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
  );
}
