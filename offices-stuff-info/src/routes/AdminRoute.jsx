import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../component/shared/Loader";
import { useGetSingleUserQuery } from "../redux/features/allApis/usersApi/usersApi";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { data: loggedUser } = useGetSingleUserQuery(user?.uid);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user && loggedUser?.role === "admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
