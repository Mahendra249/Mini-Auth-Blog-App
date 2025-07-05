import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/ClientFunction";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const payload = { email, password };
    console.log("Login payload:", payload);

    const response = await postData("/auth/login", payload);
     
    if (response?.success) {
      setUser(response?.user);
      localStorage.setItem("token", response.token);
      toast.success(response.msg || "User logged in successfully");
      navigate("/dashboard");
    } else {
      toast.error(response.msg || "Login failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="login-container">
        <div className="logo">
          <span>Welcome to</span>
          <h1>MS BLOG</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            <span className={`btn-text ${isLoading ? "hidden" : ""}`}>
              Login
            </span>
            <div className={`loading ${isLoading ? "show" : ""}`}></div>
          </button>
        </form>

        <div className="forgot-password">
          <a href="#" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
