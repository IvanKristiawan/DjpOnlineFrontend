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
import { dasarPemotonganDokumenOptions } from "../../../constants/helper";
import { ShowTableDaftarDokumenPphNonResiden } from "../../../components/ShowTable";
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
  AccordionSummary,
  AccordionDetails,
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
          Nomo Bukti Potong, isikan nomor bukti potong sesuai dengan ketentuan
          yang berlaku.
        </li>
        <li>
          Tax ID Number (TIN), Id ini harus diisi dengan data yang valid, tidak
          diperbolehkan mengisi dengan nilai "0000..".
        </li>
        <li>
          Nama, isikan nama wajib pajak sesuai dengan yang tertera pada dokumen
          kewarganegaraannya atau Paspor.
        </li>
        <li>
          Alamat, isikan alamat wajib pajak sesuai dengan dokumen
          kewarganegaraannya.
        </li>
        <li>
          Negara,pilihkan Asal negara yang sesuai dari pilihan yang tersedia.
        </li>
        <li>
          Tanggal Lahir,isikan tanggal lahir sesuai dengan dokumen
          kewarganegaraannya.
        </li>
        <li>No Paspor,cukup jelas.</li>
        <li>No KITAS/KITAP,cukup jelas.</li>
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
          Secara default tarif terisi otomatis berdasarkan Kode Objek Pajak yang
          dipilih, tetapi jika menggunakan fasilitas SKD WPLN atau Fasilitas
          Lainnya, maka Wajib Pajak harus mengisikan tarif secara manual.
        </li>
        <li>
          Isikan nilai nominal Penghasilan Bruto pada kotak yang tersedia,
          Sistem akan menghitung secara otomatis nilai Pajak Penghasilan yang
          dipotong.
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
    </div>
  );
};

