import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupotUnifikasiSptMasa,
  HeaderMainEbupotUnifikasi,
  HeaderMainProfil,
  MainMenuEbupotUnifikasi,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import { dasarPemotonganDokumenOptions } from "../../../constants/helper";
import { ShowTableEbupotUnifikasiBuktiSetorPenyiapanSpt } from "../../../components/ShowTable";
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
import DatePicker from "react-datepicker";
import { NumericFormat } from "react-number-format";
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
        <b>Deskripsi Form:</b> Dalam proses ini, sistem akan membimbing Anda
        untuk melengkapi SPT dengan merekam data Lampiran DOSS Bagian III nomor
        7, data Lampiran DOPP Bagian IV nomor 34, 35, 36, menambahkan data
        pembayaran ke SPT dan melengkapi data penandatangan SPT, berikut adalah
        langkah-langahnya:
      </p>
      <ol>
        <li>
          Silahkan melakukan perekaman detail Lampiran DOSS Bagian III nomor 7
          jika ada transaksi atas Imbalan yang diterima/diperoleh sehubungan
          dengan pengangkutan orang dan/atau barang termasuk penyewaan kapal
          laut oleh perusahaan pelayaran dalam negeri
        </li>
        <li>
          Silahkan melakukan perekaman detail Lampiran DOPP Bagian IV nomor 34
          35 dan 36 jika ada transaksi terkait Bunga Deposito/Tabungan, Diskonto
          SBI, Jasa Giro, Penjualan Saham dan/atau Bunga Diskonto Obligasi dan
          Surat Berharga
        </li>
        <li>Periksa Kembali apakah data penyetoran sudah lengkap</li>
        <li>
          Klik panel PENANDATANGAN, kemudian tentukan penandatangan dokumen SPT
          tersebut
        </li>
        <li>Klik tombol SIMPAN untuk menyelesaikan proses ini</li>
      </ol>
    </div>
  );
};

