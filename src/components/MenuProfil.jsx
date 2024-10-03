import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useStateContext } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import PushPinIcon from "@mui/icons-material/PushPin";

const MenuProfil = ({ menuActive }) => {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();

  const menuProfilContainer = {
    marginTop: screenSize <= 900 && "20px",
    marginBottom: "20px",
  };

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  return (
    <Card style={menuProfilContainer}>
      <Card.Header style={inputTitle}>
        <MenuIcon /> Menu Profil
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <div
          style={menuActive === "Data Profil" ? menuWrapperActive : menuWrapper}
        >
          <div>
            <PersonIcon style={menuIcon} />
          </div>
          <div
            className="menu-profil-text"
            style={menuTitle}
            onClick={() => {
              navigate("/profil");
            }}
          >
            Data Profil
          </div>
          <div style={menuArrow}>{">"}</div>
        </div>
        <div
          style={
            menuActive === "Daftar WP Cabang" ? menuWrapperActive : menuWrapper
          }
        >
          <div>
            <PeopleAltIcon style={menuIcon} />
          </div>
          <div
            className="menu-profil-text"
            style={menuTitle}
            onClick={() => {
              navigate("/profil/cabang");
            }}
          >
            Daftar WP Cabang
          </div>
          <div style={menuArrow}>{">"}</div>
        </div>
        <div
          style={
            menuActive === "Ubah Kata Sandi" ? menuWrapperActive : menuWrapper
          }
        >
          <div>
            <LockIcon style={menuIcon} />
          </div>
          <div
            className="menu-profil-text"
            style={menuTitle}
            onClick={() => {
              navigate("/profil/password");
            }}
          >
            Ubah Kata Sandi
          </div>
          <div style={menuArrow}>{">"}</div>
        </div>
        <div
          style={
            menuActive === "Aktivasi Fitur" ? menuWrapperActive : menuWrapper
          }
        >
          <div>
            <PushPinIcon style={menuIcon} />
          </div>
          <div
            className="menu-profil-text"
            style={menuTitle}
            onClick={() => {
              navigate("/profil/hakakses");
            }}
          >
            Aktivasi Fitur
          </div>
          <div style={menuArrow}>{">"}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenuProfil;

const menuWrapperActive = {
  backgroundColor: "#EBECF1",
  boxShadow: "inset 0 3px 10px 0 rgba(0, 0, 0, .19)",
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  paddingTop: "15px",
  paddingBottom: "15px",
  paddingLeft: "20px",
  paddingRight: "20px",
};

const menuWrapper = {
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  paddingTop: "15px",
  paddingBottom: "15px",
  paddingLeft: "20px",
  paddingRight: "20px",
};

const menuIcon = {
  color: "blue",
};

const menuTitle = {
  flex: 1,
  marginLeft: "10px",
};

const menuArrow = {
  color: Colors.grey700,
};
