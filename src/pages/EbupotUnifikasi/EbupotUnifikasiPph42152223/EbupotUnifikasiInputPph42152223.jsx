import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupotUnifikasi,
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
  usePagination,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import {
  dasarPemotonganDokumenOptions,
  getLastDateOfMonth,
  getMonthIndex,
  getRandomIndonesianName,
} from "../../../constants/helper";
import { ShowTableDaftarDokumenPph42152223 } from "../../../components/ShowTable";
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
import DatePicker from "react-datepicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return (
    <div>
      <p>
        <b>Deskripsi Form:</b> Form ini digunakan untuk melakukan perekaman data
        baru Bukti Pemotongan PPh Unifikasi serta perubahannya.
      </p>
      <p>Form ini terdiri dari beberapa bagian antara lain:</p>
      <ol>
        <li>Bagian I, Identitas Wajib Pajak Yang Dipotong</li>
        <li>Bagian II, Penghasilan Yang Dipotong</li>
        <li>Bagian III, Dokumen Dasar Pemotongan</li>
        <li>Bagian IV, Identitas Pemotong Pajak</li>
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
          Nomo Bukti Potong, isikan nomor bukti potong sesuai dengan Identitas,
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
        <li>
          Pilihlah fasilitas yang dimiliki oleh Wajib Pajak :
          <ol>
            <li>
              Jika tidak memiliki fasilitas, maka pilihlah pilihan tanpa
              fasilitas pada pilihan yang tersedia.
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
        </li>
        <li>
          Dengan memilih Kode Objek Pajak, Sistem akan melakukan pencarian
          secara otomatis tarif dari jenis objek pajak.
        </li>
        <li>
          Isikan nilai nominal Penghasilan Bruto pada kotak yang tersedia,
          Sistem akan menghitung secara otomatis nilai Pajak Penghasilan yang
          dipotong
        </li>
      </ul>
      <p>
        <b>BAGIAN III,</b> Dokumen Pendukung
      </p>
      <p>
        Anda diharuskan mengisi minimal 1(satu) dokumen pendukung untuk
        pemotongan penghasilan. Untuk mengisi dokumen pendukung, klik tombol
        tambah, kemudian, isilah data dokumen pendukung yang sesuai.
      </p>
      <p>
        <b>BAGIAN IV,</b> Identitas Pemotong
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

      <p>
        Pada kolom paling kanan, tersedia tombol aksi yang berfungsi untuk :
      </p>
      <ul>
        <li>Melakukan perubahan data Bukti Setor yang sudah direkam.</li>
        <li>Melakukan penghapusan data Bukti Setor sudah direkam.</li>
      </ul>
      <p>Kolom Status menunjukkan status dari Bukti Setor.</p>
      <p>
        Untuk melakukan filter pencarian data bukti setor, Anda dapat
        menggunakan filter yang disediakan mencakup filter dengan Nomor Bukti
        Setor maupun period.
      </p>
    </div>
  );
};

