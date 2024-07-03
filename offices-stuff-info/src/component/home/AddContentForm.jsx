import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAddContentMutation } from "../../redux/features/allApis/homeContentsApi.js/homeContentsApi";
import { useToasts } from "react-toast-notifications";

const AddContentForm = ({ card, handleClose }) => {
  const [addContent] = useAddContentMutation();
  const [option, setOption] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [currentDetail, setCurrentDetail] = useState("");
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (detailsList.length !== 0) {
      data.detailsList = detailsList;
    }
    try {
      const result = await addContent(data);
      if (result.data.insertedId) {
        handleClose();
        addToast("Content added", { appearance: "success", autoDismiss: true });
      }
    } catch (error) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  const handleAddDetail = () => {
    if (currentDetail.trim()) {
      setDetailsList([...detailsList, currentDetail]);
      setCurrentDetail("");
    }
  };

  const handleRemoveDetail = (index) => {
    setDetailsList(detailsList.filter((_, i) => i !== index));
  };

  return (
    <div className="editHomeArea_1">
      <h2 className="mt-2 mb-4">Add form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Select
          {...register("option", { required: true })}
          onChange={(e) => setOption(e.target.value)}
          aria-label="Default select example"
        >
          <option value="" selected disabled>
            Open this select menu
          </option>
          {card === "account-create" && (
            <option value="account-create">কিভাবে একাউন্ট খুলবেন?</option>
          )}
          {card === "account-create-procedure" && (
            <option value="account-create-procedure">
              একাউন্ট খোলার প্রসিডিউর
            </option>
          )}
          {card === "agent-list" && (
            <option value="agent-list">এজেন্ট লিস্টঃ</option>
          )}
          {card === "complaint-agent" && (
            <option value="complaint-agent">এজেন্ট এর বিরুদ্ধে অভিযোগ</option>
          )}
          {card === "transaction-procedure" && (
            <option value="transaction-procedure">ট্রান্সাকশন প্রসিডিউর</option>
          )}
          {card === "social-links" && (
            <option value="social-links">সোসিয়াল লিংক</option>
          )}
        </Form.Select>
        {errors.option && <p className="text-danger">This field is required</p>}

        {(option === "account-create" ||
          option === "account-create-procedure" ||
          option === "complaint-agent" ||
          option === "transaction-procedure" ||
          option === "social-links" ||
          option === "agent-list") && (
          <>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Title"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Leave a comment here"
                {...register("title", { required: true })}
              />
            </FloatingLabel>
            {errors.title && (
              <p className="text-danger">This field is required</p>
            )}

            <FloatingLabel
              controlId="floatingTextarea2"
              label="Details"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                {...register("details", { required: true })}
              />
            </FloatingLabel>
            {errors.details && (
              <p className="text-danger">This field is required</p>
            )}
            {
              option === "social-links" && (
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="link"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Leave a comment here"
                    {...register("link", { required: true })}
                  />
                </FloatingLabel>
              )
              // {errors.title && (
              //   <p className="text-danger">This field is required</p>
              // )}
            }

            {(option === "complaint-agent" ||
              option === "transaction-procedure" ||
              option === "account-create-procedure") && (
              <div className="mb-2 d-flex">
                <Form.Control
                  type="text"
                  placeholder="Add details here"
                  value={currentDetail}
                  onChange={(e) => setCurrentDetail(e.target.value)}
                />
                <Button
                  variant="secondary"
                  onClick={handleAddDetail}
                  className="ms-2"
                >
                  Add
                </Button>
              </div>
            )}
            {detailsList.length > 0 && (
              <ul className="list-group mb-2">
                {detailsList.map((detail, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {detail}
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveDetail(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <Button type="submit" variant="primary" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddContentForm;
