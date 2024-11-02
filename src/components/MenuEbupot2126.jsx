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
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

function MenuEbupot2126({ username }) {
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
            navigate("/ebupot2126/buktiPotongPasal21");
          }}
        >
          <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Daftar Bupot Pasal 21</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/buktiPotongPasal26");
          }}
        >
          <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Daftar Bupot Pasal 26</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/imporData");
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
            navigate("/ebupot2126/downloadBupot");
          }}
        >
          <SystemUpdateAltIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Download Bupot</b>
        </div>
      </Paper>
    </div>
  );
}

export default MenuEbupot2126;

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
