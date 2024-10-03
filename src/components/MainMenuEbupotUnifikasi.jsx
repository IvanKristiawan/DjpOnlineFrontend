import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import LogoEbupotUnifikasi from "../assets/Logo Ebupot Unifikasi.png";

function MainMenuEbupotUnifikasi({ activeLink }) {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();

  const menuContainer = {
    margin: screenSize >= 900 ? "20px 80px 0px 100px" : "80px 10px 40px 0px",
    display: "flex",
    justifyContent: "space-between",
  };

  const menuWrapper = {
    margin: screenSize >= 900 ? "20px 80px 0px 0px" : "80px 10px 40px 0px",
    display: "flex",
  };

  if (screenSize >= 900) {
    return (
      <div style={menuContainer}>
        <div style={menuWrapper}>
          <div
            style={
              activeLink === "dashboardEbupotUnifikasi"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/dashboardEbupotUnifikasi");
            }}
          >
            Dashboard
          </div>
          <div
            style={
              activeLink === "pajakPenghasilanEbupotUnifikasi"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/pajakPenghasilanEbupotUnifikasi");
            }}
          >
            Pajak Penghasilan
          </div>
          <div
            style={
              activeLink === "sptMasaEbupotUnifikasi"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/sptMasaEbupotUnifikasi");
            }}
          >
            SPT Masa
          </div>
          <div
            style={
              activeLink === "pengaturanEbupotUnifikasi"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/pengaturanEbupotUnifikasi");
            }}
          >
            Pengaturan
          </div>
        </div>
        <div>
          <div>
            <img
              src={LogoEbupotUnifikasi}
              alt="LogoEbupotUnifikasi"
              style={logoMenuStyle}
              onClick={() => {
                navigate("/dashboardEbupotUnifikasi");
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          cursor: "pointer",
        }}
      >
        <div>
          <img
            src={LogoEbupotUnifikasi}
            alt="LogoEbupotUnifikasi"
            style={logoMenuStyleSmallScreen}
            onClick={() => {
              navigate("/dashboardEbupotUnifikasi");
            }}
          />
        </div>
      </div>
    );
  }
}

export default MainMenuEbupotUnifikasi;

const menuButtonActiveStyle = {
  backgroundColor: "#EBECF1",
  color: Colors.blue900,
  boxShadow: "inset 0 3px 10px 0 rgba(0, 0, 0, .19)",
  padding: "5px 40px 5px 20px",
  borderRadius: "10px 40px 0px 0px",
  fontSize: "1.25rem",
  cursor: "pointer",
};

const menuButtonStyle = {
  backgroundColor: Colors.blue900,
  color: "white",
  padding: "5px 40px 5px 20px",
  borderRadius: "10px 40px 0px 0px",
  fontSize: "1.25rem",
  cursor: "pointer",
};

const logoMenuStyle = {
  width: "150px",
  cursor: "pointer",
};

const logoMenuStyleSmallScreen = {
  width: "200px",
};
