import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { toast } from "react-toastify";
import Axios from "axios";

import { useEffect, useState } from "react";

interface userData {
  email: string;
  username: string;
  password: string;
}

const Register = () => {
  const { dispatch } = useUserContext();

  const navigate = useNavigate();

  // const errorStyle = {

  //     color: 'red',
  //     fontSize: '15px',
  //  }

  // let userSchema = object({

  //     email: string().email().required(),
  //     username: string().required(),
  //     password: string().required(),

  // }).required();

  // const { register, handleSubmit, watch, formState: { errors } } = useForm({
  //     resolver: yupResolver(userSchema)
  // });

  // const onSubmit = (data: any) => {

  //   registerUser(data);

  //   navigate('/');

  // }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (email && username && password) {
      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/user/register",
          {
            email,
            username,
            password,
          }
        );

        const result = response.data;

        dispatch({ type: "SIGNUP", payload: result });
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

  return (
    <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center" }}>Register</h3>

      <section className="input-section">
        <label htmlFor="email">Email</label>
        {/* <input {...register("email")} type="email" id="email" placeholder="Enter your email"/>
                <p style={errorStyle}> {errors.email?.message as string} </p> */}
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </section>

      <section className="input-section">
        <label htmlFor="password">Password</label>
        {/* <input {...register("password")} type="password" id="password" placeholder="Enter your Password"/>
                <p style={errorStyle}> {errors.password?.message as  string} </p> */}
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
