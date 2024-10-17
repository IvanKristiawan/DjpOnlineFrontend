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
              activeLink === "/ebupotUnifikasi/dashboard"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupotUnifikasi/dashboard");
            }}
          >
            Dashboard
          </div>
          <div
            style={
              activeLink === "/ebupotUnifikasi/daftarDisetorSendiri"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupotUnifikasi/daftarDisetorSendiri");
            }}
          >
            Pajak Penghasilan
          </div>
          <div
            style={
              activeLink === "/ebupotUnifikasi/sptMasa/rekamBuktiSetor"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupotUnifikasi/sptMasa/rekamBuktiSetor");
            }}
          >
            SPT Masa
          </div>
          <div
            style={
              activeLink === "/pengaturan/penandatangan"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/pengaturan/penandatangan");
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
                navigate("/ebupotUnifikasi/dashboard");
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
              navigate("/ebupotUnifikasi/dashboard");
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
