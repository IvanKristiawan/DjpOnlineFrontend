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

export function ShowTableGantiPeriode({ currentPosts }) {
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
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Dari Tanggal
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sampai Tanggal</TableCell>
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
                navigate(`/gantiPeriode/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.namaPeriode}
              </TableCell>
              <TableCell>{user.dariTanggal}</TableCell>
              <TableCell>{user.sampaiTanggal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePerusahaan({ currentPosts }) {
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
              Kode Perusahaan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Perusahaan
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
                navigate(`/perusahaan/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.kodePerusahaan}
              </TableCell>
              <TableCell>{user.namaPerusahaan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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

export function ShowTableUnit({ currentPosts }) {
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
              Kode Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tipe Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Wilayah
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Fax
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
                navigate(`/unit/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.kodeUnit}
              </TableCell>
              <TableCell>{user.namaUnit}</TableCell>
              <TableCell>{user.tipeUnit}</TableCell>
              <TableCell>{user.wilayah.namaWilayah}</TableCell>
              <TableCell>{user.telepon}</TableCell>
              <TableCell>{user.fax}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableAnggotaKoperasi({ currentPosts }) {
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
              No.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Telp
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rek. BPR
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rek SimTab UUO-SPI
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
                navigate(`/anggotaKoperasi/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.no}
              </TableCell>
              <TableCell>{user.noAnggota}</TableCell>
              <TableCell>{user.namaAnggota}</TableCell>
              <TableCell>{user.alamatAnggota}</TableCell>
              <TableCell>{user.noTelp}</TableCell>
              <TableCell>{user.unitAktif.namaUnit}</TableCell>
              <TableCell>{user.tglMasukFormatted}</TableCell>
              <TableCell>{user.noRekeningBpr}</TableCell>
              <TableCell>{user.noRekeningSimpanPinjam}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableAnggotaKoperasiKeluar({ currentPosts }) {
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
              No.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Telp
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rek. BPR
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rek. SimTab UUO-SPI
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
                navigate(`/anggotaKoperasiKeluar/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.no}
              </TableCell>
              <TableCell>{user.noAnggota}</TableCell>
              <TableCell>{user.namaAnggota}</TableCell>
              <TableCell>{user.alamatAnggota}</TableCell>
              <TableCell>{user.noTelp}</TableCell>
              <TableCell>{user.unitAktif.namaUnit}</TableCell>
              <TableCell>{user.tglMasukFormatted}</TableCell>
              <TableCell>{user.noRekeningBpr}</TableCell>
              <TableCell>{user.noRekeningSimpanPinjam}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKodeKartuTabungan({ currentPosts }) {
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
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jenis
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
                navigate(`/kodeKartuTabungan/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.kodeKodeKartuTabungan}
              </TableCell>
              <TableCell>{user.namaKodeKartuTabungan}</TableCell>
              <TableCell>{user.jenisKodeKartuTabungan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableAnggotaKoperasiSimpananWajib({ id, currentPosts }) {
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
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Simpanan Wajib</TableCell>
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
                navigate(
                  `/daftarSimpananWajib/simpananWajib/${user.simpananwajib.id}/${user.id}`
                );
              }}
            >
              <TableCell component="th" scope="row">
                {user.simpananwajib.noBuktiSetor}
              </TableCell>
              <TableCell>{user.tglSimpananWajibFormatted}</TableCell>
              <TableCell align="right">
                {user.simpananWajib.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableMutasiUnit({ currentPosts }) {
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
              No. SK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Unit Awal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Unit Aktif
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
                navigate(`/mutasiUnit/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.noSkMutasiUnit}
              </TableCell>
              <TableCell>{user.tglMutasiUnitFormatted}</TableCell>
              <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
              <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
              <TableCell>{user.unitLama.namaUnit}</TableCell>
              <TableCell>{user.unitBaru.namaUnit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKeluar({ currentPosts }) {
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
              No. SK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              DJA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Total
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
                navigate(`/keluar/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.noSkKeluar}
              </TableCell>
              <TableCell>{user.tglKeluarFormatted}</TableCell>
              <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
              <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
              <TableCell>{user.anggotakoperasis.unitAktif.namaUnit}</TableCell>
              <TableCell align="right">
                {user.dja.toLocaleString("en-US")}
              </TableCell>
              <TableCell align="right">
                {user.total.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePembayaranKeluar({ currentPosts }) {
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
              No. Tanda Terima
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Tanda Terima
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Simpanan Pokok
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Simpanan Wajib
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Dana Jasa Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => {
            const tempTotal = user.keluar.total;
            const tempTotalSimpananWajib =
              user.keluar.total -
              user.keluar.anggotakoperasis.simpananPokok -
              user.keluar.dja;
            return (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/pembayaranKeluar/${user.id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noTandaTerima}
                </TableCell>
                <TableCell>{user.tglTandaTerimaFormatted}</TableCell>
                <TableCell>
                  {user.keluar.anggotakoperasis.namaAnggota}
                </TableCell>
                <TableCell>
                  {user.keluar.anggotakoperasis.simpananPokok.toLocaleString(
                    "en-US"
                  )}
                </TableCell>
                <TableCell>
                  {tempTotalSimpananWajib.toLocaleString("en-US")}
                </TableCell>
                <TableCell>{user.keluar.dja.toLocaleString("en-US")}</TableCell>
                <TableCell>{tempTotal.toLocaleString("en-US")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSimpananPokok({ currentPosts }) {
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
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Simpanan Pokok</TableCell>
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
                navigate(`/simpananPokok/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.noBuktiSetor}
              </TableCell>
              <TableCell>{user.tglSimpananPokokFormatted}</TableCell>
              <TableCell>{user.noAnggota}</TableCell>
              <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
              <TableCell align="right">
                {user.simpananPokok.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarSimpananWajib({ currentPosts }) {
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
              No.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Unit
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Total
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
                navigate(`/daftarSimpananWajib/simpananWajib/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.no}
              </TableCell>
              <TableCell>{user.noBuktiSetor}</TableCell>
              <TableCell>{user.tglSimpananWajibFormatted}</TableCell>
              <TableCell>{user.unit.kodeUnit}</TableCell>
              <TableCell>{user.unit.namaUnit}</TableCell>
              <TableCell align="right">
                {user.totalSimpananWajib.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSimpananWajib({ id, currentPosts }) {
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
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Simpanan Wajib</TableCell>
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
                navigate(`/daftarSimpananWajib/simpananWajib/${id}/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.simpananwajib.noBuktiSetor}
              </TableCell>
              <TableCell>{user.tglSimpananWajibFormatted}</TableCell>
              <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
              <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
              <TableCell align="right">
                {user.simpananWajib.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSaldoDja({ currentPosts }) {
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
              No
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Saldo
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
                navigate(`/saldoDja/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.noSaldoDja}
              </TableCell>
              <TableCell>{user.tglSaldoDjaFormatted}</TableCell>
              <TableCell align="right">
                {user.saldoDja.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableShuSimpananWajib({ currentPosts }) {
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
              No
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Saldo
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
                navigate(`/shuSimpananWajib/${user.id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {user.noShuSimpananWajib}
              </TableCell>
              <TableCell>{user.tglShuSimpananWajibFormatted}</TableCell>
              <TableCell align="right">
                {user.shuSimpananWajib.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePembukaanTabunganUmum({ currentPosts }) {
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
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rekening
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah Setor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti Setor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Kartu Tabungan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => {
            let tempTableColor;

            if (user.isApprove === true) {
              tempTableColor = Colors.green400;
            }

            return (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  bgcolor: tempTableColor,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/pembukaanTabunganUmum/${user.id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.tglPembukaanTabunganUmumFormatted}
                </TableCell>
                <TableCell>{user.noRekeningTabunganUmum}</TableCell>
                <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
                <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
                <TableCell>
                  {user.jumlahSetor.toLocaleString("en-US")}
                </TableCell>
                <TableCell>{user.noBuktiSetor}</TableCell>
                <TableCell>
                  {user.kodekartutabungan.kodeKodeKartuTabungan}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSetoranTabunganUmum({ currentPosts }) {
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
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rekening
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah Setor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti Setor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Hari Bulan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Kartu Tabungan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => {
            let tempTableColor;

            if (user.isApprove === true) {
              tempTableColor = Colors.green400;
            }

            return (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  bgcolor: tempTableColor,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/setoranTabunganUmum/${user.id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.tglSetorFormatted}
                </TableCell>
                <TableCell>{user.noRekeningTabunganUmum}</TableCell>
                <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
                <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
                <TableCell>
                  {user.jumlahSetor.toLocaleString("en-US")}
                </TableCell>
                <TableCell>{user.noBuktiSetor}</TableCell>
                <TableCell>{user.hariBulan}</TableCell>
                <TableCell>
                  {user.kodekartutabungan.kodeKodeKartuTabungan}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableTarikTabunganUmum({ currentPosts }) {
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
              Tgl.
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rekening
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Anggota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah Tarik
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti Tarik
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Hari Bulan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Kartu Tabungan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((user, index) => {
            let tempTableColor;

            if (user.isApprove === true) {
              tempTableColor = Colors.green400;
            }

            return (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  bgcolor: tempTableColor,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/tarikTabunganUmum/${user.id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.tglTarikFormatted}
                </TableCell>
                <TableCell>{user.noRekeningTabunganUmum}</TableCell>
                <TableCell>{user.anggotakoperasis.noAnggota}</TableCell>
                <TableCell>{user.anggotakoperasis.namaAnggota}</TableCell>
                <TableCell>
                  {user.jumlahTarik.toLocaleString("en-US")}
                </TableCell>
                <TableCell>{user.noBuktiTarik}</TableCell>
                <TableCell>{user.hariBulan}</TableCell>
                <TableCell>
                  {user.kodekartutabungan.kodeKodeKartuTabungan}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
