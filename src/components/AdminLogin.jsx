import axios from "axios";
import React, { useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";


const AdminLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/admin`, {
        name: username,
        password,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/admin-dashboard"} />;
  return (
    <>
      <h3 className="p-3">Admin Login</h3>
      <form className="p-3" onSubmit={loginHandler}>
        <div className="mt-3">
          <label htmlFor="name" className="form-label">
            username:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="socialMediaHandle" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
