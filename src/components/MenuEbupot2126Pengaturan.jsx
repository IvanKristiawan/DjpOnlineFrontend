import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import "../constants/defaultProgram.css";
import { Paper } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function MenuEbupot2126Pengaturan({ username }) {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
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

  return (
    <div style={menuLaporanContainer}>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/pengaturan/penandatangan");
          }}
        >
          <BuildIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Penandatangan</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/pengaturan/perekam");
          }}
        >
          <PeopleAltIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Perekam</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/pengaturan/authKey");
          }}
        >
          <VpnKeyIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Buat Auth Key</b>
        </div>
      </Paper>
    </div>
  );
}

export default MenuEbupot2126Pengaturan;
