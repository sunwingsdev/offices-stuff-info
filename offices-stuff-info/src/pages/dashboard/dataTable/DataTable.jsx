import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import "./DataTable.css";
import {
  useDeleteSingleDataMutation,
  useGetAllDataQuery,
} from "../../../redux/features/allApis/dataApi/dataApi";
import SimpleModal from "../../../component/shared/SimpleModal";
import ConfirmationModal from "../../../component/shared/ConfirmationModal";
import { useToasts } from "react-toast-notifications";
import EditData from "../../../component/dashboard/EditData/EditData";
import Loader from "../../../component/shared/Loader";

const DataTable = () => {
  const { data, isLoading, isError } = useGetAllDataQuery();
  const [deleteSingleData] = useDeleteSingleDataMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest"); // State to track sorting order
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState("");
  const { addToast } = useToasts();

  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  // handle edit
  const handleEdit = (id) => {
    setShowEditModal(true);
    setId(id);
  };

  // handle delete functionality
  const handleDelete = async () => {
    try {
      const result = await deleteSingleData(id);
      if (result.data.deletedCount > 0) {
        addToast("Data deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setShow(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to check if object contains search term in any field
  const doesObjectContainSearchTerm = (obj, term) => {
    for (let key in obj) {
      if (obj[key].toString().toLowerCase().includes(term.toLowerCase())) {
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
  if (isLoading) {
    return <Loader />;
  }

  // Render error message if fetching data resulted in an error
  if (isError) {
    return <p>Error fetching data!</p>;
  }

  // Filter and sort the data based on search term and sorting criteria
  let filteredData = [];

  if (data) {
    filteredData = [...data];

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        doesObjectContainSearchTerm(item, searchTerm)
      );
    }

    // Sort filtered data based on selected sort order
    filteredData = sortData(filteredData);
  }

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
                  <th>TYPE</th>
                  <th>ROLE</th>
                  <th>ID</th>
                  <th>PHONE APP LINK</th>
                  <th>NUMBER </th>
                  <th>COMPLAIN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length !== 0 ? (
                  filteredData.map(
                    ({ _id, type, id, role, number, complain }) => (
                      <tr key={id} className="text-center">
                        <td>{type}</td>
                        <td>{role}</td>
                        <td>{id}</td>
                        <td>
                          <Link to={`http://wa.me/${number}`}>
                            <FaWhatsappSquare className="whatsAppIcon whatsAppIcon_2" />
                          </Link>
                        </td>
                        <td>{number}</td>
                        <td>{complain}</td>
                        <td>
                          <Link className="DT_icon">
                            <FaRegEdit onClick={() => handleEdit(_id)} />
                          </Link>
                          <Link className="DT_icon">
                            <AiTwotoneDelete onClick={() => handleShow(_id)} />
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <>
        <SimpleModal
          show={show}
          handleClose={() => setShow(false)}
          handleShow={() => setShow(true)}
        >
          <ConfirmationModal
            handleClose={() => setShow(false)}
            handleDelete={handleDelete}
          />
        </SimpleModal>
      </>
      <>
        <SimpleModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleShow={() => setShowEditModal(true)}
        >
          <EditData id={id} />
        </SimpleModal>
      </>
    </>
  );
};

export default DataTable;
