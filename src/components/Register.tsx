
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";

import { useState } from "react";

interface userData {
  email: string;
  username: string;
  password: string;
}

const Register = () => {
  

  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState<userData>({
    email: "",
    username: "",
    password: "",
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (registerState.email && registerState.username && registerState.password) {
      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/user/register",
          registerState,
        );

        const result = response.data;

        localStorage.setItem("user", JSON.stringify(result));
        toast.success(`Signup was successful`, {
          className: "success-message",
        });
        navigate("/");
      } catch (err) {
        toast.error("Signup Failed!", {
          className: "error-message",
        });
      }
    }
  };

  const handleChange = (key: string, value: string) => {
    setRegisterState({ ...registerState, [key]: value });
  };

  return (
    <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center" }}>Register</h3>

      <section className="input-section">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          name="email"
          value={registerState.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </section>

      <section className="input-section">
        <label htmlFor="username">Username</label>
        {/* <input {...register("username")} type="text" id="username" placeholder="Enter your username"/>
                <p style={errorStyle}> {errors.username?.message as string} </p> */}
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          name="username"
          value={registerState.username}
          onChange={(event) => handleChange("username", event.target.value)}
        />
      </section>

      <section className="input-section">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={registerState.password}
          onChange={(event) => handleChange("password", event.target.value)}
        />
      </section>

      <button type="submit" className="register-button">
        Sign Up
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
