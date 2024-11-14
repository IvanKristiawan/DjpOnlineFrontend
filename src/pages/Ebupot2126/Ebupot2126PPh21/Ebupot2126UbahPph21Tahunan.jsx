import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import {
  getRandomIndonesianName,
  getRandomIndonesianLocation,
} from "../../../constants/helper";
import { Card, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import {
  Paper,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import CachedIcon from "@mui/icons-material/Cached";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import CalculateIcon from "@mui/icons-material/Calculate";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        Panduan User Manual silakan download{" "}
        <a href="https://drive.google.com/file/d/11CLyj8l15-pJzPBMK9G_2-3FE4-Y6M9n/view?usp=sharing">
          disini
        </a>
      </p>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan perekaman data
        baru Bukti Pemotongan PPh 21 serta perubahannya.
      </p>
      <p>Form ini terdiri dari beberapa bagian antara lain:</p>
      <ol>
        <li>Bagian I, Identitas Wajib Pajak Yang Dipotong</li>
        <li>Bagian II, Penghasilan Yang Dipotong</li>
        <li>Bagian III, Identitas Pemotong Pajak</li>
      </ol>
      <p>Berikut ini petunjuk pengisian pada masing-masing bagian:</p>
      <p>
        <b>BAGIAN I,</b> Identitas Wajib Pajak Yang Dipotong
      </p>
      <ul>
        <li>
          Tahun Pajak, Tentukan tahun pajak saat melakukan pemotongan Pajak
          Penghasilan, tahun paling awal adalah 2020.
        </li>
        <li>
          Masa Pajak, Tentukan Masa Pajak yang sesuai untuk transaksi pemotongan
          Pajak Pengasilan, pilihan terdiri dari masa 1 s.d 12 bergantung pada
          tahun pajak yang Anda Pilih.
        </li>
        <li>
          Nomor Bukti Potong, isikan nomor bukti potong sesuai dengan Identitas,
          Identitas yang dperbolehkan digunakan hanya NPWP atau NIK(KTP), jika
          tidak memiliki, maka tidak diperbolehkan untuk dilakukan perekaman
          data dengan ketentuan yang berlaku.
        </li>
        <li>
          Dalam hal NPWP yang digunakan sebagai identitas, masukkan NPWP dari
          Wajib pajak yang dipotong, Sistem akan melakukan pencarian otomatis
          atas NPWP tersebut dan jika ditemukan datanya akan ditampilkan
          data-data yang sesuai pada isian dibawahnya.
        </li>
        <li>
          Dalam hal NIK yang digunakan sebagai identitas, masukkan NIK dari
          Wajib Pajak yang dipotong, Sistem akan melakukan pencarian data secara
          otomatis ke data yang bersumber dari Kementerian Dalam Negeri atas NIK
          yang dimasukkan.
        </li>
        <li>Tidak diperbolehkan menggunakan identitas yang tidak valid.</li>
      </ul>
      <p>
        <b>BAGIAN II,</b> Penghasilan Yang Dipotong
      </p>
      <ul>
        <li>
          Pilihlah Kode Objek Pajak dari pilihan yang tersedia, Anda dapat
          mengetikkan kata kunci untuk mempercepat pencarian objek pajak. Dengan
          memilih Kode Objek Pajak, sistem akan melakukan pencarian secara
          otomatis terhadap fasilitas yg dimilik oleh Wajib Pajak.
        </li>
        <li>Pilihlah fasilitas yang dimiliki oleh Wajib Pajak :</li>
        <ol>
          <li>
            Jika tidak memiliki fasilitas, maka pilihlah pilihan tanpa fasilitas
            pada pilihan yang tersedia.
          </li>
          <li>
            Jika memiliki fasilitas berupa dikenakan tarif sesuai Perjanjian
            Penghindaran Pajak Berganda (P3B), masukan nomor tanda terima SKD
            WPLN.
          </li>
          <li>
            Jika memiliki fasilitas DTP, masukkan Nomor Dokumen Pendukungnya
            serta NTPN atas pembayaran Penghasilan yang Ditanggung Pemerintah.
          </li>
          <li>
            Jika memiliki fasilitas lainnya, masukkan Nomor Dokumen Fasilitas
            lainnya.
          </li>
        </ol>
        <li>
          Dengan memilih Kode Objek Pajak, Sistem akan melakukan pencarian
          secara otomatis tarif dari jenis objek pajak.
        </li>
        <li>
          Isikan nilai nominal Penghasilan Bruto pada kotak yang tersedia,
          Sistem akan menghitung secara otomatis nilai Pajak Penghasilan yang
          dipotong .
        </li>
      </ul>
      <p>
        <b>BAGIAN III,</b> Identitas Pemotong
      </p>
      <ul>
        <li>
          Pastikan Anda telah melakukan perekaman data penandatangan pada menu
          Pengaturan, sebelum melakukan perekaman bukti pemotongan.
        </li>
        <li>
          Pada bagian ini, Anda harus menentukan, pihak yang akan menandatangani
          dokumen bukti pemotongan ini apakah Wajib Pajak/Wakil Wajib Wajib
          Pajak atau Kuasa.
        </li>
        <li>
          Tanggal Pemotongan adalah secara otomatis tanggal dari Sistem pada
          saat direkam Bukti Pemotongan.
        </li>
        <li>
          Pastikan isian Anda telah lengkap dan benar, kemudian contreng
          pernyataan yang disediakan yang menunjukkan Anda telah dengan seksama
          memastikan kebenaran isi dari bukti pemotongan yang dibuat, kemudian
          klik tombol simpan untuk menyimpan data.
        </li>
      </ul>
    </div>
  );
};

