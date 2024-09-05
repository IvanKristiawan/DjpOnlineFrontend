import { Card, Button } from "react-bootstrap";
import { useStateContext, tempUrl } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function PetunjukPengisian({ titlePetunjuk, listPetunjuk }) {
  const { screenSize } = useStateContext();

  const container = {
    width: screenSize >= 900 && "240px",
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
        <div>
          <Button size="sm" style={cardHeaderButton}>
            <KeyboardDoubleArrowLeftIcon />
          </Button>
        </div>
      </Card.Header>
      <Card.Body style={{ overflowY: "auto" }}>
        <ol>
          {listPetunjuk.map((petunjuk, index) => (
            <li>{petunjuk}</li>
          ))}
        </ol>
      </Card.Body>
    </Card>
  );
}

export default PetunjukPengisian;

const cardHeader = {
  height: "50px",
  fontWeight: "600",
  color: "white",
  backgroundColor: Colors.yellow500,
  display: "flex",
  justifyContent: "space-between",
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
