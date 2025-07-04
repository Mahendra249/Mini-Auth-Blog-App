import { useState } from "react";
import "../styles/Register.css"
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate password confirmation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Validate required fields
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields");
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate register logic
      if (name && email && password) {
        // Store in React state instead of localStorage
        setMsg("Registered successfully! Redirecting...");
        setMsgType("success");

        // Simulate redirect after 2 seconds
        setTimeout(() => {
          setMsg("Redirected to dashboard");
          setMsgType("success");
        }, 2000);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setMsg(error.message || "Registration failed. Please try again.");
      setMsgType("error");
    } finally {
      setIsLoading(false);

      // Hide message after 5 seconds
      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 5000);
    }
  };

  const handleLoginRedirect = () => {
    setMsg("Redirecting to login page...");
    setMsgType("success");
    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };

  return (
    <div className="register-page">
      {/* Animated Background Elements */}
      <div className="background-shapes">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`shape shape-${i + 1}`}></div>
        ))}
      </div>

      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="floating-particle"></div>
        ))}
      </div>

      <div className="register-container">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">MS BLOG</span>
          </div>
          <h1>Create Account</h1>
          <p>Join us and start your journey</p>
        </div>

        <div className="form-section">
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
              />
              <div className="input-focus-line"></div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
              />
              <div className="input-focus-line"></div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
              />
              <div className="input-focus-line"></div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
              />
              <div className="input-focus-line"></div>
            </div>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={isLoading}
            onClick={handleRegister}
          >
            <span className={`btn-content ${isLoading ? "loading" : ""}`}>
              <span className="btn-text">Create Account</span>
              <div className="btn-loader"></div>
            </span>
            <div className="btn-ripple"></div>
          </button>
        </div>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLoginRedirect();
            }}
          >
            Sign In
          </a>
        </div>

        {msg && (
          <div className={`message ${msgType}`}>
            <div className="message-icon">
              {msgType === "success" ? "✓" : "⚠"}
            </div>
            <span>{msg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
