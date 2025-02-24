/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { publicApi, privateApi } from "../utils/api";
import AuthContext from "../context/AuthContext";
import "./Login.css";

const Login = ({ setCart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await publicApi.post(
        "/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      login(email, password);
      try {
        const response = await privateApi.post("/cart", {
          headers: {
            userEmail: email,
            userPassword: password,
          },
        });
        setCart(response.data);
        sessionStorage.removeItem("cart");
        sessionStorage.setItem("cart", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
      navigate("/product");
      
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="true"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="true"
              required
            />
          </div>
          <button type="submit" id="signin" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Sign In"}
          </button>
          {error && <div className="error-message">{error}</div>}

          <div className="signup-link">
            Not registered yet? <Link to="/signup" id="create-link">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
