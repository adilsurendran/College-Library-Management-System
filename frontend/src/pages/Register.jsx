// import { useState } from "react";
// import { registerUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [department, setDepartment] = useState("");
//   const [regDate, setRegDate] = useState("");
//   const [photoFile, setPhotoFile] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhotoFile(file);
      
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setPhotoPreview(previewUrl);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");

//     try {
//       // Create FormData for file upload
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("department", department);
//       formData.append("regDate", regDate);
      
//       if (photoFile) {
//         formData.append("photo", photoFile);
//       }

//       await registerUser(formData);
//       setMsg("Registration successful! Redirecting...");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (e) {
//       setMsg(e.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
//       <h2>Register Student</h2>

//       {msg && (
//         <p style={{ 
//           color: msg.includes("successful") ? "green" : "red",
//           padding: "10px",
//           backgroundColor: msg.includes("successful") ? "#f0fff0" : "#fff0f0",
//           borderRadius: "4px"
//         }}>
//           {msg}
//         </p>
//       )}

//       <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
//         />

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
//         />

//         <input
//           type="text"
//           placeholder="Department"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//           required
//           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
//         />

//         <input
//           type="date"
//           placeholder="Registration Date"
//           value={regDate}
//           onChange={(e) => setRegDate(e.target.value)}
//           required
//           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
//         />

//         <div>
//           <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
//             Profile Photo
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ padding: "5px" }}
//           />
//           {photoPreview && (
//             <div style={{ marginTop: "10px" }}>
//               <img 
//                 src={photoPreview} 
//                 alt="Preview" 
//                 style={{ 
//                   width: "100px", 
//                   height: "100px", 
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   border: "2px solid #ddd"
//                 }} 
//               />
//             </div>
//           )}
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           style={{
//             padding: "12px",
//             backgroundColor: loading ? "#ccc" : "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: "16px"
//           }}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [regDate, setRegDate] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("department", department);
      formData.append("regDate", regDate);
      if (photoFile) formData.append("photo", photoFile);

      await registerUser(formData);

      setMsg("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      setMsg(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Register Student</h2>

      {msg && (
        <p
          style={{
            color: msg.includes("successful") ? "green" : "red",
            backgroundColor: msg.includes("successful") ? "#e8ffe8" : "#ffe8e8",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {msg}
        </p>
      )}

      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="date"
          value={regDate}
          onChange={(e) => setRegDate(e.target.value)}
          required
          style={inputStyle}
        />

        {/* Photo Upload */}
        <div>
          <label style={{ fontWeight: "bold", marginBottom: "6px", display: "block" }}>
            Profile Photo
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid #ccc",
              }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#999" : "#007bff",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

export default Register;
