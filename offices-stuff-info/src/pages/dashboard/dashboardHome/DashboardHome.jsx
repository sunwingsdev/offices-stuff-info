import { useContext, useEffect, useState } from "react";
import Loader from "../../../component/shared/Loader";
import { useGetAllDataQuery } from "../../../redux/features/allApis/dataApi/dataApi";
import "./DashboardHome.css";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import moment from "moment";
import {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} from "../../../redux/features/allApis/usersApi/usersApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const { data, isLoading } = useGetAllDataQuery();
  const { data: loggedUser, isLoading: loggedUserLoading } =
    useGetSingleUserQuery(user?.uid);

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

  const renderDataBox = (title, data, consultant = "") => (
    <div className="mainDashboardBox" key={`${title}-${consultant.uid}`}>
      <h3 className="dashboardHeading">{`${title} - ${consultant.name}`}</h3>
      <div className="dashboardBox_1 border_rightBox_1">
        <div className="singleBox_D">
          <h3 className="text_Box">Land-phone</h3>
          <div className="singleBox_D_two">
            <div className="singleBox_F IncomingIcon_Box">
              <VscCallIncoming />
              <h2 className="D_28">
                <span>
                  {/* <Link
                    to={`${
                      loggedUser?.role === "admin"
                        ? "/dashboard/data-table"
                        : "/dashboard/my-data-table"
                    }`}
                  > */}
                  {
                    data.filter(
                      (item) =>
                        item.platform === "landphone" &&
                        item.callMethod === "incoming" &&
                        item.consultantUid === consultant?.uid
                    ).length
                  }
                  {/* </Link> */}
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
                        item.consultantUid === consultant?.uid
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
  const renderTotalDataBox = (title, data) => (
    <div className="mainDashboardBox" key={`${title}`}>
      <h3 className="dashboardHeading">{`${title}`}</h3>
      <div className="dashboardBox_1 border_rightBox_1">
        <div className="singleBox_D">
          <h3 className="text_Box">Land-phone</h3>
          <div className="singleBox_D_two">
            <div className="singleBox_F IncomingIcon_Box">
              <VscCallIncoming />
              <h2 className="D_28">
                <span>
                  <Link
                    to={`${
                      loggedUser?.role === "admin"
                        ? "/dashboard/data-table"
                        : "/dashboard/my-data-table"
                    }`}
                  >
                    {
                      data.filter(
                        (item) =>
                          item.platform === "landphone" &&
                          item.callMethod === "incoming"
                      ).length
                    }
                  </Link>
                </span>
              </h2>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_F Outgoing_Box">
              <VscCallOutgoing />
              <h2 className="D_28">
                <span>
                  <Link
                    to={`${
                      loggedUser?.role === "admin"
                        ? "/dashboard/data-table"
                        : "/dashboard/my-data-table"
                    }`}
                  >
                    {
                      data.filter(
                        (item) =>
                          item.platform === "landphone" &&
                          item.callMethod === "outgoing"
                      ).length
                    }
                  </Link>
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
                  <Link
                    to={`${
                      loggedUser?.role === "admin"
                        ? "/dashboard/data-table"
                        : "/dashboard/my-data-table"
                    }`}
                  >
                    {
                      data.filter(
                        (item) =>
                          item.platform === "whatsapp" &&
                          item.callMethod === "incoming"
                      ).length
                    }
                  </Link>
                </span>
              </h2>
            </div>
            <div className="Layer_D_Border"></div>
            <div className="singleBox_F Outgoing_Box">
              <VscCallOutgoing />
              <h2 className="D_28">
                <span>
                  <Link
                    to={`${
                      loggedUser?.role === "admin"
                        ? "/dashboard/data-table"
                        : "/dashboard/my-data-table"
                    }`}
                  >
                    {
                      data.filter(
                        (item) =>
                          item.platform === "whatsapp" &&
                          item.callMethod === "outgoing"
                      ).length
                    }
                  </Link>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading || usersLoading || loggedUserLoading || loading) {
    return <Loader />;
  }

  const consultants = users?.filter((user) => user.role === "consultant");

  return (
    <div className="">
      <div className="dashboardHomeMainContain">
        <div className="dashboardHomeMainContain_box_2">
          {renderTotalDataBox("Today", todayData)}
          {renderTotalDataBox("Last Month", lastMonthData)}
        </div>
        {consultants.map((consultant) => (
          <div className="dashboardHomeMainContain_box_2" key={consultant.uid}>
            {renderDataBox("Today", todayData, consultant)}
            {renderDataBox("Last Month", lastMonthData, consultant)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
