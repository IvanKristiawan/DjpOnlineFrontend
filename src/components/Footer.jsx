import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer style={container}>
      <h2 style={titleStyle}>Website Pajak Untuk Edukasi</h2>
      <div style={copyrightStyle}>
        <small>
          &copy; {new Date().getFullYear()} made by -{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ivankristiawan.com"
            style={copyrightLinkStyle}
          >
            Ivan Kristiawan
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;

const container = {
  backgroundColor: "yellow",
};

const titleStyle = {
  color: "black",
  fontWeight: "600",
  margin: "20px 20px",
};

const copyrightStyle = {
  backgroundColor: "#212c5f",
  color: "white",
};

const copyrightLinkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "1rem",
};
