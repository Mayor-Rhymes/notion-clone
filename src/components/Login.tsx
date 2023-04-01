import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

interface LoginState {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (loginState.email && loginState.password) {
      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/user/login",
          loginState
        );

        const result = response.data;

        localStorage.setItem("user", JSON.stringify(result));
        console.log("Login successful");
        toast.success(`Login was successful`, {
          className: "success-message",
        });

        navigate("/");
      } catch (err) {
        toast.error("Login Failed", {
          className: "error-message",
        });

        console.log(err);
      }
    }
  };

  const handleChange = (key: string, value: string) => {
    setLoginState({ ...loginState, [key]: value });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <section className="input-section">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          name="email"
          value={loginState.email}
          onChange={(event) => handleChange("email", event.target.value)}
          required={true}
        />
      </section>

      <section className="input-section">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={loginState.password}
          onChange={(event) => handleChange("password", event.target.value)}
          required={true}
        />
      </section>

      <button type="submit" className="register-button">
        Login
      </button>

      <p>
        Don't have account? <Link to="/register">Signup</Link>
      </p>
    </form>
  );
};

export default Login;