function EbupotUnifikasiInputPph42152223() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accordionState, setAccordionState] = useState("1");

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
  const [isNikValid, setIsNikValid] = useState(false);

  const [fasilitasPajakPenghasilan, setFasilitasPajakPenghasilan] =
    useState("Tanpa Fasilitas");

  // 02.) Accordion 2
  const [nomorSuratKeteranganBebas, setNomorSuratKeteranganBebas] =
    useState("");
  const [nomorPPhDitanggungPemerintah, setNomorPPhDitanggungPemerintah] =
    useState("");
  const [
    nomorSuratKeteranganBerdasarkanPPNo232018,
    setNomorSuratKeteranganBerdasarkanPPNo232018,
  ] = useState("");
  const [
    nomorFasilitasLainnyaberdasarkan,
    setNomorFasilitasLainnyaberdasarkan,
  ] = useState("");
  const [kodeObjekPajak, setKodeObjekPajak] = useState("");
  const [jumlahPenghasilanBruto, setJumlahPenghasilanBruto] = useState("");
  const [tarif, setTarif] = useState("");
  const [pPhYangDipotongDipungut, setPPhYangDipotongDipungut] = useState("");

  // 03.) Accordion 3
  const [openSavedDokumenDasarPemotongan, setOpenSavedDokumenDasarPemotongan] =
    useState(false);
  const [reloadDasarPemotongan, setReloadDasarPemotongan] = useState(0);
  const [dasarPemotonganPagination, setDasarPemotonganPagination] = useState(
    []
  );
  let [page, setPage] = useState(1);
  let [PER_PAGE, setPER_PAGE] = useState(5);
  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = dasarPemotonganPagination.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const count = Math.ceil(dasarPemotonganPagination.length / PER_PAGE);
  const _DATA = usePagination(dasarPemotonganPagination, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const [namaDokumen, setNamaDokumen] = useState("");
  const [noDokumen, setNoDokumen] = useState("");
  const [tanggalDokumen, setTanggalDokumen] = useState(new Date());

  // 04.) Accordion 4
  const [bertindakSebagai, setBertindakSebagai] = useState("");
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
  const [penandatangans, setPenandatangans] = useState([]);

  // Handle identitas input change
  const handleIdentitasChange = (e) => {
    setIdentitas(e.target.value);
    setNpwpNitku("");
    setNama("");
  };

  const handleClickOpenSavedDokumenDasarPemotongan = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSavedDokumenDasarPemotongan(true);
  };

  const handleCloseSavedDokumenDasarPemotongan = () => {
    setOpenSavedDokumenDasarPemotongan(false);
  };

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  const hapusDaftarPemotongan = (index) => {
    dasarPemotonganPagination.splice(index, 1);

    setReloadDasarPemotongan(Math.floor(Math.random() * 1000));
  };

  let objekPajakOptions = objekPajaks.map((objekPajak) => ({
    label: `${objekPajak.kodeObjekPajak} - ${objekPajak.namaObjekPajak}`,
  }));

  let namaIdentitasOptions = penandatangans.map((namaIdentitas) => ({
    label: `${namaIdentitas.namaIdentitas}`,
  }));

  let bertindakSebagaiOptions = [
    {
      label: "Pengurus",
    },
    {
      label: "Kuasa",
    },
  ];

  let namaDokumenOptions = dasarPemotonganDokumenOptions();

  // Check if there's an error PPh Yang Dipotong Dipungut
  const errorPPhYangDipotongDipungut =
    pPhYangDipotongDipungut >= 0 &&
    parseInt(pPhYangDipotongDipungut) > parseInt(jumlahPenghasilanBruto);

  useEffect(() => {
    getObjekPajakData();
  }, []);

  const getObjekPajakData = async () => {
    const response = await axios.post(`${tempUrl}/objekPajaksBupot`, {
      untukBupotUnifikasi: "PPh 42152223",
      _id: user.id,
      token: user.token,
    });
    setObjekPajaks(response.data);
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

  const getPenandatangan = async (bertindakSebagai) => {
    if (bertindakSebagai === "Pengurus") {
      bertindakSebagai = "Wakil Wajib Pajak (Pengurus)";
    }

    const response = await axios.post(
      `${tempUrl}/penandatangansByUserByBertindakSebagai`,
      {
        bertindakSebagai,
        userPenandatanganId: user.id,
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

  // Handle Fasilitas Pajak Penghasilan input change
  const handleFasilitasPajakPenghasilanFasilitasLainnyaChange = (e) => {
    setFasilitasPajakPenghasilan(e.target.value);
    setTarif("");
    setPPhYangDipotongDipungut("");
  };

  // Handle Tindakan Kelebihan Pemotongan Pph input change
  const handleTindakanKelebihanPemotonganPphChange = (e) => {
    setTindakanKelebihanPemotonganPph(e.target.value);
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

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCondition =
      form.checkValidity() &&
      tahunPajak.length !== 0 &&
      masaPajak.length !== 0 &&
      npwpNitku.length >= 15 &&
      nama.length !== 0;

    if (identitas !== "NPWP/NITKU") {
      tempCondition =
        form.checkValidity() &&
        tahunPajak.length !== 0 &&
        masaPajak.length !== 0 &&
        nik.length >= 16 &&
        nama.length !== 0;
    }

    if (tempCondition) {
      setAccordionState("2");
    } else {
      setValidated(true);
    }
  };

  const handleKembaliForm2 = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAccordionState("1");
  };

  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let tempCondition =
      form.checkValidity() &&
      kodeObjekPajak.length !== 0 &&
      jumlahPenghasilanBruto.length !== 0 &&
      tarif.length !== 0 &&
      pPhYangDipotongDipungut.length !== 0;

    let tempConditionFasilitasPajakPenghasilan = form.checkValidity();

    if (fasilitasPajakPenghasilan === "Surat Keterangan Bebas (SKB)") {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() && nomorSuratKeteranganBebas.length !== 0;
    } else if (
      fasilitasPajakPenghasilan === "PPh Ditanggung Pemerintah (DTP)"
    ) {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() && nomorPPhDitanggungPemerintah.length !== 0;
    } else if (
      fasilitasPajakPenghasilan === "Surat Keterangan berdasarkan PP No 23 2018"
    ) {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() &&
        nomorSuratKeteranganBerdasarkanPPNo232018.length !== 0;
    } else if (fasilitasPajakPenghasilan === "Fasilitas lainnya berdasarkan") {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() && nomorFasilitasLainnyaberdasarkan.length !== 0;
    }

    if (tempCondition && tempConditionFasilitasPajakPenghasilan) {
      setAccordionState("3");
    } else {
      setValidated(true);
    }
  };

  const handleKembaliForm3 = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAccordionState("2");
  };

  const handleSubmitForm3 = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput = dasarPemotonganPagination.length !== 0;

    if (handlingInput) {
      setAccordionState("4");
    } else {
      setDetilSearchIdentitasWp(
        "Harap masukkan data Dokumen Dasar Pemotongan minimal 1 Dokumen"
      );

      setOpenConfirmationSearchIdentitasWp(true);
    }
    setValidated(true);
  };

  const handleKembaliForm4 = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAccordionState("3");
  };

  const saveEbupotUnifikasiInputPph42152223 = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      bertindakSebagai.length !== 0 && namaIdentitas.length !== 0;

    if (handlingInput) {
      try {
        setOpenSearchIdentitasWp(true);
        let savedEBupotUnifikasiPph42152223 = await axios.post(
          `${tempUrl}/saveEBupotUnifikasiPph42152223`,
          {
            userId: user.id,

            // 01.) Accordion 1
            tahunPajak,
            masaPajak,
            identitas,
            npwpNitku,
            nik,
            nama,

            // 02.) Accordion 2
            kodeObjekPajak: kodeObjekPajak.split(" -", 2)[0],
            nomorSuratKeteranganBebas,
            nomorPPhDitanggungPemerintah,
            nomorSuratKeteranganBerdasarkanPPNo232018,
            nomorFasilitasLainnyaberdasarkan,
            jumlahPenghasilanBruto,
            tarif,
            pPhYangDipotongDipungut,

            // 03.) Accordion 3
            dasarPemotongan: dasarPemotonganPagination,

            // 04.) Accordion 4
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
          setOpenSaved(true);
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupotUnifikasiInputPph42152223 = async (e) => {
    setOpenSaved(false);

    setValidated(false);
    setAccordionState("1");

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

    // 02.) Accordion 2
    setNomorSuratKeteranganBebas("");
    setNomorPPhDitanggungPemerintah("");
    setNomorSuratKeteranganBerdasarkanPPNo232018("");
    setNomorFasilitasLainnyaberdasarkan("");
    setKodeObjekPajak("");
    setJumlahPenghasilanBruto("");
    setTarif("");
    setPPhYangDipotongDipungut("");

    // 03.) Accordion 3
    setOpenSavedDokumenDasarPemotongan(false);
    setReloadDasarPemotongan(0);
    setDasarPemotonganPagination([]);
    setPage(1);
    setPER_PAGE(5);
    setNamaDokumen("");
    setNoDokumen("");
    setTanggalDokumen(new Date());

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
      <HeaderMainEbupotUnifikasi username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupotUnifikasi
        activeLink={"/ebupotUnifikasi/daftarDisetorSendiri"}
      />
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
          <MenuEbupotUnifikasi />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Perekaman data Bukti Pemotongan/Pemungutan PPh Unifikasi
            </Card.Header>
            <Card.Body>
              <div>
                <Accordion expanded={accordionState === "1" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={accordionBlue}
                  >
                    Identitas Wajib Pajak yang Dipotong/Dipungut
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmitForm1}
                      >
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
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
                                      error={
                                        validated && tahunPajak.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        tahunPajak.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setTahunPajak(value);
                                    findMasaPajakOptions(value);
                                  }}
                                  inputValue={tahunPajak}
                                  value={tahunPajak}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
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
                                      error={
                                        validated && masaPajak.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        masaPajak.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setMasaPajak(value);

                                    const month = getMonthIndex(value);
                                    const lastDate = getLastDateOfMonth(
                                      tahunPajak,
                                      month
                                    );
                                    setMaxMasaPajak(lastDate);
                                    setTanggalDokumen(lastDate);
                                  }}
                                  inputValue={masaPajak}
                                  value={masaPajak}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                        </div>
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
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
                                    onChange={handleIdentitasChange}
                                    style={{ cursor: "pointer" }}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="NIK"
                                    name="NIK"
                                    value="NIK"
                                    checked={identitas === "NIK"}
                                    onChange={handleIdentitasChange}
                                    style={inputRadio}
                                  />
                                </div>
                              </Col>
                            </Form.Group>
                          </div>
                          {identitas === "NPWP/NITKU" ? (
                            <div style={inputInput2}>
                              <Form.Group
                                as={Row}
                                className="mb-4"
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
                                      npwpNitku.length > 0 &&
                                      npwpNitku.length < 15
                                    }
                                    onChange={(e) => {
                                      let value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      );

                                      if (value.length <= 22) {
                                        setNpwpNitku(value);
                                      }

                                      setNama("");
                                    }}
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
                                className="mb-4"
                                controlId="formPlaintextPassword"
                              >
                                <Form.Label column sm="4">
                                  NIK
                                </Form.Label>
                                <Col sm="8">
                                  <Form.Control
                                    required
                                    value={nik}
                                    isInvalid={
                                      nik.length > 0 && nik.length < 16
                                    }
                                    onChange={(e) => {
                                      let value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                      );

                                      if (value.length <= 16) {
                                        setNik(value);
                                      }
                                      setIsNikValid(false);
                                    }}
                                  />
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
                                  className="mb-4"
                                  controlId="formPlaintextPassword"
                                >
                                  <Form.Label column sm="4">
                                    Nama
                                  </Form.Label>
                                  <Col sm="8">
                                    <Form.Control value={nama} readOnly />
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
                                  className="mb-4"
                                  controlId="formPlaintextPassword"
                                >
                                  <Form.Label column sm="4">
                                    Nama
                                  </Form.Label>
                                  <Col sm="8">
                                    <Form.Control
                                      required
                                      value={nama}
                                      readOnly={
                                        identitas === "NPWP/NITKU" && true
                                      }
                                      onChange={(e) => {
                                        setNama(e.target.value.toUpperCase());
                                        setIsNikValid(false);
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </Col>
                                </Form.Group>
                              </div>
                              <div style={inputInput2}>
                                <Form.Group
                                  as={Row}
                                  className="mb-4"
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
                                </Form.Group>
                              </div>
                            </>
                          )}
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <button className="hover-button" type="submit">
                            Berikutnya {">"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={accordionState === "2" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={accordionYellow}
                  >
                    Pajak Penghasilan yang Dipotong/Dipungut
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmitForm2}
                      >
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                Kode Objek Pajak
                              </Form.Label>
                              <Col sm="7">
                                <Autocomplete
                                  size="small"
                                  disablePortal
                                  id="combo-box-demo"
                                  options={objekPajakOptions}
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      error={
                                        validated && kodeObjekPajak.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        kodeObjekPajak.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setKodeObjekPajak(value.split(" ", 1)[0]);

                                    if (value.length === 0) {
                                      setJumlahPenghasilanBruto("");
                                      setTarif("");
                                      setPPhYangDipotongDipungut("");
                                    } else {
                                      getTarifPersen(value.split(" ", 1)[0]);
                                    }
                                  }}
                                  inputValue={kodeObjekPajak}
                                  value={kodeObjekPajak}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </div>
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                Fasilitas Pajak Penghasilan
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  type="radio"
                                  label="Tanpa Fasilitas"
                                  name="Tanpa Fasilitas"
                                  value="Tanpa Fasilitas"
                                  checked={
                                    fasilitasPajakPenghasilan ===
                                    "Tanpa Fasilitas"
                                  }
                                  onChange={
                                    handleFasilitasPajakPenghasilanChange
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </div>
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label
                                column
                                sm="5"
                                style={{ visibility: "hidden" }}
                              >
                                Fasilitas Pajak Penghasilan
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  type="radio"
                                  label="Surat Keterangan Bebas (SKB)"
                                  name="Surat Keterangan Bebas (SKB)"
                                  value="Surat Keterangan Bebas (SKB)"
                                  checked={
                                    fasilitasPajakPenghasilan ===
                                    "Surat Keterangan Bebas (SKB)"
                                  }
                                  onChange={
                                    handleFasilitasPajakPenghasilanChange
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                {fasilitasPajakPenghasilan ===
                                "Surat Keterangan Bebas (SKB)" ? (
                                  <>
                                    <Form.Control
                                      required
                                      placeholder="Nomor SKB"
                                      value={nomorSuratKeteranganBebas}
                                      onChange={(e) => {
                                        setNomorSuratKeteranganBebas(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </>
                                ) : (
                                  <Form.Control
                                    placeholder="Nomor SKB"
                                    value={nomorSuratKeteranganBebas}
                                    readOnly
                                  />
                                )}
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
                              <Form.Label
                                column
                                sm="5"
                                style={{ visibility: "hidden" }}
                              >
                                Fasilitas Pajak Penghasilan
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  type="radio"
                                  label="PPh Ditanggung Pemerintah (DTP)"
                                  name="PPh Ditanggung Pemerintah (DTP)"
                                  value="PPh Ditanggung Pemerintah (DTP)"
                                  checked={
                                    fasilitasPajakPenghasilan ===
                                    "PPh Ditanggung Pemerintah (DTP)"
                                  }
                                  onChange={
                                    handleFasilitasPajakPenghasilanChange
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                {fasilitasPajakPenghasilan ===
                                "PPh Ditanggung Pemerintah (DTP)" ? (
                                  <>
                                    <Form.Control
                                      required
                                      placeholder="Nomor Aturan DTP"
                                      value={nomorPPhDitanggungPemerintah}
                                      onChange={(e) => {
                                        setNomorPPhDitanggungPemerintah(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </>
                                ) : (
                                  <Form.Control
                                    placeholder="Nomor Aturan DTP"
                                    value={nomorPPhDitanggungPemerintah}
                                    readOnly
                                  />
                                )}
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
                              <Form.Label
                                column
                                sm="5"
                                style={{ visibility: "hidden" }}
                              >
                                Fasilitas Pajak Penghasilan
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  type="radio"
                                  label="Surat Keterangan berdasarkan PP No 23 2018"
                                  name="Surat Keterangan berdasarkan PP No 23 2018"
                                  value="Surat Keterangan berdasarkan PP No 23 2018"
                                  checked={
                                    fasilitasPajakPenghasilan ===
                                    "Surat Keterangan berdasarkan PP No 23 2018"
                                  }
                                  onChange={
                                    handleFasilitasPajakPenghasilanChange
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                {fasilitasPajakPenghasilan ===
                                "Surat Keterangan berdasarkan PP No 23 2018" ? (
                                  <>
                                    <Form.Control
                                      required
                                      placeholder="Nomor Suket PP23"
                                      value={
                                        nomorSuratKeteranganBerdasarkanPPNo232018
                                      }
                                      onChange={(e) => {
                                        setNomorSuratKeteranganBerdasarkanPPNo232018(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </>
                                ) : (
                                  <Form.Control
                                    placeholder="Nomor Suket PP23"
                                    value={
                                      nomorSuratKeteranganBerdasarkanPPNo232018
                                    }
                                    readOnly
                                  />
                                )}
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
                              <Form.Label
                                column
                                sm="5"
                                style={{ visibility: "hidden" }}
                              >
                                Fasilitas Pajak Penghasilan
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  type="radio"
                                  label="Fasilitas lainnya berdasarkan"
                                  name="Fasilitas lainnya berdasarkan"
                                  value="Fasilitas lainnya berdasarkan"
                                  checked={
                                    fasilitasPajakPenghasilan ===
                                    "Fasilitas lainnya berdasarkan"
                                  }
                                  onChange={
                                    handleFasilitasPajakPenghasilanFasilitasLainnyaChange
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                {fasilitasPajakPenghasilan ===
                                "Fasilitas lainnya berdasarkan" ? (
                                  <>
                                    <Form.Control
                                      required
                                      placeholder="Nomor Dokumen Fasilitas Lainnya"
                                      value={nomorFasilitasLainnyaberdasarkan}
                                      onChange={(e) => {
                                        setNomorFasilitasLainnyaberdasarkan(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </>
                                ) : (
                                  <Form.Control
                                    placeholder="Nomor Dokumen Fasilitas Lainnya"
                                    value={nomorFasilitasLainnyaberdasarkan}
                                    readOnly
                                  />
                                )}
                              </Col>
                            </Form.Group>
                          </div>
                        </div>
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-4"
                              controlId="formPlaintextPassword"
                            >
                              <Form.Label column sm="5">
                                Jumlah Penghasilan Bruto
                              </Form.Label>
                              <Col sm="7">
                                <NumericFormat
                                  required
                                  value={jumlahPenghasilanBruto}
                                  decimalSeparator={","}
                                  thousandSeparator={"."}
                                  customInput={Form.Control}
                                  style={{ textAlign: "right" }}
                                  onValueChange={(values) => {
                                    let tempValues = values.formattedValue
                                      .split(".")
                                      .join("")
                                      .replace(/,/g, "");

                                    setJumlahPenghasilanBruto(tempValues);

                                    let hitungPph = (tempValues * tarif) / 100;
                                    setPPhYangDipotongDipungut(
                                      parseInt(hitungPph)
                                    );
                                  }}
                                />
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
                                Tarif
                              </Form.Label>
                              <Col sm="7">
                                {fasilitasPajakPenghasilan ===
                                "Fasilitas lainnya berdasarkan" ? (
                                  <>
                                    <InputGroup>
                                      <Form.Control
                                        required
                                        style={{ textAlign: "right" }}
                                        value={tarif}
                                        isInvalid={
                                          validated && tarif.length === 0
                                        }
                                        onChange={(e) => {
                                          let value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                          ); // Allow only numbers
                                          if (value > 100) value = 100; // Cap the value at 100
                                          setTarif(value);
                                        }}
                                      />
                                      <InputGroup.Text>%</InputGroup.Text>
                                      <Form.Control.Feedback type="invalid">
                                        Kolom ini diperlukan.
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </>
                                ) : (
                                  <>
                                    <Form.Control
                                      style={{ textAlign: "right" }}
                                      value={`${tarif}%`} // Always append "%" to the value
                                      readOnly
                                    />
                                  </>
                                )}
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
                                PPh yang Dipotong/Dipungut
                              </Form.Label>
                              <Col sm="7">
                                {fasilitasPajakPenghasilan ===
                                "Fasilitas lainnya berdasarkan" ? (
                                  <>
                                    <NumericFormat
                                      required
                                      value={pPhYangDipotongDipungut}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      className={
                                        errorPPhYangDipotongDipungut
                                          ? "is-invalid"
                                          : ""
                                      }
                                      onValueChange={(values) => {
                                        let tempPPhYangDipotongDipungut =
                                          values.formattedValue
                                            .split(".")
                                            .join("")
                                            .replace(/,/g, "");

                                        setPPhYangDipotongDipungut(
                                          tempPPhYangDipotongDipungut
                                        );
                                      }}
                                    />
                                    {errorPPhYangDipotongDipungut && (
                                      <Form.Control.Feedback type="invalid">
                                        Jumlah PPh Dipotong harus lebih besar
                                        atau sama dengan 0 dan lebih kecil atau
                                        sama dengan Jumlah Penghasilan Bruto.
                                      </Form.Control.Feedback>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <NumericFormat
                                      value={pPhYangDipotongDipungut}
                                      decimalSeparator={","}
                                      thousandSeparator={"."}
                                      customInput={Form.Control}
                                      style={{ textAlign: "right" }}
                                      readOnly
                                    />
                                  </>
                                )}
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={inputInput2}></div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            className="hover-white-button"
                            onClick={handleKembaliForm2}
                          >
                            {"<"} Sebelumnya
                          </button>
                          <button className="hover-button" type="submit">
                            Berikutnya {">"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={accordionState === "3" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    style={accordionBlue}
                  >
                    Dokumen Dasar Pemotongan
                  </AccordionSummary>
                  <AccordionDetails>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmitForm3}
                    >
                      <Card style={{ marginTop: "20px" }}>
                        <Card.Header style={inputTitle}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <FormatListBulletedIcon
                                style={{ marginRight: "10px" }}
                              />
                              Daftar Dokumen
                            </div>
                            <div>
                              <button
                                className="daftar-dokumen-button"
                                onClick={
                                  handleClickOpenSavedDokumenDasarPemotongan
                                }
                              >
                                <AddCircleIcon
                                  fontSize="small"
                                  style={{ marginRight: "5px" }}
                                />
                                Tambah
                              </button>
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <div style={menuLaporContainer}>
                            <p style={{ paddingTop: "10px" }}>Tampilkan</p>
                            <Form.Select
                              size="sm"
                              style={{
                                width: "auto",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              onChange={(e) => {
                                setPER_PAGE(e.target.value);
                              }}
                            >
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="30">30</option>
                            </Form.Select>
                            <p style={{ paddingTop: "10px" }}>Entry</p>
                          </div>
                          <Box>
                            <ShowTableDaftarDokumenPph42152223
                              currentPosts={currentPosts}
                              hapusDaftarPemotongan={hapusDaftarPemotongan}
                            />
                          </Box>
                          <Box sx={tableContainer}>
                            <Pagination
                              shape="rounded"
                              color="primary"
                              count={count}
                              page={page}
                              onChange={handleChange}
                              size={screenSize <= 600 ? "small" : "large"}
                            />
                          </Box>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "60px",
                            }}
                          >
                            <button
                              className="hover-white-button"
                              onClick={handleKembaliForm3}
                            >
                              {"<"} Sebelumnya
                            </button>
                            <button className="hover-button" type="submit">
                              Berikutnya {">"}
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Form>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={accordionState === "4" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                    style={accordionYellow}
                  >
                    Identitas Pemotong Pajak
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={saveEbupotUnifikasiInputPph42152223}
                      >
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
                                <Autocomplete
                                  size="small"
                                  disablePortal
                                  id="combo-box-demo"
                                  options={bertindakSebagaiOptions}
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      error={
                                        validated &&
                                        bertindakSebagai.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        bertindakSebagai.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setBertindakSebagai(value);
                                    getPenandatangan(value);
                                  }}
                                  inputValue={bertindakSebagai}
                                  value={bertindakSebagai}
                                />
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
                                      error={
                                        validated && namaIdentitas.length === 0
                                      }
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
                          <p>
                            Apabila terdapat kesalahan dalam pembuatan Bukti
                            Pemotongan/Pemungutan Unifikasi yang menyebabkan
                            kelebihan pemotongan/pemungutan PPh, maka pihak yang
                            akan diajukan :
                          </p>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-2"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                <Form.Check
                                  type="radio"
                                  label="Pengembalian atas pajak yang tidak seharusnya terutang oleh Pemotong dan/atau Pemungut PPh"
                                  name="Pengembalian atas pajak yang tidak seharusnya terutang oleh Pemotong dan/atau Pemungut PPh"
                                  value="1"
                                  checked={
                                    tindakanKelebihanPemotonganPph === "1"
                                  }
                                  onChange={
                                    handleTindakanKelebihanPemotonganPphChange
                                  }
                                  style={inputTindakanRadio}
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-3"
                              controlId="formPlaintextPassword"
                            >
                              <Col sm="12">
                                <Form.Check
                                  type="radio"
                                  label="Pemindahbukuan oleh Pemotong dan/atau Pemungut PPh"
                                  name="Pemindahbukuan oleh Pemotong dan/atau Pemungut PPh"
                                  value="2"
                                  checked={
                                    tindakanKelebihanPemotonganPph === "2"
                                  }
                                  onChange={
                                    handleTindakanKelebihanPemotonganPphChange
                                  }
                                  style={inputTindakanRadio}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div style={{ marginTop: "50px" }}>
                            <Form.Check
                              type="checkbox"
                              label="Dengan ini saya menyatakan bahwa Bukti Pemotongan/Pemunguran Unifikasi telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
                              checked={pernyataanBenar}
                              onChange={() =>
                                setPernyataanBenar(!pernyataanBenar)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            className="hover-white-button"
                            onClick={handleKembaliForm4}
                          >
                            {"<"} Sebelumnya
                          </button>
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
                      </Form>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        onClose={handleCloseSavedDokumenDasarPemotongan}
        aria-labelledby="customized-dialog-title"
        open={openSavedDokumenDasarPemotongan}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Dasar Pemotongan
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseSavedDokumenDasarPemotongan}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={inputWrapperDialogueSaved}>
            <div style={profilWrapper}>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Nama Dokumen
                    </Form.Label>
                    <Col sm="8">
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={namaDokumenOptions}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            error={validated && namaDokumen.length === 0}
                            helperText={
                              validated &&
                              namaDokumen.length === 0 &&
                              "Kolom ini diperlukan."
                            }
                            {...params}
                          />
                        )}
                        onInputChange={(e, value) => {
                          setNamaDokumen(value);
                        }}
                        inputValue={namaDokumen}
                        value={namaDokumen}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      No Dokumen
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        required
                        isInvalid={validated && noDokumen.length === 0}
                        value={noDokumen}
                        onChange={(e) => {
                          setNoDokumen(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Kolom ini diperlukan.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="4">
                      Tanggal
                    </Form.Label>
                    <Col sm="8">
                      <DatePicker
                        required
                        maxDate={maxMasaPajak}
                        dateFormat="dd/MM/yyyy"
                        customInput={<Form.Control required />}
                        selected={tanggalDokumen}
                        onChange={(date) => setTanggalDokumen(date)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="hover-button"
              onClick={() => {
                let tempValidation =
                  namaDokumen.length !== 0 &&
                  noDokumen.length !== 0 &&
                  tanggalDokumen.length !== 0;

                if (tempValidation) {
                  dasarPemotonganPagination.push({
                    namaDokumen: namaDokumen,
                    noDokumen: noDokumen,
                    tanggalDokumen: tanggalDokumen,
                  });
                  setReloadDasarPemotongan(Math.floor(Math.random() * 1000));

                  handleCloseSavedDokumenDasarPemotongan();

                  setNamaDokumen("");
                  setNoDokumen("");
                  setTanggalDokumen(new Date());
                } else {
                  setValidated(true);
                }
              }}
            >
              <AddCircleIcon fontSize="small" />
              Tambahkan
            </button>
          </div>
        </DialogContent>
      </Dialog>
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
                navigate("/ebupotUnifikasi/daftarPph42152223");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupotUnifikasiInputPph42152223}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiInputPph42152223;

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
