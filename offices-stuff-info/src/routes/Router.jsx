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
import MyDataTable from "../pages/dashboard/MyDataTable/MyDataTable";
import AdminRoute from "./AdminRoute";

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
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "logo",
        element: (
          <AdminRoute>
            <LogoDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "headline",
        element: (
          <AdminRoute>
            <Headline />
          </AdminRoute>
        ),
      },
      {
        path: "edit-home",
        element: (
          <AdminRoute>
            <EditHome />
          </AdminRoute>
        ),
      },
      {
        path: "data-input",
        element: <DataInput />,
      },
      {
        path: "data-table",
        element: (
          <AdminRoute>
            <DataTable />
          </AdminRoute>
        ),
      },
      {
        path: "my-data-table",
        element: <MyDataTable />,
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
