import { useContext, useState } from "react";
import { Table, Form, Pagination } from "react-bootstrap";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import { useGetAllDataQuery } from "../../../redux/features/allApis/dataApi/dataApi";
import Loader from "../../../component/shared/Loader";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from "moment";

const MyDataTable = () => {
  const { user, loading } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetAllDataQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // State to track sorting order
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // You can change this number for more or fewer rows per page

  const myData = data?.filter(
    (singleData) => singleData.consultantUid === user?.uid
  );

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to check if object contains search term in any field
  const doesObjectContainSearchTerm = (obj, term) => {
    for (let key in obj) {
      if (
        obj[key] &&
        obj[key].toString().toLowerCase().includes(term.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  // Function to sort data based on createdAt field
  const sortData = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
    });
  };

  // Render loading state if data is still fetching
  if (isLoading || loading) {
    return <Loader />;
  }

  // Render error message if fetching data resulted in an error
  if (isError) {
    return <p>Error fetching data!</p>;
  }

  // Filter and sort the data based on search term and sorting criteria
  let filteredData = [];

  if (myData) {
    filteredData = [...myData];

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        doesObjectContainSearchTerm(item, searchTerm)
      );
    }

    // Sort filtered data based on selected sort order
    filteredData = sortData(filteredData);
  }

  // Get current rows based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle sorting order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      <div className="">
        <div className="tabContainItem_2">
          <div className="D_DT_topContain">
            <Form.Group controlId="searchField">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <div className="D_DT_sortBy">
              <Form.Label>Sort By : </Form.Label>
              <Form.Group controlId="sortField">
                <Form.Control
                  as="select"
                  value={sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="oldest">Oldest</option>
                  <option value="latest">Latest</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr className="text-center tableThBox">
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>CHAT</th>
                  <th>CONSULTANT</th>
                  <th>CALL METHOD</th>
                  <th>DATE & TIME</th>
                  <th>COMMENTS</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length !== 0 ? (
                  currentRows.map(
                    ({
                      name,
                      id,
                      whatsappNumber,
                      phone,
                      comments,
                      platform,
                      callMethod,
                      createdAt,
                      consultant,
                    }) => (
                      <tr key={id} className="text-center">
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td>
                          <Link
                            to={`http://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaWhatsappSquare className="whatsAppIcon whatsAppIcon_2" />
                          </Link>
                        </td>
                        <td>{consultant}</td>
                        <td>
                          {platform}{" "}
                          {callMethod === "incoming" && <FiPhoneIncoming className="text-danger" />}
                          {callMethod === "outgoing" && <FiPhoneOutgoing className="text-primary"/>}
                        </td>
                        <td>
                          {moment(createdAt).format("MMM Do YY ,h:mm:ss a")}
                        </td>
                        <td>{comments}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="pagination-container">
              <Pagination>
                <Pagination.Prev
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                />
                {Array.from(
                  { length: Math.ceil(filteredData.length / rowsPerPage) },
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
                    currentPage === Math.ceil(filteredData.length / rowsPerPage)
                  }
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDataTable;
