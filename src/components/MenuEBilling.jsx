import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { useStateContext } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import "../constants/defaultProgram.css";
import LogoDjp from "../assets/Logo DJP.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

function MenuEBilling({ activeLink }) {
  const { screenSize } = useStateContext();
  const navigate = useNavigate();

  const menuStyle = {
    margin: screenSize >= 900 ? "20px 80px 0px 100px" : "80px 10px 40px 0px",
    display: "flex",
  };

  if (screenSize >= 900) {
    return (
      <div style={menuStyle}>
        <div
          style={
            activeLink === "Surat Setoran Elektronik"
              ? menuButtonActiveStyle
              : menuButtonStyle
          }
        >
          Surat Setoran Elektronik
        </div>
      </div>
    );
  }
}

export default MenuEBilling;

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
