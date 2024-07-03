import { useForm } from "react-hook-form";
import "./Login.css"; // Assuming you have a CSS file for styling
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = ({ email, password }) => {
    setLoadingState(true);
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        reset();
        addToast(
          `${loggedUser?.displayName || "Unknown user"} logged in successfully`,
          {
            appearance: "success",
            autoDismiss: true,
          }
        );
        setLoadingState(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoadingState(false);
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="loginSection">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          <button disabled={loadingState} type="submit">
            {loadingState ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
