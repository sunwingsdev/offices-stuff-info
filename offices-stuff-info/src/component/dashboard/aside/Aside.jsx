import { useContext, useState } from "react";
import "./Aside.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaAffiliatetheme,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useToasts } from "react-toast-notifications";
import { useGetAllLogosQuery } from "../../../redux/features/allApis/logoApi/logoApi";
import { useGetSingleUserQuery } from "../../../redux/features/allApis/usersApi/usersApi";
import Loader from "../../shared/Loader";

const Aside = () => {
  const { logOut, user, loading } = useContext(AuthContext);
  const { data: loggedUser } = useGetSingleUserQuery(user?.uid);
  const { data } = useGetAllLogosQuery();
  const selectedLogo = data?.find((logo) => logo.isSelected === true);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const { addToast } = useToasts();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        addToast("Successfully Logged Out!", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const isActive = (path) => location.pathname === path;

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="aside-container">
      <button className="mobile-menu-toggle " onClick={toggleMobileMenu}>
        {mobileMenuVisible ? (
          <FaTimes className={`${mobileMenuVisible && "closeButton"}`} />
        ) : (
          <FaBars />
        )}
      </button>
      <div
        className={`aside ${mobileMenuVisible ? "mobile-menu-visible" : ""}`}
      >
        <div className="dashboardLogoImg">
          <Link to="/">
            <img src={selectedLogo?.logoUrl} alt="Dashboard Logo" />
          </Link>
        </div>
        <h2 className="DBText">Dashboard</h2>
        <ul className="dashboardMenu">
          <NavLink
            to="/dashboard"
            className={() => (isActive("/dashboard") ? "tabActive" : "")}
          >
            <li>
              <FaHome />
              Home
            </li>
          </NavLink>
          {loggedUser?.role === "admin" && (
            <NavLink
              to="/dashboard/users"
              className={() =>
                isActive("/dashboard/users") ? "tabActive" : ""
              }
            >
              <li>
                <FaUser />
                Users
              </li>
            </NavLink>
          )}
          {loggedUser?.role === "admin" && (
            <NavLink
              to="/dashboard/logo"
              className={() => (isActive("/dashboard/logo") ? "tabActive" : "")}
            >
              <li>
                <FaAffiliatetheme />
                Logo
              </li>
            </NavLink>
          )}
          {loggedUser?.role === "admin" && (
            <NavLink
              to="/dashboard/headline"
              className={() =>
                isActive("/dashboard/headline") ? "tabActive" : ""
              }
            >
              <li>Headline</li>
            </NavLink>
          )}
          {loggedUser?.role === "admin" && (
            <NavLink
              to="/dashboard/edit-home"
              className={() =>
                isActive("/dashboard/edit-home") ? "tabActive" : ""
              }
            >
              <li>Edit Home</li>
            </NavLink>
          )}
          <NavLink
            to="/dashboard/data-input"
            className={() =>
              isActive("/dashboard/data-input") ? "tabActive" : ""
            }
          >
            <li>Data Input</li>
          </NavLink>
          <NavLink
            to="/dashboard/my-data-table"
            className={() =>
              isActive("/dashboard/my-data-table") ? "tabActive" : ""
            }
          >
            <li>My Data Table</li>
          </NavLink>
          {loggedUser?.role === "admin" && (
            <NavLink
              to="/dashboard/data-table"
              className={() =>
                isActive("/dashboard/data-table") ? "tabActive" : ""
              }
            >
              <li>Data Table</li>
            </NavLink>
          )}
          <li className="bSubMenu" onClick={handleLogout}>
            <div className="d-flex align-items-center gap-2">Log out</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
