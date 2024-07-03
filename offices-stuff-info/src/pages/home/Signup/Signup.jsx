import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useAddUserMutation } from "../../../redux/features/allApis/usersApi/usersApi";
import { useToasts } from "react-toast-notifications";

const Signup = () => {
  const { createUser, setUser, updateUserProfile, user } =
    useContext(AuthContext);
  const [addUser] = useAddUserMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const { addToast } = useToasts();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    createUser(data?.email, data?.password)
      .then((result) => {
        updateUserProfile(data?.name)
          .then(() => {
            setUser({
              ...user,
              displayName: data.name,
            });
            const userInfo = {
              uid: result.user?.uid,
              name: data.name,
              email: data.email,
            };
            addUser(userInfo)
              .then((result) => {
                if (result.data.insertedId) {
                  addToast("User added successfully", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                  reset();
                  setLoading(false);
                }
              })
              .catch((error) => {
                addToast(error.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
              message:
                "Password must include at least one uppercase letter, one lowercase letter, and one number",
            },
          })}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || !passwordMatch || loading}
        className="submit-button"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {!passwordMatch && (
        <p className="error-message">Passwords do not match</p>
      )}
    </form>
  );
};

export default Signup;
