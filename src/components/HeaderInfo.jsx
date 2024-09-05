import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import LogoDjp from "../assets/Logo DJP.png";
import SearchIcon from "@mui/icons-material/Search";

function HeaderInfo() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{
        background:
          "linear-gradient(180deg, rgba(244, 244, 244, 1) 0, rgba(255, 255, 255, 1) 76%, rgba(224, 224, 224, 1) 100%)",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={LogoDjp} alt="LogoDjp" style={{ width: "200px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link style={marginButton}>
              <Button variant="secondary" size="sm">
                BERANDA
              </Button>
            </Nav.Link>
            <Nav.Link style={marginButton}>
              <Button variant="secondary" size="sm">
                BADAN
              </Button>
            </Nav.Link>
            <Nav.Link style={marginButton}>
              <DropdownButton
                title="ORANG PRIBADI"
                id="bg-nested-dropdown"
                variant="secondary"
                size="sm"
              >
                <Dropdown.Item eventKey="1">Karyawan</Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  Melakukan Kegiatan Bebas
                </Dropdown.Item>
              </DropdownButton>
            </Nav.Link>
            <Nav.Link style={marginButton}>
              <Button variant="secondary" size="sm">
                INSTANSI PEMERINTAH
              </Button>
            </Nav.Link>
            <Nav.Link style={marginButton}>
              <Button variant="secondary" size="sm">
                KONSULTAN PAJAK
              </Button>
            </Nav.Link>
            <Nav.Link style={marginButton}>
              <Button variant="secondary" size="sm">
                PJAP
              </Button>
            </Nav.Link>
            <Nav.Link>
              <InputGroup>
                <Form.Control type="text" placeholder="Pencarian" size="sm" />
                <Button
                  variant="outline-secondary"
                  className="no-hover"
                  size="sm"
                >
                  <SearchIcon />
                </Button>
              </InputGroup>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderInfo;

const marginButton = {
  marginLeft: "-5px",
  marginRight: "-5px",
};
