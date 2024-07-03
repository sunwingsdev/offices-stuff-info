/* eslint-disable no-irregular-whitespace */
import "./navbarmenu.css";
import { Tab, Nav } from "react-bootstrap";
import { IoHome } from "react-icons/io5";
import {
  FaUserGraduate,
  FaUserTie,
  FaWhatsappSquare,
  FaFacebookSquare,
} from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";
import TabData from "../home/TabData";
import { useGetAllContentsQuery } from "../../redux/features/allApis/homeContentsApi.js/homeContentsApi";
import { useGetAllDataQuery } from "../../redux/features/allApis/dataApi/dataApi";
import Loader from "../shared/Loader";

AOS.init();

const NavbarMenu = () => {
  const { data: contents, isLoading: contentLoading } =
    useGetAllContentsQuery();
  const { data } = useGetAllDataQuery();
  const adminData = data?.filter((singleData) => singleData.role === "admin");
  const serviceData = data?.filter(
    (singleData) => singleData.role === "service"
  );
  const subAdminData = data?.filter(
    (singleData) => singleData.role === "sub-admin"
  );
  const masterData = data?.filter((singleData) => singleData.role === "master");
  const superAgentData = data?.filter(
    (singleData) => singleData.role === "super-agent-list"
  );

  const accountCreateData = contents?.find(
    (singleContent) => singleContent.option === "account-create"
  );
  const accountCreateProcedureData = contents?.find(
    (singleContent) => singleContent.option === "account-create-procedure"
  );
  const agentListData = contents?.find(
    (singleContent) => singleContent.option === "agent-list"
  );
  const complaintAgentData = contents?.find(
    (singleContent) => singleContent.option === "complaint-agent"
  );
  const transactionProcedureData = contents?.find(
    (singleContent) => singleContent.option === "transaction-procedure"
  );
  const SocialLinksData = contents?.find(
    (singleContent) => singleContent.option === "social-links"
  );

  // filtered quick master agent
  const quickMasterData = data?.find(
    (singleData) => singleData.role === "quickContact"
  );

  if (contentLoading) {
    return <Loader />;
  }

  return (
    <div className="tabsArea">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div className="tabsMenuItemBox">
          <Nav.Link eventKey="first" className="tabsBox_1">
            <IoHome className="tabsIcon" />
            Home
          </Nav.Link>
          <Nav.Link eventKey="second" className="tabsBox_1">
            <FaUserGraduate className="tabsIcon" />
            Admin
          </Nav.Link>
          <Nav.Link eventKey="third" className="tabsBox_1">
            <FaUserGraduate className="tabsIcon" />
            Sub Admin
          </Nav.Link>
          <Nav.Link eventKey="four" className="tabsBox_1">
            <FaUserTie className="tabsIcon" />
            Super
          </Nav.Link>
          <Nav.Link eventKey="five" className="tabsBox_1">
            <FaUserTie className="tabsIcon" />
            Master
          </Nav.Link>
          <Nav.Link eventKey="six" className="tabsBox_1">
            <RiCustomerService2Line className="tabsIcon" />
            Service
          </Nav.Link>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="first">
            <div className="tabContain" data-aos="fade-up">
              <div className="tabContainItem">
                <h2>QUICK MASTER AGENT</h2>
                <div className="tabMaster">
                  <h3>MASTER</h3>
                  <span>{quickMasterData?.id}</span>
                  <Link to={`http://wa.me/${quickMasterData?.number}`}>
                    <FaWhatsappSquare className="whatsAppIcon" />
                  </Link>
                  <Link className="tabNumber">{quickMasterData?.number}</Link>
                </div>
              </div>
            </div>
            <div className="tabContain" data-aos="flip-left">
              {accountCreateData ? (
                <div className="tabContainItem">
                  <h2>{accountCreateData?.title}</h2>
                  <div className="tabsingletext">
                    <p>{accountCreateData?.details}</p>
                  </div>
                </div>
              ) : (
                <div className="tabContainItem">No data added</div>
              )}
            </div>
            <div className="tabContain" data-aos="flip-right">
              {accountCreateProcedureData ? (
                <div className="tabContainItem">
                  <h2>{accountCreateProcedureData?.title}</h2>
                  <div className="tabsingletext">
                    <p>{accountCreateProcedureData?.details}</p>
                  </div>
                </div>
              ) : (
                <div className="tabContainItem">No data added</div>
              )}
            </div>
            <div className="tabContain" data-aos="flip-up">
              {agentListData ? (
                <div className="tabContainItem">
                  <h2>{agentListData?.title}​</h2>
                  <div className="tabsingletext">
                    <p>{agentListData?.details}</p>
                  </div>
                </div>
              ) : (
                <div className="tabContainItem">No data added</div>
              )}
            </div>
            <div className="tabContain" data-aos="zoom-in">
              {complaintAgentData ? (
                <div className="tabContainItem">
                  <h2>{complaintAgentData?.title}​</h2>
                  <div className="tabsingletext">
                    <p>{complaintAgentData?.details}</p>
                    {complaintAgentData?.detailsList?.map((item) => (
                      <p key={item} className="mt-4 mt-lg-5">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="tabContainItem">No data added</div>
              )}
            </div>
            <div className="tabContain" data-aos="zoom-in">
              {transactionProcedureData ? (
                <div className="tabContainItem">
                  <h2>{transactionProcedureData?.title}​​</h2>
                  <div className="tabsingletext">
                    <p>{transactionProcedureData?.details}</p>
                    {transactionProcedureData?.detailsList?.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={"tabContainItem"}>No data added</div>
              )}
            </div>
            <div className="tabContain" data-aos="zoom-in-down">
              {SocialLinksData ? (
                <div className="tabContainItemImg">
                  <div className="tabMarqueText">
                    <Typewriter
                      words={SocialLinksData?.title.split(" ")}
                      loop={0}
                      cursor={true}
                      cursorColor="#ffdf6e"
                    />
                    <p>{SocialLinksData?.details}</p>
                    <Link
                      to={`${SocialLinksData?.link}`}
                      className="facebookBtn"
                    >
                      <FaFacebookSquare />
                      FACEBOOK GROUP
                    </Link>
                    {/* <p>
                      আপনার সকল জিজ্ঞাসা ও জানার বিষয়ে আমাদের গ্রুপে পোস্ট করুন।
                      সকল এজেন্টদের থেকে আপনার পছন্দের এজেন্টকে বেছে নিন এবং
                      নিরাপদে বেটিং করুন।
                    </p> */}
                  </div>
                </div>
              ) : (
                <div className="tabContainItem">No data added</div>
              )}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <TabData tableHeading={"ADMIN"} rows={adminData} />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <TabData tableHeading={"SUB ADMIN"} rows={subAdminData} />
          </Tab.Pane>
          <Tab.Pane eventKey="four">
            <TabData tableHeading={"SUPER AGENT LIST"} rows={superAgentData} />
          </Tab.Pane>
          <Tab.Pane eventKey="five">
            <TabData tableHeading={"MASTER"} rows={masterData} />
          </Tab.Pane>
          <Tab.Pane eventKey="six">
            <TabData tableHeading={"SERVICE"} rows={serviceData} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default NavbarMenu;
