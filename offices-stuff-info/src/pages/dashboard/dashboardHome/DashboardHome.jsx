import "./DashboardHome.css";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";

const DashboardHome = () => {
  return (
    <div className="">
      <div className="dashboardHomeMainContain">
        {/* single Box */}
        <div className="mainDashboardBox">
          <h2 className="dashboardHeading">Today</h2>
          <div className="dashboardBox_1 border_rightBox_1">
            <div className="singleBox_D">
              <h2 className="text_Box">WhatsApp</h2>
              <div className="singleBox_D_two">
                <div className="singleBox_F IncomingIcon_Box">
                  <VscCallIncoming />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
                <div className="Layer_D_Border"></div>
                <div className="singleBox_F Outgoing_Box">
                  <VscCallOutgoing />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_D">
              <h2 className="text_Box">LandPhone</h2>
              <div className="singleBox_D_two">
                <div className="singleBox_F IncomingIcon_Box">
                  <VscCallIncoming />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
                <div className="Layer_D_Border"></div>
                <div className="singleBox_F Outgoing_Box">
                  <VscCallOutgoing />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* single Box */}
        <div className="mainDashboardBox">
          <h2 className="dashboardHeading">Last Month</h2>
          <div className="dashboardBox_1 border_rightBox_2">
            <div className="singleBox_D">
              <h2 className="text_Box">WhatsApp</h2>
              <div className="singleBox_D_two">
                <div className="singleBox_F IncomingIcon_Box">
                  <VscCallIncoming />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
                <div className="Layer_D_Border"></div>
                <div className="singleBox_F Outgoing_Box">
                  <VscCallOutgoing />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_D">
              <h2 className="text_Box">LandPhone</h2>
              <div className="singleBox_D_two">
                <div className="singleBox_F IncomingIcon_Box">
                  <VscCallIncoming />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
                <div className="Layer_D_Border"></div>
                <div className="singleBox_F Outgoing_Box">
                  <VscCallOutgoing />
                  <h2 className="D_28">
                    <span>210</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