function EbupotUnifikasiUbahPenyiapanSpt() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionState, setAccordionState] = useState("1");

  const [nama, setNama] = useState(user.nama);
  const [npwp, setNpwp] = useState(user.npwp15);
  const [nikNpwp16, setNikNpwp16] = useState(user.nikNpwp16);
  const [nitku, setNitku] = useState(user.nitku);
  const [pembetulanKe, setPembetulanKe] = useState("");
  const [tahunPajak, setTahunPajak] = useState("");
  const [masaPajak, setMasaPajak] = useState("");

  // DOSS
  const [
    penghasilanDariIndonesiaJumlahDasar,
    setPenghasilanDariIndonesiaJumlahDasar,
  ] = useState("0");
  const [
    penghasilanDariIndonesiaJumlahPph,
    setPenghasilanDariIndonesiaJumlahPph,
  ] = useState("0");
  const [
    penghasilanDariLuarIndonesiaJumlahDasar,
    setPenghasilanDariLuarIndonesiaJumlahDasar,
  ] = useState("0");
  const [
    penghasilanDariLuarIndonesiaJumlahPph,
    setPenghasilanDariLuarIndonesiaJumlahPph,
  ] = useState("0");
  const [
    pphPasal24YangDapatDiperhitungkanJumlahPph,
    setPphPasal24YangDapatDiperhitungkanJumlahPph,
  ] = useState("0");
  const [
    pphYangDipotongPihakLainJumlahPph,
    setPphYangDipotongPihakLainJumlahPph,
  ] = useState("0");
  const [pphYangDisetorSendiriJumlahPph, setPphYangDisetorSendiriJumlahPph] =
    useState("0");

  // DOPP
  const [kode2210101JumlahDasar, setKode2210101JumlahDasar] = useState("0");
  const [kode2210101JumlahPph, setKode2210101JumlahPph] = useState("0");
  const [kode2240501JumlahDasar, setKode2240501JumlahDasar] = useState("0");
  const [kode2240501JumlahPph, setKode2240501JumlahPph] = useState("0");
  const [kode2240502JumlahDasar, setKode2240502JumlahDasar] = useState("0");
  const [kode2240502JumlahPph, setKode2240502JumlahPph] = useState("0");
  const [kode2710007JumlahDasar, setKode2710007JumlahDasar] = useState("0");
  const [kode2710007JumlahPph, setKode2710007JumlahPph] = useState("0");
  const [kode2710203JumlahDasar, setKode2710203JumlahDasar] = useState("0");
  const [kode2710203JumlahPph, setKode2710203JumlahPph] = useState("0");
  const [kode2840101JumlahDasar, setKode2840101JumlahDasar] = useState("0");
  const [kode2840101JumlahPph, setKode2840101JumlahPph] = useState("0");
  const [kode2840104JumlahDasar, setKode2840104JumlahDasar] = useState("0");
  const [kode2840104JumlahPph, setKode2840104JumlahPph] = useState("0");
  const [kode2840105JumlahDasar, setKode2840105JumlahDasar] = useState("0");
  const [kode2840105JumlahPph, setKode2840105JumlahPph] = useState("0");
  const [kode2840106JumlahDasar, setKode2840106JumlahDasar] = useState("0");
  const [kode2840106JumlahPph, setKode2840106JumlahPph] = useState("0");
  const [kode2840401JumlahDasar, setKode2840401JumlahDasar] = useState("0");
  const [kode2840401JumlahPph, setKode2840401JumlahPph] = useState("0");
  const [kode2840402JumlahDasar, setKode2840402JumlahDasar] = useState("0");
  const [kode2840402JumlahPph, setKode2840402JumlahPph] = useState("0");
  const [kode2840403JumlahDasar, setKode2840403JumlahDasar] = useState("0");
  const [kode2840403JumlahPph, setKode2840403JumlahPph] = useState("0");
  const [kode2840404JumlahDasar, setKode2840404JumlahDasar] = useState("0");
  const [kode2840404JumlahPph, setKode2840404JumlahPph] = useState("0");
  const [kode2840405JumlahDasar, setKode2840405JumlahDasar] = useState("0");
  const [kode2840405JumlahPph, setKode2840405JumlahPph] = useState("0");
  const [kode2840406JumlahDasar, setKode2840406JumlahDasar] = useState("0");
  const [kode2840406JumlahPph, setKode2840406JumlahPph] = useState("0");
  const [kode2840407JumlahDasar, setKode2840407JumlahDasar] = useState("0");
  const [kode2840407JumlahPph, setKode2840407JumlahPph] = useState("0");
  const [kode2840408JumlahDasar, setKode2840408JumlahDasar] = useState("0");
  const [kode2840408JumlahPph, setKode2840408JumlahPph] = useState("0");
  const [kode2840409JumlahDasar, setKode2840409JumlahDasar] = useState("0");
  const [kode2840409JumlahPph, setKode2840409JumlahPph] = useState("0");
  const [kode2840410JumlahDasar, setKode2840410JumlahDasar] = useState("0");
  const [kode2840410JumlahPph, setKode2840410JumlahPph] = useState("0");
  const [kode2840411JumlahDasar, setKode2840411JumlahDasar] = useState("0");
  const [kode2840411JumlahPph, setKode2840411JumlahPph] = useState("0");
  const [kode2840601JumlahDasar, setKode2840601JumlahDasar] = useState("0");
  const [kode2840601JumlahPph, setKode2840601JumlahPph] = useState("0");
  const [kode2840701JumlahDasar, setKode2840701JumlahDasar] = useState("0");
  const [kode2840701JumlahPph, setKode2840701JumlahPph] = useState("0");
  const [kode2840801JumlahDasar, setKode2840801JumlahDasar] = useState("0");
  const [kode2840801JumlahPph, setKode2840801JumlahPph] = useState("0");
  const [kode2840503JumlahDasar, setKode2840503JumlahDasar] = useState("0");
  const [kode2840503JumlahPph, setKode2840503JumlahPph] = useState("0");
  const [kode2840412JumlahDasar, setKode2840412JumlahDasar] = useState("0");
  const [kode2840412JumlahPph, setKode2840412JumlahPph] = useState("0");
  const [kode2840413JumlahDasar, setKode2840413JumlahDasar] = useState("0");
  const [kode2840413JumlahPph, setKode2840413JumlahPph] = useState("0");
  const [kode2840414JumlahDasar, setKode2840414JumlahDasar] = useState("0");
  const [kode2840414JumlahPph, setKode2840414JumlahPph] = useState("0");
  const [kode2840415JumlahDasar, setKode2840415JumlahDasar] = useState("0");
  const [kode2840415JumlahPph, setKode2840415JumlahPph] = useState("0");
  const [kode2840416JumlahDasar, setKode2840416JumlahDasar] = useState("0");
  const [kode2840416JumlahPph, setKode2840416JumlahPph] = useState("0");
  const [kode2840417JumlahDasar, setKode2840417JumlahDasar] = useState("0");
  const [kode2840417JumlahPph, setKode2840417JumlahPph] = useState("0");
  const [kode2840418JumlahDasar, setKode2840418JumlahDasar] = useState("0");
  const [kode2840418JumlahPph, setKode2840418JumlahPph] = useState("0");

  // 03.) Accordion 3
  const [
    eBupotUnifikasiBuktiSetorPagination,
    setEBupotUnifikasiBuktiSetorPagination,
  ] = useState([]);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  // 04.) Accordion 4
  const [bertindakSebagai, setBertindakSebagai] = useState("");
  const [namaIdentitas, setNamaIdentitas] = useState("");
  const [openSaved, setOpenSaved] = useState(false);

  const [validated, setValidated] = useState(false);
  const [detilSearchIdentitasWp, setDetilSearchIdentitasWp] = useState("");
  const [
    openConfirmationSearchIdentitasWp,
    setOpenConfirmationSearchIdentitasWp,
  ] = useState(false);
  const [openSearchIdentitasWp, setOpenSearchIdentitasWp] = useState(false);
  const [openFoundIdentitasWp, setOpenFoundIdentitasWp] = useState(false);
  const [eBupotUnifikasiPostings, setEBupotUnifikasiPostings] = useState([]);
  const [penandatangans, setPenandatangans] = useState([]);

  const [inputValues, setInputValues] = useState([]);
  // Function to handle value change
  const handleValueChange = (id, field, formattedValue) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [field]: formattedValue.split(".").join("").replace(/,/g, ""),
      },
    }));
  };

  const handleClickOpenSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSaved(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

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

  useEffect(() => {
    getEBupotUnifikasiPostingDopp();
    getEbupotUnifikasiUbahPenyiapanSptById();
  }, []);

  const getEBupotUnifikasiPostingDopp = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/getEBupotUnifikasiPostingDopp`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    setEBupotUnifikasiPostings(response.data);
    setInputValues(
      response.data.reduce((acc, item) => {
        acc[item.id] = {
          // ...item,
          jumlahDpp: item.jumlahDpp,
          jumlahPph: item.jumlahPph,
        };
        return acc;
      }, {})
    );

    setOpenSearchIdentitasWp(false);
  };

  const getEbupotUnifikasiUbahPenyiapanSptById = async () => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiPenyiapanSpts/${id}`,
      {
        _id: user.id,
        token: user.token,
      }
    );
    // 01.) Accordion 1
    setTahunPajak(response.data.tahunPajak);
    setMasaPajak(response.data.masaPajak);
    setPembetulanKe(response.data.pembetulanKe);

    getEBupotUnifikasiBuktiSetorData(
      response.data.tahunPajak,
      response.data.masaPajak
    );

    // DOSS
    setPenghasilanDariIndonesiaJumlahDasar(
      response.data.penghasilanDariIndonesiaJumlahDasar
    );
    setPenghasilanDariIndonesiaJumlahPph(
      response.data.penghasilanDariIndonesiaJumlahPph
    );
    setPenghasilanDariLuarIndonesiaJumlahDasar(
      response.data.penghasilanDariLuarIndonesiaJumlahDasar
    );
    setPenghasilanDariLuarIndonesiaJumlahPph(
      response.data.penghasilanDariLuarIndonesiaJumlahPph
    );
    setPphPasal24YangDapatDiperhitungkanJumlahPph(
      response.data.pphPasal24YangDapatDiperhitungkanJumlahPph
    );
    setPphYangDipotongPihakLainJumlahPph(
      response.data.pphYangDipotongPihakLainJumlahPph
    );
    setPphYangDisetorSendiriJumlahPph(
      response.data.pphYangDisetorSendiriJumlahPph
    );

    // DOPP
    setKode2210101JumlahDasar(response.data.kode2210101JumlahDasar);
    setKode2210101JumlahPph(response.data.kode2210101JumlahPph);
    setKode2240501JumlahDasar(response.data.kode2240501JumlahDasar);
    setKode2240501JumlahPph(response.data.kode2240501JumlahPph);
    setKode2240502JumlahDasar(response.data.kode2240502JumlahDasar);
    setKode2240502JumlahPph(response.data.kode2240502JumlahPph);
    setKode2710007JumlahDasar(response.data.kode2710007JumlahDasar);
    setKode2710007JumlahPph(response.data.kode2710007JumlahPph);
    setKode2710203JumlahDasar(response.data.kode2710203JumlahDasar);
    setKode2710203JumlahPph(response.data.kode2710203JumlahPph);
    setKode2840101JumlahDasar(response.data.kode2840101JumlahDasar);
    setKode2840101JumlahPph(response.data.kode2840101JumlahPph);
    setKode2840104JumlahDasar(response.data.kode2840104JumlahDasar);
    setKode2840104JumlahPph(response.data.kode2840104JumlahPph);
    setKode2840105JumlahDasar(response.data.kode2840105JumlahDasar);
    setKode2840105JumlahPph(response.data.kode2840105JumlahPph);
    setKode2840106JumlahDasar(response.data.kode2840106JumlahDasar);
    setKode2840106JumlahPph(response.data.kode2840106JumlahPph);
    setKode2840401JumlahDasar(response.data.kode2840401JumlahDasar);
    setKode2840401JumlahPph(response.data.kode2840401JumlahPph);
    setKode2840402JumlahDasar(response.data.kode2840402JumlahDasar);
    setKode2840402JumlahPph(response.data.kode2840402JumlahPph);
    setKode2840403JumlahDasar(response.data.kode2840403JumlahDasar);
    setKode2840403JumlahPph(response.data.kode2840403JumlahPph);
    setKode2840404JumlahDasar(response.data.kode2840404JumlahDasar);
    setKode2840404JumlahPph(response.data.kode2840404JumlahPph);
    setKode2840405JumlahDasar(response.data.kode2840405JumlahDasar);
    setKode2840405JumlahPph(response.data.kode2840405JumlahPph);
    setKode2840406JumlahDasar(response.data.kode2840406JumlahDasar);
    setKode2840406JumlahPph(response.data.kode2840406JumlahPph);
    setKode2840407JumlahDasar(response.data.kode2840407JumlahDasar);
    setKode2840407JumlahPph(response.data.kode2840407JumlahPph);
    setKode2840408JumlahDasar(response.data.kode2840408JumlahDasar);
    setKode2840408JumlahPph(response.data.kode2840408JumlahPph);
    setKode2840409JumlahDasar(response.data.kode2840409JumlahDasar);
    setKode2840409JumlahPph(response.data.kode2840409JumlahPph);
    setKode2840410JumlahDasar(response.data.kode2840410JumlahDasar);
    setKode2840410JumlahPph(response.data.kode2840410JumlahPph);
    setKode2840411JumlahDasar(response.data.kode2840411JumlahDasar);
    setKode2840411JumlahPph(response.data.kode2840411JumlahPph);
    setKode2840601JumlahDasar(response.data.kode2840601JumlahDasar);
    setKode2840601JumlahPph(response.data.kode2840601JumlahPph);
    setKode2840701JumlahDasar(response.data.kode2840701JumlahDasar);
    setKode2840701JumlahPph(response.data.kode2840701JumlahPph);
    setKode2840801JumlahDasar(response.data.kode2840801JumlahDasar);
    setKode2840801JumlahPph(response.data.kode2840801JumlahPph);
    setKode2840503JumlahDasar(response.data.kode2840503JumlahDasar);
    setKode2840503JumlahPph(response.data.kode2840503JumlahPph);
    setKode2840412JumlahDasar(response.data.kode2840412JumlahDasar);
    setKode2840412JumlahPph(response.data.kode2840412JumlahPph);
    setKode2840413JumlahDasar(response.data.kode2840413JumlahDasar);
    setKode2840413JumlahPph(response.data.kode2840413JumlahPph);
    setKode2840414JumlahDasar(response.data.kode2840414JumlahDasar);
    setKode2840414JumlahPph(response.data.kode2840414JumlahPph);
    setKode2840415JumlahDasar(response.data.kode2840415JumlahDasar);
    setKode2840415JumlahPph(response.data.kode2840415JumlahPph);
    setKode2840416JumlahDasar(response.data.kode2840416JumlahDasar);
    setKode2840416JumlahPph(response.data.kode2840416JumlahPph);
    setKode2840417JumlahDasar(response.data.kode2840417JumlahDasar);
    setKode2840417JumlahPph(response.data.kode2840417JumlahPph);
    setKode2840418JumlahDasar(response.data.kode2840418JumlahDasar);
    setKode2840418JumlahPph(response.data.kode2840418JumlahPph);

    // 04.) Accordion 4
    setBertindakSebagai(response.data.penandatangan.bertindakSebagai);
    setNamaIdentitas(response.data.penandatangan.namaIdentitas);

    setOpenSearchIdentitasWp(false);
  };

  const getEBupotUnifikasiBuktiSetorData = async (tahunPajak, masaPajak) => {
    setOpenSearchIdentitasWp(true);
    const response = await axios.post(
      `${tempUrl}/eBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination`,
      {
        userEBupotUnifikasiBuktiSetorId: user.id,
        tahunPajak,
        masaPajak,
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setEBupotUnifikasiBuktiSetorPagination(
      response.data.eBupotUnifikasiBuktiSetors
    );
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);

    setTimeout(async () => {
      setOpenSearchIdentitasWp(false);
    }, 500);
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

  const handleCloseConfirmationFoundSuratSetoranPajak = () => {
    setOpenFoundIdentitasWp(false);
  };

  const updateEbupotUnifikasiUbahPenyiapanSpt = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const handlingInput =
      bertindakSebagai.length !== 0 && namaIdentitas.length !== 0;

    if (handlingInput) {
      try {
        let updatedEBupotUnifikasiPenyiapanSpt = await axios.post(
          `${tempUrl}/updateEBupotUnifikasiPenyiapanSpt/${id}`,
          {
            userId: user.id,

            namaIdentitas,

            // DOSS
            penghasilanDariIndonesiaJumlahDasar,
            penghasilanDariIndonesiaJumlahPph,
            penghasilanDariLuarIndonesiaJumlahDasar,
            penghasilanDariLuarIndonesiaJumlahPph,
            pphPasal24YangDapatDiperhitungkanJumlahPph,
            pphYangDipotongPihakLainJumlahPph,
            pphYangDisetorSendiriJumlahPph,

            // DOPP
            kode2210101JumlahDasar,
            kode2210101JumlahPph,
            kode2240501JumlahDasar,
            kode2240501JumlahPph,
            kode2240502JumlahDasar,
            kode2240502JumlahPph,
            kode2710007JumlahDasar,
            kode2710007JumlahPph,
            kode2710203JumlahDasar,
            kode2710203JumlahPph,
            kode2840101JumlahDasar,
            kode2840101JumlahPph,
            kode2840104JumlahDasar,
            kode2840104JumlahPph,
            kode2840105JumlahDasar,
            kode2840105JumlahPph,
            kode2840106JumlahDasar,
            kode2840106JumlahPph,
            kode2840401JumlahDasar,
            kode2840401JumlahPph,
            kode2840402JumlahDasar,
            kode2840402JumlahPph,
            kode2840403JumlahDasar,
            kode2840403JumlahPph,
            kode2840404JumlahDasar,
            kode2840404JumlahPph,
            kode2840405JumlahDasar,
            kode2840405JumlahPph,
            kode2840406JumlahDasar,
            kode2840406JumlahPph,
            kode2840407JumlahDasar,
            kode2840407JumlahPph,
            kode2840408JumlahDasar,
            kode2840408JumlahPph,
            kode2840409JumlahDasar,
            kode2840409JumlahPph,
            kode2840410JumlahDasar,
            kode2840410JumlahPph,
            kode2840411JumlahDasar,
            kode2840411JumlahPph,
            kode2840601JumlahDasar,
            kode2840601JumlahPph,
            kode2840701JumlahDasar,
            kode2840701JumlahPph,
            kode2840801JumlahDasar,
            kode2840801JumlahPph,
            kode2840503JumlahDasar,
            kode2840503JumlahPph,
            kode2840412JumlahDasar,
            kode2840412JumlahPph,
            kode2840413JumlahDasar,
            kode2840413JumlahPph,
            kode2840414JumlahDasar,
            kode2840414JumlahPph,
            kode2840415JumlahDasar,
            kode2840415JumlahPph,
            kode2840416JumlahDasar,
            kode2840416JumlahPph,
            kode2840417JumlahDasar,
            kode2840417JumlahPph,
            kode2840418JumlahDasar,
            kode2840418JumlahPph,

            eBupotUnifikasiPosting: inputValues,

            userIdInput: user.id,
            kodeCabang: user.cabang.id,
            _id: user.id,
            token: user.token,
          }
        );
        // console.log(Object.keys(inputValues).length);
        // console.log(inputValues);

        setOpenSearchIdentitasWp(true);
        setTimeout(async () => {
          setOpenSearchIdentitasWp(false);
          navigate("/ebupotUnifikasi/sptMasa/penyiapanSpt");
        }, 1000);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    setValidated(true);
  };

  const savedEbupotUnifikasiUbahPenyiapanSpt = async (e) => {
    setOpenSaved(false);

    setValidated(false);
    setAccordionState("1");

    // 01.) Accordion 1
    setTahunPajak("");
    setMasaPajak("");

    // 04.) Accordion 4
    setBertindakSebagai("");
    setNamaIdentitas("");
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

  return (
    <div>
      <Menu />
      <HeaderMainEbupotUnifikasi username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupotUnifikasi
        activeLink={"/ebupotUnifikasi/sptMasa/rekamBuktiSetor"}
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
          <MenuEbupotUnifikasiSptMasa />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <EditIcon style={{ marginRight: "10px" }} />
              Lengkapi SPT
            </Card.Header>
            <Card.Body>
              <div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-2"
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
                      className="mb-2"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Tahun/Masa Pajak
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={`${tahunPajak}/${masaPajak}`}
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
                      className="mb-2"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        NPWP
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          value={`${npwp} / ${nikNpwp16}`}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputInput2}>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        Pembetulan
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={pembetulanKe} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <div style={inputWrapper}>
                  <div style={inputInput1}>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="4">
                        NITKU
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control value={nitku} disabled />
                      </Col>
                    </Form.Group>
                  </div>
                  <div style={inputInput2}></div>
                </div>
                <Accordion defaultExpanded={accordionState === "1" && true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={accordionBlue}
                  >
                    Perekaman Lampiran DOSS
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ color: "#646c9a" }}>
                      <div>
                        <p>
                          Imbalan yang Diterima/Diperoleh Sehubungan dengan
                          Pengangkutan Orang dan/atau Barang Termasuk Penyewaan
                          Kapal Laut oleh Perusahaan Pelayaran Dalam Negeri
                        </p>
                      </div>
                      <div>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="5"
                            style={{ visibility: "hidden" }}
                          >
                            Tahun/Masa Pajak
                          </Form.Label>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah Dasar Pengenaan Pajak (Rp)
                            </p>
                          </Col>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah PPh (Rp)
                            </p>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            a. Penghasilan dari Indonesia
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={penghasilanDariIndonesiaJumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                penghasilanDariIndonesiaJumlahDasar.length === 0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  penghasilanDariIndonesiaJumlahDasar.length ===
                                  0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setPenghasilanDariIndonesiaJumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={penghasilanDariIndonesiaJumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                penghasilanDariIndonesiaJumlahPph.length === 0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  penghasilanDariIndonesiaJumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                let tempNumber = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setPenghasilanDariIndonesiaJumlahPph(
                                  tempNumber
                                );

                                let tempPphYangDisetorSendiriJumlahPph =
                                  parseInt(tempNumber) +
                                  parseInt(
                                    penghasilanDariLuarIndonesiaJumlahPph
                                  ) +
                                  parseInt(
                                    pphPasal24YangDapatDiperhitungkanJumlahPph
                                  ) -
                                  parseInt(pphYangDipotongPihakLainJumlahPph);
                                setPphYangDisetorSendiriJumlahPph(
                                  tempPphYangDisetorSendiriJumlahPph
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            b. Penghasilan dari Luar Indonesia
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={penghasilanDariLuarIndonesiaJumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                penghasilanDariLuarIndonesiaJumlahDasar.length ===
                                0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  penghasilanDariLuarIndonesiaJumlahDasar.length ===
                                  0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setPenghasilanDariLuarIndonesiaJumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={penghasilanDariLuarIndonesiaJumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                penghasilanDariLuarIndonesiaJumlahPph.length ===
                                0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  penghasilanDariLuarIndonesiaJumlahPph.length ===
                                  0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                let tempNumber = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setPenghasilanDariLuarIndonesiaJumlahPph(
                                  tempNumber
                                );

                                let tempPphYangDisetorSendiriJumlahPph =
                                  parseInt(penghasilanDariIndonesiaJumlahPph) +
                                  parseInt(tempNumber) +
                                  parseInt(
                                    pphPasal24YangDapatDiperhitungkanJumlahPph
                                  ) -
                                  parseInt(pphYangDipotongPihakLainJumlahPph);
                                setPphYangDisetorSendiriJumlahPph(
                                  tempPphYangDisetorSendiriJumlahPph
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            c. PPh Pasal 24 yang dapat diperhitungkan
                          </Form.Label>
                          <Col sm="3"></Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={pphPasal24YangDapatDiperhitungkanJumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                pphPasal24YangDapatDiperhitungkanJumlahPph.length ===
                                0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  pphPasal24YangDapatDiperhitungkanJumlahPph.length ===
                                  0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                let tempNumber = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setPphPasal24YangDapatDiperhitungkanJumlahPph(
                                  tempNumber
                                );

                                let tempPphYangDisetorSendiriJumlahPph =
                                  parseInt(penghasilanDariIndonesiaJumlahPph) +
                                  parseInt(
                                    penghasilanDariLuarIndonesiaJumlahPph
                                  ) +
                                  parseInt(tempNumber) -
                                  parseInt(pphYangDipotongPihakLainJumlahPph);
                                setPphYangDisetorSendiriJumlahPph(
                                  tempPphYangDisetorSendiriJumlahPph
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            d. PPh yang dipotong pihak lain
                          </Form.Label>
                          <Col sm="3"></Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={pphYangDipotongPihakLainJumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                pphYangDipotongPihakLainJumlahPph.length === 0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  pphYangDipotongPihakLainJumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                let tempNumber = values.formattedValue
                                  .split(".")
                                  .join("")
                                  .replace(/,/g, "");

                                setPphYangDipotongPihakLainJumlahPph(
                                  tempNumber
                                );

                                let tempPphYangDisetorSendiriJumlahPph =
                                  parseInt(penghasilanDariIndonesiaJumlahPph) +
                                  parseInt(
                                    penghasilanDariLuarIndonesiaJumlahPph
                                  ) +
                                  parseInt(
                                    pphPasal24YangDapatDiperhitungkanJumlahPph
                                  ) -
                                  parseInt(tempNumber);
                                setPphYangDisetorSendiriJumlahPph(
                                  tempPphYangDisetorSendiriJumlahPph
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            e. PPh yang disetor sendiri
                          </Form.Label>
                          <Col sm="3"></Col>
                          <Col sm="3">
                            <NumericFormat
                              disabled
                              value={pphYangDisetorSendiriJumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={
                                pphYangDisetorSendiriJumlahPph.length === 0
                              }
                              style={{
                                textAlign: "right",
                                borderColor:
                                  pphYangDisetorSendiriJumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={accordionYellow}
                  >
                    Perekaman Lampiran DOPP
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ color: "#646c9a", marginTop: "20px" }}>
                      <div>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="5"
                            style={{ visibility: "hidden" }}
                          >
                            Tahun/Masa Pajak
                          </Form.Label>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah Dasar Pengenaan Pajak (Rp)
                            </p>
                          </Col>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah PPh (Rp)
                            </p>
                          </Col>
                        </Form.Group>
                        {eBupotUnifikasiPostings.map((item) => (
                          <Form.Group
                            as={Row}
                            className="mb-2"
                            key={item.id}
                            controlId={`form${item.id}`}
                          >
                            <Form.Label column sm="5">
                              {item.objekpajak.kodeObjekPajak} -{" "}
                              {item.objekpajak.namaObjekPajak}
                            </Form.Label>
                            <Col sm="3">
                              <NumericFormat
                                required
                                value={inputValues[item.id].jumlahDpp}
                                decimalSeparator=","
                                thousandSeparator="."
                                customInput={Form.Control}
                                isInvalid={
                                  inputValues[item.id].jumlahDpp.length === 0
                                }
                                style={{
                                  textAlign: "right",
                                  borderColor:
                                    inputValues[item.id].jumlahDpp.length === 0
                                      ? "red"
                                      : "",
                                }}
                                onValueChange={(values) =>
                                  handleValueChange(
                                    item.id,
                                    "jumlahDpp",
                                    values.formattedValue
                                  )
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            </Col>
                            <Col sm="3">
                              <NumericFormat
                                required
                                value={inputValues[item.id].jumlahPph}
                                decimalSeparator=","
                                thousandSeparator="."
                                customInput={Form.Control}
                                isInvalid={
                                  inputValues[item.id].jumlahPph.length === 0
                                }
                                style={{
                                  textAlign: "right",
                                  borderColor:
                                    inputValues[item.id].jumlahPph.length === 0
                                      ? "red"
                                      : "",
                                }}
                                onValueChange={(values) =>
                                  handleValueChange(
                                    item.id,
                                    "jumlahPph",
                                    values.formattedValue
                                  )
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Kolom ini diperlukan.
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        ))}
                      </div>
                      {/* <div>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label
                            column
                            sm="5"
                            style={{ visibility: "hidden" }}
                          >
                            Tahun/Masa Pajak
                          </Form.Label>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah Dasar Pengenaan Pajak (Rp)
                            </p>
                          </Col>
                          <Col sm="3">
                            <p style={{ textAlign: "center" }}>
                              Jumlah PPh (Rp)
                            </p>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            22-101-01 - Penghasilan Sehubungan dengan Transaksi
                            Penjualan Barang, Penyerahan Jasa, dan/atau
                            Persewaan serta Penghasilan Lain Sehubungan dengan
                            Penggunaan Harta yang Dilakukan Melalui Pihak Lain
                            dalam Sistem Informasi Pengadaan
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2210101JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2210101JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2210101JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2210101JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2210101JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2210101JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2210101JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2210101JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            22-405-01 - Penghasilan Sehubungan dengan Aset
                            Kripto yang dipungut oleh Penyelenggara Perdagangan
                            Melalui Sistem Elektronik yang Merupakan Pedagang
                            Fisik Aset Kripto
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2240501JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2240501JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2240501JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2240501JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2240501JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2240501JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2240501JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2240501JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            22-405-02 - Penghasilan Sehubungan dengan Aset
                            Kripto yang dipungut oleh Penyelenggara Perdagangan
                            Melalui Sistem Elektronik yang Bukan Merupakan
                            Pedagang Fisik Aset Kripto
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2240502JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2240502JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2240502JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2240502JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2240502JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2240502JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2240502JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2240502JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            27-100-07 - Penghasilan dari Penjualan/Pengalihan
                            Saham (PPh Pasal 26)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2710007JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2710007JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2710007JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2710007JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2710007JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2710007JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2710007JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2710007JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            27-102-03 - Bunga Obligasi (PPh Pasal 26)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2710203JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2710203JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2710203JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2710203JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2710203JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2710203JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2710203JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2710203JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-401-01 - Bunga Obligasi, Surat Utang Negara, atau
                            Obligasi Daerah yang Diterima Wajib Pajak Dalam
                            Negeri dan Bentuk Usaha Tetap.
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840101JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840101JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840101JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840101JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840101JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840101JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840101JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840101JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-401-04 - Diskonto Surat Perbendaharaan Negara
                            yang diterima Wajib Pajak Dalam Negeri dan Bentuk
                            Usaha Tetap
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840104JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840104JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840104JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840104JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840104JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840104JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840104JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840104JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-401-05 - Diskonto Surat Perbendaharaan Negara
                            yang Diterima Wajib Pajak Penduduk/Berkedudukan di
                            Luar Negeri
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840105JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840105JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840105JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840105JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840105JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840105JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840105JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840105JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-401-06 - Bunga Obligasi yang Diterima Wajib Pajak
                            Dalam Negeri dan Bentuk Usaha Tetap
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840106JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840106JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840106JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840106JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840106JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840106JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840106JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840106JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-01 - Bunga Tabungan dan Bunga Diskonto yang
                            Ditempatkan di Dalam Negeri yang Dananya Bersumber
                            Selain dari Devisa Hasil Ekspor (DHE)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840401JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840401JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840401JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840401JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840401JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840401JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840401JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840401JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-02 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang IDR bersumber dari DHE tenor 1
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840402JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840402JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840402JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840402JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840402JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840402JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840402JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840402JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-03 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang IDR bersumber dari DHE tenor 3
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840403JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840403JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840403JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840403JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840403JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840403JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840403JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840403JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-04 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang IDR bersumber dari DHE tenor 6
                            bulan atau lebih)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840404JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840404JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840404JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840404JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840404JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840404JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840404JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840404JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-05 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang USD bersumber dari DHE tenor 1
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840405JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840405JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840405JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840405JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840405JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840405JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840405JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840405JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-06 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang USD bersumber dari DHE tenor 3
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840406JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840406JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840406JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840406JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840406JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840406JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840406JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840406JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-07 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang USD bersumber dari DHE tenor 6
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840407JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840407JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840407JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840407JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840407JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840407JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840407JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840407JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-08 - Bunga Deposito yang Ditempatkan di Dalam
                            Negeri (mata uang USD bersumber dari DHE tenor lebih
                            6 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840408JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840408JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840408JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840408JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840408JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840408JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840408JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840408JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-09 - Bunga Deposito/Tabungan yang Ditempatkan
                            di Luar Negeri Melalui Bank yang Didirikan atau
                            Bertempat Kedudukan di Indonesia atau Cabang Bank
                            Luar Negeri di Indonesia
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840409JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840409JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840409JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840409JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840409JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840409JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840409JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840409JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-10 - Diskonto Sertifikat Bank Indonesia
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840410JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840410JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840410JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840410JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840410JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840410JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840410JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840410JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-11 - Jasa Giro
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840411JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840411JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840411JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840411JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840411JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840411JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840411JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840411JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-406-01 - Transaksi Penjualan Saham di Bursa Efek
                            (Bukan Saham Pendiri)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840601JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840601JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840601JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840601JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840601JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840601JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840601JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840601JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-407-01 - Transaksi Penjualan Saham di Bursa Efek
                            (Saham Pendiri)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840701JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840701JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840701JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840701JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840701JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840701JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840701JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840701JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-408-01 - Transaksi Penjualan Saham Milik
                            Perusahaan Modal Ventura Tidak di Bursa Efek
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840801JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840801JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840801JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840801JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840801JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840801JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840801JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840801JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-405-03 - Hadiah undian langsung yang melekat pada
                            barang/produk dan tidak dapat diketahui identitas
                            penerimanya
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840503JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840503JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840503JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840503JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840503JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840503JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840503JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840503JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-12 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang VALAS bersumber dari DHE SDA tenor lebih
                            dari 6 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840412JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840412JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840412JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840412JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840412JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840412JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840412JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840412JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-13 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang VALAS bersumber dari DHE SDA tenor 6
                            bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840413JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840413JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840413JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840413JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840413JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840413JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840413JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840413JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-14 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang VALAS bersumber dari DHE SDA tenor lebih
                            dari 3 bulan sampai dengan kurang dari 6 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840414JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840414JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840414JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840414JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840414JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840414JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840414JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840414JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-15 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang VALAS bersumber dari DHE SDA tenor 1
                            bulan sampai dengan kurang dari 3 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840415JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840415JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840415JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840415JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840415JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840415JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840415JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840415JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                          <Form.Label column sm="5">
                            28-404-16 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang IDR bersumber dari DHE SDA tenor 6 bulan
                            atau lebih dari 6 bulan
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840416JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840416JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840416JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840416JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840416JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840416JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840416JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840416JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-17 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang IDR bersumber dari DHE SDA tenor 3 bulan
                            sampai dengan kurang dari 6 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840417JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840417JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840417JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840417JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840417JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840417JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840417JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840417JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="5">
                            28-404-18 - Penghasilan dari instrumen moneter
                            dan/atau instrumen keuangan tertentu di Indonesia
                            (mata uang IDR bersumber dari DHE SDA tenor 1 bulan
                            sampai dengan kurang dari 3 bulan)
                          </Form.Label>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840418JumlahDasar}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840418JumlahDasar.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840418JumlahDasar.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840418JumlahDasar(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                          <Col sm="3">
                            <NumericFormat
                              required
                              value={kode2840418JumlahPph}
                              decimalSeparator={","}
                              thousandSeparator={"."}
                              customInput={Form.Control}
                              isInvalid={kode2840418JumlahPph.length === 0}
                              style={{
                                textAlign: "right",
                                borderColor:
                                  kode2840418JumlahPph.length === 0
                                    ? "red"
                                    : "",
                              }}
                              onValueChange={(values) => {
                                setKode2840418JumlahPph(
                                  values.formattedValue
                                    .split(".")
                                    .join("")
                                    .replace(/,/g, "")
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Kolom ini diperlukan.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </div> */}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    style={accordionBlue}
                  >
                    Dokumen Dasar Pemotongan
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card style={{ marginTop: "20px" }}>
                      <Card.Header style={inputTitle}>
                        <FormatListBulletedIcon
                          style={{ marginRight: "10px" }}
                        />
                        Daftar Bukti Setor
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
                              setLimit(e.target.value);
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
                          <ShowTableEbupotUnifikasiBuktiSetorPenyiapanSpt
                            currentPosts={eBupotUnifikasiBuktiSetorPagination}
                          />
                        </Box>
                        <Box sx={tableContainer}>
                          <Pagination
                            shape="rounded"
                            color="primary"
                            count={pages}
                            page={page + 1}
                            onChange={handleChange}
                            size={screenSize <= 600 ? "small" : "large"}
                          />
                        </Box>
                      </Card.Body>
                    </Card>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                    style={accordionYellow}
                  >
                    Penandatangan
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={updateEbupotUnifikasiUbahPenyiapanSpt}
                      >
                        <div style={inputWrapper}>
                          <div style={inputInput1}>
                            <Form.Group
                              as={Row}
                              className="mb-2"
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
                              className="mb-2"
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
                              navigate("/ebupotUnifikasi/sptMasa/penyiapanSpt");
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
                navigate("/ebupotUnifikasi/daftarPenyiapanSpt");
              }}
            >
              Tidak
            </Button>
            <button
              className="hover-button-no-icon"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
              onClick={savedEbupotUnifikasiUbahPenyiapanSpt}
            >
              Ya
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default EbupotUnifikasiUbahPenyiapanSpt;

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
