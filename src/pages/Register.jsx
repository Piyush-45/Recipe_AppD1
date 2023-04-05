import React from "react";
import { useState } from "react";
import { app } from "../../context/Firebase";
import { getAuth } from "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const{user, signUp} = UserAuth()
    let navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      alert(err);
    }
    //   console.log(email)
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit}>
        <h2>Rgister to Recipe App</h2>
        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <input
            type="email"
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
