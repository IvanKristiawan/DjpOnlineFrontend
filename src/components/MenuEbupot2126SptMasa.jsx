import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import "../constants/defaultProgram.css";
import { Paper } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentIcon from "@mui/icons-material/Assignment";

function MenuEbupot2126SptMasa({ username }) {
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
            navigate("/ebupot2126/posting");
          }}
        >
          <LockResetIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Posting</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/sptMasa/rekamBuktiSetor");
          }}
        >
          <PaymentsIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Perekaman Bukti Penyetoran</b>
        </div>
      </Paper>
      <Paper elevation={6} style={{ flex: 1 }}>
        <div
          className="paper-background"
          style={menuLaporanWrapper}
          onClick={() => {
            navigate("/ebupot2126/sptMasa/penyiapanSpt");
          }}
        >
          <AssignmentIcon style={{ fill: "#ffb822" }} fontSize="large" />
          <b>Penyiapan SPT Masa PPh 21/26</b>
        </div>
      </Paper>
    </div>
  );
}

export default MenuEbupot2126SptMasa;
