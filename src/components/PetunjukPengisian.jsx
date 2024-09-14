import React, { useState, useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useStateContext, tempUrl } from "../contexts/ContextProvider";
import { Colors } from "../constants/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function PetunjukPengisian({
  width,
  titlePetunjuk,
  PetunjukPengisianComponent,
}) {
  const { screenSize } = useStateContext();
  const [collapse, setCollapse] = useState(false);

  // Toggle visibility
  const toggleCollapseVisibility = () => {
    setCollapse(!collapse);
  };

  const container = {
    width: screenSize >= 900 && width,
    height: screenSize >= 900 ? "395px" : "190px",
    color: Colors.grey700,
  };

  if (collapse === true) {
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
            <Button
              size="sm"
              style={cardHeaderButton}
              onClick={toggleCollapseVisibility}
            >
              <KeyboardDoubleArrowLeftIcon />
            </Button>
          </div>
        </Card.Header>
        <Card.Body style={{ overflowY: "auto" }}>
          <PetunjukPengisianComponent />
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <button
          className="petunjuk-button"
          style={{
            position: "absolute",
            padding: "1rem",
            zIndex: 1,
            transform: "rotate(-90deg)",
            left: "-130px",
            top: "160px",
            width: "250px",
            fontSize: "1.25rem",
            fontWeight: "600",
          }}
          onClick={toggleCollapseVisibility}
        >
          Petunjuk Pengisian <KeyboardArrowDownIcon />
        </button>
      </div>
    );
  }
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
