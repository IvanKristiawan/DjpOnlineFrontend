import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.scss";
import "./styles.css";
import { Sidebar, Footer, ScrollToTop, Menu } from "./components";
import { AuthContext } from "./contexts/AuthContext";
import { useStateContext } from "./contexts/ContextProvider";
import {
  Login,
  Registrasi,
  LupaPassword,
  Informasi,
  Profil,
  Cabang,
  Password,
  HakAkses,
  Bayar,
  EBilling,
  Lapor,
  Pralapor,
  Ebupot2126,
  Ebupot2126DaftarPPh21,
  Ebupot2126InputPph21,
  Ebupot2126UbahPph21,
  Ebupot2126InputPph21Tahunan,
  Ebupot2126UbahPph21Tahunan,
  Ebupot2126DaftarPPh26,
  Ebupot2126InputPph26,
  Ebupot2126UbahPph26,
  Ebupot2126ImporData,
  Ebupot2126DownloadBupot,
  Ebupot2126Posting,
  Ebupot2126PerekamanSptMasa,
  Ebupot2126DaftarPenyiapanSpt,
  Ebupot2126UbahPenyiapanSpt,
  TampilEbupot2126Penandatangan,
  TampilEbupot2126Perekam,
  TampilEbupot2126BuatAuthKey,
  EbupotUnifikasi,
  EbupotUnifikasiDaftarPphDisetorSendiri,
  EbupotUnifikasiInputPphDisetorSendiri,
  EbupotUnifikasiUbahPphDisetorSendiri,
  EbupotUnifikasiDaftarPph42152223,
  EbupotUnifikasiInputPph42152223,
  EbupotUnifikasiUbahPph42152223,
  EbupotUnifikasiDaftarPphNonResiden,
  EbupotUnifikasiInputPphNonResiden,
  EbupotUnifikasiUbahPphNonResiden,
  EbupotUnifikasiImporData,
  EbupotUnifikasiPosting,
  EbupotUnifikasiPerekamanSptMasa,
  EbupotUnifikasiDaftarPenyiapanSpt,
  EbupotUnifikasiUbahPenyiapanSpt,
  EbupotUnifikasiPenyiapanSptKirimSpt,
  TampilPenandatangan,
  TampilBuatAuthKey,
} from "./pages/index";

import { FaBars } from "react-icons/fa";

