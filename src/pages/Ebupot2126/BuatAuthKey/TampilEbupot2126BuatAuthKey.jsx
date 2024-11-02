import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { Colors } from "../../../constants/styles";
import { Menu, PetunjukPengisian } from "../../../components/index";
import {
  MenuEbupot2126Pengaturan,
  HeaderMainEbupot2126,
  HeaderMainProfil,
  MainMenuEbupot2126,
} from "../../../components/index";
import "../../../constants/defaultProgram.css";
import { Card, Form, Spinner } from "react-bootstrap";
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateRandomString } from "../../../constants/helper";

// Petunjuk Pengisian component
const PetunjukPengisianComponent = () => {
  return <div></div>;
};

function TampilEbupot2126BuatAuthKey() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [authKey, setAuthKey] = useState(user.authKey);
  const [openFoundNik, setOpenFoundNik] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const [openLoading, setOpenLoading] = useState(false);

  const handleCloseConfirmationFoundNik = () => {
    setOpenFoundNik(false);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(authKey)
      .then(() => {
        alert("Data tersalin!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const saveAuthKey = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (authKey.length === 0) {
      // Create Auth Key
      setOpenLoading(true);
      const tempAuthKey = generateRandomString(64);

      let updateAuthKeyUser = await axios.post(
        `${tempUrl}/updateAuthKeyUserThenLogin/${user.id}`,
        {
          authKey: tempAuthKey,

          userIdInput: user.id,
          kodeCabang: user.cabang.id,
          _id: user.id,
          token: user.token,
        }
      );
      const findSetting = await axios.post(`${tempUrl}/lastSetting`, {
        _id: updateAuthKeyUser.data.details.id,
        token: updateAuthKeyUser.data.details.token,
        kodeCabang: updateAuthKeyUser.data.details.cabangId,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: updateAuthKeyUser.data.details,
        setting: findSetting.data,
      });

      setTimeout(async () => {
        setAuthKey(user.authKey);
        setOpenLoading(false);
      }, 500);
    } else {
      // Delete Auth Key
      setOpenLoading(true);
      const tempAuthKey = "";

      let updateAuthKeyUser = await axios.post(
        `${tempUrl}/updateAuthKeyUserThenLogin/${user.id}`,
        {
          authKey: tempAuthKey,

          userIdInput: user.id,
          kodeCabang: user.cabang.id,
          _id: user.id,
          token: user.token,
        }
      );
      const findSetting = await axios.post(`${tempUrl}/lastSetting`, {
        _id: updateAuthKeyUser.data.details.id,
        token: updateAuthKeyUser.data.details.token,
        kodeCabang: updateAuthKeyUser.data.details.cabangId,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: updateAuthKeyUser.data.details,
        setting: findSetting.data,
      });

      setTimeout(async () => {
        setAuthKey(user.authKey);
        setOpenLoading(false);
      }, 500);
    }
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
    width: screenSize >= 900 ? "60%" : "100%",
    color: "#646c9a",
  };

  return (
    <div>
      <Menu />
      <HeaderMainEbupot2126 username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenuEbupot2126 activeLink={"/ebupot2126/pengaturan/penandatangan"} />
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
          <MenuEbupot2126Pengaturan />
          <Card style={{ marginTop: "20px" }}>
            <Card.Header style={inputTitle}>
              <KeyIcon style={{ marginRight: "10px" }} />
              Buat Auth Key
            </Card.Header>
            <Card.Body>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={inputWrapper}>
                    <div style={{ marginBottom: "5px" }}>Auth Key</div>
                    <div>
                      <Form.Control
                        as="textarea"
                        value={authKey}
                        readOnly
                        rows={3}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      {authKey.length === 0 ? (
                        <button
                          className="hover-button-no-icon"
                          style={{ marginRight: "4px" }}
                          onClick={saveAuthKey}
                        >
                          <SendIcon
                            fontSize="small"
                            style={{ marginRight: "4px" }}
                          />
                          Minta
                        </button>
                      ) : (
                        <button
                          className="petunjuk-button"
                          style={{ marginRight: "4px" }}
                          onClick={saveAuthKey}
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ marginRight: "4px" }}
                          />
                          Hapus
                        </button>
                      )}
                      <button
                        className="copy-button"
                        style={{ marginRight: "4px" }}
                        onClick={copyToClipboard}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      <Dialog
        open={openLoading}
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
        open={openFoundNik}
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
              onClick={handleCloseConfirmationFoundNik}
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
                Data berhasil disimpan.
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
              style={{ paddingTop: "10px" }}
              onClick={handleCloseSaved}
            >
              Tutup
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default TampilEbupot2126BuatAuthKey;
