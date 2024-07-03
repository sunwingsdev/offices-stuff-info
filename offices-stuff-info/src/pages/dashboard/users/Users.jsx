import { Form, Table, Button } from "react-bootstrap";
import Loader from "../../../component/shared/Loader";
import {
  useDeleteAUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/allApis/usersApi/usersApi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import SimpleModal from "../../../component/shared/SimpleModal";
import ConfirmationModal from "../../../component/shared/ConfirmationModal";
import { useToasts } from "react-toast-notifications";

const Users = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [deleteAUser] = useDeleteAUserMutation();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const perPage = 5; // Number of items per page
  const { addToast } = useToasts();

  const handleDeleteModal = (id) => {
    setShow(true);
    setId(id);
  };

  // handle delete functionality
  const handleDelete = async () => {
    try {
      const result = await deleteAUser(id);
      if (result.data.deletedCount > 0) {
        addToast("Deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // Filtered users based on search term
  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Pagination calculations
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader />;
  }

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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <div className="D_DT_sortBy">
              <Form.Label>Sort By : </Form.Label>
              <Form.Group controlId="sortField">
                <Form.Control as="select">
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
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length !== 0 ? (
                  paginatedUsers.map(({ _id, name, email }) => (
                    <tr key={_id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        <RxCross2
                          size={30}
                          onClick={() => handleDeleteModal(_id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No matching users found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {filteredUsers.length > perPage && (
            <div className="pagination-buttons">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "primary" : "outline-primary"}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
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
  );
};

export default Users;
