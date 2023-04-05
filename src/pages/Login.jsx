import React from "react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // let auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, user } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    try{
        await logIn(email, password);
        navigate("/")
        alert("login successfully")
    }catch(err){
        alert(err)
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit}>
        <h2>Login to Recipe App</h2>
        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



