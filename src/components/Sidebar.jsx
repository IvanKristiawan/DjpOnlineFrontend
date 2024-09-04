import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBook,
  FaPiggyBank,
  FaBookReader,
  FaUserCog,
  FaSignOutAlt,
  FaExchangeAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const Sidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const { user, setting, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutButtonHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                {setting.namaPerusahaan.split(" ", 1)} {setting.namaProgram}
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu title={"Master"} icon={<FaBook />}>
            {user.akses.wilayah === true && (
              <MenuItem>
                Wilayah <NavLink to="/wilayah" />
              </MenuItem>
            )}
            {user.akses.unit === true && (
              <MenuItem>
                Unit <NavLink to="/unit" />
              </MenuItem>
            )}
            {user.akses.anggotaKoperasi === true && (
              <MenuItem>
                Anggota <NavLink to="/anggotaKoperasi" />
              </MenuItem>
            )}
            {user.akses.anggotaKoperasiKeluar === true && (
              <MenuItem>
                Anggota Keluar <NavLink to="/anggotaKoperasiKeluar" />
              </MenuItem>
            )}
            {user.akses.kodeKartuTabungan === true && (
              <MenuItem>
                Kode Kartu Tab. <NavLink to="/kodeKartuTabungan" />
              </MenuItem>
            )}
          </SubMenu>
          <SubMenu title={"Mutasi Anggota"} icon={<FaExchangeAlt />}>
            {user.akses.mutasiUnit === true && (
              <MenuItem>
                Mutasi Unit <NavLink to="/mutasiUnit" />
              </MenuItem>
            )}
            <SubMenu title={"Keluar"} icon={<FaExchangeAlt />}>
              {user.akses.keluar === true && (
                <MenuItem>
                  Keluar <NavLink to="/keluar" />
                </MenuItem>
              )}
              {user.akses.mutasiUnit === true && (
                <MenuItem>
                  Pembayaran Keluar <NavLink to="/pembayaranKeluar" />
                </MenuItem>
              )}
            </SubMenu>
          </SubMenu>
          <SubMenu title={"Simpan"} icon={<FaPiggyBank />}>
            {user.akses.shuSimpananWajib === true && (
              <MenuItem>
                SHU Simpanan Wajib <NavLink to="/shuSimpananWajib" />
              </MenuItem>
            )}
            {user.akses.saldoDja === true && (
              <MenuItem>
                Saldo DJA <NavLink to="/saldoDja" />
              </MenuItem>
            )}
            {user.akses.simpananWajib === true && (
              <MenuItem>
                Simpanan Wajib <NavLink to="/daftarSimpananWajib" />
              </MenuItem>
            )}
          </SubMenu>
          <SubMenu title={"Tabungan"} icon={<FaMoneyCheckAlt />}>
            {user.akses.tabunganUmum === true && (
              <SubMenu title={"Tabungan Umum"} icon={<FaExchangeAlt />}>
                <MenuItem>
                  Pembukaan <NavLink to="/pembukaanTabunganUmum" />
                </MenuItem>
                <MenuItem>
                  Setoran <NavLink to="/setoranTabunganUmum" />
                </MenuItem>
                <MenuItem>
                  Tarik <NavLink to="/tarikTabunganUmum" />
                </MenuItem>
                <MenuItem>
                  Penutupan <NavLink to="/penutupanTabunganUmum" />
                </MenuItem>
                <MenuItem>
                  Kartu Tabungan <NavLink to="/kartuTabunganTabunganUmum" />
                </MenuItem>
              </SubMenu>
            )}
          </SubMenu>
          <SubMenu title={"Laporan"} icon={<FaBookReader />}>
            {user.akses.laporanSimpananWajib === true && (
              <MenuItem>
                Lap. Simpanan Wajib <NavLink to="/laporanSimpananWajib" />
              </MenuItem>
            )}
            {user.akses.rekapPerhitungan === true && (
              <MenuItem>
                Rekap Perhitungan <NavLink to="/rekapPerhitungan" />
              </MenuItem>
            )}
            {user.akses.laporanShuSimpananWajib === true && (
              <MenuItem>
                Lap. SHU Simwa <NavLink to="/laporanShuSimpananWajib" />
              </MenuItem>
            )}
          </SubMenu>
          <SubMenu title={"Utility"} icon={<FaUserCog />}>
            {user.akses.profilUser === true && (
              <MenuItem>
                Profil User <NavLink to="/profilUser" />
              </MenuItem>
            )}
            {user.akses.daftarUser === true && (
              <MenuItem>
                Daftar User <NavLink to="/daftarUser" />
              </MenuItem>
            )}
            {user.akses.setting === true && (
              <MenuItem>
                Setting <NavLink to="/setting" />
              </MenuItem>
            )}
          </SubMenu>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: "center" }}>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>{user.username}</p>
        <div className="sidebar-btn-wrapper" style={{ paddingBottom: "10px" }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: "pointer" }}
            to="/"
            onClick={logoutButtonHandler}
          >
            <span style={{ marginRight: "6px" }}>Logout</span>
            <FaSignOutAlt />
          </Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
