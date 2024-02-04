import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character, and one number.";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.userName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
    } else if (!user.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
        password: "Password is required",
      }));
    } else if (errors.password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
        password: "",
      }));

      console.log("hi");
      navigate("/SeatBook");
    }
  };

  return (
    <div  className="App">
      <h1>Login Page</h1>
      {errors.username && <div className="error">{errors.username}</div>}
      {errors.password && (
        <div className="error" style={{ color: "red" }}>
          {errors.password}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="userName"
          id="username"
          placeholder="Enter a Username"
          value={user.userName}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter a Password"
          value={user.password}
          onChange={handleInputChange}
          required
        //   style={{ color: errors.password ? "red" : "" }}
        />
        <br />
        <button className="login" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
