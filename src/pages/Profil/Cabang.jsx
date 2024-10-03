import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext, tempUrl } from "../../contexts/ContextProvider";
import { ShowTableUserPerCabang } from "../../components/ShowTable";
import { AuthContext } from "../../contexts/AuthContext";
import { Colors } from "../../constants/styles";
import { Menu, Petunjuk, Loader, MenuProfil } from "../../components/index";
import { HeaderMain, HeaderMainProfil, MainMenu } from "../../components/index";
import { default as PetunjukPengisianProfil } from "./PetunjukPengisianProfil";
import "../../constants/defaultProgram.css";
import { Card, Form } from "react-bootstrap";
import { Paper, Box, Pagination, Snackbar, Alert } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function Cabang() {
  const { screenSize } = useStateContext();
  const { user, dispatch } = useContext(AuthContext);

  const [userPerCabangsPagination, setUserPerCabangsPagination] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUserPerCabangData();
  }, [searchTerm]);

  const getUserPerCabangData = async () => {
    const response = await axios.post(
      `${tempUrl}/usersPerCabangPagination?search_query=${searchTerm}&page=${page}&limit=${limit}`,
      {
        _id: user.id,
        token: user.token,
        kodeCabang: user.cabang.id,
      }
    );
    setUserPerCabangsPagination(response.data.users);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const inputWrapper = {
    paddingLeft: screenSize >= 1000 && "10px",
    paddingRight: screenSize >= 1000 && "10px",
    color: Colors.grey700,
    display: screenSize >= 600 && "flex",
  };

  const inputWrapperTable = {
    paddingTop: screenSize >= 1000 && "40px",
    paddingLeft: screenSize >= 1000 && "10px",
    paddingRight: screenSize >= 1000 && "10px",
    color: Colors.grey700,
  };

  const inputContainer = {
    flex: 1,
    marginLeft: screenSize >= 900 && "16px",
    marginTop: screenSize <= 900 && "20px",
  };

  const warningContainer = {
    border: "2px solid #ffb822",
    boxShadow: "0 0 0 rgba(204,169,44, 0.4)",
    animation: "pulse 1s infinite",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    paddingBottom: "5px",
    marginBottom: "20px",
    paddingLeft: screenSize <= 900 && "10px",
    paddingRight: screenSize <= 900 && "10px",
  };

  const paperStyle = {
    margin: screenSize >= 900 ? "0px 80px 100px 100px" : "80px 10px 40px 10px",
    padding: screenSize >= 900 ? "20px 50px 20px 20px" : "20px 20px 20px 20px",
    display: screenSize >= 900 && "flex",
    justifyContent: screenSize >= 900 && "space-around",
  };

  const profilWrapper2 = {
    flex: 1,
    marginLeft: screenSize >= 600 && "20px",
  };

  const inputTitle = {
    fontSize: screenSize >= 900 ? "20px" : "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: Colors.blue900,
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Menu />
      <HeaderMain username={user.nama} />
      {screenSize <= 1000 && <HeaderMainProfil username={user.nama} />}
      <MainMenu activeLink={"profil"} />
      <Paper elevation={4} style={paperStyle}>
        <div>
          <MenuProfil menuActive={"Daftar WP Cabang"} />
          <Petunjuk
            width={"350px"}
            titlePetunjuk={"Petunjuk"}
            PetunjukPengisianComponent={PetunjukPengisianProfil}
          />
        </div>
        <div style={inputContainer}>
          <div style={warningContainer}>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              "Apabila terdapat data yang tidak sesuai, silakan menghubungi KPP
              Administrasi"
            </p>
          </div>
          <Card>
            <Card.Header style={inputTitle}>
              <PeopleAltIcon /> Daftar WP Cabang
            </Card.Header>
            <Card.Body style={{ padding: "25px" }}>
              <div style={inputWrapper}>
                <div style={profilWrapper}>
                  <div>
                    <div style={{ marginBottom: "5px" }}>
                      Cari Cabang (NPWP15)
                    </div>
                    <div>
                      <Form.Control
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={profilWrapper2}></div>
              </div>
              <div style={inputWrapperTable}>
                <p>
                  Menampilkan {userPerCabangsPagination.length} sampai{" "}
                  {userPerCabangsPagination.length} dari {rows} entri
                </p>
                <Box>
                  <ShowTableUserPerCabang
                    currentPosts={userPerCabangsPagination}
                  />
                </Box>
                <Box sx={tableContainer}>
                  <Pagination
                    count={pages}
                    page={page + 1}
                    onChange={handleChange}
                    color="secondary"
                    variant="outlined"
                    size={screenSize <= 600 ? "small" : "large"}
                  />
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Paper>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Cabang;

const profilWrapper = {
  flex: 1,
};

const alertBox = {
  width: "100%",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};
