import { useState } from "react";
import { Table, Pagination, Form, Badge } from "react-bootstrap";
import { FaWhatsappSquare } from "react-icons/fa";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";
import "../navbarMenu/navbarmenu.css";

const TabData = ({ tableHeading, rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState();

  // Filter rows based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.whatsappNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique dates from filteredRows, limit to last 7 days
  const uniqueDates = [
    ...new Set(
      filteredRows
        .map((row) => moment(row.createdAt).format("MMM D, YY"))
        .filter((dateStr) =>
          moment(dateStr, "MMM D, YY").isAfter(moment().subtract(7, "days"))
        )
    ),
  ];

  // Filter rows by current selected date
  const rowsByDate = currentDate
    ? filteredRows.filter(
        (row) => moment(row.createdAt).format("MMM D, YY") === currentDate
      )
    : filteredRows;

  // Get current rows based on row pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rowsByDate.slice(indexOfFirstRow, indexOfLastRow);

  // Change page for rows
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous day button click
  const handlePreviousDay = () => {
    if (!currentDate) return;
    const prevDate = moment(currentDate, "MMM D, YY")
      .subtract(1, "days")
      .format("MMM D, YY");
    setCurrentDate(prevDate);
    setCurrentPage(1);
  };

  // Handle next day button click
  const handleNextDay = () => {
    if (!currentDate) return;
    const nextDate = moment(currentDate, "MMM D, YY")
      .add(1, "days")
      .format("MMM D, YY");
    if (moment(nextDate, "MMM D, YY").isAfter(moment())) return; // Don't go beyond today's date
    setCurrentDate(nextDate);
    setCurrentPage(1);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setCurrentDate(date);
    setCurrentPage(1); // Reset row pagination when date changes
  };

  // Handle previous button click for row pagination
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next button click for row pagination
  const handleNext = () => {
    if (currentPage < Math.ceil(rowsByDate.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="tabContain_2 d-flex flex-column">
      <div className="d-md-flex justify-content-between align-items-center mb-3">
        <div>
          <Form>
            <Form.Control
              className="px-4 py-2"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </div>
        <h2 className="text-capitalize px-4 py-2 bg-white">{tableHeading}</h2>
        <div className="row-count-info bg-white px-4 py-2 ">
          <p>
            Rows for selected date:{" "}
            <Badge variant="primary">{rowsByDate.length}</Badge>
          </p>
          <p>
            Total rows: <Badge variant="secondary">{filteredRows.length}</Badge>
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center tableThBox">
              <th>NAME</th>
              <th>NUMBER</th>
              <th>CHAT</th>
              <th>CALL METHOD</th>
              <th>DATE & TIME</th>
              <th>COMMENTS</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id} className="text-center">
                <td className="text-capitalize">{row.name}</td>
                <td>{row.phone}</td>
                <td>
                  <Link
                    to={`http://wa.me/${row.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsappSquare className="whatsAppIcon whatsAppIcon_2" />
                  </Link>
                </td>
                <td className="text-capitalize">
                  {row.platform}{" "}
                  {row.callMethod === "incoming" && (
                    <FiPhoneIncoming className="text-danger" />
                  )}
                  {row.callMethod === "outgoing" && (
                    <FiPhoneOutgoing className="text-primary" />
                  )}
                </td>
                <td>{moment(row.createdAt).format("MMM D, YY ,h:mm:ss a")}</td>
                <td>{row.comments}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Pagination>
            <Pagination.Prev
              onClick={handlePrevious}
              disabled={currentPage === 1}
            />
            {Array.from(
              { length: Math.ceil(rowsByDate.length / rowsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(rowsByDate.length / rowsPerPage)
              }
            />
          </Pagination>
        </div>
        <div className="pagination-container">
          <Pagination>
            <Pagination.Prev
              onClick={handlePreviousDay}
              disabled={!currentDate}
            />
            {uniqueDates.map((date) => (
              <Pagination.Item
                key={date}
                active={date === currentDate}
                onClick={() => handleDateChange(date)}
              >
                {date}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={handleNextDay}
              disabled={
                !currentDate ||
                moment(currentDate, "MMM D, YY").isSameOrAfter(moment())
              }
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TabData;
