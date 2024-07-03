import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import {
  useGetAllDataQuery,
  useUpdateSingleDataMutation,
} from "../../../redux/features/allApis/dataApi/dataApi";

const EditData = ({ id }) => {
  const { data } = useGetAllDataQuery();
  const [updateSingleData] = useUpdateSingleDataMutation();
  const selectedData = data?.find((singleData) => singleData._id === id);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateSingleData({ _id: id, data });
      if (result.data.modifiedCount > 0) {
        addToast("Data edited successfully", {
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
    <div className="dataInputText">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <select
          className="form__input mb-4"
          aria-label="Default select example"
          {...register("role")}
          defaultValue={selectedData?.role}
        >
          <option value="admin">Admin</option>
          <option value="sub-admin">Sub Admin</option>
          <option value="super-agent-list">Super Agent List</option>
          <option value="master">Master</option>
          <option value="service">Service</option>
          <option value="quickContact">Quick Contact</option>
        </select>

        <input
          type="text"
          placeholder="TYPE"
          className="form__input"
          id="name"
          defaultValue={selectedData?.type}
          {...register("type", { required: true })}
        />
        <label htmlFor="name" className="form__label">
          Type
        </label>
        {errors.type && <span className="error">This field is required</span>}

        <input
          type="text"
          placeholder="Number"
          className="form__input"
          id="number"
          defaultValue={selectedData?.number}
          {...register("number", {
            required: "This field is required",
            pattern: {
              value: /^\+\d+$/,
              message: "Please enter a valid number with country code",
            },
          })}
        />
        <label htmlFor="number" className="form__label">
          Number
        </label>
        {errors.number && (
          <span className="error">{errors.number.message}</span>
        )}

        <textarea
          placeholder="Complain"
          className="form__input"
          id="complain"
          defaultValue={selectedData?.complain}
          {...register("complain", { required: true })}
        />
        <label htmlFor="complain" className="form__label">
          Complain
        </label>
        {errors.complain && (
          <span className="error">This field is required</span>
        )}

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Submitting..." : "Submit Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditData;