function Ebupot2126UbahPph21Tahunan() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // 01.) IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG
  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year

  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = [];

  for (let i = 0; i < 1; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajak, setTahunPajak] = useState("");

  const [masaPajakOptions, setMasaPajakOptions] = useState([]);
  const [identitas, setIdentitas] = useState("NPWP/NITKU");
  const [jumlahTanggunganKeluarga, setJumlahTanggunganKeluarga] = useState("");
  const [namaJabatan, setNamaJabatan] = useState("");
  const [npwpNitku, setNpwpNitku] = useState("");
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [isStatusKaryawanAsing, setIsStatusKaryawanAsing] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [namaNegara, setNamaNegara] = useState("");
  const [isNikValid, setIsNikValid] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState("Laki - laki");
  const handleJenisKelaminChange = (e) => {
    setJenisKelamin(e.target.value);
  };

  // 02.) JENIS PEMOTONGAN PPH PASAL 21
  const [kodeObjekPajak, setKodeObjekPajak] = useState("21-100-01");
  const [bulanPajakAwal, setBulanPajakAwal] = useState("");
  const [bulanPajakAkhir, setBulanPajakAkhir] = useState("");
  const [isFasilitasValid, setIsFasilitasValid] = useState(false);
  const [bupot2126FasilitasDtpIkn, setBupot2126FasilitasDtpIkn] =
    useState(false);
  const [fasilitasPajakPenghasilan, setFasilitasPajakPenghasilan] =
    useState("Tanpa Fasilitas");
  const [nomorSuketDtpIkn, setNomorSuketDtpIkn] = useState("");

  // 03.) DATA PENGHASILAN MASA PAJAK TERAKHIR
  const [jumlahPenghasilan, setJumlahPenghasilan] = useState("0");

  // 04.) DATA PENGHASILAN SETAHUN
  const [gajiAtauUangPensiunanBerkala, setGajiAtauUangPensiunanBerkala] =
    useState("0");
  const [tunjanganPph, setTunjanganPph] = useState("0");
  const [tunjanganLainnya, setTunjanganLainnya] = useState("0");
  const [honorarium, setHonorarium] = useState("0");
  const [premiAsuransi, setPremiAsuransi] = useState("0");
  const [penerimaanNatura, setPenerimaanNatura] = useState("0");
  const [
    tantiemBonusGratifikasiJasaProduksiThr,
    setTantiemBonusGratifikasiJasaProduksiThr,
  ] = useState("0");
  const [jumlahPenghasilanBruto1sd7, setJumlahPenghasilanBruto1sd7] =
    useState("0");

  // 05.) PENGURANGAN
  const [biayaJabatan, setBiayaJabatan] = useState("0");
  const [iuranPensiun, setIuranPensiun] = useState("0");
  const [zakatKeagamaan, setZakatKeagamaan] = useState("0");
  const [jumlahPengurangan9sd11, setJumlahPengurangan9sd11] = useState("0");

  // 06.) PENGHITUNGAN PPh PASAL 21
  const [jumlahPenghasilanNeto8sd12, setJumlahPenghasilanNeto8sd12] =
    useState("0");
  const [
    penghasilanNetoMasaPajakSebelumnya,
    setPenghasilanNetoMasaPajakSebelumnya,
  ] = useState("0");
  const [
    jumlahPenghasilanNetoSetahunAtauDisetahunkan,
    setJumlahPenghasilanNetoSetahunAtauDisetahunkan,
  ] = useState("0");
  const [jumlahPenghasilanNetoPilihan, setJumlahPenghasilanNetoPilihan] =
    useState("Setahun");
  const handleJumlahPenghasilanNetoPilihanChange = (e) => {
    setJumlahPenghasilanNetoPilihan(e.target.value);
  };
  const [ptkp, setPtkp] = useState("");
  const [jumlahPtkp, setJumlahPtkp] = useState("0");
  const [
    pkpSetahunAtauDisetahunkan15sd16,
    setPkpSetahunAtauDisetahunkan15sd16,
  ] = useState("0");
  const [pph21PkpSetahunAtauDisetahunkan, setPph21PkpSetahunAtauDisetahunkan] =
    useState("");
  const [
    pph21TelahDipotongMasaPajakSebelumnya,
    setPph21TelahDipotongMasaPajakSebelumnya,
  ] = useState("0");
  const [
    pph21DtpTelahDipotongMasaPajakSebelumnya,
    setPph21DtpTelahDipotongMasaPajakSebelumnya,
  ] = useState("0");
  const [pph21Terutang18sd20, setPph21Terutang18sd20] = useState("0");
  const [pph21Dipotong, setPph21Dipotong] = useState("");
  const [pph21DipotongJanuari, setPph21DipotongJanuari] = useState("");
  const [pph21DipotongFebruari, setPph21DipotongFebruari] = useState("");
  const [pph21DipotongMaret, setPph21DipotongMaret] = useState("");
  const [pph21DipotongApril, setPph21DipotongApril] = useState("");
  const [pph21DipotongMei, setPph21DipotongMei] = useState("");
  const [pph21DipotongJuni, setPph21DipotongJuni] = useState("");
  const [pph21DipotongJuli, setPph21DipotongJuli] = useState("");
  const [pph21DipotongAgustus, setPph21DipotongAgustus] = useState("");
  const [pph21DipotongSeptember, setPph21DipotongSeptember] = useState("");
  const [pph21DipotongOktober, setPph21DipotongOktober] = useState("");
  const [pph21DipotongNovember, setPph21DipotongNovember] = useState("");
  const [pph21DipotongDesember, setPph21DipotongDesember] = useState("");
  const [pph21Dtp, setPph21Dtp] = useState("");
  const [pph21DtpJanuari, setPph21DtpJanuari] = useState("");
  const [pph21DtpFebruari, setPph21DtpFebruari] = useState("");
  const [pph21DtpMaret, setPph21DtpMaret] = useState("");
  const [pph21DtpApril, setPph21DtpApril] = useState("");
  const [pph21DtpMei, setPph21DtpMei] = useState("");
  const [pph21DtpJuni, setPph21DtpJuni] = useState("");
  const [pph21DtpJuli, setPph21DtpJuli] = useState("");
  const [pph21DtpAgustus, setPph21DtpAgustus] = useState("");
  const [pph21DtpSeptember, setPph21DtpSeptember] = useState("");
  const [pph21DtpOktober, setPph21DtpOktober] = useState("");
  const [pph21DtpNovember, setPph21DtpNovember] = useState("");
  const [pph21DtpDesember, setPph21DtpDesember] = useState("");
  const [
    pph21KurangLebihBayarMasaPajakTerakhir,
    setPph21KurangLebihBayarMasaPajakTerakhir,
  ] = useState("0");
  const [
    pph21KurangLebihBayarMasaPajakTerakhirDipotong,
    setPph21KurangLebihBayarMasaPajakTerakhirDipotong,
  ] = useState("0");
  const [
    pph21KurangLebihBayarMasaPajakTerakhirDtp,
    setPph21KurangLebihBayarMasaPajakTerakhirDtp,
  ] = useState("0");

  // 07.) PENANDATANGAN BUKTI PEMOTONGAN
  const [bertindakSebagai, setBertindakSebagai] = useState(
    "Wakil Wajib Pajak (Pengurus)"
  );
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [pernyataanBenar, setPernyataanBenar] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);
  const [negaras, setNegaras] = useState([]);
  const [ptkps, setPtkps] = useState([]);
  const [penandatangans, setPenandatangans] = useState([]);

  // Handle identitas input change
  const handleIdentitasChange = (e) => {
    setIdentitas(e.target.value);
    setNpwpNitku("");
    setNik("");
    setNama("");
    setAlamat("");
  };

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  let negarasOptions = negaras.map((negara) => ({
    label: `${negara.namaNegara}`,
  }));

  let ptkpOptions = ptkps.map((ptkp) => ({
    label: `${ptkp.namaPtkp}`,
  }));

  let ptkpFullOptions = ptkps.map((ptkp) => ({
    label: `${ptkp.namaPtkp} ${ptkp.jumlahPtkp}`,
  }));

  let namaIdentitasOptions = penandatangans.map((namaIdentitas) => ({
    label: `${namaIdentitas.namaIdentitas}`,
  }));

  useEffect(() => {
    getEbupot2126UbahPph21TahunanById();
    findObjekPajakData(kodeObjekPajak);
    getNegara();
    getPtkpData();
    getPenandatangan();
  }, []);

  const getEbupot2126UbahPph21TahunanById = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupot2126Pph21Tahunans/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
    setIdentitas(response.data.identitas);
    setNpwpNitku(response.data.npwpNitku);
    setNik(response.data.nik);
    setNama(response.data.nama);
    setAlamat(response.data.alamat);
    setJenisKelamin(response.data.jenisKelamin);
    setJumlahTanggunganKeluarga(response.data.TanggunganPtkp.namaPtkp);
    setNamaJabatan(response.data.namaJabatan);
    setIsStatusKaryawanAsing(response.data.isStatusKaryawanAsing);
    if (response.data.negara) {
      setNamaNegara(response.data.negara.namaNegara);
    }

    // 02.) JENIS PEMOTONGAN PPH PASAL 21
    setKodeObjekPajak(response.data.objekpajak.kodeObjekPajak);
    setTahunPajak(response.data.tahunPajak);
    setBulanPajakAwal(response.data.bulanPajakAwal);
    setBulanPajakAkhir(response.data.bulanPajakAkhir);
    setIsFasilitasValid(response.data.isFasilitasValid);
    setBupot2126FasilitasDtpIkn(response.data.bupot2126FasilitasDtpIkn);
    setFasilitasPajakPenghasilan(response.data.fasilitasPajakPenghasilan);
    setNomorSuketDtpIkn(response.data.nomorSuketDtpIkn);

    // 03.) DATA PENGHASILAN MASA PAJAK TERAKHIR
    setJumlahPenghasilan(response.data.jumlahPenghasilan);

    // 04.) DATA PENGHASILAN SETAHUN
    setGajiAtauUangPensiunanBerkala(response.data.gajiAtauUangPensiunanBerkala);
    setTunjanganPph(response.data.tunjanganPph);
    setTunjanganLainnya(response.data.tunjanganLainnya);
    setHonorarium(response.data.honorarium);
    setPremiAsuransi(response.data.premiAsuransi);
    setPenerimaanNatura(response.data.penerimaanNatura);
    setTantiemBonusGratifikasiJasaProduksiThr(
      response.data.tantiemBonusGratifikasiJasaProduksiThr
    );
    setJumlahPenghasilanBruto1sd7(response.data.jumlahPenghasilanBruto1sd7);

    // 05.) PENGURANGAN
    setBiayaJabatan(response.data.biayaJabatan);
    setIuranPensiun(response.data.iuranPensiun);
    setZakatKeagamaan(response.data.zakatKeagamaan);
    setJumlahPengurangan9sd11(response.data.jumlahPengurangan9sd11);

    // 06.) PENGHITUNGAN PPh PASAL 21
    setJumlahPenghasilanNeto8sd12(response.data.jumlahPenghasilanNeto8sd12);
    setPenghasilanNetoMasaPajakSebelumnya(
      response.data.penghasilanNetoMasaPajakSebelumnya
    );
    setJumlahPenghasilanNetoPilihan(response.data.jumlahPenghasilanNetoPilihan);
    setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
      response.data.jumlahPenghasilanNetoSetahunAtauDisetahunkan
    );
    setPtkp(`${response.data.Ptkp.namaPtkp} ${response.data.Ptkp.jumlahPtkp}`);
    setJumlahPtkp(response.data.jumlahPtkp);
    setPkpSetahunAtauDisetahunkan15sd16(
      response.data.pkpSetahunAtauDisetahunkan15sd16
    );
    setPph21PkpSetahunAtauDisetahunkan(
      response.data.pph21PkpSetahunAtauDisetahunkan
    );
    setPph21TelahDipotongMasaPajakSebelumnya(
      response.data.pph21TelahDipotongMasaPajakSebelumnya
    );
    setPph21DtpTelahDipotongMasaPajakSebelumnya(
      response.data.pph21DtpTelahDipotongMasaPajakSebelumnya
    );
    setPph21Terutang18sd20(response.data.pph21Terutang18sd20);
    setPph21Dipotong(response.data.pph21Dipotong);
    setPph21DipotongJanuari(response.data.pph21DipotongJanuari);
    setPph21DipotongFebruari(response.data.pph21DipotongFebruari);
    setPph21DipotongMaret(response.data.pph21DipotongMaret);
    setPph21DipotongApril(response.data.pph21DipotongApril);
    setPph21DipotongMei(response.data.pph21DipotongMei);
    setPph21DipotongJuni(response.data.pph21DipotongJuni);
    setPph21DipotongJuli(response.data.pph21DipotongJuli);
    setPph21DipotongAgustus(response.data.pph21DipotongAgustus);
    setPph21DipotongSeptember(response.data.pph21DipotongSeptember);
    setPph21DipotongOktober(response.data.pph21DipotongOktober);
    setPph21DipotongNovember(response.data.pph21DipotongNovember);
    setPph21DipotongDesember(response.data.pph21DipotongDesember);
    setPph21Dtp(response.data.pph21Dtp);
    setPph21DtpJanuari(response.data.pph21DtpJanuari);
    setPph21DtpFebruari(response.data.pph21DtpFebruari);
    setPph21DtpMaret(response.data.pph21DtpMaret);
    setPph21DtpApril(response.data.pph21DtpApril);
    setPph21DtpMei(response.data.pph21DtpMei);
    setPph21DtpJuni(response.data.pph21DtpJuni);
    setPph21DtpJuli(response.data.pph21DtpJuli);
    setPph21DtpAgustus(response.data.pph21DtpAgustus);
    setPph21DtpSeptember(response.data.pph21DtpSeptember);
    setPph21DtpOktober(response.data.pph21DtpOktober);
    setPph21DtpNovember(response.data.pph21DtpNovember);
    setPph21DtpDesember(response.data.pph21DtpDesember);
    setPph21KurangLebihBayarMasaPajakTerakhir(
      response.data.pph21KurangLebihBayarMasaPajakTerakhir
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
      response.data.pph21KurangLebihBayarMasaPajakTerakhirDipotong
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDtp(
      response.data.pph21KurangLebihBayarMasaPajakTerakhirDtp
    );

    // 04.) PENANDATANGAN BUKTI PEMOTONGAN
    setBertindakSebagai(response.data.ebupot2126penandatangan.bertindakSebagai);
    setNamaIdentitas(response.data.ebupot2126penandatangan.namaIdentitas);

    hitungPph21PkpSetahunAtauDisetahunkanInitial(
      response.data.pkpSetahunAtauDisetahunkan15sd16,
      response.data.pph21TelahDipotongMasaPajakSebelumnya,
      response.data.pph21DtpTelahDipotongMasaPajakSebelumnya,
      response.data.pph21Dipotong,
      response.data.pph21Dtp
    );

    setOpenSearchIdentitasWp(false);
  };

  const getNegara = async () => {
    const response = await axios.post(`${tempUrl}/negaras`, {
      userId: user.id,
      _id: user.id,
      token: user.token,
    });
    setNegaras(response.data);
    setOpenSearchIdentitasWp(true);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const getPtkpData = async () => {
    const response = await axios.post(`${tempUrl}/ptkps`, {
      _id: user.id,
      token: user.token,
    });
    setPtkps(response.data);
  };

  const findObjekPajakData = async (kodeObjekPajak) => {
    const response = await axios.post(`${tempUrl}/objekPajakByKode`, {
      kodeObjekPajak,
      _id: user.id,
      token: user.token,
    });
    if (response.data) {
      // Kondisi
      setBupot2126FasilitasDtpIkn(response.data.bupot2126FasilitasDtpIkn);
    } else {
      // Kondisi
      setBupot2126FasilitasDtpIkn(false);
    }
  };

  const findMasaPajakOptions = async () => {
    setOpenSearchIdentitasWp(true);
    let masaPajakOptions = [
      "11",
      "10",
      "09",
      "08",
      "07",
      "06",
      "05",
      "04",
      "03",
      "02",
      "01",
    ];

    setMasaPajakOptions(masaPajakOptions);

    setOpenSearchIdentitasWp(false);
  };

  const getPenandatangan = async () => {
    let bertindakSebagai = "Wakil Wajib Pajak (Pengurus)";

    const response = await axios.post(
      `${tempUrl}/eBupot2126PenandatangansByUserByBertindakSebagai`,
      {
        bertindakSebagai,
        userEBupot2126PenandatanganId: user.id,
        _id: user.id,
        token: user.token,
      }
    );
    if (response.data.length > 0) {
      setPenandatangans(response.data);
      setOpenSearchIdentitasWp(true);

      setTimeout(async () => {
        setOpenSearchIdentitasWp(false);
      }, 500);
    } else {
      setPenandatangans([]);
      setNamaIdentitas("");
    }
  };

  const handleCloseConfirmationSearchSuratSetoranPajak = () => {
    setOpenConfirmationSearchIdentitasWp(false);
  };

  // Handle Fasilitas Pajak Penghasilan input change
  const handleFasilitasPajakPenghasilanChange = (e) => {
    setFasilitasPajakPenghasilan(e.target.value);
  };

  const handleClickOpenConfirmationSearchIdentitasWpNpwpNitku = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (npwpNitku.length < 15) {
      return;
    } else {
      setOpenSearchIdentitasWp(true);

      const response = await axios.post(
        `${tempUrl}/eBupot2126Pph21ByNpwpNitku`,
        {
          userEBupot2126Pph21Id: user.id,
          npwpNitku,
          _id: user.id,
          token: user.token,
          kodeCabang: user.cabang.id,
        }
      );

      if (response.data) {
        setNama(response.data.nama);
        setAlamat(response.data.alamat);
      } else {
        setNama(getRandomIndonesianName());
        setAlamat(getRandomIndonesianLocation());
      }

      setTimeout(async () => {
        setOpenSearchIdentitasWp(false);
      }, 500);
    }
  };

  const handleClickOpenConfirmationSearchIdentitasWpNik = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (nik.length < 16 || nama.length === 0) {
      return;
    } else {
      setOpenSearchIdentitasWp(true);

      const response = await axios.post(`${tempUrl}/eBupot2126Pph21ByNik`, {
        userEBupot2126Pph21Id: user.id,
        nik,
        nama,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      });

      if (response.data) {
        setAlamat(response.data.alamat);
      } else {
        setAlamat(getRandomIndonesianLocation());
      }

      setTimeout(() => {
        setIsNikValid(true);
        setOpenSearchIdentitasWp(false);
        setOpenFoundIdentitasWp(true);
      }, 500);
    }
  };

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const updateEbupot2126InputPph21Tahunan = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      nama.length !== 0 &&
      alamat.length !== 0 &&
      jenisKelamin.length !== 0 &&
      jumlahTanggunganKeluarga.length !== 0 &&
      namaJabatan.length !== 0 &&
      kodeObjekPajak.length !== 0 &&
      tahunPajak.length !== 0 &&
      bulanPajakAwal.length !== 0 &&
      bulanPajakAkhir.length !== 0 &&
      jumlahPenghasilan.length !== 0 &&
      gajiAtauUangPensiunanBerkala.length !== 0 &&
      tunjanganPph.length !== 0 &&
      tunjanganLainnya.length !== 0 &&
      honorarium.length !== 0 &&
      premiAsuransi.length !== 0 &&
      penerimaanNatura.length !== 0 &&
      tantiemBonusGratifikasiJasaProduksiThr.length !== 0 &&
      jumlahPenghasilanBruto1sd7.length !== 0 &&
      biayaJabatan.length !== 0 &&
      iuranPensiun.length !== 0 &&
      zakatKeagamaan.length !== 0 &&
      jumlahPengurangan9sd11.length !== 0 &&
      jumlahPenghasilanNeto8sd12.length !== 0 &&
      penghasilanNetoMasaPajakSebelumnya.length !== 0 &&
      jumlahPenghasilanNetoPilihan.length !== 0 &&
      jumlahPenghasilanNetoSetahunAtauDisetahunkan.length !== 0 &&
      ptkp.length !== 0 &&
      jumlahPtkp.length !== 0 &&
      pkpSetahunAtauDisetahunkan15sd16.length !== 0 &&
      pph21PkpSetahunAtauDisetahunkan.length !== 0 &&
      pph21TelahDipotongMasaPajakSebelumnya.length !== 0 &&
      pph21DtpTelahDipotongMasaPajakSebelumnya.length !== 0 &&
      pph21Terutang18sd20.length !== 0 &&
      pph21Dipotong.length !== 0 &&
      pph21DipotongJanuari.length !== 0 &&
      pph21DipotongFebruari.length !== 0 &&
      pph21DipotongMaret.length !== 0 &&
      pph21DipotongApril.length !== 0 &&
      pph21DipotongMei.length !== 0 &&
      pph21DipotongJuni.length !== 0 &&
      pph21DipotongJuli.length !== 0 &&
      pph21DipotongAgustus.length !== 0 &&
      pph21DipotongSeptember.length !== 0 &&
      pph21DipotongOktober.length !== 0 &&
      pph21DipotongNovember.length !== 0 &&
      pph21DipotongDesember.length !== 0 &&
      pph21Dtp.length !== 0 &&
      pph21DtpJanuari.length !== 0 &&
      pph21DtpFebruari.length !== 0 &&
      pph21DtpMaret.length !== 0 &&
      pph21DtpApril.length !== 0 &&
      pph21DtpMei.length !== 0 &&
      pph21DtpJuni.length !== 0 &&
      pph21DtpJuli.length !== 0 &&
      pph21DtpAgustus.length !== 0 &&
      pph21DtpSeptember.length !== 0 &&
      pph21DtpOktober.length !== 0 &&
      pph21DtpNovember.length !== 0 &&
      pph21DtpDesember.length !== 0 &&
      pph21KurangLebihBayarMasaPajakTerakhir.length !== 0 &&
      pph21KurangLebihBayarMasaPajakTerakhirDipotong.length !== 0 &&
      pph21KurangLebihBayarMasaPajakTerakhirDtp.length !== 0 &&
      bertindakSebagai.length !== 0 &&
      namaIdentitas.length !== 0;

    if (handlingInput) {
      try {
        setOpenSearchIdentitasWp(true);
        let updatedEBupot2126Pph21Tahunan = await axios.post(
          `${tempUrl}/updateEBupot2126Pph21Tahunan/${id}`,
          {
            userId: user.id,

            // 02.) JENIS PEMOTONGAN PPH PASAL 21
            isFasilitasValid,
            bupot2126FasilitasDtpIkn,
            fasilitasPajakPenghasilan,
            nomorSuketDtpIkn,

            // 03.) DATA PENGHASILAN MASA PAJAK TERAKHIR
            jumlahPenghasilan,

            // 04.) DATA PENGHASILAN SETAHUN
            gajiAtauUangPensiunanBerkala,
            tunjanganPph,
            tunjanganLainnya,
            honorarium,
            premiAsuransi,
            penerimaanNatura,
            tantiemBonusGratifikasiJasaProduksiThr,
            jumlahPenghasilanBruto1sd7,

            // 05.) PENGURANGAN
            biayaJabatan,
            iuranPensiun,
            zakatKeagamaan,
            jumlahPengurangan9sd11,

            // 06.) PENGHITUNGAN PPh PASAL 21
            jumlahPenghasilanNeto8sd12,
            penghasilanNetoMasaPajakSebelumnya,
            jumlahPenghasilanNetoPilihan,
            jumlahPenghasilanNetoSetahunAtauDisetahunkan,
            ptkp: ptkp.split(" ", 1)[0], // FK
            jumlahPtkp,
            pkpSetahunAtauDisetahunkan15sd16,
            pph21PkpSetahunAtauDisetahunkan,
            pph21TelahDipotongMasaPajakSebelumnya,
            pph21DtpTelahDipotongMasaPajakSebelumnya,
            pph21Terutang18sd20,
            pph21Dipotong,
            pph21DipotongJanuari,
            pph21DipotongFebruari,
            pph21DipotongMaret,
            pph21DipotongApril,
            pph21DipotongMei,
            pph21DipotongJuni,
            pph21DipotongJuli,
            pph21DipotongAgustus,
            pph21DipotongSeptember,
            pph21DipotongOktober,
            pph21DipotongNovember,
            pph21DipotongDesember,
            pph21Dtp,
            pph21DtpJanuari,
            pph21DtpFebruari,
            pph21DtpMaret,
            pph21DtpApril,
            pph21DtpMei,
            pph21DtpJuni,
            pph21DtpJuli,
            pph21DtpAgustus,
            pph21DtpSeptember,
            pph21DtpOktober,
            pph21DtpNovember,
            pph21DtpDesember,
            pph21KurangLebihBayarMasaPajakTerakhir,
            pph21KurangLebihBayarMasaPajakTerakhirDipotong,
            pph21KurangLebihBayarMasaPajakTerakhirDtp,

            // 07.) PENANDATANGAN BUKTI PEMOTONGAN
            namaIdentitas, // FK

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          setOpenSaved(true);
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupot2126InputPph21Tahunan = async (e) => {
    setOpenSaved(false);

    setValidated(false);

    // 01.) IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG
    setIdentitas("NPWP/NITKU");
    setJumlahTanggunganKeluarga("");
    setNamaJabatan("");
    setNpwpNitku("");
    setNik("");
    setNama("");
    setIsStatusKaryawanAsing(false);
    setAlamat("");
    setNamaNegara("");
    setIsNikValid(false);
    setJenisKelamin("Laki - laki");

    // 02.) JENIS PEMOTONGAN PPH PASAL 21
    setKodeObjekPajak("21-100-01");
    setBulanPajakAwal("");
    setBulanPajakAkhir("");
    setIsFasilitasValid(false);
    setBupot2126FasilitasDtpIkn(false);
    setFasilitasPajakPenghasilan("Tanpa Fasilitas");
    setNomorSuketDtpIkn("");

    // 03.) DATA PENGHASILAN MASA PAJAK TERAKHIR
    setJumlahPenghasilan("0");

    // 04.) DATA PENGHASILAN SETAHUN
    setGajiAtauUangPensiunanBerkala("0");
    setTunjanganPph("0");
    setTunjanganLainnya("0");
    setHonorarium("0");
    setPremiAsuransi("0");
    setPenerimaanNatura("0");
    setTantiemBonusGratifikasiJasaProduksiThr("0");
    setJumlahPenghasilanBruto1sd7("0");

    // 05.) PENGURANGAN
    setBiayaJabatan("0");
    setIuranPensiun("0");
    setZakatKeagamaan("0");
    setJumlahPengurangan9sd11("0");

    // 06.) PENGHITUNGAN PPh PASAL 21
    setJumlahPenghasilanNeto8sd12("0");
    setPenghasilanNetoMasaPajakSebelumnya("0");
    setJumlahPenghasilanNetoSetahunAtauDisetahunkan("0");
    setJumlahPenghasilanNetoPilihan("Setahun");
    setPtkp("");
    setJumlahPtkp("0");
    setPkpSetahunAtauDisetahunkan15sd16("0");
    setPph21PkpSetahunAtauDisetahunkan("");
    setPph21TelahDipotongMasaPajakSebelumnya("0");
    setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
    setPph21Terutang18sd20("0");
    setPph21Dipotong("");
    setPph21DipotongJanuari("");
    setPph21DipotongFebruari("");
    setPph21DipotongMaret("");
    setPph21DipotongApril("");
    setPph21DipotongMei("");
    setPph21DipotongJuni("");
    setPph21DipotongJuli("");
    setPph21DipotongAgustus("");
    setPph21DipotongSeptember("");
    setPph21DipotongOktober("");
    setPph21DipotongNovember("");
    setPph21DipotongDesember("");
    setPph21Dtp("");
    setPph21DtpJanuari("");
    setPph21DtpFebruari("");
    setPph21DtpMaret("");
    setPph21DtpApril("");
    setPph21DtpMei("");
    setPph21DtpJuni("");
    setPph21DtpJuli("");
    setPph21DtpAgustus("");
    setPph21DtpSeptember("");
    setPph21DtpOktober("");
    setPph21DtpNovember("");
    setPph21DtpDesember("");
    setPph21KurangLebihBayarMasaPajakTerakhir("0");
    setPph21KurangLebihBayarMasaPajakTerakhirDipotong("0");
    setPph21KurangLebihBayarMasaPajakTerakhirDtp("0");

    // 07.) PENANDATANGAN BUKTI PEMOTONGAN
    setBertindakSebagai("");
    setNamaIdentitas("");
    setPernyataanBenar(false);
    setOpenSaved(false);
  };

  const hitungPph21PkpSetahunAtauDisetahunkanInitial = async (
    pkpSetahunAtauDisetahunkan15sd16,
    pph21TelahDipotongMasaPajakSebelumnya,
    pph21DtpTelahDipotongMasaPajakSebelumnya,
    pph21Dipotong,
    pph21Dtp
  ) => {
    setOpenSearchIdentitasWp(true);

    const findPkp = await axios.post(`${tempUrl}/pkpTarifByJumlahPenghasilan`, {
      jumlahPenghasilan: parseInt(pkpSetahunAtauDisetahunkan15sd16),
      _id: user.id,
      token: user.token,
    });
    let finalPph21PkpSetahunAtauDisetahunkan =
      (parseInt(pkpSetahunAtauDisetahunkan15sd16) *
        parseInt(findPkp.data.tarifPersen)) /
      100;

    setPph21PkpSetahunAtauDisetahunkan(finalPph21PkpSetahunAtauDisetahunkan);

    let totalPph21Terutang18sd20 =
      parseInt(finalPph21PkpSetahunAtauDisetahunkan) -
      parseInt(pph21TelahDipotongMasaPajakSebelumnya) -
      parseInt(pph21DtpTelahDipotongMasaPajakSebelumnya);
    setPph21Terutang18sd20(totalPph21Terutang18sd20);

    let totalPph21KurangLebihBayarMasaPajakTerakhir =
      parseInt(totalPph21Terutang18sd20) -
      parseInt(pph21Dipotong) -
      parseInt(pph21Dtp);
    setPph21KurangLebihBayarMasaPajakTerakhir(
      totalPph21KurangLebihBayarMasaPajakTerakhir
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
      totalPph21KurangLebihBayarMasaPajakTerakhir
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const hitungPph21PkpSetahunAtauDisetahunkan = async () => {
    setOpenSearchIdentitasWp(true);

    const findPkp = await axios.post(`${tempUrl}/pkpTarifByJumlahPenghasilan`, {
      jumlahPenghasilan: parseInt(pkpSetahunAtauDisetahunkan15sd16),
      _id: user.id,
      token: user.token,
    });
    let finalPph21PkpSetahunAtauDisetahunkan =
      (parseInt(pkpSetahunAtauDisetahunkan15sd16) *
        parseInt(findPkp.data.tarifPersen)) /
      100;

    setPph21PkpSetahunAtauDisetahunkan(finalPph21PkpSetahunAtauDisetahunkan);

    let totalPph21Terutang18sd20 =
      parseInt(finalPph21PkpSetahunAtauDisetahunkan) -
      parseInt(pph21TelahDipotongMasaPajakSebelumnya) -
      parseInt(pph21DtpTelahDipotongMasaPajakSebelumnya);
    setPph21Terutang18sd20(totalPph21Terutang18sd20);

    let totalPph21KurangLebihBayarMasaPajakTerakhir =
      parseInt(totalPph21Terutang18sd20) -
      parseInt(pph21Dipotong) -
      parseInt(pph21Dtp);
    setPph21KurangLebihBayarMasaPajakTerakhir(
      totalPph21KurangLebihBayarMasaPajakTerakhir
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
      totalPph21KurangLebihBayarMasaPajakTerakhir
    );
    setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const cariPphPasal21Dipotong = async () => {
    if (npwpNitku.length === 0 && nik.length === 0) {
      setOpenConfirmationSearchIdentitasWp(true);
      setDetilSearchIdentitasWp(
        "Harap pastikan isian Anda telah sesuai untuk Identitas Dipotong dan Tahun Pajak"
      );
      return;
    }

    if (
      tahunPajak.length > 0 &&
      bulanPajakAwal.length > 0 &&
      bulanPajakAkhir.length > 0
    ) {
      setOpenSearchIdentitasWp(true);

      let totalPph21Dipotong = 0;
      for (let i = parseInt(bulanPajakAwal); i <= 12; i++) {
        // console.log(i);
        const response = await axios.post(
          `${tempUrl}/eBupot2126Pph21sBulananByUserSearch`,
          {
            userEBupot2126Pph21Id: user.id,
            npwpNitku,
            nik,
            tahunPajak,
            bulanPajak: String(i).padStart(2, "0"),
            _id: user.id,
            token: user.token,
            kodeCabang: user.cabang.id,
          }
        );
        // console.log(response.data);

        let totalPPhYangDipotongDipungut = 0;
        for (let data of response.data) {
          totalPPhYangDipotongDipungut += data.pPhYangDipotongDipungut;
          totalPph21Dipotong += data.pPhYangDipotongDipungut;
        }

        if (i == 1) {
          setPph21DipotongJanuari(totalPPhYangDipotongDipungut);
        } else if (i == 2) {
          setPph21DipotongFebruari(totalPPhYangDipotongDipungut);
        } else if (i == 3) {
          setPph21DipotongMaret(totalPPhYangDipotongDipungut);
        } else if (i == 4) {
          setPph21DipotongApril(totalPPhYangDipotongDipungut);
        } else if (i == 5) {
          setPph21DipotongMei(totalPPhYangDipotongDipungut);
        } else if (i == 6) {
          setPph21DipotongJuni(totalPPhYangDipotongDipungut);
        } else if (i == 7) {
          setPph21DipotongJuli(totalPPhYangDipotongDipungut);
        } else if (i == 8) {
          setPph21DipotongAgustus(totalPPhYangDipotongDipungut);
        } else if (i == 9) {
          setPph21DipotongSeptember(totalPPhYangDipotongDipungut);
        } else if (i == 10) {
          setPph21DipotongOktober(totalPPhYangDipotongDipungut);
        } else if (i == 11) {
          setPph21DipotongNovember(totalPPhYangDipotongDipungut);
        } else if (i == 12) {
          setPph21DipotongDesember("0");
        }
      }
      setPph21Dipotong(totalPph21Dipotong);

      let totalPph21KurangLebihBayarMasaPajakTerakhir =
        parseInt(pph21Terutang18sd20) -
        parseInt(totalPph21Dipotong) -
        parseInt(pph21Dtp);
      setPph21KurangLebihBayarMasaPajakTerakhir(
        totalPph21KurangLebihBayarMasaPajakTerakhir
      );
      setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
        totalPph21KurangLebihBayarMasaPajakTerakhir
      );
      setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);

      setTimeout(async () => {
        setOpenSearchIdentitasWp(false);
      }, 500);
    } else {
      setOpenConfirmationSearchIdentitasWp(true);
      setDetilSearchIdentitasWp(
        "Harap pastikan isian Anda telah sesuai untuk Identitas Dipotong dan Tahun Pajak"
      );
      return;
    }
  };

  const cariPphPasal21Dtp = async () => {
    if (npwpNitku.length === 0 && nik.length === 0) {
      setOpenConfirmationSearchIdentitasWp(true);
      setDetilSearchIdentitasWp(
        "Harap pastikan isian Anda telah sesuai untuk Identitas Dipotong dan Tahun Pajak"
      );
      return;
    }

    if (
      tahunPajak.length > 0 &&
      bulanPajakAwal.length > 0 &&
      bulanPajakAkhir.length > 0
    ) {
      setOpenSearchIdentitasWp(true);

      let totalPph21Dtp = 0;
      for (let i = parseInt(bulanPajakAwal); i <= 12; i++) {
        let totalPPhYangDtp = 0;

        if (i == 1) {
          setPph21DtpJanuari(totalPPhYangDtp);
        } else if (i == 2) {
          setPph21DtpFebruari(totalPPhYangDtp);
        } else if (i == 3) {
          setPph21DtpMaret(totalPPhYangDtp);
        } else if (i == 4) {
          setPph21DtpApril(totalPPhYangDtp);
        } else if (i == 5) {
          setPph21DtpMei(totalPPhYangDtp);
        } else if (i == 6) {
          setPph21DtpJuni(totalPPhYangDtp);
        } else if (i == 7) {
          setPph21DtpJuli(totalPPhYangDtp);
        } else if (i == 8) {
          setPph21DtpAgustus(totalPPhYangDtp);
        } else if (i == 9) {
          setPph21DtpSeptember(totalPPhYangDtp);
        } else if (i == 10) {
          setPph21DtpOktober(totalPPhYangDtp);
        } else if (i == 11) {
          setPph21DtpNovember(totalPPhYangDtp);
        } else if (i == 12) {
          setPph21DtpDesember("0");
        }
      }
      setPph21Dtp(totalPph21Dtp);

      let totalPph21KurangLebihBayarMasaPajakTerakhir =
        parseInt(pph21Terutang18sd20) -
        parseInt(pph21Dipotong) -
        parseInt(totalPph21Dtp);
      setPph21KurangLebihBayarMasaPajakTerakhir(
        totalPph21KurangLebihBayarMasaPajakTerakhir
      );
      setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
        totalPph21KurangLebihBayarMasaPajakTerakhir
      );
      setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);

      setTimeout(async () => {
        setOpenSearchIdentitasWp(false);
      }, 500);
    } else {
      setOpenConfirmationSearchIdentitasWp(true);
      setDetilSearchIdentitasWp(
        "Harap pastikan isian Anda telah sesuai untuk Identitas Dipotong dan Tahun Pajak"
      );
      return;
    }
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
    width: screenSize >= 900 ? "60%" : "100%",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "0px 80px 100px 100px" : "80px 10px 40px 10px",
    padding: screenSize >= 900 ? "20px 50px 20px 20px" : "20px 20px 20px 20px",
    display: screenSize >= 900 && "flex",
    justifyContent: screenSize >= 900 && "space-around",
    background: "#EBECF1",
  };

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  const inputWrapper = {
    width: "100%",
    color: "#646c9a",
    display: "flex",
    flexDirection: screenSize <= 900 && "column",
  };

  const inputInput1 = {
    flex: 1,
  };

  const inputInput2 = {
    flex: 1,
    marginLeft: screenSize >= 900 && "20px",
  };

  const inputInput3 = {
    flex: 1.5,
    marginLeft: screenSize >= 900 && "20px",
  };

  const inputWrapperDialogueSaved = {
    marginTop: screenSize >= 1000 && "20px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
    paddingLeft: screenSize >= 600 && "60px",
    paddingRight: screenSize >= 600 && "60px",
  };

  const inputRadioWrapper = {
    display: screenSize >= 900 && "flex",
  };

  const inputRadio = {
    cursor: "pointer",
    marginLeft: screenSize >= 900 && "20px",
  };

  const inputTindakanRadio = {
    cursor: "pointer",
    marginLeft: screenSize >= 900 && "20px",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/buktiPotongPasal21"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <PetunjukPengisian
            defaultCollapse={screenSize >= 900 ? false : true}
            width={"240px"}
            titlePetunjuk={"Petunjuk Pengisian"}
            PetunjukPengisianComponent={PetunjukPengisianComponent}
          />
        </div>
        <div style={inputContainer}>
          <MenuEbupot2126 />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="hover-button"
              style={{ marginRight: "4px" }}
              onClick={() => {
                navigate("/ebupot2126/posting");
              }}
            >
              <CachedIcon fontSize="small" style={{ marginRight: "4px" }} />
              Posting
            </button>
          </div>
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Perekaman Bukti Potong Pasal 21
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={updateEbupot2126InputPph21Tahunan}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid rgba(33, 44, 95, 0.1)",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      className="menu-data-profil-text-active"
                      style={{ marginRight: "10px" }}
                    >
                      <CalendarMonthIcon fontSize="small" /> Tahunan A1
                    </div>
                  </div>
                  <div>
                    <div style={titleContainer}>
                      <div style={titleWrapper}>TAHUNAN A1</div>
                    </div>
                    <div style={submenuContainer}>
                      <div style={submenuWrapper}>
                        IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG
                      </div>
                    </div>
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Identitas
                          </Form.Label>
                          <Col sm="8" className="mt-2">
                            <div style={inputRadioWrapper}>
                              <Form.Check
                                type="radio"
                                label="NPWP/NITKU"
                                name="NPWP/NITKU"
                                value="NPWP/NITKU"
                                checked={identitas === "NPWP/NITKU"}
                                style={{ cursor: "pointer" }}
                                disabled
                              />
                              <Form.Check
                                type="radio"
                                label="NIK"
                                name="NIK"
                                value="NIK"
                                checked={identitas === "NIK"}
                                style={inputRadio}
                                disabled
                              />
                            </div>
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputInput2}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="8">
                            Status/Jumlah Tanggungan Keluarga untuk PTKP
                          </Form.Label>
                          <Col sm="4" className="mt-2">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={ptkpOptions}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  error={
                                    validated &&
                                    jumlahTanggunganKeluarga.length === 0
                                  }
                                  helperText={
                                    validated &&
                                    jumlahTanggunganKeluarga.length === 0 &&
                                    "Kolom ini diperlukan."
                                  }
                                  {...params}
                                />
                              )}
                              inputValue={jumlahTanggunganKeluarga}
                              value={jumlahTanggunganKeluarga}
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        {identitas === "NPWP/NITKU" ? (
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="4">
                              NPWP/NITKU
                            </Form.Label>
                            <Col sm="6">
                              <Form.Control
                                required
                                value={npwpNitku}
                                isInvalid={
                                  npwpNitku.length > 0 && npwpNitku.length < 15
                                }
                                disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                {npwpNitku.length === 0
                                  ? "Kolom ini diperlukan."
                                  : "Isian belum lengkap."}
                              </Form.Control.Feedback>
                            </Col>
                            <Col sm="2">
                              <button className="hover-button-no-icon" disabled>
                                Cek
                              </button>
                            </Col>
                          </Form.Group>
                        ) : (
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="4">
                              NIK
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control
                                required
                                value={nik}
                                isInvalid={nik.length > 0 && nik.length < 16}
                                disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                Isian belum lengkap.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        )}
                      </div>
                      <div style={inputInput2}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Nama Jabatan
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              required
                              value={namaJabatan}
                              disabled
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                    <div style={inputWrapper}>
                      {identitas === "NPWP/NITKU" ? (
                        <>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="4">
                                Nama
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control value={nama} disabled />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="4">
                                Status Karyawan Asing
                              </Form.Label>
                              <Col sm="8">
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={isStatusKaryawanAsing}
                                        disabled
                                      />
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Form.Group>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="4">
                                Nama
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control required value={nama} disabled />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="4">
                                Status Karyawan Asing
                              </Form.Label>
                              <Col sm="8">
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={isStatusKaryawanAsing}
                                        disabled
                                      />
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Form.Group>
                          </div>
                        </>
                      )}
                    </div>
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        {identitas === "NPWP/NITKU" ? (
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="4">
                              Alamat
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control value={alamat} disabled />
                            </Col>
                          </Form.Group>
                        ) : (
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="4">
                              Alamat
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control required value={alamat} disabled />
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        )}
                      </div>
                      <div style={inputInput2}>
                        <Form.Group
                          as={Row}
                          className="mb-4"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Negara
                          </Form.Label>
                          <Col sm="8">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={negarasOptions}
                              renderInput={(params) => (
                                <TextField size="small" {...params} />
                              )}
                              inputValue={namaNegara}
                              value={namaNegara}
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                    <div style={inputWrapper}>
                      {identitas === "NPWP/NITKU" ? (
                        <>
                          <div style={inputInput1}></div>
                          <div style={inputInput2}></div>
                        </>
                      ) : (
                        <>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="4"></Col>
                              <Col sm="3">
                                <button className="hover-button" disabled>
                                  <SearchIcon
                                    fontSize="small"
                                    style={{ marginRight: "4px" }}
                                  />
                                  Cek
                                </button>
                              </Col>
                              {isNikValid ? (
                                <Col sm="5">
                                  <div style={{ display: "flex" }}>
                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={isNikValid}
                                            disabled
                                          />
                                        }
                                      />
                                    </FormGroup>
                                    <p style={{ marginTop: "8px" }}>Valid</p>
                                  </div>
                                </Col>
                              ) : (
                                <Col sm="5">
                                  <div style={{ marginTop: "8px" }}>
                                    <p>Tidak Valid</p>
                                  </div>
                                </Col>
                              )}
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </>
                      )}
                    </div>
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Jenis Kelamin
                          </Form.Label>
                          <Col sm="8" className="mt-2">
                            <div style={inputRadioWrapper}>
                              <Form.Check
                                type="radio"
                                label="Laki - laki"
                                name="Laki - laki"
                                value="Laki - laki"
                                checked={jenisKelamin === "Laki - laki"}
                                style={{ cursor: "pointer" }}
                                disabled
                              />
                              <Form.Check
                                type="radio"
                                label="Perempuan"
                                name="Perempuan"
                                value="Perempuan"
                                checked={jenisKelamin === "Perempuan"}
                                style={inputRadio}
                                disabled
                              />
                            </div>
                          </Col>
                        </Form.Group>
                      </div>
                      <div style={inputInput2}></div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>
                      JENIS PEMOTONGAN PPH PASAL 21
                    </div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="4">
                          Kode Objek Pajak
                        </Form.Label>
                        <Col sm="8" className="mt-2">
                          <div style={inputRadioWrapper}>
                            <Form.Check
                              type="radio"
                              label="21-100-01"
                              name="21-100-01"
                              value="21-100-01"
                              checked={kodeObjekPajak === "21-100-01"}
                              style={{ cursor: "pointer" }}
                              disabled
                            />
                            <Form.Check
                              type="radio"
                              label="21-100-02"
                              name="21-100-02"
                              value="21-100-02"
                              checked={kodeObjekPajak === "21-100-02"}
                              style={inputRadio}
                              disabled
                            />
                          </div>
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputInput3}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Col sm="5">
                          <p>Tahun dan Masa Pajak</p>
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={tahunPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                label="Pilih Tahun Pajak"
                                error={validated && tahunPajak.length === 0}
                                helperText={
                                  validated &&
                                  tahunPajak.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            inputValue={tahunPajak}
                            value={tahunPajak}
                            disabled
                          />
                        </Col>
                        <Col sm="3">
                          <Autocomplete
                            placeholder="Masa Awal"
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={masaPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                label="Masa Awal"
                                error={validated && bulanPajakAwal.length === 0}
                                helperText={
                                  validated &&
                                  bulanPajakAwal.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            inputValue={bulanPajakAwal}
                            value={bulanPajakAwal}
                            disabled
                            style={{ paddingTop: "40px" }}
                          />
                        </Col>
                        <Col sm="1">
                          <p
                            style={{ paddingTop: "50px", textAlign: "center" }}
                          >
                            s.d.
                          </p>
                        </Col>
                        <Col sm="3">
                          <Autocomplete
                            placeholder="Masa Awal"
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={masaPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                label="Masa Akhir"
                                error={
                                  validated && bulanPajakAkhir.length === 0
                                }
                                helperText={
                                  validated &&
                                  bulanPajakAkhir.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            inputValue={bulanPajakAkhir}
                            value={bulanPajakAkhir}
                            disabled
                            style={{ paddingTop: "40px" }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Fasilitas PPh Pasal 21
                        </Form.Label>
                        <Col sm="9">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={isFasilitasValid}
                                  onChange={() =>
                                    setIsFasilitasValid(!isFasilitasValid)
                                  }
                                />
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  {isFasilitasValid && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="3"
                            style={{ visibility: "hidden" }}
                          >
                            Fasilitas PPh Pasal 21
                          </Form.Label>
                          <Col sm="9">
                            <Form.Check
                              type="radio"
                              label="Tanpa Fasilitas"
                              name="Tanpa Fasilitas"
                              value="Tanpa Fasilitas"
                              checked={
                                fasilitasPajakPenghasilan === "Tanpa Fasilitas"
                              }
                              onChange={handleFasilitasPajakPenghasilanChange}
                              style={{ cursor: "pointer" }}
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                  {bupot2126FasilitasDtpIkn && isFasilitasValid && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="3"
                            style={{ visibility: "hidden" }}
                          >
                            Fasilitas PPh Pasal 21
                          </Form.Label>
                          <Col sm="4">
                            <Form.Check
                              type="radio"
                              label="DTP Ibu Kota Nusantara (IKN)"
                              name="DTP Ibu Kota Nusantara (IKN)"
                              value="DTP Ibu Kota Nusantara (IKN)"
                              checked={
                                fasilitasPajakPenghasilan ===
                                "DTP Ibu Kota Nusantara (IKN)"
                              }
                              onChange={handleFasilitasPajakPenghasilanChange}
                              style={{ cursor: "pointer" }}
                            />
                          </Col>
                          <Col sm="5">
                            {fasilitasPajakPenghasilan ===
                            "DTP Ibu Kota Nusantara (IKN)" ? (
                              <>
                                <Form.Control
                                  required
                                  placeholder="Nomor Suket DTP"
                                  value={nomorSuketDtpIkn}
                                  onChange={(e) => {
                                    setNomorSuketDtpIkn(e.target.value);
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </>
                            ) : (
                              <>
                                <Form.Control
                                  placeholder="Nomor Suket DTP"
                                  value={nomorSuketDtpIkn}
                                  readOnly
                                />
                              </>
                            )}
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>
                      DATA PENGHASILAN MASA PAJAK TERAKHIR
                    </div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          PENGHASILAN BRUTO
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={jumlahPenghasilan.length === 0}
                            value={jumlahPenghasilan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setJumlahPenghasilan(tempValues);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>DATA PENGHASILAN SETAHUN</div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          1. GAJI ATAU UANG PENSIUNAN BERKALA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              gajiAtauUangPensiunanBerkala.length === 0
                            }
                            value={gajiAtauUangPensiunanBerkala}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setGajiAtauUangPensiunanBerkala(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(tempValues) +
                                parseInt(tunjanganPph) +
                                parseInt(tunjanganLainnya) +
                                parseInt(honorarium) +
                                parseInt(premiAsuransi) +
                                parseInt(penerimaanNatura) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          2. TUNJANGAN PPh
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={tunjanganPph.length === 0}
                            value={tunjanganPph}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setTunjanganPph(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tempValues) +
                                parseInt(tunjanganLainnya) +
                                parseInt(honorarium) +
                                parseInt(premiAsuransi) +
                                parseInt(penerimaanNatura) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          3. TUNJANGAN LAINNYA, UANG LEMBUR DAN SEGALANYA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={tunjanganLainnya.length === 0}
                            value={tunjanganLainnya}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setTunjanganLainnya(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tunjanganPph) +
                                parseInt(tempValues) +
                                parseInt(honorarium) +
                                parseInt(premiAsuransi) +
                                parseInt(penerimaanNatura) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          4. HONORARIUM DAN IMBALAN LAIN SEJENISNYA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={honorarium.length === 0}
                            value={honorarium}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setHonorarium(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tunjanganPph) +
                                parseInt(tunjanganLainnya) +
                                parseInt(tempValues) +
                                parseInt(premiAsuransi) +
                                parseInt(penerimaanNatura) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          5. PREMI ASURANSI YANG DIBAYARKAN PEMBERI KERJA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={premiAsuransi.length === 0}
                            value={premiAsuransi}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPremiAsuransi(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tunjanganPph) +
                                parseInt(tunjanganLainnya) +
                                parseInt(honorarium) +
                                parseInt(tempValues) +
                                parseInt(penerimaanNatura) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          6. PENERIMAAN DALAM BENTUK NATURA DAN KENIKMATAN
                          LAINNYA YANG DIKENAKAN PEMOTONGAN PPh PASAL 21
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={penerimaanNatura.length === 0}
                            value={penerimaanNatura}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPenerimaanNatura(tempValues);

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tunjanganPph) +
                                parseInt(tunjanganLainnya) +
                                parseInt(honorarium) +
                                parseInt(premiAsuransi) +
                                parseInt(tempValues) +
                                parseInt(
                                  tantiemBonusGratifikasiJasaProduksiThr
                                );
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          7. TANTIEM, BONUS, GRATIFIKASI, JASA PRODUKSI DAN THR
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              tantiemBonusGratifikasiJasaProduksiThr.length ===
                              0
                            }
                            value={tantiemBonusGratifikasiJasaProduksiThr}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setTantiemBonusGratifikasiJasaProduksiThr(
                                tempValues
                              );

                              let totalJumlahPenghasilanBruto1sd7 =
                                parseInt(gajiAtauUangPensiunanBerkala) +
                                parseInt(tunjanganPph) +
                                parseInt(tunjanganLainnya) +
                                parseInt(honorarium) +
                                parseInt(premiAsuransi) +
                                parseInt(penerimaanNatura) +
                                parseInt(tempValues);
                              setJumlahPenghasilanBruto1sd7(
                                totalJumlahPenghasilanBruto1sd7
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(totalJumlahPenghasilanBruto1sd7) -
                                parseInt(jumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          8. JUMLAH PENGHASILAN BRUTO (1 S.D. 7)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={jumlahPenghasilanBruto1sd7}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <hr style={hrStyle} />
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>PENGURANGAN</div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          9. BIAYA JABATAN/BIAYA PENSIUN
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={biayaJabatan.length === 0}
                            value={biayaJabatan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setBiayaJabatan(tempValues);

                              let totalJumlahPengurangan9sd11 =
                                parseInt(tempValues) +
                                parseInt(iuranPensiun) +
                                parseInt(zakatKeagamaan);
                              setJumlahPengurangan9sd11(
                                totalJumlahPengurangan9sd11
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(jumlahPenghasilanBruto1sd7) -
                                parseInt(totalJumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          10. IURAN TERKAIT PENSIUN ATAU HARI TUA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={iuranPensiun.length === 0}
                            value={iuranPensiun}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setIuranPensiun(tempValues);

                              let totalJumlahPengurangan9sd11 =
                                parseInt(biayaJabatan) +
                                parseInt(tempValues) +
                                parseInt(zakatKeagamaan);
                              setJumlahPengurangan9sd11(
                                totalJumlahPengurangan9sd11
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(jumlahPenghasilanBruto1sd7) -
                                parseInt(totalJumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          11. ZAKAT/SUMBANGAN KEAGAMAAN YANG BERSIFAT WAJIB YANG
                          DIBAYARKAN MELALUI PEMBERI KERJA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={zakatKeagamaan.length === 0}
                            value={zakatKeagamaan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setZakatKeagamaan(tempValues);

                              let totalJumlahPengurangan9sd11 =
                                parseInt(biayaJabatan) +
                                parseInt(iuranPensiun) +
                                parseInt(tempValues);
                              setJumlahPengurangan9sd11(
                                totalJumlahPengurangan9sd11
                              );

                              let totalJumlahPenghasilanNeto8sd12 =
                                parseInt(jumlahPenghasilanBruto1sd7) -
                                parseInt(totalJumlahPengurangan9sd11);
                              setJumlahPenghasilanNeto8sd12(
                                totalJumlahPenghasilanNeto8sd12
                              );

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(totalJumlahPenghasilanNeto8sd12) +
                                parseInt(penghasilanNetoMasaPajakSebelumnya);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          12. JUMLAH PENGURANGAN (9 S.D. 11)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={jumlahPengurangan9sd11}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <hr style={hrStyle} />
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>PENGHITUNGAN PPh PASAL 21</div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          13. JUMLAH PENGHASILAN NETO (8 - 12)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={jumlahPenghasilanNeto8sd12}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          14. PENGHASILAN NETO MASA PAJAK SEBELUMNYA
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              penghasilanNetoMasaPajakSebelumnya.length === 0
                            }
                            value={penghasilanNetoMasaPajakSebelumnya}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPenghasilanNetoMasaPajakSebelumnya(tempValues);

                              let totalJumlahPenghasilanNetoSetahunAtauDisetahunkan =
                                parseInt(jumlahPenghasilanNeto8sd12) +
                                parseInt(tempValues);
                              setJumlahPenghasilanNetoSetahunAtauDisetahunkan(
                                totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                              );

                              let totalPkpSetahunAtauDisetahunkan15sd16 =
                                parseInt(
                                  totalJumlahPenghasilanNetoSetahunAtauDisetahunkan
                                ) - parseInt(jumlahPtkp);
                              setPkpSetahunAtauDisetahunkan15sd16(
                                totalPkpSetahunAtauDisetahunkan15sd16
                              );

                              setPph21PkpSetahunAtauDisetahunkan("0");
                              setPph21TelahDipotongMasaPajakSebelumnya("0");
                              setPph21DtpTelahDipotongMasaPajakSebelumnya("0");
                              setPph21Terutang18sd20("0");

                              let totalPph21KurangLebihBayarMasaPajakTerakhir =
                                0 -
                                parseInt(pph21Dipotong) -
                                parseInt(pph21Dtp);
                              setPph21KurangLebihBayarMasaPajakTerakhir(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDipotong(
                                totalPph21KurangLebihBayarMasaPajakTerakhir
                              );
                              setPph21KurangLebihBayarMasaPajakTerakhirDtp(0);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          15. JUMLAH PENGHASILAN NETO UNTUK PERHITUNGAN PPh
                          PASAL 21 (SETAHUN/DISETAHUNKAN)
                          <div style={{ paddingLeft: "20px" }}>
                            <div style={inputRadioWrapper}>
                              <Form.Check
                                type="radio"
                                label="Setahun"
                                name="Setahun"
                                value="Setahun"
                                checked={
                                  jumlahPenghasilanNetoPilihan === "Setahun"
                                }
                                onChange={
                                  handleJumlahPenghasilanNetoPilihanChange
                                }
                                style={{ cursor: "pointer" }}
                              />
                              <Form.Check
                                type="radio"
                                label="Disetahunkan"
                                name="Disetahunkan"
                                value="Disetahunkan"
                                checked={
                                  jumlahPenghasilanNetoPilihan ===
                                  "Disetahunkan"
                                }
                                onChange={
                                  handleJumlahPenghasilanNetoPilihanChange
                                }
                                style={inputRadio}
                              />
                            </div>
                          </div>
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={jumlahPenghasilanNetoSetahunAtauDisetahunkan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                          16. PENGHASILAN TIDAK KENA PAJAK (PTKP)
                        </Form.Label>
                        <Col sm="5">
                          <Col sm="6">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={ptkpFullOptions}
                              renderInput={(params) => (
                                <TextField
                                  label="Pilih PTKP Tahunan"
                                  size="small"
                                  error={validated && ptkp.length === 0}
                                  helperText={
                                    validated &&
                                    ptkp.length === 0 &&
                                    "Kolom ini diperlukan."
                                  }
                                  {...params}
                                />
                              )}
                              onInputChange={(e, value) => {
                                setPtkp(value);

                                let tempJumlahPtkp = value.split(") ")[1];
                                if (tempJumlahPtkp) {
                                  setJumlahPtkp(tempJumlahPtkp);

                                  let totalPkpSetahunAtauDisetahunkan15sd16 =
                                    parseInt(
                                      jumlahPenghasilanNetoSetahunAtauDisetahunkan
                                    ) - parseInt(tempJumlahPtkp);
                                  setPkpSetahunAtauDisetahunkan15sd16(
                                    totalPkpSetahunAtauDisetahunkan15sd16
                                  );
                                } else {
                                  setJumlahPtkp("0");
                                  setPkpSetahunAtauDisetahunkan15sd16(
                                    jumlahPenghasilanNetoSetahunAtauDisetahunkan
                                  );
                                }

                                setPph21PkpSetahunAtauDisetahunkan("0");
                                setPph21TelahDipotongMasaPajakSebelumnya("0");
                                setPph21DtpTelahDipotongMasaPajakSebelumnya(
                                  "0"
                                );
                                setPph21Terutang18sd20("0");
                              }}
                              inputValue={ptkp}
                              value={ptkp}
                            />
                          </Col>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={jumlahPtkp}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          17. PENGHASILAN KENA PAJAK SETAHUN/DISETAHUNKAN (15 -
                          16)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={pkpSetahunAtauDisetahunkan15sd16}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="7">
                          18. PPh PASAL 21 ATAS PENGHASILAN KENA PAJAK
                          SETAHUN/DISETAHUNKAN
                        </Form.Label>
                        <Col sm="2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "5px",
                            }}
                          >
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                hitungPph21PkpSetahunAtauDisetahunkan();
                              }}
                            >
                              <CalculateIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Hitung
                            </button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              pph21PkpSetahunAtauDisetahunkan.length === 0
                            }
                            value={pph21PkpSetahunAtauDisetahunkan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="7">
                          19. PPh PASAL 21 YANG TELAH DIPOTONG MASA PAJAK
                          SEBELUMNYA
                        </Form.Label>
                        <Col sm="2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "5px",
                            }}
                          >
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setPph21TelahDipotongMasaPajakSebelumnya("0");

                                let totalPph21Terutang18sd20 =
                                  parseInt(pph21PkpSetahunAtauDisetahunkan) -
                                  0 -
                                  parseInt(
                                    pph21DtpTelahDipotongMasaPajakSebelumnya
                                  );
                                setPph21Terutang18sd20(
                                  totalPph21Terutang18sd20
                                );
                              }}
                            >
                              <CloudDownloadIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Ambil Data
                            </button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              pph21TelahDipotongMasaPajakSebelumnya.length === 0
                            }
                            value={pph21TelahDipotongMasaPajakSebelumnya}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPph21TelahDipotongMasaPajakSebelumnya(
                                tempValues
                              );

                              let totalPph21Terutang18sd20 =
                                parseInt(pph21PkpSetahunAtauDisetahunkan) -
                                parseInt(tempValues) -
                                parseInt(
                                  pph21DtpTelahDipotongMasaPajakSebelumnya
                                );
                              setPph21Terutang18sd20(totalPph21Terutang18sd20);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="7">
                          20. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP) YANG
                          TELAH DIPOTONG MASA PAJAK SEBELUMNYA
                        </Form.Label>
                        <Col sm="2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "5px",
                            }}
                          >
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setPph21DtpTelahDipotongMasaPajakSebelumnya(
                                  "0"
                                );

                                let totalPph21Terutang18sd20 =
                                  parseInt(pph21PkpSetahunAtauDisetahunkan) -
                                  parseInt(
                                    pph21TelahDipotongMasaPajakSebelumnya
                                  ) -
                                  0;
                                setPph21Terutang18sd20(
                                  totalPph21Terutang18sd20
                                );
                              }}
                            >
                              <CloudDownloadIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Ambil Data
                            </button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={
                              pph21DtpTelahDipotongMasaPajakSebelumnya.length ===
                              0
                            }
                            value={pph21DtpTelahDipotongMasaPajakSebelumnya}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPph21DtpTelahDipotongMasaPajakSebelumnya(
                                tempValues
                              );

                              let totalPph21Terutang18sd20 =
                                parseInt(pph21PkpSetahunAtauDisetahunkan) -
                                parseInt(
                                  pph21TelahDipotongMasaPajakSebelumnya
                                ) -
                                parseInt(tempValues);
                              setPph21Terutang18sd20(totalPph21Terutang18sd20);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          21. PPh PASAL 21 TERUTANG (18 - 19 - 20)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={pph21Terutang18sd20}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          22. PPh PASAL 21 DAN PPh PASAL 26 YANG TELAH DIPOTONG
                          DAN DILUNASI PADA SELAIN MASA PAJAK TERAKHIR
                        </Form.Label>
                        <Col sm="3"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label
                          column
                          sm="7"
                          style={{ paddingLeft: "40px" }}
                        >
                          22A. PPh PASAL 21 DIPOTONG
                        </Form.Label>
                        <Col sm="2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "5px",
                            }}
                          >
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                cariPphPasal21Dipotong();
                              }}
                            >
                              <CloudDownloadIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Ambil Data
                            </button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21Dipotong.length === 0}
                            value={pph21Dipotong}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPph21Dipotong(tempValues);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Januari
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongJanuari.length === 0}
                            value={pph21DipotongJanuari}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Februari
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongFebruari.length === 0}
                            value={pph21DipotongFebruari}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Maret
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongMaret.length === 0}
                            value={pph21DipotongMaret}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          April
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongApril.length === 0}
                            value={pph21DipotongApril}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Mei
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongMei.length === 0}
                            value={pph21DipotongMei}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Juni
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongJuni.length === 0}
                            value={pph21DipotongJuni}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Juli
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongJuli.length === 0}
                            value={pph21DipotongJuli}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Agustus
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongAgustus.length === 0}
                            value={pph21DipotongAgustus}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          September
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongSeptember.length === 0}
                            value={pph21DipotongSeptember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Oktober
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongOktober.length === 0}
                            value={pph21DipotongOktober}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          November
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongNovember.length === 0}
                            value={pph21DipotongNovember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Desember
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DipotongDesember.length === 0}
                            value={pph21DipotongDesember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label
                          column
                          sm="7"
                          style={{ paddingLeft: "40px" }}
                        >
                          22B. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP)
                        </Form.Label>
                        <Col sm="2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "5px",
                            }}
                          >
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                cariPphPasal21Dtp();
                              }}
                            >
                              <CloudDownloadIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Ambil Data
                            </button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21Dtp.length === 0}
                            value={pph21Dtp}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPph21Dtp(tempValues);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Januari
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpJanuari.length === 0}
                            value={pph21DtpJanuari}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Februari
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpFebruari.length === 0}
                            value={pph21DtpFebruari}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Maret
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpMaret.length === 0}
                            value={pph21DtpMaret}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          April
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpApril.length === 0}
                            value={pph21DtpApril}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Mei
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpMei.length === 0}
                            value={pph21DtpMei}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Juni
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpJuni.length === 0}
                            value={pph21DtpJuni}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Juli
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpJuli.length === 0}
                            value={pph21DtpJuli}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Agustus
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpAgustus.length === 0}
                            value={pph21DtpAgustus}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          September
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpSeptember.length === 0}
                            value={pph21DtpSeptember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Oktober
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpOktober.length === 0}
                            value={pph21DtpOktober}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          November
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpNovember.length === 0}
                            value={pph21DtpNovember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label column sm="1"></Form.Label>
                        <Form.Label column sm="2">
                          Desember
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            isInvalid={pph21DtpDesember.length === 0}
                            value={pph21DtpDesember}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            Isian belum lengkap.
                          </Form.Control.Feedback>
                        </Col>
                        <Col sm="6"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="9">
                          23. PPh PASAL 21 KURANG BAYAR/LEBIH BAYAR MASA PAJAK
                          TERAKHIR
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={pph21KurangLebihBayarMasaPajakTerakhir}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        controlId="formPlaintextPassword"
                        className="mt-2"
                      >
                        <Form.Label
                          column
                          sm="9"
                          style={{ paddingLeft: "40px" }}
                        >
                          23A. PPh PASAL 21 DIPOTONG
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={
                              pph21KurangLebihBayarMasaPajakTerakhirDipotong
                            }
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  <hr style={hrStyle} />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label
                          column
                          sm="9"
                          style={{ paddingLeft: "40px" }}
                        >
                          23B. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP)
                        </Form.Label>
                        <Col sm="3">
                          <NumericFormat
                            required
                            value={pph21KurangLebihBayarMasaPajakTerakhirDtp}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={submenuContainer}>
                    <div style={submenuWrapper}>
                      PENANDATANGAN BUKTI PEMOTONGAN
                    </div>
                  </div>
                  <hr />
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="5">
                          Penandatangan Sebagai
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control value={"Pengurus"} readOnly />
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputInput2}></div>
                  </div>
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="5">
                          Penandatangan Bukti Potong
                        </Form.Label>
                        <Col sm="7">
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={namaIdentitasOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={validated && namaIdentitas.length === 0}
                                helperText={
                                  validated &&
                                  namaIdentitas.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            onInputChange={(e, value) => {
                              setNamaIdentitas(value);
                            }}
                            inputValue={namaIdentitas}
                            value={namaIdentitas}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <div style={inputInput2}></div>
                  </div>
                  <div
                    style={{
                      border: "1px solid #f8aa00",
                      padding: "10px",
                      marginBottom: "20px",
                      color: "#646c9a",
                    }}
                  >
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Dengan ini saya menyatakan bahwa Bukti Pemotongan PPh Pasal 21/26 telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
                        checked={pernyataanBenar}
                        onChange={() => setPernyataanBenar(!pernyataanBenar)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div
                    style={{
                      marginTop: "60px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="hover-button"
                      style={{ marginRight: "4px" }}
                      type="submit"
                      disabled={pernyataanBenar === false && true}
                    >
                      <SaveIcon
                        fontSize="small"
                        style={{ marginRight: "4px" }}
                      />
                      Simpan
                    </button>
                    <button
                      className="blank-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ReplayIcon
                        fontSize="small"
                        style={{ marginRight: "4px" }}
                      />
                      Batal
                    </button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        open={openConfirmationSearchIdentitasWp}
        onClose={handleCloseConfirmationSearchSuratSetoranPajak}
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
                <HighlightOffIcon color="error" sx={{ fontSize: 80 }} />
              </div>
              <b>Kesalahan</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {detilSearchIdentitasWp}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button-no-icon"
              style={{ paddingTop: "10px" }}
              onClick={handleCloseConfirmationSearchSuratSetoranPajak}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openSearchIdentitasWp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
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
              <b>Memproses</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>Mohon Sabar Menunggu</p>
                <Spinner animation="border" variant="primary" />
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog
        open={openFoundIdentitasWp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
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
                <InfoOutlinedIcon color="info" sx={{ fontSize: 80 }} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ textAlign: "center" }}
            >
              Data ditemukan.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button-no-icon"
              style={{
                paddingTop: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                padding: "10px 20px 10px 20px",
              }}
              onClick={handleCloseConfirmationFoundSuratSetoranPajak}
            >
              Ok
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={openSaved}
        onClose={handleCloseSaved}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
        fullWidth
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
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
              </div>
              <b>Sukses</b>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Data berhasil disimpan. Apakah Anda ingin merekam Bukti Potong
                Pasal 4(2), 15, 22, 23 lagi?
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
              onClick={() => {
                navigate("/ebupot2126/buktiPotongPasal21");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={() => {
                navigate("/ebupot2126/buktiPotongPasal21/rekam21Tahunan");
              }}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Ebupot2126UbahPph21Tahunan;

const accordionBlue = {
  backgroundColor: "#a1ccf7",
  color: "black",
  fontWeight: 600,
};

const accordionYellow = {
  backgroundColor: "#ffefcc",
  color: "black",
  fontWeight: 600,
};

const menuLaporContainer = {
  display: "flex",
  marginBottom: "20px",
};

const profilWrapper = {
  flex: 1,
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const titleContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const titleWrapper = {
  background: "#ffb822",
  borderRadius: "4px",
  padding: "0 0.75rem",
  fontWeight: 700,
};

const submenuContainer = {
  display: "flex",
  marginBottom: "20px",
};

const submenuWrapper = {
  background: "#282a3c",
  borderRadius: "4px",
  padding: "0 0.75rem",
  fontWeight: 700,
  color: "white",
};

const hrStyle = {
  opacity: "0.1",
  margin: "0.5rem 0",
};
