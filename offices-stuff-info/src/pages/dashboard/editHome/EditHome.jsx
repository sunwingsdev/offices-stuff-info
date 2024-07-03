/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import "./EditHome.css";
import { FaFacebookSquare, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import SimpleModal from "../../../component/shared/SimpleModal";
import AccountCreateForm from "../../../component/home/AccountCreateForm";
import AccountCreateProcedureForm from "../../../component/home/AccountCreateProcedureForm";
import AgentListForm from "../../../component/home/AgentListForm";
import SocialLinksForm from "../../../component/home/SocialLinksForm";
import TransactionProcedureForm from "../../../component/home/TransactionProcedureForm";
import ComplaintAgentForm from "../../../component/home/ComplaintAgentForm";
import { Button } from "react-bootstrap";
import AddContentForm from "../../../component/home/AddContentForm";
import { useGetAllContentsQuery } from "../../../redux/features/allApis/homeContentsApi.js/homeContentsApi";

const EditHome = () => {
  const { data } = useGetAllContentsQuery();
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);

  const handleEditModalOpen = (card) => {
    setCard(card);
    setShow(true);
  };

  const accountCreateData = data?.find(
    (singleContent) => singleContent.option === "account-create"
  );
  const accountCreateProcedureData = data?.find(
    (singleContent) => singleContent.option === "account-create-procedure"
  );
  const agentListData = data?.find(
    (singleContent) => singleContent.option === "agent-list"
  );
  const complaintAgentData = data?.find(
    (singleContent) => singleContent.option === "complaint-agent"
  );
  const transactionProcedureData = data?.find(
    (singleContent) => singleContent.option === "transaction-procedure"
  );
  const SocialLinksData = data?.find(
    (singleContent) => singleContent.option === "social-links"
  );

  const handleAddContentModal = (card) => {
    setCard(card);
    setAddModalShow(true);
  };

  return (
    <div className="editHomeArea">
      <div className="tabContain">
        {accountCreateData ? (
          <div className="tabContainItem mb-3">
            <h2 className="editText_20">{accountCreateData?.title}</h2>
            <div className="tabsingletext">
              <p className="editText_16">{accountCreateData?.details}</p>
            </div>

            <div
              onClick={() => handleEditModalOpen("account-create")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">একাউন্ট এর বিস্তারিত ফর্ম পূরন করুন</h2>
            <Button
              onClick={() => handleAddContentModal("account-create")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
        {accountCreateProcedureData ? (
          <div className="tabContainItem mb-3">
            <h2 className="editText_20">{accountCreateProcedureData?.title}</h2>
            <div className="tabsingletext">
              <p className="editText_16">
                {accountCreateProcedureData?.details}
              </p>
              {accountCreateProcedureData?.detailsList?.map((item) => (
                <p key={item} className="mt-4 mt-lg-5">
                  {item}
                </p>
              ))}
            </div>

            <div
              onClick={() => handleEditModalOpen("account-create-procedure")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">
              কিভাবে একাউন্ট খুলবেন? তার বিস্তারিত ফর্ম পূরন করুন
            </h2>
            <Button
              onClick={() => handleAddContentModal("account-create-procedure")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
        {agentListData ? (
          <div className="tabContainItem mb-3">
            <h2 className="editText_20">{agentListData?.title}​</h2>
            <div className="tabsingletext">
              <p className="editText_16">{agentListData?.details}</p>
            </div>

            <div
              onClick={() => handleEditModalOpen("agent-list")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">
              এজেন্ট লিস্ট অ্যাড করতে ফর্ম পূরন করুন
            </h2>
            <Button
              onClick={() => handleAddContentModal("agent-list")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
        {complaintAgentData ? (
          <div className="tabContainItem mb-3">
            <h2 className="editText_20">{complaintAgentData?.title}​</h2>
            <div className="tabsingletext">
              <p className="editText_16">{complaintAgentData?.details}</p>
              {complaintAgentData?.detailsList.map((item) => (
                <p key={item} className="mt-4 mt-lg-5 editText_16">
                  {item}
                </p>
              ))}
            </div>

            <div
              onClick={() => handleEditModalOpen("complaint-agent")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">
              এজেন্ট এর বিরুদ্ধে অভিযোগ বিস্তারিত ফর্ম পূরন করুন
            </h2>
            <Button
              onClick={() => handleAddContentModal("complaint-agent")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
        {transactionProcedureData ? (
          <div className="tabContainItem mb-3">
            <h2 className="editText_20">{transactionProcedureData?.title}​</h2>
            <div className="tabsingletext">
              <p className="editText_16">{transactionProcedureData?.details}</p>
              {transactionProcedureData?.detailsList.map((item) => (
                <p key={item} className="mt-4 editText_16">
                  {item}
                </p>
              ))}
            </div>

            <div
              onClick={() => handleEditModalOpen("transaction-procedure")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">
              ট্রান্স্যাকসন সম্পর্কে বিস্তারিত ফর্ম পূরন করুন
            </h2>
            <Button
              onClick={() => handleAddContentModal("transaction-procedure")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
        {SocialLinksData ? (
          <div className="tabContainItem mb-3 tabContainItemBox">
            <div className="tabMarqueText">
              <Typewriter
                words={SocialLinksData?.title.split(" ")}
                loop={0}
                cursor={true}
                cursorColor="#ffdf6e"
              />
              <p className="editText_16">{SocialLinksData?.details}</p>
              <Link to={SocialLinksData?.link} className="facebookBtn">
                <FaFacebookSquare />
                FACEBOOK GROUP
              </Link>
              {/* <p className="editText_16">
                আপনার সকল জিজ্ঞাসা ও জানার বিষয়ে আমাদের গ্রুপে পোস্ট করুন। সকল
                এজেন্টদের থেকে আপনার পছন্দের এজেন্টকে বেছে নিন এবং নিরাপদে বেটিং
                করুন।
              </p> */}
            </div>

            <div
              onClick={() => handleEditModalOpen("social-links")}
              className="tabContainItem_Icon"
            >
              <FaRegEdit />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-2">
            <h2 className="editText_20">
              সোসিয়াল লিংক এর বিস্তারিত ফর্ম পূরন করুন
            </h2>
            <Button
              onClick={() => handleAddContentModal("social-links")}
              type="submit"
              variant="primary"
            >
              এখানে ক্লিক করুন
            </Button>
          </div>
        )}
      </div>
      <>
        {/* edit modals */}
        <SimpleModal
          show={show}
          handleClose={() => setShow(false)}
          handleShow={() => setShow(true)}
        >
          {card === "account-create" && (
            <AccountCreateForm
              data={accountCreateData}
              handleClose={() => setShow(false)}
            />
          )}
          {card === "agent-list" && (
            <AgentListForm
              data={agentListData}
              handleClose={() => setShow(false)}
            />
          )}
          {card === "account-create-procedure" && (
            <AccountCreateProcedureForm
              data={accountCreateProcedureData}
              handleClose={() => setShow(false)}
            />
          )}
          {card === "transaction-procedure" && (
            <TransactionProcedureForm
              data={transactionProcedureData}
              handleClose={() => setShow(false)}
            />
          )}
          {card === "complaint-agent" && (
            <ComplaintAgentForm
              data={complaintAgentData}
              handleClose={() => setShow(false)}
            />
          )}
          {card === "social-links" && (
            <SocialLinksForm
              data={SocialLinksData}
              handleClose={() => setShow(false)}
            />
          )}
        </SimpleModal>
      </>
      <>
        <SimpleModal
          show={addModalShow}
          handleClose={() => setAddModalShow(false)}
          handleShow={() => setAddModalShow(true)}
        >
          <AddContentForm
            card={card}
            handleClose={() => setAddModalShow(false)}
          />
        </SimpleModal>
      </>
    </div>
  );
};

export default EditHome;
