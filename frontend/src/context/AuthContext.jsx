
// import { createContext, useState, useEffect } from "react";
// import api from "../services/api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ⭐ FIX: add a loading flag

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     setLoading(false); // ⭐ done initializing
//   }, []);

//   // const login = (token, userData) => {
//   //   localStorage.setItem("token", token);
//   //   localStorage.setItem("user", JSON.stringify(userData));
//   //   setUser(userData);
//   // };

//   const login = (accessToken, userData) => {
//   localStorage.setItem("accessToken", accessToken);
//   localStorage.setItem("user", JSON.stringify(userData));
//   setUser(userData);
// };


//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user"); // optional cleanup
//     setUser(null);
//   };

//   useEffect(() => {
//   const autoLogin = async () => {
//     try {
//       const res = await api.get("/refresh-token", { withCredentials: true });

//       if (res.data.accessToken) {
//         localStorage.setItem("accessToken", res.data.accessToken);
//       }
//     } catch {}

//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));

//     setLoading(false);
//   };

//   autoLogin();
// }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial loading

  useEffect(() => {
    const autoLogin = async () => {
      try {
        // 1) Try refreshing access token using refresh cookie
        const res = await api.get("/refresh-token", { withCredentials: true });
        console.log("refresh-token",res);
        

        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
        }
      } catch (err) {
        // No refresh token or expired
      }

      // 2) Load user from localStorage (if any)
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      setLoading(false); // done loading
    };

    autoLogin();
  }, []);

  // Login function to save user and access token
  const login = (accessToken, userData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
