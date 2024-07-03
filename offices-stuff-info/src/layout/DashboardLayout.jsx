import { Outlet } from "react-router-dom";
import Aside from "../component/dashboard/aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="container-fluid">
      <div className="dashboardMainArea">
        <Aside />
        <div className="dashboard_Main_contain">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
