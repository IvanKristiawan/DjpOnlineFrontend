import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import LogoEbupot2126 from "../assets/Logo Ebupot 21 26.png";

function MainMenuEbupot2126({ activeLink }) {
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
              activeLink === "/ebupot2126/dashboard"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupot2126/dashboard");
            }}
          >
            Dashboard
          </div>
          <div
            style={
              activeLink === "/ebupot2126/buktiPotongPasal21"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupot2126/buktiPotongPasal21");
            }}
          >
            Bukti Potong
          </div>
          <div
            style={
              activeLink === "/ebupot2126/posting"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupot2126/posting");
            }}
          >
            SPT Masa
          </div>
          <div
            style={
              activeLink === "/ebupot2126/pengaturan/penandatangan"
                ? menuButtonActiveStyle
                : menuButtonStyle
            }
            onClick={() => {
              navigate("/ebupot2126/pengaturan/penandatangan");
            }}
          >
            Pengaturan
          </div>
        </div>
        <div>
          <div>
            <img
              src={LogoEbupot2126}
              alt="LogoEbupot2126"
              style={logoMenuStyle}
              onClick={() => {
                navigate("/ebupot2126/dashboard");
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
            src={LogoEbupot2126}
            alt="LogoEbupot2126"
            style={logoMenuStyleSmallScreen}
            onClick={() => {
              navigate("/ebupot2126/dashboard");
            }}
          />
        </div>
      </div>
    );
  }
}

export default MainMenuEbupot2126;

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
