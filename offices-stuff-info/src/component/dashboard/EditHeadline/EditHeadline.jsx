import { useForm } from "react-hook-form";
import { useUpdateHeadlineMutation } from "../../../redux/features/allApis/headlineApi/headlineApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";

const EditHeadline = ({ id }) => {
  const [updateHeadline] = useUpdateHeadlineMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const headlineInfo = { id, data };
    console.log(headlineInfo);
    try {
      setLoading(true);
      const result = await updateHeadline(headlineInfo);
      if (result.data.modifiedCount > 0) {
        addToast("Edited successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };
  return (
    <div className="headlineAreaInput mb-4">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-2">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            className="form-control"
            id="Title"
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            className="form-control"
            id="headline"
            {...register("headline", {
              required: "Headline is required",
            })}
            placeholder="Headline"
          />
          {errors.headline && (
            <p className="error-message">{errors.headline.message}</p>
          )}
        </div>

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Submitting..." : "Submit Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditHeadline;
