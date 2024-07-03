/* eslint-disable react/prop-types */
import { Table } from "react-bootstrap";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../navbarMenu/navbarmenu.css";

const TabData = ({ tableHeading, rows }) => {
  return (
    <div className="tabContain_2">
      <div className="tabContainItem_2">
        <h2>{tableHeading}</h2>
        <form action="">
          {/* <input type="text" placeholder="Search.." /> */}
        </form>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center tableThBox">
                <th>TYPE</th>
                <th>ID</th>
                <th>PHONE APP LINK</th>
                <th>NUMBER</th>
                <th>COMPLAIN</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row) => (
                <tr key={row._id} className="text-center">
                  <td>{row?.type}</td>
                  <td>{row?.id}</td>
                  <td>
                    <Link to={`http://wa.me/${row?.number}`}>
                      <FaWhatsappSquare className="whatsAppIcon whatsAppIcon_2" />
                    </Link>
                  </td>
                  <td>{row?.number}</td>
                  <td>{row?.complain}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TabData;
