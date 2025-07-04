import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email && password) {
        setMsg("Login successful! Redirecting...");
        setMsgType("success");

        setTimeout(() => {
          setMsg("Redirected to dashboard");
          setMsgType("success");
        }, 2000);
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      setMsg(error.message || "Login failed. Please try again.");
      setMsgType("error");
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 5000);
    }
  };

  const handleForgotPassword = () => {
    setMsg("Forgot password functionality would be implemented here");
    setMsgType("success");
    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 5000);
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

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            <span className={`btn-text ${isLoading ? "hidden" : ""}`}>
              Login
            </span>
            <div className={`loading ${isLoading ? "show" : ""}`}></div>
          </button>
        </form>

        <div className="forgot-password">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            Forgot Password?
          </a>
        </div>

        {msg && <div className={`message ${msgType}`}>{msg}</div>}
      </div>
    </div>
  );
}

      