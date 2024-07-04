import { useContext, useState } from "react";
import "./Aside.css";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaAffiliatetheme,
  FaMinus,
  FaPlus,
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
  const [menuCollapsed, setMenuCollapsed] = useState({
    theme: true,
    homeContents: true,
  });
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const { addToast } = useToasts();

  const toggleMenu = (menu) => {
    setMenuCollapsed((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

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
  
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="aside-container">
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {mobileMenuVisible ? <FaTimes /> : <FaBars />}
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
          <Link to="/dashboard">
            <li className="">
              <FaHome />
              Home
            </li>
          </Link>
          {loggedUser?.role === "admin" && (
            <NavLink
              className={({ isActive }) => `${isActive && "tabActive"}`}
              to="/dashboard/users"
            >
              <li>
                <FaUser />
                User
              </li>
            </NavLink>
          )}
          {loggedUser?.role === "admin" && (
            <li className="bSubMenu" onClick={() => toggleMenu("theme")}>
              <div className="d-flex align-items-center gap-2">
                <FaAffiliatetheme />
                Theme
              </div>
              <div>{menuCollapsed.theme ? <FaPlus /> : <FaMinus />}</div>
            </li>
          )}

          {loggedUser?.role === "admin" && !menuCollapsed.theme && (
            <ul
              className={`dashboardSubMenu ${
                menuCollapsed.theme ? "" : "expanded"
              }`}
            >
              <NavLink
                className={({ isActive }) => ` ${isActive && "tabActive"}`}
                to="/dashboard/logo"
              >
                <li>▪ Logo</li>
              </NavLink>
            </ul>
          )}
          <li className="bSubMenu" onClick={() => toggleMenu("homeContents")}>
            <div className="d-flex align-items-center gap-2">Home Contents</div>
            {menuCollapsed.homeContents ? <FaPlus /> : <FaMinus />}
          </li>
          {!menuCollapsed.homeContents && (
            <ul
              className={`dashboardSubMenu ${
                menuCollapsed.homeContents ? "" : "expanded"
              }`}
            >
              {loggedUser?.role === "admin" && (
                <NavLink
                  className={({ isActive }) => ` ${isActive && "tabActive"}`}
                  to="/dashboard/headline"
                >
                  <li>▪ Headline</li>
                </NavLink>
              )}
              {loggedUser?.role === "admin" && (
                <NavLink
                  className={({ isActive }) => ` ${isActive && "tabActive"}`}
                  to="/dashboard/edit-home"
                >
                  <li>▪ Edit Home</li>
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) => ` ${isActive && "tabActive"}`}
                to="/dashboard/data-input"
              >
                <li>▪ Data Input</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => ` ${isActive && "tabActive"}`}
                to="/dashboard/my-data-table"
              >
                <li>▪ My Data Table</li>
              </NavLink>
              {loggedUser?.role === "admin" && (
                <NavLink
                  className={({ isActive }) => ` ${isActive && "tabActive"}`}
                  to="/dashboard/data-table"
                >
                  <li>▪ Data Table</li>
                </NavLink>
              )}
            </ul>
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
