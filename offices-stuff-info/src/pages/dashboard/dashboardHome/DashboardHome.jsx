import "./DashboardHome.css";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";

const DashboardHome = () => {
  return (
    <div className="">
      <h2 className="">Dashboard Home :-</h2>
      <div className="dashboardHomeMainContain">
        <div className="dashboardBox_1">
          <p>Vismo</p>
          <div className="Layer_D_box">
            <div className="">
              <VscCallIncoming />
              <h2 className="D_28">
                <span>210</span>
              </h2>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="">
              <VscCallOutgoing />
              <h2 className="D_28">
                <span>210</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="dashboardBox_1">
          <p>Vismo</p>
          <div className="Layer_D_box">
            <h2 className="D_28">
              <span>210</span>
            </h2>
            <h2 className="D_28">
              <span>210</span>
            </h2>
          </div>
        </div>
        <div className="dashboardBox_1">
          <p>Vismo</p>
          <div className="Layer_D_box">
            <h2 className="D_28">
              <span>210</span>
            </h2>
            <h2 className="D_28">
              <span>210</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
