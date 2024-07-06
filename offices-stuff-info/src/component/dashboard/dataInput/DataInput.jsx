import { useForm } from "react-hook-form";
import "./DataInput.css";
import { useAddDataMutation } from "../../../redux/features/allApis/dataApi/dataApi";
import { useToasts } from "react-toast-notifications";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const DataInput = () => {
  const { user } = useContext(AuthContext);
  const [addData] = useAddDataMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { addToast } = useToasts();
  const onSubmit = async (data) => {
    const dataInfo = {
      ...data,
      consultant: user?.displayName,
      consultantEmail: user?.email,
      consultantUid: user?.uid,
    };

    try {
      setLoading(true);
      const result = await addData(dataInfo);
      if (result.data.insertedId) {
        addToast("Data added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        reset(); // Reset the form after successful submission
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="dataInputText">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <select
          className="form__input mb-4"
          aria-label="Default select example"
          {...register("platform")}
        >
          <option selected value="landphone">
            Land-phone
          </option>
          <option value="whatsapp">Whatsapp</option>
        </select>
        <select
          className="form__input mb-4"
          aria-label="Default select example"
          {...register("callMethod")}
        >
          <option selected value="incoming">
            Incoming
          </option>
          <option value="outgoing">Outgoing</option>
        </select>
        <input
          type="text"
          placeholder="NAME"
          className="form__input"
          id="name"
          {...register("name", { required: true })}
        />
        <label htmlFor="name" className="form__label">
          Name *
        </label>
        {errors.name && <span className="error">This field is required</span>}
        <input
          type="text"
          placeholder="NAME"
          className="form__input"
          id="phone"
          {...register("phone", { required: true })}
        />
        <label htmlFor="phone" className="form__label">
          Phone *
        </label>
        {errors.phone && <span className="error">This field is required</span>}

        <input
          type="text"
          placeholder="Whatsapp Number"
          className="form__input"
          id="whatsappNumber"
          {...register("whatsappNumber", {
            required: "This field is required",
            pattern: {
              value: /^\+\d+$/,
              message: "Please enter a whatsapp number with country code",
            },
          })}
        />
        <label htmlFor="whatsappNumber" className="form__label">
          Whatsapp Number *
        </label>
        {errors.whatsappNumber && (
          <span className="error">{errors.whatsappNumber.message}</span>
        )}

        <textarea
          placeholder="Comments"
          className="form__input"
          id="comments"
          {...register("comments", { required: true })}
        />
        <label htmlFor="comments" className="form__label">
          Comments *
        </label>
        {errors.comments && (
          <span className="error">This field is required</span>
        )}

        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DataInput;
