import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { tempUrl, useStateContext } from '../../../contexts/ContextProvider';
import { ShowTableWilayah } from '../../../components/ShowTable';
import { FetchErrorHandling } from '../../../components/FetchErrorHandling';
import { SearchBar, Loader, usePagination, ButtonModifier } from '../../../components';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Box, Pagination, Button, ButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDownloadExcel } from 'react-export-table-to-excel';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

const TampilWilayah = () => {
  const tableRef = useRef(null);
  const { user, setting } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [namaWilayah, setNamaWilayah] = useState('');
  const [kodeWilayah, setKodeWilayah] = useState('');
  const [singkatanWilayah, setSingkatanWilayah] = useState('');

  const [wilayahReport, setWilayahReport] = useState([]);

  const [previewPdf, setPreviewPdf] = useState(false);
  const [previewExcel, setPreviewExcel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [wilayahs, setWilayahs] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState('');
  const PER_PAGE = 20;

  const handleChange = (e, p) => {
    setPage(p - 1);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setSearchTerm(query);
  };

  useEffect(() => {
    id && getWilayahsById();
  }, [id]);

  useEffect(() => {
    getWilayahs();
  }, [page, searchTerm]);

  const getWilayahs = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${tempUrl}/wilayahsPagination?search_query=${searchTerm}&page=${page}&limit=${limit}`, {
        _id: user.id,
        token: user.token,
      });
      setQuery(searchTerm);
      setWilayahs(response.data.wilayahs);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getWilayahReportData = async () => {
    try {
      const response = await axios.post(`${tempUrl}/wilayahs`, {
        _id: user.id,
        token: user.token,
      });
      setWilayahReport(response.data);
    } catch (err) {
      setIsFetchError(true);
    }
  };

  const getWilayahsById = async () => {
    setLoading(true);
    if (id) {
      const response = await axios.post(`${tempUrl}/wilayahs/${id}`, {
        _id: user.id,
        token: user.token,
      });
      setNamaWilayah(response.data.namaWilayah);
      setKodeWilayah(response.data.kodeWilayah);
      setSingkatanWilayah(response.data.singkatanWilayah);
    }
    setLoading(false);
  };

  const deleteWilayah = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${tempUrl}/deleteWilayah/${id}`, {
        _id: user.id,
        token: user.token,
      });
      getWilayahs();
      setNamaWilayah('');
      navigate('/wilayah');
    } catch (error) {
      if (error.response.data.message.includes('foreign key')) {
        alert(`${namaWilayah} tidak bisa dihapus karena sudah ada data!`);
      }
    }
    setLoading(false);
  };

  const downloadPdf = () => {
    var date = new Date();
    var current_date =
      date.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      (date.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      date.getFullYear();
    var current_time =
      date.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      date.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`${setting.namaPerusahaan} - ${setting.kotaPerusahaan}`, 15, 10);
    doc.text(`${setting.alamatPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Daftar Wilayah`, 85, 30);
    doc.setFontSize(10);
    doc.text(`Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`, 15, 290);
    doc.autoTable({
      html: '#table',
      startY: doc.pageCount > 1 ? doc.autoTableEndPosY() + 20 : 45,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0],
      },
    });
    window.open(URL.createObjectURL(doc.output('blob')));
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Wilayah',
    sheet: 'DaftarWilayah',
  });

  const textRight = {
    textAlign: screenSize >= 650 && 'right',
  };

  if (loading) {
    return <Loader />;
  }

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  return (
    <Container>
      <h3>Master</h3>
      <h5 style={{ fontWeight: 400 }}>Daftar Wilayah</h5>
      <Box sx={downloadButtons}>
        <ButtonGroup variant="outlined" color="secondary">
          <Button
            color="primary"
            startIcon={<SearchIcon />}
            onClick={() => {
              setPreviewPdf(!previewPdf);
              getWilayahReportData();
              setPreviewExcel(false);
            }}
          >
            PDF
          </Button>
          <Button
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={() => {
              setPreviewExcel(!previewExcel);
              getWilayahReportData();
              setPreviewPdf(false);
            }}
          >
            Excel
          </Button>
        </ButtonGroup>
      </Box>
      {previewPdf && (
        <div>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => downloadPdf()}>
            CETAK
          </Button>
          <table class="table" id="table">
            <thead>
              <tr>
                <th>Kode Wilayah</th>
                <th>Nama Wilayah</th>
                <th>Singkatan Wilayah</th>
              </tr>
            </thead>
            <tbody>
              {wilayahReport.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.kodeWilayah}</td>
                  <td>{user.namaWilayah}</td>
                  <td>{user.singkatanWilayah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {previewExcel && (
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={onDownload}>
            EXCEL
          </Button>
        )}
        <table ref={tableRef}>
          {previewExcel && (
            <tbody>
              <tr>
                <th>Kode Wilayah</th>
                <th>Nama Wilayah</th>
                <th>Singkatan Wilayah</th>
              </tr>
              {wilayahReport.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.kodeWilayah}</td>
                  <td>{user.namaWilayah}</td>
                  <td>{user.singkatanWilayah}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier id={id} kode={id} addLink={`/wilayah/tambahWilayah`} editLink={`/wilayah/${id}/edit`} deleteUser={deleteWilayah} nameUser={namaWilayah} />
      </Box>
      {id && (
        <Container>
          <hr />
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5" style={textRight}>
                    Nama Wilayah :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control value={namaWilayah} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5" style={textRight}>
                    Kode Wilayah :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control value={kodeWilayah} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5" style={textRight}>
                    Singkatan Wilayah :
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control value={singkatanWilayah} disabled readOnly />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
      <hr />
      <Form onSubmit={searchData}>
        <Box sx={searchBarContainer}>
          <SearchBar value={query} setSearchTerm={setQuery} />
          <Button variant="contained" type="submit" color="primary" disableElevation>
            Cari
          </Button>
        </Box>
      </Form>
      <Box sx={tableContainer}>
        <ShowTableWilayah currentPosts={wilayahs} />
      </Box>
      <Box sx={tableContainer}>
        <Pagination count={pages} page={page + 1} onChange={handleChange} color="primary" size={screenSize <= 600 ? 'small' : 'large'} />
      </Box>
    </Container>
  );
};

export default TampilWilayah;

const buttonModifierContainer = {
  mt: 4,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const downloadButtons = {
  mt: 4,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const searchBarContainer = {
  pt: 6,
  display: 'flex',
  justifyContent: 'center',
};

const tableContainer = {
  pt: 4,
  display: 'flex',
  justifyContent: 'center',
};
