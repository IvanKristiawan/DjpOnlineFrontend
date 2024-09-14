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
