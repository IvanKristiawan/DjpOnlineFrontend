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
  getLastDateOfMonth,
  getMonthIndex,
  getRandomIndonesianName,
  getRandomIndonesianLocation,
  formatNumberWithComma,
} from "../../../constants/helper";
import {
  Card,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  Paper,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Pagination,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import CalculateIcon from "@mui/icons-material/Calculate";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

function Ebupot2126UbahPph21() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // 01.) Accordion 1
  let currentDate = new Date(); // Get the current date
  let currentYear = currentDate.getFullYear(); // Get the current year

  // Create an array of the last 2 years, including the current year
  let tahunPajakOptions = [];

  for (let i = 0; i < 3; i++) {
    // Loop to get the current year and the two previous years
    tahunPajakOptions.push(currentYear - i);
  }
  const [tahunPajak, setTahunPajak] = useState("");

  const [maxMasaPajak, setMaxMasaPajak] = useState(new Date());
  const [masaPajak, setMasaPajak] = useState("");
  const [masaPajakOptions, setMasaPajakOptions] = useState([]);
  const [identitas, setIdentitas] = useState("NPWP/NITKU");
  const [npwpNitku, setNpwpNitku] = useState("");
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isNikValid, setIsNikValid] = useState(false);
  const [isFasilitasValid, setIsFasilitasValid] = useState(false);
  const [nomorSuketDtpIkn, setNomorSuketDtpIkn] = useState("");

  const [fasilitasPajakPenghasilan, setFasilitasPajakPenghasilan] =
    useState("Tanpa Fasilitas");

  // Kondisi
  const [bupot2126SkemaPenghitungan, setBupot2126SkemaPenghitungan] =
    useState(false);
  const [bupot2126PtkpTahunan, setBupot2126PtkpTahunan] = useState(false);
  const [bupot2126JenisObjekPajak, setBupot2126JenisObjekPajak] =
    useState(false);
  const [bupot2126DasarPengenaanPajak, setBupot2126DasarPengenaanPajak] =
    useState(false);
  const [
    bupot2126DasarPengenaanPajakBebasInput,
    setBupot2126DasarPengenaanPajakBebasInput,
  ] = useState(false);
  const [
    bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto,
    setBupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto,
  ] = useState(false);
  const [bupot2126FormulasiPenghitungan, setBupot2126FormulasiPenghitungan] =
    useState(false);
  const [bupot2126FasilitasDtpIkn, setBupot2126FasilitasDtpIkn] =
    useState(false);
  const [tarifBupot2126, setTarifBupot2126] = useState("");

  // Jenis Pemotongan
  const [formulasiPenghitungan, setFormulasiPenghitungan] =
    useState("PP 68 Tahun 2009");
  const [skemaPenghitungan, setSkemaPenghitungan] = useState("Gross");

  // Penghitungan
  const [
    isAkumulasiPenghasilanBrutoValid,
    setIsAkumulasiPenghasilanBrutoValid,
  ] = useState(false);
  const [akumulasiPenghasilanBruto, setAkumulasiPenghasilanBruto] =
    useState("");
  const [jenisObjekPajak, setJenisObjekPajak] = useState("");
  const [jumlahPenghasilan, setJumlahPenghasilan] = useState("");
  const [ptkp, setPtkp] = useState("");
  const [dpp, setDpp] = useState("");
  const [tarif, setTarif] = useState("");
  const [pPhYangDipotongDipungut, setPPhYangDipotongDipungut] = useState("");

  const handleFormulasiPenghitunganChange = (e) => {
    setFormulasiPenghitungan(e.target.value);
  };
  const handleSkemaPenghitunganChange = (e) => {
    setSkemaPenghitungan(e.target.value);
  };

  const [kodeObjekPajak, setKodeObjekPajak] = useState("");
  const [jumlahPenghasilanBruto, setJumlahPenghasilanBruto] = useState("");

  const [tanggalDokumen, setTanggalDokumen] = useState(new Date());

  // 04.) Accordion 4
  const [bertindakSebagai, setBertindakSebagai] = useState(
    "Wakil Wajib Pajak (Pengurus)"
  );
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [tindakanKelebihanPemotonganPph, setTindakanKelebihanPemotonganPph] =
    useState("1");
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
  const [objekPajaks, setObjekPajaks] = useState([]);
  const [jenisObjekPajaks, setJenisObjekPajaks] = useState([]);
  const [ptkps, setPtkps] = useState([]);
  const [penandatangans, setPenandatangans] = useState([]);

  // Handle identitas input change
  const handleIdentitasChange = (e) => {
    setIdentitas(e.target.value);
    setNpwpNitku("");
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

  let objekPajakOptions = objekPajaks.map((objekPajak) => ({
    label: `${objekPajak.kodeObjekPajak} - ${objekPajak.namaObjekPajak}`,
  }));

  let jenisObjekPajakOptions = jenisObjekPajaks.map((jenisObjekPajak) => ({
    label: `${jenisObjekPajak.kodeJenisObjekPajak} ${jenisObjekPajak.namaJenisObjekPajak}`,
  }));

  let ptkpOptions = ptkps.map((ptkp) => ({
    label: `${ptkp.namaPtkp} ${ptkp.jumlahPtkp}`,
  }));

  let namaIdentitasOptions = penandatangans.map((namaIdentitas) => ({
    label: `${namaIdentitas.namaIdentitas}`,
  }));

  // Check if there's an error PPh Yang Dipotong Dipungut
  const errorPPhYangDipotongDipungut =
    pPhYangDipotongDipungut >= 0 &&
    parseInt(pPhYangDipotongDipungut) > parseInt(jumlahPenghasilanBruto);

  useEffect(() => {
    getEbupot2126UbahPph21ById();
    getObjekPajakData();
    getJenisObjekPajakData();
    getPtkpData();
    getPenandatangan();
  }, []);

  const getEbupot2126UbahPph21ById = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(`${tempUrl}/eBupot2126Pph21s/${id}`, {
      _id: user.id,
      token: user.token,
    });
    // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
    setTahunPajak(response.data.eBupot2126Pph21.tahunPajak);
    setMasaPajak(response.data.eBupot2126Pph21.masaPajak);
    setIdentitas(response.data.eBupot2126Pph21.identitas);
    setNpwpNitku(response.data.eBupot2126Pph21.npwpNitku);
    setNik(response.data.eBupot2126Pph21.nik);
    setNama(response.data.eBupot2126Pph21.nama);
    setAlamat(response.data.eBupot2126Pph21.alamat);

    // Kondisi
    setIsFasilitasValid(response.data.eBupot2126Pph21.isFasilitasValid);
    setBupot2126SkemaPenghitungan(
      response.data.eBupot2126Pph21.bupot2126SkemaPenghitungan
    );
    setBupot2126PtkpTahunan(response.data.eBupot2126Pph21.bupot2126PtkpTahunan);
    setBupot2126JenisObjekPajak(
      response.data.eBupot2126Pph21.bupot2126JenisObjekPajak
    );
    setBupot2126DasarPengenaanPajak(
      response.data.eBupot2126Pph21.bupot2126DasarPengenaanPajak
    );
    setBupot2126DasarPengenaanPajakBebasInput(
      response.data.eBupot2126Pph21.bupot2126DasarPengenaanPajakBebasInput
    );
    setBupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto(
      response.data.eBupot2126Pph21
        .bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto
    );
    setBupot2126FormulasiPenghitungan(
      response.data.eBupot2126Pph21.bupot2126FormulasiPenghitungan
    );
    setBupot2126FasilitasDtpIkn(
      response.data.eBupot2126Pph21.bupot2126FasilitasDtpIkn
    );

    // 02.) JENIS PEMOTONGAN PPH PASAL 21
    setKodeObjekPajak(
      `${response.data.eBupot2126Pph21.objekpajak.kodeObjekPajak} - ${response.data.eBupot2126Pph21.objekpajak.namaObjekPajak}`
    );
    setFormulasiPenghitungan(
      response.data.eBupot2126Pph21.formulasiPenghitungan
    );
    setNomorSuketDtpIkn(response.data.eBupot2126Pph21.nomorSuketDtpIkn);

    // 03.) PENANDATANGAN BUKTI PEMOTONGAN
    if (response.data.eBupot2126Pph21.jenisobjekpajak) {
      setJenisObjekPajak(
        `${response.data.eBupot2126Pph21.jenisobjekpajak.kodeJenisObjekPajak} - ${response.data.eBupot2126Pph21.jenisobjekpajak.namaJenisObjekPajak}`
      );
    }
    setSkemaPenghitungan(response.data.eBupot2126Pph21.skemaPenghitungan);
    setIsAkumulasiPenghasilanBrutoValid(
      response.data.eBupot2126Pph21.isAkumulasiPenghasilanBrutoValid
    );
    setAkumulasiPenghasilanBruto(
      response.data.eBupot2126Pph21.akumulasiPenghasilanBruto
    );
    setJumlahPenghasilan(response.data.eBupot2126Pph21.jumlahPenghasilan);
    if (response.data.eBupot2126Pph21.ptkp) {
      setPtkp(
        `${response.data.eBupot2126Pph21.ptkp.namaPtkp} - ${response.data.eBupot2126Pph21.ptkp.jumlahPtkp}`
      );
    }
    setDpp(response.data.eBupot2126Pph21.dpp);
    setTarif(response.data.eBupot2126Pph21.tarif.toString().replace(".", ","));
    setPPhYangDipotongDipungut(
      response.data.eBupot2126Pph21.pPhYangDipotongDipungut
    );

    // 04.) PENANDATANGAN BUKTI PEMOTONGAN
    setBertindakSebagai(
      response.data.eBupot2126Pph21.ebupot2126penandatangan.bertindakSebagai
    );
    setNamaIdentitas(
      response.data.eBupot2126Pph21.ebupot2126penandatangan.namaIdentitas
    );
    setTindakanKelebihanPemotonganPph(
      response.data.eBupot2126Pph21.tindakanKelebihanPemotonganPph
    );

    setOpenSearchIdentitasWp(false);
  };

  const getObjekPajakData = async () => {
    const response = await axios.post(`${tempUrl}/objekPajaksBupot2126`, {
      untukBupot2126: "PPh 21",
      _id: user.id,
      token: user.token,
    });
    setObjekPajaks(response.data);
  };

  const getJenisObjekPajakData = async () => {
    const response = await axios.post(`${tempUrl}/jenisObjekPajaks`, {
      _id: user.id,
      token: user.token,
    });
    setJenisObjekPajaks(response.data);
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
      setBupot2126SkemaPenghitungan(response.data.bupot2126SkemaPenghitungan);
      setBupot2126PtkpTahunan(response.data.bupot2126PtkpTahunan);
      setBupot2126JenisObjekPajak(response.data.bupot2126JenisObjekPajak);
      setBupot2126DasarPengenaanPajak(
        response.data.bupot2126DasarPengenaanPajak
      );
      setBupot2126DasarPengenaanPajakBebasInput(
        response.data.bupot2126DasarPengenaanPajakBebasInput
      );
      setBupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto(
        response.data.bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto
      );
      setBupot2126FormulasiPenghitungan(
        response.data.bupot2126FormulasiPenghitungan
      );
      setBupot2126FasilitasDtpIkn(response.data.bupot2126FasilitasDtpIkn);
      setTarifBupot2126(response.data.tarifBupot2126);

      // Jenis Pemotongan
      setFormulasiPenghitungan("PP 68 Tahun 2009");
      setSkemaPenghitungan("Gross");

      // Penghitungan
      setIsAkumulasiPenghasilanBrutoValid(false);
      setAkumulasiPenghasilanBruto("");
      setJenisObjekPajak("");
      setJumlahPenghasilan("");
      setPtkp("");
      setDpp("");
      setTarif("");
      setPPhYangDipotongDipungut("");
    } else {
      // Kondisi
      setBupot2126SkemaPenghitungan(false);
      setBupot2126PtkpTahunan(false);
      setBupot2126JenisObjekPajak(false);
      setBupot2126DasarPengenaanPajak(false);
      setBupot2126DasarPengenaanPajakBebasInput(false);
      setBupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto(false);
      setBupot2126FormulasiPenghitungan(false);
      setBupot2126FasilitasDtpIkn(false);
      setTarifBupot2126(false);

      // Jenis Pemotongan
      setFormulasiPenghitungan("PP 68 Tahun 2009");
      setSkemaPenghitungan("Gross");

      // Penghitungan
      setIsAkumulasiPenghasilanBrutoValid(false);
      setAkumulasiPenghasilanBruto("");
      setJenisObjekPajak("");
      setJumlahPenghasilan("");
      setPtkp("");
      setDpp("");
      setTarif("");
      setPPhYangDipotongDipungut("");
    }
  };

  const findJenisObjekPajakData = async (namaJenisObjekPajak) => {
    const response = await axios.post(`${tempUrl}/jenisObjekPajakByNama`, {
      namaJenisObjekPajak,
      _id: user.id,
      token: user.token,
    });
    if (response.data) {
      // Kondisi
      setBupot2126SkemaPenghitungan(response.data.bupot2126SkemaPenghitungan);
      setBupot2126PtkpTahunan(response.data.bupot2126PtkpTahunan);
      setBupot2126DasarPengenaanPajak(
        response.data.bupot2126DasarPengenaanPajak
      );
      setTarifBupot2126(response.data.tarifBupot2126);

      // Jenis Pemotongan
      setFormulasiPenghitungan("PP 68 Tahun 2009");
      setSkemaPenghitungan("Gross");

      // Penghitungan
      setIsAkumulasiPenghasilanBrutoValid(false);
      setAkumulasiPenghasilanBruto("");
      setJumlahPenghasilan("");
      setPtkp("");
      setDpp("");
      setTarif("");
      setPPhYangDipotongDipungut("");
    } else {
      // Kondisi
      setBupot2126SkemaPenghitungan(false);
      setBupot2126PtkpTahunan(false);
      setBupot2126DasarPengenaanPajak(false);
      setTarifBupot2126(false);

      // Jenis Pemotongan
      setFormulasiPenghitungan("PP 68 Tahun 2009");
      setSkemaPenghitungan("Gross");

      // Penghitungan
      setIsAkumulasiPenghasilanBrutoValid(false);
      setAkumulasiPenghasilanBruto("");
      setJumlahPenghasilan("");
      setPtkp("");
      setDpp("");
      setTarif("");
      setPPhYangDipotongDipungut("");
    }
  };

  const hitungPPhYangDipotongDipungut = async () => {
    setOpenSearchIdentitasWp(true);

    if (bupot2126SkemaPenghitungan) {
      if (skemaPenghitungan === "Gross") {
        const findTer = await axios.post(
          `${tempUrl}/terTarifByJumlahPenghasilan`,
          {
            namaPtkp: ptkp.split(" ", 1)[0],
            jumlahPenghasilan: parseInt(jumlahPenghasilan),
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(findTer.data);

        let hitungDpp = jumlahPenghasilan;
        setDpp(hitungDpp);
        let cariTarifPersen = formatNumberWithComma(findTer.data.tarifPersen);
        // console.log("cariTarifPersen");
        // console.log(cariTarifPersen);
        setTarif(cariTarifPersen);

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTer.data.tarifPersen) / 100
        );
        // console.log("hitungPPhYangDipotongDipungut");
        // console.log(hitungPPhYangDipotongDipungut);
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
      } else if (skemaPenghitungan === "Gross Up") {
        // Iterasi 1
        const findTer = await axios.post(
          `${tempUrl}/terTarifByJumlahPenghasilan`,
          {
            namaPtkp: ptkp.split(" ", 1)[0],
            jumlahPenghasilan: parseInt(jumlahPenghasilan),
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(findTer.data);

        let hitungDpp = jumlahPenghasilan;
        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTer.data.tarifPersen) / 100
        );

        // Iterasi 2
        let jumlahPenghasilanIterasi2 =
          parseInt(jumlahPenghasilan) + hitungPPhYangDipotongDipungut;
        const findTerIterasi2 = await axios.post(
          `${tempUrl}/terTarifByJumlahPenghasilan`,
          {
            namaPtkp: ptkp.split(" ", 1)[0],
            jumlahPenghasilan: parseInt(jumlahPenghasilanIterasi2),
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(findTer.data);

        let cariTarifPersenIterasi2 = formatNumberWithComma(
          findTerIterasi2.data.tarifPersen
        );
        // console.log("cariTarifPersenIterasi2");
        // console.log(cariTarifPersenIterasi2);
        setTarif(cariTarifPersenIterasi2);

        let hitungPPhYangDipotongDipungutIterasi2 = parseInt(
          (jumlahPenghasilan * (findTerIterasi2.data.tarifPersen / 100)) /
            (100 / 100 - findTerIterasi2.data.tarifPersen / 100)
        );
        // console.log("hitungPPhYangDipotongDipungutIterasi2");
        // console.log(hitungPPhYangDipotongDipungutIterasi2);
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungutIterasi2);

        let hitungDppIterasi2 =
          parseInt(jumlahPenghasilan) +
          parseInt(hitungPPhYangDipotongDipungutIterasi2);
        setDpp(hitungDppIterasi2);
      }
    } else if (bupot2126DasarPengenaanPajak) {
      let hitungDpp = (parseInt(jumlahPenghasilan) * 50) / 100;
      setDpp(hitungDpp);

      const findPkp = await axios.post(
        `${tempUrl}/pkpTarifByJumlahPenghasilan`,
        {
          jumlahPenghasilan: parseInt(hitungDpp),
          _id: user.id,
          token: user.token,
        }
      );
      // console.log(findPkp.data);
      setTarif(findPkp.data.tarifPersen);

      let hitungPPhYangDipotongDipungut =
        (parseInt(hitungDpp) * findPkp.data.tarifPersen) / 100;
      setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
    } else if (
      bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto &&
      !bupot2126FormulasiPenghitungan
    ) {
      if (isAkumulasiPenghasilanBrutoValid) {
        let hitungDpp = parseInt(jumlahPenghasilan);
        setDpp(hitungDpp);

        let hitungDppTarif = parseInt(akumulasiPenghasilanBruto) + hitungDpp;

        const findTarifPph21PP68Tahun2009 = await axios.post(
          `${tempUrl}/tarifPph21PP68Tahun2009ByJumlahPenghasilan`,
          {
            jumlahPenghasilan: hitungDppTarif,
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(findTarifPph21PP68Tahun2009.data);

        setTarif(findTarifPph21PP68Tahun2009.data.tarifPersen);

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTarifPph21PP68Tahun2009.data.tarifPersen) / 100
        );
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
      } else if (!isAkumulasiPenghasilanBrutoValid) {
        let hitungDpp = parseInt(jumlahPenghasilan);
        setDpp(hitungDpp);

        const findTarifPph21PP68Tahun2009 = await axios.post(
          `${tempUrl}/tarifPph21PP68Tahun2009ByJumlahPenghasilan`,
          {
            jumlahPenghasilan: hitungDpp,
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(findTarifPph21PP68Tahun2009.data);

        setTarif(findTarifPph21PP68Tahun2009.data.tarifPersen);

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTarifPph21PP68Tahun2009.data.tarifPersen) / 100
        );
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
      }
    } else if (
      bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto &&
      bupot2126FormulasiPenghitungan
    ) {
      if (isAkumulasiPenghasilanBrutoValid) {
        let hitungDpp = parseInt(jumlahPenghasilan);
        setDpp(hitungDpp);

        let hitungDppTarif = parseInt(akumulasiPenghasilanBruto) + hitungDpp;

        let findTarif;
        if (formulasiPenghitungan === "PP 68 Tahun 2009") {
          findTarif = await axios.post(
            `${tempUrl}/tarifPph21PP68Tahun2009ByJumlahPenghasilan`,
            {
              jumlahPenghasilan: hitungDpp + hitungDppTarif,
              _id: user.id,
              token: user.token,
            }
          );
          // console.log(findTarif.data);
        } else {
          findTarif = await axios.post(
            `${tempUrl}/tarifPph21PP149Tahun2000ByJumlahPenghasilan`,
            {
              jumlahPenghasilan: hitungDpp + hitungDppTarif,
              _id: user.id,
              token: user.token,
            }
          );
          // console.log(findTarif.data);
        }

        setTarif(findTarif.data.tarifPersen);

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTarif.data.tarifPersen) / 100
        );
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
      } else if (!isAkumulasiPenghasilanBrutoValid) {
        let hitungDpp = parseInt(jumlahPenghasilan);
        setDpp(hitungDpp);

        let findTarif;
        if (formulasiPenghitungan === "PP 68 Tahun 2009") {
          findTarif = await axios.post(
            `${tempUrl}/tarifPph21PP68Tahun2009ByJumlahPenghasilan`,
            {
              jumlahPenghasilan: hitungDpp,
              _id: user.id,
              token: user.token,
            }
          );
          // console.log(findTarif.data);
        } else {
          findTarif = await axios.post(
            `${tempUrl}/tarifPph21PP149Tahun2000ByJumlahPenghasilan`,
            {
              jumlahPenghasilan: hitungDpp,
              _id: user.id,
              token: user.token,
            }
          );
          // console.log(findTarif.data);
        }

        setTarif(findTarif.data.tarifPersen);

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * findTarif.data.tarifPersen) / 100
        );
        setPPhYangDipotongDipungut(hitungPPhYangDipotongDipungut);
      }
    }

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
  };

  const findMasaPajakOptions = async (tahunPajak) => {
    setOpenSearchIdentitasWp(true);
    let masaPajakList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    let currentDate = new Date(); // Get the current date
    let currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2024)
    let currentMonth = currentDate.getMonth() + 1; // Get the current month (1-based, 1 for January, 10 for October, etc.)

    let masaPajakOptions = [];

    // Check if the tahunPajak matches the current year
    if (tahunPajak === currentYear.toString()) {
      // Create a new array containing months from "Januari" to the current month
      masaPajakOptions = masaPajakList.slice(0, currentMonth); // Slice the months up to the current month
    } else {
      // If the tahunPajak is not the current year, include all months
      masaPajakOptions = [...masaPajakList]; // Return all months
    }

    setMasaPajakOptions(masaPajakOptions);

    setOpenSearchIdentitasWp(false);
  };

  const getTarifPersen = async (kodeObjekPajak) => {
    setTarif("");
    const response = await axios.post(`${tempUrl}/objekPajakByKode`, {
      kodeObjekPajak,
      _id: user.id,
      token: user.token,
    });
    if (response.data) {
      setTarif(response.data.tarifPersen);

      let hitungPph =
        (jumlahPenghasilanBruto * response.data.tarifPersen) / 100;
      setPPhYangDipotongDipungut(parseInt(hitungPph));
    }
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
    getTarifPersen(kodeObjekPajak);
  };

  const handleClickOpenConfirmationSearchIdentitasWpNpwpNitku = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (npwpNitku.length < 15) {
      return;
    } else {
      setOpenSearchIdentitasWp(true);

      setTimeout(async () => {
        setNama(getRandomIndonesianName());
        setAlamat(getRandomIndonesianLocation());
        setOpenSearchIdentitasWp(false);
      }, 500);
    }
  };

  const handleClickOpenConfirmationSearchIdentitasWpNik = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (nik.length < 16 || nama.length === 0) {
      return;
    } else {
      setOpenSearchIdentitasWp(true);

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

  const updateEBupot2126Pph21 = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      jumlahPenghasilan.length !== 0 &&
      tarif.length !== 0 &&
      pPhYangDipotongDipungut.length !== 0 &&
      bertindakSebagai.length !== 0 &&
      namaIdentitas.length !== 0;

    // console.log(`tahunPajak.length !== 0: ${tahunPajak.length !== 0}`);
    // console.log(`masaPajak.length !== 0: ${masaPajak.length !== 0}`);
    // console.log(`npwpNitku.length >= 15: ${npwpNitku.length >= 15}`);
    // console.log(`nama.length !== 0: ${nama.length !== 0}`);
    // console.log(`alamat.length !== 0: ${alamat.length !== 0}`);
    // console.log(`kodeObjekPajak.length !== 0: ${kodeObjekPajak.length !== 0}`);
    // console.log(
    //   `jumlahPenghasilan.length !== 0: ${
    //     jumlahPenghasilan.length !== 0
    //   }`
    // );
    // console.log(`tarif.length !== 0: ${tarif.length !== 0}`);
    // console.log(
    //   `pPhYangDipotongDipungut.length !== 0: ${
    //     pPhYangDipotongDipungut.length !== 0
    //   }`
    // );
    // console.log(
    //   `bertindakSebagai.length !== 0: ${bertindakSebagai.length !== 0}`
    // );
    // console.log(`namaIdentitas.length !== 0: ${namaIdentitas.length !== 0}`);

    // console.log(handlingInput);

    if (handlingInput) {
      try {
        setOpenSearchIdentitasWp(true);
        console.log(tarif);
        let updatedEBupot2126Pph21 = await axios.post(
          `${tempUrl}/updateEBupot2126Pph21/${id}`,
          {
            userId: user.id,

            // Kondisi
            isFasilitasValid,
            bupot2126SkemaPenghitungan,
            bupot2126PtkpTahunan,
            bupot2126JenisObjekPajak,
            bupot2126DasarPengenaanPajak,
            bupot2126DasarPengenaanPajakBebasInput,
            bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto,
            bupot2126FormulasiPenghitungan,
            bupot2126FasilitasDtpIkn,

            // 02.) JENIS PEMOTONGAN PPH PASAL 21
            formulasiPenghitungan,
            nomorSuketDtpIkn,

            // 03.) PENANDATANGAN BUKTI PEMOTONGAN
            jenisObjekPajak:
              jenisObjekPajak.length > 0 && jenisObjekPajak.split(" ", 1)[0],
            skemaPenghitungan,
            isAkumulasiPenghasilanBrutoValid,
            akumulasiPenghasilanBruto,
            jumlahPenghasilan,
            ptkp: ptkp.length > 0 && ptkp.split(" ")[0],
            dpp,
            tarif: tarif.replace(",", "."),
            pPhYangDipotongDipungut,

            // 04.) PENANDATANGAN BUKTI PEMOTONGAN
            namaIdentitas,
            tindakanKelebihanPemotonganPph,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );

        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          // setOpenSaved(true);
          navigate("/ebupot2126/buktiPotongPasal21");
        }, 1000);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupot2126UbahPph21 = async (e) => {
    setOpenSaved(false);

    setValidated(false);

    // 01.) Accordion 1
    setTahunPajak("");
    setMaxMasaPajak("");
    setMasaPajak("");
    setMasaPajakOptions([]);
    setIdentitas("NPWP/NITKU");
    setNpwpNitku("");
    setNik("");
    setNama("");
    setIsNikValid(false);
    setFasilitasPajakPenghasilan("Tanpa Fasilitas");

    // 04.) Accordion 4
    setBertindakSebagai("");
    setNamaIdentitas("");
    setTindakanKelebihanPemotonganPph("1");
    setPernyataanBenar(false);
    setOpenSaved(false);
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
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Perekaman Bukti Potong Pasal 21
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={updateEBupot2126Pph21}
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
                      <CalendarMonthIcon fontSize="small" /> Bulanan &
                      Final/Tidak Final
                    </div>
                  </div>
                  <div>
                    <div style={titleContainer}>
                      <div style={titleWrapper}>
                        BULANAN & FINAL/TIDAK FINAL
                      </div>
                    </div>
                    <div style={submenuContainer}>
                      <div style={submenuWrapper}>
                        IDENTITAS WAJIB PAJAK YANG DIPOTONG
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
                            Tahun Pajak
                          </Form.Label>
                          <Col sm="8">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={tahunPajakOptions}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
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
                        </Form.Group>
                      </div>
                      <div style={inputInput2}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4">
                            Masa Pajak
                          </Form.Label>
                          <Col sm="8">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={masaPajakOptions}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  error={validated && masaPajak.length === 0}
                                  helperText={
                                    validated &&
                                    masaPajak.length === 0 &&
                                    "Kolom ini diperlukan."
                                  }
                                  {...params}
                                />
                              )}
                              inputValue={masaPajak}
                              value={masaPajak}
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
                      {identitas === "NPWP/NITKU" ? (
                        <div style={inputInput2}>
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
                                disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                {npwpNitku.length === 0
                                  ? "Kolom ini diperlukan."
                                  : "Isian belum lengkap."}
                              </Form.Control.Feedback>
                            </Col>
                            <Col sm="2">
                              <button
                                className="hover-button-no-icon"
                                onClick={
                                  handleClickOpenConfirmationSearchIdentitasWpNpwpNitku
                                }
                              >
                                Cek
                              </button>
                            </Col>
                          </Form.Group>
                        </div>
                      ) : (
                        <div style={inputInput2}>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="4">
                              NIK
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control required value={nik} disabled />
                              <Form.Control.Feedback type="invalid">
                                Isian belum lengkap.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </div>
                      )}
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
                              <Col sm="3">
                                <button
                                  className="hover-button"
                                  onClick={
                                    handleClickOpenConfirmationSearchIdentitasWpNik
                                  }
                                >
                                  <SearchIcon
                                    fontSize="small"
                                    style={{ marginRight: "4px" }}
                                  />
                                  Cek
                                </button>
                              </Col>
                              <Col sm="4">
                                <div style={{ marginTop: "8px" }}>
                                  <p>Tidak Valid</p>
                                </div>
                              </Col>
                              <Col sm="5">
                                <div style={{ display: "flex" }}>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Switch checked={isNikValid} disabled />
                                      }
                                    />
                                  </FormGroup>
                                  <p style={{ marginTop: "8px" }}>Valid</p>
                                </div>
                              </Col>
                            </Form.Group>
                          </div>
                        </>
                      )}
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
                                Alamat
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control value={alamat} disabled />
                              </Col>
                            </Form.Group>
                          </div>
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
                              <Form.Label column sm="4">
                                Alamat
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={alamat}
                                  disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </>
                      )}
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
                        <Form.Label column sm="3">
                          Kode Objek Pajak
                        </Form.Label>
                        <Col sm="9">
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={objekPajakOptions}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                error={validated && kodeObjekPajak.length === 0}
                                helperText={
                                  validated &&
                                  kodeObjekPajak.length === 0 &&
                                  "Kolom ini diperlukan."
                                }
                                {...params}
                              />
                            )}
                            inputValue={kodeObjekPajak}
                            value={kodeObjekPajak}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                  {bupot2126FormulasiPenghitungan && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Formulasi Penghitungan PPh 21
                          </Form.Label>
                          <Col sm="9" className="mt-2">
                            <div style={inputRadioWrapper}>
                              <Form.Check
                                type="radio"
                                label="PP 68 Tahun 2009"
                                name="PP 68 Tahun 2009"
                                value="PP 68 Tahun 2009"
                                checked={
                                  formulasiPenghitungan === "PP 68 Tahun 2009"
                                }
                                onChange={handleFormulasiPenghitunganChange}
                                style={{ cursor: "pointer" }}
                              />
                              <Form.Check
                                type="radio"
                                label="PP 149 Tahun 2000"
                                name="PP 149 Tahun 2000"
                                value="PP 149 Tahun 2000"
                                checked={
                                  formulasiPenghitungan === "PP 149 Tahun 2000"
                                }
                                onChange={handleFormulasiPenghitunganChange}
                                style={inputRadio}
                              />
                            </div>
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
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
                    <div style={submenuWrapper}>PENGHITUNGAN PPH PASAL 21</div>
                  </div>
                  <hr />
                  {bupot2126SkemaPenghitungan && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Skema Penghitungan
                          </Form.Label>
                          <Col sm="9" className="mt-2">
                            <div style={inputRadioWrapper}>
                              <Form.Check
                                type="radio"
                                label="Gross"
                                name="Gross"
                                value="Gross"
                                checked={skemaPenghitungan === "Gross"}
                                onChange={handleSkemaPenghitunganChange}
                                style={{ cursor: "pointer" }}
                              />
                              <Form.Check
                                type="radio"
                                label="Gross Up"
                                name="Gross Up"
                                value="Gross Up"
                                checked={skemaPenghitungan === "Gross Up"}
                                onChange={handleSkemaPenghitunganChange}
                                style={inputRadio}
                              />
                            </div>
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                  {bupot2126JenisObjekPajak && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            Jenis
                          </Form.Label>
                          <Col sm="4" className="mt-2">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={jenisObjekPajakOptions}
                              renderInput={(params) => (
                                <TextField
                                  size="small"
                                  error={
                                    validated && jenisObjekPajak.length === 0
                                  }
                                  helperText={
                                    validated &&
                                    jenisObjekPajak.length === 0 &&
                                    "Kolom ini diperlukan."
                                  }
                                  {...params}
                                />
                              )}
                              onChange={(e, value) => {
                                setJenisObjekPajak(value);
                                findJenisObjekPajakData(
                                  value.split(" ").slice(1).join(" ")
                                );
                              }}
                              inputValue={jenisObjekPajak}
                              value={jenisObjekPajak}
                            />
                          </Col>
                          <Col sm="5" className="mt-2"></Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                  {bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto && (
                    <>
                      <div style={inputWrapper}>
                        <div style={inputInput1}>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                          >
                            <Form.Label column sm="3">
                              Akumulasi Penghasilan Bruto yang Diterima dalam
                              Jangka Waktu 2 Tahun Kalender
                            </Form.Label>
                            <Col sm="9">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={isAkumulasiPenghasilanBrutoValid}
                                      onChange={() =>
                                        setIsAkumulasiPenghasilanBrutoValid(
                                          !isAkumulasiPenghasilanBrutoValid
                                        )
                                      }
                                    />
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                    </>
                  )}
                  {bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto &&
                    isAkumulasiPenghasilanBrutoValid && (
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
                              Jumlah Penghasilan
                            </Form.Label>
                            <Col sm="4" className="mt-2">
                              <NumericFormat
                                required
                                value={akumulasiPenghasilanBruto}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                customInput={Form.Control}
                                style={{ textAlign: "right" }}
                                onChange={(values) => {
                                  let tempValues = values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "");

                                  setAkumulasiPenghasilanBruto(tempValues);
                                  setDpp("");
                                  setTarif("");
                                  setPPhYangDipotongDipungut("");
                                }}
                              />
                            </Col>
                            <Col sm="5" className="mt-2"></Col>
                          </Form.Group>
                        </div>
                      </div>
                    )}
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          Jumlah Penghasilan
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          <NumericFormat
                            required
                            value={jumlahPenghasilan}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setJumlahPenghasilan(tempValues);
                              setDpp("");
                              setTarif("");
                              setPPhYangDipotongDipungut("");
                            }}
                          />
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
                      </Form.Group>
                    </div>
                  </div>
                  {bupot2126PtkpTahunan && (
                    <div style={inputWrapper}>
                      <div style={inputInput1}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="3">
                            PTKP Tahunan
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
                              }}
                              inputValue={ptkp}
                              value={ptkp}
                            />
                          </Col>
                          <Col sm="5" className="mt-2"></Col>
                        </Form.Group>
                      </div>
                    </div>
                  )}
                  <div style={inputWrapper}>
                    <div style={inputInput1}>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                      >
                        <Form.Label column sm="3">
                          DPP
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          {bupot2126DasarPengenaanPajakBebasInput ? (
                            <NumericFormat
                              required
                              value={dpp}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              style={{ textAlign: "right" }}
                              onValueChange={(values) => {
                                let tempValues = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setDpp(tempValues);

                                let hitungPPhYangDipotongDipungut =
                                  (tempValues * tarif) / 100;
                                setPPhYangDipotongDipungut(
                                  hitungPPhYangDipotongDipungut
                                );
                              }}
                            />
                          ) : (
                            <NumericFormat
                              required
                              value={dpp}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              style={{ textAlign: "right" }}
                              onValueChange={(values) => {
                                let tempValues = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setDpp(tempValues);
                              }}
                              disabled
                            />
                          )}
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
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
                          Tarif
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          {bupot2126DasarPengenaanPajakBebasInput ? (
                            <InputGroup>
                              <NumericFormat
                                required
                                value={tarif}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                customInput={Form.Control}
                                style={{ textAlign: "right" }}
                                onChange={(values) => {
                                  let tempValues = values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "");

                                  setTarif(tempValues);
                                  let hitungPPhYangDipotongDipungut =
                                    (dpp * tempValues) / 100;
                                  setPPhYangDipotongDipungut(
                                    hitungPPhYangDipotongDipungut
                                  );
                                }}
                              />
                              <InputGroup.Text id="basic-addon1">
                                %
                              </InputGroup.Text>
                            </InputGroup>
                          ) : (
                            <InputGroup>
                              <NumericFormat
                                required
                                value={tarif}
                                decimalSeparator={","}
                                thousandSeparator={"."}
                                customInput={Form.Control}
                                style={{ textAlign: "right" }}
                                disabled
                              />
                              <InputGroup.Text id="basic-addon1">
                                %
                              </InputGroup.Text>
                            </InputGroup>
                          )}
                        </Col>
                        <Col sm="5" className="mt-2"></Col>
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
                          PPh Pasal 21
                        </Form.Label>
                        <Col sm="4" className="mt-2">
                          <NumericFormat
                            required
                            value={pPhYangDipotongDipungut}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            customInput={Form.Control}
                            style={{ textAlign: "right" }}
                            onValueChange={(values) => {
                              let tempValues = values.formattedValue
                                .split(".")
                                .join("")
                                .replace(/,/g, "");

                              setPPhYangDipotongDipungut(tempValues);
                            }}
                            disabled
                          />
                        </Col>
                        <Col sm="5" className="mt-2">
                          {!bupot2126DasarPengenaanPajakBebasInput && (
                            <button
                              className="ebupot-unifikasi-rekam-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                hitungPPhYangDipotongDipungut();
                              }}
                            >
                              <CalculateIcon
                                fontSize="small"
                                style={{ marginRight: "5px" }}
                              />
                              Hitung
                            </button>
                          )}
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
                        label="Dengan ini saya menyatakan bahwa Bukti Pemotongan/Pemunguran Unifikasi telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
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
              onClick={savedEbupot2126UbahPph21}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Ebupot2126UbahPph21;

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