function EbupotUnifikasiInputPphNonResiden() {
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

  const [masaPajak, setMasaPajak] = useState("");
  const [masaPajakOptions, setMasaPajakOptions] = useState([]);
  const [tin, setTin] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [noPaspor, setNoPaspor] = useState("");
  const [namaNegara, setNamaNegara] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState();
  const [noKitasKitap, setNoKitasKitap] = useState("");

  const [fasilitasPajakPenghasilan, setFasilitasPajakPenghasilan] =
    useState("Tanpa Fasilitas");

  // 02.) Accordion 2
  const [nomorSkdWpln, setNomorSkdWpln] = useState("");
  const [nomorPPhDitanggungPemerintah, setNomorPPhDitanggungPemerintah] =
    useState("");
  const [
    nomorFasilitasLainnyaberdasarkan,
    setNomorFasilitasLainnyaberdasarkan,
  ] = useState("");
  const [kodeObjekPajak, setKodeObjekPajak] = useState("");
  const [jumlahPenghasilanBruto, setJumlahPenghasilanBruto] = useState("");
  const [perkiraanPenghasilanNetto, setPerkiraanPenghasilanNetto] =
    useState("");
  const [tarif, setTarif] = useState("");
  const [pPhYangDipotongDipungut, setPPhYangDipotongDipungut] = useState("");
  const [
    pilihanPerkiraanPenghasilanNetto,
    setPilihanPerkiraanPenghasilanNetto,
  ] = useState("5");
  const [
    openPilihanPerkiraanPenghasilanNetto,
    setOpenPilihanPerkiraanPenghasilanNetto,
  ] = useState(false);

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
  const [negaras, setNegaras] = useState([]);

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

  const handleClosePilihanPerkiraanPenghasilanNetto = () => {
    setOpenPilihanPerkiraanPenghasilanNetto(false);
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

  let negarasOptions = negaras.map((negara) => ({
    label: `${negara.namaNegara}`,
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
    getNegara();
  }, []);

  const getObjekPajakData = async () => {
    const response = await axios.post(`${tempUrl}/objekPajaksBupot`, {
      kodeBupot: "1",
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
      setPerkiraanPenghasilanNetto(response.data.perkiraanPenghasilanNetto);
      setTarif(response.data.tarifPersen);

      let hitungPph =
        (((jumlahPenghasilanBruto * response.data.perkiraanPenghasilanNetto) /
          100) *
          response.data.tarifPersen) /
        100;
      setPPhYangDipotongDipungut(parseInt(hitungPph));

      if (response.data.pilihanPerkiraanPenghasilanNetto == "1") {
        setOpenPilihanPerkiraanPenghasilanNetto(true);
      }
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

  // Handle Pilihan Perkiraan Penghasilan Netto input change
  const handlePilihanPerkiraanPenghasilanNettoChange = (e) => {
    setPilihanPerkiraanPenghasilanNetto(e.target.value);
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
      tin.length !== 0 &&
      nama.length !== 0 &&
      alamat.length !== 0 &&
      tempatLahir.length !== 0 &&
      noPaspor.length !== 0 &&
      namaNegara.length !== 0 &&
      tanggalLahir.length !== 0 &&
      noKitasKitap.length !== 0;

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
      perkiraanPenghasilanNetto.length !== 0 &&
      tarif.length !== 0 &&
      pPhYangDipotongDipungut.length !== 0;

    let tempConditionFasilitasPajakPenghasilan = form.checkValidity();

    if (fasilitasPajakPenghasilan === "SKD WPLN") {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() && nomorSkdWpln.length !== 0;
    } else if (
      fasilitasPajakPenghasilan === "PPh Ditanggung Pemerintah (DTP)"
    ) {
      tempConditionFasilitasPajakPenghasilan =
        form.checkValidity() && nomorPPhDitanggungPemerintah.length !== 0;
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

  const saveEbupotUnifikasiInputPphNonResiden = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      bertindakSebagai.length !== 0 && namaIdentitas.length !== 0;

    if (handlingInput) {
      setOpenSearchIdentitasWp(true);
      try {
        let savedEBupotUnifikasiPphNonResiden = await axios.post(
          `${tempUrl}/saveEBupotUnifikasiPphNonResiden`,
          {
            userId: user.id,

            // 01.) Accordion 1
            tahunPajak,
            masaPajak,
            tin,
            nama,
            alamat,
            tempatLahir,
            noPaspor,
            namaNegara,
            tanggalLahir,
            noKitasKitap,

            // 02.) Accordion 2
            kodeObjekPajak: kodeObjekPajak.split(" -", 2)[0],
            nomorSkdWpln,
            nomorPPhDitanggungPemerintah,
            nomorFasilitasLainnyaberdasarkan,
            jumlahPenghasilanBruto,
            perkiraanPenghasilanNetto,
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

  const pilihPerkiraanPenghasilanNetto = async (e) => {
    setPerkiraanPenghasilanNetto(pilihanPerkiraanPenghasilanNetto);

    let hitungPph =
      (((jumlahPenghasilanBruto * pilihanPerkiraanPenghasilanNetto) / 100) *
        tarif) /
      100;
    setPPhYangDipotongDipungut(parseInt(hitungPph));

    setPernyataanBenar(false);
    setOpenPilihanPerkiraanPenghasilanNetto(false);
  };

  const savedEbupotUnifikasiInputPphNonResiden = async (e) => {
    setOpenSaved(false);

    setValidated(false);
    setAccordionState("1");

    // 01.) Accordion 1
    setTahunPajak("");
    setMasaPajak("");
    setMasaPajakOptions([]);
    setTin("");
    setNama("");
    setAlamat("");
    setTempatLahir("");
    setNoPaspor("");
    setNamaNegara("");
    setTanggalLahir();
    setNoKitasKitap("");
    setFasilitasPajakPenghasilan("Tanpa Fasilitas");

    // 02.) Accordion 2
    setNomorSkdWpln("");
    setNomorPPhDitanggungPemerintah("");
    setNomorFasilitasLainnyaberdasarkan("");
    setKodeObjekPajak("");
    setJumlahPenghasilanBruto("");
    setPerkiraanPenghasilanNetto("");
    setPerkiraanPenghasilanNetto("");
    setTarif("");
    setPPhYangDipotongDipungut("");
    setPilihanPerkiraanPenghasilanNetto("5");

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
                                TIN
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={tin}
                                  onChange={(e) => {
                                    setTin(e.target.value.toUpperCase());
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
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
                              <Form.Label column sm="4">
                                Nama
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={nama}
                                  onChange={(e) => {
                                    setNama(e.target.value.toUpperCase());
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
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
                              <Form.Label column sm="4">
                                Alamat
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={alamat}
                                  onChange={(e) => {
                                    setAlamat(e.target.value.toUpperCase());
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
                                    <TextField
                                      size="small"
                                      error={
                                        validated && namaNegara.length === 0
                                      }
                                      helperText={
                                        validated &&
                                        namaNegara.length === 0 &&
                                        "Kolom ini diperlukan."
                                      }
                                      {...params}
                                    />
                                  )}
                                  onInputChange={(e, value) => {
                                    setNamaNegara(value);
                                  }}
                                  inputValue={namaNegara}
                                  value={namaNegara}
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
                                Tempat Lahir
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={tempatLahir}
                                  onChange={(e) => {
                                    setTempatLahir(
                                      e.target.value.toUpperCase()
                                    );
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
                              <Form.Label column sm="4">
                                Tanggal Lahir
                              </Form.Label>
                              <Col sm="8">
                                <DatePicker
                                  required
                                  dateFormat="dd/MM/yyyy"
                                  customInput={<Form.Control required />}
                                  selected={tanggalLahir}
                                  onChange={(date) => setTanggalLahir(date)}
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
                                No. Paspor
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={noPaspor}
                                  onChange={(e) => {
                                    setNoPaspor(e.target.value.toUpperCase());
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
                              <Form.Label column sm="4">
                                No. KITAS/KITAP
                              </Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  required
                                  value={noKitasKitap}
                                  onChange={(e) => {
                                    setNoKitasKitap(
                                      e.target.value.toUpperCase()
                                    );
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Kolom ini diperlukan.
                                </Form.Control.Feedback>
                              </Col>
                            </Form.Group>
                          </div>
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
                                      setPerkiraanPenghasilanNetto("");
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
                                  label="SKD WPLN"
                                  name="SKD WPLN"
                                  value="SKD WPLN"
                                  checked={
                                    fasilitasPajakPenghasilan === "SKD WPLN"
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
                                {fasilitasPajakPenghasilan === "SKD WPLN" ? (
                                  <>
                                    <Form.Control
                                      required
                                      placeholder="Nomor Tanda Terima SKD WPLN"
                                      value={nomorSkdWpln}
                                      onChange={(e) => {
                                        setNomorSkdWpln(e.target.value);
                                      }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Kolom ini diperlukan.
                                    </Form.Control.Feedback>
                                  </>
                                ) : (
                                  <Form.Control
                                    placeholder="Nomor Tanda Terima SKD WPLN"
                                    value={nomorSkdWpln}
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

                                    let hitungPph =
                                      (((tempValues *
                                        perkiraanPenghasilanNetto) /
                                        100) *
                                        tarif) /
                                      100;
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
                                Perkiraan Penghasilan Netto
                              </Form.Label>
                              <Col sm="7">
                                <Form.Control
                                  style={{ textAlign: "right" }}
                                  value={`${perkiraanPenghasilanNetto}%`} // Always append "%" to the value
                                  readOnly
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

                                          let hitungPph =
                                            (((jumlahPenghasilanBruto *
                                              perkiraanPenghasilanNetto) /
                                              100) *
                                              value) /
                                            100;
                                          setPPhYangDipotongDipungut(
                                            parseInt(hitungPph)
                                          );
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
                            <ShowTableDaftarDokumenPphNonResiden
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
                        onSubmit={saveEbupotUnifikasiInputPphNonResiden}
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
        open={openPilihanPerkiraanPenghasilanNetto}
        onClose={handleClosePilihanPerkiraanPenghasilanNetto}
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
              <b>Pilih Perkiraan Penghasilan Netto</b>
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
                <Row>
                  <Col sm="4">
                    <Form.Check
                      type="radio"
                      label="5%"
                      name="5%"
                      value="5"
                      checked={pilihanPerkiraanPenghasilanNetto === "5"}
                      onChange={handlePilihanPerkiraanPenghasilanNettoChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                  <Col sm="4">
                    <Form.Check
                      type="radio"
                      label="10%"
                      name="10%"
                      value="10"
                      checked={pilihanPerkiraanPenghasilanNetto === "10"}
                      onChange={handlePilihanPerkiraanPenghasilanNettoChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                  <Col sm="4">
                    <Form.Check
                      type="radio"
                      label="50%"
                      name="50%"
                      value="50"
                      checked={pilihanPerkiraanPenghasilanNetto === "50"}
                      onChange={handlePilihanPerkiraanPenghasilanNettoChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                </Row>
              </div>
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
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={pilihPerkiraanPenghasilanNetto}
            >
              Pilih
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
                Pasal 26 lagi?
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
                navigate("/ebupotUnifikasi/daftarPphNonResiden");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupotUnifikasiInputPphNonResiden}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiInputPphNonResiden;

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
