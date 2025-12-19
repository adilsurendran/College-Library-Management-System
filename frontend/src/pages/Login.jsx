// import { useState, useContext } from "react";
// import { loginUser } from "../services/authService";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await loginUser({ email, password });
//       console.log(data);
      

//       // Save token + user to context
//       // login(data.token, data.student);
//       login(data.accessToken, data.student);


//       setMsg("Login successful!");

//       // Redirect based on role
//       if (data.student.role === "admin") {
//         setTimeout(() => navigate("/admin"), 800);
//       } else {
//         setTimeout(() => navigate("/home"), 800);  // student dashboard route
//       }

//     } catch (e) {
//       console.log(e);
//       setMsg("Invalid email or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: 20 }}>
//       <h2>Login</h2>

//       {msg && <p>{msg}</p>}

//       <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const data = await loginUser({ email, password });
      console.log(data);

      // Save token + user to context
      login(data.accessToken, data.student);

      setMsg("Login successful!");

      // Redirect based on role
      if (data.student.role === "admin") {
        setTimeout(() => navigate("/admin"), 800);
      } else {
        setTimeout(() => navigate("/home"), 800);  // student dashboard route
      }

    } catch (e) {
      console.log(e);
      setMsg("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4F46E5" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Welcome Back</h2>
          </div>
          <p className="subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {msg && (
            <div className={`message ${msg.includes("successful") ? "success" : "error"}`}>
              <span className="message-icon">
                {msg.includes("successful") ? "✓" : "!"}
              </span>
              {msg}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              {/* <a href="#" className="forgot-link">Forgot password?</a> */}
            </div>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="15.7 15.7" />
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-login">
          <button className="social-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.72 16.7 5.85 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.85 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.85 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.85 14.09Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.85 9.91C6.72 7.31 9.14 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <button className="social-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#1877F2" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Facebook
          </button>
        </div> */}

        <p className="signup-link mt-2">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
          padding: 20px;
        }
        
        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 440px;
          padding: 40px;
          transition: transform 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-5px);
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .logo h2 {
          margin: 0;
          color: #1a202c;
          font-size: 28px;
          font-weight: 700;
        }
        
        .subtitle {
          color: #718096;
          font-size: 15px;
          margin: 0;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-weight: 600;
          color: #4a5568;
          font-size: 14px;
        }
        
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .forgot-link {
          color: #4f46e5;
          font-size: 14px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .forgot-link:hover {
          color: #4338ca;
          text-decoration: underline;
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .input-icon {
          position: absolute;
          left: 14px;
          color: #a0aec0;
        }
        
        .input-wrapper input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s;
          background: white;
          color: #2d3748;
        }
        
        .input-wrapper input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .input-wrapper input:disabled {
          background-color: #f7fafc;
          cursor: not-allowed;
        }
        
        .login-button {
          background: linear-gradient(135deg, #4f46e5 0%, #7c73fa 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }
        
        .login-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #4338ca 0%, #6d63e6 100%);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .message {
          padding: 14px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
        }
        
        .message.success {
          background-color: #f0fff4;
          color: #2f855a;
          border: 1px solid #c6f6d5;
        }
        
        .message.error {
          background-color: #fff5f5;
          color: #c53030;
          border: 1px solid #fed7d7;
        }
        
        .message-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-weight: bold;
          font-size: 14px;
        }
        
        .success .message-icon {
          background-color: #c6f6d5;
        }
        
        .error .message-icon {
          background-color: #fed7d7;
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 28px 0;
          color: #a0aec0;
          font-size: 14px;
        }
        
        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: #e2e8f0;
        }
        
        .divider span {
          padding: 0 16px;
        }
        
        .social-login {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
        }
        
        .social-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 15px;
        }
        
        .social-button:hover {
          border-color: #cbd5e0;
          background-color: #f7fafc;
        }
        
        .signup-link {
          text-align: center;
          color: #718096;
          font-size: 15px;
          margin: 0;
        }
        
        .signup-link a {
          color: #4f46e5;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .signup-link a:hover {
          color: #4338ca;
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .login-card {
            padding: 30px 24px;
          }
          
          .social-login {
            flex-direction: column;
          }
          
          .logo h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;