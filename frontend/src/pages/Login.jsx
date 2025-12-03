import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });
      console.log(data);
      

      // Save token + user to context
      // login(data.token, data.student);
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
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: 20 }}>
      <h2>Login</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
