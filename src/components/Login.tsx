import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import Axios, { AxiosError } from "axios";

const Login = () => {
//   const { user, dispatch } = useUserContext();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const errorStyle = {

  //     color: 'red',
  //     fontSize: '15px',
  //  }

  // let userSchema = object({

  //     email: string().email().required(),
  //     password: string().required(),

  // }).required();

  // const { register, handleSubmit, watch, formState: {errors, isSubmitting} } = useForm({
  //     resolver: yupResolver(userSchema),
  //     defaultValues: {
  //         email: "",
  //         password: "",
  //     }
  // });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/user/login",
          {
            email,
            password,
          }
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
