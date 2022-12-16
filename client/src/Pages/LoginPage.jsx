import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    const login = {
      username: data.username,
      password: data.password,
    };
    console.log(data);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("successfully logged in", data);
        localStorage.setItem("currUser", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/accounts");
      } else {
        //console.log("error:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.log("error:", "handlelogin error");
    }
  };

  return (
    <div className="login-page container-fluid d-flex flex-column min-vh-100 align-items-center justify-content-center">

      <motion.form
      initial={{y: "-100vh"}}
      animate={{x: 0, y: 0}}
      transition={{delay: 0.5, duration: 1.5, type: "spring", stiffness: 150 }}
        className="d-flex flex-column align-items-end"
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
      >
        <label className=" mb-3 d-flex gap-2 ">
          Username
          <input type="text" name="name" required {...register("username")} />
        </label>
        <label className=" mb-3 d-flex gap-2 ">
          Password
          <input
            type="password"
            name="password"
            required
            {...register("password")}
          />
        </label>
        <div className="mb-3 d-flex gap-2 align-items-baseline">
          {!error ? <></> : <p className="text-danger">{error}</p>}
          <button className="btn btn-dark">Login</button>
        </div>
      </motion.form>
    </div>
  );
}

export default LoginPage;
