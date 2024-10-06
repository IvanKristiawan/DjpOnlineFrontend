import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import "../constants/defaultProgram.css";
import { Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IosShareIcon from "@mui/icons-material/IosShare";
import LockResetIcon from "@mui/icons-material/LockReset";

function MenuEbupotUnifikasi({ username }) {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const [openMenuPphYangDisetorSendiri, setOpenMenuPphYangDisetorSendiri] =
    useState(false);
  const [openMenuPph4, setOpenMenuPph4] = useState(false);
  const [openMenuPphNonResiden, setOpenMenuPphNonResiden] = useState(false);
  const navigate = useNavigate();

  const menuLaporanContainer = {
    display: screenSize >= 900 && "flex",
    width: "100%",
    marginBottom: "20px",
  };

  const menuLaporanWrapper = {
    display: "flex",
    justifyContent: screenSize >= 900 && "center",
    flexDirection: screenSize >= 900 && "column",
    alignItems: screenSize >= 900 && "center",
    padding: screenSize >= 900 ? "30px 10px" : "10px 10px",
    cursor: "pointer",
  };

  const menuStyle = {
    marginBottom: screenSize >= 900 && "-15px",
    marginTop: screenSize >= 900 && "-10px",
  };

  return (
    <div style={menuLaporanContainer}>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            setOpenMenuPphYangDisetorSendiri(!openMenuPphYangDisetorSendiri);
            setOpenMenuPph4(false);
            setOpenMenuPphNonResiden(false);
          }}
        >
          <PaymentsIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>PPh yang Disetor Sendiri</b>
          <div style={menuStyle}>
            <KeyboardArrowDownIcon fontSize="small" style={{ fill: "gray" }} />
          </div>
        </div>
        {openMenuPphYangDisetorSendiri && (
          <div style={userPopupContainer}>
            <div style={userPopup}>
              <div
                style={userPopupWrapper1}
                onClick={() => {
                  navigate("/ebupotUnifikasi/daftarDisetorSendiri");
                }}
              >
                <MenuIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Daftar PPh yang Disetor Sendiri</b>
              </div>
              <div
                style={userPopupWrapper2}
                onClick={() => {
                  navigate("/ebupotUnifikasi/inputDisetorSendiri");
                }}
              >
                <EditIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Rekam PPh yang Disetor Sendiri</b>
              </div>
            </div>
          </div>
        )}
      </Paper>
      <Paper elevation={6} style={{ flex: 1.2 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            setOpenMenuPphYangDisetorSendiri(false);
            setOpenMenuPph4(!openMenuPph4);
            setOpenMenuPphNonResiden(false);
          }}
        >
          <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>PPh Pasal 4 ayat (2), 15, 22, 23</b>
          <div style={menuStyle}>
            <KeyboardArrowDownIcon fontSize="small" style={{ fill: "gray" }} />
          </div>
        </div>
        {openMenuPph4 && (
          <div style={userPopupContainer}>
            <div style={userPopup}>
              <div
                style={userPopupWrapper1}
                onClick={() => {
                  navigate("/ebupotUnifikasi/daftarPph4");
                }}
              >
                <MenuIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Daftar BP Ps 4(2), 15, 22, 23</b>
              </div>
              <div
                style={userPopupWrapper2}
                onClick={() => {
                  navigate("/ebupotUnifikasi/inputPph4");
                }}
              >
                <EditIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Rekam BP Ps 4(2), 15, 22, 23</b>
              </div>
            </div>
          </div>
        )}
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            setOpenMenuPphYangDisetorSendiri(false);
            setOpenMenuPph4(false);
            setOpenMenuPphNonResiden(!openMenuPphNonResiden);
          }}
        >
          <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>PPh Non Residen</b>
          <div style={menuStyle}>
            <KeyboardArrowDownIcon fontSize="small" style={{ fill: "gray" }} />
          </div>
        </div>
        {openMenuPphNonResiden && (
          <div style={userPopupContainer}>
            <div style={userPopup}>
              <div
                style={userPopupWrapper1}
                onClick={() => {
                  navigate("/ebupotUnifikasi/daftarPphNonResiden");
                }}
              >
                <MenuIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Daftar Bukti Potong PPh Non Residen</b>
              </div>
              <div
                style={userPopupWrapper2}
                onClick={() => {
                  navigate("/ebupotUnifikasi/inputPphNonResiden");
                }}
              >
                <EditIcon className="icon-ebupot-pph" />
                <b style={userPopupTeks}>Rekam Bukti Potong PPh Non Residen</b>
              </div>
            </div>
          </div>
        )}
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupotUnifikasi/import");
          }}
        >
          <IosShareIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Impor Data PPh</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupotUnifikasi/posting");
          }}
        >
          <LockResetIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Posting</b>
        </div>
      </Paper>
    </div>
  );
}

export default MenuEbupotUnifikasi;

const userPopup = {
  cursor: "auto",
  position: "absolute", // Position it below the button
  transform: "translateX(-0%)",
  width: "300px",
  padding: "20px",
  backgroundColor: "white",
  zIndex: 1000, // Ensure it stays in front
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
};

const userPopupContainer = {
  position: "relative",
};

const userPopupWrapper1 = {
  cursor: "pointer",
};

const userPopupWrapper2 = {
  cursor: "pointer",
  marginTop: "20px",
};

const userPopupTeks = {
  marginLeft: "5px",
};
