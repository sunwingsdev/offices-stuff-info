import { useEffect, useState } from "react";
import Loader from "../../../component/shared/Loader";
import { useGetAllDataQuery } from "../../../redux/features/allApis/dataApi/dataApi";
import "./DashboardHome.css";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import moment from "moment";
import { useGetAllUsersQuery } from "../../../redux/features/allApis/usersApi/usersApi";

const DashboardHome = () => {
  const { data, isLoading } = useGetAllDataQuery();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();
  const [todayData, setTodayData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);

  useEffect(() => {
    if (data) {
      const today = moment().format("MMM D, YYYY");
      const startOfLastMonth = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("MMM D, YYYY");
      const endOfLastMonth = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("MMM D, YYYY");

      const todayData = data.filter(
        (item) => moment(item.createdAt).format("MMM D, YYYY") === today
      );
      const lastMonthData = data.filter((item) => {
        const date = moment(item.createdAt).format("MMM D, YYYY");
        return date >= startOfLastMonth && date <= endOfLastMonth;
      });

      setTodayData(todayData);
      setLastMonthData(lastMonthData);
    }
  }, [data]);

  const renderDataBox = (title, data, consultant) => (
    <div className="mainDashboardBox" key={`${title}-${consultant.uid}`}>
      <h2 className="dashboardHeading">{`${title} - ${consultant.name}`}</h2>
      <div className="dashboardBox_1 border_rightBox_1">
        <div className="singleBox_D">
          <h2 className="text_Box">LandPhone</h2>
          <div className="singleBox_D_two">
            <div className="singleBox_F IncomingIcon_Box">
              <VscCallIncoming />
              <h2 className="D_28">
                <span>
                  {
                    data.filter(
                      (item) =>
                        item.platform === "landphone" &&
                        item.callMethod === "incoming" &&
                        item.consultantUid === consultant.uid
                    ).length
                  }
                </span>
              </h2>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_F Outgoing_Box">
              <VscCallOutgoing />
              <h2 className="D_28">
                <span>
                  {
                    data.filter(
                      (item) =>
                        item.platform === "landphone" &&
                        item.callMethod === "outgoing" &&
                        item.consultantUid === consultant.uid
                    ).length
                  }
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="Layer_D_Border"></div>
        <div className="singleBox_D">
          <h2 className="text_Box">WhatsApp</h2>
          <div className="singleBox_D_two">
            <div className="singleBox_F IncomingIcon_Box">
              <VscCallIncoming />
              <h2 className="D_28">
                <span>
                  {
                    data.filter(
                      (item) =>
                        item.platform === "whatsapp" &&
                        item.callMethod === "incoming" &&
                        item.consultantUid === consultant.uid
                    ).length
                  }
                </span>
              </h2>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_F Outgoing_Box">
              <VscCallOutgoing />
              <h2 className="D_28">
                <span>
                  {
                    data.filter(
                      (item) =>
                        item.platform === "whatsapp" &&
                        item.callMethod === "outgoing" &&
                        item.consultantUid === consultant.uid
                    ).length
                  }
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading || usersLoading) {
    return <Loader />;
  }

  const consultants = users?.filter((user) => user.role === "consultant");

  return (
    <div className="">
      <div className="dashboardHomeMainContain">
        {consultants.map((consultant) => (
          <div
            className="d-flex justify-content-start align-items-center gap-5"
            key={consultant.uid}
          >
            {renderDataBox("Today", todayData, consultant)}
            {renderDataBox("Last Month", lastMonthData, consultant)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
