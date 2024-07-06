/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Pagination, Form } from "react-bootstrap";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import "../navbarMenu/navbarmenu.css";
import moment from "moment";

const TabData = ({ tableHeading, rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // You can change this number for more or fewer rows per page
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rows based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.whatsappNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current rows based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredRows.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="tabContain_2">
      <div className="tabContainItem_2">
        <h2 className="text-capitalize">{tableHeading}</h2>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center tableThBox">
                <th>NAME</th>
                <th>NUMBER</th>
                <th>CHAT</th>
                <th>CONSULTANT</th>
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
                  <td className="text-capitalize">{row.consultant}</td>
                  <td className="text-capitalize">
                    {row.platform}{" "}
                    {row.callMethod === "incoming" && (
                      <FiPhoneIncoming className="text-danger" />
                    )}
                    {row.callMethod === "outgoing" && (
                      <FiPhoneOutgoing className="text-primary" />
                    )}
                  </td>
                  <td>
                    {moment(row.createdAt).format("MMM Do YY ,h:mm:ss a")}
                  </td>
                  <td>{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination-container">
            <Pagination>
              <Pagination.Prev
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />
              {Array.from(
                { length: Math.ceil(filteredRows.length / rowsPerPage) },
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
                  currentPage === Math.ceil(filteredRows.length / rowsPerPage)
                }
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabData;
