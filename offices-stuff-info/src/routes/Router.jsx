import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import LogoDashboard from "../pages/dashboard/Logo/LogoDashboard";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import EditHome from "../pages/dashboard/editHome/EditHome";
import DataInput from "../component/dashboard/dataInput/DataInput";
import DataTable from "../pages/dashboard/dataTable/DataTable";
import Headline from "../pages/dashboard/headline/Headline";
import SignUp from "../pages/home/Signup/Signup";
import Login from "../pages/home/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/dashboard/users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "logo",
        element: <LogoDashboard />,
      },
      {
        path: "headline",
        element: <Headline />,
      },
      {
        path: "edit-home",
        element: <EditHome />,
      },
      {
        path: "data-input",
        element: <DataInput />,
      },
      {
        path: "data-table",
        element: <DataTable />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