const App = () => {
  const { screenSize, setScreenSize } = useStateContext();
  // const { collapseSidebar } = useProSidebar();
  const { user } = useContext(AuthContext);
  // const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const USERRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  // const NERACAOJKRoute = ({ children }) => {
  //   const { user } = useContext(AuthContext);

  //   if (user.akses.neracaOjk) {
  //     return children;
  //   }

  //   return <Navigate to="/unauthorized" />;
  // };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <main>
        <ScrollToTop />
        {/* <Menu /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/lupaPassword" element={<LupaPassword />} />
          {/* Informasi */}
          <Route
            path="/informasi"
            element={
              <USERRoute>
                <Informasi />
              </USERRoute>
            }
          />
          {/* Profil */}
          <Route
            path="/profil"
            element={
              <USERRoute>
                <Profil />
              </USERRoute>
            }
          />
          <Route
            path="/profil/cabang"
            element={
              <USERRoute>
                <Cabang />
              </USERRoute>
            }
          />
          <Route
            path="/profil/password"
            element={
              <USERRoute>
                <Password />
              </USERRoute>
            }
          />
          <Route
            path="/profil/hakAkses"
            element={
              <USERRoute>
                <HakAkses />
              </USERRoute>
            }
          />
          {/* Bayar */}
          <Route
            path="/bayar"
            element={
              <USERRoute>
                <Bayar />
              </USERRoute>
            }
          />
          {/* EBilling */}
          <Route
            path="/eBilling"
            element={
              <USERRoute>
                <EBilling />
              </USERRoute>
            }
          />
          {/* Lapor */}
          <Route
            path="/lapor"
            element={
              <USERRoute>
                <Lapor />
              </USERRoute>
            }
          />
          <Route
            path="/pralapor"
            element={
              <USERRoute>
                <Pralapor />
              </USERRoute>
            }
          />
          {/* Ebupot 2126 */}
          <Route
            path="/ebupot2126/dashboard"
            element={
              <USERRoute>
                <Ebupot2126 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal21"
            element={
              <USERRoute>
                <Ebupot2126DaftarPPh21 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal21/rekam21"
            element={
              <USERRoute>
                <Ebupot2126InputPph21 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal21/ubahRekam21/:id"
            element={
              <USERRoute>
                <Ebupot2126UbahPph21 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal21/rekam21Tahunan"
            element={
              <USERRoute>
                <Ebupot2126InputPph21Tahunan />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal21/ubahRekam21Tahunan/:id"
            element={
              <USERRoute>
                <Ebupot2126UbahPph21Tahunan />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal26"
            element={
              <USERRoute>
                <Ebupot2126DaftarPPh26 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal26/rekam26"
            element={
              <USERRoute>
                <Ebupot2126InputPph26 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/buktiPotongPasal26/ubahRekam26/:id"
            element={
              <USERRoute>
                <Ebupot2126UbahPph26 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/imporData"
            element={
              <USERRoute>
                <Ebupot2126ImporData />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/downloadBupot"
            element={
              <USERRoute>
                <Ebupot2126DownloadBupot />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/posting"
            element={
              <USERRoute>
                <Ebupot2126Posting />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/sptMasa/rekamBuktiSetor"
            element={
              <USERRoute>
                <Ebupot2126PerekamanSptMasa />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/sptMasa/penyiapanSpt"
            element={
              <USERRoute>
                <Ebupot2126DaftarPenyiapanSpt />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/sptMasa/penyiapanSpt/lengkapiSpt/:id"
            element={
              <USERRoute>
                <Ebupot2126UbahPenyiapanSpt />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/pengaturan/penandatangan"
            element={
              <USERRoute>
                <TampilEbupot2126Penandatangan />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/pengaturan/perekam"
            element={
              <USERRoute>
                <TampilEbupot2126Perekam />
              </USERRoute>
            }
          />
          <Route
            path="/ebupot2126/pengaturan/authKey"
            element={
              <USERRoute>
                <TampilEbupot2126BuatAuthKey />
              </USERRoute>
            }
          />
          {/* Ebupot Unifikasi */}
          <Route
            path="/ebupotUnifikasi/dashboard"
            element={
              <USERRoute>
                <EbupotUnifikasi />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/daftarDisetorSendiri"
            element={
              <USERRoute>
                <EbupotUnifikasiDaftarPphDisetorSendiri />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/inputDisetorSendiri"
            element={
              <USERRoute>
                <EbupotUnifikasiInputPphDisetorSendiri />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/ubahDisetorSendiri/:id"
            element={
              <USERRoute>
                <EbupotUnifikasiUbahPphDisetorSendiri />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/daftarPph42152223"
            element={
              <USERRoute>
                <EbupotUnifikasiDaftarPph42152223 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/inputPph42152223"
            element={
              <USERRoute>
                <EbupotUnifikasiInputPph42152223 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/ubahPph42152223/:id"
            element={
              <USERRoute>
                <EbupotUnifikasiUbahPph42152223 />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/daftarPphNonResiden"
            element={
              <USERRoute>
                <EbupotUnifikasiDaftarPphNonResiden />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/inputPphNonResiden"
            element={
              <USERRoute>
                <EbupotUnifikasiInputPphNonResiden />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/ubahPphNonResiden/:id"
            element={
              <USERRoute>
                <EbupotUnifikasiUbahPphNonResiden />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/imporData"
            element={
              <USERRoute>
                <EbupotUnifikasiImporData />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/posting"
            element={
              <USERRoute>
                <EbupotUnifikasiPosting />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/sptMasa/rekamBuktiSetor"
            element={
              <USERRoute>
                <EbupotUnifikasiPerekamanSptMasa />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/sptMasa/penyiapanSpt"
            element={
              <USERRoute>
                <EbupotUnifikasiDaftarPenyiapanSpt />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/sptMasa/penyiapanSpt/lengkapiSpt/:id"
            element={
              <USERRoute>
                <EbupotUnifikasiUbahPenyiapanSpt />
              </USERRoute>
            }
          />
          <Route
            path="/ebupotUnifikasi/sptMasa/penyiapanSpt/lengkapiSpt/:id/kirimSpt"
            element={
              <USERRoute>
                <EbupotUnifikasiPenyiapanSptKirimSpt />
              </USERRoute>
            }
          />
          {/* Pengaturan */}
          <Route
            path="/pengaturan/penandatangan"
            element={
              <USERRoute>
                <TampilPenandatangan />
              </USERRoute>
            }
          />
          <Route
            path="/pengaturan/authKey"
            element={
              <USERRoute>
                <TampilBuatAuthKey />
              </USERRoute>
            }
          />
          {/* Profil User */}
          {/* <Route
            path="/profilUser"
            element={
              <PROFILUSERRoute>
                <ProfilUser />
              </PROFILUSERRoute>
            }
          /> */}
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default App;
