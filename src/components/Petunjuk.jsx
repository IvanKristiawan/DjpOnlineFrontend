import { Card, Button } from "react-bootstrap";
import { useStateContext, tempUrl } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function Petunjuk({ width, titlePetunjuk, PetunjukPengisianComponent }) {
  const { screenSize } = useStateContext();

  const container = {
    width: screenSize >= 900 && width,
    height: screenSize >= 900 ? "395px" : "190px",
    color: Colors.grey700,
  };

  return (
    <Card style={container}>
      <Card.Header style={cardHeader}>
        <div>
          <ImportContactsIcon />
        </div>
        <div>
          <p style={cardHeaderTitle}>{titlePetunjuk}</p>
        </div>
      </Card.Header>
      <Card.Body style={{ overflowY: "auto" }}>
        <PetunjukPengisianComponent />
      </Card.Body>
    </Card>
  );
}

export default Petunjuk;

const cardHeader = {
  height: "50px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.yellow500,
  display: "flex",
  alignItems: "center",
};

const cardHeaderTitle = {
  marginLeft: "10px",
  marginTop: "15px",
  lineHeight: "1",
};

const cardHeaderButton = {
  backgroundColor: Colors.yellow500,
  borderColor: Colors.yellow500,
};
