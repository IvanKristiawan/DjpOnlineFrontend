import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Menu() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      variant="dark"
      style={{ backgroundColor: "#02275d" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Profil" id="Profil" active>
              <NavDropdown.Item>Overview</NavDropdown.Item>
              <NavDropdown.Item>
                Visi, Misi, Tujuan, dan Maklumat Pelayanan
              </NavDropdown.Item>
              <NavDropdown.Item>Tugas dan Fungsi</NavDropdown.Item>
              <NavDropdown.Item>Logo DJP</NavDropdown.Item>
              <NavDropdown.Item>Kode Etik dan Kode Perilaku</NavDropdown.Item>
              <NavDropdown.Item>Struktur Organisasi</NavDropdown.Item>
              <NavDropdown.Item>Daftar Pejabat</NavDropdown.Item>
              <NavDropdown.Item>Unit Kerja</NavDropdown.Item>
              <NavDropdown.Item>Hasil Survei</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Peraturan" id="Peraturan" active>
              <NavDropdown.Item>Peraturan</NavDropdown.Item>
              <NavDropdown.Item>Kurs</NavDropdown.Item>
              <NavDropdown.Item>Tarif Bunga</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Unduh" id="Unduh" active>
              <NavDropdown.Item>Aplikasi Perpajakan</NavDropdown.Item>
              <NavDropdown.Item>Formulir Perpajakan</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Informasi Publik" id="Informasi Publik" active>
              <NavDropdown.Item>Daftar Informasi Publik</NavDropdown.Item>
              <NavDropdown.Item>
                Anggaran dan Realisasi Keuangan
              </NavDropdown.Item>
              <NavDropdown.Item>
                Transparansi Kinerja Ditjen Pajak
              </NavDropdown.Item>
              <NavDropdown.Item>PPID</NavDropdown.Item>
              <NavDropdown.Item>
                Pengaduan Penyalahgunaan Wewenang
              </NavDropdown.Item>
              <NavDropdown.Item>
                Penyediaan Pembicara, Pembahas, atau Moderator pada Kegiatan
              </NavDropdown.Item>
              <NavDropdown.Item>
                Standar Pelayanan di Lingkungan Direktorat Jenderal Pajak
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Internasional" id="Internasional" active>
              <NavDropdown.Item>APA dan MAP</NavDropdown.Item>
              <NavDropdown.Item>EOI</NavDropdown.Item>
              <NavDropdown.Item>Tax Treaty</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tema" id="Tema" active>
              <NavDropdown.Item>
                UU Harmonisasi Peraturan Perpajakan
              </NavDropdown.Item>
              <NavDropdown.Item>Program Pengungkapan Sukarela</NavDropdown.Item>
              <NavDropdown.Item>DJP Tanggap Covid-19</NavDropdown.Item>
              <NavDropdown.Item>Pajak Digital</NavDropdown.Item>
              <NavDropdown.Item>Infografis</NavDropdown.Item>
              <NavDropdown.Item>Jurnal Pajak</NavDropdown.Item>
              <NavDropdown.Item>Lapor Tahunan</NavDropdown.Item>
              <NavDropdown.Item>Buku Elektronik</NavDropdown.Item>
              <NavDropdown.Item>Kerja Sama dan Kemitraan</NavDropdown.Item>
              <NavDropdown.Item>
                Klaster Kemudahan Berusaha Bidang Perpajakan
              </NavDropdown.Item>
              <NavDropdown.Item>Penegakan Hukum</NavDropdown.Item>
              <NavDropdown.Item>Podcast Cermati</NavDropdown.Item>
              <NavDropdown.Item>Podcast Pamorku</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Reformasi Perpajakan"
              id="Reformasi Perpajakan"
              active
            >
              <NavDropdown.Item href="#action/3.1">
                Reformasi Perpajakan DJP
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Pembaruan Sistem Inti Administrasi Perpajakan (PSIAP) [Coretax]
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link active>Edukasi Pajak</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
